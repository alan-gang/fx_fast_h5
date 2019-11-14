import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  curMenuIndex: number;
  updateMethodMenuIndex(index: number): void;
  methodMenuChangedCB(methodIds: GameMethodMenu): void;
}

interface State {
  menus: GameMethodMenu[];

  subMenus: GameSubMethodMenu[];
}

@inject('store')
@observer
class MethodMenu extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      menus: getMethodsConfigByType(this.props.gameType),
      subMenus: []
    }
  }
  componentDidMount() {
  }
  onMenuHandler = (menu: GameMethodMenu, index: number) => {
    this.props.updateMethodMenuIndex(index);
    this.props.methodMenuChangedCB(menu);
  }
  componentWillReceiveProps(nextProps: Props, nextState: State) {
  }
  render() {
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.props.gameType);
    return (
      <section className="method-menu-view">
        <section className="menu-wp">
          <nav className="flex ai-c">
            {menus.map((menu, i) => (
              <div key={i} className={`menu-item ${i === this.props.curMenuIndex ? 'selected' : ''}`} onClick={() => {this.onMenuHandler(menu, i)}}>{menu.name}</div>
            ))}
          </nav>
        </section>
        <section className="sub-menu-wp">
          <nav></nav>
        </section>
      </section>
    )
  }
}

export default MethodMenu;
