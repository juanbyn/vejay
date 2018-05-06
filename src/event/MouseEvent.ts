/**
 * Created by cjb on 2018/5/4
 */

module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    import EventDispatcher = Vejay.core.base.EventDispatcher;
    
    export class MouseEvent {
        private _model: EventModel;
        private readonly _stage: display.Stage;
        public static TouchNum: number = 2; // 支持多点触控数量
        
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
        
        /**
         * 1. 坐标所在的Sprite触发down,超过最大缓存的点不缓存
         * 2. 同时判断stage
         * @param {TouchCallback} callback
         */
        private onTouchStart(callback: TouchCallback) {
            var touches = callback.touches;
            var touch: Touch;
            var target: Targets;
            var len: number = Math.min(MouseEvent.TouchNum, touches.length);
            
            for (var i = 0; i < len; i++) {
                touch = touches[i];
                if (this.isAdd(touch)) {
                    var event: Event;
                    target = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                    
                    if (target.currentTarget) {
                        event = new Event(touch, target.currentTarget, target.target);
                        EventDispatcher.dispatch(Event.MOUSE_DOWN, event, target.target);
                    }
                    if (stage.viewport.contains(touch.clientX, touch.clientY)) {
                        if (!event) {
                            event = new Event(touch, stage, stage);
                        }
                        EventDispatcher.dispatch(Event.MOUSE_DOWN, event, stage);
                    }
                    if (event) {
                        this._model.addEvent(event.clone(Event));
                    }
                }
            }
        }
        
        /** 判断是否新增加的touch点 */
        private isAdd(touch: Touch): boolean {
            for (var touchId in this._model.events) {
                if (touchId === touch.identifier.toString()) {
                    return false
                }
            }
            return true;
        }
        
        /**
         * 1. touch点在舞台内触发move,超出舞台触发out
         * 2. 如果是之前未缓存的点无效
         * @param {TouchCallback} callback
         */
        private onTouchMove(callback: TouchCallback) {
            var touches = callback.touches;
            var len: number = Math.min(MouseEvent.TouchNum, touches.length);
            var data: Event; // 缓存的touch和target
            
            for (var i = 0; i < len; i++) {
                var touch: Touch = touches[i];
                data = this._model.get(touch.identifier);
                // 判断是否移动点
                if (!data) {
                    return;
                }
                if (data.touch.clientX !== touch.clientX || data.touch.clientY !== touch.clientY) {
                    // 更新缓存touch
                    data.touch = touch;
                    var event = new Event(touch, stage, stage);
                    // 判断move或者out
                    if (stage.viewport.contains(touch.clientX, touch.clientY)) {
                        EventDispatcher.dispatch(Event.MOUSE_MOVE, event);
                    } else {
                        EventDispatcher.dispatch(Event.MOUSE_OUT, event);
                    }
                    
                    // // 判断所有侦听move的Sprite对象
                    // var event = new Event(touch);
                    // var listeners: Array<Listener> = EventDispatcher.getListeners(Event.MOUSE_MOVE);
                    // if (!listeners) {
                    //     return;
                    // }
                    // for (var j = 0; j < listeners.length; j++) {
                    //     var listener: Listener = listeners[j];
                    //     if (listener.self instanceof Sprite) {
                    //         // 判断move或者out
                    //         if (listener.self.viewport.contains(touch.clientX, touch.clientY)) {
                    //             EventDispatcher.dispatch(Event.MOUSE_MOVE, event, listener.self);
                    //         } else {
                    //             EventDispatcher.dispatch(Event.MOUSE_OUT, event, listener.self);
                    //         }
                    //     }
                    // }
                }
            }
        }
        
        /**
         * 1. 已经移除的touch坐标所在的Sprite触发up,如果是之前触发down的Sprite触发click
         * 2. 如果是之前未缓存的点无效
         * 3. 同时判断stage
         * @param {TouchCallback} callback
         */
        private onTouchEnd(callback: TouchCallback) {
            var touches = callback.touches;
            var targets: Targets; // 返回的对象
            var touch: Touch; // 弹起的触摸点
            var event: Event;
            
            // 循环判断缓存的touch是否移除
            for (var key in this._model.events) {
                event = this._model.get(key);
                touch = event.touch;
                
                if (MouseEvent.isRemoving(touch.identifier, touches)) {
                    // 搜索target判断up
                    targets = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                    if (targets.currentTarget) {
                        EventDispatcher.dispatch(Event.MOUSE_UP, event, targets.target);
                        // 判断click
                        if (event.target === targets.target) {
                            EventDispatcher.dispatch(Event.MOUSE_CLICK, event, event.target);
                        }
                    }
                    // 判断舞台 TODO 舞台外down到舞台里面up会触发click
                    if (stage.viewport.contains(touch.clientX, touch.clientY)) {
                        if (!event) {
                            event = new Event(touch, stage, stage);
                        }
                        EventDispatcher.dispatch(Event.MOUSE_UP, event, stage);
                        EventDispatcher.dispatch(Event.MOUSE_CLICK, event, stage);
                    }
                    // 移除缓存点
                    this._model.remove(touch.identifier);
                }
            }
        }
        
        /** 判断缓存的touch是否被移除 */
        private static isRemoving(id: number, touches: Array<Touch>): boolean {
            for (var i = 0; i < touches.length; i++) {
                if (id === touches[i].identifier) {
                    return false;
                }
            }
            return true;
        }
        
        private onTouchCancel(callback: TouchCallback) {
            console.log("onTouchCancel" + callback);
            var touches = callback.touches;
            for (var i = 0; i < touches.length; i++) {
                this._model.remove(touches[i].identifier);
            }
        }
        
        /**
         * 从stage往下搜索target
         * @param {Vejay.display.Sprite} parent 父节点Sprite
         * @param {number} x 鼠标点坐标x
         * @param {number} y 鼠标点坐标y
         * @returns Targets
         */
        private searchTarget(parent: Sprite, x: number, y: number): Targets {
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
            return new Targets(currentTarget, target);
        }
    }
}
