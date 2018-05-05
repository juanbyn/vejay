/**
 * Created by cjb on 2018/5/3
 */

module Vejay.core.base {
    export class SingletonFactory {
        private static _factory: Array<any> = [];
        
        public static getInstance<T>(clazz: { new (): T }): T {
            var inst: T;
            for (var i = 0; i < this._factory.length; i++) {
                inst = this._factory[i];
                if (inst.constructor === clazz) {
                    return inst;
                }
            }
            inst = new clazz();
            this._factory.push(inst);
            return inst;
        }
    }
}
