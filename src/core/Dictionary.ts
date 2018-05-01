/**
 * Created by cjb on 2018-05-01
 */
module core {
    export class Dictionary {
        private _obj: Object = {};
        
        public get keys(): Array<string> {
            var arr = [];
            for (var key in this._obj) {
                arr.push(key);
            }
            return arr;
        }
        
        public get values(): Array<any> {
            var arr = [];
            // for (var value of this._obj) {
            //     arr.push(value);
            // }
            for (var key in this._obj) {
                arr.push(this._obj[key]);
            }
            return arr;
        }
        
        public set(key: string, value: any): void {
            this._obj[key] = value;
        }
        
        public get(key: string): any {
            var value = this._obj[key];
            if (value !== undefined) {
                return value;
            }
            return null;
        }
        
        public has(key: string): boolean {
            return this._obj.hasOwnProperty(key);
        }
        
        public remove(key: string): void {
            delete this._obj[key];
        }
        
        public clear(): void {
            this._obj = {};
        }
        
    }
}
