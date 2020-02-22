import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { orderList } from '../../http/APIs'
import { numberWithCommas } from '../../utils/num'
import { PullToRefresh } from 'antd-mobile';
import { getAllGames, getGameTypeByGameId } from '../../game/games';
import { LOTTERY_TYPES } from '../../utils/config';

import Colors from '../../utils/colorConfig'

import './index.styl'

interface State {
  orderList: object[];
  totalSize: number;
  pageSize: number;
  currentPage: number;
  issueRangeButtons: string[];
  quickIssueRangeIdx: number;
  games: object[];
  date: any;
  statusCls: string[];
  status: number;
  id: string;
  issue: string;
  stEt: string[];
  gameId: string;
  gameName: string;
  isShowChangeLottery: boolean;
  searchDateIndex: number;
  refreshing: false,
  down: boolean,
  height: number,
}

const timeGroup = ['今天', '昨天', '前天', '最近一周']
const dateMappingConfig: any = { d0: [0, 0], d1: [1, 1], d2: [2, 2], d3: [6, 0] }
const statusList = ['未开奖', '已中奖', '未中奖', '已撤单', '平局']
const cols = [
  {
    title: '期号',
    dataIndex: 'issue'
  },
  {
    title: '游戏/内容',
    dataIndex: 'lotteryName',
  },
  {
    title: '投注金额',
    dataIndex: 'totalPrice',
  },
  {
    title: '中奖金额',
    dataIndex: 'bonus',
    
  },
  {
    title: '状态',
    dataIndex: 'stat',
  },
]

@inject("store")
@observer
class BetRecords extends Component<Props, object> {
  state: State
  constructor(props: Props) {
    super(props);
    this.state = {
      orderList: [],
      totalSize: 0,
      pageSize: 20,
      currentPage: 1,
      issueRangeButtons: ['最近30期', '最近50期', '最近100期', '最近200期'],
      quickIssueRangeIdx: -1,
      games: [],
      date: null,
      statusCls: ['', 'text-green', 'text-r', 'text-gray', 'bgc-gray', 'bgc-gray'],
      status: -1,
      id: '',
      issue: '',
      stEt: [],
      gameId: '',
      gameName: '全部',
      isShowChangeLottery: false,
      searchDateIndex: 0,
      refreshing: false,
      down: true,
      height: 600,
    }
  }
  componentWillMount() {
    this.getOrderList()
  }
  getOrderList = (params: object = {}) => {
    const gameType = getGameTypeByGameId(parseInt(this.state.gameId, 10));
    const isfast = gameType === LOTTERY_TYPES.HC6 ? 0 : 1;
    params = Object.assign({
      projectId: this.state.id,
      beginDate: this.state.stEt[0],
      endDate: this.state.stEt[1],
      stat: this.state.status,
      // scope: '',
      lotteryId: this.state.gameId,
      issue: this.state.issue,
      // modes: this.mode !== '' ? this.mode + 1 : '',
      page: this.state.currentPage,
      pageSize: this.state.pageSize,
      isfast
    })
    orderList(params)
      .then((data: any) => {
        if (data.success === 1) {
          this.setState({
            orderList: data.recordList,
            totalSize: data.totalSize
          })
        }
      })
  }
  pageChanged = (page: any) => {
    this.setState({
      currentPage: page
    }, () => {
      this.getOrderList()
    })
  }
  query = () => {
    this.setState({
      currentPage: 1
    }, () => {
      this.getOrderList()
    })
  }
  getStyle = (data: string) => {
    if (/\d/.test(data)) return '';
    let datas = data.split('-');
    data = datas.length > 1 ? datas[1] : datas[0]
    return Colors.getStyle(data);
  }

  render() {
    return (
      <article className="bet-records-view">
        <table></table>
        <div></div>
        <PullToRefresh
          getScrollContainer={() => (<div className="my-scroll"></div>)}
          damping={60}
          distanceToRefresh={25}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        >
          {this.state.orderList.map((o, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
              {this.state.down ? 'pull down' : 'pull up'} {i}
            </div>
          ))}
        </PullToRefresh>

      </article>
    )
  }
}

export default BetRecords;
