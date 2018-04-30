module display {
  export class DisplayObjectContainer extends DisplayObject {
    private _children: Array<DisplayObject> = [];

    constructor() {
      super();
    }
 
    public get numChildren(): number {
      return this._children.length;
    }

    public get getChildren(): Array<DisplayObject> {
      return this._children;
    }

    public addChild(child: DisplayObject) {
      this._children.push(child);
    }

    public removeChildAt(index: number): DisplayObject {
      if (index >= 0 && index < this._children.length) {
        var child: DisplayObject = this._children[index];
        // child.setParent(null);
        index = this._children.indexOf(child); // index might have changed by event handler
        if (index >= 0) this._children.splice(index, 1);
        // if (dispose) child.dispose();
        return child;
      } else {
        throw new RangeError('Invalid child index');
      }
    }

    public removeChildren() {
      this._children.length = 0;
    }

    public render(ctx, x, y) {
      let len = this._children.length;
      for (let index = 0; index < len; index++) {
        const element = this._children[index];
        element.render(ctx, this.x + x, this.y + y);
      }
    }
  }
}
