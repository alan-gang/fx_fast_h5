
let commonRow = {
  // 名字
  n: '',
  // 最小值
  min: 0,
  // 最大值
  max: 9,
  vs: null,
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
      class: '  no-bd-b-pos-label',
      rows: [
        getCommonRow({n: '万千', col: 3, p: '龙1vs虎2', nstyle: 'lhh_1v2', vs: cpArr(vs)}),
        getCommonRow({n: '万百', col: 3, p: '龙1vs虎3', nstyle: 'lhh_1v3', vs: cpArr(vs)}),
        getCommonRow({n: '万十', col: 3, p: '龙1vs虎4', nstyle: 'lhh_1v4', vs: cpArr(vs)}),
        getCommonRow({n: '万个', col: 3, p: '龙1vs虎5', nstyle: 'lhh_1v5', vs: cpArr(vs)}),
        getCommonRow({n: '千百', col: 3, p: '龙2vs虎3', nstyle: 'lhh_2v3', vs: cpArr(vs)}),
        getCommonRow({n: '千十', col: 3, p: '龙2vs虎4', nstyle: 'lhh_2v4', vs: cpArr(vs)}),
        getCommonRow({n: '千个', col: 3, p: '龙2vs虎5', nstyle: 'lhh_2v5', vs: cpArr(vs)}),
        getCommonRow({n: '百十', col: 3, p: '龙3vs虎4', nstyle: 'lhh_3v4', vs: cpArr(vs)}),
        getCommonRow({n: '百个', col: 3, p: '龙3vs虎5', nstyle: 'lhh_3v5', vs: cpArr(vs)}),
        getCommonRow({n: '十个', col: 3, p: '龙4vs虎5', nstyle: 'lhh_4v5', vs: cpArr(vs)})
      ]
    }
  },
  // '1274:1' () {
  //   // ssc 牌型
  //   let vs = [{s: false, n: '豹子', oddIndex: 0, col: 7}, {s: false, n: '顺子', oddIndex: 1, col: 7}, {s: false, n: '对子', oddIndex: 0, col: 2}, {s: false, n: '半顺', oddIndex: 4, col: 7}, {s: false, n: '杂六', oddIndex: 3, col: 7}];
  //   return {
  //     rows: [
  //       getCommonRow({n: '前三', col: 3, vs: cpArr(vs)})
  //     ]
  //   }
  // },
  // '1275:1' () {
  //   // ssc 牌型
  //   let vs = [{s: false, n: '豹子', oddIndex: 0, col: 7}, {s: false, n: '顺子', oddIndex: 1, col: 7}, {s: false, n: '对子', oddIndex: 0, col: 2}, {s: false, n: '半顺', oddIndex: 4, col: 7}, {s: false, n: '杂六', oddIndex: 3, col: 7}];
  //   return {
  //     rows: [
  //       getCommonRow({n: '中三', col: 3, vs: cpArr(vs)})
  //     ]
  //   }
  // },
  // '1276:1' () {
  //   // ssc 牌型
  //   let vs = [{s: false, n: '豹子', oddIndex: 0, col: 7}, {s: false, n: '顺子', oddIndex: 1, col: 7}, {s: false, n: '对子', oddIndex: 0, col: 2}, {s: false, n: '半顺', oddIndex: 4, col: 7}, {s: false, n: '杂六', oddIndex: 3, col: 7}];
  //   return {
  //     rows: [
  //       getCommonRow({n: '后三', col: 3, vs: cpArr(vs)})
  //     ]
  //   }
  // },
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
        getCommonRow({n: '总和', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '总大', oddIndex: 1, col: 5}, {s: false, n: '小', pv: '总小', oddIndex: 1, col: 5}, {s: false, n: '单', pv: '总单', oddIndex: 2, col: 5}, {s: false, n: '双', pv: '总双',  oddIndex: 0, col: 5}]})
      ]
    }
  },
  '2050:2' () {
    // 11x5
    // 和尾大,和尾小
    return {
      layout: 'row',
      rows: [
        getCommonRow({n: '总和尾', nonasv: true, col: 4, vs: [{s: false, n: '大', pv: '和尾大', oddIndex: 1, col: 10, pn: ''}, {s: false, n: '小', pv: '和尾小', oddIndex: 1, col: 10, pn: ''}]}),
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
        getCommonRow({n: '一位VS三位', nstyle: 'lh_1v3', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '一位VS四位', nstyle: 'lh_1v4', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '一位VS五位', nstyle: 'lh_1v5', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS三位', nstyle: 'lh_2v3', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS四位', nstyle: 'lh_2v4', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '二位VS五位', nstyle: 'lh_2v5', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '三位VS四位', nstyle: 'lh_3v4', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '三位VS五位', nstyle: 'lh_3v5', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '四位VS五位', nstyle: 'lh_4v5', oddIndex: 0, col: 6, vs: cpArr(vs)})
      ]
    }
  },
  '2053:2' () {
    // 11x5
    // 龙，虎
    let vs = [{s: false, n: '龙', col: 10}, {s: false, n: '虎', col: 10}];
    return {
      class: 'row',
      rows: [
        getCommonRow({n: '一位VS二位', oddIndex: 0, col: 4, vs: cpArr(vs)})
      ]
    }
  },
  '2054:1' () {
    // 11x5 任选
    return {
      class: 'row',
       rows: [
        getCommonRow({nonasv: true, noodd: true, col: 4, class: 'circle medium', vs:[{s: false, n: '01', col: 8},{s: false, n: '02', col: 8},{s: false, n: '03', col: 8},{s: false, n: '04', col: 8},{s: false, n: '05', col: 8},{s: false, n: '06', col: 8},{s: false, n: '07', col: 8},{s: false, n: '08', col: 8},{s: false, n: '09', col: 8},{s: false, n: '10', col: 8},{s: false, n: '11', col: 8}]}),
      ]
    }
  },
  '2054:1:1' () {
    // 11x5 任选 一中一
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '一中一', nonasv: true, noodd: true, noInput: true, oddIndex: 7, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:2' () {
    // 11x5 任选 二中二
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '二中二', nonasv: true, noodd: true, noInput: true, oddIndex: 6, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:3' () {
    // 11x5 任选 三中三
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '三中三', nonasv: true, noodd: true, noInput: true, oddIndex: 4, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:4' () {
    // 11x5 任选 四中四
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '四中四', nonasv: true, noodd: true, noInput: true, oddIndex: 2, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:5' () {
    // 11x5 任选 五中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '五中五', nonasv: true, noodd: true, noInput: true, oddIndex: 0, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:6' () {
    // 11x5 任选 六中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '六中五', nonasv: true, noodd: true, noInput: true, oddIndex: 1, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:7' () {
    // 11x5 任选 七中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '七中五', nonasv: true, noodd: true, noInput: true, oddIndex: 3, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
      ]
    }
  },
  '2054:1:8' () {
    // 11x5 任选 八中五
    return {
      methodTypeName: 'rx_nzn',
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '八中五', nonasv: true, noodd: true, noInput: true, oddIndex: 5, col: 4, class: 'circle medium', vs:[{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'}, {s: false, n: '07'}, {s: false, n: '08'}, {s: false, n: '09'}, {s: false, n: '10'}, {s: false, n: '11'}]})
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
        getCommonRow({n: '前二组选', nonasv: true, col: 4, class: 'circle medium col-txt', vs: cpArr(vs)}),
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
        getCommonRow({n: '前三组选', nonasv: true, col: 4, class: 'circle medium col-txt', vs: cpArr(vs)})
      ]
    }
  },
  '2057:1' () {
    // 11x5 前二直选
    let c = {s: false, dis: false}
    let vs = [cp({n: '01'}, c), cp({n: '02'}, c), cp({n: '03'}, c), cp({n: '04'}, c), cp({n: '05'}, c), cp({n: '06'}, c), cp({n: '07'}, c), cp({n: '08'}, c), cp({n: '09'}, c), cp({n: '10'}, c), cp({n: '11'}, c)];
    return {
      name: '前二直选',
      nstyle: '',
      height: 3,
      noodd: true,
      methodTypeName: 'zx_q2',
      choiceNoRepeat: true,
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前二直选', subn: '(第一位)', pv: '第一位', nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前二直选', subn: '(第二位)', pv: '第二位', nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)})
      ]
    }
  },
  '2058:1' () {
    // 11x5 前三直选
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'},{s: false, n: '11'}];
    return {
      name: '前三直选',
      nstyle: '',
      height: 3,
      noodd: true,
      methodTypeName: 'zx_q3',
      choiceNoRepeat: true,
      layout: 'row layout-col-float',
      rows: [
        getCommonRow({n: '前三直选', subn: '(第一位)', pv: '第一位', nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前三直选', subn: '(第二位)', pv: '第二位', nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)}),
        getCommonRow({n: '前三直选', subn: '(第三位)', pv: '第三位', nonasv: true, col: 4, class: 'circle medium', vs: cpArr(vs)})
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
        getCommonRow({n: '冠亚和值', nonasv: true, col: 24, vs: [{s: false, n: '大', pv: '总大', oddIndex: 0, col: 6}, {s: false, n: '小', pv: '总小', oddIndex: 1, col: 6}, {s: false, n: '单', pv: '总单', oddIndex: 1, col: 6}, {s: false, n: '双', pv: '总双', oddIndex: 0, col: 6}]}),
      ]
    }
  },
  '4051:1' () {
    // PK10
    // 冠亚和大, 冠亚和小， 冠亚和单，冠亚和双 
    return {
      class: ' ',
      rows: [
        getCommonRow({nonasv: true, hidePos: true, vs: [{s: false, n: '大单', oddIndex: 0, col: 6}, {s: false, n: '大双', oddIndex: 1, col: 6}, {s: false, n: '小单', oddIndex: 1, col: 6}, {s: false, n: '小双', oddIndex: 0, col: 6}]}),
      ]
    }
  },
  '4052:1' () {
    // PK10 冠亚和值-定位
    let c = {s: false, col: 6, dis: false}
    let vs = [cp({n: '03', pv: '3', oddIndex: 0}, c), cp({n: '04', pv: '4', oddIndex: 0}, c), cp({n: '05', pv: '5', oddIndex: 1}, c), cp({n: '06', pv: '6', oddIndex: 1}, c), cp({n: '07', pv: '7', oddIndex: 2}, c), cp({n: '08', pv: '8', oddIndex: 2}, c), cp({n: '09', pv: '9', oddIndex: 3}, c), cp({n: '10', pv: '10', oddIndex: 3}, c), cp({n: '11', pv: '11', oddIndex: 4}, c), cp({n: '12', pv: '12', oddIndex: 3}, c), cp({n: '13', pv: '13', oddIndex: 3}, c), cp({n: '14', pv: '14', oddIndex: 2}, c), cp({n: '15', pv: '15', oddIndex: 2}, c), cp({n: '16', pv: '16', oddIndex: 1}, c), cp({n: '17', pv: '17', oddIndex: 1}, c), cp({n: '18', pv: '18', oddIndex: 0}, c), cp({n: '19', pv: '19', oddIndex: 0}, c)];
    return {
      class: '',
      rows: [
        getCommonRow({n: '', hidePos: true, vs: cpArr(vs)})
      ]
    }
  },
  '4053:1' () {
    // PK10 大，小，单，双
    let vs = [{s: false, n: '大'}, {s: false, n: '小'}, {s: false, n: '单'}, {s: false, n: '双'}];
    return {
      layout: 'col',
      rows: [
        getCommonRow({n: '冠军', vs: cpArr(vs)}),
        getCommonRow({n: '亚军', vs: cpArr(vs)}),
        getCommonRow({n: '季军',  vs: cpArr(vs)}),
        getCommonRow({n: '第四名', vs: cpArr(vs)}),
        getCommonRow({n: '第五名', vs: cpArr(vs)})
      ]
    }
  },
  '4053:2' () {
    // PK10 大，小，单，双
    let vs = [{s: false, n: '大'}, {s: false, n: '小'}, {s: false, n: '单'}, {s: false, n: '双'}];
    return {
      layout: 'col',
      rows: [
        getCommonRow({n: '第六名', vs: cpArr(vs)}),
        getCommonRow({n: '第七名', vs: cpArr(vs)}),
        getCommonRow({n: '第八名',  vs: cpArr(vs)}),
        getCommonRow({n: '第九名', vs: cpArr(vs)}),
        getCommonRow({n: '第十名', vs: cpArr(vs)})
      ]
    }
  },
  '4054:1' () {
    // PK10 龙，虎
    let vs = [{s: false, n: '龙', col: 8}, {s: false, n: '虎', col: 8}];
    return {
      layout: 'row',
      class: '  no-bd-b-pos-label',
      rows: [
        getCommonRow({n: '冠军VS第十名', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '亚军VS第九名', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '季军VS第八名', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '第四名VS第七名', oddIndex: 0, col: 6, vs: cpArr(vs)}),
        getCommonRow({n: '第五名VS第六名', oddIndex: 0, col: 6, vs: cpArr(vs)})
      ]
    }
  },
  '4055:1:1' () {
    // PK10 定位胆 冠军,亚军,季军,第四名,第五名
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'}];
    return {
      layout: 'col',
      rows: [
        getCommonRow({n: '冠军', vs: cpArr(vs)}),
        getCommonRow({n: '亚军', vs: cpArr(vs)}),
        getCommonRow({n: '季军', vs: cpArr(vs)}),
        getCommonRow({n: '第四名', vs: cpArr(vs)}),
        getCommonRow({n: '第五名', vs: cpArr(vs)})
      ]
    }
  },
  '4055:1:2' () {
    // PK10 定位胆 第六名,第七名,第八名,第九名,第十名
    let vs = [{s: false, n: '01'},{s: false, n: '02'},{s: false, n: '03'},{s: false, n: '04'},{s: false, n: '05'},{s: false, n: '06'},{s: false, n: '07'},{s: false, n: '08'},{s: false, n: '09'},{s: false, n: '10'}];
    return {
      layout: 'col',
      rows: [
        getCommonRow({n: '第六名', vs: cpArr(vs)}),
        getCommonRow({n: '第七名', vs: cpArr(vs)}),
        getCommonRow({n: '第八名', vs: cpArr(vs)}),
        getCommonRow({n: '第九名', vs: cpArr(vs)}),
        getCommonRow({n: '第十名', vs: cpArr(vs)})
      ]
    }
  },
  '5050:1' () {
    // K3 大小单双
    let vs = [{s: false, n: '大', col: 6, rcol: 12}, {s: false, n: '小', col: 6, rcol: 12}, {s: false, n: '单', col: 6, rcol: 12}, {s: false, n: '双', col: 6, rcol: 12}];
    return {
      layout: 'row',
      rows: [
        getCommonRow({nonasv: true, n: '总和', col: 24, vs: cpArr(vs)}),
      ]
    }
  },
  '5051:1' () {
    // K3 点数
    return {
      layout: 'row',
      rows: [
        getCommonRow({nonasv: true, n: '点数', col: 24, height: 5, vs:[{s: false, n: '4', col: 6, oddIndex: 0},{s: false, n: '5', col: 6, pv: '5', oddIndex: 1},{s: false, n: '6', col: 6, pv: '6', oddIndex: 2},{s: false, n: '7', col: 6, pv: '7', oddIndex: 3},{s: false, n: '8', col: 6, pv: '8', oddIndex: 4},{s: false, n: '9', col: 6, pv: '9', oddIndex: 5},{s: false, n: '10', col: 6, pv: '10', oddIndex: 6},{s: false, n: '11', col: 6, pv: '11', oddIndex: 6},{s: false, n: '12', col: 6, pv: '12', oddIndex: 5},{s: false, n: '13', col: 6, pv: '13', oddIndex: 4},{s: false, n: '14', col: 6, pv: '14', oddIndex: 3},{s: false, n: '15', col: 6, pv: '15', oddIndex: 2},{s: false, n: '16', col: 6, pv: '16', oddIndex: 1},{s: false, n: '17', col: 6, pv: '17', oddIndex: 0}]}),
      ]
    }
  },
  '5052:1' () {
    // K3 三军
    let vs = [{s: false, n: '1', col: 8, class: 'icon', icons: [1]}, {s: false, n: '2', col: 8, class: 'icon', icons: [2]}, {s: false, n: '3', col: 8, class: 'icon', icons: [3]}, {s: false, n: '4', col: 8, class: 'icon', icons: [4]}, {s: false, n: '5', col: 8, class: 'icon', icons: [5]}, {s: false, n: '6', col: 8, class: 'icon', icons: [6]}];
    return {
      rows: [
        getCommonRow({nonasv: true, n: '三军', vs: cpArr(vs)}),
      ]
    }
  },
  '5053:1' () {
    // K3 围骰/全骰
    let vs = [
      {s: false, n: '1', col: 12, class: 'icon', icons: [1,1,1]}, 
      {s: false, n: '2', col: 12, class: 'icon', icons: [2,2,2]}, 
      {s: false, n: '3', col: 12, class: 'icon', icons: [3,3,3]}, 
      {s: false, n: '4', col: 12, class: 'icon', icons: [4,4,4]}, 
      {s: false, n: '5', col: 12, class: 'icon', icons: [5,5,5]}, 
      {s: false, n: '6', col: 12, class: 'icon', icons: [6,6,6]},
      {s: false, n: '全骰', col: 12, class: 'white-bg-img'}
    ];
    return {
      rows: [
        getCommonRow({nonasv: true, n: '围骰', oddIndex: 0, vs: cpArr(vs)})
        // getCommonRow({nonasv: true, n: '全骰', oddIndex: 1, vs: [{s: false, n: '全骰', col: 10}]})
      ]
    }
  },
  '5054:1' () {
    // K3 长牌
    let c = {s: false, col: 8, class: 'icon'};
    let vs = [cp({n: '12', icons: [1,2]}, c), cp({n: '13', icons: [1,3]}, c), cp({n: '14', icons: [1,4]}, c), cp({n: '15', icons: [1,5]}, c), cp({n: '16', icons: [1,6]}, c), cp({n: '23', icons: [2,3]}, c), cp({n: '24', icons: [2,4]}, c), cp({n: '25', icons: [2,5]}, c), cp({n: '26', icons: [2,6]}, c), cp({n: '34', icons: [3,4]}, c), cp({n: '35', icons: [3,5]}, c), cp({n: '36', icons: [3,6]}, c), cp({n: '45', icons: [4,5]}, c), cp({n: '46', icons: [4,6]}, c), cp({n: '56', icons: [5,6]}, c) ]
    return {
      rows: [
        getCommonRow({nonasv: true, n: '长牌', height: 8, class: "cp", vs: cpArr(vs)}),
      ]
    }
  },
  '5055:1' () {
    // K3 短牌
    let vs = [{s: false, n: '1', col: 8, class: 'icon', icons: [1,1], pv: '1'}, {s: false, n: '2', col: 8, class: 'icon', icons: [2,2], pv: '2'}, {s: false, n: '3', col: 8, class: 'icon', icons: [3,3], pv: '3'}, {s: false, n: '4', col: 8, class: 'icon', icons: [4,4], pv: '4'}, {s: false, n: '5', col: 8, class: 'icon', icons: [5,5], pv: '5'}, {s: false, n: '6', col: 8, class: 'icon', icons: [6,6], pv: '6'}];
    return {
      rows: [
        getCommonRow({nonasv: true, n: '短牌', vs: cpArr(vs)}),
      ]
    }
  },
  '5056:1' () {
    // K3 颜色
    let vs = [{s: false, n: '全红', col: 12, oddIndex: 0, class: 'white-bg-img'}, {s: false, n: '全黑', col: 12, oddIndex: 1, class: 'white-bg-img'}, {s: false, n: '1红2黑', col: 12, oddIndex: 2, class: 'white-bg-img'}, {s: false, n: '2红1黑', col: 12, oddIndex: 3, class: 'white-bg-img'}];
    return {
      rows: [
        getCommonRow({nonasv: true, n: '颜色', nstyle: 'ys', vs: cpArr(vs)}),
      ]
    }
  },
  '5057:1' () {
    // K3 跨度
    let vs = [{s: false, n: '0', col: 8, oddIndex: 0, pv: '0'}, {s: false, n: '1', col: 8, oddIndex: 1, pv: '1'}, {s: false, n: '2', col: 8, oddIndex: 2, pv: '2'}, {s: false, n: '3', col: 8, oddIndex: 3, pv: '3'}, {s: false, n: '4', col: 8, oddIndex: 2, pv: '4'}, {s: false, n: '5', col: 8, oddIndex: 3, pv: '5'}];
    return {
      rows: [
        getCommonRow({nonasv: true, n: '跨度', vs: cpArr(vs)})
      ]
    }
  }
};

export default methodItems

