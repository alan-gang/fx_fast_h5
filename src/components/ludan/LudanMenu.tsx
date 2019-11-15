import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Bus from '../../utils/eventBus';
import MyScroll from '../my-scroll';
import './ludanMenu.styl';

interface Props {
  store?: any;
  tabs: any[];
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
  myScrollRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      subMenus: this.getSubMenusByName(this.props.menus, this.props.selectedMenu)
    }
    this.myScrollRef = React.createRef();
  }
  componentDidMount() {
    Bus.emit('ludanSelectMenuChange', this.props.selectedMenu);
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
    console.log('info menu=', menu);
    this.myScrollRef.current.refresh();
    // this.props.updateMenu(menu)
    // Bus.emit('ludanSelectMenuChange', menu.name);
  }
  render() {
    return (
      <section className="ludan-menu-view">
        <MyScroll ref={this.myScrollRef}>
          <nav className="menu">
            {this.props.tabs && this.props.tabs.length > 0 && this.props.tabs.map((menu: any, i: number) => (
              <div key={i} className={`menu-item ${this.props.selectedMenu === menu.name ? 'selected' : ''}`} onClick={() => this.changeMenu(menu)}>{menu.title}</div>
            ))}
          </nav>
        </MyScroll>
      </section>  
    )
  }
}

export default LundanMenu;
