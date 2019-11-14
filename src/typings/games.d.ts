
export interface GameSubMethodMenu {
  s: boolean;
  name: string;
  v?: string;
  oddIndex: number;
  col?: number;
  class?: string;
  mid?: string;
  odd?: string;
  ids: string[];
  recentType?: any[];
  range?: any;
}
export interface GameMethodMenu {
  name: string;
  ename: string;
  ids: string[];
  subMethods?: GameSubMethodMenu[];
  recentType?: any[];
  recentChild?: boolean; //近期开奖 是否读取 sub 中的 recentType
  range?: any[];  //近期开奖  recentType中的取值范围
}
export interface Game {
  id: number;
  name: string;
  checked?: boolean;
  mid?: string;
  hot?: boolean;
  new?: boolean;
  favourite?: boolean;
  methods?: GameMethodMenu[];
  [prop: string]: any;
}

export interface GameCategory {
  name?: string;
  type: string;
  class?: string;
  checked?: boolean;
  items: Game[];
}

// export interface Games {
//   [prop: string]: GameCategory;
// }

