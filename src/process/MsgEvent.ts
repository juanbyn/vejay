/**
 * Created by cjb on 2018-05-05
 */
module Vejay.process {
    export class MsgEvent {
        private static _eventList = {};
        
        public static clear(): void {
            MsgEvent._eventList = {};
        }
        
        public static addEvent(event: string, param: any = null): void {
            MsgEvent._eventList[event] = param;
        }
        
        public static addEventList(event: string, param: any): void {
            var list: Array<any> = MsgEvent._eventList[event] === undefined ? [] : MsgEvent._eventList[event];
            if (list.indexOf(param) === -1) list.push(param);
            MsgEvent._eventList[event] = list;
            if (list.length > 300) console.error('事件没删除   ' + event);
        }
        
        public static spliceEvent(event: string, guid: string): void {
            var list: Array<any> = MsgEvent._eventList[event];
            if (list == null) return;
            var index = list.indexOf(guid);
            if (index != -1) list.splice(index, 1);
            
            if (list.length == 0) MsgEvent.removeEvent(event);
        }
        
        public static hasEvent(type: string): Boolean {
            return type in MsgEvent._eventList;
        }
        
        public static removeEvent(type: string): void {
            delete MsgEvent._eventList[type];
        }
        
        public static getParam(type: string): any {
            return MsgEvent._eventList[type];
        }
        
        public static get eventList(): any {
            return MsgEvent._eventList;
        }
    }
}
