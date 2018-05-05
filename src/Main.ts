/**
 * Created by cjb on 2018-04-30
 */
import SingletonFactory = Vejay.core.base.SingletonFactory;

var loader;

module Vejay {
    import GlobalData = Vejay.global.GlobalData;
    import Process = Vejay.process.Process;
    
    export var stage: Vejay.display.Stage;
    
    export function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number) {
        GlobalData.StageWidth = stageW;
        GlobalData.StageHeight = stageH;
        GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
        GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
        
        Vejay.Init.initContextRender();
        stage = SingletonFactory.getInstance(display.Stage);
        
        Vejay.Init.initProcess();
        Vejay.Init.loop();
    }
    
    export class Init {
        private static _processes: Array<Process> = [];
        
        public static initProcess(): void {
            this._processes.push(new Vejay.event.EventProcess()); // 传送
            this._processes.push(new Vejay.display.DisplayProcess());
        }
        
        public static initContextRender(): void {
            // var webgl = wx.createCanvas().getContext("webgl");
            // var ctx = wx.createCanvas().getContext("2d");
            var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            GlobalData.Ctx2d = ctx;
            GlobalData.CtxType = 1;
            
            // if (webgl) {
            //     GlobalData.WebGl = webgl;
            // } else {
            //     GlobalData.Ctx2d = ctx;
            //     GlobalData.CtxType = 1;
            // }
        }
        
        private static process(): void {
            let len = this._processes.length;
            for (let i = 0; i < len; i++) {
                let p: Process = this._processes[i];
                if (!p.isRun) continue;
                p.process();
                p.complete();
            }
        }
        
        public static loop(): void {
            this.process();
            
            requestAnimationFrame(this.loop.bind(this));
        }
    }
}
