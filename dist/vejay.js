/**
 * Created by cjb on 2018-05-01
 */
var utils;
(function (utils) {
    class Dictionary {
        constructor() {
            this._obj = {};
        }
        get keys() {
            var arr = [];
            for (var key in this._obj) {
                arr.push(key);
            }
            return arr;
        }
        get values() {
            var arr = [];
            // for (var value of this._obj) {
            //     arr.push(value);
            // }
            for (var key in this._obj) {
                arr.push(this._obj[key]);
            }
            return arr;
        }
        set(key, value) {
            this._obj[key] = value;
        }
        get(key) {
            var value = this._obj[key];
            if (value !== undefined) {
                return value;
            }
            return null;
        }
        has(key) {
            return this._obj.hasOwnProperty(key);
        }
        remove(key) {
            delete this._obj[key];
        }
        clear() {
            this._obj = {};
        }
    }
    utils.Dictionary = Dictionary;
})(utils || (utils = {}));
var utils;
(function (utils) {
    var math;
    (function (math) {
        let rectanglePool = [];
        /**
         * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
         * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
         * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
         * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
         */
        class Rectangle {
            constructor(x = 0, y = 0, width = 0, height = 0) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            /**
             * 释放一个Rectangle实例到对象池
             */
            static release(rect) {
                if (!rect) {
                    return;
                }
                rectanglePool.push(rect);
            }
            /**
             * 从对象池中取出或创建一个新的Rectangle对象。
             */
            static create() {
                let rect = rectanglePool.pop();
                if (!rect) {
                    rect = new Rectangle();
                }
                return rect;
            }
            /**
             * x 和 width 属性的和。
             */
            get right() {
                return this.x + this.width;
            }
            set right(value) {
                this.width = value - this.x;
            }
            /**
             * y 和 height 属性的和。
             */
            get bottom() {
                return this.y + this.height;
            }
            set bottom(value) {
                this.height = value - this.y;
            }
            /**
             * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
             * left 属性的值等于 x 属性的值。
             */
            get left() {
                return this.x;
            }
            set left(value) {
                this.width += this.x - value;
                this.x = value;
            }
            /**
             * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
             * top 属性的值等于 y 属性的值。
             */
            get top() {
                return this.y;
            }
            set top(value) {
                this.height += this.y - value;
                this.y = value;
            }
            /**
             * 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置。
             */
            get topLeft() {
                return new math.Point(this.left, this.top);
            }
            set topLeft(value) {
                this.top = value.y;
                this.left = value.x;
            }
            /**
             * 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置。
             */
            get bottomRight() {
                return new math.Point(this.right, this.bottom);
            }
            set bottomRight(value) {
                this.bottom = value.y;
                this.right = value.x;
            }
            /**
             * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
             * @param sourceRect 要从中复制数据的 Rectangle 对象。
             */
            copyFrom(sourceRect) {
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
            setTo(x, y, width, height) {
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
            contains(x, y) {
                return this.x <= x &&
                    this.x + this.width >= x &&
                    this.y <= y &&
                    this.y + this.height >= y;
            }
            /**
             * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
             * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
             * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
             * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
             * height 属性均设置为 0 的矩形。
             */
            intersection(toIntersect) {
                return this.clone().$intersectInPlace(toIntersect);
            }
            /**
             * 按指定量增加 Rectangle 对象的大小（以像素为单位）
             * 保持 Rectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
             * @param dx Rectangle 对象横向增加的值。
             * @param dy Rectangle 对象纵向增加的值。
             */
            inflate(dx, dy) {
                this.x -= dx;
                this.width += 2 * dx;
                this.y -= dy;
                this.height += 2 * dy;
            }
            /**
             * @private
             */
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
            /**
             * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
             * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
             * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
             * @returns 如果两个矩形相交，返回true，否则返回false
             */
            intersects(toIntersect) {
                return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
                    && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
            }
            /**
             * 确定此 Rectangle 对象是否为空。
             * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
             */
            isEmpty() {
                return this.width <= 0 || this.height <= 0;
            }
            /**
             * 将 Rectangle 对象的所有属性设置为 0。
             */
            setEmpty() {
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
            }
            /**
             * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
             * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
             */
            clone() {
                return new Rectangle(this.x, this.y, this.width, this.height);
            }
            /**
             * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
             * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point 包含点对象
             * @returns 如果包含，返回true，否则返回false
             */
            containsPoint(point) {
                if (this.x <= point.x
                    && this.x + this.width > point.x
                    && this.y <= point.y
                    && this.y + this.height > point.y) {
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
            containsRect(rect) {
                let r1 = rect.x + rect.width;
                let b1 = rect.y + rect.height;
                let r2 = this.x + this.width;
                let b2 = this.y + this.height;
                return (rect.x >= this.x) && (rect.x < r2) && (rect.y >= this.y) && (rect.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
            }
            /**
             * 判断是否与另外一个 Rectangle 对象相交
             * @param {utils.math.Rectangle} rect
             * @returns {boolean}
             */
            isIntersectRect(rect) {
                return (rect.x >= this.x && rect.x <= this.right) || (rect.y >= this.y && rect.y <= this.bottom)
                    || (rect.right >= this.x && rect.right <= this.right) || (rect.bottom >= this.y && rect.bottom <= this.bottom);
            }
            /**
             * 确定在 toCompare 参数中指定的对象是否等于此 Rectangle 对象。
             * 此方法将某个对象的 x、y、width 和 height 属性与此 Rectangle 对象所对应的相同属性进行比较。
             * @param toCompare 要与此 Rectangle 对象进行比较的矩形。
             * @returns 如果对象具有与此 Rectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
             */
            equals(toCompare) {
                if (this === toCompare) {
                    return true;
                }
                return this.x === toCompare.x && this.y === toCompare.y
                    && this.width === toCompare.width && this.height === toCompare.height;
            }
            /**
             * 增加 Rectangle 对象的大小。此方法与 Rectangle.inflate() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
             */
            inflatePoint(point) {
                this.inflate(point.x, point.y);
            }
            /**
             * 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
             * @param dx 将 Rectangle 对象的 x 值移动此数量。
             * @param dy 将 Rectangle 对象的 t 值移动此数量。
             */
            offset(dx, dy) {
                this.x += dx;
                this.y += dy;
            }
            /**
             * 将 Point 对象用作参数来调整 Rectangle 对象的位置。此方法与 Rectangle.offset() 方法类似，只不过它采用 Point 对象作为参数。
             * @param point 要用于偏移此 Rectangle 对象的 Point 对象。
             */
            offsetPoint(point) {
                this.offset(point.x, point.y);
            }
            /**
             * 生成并返回一个字符串，该字符串列出 Rectangle 对象的水平位置和垂直位置以及高度和宽度。
             * @returns 一个字符串，它列出了 Rectangle 对象的下列各个属性的值：x、y、width 和 height。
             */
            toString() {
                return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
            }
            /**
             * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
             * @param toUnion 要添加到此 Rectangle 对象的 Rectangle 对象。
             * @returns 充当两个矩形的联合的新 Rectangle 对象。
             */
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
            /**
             * @private
             */
            $getBaseWidth(angle) {
                let u = Math.abs(Math.cos(angle));
                let v = Math.abs(Math.sin(angle));
                return u * this.width + v * this.height;
            }
            /**
             * @private
             */
            $getBaseHeight(angle) {
                let u = Math.abs(Math.cos(angle));
                let v = Math.abs(Math.sin(angle));
                return v * this.width + u * this.height;
            }
        }
        math.Rectangle = Rectangle;
        /**
         * @private
         * 仅供框架内复用，要防止暴露引用到外部。
         */
        math.$TempRectangle = new Rectangle();
    })(math = utils.math || (utils.math = {}));
})(utils || (utils = {}));
/**
 * Created by cjb on 2018/5/3
 */
var utils;
(function (utils) {
    var math;
    (function (math) {
        class NumberUtils {
            /**
             * 获取一个在min和max之间的随机数，包括min，不包括max
             */
            static getRand(min, max) {
                var random = Math.random();
                return min + (max - min) * random;
            }
            /**
             * 获取一个在min和max之间的随机数，包括min和max
             */
            static getIntRand(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            /**
             * 小数点后四舍五入
             * @param value
             * @param n 默认小数点后两位
             * @returns {number}
             */
            static roundN(value, n = 2) {
                var base = Math.pow(10, n);
                return Math.round(value * base) / base;
            }
            /**
             * 简单的新ID
             */
            static get newGuid() {
                this.num += 1;
                if (this.num === 100) {
                    this.num = 0;
                }
                return Date.now() + this.num.toString();
            }
            /**
             * 获取倾斜的角度180,右为0度
             */
            static getAngle(beginX, beginY, endX, endY) {
                let offsetY = endY - beginY;
                let offsetX = endX - beginX;
                var radian = Math.atan2(offsetY, offsetX);
                let angle = radian * this.Rad2Deg;
                return angle;
            }
            /**
             * 验证一个点是否在一个扇形范围内
             * @param range 扇形范围
             * @param degree 扇形中心点角度
             * @param x1 扇形中心点x
             * @param y1 扇形中心点y
             * @param x2 目标点x
             * @param y2 目标点y
             */
            static isINSector(range, degree, x1, y1, x2, y2) {
                let diff = range / 2;
                let d1 = degree - diff;
                let d2 = degree + diff;
                let _degree = NumberUtils.getAngle(x1, y1, x2, y2); // 角度
                if (d2 > d1 && _degree >= d1 && _degree <= d2) {
                    return true;
                }
                else if (d1 > d2 && (_degree >= d1 || _degree <= d2)) {
                    return true;
                }
                return false;
            }
            /**
             * 计算两点之间距离
             */
            static getDistance(x1, y1, x2, y2) {
                var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                return Math.sqrt(distance);
            }
            /**
             * 计算点是否在一个矩形范围内
             */
            static isInRange(x, y, rectangle) {
                if (x > rectangle.x && y > rectangle.y && x < rectangle.x + rectangle.width && y < rectangle.y + rectangle.height) {
                    return true;
                }
                return false;
            }
            /**
             
             * 从（beginX，beginY）到（endX，endY）的连线中，获取离（endX，endY）距离为distance的点
             
             * 用于寻路到离目标点最远的点
             
             */
            /*     public static getNearestPoint(beginX: number, beginY: number, endX: number, endY: number, distance: number): Laya.Point {
              var q: number = this.getDistance(beginX, beginY, endX, endY);
              var param: number = (q - distance) / q;
              var rx: number = beginX - (beginX - endX) * param;
              var ry: number = beginY - (beginY - endY) * param;
              var r: Laya.Point = new Laya.Point(rx, ry);
              return r;
            } */
            /**
             * 以（beginX，beginY）为原点，根据指定角度、指定距离，算出点（endX，endY）
             * 用于角色施法，以角色为中心，向某个方向施放一个指定距离的技能
             */
            static getAnglePoint(beginX, beginY, angle, distance) {
                var radian = angle * Math.PI / 180;
                var rx = beginX + Math.sin(radian) * distance;
                var ry = beginY - Math.cos(radian) * distance;
                var r = new math.Point(rx, ry);
                return r;
            }
            /**
             * 从（beginX，beginY）到（endX，endY）的连线中，获取离（beginX，beginY）距离为distance的偏移点
             * 用于寻路到离目标点最近的点
             */
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
            /**
             * 根据角度,8方向判断
             */
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
            /**
             * 根据2个点,8方向判断
             */
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
})(utils || (utils = {}));
var utils;
(function (utils) {
    var math;
    (function (math) {
        let PI = Math.PI;
        let TwoPI = PI * 2;
        let DEG_TO_RAD = PI / 180;
        let matrixPool = [];
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
        class Matrix {
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
            constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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
            static release(matrix) {
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
            static create() {
                let matrix = matrixPool.pop();
                if (!matrix) {
                    matrix = new Matrix();
                }
                return matrix;
            }
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
            clone() {
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
            copyFrom(other) {
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
            identity() {
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
            invert() {
                this.$invertInto(this);
            }
            /**
             * @private
             */
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
            setTo(a, b, c, d, tx, ty) {
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
            translate(dx, dy) {
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
            equals(other) {
                return this.a == other.a && this.b == other.b &&
                    this.c == other.c && this.d == other.d &&
                    this.tx == other.tx && this.ty == other.ty;
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
            toString() {
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
            getDeterminant() {
                return this.a * this.d - this.b * this.c;
            }
            /**
             * @private
             */
            $getScaleX() {
                let m = this;
                if (m.a == 1 && m.b == 0) {
                    return 1;
                }
                let result = Math.sqrt(m.a * m.a + m.b * m.b);
                return this.getDeterminant() < 0 ? -result : result;
            }
            /**
             * @private
             */
            $getScaleY() {
                let m = this;
                if (m.c == 0 && m.d == 1) {
                    return 1;
                }
                let result = Math.sqrt(m.c * m.c + m.d * m.d);
                return this.getDeterminant() < 0 ? -result : result;
            }
            /**
             * @private
             */
            $getSkewX() {
                return Math.atan2(this.d, this.c) - (PI / 2);
            }
            /**
             * @private
             */
            $getSkewY() {
                return Math.atan2(this.b, this.a);
            }
        }
        math.Matrix = Matrix;
        /**
         * @private
         * 仅供框架内复用，要防止暴露引用到外部。
         */
        math.$TempMatrix = new Matrix();
    })(math = utils.math || (utils.math = {}));
})(utils || (utils = {}));
var utils;
(function (utils) {
    var math;
    (function (math) {
        let pointPool = [];
        let DEG_TO_RAD = Math.PI / 180;
        /**
         * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
         */
        class Point {
            /**
             * 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
             * @param x 该对象的x属性值，默认为0
             * @param y 该对象的y属性值，默认为0
             */
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
            /**
             * 从对象池中取出或创建一个新的Point对象。
             * @param x 该对象的x属性值，默认为0
             * @param y 该对象的y属性值，默认为0
             */
            static create(x, y) {
                let point = pointPool.pop();
                if (!point) {
                    point = new Point();
                }
                return point.setTo(x, y);
            }
            /**
             * 从 (0,0) 到此点的线段长度。
             */
            get length() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
            /**
             * 将 Point 的成员设置为指定值
             * @param x 该对象的x属性值
             * @param y 该对象的y属性值
             */
            setTo(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
            /**
             * 克隆点对象
             */
            clone() {
                return new Point(this.x, this.y);
            }
            /**
             * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
             * @param toCompare 要比较的点。
             * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
             */
            equals(toCompare) {
                return this.x == toCompare.x && this.y == toCompare.y;
            }
            /**
             * 返回 pt1 和 pt2 之间的距离。
             * @param p1 第一个点
             * @param p2 第二个点
             * @returns 第一个点和第二个点之间的距离。
             */
            static distance(p1, p2) {
                return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
            }
            /**
             * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
             * @param sourcePoint 要从中复制数据的 Point 对象。
             */
            copyFrom(sourcePoint) {
                this.x = sourcePoint.x;
                this.y = sourcePoint.y;
            }
            /**
             * 将另一个点的坐标添加到此点的坐标以创建一个新点。
             * @param v 要添加的点。
             * @returns 新点。
             */
            add(v) {
                return new Point(this.x + v.x, this.y + v.y);
            }
            /**
             * 确定两个指定点之间的点。
             * 参数 f 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 pt1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 pt2）。
             * @param pt1 第一个点。
             * @param pt2 第二个点。
             * @param f 两个点之间的内插级别。表示新点将位于 pt1 和 pt2 连成的直线上的什么位置。如果 f=1，则返回 pt1；如果 f=0，则返回 pt2。
             */
            static interpolate(pt1, pt2, f) {
                let f1 = 1 - f;
                return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
            }
            /**
             * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
             * @param thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
             */
            normalize(thickness) {
                if (this.x != 0 || this.y != 0) {
                    let relativeThickness = thickness / this.length;
                    this.x *= relativeThickness;
                    this.y *= relativeThickness;
                }
            }
            /**
             * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
             * @param dx 水平坐标 x 的偏移量。
             * @param dy 水平坐标 y 的偏移量。
             */
            offset(dx, dy) {
                this.x += dx;
                this.y += dy;
            }
            /**
             * 将一对极坐标转换为笛卡尔点坐标。
             * @param len 极坐标对的长度。
             * @param angle 极坐标对的角度（以弧度表示）。
             */
            static polar(len, angle) {
                return new Point(len * Math.cos(angle / DEG_TO_RAD), len * Math.sin(angle / DEG_TO_RAD));
            }
            /**
             * 从此点的坐标中减去另一个点的坐标以创建一个新点。
             * @param v 要减去的点。
             * @returns 新点。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            subtract(v) {
                return new Point(this.x - v.x, this.y - v.y);
            }
            /**
             * 返回包含 x 和 y 坐标的值的字符串。该字符串的格式为 "(x=x, y=y)"，因此为点 23,17 调用 toString() 方法将返回 "(x=23, y=17)"。
             * @returns 坐标的字符串表示形式。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            toString() {
                return "(x=" + this.x + ", y=" + this.y + ")";
            }
        }
        math.Point = Point;
        /**
         * @private
         * 仅供框架内复用，要防止暴露引用到外部。
         */
        math.$TempPoint = new Point();
    })(math = utils.math || (utils.math = {}));
})(utils || (utils = {}));
/**
 * Created by cjb on 2018-05-01
 */
var core;
(function (core) {
    var base;
    (function (base) {
        var Dictionary = utils.Dictionary;
        var Sprite = display.Sprite;
        var Event = event.Event;
        class EventDispatcher {
            /**
             * 添加事件监听
             * @param {string} name 事件名称
             * @param caller 执行域
             * @param {Function} method 方法
             * @param {Array<any>} args [参数]
             * @param {boolean} once 是否只执行一次
             */
            addEventListener(name, caller, method, args, once = false) {
                var events = EventDispatcher._list.get(name);
                var e;
                if (!events) {
                    events = [];
                }
                for (var i = 0; i < events.length; i++) {
                    e = events[i];
                    if (method === e[1]) {
                        return;
                    }
                }
                // 监听鼠标事件自动打开鼠标监听
                if (caller instanceof Sprite && Event.isMouseEvent(name)) {
                    caller.mouseEnable = true;
                }
                events.push([caller, method, args, once]);
            }
            /** 删除事件监听 */
            removeEventListener(name, caller, method) {
                var events = EventDispatcher._list.get(name);
                var e;
                for (var i = 0; i < events.length; i++) {
                    e = events[i];
                    if (caller === e[0] && method === e[1]) {
                        events.splice(i, 1);
                        // 自动关闭鼠标监听
                        if (caller instanceof Sprite && Event.isMouseEvent(name)) {
                            caller.mouseEnable = false;
                        }
                        return;
                    }
                }
            }
            /** 删除事件全部监听 */
            removeEventListeners(name) {
                EventDispatcher._list.remove(name);
            }
            /** 发送 */
            sendEvent(name, data) {
                base.SingletonFactory.getInstance(process.EventProcess).addEvent(name, data);
            }
            /**
             * 执行事件
             * @param {string} name 事件名称
             * @param data 参数
             * @param {display.DisplayObject} target 指定对象
             */
            static dispatch(name, data, target = null) {
                var events = this._list.get(name);
                if (!events) {
                    return;
                }
                var e;
                var caller;
                var method;
                var args;
                for (var i = 0; i < events.length; i++) {
                    e = events[i];
                    caller = e[0];
                    if (!target || target === caller) {
                        method = e[1];
                        args = e[2].slice(0);
                        args.unshift(data);
                        method.apply(caller, args);
                        if (e[3]) {
                            events.splice(i--, 1);
                        }
                    }
                }
            }
        }
        /** key:事件名称 , value: [执行域, 方法, 参数, 是否只执行一次] */
        EventDispatcher._list = new Dictionary();
        base.EventDispatcher = EventDispatcher;
    })(base = core.base || (core.base = {}));
})(core || (core = {}));
/**
 * Created by cjb on 2018/5/3
 */
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
})(core || (core = {}));
/**
 * Created by cjb on 2018-05-01
 */
var core;
(function (core) {
    var base;
    (function (base) {
        class Font {
        }
        base.Font = Font;
        class FontCanvas extends Font {
            setFont(str) {
                var ctx = GlobalData.Ctx1;
                ctx.font = str;
                ctx.save();
            }
        }
        base.FontCanvas = FontCanvas;
        class FontWebGL extends Font {
        }
        base.FontWebGL = FontWebGL;
    })(base = core.base || (core.base = {}));
})(core || (core = {}));
/**
 * Created by cjb on 2018-04-29
 */
var common;
(function (common) {
    class GlobalData {
    }
    GlobalData.TouchNum = 2; // 支持多点触控数量
    GlobalData.CtxType = 0; // 0:webGL 1:canvas
    common.GlobalData = GlobalData;
})(common || (common = {}));
var display;
(function (display) {
    var Rectangle = utils.math.Rectangle;
    var EventDispatcher = core.base.EventDispatcher;
    class DisplayObject extends EventDispatcher {
        constructor() {
            super();
            this._x = 0;
            this._y = 0;
            this._scaleX = 1;
            this._scaleY = 1;
            this.pivotX = 0;
            this.pivotY = 0;
            this._rotation = 0;
            this.rotationChange = false;
            this.visible = true;
            this._viewport = new Rectangle();
        }
        // get globalX(): number {
        //     return this._viewport.x;
        // }
        //
        // get globalY(): number {
        //     return this._viewport.y;
        // }
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
    }
    display.DisplayObject = DisplayObject;
})(display || (display = {}));
var display;
(function (display) {
    class DisplayObjectContainer extends display.DisplayObject {
        constructor() {
            super();
            this._children = [];
            this.parentViewport = display.Stage.viewport;
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
                //index = this._children.indexOf(child); // index might have changed by event handler
                //if (index >= 0)
                this._children.splice(index, 1);
                // if (dispose) child.dispose();
                return child;
            }
            else {
                throw new RangeError('Invalid child index');
            }
        }
        getIndex(child) {
            return this._children.indexOf(child);
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
            if (!this.parentViewport.isIntersectRect(this._viewport)) {
                return;
            }
            // 渲染自身
            var ctx = GlobalData.Ctx1;
            this.setRotation(ctx, parentX + this.x, parentY + this.y);
            this.renderSelf();
            ctx.restore();
            // 渲染子对象
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
        get asImage() {
            return (this instanceof Image) ? this : null;
        }
    }
    display.DisplayObjectContainer = DisplayObjectContainer;
})(display || (display = {}));
var display;
(function (display) {
    var Rectangle = utils.math.Rectangle;
    var GlobalData = common.GlobalData;
    class Stage extends display.Sprite {
        constructor() {
            super();
            this.x = (GlobalData.ScreenWidth - GlobalData.StageWidth) * 0.5;
            this.y = (GlobalData.ScreenHeight - GlobalData.StageHeight) * 0.5;
            this.width = GlobalData.StageWidth;
            this.height = GlobalData.StageHeight;
            Stage.viewport = new Rectangle(this.x, this.y, this.width, this.height);
        }
    }
    display.Stage = Stage;
})(display || (display = {}));
/**
 * Created by cjb on 2018-05-01
 */
var display;
(function (display) {
    var component;
    (function (component) {
        class Image extends component.Component {
            constructor(imgSrc) {
                super();
                this._img = new HTMLImageElement();
                this._img.src = imgSrc;
                this._img.onload = this.onLoad;
                this._img.onerror = this.onError;
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
                if (this.parentViewport.containsRect(viewport)) {
                    this.drawImage(0, 0, viewport.width, viewport.height, viewport.x, viewport.y, viewport.width, viewport.height);
                    return;
                }
                let sx, sy, sWidth, sHeight;
                let dx, dy, dWidth, dHeight;
                if (viewport.left < this.parentViewport.left) {
                    sx = this.parentViewport.left - viewport.left;
                    dx = this.parentViewport.left;
                    sWidth = dWidth = viewport.right - this.parentViewport.left;
                }
                else {
                    sx = 0;
                    dx = viewport.x;
                    sWidth = dWidth = viewport.width;
                }
                if (viewport.top < this.parentViewport.top) {
                    sy = this.parentViewport.top - viewport.top;
                    dy = this.parentViewport.top;
                    sHeight = dHeight = viewport.bottom - this.parentViewport.top;
                }
                else {
                    sy = 0;
                    dy = viewport.y;
                    sHeight = dHeight = viewport.height;
                }
                if (viewport.right > this.parentViewport.right) {
                    sWidth = dWidth = this.parentViewport.right - viewport.left;
                }
                if (viewport.bottom > this.parentViewport.bottom) {
                    sHeight = dHeight = this.parentViewport.bottom - viewport.top;
                }
                this.drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
            drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
                var ctx = GlobalData.Ctx1;
                // if (this.scaleChange && (this.scaleX !== 1 || this.scaleY !== 1)) {
                //     ctx.translate(0, dHeight + Stage.viewport.y * 2);
                //     ctx.scale(this.scaleX, this.scaleY);
                //     ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                //     ctx.setTransform(1, 0, 0, 1, 0, 0);
                //     return;
                // }
                ctx.drawImage(this._img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
        component.Image = Image;
    })(component = display.component || (display.component = {}));
})(display || (display = {}));
/**
 * Created by cjb on 2018-05-01
 */
var core;
(function (core) {
    var base;
    (function (base) {
        class Init {
            constructor() {
                var canvas = wx.createCanvas();
                var renderContext = canvas.getContext("webgl");
                if (renderContext) {
                    this.initWebGl(renderContext);
                }
                else {
                    this.initCanvas(canvas);
                }
            }
            initWebGl(ctx) {
                GlobalData.Ctx0 = ctx;
            }
            initCanvas(canvas) {
                var ctx = canvas.getContext("2d");
                GlobalData.Ctx1 = ctx;
                GlobalData.CtxType = 1;
            }
        }
        base.Init = Init;
    })(base = core.base || (core.base = {}));
})(core || (core = {}));
/**
 * Created by cjb on 2018-04-30
 */
var core;
(function (core) {
    var base;
    (function (base) {
        class Vo {
            static copy(from, to) {
                for (var propName in from) {
                    to[propName] = from[propName];
                }
                return to;
            }
            clone() {
                return Vo.copy(this, new Vo());
            }
        }
        base.Vo = Vo;
    })(base = core.base || (core.base = {}));
})(core || (core = {}));
/**
 * Created by cjb on 2018-05-01
 */
var display;
(function (display) {
    class RenderContext {
        constructor() {
            if (RenderContext._instance) {
                console.error("get instance instead of new");
                return;
            }
            this.ctx0 = GlobalData.Ctx0;
            this.ctx1 = GlobalData.Ctx1;
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
})(display || (display = {}));
/**
 * Created by cjb on 2018/5/4
 */
var display;
(function (display) {
    class Sprite extends display.DisplayObjectContainer {
        constructor() {
            super();
            this._mouseEnable = false; // 默认关闭鼠标监听
            this.mouseThrough = true; // 默认打开鼠标穿透
        }
        get mouseEnable() {
            return this._mouseEnable;
        }
        set mouseEnable(value) {
            this._mouseEnable = value;
            if (value && this.parent) {
                this.parent.mouseEnable = true;
            }
        }
    }
    display.Sprite = Sprite;
})(display || (display = {}));
/**
 * Created by cjb on 2018/5/4
 */
var event;
(function (event) {
    class Event {
        constructor(touch, currentTarget, target) {
            this.touch = touch;
            if (currentTarget) {
                this.currentTarget = currentTarget;
            }
            if (target) {
                this.target = target;
            }
        }
        static isMouseEvent(name) {
            if (this.MOUSE_EVENT.indexOf(name) > -1) {
                return true;
            }
            return false;
        }
    }
    //public static readonly TYPE_TOUCH: string = "touch";
    Event.MOUSE_EVENT = ["v_mouse_click", "v_mouse_down", "v_mouse_up", "v_mouse_move"];
    Event.MOUSE_CLICK = this.MOUSE_EVENT[0];
    Event.MOUSE_DOWN = this.MOUSE_EVENT[1];
    Event.MOUSE_UP = this.MOUSE_EVENT[2];
    Event.MOUSE_MOVE = this.MOUSE_EVENT[3];
    event.Event = Event;
})(event || (event = {}));
/**
 * Created by cjb on 2018/5/4
 */
var event;
(function (event) {
    var Dictionary = utils.Dictionary;
    class EventModel {
        constructor() {
            this._targets = new Dictionary();
        }
        addTarget(touchId, target) {
            this._targets.set(touchId.toString(), target);
        }
        getAndRemove(touchId) {
            var target = this._targets.get(touchId.toString());
            if (target) {
                this._targets.remove(touchId.toString());
            }
            return target;
        }
        get targets() {
            return this._targets;
        }
    }
    event.EventModel = EventModel;
})(event || (event = {}));
/**
 * Created by cjb on 2018/5/4
 */
var event;
(function (event_1) {
    var EventDispatcher = core.base.EventDispatcher;
    class MouseEvent {
        constructor() {
            this._stage = SingletonFactory.getInstance(display.Stage);
            this._model = SingletonFactory.getInstance(event.EventModel);
        }
        init() {
            wx.onTouchStart(this.onTouchStart);
            wx.onTouchMove(this.onTouchMove);
            wx.onTouchEnd(this.onTouchEnd);
            wx.onTouchCancel(this.onTouchCancel);
        }
        onTouchStart(callback) {
            var touches = callback.touches;
            var touch;
            var target;
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                target = this.searchTarget(this._stage, touch.screenX, touch.screenY);
                if (target[0]) {
                    var event = new Event(touch, target[0], target[1]);
                    EventDispatcher.dispatch(Event.MOUSE_DOWN, event, target[1]);
                    this._model.addTarget(touch.identifier, target);
                }
            }
        }
        onTouchMove(callback) {
            var touches = callback.touches;
            var touch;
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                var event = new Event(touch);
                EventDispatcher.dispatch(Event.MOUSE_MOVE, event);
            }
        }
        onTouchEnd(callback) {
            var touches = callback.touches;
            var touch;
            var target;
            var oldTarget;
            for (var i = 0; i < GlobalData.TouchNum; i++) {
                touch = touches[i];
                target = this.searchTarget(this._stage, touch.screenX, touch.screenY);
                if (target[0]) {
                    var event = new Event(touch, target[0], target[1]);
                    EventDispatcher.dispatch(Event.MOUSE_UP, event, target[1]);
                }
                oldTarget = this._model.getAndRemove(touch.identifier);
                if (oldTarget && oldTarget[1].viewport.contains(touch.screenX, touch.screenY)) {
                    var event = new Event(touch, oldTarget[0], oldTarget[1]);
                    EventDispatcher.dispatch(Event.MOUSE_CLICK, event, oldTarget[1]);
                }
            }
        }
        onTouchCancel(callback) {
            var touches = callback.touches;
            var targets = this._model.targets;
            for (var i = 0; i < touches.length; i++) {
                targets.remove(touches[i].identifier.toString());
            }
        }
        searchTarget(parent, x, y) {
            var child;
            var currentTarget;
            var target;
            for (var i = parent.numChildren - 1; i >= 0; i--) {
                child = parent[i];
                if (child.mouseEnable && child.viewport.contains(x, y)) {
                    target = child;
                    if (child.mouseThrough) {
                        currentTarget = child;
                        this.searchTarget(child, x, y);
                    }
                    return;
                }
            }
            if (!currentTarget && target) {
                currentTarget = target;
            }
            return [currentTarget, target];
        }
    }
    event_1.MouseEvent = MouseEvent;
})(event || (event = {}));
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
    class FrameManager {
        static start() {
            if (FrameManager._fps !== undefined)
                return;
            FrameManager._fps = 60;
            FrameManager._spf = 1000 / FrameManager._fps;
            const LOWEST = 24; // 至少保证不低于多少帧数
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
        static add(key, process, thisObject, priority = FrameManager.NORMAL) {
            if (FrameManager._processList[priority][key] !== undefined)
                throw new Error("已经注册过process");
            FrameManager._processList[priority][key] = process.bind(thisObject);
        }
        /**
         * 移除每帧运行函数
         * @param process 处理函数
         */
        static remove(key) {
            for (var i = 0; i < FrameManager._processList.length; i++) {
                if (FrameManager._processList[i][key] !== undefined) {
                    delete FrameManager._processList[i][key];
                    break;
                }
            }
        }
        // 进入帧时候触发事件        
        static onEnterFrame() {
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
        static process(passedTime, processTime, funRepeatTime) {
            FrameManager._deltaTime = processTime;
            // 实时每帧都运行
            for (let key in FrameManager._processList[FrameManager.REAL_TIME]) {
                FrameManager.callbackHandler(FrameManager._processList[FrameManager.REAL_TIME][key], processTime);
            }
            for (var i = FrameManager.NORMAL; i >= FrameManager.IDLE; --i) {
                if (passedTime > FrameManager._priorityTime[i]) // 跳帧处理
                 {
                    if (funRepeatTime <= 1) // funRepeatTime>1 表示帧补偿，帧补偿时不跳帧
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
        /**
         * 启动FrameManager以来经过的毫秒数
         */
        static get time() {
            return FrameManager._time;
        }
    }
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
/**
 * Created by cjb on 2018/5/3
 */
var process;
(function (process) {
    var EventDispatcher = core.base.EventDispatcher;
    class EventProcess {
        constructor() {
            this._msg = [];
        }
        addEvent(name, data) {
            this._msg.push([name, data]);
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
    process.EventProcess = EventProcess;
})(process || (process = {}));
/**
 * Created by cjb on 2018-04-30
 */
var GlobalData = common.GlobalData;
var SingletonFactory = core.base.SingletonFactory;
var stage;
var loader;
function init(stageW, stageH, ScreenW, ScreenH) {
    GlobalData.StageWidth = stageW;
    GlobalData.ScreenHeight = stageH;
    GlobalData.ScreenWidth = ScreenW ? ScreenW : stageW;
    GlobalData.ScreenHeight = ScreenH ? ScreenH : stageH;
    new core.base.Init();
    stage = SingletonFactory.getInstance(display.Stage);
    SingletonFactory.getInstance(event.MouseEvent).init();
}
/**
 * Created by cjb on 2018/5/4
 */
var display;
(function (display) {
    var component;
    (function (component) {
        class Component extends display.Sprite {
            constructor() {
                super();
                this.mouseThrough = false;
            }
        }
        component.Component = Component;
    })(component = display.component || (display.component = {}));
})(display || (display = {}));

//# sourceMappingURL=vejay.js.map
