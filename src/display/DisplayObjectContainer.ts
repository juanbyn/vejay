module display {
    import EventDispatcher = core.EventDispatcher;
    
    export class DisplayObjectContainer extends EventDispatcher {
        private _children: Array<DisplayObjectContainer> = [];
        public parent: DisplayObjectContainer;
        
        constructor() {
            super();
        }
        
        public get numChildren(): number {
            return this._children.length;
        }
        
        public get children(): Array<DisplayObjectContainer> {
            return this._children;
        }
        
        public addChild(child: DisplayObjectContainer) {
            child.parent = this;
            this._children.push(child);
        }
        
        public removeChild(child: DisplayObjectContainer): void {
            var index = this.parent.getIndex(child);
            this.parent.removeChildAt(index);
        }
        
        public removeChildAt(index: number): DisplayObjectContainer {
            if (index >= 0 && index < this._children.length) {
                var child: DisplayObjectContainer = this._children[index];
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
        
        public getIndex(child: DisplayObjectContainer): number {
            return this._children.indexOf(child);
        }
        
        public removeAll() {
            this._children.length = 0;
        }
        
        public removeSelf(): void {
            this.parent.removeChild(this);
        }
        
    }
}
