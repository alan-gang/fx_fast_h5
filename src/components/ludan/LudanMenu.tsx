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
  methodMenuName?: string;
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
    this.scrollToSelectedElement();
  }
  componentWillReceiveProps(nextProps: Props) {
    this.myScrollRef.current.refresh();
    this.scrollToSelectedElement();
  }
  scrollToSelectedElement = () => {
    let selectedItem = document.querySelector('.ludan-menu-view .menu-item.selected');
    if (this.myScrollRef.current.bscroll && selectedItem && this.myScrollRef.current.bscroll) {
      this.myScrollRef.current.bscroll.x += 1;
      this.myScrollRef.current.bscroll.scrollToElement(selectedItem, 150, true);
    }
  }
  changeMenu = (menu: any) => {
    this.props.updateMenu(menu);
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
