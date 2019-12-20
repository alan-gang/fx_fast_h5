import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameHeader from 'comp/game-header';
import MethodMenu from 'comp/method-menu';
import SubMethodMenu from 'comp/sub-method-menu';
import Play from 'comp/play';
import OrderBar from 'comp/order-bar';
import { RouteComponentProps } from "react-router-dom";
import { getGameTypeByGameId } from '../../game/games';
import calc from '../../game/calc';
import { getMethodsConfigByType, getMethodPosByGameTypeAndId } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';
import APIs from '../../http/APIs';
import { countRepeat } from '../../utils/game';
import { GameCommonDataContext } from '../../context/gameContext';
import Ludan from 'comp/ludan';
import { getLunDanTabByName, getTabsByType, getLudanTabByTypeAndName } from '../../utils/ludan';
import LimitSetDialog from 'comp/limit-set-dialog';
import Socket from '../../socket';
import Bus from '../../utils/eventBus'
import { LOTTERY_TYPES } from '../../utils/config';
import { ANIMALS_POULTRY, ANIMALS_BEAST } from '../../game/hc6';
import './index.styl';
import { getUrlParams } from '../../utils/common';

interface IProps {
  store?: any;
  gameType?: string;
}

interface State {
  id: number;
  // gameType: string;
  curIssue: string;
  lastIssue: string;
  curTime: number;
  remainTime: number;
  openNumbers: string[];
  curMenuIndex: number; // 玩法菜单选中玩法的index
  curMenuEname: string; // 玩法菜单选中玩法的英语名
  curSubMenuIndex: number;
  subMethods: GameSubMethodMenu[];
  curSubMethod?: GameSubMethodMenu;
  curGameMethodItems: any[];
  odds: any;
  issueList: any[];
  defaultInitMethodItemAmount: number; // 默认初始投注金额
  totalBetCount: number;  // 总注数
  totalBetAmount: number; // 总投注金额
  tabIndex: number; //  
  maxColumns: number;
  maxRows: number;
  defaultMenu?: string;
  // defaultSubMenu?: string;
  isShowLudan: boolean;
  isExpandLudan: boolean;
  isShowLimitSetDialog: boolean;
  limitLevelList: LimitLevelItem[];
  isShowLimitSetDialogClose: boolean; // 是否显示弹出框关闭按钮
}

interface DataMethodItem {
  id: string;
  rows: any[];
  repeatCount: number;
  methodTypeName: string;
}

interface MatchParams {
  id: string;
}

type Props = IProps & RouteComponentProps<MatchParams>;

@inject("store")
@observer
class Game extends Component<Props, object> {
  id: number = 1;
  gameType: string = 'ssc';
  state: State;
  methodItems: any = methodItems;
  calc: any = calc;
  mysocket?: Socket;
  constructor(props: Props) {
    super(props);
    this.id = parseInt(this.props.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
    let limitItem = props.store.game.getLimitListItemById(this.id);
    let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
    let curMenuIndex = bestLudan && getMethodPosByGameTypeAndId(this.gameType, bestLudan.methodId) || 0;
    let curMenuEname = (menus && menus[curMenuIndex]).ename;
    let ludanTab = getLudanTabByTypeAndName(this.gameType, curMenuEname, bestLudan && bestLudan.codeStyle);
    let ludanMenus = getTabsByType(this.gameType, curMenuEname);
    let gameLimitLevel = this.props.store.game.getGameLimitLevelByGameId(this.id); // 设置的限红数据
    let curSubMenuIndex = this.gameType === LOTTERY_TYPES.HC6 ? -1 : 0;
    this.state = {
      id: 1,
      curIssue: '',
      lastIssue: '',
      curTime: 0,
      remainTime: 0,
      openNumbers: [],
      curMenuIndex,
      curMenuEname,
      curSubMenuIndex,
      subMethods: [],
      curSubMethod: undefined,
      curGameMethodItems: this.getMethodItemsByIds((menus && menus[curMenuIndex].ids) || []),
      odds: {},
      issueList: [],
      defaultInitMethodItemAmount: 0, //this.props.store.game.defaultInitBetAmount,
      totalBetCount: 0,
      totalBetAmount: 0,
      tabIndex: 0,
      maxColumns: 21,
      maxRows: 6,
      defaultMenu: (ludanTab && ludanTab.name) || '',
      isShowLudan: ludanMenus && ludanMenus.length > 0,
      isExpandLudan: false,
      isShowLimitSetDialog: !gameLimitLevel,
      limitLevelList: limitItem ? limitItem.kqPrizeLimit : [],
      isShowLimitSetDialogClose: false
    }
    this.init();
    Bus.emit('gameIdChanged', this.id);
  }
  init() {
    this.getCurIssue(this.id);
    this.getUserPoint(this.id);
    this.getHistoryIssue(this.id);
    // this.getLimitData(this.id);
  }
  getLoginData() {
    let sessionData: any = sessionStorage.getItem('sessionData');
    let agentCode = getUrlParams('agentCode');
    let param = getUrlParams('param');
    let data = {
      agentCode,
      param
    };
    if (!agentCode && !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    return data;
  }
  initSocket() {
    this.mysocket = new Socket({
      url: this.props.store.common.broadcaseWSUrl,
      name: 'gameIndex',
      receive: (data) => {
        if (data.type === 'openWinCode') {
          this.openWinCode(parseInt(data.content[0].lottId, 10), data.content[0]);
        }
        if (data.type === 'betNotify') {
          Bus.emit('__pushBetRemind', data.content)
        }
      },
      open: () => {
        this.mysocket && this.mysocket.send(JSON.stringify(Object.assign({action: 'noauth'}, {})));
      }
    }, true);
  }
  componentDidMount() {
    if (this.props.store.common.broadcaseWSUrl) {
      this.initSocket();
    } else {
      APIs.signIn(this.getLoginData()).then((data: any) => {
        if (data.success > 0) {
          this.props.store.common.setBroadcaseWSUrl(data.broadcaseWSUrl);
          this.initSocket();
        }
      });
    }
    Bus.on('onSetLimit', this.onSetLimit);
  }
  onSetLimit = () => {
    this.setState({isShowLimitSetDialog: !this.state.isShowLimitSetDialog, isShowLimitSetDialogClose: true, limitLevelList: this.props.store.game.getLimitDataOfKqByGameId(this.id) || []});
  }
  componentWillReceiveProps(nextProps: Props) {
    // console.log(this.props.location.pathname, nextProps.location.pathname, '?????')
    this.id = parseInt(nextProps.match.params.id || '1', 10);
    this.gameType = getGameTypeByGameId(this.id);
    Bus.emit('gameIdChanged', this.id);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      let limitItem = this.props.store.game.getLimitListItemById(this.id);
      let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
      let menus: GameMethodMenu[] = getMethodsConfigByType(this.gameType);
      let curMenuIndex = bestLudan && getMethodPosByGameTypeAndId(this.gameType, bestLudan.methodId) || 0;
      let curMenuEname = menus && menus[curMenuIndex].ename
      let ludanTab = getLudanTabByTypeAndName(this.gameType, curMenuEname, bestLudan && bestLudan.codeStyle);
      let ludanMenus = getTabsByType(this.gameType, curMenuEname);
      let gameLimitLevel = this.props.store.game.getGameLimitLevelByGameId(this.id); // 设置的限红数据
      let limitListItem = this.props.store.game.getLimitListItemById(this.id); 
      this.setState({
        curMenuIndex,
        curMenuEname,
        curGameMethodItems: this.getMethodItemsByIds((menus && menus[curMenuIndex].ids) || []),
        subMethods: (menus && menus[curMenuIndex].subMethods) || [],
        defaultMenu: (ludanTab && ludanTab.name) || '',
        isShowLudan: ludanMenus && ludanMenus.length > 0,
        isShowLimitSetDialog: !gameLimitLevel,
        limitLevelList: !gameLimitLevel ? (limitListItem ? limitListItem.kqPrizeLimit : []) : []
      });
      this.init();
    }
  }
  openWinCode(id: number, openHistoryItem: any) {
    if (id === this.id) {
      let issueList = this.state.issueList;
      issueList.unshift(openHistoryItem);
      this.setState({
        lastIssue: issueList[0].issue,
        openNumbers: issueList[0].code.split(','),
        issueList: issueList
      });
      this.getCurIssue(this.id);
    }
  }
  // 获取当前玩法下面的子玩法列表
  getMethodItemsByIds(ids: string[]) {
    let mItems: any[] = [];
    ids.forEach((id: string) => {
      let items =  this.methodItems[id]();
      items.rows = items.rows.map((row: any) => {
        row.vs.map((vs: any) => {
          if (typeof vs === 'object') {
            vs.val = '';
          }
          return vs;
        });
        return row;
      })
      mItems.push(Object.assign({id}, items));
    });
    return mItems;
  }

  // 更新玩法菜单选中的index
  updateMethodMenuIndex = (index: number) => {
    this.setState({curMenuIndex: index});
  }
  // 更新玩法菜单选中的index
  updateSubMethodMenuIndex = (index: number) => {
    this.setState({curSubMenuIndex: index});
  }
  methodMenuChangedCB = (method: GameMethodMenu) => {
    let curGameMethodItems = this.getMethodItemsByIds(method.ids || []);
    let ludanMenus = getTabsByType(this.gameType, method.ename);
    let limitItem = this.props.store.game.getLimitListItemById(this.id);
    let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
    let ludanTab = getLudanTabByTypeAndName(this.gameType, method.ename, bestLudan && bestLudan.codeStyle);
    let curSubMenuIndex = this.gameType === LOTTERY_TYPES.HC6 ? -1 : 0;
    this.setState({
      subMethods: method.subMethods || [],
      curGameMethodItems,
      totalBetCount: 0,
      totalBetAmount: 0,
      curSubMenuIndex,
      curMenuEname: method.ename,
      defaultMenu: (ludanTab && ludanTab.name) || '',
      // defaultSubMenu: '',
      isShowLudan: ludanMenus && ludanMenus.length > 0
    }, this.updateOddsOfMethod);
  }
  updateSubMethods = (method: GameSubMethodMenu) => {
    let curGameMethodItems;
    if (this.gameType === LOTTERY_TYPES.HC6) {
      curGameMethodItems = this.state.curGameMethodItems;
      if (this.state.curMenuEname === 'texiao') {
        curGameMethodItems = this.updateHC6TexiaoMethodItems(curGameMethodItems, method.v)
      }
    } else {
      curGameMethodItems = this.getMethodItemsByIds(method.ids || []);
    }
    this.setState({
      curSubMethod: method,
      curGameMethodItems
    }, this.calcBet);
  }
  // 更新选中的玩法项数据
  updateMethodItem = (i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined) => {
    let methodItems = this.state.curGameMethodItems;
    if (selected !== undefined) {
      methodItems[i].rows[j].vs[k].s = selected;
    }
    if (value !== undefined) {
      methodItems[i].rows[j].vs[k].amt = value;
    }
    this.setState({
      curGameMethodItems: methodItems
    }, this.calcBet);
  }
  updateMethodRow = (i: number, j: number, selected?: boolean | undefined) => {
    let methodItems = this.state.curGameMethodItems;
    if (selected !== undefined) {
      methodItems[i].rows[j].s = selected;
    }
    this.setState({
      curGameMethodItems: methodItems
    }, this.calcBet);
  }
  // 更新当前游戏当前玩法相关的odd
  updateOddsOfMethod(odds?: any) {
    if (!odds) {
      this.getUserPoint(this.id);
      return null;
    }
    let curGameMethodItems = this.state.curGameMethodItems;
    let methodId: string = '';
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        methodId = methodItem.id.split(':')[0];
        row.vs = row.vs.map((vsItem: any) => {
          if (typeof vsItem === 'object') {
            if (odds[methodId] && odds[methodId][vsItem.oddIndex || 0]) {
              vsItem.odd = odds[methodId][vsItem.oddIndex || 0].maxprize;
            }
          }
          return vsItem;
        });
        if (row.posOdd) {
          row.odd =  odds[methodId][row.oddIndex || 0].maxprize;
        }
        return row;
      });
      return methodItem;
    });
    this.setState({curGameMethodItems});
  }

  // 更新默认初始下注金额
  updateDefaultInitMethodItemAmount = (amount: number): void => {
    this.setState({defaultInitMethodItemAmount: amount}, this.calcBet);
  }
  calcBet() {
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;
    let totalAmount: number = 0;
    let curGameMethodItems = this.state.curGameMethodItems;

    // 构造选择的号码集合，金额集合, 总金额
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        row.nc = [];
        row.amtc = [];
        row.tmc = 0;
        row.vs.forEach((vsItem: any) => {
          if (typeof vsItem === 'object') {
            if (vsItem.s) {
              row.nc.push(vsItem.n);
              row.amtc.push(vsItem.amt);
              row.tmc += parseInt(vsItem.amt || '0', 10);
            }
          }
        });
        totalAmount += row.tmc;
        return row;
      });
      return methodItem;
    });

    // 构造注数计算数据格式
    curGameMethodItems.forEach((gameMethodItem: any) => {
      method = {id: gameMethodItem.id, methodTypeName: gameMethodItem.methodTypeName, rows: [], repeatCount: 0};
      gameMethodItem.rows.forEach((row: any) => {
        method.rows.push(row.nc.slice(0));
      });
      methodList.push(method);
    });

    // 计算重复数
    curGameMethodItems.forEach((gameMethodItem: any) => {
      if (['zx_q2', 'zx_q3'].includes(gameMethodItem.methodTypeName)) {
        gameMethodItem.repeatCount = countRepeat(methodList.map((methodItem: DataMethodItem) => methodItem.id === gameMethodItem.id ? methodItem.rows : []));
      }
    });
    
    // 构造注数计算数据格式
    curGameMethodItems.forEach((gameMethodItem: any) => {
      if (!['zx_q3'].includes(gameMethodItem.methodTypeName)) {
        methodList = methodList.map((methodItem: DataMethodItem) => {
          if (gameMethodItem.id === methodItem.id) {
            methodItem.rows = methodItem.rows.map((row: any) => row.length);
          }
          methodItem.repeatCount = gameMethodItem.repeatCount;
          return methodItem;
        });
      }
    });

    curGameMethodItems.forEach((gameMethodItem: any) => {
      // if (['texiao'].includes(gameMethodItem.methodTypeName)) {
      if (gameMethodItem.calcMode === 'row') {  
        methodList = [];
        method = {id: gameMethodItem.id, rows: [], repeatCount: 0};
        gameMethodItem.rows.forEach((row: any) => {
          if (row.s) {
            method.rows.push(row.n || row.pv);
          }
        });
        method.rows = [method.rows.length];
        methodList.push(method);
      }
    });

    // 计算总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows, ns: methodItem.rows, repeatCount: methodItem.repeatCount});
      // 任选，组选，直选金额计算
      if (['rx_nzn', 'zux_q2', 'zux_q3', 'zx_q2', 'zx_q3'].includes(methodItem.methodTypeName)) {
        totalAmount = betCount * this.state.defaultInitMethodItemAmount;
      }
    });

    this.setState({totalBetCount: betCount, totalBetAmount: totalAmount});
  }
  // 重置所有选中玩法项
  resetSelectedOfAllMethodItem = () => {
    let curGameMethodItems = this.state.curGameMethodItems;
    curGameMethodItems = curGameMethodItems.map((methodItem: any) => {
      methodItem.rows = methodItem.rows.map((row: any) => {
        row.s = false;
        row.vs = row.vs.map((vsItem: any) => { 
          if (typeof vsItem === 'object') {
            vsItem.s = false; vsItem.amt = ''; return vsItem; 
          }
        });
        return row;
      });
      return methodItem;
    });
    this.setState({curGameMethodItems, totalBetCount: 0, totalBetAmount: 0});
  }
  orderFinishCB = (status: boolean) => {
    if (status) {
      this.resetSelectedOfAllMethodItem();
    }
  }
  getCurIssue = (gameid: number) => {
    APIs.curIssue({gameid}).then((data: any) => {
      if (data.success > 0) {
        this.setState({
          curIssue: data.issue,
          curTime: data.current,
          remainTime: Math.floor((data.saleend - data.current) / 1000) || (this.state.remainTime + 0.05)
        })
      } else {
        this.setState({curIssue: ''});
      }
    });
  }
  getHistoryIssue(gameid: number) {
    APIs.historyIssue({gameid}).then((data: any) => {
      if (data.success === 1) {
        if (data.items.length > 0) {
          this.setState({
            lastIssue: data.items[0].issue,
            openNumbers: data.items[0].code.split(','),
            issueList: data.items
          });
        }
      }
    });
  }
  getUserPoint(gameid: number) {
    APIs.myNewPoint({gameid}).then((data: any) => {
      if (data.success === 1) {
        this.setState({odds: data.items})
        this.updateOddsOfMethod(data.items);
      }
    });
  }

  changeTabIndex = (idx: number) => {
    this.setState({
      tabIndex: idx
    })
  }

  getLimitData(id: number) {
    APIs.lottSets({lotteryIds: id, v: 1}).then((data: any) => {
      if (data.success === 1) {
        this.props.store.game.setLimitList([Object.assign({id}, data.data[id])]);
        this.props.store.game.setLimitLevelList(data.data[id].kqPrizeLimit);
      }
    });
  }
  onLimitChoiceCB = (level: number) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.id, level});
    this.onCloseLimitChoiceHandler();
  }
  onCloseLimitChoiceHandler = () => {
    this.setState({isShowLimitSetDialog: false});
  }
  componentWillUnmount() {
    this.mysocket && this.mysocket.removeListen();
    Bus.off('onSetLimit', this.onSetLimit);
  }
  onGameHeaderUpdateHandler = (data: any) => {
    if (data.type === 'ludan') {
      this.setState({isExpandLudan: data.data});
    }
  }
  updateHC6TexiaoMethodItems(methodItems: any, subMethodMenuValue: string = '') {
    const animals = subMethodMenuValue === '1' ? ANIMALS_POULTRY : ANIMALS_BEAST;
    methodItems = methodItems.map((method: any) => {
      method.rows = method.rows.map((row: any) => {
        row.s = animals.includes(row.n);
        return row;
      })
      return method;
    });
    return methodItems;
  }
  render() {
    return (
      <article className="game-view">
        <GameCommonDataContext.Provider value={{gameId: this.id, gameType: this.gameType}} >
          <GameHeader 
            gameId={this.id}
            gameType={this.gameType}
            curIssue={this.state.curIssue}
            lastIssue={this.state.lastIssue}
            curTime={this.state.curTime}
            remainTime={this.state.remainTime}
            openNumbers={this.state.openNumbers}
            getNewestIssue={this.getCurIssue}
            isExpandLudan={this.state.isExpandLudan}
            update={this.onGameHeaderUpdateHandler}
          />
          {this.state.isShowLudan && this.state.isExpandLudan &&
            <Ludan 
              gameId={this.id} 
              gameType={this.gameType} 
              maxColumns={this.state.maxColumns} 
              maxRows={this.state.maxRows} 
              issueList={this.state.issueList.slice(0).reverse()} 
              methodMenuName={this.state.curMenuEname} 
              defaultMenu={this.state.defaultMenu} 
            />
          }
          <section className="game-main">
            <MethodMenu gameType={this.gameType} curMenuIndex={this.state.curMenuIndex} methodMenuChangedCB={this.methodMenuChangedCB} updateMethodMenuIndex={this.updateMethodMenuIndex}/>
            {this.state.subMethods.length > 0 && 
              <SubMethodMenu 
                gameType={this.gameType} 
                curSubMenuIndex={this.state.curSubMenuIndex} 
                subMethods={this.state.subMethods} 
                odds={this.state.odds} 
                updateSubMethods={this.updateSubMethods} 
                updateSubMethodMenuIndex={this.updateSubMethodMenuIndex}
              />
            }
            <Play 
              curGameMethodItems={this.state.curGameMethodItems} 
              gameType={this.gameType} 
              defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
              updateMethodItem={this.updateMethodItem} 
              updateMethodRow={this.updateMethodRow}
              curSubMethod={this.state.curSubMethod}
            />
            <OrderBar 
              gameId={this.id} 
              gameType={this.gameType} 
              curIssue={this.state.curIssue} 
              betCount={this.state.totalBetCount} 
              amount={this.state.totalBetAmount} 
              curGameMethodItems={this.state.curGameMethodItems} 
              defaultInitMethodItemAmount={this.state.defaultInitMethodItemAmount}
              updateDefaultInitMethodItemAmount={this.updateDefaultInitMethodItemAmount} 
              orderFinishCB={this.orderFinishCB}
              resetSelectedOfAllMethodItem={this.resetSelectedOfAllMethodItem}
            />
           
          </section>
        </GameCommonDataContext.Provider>
        {this.state.isShowLimitSetDialog && this.props.store.game.limitList && this.props.store.game.limitList.length > 0 &&
          <LimitSetDialog 
            isShow={this.state.isShowLimitSetDialog} 
            isShowLimitSetDialogClose={this.state.isShowLimitSetDialogClose} 
            gameId={this.id} 
            limitLevelList={this.state.limitLevelList} 
            onLimitChoiceCB={this.onLimitChoiceCB} 
            onCloseHandler={this.onCloseLimitChoiceHandler} 
          />
        }
      </article>
    );
  }
}

export default Game;
