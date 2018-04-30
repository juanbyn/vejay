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

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by cjb on 2018-04-29
 */
var common;
(function (common) {
    var GlobalData = function GlobalData() {
        _classCallCheck(this, GlobalData);
    };

    common.GlobalData = GlobalData;
})(common || (common = {}));
var math;
(function (math) {
    var rectanglePool = [];
    /**
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     */

    var Rectangle = function () {
        function Rectangle() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            _classCallCheck(this, Rectangle);

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        /**
         * 释放一个Rectangle实例到对象池
         */


        _createClass(Rectangle, [{
            key: "copyFrom",

            /**
             * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
             * @param sourceRect 要从中复制数据的 Rectangle 对象。
             */
            value: function copyFrom(sourceRect) {
                this.x = sourceRect.x;
                this.y = sourceRect.y;
                this.width = sourceRect.width;
                this.height = sourceRect.height;
                return this;
            }
            /**
             * 将 Rectangle 的成员设置为指定值
             * @param x 矩形左上角的 x 坐标。
             * @param y 矩形左上角的 y 坐标。
             * @param width 矩形的宽度（以像素为单位）。
             * @param height 矩形的高度（以像素为单位）。
             */

        }, {
            key: "setTo",
            value: function setTo(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                return this;
            }
            /**
             * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
             * @param x 检测点的x轴
             * @param y 检测点的y轴
             * @returns 如果检测点位于矩形内，返回true，否则，返回false
             */

        }, {
            key: "contains",
            value: function contains(x, y) {
                return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
            }
            /**
             * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
             * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
             * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
             * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
             * height 属性均设置为 0 的矩形。
             */

        }, {
            key: "intersection",
            value: function intersection(toIntersect) {
                return this.clone().$intersectInPlace(toIntersect);
            }
            /**
             * 按指定量增加 Rectangle 对象的大小（以像素为单位）
             * 保持 Rectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
             * @param dx Rectangle 对象横向增加的值。
             * @param dy Rectangle 对象纵向增加的值。
             */

        }, {
            key: "inflate",
            value: function inflate(dx, dy) {
                this.x -= dx;
                this.width += 2 * dx;
                this.y -= dy;
                this.height += 2 * dy;
            }
            /**
             * @private
             */

        }, {
            key: "$intersectInPlace",
            value: function $intersectInPlace(clipRect) {
                var x0 = this.x;
                var y0 = this.y;
                var x1 = clipRect.x;
                var y1 = clipRect.y;
                var l = Math.max(x0, x1);
                var r = Math.min(x0 + this.width, x1 + clipRect.width);
                if (l <= r) {
                    var t = Math.max(y0, y1);
                    var b = Math.min(y0 + this.height, y1 + clipRect.height);
                    if (t <= b) {
                        this.setTo(l, t, r - l, b - t);
                        return this;
                    }
                }
                this.setEmpty();
                return this;
            }
            /**
             * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
             * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
             * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
             * @returns 如果两个矩形相交，返回true，否则返回false
             */

        }, {
            key: "intersects",
            value: function intersects(toIntersect) {
                return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
            }
            /**
             * 确定此 Rectangle 对象是否为空。
             * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
             */

        }, {
            key: "isEmpty",
            value: function isEmpty() {
                return this.width <= 0 || this.height <= 0;
            }
            /**
             * 将 Rectangle 对象的所有属性设置为 0。
             */

        }, {
            key: "setEmpty",
            value: function setEmpty() {
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
            }
            /**
             * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
             * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
             */

        }, {
            key: "clone",
            value: function clone() {
                return new Rectangle(this.x, this.y, this.width, this.height);
            }
            /**
             * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
             * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point 包含点对象
             * @returns 如果包含，返回true，否则返回false
             */

        }, {
            key: "containsPoint",
            value: function containsPoint(point) {
                if (this.x <= point.x && this.x + this.width > point.x && this.y <= point.y && this.y + this.height > point.y) {
                    return true;
                }
                return false;
            }
            /**
             * 确定此 Rectangle 对象内是否包含由 rect 参数指定的 Rectangle 对象。
             * 如果一个 Rectangle 对象完全在另一个 Rectangle 的边界内，我们说第二个 Rectangle 包含第一个 Rectangle。
             * @param rect 所检查的 Rectangle 对象
             * @returns 如果此 Rectangle 对象包含您指定的 Rectangle 对象，则返回 true 值，否则返回 false。
             */

        }, {
            key: "containsRect",
            value: function containsRect(rect) {
                var r1 = rect.x + rect.width;
                var b1 = rect.y + rect.height;
                var r2 = this.x + this.width;
                var b2 = this.y + this.height;
                return rect.x >= this.x && rect.x < r2 && rect.y >= this.y && rect.y < b2 && r1 > this.x && r1 <= r2 && b1 > this.y && b1 <= b2;
            }
            /**
             * 确定在 toCompare 参数中指定的对象是否等于此 Rectangle 对象。
             * 此方法将某个对象的 x、y、width 和 height 属性与此 Rectangle 对象所对应的相同属性进行比较。
             * @param toCompare 要与此 Rectangle 对象进行比较的矩形。
             * @returns 如果对象具有与此 Rectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
             */

        }, {
            key: "equals",
            value: function equals(toCompare) {
                if (this === toCompare) {
                    return true;
                }
                return this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height;
            }
            /**
             * 增加 Rectangle 对象的大小。此方法与 Rectangle.inflate() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
             */

        }, {
            key: "inflatePoint",
            value: function inflatePoint(point) {
                this.inflate(point.x, point.y);
            }
            /**
             * 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
             * @param dx 将 Rectangle 对象的 x 值移动此数量。
             * @param dy 将 Rectangle 对象的 t 值移动此数量。
             */

        }, {
            key: "offset",
            value: function offset(dx, dy) {
                this.x += dx;
                this.y += dy;
            }
            /**
             * 将 Point 对象用作参数来调整 Rectangle 对象的位置。此方法与 Rectangle.offset() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point 要用于偏移此 Rectangle 对象的 Point 对象。
             */

        }, {
            key: "offsetPoint",
            value: function offsetPoint(point) {
                this.offset(point.x, point.y);
            }
            /**
             * 生成并返回一个字符串，该字符串列出 Rectangle 对象的水平位置和垂直位置以及高度和宽度。
             * @returns 一个字符串，它列出了 Rectangle 对象的下列各个属性的值：x、y、width 和 height。
             */

        }, {
            key: "toString",
            value: function toString() {
                return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
            }
            /**
             * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
             * @param toUnion 要添加到此 Rectangle 对象的 Rectangle 对象。
             * @returns 充当两个矩形的联合的新 Rectangle 对象。
             */

        }, {
            key: "union",
            value: function union(toUnion) {
                var result = this.clone();
                if (toUnion.isEmpty()) {
                    return result;
                }
                if (result.isEmpty()) {
                    result.copyFrom(toUnion);
                    return result;
                }
                var l = Math.min(result.x, toUnion.x);
                var t = Math.min(result.y, toUnion.y);
                result.setTo(l, t, Math.max(result.right, toUnion.right) - l, Math.max(result.bottom, toUnion.bottom) - t);
                return result;
            }
            /**
             * @private
             */

        }, {
            key: "$getBaseWidth",
            value: function $getBaseWidth(angle) {
                var u = Math.abs(Math.cos(angle));
                var v = Math.abs(Math.sin(angle));
                return u * this.width + v * this.height;
            }
            /**
             * @private
             */

        }, {
            key: "$getBaseHeight",
            value: function $getBaseHeight(angle) {
                var u = Math.abs(Math.cos(angle));
                var v = Math.abs(Math.sin(angle));
                return v * this.width + u * this.height;
            }
        }, {
            key: "right",

            /**
             * x 和 width 属性的和。
             */
            get: function get() {
                return this.x + this.width;
            },
            set: function set(value) {
                this.width = value - this.x;
            }
            /**
             * y 和 height 属性的和。
             */

        }, {
            key: "bottom",
            get: function get() {
                return this.y + this.height;
            },
            set: function set(value) {
                this.height = value - this.y;
            }
            /**
             * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
             * left 属性的值等于 x 属性的值。
             */

        }, {
            key: "left",
            get: function get() {
                return this.x;
            },
            set: function set(value) {
                this.width += this.x - value;
                this.x = value;
            }
            /**
             * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
             * top 属性的值等于 y 属性的值。
             */

        }, {
            key: "top",
            get: function get() {
                return this.y;
            },
            set: function set(value) {
                this.height += this.y - value;
                this.y = value;
            }
            /**
             * 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置。
             */

        }, {
            key: "topLeft",
            get: function get() {
                return new math.Point(this.left, this.top);
            },
            set: function set(value) {
                this.top = value.y;
                this.left = value.x;
            }
            /**
             * 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置。
             */

        }, {
            key: "bottomRight",
            get: function get() {
                return new math.Point(this.right, this.bottom);
            },
            set: function set(value) {
                this.bottom = value.y;
                this.right = value.x;
            }
        }], [{
            key: "release",
            value: function release(rect) {
                if (!rect) {
                    return;
                }
                rectanglePool.push(rect);
            }
            /**
             * 从对象池中取出或创建一个新的Rectangle对象。
             */

        }, {
            key: "create",
            value: function create() {
                var rect = rectanglePool.pop();
                if (!rect) {
                    rect = new Rectangle();
                }
                return rect;
            }
        }]);

        return Rectangle;
    }();

    math.Rectangle = Rectangle;
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    math.$TempRectangle = new Rectangle();
})(math || (math = {}));
var display;
(function (display) {
    var Rectangle = math.Rectangle;

    var DisplayObject = function () {
        function DisplayObject() {
            _classCallCheck(this, DisplayObject);

            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this._viewport = new Rectangle();
        }

        _createClass(DisplayObject, [{
            key: "render",
            value: function render(ctx, x, y) {}
        }]);

        return DisplayObject;
    }();

    display.DisplayObject = DisplayObject;
})(display || (display = {}));
var display;
(function (display) {
    var DisplayObjectContainer = function (_display$DisplayObjec) {
        _inherits(DisplayObjectContainer, _display$DisplayObjec);

        function DisplayObjectContainer() {
            _classCallCheck(this, DisplayObjectContainer);

            var _this = _possibleConstructorReturn(this, (DisplayObjectContainer.__proto__ || Object.getPrototypeOf(DisplayObjectContainer)).call(this));

            _this._children = [];
            return _this;
        }

        _createClass(DisplayObjectContainer, [{
            key: "addChild",
            value: function addChild(child) {
                this._children.push(child);
            }
        }, {
            key: "removeChildAt",
            value: function removeChildAt(index) {
                if (index >= 0 && index < this._children.length) {
                    var child = this._children[index];
                    // child.setParent(null);
                    index = this._children.indexOf(child); // index might have changed by event handler
                    if (index >= 0) this._children.splice(index, 1);
                    // if (dispose) child.dispose();
                    return child;
                } else {
                    throw new RangeError('Invalid child index');
                }
            }
        }, {
            key: "removeChildren",
            value: function removeChildren() {
                this._children.length = 0;
            }
        }, {
            key: "render",
            value: function render(ctx, x, y) {
                var len = this._children.length;
                for (var index = 0; index < len; index++) {
                    var element = this._children[index];
                    element.render(ctx, this.x + x, this.y + y);
                }
            }
        }, {
            key: "numChildren",
            get: function get() {
                return this._children.length;
            }
        }, {
            key: "getChildren",
            get: function get() {
                return this._children;
            }
        }]);

        return DisplayObjectContainer;
    }(display.DisplayObject);

    display.DisplayObjectContainer = DisplayObjectContainer;
})(display || (display = {}));
var display;
(function (display) {
    var DisplayObjectContainer = display.DisplayObjectContainer;
    var Rectangle = math.Rectangle;
    var GlobalData = common.GlobalData;

    var Stage = function (_DisplayObjectContain) {
        _inherits(Stage, _DisplayObjectContain);

        function Stage() {
            _classCallCheck(this, Stage);

            var _this2 = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this));

            if (Stage._instance) {
                throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
            }
            Stage._instance = _this2;
            _this2.x = (GlobalData.screenWidth - GlobalData.stageWidth) * 0.5;
            _this2.y = (GlobalData.screenHeight - GlobalData.stageHeight) * 0.5;
            _this2.width = GlobalData.stageWidth;
            _this2.height = GlobalData.stageHeight;
            Stage.viewport = new Rectangle(_this2.x, _this2.y, _this2.width, _this2.height);
            return _this2;
        }

        _createClass(Stage, null, [{
            key: "inst",
            get: function get() {
                return Stage._instance;
            }
        }]);

        return Stage;
    }(DisplayObjectContainer);

    Stage._instance = new Stage();
    display.Stage = Stage;
})(display || (display = {}));
var display;
(function (display) {
    var Stage = display.Stage;

    var Bitmap = function (_display$DisplayObjec2) {
        _inherits(Bitmap, _display$DisplayObjec2);

        function Bitmap(imgSrc) {
            _classCallCheck(this, Bitmap);

            var _this3 = _possibleConstructorReturn(this, (Bitmap.__proto__ || Object.getPrototypeOf(Bitmap)).call(this));

            _this3._img = new Image();
            _this3._img.src = imgSrc;
            _this3._img.onload = function () {
                _this3.width = _this3.width === undefined ? _this3._img.width : _this3.width;
                _this3.height = _this3.height === undefined ? _this3._img.height : _this3.height;
            };
            return _this3;
        }

        _createClass(Bitmap, [{
            key: "render",
            value: function render(ctx, parentX, parentY) {
                this._viewport.setTo(parentX + this.x, parentY + this.y, this.width, this.height);
                var parentViewport = Stage.viewport;
                if (this._viewport.left > parentViewport.right || this._viewport.right < parentViewport.left || this._viewport.top > parentViewport.bottom || this._viewport.bottom < parentViewport.top) return;
                if (parentViewport.containsRect(this._viewport)) {
                    // ctx.drawImage(this._img, 0, 0, this._viewport.width, this._viewport.height, this._viewport.x, this._viewport.y, this._viewport.width, this._viewport.height);
                    this.drawImage(ctx, 0, 0, this._viewport.width, this._viewport.height, this._viewport.x, this._viewport.y, this._viewport.width, this._viewport.height);
                    return;
                }
                var sx = void 0,
                    sy = void 0,
                    sWidth = void 0,
                    sHeight = void 0;
                var dx = void 0,
                    dy = void 0,
                    dWidth = void 0,
                    dHeight = void 0;
                if (this._viewport.left < parentViewport.left) {
                    sx = parentViewport.left - this._viewport.left;
                    dx = parentViewport.left;
                    sWidth = dWidth = this._viewport.right - parentViewport.left;
                } else {
                    sx = 0;
                    dx = this._viewport.x;
                    sWidth = dWidth = this._viewport.width;
                }
                if (this._viewport.top < parentViewport.top) {
                    sy = parentViewport.top - this._viewport.top;
                    dy = parentViewport.top;
                    sHeight = dHeight = this._viewport.bottom - parentViewport.top;
                } else {
                    sy = 0;
                    dy = this._viewport.y;
                    sHeight = dHeight = this._viewport.height;
                }
                if (this._viewport.right > parentViewport.right) {
                    sWidth = dWidth = parentViewport.right - this._viewport.left;
                }
                if (this._viewport.bottom > parentViewport.bottom) {
                    sHeight = dHeight = parentViewport.bottom - this._viewport.top;
                }
                // ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                this.drawImage(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }, {
            key: "drawImage",
            value: function drawImage(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
                if (this.scaleX !== 1 || this.scaleY !== 1) {
                    ctx.translate(0, dHeight + Stage.viewport.y * 2);
                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    return;
                }
                ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }]);

        return Bitmap;
    }(display.DisplayObject);

    display.Bitmap = Bitmap;
})(display || (display = {}));
var manager;
(function (manager) {
    /**
     * 帧运算管理器
     * 负责管理所有注册对象的enterFrame函数，对每帧一定要计算的和卡的时候可以跳帧的进行区分处理
     * 使用方法FrameManager.add(process);
     *
     * @author caijingxiao
     *
     */
    var FrameManager = function () {
        function FrameManager() {
            _classCallCheck(this, FrameManager);
        }

        _createClass(FrameManager, null, [{
            key: "start",
            value: function start() {
                if (FrameManager._fps !== undefined) return;
                FrameManager._fps = 60;
                FrameManager._spf = 1000 / FrameManager._fps;
                var LOWEST = 24; // 至少保证不低于多少帧数
                for (var i = 0; i < 3; i++) {
                    FrameManager._processList[i] = {};
                    FrameManager._priorityTime[i] = 1000 / (LOWEST - i * LOWEST / 3);
                }
                FrameManager._frameCount = 0;
                FrameManager._lastFrameTimestamp = Date.now();
                window.requestAnimationFrame(FrameManager.onEnterFrame.bind(this));
            }
            /**
             * 注册每帧运行函数
             * 由于使用Dictionary，所以先加入的函数并不一定会先运行
             * @param process 处理函数，函数格式Function(passedTime:int)，passedTime表示上一帧到当前帧所经过的毫秒数
             * @param priority 优先级，默认为FrameManager.NORMAL
             *
             */

        }, {
            key: "add",
            value: function add(key, process, thisObject) {
                var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : FrameManager.NORMAL;

                if (FrameManager._processList[priority][key] !== undefined) throw new Error("已经注册过process");
                FrameManager._processList[priority][key] = process.bind(thisObject);
            }
            /**
             * 移除每帧运行函数
             * @param process 处理函数
             */

        }, {
            key: "remove",
            value: function remove(key) {
                for (var i = 0; i < FrameManager._processList.length; i++) {
                    if (FrameManager._processList[i][key] !== undefined) {
                        delete FrameManager._processList[i][key];
                        break;
                    }
                }
            }
            // 进入帧时候触发事件        

        }, {
            key: "onEnterFrame",
            value: function onEnterFrame() {
                var now = Date.now();
                var passedTime = now - FrameManager._lastFrameTimestamp; // 上一帧到当前帧所经过的时间
                FrameManager._time += passedTime * FrameManager.frameRate;
                FrameManager._serverTime += passedTime;
                FrameManager._frameCount++;
                FrameManager.process(passedTime, passedTime, 1);
                // 经过process后的时间
                FrameManager._currentFrameTime = Date.now() - FrameManager._lastFrameTimestamp;
                FrameManager._lastFrameTimestamp = now;
                window.requestAnimationFrame(FrameManager.onEnterFrame.bind(this));
            }
        }, {
            key: "process",
            value: function process(passedTime, processTime, funRepeatTime) {
                FrameManager._deltaTime = processTime;
                // 实时每帧都运行
                for (var key in FrameManager._processList[FrameManager.REAL_TIME]) {
                    FrameManager.callbackHandler(FrameManager._processList[FrameManager.REAL_TIME][key], processTime);
                }
                for (var i = FrameManager.NORMAL; i >= FrameManager.IDLE; --i) {
                    if (passedTime > FrameManager._priorityTime[i]) // 跳帧处理
                        {
                            if (funRepeatTime <= 1) // funRepeatTime>1 表示帧补偿，帧补偿时不跳帧
                                continue;
                        }
                    for (var _key in FrameManager._processList[i]) {
                        FrameManager.callbackHandler(FrameManager._processList[i][_key], processTime);
                    }
                }
            }
        }, {
            key: "callbackHandler",
            value: function callbackHandler(callback, passedTime) {
                if (callback.length == 0) callback();else if (callback.length == 1) callback(passedTime);else if (callback.length == 2) callback(FrameManager._time, passedTime);else throw new Error();
            }
            /**
             * 启动FrameManager以来经过的毫秒数
             */

        }, {
            key: "time",
            get: function get() {
                return FrameManager._time;
            }
        }]);

        return FrameManager;
    }();

    FrameManager.REAL_TIME = 2;
    FrameManager.NORMAL = 1;
    FrameManager.IDLE = 0;
    FrameManager.frameRate = 1; // 帧速度
    FrameManager._deltaTime = 0; // 表示从上一帧到当前帧时间，以毫秒为单位。
    FrameManager._isInterpolation = false; // 帧补偿中
    FrameManager._processList = []; // 处理函数列表
    FrameManager._priorityTime = []; // 优先级时间，用于跳帧处理
    FrameManager._lastFrameTimestamp = 0; // 上一帧启动 Flash 运行时虚拟计算机以来经过的毫秒数
    FrameManager._time = 0.0; // 启动FrameManager以来经过的毫秒数
    FrameManager._serverTime = 0; // 服务器时间
    // 计算分数
    FrameManager.SAMPLE_COUNT = 10; // 间隔几帧计算帧分数
    FrameManager._frameAvgScoreIndex = 0;
    FrameManager._frameAvgScore = []; // 平均帧分数
    manager.FrameManager = FrameManager;
})(manager || (manager = {}));
var math;
(function (math) {
    var PI = Math.PI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = PI / 180;
    var matrixPool = [];
    /**
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     * @language en_US
     */
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     * @language zh_CN
     */

    var Matrix = function () {
        /**
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function Matrix() {
            var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
            var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

            _classCallCheck(this, Matrix);

            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        /**
         * Releases a matrix instance to the object pool
         * @param matrix matrix that Needs to be recycled
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 释放一个Matrix实例到对象池
         * @param matrix 需要回收的 matrix
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */


        _createClass(Matrix, [{
            key: "clone",

            /**
             * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            value: function clone() {
                return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            }
            /**
             * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical
             * terms, concatenating two matrixes is the same as combining them using matrix multiplication.
             * @param other The matrix to be concatenated to the source matrix.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。在数学术语中，将两个矩阵连接起来与使用矩阵乘法将它们结合起来是相同的。
             * @param other 要连接到源矩阵的矩阵。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "concat",
            value: function concat(other) {
                var a = this.a * other.a;
                var b = 0.0;
                var c = 0.0;
                var d = this.d * other.d;
                var tx = this.tx * other.a + other.tx;
                var ty = this.ty * other.d + other.ty;
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
            /**
             * Copies all of the matrix data from the source Point object into the calling Matrix object.
             * @param other  The Matrix object from which to copy the data.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
             * @param other 要拷贝的目标矩阵
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "copyFrom",
            value: function copyFrom(other) {
                this.a = other.a;
                this.b = other.b;
                this.c = other.c;
                this.d = other.d;
                this.tx = other.tx;
                this.ty = other.ty;
                return this;
            }
            /**
             * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an
             * identity matrix will be identical to the original. After calling the identity() method, the resulting matrix
             * has the following properties: a=1, b=0, c=0, d=1, tx=0, ty=0.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
             * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "identity",
            value: function identity() {
                this.a = this.d = 1;
                this.b = this.c = this.tx = this.ty = 0;
            }
            /**
             * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to
             * undo the transformation performed when applying the original matrix.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 执行原始矩阵的逆转换。
             * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "invert",
            value: function invert() {
                this.$invertInto(this);
            }
            /**
             * @private
             */

        }, {
            key: "$invertInto",
            value: function $invertInto(target) {
                var a = this.a;
                var b = this.b;
                var c = this.c;
                var d = this.d;
                var tx = this.tx;
                var ty = this.ty;
                if (b == 0 && c == 0) {
                    target.b = target.c = 0;
                    if (a == 0 || d == 0) {
                        target.a = target.d = target.tx = target.ty = 0;
                    } else {
                        a = target.a = 1 / a;
                        d = target.d = 1 / d;
                        target.tx = -a * tx;
                        target.ty = -d * ty;
                    }
                    return;
                }
                var determinant = a * d - b * c;
                if (determinant == 0) {
                    target.identity();
                    return;
                }
                determinant = 1 / determinant;
                var k = target.a = d * determinant;
                b = target.b = -b * determinant;
                c = target.c = -c * determinant;
                d = target.d = a * determinant;
                target.tx = -(k * tx + c * ty);
                target.ty = -(b * tx + d * ty);
            }
            /**
             * Applies a rotation transformation to the Matrix object.
             * The rotate() method alters the a, b, c, and d properties of the Matrix object.
             * @param angle The rotation angle in radians.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 对 Matrix 对象应用旋转转换。
             * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
             * @param angle 以弧度为单位的旋转角度。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "rotate",
            value: function rotate(angle) {
                angle = +angle;
                if (angle !== 0) {
                    angle = angle / DEG_TO_RAD;
                    var u = Math.cos(angle);
                    var v = Math.sin(angle);
                    var ta = this.a;
                    var tb = this.b;
                    var tc = this.c;
                    var td = this.d;
                    var ttx = this.tx;
                    var tty = this.ty;
                    this.a = ta * u - tb * v;
                    this.b = ta * v + tb * u;
                    this.c = tc * u - td * v;
                    this.d = tc * v + td * u;
                    this.tx = ttx * u - tty * v;
                    this.ty = ttx * v + tty * u;
                }
            }
            /**
             * Applies a scaling transformation to the matrix. The x axis is multiplied by sx, and the y axis it is multiplied by sy.
             * The scale() method alters the a and d properties of the Matrix object.
             * @param sx A multiplier used to scale the object along the x axis.
             * @param sy A multiplier used to scale the object along the y axis.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
             * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
             * @param sx 用于沿 x 轴缩放对象的乘数。
             * @param sy 用于沿 y 轴缩放对象的乘数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "scale",
            value: function scale(sx, sy) {
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
            /**
             * Sets the members of Matrix to the specified values
             * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
             * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
             * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
             * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
             * @param tx The distance by which to translate each point along the x axis.
             * @param ty The distance by which to translate each point along the y axis.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 将 Matrix 的成员设置为指定值
             * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
             * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
             * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
             * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
             * @param tx 沿 x 轴平移每个点的距离。
             * @param ty 沿 y 轴平移每个点的距离。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "setTo",
            value: function setTo(a, b, c, d, tx, ty) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
                return this;
            }
            /**
             * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
             * @param pointX The x coordinate for which you want to get the result of the Matrix transformation.
             * @param pointY The y coordinate for which you want to get the result of the Matrix transformation.
             * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
             * number of reallocate objects, which allows you to get better code execution performance.
             * @returns The point resulting from applying the Matrix transformation.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
             * @param dx The amount of movement along the x axis to the right, in pixels.
             * @param dy The amount of movement down along the y axis, in pixels.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
             * @param dx 沿 x 轴向右移动的量（以像素为单位）。
             * @param dy 沿 y 轴向下移动的量（以像素为单位）。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "translate",
            value: function translate(dx, dy) {
                this.tx += dx;
                this.ty += dy;
            }
            /**
             * Determines whether two matrixes are equal.
             * @param other The matrix to be compared.
             * @returns A value of true if the object is equal to this Matrix object; false if it is not equal.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 是否与另一个矩阵数据相等
             * @param other 要比较的另一个矩阵对象。
             * @returns 是否相等，ture表示相等。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "equals",
            value: function equals(other) {
                return this.a == other.a && this.b == other.b && this.c == other.c && this.d == other.d && this.tx == other.tx && this.ty == other.ty;
            }
            /**
             * prepend matrix
             * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
             * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
             * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
             * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
             * @param tx The distance by which to translate each point along the x axis.
             * @param ty The distance by which to translate each point along the y axis.
             * @returns matrix
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 前置矩阵
             * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
             * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
             * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
             * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
             * @param tx 沿 x 轴平移每个点的距离
             * @param ty 沿 y 轴平移每个点的距离
             * @returns 矩阵自身
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "prepend",
            value: function prepend(a, b, c, d, tx, ty) {
                var tx1 = this.tx;
                if (a != 1 || b != 0 || c != 0 || d != 1) {
                    var a1 = this.a;
                    var c1 = this.c;
                    this.a = a1 * a + this.b * c;
                    this.b = a1 * b + this.b * d;
                    this.c = c1 * a + this.d * c;
                    this.d = c1 * b + this.d * d;
                }
                this.tx = tx1 * a + this.ty * c + tx;
                this.ty = tx1 * b + this.ty * d + ty;
                return this;
            }
            /**
             * append matrix
             * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
             * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
             * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
             * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
             * @param tx The distance by which to translate each point along the x axis.
             * @param ty The distance by which to translate each point along the y axis.
             * @returns matrix
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 后置矩阵
             * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
             * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
             * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
             * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
             * @param tx 沿 x 轴平移每个点的距离
             * @param ty 沿 y 轴平移每个点的距离
             * @returns 矩阵自身
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "append",
            value: function append(a, b, c, d, tx, ty) {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;
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
            /**
             * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs.
             * Unlike the standard transformation applied using the transformPoint() method, the deltaTransformPoint() method's transformation does not consider the translation parameters tx and ty.
             * @param point The point for which you want to get the result of the matrix transformation.
             * @returns The point resulting from applying the matrix transformation.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * Returns a text value listing the properties of the Matrix object.
             * @returns A string containing the values of the properties of the Matrix object: a, b, c, d, tx, and ty.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
             * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "toString",
            value: function toString() {
                return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
            }
            /**
             * Includes parameters for scaling, rotation, and translation. When applied to a matrix it sets the matrix's values based on those parameters.
             * @param scaleX The factor by which to scale horizontally.
             * @param scaleY The factor by which scale vertically.
             * @param rotation The amount to rotate, in radians.
             * @param tx The number of pixels to translate (move) to the right along the x axis.
             * @param ty The number of pixels to translate (move) down along the y axis.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * Creates the specific style of matrix expected by the beginGradientFill() and lineGradientStyle() methods of the Graphics class.
             * Width and height are scaled to a scaleX/scaleY pair and the tx/ty values are offset by half the width and height.
             * @param width The width of the gradient box.
             * @param height The height of the gradient box.
             * @param rotation The amount to rotate, in radians.
             * @param tx The distance, in pixels, to translate to the right along the x axis. This value is offset by half of the width parameter.
             * @param ty The distance, in pixels, to translate down along the y axis. This value is offset by half of the height parameter.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * @private
             */

        }, {
            key: "getDeterminant",
            value: function getDeterminant() {
                return this.a * this.d - this.b * this.c;
            }
            /**
             * @private
             */

        }, {
            key: "$getScaleX",
            value: function $getScaleX() {
                var m = this;
                if (m.a == 1 && m.b == 0) {
                    return 1;
                }
                var result = Math.sqrt(m.a * m.a + m.b * m.b);
                return this.getDeterminant() < 0 ? -result : result;
            }
            /**
             * @private
             */

        }, {
            key: "$getScaleY",
            value: function $getScaleY() {
                var m = this;
                if (m.c == 0 && m.d == 1) {
                    return 1;
                }
                var result = Math.sqrt(m.c * m.c + m.d * m.d);
                return this.getDeterminant() < 0 ? -result : result;
            }
            /**
             * @private
             */

        }, {
            key: "$getSkewX",
            value: function $getSkewX() {
                return Math.atan2(this.d, this.c) - PI / 2;
            }
            /**
             * @private
             */

        }, {
            key: "$getSkewY",
            value: function $getSkewY() {
                return Math.atan2(this.b, this.a);
            }
        }], [{
            key: "release",
            value: function release(matrix) {
                if (!matrix) {
                    return;
                }
                matrixPool.push(matrix);
            }
            /**
             * get a matrix instance from the object pool or create a new one.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 从对象池中取出或创建一个新的Matrix对象。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "create",
            value: function create() {
                var matrix = matrixPool.pop();
                if (!matrix) {
                    matrix = new Matrix();
                }
                return matrix;
            }
        }]);

        return Matrix;
    }();

    math.Matrix = Matrix;
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    math.$TempMatrix = new Matrix();
})(math || (math = {}));
var math;
(function (math) {
    var pointPool = [];
    var DEG_TO_RAD = Math.PI / 180;
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     */

    var Point = function () {
        /**
         * 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         */
        function Point() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Point);

            this.x = x;
            this.y = y;
        }

        _createClass(Point, [{
            key: "setTo",

            /**
             * 将 Point 的成员设置为指定值
             * @param x 该对象的x属性值
             * @param y 该对象的y属性值
             */
            value: function setTo(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
            /**
             * 克隆点对象
             */

        }, {
            key: "clone",
            value: function clone() {
                return new Point(this.x, this.y);
            }
            /**
             * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
             * @param toCompare 要比较的点。
             * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
             */

        }, {
            key: "equals",
            value: function equals(toCompare) {
                return this.x == toCompare.x && this.y == toCompare.y;
            }
            /**
             * 返回 pt1 和 pt2 之间的距离。
             * @param p1 第一个点
             * @param p2 第二个点
             * @returns 第一个点和第二个点之间的距离。
             */

        }, {
            key: "copyFrom",

            /**
             * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
             * @param sourcePoint 要从中复制数据的 Point 对象。
             */
            value: function copyFrom(sourcePoint) {
                this.x = sourcePoint.x;
                this.y = sourcePoint.y;
            }
            /**
             * 将另一个点的坐标添加到此点的坐标以创建一个新点。
             * @param v 要添加的点。
             * @returns 新点。
             */

        }, {
            key: "add",
            value: function add(v) {
                return new Point(this.x + v.x, this.y + v.y);
            }
            /**
             * 确定两个指定点之间的点。
             * 参数 f 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 pt1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 pt2）。
             * @param pt1 第一个点。
             * @param pt2 第二个点。
             * @param f 两个点之间的内插级别。表示新点将位于 pt1 和 pt2 连成的直线上的什么位置。如果 f=1，则返回 pt1；如果 f=0，则返回 pt2。
             */

        }, {
            key: "normalize",

            /**
             * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
             * @param thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
             */
            value: function normalize(thickness) {
                if (this.x != 0 || this.y != 0) {
                    var relativeThickness = thickness / this.length;
                    this.x *= relativeThickness;
                    this.y *= relativeThickness;
                }
            }
            /**
             * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
             * @param dx 水平坐标 x 的偏移量。
             * @param dy 水平坐标 y 的偏移量。
             */

        }, {
            key: "offset",
            value: function offset(dx, dy) {
                this.x += dx;
                this.y += dy;
            }
            /**
             * 将一对极坐标转换为笛卡尔点坐标。
             * @param len 极坐标对的长度。
             * @param angle 极坐标对的角度（以弧度表示）。
             */

        }, {
            key: "subtract",

            /**
             * 从此点的坐标中减去另一个点的坐标以创建一个新点。
             * @param v 要减去的点。
             * @returns 新点。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            value: function subtract(v) {
                return new Point(this.x - v.x, this.y - v.y);
            }
            /**
             * 返回包含 x 和 y 坐标的值的字符串。该字符串的格式为 "(x=x, y=y)"，因此为点 23,17 调用 toString() 方法将返回 "(x=23, y=17)"。
             * @returns 坐标的字符串表示形式。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "toString",
            value: function toString() {
                return "(x=" + this.x + ", y=" + this.y + ")";
            }
        }, {
            key: "length",

            /**
             * 从 (0,0) 到此点的线段长度。
             */
            get: function get() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
        }], [{
            key: "release",
            value: function release(point) {
                if (!point) {
                    return;
                }
                pointPool.push(point);
            }
            /**
             * 从对象池中取出或创建一个新的Point对象。
             * @param x 该对象的x属性值，默认为0
             * @param y 该对象的y属性值，默认为0
             */

        }, {
            key: "create",
            value: function create(x, y) {
                var point = pointPool.pop();
                if (!point) {
                    point = new Point();
                }
                return point.setTo(x, y);
            }
        }, {
            key: "distance",
            value: function distance(p1, p2) {
                return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
            }
        }, {
            key: "interpolate",
            value: function interpolate(pt1, pt2, f) {
                var f1 = 1 - f;
                return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
            }
        }, {
            key: "polar",
            value: function polar(len, angle) {
                return new Point(len * math.NumberUtils.cos(angle / DEG_TO_RAD), len * math.NumberUtils.sin(angle / DEG_TO_RAD));
            }
        }]);

        return Point;
    }();

    math.Point = Point;
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    math.$TempPoint = new Point();
})(math || (math = {}));
var math;
(function (math) {
    var NumberUtils = function () {
        function NumberUtils() {
            _classCallCheck(this, NumberUtils);
        }

        _createClass(NumberUtils, null, [{
            key: "isNumber",

            /**
             * 判断是否是数值
             * @param value 需要判断的参数
             * @returns
             */
            value: function isNumber(value) {
                return typeof value === "number" && !isNaN(value);
            }
            /**
             * 得到对应角度值的sin近似值
             * @param value {number} 角度值
             * @returns {number} sin值
             */

        }, {
            key: "sin",
            value: function sin(value) {
                var valueFloor = Math.floor(value);
                var valueCeil = valueFloor + 1;
                var resultFloor = NumberUtils.sinInt(valueFloor);
                if (valueFloor == value) {
                    return resultFloor;
                }
                var resultCeil = NumberUtils.sinInt(valueCeil);
                return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
            }
        }, {
            key: "sinInt",
            value: function sinInt(value) {
                value = value % 360;
                if (value < 0) {
                    value += 360;
                }
                return egret_sin_map[value];
            }
            /**
             * 得到对应角度值的cos近似值
             * @param value {number} 角度值
             * @returns {number} cos值
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */

        }, {
            key: "cos",
            value: function cos(value) {
                var valueFloor = Math.floor(value);
                var valueCeil = valueFloor + 1;
                var resultFloor = NumberUtils.cosInt(valueFloor);
                if (valueFloor == value) {
                    return resultFloor;
                }
                var resultCeil = NumberUtils.cosInt(valueCeil);
                return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
            }
            /**
             * @private
             *
             * @param value
             * @returns
             */

        }, {
            key: "cosInt",
            value: function cosInt(value) {
                value = value % 360;
                if (value < 0) {
                    value += 360;
                }
                return egret_cos_map[value];
            }
        }]);

        return NumberUtils;
    }();

    math.NumberUtils = NumberUtils;
})(math || (math = {}));
/**
 * @private
 */
var egret_sin_map = {};
/**
 * @private
 */
var egret_cos_map = {};
/**
 * @private
 */
var DEG_TO_RAD = Math.PI / 180;
for (var NumberUtils_i = 0; NumberUtils_i < 360; NumberUtils_i++) {
    egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD);
    egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
}
egret_sin_map[90] = 1;
egret_cos_map[90] = 0;
egret_sin_map[180] = 0;
egret_cos_map[180] = -1;
egret_sin_map[270] = -1;
egret_cos_map[270] = 0;
//对未提供bind的浏览器实现bind机制
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            //egret.$error(1029);
            console.error(1029);
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function fNOP() {},
            fBound = function fBound() {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
var math;
(function (math) {
    var Serialization = function () {
        function Serialization() {
            _classCallCheck(this, Serialization);
        }

        _createClass(Serialization, null, [{
            key: "to",
            value: function to(obj, jsonObj) {
                for (var propName in jsonObj) {
                    obj[propName] = jsonObj[propName];
                }
                return obj;
            }
        }]);

        return Serialization;
    }();

    math.Serialization = Serialization;
})(math || (math = {}));

(function universalModuleDefinition(root, factory) {
                var f = factory();
                if (root && root["Vejay"]) {
                    return;
                }
                var globalObject = (typeof global !== 'undefined') ? global : ((typeof window !== 'undefined') ? window : this);
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
