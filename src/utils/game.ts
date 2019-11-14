/**
 * 二维数据元素去重
 * @param data 二维数组
 */
export function removeRepeat2DArray(data: any[]) {
  return data;
  // data.reverse();
  // // 标识重复
  // for (let i = 0; i <= data.length - 1; i++) {
  //   for (let j = 0; j <= data[i].length - 1; j++) {
  //     if (!data[i + 1]) continue;
  //     if (data[i + 1].includes(data[i][j])) {
  //       data[i].splice(j, 1, -1);
  //     }
  //     for (let k = 0; k <= data[i + 1].length; k++) {
  //       if (!data[i + 2]) continue;
  //       if (data[i + 2].includes(data[i][j])) {
  //         data[i].splice(j, 1, -1);
  //       }
  //       if (data[i + 2].includes(data[i + 1][k])) {
  //         data[i + 1].splice(k, 1, -1);
  //       }
  //     }
  //   }
  // }
  // data.reverse();
  // // 去重
  // return data.map((d1: any[]) => {
  //   return d1.filter((d2: any) => parseInt(d2, 10) > -1);
  // });
}

export function countRepeat(data: any[]): number {
  if (data.length < 1) return 0;
  let temp = data.join(',').split(',');
  return temp.length - Array.from(new Set(temp)).length;
}
