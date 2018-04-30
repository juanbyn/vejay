/**
 * Created by cjb on 2018-04-30
 */
module core.base {
    export class Vo {
        public static clone(vo1: Vo, vo2: Vo): Vo {
            for (var propName in vo1) {
                vo2[propName] = vo1[propName];
            }
            return vo2;
        }
        
        public clone(vo: Vo): Vo {
            return Vo.clone(this, vo);
        }
        
    }
}
