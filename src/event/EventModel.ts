/**
 * Created by cjb on 2018/5/4
 */


module event {
    import Dictionary = utils.Dictionary;
    import Sprite = display.Sprite;
    
    export class EventModel {
        private _targets: Dictionary;
        
        constructor() {
            this._targets = new Dictionary();
        }
        
        public addTarget(touchId: number, target: Array<Sprite>): void {
            this._targets.set(touchId.toString(), target);
        }
        
        public getAndRemove(touchId: number): Array<Sprite> {
            var target = this._targets.get(touchId.toString());
            if (target) {
                this._targets.remove(touchId.toString());
            }
            return target;
        }
        
        public get targets(): Dictionary {
            return this._targets;
        }
    }
}
