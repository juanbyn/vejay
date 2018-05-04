/**
 * Created by cjb on 2018-05-01
 */


module core.base {
    import Dictionary = utils.Dictionary;
    import DisplayObject = display.DisplayObject;
    import Sprite = display.Sprite;
    import Event = event.Event;
    
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
        public addEventListener(name: string, caller: any, method: Function, args: Array<any>, once: boolean = false): void {
            var events: any = EventDispatcher._list.get(name);
            var e;
            if (!events) {
                events = [];
            }
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                if (method === e[1]) {
                    return;
                }
            }
            // 监听鼠标事件自动打开鼠标监听
            if (caller instanceof Sprite && Event.isMouseEvent(name)) {
                caller.mouseEnable = true;
            }
            events.push([caller, method, args, once]);
        }
        
        /** 删除事件监听 */
        public removeEventListener(name: string, caller: any, method: Function): void {
            var events: Array<any> = EventDispatcher._list.get(name);
            var e;
            
            for (var i = 0; i < events.length; i++) {
                e = events[i];
                if (caller === e[0] && method === e[1]) {
                    events.splice(i, 1);
                    // 自动关闭鼠标监听
                    if (caller instanceof Sprite && Event.isMouseEvent(name)) {
                        caller.mouseEnable = false;
                    }
                    return;
                }
            }
        }
        
        /** 删除事件全部监听 */
        public removeEventListeners(name: string): void {
            EventDispatcher._list.remove(name);
        }
        
        /** 发送 */
        public sendEvent(name: string, data: any): void {
            SingletonFactory.getInstance(process.EventProcess).addEvent(name, data);
        }
        
        /**
         * 执行事件
         * @param {string} name 事件名称
         * @param data 参数
         * @param {display.DisplayObject} target 指定对象
         */
        public static dispatch(name: string, data: any, target: DisplayObject = null) {
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
                
                if (!target || target === caller) {
                    method = e[1];
                    args = e[2].slice(0);
                    args.unshift(data);
                    method.apply(caller, args);
                    
                    if (e[3]) {
                        events.splice(i--, 1);
                    }
                }
            }
        }
        
    }
}
