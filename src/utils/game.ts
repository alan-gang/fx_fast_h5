
/**
 * 计算重复元素的个数
 * @param data 
 */
export function countRepeat(data: any[]): number {
  if (data.length < 1) return 0;
  let temp = (data.join(',').split(',') || []).filter((num) => num.length > 0);
  return temp.length - Array.from(new Set(temp)).length;
}
