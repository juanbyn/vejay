/**
 * Created by cjb on 2018-05-01
 */


module Vejay.core.base {
    
    export class EventDispatcher {
        /** key:事件名称 , value: [执行域, 方法, 参数, 监听对象] */
        private static _list: object = {};
        
        /**
         * 添加事件监听
         * @param {string} name 事件名称
         * @param caller 执行域
         * @param {Function} method 方法
         * @param {Array<any>} args [参数]
         */
        public on(name: string, caller: any, method: Function, args: Array<any> = null): void {
            var listeners: any = EventDispatcher._list[name];
            var listener: Listener;
            
            if (!listeners) {
                listeners = [];
                EventDispatcher._list[name] = listeners;
            }
            for (var i = 0; i < listeners.length; i++) {
                listener = listeners[i];
                // 已经存在同一个作用域内同一函数,返回
                if (caller === listener.caller && method === listener.method) {
                    return;
                }
            }
            listeners.push(new Listener(caller, method, args, this));
        }
        
        /** 删除事件监听 */
        public off(name: string, caller: any, method: Function): void {
            var listeners: Array<Listener> = EventDispatcher._list[name];
            var listener: Listener;
            
            for (var i = 0; i < listeners.length; i++) {
                listener = listeners[i];
                if (caller === listener.caller && method === listener.method) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        }
        
        /** 当前是否监听指定事件 */
        public hasListen(name: string): boolean {
            var listeners: Array<Listener> = EventDispatcher._list[name];
            if (!listeners) {
                return false;
            }
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].self === this) {
                    return true;
                }
            }
            return false;
        }
        
        /** 获取监听指定事件名称的listeners */
        public static getListeners(name: string): Array<any> {
            return EventDispatcher._list[name];
        }
        
        /** 删除事件全部监听 */
        public static offAll(name: string): void {
           delete EventDispatcher._list[name];
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
            var listeners: Array<Listener> = this._list[name];
            if (!listeners) {
                return;
            }
            var listener: Listener;
            var args: Array<any>;
            
            for (var i = 0; i < listeners.length; i++) {
                listener = listeners[i];
                
                if (!target || listener.self === target) {
                    
                    if (listener.args instanceof Array) {
                        args = listener.args.slice(0);
                        args.unshift(event);
                    } else if (event instanceof Vejay.event.Event) {
                        args = [event];
                    }
                    listener.method.apply(listener.caller, args);
                }
            }
        }
        
    }
}
