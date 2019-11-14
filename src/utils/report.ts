import { getDXH, getDS, getLHH } from './common';
import { LOTTERY_TYPES } from './config';

export const G11X5_COLUMNS: any[] = [
  {label: '', class: '', }
];

// 表格列
export const COLUMN_TYPES: any = {
  G11X5_ZH: 'zh', // 总和
  G11X5_ZHW: 'zhw', // 总和尾
  G11X5_LH: 'lh', // 龙虎
  G11X5_DYW: 'dyw', // 第一位
  G11X5_DRW: 'drw', // 第二位
  G11X5_DSW: 'dsw', // 第三位
  G11X5_DSIW: 'dsiw', // 第四位
  G11X5_DWW: 'dww', // 第五位
  PK10_WIN_SUM: 'WIN_SUM', // 冠亚和
  PK10_WIN_FIRST: 'win_first', // 冠军
  PK10_WIN_SECOND: 'win_second', // 亚军
  PK10_WIN_THIRD: 'win_third', // 季军
  PK10_WIN_FOURTH: 'win_fourth', // 第四名
  PK10_WIN_FIFTH: 'WIN_FIFTH', // 第五名
  K3_ZH: 'zh',
  K3_DX: 'dx',
  K3_DS: 'ds',
  K3_COLOR: 'color',
  k3_SPAN: 'span'
};

const K3_RED_NUMS: number[] = [1, 4];
const K3_BLACK_NUMS: number[] = [2, 3, 5, 6];

function sum(nums: number[]): number {
  return nums.reduce((a, c) => a + c);
}

// K3 颜色
function calcColorOfK3(codes: number[]): string {
  let redCount: number = 0;
  let blackCount: number = 0;
  let rs: string = '';
  codes.forEach((c) => {
    if (K3_RED_NUMS.includes(c)) {
      redCount++;
    } else {
      if (K3_BLACK_NUMS.includes(c)) {
        blackCount++;
      } 
    }
  });
  if (redCount === codes.length) {
    rs = '全红';
  } else if (blackCount === codes.length) {
    rs = '全黑';
  } else {
    rs = `${redCount}红${blackCount}黑`;
  }
  return rs;
}

// K3 跨度
function calcSpanOfK3(codes: number[]): number {
  return Math.max(...codes) - Math.min(...codes);
}

/**
 * 根据彩种类别，类型获取大小，单双，龙虎和的值
 * @param codes {Array} 开奖号码数组
 * @param gameType {String}
 * @param type {String}
 */
export function getTypeValue(codes: number[], gameType?: string, type?: string): any {
  if (!codes || codes.length === 0) return null;
  let dx: string = '';
  let ds: string = '';
  let lhh: string = '';
  let posNum: number = 0;
  let total: number = sum(codes);
  let color: string = '';
  let span: number = 0; // 跨度
  if (gameType === LOTTERY_TYPES.G11X5) {
    switch (type) {
      case COLUMN_TYPES.G11X5_ZH:
        dx = total === 11 ? '11' : getDXH(total, 30);
        // dx = dx === '和' ? '30' : dx;
        ds = getDS(total);
        break;
      case COLUMN_TYPES.G11X5_ZHW:
        let ns = String(total).split('');
        posNum = parseInt(ns[ns.length - 1], 10);
        dx = posNum >= 5 ? '大' : '小';
        break;
      case COLUMN_TYPES.G11X5_LH:
        lhh = getLHH(codes[0], codes[1]);
        break;
      case COLUMN_TYPES.G11X5_DYW:
        posNum = codes[0];
        break;
      case COLUMN_TYPES.G11X5_DRW:
        posNum = codes[1];
        break;
      case COLUMN_TYPES.G11X5_DSW:
        posNum = codes[2];
        break;
      case COLUMN_TYPES.G11X5_DSIW:
        posNum = codes[3];
        break;
      case COLUMN_TYPES.G11X5_DWW:
        posNum = codes[4];
        break;
      default:
        break;
    }
    if ([COLUMN_TYPES.G11X5_DYW, COLUMN_TYPES.G11X5_DRW, COLUMN_TYPES.G11X5_DSW, COLUMN_TYPES.G11X5_DSIW, COLUMN_TYPES.G11X5_DWW].indexOf(type) !== -1) {
      dx = posNum >= 6 ? '大' : '小';
      ds = posNum === 11 ? '11' : getDS(posNum);
    }
  } else if (gameType === LOTTERY_TYPES.PK10) {
    switch (type) {
      case COLUMN_TYPES.PK10_WIN_SUM:
        total = codes[0] + codes[1];
        dx = getDXH(codes[0] + codes[1], 11.5);
        ds = getDS(codes[0] + codes[1]);
        break;
      case COLUMN_TYPES.PK10_WIN_FIRST:
        posNum = codes[0];
        break;
      case COLUMN_TYPES.PK10_WIN_SECOND:
        posNum = codes[1];
        break;
      case COLUMN_TYPES.PK10_WIN_THIRD:
        posNum = codes[2];
        break;
      case COLUMN_TYPES.PK10_WIN_FOURTH:
        posNum = codes[3];
        break;
      case COLUMN_TYPES.PK10_WIN_FIFTH:
        posNum = codes[4];
        break;
      default:
        break;
    }
    if ([COLUMN_TYPES.PK10_WIN_FIRST, COLUMN_TYPES.PK10_WIN_SECOND, COLUMN_TYPES.PK10_WIN_THIRD, COLUMN_TYPES.PK10_WIN_FOURTH, COLUMN_TYPES.PK10_WIN_FIFTH].indexOf(type) !== -1) {
      dx = posNum >= 6 ? '大' : '小';
      ds = getDS(posNum);
    }
  } else if (gameType === LOTTERY_TYPES.K3) {
    switch (type) {
      case COLUMN_TYPES.K3_ZH:
        dx = total >= 11 ? '大' : '小';
        ds = getDS(total);
        break;
      case COLUMN_TYPES.K3_DX:
        dx = total >= 11 ? '大' : '小';
        break;
      case COLUMN_TYPES.K3_DS:
        ds = getDS(total);
        break;
      case COLUMN_TYPES.K3_COLOR:
        color = calcColorOfK3(codes);
        break;
      case COLUMN_TYPES.k3_SPAN:
        span = calcSpanOfK3(codes);
        break;
      default:
        break;
    }
  }
  return {
    dx,
    ds,
    lhh,
    total,
    color,
    span
  };
}
