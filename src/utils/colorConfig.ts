

interface TextColr {
  [prop: string]: string;
}

function getStyle(d: string): string {
  switch (d) {
    case '大':
    case '单':
    case '龙':
    case '总大':
    case '总单':
    case '和尾大':
    case '红':
      return 'bgc-r';
    case '小':
    case '总小':
    case '双':
    case '总双':  
    case '虎':
    case '和尾小':
    case '蓝':
      return 'bgc-b';
    case '和':
    case '30':
    case '11':
    case '绿':
      return 'bgc-g';
    default:
      if (/\d/.test(d)) return 'bgc-y';
      return '';
  }
}

const textColors: TextColr = {
  'bgc-r': 'text-r',
  'bgc-b': 'txt-b',
  'bgc-g': 'txt-g',
  'bgc-y': 'txt-y'
}

export function getStyleTxtColor(d: string): string {
  return textColors[getStyle(d)];
}

export default {
  getStyle,
  getStyleTxtColor
};
