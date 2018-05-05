/**
 * Created by cjb on 2018/5/4
 */

module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    import EventDispatcher = Vejay.core.base.EventDispatcher;
    import GlobalData = Vejay.global.GlobalData;
    
    export class MouseEvent {
        private _model: EventModel;
        private _stage: display.Stage;
        
        constructor() {
            this._stage = SingletonFactory.getInstance(display.Stage);
            this._model = SingletonFactory.getInstance(event.EventModel);
        }
        
        public init(): void {
            wx.onTouchStart(this.onTouchStart.bind(this));
            wx.onTouchMove(this.onTouchMove.bind(this));
            wx.onTouchEnd(this.onTouchEnd.bind(this));
            wx.onTouchCancel(this.onTouchCancel.bind(this));
        }
        
        /**  坐标所在的Sprite触发down */
        private onTouchStart(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            var target: Array<Sprite>;
            var len: number = Math.min(GlobalData.TouchNum, touches.length);
            
            for (var i = 0; i < len; i++) {
                touch = touches[i];
                target = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                
                if (target[0]) {
                    var event: Event = new Event(touch, target[0], target[1]);
                    EventDispatcher.dispatch(Event.MOUSE_DOWN, event, target[1]);
                    this._model.addTarget(touch, target);
                }
            }
        }
        
        /** 坐标所在的Sprite触发move,坐标超出之前触发down的Sprite触发out */
        private onTouchMove(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            var len: number = Math.min(GlobalData.TouchNum, touches.length);
            var data: [Touch, Array<Sprite>]; // 缓存的touch和target
            var target: Sprite;
            
            for (var i = 0; i < len; i++) {
                touch = touches[i];
                data = this._model.get(touch.identifier);
                if (data[0].clientX !== touch.clientX || data[0].clientY !== touch.clientY) {
                    data[0] = touch;
                    target = data[1][1];
                    var event = new Event(touch);
                    
                    if (target.viewport.contains(touch.clientX, touch.clientY)) { //TODO
                        EventDispatcher.dispatch(Event.MOUSE_MOVE, event, target);
                    } else {
                        EventDispatcher.dispatch(Event.MOUSE_OUT, event, target);
                    }
                    
                }
            }
        }
        
        /** 坐标所在的Sprite触发up,如果是之前触发down的Sprite触发click */
        private onTouchEnd(callback: TouchCallback) {
            var touches = callback.touches;
            var target: Array<Sprite>;
            var touch: Touch; // 弹起的触摸点
            var oldTarget: Array<Sprite>;
            var data: [Touch, Array<Sprite>] = this._model.targets.values as [Touch, Array<Sprite>]; // 缓存的touch和target
            var len: number = data.length;
            
            for (var i = 0; i < len; i++) {
                touch = data[i][0];
                oldTarget = data[i][1];
                if (this.isRemoving(touch.identifier.toString(), touches)) {
                    target = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                    if (target[0]) {
                        var event = new Event(touch, target[0], target[1]);
                        EventDispatcher.dispatch(Event.MOUSE_UP, event, target[1]);
                    }
                    if (oldTarget && oldTarget[1].viewport.contains(touch.clientX, touch.clientY)) {
                        var event = new Event(touch, oldTarget[0], oldTarget[1]);
                        EventDispatcher.dispatch(Event.MOUSE_CLICK, event, oldTarget[1]);
                    }
                }
            }
        }
        
        private isRemoving(id: string, touches: Array<Touch>): boolean {
            for (var i = 0; i < touches.length; i++) {
                if (id === touches[i].identifier.toString()) {
                    return false;
                }
            }
            return true;
        }
        
        private onTouchCancel(callback: TouchCallback) {
            console.log("onTouchCancel" + callback);
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
                child = parent.getChild(i).asSprite;
                
                if (child.mouseEnable && child.viewport.contains(x, y)) {
                    target = child;
                    if (child.mouseThrough) {
                        currentTarget = child;
                        this.searchTarget(child, x, y);
                    }
                    break;
                }
            }
            if (!currentTarget && target) {
                currentTarget = target;
            }
            return [currentTarget, target];
        }
    }
}
