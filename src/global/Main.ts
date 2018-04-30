/**
 * Created by cjb on 2018-04-30
 */
import GlobalData = common.GlobalData;

function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number): void {
    GlobalData.StageWidth = stageW;
    GlobalData.ScreenHeight = stageH;
    GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
    GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
    
    var canvas = wx.createCanvas();
    var renderContext = canvas.getContext("webgl");
    
    if (renderContext) {
        GlobalData.Ctx = renderContext;
    } else {
        GlobalData.Ctx = canvas.getContext("2d");
        GlobalData.CtxType = 1;
    }
}


