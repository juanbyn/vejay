/**
 * Created by cjb on 2018/5/3
 */

module process {
    import EventDispatcher = core.base.EventDispatcher;
    
    export class EventProcess {
        private _msg: Array<any>;
        
        constructor() {
            this._msg = [];
        }
        
        public addEvent(name: string, data: any) {
            this._msg.push([name, data]);
        }
        
        public clear(): void {
            this._msg.length = 0;
        }
        
        public process(): void {
            var event: string;
            while (this._msg.length > 0) {
                event = this._msg.shift();
                EventDispatcher.dispatch(event[0], event[1]);
            }
        }
    }
}
