let x = [
  [12, 24, 36, 48], // 鼠
  [11, 23, 35, 47], // 牛
  [10, 22, 34, 46], // 虎
  [9, 21, 33, 45], // 兔
  [8, 20, 32, 44], // 龙
  [7, 19, 31, 43], // 蛇
  [6, 18, 30, 42], // 马
  [5, 17, 29, 41], // 羊
  [4, 16, 28, 40], // 猴
  [3, 15, 27, 39], // 鸡
  [2, 14, 26, 38], // 狗 
  [1, 13, 25, 37, 49], // 猪
];
let y = [
  ['鼠', '水'],
  ['牛', '土'],
  ['虎', '木'],
  ['兔', '木'],
  ['龙', '土'],
  ['蛇', '火'],
  ['马', '火'],
  ['羊', '土'],
  ['猴', '金'],
  ['鸡', '金'],
  ['狗', '土'],
  ['猪', '水'],
];
let z = '鼠牛虎兔龙蛇马羊猴鸡狗猪';

export const ANIMALS_POULTRY = '牛马羊鸡狗猪';

export const ANIMALS_BEAST = '鼠虎兔龙蛇猴';

export let codeClass = ',1:red,2:red,7:red,8:red,12:red,13:red,18:red,19:red,23:red,24:red,29:red,30:red,34:red,35:red,40:red,45:red,46:red,3:blue,4:blue,9:blue,10:blue,14:blue,15:blue,20:blue,25:blue,26:blue,31:blue,36:blue,37:blue,41:blue,42:blue,47:blue,48:blue,5:green,6:green,11:green,16:green,17:green,21:green,22:green,27:green,28:green,32:green,33:green,38:green,39:green,43:green,44:green,49:green,'

export function toAE(index: number) {
  return y[x.findIndex(function (y) {
    return y.indexOf(index) !== -1
  })]
}

export function AtoN(str: string) {
  return x[z.indexOf(str)]
}

export function EtoN(str: string) {
  switch (str) {
    case '金':
      return AtoN('猴').concat(AtoN('鸡')).sort()
    case '木':
      return AtoN('虎').concat(AtoN('兔')).sort()
    case '水':
      return AtoN('鼠').concat(AtoN('猪')).sort()
    case '火':
      return AtoN('蛇').concat(AtoN('马')).sort()
    case '土':
      return AtoN('牛').concat(AtoN('龙')).concat(AtoN('羊')).concat(AtoN('狗')).sort()
    default:
      return []
  }
}

// 颜色列表
export function CtoN(str: string) {
  return (codeClass.match(new RegExp(',' + '\\d+' + ':' + str, 'g')) || []).join('|').replace(/[,a-zA-Z:]+/g, '').split('|')
}
