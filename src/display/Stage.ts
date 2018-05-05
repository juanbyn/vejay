module Vejay.display {
    
    import Rectangle = Vejay.utils.math.Rectangle;
    import GlobalData = Vejay.global.GlobalData;
    
    export class Stage extends Sprite {
        public static viewport: Rectangle;
        public _bgColor: string;
        
        constructor() {
            super();
            
            this.x = (GlobalData.ScreenWidth - GlobalData.StageWidth) * 0.5;
            this.y = (GlobalData.ScreenHeight - GlobalData.StageHeight) * 0.5;
            this.width = GlobalData.StageWidth;
            this.height = GlobalData.StageHeight;
            Stage.viewport = new Rectangle(this.x, this.y, this.width, this.height);
        }
        
        public set bgColor(color: string) {
            this._bgColor = color;
            var ctx = GlobalData.Ctx2d;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, this.width, this.height);
        }
        
        renderSelf() {
            var ctx = GlobalData.Ctx2d;
            if (this._bgColor) {
                ctx.fillStyle = this._bgColor;
                ctx.fillRect(0, 0, this.width, this.height);
            }
        }
    }
}
