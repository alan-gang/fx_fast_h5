import React, { KeyboardEvent } from 'react'
import { inject, observer } from 'mobx-react';
import { PullToRefresh, ListView, Toast } from 'antd-mobile'
import * as ReactDOM from 'react-dom'
import { getBetRemind, historyIssue } from 'src/http/APIs'
import LundanTable from 'comp/ludan/LundanTable'
import { getLuDanListByMethod } from 'src/utils/ludan'
import { getAllGameIds, getGameTypeByGameId } from 'src/game/games'
import './history.styl' 
import methodItems from 'src/game/methodItems'
import APIs from 'src/http/APIs'
import { timeFormat } from '../../utils/date'
import Bus from 'src/utils/eventBus'
import CoinSet from 'comp/coin-set'
import dayjs from 'dayjs'

interface Props {
  withAction?: boolean,
  init?: boolean,
  store?: any,
}

let PullToRefreshAny: any = PullToRefresh

// 分页设置
let page = 1
// get Max 200 count
const pageSize = 200
// 数据
let data: object[] = []

const KEY_ENTER = 13;
@inject('store')
@observer
class BookLeadingHistory extends React.Component<Props, object> {
  state: any
  scrollNode?: any
  timeoutTimer: any
  timer: any
  audio: any
  constructor (props: Props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (x: any, y: any) => true,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
      // 当前展开的index
      activeIndex:  -1,
      activeGameId: 0,
      amount: 10,
      curVal: 0
    }
    Bus.on('BookLeadingRefresh', this.init)
    Bus.on('__pushBetRemind', this.__pushBetRemind)
  }
  __pushBetRemind = (rd: any) => {
    if (data[0] && this.state.dataSource) {
      data = data.concat(rd)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      }, this.filterData)
    }
  }
  componentWillReceiveProps (next: any) {
    if (!this.props.init && next.init) {
      this.init()
    }
  }
  startIntervalResetOrder() {
    let now: any = dayjs().format('mm')
    // 每个 5 15 25 35 45 55 分钟时重新排序
    let timerTime = 10
    if (now > 5 && now < 15) {
      timerTime = 15 - now
    } else if (now > 15 && now < 25 ) {
      timerTime = 25 - now
    } else if (now > 25 && now < 35 ) {
      timerTime = 35 - now
    } else if (now > 35 && now < 45 ) {
      timerTime = 45 - now
    } else if (now > 45 && now < 55 ) {
      timerTime = 55 - now
    }
    this.timeoutTimer = setTimeout(() => {
      this.init()
      this.timer = setInterval(() => {
        this.init()
      }, 10 * 60 * 1000)
    }, timerTime * 60 * 1000)
  }
  init = () => {
    data.forEach((x: any) => {
      if (x.timeout) clearTimeout(x.timeout)
    })
    this.setState({
      activeIndex: -1,
    })
    page = 0
    data = []
    this.list()
    this.props.store.local.bookLeadingVoice && this.__music()
  }
  __music () {
    // if (!this.audio) this.audio = new window.Audio(process.env.PUBLIC_URL + '/media/24_Ctu.mp3').play()
    // this.audio.paused && this.audio.play()
  }
  list () {
    getBetRemind().then((rep: any) => {
      if (rep.success === 1) {
        rep.data.forEach((x: any) => {
          x.ludanList = []
          x.odds = x.codeRange.split(',').map((y: any) => ({n: y, v: '', odd: this.getOdd(y, x) || '?'}))
          x.timming = -1
          x.timeout = 0
        })
        data = [...data, ...rep.data]
        page++
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          refreshing: false,
          isLoading: false,
          hasMore: rep.data.length >= pageSize,
        }, this.filterData)
        let rd: any = data[0]
        this.getHistoryIssue(rd.lotteryId, '0', rd)
      }
    })
  }
  getHistoryIssue(gameid: number, rid: any, rd: any) {
    // 如果目前展开了 、 切换前关闭当前的倒计时
    if (this.state.activeIndex > -1) {
      let preRd: any = data[rid]
      clearTimeout(preRd.timeout)
    }
    if (this.state.activeIndex === rid) {
      return this.setState({
        activeIndex: -1
      })
    }
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
    this.getCurIssueData(gameid, rid, rd)
  }
  getCurIssueData = (gameid: any, rid: any, rd: any) => {
    APIs.curIssue({gameid: gameid})
      .then((rep: any) => {
        if (rep.success === 1) {
          // 已经过期 或者 倒计时不足1000ms时 删除这个提醒项 
          // rep.issue !== rd.issue || 
          if ((rep.saleend - rep.current) < 1000) {
            this.removeRd(rd, rid)
          } else {
            rd.issue = rep.issue
            rd.timming = rep.saleend - rep.current
            this.countDown(rd, rid)
          }
        } else {
          if (this.props.init) Toast.fail(rep.msg)
          setTimeout(() => {
            this.removeRd(rd, rid)
          }, 3000)
        }
      })
  }
  countDown (rd: any, rid: any) {
    if (rd.timming >= 1000) {
      // console.log(rd.lotteryName)
      rd.timming -= 1000
      rd.timeout = setTimeout(() => this.countDown(rd, rid), 1000)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      })
    } else {
      clearTimeout(rd.timeout)
      this.removeRd(rd, rid)
      
    }
    // 如果是第一个， 通知float显示这个
    if (rid === '0') {
      Bus.emit('BookLeadingCurrent', rd)
    }
  }
  removeRd (rd: any, rid: any) {
    data.splice(rid, 1)
    if (rid === this.state.activeIndex) {
      this.setState({
        activeIndex: -1
      })
    }
    if (rid * 1 < this.state.activeIndex * 1) {
      this.setState({
        activeIndex: (this.state.activeIndex * 1 - 1) + ''
      })
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    })
    // 如果删除第一个，重新
    if (rid === '0') {
      let rd: any = data[0]
      this.getHistoryIssue(rd.lotteryId, '0', rd)
    }
  }
  coinChoosed = (value: string) => {
    let amount: number = value === 'all' ? parseInt(this.props.store.user.balance, 10): parseInt(value, 10);
    this.setState({amount, curVal: amount})
  }
  componentDidMount() {
    if (!this.props.withAction) {
      let scrollNode: any = ReactDOM.findDOMNode(this.scrollNode)
      this.setState({
        height: this.state.height - scrollNode.offsetTop
      })
    } else {
      let n: any = document.querySelector('.history.fixed')
      this.setState({
        height: n.clientHeight
      })
    }
    this.init()
  }
  // 获取赔率数据
  getOdd = (type: any, rd: any) => {
    let limitItem = this.props.store.game.getLimitListItemById(rd.lotteryId)
    if (limitItem) {
      let arr: any[] = limitItem.items[rd.methodId]
      if (arr) {
        if (arr.length === 1) return arr[0].maxprize
        let rows = methodItems[rd.methodId + ':1']().rows
        if (rows.length > 1) {
          let temp: any = arr[0].maxprize
          rows.some((row: any) => {
            if (row.n === type || row.p === rd.pos) {
              return row.vs.some((tp: any) => {
                if (tp.n === type || tp.pv === type) {
                  temp = arr[tp.oddIndex || 0].maxprize
                  return true
                }
              })
            }
          })
          return temp
        } else if (rows[0].vs.length > 0) {
          let temp: any = arr[0].maxprize
          rows[0].vs.some((row: any) => {
            if (row.n === type || row.pv === type) {
              temp = arr[row.oddIndex].maxprize
              return true
            }
          })
          return temp
        } else {
          return arr[0].maxprize
        }
      }
      return ''
    }
    return ''
  }
  __validatebook (rd: any) {
    let {maxAmt, minAmt} = this.getLimit(rd.lotteryId)
    return new Promise((resolve, reject) => {
      // 没有输入
      if (!rd.odds.filter((x: any) => x.v)[0]) {
        Toast.info('请输入金额')
        reject(new Error('0'))
      // 限红
      } if (rd.odds.filter((x: any) => x.v && (x.v > maxAmt || x.v < minAmt))[0]) {
        Toast.info('投注限红')
        reject(new Error('0'))
      } else {
        resolve(1)
      }
    })
  }
  __getKqTimesItems (rd: any) {
    return rd.odds.filter((x: any) => x.v).map((x: any) => {
      return {
        content: rd.pos ? rd.pos + '-' + x.n : x.n,
        methodId: rd.methodId + '',
        projs: 1,
        money: x.v + ''
      }
    })
  }
  async __kqbooking (rd: any) {
    try {
      await this.__validatebook(rd)
    } catch (e) {
      return false
    }
    APIs.bet({betData: JSON.stringify({
      issue: rd.issue,
      lotteryId: rd.lotteryId,
      betList: this.__getKqTimesItems(rd),
      totMoney: rd.odds.reduce((p: any, x: any) => {
        p += x.v * 1
        return p
      }, 0),
      totProjs: rd.odds.filter((x: any) => x.v).length,
      isFastBet: 1,
      limitLevel: this.getLimit(rd.lotteryId).level
    })}).then((res: any) => {
      if (res.success === 1) {
        this.props.store.user.updateBalance();
        rd.odds.forEach((x: any) => {
          x.v = ''
        })
        Toast.info('投注成功')
      } else {
        Toast.fail(res.msg || '投注失败')
      }
    })
  }
  // 获取限红
  getLimit = (gameId: any) => {
    let xh = this.props.store.game.getGameLimitLevelByGameId(gameId);
    let limitListItem = this.props.store.game.getLimitListItemById(gameId);
    if (xh) {
      return this.props.store.game.getKqLimitLevelItemById(gameId, xh.level)
    } else {
      return limitListItem.kqPrizeLimit[0]
    }
  }
  onRefresh = () => {
    this.init()
  }
  onEndReached = () => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    // this.list()
  }
  inputChange (e: any, x: any) {
    (x.v = e.target.value)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      curVal: parseInt(x.v, 10)
    }) 
  }
  defaultInputHandler = (x: any, v: any) => {
    x.v = v;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      curVal: parseInt(x.v, 10)
    }) 
  }
  getFilterAvailableGames = function(interfaceGameIds: number[]) {
    return getAllGameIds().filter((id: number) => interfaceGameIds.includes(id))
  }
  filterData() {
    if (this.props.store.game.availableGames && this.props.store.game.availableGames.length > 0) {
      this.updateFilteredData(this.props.store.game.availableGames);
    } else {
      APIs.getLotterys().then((d: any) => {
        if (d.lotteryList) {
          this.updateFilteredData(d.lotteryList.map((game: any) => game.lotteryId));
        }
      });
    }
  }
  componentWillUnmount() {
    Bus.off('BookLeadingRefresh', this.init);
    Bus.off('__pushBetRemind', this.__pushBetRemind);
  }
  updateFilteredData(availableGames: any) {
    let games = this.getFilterAvailableGames(availableGames);
    data = data.filter((item: any) => games.includes(item.lotteryId));
    this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
  }
  keyupHandler = (rd: any, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === KEY_ENTER) {
      this.__kqbooking(rd)
    }
  }
  renderRow = (rd: any, sid: any, rid: any) => {
    if (!rd) {
      return <div></div>
    }
    return (
      <div key={rd.lotteryName + rd.issue + rd.codeRange + rd.pos + rd.notifyVal} className="pdt-25 pdb-25 pdl-20 pdr-20 bgc-247" title={rd.lotteryName + rd.issue + rd.codeRange + rd.pos + rd.notifyVal}>
        <div className="flex jc-sb mgb-15">
          <div className="fg-1 flex jc-sb clickable" onClick={() => this.getHistoryIssue(rd.lotteryId, rid, rd)}>
            <span className="c-0 fw-b">{ rd.lotteryName }</span>
            <span>
              <span className="mgr-20">{ rd.pos }<span className="c-red">{ rd.notifyVal }</span></span>
              <span>
                { [null, '长龙', '单跳', '单边跳', '一厅两房', '拍拍连'][rd.notifyType] || '连出' }<span className="c-red">{ rd.contCount }</span>{rd.unit}
              </span>
            </span>
          </div>
          <span className={`${this.state.activeIndex === rid ? 'rz_180' : ''} pdl-5 inlb w-33 h-33 rp_50 mgl-20 bgc-109 c-white`}>
            <span className="icon-triangle down"></span>
          </span>
        </div>
        <div className="wp_100">
        {
          rd.ludanList && rd.ludanList[0] && rid === this.state.activeIndex ? <LundanTable
            maxColumns={19} 
            maxRows={6} 
            isScroll={false}
            ludanList={
              getLuDanListByMethod(rd.ludanList.slice(0).reverse(), getGameTypeByGameId(this.state.activeGameId), rd.codeStyle)
            } 
            /> : ''
        }
        </div>
        {
          rid === this.state.activeIndex && this.props.withAction ? <div className="book-leading-action">
            <div className="flex fs-26 jc-sb mgt-10 mgb-20 c-3">
              <span >{rd.issue}期</span>
              <span className="c-deeporange fs-30 fw-b">{rd.timming > 0 ? timeFormat(rd.timming) : ''}</span>
            </div>
            <div className="mgb-20">
              {
                rd.odds.map((x: any, i: number) => {
                  return <div className="book-leading-item wp_50 inlb mgb-10" key={i} onClick={ (e) => this.defaultInputHandler(x, x.v = x.v ? '' : this.state.amount)}>
                    <span className={`${ x.v ? 'bgc-deeporange c-white' : 'bgc-white' } book-leading-ball r_5 inlb  minw-54 hlh-54 txt-c fw-b mgr-2 pdl-5 pdr-5`}>{x.n}</span>
                    <span className="book-leading-odd c-deeporange">{x.odd}</span>
                    <input className={`bgc-white c-deeporange book-leading-input  w-180 hlh-54 pdl-15 pdr-15 mgl-10  fw-b`} 
                      type="number" pattern="[0-9]*"
                      onClick={ (e) => x.v && e.stopPropagation() }
                      value={x.v} 
                      onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => this.keyupHandler(rd, e)}
                      onChange={ (e) => this.inputChange(e, x)} />
                  </div>
                })
              }
            </div>
            <div className="mgb-20">{<CoinSet coinChoosed={this.coinChoosed} value={this.state.curVal} />}</div>
            <div className="bgc-deeporange clickable r_15 c-white hlh-72 txt-c fs-28 fw-b " onClick={(e) => this.__kqbooking(rd)}>立即投注</div>
          </div> : ''
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
          renderSeparator={(sid, rid) => <div key={rid} className="h-10"></div>}
        />
    </div>
  }
}

export default BookLeadingHistory