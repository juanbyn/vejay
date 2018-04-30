module display {
    import DisplayObjectContainer = display.DisplayObjectContainer;
    import Rectangle = math.Rectangle;
    import GlobalData = common.GlobalData;
    
    export class Stage extends DisplayObjectContainer {
        private static _instance: Stage = new Stage();
        public static viewport: Rectangle;
        
        constructor() {
            super();
            
            if (Stage._instance) {
                throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
            }
            Stage._instance = this;
            
            this.x = (GlobalData.screenWidth - GlobalData.stageWidth) * 0.5;
            this.y = (GlobalData.screenHeight - GlobalData.stageHeight) * 0.5;
            this.width = GlobalData.stageWidth;
            this.height = GlobalData.stageHeight;
            Stage.viewport = new Rectangle(this.x, this.y, this.width, this.height);
        }
        
        public static get inst(): Stage {
            return Stage._instance;
        }
    }
}
