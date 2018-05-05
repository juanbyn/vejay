/**
 * Created by cjb on 2018-05-05
 */
module Vejay {
    export interface IProcess {
        isRun: Boolean;
        
        process(): void;
        
        complete(): void;
    }
}


