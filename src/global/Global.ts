/**
 * Created by cjb on 2018-04-30
 */
import GlobalData = common.GlobalData;
import SingletonFactory = core.base.SingletonFactory;

var stage: display.Stage;
var loader;

function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number): void {
    GlobalData.StageWidth = stageW;
    GlobalData.ScreenHeight = stageH;
    GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
    GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
    
    new core.base.Init();
    stage = SingletonFactory.getInstance(display.Stage);
    SingletonFactory.getInstance(event.MouseEvent).init();
}