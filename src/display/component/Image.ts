/**
 * Created by cjb on 2018-05-01
 */

module display.component {
    export class Image extends Component {
        private _img: HTMLImageElement;
        
        constructor(imgSrc: string) {
            super();
            this._img = new HTMLImageElement();
            this._img.src = imgSrc;
            this._img.onload = this.onLoad;
            this._img.onerror = this.onError;
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
            
            if (this.parentViewport.containsRect(viewport)) {
                this.drawImage(0, 0, viewport.width, viewport.height, viewport.x, viewport.y, viewport.width, viewport.height);
                return;
            }
            let sx: number, sy: number, sWidth: number, sHeight: number;
            let dx: number, dy: number, dWidth: number, dHeight: number;
            if (viewport.left < this.parentViewport.left) {
                sx = this.parentViewport.left - viewport.left;
                dx = this.parentViewport.left;
                sWidth = dWidth = viewport.right - this.parentViewport.left;
            } else {
                sx = 0;
                dx = viewport.x;
                sWidth = dWidth = viewport.width;
            }
            if (viewport.top < this.parentViewport.top) {
                sy = this.parentViewport.top - viewport.top;
                dy = this.parentViewport.top;
                sHeight = dHeight = viewport.bottom - this.parentViewport.top;
            } else {
                sy = 0;
                dy = viewport.y;
                sHeight = dHeight = viewport.height;
            }
            if (viewport.right > this.parentViewport.right) {
                sWidth = dWidth = this.parentViewport.right - viewport.left;
            }
            if (viewport.bottom > this.parentViewport.bottom) {
                sHeight = dHeight = this.parentViewport.bottom - viewport.top;
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
