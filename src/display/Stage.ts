module display {
    import Rectangle = math.Rectangle;
    import GlobalData = common.GlobalData;
    
    export class Stage extends DisplayObject {
        private static _instance: Stage;
        public static viewport: Rectangle;
        
        constructor() {
            super();
            
            this.x = (GlobalData.ScreenWidth - GlobalData.StageWidth) * 0.5;
            this.y = (GlobalData.ScreenHeight - GlobalData.StageHeight) * 0.5;
            this.width = GlobalData.StageWidth;
            this.height = GlobalData.StageHeight;
            Stage.viewport = new Rectangle(this.x, this.y, this.width, this.height);
        }
        
        public static instance(): Stage {
            if (!Stage._instance) {
                this._instance = new Stage()
            }
            return this._instance;
        }
        
    }
}
