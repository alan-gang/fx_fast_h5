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
}

@inject("store")
@observer
class LobbyGame extends Component<Props, object> {
  state: State;
  mysocket?: Socket;
  constructor(props: Props) {
    super(props);
    let bestLudanConfig: any = {
      'ssc': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '总和大小'},
      '11x5': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '总和大小'},
      'pk10': {methodMenuName: 'zhenghe', defaultMenu: 'zh_dx', title: '冠亚和值大小'},
      'k3': {methodMenuName: 'diansu', defaultMenu: 'zh_dx', title: '总和大小'},
      'hc6':  {methodMenuName: '', defaultMenu: '', title: '总和大小'}
    };
    let gameType = getGameTypeByGameId(props.gameId);
    let limitItem = props.store.game.getLimitListItemById(props.gameId);
    let bestLudan: BestLudanItem = limitItem && limitItem.bestLudan;
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
      defaultMenu
    }
  }
  componentWillMount() {
    this.init();
  }
  init() {
    this.getCurIssue(this.props.gameId);
    this.getHistoryIssue(this.props.gameId);
  }
  initSocket() {
    this.mysocket = new Socket({
      url: this.props.store.common.broadcaseWSUrl,
      name: 'lobbyGame' + this.props.gameId,
      receive: (data) => {
        if (data.type === 'openWinCode') {
          this.openWinCode(parseInt(data.content[0].lottId, 10), data.content[0]);
        }
      },
      open: () => {
        this.mysocket && this.mysocket.send(JSON.stringify(Object.assign({action: 'noauth'}, {})));
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
  render() {
    return (
      <section className="lobby-game-view crs-p" onClick={this.gotoGame}>
        <LobbyGameHeader gameType={this.props.gameType} gameId={this.props.gameId} curIssue={this.state.curIssue} remainTime={this.state.remainTime} gameName={this.props.gameName} getNewestIssue={this.getCurIssue} />
        <div className="best-dudan-name">{this.state.bestLudanName}</div>
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
          />
        </div>
        {/* <LimitSetDialog isShow={this.state.isShowLimitSetDialog} gameId={this.props.gameId} limitLevelList={this.state.limitLevelList} onLimitChoiceCB={this.onLimitChoiceCB} onCloseHandler={this.onCloseLimitChoiceHandler} /> */}
      </section>
    )
  }
}

export default LobbyGame;
