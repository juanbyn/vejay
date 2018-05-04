module display {
    import Rectangle = utils.math.Rectangle;
    
    export class DisplayObjectContainer extends DisplayObject {
        private _children: Array<DisplayObject> = [];
        protected parentViewport: Rectangle;
        
        constructor() {
            super();
            this.parentViewport = Stage.viewport;
        }
        
        public get numChildren(): number {
            return this._children.length;
        }
        
        public get children(): Array<DisplayObject> {
            return this._children;
        }
        
        public addChild(child: DisplayObject) {
            child.parent = this;
            this._children.push(child);
        }
        
        public removeChild(child: DisplayObject): void {
            var index = this.parent.getIndex(child);
            this.parent.removeChildAt(index);
        }
        
        public removeChildAt(index: number): DisplayObject {
            if (index >= 0 && index < this._children.length) {
                var child: DisplayObject = this._children[index];
                child.parent = null;
                //index = this._children.indexOf(child); // index might have changed by event handler
                //if (index >= 0)
                this._children.splice(index, 1);
                // if (dispose) child.dispose();
                return child;
            } else {
                throw new RangeError('Invalid child index');
            }
        }
        
        public getIndex(child: DisplayObject): number {
            return this._children.indexOf(child);
        }
        
        public removeAll() {
            this._children.length = 0;
        }
        
        public removeSelf(): void {
            this.parent.removeChild(this);
        }
        
        protected renderSelf(): void {
        }
        
        public render(parentX, parentY) {
            if (!this.visible) {
                return;
            }
            var sWidth: number = this.width * Math.abs(this.scaleX);
            var sHeight: number = this.height * Math.abs(this.scaleY);
            var sX: number = parentX + this.x - this.pivotX * sWidth;
            var sY: number = parentY + this.y - this.pivotY * sHeight;
            
            if (this.scaleX < 0) {
                sX += sWidth;
            }
            if (this.scaleY < 0) {
                sY += sHeight;
            }
            this._viewport.setTo(sX, sY, sWidth, sHeight);
            
            if (!this.parentViewport.isIntersectRect(this._viewport)) {
                return;
            }
            // 渲染自身
            var ctx = GlobalData.Ctx1;
            this.setRotation(ctx,parentX + this.x, parentY + this.y);
            this.renderSelf();
            ctx.restore();
            // 渲染子对象
            let len = this.children.length;
            for (let index = 0; index < len; index++) {
                var element: DisplayObject = this.children[index];
                element.render(this.x + parentX, this.y + parentY);
            }
        }
        
        private setRotation(ctx,x, y) {
            if (this.rotationChange) {
                var px: number = x * 0.5;
                var py: number = y * 0.5;
                var diffX: number = px - px * Math.cos(this.rotation + 45);
                var diffY: number = py - py * Math.sin(this.rotation + 45);
                
                ctx.translate(diffX, diffY);
                ctx.rotate(this.rotation);
            }
        }
        
        public get asImage(): display.component.Image {
            return (this instanceof Image) ? <display.component.Image><any>this : null;
        }
    }
}
