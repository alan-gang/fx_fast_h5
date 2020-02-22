
import { AtoN, EtoN, CtoN } from './hc6';

let commonRow = {
  // 名字
  n: '',
  // 最小值
  min: 0,
  // 最大值
  max: 9,
  vs: [],
  // 所选的号的值v集
  vc: [],
  // 所选的号的名n集
  nc: [],
  // 所选的号的行名n集
  rnc: [],
  // 所选号码金额集合
  amtc: [],
  // 金额汇总
  tmc: 0
}


let getCommonRow = (args = {}) => {
  return Object.assign({}, commonRow, args)
}

function cpArr(arr: object[]) {
  let temp: object[] = [];
  arr.forEach(a => {
    temp.push(toString.call(a) === '[object Object]' ? Object.assign({}, a) : a);
  });
  return temp;
}

function cp(from = {}, to = {}) {
  return Object.assign({}, to, from);
}

function formatToVsItem(data: any[]) {
  return (data || []).map((num) => ({n: String(num).padStart(2, '0')}));
}

const methodItems: any = {
  '1250:1' () {
    // ssc 双面
    return {
      layout: 'row',
      class: '',
      rows: [
        getCommonRow({n: '万位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '千位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '百位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '十位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '个位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]})
      ]
    }
  },
  '1251:1' () {
    // ssc '总和 大小单双', 
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '总和', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '总大', oddIndex: 2, col: 5}, {s: false, n: '小', pv: '总小', oddIndex: 2, col: 5}, {s: false, n: '单', pv: '总单', oddIndex: 2, col: 5}, {s: false, n: '双', pv: '总双', oddIndex: 2, col: 5}]})
      ]
    }
  },
  '1252:1' () {
    // ssc 数字
    return {
      layout: 'col',
      class: '',
      rows: [
        getCommonRow({n: '万位', hidePos: true, vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'},{s: false, n: '4'},{s: false, n: '5'},{s: false, n: '6'},{s: false, n: '7'},{s: false, n: '8'},{s: false, n: '9'}]}),
        getCommonRow({n: '千位', hidePos: true, vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'},{s: false, n: '4'},{s: false, n: '5'},{s: false, n: '6'},{s: false, n: '7'},{s: false, n: '8'},{s: false, n: '9'}]}),
        getCommonRow({n: '百位', hidePos: true, vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'},{s: false, n: '4'},{s: false, n: '5'},{s: false, n: '6'},{s: false, n: '7'},{s: false, n: '8'},{s: false, n: '9'}]}),
        getCommonRow({n: '十位', hidePos: true, vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'},{s: false, n: '4'},{s: false, n: '5'},{s: false, n: '6'},{s: false, n: '7'},{s: false, n: '8'},{s: false, n: '9'}]}),
        getCommonRow({n: '个位', hidePos: true, vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'},{s: false, n: '4'},{s: false, n: '5'},{s: false, n: '6'},{s: false, n: '7'},{s: false, n: '8'},{s: false, n: '9'}]})
      ]
    }
  },
  '1273:1' () {
    // ssc 龙虎和
    let vs = [{s: false, n: '龙', oddIndex: 1, col: 7}, {s: false, n: '和', oddIndex: 0, col: 7}, {s: false, n: '虎', oddIndex: 1, col: 7}];
    return {
      layout: 'row',
      class: 'no-bd-b-pos-label',
      rows: [
        getCommonRow({n: '万千', col: 3, p: '龙1vs虎2', vs: cpArr(vs)}),
        getCommonRow({n: '万百', col: 3, p: '龙1vs虎3', vs: cpArr(vs)}),
        getCommonRow({n: '万十', col: 3, p: '龙1vs虎4', vs: cpArr(vs)}),
        getCommonRow({n: '万个', col: 3, p: '龙1vs虎5', vs: cpArr(vs)}),
        getCommonRow({n: '千百', col: 3, p: '龙2vs虎3', vs: cpArr(vs)}),
        getCommonRow({n: '千十', col: 3, p: '龙2vs虎4', vs: cpArr(vs)}),
        getCommonRow({n: '千个', col: 3, p: '龙2vs虎5', vs: cpArr(vs)}),
        getCommonRow({n: '百十', col: 3, p: '龙3vs虎4', vs: cpArr(vs)}),
        getCommonRow({n: '百个', col: 3, p: '龙3vs虎5', vs: cpArr(vs)}),
        getCommonRow({n: '十个', col: 3, p: '龙4vs虎5', vs: cpArr(vs)})
      ]
    }
  },
  '1253:1' () {
    // ssc 定位
    let vs = [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'}, {s: false, n: '4'}, {s: false, n: '5'}, {s: false, n: '6'}, {s: false, n: '7'}, {s: false, n: '8'}, {s: false, n: '9'},{s: false, n: '大'}, {s: false, n: '小'}, {s: false, n: '单'}, {s: false, n: '双'}];
    return {
      layout: 'row layout-col-float',
      posOdd: false,
      rows: [
        getCommonRow({n: '万位', p: '万定位', oddIndex: 0, col: 3, class: 'circle small', vs: cpArr(vs)}),
        getCommonRow({n: '千位', p: '千定位', oddIndex: 0, col: 3, class: 'circle small', vs: cpArr(vs)}),
        getCommonRow({n: '百位', p: '百定位', oddIndex: 0, col: 3, class: 'circle small', vs: cpArr(vs)}),
        getCommonRow({n: '十位', p: '十定位', oddIndex: 0, col: 3, class: 'circle small', vs: cpArr(vs)}),
        getCommonRow({n: '个位', p: '个定位', oddIndex: 0, col: 3, class: 'circle small', vs: cpArr(vs)})
      ]
    }
  },
  '1256:1' () {
    // ssc 一字组合 全五一字
    return {
      layout: 'row layout-col-float',
      class: 'yzzh',
      rows: [
        getCommonRow({n: '全五一字', nonasv: true, oddIndex: 0, col: 4, class: 'circle large', vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'}, {s: false, n: '4'}, {s: false, n: '5'}, {s: false, n: '6'}, {s: false, n: '7'}, {s: false, n: '8'}, {s: false, n: '9'}]})
      ]
    }
  },
  '1257:1' () {
    // ssc 一字组合 前三一字
    return {
      layout: 'row layout-col-float',
      class: 'yzzh',
      rows: [
        getCommonRow({n: '前三一字', nonasv: true, oddIndex: 0, col: 4, class: 'circle large', vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'}, {s: false, n: '4'}, {s: false, n: '5'}, {s: false, n: '6'}, {s: false, n: '7'}, {s: false, n: '8'}, {s: false, n: '9'}]})
      ]
    }
  },
  '1258:1' () {
    // ssc 一字组合 中三一字
    return {
      layout: 'row layout-col-float',
      class: 'yzzh',
      rows: [
        getCommonRow({n: '中三一字', nonasv: true, oddIndex: 0, col: 4, class: 'circle large', vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'}, {s: false, n: '4'}, {s: false, n: '5'}, {s: false, n: '6'}, {s: false, n: '7'}, {s: false, n: '8'}, {s: false, n: '9'}]})
      ]
    }
  },
  '1259:1' () {
    // ssc 一字组合 后三一字
    return {
      layout: 'row layout-col-float',
      class: 'yzzh',
      rows: [
        getCommonRow({n: '后三一字', nonasv: true, oddIndex: 0, col: 4, class: 'circle large', vs: [{s: false, n: '0'}, {s: false, n: '1'}, {s: false, n: '2'}, {s: false, n: '3'}, {s: false, n: '4'}, {s: false, n: '5'}, {s: false, n: '6'}, {s: false, n: '7'}, {s: false, n: '8'}, {s: false, n: '9'}]})
      ]
    }
  },
  '1274:1' () {
    // ssc 二字组合 前三一字
    return {
      layout: 'row',
      class: '',
      rows: [
        getCommonRow({n: '前三', nonasv: true, col: 4, oddIndex: 0, class: '', vs: [{s: false, n: '豹子', oddIndex: 0, col: 4}, {s: false, n: '顺子', oddIndex: 1, col: 4}, {s: false, n: '对子', oddIndex: 2, col: 4}, {s: false, n: '半顺', oddIndex: 4, col: 4}, {s: false, n: '杂六', oddIndex: 3, col: 4}]})
      ]
    }
  },
  '1275:1' () {
    // ssc 二字组合 中三一字
    return {
      layout: 'row',
      class: '',
      rows: [
        getCommonRow({n: '中三', nonasv: true, col: 4, oddIndex: 0, class: '', vs: [{s: false, n: '豹子', oddIndex: 0, col: 4}, {s: false, n: '顺子', oddIndex: 1, col: 4}, {s: false, n: '对子', oddIndex: 2, col: 4}, {s: false, n: '半顺', oddIndex: 4, col: 4}, {s: false, n: '杂六', oddIndex: 3, col: 4}]})
      ]
    }
  },
  '1276:1' () {
    // ssc 二字组合 后三一字
    return {
      layout: 'row',
      class: '',
      rows: [
        getCommonRow({n: '后三', nonasv: true, col: 4, oddIndex: 0, class: '', vs: [{s: false, n: '豹子', oddIndex: 0, col: 4}, {s: false, n: '顺子', oddIndex: 1, col: 4}, {s: false, n: '对子', oddIndex: 2, col: 4}, {s: false, n: '半顺', oddIndex: 4, col: 4}, {s: false, n: '杂六', oddIndex: 3, col: 4}]})
      ]
    }
  },

  '2050:1' () {
    // 11x5
    // 总大,总小,总单,总双
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '总和', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '总大', oddIndex: 1, col: 5}, {s: false, n: '小', pv: '总小', oddIndex: 1, col: 5}, {s: false, n: '单', pv: '总单', oddIndex: 4, col: 5}, {s: false, n: '双', pv: '总双',  oddIndex: 0, col: 5}]})
      ]
    }
  },
  '2050:2' () {
    // 11x5
    // 和尾大,和尾小
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '总和尾', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '和尾大', oddIndex: 3, col: 10, pn: ''}, {s: false, n: '小', pv: '和尾小', oddIndex: 2, col: 10, pn: ''}]}),
      ]
    }
  },
  '2051:1' () {
    // 11x5大，小，单，双
    return {
      layout: 'row ',
      rows: [
        getCommonRow({n: '第一位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '第二位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '第三位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '第四位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]}),
        getCommonRow({n: '第五位', col: 4, vs: [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}]})
      ]
    }
  },
  '2052:1' () {
    // 11x5 定位
    let vs = [{s: false, n: '01'}, {s: false, n: '02'}, {s: false, n: '03'}, {s: false, n: '04'}, {s: false, n: '05'}, {s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}];
    return {
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '第一位', col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '第二位', col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '第三位', col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '第四位', col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '第五位', col: 4, class: 'circle medium', vs: cpArr(vs)})
      ]
    }
  },
  '2053:1' () {
    // 11x5
    // 龙，虎
    let vs = [{s: false, n: '龙', col: 9}, {s: false, n: '虎', col: 9}];
    return {
      layout: 'row',
      class: 'no-bd-b-pos-label',
      rows: [
        getCommonRow({n: '一位VS二位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '一位VS三位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '一位VS四位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '一位VS五位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS三位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS四位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS五位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '三位VS四位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '三位VS五位', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '四位VS五位', oddIndex: 0, col: 6, vs: cpArr(vs)})
      ]
    }
  },
  '2053:2' () {
    // 11x5
    // 龙，虎
    let vs = [{s: false, n: '龙', col: 10}, {s: false, n: '虎', col: 10}];
    return {
      layout: 'row',
      class: 'pos-label-fz24',
      rows: [
        getCommonRow({n: '一位VS二位', oddIndex: 0, col: 4, vs: cpArr(vs)})
      ]
    }
  },
  // '2054:1' () {
  //   // 11x5 任选
  //   return {
  //     layout: 'row',
  //      rows: [
  //       getCommonRow({nonasv: true, noodd: true, col: 4, class: 'circle medium', vs:[{s: false, n: '01', col: 8},{s: false, n: '02', col: 8},{s: false, n: '03', col: 8},{s: false, n: '04', col: 8},{s: false, n: '05', col: 8},{s: false, n: '06', col: 8},{s: false, n: '07', col: 8},{s: false, n: '08', col: 8},{s: false, n: '09', col: 8},{s: false, n: '10', col: 8},{s: false, n: '11', col: 8}]}),
  //     ]
  //   }
  // },
  '2054:1' () {
    // 11x5 任选 一中一
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '一中一', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2077:1' () {
    // 11x5 任选 二中二
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '二中二', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2078:1' () {
    // 11x5 任选 三中三
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '三中三', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2079:1' () {
    // 11x5 任选 四中四
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '四中四', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2080:1' () {
    // 11x5 任选 五中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '五中五', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2081:1' () {
    // 11x5 任选 六中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '六中五', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2082:1' () {
    // 11x5 任选 七中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '七中五', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2083:1' () {
    // 11x5 任选 八中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '八中五', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2055:1' () {
    // 11x5 前二组选 
    let c = {s: false, dis: false}
    let vs = [cp({n: '01'}, c), cp({n: '02'}, c), cp({n: '03'}, c), cp({n: '04'}, c), cp({n: '05'}, c), cp({n: '06'}, c), cp({n: '07'}, c), cp({n: '08'}, c), cp({n: '09'}, c), cp({n: '10'}, c), cp({n: '11'}, c)];
    return {
      methodTypeName: 'zux_q2',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前二组选', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium col-txt', vs: cpArr(vs)}),
      ]
    }
  },
  '2056:1' () {
    // 11选5 前三组选
    let c = {s: false, dis: false}
    let vs = [cp({n: '01'}, c), cp({n: '02'}, c), cp({n: '03'}, c), cp({n: '04'}, c), cp({n: '05'}, c), cp({n: '06'}, c), cp({n: '07'}, c), cp({n: '08'}, c), cp({n: '09'}, c), cp({n: '10'}, c), cp({n: '11'}, c)];
    return {
      methodTypeName: 'zux_q3',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前三组选', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium col-txt', vs: cpArr(vs)})
      ]
    }
  },
  '2057:1' () {
    // 11x5 前二直选
    let c = {s: false, dis: false}
    let vs = [cp({n: '01'}, c), cp({n: '02'}, c), cp({n: '03'}, c), cp({n: '04'}, c), cp({n: '05'}, c), cp({n: '06'}, c), cp({n: '07'}, c), cp({n: '08'}, c), cp({n: '09'}, c), cp({n: '10'}, c), cp({n: '11'}, c)];
    return {
      name: '前二直选',
      noodd: true,
      methodTypeName: 'zx_q2',
      choiceNoRepeat: true,
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前二直选', subpn: '(第一位)', pv: '第一位', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前二直选', subpn: '(第二位)', pv: '第二位', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)})
      ]
    }
  },
  '2058:1' () {
    // 11x5 前三直选
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'},{s: false, n: '11'}];
    return {
      name: '前三直选',
      noodd: true,
      methodTypeName: 'zx_q3',
      choiceNoRepeat: true,
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前三直选', subpn: '(第一位)', pv: '第一位', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前三直选', subpn: '(第二位)', pv: '第二位', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前三直选', subpn: '(第三位)', pv: '第三位', posOdd: true, noodd: true, nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)})
      ]
    }
  },

  '4050:1' () {
    // PK10
    // 冠亚和大, 冠亚和小， 冠亚和单，冠亚和双
    return {
      layout: 'row',
      class: '',
      rows: [
        getCommonRow({n: '冠亚和值', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '总大', oddIndex: 0, col: 5}, {s: false, n: '小', pv: '总小', oddIndex: 1, col: 5}, {s: false, n: '单', pv: '总单', oddIndex: 1, col: 5}, {s: false, n: '双', pv: '总双', oddIndex: 0, col: 5}]}),
      ]
    }
  },
  '4050:2' () {
    // PK10
    // 冠亚和大, 冠亚和小， 冠亚和单，冠亚和双
    return {
      layout: 'row',
      class: 'pd-l-12',
      rows: [
        getCommonRow({n: '冠亚和值', nonasv: true, col: 24, vs: [{s: false, n: '大', pv: '总大', oddIndex: 0, col: 6}, {s: false, n: '小', pv: '总小', oddIndex: 1, col: 6}, {s: false, n: '单', pv: '总单', oddIndex: 1, col: 6}, {s: false, n: '双', pv: '总双', oddIndex: 0, col: 6}]}),
      ]
    }
  },
  '4051:1' () {
    // PK10
    // 冠亚和大, 冠亚和小， 冠亚和单，冠亚和双 
    return {
      class: 'pd-l-12',
      rows: [
        getCommonRow({n: '', nonasv: true, hidePos: true, vs: [{s: false, n: '大单', oddIndex: 0, col: 6}, {s: false, n: '大双', oddIndex: 0, col: 6}, {s: false, n: '小单', oddIndex: 1, col: 6}, {s: false, n: '小双', oddIndex: 0, col: 6}]}),
      ]
    }
  },
  '4052:1' () {
    // PK10 冠亚和值-定位
    let c = {s: false, col: 6, dis: false}
    let vs = [cp({n: '03', pv: '3', oddIndex: 0}, c), cp({n: '04', pv: '4', oddIndex: 0}, c), cp({n: '05', pv: '5', oddIndex: 1}, c), cp({n: '06', pv: '6', oddIndex: 1}, c), cp({n: '07', pv: '7', oddIndex: 2}, c), cp({n: '08', pv: '8', oddIndex: 2}, c), cp({n: '09', pv: '9', oddIndex: 3}, c), cp({n: '10', pv: '10', oddIndex: 3}, c), cp({n: '11', pv: '11', oddIndex: 4}, c), cp({n: '12', pv: '12', oddIndex: 3}, c), cp({n: '13', pv: '13', oddIndex: 3}, c), cp({n: '14', pv: '14', oddIndex: 2}, c), cp({n: '15', pv: '15', oddIndex: 2}, c), cp({n: '16', pv: '16', oddIndex: 1}, c), cp({n: '17', pv: '17', oddIndex: 1}, c), cp({n: '18', pv: '18', oddIndex: 0}, c), cp({n: '19', pv: '19', oddIndex: 0}, c)];
    return {
      class: 'gyhz-dw pd-l-12',
      rows: [
        getCommonRow({n: '', hidePos: true, vs: cpArr(vs)})
      ]
    }
  },
  '4053:1' () {
    // PK10 大，小，单，双
    let vs = [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}];
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '冠军', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '亚军', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '季军',  col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '第四名', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '第五名', col: 4, vs: cpArr(vs)})
      ]
    }
  },
  '4053:2' () {
    // PK10 大，小，单，双
    let vs = [{s: false, n: '大', col: 5}, {s: false, n: '小', col: 5}, {s: false, n: '单', col: 5}, {s: false, n: '双', col: 5}];
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '第六名',col: 4,  vs: cpArr(vs)}),
        getCommonRow({n: '第七名', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '第八名', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '第九名', col: 4, vs: cpArr(vs)}),
        getCommonRow({n: '第十名', col: 4, vs: cpArr(vs)})
      ]
    }
  },
  '4054:1' () {
    // PK10 龙，虎
    let vs = [{s: false, n: '龙', col: 8}, {s: false, n: '虎', col: 8}];
    return {
      layout: 'row',
      class: 'no-bd-b-pos-label',
      rows: [
        getCommonRow({n: '冠军VS第十名', oddIndex: 0, col: 8, vs: cpArr(vs)}),
        getCommonRow({n: '亚军VS第九名', oddIndex: 0, col: 8, vs: cpArr(vs)}),
        getCommonRow({n: '季军VS第八名', oddIndex: 0, col: 8, vs: cpArr(vs)}),
        getCommonRow({n: '第四名VS第七名', oddIndex: 0, col: 8, vs: cpArr(vs)}),
        getCommonRow({n: '第五名VS第六名', oddIndex: 0, col: 8, vs: cpArr(vs)})
      ]
    }
  },
  '4055:1:1' () {
    // PK10 定位胆 冠军,亚军,季军,第四名,第五名
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'}];
    return {
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '冠军', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '亚军', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '季军', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第四名', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第五名', col: 4, class: 'circle large', vs: cpArr(vs)})
      ]
    }
  },
  '4055:1:2' () {
    // PK10 定位胆 第六名,第七名,第八名,第九名,第十名
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'}];
    return {
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '第六名', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第七名', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第八名', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第九名', col: 4, class: 'circle large', vs: cpArr(vs)}),
        getCommonRow({n: '第十名', col: 4, class: 'circle large', vs: cpArr(vs)})
      ]
    }
  },
  '5050:1' () {
    // K3 大小单双
    let vs = [{s: false, n: '大', col: 10, rcol: 12}, {s: false, n: '小', col: 10, rcol: 12}, {s: false, n: '单', col: 10, rcol: 12}, {s: false, n: '双', col: 10, rcol: 12}];
    return {
      layout: 'row layout-col-float',
      class: 'zhonghe',
      rows: [
        getCommonRow({nonasv: true, n: '总和', col: 4, vs: cpArr(vs)}),
      ]
    }
  },
  '5051:1' () {
    // K3 点数
    return {
      layout: 'row layout-col-float',
      class: 'dianshu',
      rows: [
        getCommonRow({nonasv: true, n: '点数', col: 4, height: 5, vs:[{s: false, n: '4', col: 5, oddIndex: 0},{s: false, n: '5', col: 5, pv: '5', oddIndex: 1},{s: false, n: '6', col: 5, pv: '6', oddIndex: 2},{s: false, n: '7', col: 5, pv: '7', oddIndex: 3},{s: false, n: '8', col: 5, pv: '8', oddIndex: 4},{s: false, n: '9', col: 5, pv: '9', oddIndex: 5},{s: false, n: '10', col: 5, pv: '10', oddIndex: 6},{s: false, n: '11', col: 5, pv: '11', oddIndex: 6},{s: false, n: '12', col: 5, pv: '12', oddIndex: 5},{s: false, n: '13', col: 5, pv: '13', oddIndex: 4},{s: false, n: '14', col: 5, pv: '14', oddIndex: 3},{s: false, n: '15', col: 5, pv: '15', oddIndex: 2},{s: false, n: '16', col: 5, pv: '16', oddIndex: 1},{s: false, n: '17', col: 5, pv: '17', oddIndex: 0}]}),
      ]
    }
  },
  '5052:1' () {
    // K3 三军
    const vs = [{s: false, n: '1', col: 7, class: 'icon', icons: [1]}, {s: false, n: '2', col: 7, class: 'icon', icons: [2]}, {s: false, n: '3', col: 7, class: 'icon', icons: [3]}, {s: false, n: '4', col: 7, class: 'icon', icons: [4]}, {s: false, n: '5', col: 7, class: 'icon', icons: [5]}, {s: false, n: '6', col: 7, class: 'icon', icons: [6]}];
    return {
      layout: 'row layout-col-float',
      class: 'pos-label-h-2',
      rows: [
        getCommonRow({nonasv: true, n: '三军', col: 3, vs: cpArr(vs)}),
      ]
    }
  },
  '5053:1' () {
    // K3 围骰/全骰
    const vs = [
      {s: false, n: '1', col: 10, class: 'icon', icons: [1,1,1]}, 
      {s: false, n: '2', col: 10, class: 'icon', icons: [2,2,2]}, 
      {s: false, n: '3', col: 10, class: 'icon', icons: [3,3,3]}, 
      {s: false, n: '4', col: 10, class: 'icon', icons: [4,4,4]}, 
      {s: false, n: '5', col: 10, class: 'icon', icons: [5,5,5]}, 
      {s: false, n: '6', col: 10, class: 'icon', icons: [6,6,6]}
    ];
    return {
      layout: 'row layout-col-float',
      class: 'weishaiquanshai',
      rows: [
        getCommonRow({nonasv: true, n: '围骰', class: 'weishai', oddIndex: 0, col: 4, vs: cpArr(vs)}),
        getCommonRow({nonasv: true, n: '全骰', class: 'quanshai', col: 4, vs: [{s: false, n: '全骰', oddIndex: 1, col: 10}]})
      ]
    }
  },
  '5054:1' () {
    // K3 长牌
    let c = {s: false, col: 7, class: 'icon'};
    let vs = [cp({n: '12', icons: [1,2]}, c), cp({n: '13', icons: [1,3]}, c), cp({n: '14', icons: [1,4]}, c), cp({n: '15', icons: [1,5]}, c), cp({n: '16', icons: [1,6]}, c), cp({n: '23', icons: [2,3]}, c), cp({n: '24', icons: [2,4]}, c), cp({n: '25', icons: [2,5]}, c), cp({n: '26', icons: [2,6]}, c), cp({n: '34', icons: [3,4]}, c), cp({n: '35', icons: [3,5]}, c), cp({n: '36', icons: [3,6]}, c), cp({n: '45', icons: [4,5]}, c), cp({n: '46', icons: [4,6]}, c), cp({n: '56', icons: [5,6]}, c) ]
    return {
      layout: 'row layout-col-float',
      class: 'changpai',
      rows: [
        getCommonRow({nonasv: true, n: '长牌', height: 8, col: 3, vs: cpArr(vs)})
      ]
    }
  },
  '5055:1' () {
    // K3 短牌
    let vs = [{s: false, n: '1', col: 10, class: 'icon', icons: [1,1], pv: '1'}, {s: false, n: '2', col: 10, class: 'icon', icons: [2,2], pv: '2'}, {s: false, n: '3', col: 10, class: 'icon', icons: [3,3], pv: '3'}, {s: false, n: '4', col: 10, class: 'icon', icons: [4,4], pv: '4'}, {s: false, n: '5', col: 10, class: 'icon', icons: [5,5], pv: '5'}, {s: false, n: '6', col: 10, class: 'icon', icons: [6,6], pv: '6'}];
    return {
      layout: 'row layout-col-float',
      class: 'pos-label-h-3',
      rows: [
        getCommonRow({nonasv: true, n: '短牌', col: 4, vs: cpArr(vs)})
      ]
    }
  },
  '5056:1' () {
    // K3 颜色
    let vs = [{s: false, n: '全红', col: 10, oddIndex: 0}, {s: false, n: '全黑', col: 10, oddIndex: 2}, {s: false, n: '1红2黑', col: 10, oddIndex: 3}, {s: false, n: '2红1黑', col: 10, oddIndex: 1}];
    return {
      class: 'pos-label-h-2',
      rows: [
        getCommonRow({nonasv: true, n: '颜色', col: 4, vs: cpArr(vs)}),
      ]
    }
  },
  '5057:1' () {
    // K3 跨度
    let vs = [{s: false, n: '0', col: 7, oddIndex: 0, pv: '0'}, {s: false, n: '1', col: 7, oddIndex: 1, pv: '1'}, {s: false, n: '2', col: 7, oddIndex: 2, pv: '2'}, {s: false, n: '3', col: 7, oddIndex: 3, pv: '3'}, {s: false, n: '4', col: 7, oddIndex: 2, pv: '4'}, {s: false, n: '5', col: 7, oddIndex: 1, pv: '5'}];
    return {
      class: 'pos-label-h-2',
      rows: [
        getCommonRow({nonasv: true, n: '跨度', col: 3, vs: cpArr(vs)})
      ]
    }
  },

  // 六合彩
  // 特码
  '7001:1' () {
    let vs = [];
    for (let i = 1; i <= 49; i++) {
      vs.push({s: false, n: String(i).padStart(2, '0'), col: 6, pv: i});
    }
    return {
      class: 'pd-b-12',
      rows: [
        getCommonRow({n: '', hidePos: true, class: 'ncircle xsmall', vs})
      ]
    }
  },
  // 正码
  '7006:1' () {
    return {
      rows: [
        getCommonRow({})
      ]
    }
  },
  // 特肖
  '7007:1' () {
    return {
      layout: 'row',
      class: 'pos-label-row row-bar no-slt-m-item texiao',
      methodTypeName: 'texiao',
      calcMode: 'row',
      rows: [
        getCommonRow({s: false, n: '鼠', pv: 1, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 1, vs: formatToVsItem(AtoN('鼠'))}),
        getCommonRow({s: false, n: '牛', pv: 2, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('牛'))}),
        getCommonRow({s: false, n: '虎', pv: 3, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('虎'))}),
        getCommonRow({s: false, n: '兔', pv: 4, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('兔'))}),
        getCommonRow({s: false, n: '龙', pv: 5, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('龙'))}),
        getCommonRow({s: false, n: '蛇', pv: 6, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('蛇'))}),
        getCommonRow({s: false, n: '马', pv: 7, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('马'))}),
        getCommonRow({s: false, n: '羊', pv: 8, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('羊'))}),
        getCommonRow({s: false, n: '猴', pv: 9, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('猴'))}),
        getCommonRow({s: false, n: '鸡', pv: 10, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('鸡'))}),
        getCommonRow({s: false, n: '狗', pv: 11, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('狗'))}),
        getCommonRow({s: false, n: '猪', pv: 12, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(AtoN('猪'))})
      ]
    }
  },
  // 波色
  '7005:1' () {
    return {
      layout: 'row layout-col-float',
      class: 'pos-label-row no-slt-m-item row-bar row-bg-white sebo',
      calcMode: 'row',
      rows: [
        getCommonRow({n: '红', pv: 1, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 1, vs: formatToVsItem(CtoN('red'))}),
        getCommonRow({n: '蓝', pv: 2, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(CtoN('blue'))}),
        getCommonRow({n: '绿', pv: 3, posOdd: true, noodd: true, class: 'ncircle xsmall no-m-item-bg', oddIndex: 0, vs: formatToVsItem(CtoN('green'))})
      ]
    }
  },
  // 一肖
  '7008:1' () {
    return {
      rows: [
        getCommonRow({col: 'col-100', oddIndex: 0, t: 'number', vs: [
          {s: false, n: '鼠', v: 1, tails: AtoN('鼠')},
          {s: false, n: '牛', v: 2, tails: AtoN('牛')},
          {s: false, n: '虎', v: 3, tails: AtoN('虎')},
          {s: false, n: '兔', v: 4, tails: AtoN('兔')},
          {s: false, n: '龙', v: 5, tails: AtoN('龙')},
          {s: false, n: '蛇', v: 6, tails: AtoN('蛇')},
          {s: false, n: '马', v: 7, tails: AtoN('马')},
          {s: false, n: '羊', v: 8, tails: AtoN('羊')},
          {s: false, n: '猴', v: 9, tails: AtoN('猴')},
          {s: false, n: '鸡', v: 10, tails: AtoN('鸡')},
          {s: false, n: '狗', v: 11, tails: AtoN('狗')},
          {s: false, n: '猪', v: 12, tails: AtoN('猪'), oddIndex: 1},
        ]})
      ]
    }
  },
  // 2连肖
  '7002:1' () {
    return this['7008:1']()
  },
  // 3连肖
  '7003:1' () {
    return this['7008:1']()
  },
  // 4连肖
  '7004:1' () {
    return this['7008:1']()
  },
  // '正一码'
  '7009:1' () {
    let vs = [];
    for (let i = 1; i <= 49; i++) {
      vs.push({s: false, n: String(i).padStart(2, '0'), col: 6, pv: i});
    }
    return {
      class: 'pd-b-12',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正一码大', pv: 1, col: 6}, {s: false, n: '正一码小', pv: 2, col: 6}, {s: false, n: '正一码单', pv: 3, col: 6}, {s: false, n: '正一码双', pv: 4, col: 6}]}),
        // getCommonRow({n: '', hidePos: true, class: 'ncircle xsmall', vs})
      ]
    }
  },
  // '正二码'
  '7010:1' () {
    // return this['7009:1']()
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正二码大', pv: 1, col: 6}, {s: false, n: '正二码小', pv: 2, col: 6}, {s: false, n: '正二码单', pv: 3, col: 6}, {s: false, n: '正二码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '正三码'
  '7011:1' () {
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正三码大', pv: 1, col: 6}, {s: false, n: '正三码小', pv: 2, col: 6}, {s: false, n: '正三码单', pv: 3, col: 6}, {s: false, n: '正三码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '正四码'
  '7012:1' () {
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正四码大', pv: 1, col: 6}, {s: false, n: '正四码小', pv: 2, col: 6}, {s: false, n: '正四码单', pv: 3, col: 6}, {s: false, n: '正四码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '正五码'
  '7013:1' () {
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正五码大', pv: 1, col: 6}, {s: false, n: '正五码小', pv: 2, col: 6}, {s: false, n: '正五码单', pv: 3, col: 6}, {s: false, n: '正五码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '正六码'
  '7014:1' () {
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '正六码大', pv: 1, col: 6}, {s: false, n: '正六码小', pv: 2, col: 6}, {s: false, n: '正六码单', pv: 3, col: 6}, {s: false, n: '正六码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '特码'
  '7015:1' () {
    // return this['7009:1']()
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, class: '', vs: [{s: false, n: '特码大', pv: 1, col: 6}, {s: false, n: '特码小', pv: 2, col: 6}, {s: false, n: '特码单', pv: 3, col: 6}, {s: false, n: '特码双', pv: 4, col: 6}]})
      ]
    }
  },
  // '正特和值'
  '7016:1' () {
    return this['7009:1']()
  },
  // '1尾'
  '7017:1' () {
    return {
      rows: [
        getCommonRow({n: '1尾', vs: [
          {s: false, n: 0, v: 0, oddIndex: 0},
          {s: false, n: 1, v: 1, oddIndex: 1},
          {s: false, n: 2, v: 2, oddIndex: 1},
          {s: false, n: 3, v: 3, oddIndex: 1},
          {s: false, n: 4, v: 4, oddIndex: 1},
          {s: false, n: 5, v: 5, oddIndex: 1},
          {s: false, n: 6, v: 6, oddIndex: 1},
          {s: false, n: 7, v: 7, oddIndex: 1},
          {s: false, n: 8, v: 8, oddIndex: 1},
          {s: false, n: 9, v: 9, oddIndex: 1},
        ]})
      ]
    }
  }
};

export default methodItems;


