/**
 * Created by cjb on 2018-05-06
 */
module Vejay {
    export class Listener {
        public caller: any; // 作用域
        public method: Function; // 方法
        public args: Array<any>; // 参数
        public self: any; // 监听对象本身
        
        constructor(caller: any, medthod: Function, args: Array<any>, self: any) {
            this.caller = caller;
            this.method = medthod;
            this.args = args;
            this.self = self;
        }
        
    }
}
