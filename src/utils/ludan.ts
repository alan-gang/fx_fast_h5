import Colors from './colorConfig';
import { methods } from './ludanMethods';

const subM: object[] = [{name: 'dx', title: '大小'}, {name: 'ds', title: '单双'}];
export const methodTabs: any = {
  ssc: {
    zhenghe: [
      {title: '总和', name: 'zh', subM},
      {title: '万位', name: 'ww', subM},
      {title: '千位', name: 'qw', subM},
      {title: '百位', name: 'bw', subM},
      {title: '十位', name: 'sw', subM},
      {title: '个位', name: 'gw', subM}
    ],
    dw: [
      {title: '万位', name: 'ww', subM},
      {title: '千位', name: 'qw', subM},
      {title: '百位', name: 'bw', subM},
      {title: '十位', name: 'sw', subM},
      {title: '个位', name: 'gw', subM}
    ],
    lhh: [
      {title: '万千', name: 'wq_lhh', subM: []},
      {title: '万百', name: 'wb_lhh', subM: []},
      {title: '万十', name: 'ws_lhh', subM: []},
      {title: '万个', name: 'wg_lhh', subM: []},
      {title: '千百', name: 'qb_lhh', subM: []},
      {title: '千十', name: 'qs_lhh', subM: []},
      {title: '千个', name: 'qg_lhh', subM: []},
      {title: '百十', name: 'bs_lhh', subM: []},
      {title: '百个', name: 'bg_lhh', subM: []},
      {title: '个位', name: 'gw_lhh', subM: []}
    ],
    yzzh: []
  },
  '11x5': {
    zhenghe: [
      {title: '总和', name: 'zh', subM},
      {title: '总和尾', name: 'zhw', subM},
      {title: '第一位', name: 'ww', subM},
      {title: '第二位', name: 'qw', subM},
      {title: '第三位', name: 'bw', subM},
      {title: '第四位', name: 'sw', subM},
      {title: '第五位', name: 'gw', subM},
      {title: '龙虎', name: 'wq_lhh', subM: []}
    ],
    dw: [
      {title: '总和', name: 'zh', subM},
      {title: '总和尾', name: 'zhw', subM},
      {title: '第一位', name: 'ww', subM},
      {title: '第二位', name: 'qw', subM},
      {title: '第三位', name: 'bw', subM},
      {title: '第四位', name: 'sw', subM},
      {title: '第五位', name: 'gw', subM},
      {title: '龙虎', name: 'wq_lhh', subM: []}
    ],
    lh: [
      {title: '一位VS二位', name: 'wq_lhh', subM: []},
      {title: '一位VS三位', name: 'wb_lhh', subM: []},
      {title: '一位VS四位', name: 'ws_lhh', subM: []},
      {title: '一位VS五位', name: 'wg_lhh', subM: []},
      {title: '二位VS三位', name: 'qb_lhh', subM: []},
      {title: '二位VS四位', name: 'qs_lhh', subM: []},
      {title: '二位VS五位', name: 'qg_lhh', subM: []},
      {title: '三位VS四位', name: 'bs_lhh', subM: []},
      {title: '三位VS五位', name: 'bg_lhh', subM: []},
      {title: '四位VS五位', name: 'sg_lhh', subM: []}
    ],
    rx: [],
    zux: [],
    zx: []
  },
  pk10: {
    zhenghe: [
      {title: '冠亚和值', name: 'zh', subM},
      {title: '冠军', name: '1', subM},
      {title: '亚军', name: '2', subM},
      {title: '季军', name: '3', subM},
      {title: '第四位', name: '4', subM},
      {title: '第五位', name: '5', subM},
      {title: '第六位', name: '6', subM},
      {title: '第七位', name: '7', subM},
      {title: '第八位', name: '8', subM},
      {title: '第九位', name: '9', subM},
      {title: '第十位', name: '10', subM}
    ],
    lh: [
      {title: '冠军VS第十名', name: '1vs10_lhh', subM: []},
      {title: '亚军VS第九名', name: '2vs9_lhh', subM: []},
      {title: '季军VS第八名', name: '3vs8_lhh', subM: []},
      {title: '第四名VS第七名', name: '4vs7_lhh', subM: []},
      {title: '第五名VS第六名', name: '5vs6_lhh', subM: []}
    ],
    dwgy: [],
    gyhz: [
      {title: '冠亚和大小', name: 'gy_dx', subM: []},
      {title: '冠亚和单双', name: 'gy_ds', subM: []}
    ]
  },
  k3: {
    diansu: [
      {title: '总和大小', name: 'zh_dx', subM: []},
      {title: '总和单双', name: 'zh_ds', subM: []}
    ],
    shanjun: [],
    wqshai: [],
    changpai: [],
    duanpai: [],
    yskd: []
  }
}

/**
 * 获取玩法大类下的所有路单玩法
 * @param type 
 * @param methodName 
 */
export function getAllTabsByTypeAndName(type: string, methodName: string): any[] {
  let allTabs: any[] = [];
  (methodTabs[type][methodName] || []).forEach((tab: any) => {
    if (tab.subM.length > 0) {
      tab.subM.forEach((subTab: any) => {
        allTabs.push({title:tab.title + subTab.title, name: tab.name + '_' + subTab.name})
      });
    } else {
      allTabs.push({title:tab.title, name: tab.name})
    }
  });
  return allTabs;
}

/**
 * 获取指定的路单玩法
 * @param type 游戏类型
 * @param methodName 游戏玩法大类
 * @param ludanMethodName 玩法路单
 */
export function getLudanTabByTypeAndName(type: string, methodName: string, ludanMethodName: string) {
  return (getAllTabsByTypeAndName(type, methodName) || []).find((tab:any) => tab.name === ludanMethodName);
}

export function getTabsByType(type: string, methodName: string): any[] {
  return methodTabs[type][methodName];
}

export function getSubTabByType(type: string, tabName: string): any {
  let tabs = methodTabs[type];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].name === tabName) {
      return tabs[i];
    }
  }
  return null;
}

// 根据 codeStyle 反推 methodName
export function getMethodName(type: string, codeStyle: string) {
  let tabs = methodTabs[type]
  let keys = Object.keys(tabs)
  let methodName = ''
  keys.some(key => {
    return tabs[key].some((obj: any) => {
      if (obj.name === codeStyle || obj.name === codeStyle.split('_')[0]) {
        methodName = key
        return true
      }
      return false
    })
  })
  return methodName
}

// 获取没有二级菜单的 methodName
export function getNoSubMenuMethods(type: string) {
  let tabs = methodTabs[type]
  let keys = Object.keys(tabs)
  let arr: any[] = []
  keys.forEach(key => {
    tabs[key].forEach((obj: any) => {
      if (!obj.subM.length) {
        arr.push(obj.name)
      }
    })
  })
  return arr
}

/**
 * 根据游戏类型，名字codeStyle获取游戏玩法
 *    如:
 *      根据ssc , wq_ds 获取对应为 “整合”的玩法
 * @param type 游戏类别
 * @param name 名字
 */
export function getMethodENameByLudanName(type: string, name: string): any {
  let types = methodTabs[type];
  let keys = Object.keys(types);
  let tabs;
  for (let i = 0; i < keys.length; i++) {
    tabs = types[keys[i]];
    for (let j = 0; j < tabs.length; j++) {
      if (tabs[j]) {
        if (tabs[j].subM && tabs[j].subM.length > 0) {
          for (let k = 0; k < tabs[j].subM.length; k++) {
            if (joinLunDanName(tabs[j].name, tabs[j].subM[k].name) === name) {
              return keys[i];
            }
          }
        } else {
          if (tabs[j].name === name) {
            return keys[i];
          }
        }
      }
    }
  }
  return null;
}

/**
 * 根据游戏类型，名字codeStyle获取路单tab
 *    如：
 *      根据ssc , wq_ds 获取对应为 "万个"的路单tab
 * @param type 游戏类别
 * @param name 名字
 */
export function getLunDanTabByName(type: string, name: string): any {
  let types = methodTabs[type];
  let keys = Object.keys(types);
  let tabs;
  for (let i = 0; i < keys.length; i++) {
    tabs = types[keys[i]];
    for (let j = 0; j < tabs.length; j++) {
      if (tabs[j]) {
        if (tabs[j].subM && tabs[j].subM.length > 0) {
          for (let k = 0; k < tabs[j].subM.length; k++) {
            if (joinLunDanName(tabs[j].name, tabs[j].subM[k].name) === name) {
              return tabs[j];
            }
          }
        } else {
          if (tabs[j].name === name) {
            return tabs[j];
          }
        }
      }
    }
  }
  return null;
}

/**
 * 获取拼接的路单名字
 *  如：总和大小
 * @param type 游戏类别
 * @param name 路单名字
 */
export function getLunDanFullTitleByName(type: string = '', name: string = ''): string {
  let ludanTab = getLunDanTabByName(type, name);
  if (ludanTab) {
    if (ludanTab.subM && ludanTab.subM.length > 0) {
      for (let k = 0; k < ludanTab.subM.length; k++) {
        if (joinLunDanName(ludanTab.name, ludanTab.subM[k].name) === name) {
          return ludanTab.title + ludanTab.subM[k].title;
        }
      }
    } else {
      return ludanTab.title;
    }
  } 
  return '';
}

function joinLunDanName(name: string = '', subName: string = ''): string {
  return name + (subName ? '_' : '') + subName;
}

/**
 * 根据游戏类型获取玩法列表
 * @param type 游戏类型
 */
export function getMethodListByType(type: string): LudanMethod[] {
  let mls: LudanMethod[] = [];
  methods.forEach((v: LudanMethod, k) => {
    if (v.type === type) {
      mls.push(v);
    }
  });
  return mls;
}

export function getMethodById(id: string): LudanMethod | null {
  for (let [key, value] of methods) {
    if (value.id === id) {
      return value;
    }
  }
  return null;
}

export function getMethodDataByName(name: string): LudanMethod | undefined {
  return methods.get(name);
}

export const MAX_ROWS: number = 6;
export const MAX_COLUMNS: number = 30;

/**
 * 根据玩法获取对应的路单
 * @param issueList 开奖历史期数
 * @param name 玩法名取值参考methods配置列表的method字段
 * @param maxRows 路单最大展示的行数，默认为6行
 * @param maxColumns 路单最大展示的列数，默认为18列
 */
export function getLuDanListByMethod(issueList: any[], type: string, name: string, maxRows: number = MAX_ROWS, maxColumns: number = MAX_COLUMNS): object[] | null {
  if (!issueList || issueList.length < 1 || !name) {
    return null;
  }
  const mObj: any = getMethodDataByName(type + '_' + name);
  if (!mObj) {
    return [];
  }
  let ludanItems: string[] = [];
  let item: string = '';
  let ludanList: any = [];
  let codeStyles: any[];
  let temp: any;
  issueList.forEach((issue: any, i: number) => {
    codeStyles = JSON.parse(issue.codeStyle || '[]');
    codeStyles.forEach((cs: any, j: number) => {
      if (cs.methodId.indexOf(mObj.methodId) !== -1) {
        switch (mObj.method) {
          case 'zh_dx':
          case 'zh_ds':
          case 'zhw_wsdx':
          case 'zhw_wsds':
            item = cs.value[0][mObj.method.split('_')[1]];
            break;
          case 'wg_lhh':
            item = cs.value[0];
            break;
          case 'ww_dx':
          case 'ww_ds':
          case 'qw_dx':
          case 'qw_ds':
          case 'bw_dx':
          case 'bw_ds':
          case 'sw_dx':
          case 'sw_ds':
          case 'gw_dx':
          case 'gw_ds':
          case '1_dx':
          case '1_ds':
          case '2_dx':
          case '2_ds':
          case '3_dx':
          case '3_ds':
          case '4_dx':
          case '4_ds':  
          case '5_dx':
          case '5_ds':
          case '6_dx':
          case '6_ds':
          case '7_dx':  
          case '7_ds':  
          case '8_dx':  
          case '8_ds':  
          case '9_dx':  
          case '9_ds':  
          case '10_dx':  
          case '10_ds':  
            item = cs.value[mObj.pos][mObj.method.split('_')[1]];
            break;
          case '1v2':
          case '1v3':
          case '1v4':
          case '1v5':
          case '1v10':  
          case '2v3':
          case '2v4':
          case '2v5':
          case '2v9':  
          case '3v4':
          case '3v5':
          case '3v8':
          case '4v5':
          case '4v7':
          case '5v6':
            temp = cs.data && cs.data.find((item: any) => mObj.method === item.pos);
            item = (temp && temp.val) || '';
            break;
          default:
            break;
        }
        if (ludanItems.indexOf(item) !== -1) {
          ludanItems.push(item);
        } else {
          if (ludanItems.length > 0) {
            ludanList.push(ludanItems);
            ludanItems = [];
          }
          ludanItems.push(item);
        }
        // 最个一个
        if (issueList.length - 1 === i) {
          if (ludanItems.length < maxRows) {
            ludanItems.push('icon-cur');
            ludanList.push(ludanItems);
            ludanItems = [];
          } else {
            ludanList.push(ludanItems);
            ludanItems = [];
            ludanItems.push('icon-cur');
            ludanList.push(ludanItems);
          }
        }
      }
    });
  });
  return ludanList.slice(ludanList.length >= maxColumns ? Math.abs(ludanList.length - maxColumns + 1) : 0);
}

export function getCellData(ludanList: any[], c: number, r: number, maxRows: number = MAX_ROWS): string {
  if (!ludanList) return '';
  if (ludanList[c] && ludanList[c][r]) {
    if (['icon-cur', 'icon-qs'].indexOf(ludanList[c][r]) !== -1) {
      return ludanList[c][r];
    }
    if (r === maxRows - 1 && ludanList[c].length > maxRows) {
      return String(ludanList[c].length);
    } else {
      return ludanList[c][r];
    }
  } else {
    return '';
  }
}

/**
 * 单个路单样式
 * @param ludanList
 * @param col
 * @param row
 */
export function getCellStyle(ludanList: any[], col: number, row: number, maxRows: number = MAX_ROWS) {
  if (getCellData(ludanList, col, row, maxRows) === 'icon-cur') return 'icon-cur';
  if (getCellData(ludanList, col, row, maxRows) === 'icon-qs') return 'icon-qs';
  return Colors.getStyle(getCellData(ludanList, col, row, maxRows));
}
