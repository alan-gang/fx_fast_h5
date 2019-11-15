import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getLuDanListByMethod, getTabsByType, getAllTabsByTypeAndName } from '../../utils/ludan';
import LudanMenu from './LudanMenu';
import LundanTable from './LundanTable';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  methodMenuName: string;
  maxColumns: number;
  maxRows: number;
  issueList: any[];
  defaultMenu?: string;
  defaultSubMenu?: string;
  isShowLudanMenu?: boolean;
}

interface State {
  menus: any[];
  tabs: any[];
  selectedMenu?: string;
  selectedSubMenu?: string;
  ludanList: any[];
}

@inject('store')
@observer
class Ludan extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    let tabs = getAllTabsByTypeAndName(this.props.gameType, this.props.methodMenuName);
    console.log('info tabs =', tabs);
    // ssc -> 整合 -> 万位 -> 大小
    let menus = getTabsByType(this.props.gameType, this.props.methodMenuName);
    let selectedMenu = this.props.defaultMenu || ((menus && menus.length > 0) ? menus[0].name : '');
    let menuItem = this.getMenuByMenuName(menus, selectedMenu);
    let selectedSubMenu = menuItem && menuItem.subM.length > 0 ? this.props.defaultSubMenu || menuItem.subM[0].name : '';
    let ludanList = getLuDanListByMethod(this.props.issueList.slice(0), this.props.gameType,  `${selectedMenu}${!!selectedSubMenu ? '_' : ''}${selectedSubMenu}`, this.props.maxRows, this.props.maxColumns) || []
    this.state = {
      menus,
      selectedMenu,
      selectedSubMenu,
      ludanList,
      tabs
    }
  }
  getMenuByMenuName(menus: any[], menuName: string): any {
    if (!menus) return;
    return menus.find((menu) => menuName === menu.name);
  }
  updateMenu = (menu: any) => {
    this.setState({
      selectedMenu: menu.name,
      selectedSubMenu: menu.subM.length > 0 ? this.state.selectedSubMenu || menu.subM[0].name : ''
    }, this.updateLudanList);
  }
  updateSubMenu = (menuName: string) => {
    this.setState({selectedSubMenu: menuName}, this.updateLudanList);
  }
  updateLudanList = () => {
    this.setState({
      ludanList: getLuDanListByMethod(this.props.issueList.slice(0), this.props.gameType,  `${this.state.selectedMenu}${!!this.state.selectedSubMenu ? '_' : ''}${this.state.selectedSubMenu}`, this.props.maxRows, this.props.maxColumns) || []
    });
  }
  componentWillReceiveProps(nextProps: Props) {
      let menus = getTabsByType(nextProps.gameType, nextProps.methodMenuName);
      let selectedMenu = nextProps.defaultMenu || ((menus && menus.length > 0) ? menus[0].name : '');
      let menuItem = this.getMenuByMenuName(menus, selectedMenu);
      let selectedSubMenu = menuItem && menuItem.subM.length > 0 ? this.props.defaultSubMenu || menuItem.subM[0].name : '';
      let ludanList = getLuDanListByMethod(nextProps.issueList.slice(0), nextProps.gameType,  `${selectedMenu}${!!selectedSubMenu ? '_' : ''}${selectedSubMenu}`, this.props.maxRows, this.props.maxColumns) || []
      this.setState({
        menus,
        selectedMenu,
        selectedSubMenu,
        ludanList
      });
  }
  render() {
    return (
      <section className="ludan-view">
        {this.props.isShowLudanMenu !== false && <LudanMenu menus={this.state.menus} selectedMenu={this.state.selectedMenu} selectedSubMenu={this.state.selectedSubMenu} tabs={this.state.tabs} updateMenu={this.updateMenu} updateSubMenu={this.updateSubMenu}  />}
        <LundanTable maxColumns={this.props.maxColumns} maxRows={this.props.maxRows} ludanList={this.state.ludanList} />
      </section>  
    )
  }
}

export default Ludan;
