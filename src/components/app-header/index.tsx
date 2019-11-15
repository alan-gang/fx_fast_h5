import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Flex, WhiteSpace } from 'antd-mobile';

import './index.styl';

@inject("store")
@observer
class AppHeader extends Component<Props, object> {
  state: any;
  constructor(props: Props) {
    super(props)
    this.state = {
      route: 1,
      data: {
        gameName: ''
      }
    }
  }
  getHeaderInner () {
    switch (this.state.route) {
      // 大厅
      case 0:
        return <Flex.Item className="txt-c">
          <div className="mgb-1">游戏大厅</div>
          <div className="fs-24">余额: ￥100000.00</div>
        </Flex.Item>
        break
      // 游戏中
      case 1:
        return <React.Fragment>{[
          <Flex.Item>
            <span class="pdl-22 pdr-22">彩种选择</span>
          </Flex.Item>,
          <Flex.Item className="txt-c">
            <div className="mgb-1">游戏大厅</div>
            <div className="fs-24">余额: ￥100000.00</div>
          </Flex.Item>,
          <Flex.Item className="txt-r">彩种选择</Flex.Item>,
        ]}</React.Fragment>
        break
    }
  }
  render() {
    return (<header className="app-header-view">
      <Flex className="hp_100 fs-30 flex-auto c-white">
        { this.getHeaderInner() }
      </Flex>
    </header>);
  }
}

export default AppHeader;
