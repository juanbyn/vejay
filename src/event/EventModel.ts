/**
 * Created by cjb on 2018/5/4
 */

module Vejay.event {
    
    export class EventModel {
        /** key:touchId  value:Event */
        private _event: object;
        
        constructor() {
            this._event = {};
        }
        
        public addEvent(event: Event): void {
            this._event[event.touch.identifier] = event;
        }
        
        public getAndRemove(touchId: number | string): Event {
            var target = this._event[touchId];
            if (target) {
                delete this._event[touchId];
            }
            return target;
        }
        
        public get(touchId: number | string): Event {
            return this._event[touchId];
        }
        
        public remove(touchId: number | string): void {
            delete this._event[touchId];
        }
        
        public get events(): object {
            return this._event;
        }
    }
}

