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
  isShowLudanMenu?: boolean;
  isScroll?: boolean;
}

interface State {
  tabs: any[];
  selectedMenu?: string;
  ludanList: any[];
}

@inject('store')
@observer
class Ludan extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    let tabs = getAllTabsByTypeAndName(this.props.gameType, this.props.methodMenuName);
    // ssc -> 整合 -> 万位大小
    let selectedMenu = this.props.defaultMenu || (tabs.length > 0 ? tabs[0].name : '');
    let ludanList = getLuDanListByMethod(this.props.issueList.slice(0), this.props.gameType,  selectedMenu || '', this.props.maxRows, this.props.maxColumns - 1) || []
    this.state = {
      selectedMenu,
      ludanList,
      tabs
    }
  }
  updateMenu = (menu: any) => {
    this.setState({
      selectedMenu: menu.name,
    }, this.updateLudanList);
  }
  updateLudanList = () => {
    this.setState({
      ludanList: getLuDanListByMethod(this.props.issueList.slice(0), this.props.gameType, this.state.selectedMenu || '', this.props.maxRows, this.props.maxColumns) || []
    });
  }
  componentWillReceiveProps(nextProps: Props) {
      let tabs = getAllTabsByTypeAndName(this.props.gameType, this.props.methodMenuName);
      let selectedMenu = nextProps.defaultMenu || (tabs.length > 0 ? tabs[0].name : '');
      let ludanList = getLuDanListByMethod(nextProps.issueList.slice(0), nextProps.gameType,  this.state.selectedMenu || '', nextProps.maxRows, nextProps.maxColumns) || []
      this.setState({
        selectedMenu,
        ludanList,
        tabs
      });
  }
  render() {
    return (
      <section className="ludan-view">
        {this.props.isShowLudanMenu !== false && <LudanMenu selectedMenu={this.state.selectedMenu} tabs={this.state.tabs} updateMenu={this.updateMenu} />}
        <LundanTable maxColumns={this.props.maxColumns} maxRows={this.props.maxRows} ludanList={this.state.ludanList} isScroll={this.props.isScroll} />
      </section>  
    )
  }
}

export default Ludan;
