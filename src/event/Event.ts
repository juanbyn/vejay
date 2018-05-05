/**
 * Created by cjb on 2018/5/4
 */

module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    
    export class Event {
        //public static readonly TYPE_TOUCH: string = "touch";
        
        public static MOUSE_EVENT: Array<string> = ["v_mouse_click", "v_mouse_down", "v_mouse_up", "v_mouse_move","v_mouse_out"];
        public static readonly MOUSE_CLICK: string = Event.MOUSE_EVENT[0];
        public static readonly MOUSE_DOWN: string = Event.MOUSE_EVENT[1];
        public static readonly MOUSE_UP: string = Event.MOUSE_EVENT[2];
        public static readonly MOUSE_MOVE: string = Event.MOUSE_EVENT[3];
        public static readonly MOUSE_OUT: string = Event.MOUSE_EVENT[4];
        
        public target: Sprite;
        public currentTarget: Sprite;
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
