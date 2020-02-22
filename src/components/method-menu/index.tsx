import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getMethodsConfigByType } from '../../game/gameMethods';
import { GameMethodMenu, GameSubMethodMenu } from '../../typings/games';
import MyScroll from '../my-scroll';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  curMenuIndex: number;
  updateMethodMenuIndex(index: number): void;
  methodMenuChangedCB(methodIds: GameMethodMenu): void;
  odds: any[];
}

interface State {
  menus: GameMethodMenu[];
  subMenus: GameSubMethodMenu[];
}

@inject('store')
@observer
class MethodMenu extends Component<Props, object> {
  state: State;
  myScrollRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      menus: getMethodsConfigByType(this.props.gameType),
      subMenus: []
    }
    this.myScrollRef = React.createRef();
  }
  componentDidMount() {
    this.myScrollRef.current.refresh();
  }
  onMenuHandler = (menu: GameMethodMenu, index: number) => {
    this.props.updateMethodMenuIndex(index);
    this.props.methodMenuChangedCB(menu);
  }
  componentWillReceiveProps(nextProps: Props, nextState: State) {
    this.myScrollRef.current.refresh();
  }
  render() {
    let menus: GameMethodMenu[] = getMethodsConfigByType(this.props.gameType);
    menus = menus.filter(item => {
      return item.ids.some((id: any) => {
        let methodId = id.split(':')[0]
        if (this.props.odds[methodId]) return true
      })
    });
    return (
      <section className="method-menu-view">
        <section className="menu-wp">
          <MyScroll ref={this.myScrollRef}>
            <nav className="menu-item-ls">
              {menus.map((menu, i) => (
                <div key={i} className={`menu-item ${i === this.props.curMenuIndex ? 'selected' : ''}`} onClick={() => {this.onMenuHandler(menu, i)}}><span>{menu.name}</span></div>
              ))}
            </nav>
          </MyScroll>
        </section>
        <section className="sub-menu-wp">
          <nav></nav>
        </section>
      </section>
    )
  }
}

export default MethodMenu;
