/*
@desc 获取URL上的参数
*/
export function getUrlParams(name: string): string {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let rs = window.location.search.substr(1).match(reg);
  return rs ? decodeURI(rs[2]) : '';
}

/**
 * 是否偶数
 * @param num 数字
 */
export function isEven(num: number) {
  return (num % 2 === 0 || num === 0);
}

/**
 * 是否奇数
 * @param num 数字
 */
export function isOdd(num: number) {
  return !isEven(num);
}


/**
 * 大，小，和
 * @param num
 * @param limit
 */
export function getDXH(num: number, limit: number) {
  return num > limit ? '大' : num === limit ? '和' : '小';
}

/**
 * 单，双
 * @param num
 */
export function getDS(num: number) {
  return num % 2 === 0 || num === 0 ? '双' : '单';
}

/**
 * 龙，虎，和
 * @param num1
 * @param num2
 */
export function getLHH(num1: number, num2: number) {
  return num1 > num2 ? '龙' : num1 === num2 ? '和' : '虎';
}

/**
 * 获取指定位置的字符
 * @param txt
 * @param pos
 */
export function getCharOfPosition(txt: string, pos: number): string {
  return txt[pos] || '';
}
