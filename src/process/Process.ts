/**
 * Created by cjb on 2018-05-05
 */


module Vejay.process {
    import MsgEvent = Vejay.process.MsgEvent;
    
    export class Process {
        private _event: string;
        
        constructor(event: string) {
            this._event = event;
        }
        
        public get isRun(): Boolean {
            return MsgEvent.hasEvent(this._event);
        }
        
        public process(): void {
        }
        
        public complete(): void {
            MsgEvent.removeEvent(this._event);
        }
        
        public get getParam(): Object {
            return MsgEvent.getParam(this._event);
        }
        
        public get getList(): Array<any> {
            return MsgEvent.getParam(this._event) as Array<any>;
        }
    }
}

