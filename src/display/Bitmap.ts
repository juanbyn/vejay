module display {
    import Stage = display.Stage;
    
    export class Bitmap extends DisplayObject {
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
        
        public render(parentX, parentY) {
            this._viewport.setTo(parentX + this.x, parentY + this.y, this.width, this.height);
            var parentViewport = Stage.viewport;
            if (
                this._viewport.left > parentViewport.right ||
                this._viewport.right < parentViewport.left ||
                this._viewport.top > parentViewport.bottom ||
                this._viewport.bottom < parentViewport.top
            )
                return;
            if (parentViewport.containsRect(this._viewport)) {
                // ctx.drawImage(this._img, 0, 0, this._viewport.width, this._viewport.height, this._viewport.x, this._viewport.y, this._viewport.width, this._viewport.height);
                this.drawImage(
                    0,
                    0,
                    this._viewport.width,
                    this._viewport.height,
                    this._viewport.x,
                    this._viewport.y,
                    this._viewport.width,
                    this._viewport.height
                );
                return;
            }
            let sx: number, sy: number, sWidth: number, sHeight: number;
            let dx: number, dy: number, dWidth: number, dHeight: number;
            if (this._viewport.left < parentViewport.left) {
                sx = parentViewport.left - this._viewport.left;
                dx = parentViewport.left;
                sWidth = dWidth = this._viewport.right - parentViewport.left;
            } else {
                sx = 0;
                dx = this._viewport.x;
                sWidth = dWidth = this._viewport.width;
            }
            if (this._viewport.top < parentViewport.top) {
                sy = parentViewport.top - this._viewport.top;
                dy = parentViewport.top;
                sHeight = dHeight = this._viewport.bottom - parentViewport.top;
            } else {
                sy = 0;
                dy = this._viewport.y;
                sHeight = dHeight = this._viewport.height;
            }
            if (this._viewport.right > parentViewport.right) {
                sWidth = dWidth = parentViewport.right - this._viewport.left;
            }
            if (this._viewport.bottom > parentViewport.bottom) {
                sHeight = dHeight = parentViewport.bottom - this._viewport.top;
            }
            // ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            this.drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
        
        private drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            var ctx = GlobalData.Ctx as CanvasRenderingContext2D;
            if (this.scaleX !== 1 || this.scaleY !== 1) {
                ctx.translate(0, dHeight + Stage.viewport.y * 2);
                ctx.scale(this.scaleX, this.scaleY);
                ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                return;
            }
            ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    }
}
