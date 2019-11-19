import React from 'react'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import * as ReactDOM from 'react-dom'
import { orderList } from 'src/http/APIs'
// import Colors from 'src/utils/colorConfig'

// 分页设置
let page = 1
const pageSize = 20
// 数据
let data = []
const dns = [
  {key: 'issue', name: '期号',
    render: (x) => x.issue.slice(-6) + '期'
  },
  {key: 'methodName', name: '玩法/内容', style: {width: '25%'},
    render: (x: any) => <React.Fragment>{[<div key="1">{x.lotteryName}</div>, <div key="2">{ x.methodName } - { x.code }</div>]}</React.Fragment>
    // render: (x: any) => <div><span className={`inlb txt-c code-bg ${ getStyle(x.code) }`}>{x.code}</span><span className="odd text-orange">{ (x.dyPointDec.split('-')[0] / 100).toFixed(2) }</span></div>
  },
  {key: 'totalPrice', name: '投注金额'},
  {key: 'bonus', name: '中奖金额', cls: 'txt-c',
    render: (x) => {
      let temp = Number(x.bonus).toFixed(2)
      if (x.stat === 0 || !Number(x.bonus)) {
        return '--'
      }
      if (x.bonus > 0) {
        return <span className="c-green">+{ temp }</span>
      }
      return temp
    }
  },
  {key: 'stat', name: '状态', style: {width: '15%'}, cls: 'txt-r',
    render: (x) => <span className={`inlb status-b txt-c ${ statusCls[x.stat] }`}>{ statusList[x.stat] }</span>
  },
]
const statusCls = ['c-black', 'c-green', 'c-gray', 'c-red', 'c-gray']
const statusList = ['未开奖', '已中奖', '未中奖', '已撤单', '平局']
// const getStyle = (data: string) => {
//   if (/\d/.test(data)) return '';
//   let datas = data.split('-');
//   data = datas.length > 1 ? datas[1] : datas[0]
//   return Colors.getStyle(data);
// }

class test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (x, y) => x !== y,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
    this.setState({
      height: this.state.height - ReactDOM.findDOMNode(this.scrollNode).offsetTop
    })
    this.getOrderList()
  }
  getOrderList = () => {
    this.setState({ refreshing: true, isLoading: true })
    orderList({
      beginDate: (new Date())._setHMS('0:0:0')._bf(-7)._toAllString(),
      endDate: (new Date())._setHMS('0:0:0')._toAllString(),
      page: page,
      pageSize: pageSize,
      isfast: 1
    }).then(({success, recordList}) => {
      if (success === 1) {
        data = [...data, ...recordList]
        page++
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          refreshing: false,
          isLoading: false,
          hasMore: recordList.length >= pageSize,
        })
      }
    })
  }
  onRefresh = () => {
    page = 0
    data = []
    this.getOrderList()
  }
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.getOrderList()
  }
  renderRow (rd: any, sid: any, rid: any) {
    return (
      <div key={rd.projectId} className="pdt-40 pdb-20 pdl-10 pdr-10 b-1px-t">
        { dns.map((x, i) => 
          <span key={i} className={`inlb pdl-10 pdr-10 va-t ${x.cls || ''}`} style={x.style || {width: '20%'}}>
            { 
              x.render ? x.render(rd) : rd[x.key]
            }
          </span>
        )}
      </div>
    )
  }
  render() {
    return (
      <div className="bet-record">
        <div className="bet-record-header pdl-10 pdr-10 fs-24 c-102 hlh-90 bgc-white b-1px-b">
          { dns.map((x, i) => <span key={i} className={`inlb pdl-10 pdr-10 va-t ${x.cls || ''}`} style={x.style || {width: '20%'}}> {x.name} </span>) }
        </div>
        <ListView
          className="fs-24 c-3 fw-b"
          key={'1'}
          ref={el => this.scrollNode = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div className="pd-30 txt-c">
            {this.state.isLoading ? '加载中...' : '加载完毕'}
          </div>)}
          renderRow={this.renderRow}
          style={{height: this.state.height}}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.onEndReached}
          pageSize={pageSize}
        />
      </div>
    )
  }
}

export default test