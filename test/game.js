require('./libs/weapp-adapter.js')
require("./libs/vejay.js");

setTimeout(init, 1000); // 小程序调试需要间隔一段时间
var img;

function init() {

    console.log(window)
    console.log(Vejay)
    Vejay.init(414, 736);

    img = new Vejay.display.component.Image("res/icon/1.png");
    img.width = 34;
    img.height = 24;
    Vejay.stage.addChild(img);


    //Vejay.stage.bgColor = "blue";
    //setInterval(loop, 1000);
    img.on(Vejay.event.Event.MOUSE_DOWN, this, onMouseDown);
    img.on(Vejay.event.Event.MOUSE_CLICK, this, onMouseClick);
}

var x;
var y;
var touchId;

function onMouseDown(e) {
    console.log("onMouseDown: ");
    console.log(e);
    touchId = e.touch.identifier;
    x = e.touch.clientX;
    y = e.touch.clientY;
    Vejay.stage.on(Vejay.event.Event.MOUSE_MOVE, this, onMouseMove);
    Vejay.stage.on(Vejay.event.Event.MOUSE_OUT, this, onMouseUp);
    Vejay.stage.on(Vejay.event.Event.MOUSE_UP, this, onMouseUp);
}

function onMouseUp(e) {
    console.log("onMouseUp: ");
    console.log(e);
    Vejay.stage.off(Vejay.event.Event.MOUSE_MOVE, this, onMouseMove);
    Vejay.stage.off(Vejay.event.Event.MOUSE_OUT, this, onMouseUp);
    Vejay.stage.off(Vejay.event.Event.MOUSE_UP, this, onMouseUp);
}

function onMouseClick(e) {
    console.log("onMouseClick");
    console.log(e);
}

function onMouseOut(e) {
    console.log("onMouseOut: ");
    console.log(e);
    Vejay.stage.off(Vejay.event.Event.MOUSE_MOVE, this, onMouseMove);
    Vejay.stage.off(Vejay.event.Event.MOUSE_OUT, this, onMouseUp);
    Vejay.stage.off(Vejay.event.Event.MOUSE_UP, this, onMouseUp);
}

    function onMouseMove(e) {
    console.log("onMouseMove  " + e.touch.clientX + "   " + e.touch.clientY);
    if(touchId === e.touch.identifier){
        img.x += e.touch.clientX - x;
        img.y += e.touch.clientY - y;
        x = e.touch.clientX;
        y = e.touch.clientY;
    }

}
