/**
 * Created by cjb on 2018/5/3
 */

module Vejay.event {
    import EventDispatcher = Vejay.core.base.EventDispatcher;
    import Process = Vejay.process.Process;
    
    export class EventProcess extends Process implements IProcess {
        private _msg: Array<any>;
        
        constructor() {
            super("EventProcess");
            this._msg = [];
            SingletonFactory.getInstance(Vejay.event.MouseEvent).init();
        }
        
        public get isRun(): Boolean {
            return true;
        }
        
        public complete(): void {
        }
        
        public addEvent(name: string, e: Event) {
            this._msg.push([name, e]);
        }
        
        public clear(): void {
            this._msg.length = 0;
        }
        
        public process(): void {
            var event: Array<any>;
            while (this._msg.length > 0) {
                event = this._msg.shift();
                EventDispatcher.dispatch(event[0], event[1]);
            }
        }
    }
}
