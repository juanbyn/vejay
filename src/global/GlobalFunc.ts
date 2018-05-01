/**
 * Created by cjb on 2018-04-30
 */
import GlobalData = common.GlobalData;
import Font = core.base.Font;

function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number): void {
    GlobalData.StageWidth = stageW;
    GlobalData.ScreenHeight = stageH;
    GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
    GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
    
    new core.base.Init();
}

function setFont(font: string) {
    Font.instance.setFont(font);
}