/**
 * Created by cjb on 2018-05-05
 */


module Vejay.display {
    import Process = Vejay.process.Process;
    import GlobalData = Vejay.global.GlobalData;
    
    export class DisplayProcess extends Process implements IProcess {
        
        constructor() {
            super("DisplayProcess");
        }
        
        public get isRun(): Boolean {
            return true;
        }
        
        public complete(): void {
        }
        
        public process(): void {
            GlobalData.Ctx2d.clearRect(0, 0, GlobalData.StageWidth, GlobalData.ScreenHeight);
            SingletonFactory.getInstance(Vejay.display.Stage).render(0, 0);
        }
    }
}
