module Vejay.display {
    
    import Rectangle = Vejay.utils.math.Rectangle;
    import EventDispatcher = Vejay.core.base.EventDispatcher;
    
    export class DisplayObject extends EventDispatcher {
        
        private _x: number = 0;
        private _y: number = 0;
        public posChange: boolean;
        public width: number = 0;
        public height: number = 0;
        private _scaleX: number = 1;
        private _scaleY: number = 1;
        public scaleChange: boolean;
        public pivotX: number = 0;
        public pivotY: number = 0;
        private _rotation: number = 0;
        public rotationChange: boolean = false;
        
        public parent: DisplayObjectContainer;
        public visible: boolean = true;
        
        protected _viewport: Rectangle = new Rectangle();
        
        constructor() {
            super();
        }
        
        public dispose(): void {
            this.parent.removeChild(this);
            this.parent = null;
            this._viewport = null;
        }
        
        // get globalX(): number {
        //     return this._viewport.x;
        // }
        //
        // get globalY(): number {
        //     return this._viewport.y;
        // }
        
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
        
        get rotation(): number {
            return this._rotation;
        }
        
        set rotation(value: number) {
            if (this._rotation === value) {
                return;
            }
            this._rotation = value;
            this.rotationChange = true;
        }
        
        get viewport(): utils.math.Rectangle {
            return this._viewport;
        }
        
        public render(parentX, parentY) {
        
        }
        
        public get asImage(): Vejay.display.component.Image {
            return (this instanceof Vejay.display.component.Image) ? <Vejay.display.component.Image><any>this : null;
        }
        
        public get asSprite(): Vejay.display.Sprite {
            return (this instanceof Vejay.display.Sprite) ? <Vejay.display.Sprite><any>this : null;
        }
        
    }
}
