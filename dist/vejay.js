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

var Vejay;
(function (Vejay) {
    var utils;
    (function (utils) {
        var math;
        (function (math) {
            let rectanglePool = [];
            class Rectangle {
                constructor(x = 0, y = 0, width = 0, height = 0) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                }
                static release(rect) {
                    if (!rect) {
                        return;
                    }
                    rectanglePool.push(rect);
                }
                static create() {
                    let rect = rectanglePool.pop();
                    if (!rect) {
                        rect = new Rectangle();
                    }
                    return rect;
                }
                get right() {
                    return this.x + this.width;
                }
                set right(value) {
                    this.width = value - this.x;
                }
                get bottom() {
                    return this.y + this.height;
                }
                set bottom(value) {
                    this.height = value - this.y;
                }
                get left() {
                    return this.x;
                }
                set left(value) {
                    this.width += this.x - value;
                    this.x = value;
                }
                get top() {
                    return this.y;
                }
                set top(value) {
                    this.height += this.y - value;
                    this.y = value;
                }
                get topLeft() {
                    return new math.Point(this.left, this.top);
                }
                set topLeft(value) {
                    this.top = value.y;
                    this.left = value.x;
                }
                get bottomRight() {
                    return new math.Point(this.right, this.bottom);
                }
                set bottomRight(value) {
                    this.bottom = value.y;
                    this.right = value.x;
                }
                copyFrom(sourceRect) {
                    this.x = sourceRect.x;
                    this.y = sourceRect.y;
                    this.width = sourceRect.width;
                    this.height = sourceRect.height;
                    return this;
                }
                setTo(x, y, width, height) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    return this;
                }
                contains(x, y) {
                    return this.x <= x &&
                        this.x + this.width >= x &&
                        this.y <= y &&
                        this.y + this.height >= y;
                }
                intersection(toIntersect) {
                    return this.clone().$intersectInPlace(toIntersect);
                }
                inflate(dx, dy) {
                    this.x -= dx;
                    this.width += 2 * dx;
                    this.y -= dy;
                    this.height += 2 * dy;
                }
                $intersectInPlace(clipRect) {
                    let x0 = this.x;
                    let y0 = this.y;
                    let x1 = clipRect.x;
                    let y1 = clipRect.y;
                    let l = Math.max(x0, x1);
                    let r = Math.min(x0 + this.width, x1 + clipRect.width);
                    if (l <= r) {
                        let t = Math.max(y0, y1);
                        let b = Math.min(y0 + this.height, y1 + clipRect.height);
                        if (t <= b) {
                            this.setTo(l, t, r - l, b - t);
                            return this;
                        }
                    }
                    this.setEmpty();
                    return this;
                }
                intersects(toIntersect) {
                    return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
                        && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
                }
                isEmpty() {
                    return this.width <= 0 || this.height <= 0;
                }
                setEmpty() {
                    this.x = 0;
                    this.y = 0;
                    this.width = 0;
                    this.height = 0;
                }
                clone() {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                }
                containsPoint(point) {
                    if (this.x <= point.x
                        && this.x + this.width > point.x
                        && this.y <= point.y
                        && this.y + this.height > point.y) {
                        return true;
                    }
                    return false;
                }
                containsRect(rect) {
                    let r1 = rect.x + rect.width;
                    let b1 = rect.y + rect.height;
                    let r2 = this.x + this.width;
                    let b2 = this.y + this.height;
                    return (rect.x >= this.x) && (rect.x < r2) && (rect.y >= this.y) && (rect.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
                }
                isIntersectRect(rect) {
                    return (rect.x >= this.x && rect.x <= this.right) || (rect.y >= this.y && rect.y <= this.bottom)
                        || (rect.right >= this.x && rect.right <= this.right) || (rect.bottom >= this.y && rect.bottom <= this.bottom);
                }
                equals(toCompare) {
                    if (this === toCompare) {
                        return true;
                    }
                    return this.x === toCompare.x && this.y === toCompare.y
                        && this.width === toCompare.width && this.height === toCompare.height;
                }
                inflatePoint(point) {
                    this.inflate(point.x, point.y);
                }
                offset(dx, dy) {
                    this.x += dx;
                    this.y += dy;
                }
                offsetPoint(point) {
                    this.offset(point.x, point.y);
                }
                toString() {
                    return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
                }
                union(toUnion) {
                    let result = this.clone();
                    if (toUnion.isEmpty()) {
                        return result;
                    }
                    if (result.isEmpty()) {
                        result.copyFrom(toUnion);
                        return result;
                    }
                    let l = Math.min(result.x, toUnion.x);
                    let t = Math.min(result.y, toUnion.y);
                    result.setTo(l, t, Math.max(result.right, toUnion.right) - l, Math.max(result.bottom, toUnion.bottom) - t);
                    return result;
                }
                $getBaseWidth(angle) {
                    let u = Math.abs(Math.cos(angle));
                    let v = Math.abs(Math.sin(angle));
                    return u * this.width + v * this.height;
                }
                $getBaseHeight(angle) {
                    let u = Math.abs(Math.cos(angle));
                    let v = Math.abs(Math.sin(angle));
                    return v * this.width + u * this.height;
                }
            }
            math.Rectangle = Rectangle;
            math.$TempRectangle = new Rectangle();
        })(math = utils.math || (utils.math = {}));
    })(utils = Vejay.utils || (Vejay.utils = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var utils;
    (function (utils) {
        var math;
        (function (math) {
            class NumberUtils {
                static getRand(min, max) {
                    var random = Math.random();
                    return min + (max - min) * random;
                }
                static getIntRand(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                static roundN(value, n = 2) {
                    var base = Math.pow(10, n);
                    return Math.round(value * base) / base;
                }
                static get newGuid() {
                    this.num += 1;
                    if (this.num === 100) {
                        this.num = 0;
                    }
                    return Date.now() + this.num.toString();
                }
                static getAngle(beginX, beginY, endX, endY) {
                    let offsetY = endY - beginY;
                    let offsetX = endX - beginX;
                    var radian = Math.atan2(offsetY, offsetX);
                    let angle = radian * this.Rad2Deg;
                    return angle;
                }
                static isINSector(range, degree, x1, y1, x2, y2) {
                    let diff = range / 2;
                    let d1 = degree - diff;
                    let d2 = degree + diff;
                    let _degree = NumberUtils.getAngle(x1, y1, x2, y2);
                    if (d2 > d1 && _degree >= d1 && _degree <= d2) {
                        return true;
                    }
                    else if (d1 > d2 && (_degree >= d1 || _degree <= d2)) {
                        return true;
                    }
                    return false;
                }
                static getDistance(x1, y1, x2, y2) {
                    var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                    return Math.sqrt(distance);
                }
                static isInRange(x, y, rectangle) {
                    if (x > rectangle.x && y > rectangle.y && x < rectangle.x + rectangle.width && y < rectangle.y + rectangle.height) {
                        return true;
                    }
                    return false;
                }
                static getAnglePoint(beginX, beginY, angle, distance) {
                    var radian = angle * Math.PI / 180;
                    var rx = beginX + Math.sin(radian) * distance;
                    var ry = beginY - Math.cos(radian) * distance;
                    var r = new math.Point(rx, ry);
                    return r;
                }
                static getNearestPoint(beginX, beginY, endX, endY, distance) {
                    var r = new math.Point();
                    var q = this.getDistance(beginX, beginY, endX, endY);
                    if (q < distance) {
                        r.setTo(endX - beginX, endY - beginY);
                    }
                    else {
                        var angle = this.getAngle(beginX, beginY, endX, endY) + 90;
                        var radian = angle * Math.PI / 180;
                        var rx = Math.sin(radian) * distance;
                        var ry = -Math.cos(radian) * distance;
                        r.setTo(rx, ry);
                    }
                    return r;
                }
                static get8Direction(degree) {
                    if (degree >= -45 && degree < 45) {
                        return 6;
                    }
                    else if (degree >= 45 && degree < 135) {
                        return 2;
                    }
                    else if (degree >= 135 || degree < -135) {
                        return 4;
                    }
                    else if (degree >= -135 && degree < -45) {
                        return 8;
                    }
                }
                static get8Direction2(beginX, beginY, endX, endY) {
                    let degree = this.getAngle(beginX, beginY, endX, endY);
                    if (degree >= -45 && degree < 45) {
                        return 6;
                    }
                    else if (degree >= 45 && degree < 135) {
                        return 2;
                    }
                    else if (degree >= 135 || degree < -135) {
                        return 4;
                    }
                    else if (degree >= -135 && degree < -45) {
                        return 8;
                    }
                }
            }
            NumberUtils.TWO_PI = Math.PI * 2.0;
            NumberUtils.Deg2Rad = Math.PI / 180;
            NumberUtils.Rad2Deg = 180 / Math.PI;
            NumberUtils.num = 0;
            math.NumberUtils = NumberUtils;
        })(math = utils.math || (utils.math = {}));
    })(utils = Vejay.utils || (Vejay.utils = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var utils;
    (function (utils) {
        var math;
        (function (math) {
            let PI = Math.PI;
            let TwoPI = PI * 2;
            let DEG_TO_RAD = PI / 180;
            let matrixPool = [];
            class Matrix {
                constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
                    this.a = a;
                    this.b = b;
                    this.c = c;
                    this.d = d;
                    this.tx = tx;
                    this.ty = ty;
                }
                static release(matrix) {
                    if (!matrix) {
                        return;
                    }
                    matrixPool.push(matrix);
                }
                static create() {
                    let matrix = matrixPool.pop();
                    if (!matrix) {
                        matrix = new Matrix();
                    }
                    return matrix;
                }
                clone() {
                    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
                }
                concat(other) {
                    let a = this.a * other.a;
                    let b = 0.0;
                    let c = 0.0;
                    let d = this.d * other.d;
                    let tx = this.tx * other.a + other.tx;
                    let ty = this.ty * other.d + other.ty;
                    if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                        a += this.b * other.c;
                        d += this.c * other.b;
                        b += this.a * other.b + this.b * other.d;
                        c += this.c * other.a + this.d * other.c;
                        tx += this.ty * other.c;
                        ty += this.tx * other.b;
                    }
                    this.a = a;
                    this.b = b;
                    this.c = c;
                    this.d = d;
                    this.tx = tx;
                    this.ty = ty;
                }
                copyFrom(other) {
                    this.a = other.a;
                    this.b = other.b;
                    this.c = other.c;
                    this.d = other.d;
                    this.tx = other.tx;
                    this.ty = other.ty;
                    return this;
                }
                identity() {
                    this.a = this.d = 1;
                    this.b = this.c = this.tx = this.ty = 0;
                }
                invert() {
                    this.$invertInto(this);
                }
                $invertInto(target) {
                    let a = this.a;
                    let b = this.b;
                    let c = this.c;
                    let d = this.d;
                    let tx = this.tx;
                    let ty = this.ty;
                    if (b == 0 && c == 0) {
                        target.b = target.c = 0;
                        if (a == 0 || d == 0) {
                            target.a = target.d = target.tx = target.ty = 0;
                        }
                        else {
                            a = target.a = 1 / a;
                            d = target.d = 1 / d;
                            target.tx = -a * tx;
                            target.ty = -d * ty;
                        }
                        return;
                    }
                    let determinant = a * d - b * c;
                    if (determinant == 0) {
                        target.identity();
                        return;
                    }
                    determinant = 1 / determinant;
                    let k = target.a = d * determinant;
                    b = target.b = -b * determinant;
                    c = target.c = -c * determinant;
                    d = target.d = a * determinant;
                    target.tx = -(k * tx + c * ty);
                    target.ty = -(b * tx + d * ty);
                }
                rotate(angle) {
                    angle = +angle;
                    if (angle !== 0) {
                        angle = angle / DEG_TO_RAD;
                        let u = Math.cos(angle);
                        let v = Math.sin(angle);
                        let ta = this.a;
                        let tb = this.b;
                        let tc = this.c;
                        let td = this.d;
                        let ttx = this.tx;
                        let tty = this.ty;
                        this.a = ta * u - tb * v;
                        this.b = ta * v + tb * u;
                        this.c = tc * u - td * v;
                        this.d = tc * v + td * u;
                        this.tx = ttx * u - tty * v;
                        this.ty = ttx * v + tty * u;
                    }
                }
                scale(sx, sy) {
                    if (sx !== 1) {
                        this.a *= sx;
                        this.c *= sx;
                        this.tx *= sx;
                    }
                    if (sy !== 1) {
                        this.b *= sy;
                        this.d *= sy;
                        this.ty *= sy;
                    }
                }
                setTo(a, b, c, d, tx, ty) {
                    this.a = a;
                    this.b = b;
                    this.c = c;
                    this.d = d;
                    this.tx = tx;
                    this.ty = ty;
                    return this;
                }
                translate(dx, dy) {
                    this.tx += dx;
                    this.ty += dy;
                }
                equals(other) {
                    return this.a == other.a && this.b == other.b &&
                        this.c == other.c && this.d == other.d &&
                        this.tx == other.tx && this.ty == other.ty;
                }
                prepend(a, b, c, d, tx, ty) {
                    let tx1 = this.tx;
                    if (a != 1 || b != 0 || c != 0 || d != 1) {
                        let a1 = this.a;
                        let c1 = this.c;
                        this.a = a1 * a + this.b * c;
                        this.b = a1 * b + this.b * d;
                        this.c = c1 * a + this.d * c;
                        this.d = c1 * b + this.d * d;
                    }
                    this.tx = tx1 * a + this.ty * c + tx;
                    this.ty = tx1 * b + this.ty * d + ty;
                    return this;
                }
                append(a, b, c, d, tx, ty) {
                    let a1 = this.a;
                    let b1 = this.b;
                    let c1 = this.c;
                    let d1 = this.d;
                    if (a != 1 || b != 0 || c != 0 || d != 1) {
                        this.a = a * a1 + b * c1;
                        this.b = a * b1 + b * d1;
                        this.c = c * a1 + d * c1;
                        this.d = c * b1 + d * d1;
                    }
                    this.tx = tx * a1 + ty * c1 + this.tx;
                    this.ty = tx * b1 + ty * d1 + this.ty;
                    return this;
                }
                toString() {
                    return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
                }
                getDeterminant() {
                    return this.a * this.d - this.b * this.c;
                }
                $getScaleX() {
                    let m = this;
                    if (m.a == 1 && m.b == 0) {
                        return 1;
                    }
                    let result = Math.sqrt(m.a * m.a + m.b * m.b);
                    return this.getDeterminant() < 0 ? -result : result;
                }
                $getScaleY() {
                    let m = this;
                    if (m.c == 0 && m.d == 1) {
                        return 1;
                    }
                    let result = Math.sqrt(m.c * m.c + m.d * m.d);
                    return this.getDeterminant() < 0 ? -result : result;
                }
                $getSkewX() {
                    return Math.atan2(this.d, this.c) - (PI / 2);
                }
                $getSkewY() {
                    return Math.atan2(this.b, this.a);
                }
            }
            math.Matrix = Matrix;
            math.$TempMatrix = new Matrix();
        })(math = utils.math || (utils.math = {}));
    })(utils = Vejay.utils || (Vejay.utils = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var utils;
    (function (utils) {
        var math;
        (function (math) {
            let pointPool = [];
            let DEG_TO_RAD = Math.PI / 180;
            class Point {
                constructor(x = 0, y = 0) {
                    this.x = x;
                    this.y = y;
                }
                static release(point) {
                    if (!point) {
                        return;
                    }
                    pointPool.push(point);
                }
                static create(x, y) {
                    let point = pointPool.pop();
                    if (!point) {
                        point = new Point();
                    }
                    return point.setTo(x, y);
                }
                get length() {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }
                setTo(x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
                }
                clone() {
                    return new Point(this.x, this.y);
                }
                equals(toCompare) {
                    return this.x == toCompare.x && this.y == toCompare.y;
                }
                static distance(p1, p2) {
                    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
                }
                copyFrom(sourcePoint) {
                    this.x = sourcePoint.x;
                    this.y = sourcePoint.y;
                }
                add(v) {
                    return new Point(this.x + v.x, this.y + v.y);
                }
                static interpolate(pt1, pt2, f) {
                    let f1 = 1 - f;
                    return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
                }
                normalize(thickness) {
                    if (this.x != 0 || this.y != 0) {
                        let relativeThickness = thickness / this.length;
                        this.x *= relativeThickness;
                        this.y *= relativeThickness;
                    }
                }
                offset(dx, dy) {
                    this.x += dx;
                    this.y += dy;
                }
                static polar(len, angle) {
                    return new Point(len * Math.cos(angle / DEG_TO_RAD), len * Math.sin(angle / DEG_TO_RAD));
                }
                subtract(v) {
                    return new Point(this.x - v.x, this.y - v.y);
                }
                toString() {
                    return "(x=" + this.x + ", y=" + this.y + ")";
                }
            }
            math.Point = Point;
            math.$TempPoint = new Point();
        })(math = utils.math || (utils.math = {}));
    })(utils = Vejay.utils || (Vejay.utils = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var process;
    (function (process) {
        class MsgEvent {
            static clear() {
                MsgEvent._eventList = {};
            }
            static addEvent(event, param = null) {
                MsgEvent._eventList[event] = param;
            }
            static addEventList(event, param) {
                var list = MsgEvent._eventList[event] === undefined ? [] : MsgEvent._eventList[event];
                if (list.indexOf(param) === -1)
                    list.push(param);
                MsgEvent._eventList[event] = list;
                if (list.length > 300)
                    console.error('事件没删除   ' + event);
            }
            static spliceEvent(event, guid) {
                var list = MsgEvent._eventList[event];
                if (list == null)
                    return;
                var index = list.indexOf(guid);
                if (index != -1)
                    list.splice(index, 1);
                if (list.length == 0)
                    MsgEvent.removeEvent(event);
            }
            static hasEvent(type) {
                return type in MsgEvent._eventList;
            }
            static removeEvent(type) {
                delete MsgEvent._eventList[type];
            }
            static getParam(type) {
                return MsgEvent._eventList[type];
            }
            static get eventList() {
                return MsgEvent._eventList;
            }
        }
        MsgEvent._eventList = {};
        process.MsgEvent = MsgEvent;
    })(process = Vejay.process || (Vejay.process = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var process;
    (function (process) {
        var MsgEvent = Vejay.process.MsgEvent;
        class Process {
            constructor(event) {
                this._event = event;
            }
            get isRun() {
                return MsgEvent.hasEvent(this._event);
            }
            process() {
            }
            complete() {
                MsgEvent.removeEvent(this._event);
            }
            get getParam() {
                return MsgEvent.getParam(this._event);
            }
            get getList() {
                return MsgEvent.getParam(this._event);
            }
        }
        process.Process = Process;
    })(process = Vejay.process || (Vejay.process = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var global;
    (function (global) {
        class GlobalData {
        }
        GlobalData.CtxType = 0;
        global.GlobalData = GlobalData;
    })(global = Vejay.global || (Vejay.global = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var core;
    (function (core) {
        var base;
        (function (base) {
            class EventDispatcher {
                on(name, caller, method, args = null) {
                    var listeners = EventDispatcher._list[name];
                    var listener;
                    if (!listeners) {
                        listeners = [];
                        EventDispatcher._list[name] = listeners;
                    }
                    for (var i = 0; i < listeners.length; i++) {
                        listener = listeners[i];
                        if (caller === listener.caller && method === listener.method) {
                            return;
                        }
                    }
                    listeners.push(new Vejay.Listener(caller, method, args, this));
                }
                off(name, caller, method) {
                    var listeners = EventDispatcher._list[name];
                    var listener;
                    for (var i = 0; i < listeners.length; i++) {
                        listener = listeners[i];
                        if (caller === listener.caller && method === listener.method) {
                            listeners.splice(i, 1);
                            return;
                        }
                    }
                }
                hasListen(name) {
                    var listeners = EventDispatcher._list[name];
                    if (!listeners) {
                        return false;
                    }
                    for (var i = 0; i < listeners.length; i++) {
                        if (listeners[i].self === this) {
                            return true;
                        }
                    }
                    return false;
                }
                static getListeners(name) {
                    return EventDispatcher._list[name];
                }
                static offAll(name) {
                    delete EventDispatcher._list[name];
                }
                sendEvent(name, data) {
                    base.SingletonFactory.getInstance(Vejay.event.EventProcess).addEvent(name, data);
                }
                static dispatch(name, event, target = null) {
                    var listeners = this._list[name];
                    if (!listeners) {
                        return;
                    }
                    var listener;
                    var args;
                    for (var i = 0; i < listeners.length; i++) {
                        listener = listeners[i];
                        if (!target || listener.self === target) {
                            if (listener.args instanceof Array) {
                                args = listener.args.slice(0);
                                args.unshift(event);
                            }
                            else if (event instanceof Vejay.event.Event) {
                                args = [event];
                            }
                            listener.method.apply(listener.caller, args);
                        }
                    }
                }
            }
            EventDispatcher._list = {};
            base.EventDispatcher = EventDispatcher;
        })(base = core.base || (core.base = {}));
    })(core = Vejay.core || (Vejay.core = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var core;
    (function (core) {
        var base;
        (function (base) {
            class SingletonFactory {
                static getInstance(clazz) {
                    var inst;
                    for (var i = 0; i < this._factory.length; i++) {
                        inst = this._factory[i];
                        if (inst.constructor === clazz) {
                            return inst;
                        }
                    }
                    inst = new clazz();
                    this._factory.push(inst);
                    return inst;
                }
            }
            SingletonFactory._factory = [];
            base.SingletonFactory = SingletonFactory;
        })(base = core.base || (core.base = {}));
    })(core = Vejay.core || (Vejay.core = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var core;
    (function (core) {
        var GlobalData = Vejay.global.GlobalData;
        class Font {
        }
        core.Font = Font;
        class FontCanvas extends Font {
            setFont(str) {
                var ctx = GlobalData.Ctx2d;
                ctx.font = str;
                ctx.save();
            }
        }
        core.FontCanvas = FontCanvas;
        class FontWebGL extends Font {
        }
        core.FontWebGL = FontWebGL;
    })(core = Vejay.core || (Vejay.core = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var Rectangle = Vejay.utils.math.Rectangle;
        var EventDispatcher = Vejay.core.base.EventDispatcher;
        class DisplayObject extends EventDispatcher {
            constructor() {
                super();
                this._x = 0;
                this._y = 0;
                this.width = 0;
                this.height = 0;
                this._scaleX = 1;
                this._scaleY = 1;
                this.pivotX = 0;
                this.pivotY = 0;
                this._rotation = 0;
                this.rotationChange = false;
                this.visible = true;
                this._viewport = new Rectangle();
            }
            dispose() {
                this.parent.removeChild(this);
                this.parent = null;
                this._viewport = null;
            }
            get x() {
                return this._x;
            }
            set x(value) {
                if (this._x === value) {
                    return;
                }
                this._x = value;
                this.posChange = true;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                if (this._y === value) {
                    return;
                }
                this._y = value;
                this.posChange = true;
            }
            pos(x, y) {
                if (this._x === x && this._y === y) {
                    return;
                }
                this._x = x;
                this._y = y;
                this.posChange = true;
            }
            get scaleY() {
                return this._scaleY;
            }
            set scaleY(value) {
                if (this._scaleY === value) {
                    return;
                }
                this._scaleY = value;
                this.scaleChange = true;
            }
            get scaleX() {
                return this._scaleX;
            }
            set scaleX(value) {
                if (this._scaleX === value) {
                    return;
                }
                this._scaleX = value;
                this.scaleChange = true;
            }
            scale(scaleX, scaleY) {
                if (this._scaleX === scaleX && this._scaleY === scaleY) {
                    return;
                }
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this.scaleChange = true;
            }
            get rotation() {
                return this._rotation;
            }
            set rotation(value) {
                if (this._rotation === value) {
                    return;
                }
                this._rotation = value;
                this.rotationChange = true;
            }
            get viewport() {
                return this._viewport;
            }
            render(parentX, parentY) {
            }
            get asImage() {
                return (this instanceof Vejay.display.component.Image) ? this : null;
            }
            get asSprite() {
                return (this instanceof Vejay.display.Sprite) ? this : null;
            }
        }
        display.DisplayObject = DisplayObject;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var GlobalData = Vejay.global.GlobalData;
        class DisplayObjectContainer extends display.DisplayObject {
            constructor() {
                super();
                this._children = [];
            }
            dispose() {
                for (var i = 0; i < this._children.length; i++) {
                    this._children[i].dispose();
                }
                this._children = null;
                super.dispose();
            }
            get numChildren() {
                return this._children.length;
            }
            get children() {
                return this._children;
            }
            addChild(child) {
                child.parent = this;
                this._children.push(child);
            }
            removeChild(child) {
                var index = this.parent.getIndex(child);
                this.parent.removeChildAt(index);
            }
            removeChildAt(index) {
                if (index >= 0 && index < this._children.length) {
                    var child = this._children[index];
                    child.parent = null;
                    this._children.splice(index, 1);
                    return child;
                }
                else {
                    throw new RangeError('Invalid child index');
                }
            }
            getIndex(child) {
                return this._children.indexOf(child);
            }
            getChild(index) {
                return this._children[index];
            }
            removeAll() {
                this._children.length = 0;
            }
            removeSelf() {
                this.parent.removeChild(this);
            }
            renderSelf() {
            }
            render(parentX, parentY) {
                if (!this.visible) {
                    return;
                }
                var sWidth = this.width * Math.abs(this.scaleX);
                var sHeight = this.height * Math.abs(this.scaleY);
                var sX = parentX + this.x - this.pivotX * sWidth;
                var sY = parentY + this.y - this.pivotY * sHeight;
                if (this.scaleX < 0) {
                    sX += sWidth;
                }
                if (this.scaleY < 0) {
                    sY += sHeight;
                }
                this._viewport.setTo(sX, sY, sWidth, sHeight);
                var parentViewport = this.parent ? this.parent.viewport : display.Stage.viewport;
                if (!parentViewport.isIntersectRect(this._viewport)) {
                    return;
                }
                var ctx = GlobalData.Ctx2d;
                this.setRotation(ctx, parentX + this.x, parentY + this.y);
                this.renderSelf();
                ctx.restore();
                let len = this.children.length;
                for (let index = 0; index < len; index++) {
                    var element = this.children[index];
                    element.render(this.x + parentX, this.y + parentY);
                }
            }
            setRotation(ctx, x, y) {
                if (this.rotationChange) {
                    var px = x * 0.5;
                    var py = y * 0.5;
                    var diffX = px - px * Math.cos(this.rotation + 45);
                    var diffY = py - py * Math.sin(this.rotation + 45);
                    ctx.translate(diffX, diffY);
                    ctx.rotate(this.rotation);
                }
            }
        }
        display.DisplayObjectContainer = DisplayObjectContainer;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        class Sprite extends display.DisplayObjectContainer {
            constructor() {
                super();
                this.mouseEnable = false;
                this.mouseThrough = false;
            }
            dispose() {
                super.dispose();
            }
            mouseOpen(value) {
                this.mouseEnable = this.mouseThrough = value;
            }
        }
        display.Sprite = Sprite;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var component;
        (function (component) {
            class Component extends display.Sprite {
                constructor() {
                    super();
                }
                dispose() {
                    super.dispose();
                }
            }
            component.Component = Component;
        })(component = display.component || (display.component = {}));
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var Rectangle = Vejay.utils.math.Rectangle;
        var GlobalData = Vejay.global.GlobalData;
        class Stage extends display.Sprite {
            constructor() {
                super();
                this.mouseOpen(true);
                this.x = (GlobalData.ScreenWidth - GlobalData.StageWidth) * 0.5;
                this.y = (GlobalData.ScreenHeight - GlobalData.StageHeight) * 0.5;
                this.width = GlobalData.StageWidth;
                this.height = GlobalData.StageHeight;
                Stage.viewport = new Rectangle(this.x, this.y, this.width, this.height);
            }
            set bgColor(color) {
                this._bgColor = color;
                var ctx = GlobalData.Ctx2d;
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, this.width, this.height);
            }
            renderSelf() {
                var ctx = GlobalData.Ctx2d;
                if (this._bgColor) {
                    ctx.fillStyle = this._bgColor;
                    ctx.fillRect(0, 0, this.width, this.height);
                }
            }
        }
        display.Stage = Stage;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var component;
        (function (component) {
            var GlobalData = Vejay.global.GlobalData;
            class Image extends component.Component {
                constructor(imgSrc) {
                    super();
                    this._img = wx.createImage();
                    this._img.src = imgSrc;
                    this._img.onload = this.onLoad;
                    this._img.onerror = this.onError;
                }
                dispose() {
                    this._img = null;
                    super.dispose();
                }
                skin(src) {
                }
                onLoad() {
                    this.width = this.width === undefined ? this._img.width : this.width;
                    this.height = this.height === undefined ? this._img.height : this.height;
                }
                onError() {
                }
                renderSelf() {
                    var viewport = this._viewport;
                    var parentViewport = this.parent.viewport;
                    if (parentViewport.containsRect(viewport)) {
                        this.drawImage(0, 0, this.width, this.height, viewport.x, viewport.y, viewport.width, viewport.height);
                        return;
                    }
                    let sx, sy, sWidth, sHeight;
                    let dx, dy, dWidth, dHeight;
                    if (viewport.left < parentViewport.left) {
                        sx = parentViewport.left - viewport.left;
                        dx = parentViewport.left;
                        sWidth = dWidth = viewport.right - parentViewport.left;
                    }
                    else {
                        sx = 0;
                        dx = viewport.x;
                        sWidth = dWidth = viewport.width;
                    }
                    if (viewport.top < parentViewport.top) {
                        sy = parentViewport.top - viewport.top;
                        dy = parentViewport.top;
                        sHeight = dHeight = viewport.bottom - parentViewport.top;
                    }
                    else {
                        sy = 0;
                        dy = viewport.y;
                        sHeight = dHeight = viewport.height;
                    }
                    if (viewport.right > parentViewport.right) {
                        sWidth = dWidth = parentViewport.right - viewport.left;
                    }
                    if (viewport.bottom > parentViewport.bottom) {
                        sHeight = dHeight = parentViewport.bottom - viewport.top;
                    }
                    this.drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                }
                drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
                    var ctx = GlobalData.Ctx2d;
                    ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                }
            }
            component.Image = Image;
        })(component = display.component || (display.component = {}));
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var SingletonFactory = Vejay.core.base.SingletonFactory;
var loader;
var Vejay;
(function (Vejay) {
    var GlobalData = Vejay.global.GlobalData;
    function init(stageW, stageH, ScreenW, ScreenH) {
        GlobalData.StageWidth = stageW;
        GlobalData.StageHeight = stageH;
        GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
        GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
        Vejay.Init.initContextRender();
        Vejay.stage = SingletonFactory.getInstance(Vejay.display.Stage);
        Vejay.Init.initProcess();
        Vejay.Init.loop();
    }
    Vejay.init = init;
    class Init {
        static initProcess() {
            this._processes.push(new Vejay.event.EventProcess());
            this._processes.push(new Vejay.display.DisplayProcess());
        }
        static initContextRender() {
            var ctx = canvas.getContext("2d");
            GlobalData.Ctx2d = ctx;
            GlobalData.CtxType = 1;
        }
        static process() {
            let len = this._processes.length;
            for (let i = 0; i < len; i++) {
                let p = this._processes[i];
                if (!p.isRun)
                    continue;
                p.process();
                p.complete();
            }
        }
        static loop() {
            this.process();
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    Init._processes = [];
    Vejay.Init = Init;
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var core;
    (function (core) {
        class Vo {
            static copy(from, to) {
                for (var propName in from) {
                    to[propName] = from[propName];
                }
                return to;
            }
            clone(clazz) {
                return Vo.copy(this, new clazz());
            }
        }
        core.Vo = Vo;
    })(core = Vejay.core || (Vejay.core = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var Process = Vejay.process.Process;
        var GlobalData = Vejay.global.GlobalData;
        class DisplayProcess extends Process {
            constructor() {
                super("DisplayProcess");
            }
            get isRun() {
                return true;
            }
            complete() {
            }
            process() {
                GlobalData.Ctx2d.clearRect(0, 0, GlobalData.StageWidth, GlobalData.ScreenHeight);
                SingletonFactory.getInstance(Vejay.display.Stage).render(0, 0);
            }
        }
        display.DisplayProcess = DisplayProcess;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var display;
    (function (display) {
        var GlobalData = Vejay.global.GlobalData;
        class RenderContext {
            constructor() {
                if (RenderContext._instance) {
                    console.error("get instance instead of new");
                    return;
                }
                this.ctx0 = GlobalData.WebGl;
                this.ctx1 = GlobalData.Ctx2d;
            }
            static get instance() {
                if (!this._instance) {
                    this._instance = new RenderContext();
                }
                return this._instance;
            }
            scale(x, y) {
            }
        }
        display.RenderContext = RenderContext;
    })(display = Vejay.display || (Vejay.display = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var event;
    (function (event) {
        var Vo = Vejay.core.Vo;
        class Targets extends Vo {
            constructor(currentTarget, target) {
                super();
                this.currentTarget = currentTarget;
                this.target = target;
            }
        }
        event.Targets = Targets;
    })(event = Vejay.event || (Vejay.event = {}));
})(Vejay || (Vejay = {}));
(function (Vejay) {
    var event;
    (function (event) {
        class Event extends event.Targets {
            constructor(touch, currentTarget, target) {
                super(currentTarget, target);
                this.touch = touch;
            }
            static isMouseEvent(name) {
                if (this.MOUSE_EVENT.indexOf(name) > -1) {
                    return true;
                }
                return false;
            }
        }
        Event.MOUSE_EVENT = ["v_mouse_click", "v_mouse_down", "v_mouse_up", "v_mouse_move", "v_mouse_out"];
        Event.MOUSE_CLICK = Event.MOUSE_EVENT[0];
        Event.MOUSE_DOWN = Event.MOUSE_EVENT[1];
        Event.MOUSE_UP = Event.MOUSE_EVENT[2];
        Event.MOUSE_MOVE = Event.MOUSE_EVENT[3];
        Event.MOUSE_OUT = Event.MOUSE_EVENT[4];
        event.Event = Event;
    })(event = Vejay.event || (Vejay.event = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var event;
    (function (event_1) {
        class EventModel {
            constructor() {
                this._event = {};
            }
            addEvent(event) {
                this._event[event.touch.identifier] = event;
            }
            getAndRemove(touchId) {
                var target = this._event[touchId];
                if (target) {
                    delete this._event[touchId];
                }
                return target;
            }
            get(touchId) {
                return this._event[touchId];
            }
            remove(touchId) {
                delete this._event[touchId];
            }
            get events() {
                return this._event;
            }
        }
        event_1.EventModel = EventModel;
    })(event = Vejay.event || (Vejay.event = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var event;
    (function (event_2) {
        var EventDispatcher = Vejay.core.base.EventDispatcher;
        var Process = Vejay.process.Process;
        class EventProcess extends Process {
            constructor() {
                super("EventProcess");
                this._msg = [];
                SingletonFactory.getInstance(Vejay.event.MouseEvent).init();
            }
            get isRun() {
                return true;
            }
            complete() {
            }
            addEvent(name, e) {
                this._msg.push([name, e]);
            }
            clear() {
                this._msg.length = 0;
            }
            process() {
                var event;
                while (this._msg.length > 0) {
                    event = this._msg.shift();
                    EventDispatcher.dispatch(event[0], event[1]);
                }
            }
        }
        event_2.EventProcess = EventProcess;
    })(event = Vejay.event || (Vejay.event = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var event;
    (function (event_3) {
        var EventDispatcher = Vejay.core.base.EventDispatcher;
        class MouseEvent {
            constructor() {
                this._stage = SingletonFactory.getInstance(Vejay.display.Stage);
                this._model = SingletonFactory.getInstance(event.EventModel);
            }
            init() {
                wx.onTouchStart(this.onTouchStart.bind(this));
                wx.onTouchMove(this.onTouchMove.bind(this));
                wx.onTouchEnd(this.onTouchEnd.bind(this));
                wx.onTouchCancel(this.onTouchCancel.bind(this));
            }
            onTouchStart(callback) {
                var touches = callback.touches;
                var touch;
                var target;
                var len = Math.min(MouseEvent.TouchNum, touches.length);
                for (var i = 0; i < len; i++) {
                    touch = touches[i];
                    if (this.isAdd(touch)) {
                        var event;
                        target = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                        if (target.currentTarget) {
                            event = new event_3.Event(touch, target.currentTarget, target.target);
                            EventDispatcher.dispatch(event_3.Event.MOUSE_DOWN, event, target.target);
                        }
                        if (Vejay.stage.viewport.contains(touch.clientX, touch.clientY)) {
                            if (!event) {
                                event = new event_3.Event(touch, Vejay.stage, Vejay.stage);
                            }
                            EventDispatcher.dispatch(event_3.Event.MOUSE_DOWN, event, Vejay.stage);
                        }
                        if (event) {
                            this._model.addEvent(event.clone(event_3.Event));
                        }
                    }
                }
            }
            isAdd(touch) {
                for (var touchId in this._model.events) {
                    if (touchId === touch.identifier.toString()) {
                        return false;
                    }
                }
                return true;
            }
            onTouchMove(callback) {
                var touches = callback.touches;
                var len = Math.min(MouseEvent.TouchNum, touches.length);
                var data;
                for (var i = 0; i < len; i++) {
                    var touch = touches[i];
                    data = this._model.get(touch.identifier);
                    if (!data) {
                        return;
                    }
                    if (data.touch.clientX !== touch.clientX || data.touch.clientY !== touch.clientY) {
                        data.touch = touch;
                        var event = new event_3.Event(touch, Vejay.stage, Vejay.stage);
                        if (Vejay.stage.viewport.contains(touch.clientX, touch.clientY)) {
                            EventDispatcher.dispatch(event_3.Event.MOUSE_MOVE, event);
                        }
                        else {
                            EventDispatcher.dispatch(event_3.Event.MOUSE_OUT, event);
                        }
                    }
                }
            }
            onTouchEnd(callback) {
                var touches = callback.touches;
                var targets;
                var touch;
                var event;
                for (var key in this._model.events) {
                    event = this._model.get(key);
                    touch = event.touch;
                    if (MouseEvent.isRemoving(touch.identifier, touches)) {
                        targets = this.searchTarget(this._stage, touch.clientX, touch.clientY);
                        if (targets.currentTarget) {
                            EventDispatcher.dispatch(event_3.Event.MOUSE_UP, event, targets.target);
                            if (event.target === targets.target) {
                                EventDispatcher.dispatch(event_3.Event.MOUSE_CLICK, event, event.target);
                            }
                        }
                        if (Vejay.stage.viewport.contains(touch.clientX, touch.clientY)) {
                            if (!event) {
                                event = new event_3.Event(touch, Vejay.stage, Vejay.stage);
                            }
                            EventDispatcher.dispatch(event_3.Event.MOUSE_UP, event, Vejay.stage);
                            EventDispatcher.dispatch(event_3.Event.MOUSE_CLICK, event, Vejay.stage);
                        }
                        this._model.remove(touch.identifier);
                    }
                }
            }
            static isRemoving(id, touches) {
                for (var i = 0; i < touches.length; i++) {
                    if (id === touches[i].identifier) {
                        return false;
                    }
                }
                return true;
            }
            onTouchCancel(callback) {
                console.log("onTouchCancel" + callback);
                var touches = callback.touches;
                for (var i = 0; i < touches.length; i++) {
                    this._model.remove(touches[i].identifier);
                }
            }
            searchTarget(parent, x, y) {
                var child;
                var currentTarget;
                var target;
                for (var i = parent.numChildren - 1; i >= 0; i--) {
                    child = parent.getChild(i).asSprite;
                    if (child.mouseEnable && child.viewport.contains(x, y)) {
                        target = child;
                        if (child.mouseThrough) {
                            currentTarget = child;
                            this.searchTarget(child, x, y);
                        }
                        break;
                    }
                }
                if (!currentTarget && target) {
                    currentTarget = target;
                }
                return new event_3.Targets(currentTarget, target);
            }
        }
        MouseEvent.TouchNum = 2;
        event_3.MouseEvent = MouseEvent;
    })(event = Vejay.event || (Vejay.event = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    var manager;
    (function (manager) {
        class FrameManager {
            static start() {
                if (FrameManager._fps !== undefined)
                    return;
                FrameManager._fps = 60;
                FrameManager._spf = 1000 / FrameManager._fps;
                const LOWEST = 24;
                for (var i = 0; i < 3; i++) {
                    FrameManager._processList[i] = {};
                    FrameManager._priorityTime[i] = 1000 / (LOWEST - i * LOWEST / 3);
                }
                FrameManager._frameCount = 0;
                FrameManager._lastFrameTimestamp = Date.now();
                window.requestAnimationFrame(FrameManager.onEnterFrame.bind(this));
            }
            static add(key, process, thisObject, priority = FrameManager.NORMAL) {
                if (FrameManager._processList[priority][key] !== undefined)
                    throw new Error("已经注册过process");
                FrameManager._processList[priority][key] = process.bind(thisObject);
            }
            static remove(key) {
                for (var i = 0; i < FrameManager._processList.length; i++) {
                    if (FrameManager._processList[i][key] !== undefined) {
                        delete FrameManager._processList[i][key];
                        break;
                    }
                }
            }
            static onEnterFrame() {
                var now = Date.now();
                var passedTime = now - FrameManager._lastFrameTimestamp;
                FrameManager._time += passedTime * FrameManager.frameRate;
                FrameManager._serverTime += passedTime;
                FrameManager._frameCount++;
                FrameManager.process(passedTime, passedTime, 1);
                FrameManager._currentFrameTime = Date.now() - FrameManager._lastFrameTimestamp;
                FrameManager._lastFrameTimestamp = now;
                window.requestAnimationFrame(FrameManager.onEnterFrame.bind(this));
            }
            static process(passedTime, processTime, funRepeatTime) {
                FrameManager._deltaTime = processTime;
                for (let key in FrameManager._processList[FrameManager.REAL_TIME]) {
                    FrameManager.callbackHandler(FrameManager._processList[FrameManager.REAL_TIME][key], processTime);
                }
                for (var i = FrameManager.NORMAL; i >= FrameManager.IDLE; --i) {
                    if (passedTime > FrameManager._priorityTime[i]) {
                        if (funRepeatTime <= 1)
                            continue;
                    }
                    for (let key in FrameManager._processList[i]) {
                        FrameManager.callbackHandler(FrameManager._processList[i][key], processTime);
                    }
                }
            }
            static callbackHandler(callback, passedTime) {
                if (callback.length == 0)
                    callback();
                else if (callback.length == 1)
                    callback(passedTime);
                else if (callback.length == 2)
                    callback(FrameManager._time, passedTime);
                else
                    throw new Error();
            }
            static get time() {
                return FrameManager._time;
            }
        }
        FrameManager.REAL_TIME = 2;
        FrameManager.NORMAL = 1;
        FrameManager.IDLE = 0;
        FrameManager.frameRate = 1;
        FrameManager._deltaTime = 0;
        FrameManager._isInterpolation = false;
        FrameManager._processList = [];
        FrameManager._priorityTime = [];
        FrameManager._lastFrameTimestamp = 0;
        FrameManager._time = 0.0;
        FrameManager._serverTime = 0;
        FrameManager.SAMPLE_COUNT = 10;
        FrameManager._frameAvgScoreIndex = 0;
        FrameManager._frameAvgScore = [];
        manager.FrameManager = FrameManager;
    })(manager = Vejay.manager || (Vejay.manager = {}));
})(Vejay || (Vejay = {}));
var Vejay;
(function (Vejay) {
    class Listener {
        constructor(caller, medthod, args, self) {
            this.caller = caller;
            this.method = medthod;
            this.args = args;
            this.self = self;
        }
    }
    Vejay.Listener = Listener;
})(Vejay || (Vejay = {}));

//# sourceMappingURL=vejay.js.map


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
