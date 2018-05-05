/**
 * Created by cjb on 2018-05-01
 */


module Vejay.core.base {
    import Dictionary = Vejay.utils.Dictionary;
    
    export class EventDispatcher {
        /** key:事件名称 , value: [执行域, 方法, 参数, 是否只执行一次] */
        private static _list: Dictionary = new Dictionary();
        
        /**
         * 添加事件监听
         * @param {string} name 事件名称
         * @param caller 执行域
         * @param {Function} method 方法
         * @param {Array<any>} args [参数]
         * @param {boolean} once 是否只执行一次
         */
        public on(name: string, caller: any, method: Function, args: Array<any> = null, once: boolean = false): void {
            var events: any = EventDispatcher._list.get(name);
            var e;
            
            if (!events) {
                events = [];
                EventDispatcher._list.set(name, events);
            }
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                if (caller === e[0] && method === e[1]) {
                    e = [caller, method, args, once, this];
                    return;
                }
            }
            // 监听鼠标事件自动打开鼠标监听
            if (this instanceof display.Sprite && Vejay.event.Event.isMouseEvent(name)) {
                this.mouseEnable = true;
            }
            events.push([caller, method, args, once, this]);
        }
        
        /** 删除事件监听 */
        public off(name: string, caller: any, method: Function): void {
            var events: Array<any> = EventDispatcher._list.get(name);
            var e;
            
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                if (caller === e[0] && method === e[1]) {
                    events.splice(i, 1);
                    // 自动关闭鼠标监听
                    if (caller instanceof display.Sprite && Vejay.event.Event.isMouseEvent(name)) {
                        caller.mouseEnable = false;
                    }
                    return;
                }
            }
        }
        
        /** 删除事件全部监听 */
        public offAll(name: string): void {
            EventDispatcher._list.remove(name);
        }
        
        /** 发送 */
        public sendEvent(name: string, data: any): void {
            SingletonFactory.getInstance(Vejay.event.EventProcess).addEvent(name, data);
        }
        
        /**
         * 执行事件
         * @param {string} name 事件名称
         * @param event 事件
         * @param {display.DisplayObject} target 指定对象
         */
        public static dispatch(name: string, event: Vejay.event.Event, target: Vejay.display.DisplayObject = null) {
            var events: Array<any> = this._list.get(name);
            if (!events) {
                return;
            }
            var e: Array<any>;
            var caller: any;
            var method: Function;
            var args: Array<any>;
            
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                caller = e[0];
                
                if (!target || e[4] === target) {
                    method = e[1];
                    
                    if (args instanceof Array) {
                        args = e[2].slice(0);
                        args.unshift(event);
                    } else if (event instanceof Vejay.event.Event) {
                        args = [event];
                    }
                    method.apply(caller, args);
                    
                    if (e[3]) {
                        events.splice(i--, 1);
                    }
                }
            }
        }
        
    }
}
