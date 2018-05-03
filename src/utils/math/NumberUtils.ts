/**
 * Created by cjb on 2018/5/3
 */
module utils.math {
    export class NumberUtils {
        public static TWO_PI: number = Math.PI * 2.0;
        public static Deg2Rad: number = Math.PI / 180;
        public static Rad2Deg: number = 180 / Math.PI;
        private static num: number = 0;
        
        /**
         * 获取一个在min和max之间的随机数，包括min，不包括max
         */
        public static getRand(min: number, max: number): number {
            var random: number = Math.random();
            return min + (max - min) * random;
        }
        
        /**
         * 获取一个在min和max之间的随机数，包括min和max
         */
        public static getIntRand(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        /**
         * 小数点后四舍五入
         * @param value
         * @param n 默认小数点后两位
         * @returns {number}
         */
        public static roundN(value: number, n: number = 2): number {
            var base: number = Math.pow(10, n);
            return Math.round(value * base) / base;
        }
        
        /**
         * 简单的新ID
         */
        public static get newGuid(): string {
            this.num += 1;
            if (this.num === 100) {
                this.num = 0;
            }
            return Date.now() + this.num.toString();
        }
        
        /**
         * 获取倾斜的角度180,右为0度
         */
        public static getAngle(beginX: number, beginY: number, endX: number, endY: number): number {
            let offsetY: number = endY - beginY;
            let offsetX: number = endX - beginX;
            var radian: number = Math.atan2(offsetY, offsetX);
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
        public static isINSector(range: number, degree: number, x1: number, y1: number, x2: number, y2: number): boolean {
            let diff = range / 2;
            let d1 = degree - diff;
            let d2 = degree + diff;
            let _degree = NumberUtils.getAngle(x1, y1, x2, y2); // 角度
            
            if (d2 > d1 && _degree >= d1 && _degree <= d2) {
                return true;
            } else if (d1 > d2 && (_degree >= d1 || _degree <= d2)) {
                return true;
            }
            return false;
        }
        
        /**
         * 计算两点之间距离
         */
        public static getDistance(x1: number, y1: number, x2: number, y2: number): number {
            var distance: number = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            return Math.sqrt(distance);
        }
        
        /**
         * 计算点是否在一个矩形范围内
         */
        public static isInRange(x: number, y: number, rectangle: Rectangle): boolean {
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
        public static getAnglePoint(beginX: number, beginY: number, angle: number, distance: number): Point {
            var radian: number = angle * Math.PI / 180;
            var rx: number = beginX + Math.sin(radian) * distance;
            var ry: number = beginY - Math.cos(radian) * distance;
            var r: Point = new Point(rx, ry);
            return r;
        }
        
        /**
         * 从（beginX，beginY）到（endX，endY）的连线中，获取离（beginX，beginY）距离为distance的偏移点
         * 用于寻路到离目标点最近的点
         */
        public static getNearestPoint(beginX: number, beginY: number, endX: number, endY: number, distance: number): Point {
            var r: Point = new Point();
            var q: number = this.getDistance(beginX, beginY, endX, endY);
            if (q < distance) {
                r.setTo(endX - beginX, endY - beginY);
            } else {
                var angle = this.getAngle(beginX, beginY, endX, endY) + 90;
                var radian: number = angle * Math.PI / 180;
                var rx: number = Math.sin(radian) * distance;
                var ry: number = -Math.cos(radian) * distance;
                r.setTo(rx, ry);
            }
            return r;
        }
        
        /**
         * 根据角度,8方向判断
         */
        
        public static get8Direction(degree: number) {
            if (degree >= -45 && degree < 45) {
                return 6;
            } else if (degree >= 45 && degree < 135) {
                return 2;
            } else if (degree >= 135 || degree < -135) {
                return 4;
            } else if (degree >= -135 && degree < -45) {
                return 8;
            }
        }
        
        /**
         * 根据2个点,8方向判断
         */
        
        public static get8Direction2(beginX: number, beginY: number, endX: number, endY: number) {
            let degree = this.getAngle(beginX, beginY, endX, endY);
            if (degree >= -45 && degree < 45) {
                return 6;
            } else if (degree >= 45 && degree < 135) {
                return 2;
            } else if (degree >= 135 || degree < -135) {
                return 4;
            } else if (degree >= -135 && degree < -45) {
                return 8;
            }
        }
        
        /**
         
         * 根据角度和X轴长度，计算Y轴长度
         
         */
        /*     public static getYByAngle(angle: number, x: number): number {
          var angleRadians: number = angle * Math.PI / 180;
    
          return x * Math.tan(angleRadians);
        } */
        
        /**
         
         * 将以10000为单位的百分比转化成小数
         
         * **/
        /*     public static transValToRatio(val: number): number {
          var ratio: number = val / 10000;
          return ratio;
        } */
        
        /**
         
         * 将以10000为单位的百分比转化成百分数
         
         * **/
        /*     public static transValToPercent(val: number): number {
          var percent: number = val / 100;
          return percent;
        } */
        
        /**
         
         * 装换为几位数
         
         * **/
        /*     public static formatIntPlaces(val: number, places: number): String {
          var valStr: String = val.toString();
          while (valStr.length < places) {
            valStr = '0' + valStr;
          }
          return valStr;
        } */
    }
}

