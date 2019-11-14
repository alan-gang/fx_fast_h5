import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Bus from '../../utils/eventBus'

import './ludanMenu.styl';

interface Props {
  store?: any;
  tabs?: any;
  menus: any[];
  selectedMenu?: string;
  selectedSubMenu?: string;
  updateMenu(menuName: any): void;
  updateSubMenu(menuName: string): void;
}

interface State {
  subMenus: any[];
}

@inject('store')
@observer
class LundanMenu extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      subMenus: this.getSubMenusByName(this.props.menus, this.props.selectedMenu)
    }
  }
  componentDidMount() {
    Bus.emit('ludanSelectMenuChange', this.props.selectedMenu)
  }
  getMenuByName(menus: any[] = [], name: string = '') {
    return menus.find((menu: any) => name === menu.name);
  }
  getSubMenusByName(menus: any[], selectedMenu: string = ''): any[] {
    let menu = this.getMenuByName(menus, selectedMenu);
    return (menu && menu.subM) || [];
  }
  componentWillReceiveProps(nextProps: Props, nextState: State) {
    if (this.props.selectedMenu !== nextProps.selectedMenu || this.props.selectedSubMenu !== nextProps.selectedSubMenu) {
      Bus.emit('ludanSelectMenuChange', nextProps.selectedMenu)
      this.setState({subMenus: this.getSubMenusByName(nextProps.menus, nextProps.selectedMenu)})
    }
  }
  
  changeMenu = (menu: any) => {
    this.props.updateMenu(menu)
    Bus.emit('ludanSelectMenuChange', menu.name)
  }
  render() {
    return (
      <section className="ludan-menu-view">
        {this.state.subMenus && this.state.subMenus.length > 0 && 
        <nav className="flex sub-menu">
          {this.state.subMenus.map((menu: any, i: number) => (
            <div key={i} className={`flex jc-c ai-c sub-menu-item ${this.props.selectedSubMenu === menu.name ? 'selected' : ''}`} onClick={() => this.props.updateSubMenu(menu.name)}>{menu.title}</div>
          ))}
        </nav>}
        <nav className="flex menu">
          {this.props.menus && this.props.menus.length > 0 && this.props.menus.map((menu: any, i: number) => (
            <div key={i} className={`flex jc-c ai-c menu-item ${this.props.selectedMenu === menu.name ? 'selected' : ''}`} onClick={() => this.changeMenu(menu)}>{menu.title}</div>
          ))}
        </nav>
      </section>  
    )
  }
}

export default LundanMenu;
