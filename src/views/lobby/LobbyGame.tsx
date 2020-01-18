import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LobbyGameHeader from './LobbyGameHeader';
import Ludan from 'comp/ludan';
// import { Row, Col, Button } from 'antd-mobile';
// import LimitSetDialog from 'comp/limit-set-dialog';
import APIs from '../../http/APIs';
import { getGameTypeByGameId } from '../../game/games';
import { getLunDanTabByName, getLunDanFullTitleByName, getMethodENameByLudanName, getLudanTabByTypeAndName } from '../../utils/ludan';
import Socket from '../../socket';

import './lobbyGame.styl';

interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  gameName: string;
  goto(path: string): void;
  issueList: any[];
  bestLudanList: any[];
  recentCodeList: any[];
  curServerTime: number;
}

interface State {
  gameType: string;
  curIssue: string;
  curTime: number;
  remainTime: number;
  issueList: any[];
  maxColumns: number;
  maxRows: number;
  isShowLudanMenu: boolean;
  bestLudanConfig: any;
  bestLudanName: string;
  isShowLimitSetDialog: boolean;
  limitLevelList: LimitLevelItem[];
  methodMenuName: string;
  defaultMenu?: string;
  bestLudan: BestLudanItem;
}

let bestLudanConfig: any = {
  'ssc': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '总和大小'},
  '11x5': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '总和大小'},
  'pk10': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '冠亚和值大小'},
  'k3': {methodMenuName: 'diansu', defaultMenu: 'zh_dx', title: '总和大小'},
  'hc6':  {methodMenuName: '', defaultMenu: '', title: '总和大小'}
};

@inject("store")
@observer
class LobbyGame extends Component<Props, object> {
  state: State;
  mysocket?: Socket;
  constructor(props: Props) {
    super(props);
    let gameType = getGameTypeByGameId(props.gameId);
    let limitItem = props.store.game.getLimitListItemById(props.gameId);
    let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
    // console.log('bestLudan=', JSON.stringify(limitItem && limitItem.bestLudan));
    // let ludanTab = getLunDanTabByName(gameType, bestLudan && bestLudan.codeStyle);
    let bestLudanName = (getLunDanFullTitleByName(gameType, bestLudan && bestLudan.codeStyle) || bestLudanConfig[gameType].title) + '路单';
    let methodMenuName = getMethodENameByLudanName(gameType, bestLudan && bestLudan.codeStyle) || bestLudanConfig[gameType].methodMenuName;
    let ludanTab = getLudanTabByTypeAndName(gameType, methodMenuName, bestLudan && bestLudan.codeStyle);
    let defaultMenu = (ludanTab && ludanTab.name) || bestLudanConfig[gameType].defaultMenu;
    this.state = {
      gameType,
      curIssue: '',
      curTime: 0,
      remainTime: 0,
      issueList: [],
      maxColumns: 19,
      maxRows: 6,
      isShowLudanMenu: false,
      bestLudanConfig,
      bestLudanName: bestLudanName,
      isShowLimitSetDialog: false,
      limitLevelList: [],
      methodMenuName,
      defaultMenu,
      bestLudan
    }
  }
  componentWillMount() {
    // this.init();
    this.initDataFromProps();
  }
  componentWillReceiveProps(nextProps: Props) {
    // console.log('LobbyGame=', nextProps.store.game.getLimitListItemById(nextProps.gameId))
    // console.log('nextProps=', nextProps)
    this.getCurIssueFromProps(this.props.gameId, nextProps.issueList);
    this.getBestLudanFromPropsByGameId(this.props.gameId, nextProps.bestLudanList);
    this.getHistoryIssueFromProps(this.props.gameId, nextProps.recentCodeList);
  }
  init = () => {
    this.getCurIssue(this.props.gameId);
    this.getHistoryIssue(this.props.gameId);
  }
  initDataFromProps() {
    this.getCurIssueFromProps(this.props.gameId);
    this.getBestLudanFromPropsByGameId(this.props.gameId);
    this.getHistoryIssueFromProps(this.props.gameId);
  }
  initSocket() {
    this.mysocket = new Socket({
      url: this.props.store.common.broadcaseWSUrl,
      name: 'lobbyGame' + this.props.gameId,
      receive: (data) => {
        if (data.type === 'openWinCode') {
          if (data.content && data.content.length > 0 && parseInt(data.content[0].lottId, 10) === this.props.gameId) {
            this.openWinCode(parseInt(data.content[0].lottId, 10), data.content[0]);
            setTimeout(() => {
              this.getLimitData(this.props.gameId);
            }, 2000)
          }
        }
      },
      open: () => {
        if (this.mysocket) {
          let params: any = {action: 'noauth'};
          if (this.props.store.user.login) {
            params = {
              parameter: {
                userId: this.props.store.user.userId,
                app: 'web'
              },
              action: 'auth'
            };
          }
          this.mysocket.send(JSON.stringify(params));
        }
      }
    }, true);
  }
  openWinCode(id: number, openHistoryItem: any) {
    if (id === this.props.gameId) {
      let issueList = this.state.issueList;
      issueList.unshift(openHistoryItem);
      this.setState({
        lastIssue: issueList[0].issue,
        openNumbers: issueList[0].code.split(','),
        issueList: issueList
      });
      this.getCurIssue(this.props.gameId);
    }
  }
  componentDidMount() {
    this.initSocket();
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
  getCurIssueFromProps(gameid: number, issueList: any[] = [], curServerTime?: number) {
    issueList = issueList.length > 0 ? issueList : this.props.issueList;
    curServerTime = curServerTime || this.props.curServerTime;
    if (issueList && issueList.length > 0) {
      let data = issueList.find((issue) => issue.lotteryid === gameid);
      if (data) {
        this.setState({
          curIssue: data.issue,
          curTime: curServerTime,
          remainTime: Math.floor((data.saleend - curServerTime) / 1000) || (this.state.remainTime + 0.05)
        })
      }
    }
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
  getHistoryIssueFromProps(gameid: number, recentCodeList: any[] = []) {
    recentCodeList = recentCodeList.length > 0 ? recentCodeList : this.props.recentCodeList;
    if (recentCodeList && recentCodeList.length > 0) {
      let data = recentCodeList.find((item) => item[gameid] && item[gameid].length > 0);
      data = data && data[gameid];
      if (data) {
        this.setState({
          lastIssue: data[0].issue,
          openNumbers: data[0].code.split(','),
          issueList: data
        });
      }
    }
  }
  gotoGame = () => {
    this.props.goto(`/game/${this.props.gameId}`);
  }
  onIntoGame = () => {
    if (this.props.store.game.getGameLimitLevelByGameId(this.props.gameId)) {
      this.gotoGame();
    } else {
      let limitListItem = this.props.store.game.getLimitListItemById(this.props.gameId);
      this.setState({isShowLimitSetDialog: true, limitLevelList: limitListItem ? limitListItem.kqPrizeLimit : []});
    }
  }
  onLimitChoiceCB = (level: number) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.props.gameId, level});
    this.gotoGame();
  }
  onCloseLimitChoiceHandler = () => {
    this.setState({isShowLimitSetDialog: false});
  }
  componentWillUnmount() {
    this.mysocket && this.mysocket.removeListen();
  }
  renderBestLudanTxt() {
    let bestLudan = this.state.bestLudan;
    if (!bestLudan) return <div></div>
    return <React.Fragment>
      <div>
        <span className="mgr-20">{ bestLudan.pos }<span className="c-red">{ bestLudan.notifyVal }</span>路单</span>
      </div>
      <div>
        <span>{[null, '长龙', '单跳', '单边跳', '一厅两房', '拍拍连'][bestLudan.notifyType] || '连出' }<span className="c-red">{ bestLudan.contCount }</span>{bestLudan.unit}</span>
      </div>
    </React.Fragment>
  }
  updateBestLudan(bestLudan: BestLudanItem) {
    let bestLudanName = (getLunDanFullTitleByName(this.state.gameType, bestLudan && bestLudan.codeStyle) || bestLudanConfig[this.state.gameType].title) + '路单';
    let methodMenuName = getMethodENameByLudanName(this.state.gameType, bestLudan && bestLudan.codeStyle) || bestLudanConfig[this.state.gameType].methodMenuName;
    let ludanTab = getLudanTabByTypeAndName(this.state.gameType, methodMenuName, bestLudan && bestLudan.codeStyle);
    let defaultMenu = (ludanTab && ludanTab.name) || bestLudanConfig[this.state.gameType].defaultMenu;
    // console.log('id=', id, 'methodMenuName=', methodMenuName, ' defaultMenu=', defaultMenu)
    this.setState({
      bestLudanName: bestLudanName,
      methodMenuName,
      defaultMenu,
      bestLudan
    });
    this.props.store.game.updateLimitListItemBestLudan(bestLudan);
  }
  getLimitData(id: number) {
    APIs.getBestLudan({lotteryId: id}).then((data: any) => {
      if (data.success === 1) {
        if (data.bestLudan) {
          this.updateBestLudan(data.bestLudan);
        }
      }
    });
  }
  getBestLudanFromPropsByGameId(id: number, bestLudanList: any[] = []) {
    bestLudanList = bestLudanList.length > 0 ? bestLudanList : this.props.bestLudanList;
    if (bestLudanList && bestLudanList.length > 0) {
      let besetLudan = this.props.bestLudanList.find((ludan) => ludan.lotteryId === id)
      if (besetLudan) {
        this.updateBestLudan(besetLudan);
      }
    }
  }
  render() {
    return (
      <section className="lobby-game-view crs-p" onClick={this.gotoGame}>
        <LobbyGameHeader gameType={this.props.gameType} gameId={this.props.gameId} curIssue={this.state.curIssue} remainTime={this.state.remainTime} gameName={this.props.gameName} getNewestIssue={this.getCurIssue} />
        <div className="flex jc-sb best-dudan-name">
          {/* <div>{this.state.bestLudanName}</div> */}
          {this.renderBestLudanTxt()}
        </div>
        <div className="ludan-wp">
          <Ludan 
            isShowLudanMenu={this.state.isShowLudanMenu} 
            gameId={this.props.gameId} 
            gameType={this.state.gameType} 
            maxColumns={this.state.maxColumns} 
            maxRows={this.state.maxRows} 
            issueList={this.state.issueList.slice(0).reverse()} 
            methodMenuName={this.state.methodMenuName} 
            defaultMenu={this.state.defaultMenu} 
            isScroll={false}
          />
        </div>
        {/* <LimitSetDialog isShow={this.state.isShowLimitSetDialog} gameId={this.props.gameId} limitLevelList={this.state.limitLevelList} onLimitChoiceCB={this.onLimitChoiceCB} onCloseHandler={this.onCloseLimitChoiceHandler} /> */}
      </section>
    )
  }
}

export default LobbyGame;
