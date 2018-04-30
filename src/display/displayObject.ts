 module display {
    import Rectangle = math.Rectangle;
    
     export class DisplayObject {
        public x: number = 0;
        public y: number = 0;
        public width: number;
        public height: number;
        public scaleX: number = 1;
        public scaleY: number = 1;

        protected _viewport: Rectangle = new Rectangle();

        constructor() {
        }

        public render(ctx, x, y) {
        }
    }
}
