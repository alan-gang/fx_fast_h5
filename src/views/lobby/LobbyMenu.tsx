import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { LOTTERY_TYPES } from '../../utils/config';

import './lobbyMenu.styl';

interface Props {
  store?: any;
  onMenuChanged(type: string): void;
}

interface Menu {
  name: string;
  type: string;
}

interface State {
  menus: Menu[],
  curSelectedMenuIndex: number;
}

const lobbyMenus = [
  {type: 'hot', name: '热门彩种', s: false},
  {type: LOTTERY_TYPES.SSC, name: '时时彩', s: false},
  {type: LOTTERY_TYPES.G11X5, name: '11选5', s: false},
  {type: LOTTERY_TYPES.PK10, name: 'PK10', s: false},
  {type: LOTTERY_TYPES.K3, name: '快三', s: false}
];

@inject('store')
@observer
class LobbyMenu extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      menus: lobbyMenus,
      curSelectedMenuIndex: 0
    }
  }
  onMenuHandler = (menu: Menu, index: number) => {
    this.setState({curSelectedMenuIndex: index});
    this.props.onMenuChanged(menu.type);
  }
  render() {
    return (
      <section className="lobby-menu-view">
        <nav className="flex ai-c lobby-menu-wp">
          {this.state.menus.map((menu: Menu, i: number) => (
            <div key={i} className={`flex ai-c lobby-menu-item icon-${menu.type} ${this.state.curSelectedMenuIndex === i ? 'selected' : ''}`} onClick={(e) => this.onMenuHandler(menu, i)}>{menu.name}</div>
          ))}
        </nav>
      </section>
    )
  }
}

export default LobbyMenu;
