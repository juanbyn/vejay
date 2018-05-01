/**
 * Created by cjb on 2018-05-01
 */

module display.component {
    import Stage = display.Stage;
    
    export class VImage extends DisplayObject {
        private _img: HTMLImageElement;
        
        constructor(imgSrc: string) {
            super();
            this._img = new Image();
            this._img.src = imgSrc;
            this._img.onload = this.onLoad;
        }
        
        private onLoad(): void {
            this.width = this.width === undefined ? this._img.width : this.width;
            this.height = this.height === undefined ? this._img.height : this.height;
        }
        
        protected renderSelf() {
            var parentViewport = Stage.viewport;
            var viewport = this._viewport;
            
            if (parentViewport.containsRect(viewport)) {
                this.drawImage(0, 0, viewport.width, viewport.height, viewport.x, viewport.y, viewport.width, viewport.height);
                return;
            }
            let sx: number, sy: number, sWidth: number, sHeight: number;
            let dx: number, dy: number, dWidth: number, dHeight: number;
            if (viewport.left < parentViewport.left) {
                sx = parentViewport.left - viewport.left;
                dx = parentViewport.left;
                sWidth = dWidth = viewport.right - parentViewport.left;
            } else {
                sx = 0;
                dx = viewport.x;
                sWidth = dWidth = viewport.width;
            }
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
            var ctx = GlobalData.Ctx1;
            
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
