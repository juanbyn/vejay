/**
 * Created by cjb on 2018/5/4
 */
module display {
    export class Sprite extends DisplayObjectContainer {
        private _mouseEnable: boolean;
        public mouseThrough: boolean;
        
        constructor() {
            super();
            this._mouseEnable = false; // 默认关闭鼠标监听
            this.mouseThrough = true; // 默认打开鼠标穿透
        }
        
        get mouseEnable(): boolean {
            return this._mouseEnable;
        }
        
        set mouseEnable(value: boolean) {
            this._mouseEnable = value;
            if (value && this.parent) {
                (this.parent as Sprite).mouseEnable = true;
            }
        }
    }
}
