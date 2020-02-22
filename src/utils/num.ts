export function digitUpperCase(n: number): string {
  const fraction = ['角', '分'];
  const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  const head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
}

export function numberWithCommas(x: number): string {
  if (x === undefined) return '';
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}


export function getAnimalOfNumber(n: number | string, ii?: number) {
  let nn = ['无', '无', '无']
  if (typeof n !== 'number') return nn

  let index = 0
  let indexString = [['鼠', '水']].concat([['牛', '土']]).concat([['虎', '木']]).concat([['兔', '木']]).concat([['龙', '土']]).concat([['蛇', '火']]).concat([['马', '火']]).concat([['羊', '土']]).concat([['猴', '金']]).concat([['鸡', '金']]).concat([['狗', '土']]).concat([['猪', '水']])
  if ([10, 22, 34, 46].indexOf(n) !== -1) index = 0
  if ([9, 21, 33, 45].indexOf(n) !== -1) index = 1
  if ([8, 20, 32, 44].indexOf(n) !== -1) index = 2
  if ([7, 19, 31, 43].indexOf(n) !== -1) index = 3
  if ([6, 18, 30, 42].indexOf(n) !== -1) index = 4
  if ([5, 17, 29, 41].indexOf(n) !== -1) index = 5
  if ([4, 16, 28, 40].indexOf(n) !== -1) index = 6
  if ([3, 15, 27, 39].indexOf(n) !== -1) index = 7
  if ([2, 14, 26, 38].indexOf(n) !== -1) index = 8
  if ([1, 13, 25, 37, 49].indexOf(n) !== -1) index = 9
  if ([12, 24, 36, 48].indexOf(n) !== -1) index = 10
  if ([11, 23, 35, 47].indexOf(n) !== -1) index = 11
  if (newDate().getTime() >= 1518710400000) {
    if (index < 12) {
      index++
      if (index === 12) index = 0
     }
  }
  nn = indexString[index]
  if ((n % 2) === 0) nn.push('双')
  else nn.push('单')
  return nn
}

export function getNumberOfAnimal(s: string): any[] {
  let a: number[] = [];
  let index = -1;
  if ((index = '鼠牛虎兔龙蛇马羊猴鸡狗猪金木水火土'.indexOf(s)) === -1) return a;

  if (index === 0 ) a = [12, 24, 36, 48]
  if (index === 1 ) a = [11, 23, 35, 47]
  if (index === 2 ) a = [10, 22, 34, 46]
  if (index === 3 ) a = [9, 21, 33, 45]
  if (index === 4 ) a = [8, 20, 32, 44]
  if (index === 5 ) a = [7, 19, 31, 43]
  if (index === 6 ) a = [6, 18, 30, 42]
  if (index === 7 ) a = [5, 17, 29, 41]
  if (index === 8 ) a = [4, 16, 28, 40]
  if (index === 9 ) a = [3, 15, 27, 39]
  if (index === 10 ) a = [2, 14, 26, 38] 
  if (index === 11 ) a = [1, 13, 25, 37, 49]
  
  // ...
  if (index === 12 ) return getNumberOfAnimal('猴').concat(getNumberOfAnimal('鸡'))
  if (index === 13 ) return getNumberOfAnimal('虎').concat(getNumberOfAnimal('兔'))
  if (index === 14 ) return getNumberOfAnimal('鼠').concat(getNumberOfAnimal('猪'))
  if (index === 15 ) return getNumberOfAnimal('蛇').concat(getNumberOfAnimal('马'))
  if (index === 16 ) return getNumberOfAnimal('牛').concat(getNumberOfAnimal('龙')).concat(getNumberOfAnimal('羊')).concat(getNumberOfAnimal('狗'))

  return a.sort()
}


export function newDate(time?: any): any {
  if (time instanceof Date) return time;
  let date = new Date();
  if (typeof time === 'string') {
    let timea: any = time.split(/[-\/:\s]/g);
    if (timea[1]) timea[1] = parseInt(String(timea[1] - 1), 10) + ''
    time = timea
  }
  if (typeof time === 'number') {
    date = new Date(time)
  }
  // if (typeof time === 'array') {
  //   date = new Date(timea[0] || '', timea[1] || '', timea[2] || '', timea[3] || '', timea[4] || '', timea[5] || '')
  // }
  return date
}
