/**
 * Created by cjb on 2018-05-01
 */
module core.base {
    export class Font {
    
        
    }
    
    export class FontCanvas extends Font {
        public setFont(str: string) {
            var ctx = GlobalData.Ctx1;
            ctx.font = str;
            ctx.save();
        }
    }
    
    export class FontWebGL extends Font {
    
    }
}
