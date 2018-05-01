/**
 * Created by cjb on 2018-05-01
 */
module core.base {
    export class Init {
        constructor() {
            var canvas: Canvas = wx.createCanvas();
            var renderContext = canvas.getContext("webgl");
            
            if (renderContext) {
                this.initWebGl(renderContext);
            } else {
                this.initCanvas(canvas);
            }
        }
        
        private initWebGl(ctx: WebGLRenderingContext): void {
            GlobalData.Ctx0 = ctx;
        }
        
        private initCanvas(canvas: Canvas): void {
            var ctx = canvas.getContext("2d");
            GlobalData.Ctx1 = ctx;
            GlobalData.CtxType = 1;
        }
    }
}
