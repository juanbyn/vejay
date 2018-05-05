/**
 * Created by cjb on 2018-05-01
 */

module Vejay.display {
    import GlobalData = Vejay.global.GlobalData;
    
    export class RenderContext {
        private ctx0: WebGLRenderingContext;
        private ctx1: CanvasRenderingContext2D;
        public static _instance: RenderContext;
        
        constructor() {
            if (RenderContext._instance) {
                console.error("get instance instead of new");
                return;
            }
            this.ctx0 = GlobalData.WebGl;
            this.ctx1 = GlobalData.Ctx2d;
        }
        
        public static get instance(): RenderContext {
            if (!this._instance) {
                this._instance = new RenderContext();
            }
            return this._instance;
        }
        
        public scale(x: number, y: number): void {

        }
    }
}
