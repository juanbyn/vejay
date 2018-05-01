module display {
    import Rectangle = math.Rectangle;
    
    export class DisplayObject extends DisplayObjectContainer {
        private _x: number = 0;
        private _y: number = 0;
        public posChange: boolean;
        public width: number;
        public height: number;
        private _scaleX: number = 1;
        private _scaleY: number = 1;
        public scaleChange: boolean;
        public pivotX: number = 0;
        public pivotY: number = 0;
        
        protected _viewport: Rectangle = new Rectangle();
        
        constructor() {
            super();
        }
        
        get globalX(): number {
            return this._viewport.x;
        }
        
        get globalY(): number {
            return this._viewport.y;
        }
        
        get x(): number {
            return this._x;
        }
        
        set x(value: number) {
            if (this._x === value) {
                return;
            }
            this._x = value;
            this.posChange = true;
        }
        
        get y(): number {
            return this._y;
        }
        
        set y(value: number) {
            if (this._y === value) {
                return;
            }
            this._y = value;
            this.posChange = true;
        }
        
        public pos(x: number, y: number): void {
            if (this._x === x && this._y === y) {
                return;
            }
            this._x = x;
            this._y = y;
            this.posChange = true;
        }
        
        get scaleY(): number {
            return this._scaleY;
        }
        
        set scaleY(value: number) {
            if (this._scaleY === value) {
                return;
            }
            this._scaleY = value;
            this.scaleChange = true;
        }
        
        get scaleX(): number {
            return this._scaleX;
        }
        
        set scaleX(value: number) {
            if (this._scaleX === value) {
                return;
            }
            this._scaleX = value;
            this.scaleChange = true;
        }
        
        public scale(scaleX: number, scaleY: number): void {
            if (this._scaleX === scaleX && this._scaleY === scaleY) {
                return;
            }
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this.scaleChange = true;
        }
        
        
        public render(parentX, parentY) {
            var sWidth = this.width * Math.abs(this.scaleX);
            var sHeight = this.height * Math.abs(this.scaleY);
            var sX = parentX + this.x - this.pivotX * sWidth;
            var sY = parentY + this.y - this.pivotY * sHeight;
            
            if (this.scaleX < 0) {
                sX += sWidth;
            }
            if (this.scaleY < 0) {
                sY += sHeight;
            }
            this._viewport.setTo(sX, sY, sWidth, sHeight);
            
            if (!Stage.viewport.containsRect(this._viewport)) {
                return;
            }
            // 渲染自身
            this.renderSelf();
            // 渲染子对象
            let len = this.children.length;
            for (let index = 0; index < len; index++) {
                var element: DisplayObject = this.children[index] as DisplayObject;
                element.render(this.x + parentX, this.y + parentY);
            }
        }
        
        protected renderSelf(): void {
        }
        
        
    }
}
