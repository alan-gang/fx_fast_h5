import React, { Component, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { Button, Toast, Modal } from 'antd-mobile';
import CoinSet from '../coin-set';
import APIs from '../../http/APIs';
import calc from '../../game/calc';
import { countRepeat } from '../../utils/game';
import { LOTTERY_TYPES } from '../../utils/config';

import './index.styl';

interface Props {
  store?: any;
  gameId: number;
  gameType: string;
  curIssue?: string;
  betCount: number;
  amount: number;
  curGameMethodItems: any[];
  defaultInitMethodItemAmount: number;
  updateDefaultInitMethodItemAmount(amount: number): void;
  orderFinishCB(status: boolean): void;
  resetSelectedOfAllMethodItem(): void;
}

interface DataMethodItem {
  id: string;
  rows: any[];
  methodTypeName?: string;
  repeatCount: number;
}

interface State {
  amount: number;
  showCoinSet: boolean;
}

const ORDER_BAR_CONTAINER_CLASS = 'order-bar-container';
const CALC_BET_NEED_COMPUTED_REPEAT = ['zx_q2', 'zx_q3'];
@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  state: State;
  calc: any = calc;
  orderBarContainer: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      amount: this.props.defaultInitMethodItemAmount,
      showCoinSet: false
    }
    this.orderBarContainer = document.createElement('div');
    this.orderBarContainer.className = ORDER_BAR_CONTAINER_CLASS;
  }
  coinChoosed = (value: string) => {
    const amount: number = value === 'all' ? parseInt(this.props.store.user.balance, 10): parseInt(value, 10);
    this.setState({amount});
    this.props.updateDefaultInitMethodItemAmount(amount);
  }
  onResetHandler = () => {
    Modal.alert(' ', '您确定要重置选中的投注？',[{ text: '取消' }, { text: '确定', onPress: () => this.props.resetSelectedOfAllMethodItem() }]);
  }
  onOrderHandler = () => {
    this.setState({showCoinSet: false});
    this.order();
  }
  validate(params: any): boolean {
    if (!params.issue) {
      Toast.fail('获取游戏期号失败，请刷新后重试！');
      return false;
    } else if(!params.betList || params.betList.length <= 0) {
      return false;
    } else if(params.totMoney <= 0) {
      this.setState({showCoinSet: true});
      Toast.fail('请输入金额！');
      return false;
    } else if (!this.validateLimit(params.lotteryId, params.limitLevel, this.state.amount)) {
      return false;  
    } else if (params.errorMsg) {
      Toast.fail(params.errorMsg);
      return false;
    }
    return true;
  }
  validateHc6(params: any): boolean {
    if (!params.issue) {
      Toast.fail('获取游戏期号失败，请刷新后重试！');
      return false;
    } else if(!params.items || params.items.length <= 0) {
      return false;
    } else if(params.totalmoney <= 0) {
      this.setState({showCoinSet: true});
      Toast.fail('请输入金额！');
      return false;
    } else if (!this.validateLimit(params.gameid, params.limitLevel, this.state.amount)) {
      return false;
    } else if (params.errorMsg) {
      Toast.fail(params.errorMsg);
      return false;
    }
    return true;
  }
  validateLimit(gameId: number, level: number, amount: number) {
    let limit = this.props.store.game.getLimitLevelData(gameId, level);
    if (limit) {
      if (amount < limit.minAmt || amount > limit.maxAmt) {
        Toast.fail(amount < limit.minAmt ? '您输入的金额不能低于最低限红' : '您输入的金额超过最高限红');
        return false;
      } 
    }
    return true;
  }
  getParams(): object {
    let props = this.props;
    let curGameMethodItems = props.curGameMethodItems;
    let curGameLimitLevel = props.store.game.getGameLimitLevelByGameId(props.gameId);
    let params: any = {
      lotteryId: props.gameId,
      issue: props.curIssue,
      totProjs: 0,
      totMoney: 0,
      isusefree: 0,
      betList: [],
      isFastBet: 1,
      limitLevel: (curGameLimitLevel && curGameLimitLevel.level) || 1
    };
    let pos: string = '';
    let val: string = '';
    let content: string = '';
    let betCount: number = 0;
    curGameMethodItems.forEach((methodItem: any) => {
      if (['rx_nzn'].includes(methodItem.methodTypeName)) {
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        content = methodItem.rows[0].nc.join(',');
        params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: params.totMoney, content});
        params.totProjs += params.betList.length;
        if (content.split(',').length > 8) {
          params.errorMsg = '该玩法一个方案最多选择8个号码！';
        }
      } else if (['zux_q2', 'zux_q3'].includes(methodItem.methodTypeName)) {
        // 组选
        let nc = methodItem.rows.map((row: any) => {
          return row.nc;
        })[0];
        let contents: any[] = [];
        let param = {
          methodId: methodItem.id.split(':')[0],
          projs: 1,
          money: this.state.amount
        }
        for (let i = 0; i <= nc.length - 1; i++) {
          for (let j = i + 1; j <= nc.length - 1; j++) {
            if (['zux_q2'].includes(methodItem.methodTypeName)) {
              contents.push(Object.assign({
                content: `${nc[i]},${nc[j]}`
              }, param));
            }
            if (['zux_q3'].includes(methodItem.methodTypeName)) {
              for (let k = i + 2; k <= nc.length - 1; k++) {
                if (nc[j] >= nc[k]) continue;
                contents.push(Object.assign({
                  content: `${nc[i]},${nc[j]},${nc[k]}`
                }, param));
              }
            }
          }
        }
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        params.betList.push(...contents);
        params.totProjs += contents.length;
      } else if (['zx_q2', 'zx_q3'].includes(methodItem.methodTypeName)) {
        // 直选 前二、三
        let nc = methodItem.rows.map((row: any) => {
          return row.nc;
        });
        let contents: any[] = [];
        let param = {
          methodId: methodItem.id.split(':')[0],
          projs: 1,
          money: this.state.amount
        }
        for (let i = 0; i < nc.length; i++) {
          for (let j = 0; j < nc[i].length; j++) {
            if (!nc[i + 1]) continue;
            for (let k = 0; k < nc[i + 1].length; k++) {
              if (nc[i][j] === nc[i + 1][k]) continue;
              if (nc.length >= 3) {
                if (!nc[i + 2]) continue;
                for (let m = 0; m < nc[i + 2].length; m++) {
                  if (nc[i + 1][k] === nc[i + 2][m] || nc[i][j] === nc[i + 2][m]) continue;  
                  contents.push(Object.assign({
                    content: `${nc[i][j]},${nc[i + 1][k]},${nc[i + 2][m]}`
                  }, param));
                }
              } else {
                contents.push(Object.assign({
                  content: `${nc[i][j]},${nc[i + 1][k]}`
                }, param));
              }
            }
          }
        }
        betCount = this.calcBet();
        params.totMoney = this.state.amount * betCount;
        params.betList.push(...contents);
        params.totProjs += contents.length;
      } else {
        methodItem.rows.forEach((row: any) => {
          row.vs.forEach((vsItem: any) => {
            if (vsItem.s) {
              params.totMoney += this.state.amount; // parseInt(vsItem.amt, 10);
              params.totProjs++;
              pos = row.nonasv ? '' : row.p || row.n;
              val = vsItem.p ? (vsItem.p + '-' + (vsItem.pv || vsItem.n)) : (vsItem.pv || vsItem.n)
              content = pos ? pos + '-' + val : val;
              params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: this.state.amount, content});
            }
          });
        });
      }
    });
    return params;
  }
  getParamsHc6() {
    let props = this.props;
    let curGameMethodItems = props.curGameMethodItems;
    let curGameLimitLevel = props.store.game.getGameLimitLevelByGameId(props.gameId);
    let params: any = {
      gameid: props.gameId,
      issue: props.curIssue,
      totalnums: 0, // 总注数
      totalmoney: 0,
      type: 1, // 类型：1-投注；2-追号
      isusefree: 0, // 是否使用优惠券，0-否，1-是
      items: [],
      trace: '',
      isJoinPool: 0,
      isFastBet: 1,
      limitLevel: (curGameLimitLevel && curGameLimitLevel.level) || 1
    };
    let items: any[] = [];
    let totalCount = 0;
    curGameMethodItems.forEach((methodItem: any) => {
      methodItem.rows.forEach((row: any) => {
        console.log('count=', this.calcBet(), methodItem.id)
        if (methodItem.calcMode === 'row') {
          if (row.s) {
            items.push({
              methodid: methodItem.id.split(':')[0],
              type: 1,
              pos: '',
              codes: row.pv || row.n,
              count: 1,
              times: this.state.amount,
              money: this.state.amount,
              mode: 1,
              userpoint: '0.0000'
            });
            totalCount += 1;   
          }
        } else {
          row.vs.forEach((vsItem: any) => {
            if (vsItem.s) {
              items.push({
                methodid: methodItem.id.split(':')[0],
                type: 1,
                pos: vsItem.pos,
                codes: vsItem.p ? (vsItem.p + '-' + (vsItem.pv || vsItem.n)) : (vsItem.pv || vsItem.n),
                count: 1,
                times: this.state.amount,
                money: this.state.amount,
                mode: 1,
                userpoint: '0.0000'
              });
              totalCount += 1;            
            }
          });
        }
      });
    });
    params.totalmoney = items.length * this.state.amount;
    params.totalnums = totalCount;
    params.items = JSON.stringify(items);
    return params;
  }
  calcBet() {
    let curGameMethodItems = this.props.curGameMethodItems;
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;

    // 构造注数计算数据格式
    curGameMethodItems.forEach((gameMethodItem: any) => {
      method = {id: gameMethodItem.id, rows: [], repeatCount: 0};
      gameMethodItem.rows.forEach((row: any) => {
        method.rows.push(row.nc.slice(0));
      });
      methodList.push(method);
    });
    
    // 计算重复数
    curGameMethodItems.forEach((gameMethodItem: any) => {
      if (CALC_BET_NEED_COMPUTED_REPEAT.includes(gameMethodItem.methodTypeName)) {
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
      if (gameMethodItem.calcMode === 'row') {  
        methodList = [];
        method = {id: gameMethodItem.id, rows: [], repeatCount: 0};
        gameMethodItem.rows.forEach((row: any) => {
          if (row.s) method.rows.push(row.pv || row.n);
        });
        method.rows = [method.rows.length];
        methodList.push(method);
      }
    });

    // 计算总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows, ns: methodItem.rows, repeatCount: methodItem.repeatCount});
    });

    return betCount;
  }
  order() {
    const isHc6 = this.isHc6();
    const params = this[isHc6 ? 'getParamsHc6' : 'getParams']();
    if (!this[isHc6 ? 'validateHc6' : 'validate'](params)) {
      return null;
    }
    Toast.loading('投注中...', 0);
    const data = isHc6 ? params : { betData: JSON.stringify(params) };
    setTimeout(Toast.hide, 30000);
    APIs[isHc6 ? 'booking' : 'bet'](data).then(({success, msg}: any) => {
      this.resetAmount();
      Toast.hide();
      if (success === 1) {
        Toast.success('投注成功', 2);
        this.props.store.user.updateBalance();
        this.props.orderFinishCB(true);
      } else {
        Toast.fail(msg || '投注失败');
        this.props.orderFinishCB(false);
      }
    }).catch(() => {
      Toast.hide();
    });
  }
  onFocusHandler = () => {
    this.setState({showCoinSet: true});
  }
  onAmountChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.trim();
    let eType  = event.type;
    if (value.length <= 0) {
      value = '0';
    }
    console.log('type=', eType);
    if (!/^\d*$/g.test(value)) {
      value = String(this.props.defaultInitMethodItemAmount);
    }
    this.setState({amount: parseInt(value, 10)});
    this.props.updateDefaultInitMethodItemAmount(parseInt(value, 10));
  }
  onBlurHandler =  (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.trim();
    if (!/^\d+$/g.test(value)) {
      value = '-1';
    }
    this.setState({amount: parseInt(value, 10)});
    this.props.updateDefaultInitMethodItemAmount(parseInt(value, 10));
  }
  componentDidMount() {
    document.body.appendChild(this.orderBarContainer);
  }
  componentWillUnmount() {
    document.body.removeChild(this.orderBarContainer);
  }
  resetAmount() {
    this.setState({amount: 0});
    this.props.updateDefaultInitMethodItemAmount(0);
  }
  isHc6() {
    return this.props.gameType === LOTTERY_TYPES.HC6;
  }
  render() {
    let elements = (
      <section className="order-bar-view">
        {this.state.showCoinSet && <section>{<CoinSet coinChoosed={this.coinChoosed} value={this.state.amount} />}</section>}
        <section className="flex ai-c jc-sb order-sec">
          <div>
            <div className="flex ai-c fast-amount-wp">
              <input className="fast-amount" type="tel" value={this.state.amount <= 0 ? '': this.state.amount} onChange={this.onAmountChanged} onBlur={this.onBlurHandler} onFocus={this.onFocusHandler} maxLength={9} placeholder="请输入快捷金额" />
            </div>  
          </div>
          {/* <div className="txt-r">
            已选 <span className="txt-red">{this.props.betCount}</span> 注 共 <span className="txt-red">{(this.props.amount).toFixed(3)} </span>元
          </div> */}
          <div className="flex ai-c jc-e btns-wp">
            <Button type="primary" className="btn-reset" disabled={this.props.betCount <= 0} onClick={this.onResetHandler}>重置</Button>
            <Button type="primary" className="btn-order" disabled={this.props.betCount <= 0} onClick={this.onOrderHandler}>一键下单</Button>
          </div>
        </section>
      </section>
    )
    return ReactDOM.createPortal(elements, this.orderBarContainer);
  }
}

export default OrderBar;
