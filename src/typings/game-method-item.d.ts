interface GameMethodItem {
  n: string; // 显示名字
  s: boolean; // 是否选中
  dis?: boolean; // 是否禁用
  oddIndex?: number;
  col?: number; // 列数
  d?: string; // 大小区间说明， 如大 15-10
  pn?: string; // 位置名字
  pv?: string; // 玩法选项 n 对应接口参数
  class?: string; // 可用于添加文字，图标
  icons?: number; // 显示的icon个数
}

interface GameMethodRow {
  n: string; // 显示名字
  nonasv?: boolean; // 不使用 n 作为拼接参数
  p?: string; // n 对应的接口参数
  col?: number; // 列数
  rcol?: number; // 虚拟列数，真实展示
  height?: number; // 高度
  oddIndex?: number;
  class?: string;
  nstyle?: string; // 动画
  noodd?: boolean; // 无odd
  vs: GameMethodItem [];
}
