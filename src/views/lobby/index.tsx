import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from "react-router-dom";
// import LobbyMenu from './LobbyMenu';
import LobbyGame from './LobbyGame';
import { getGamesByType, getAllGames } from '../../game/games';
import { Game } from '../../typings/games';
import { getUrlParams } from '../../utils/common';

import './index.styl';

interface IProps {
  store?: any;
  gameType?: string;
}

type Props = IProps & RouteComponentProps;

interface State {
  curGameType: string;
  curGames: Game[]
}

@inject("store")
@observer
class Lobby extends Component<Props, object> {
  DEFAULT_GAME_TYPE: string = 'hot';
  state: State;
  constructor(props: Props) {
    super(props);
    let curGames = this.filterAvailableGames(getAllGames()); 
    this.state = {
      curGameType: this.DEFAULT_GAME_TYPE,
      curGames
    }
    this.checkFrom();
  }
  componentWillMount() {
    if (this.state.curGames.length <= 0) {
      this.props.store.game.getAvailableGames((availableGames: number[]) => {
        this.setState({
          curGames: this.filterAvailableGames(getAllGames())
        }, this.checkFrom)
      });
    }
  }
  goto = (path: string) => {
    this.props.history.push(path);
  }
  onMenuChanged = (type: string) => {
    this.setState({curGames: type === this.DEFAULT_GAME_TYPE ? getAllGames() : getGamesByType(type)})
  }
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
  render() {
    return (
      <article className="lobby-view">
        {/* <LobbyMenu onMenuChanged={this.onMenuChanged} /> */}
        <section className="flex lobby-game-ls">
          {this.state.curGames.map((game: Game) => (
            <LobbyGame key={game.id} gameType={this.state.curGameType} gameId={game.id} gameName={game.name} goto={this.goto}/>
          ))}
        </section>
      </article>
    )
  }
}

export default Lobby;
