class Timer {
  private timerItval: number = 0;
  private fn: any;
  /**
   * 定时器
   * @param {*} time  时间
   * @param {*} fn    回调函数
   * @param {*} step
   */
  constructor(time: number, fn: any, step?: number) {
    this.fn = fn;
    this.start(time, fn, step);
  }
  private start(time: number, fn: any, step: number = 1000): void {
    this.timerItval = window.setInterval(() => {
      if (time <= 0) {
        clearInterval(this.timerItval);
        fn(0, true);
        return;
      }
      fn(time, false);
      time--;
    }, step);
  }
  public close(): void {
    clearInterval(this.timerItval);
    // this.fn(0, true);
  }
}

export default Timer;
