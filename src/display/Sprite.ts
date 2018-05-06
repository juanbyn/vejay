/**
 * Created by cjb on 2018/5/4
 */
module Vejay.display {
    export class Sprite extends DisplayObjectContainer {
        public mouseEnable: boolean;
        public mouseThrough: boolean;
        
        constructor() {
            super();
            this.mouseEnable = false; // 默认关闭鼠标监听
            this.mouseThrough = false; // 默认打开鼠标穿透
        }
        
        public dispose(): void {
            super.dispose();
        }
        
        public mouseOpen(value: boolean): void {
            this.mouseEnable = this.mouseThrough = value;
        }
    }
}
