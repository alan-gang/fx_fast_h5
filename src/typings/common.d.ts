

interface BestLudanItem {
  codeStyle: string;
  methodId: number;
  [prop: string]: any;
}
interface GameLimitLevel {
  gameId: number;
  level: number;
}
interface LimitLevelItem {
  level: number;
  minAmt: number;
  maxAmt: number;
}

interface LimitListItem {
  id: number;
  bestLudan: BestLudanItem;
  dtMaxPrize: string;
  dzMaxPrize: string;
  kqPrizeLimit: LimitLevelItem[];
  [prop: string]: any;
}
