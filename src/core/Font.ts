/**
 * Created by cjb on 2018-05-01
 */

module Vejay.core {
    import GlobalData = Vejay.global.GlobalData;
    
    export class Font {
    
        
    }
    
    export class FontCanvas extends Font {
        public setFont(str: string) {
            var ctx = GlobalData.Ctx2d;
            ctx.font = str;
            ctx.save();
        }
    }
    
    export class FontWebGL extends Font {
    
    }
}
