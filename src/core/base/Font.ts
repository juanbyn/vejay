/**
 * Created by cjb on 2018-05-01
 */
module core.base {
    export class Font {
        private static _instance: Font;
        
        public static get instance(): Font {
            if (!this._instance) {
                if (GlobalData.CtxType === 1) {
                    this._instance = new FontCanvas();
                } else {
                    this._instance = new FontWebGL();
                }
            }
            return this._instance;
        }
        
        public setFont(str: string) {
        }
        
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
