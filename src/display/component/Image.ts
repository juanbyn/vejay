/**
 * Created by cjb on 2018-05-01
 */


module Vejay.display.component {
    import GlobalData = Vejay.global.GlobalData;
    
    export class Image extends Component {
        private _img: HTMLImageElement;
        
        constructor(imgSrc: string) {
            super();
            this._img = wx.createImage();
            this._img.src = imgSrc;
            this._img.onload = this.onLoad;
            this._img.onerror = this.onError;
        }
        
        public dispose(): void {
            this._img = null;
            super.dispose();
        }
        
        public skin(src: string) {
        
        }
        
        private onLoad(): void {
            this.width = this.width === undefined ? this._img.width : this.width;
            this.height = this.height === undefined ? this._img.height : this.height;
        }
        
        private onError(): void {
        
        }
        
        protected renderSelf() {
            var viewport = this._viewport;
            var parentViewport = this.parent.viewport;
            // 全部包含在里面
            if (parentViewport.containsRect(viewport)) {
                this.drawImage(0, 0, this.width, this.height, viewport.x, viewport.y, viewport.width, viewport.height);
                return;
            }
            // 超出父节点边界(默认都是stage)
            let sx: number, sy: number, sWidth: number, sHeight: number;
            let dx: number, dy: number, dWidth: number, dHeight: number;
            // 左边超出
            if (viewport.left < parentViewport.left) {
                sx = parentViewport.left - viewport.left;
                dx = parentViewport.left;
                sWidth = dWidth = viewport.right - parentViewport.left;
            } else {
                sx = 0;
                dx = viewport.x;
                sWidth = dWidth = viewport.width;
            }
            // 上面超出
            if (viewport.top < parentViewport.top) {
                sy = parentViewport.top - viewport.top;
                dy = parentViewport.top;
                sHeight = dHeight = viewport.bottom - parentViewport.top;
            } else {
                sy = 0;
                dy = viewport.y;
                sHeight = dHeight = viewport.height;
            }
            if (viewport.right > parentViewport.right) {
                sWidth = dWidth = parentViewport.right - viewport.left;
            }
            if (viewport.bottom > parentViewport.bottom) {
                sHeight = dHeight = parentViewport.bottom - viewport.top;
            }
            this.drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
        
        private drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            var ctx = GlobalData.Ctx2d;
            
            // if (this.scaleChange && (this.scaleX !== 1 || this.scaleY !== 1)) {
            //     ctx.translate(0, dHeight + Stage.viewport.y * 2);
            //     ctx.scale(this.scaleX, this.scaleY);
            //     ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            //     ctx.setTransform(1, 0, 0, 1, 0, 0);
            //     return;
            // }
            ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    }
}
