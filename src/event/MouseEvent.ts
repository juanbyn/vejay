/**
 * Created by cjb on 2018/5/4
 */


module event {
    import Sprite = display.Sprite;
    import EventDispatcher = core.base.EventDispatcher;
    
    export class MouseEvent {
        private _model: EventModel;
        private _stage: display.Stage;
        
        constructor() {
            this._stage = SingletonFactory.getInstance(display.Stage);
            this._model = SingletonFactory.getInstance(event.EventModel);
        }
        
        public init(): void {
            wx.onTouchStart(this.onTouchStart);
            wx.onTouchMove(this.onTouchMove);
            wx.onTouchEnd(this.onTouchEnd);
            wx.onTouchCancel(this.onTouchCancel);
        }
        
        private onTouchStart(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            var target: Array<Sprite>;
            
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                target = this.searchTarget(this._stage, touch.screenX, touch.screenY);
                
                if (target[0]) {
                    var event = new Event(touch, target[0], target[1]);
                    EventDispatcher.dispatch(Event.MOUSE_DOWN, event, target[1]);
                    this._model.addTarget(touch.identifier, target);
                }
            }
        }
        
        private onTouchMove(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                var event = new Event(touch);
                EventDispatcher.dispatch(Event.MOUSE_MOVE, event);
            }
        }
        
        private onTouchEnd(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            var target: Array<Sprite>;
            var oldTarget: Array<Sprite>;
            
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                target = this.searchTarget(this._stage, touch.screenX, touch.screenY);
                
                if (target[0]) {
                    var event = new Event(touch, target[0], target[1]);
                    EventDispatcher.dispatch(Event.MOUSE_UP, event, target[1]);
                }
                
                oldTarget = this._model.getAndRemove(touch.identifier);
                if (oldTarget && oldTarget[1].viewport.contains(touch.screenX, touch.screenY)) {
                    var event = new Event(touch, oldTarget[0], oldTarget[1]);
                    EventDispatcher.dispatch(Event.MOUSE_CLICK, event, oldTarget[1]);
                }
            }
        }
        
        private onTouchCancel(callback: TouchCallback) {
            var touches = callback.touches;
            var targets = this._model.targets;
            for (var i = 0; i < touches.length; i++) {
                targets.remove(touches[i].identifier.toString());
            }
        }
        
        private searchTarget(parent: Sprite, x: number, y: number): Array<Sprite> {
            var child: Sprite;
            var currentTarget: Sprite;
            var target: Sprite;
            
            for (var i = parent.numChildren - 1; i >= 0; i--) {
                child = parent[i];
                
                if (child.mouseEnable && child.viewport.contains(x, y)) {
                    target = child;
                    if (child.mouseThrough) {
                        currentTarget = child;
                        this.searchTarget(child, x, y);
                    }
                    return;
                }
            }
            if (!currentTarget && target) {
                currentTarget = target;
            }
            return [currentTarget, target];
        }
    }
}
