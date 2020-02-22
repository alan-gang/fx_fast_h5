import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from "react-router-dom";
import { PullToRefresh, ListView } from 'antd-mobile';
import LobbyGame from './LobbyGame';
import { getGamesByType, getAllGames } from '../../game/games';
import { Game } from '../../typings/games';
import { getUrlParams } from '../../utils/common';
import APIs from '../../http/APIs';

import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

type Props = IProps & RouteComponentProps;

interface State {
  curGameType: string;
  curGames: Game[];
  gamesDataSource: any;
  issueList: any[];
  bestLudanList: any[];
  recentCodeList: any[];
  curServerTime: number;
  isLoading: boolean;
  gameIds: string[];
}

const PAGE_SIZE = 5;
let curPageNo = 1;
let totalPage = 1;
@inject("store")
@observer
class Lobby extends Component<Props, object> {
  DEFAULT_GAME_TYPE: string = 'hot';
  state: State;
  reflv: any;
  constructor(props: Props) {
    super(props);
    let curGames = this.filterAvailableGames(getAllGames()); 
    this.state = {
      curGameType: this.DEFAULT_GAME_TYPE,
      curGames,
      gamesDataSource: new ListView.DataSource({
        rowHasChanged: (row1: any, row2: any) => true
      }),
      issueList: [],
      bestLudanList: [],
      recentCodeList: [],
      curServerTime: 0,
      isLoading: false,
      gameIds: []
    }
  }
  init = () => {
    this.checkFrom();
    const gameIds = this.getGameIds(this.state.curGames);
    totalPage = Math.ceil(gameIds.length / PAGE_SIZE);
    this.setState({gameIds}, this.loadMore);
  }
  componentWillMount() {
    curPageNo = 1;
    totalPage = 1;
    if (this.state.curGames.length <= 0) {
      this.props.store.game.getAvailableGames((availableGames: number[]) => {
        this.setState({
          curGames: this.filterAvailableGames(getAllGames())
        }, this.init);
      });
    } else {
      this.init();
    }
  }
  goto = (path: string) => {
    this.props.history.push(path);
  }
  onMenuChanged = (type: string) => {
    this.setState({curGames: type === this.DEFAULT_GAME_TYPE ? getAllGames() : getGamesByType(type)})
  }
  /**
   * 过虑游戏
   * @param games 
   */
  filterAvailableGames(games: Game[]) {
    if (this.props.store.game.availableGames.length <= 0) return [];
    let tempGames: Game[] = [];
    games.forEach((game: Game) => {
      // 六合彩没有最优路单，大厅先过虑六合彩
      if (game.id === 28) return;
      if (this.props.store.game.hasAvailableGame(game.id)) {
        tempGames.push(game);
      }
    });
    return tempGames;
  }
  checkFrom() {
    let gameId: string = getUrlParams('gameid');
    if (gameId && this.state.curGames.length > 0) {
      let curGames = this.state.curGames;
      let game = curGames.find((game) => game.id === parseInt(gameId, 10));
      if (game) {
        this.goto(`/game/${gameId}`);
      }
    }
  }
  getGameIds(games: Game[] = []) {
    return games.map((game: Game) => game.id) || [];
  }
  /**
   * 批量获取奖期数据
   * @param ids 游戏ID列表字符串
   */
  getIssuesByGameIds(ids: string) {
    APIs.getIssuesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateIssues(data.items, data.current);
      }
    });
  }
  /**
   * 批量获取最优路单
   * @param ids 游戏ID列表字符串
   */
  getBatchBestLudanByGameIds(ids: string) {
    APIs.getBatchBestLudanByGameIds({lotteryId: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateBestLudans(data.bestLudan);
      }
    });
  }
  /**
   * 批量获取历史开奖
   * @param ids 游戏ID列表字符串
   */
  getBatchRecentCodesByGameIds(ids: string) {
    return APIs.getBatchRecentCodesByGameIds({gameid: ids}).then((data: any) => {
      if (data.success > 0) {
        this.updateRecentCodes(data.data);
      }
    });
  }
  /**
   * 更新奖期数据
   * @param datas 奖期 
   * @param curServerTime 当前服务器时间
   */
  updateIssues(datas: any[], curServerTime: number) {
    let issueList = this.state.issueList;
    let found: number = -1;
    datas.forEach((issue: any) => {
      found = issueList.findIndex((item: any) => item.lotteryid === issue.lotteryid);
      if (found !== -1) {
        issueList.splice(found, 1, issue);
      } else {
        issueList.push(issue);
      }
    });
    this.setState({issueList, curServerTime});
  }
  /**
   * 更新最优路单路数
   * @param datas 最优路单路数列表
   */
  updateBestLudans(datas: any[]) {
    let bestLudanList = this.state.bestLudanList;
    let found: number = -1;
    datas.forEach((bestLudan: any) => {
      found = bestLudanList.findIndex((item: any) => item.lotteryId === bestLudan.lotteryId);
      if (found !== -1) {
        bestLudanList.splice(found, 1, bestLudan);
      } else {
        bestLudanList.push(bestLudan);
      }
    });
    this.setState({bestLudanList});
  }
  /**
   * 更新近期开奖数据
   * @param datas 近期开奖数据列表
   */
  updateRecentCodes(datas: any[]) {
    let recentCodeList = this.state.recentCodeList;
    let found: number = -1;
    datas.forEach((recentCode: any) => {
      found = recentCodeList.findIndex((item: any) => item[recentCode.lotteryid] && item[recentCode.lotteryid].length > 0);
      if (found !== -1) {
        recentCodeList.splice(found, 1, recentCode);
      } else {
        recentCodeList.push(recentCode);
      }
    });
    this.setState({recentCodeList});
  }
  loadMore = () => {
    this.loadData();
    curPageNo++;
  }
  /**
   * 获取奖项、最优路单、近期开奖数据
   */
  loadData = () => {
    if (curPageNo > totalPage) return;
    this.setState({isLoading: true});
    const gameIds = this.state.gameIds.slice((curPageNo - 1) * PAGE_SIZE, curPageNo * PAGE_SIZE).join(',');
    const curGames = this.state.curGames.slice(0, curPageNo * PAGE_SIZE);
    this.getIssuesByGameIds(gameIds);
    this.getBatchBestLudanByGameIds(gameIds);
    this.getBatchRecentCodesByGameIds(gameIds).then(() => {
      this.setState({isLoading: false, gamesDataSource: this.state.gamesDataSource.cloneWithRows(curGames)});
    });
  }
  renderItem = (game: Game) => {
    return <LobbyGame key={game.id} gameType={this.state.curGameType} gameId={game.id} gameName={game.name} goto={this.goto} issueList={this.state.issueList} bestLudanList={this.state.bestLudanList} recentCodeList={this.state.recentCodeList} curServerTime={this.state.curServerTime} />
  }
  onEndReached = () => {
    this.loadMore();
  }
  render() {
    return (
      <article className="lobby-view">
        <section className="flex lobby-game-ls">
          {/* {this.state.curGames.map((game: Game) => (
            <LobbyGame key={game.id} gameType={this.state.curGameType} gameId={game.id} gameName={game.name} goto={this.goto} issueList={this.state.issueList} bestLudanList={this.state.bestLudanList} recentCodeList={this.state.recentCodeList} curServerTime={this.state.curServerTime} />
          ))} */}
          {
            <ListView
              ref={el => this.reflv = el}
              dataSource={this.state.gamesDataSource}
              renderFooter={() => (<div style={{ padding: 20, textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : (curPageNo >= totalPage ? '已显示所有' : '上拉加载更多') }</div>)}
              renderRow={this.renderItem}
              pageSize={PAGE_SIZE}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={1600}
            />
          }
        </section>
      </article>
    )
  }
}

export default Lobby;
