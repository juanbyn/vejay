/**
 * Created by cjb on 2018-05-01
 */
declare module core {
    class Dictionary {
        private _obj;
        readonly keys: Array<string>;
        readonly values: Array<any>;
        set(key: string, value: any): void;
        get(key: string): any;
        has(key: string): boolean;
        remove(key: string): void;
        clear(): void;
    }
}
/**
 * Created by cjb on 2018-05-01
 */
declare module core {
    class EventDispatcher {
        private static _list;
        /**
         * 添加事件监听
         * @param {string} name 事件名称
         * @param caller 执行域
         * @param {Function} method 方法
         * @param {Array<any>} args [参数]
         * @param {boolean} once 是否只执行一次
         */
        addEventListener(name: string, caller: any, method: Function, args: Array<any>, once?: boolean): void;
        /** 删除事件监听 */
        removeEventListener(name: string, caller: any, method: Function): void;
        /** 删除事件全部监听 */
        removeEventListeners(name: string): void;
        /** 执行 */
        static dispatch(name: string): void;
    }
}
/**
 * Created by cjb on 2018-05-01
 */
declare module core.base {
    class Font {
        private static _instance;
        static readonly instance: Font;
        setFont(str: string): void;
    }
    class FontCanvas extends Font {
        setFont(str: string): void;
    }
    class FontWebGL extends Font {
    }
}
/**
 * Created by cjb on 2018-04-29
 */
declare module common {
    class GlobalData {
        static ScreenWidth: number;
        static ScreenHeight: number;
        static StageWidth: number;
        static StageHeight: number;
        static Ctx0: WebGLRenderingContext;
        static Ctx1: CanvasRenderingContext2D;
        static CtxType: number;
    }
}
declare module math {
    /**
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     */
    class Rectangle {
        /**
         * 释放一个Rectangle实例到对象池
         */
        static release(rect: Rectangle): void;
        /**
         * 从对象池中取出或创建一个新的Rectangle对象。
         */
        static create(): Rectangle;
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * x 和 width 属性的和。
         */
        right: number;
        /**
         * y 和 height 属性的和。
         */
        bottom: number;
        /**
         * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
         * left 属性的值等于 x 属性的值。
         */
        left: number;
        /**
         * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
         * top 属性的值等于 y 属性的值。
         */
        top: number;
        /**
         * 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置。
         */
        topLeft: Point;
        /**
         * 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置。
         */
        bottomRight: Point;
        /**
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         * @param sourceRect 要从中复制数据的 Rectangle 对象。
         */
        copyFrom(sourceRect: Rectangle): Rectangle;
        /**
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         */
        contains(x: number, y: number): boolean;
        /**
         * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
         * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
         * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
         * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
         * height 属性均设置为 0 的矩形。
         */
        intersection(toIntersect: Rectangle): Rectangle;
        /**
         * 按指定量增加 Rectangle 对象的大小（以像素为单位）
         * 保持 Rectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
         * @param dx Rectangle 对象横向增加的值。
         * @param dy Rectangle 对象纵向增加的值。
         */
        inflate(dx: number, dy: number): void;
        /**
         * @private
         */
        $intersectInPlace(clipRect: Rectangle): Rectangle;
        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         */
        intersects(toIntersect: Rectangle): boolean;
        /**
         * 确定此 Rectangle 对象是否为空。
         * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
         */
        isEmpty(): boolean;
        /**
         * 将 Rectangle 对象的所有属性设置为 0。
         */
        setEmpty(): void;
        /**
         * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         */
        clone(): Rectangle;
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point 包含点对象
         * @returns 如果包含，返回true，否则返回false
         */
        containsPoint(point: Point): boolean;
        /**
         * 确定此 Rectangle 对象内是否包含由 rect 参数指定的 Rectangle 对象。
         * 如果一个 Rectangle 对象完全在另一个 Rectangle 的边界内，我们说第二个 Rectangle 包含第一个 Rectangle。
         * @param rect 所检查的 Rectangle 对象
         * @returns 如果此 Rectangle 对象包含您指定的 Rectangle 对象，则返回 true 值，否则返回 false。
         */
        containsRect(rect: Rectangle): boolean;
        /**
         * 确定在 toCompare 参数中指定的对象是否等于此 Rectangle 对象。
         * 此方法将某个对象的 x、y、width 和 height 属性与此 Rectangle 对象所对应的相同属性进行比较。
         * @param toCompare 要与此 Rectangle 对象进行比较的矩形。
         * @returns 如果对象具有与此 Rectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
         */
        equals(toCompare: Rectangle): boolean;
        /**
         * 增加 Rectangle 对象的大小。此方法与 Rectangle.inflate() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
         */
        inflatePoint(point: Point): void;
        /**
         * 按指定量调整 Rectangle 对象的位置（由其左上角确定）。
         * @param dx 将 Rectangle 对象的 x 值移动此数量。
         * @param dy 将 Rectangle 对象的 t 值移动此数量。
         */
        offset(dx: number, dy: number): void;
        /**
         * 将 Point 对象用作参数来调整 Rectangle 对象的位置。此方法与 Rectangle.offset() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point 要用于偏移此 Rectangle 对象的 Point 对象。
         */
        offsetPoint(point: Point): void;
        /**
         * 生成并返回一个字符串，该字符串列出 Rectangle 对象的水平位置和垂直位置以及高度和宽度。
         * @returns 一个字符串，它列出了 Rectangle 对象的下列各个属性的值：x、y、width 和 height。
         */
        toString(): string;
        /**
         * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
         * @param toUnion 要添加到此 Rectangle 对象的 Rectangle 对象。
         * @returns 充当两个矩形的联合的新 Rectangle 对象。
         */
        union(toUnion: Rectangle): Rectangle;
        /**
         * @private
         */
        $getBaseWidth(angle: number): number;
        /**
         * @private
         */
        $getBaseHeight(angle: number): number;
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    let $TempRectangle: Rectangle;
}
declare module display {
    import EventDispatcher = core.EventDispatcher;
    class DisplayObjectContainer extends EventDispatcher {
        private _children;
        parent: DisplayObjectContainer;
        constructor();
        readonly numChildren: number;
        readonly children: Array<DisplayObjectContainer>;
        addChild(child: DisplayObjectContainer): void;
        removeChild(child: DisplayObjectContainer): void;
        removeChildAt(index: number): DisplayObjectContainer;
        getIndex(child: DisplayObjectContainer): number;
        removeAll(): void;
        removeSelf(): void;
    }
}
declare module display {
    import Rectangle = math.Rectangle;
    class DisplayObject extends DisplayObjectContainer {
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
        protected _viewport: Rectangle;
        constructor();
        readonly globalX: number;
        readonly globalY: number;
        x: number;
        y: number;
        pos(x: number, y: number): void;
        scaleY: number;
        scaleX: number;
        scale(scaleX: number, scaleY: number): void;
        render(parentX: any, parentY: any): void;
        protected renderSelf(): void;
    }
}
declare module display {
    import Rectangle = math.Rectangle;
    class Stage extends DisplayObject {
        private static _instance;
        static viewport: Rectangle;
        constructor();
        static instance(): Stage;
    }
}
/**
 * Created by cjb on 2018-04-30
 */
declare module core.base {
    class Vo {
        static copy(from: Vo, to: Vo): Vo;
        clone(): Vo;
    }
}
/**
 * Created by cjb on 2018-05-01
 */
declare module display {
    class RenderContext {
        private ctx0;
        private ctx1;
        static _instance: RenderContext;
        constructor();
        static readonly instance: RenderContext;
        scale(x: number, y: number): void;
    }
}
/**
 * Created by cjb on 2018-04-30
 */
import GlobalData = common.GlobalData;
import Font = core.base.Font;
declare function init(stageW: number, stageH: number, ScreenW?: number, ScreenH?: number): void;
declare function setFont(font: string): void;
declare module manager {
    /**
     * 帧运算管理器
     * 负责管理所有注册对象的enterFrame函数，对每帧一定要计算的和卡的时候可以跳帧的进行区分处理
     * 使用方法FrameManager.add(process);
     *
     * @author caijingxiao
     *
     */
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
        /**
         * 注册每帧运行函数
         * 由于使用Dictionary，所以先加入的函数并不一定会先运行
         * @param process 处理函数，函数格式Function(passedTime:int)，passedTime表示上一帧到当前帧所经过的毫秒数
         * @param priority 优先级，默认为FrameManager.NORMAL
         *
         */
        static add(key: string, process: Function, thisObject: any, priority?: number): void;
        /**
         * 移除每帧运行函数
         * @param process 处理函数
         */
        static remove(key: string): void;
        private static onEnterFrame();
        private static process(passedTime, processTime, funRepeatTime);
        private static callbackHandler(callback, passedTime);
        /**
         * 启动FrameManager以来经过的毫秒数
         */
        static readonly time: number;
    }
}
declare module math {
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
        static release(matrix: Matrix): void;
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
        static create(): Matrix;
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
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        a: number;
        /**
         * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        b: number;
        /**
         * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        c: number;
        /**
         * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        d: number;
        /**
         * The distance by which to translate each point along the x axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 沿 x 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        tx: number;
        /**
         * The distance by which to translate each point along the y axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 沿 y 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ty: number;
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
        clone(): Matrix;
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
        concat(other: Matrix): void;
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
        copyFrom(other: Matrix): Matrix;
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
        identity(): void;
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
        invert(): void;
        /**
         * @private
         */
        $invertInto(target: Matrix): void;
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
        rotate(angle: number): void;
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
        scale(sx: number, sy: number): void;
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
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
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
        translate(dx: number, dy: number): void;
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
        equals(other: Matrix): boolean;
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
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
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
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
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
        toString(): string;
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
        private getDeterminant();
        /**
         * @private
         */
        $getScaleX(): number;
        /**
         * @private
         */
        $getScaleY(): number;
        /**
         * @private
         */
        $getSkewX(): number;
        /**
         * @private
         */
        $getSkewY(): number;
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    let $TempMatrix: Matrix;
}
declare module math {
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     */
    class Point {
        static release(point: Point): void;
        /**
         * 从对象池中取出或创建一个新的Point对象。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         */
        static create(x: number, y: number): Point;
        /**
         * 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         */
        constructor(x?: number, y?: number);
        /**
         * 该点的水平坐标。
         * @default 0
         */
        x: number;
        /**
         * 该点的垂直坐标。
         * @default 0
         */
        y: number;
        /**
         * 从 (0,0) 到此点的线段长度。
         */
        readonly length: number;
        /**
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         */
        setTo(x: number, y: number): Point;
        /**
         * 克隆点对象
         */
        clone(): Point;
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        equals(toCompare: Point): boolean;
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         */
        static distance(p1: Point, p2: Point): number;
        /**
         * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
         * @param sourcePoint 要从中复制数据的 Point 对象。
         */
        copyFrom(sourcePoint: Point): void;
        /**
         * 将另一个点的坐标添加到此点的坐标以创建一个新点。
         * @param v 要添加的点。
         * @returns 新点。
         */
        add(v: Point): Point;
        /**
         * 确定两个指定点之间的点。
         * 参数 f 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 pt1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 pt2）。
         * @param pt1 第一个点。
         * @param pt2 第二个点。
         * @param f 两个点之间的内插级别。表示新点将位于 pt1 和 pt2 连成的直线上的什么位置。如果 f=1，则返回 pt1；如果 f=0，则返回 pt2。
         */
        static interpolate(pt1: Point, pt2: Point, f: number): Point;
        /**
         * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
         * @param thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
         */
        normalize(thickness: number): void;
        /**
         * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
         * @param dx 水平坐标 x 的偏移量。
         * @param dy 水平坐标 y 的偏移量。
         */
        offset(dx: number, dy: number): void;
        /**
         * 将一对极坐标转换为笛卡尔点坐标。
         * @param len 极坐标对的长度。
         * @param angle 极坐标对的角度（以弧度表示）。
         */
        static polar(len: number, angle: number): Point;
        /**
         * 从此点的坐标中减去另一个点的坐标以创建一个新点。
         * @param v 要减去的点。
         * @returns 新点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        subtract(v: Point): Point;
        /**
         * 返回包含 x 和 y 坐标的值的字符串。该字符串的格式为 "(x=x, y=y)"，因此为点 23,17 调用 toString() 方法将返回 "(x=23, y=17)"。
         * @returns 坐标的字符串表示形式。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        toString(): string;
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    let $TempPoint: Point;
}
declare module math {
    class NumberUtils {
        /**
         * 判断是否是数值
         * @param value 需要判断的参数
         * @returns
         */
        static isNumber(value: any): boolean;
        /**
         * 得到对应角度值的sin近似值
         * @param value {number} 角度值
         * @returns {number} sin值
         */
        static sin(value: number): number;
        private static sinInt(value);
        /**
         * 得到对应角度值的cos近似值
         * @param value {number} 角度值
         * @returns {number} cos值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static cos(value: number): number;
        /**
         * @private
         *
         * @param value
         * @returns
         */
        private static cosInt(value);
    }
}
/**
 * @private
 */
declare let egret_sin_map: {};
/**
 * @private
 */
declare let egret_cos_map: {};
/**
 * @private
 */
declare let DEG_TO_RAD: number;
/**
 * Created by cjb on 2018-05-01
 */
declare module core.base {
    class Init {
        constructor();
        private initWebGl(ctx);
        private initCanvas(canvas);
    }
}
/**
 * Created by cjb on 2018-05-01
 */
declare module display.component {
    class VImage extends DisplayObject {
        private _img;
        constructor(imgSrc: string);
        private onLoad();
        protected renderSelf(): void;
        private drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
