/**
 * Created by cjb on 2018-04-30
 */
module Vejay.core {
    export class Vo {
        
        public static copy(from: Vo, to: Vo): Vo {
            for (var propName in from) {
                to[propName] = from[propName];
            }
            return to;
        }
        
        public clone(): Vo {
            return Vo.copy(this, new Vo());
        }
        
    }
}
