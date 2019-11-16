import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Bus from '../../utils/eventBus';
import MyScroll from '../my-scroll';
import './ludanMenu.styl';

interface Props {
  store?: any;
  tabs: any[];
  selectedMenu?: string;
  selectedSubMenu?: string;
  updateMenu(menuName: any): void;
}

@inject('store')
@observer
class LundanMenu extends Component<Props, object> {
  myScrollRef: any;
  constructor(props: Props) {
    super(props);
    this.myScrollRef = React.createRef();
  }
  componentDidMount() {
    Bus.emit('ludanSelectMenuChange', this.props.selectedMenu);
    let selectedItem = document.querySelector('.ludan-menu-view .menu-item.selected');
    selectedItem && this.myScrollRef.current.bscroll.scrollToElement('.menu-item.selected');
  }
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.selectedMenu !== nextProps.selectedMenu) {
      Bus.emit('ludanSelectMenuChange', nextProps.selectedMenu)
    }
    this.myScrollRef.current.refresh();
    let selectedItem = document.querySelector('.ludan-menu-view .menu-item.selected');
    this.myScrollRef.current.bscroll && selectedItem && this.myScrollRef.current.bscroll.scrollToElement(selectedItem, 150, true);
  }
  changeMenu = (menu: any) => {
    this.props.updateMenu(menu);
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
