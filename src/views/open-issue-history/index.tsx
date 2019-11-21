import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { historyIssueByDate } from 'src/http/APIs'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import * as ReactDOM from 'react-dom'
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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (x: any, y: any) => x !== y,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
    }
    this.init()
    this.list()
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
  renderRow (rd: any, sid: any, rid: any) {
    return (
      <div key={rid} className="pdt-25 pdb-25 pdl-20 pdr-20">
        <div className="inlb wp_30 va-t mgt-10 ">{ rd.issue }期</div>
        <div className="inlb wp_70 va-t">
          {
            rd.code.split(',').map((x: any, i: any) => {
              return <span key={i} className="inlb win-number rp_50 hlh-45 w-45  bgc-deeporange mgr-10 mgb-10 txt-c c-white">{ x }</span>
            })
          }
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="open-issue-history">
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
