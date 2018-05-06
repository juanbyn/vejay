var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __extends = (this && this.__extends) || (function () {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();

declare module Vejay.utils.math {
    class Rectangle {
        static release(rect: Rectangle): void;
        static create(): Rectangle;
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        right: number;
        bottom: number;
        left: number;
        top: number;
        topLeft: Point;
        bottomRight: Point;
        copyFrom(sourceRect: Rectangle): Rectangle;
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        contains(x: number, y: number): boolean;
        intersection(toIntersect: Rectangle): Rectangle;
        inflate(dx: number, dy: number): void;
        $intersectInPlace(clipRect: Rectangle): Rectangle;
        intersects(toIntersect: Rectangle): boolean;
        isEmpty(): boolean;
        setEmpty(): void;
        clone(): Rectangle;
        containsPoint(point: Point): boolean;
        containsRect(rect: Rectangle): boolean;
        isIntersectRect(rect: Rectangle): boolean;
        equals(toCompare: Rectangle): boolean;
        inflatePoint(point: Point): void;
        offset(dx: number, dy: number): void;
        offsetPoint(point: Point): void;
        toString(): string;
        union(toUnion: Rectangle): Rectangle;
        $getBaseWidth(angle: number): number;
        $getBaseHeight(angle: number): number;
    }
    let $TempRectangle: Rectangle;
}
declare module Vejay.utils.math {
    class NumberUtils {
        static TWO_PI: number;
        static Deg2Rad: number;
        static Rad2Deg: number;
        private static num;
        static getRand(min: number, max: number): number;
        static getIntRand(min: number, max: number): number;
        static roundN(value: number, n?: number): number;
        static readonly newGuid: string;
        static getAngle(beginX: number, beginY: number, endX: number, endY: number): number;
        static isINSector(range: number, degree: number, x1: number, y1: number, x2: number, y2: number): boolean;
        static getDistance(x1: number, y1: number, x2: number, y2: number): number;
        static isInRange(x: number, y: number, rectangle: Rectangle): boolean;
        static getAnglePoint(beginX: number, beginY: number, angle: number, distance: number): Point;
        static getNearestPoint(beginX: number, beginY: number, endX: number, endY: number, distance: number): Point;
        static get8Direction(degree: number): 2 | 6 | 4 | 8;
        static get8Direction2(beginX: number, beginY: number, endX: number, endY: number): 2 | 6 | 4 | 8;
    }
}
declare module Vejay.utils.math {
    class Matrix {
        static release(matrix: Matrix): void;
        static create(): Matrix;
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        clone(): Matrix;
        concat(other: Matrix): void;
        copyFrom(other: Matrix): Matrix;
        identity(): void;
        invert(): void;
        $invertInto(target: Matrix): void;
        rotate(angle: number): void;
        scale(sx: number, sy: number): void;
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        translate(dx: number, dy: number): void;
        equals(other: Matrix): boolean;
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        toString(): string;
        private getDeterminant();
        $getScaleX(): number;
        $getScaleY(): number;
        $getSkewX(): number;
        $getSkewY(): number;
    }
    let $TempMatrix: Matrix;
}
declare module Vejay.utils.math {
    class Point {
        static release(point: Point): void;
        static create(x: number, y: number): Point;
        constructor(x?: number, y?: number);
        x: number;
        y: number;
        readonly length: number;
        setTo(x: number, y: number): Point;
        clone(): Point;
        equals(toCompare: Point): boolean;
        static distance(p1: Point, p2: Point): number;
        copyFrom(sourcePoint: Point): void;
        add(v: Point): Point;
        static interpolate(pt1: Point, pt2: Point, f: number): Point;
        normalize(thickness: number): void;
        offset(dx: number, dy: number): void;
        static polar(len: number, angle: number): Point;
        subtract(v: Point): Point;
        toString(): string;
    }
    let $TempPoint: Point;
}
declare module Vejay.process {
    class MsgEvent {
        private static _eventList;
        static clear(): void;
        static addEvent(event: string, param?: any): void;
        static addEventList(event: string, param: any): void;
        static spliceEvent(event: string, guid: string): void;
        static hasEvent(type: string): Boolean;
        static removeEvent(type: string): void;
        static getParam(type: string): any;
        static readonly eventList: any;
    }
}
declare module Vejay.process {
    class Process {
        private _event;
        constructor(event: string);
        readonly isRun: Boolean;
        process(): void;
        complete(): void;
        readonly getParam: Object;
        readonly getList: Array<any>;
    }
}
declare module Vejay.global {
    class GlobalData {
        static ScreenWidth: number;
        static ScreenHeight: number;
        static StageWidth: number;
        static StageHeight: number;
        static WebGl: WebGLRenderingContext;
        static Ctx2d: CanvasRenderingContext2D;
        static CtxType: number;
    }
}
declare module Vejay.core.base {
    class EventDispatcher {
        private static _list;
        on(name: string, caller: any, method: Function, args?: Array<any>): void;
        off(name: string, caller: any, method: Function): void;
        hasListen(name: string): boolean;
        static getListeners(name: string): Array<any>;
        static offAll(name: string): void;
        sendEvent(name: string, data: any): void;
        static dispatch(name: string, event: Vejay.event.Event, target?: Vejay.display.DisplayObject): void;
    }
}
declare module Vejay.core.base {
    class SingletonFactory {
        private static _factory;
        static getInstance<T>(clazz: {
            new (): T;
        }): T;
    }
}
declare module Vejay.core {
    class Font {
    }
    class FontCanvas extends Font {
        setFont(str: string): void;
    }
    class FontWebGL extends Font {
    }
}
declare module Vejay.display {
    import Rectangle = Vejay.utils.math.Rectangle;
    import EventDispatcher = Vejay.core.base.EventDispatcher;
    class DisplayObject extends EventDispatcher {
        private _x;
        private _y;
        posChange: boolean;
        width: number;
        height: number;
        private _scaleX;
        private _scaleY;
        scaleChange: boolean;
        pivotX: number;
        pivotY: number;
        private _rotation;
        rotationChange: boolean;
        parent: DisplayObjectContainer;
        visible: boolean;
        protected _viewport: Rectangle;
        constructor();
        dispose(): void;
        x: number;
        y: number;
        pos(x: number, y: number): void;
        scaleY: number;
        scaleX: number;
        scale(scaleX: number, scaleY: number): void;
        rotation: number;
        readonly viewport: utils.math.Rectangle;
        render(parentX: any, parentY: any): void;
        readonly asImage: Vejay.display.component.Image;
        readonly asSprite: Vejay.display.Sprite;
    }
}
declare module Vejay.display {
    class DisplayObjectContainer extends DisplayObject {
        private _children;
        constructor();
        dispose(): void;
        readonly numChildren: number;
        readonly children: Array<DisplayObject>;
        addChild(child: DisplayObject): void;
        removeChild(child: DisplayObject): void;
        removeChildAt(index: number): DisplayObject;
        getIndex(child: DisplayObject): number;
        getChild(index: number): DisplayObject;
        removeAll(): void;
        removeSelf(): void;
        protected renderSelf(): void;
        render(parentX: any, parentY: any): void;
        private setRotation(ctx, x, y);
    }
}
declare module Vejay.display {
    class Sprite extends DisplayObjectContainer {
        mouseEnable: boolean;
        mouseThrough: boolean;
        constructor();
        dispose(): void;
        mouseOpen(value: boolean): void;
    }
}
declare module Vejay.display.component {
    class Component extends Sprite {
        constructor();
        dispose(): void;
    }
}
declare module Vejay.display {
    import Rectangle = Vejay.utils.math.Rectangle;
    class Stage extends Sprite {
        static viewport: Rectangle;
        _bgColor: string;
        constructor();
        bgColor: string;
        renderSelf(): void;
    }
}
declare module Vejay.display.component {
    class Image extends Component {
        private _img;
        constructor(imgSrc: string);
        dispose(): void;
        skin(src: string): void;
        private onLoad();
        private onError();
        protected renderSelf(): void;
        private drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
import SingletonFactory = Vejay.core.base.SingletonFactory;
declare var loader: any;
declare module Vejay {
    var stage: Vejay.display.Stage;
    function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number): void;
    class Init {
        private static _processes;
        static initProcess(): void;
        static initContextRender(): void;
        private static process();
        static loop(): void;
    }
}
declare module Vejay.core {
    class Vo {
        static copy<T>(from: Vo, to: T): T;
        clone<T>(clazz: {
            new (): T;
        }): T;
    }
}
declare module Vejay.display {
    import Process = Vejay.process.Process;
    class DisplayProcess extends Process implements IProcess {
        constructor();
        readonly isRun: Boolean;
        complete(): void;
        process(): void;
    }
}
declare module Vejay.display {
    class RenderContext {
        private ctx0;
        private ctx1;
        static _instance: RenderContext;
        constructor();
        static readonly instance: RenderContext;
        scale(x: number, y: number): void;
    }
}
declare module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    import Vo = Vejay.core.Vo;
    class Targets extends Vo {
        currentTarget: Sprite;
        target: Sprite;
        constructor(currentTarget: Sprite, target: Sprite);
    }
}
declare module Vejay.event {
    import Sprite = Vejay.display.Sprite;
    class Event extends Targets {
        static MOUSE_EVENT: Array<string>;
        static readonly MOUSE_CLICK: string;
        static readonly MOUSE_DOWN: string;
        static readonly MOUSE_UP: string;
        static readonly MOUSE_MOVE: string;
        static readonly MOUSE_OUT: string;
        static isMouseEvent(name: string): boolean;
        touch: Touch;
        constructor(touch?: Touch, currentTarget?: Sprite, target?: Sprite);
    }
}
declare module Vejay.event {
    class EventModel {
        private _event;
        constructor();
        addEvent(event: Event): void;
        getAndRemove(touchId: number | string): Event;
        get(touchId: number | string): Event;
        remove(touchId: number | string): void;
        readonly events: object;
    }
}
declare module Vejay.event {
    import Process = Vejay.process.Process;
    class EventProcess extends Process implements IProcess {
        private _msg;
        constructor();
        readonly isRun: Boolean;
        complete(): void;
        addEvent(name: string, e: Event): void;
        clear(): void;
        process(): void;
    }
}
declare module Vejay.event {
    class MouseEvent {
        private _model;
        private readonly _stage;
        static TouchNum: number;
        constructor();
        init(): void;
        private onTouchStart(callback);
        private isAdd(touch);
        private onTouchMove(callback);
        private onTouchEnd(callback);
        private static isRemoving(id, touches);
        private onTouchCancel(callback);
        private searchTarget(parent, x, y);
    }
}
declare module Vejay.manager {
    class FrameManager {
        static readonly REAL_TIME: number;
        static readonly NORMAL: number;
        static readonly IDLE: number;
        static frameRate: number;
        private static _deltaTime;
        private static _isInterpolation;
        private static _fps;
        private static _spf;
        private static _processList;
        private static _priorityTime;
        private static _lastFrameTimestamp;
        private static _time;
        private static _currentFrameTime;
        private static _serverTime;
        private static readonly SAMPLE_COUNT;
        private static _frameCount;
        private static _frameScore;
        private static _frameAvgScoreIndex;
        private static _frameAvgScore;
        private static _lastScoreTime;
        static start(): void;
        static add(key: string, process: Function, thisObject: any, priority?: number): void;
        static remove(key: string): void;
        private static onEnterFrame();
        private static process(passedTime, processTime, funRepeatTime);
        private static callbackHandler(callback, passedTime);
        static readonly time: number;
    }
}
declare module Vejay {
    interface IProcess {
        isRun: Boolean;
        process(): void;
        complete(): void;
    }
}
declare module Vejay {
    class Listener {
        caller: any;
        method: Function;
        args: Array<any>;
        self: any;
        constructor(caller: any, medthod: Function, args: Array<any>, self: any);
    }
}


(function universalModuleDefinition(root, factory) {
                var f = factory();
                if (root && root["Vejay"]) {
                    return;
                }
                var globalObject = (typeof GameGlobal !== 'undefined') ? GameGlobal : ((typeof window !== 'undefined') ? window : this);
globalObject["Vejay"] = f;
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = f;
    else if(typeof define === 'function' && define.amd)
        define(["Vejay"], factory);
    else if(typeof exports === 'object')
        exports["Vejay"] = f;
    else {
        root["Vejay"] = f;
    }
})(this, function() {
    return Vejay;
});
