module manager {
    /**
     * 帧运算管理器
     * 负责管理所有注册对象的enterFrame函数，对每帧一定要计算的和卡的时候可以跳帧的进行区分处理
     * 使用方法FrameManager.add(process);
     *
     * @author caijingxiao
     *
     */
    export class FrameManager {
        public static readonly REAL_TIME = 2;
        public static readonly NORMAL = 1;
        public static readonly IDLE = 0;

        public static frameRate = 1;    // 帧速度
        private static _deltaTime = 0; // 表示从上一帧到当前帧时间，以毫秒为单位。
        private static _isInterpolation: Boolean = false;  // 帧补偿中

        private static _fps; // 帧/秒 Frames Per Second
        private static _spf: number;// 秒/帧 Second Per Frames
        private static _processList = [];  // 处理函数列表
        private static _priorityTime = []; // 优先级时间，用于跳帧处理

        private static _lastFrameTimestamp = 0; // 上一帧启动 Flash 运行时虚拟计算机以来经过的毫秒数
        private static _time: number = 0.0;  // 启动FrameManager以来经过的毫秒数
        private static _currentFrameTime;    // 当前帧所用的总时间，从退出上一帧开始计算，直到当前帧所有计算完
        private static _serverTime = 0;	// 服务器时间

        // 计算分数
        private static readonly SAMPLE_COUNT = 10; // 间隔几帧计算帧分数
        private static _frameCount;    // 计算总帧数
        private static _frameScore;    // 帧分数
        private static _frameAvgScoreIndex = 0;
        private static _frameAvgScore = []; // 平均帧分数
        private static _lastScoreTime;

        public static start() {
            if (FrameManager._fps !== undefined)
                return;
            FrameManager._fps = 60;
            FrameManager._spf = 1000 / FrameManager._fps;

            const LOWEST = 24;  // 至少保证不低于多少帧数
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
        public static add(key: string, process: Function, thisObject: any, priority = FrameManager.NORMAL): void {
            if (FrameManager._processList[priority][key] !== undefined)
                throw new Error("已经注册过process");
            FrameManager._processList[priority][key] = process.bind(thisObject);
        }

        /**
         * 移除每帧运行函数
         * @param process 处理函数
         */
        public static remove(key: string): void {
            for (var i = 0; i < FrameManager._processList.length; i++) {
                if (FrameManager._processList[i][key] !== undefined) {
                    delete FrameManager._processList[i][key];
                    break;
                }
            }
        }

        // 进入帧时候触发事件        
        private static onEnterFrame(): void {
            var now = Date.now();
            var passedTime = now - FrameManager._lastFrameTimestamp;    // 上一帧到当前帧所经过的时间

            FrameManager._time += passedTime * FrameManager.frameRate;

            FrameManager._serverTime += passedTime;
            FrameManager._frameCount++;

            FrameManager.process(passedTime, passedTime, 1);

            // 经过process后的时间
            FrameManager._currentFrameTime = Date.now() - FrameManager._lastFrameTimestamp;

            FrameManager._lastFrameTimestamp = now;

            window.requestAnimationFrame(FrameManager.onEnterFrame.bind(this));
        }

        private static process(passedTime:number, processTime:number, funRepeatTime:number):void
        {
            FrameManager._deltaTime = processTime;
            // 实时每帧都运行
            for (let key in FrameManager._processList[FrameManager.REAL_TIME])
            {
                FrameManager.callbackHandler(FrameManager._processList[FrameManager.REAL_TIME][key], processTime);
            }

            for (var i = FrameManager.NORMAL; i >= FrameManager.IDLE; --i)
            {
                if (passedTime > FrameManager._priorityTime[i]) // 跳帧处理
                {
                    if (funRepeatTime <= 1) // funRepeatTime>1 表示帧补偿，帧补偿时不跳帧
                        continue;
                }
                for (let key in FrameManager._processList[i])
                {
                    FrameManager.callbackHandler(FrameManager._processList[i][key], processTime);
                }
            }
        }

        private static callbackHandler(callback: Function, passedTime: number): void {
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
        public static get time(): number {
            return FrameManager._time;
        }
    }
}
