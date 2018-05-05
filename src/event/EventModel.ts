/**
 * Created by cjb on 2018/5/4
 */

module Vejay.event {
    import Dictionary = Vejay.utils.Dictionary;
    import Sprite = Vejay.display.Sprite;
    
    export class EventModel {
        private _targets: Dictionary;
        
        constructor() {
            this._targets = new Dictionary();
        }
        
        public addTarget(touch: Touch, target: Array<Sprite>): void {
            this._targets.set(touch.identifier.toString(), [touch, target]);
        }
        
        public getAndRemove(touchId: number | string): [Touch, Array<Sprite>] {
            var target = this._targets.get(touchId.toString());
            if (target) {
                this._targets.remove(touchId.toString());
            }
            return target;
        }
        
        public get(touchId: number | string): [Touch, Array<Sprite>] {
            return this._targets.get(touchId.toString());
        }
        
        public get targets(): Dictionary {
            return this._targets;
        }
    }
}
