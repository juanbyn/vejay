/**
 * Created by cjb on 2018-04-30
 */
module Vejay.core {
    export class Vo {
        
        public static copy<T>(from: Vo, to: T): T {
            for (var propName in from) {
                to[propName] = from[propName];
            }
            return to;
        }
        
        public clone<T>(clazz: { new(): T }): T {
            return Vo.copy(this, new clazz());
        }
        
    }
}
