import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import store from '../../store'
import './gamemenu.styl'
import games from 'src/game/games'
import { getGamesByType } from 'src/game/games'
import { Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Bus from 'src/utils/eventBus'

@inject("store")
@observer
class GameMenu extends React.Component<Props, object> {
  state = {
    // active game type
    type: games[0].type,
    // active game id
    games: games[0].items,
    id: 0,
  }
  constructor(props: Props) {
    super(props)
    Bus.on('gameIdChanged', this.activeGame);
  }
  componentDidMount() {
    this.updateGames(this.state.type);
  }
  togglePanel () {
    store.common.togglePanel()
  }
  activeType (x: any) {
    this.setState({type: x.type})
    this.updateGames(x.type);
  }
  updateGames(type: string) {
    let games = getGamesByType(type);
    this.props.store.game.getAvailableGames(() => {
      games = this.props.store.game.availableGames.length > 0 ? ((games || []).filter((game) => this.props.store.game.hasAvailableGame(game.id))) : games;
      this.setState({games})
    });
  }
  activeGame = (id: any) => {
    this.setState({id: id})
  }
  render() {
    return (<div className="game-menu wp_100 hp_100 fs-30 o_h">
      <div className="lh-88 app-header-view c-white" onClick={this.togglePanel}>
        <Icon type="left" size="lg" className="va-m" />
        <span>返回首页</span>
      </div>
      <div className="pos-a pot-88 pob-0 pol-0 left lh-100 wp_30 bgc-page txt-c o_a">
      { games.map((x, i) => <div key={i} className={ (x.type === this.state.type ? 'active c-deeporange' : 'c-9') + ' left-item clickable' } onClick={(e) => this.activeType(x)}>{x.name}</div>) }
      </div>

      <div className="pos-a pot-88 pob-0 por-0 right wp_70 fs-24 o_a" onClick={this.togglePanel}>
        { this.state.games.map((x, i) => <Link to={'/game/' + x.id} key={i}  className={ (x.id === this.state.id ? 'active c-deeporange' : '') + ' right-item clickable effect-gray inlb wp_50 pdt-130 pdb-20 txt-c _gid' + x.id }>{x.name}</Link>) }
      </div>

    </div>)
  }
}
export default GameMenu;
