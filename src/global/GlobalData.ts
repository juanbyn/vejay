/**
 * Created by cjb on 2018-04-29
 */
module common {
    export class GlobalData {
        public static ScreenWidth: number;
        public static ScreenHeight: number;
        public static StageWidth: number;
        public static StageHeight: number;
        
        public static Ctx: CanvasRenderingContext2D | WebGLRenderingContext;
        public static CtxType: number = 0; // 0:webGL 1:canvas
    }
}