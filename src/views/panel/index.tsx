import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import store from '../../store';
import './index.styl'
import GameMenu from './GameMenu' 

@inject("store")
@observer
class Panel extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props)
  }
  onOpenChange = (...args: any) => {
    store.common.togglePanel()
  }
  render() {
    return (<Drawer
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={ <GameMenu></GameMenu> }
        sidebarStyle={{backgroundColor: '#fff', width: '70vw'}}
        open={this.props.store.common.panel}
        onOpenChange={this.onOpenChange}
     >ok
     </Drawer>);
  }
}
export default Panel