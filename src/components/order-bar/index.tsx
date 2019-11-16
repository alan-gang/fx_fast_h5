import React, { Component, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd-mobile';
// import CoinSet from '../coin-set';
import APIs from '../../http/APIs';
import calc from '../../game/calc';
import { removeRepeat2DArray, countRepeat } from '../../utils/game';

import './index.styl';

interface Props {
  store?: any;
  gameId: number;
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
}

interface State {
  amount: number;
}

let DEFAULT_AMOUNT = 2;

@inject('store')
@observer
class OrderBar extends Component<Props, object> {
  showLoading: boolean = false;
  state: State;
  calc: any = calc;
  constructor(props: Props) {
    super(props);
    this.state = {
      amount: this.props.defaultInitMethodItemAmount
    }
  }
  coinChoosed = (value: number) => {
    this.setState({amount: value});
    this.props.updateDefaultInitMethodItemAmount(value);
  }
  onResetHandler = () => {
    // Modal.confirm({
    //   centered: true,
    //   title: '您确定要重置选中的投注？',
    //   content: '',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     this.props.resetSelectedOfAllMethodItem();
    //   }
    // });
  }
  onOrderHandler = () => {
    this.order();
  }
  validate(params: any): boolean {
    if (!params.issue) {
      // message.warning('获取游戏期号失败，请刷新后重试！');
      return false;
    } else if(!params.betList || params.betList.length <= 0) {
      return false;
    } else if (params.errorMsg) {
      // message.warning(params.errorMsg);
      return false;
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
        params.totProjs = params.betList.length;
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
        params.betList = contents;
        params.totProjs = params.betList.length;
      } else if (['zx_q2', 'zx_q3'].includes(methodItem.methodTypeName)) {
        // 直选 前二、三
        let nc = methodItem.rows.map((row: any) => {
          return row.nc;
        });
        nc = removeRepeat2DArray(nc);
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
        params.betList = contents;
        params.totProjs = params.betList.length;
      } else {
        methodItem.rows.forEach((row: any) => {
          row.vs.forEach((vsItem: any) => {
            if (vsItem.s) {
              params.totMoney += parseInt(vsItem.amt, 10);
              params.totProjs++;
              pos = row.nonasv ? '' : row.p || row.n;
              val = vsItem.p ? (vsItem.p + '-' + (vsItem.pv || vsItem.n)) : (vsItem.pv || vsItem.n)
              content = pos ? pos + '-' + val : val;
              params.betList.push({methodId: methodItem.id.split(':')[0], projs: 1, money: vsItem.amt, content});
            }
          });
        });
      }
    });
    return params;
  }
  calcBet() {
    let curGameMethodItems = this.props.curGameMethodItems;
    let methodList: DataMethodItem[] = [];
    let method: any;
    let betCount: number = 0;
    let repeatCount = 0;

    // 构造注数计算格式
    let methodTypeName: string = '';
    curGameMethodItems.forEach((methodItem: DataMethodItem) => {
      methodTypeName = methodItem.methodTypeName || '';
      method = {id: methodItem.id, rows: []};
      methodItem.rows.forEach((row: any) => {
        method.rows.push(row.nc);
      });
      methodList.push(method);
    });
    
    // 计算重复数
    if (['zx_q2', 'zx_q3'].includes(methodTypeName)) {
      repeatCount = countRepeat(methodList.map((methodItem: DataMethodItem) => methodItem.rows));
    }

    if (!['zx_q3'].includes(methodTypeName)) {
      methodList = methodList.map((methodItem: DataMethodItem) => {
        methodItem.rows = methodItem.rows.map((row: any) => {
          return row.length;
        })
        return methodItem;
      });
    }

    // 总注数
    methodList.forEach((methodItem: DataMethodItem) => {
      betCount += this.calc[methodItem.id]({nsl: methodItem.rows, ns: methodItem.rows, repeatCount});
    });

    return betCount;
  }
  order() {
    let params = this.getParams();
    if (!this.validate(params)) {
      return null;
    }
    APIs.bet({betData: JSON.stringify(params)}).then(({success, msg}: any) => {
      this.showLoading = false;
      if (success === 1) {
        this.props.store.user.updateBalance();
        // Modal.success({
        //   centered: true,
        //   title: '投注成功',
        //   content: ''
        // });
        this.props.orderFinishCB(true);
      } else {
        // Modal.error({
        //   centered: true,
        //   title: msg || '投注失败',
        //   content: ''
        // });
        this.props.orderFinishCB(false);
      }
    });
  }
  onAmountChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let eType  = event.type;
    if (!/^\d*$/g.test(value)) {
      value = String(this.props.defaultInitMethodItemAmount);
    }
    if (eType === 'blur' && !/^\d+$/g.test(value)) {
      value = String(this.props.defaultInitMethodItemAmount || DEFAULT_AMOUNT);
    }
    this.setState({amount: value});
    this.props.updateDefaultInitMethodItemAmount(parseInt(value, 10));
  }
  render() {
    return (
      <section className="order-bar-view">
        <div className="flex ai-c ">
          <div>
            <div className="flex ai-c fast-amount-wp">
              <input className="fast-amount" value={this.state.amount} onChange={this.onAmountChanged} onBlur={this.onAmountChanged} placeholder="请输入快捷金额" />
            </div>  
          </div>
          {/* <div span={10}><CoinSet coinChoosed={this.coinChoosed} /></Col> */}
          <div className="txt-r">
            已选 <span className="txt-red">{this.props.betCount}</span> 注 共 <span className="txt-red"> {(this.props.amount).toFixed(3)} </span>元
          </div>
          <div className="flex ai-c jc-e btns-wp">
            <Button className="btn-reset" disabled={this.props.betCount <= 0} onClick={this.onResetHandler}>重置</Button>
            <Button className="btn-order" disabled={this.props.betCount <= 0} onClick={this.onOrderHandler}>一键下单</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default OrderBar;
