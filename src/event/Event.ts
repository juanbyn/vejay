/**
 * Created by cjb on 2018/5/4
 */


module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    import Vo = Vejay.core.Vo;
    
    export class Targets extends Vo {
        public currentTarget: Sprite;
        public target: Sprite;
        
        constructor(currentTarget: Sprite, target: Sprite) {
            super();
            this.currentTarget = currentTarget;
            this.target = target;
        }
    }
}

module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    
    export class Event extends Targets {
        
        public static MOUSE_EVENT: Array<string> = ["v_mouse_click", "v_mouse_down", "v_mouse_up", "v_mouse_move", "v_mouse_out"];
        public static readonly MOUSE_CLICK: string = Event.MOUSE_EVENT[0];
        public static readonly MOUSE_DOWN: string = Event.MOUSE_EVENT[1];
        public static readonly MOUSE_UP: string = Event.MOUSE_EVENT[2];
        public static readonly MOUSE_MOVE: string = Event.MOUSE_EVENT[3];
        public static readonly MOUSE_OUT: string = Event.MOUSE_EVENT[4];
        
        public static isMouseEvent(name: string): boolean {
            if (this.MOUSE_EVENT.indexOf(name) > -1) {
                return true;
            }
            return false;
        }
        
        // public type: string;
        public touch: Touch;
        
        constructor(touch?: Touch, currentTarget?: Sprite, target?: Sprite) {
            super(currentTarget, target);
            this.touch = touch;
        }
    }
}
