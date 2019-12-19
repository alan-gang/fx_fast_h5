import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { historyIssueByDate } from 'src/http/APIs'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import * as ReactDOM from 'react-dom'
import { getGameTypeByGameId } from '../../game/games';
import { LOTTERY_TYPES } from '../../utils/config';
import { getAnimalByNum } from '../../game/hc6';

import "./index.styl";

let PullToRefreshAny: any = PullToRefresh

interface MatchParams {
  id: any
}
interface Props extends RouteComponentProps<MatchParams> {
  store?: any
}

// 分页设置
let page = 1
// get Max 200 count
const pageSize = 200
// 数据
let data: object[] = []

@inject("store")
@observer
class openIssueHistory extends Component<Props, object> {
  id?: any
  scrollNode?: any
  state: any
  constructor (props: Props) {
    super(props)
    this.id = this.props.match.params.id
    let gameType = getGameTypeByGameId(parseInt(this.id, 10));
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (x: any, y: any) => x !== y,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
      gameType
    }
    this.init()
  }
  init () {
    page = 0
    data = []
  }
  list () {
    this.setState({ refreshing: true, isLoading: true })
    historyIssueByDate({
      lotteryId: this.id,
      // page: page,
      size: pageSize,
    }).then((rep: any) => {
      if (rep.success === 1) {
        data = [...data, ...rep.data]
        page++
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          refreshing: false,
          isLoading: false,
          hasMore: rep.data.length >= pageSize,
        })
      }
    })
  }
  componentDidMount() {
    let scrollNode: any = ReactDOM.findDOMNode(this.scrollNode)
    this.setState({
      height: this.state.height - scrollNode.offsetTop
    })
    this.list()
  }
  onRefresh = () => {
    this.list()
  }
  onEndReached = () => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    // this.list()
  }
  getNum = (x: any) => {
    if (LOTTERY_TYPES.K3 === this.state.gameType) {
      return '';
    } else {
      return x;
    }
  }
  isHc6() {
    return this.state.gameType === LOTTERY_TYPES.HC6;
  }
  renderOpenNumbers(num: string, i: number) {
    if (this.isHc6()) {
      if (i === 5) {
        return (<div key={i} className={`icon-plus`}>+</div>)
      }
      return (<div><div key={i} className={`open-num-item n-${String(num).padStart(2, '0')}`}>{String(num).padStart(2, '0')}</div><div className="animal">{getAnimalByNum(parseInt(num, 10))}</div></div>)
    } else {
      return <span key={i} className={`inlb win-number rp_50 hlh-45 w-45  bgc-deeporange mgr-10 mgb-10 txt-c c-white n-${num}`}>{ this.getNum(num) }</span>
    }
  }
  renderRow = (rd: any, sid: any, rid: any) => {
    return (
      <div key={rid} className="pdt-25 pdb-25 pdl-20 pdr-20 flex">
        <div className="wp_30 va-m mgt-10 ">{ rd.issue }期</div>
        <div className="wp_70 va-m flex">
          {
            rd.code.split(',').map((x: any, i: any) => (
              <React.Fragment  key={i}>{this.renderOpenNumbers(x, i)}</React.Fragment>
              // return <span key={i} className={`inlb win-number rp_50 hlh-45 w-45  bgc-deeporange mgr-10 mgb-10 txt-c c-white n-${x}`}>{ this.getNum(x) }</span>
            ))
          }
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={`open-issue-history ${this.state.gameType}`}>
        <ListView
          className="fs-28 c-3"
          key={'1'}
          ref={el => this.scrollNode = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div className="pd-30 txt-c">
            {this.state.isLoading ? '加载中...' : '加载完毕'}
          </div>)}
          renderRow={this.renderRow}
          style={{height: this.state.height}}
          pullToRefresh={<PullToRefreshAny
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.onEndReached}
          pageSize={pageSize}
          initialListSize={15}
          renderSeparator={(sid, rid) => <div key={rid} className="h-10 bgc-page"></div>}
        />
      </div>
    )
  }
}

export default withRouter(openIssueHistory)
