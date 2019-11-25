import React from 'react'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import * as ReactDOM from 'react-dom'
import { getBetRemind, historyIssue } from 'src/http/APIs'
import LundanTable from 'comp/ludan/LundanTable'
import { getLuDanListByMethod } from 'src/utils/ludan'
import { getGameTypeByGameId } from 'src/game/games'

let PullToRefreshAny: any = PullToRefresh

// 分页设置
let page = 1
// get Max 200 count
const pageSize = 200
// 数据
let data: object[] = []

class BookLeadingHistory extends React.Component<Props, object> {
  state: any
  scrollNode?: any
  constructor (props: Props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (x: any, y: any) => x !== y,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
      // 当前展开的index
      activeIndex:  0,
      activeGameId: 0,
    }
    this.init()
  }
  init () {
    page = 0
    data = []
    this.list()
  }
  list () {
    getBetRemind().then((rep: any) => {
      if (rep.success === 1) {
        rep.data.forEach((x: any) => (x.ludanList = []))
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
  getHistoryIssue(gameid: number, rid: string, rd: any) {
    this.setState({
      activeIndex: rid,
      activeGameId: gameid,
    })
    historyIssue({gameid}).then((rep: any) => {
      if (rep.success === 1) {
        if (rep.items.length > 0) {
          rd.ludanList = rep.items
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
          })

        }
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
  renderRow = (rd: any, sid: any, rid: any) => {
    return (
      <div key={rid} className="pdt-25 pdb-25 pdl-20 pdr-20">
        <div className="flex jc-sb">
          <div className="fg-1 flex jc-sb clickable" onClick={() => this.getHistoryIssue(rd.lotteryId, rid, rd)}>
            <span>{ rd.lotteryName }</span>
            <span>{ rd.pos }<span className="c-red">{ rd.notifyVal }</span></span>
            <span>
              { [null, '长龙', '单跳', '单边跳', '一厅两房', '拍拍连'][rd.notifyType] || '连出' }<span className="c-red">{ rd.contCount }</span>期
            </span>

          </div>
          <span className="icon-triangle down mgl-20 pos-r pot--5"></span>

        </div>
        {
          rd.ludanList[0] ? <LundanTable
            maxColumns={19} 
            maxRows={6} 
            ludanList={
              getLuDanListByMethod(rd.ludanList.slice(0).reverse(), getGameTypeByGameId(this.state.activeGameId), rd.codeStyle)
            } 
            /> : <div>11111111111</div>
        }
        
      </div>
    )
  }
  render () {
    return <div className="book-leading-history">
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
  }
}

export default BookLeadingHistory