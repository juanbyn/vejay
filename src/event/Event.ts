/**
 * Created by cjb on 2018/5/4
 */


module event {
    import Sprite = display.Sprite;
    
    export class Event {
        //public static readonly TYPE_TOUCH: string = "touch";
        
        public static MOUSE_EVENT: Array<string> = ["v_mouse_click", "v_mouse_down", "v_mouse_up", "v_mouse_move"];
        public static readonly MOUSE_CLICK: string = this.MOUSE_EVENT[0];
        public static readonly MOUSE_DOWN: string = this.MOUSE_EVENT[1];
        public static readonly MOUSE_UP: string = this.MOUSE_EVENT[2];
        public static readonly MOUSE_MOVE: string = this.MOUSE_EVENT[3];
        
        public target: display.Sprite;
        public currentTarget: display.Sprite;
        // public type: string;
        public touch: Touch;
        
        constructor(touch: Touch, currentTarget?: Sprite, target?: Sprite) {
            this.touch = touch;
            if (currentTarget) {
                this.currentTarget = currentTarget;
            }
            if (target) {
                this.target = target;
            }
        }
        
        public static isMouseEvent(name: string): boolean {
            if (this.MOUSE_EVENT.indexOf(name) > -1) {
                return true;
            }
            return false;
        }
    }
}
