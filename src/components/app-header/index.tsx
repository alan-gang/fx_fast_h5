import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Flex, Popover, Toast, Icon } from 'antd-mobile';
import store from '../../store'
import './index.styl';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { getGameById } from 'src/game/games'
import Bus from 'src/utils/eventBus'
import { getUrlParams } from '../../utils/common'

interface Props extends RouteComponentProps {
  store?: any
}

let popoverInner: any[] = [
  // {id: 1, name: '官方玩法', out: true, url: '/?from=KQ'},
  {id: 2, name: '快钱玩法', out: true, url: '/?from=KQ'},
  // {id: 3, name: '基诺玩法', out: true, url: '/keno/?from=KQ'},
  {id: 4, name: '彩种大厅', link: '/'},
  {name: '投注记录', link: '/betRecords', gameId: true},
  {name: '历史开奖', link: '/openIssueHistory', gameId: true},
  {name: '玩法说明', link: '/playMethodRule', gameId: true},
  {name: '彩种说明', link: '/instruction', gameId: true},
  {name: '投注提醒', link: '/BookLeadingSettings', gameId: true},
]

@inject("store")
@observer
class AppHeader extends Component<Props, object> {
  state: any
  constructor(props: Props) {
    super(props)
    this.state = {
      gameId: '',
      gameName: '',
      popoverVisible: false,
    }
    Bus.on('gameIdChanged', this.activeGame);
  }
  activeGame = (id: any) => {
    this.setState({gameName: (getGameById(id) || {}).name, gameId: id})
  }

  popoverInnerClick = (node: any, index: number = 0): void => {
    const menu = this.getNavs()[index]
    if (menu.out) {
      if (menu.id !== 2) {
        let params = this.getParams();
        let paramsUrl = this.objToUrl(params);
        let from: string = getUrlParams('from');
        let decodeUrl = '';
        if (from) {
          decodeUrl = decodeURIComponent(from);
        }
        let url = `/keno/?from=${from}#/?${paramsUrl}`
        if (menu.id === 1) url = decodeUrl || `/?from=${from}#/?out=1&${paramsUrl}`;
        window.location.href = url;
      }
    } else if (menu.link) {
      this.props.history.push(menu.link + (menu.gameId ? `/${this.state.gameId}` : ''));
    } else {
      Toast.info(menu.name);
    }
    this.setState({popoverVisible: false});
  }
  togglePanel () {
    store.common.togglePanel()
  }
  setHandler = () => {
    Bus.emit('onSetLimit')
  }
  getParams() {
    const sessionData: any = sessionStorage.getItem('sessionData');
    let hash = window.location.hash;
    hash = hash.substring(hash.indexOf('?'));
    const agentCode = getUrlParams('agentCode',  hash);
    const param = getUrlParams('param',  hash);
    const gameid = getUrlParams('gameid');
    let data: any = {
      agentCode,
      param
    };
    if (!agentCode || !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    if (gameid) {
      data.gameid = gameid;
    }
    return data;
  }
  objToUrl(params: any) {
    let ps = [];
    for (let p in params) {
      ps.push(`${p}=${params[p]}`);
    }
    return ps.join('&');
  }
  getNavs() {
    let { playTypes } = this.props.store.user
    let navs = [ ...popoverInner ]
    if (playTypes.includes(1)) {
      navs.unshift({id: 1, name: '官方玩法', out: true, url: '/?from=KQ'})
    }
    if (playTypes.includes(3)) {
      if (playTypes.includes(1)) {
        navs.splice(2, 0, {id: 3, name: '基诺玩法', out: true, url: '/keno/?from=KQ'})
      } else {
        navs.splice(1, 0, {id: 3, name: '基诺玩法', out: true, url: '/keno/?from=KQ'})
      }
    }
    return navs
  }
  getHeaderInner () {
    let navs = this.getNavs()
    return (<React.Fragment>{[
      // 大厅
      <Route key="1" path="/" exact>
        <Flex.Item className="txt-c clickable" onClick={ store.user.updateBalance }>
          <div className="mgb-1">游戏大厅</div>
          <div className="fs-24">余额: ￥{ this.props.store.user.balance || '0.00' }<span className="mgl-10 refresh inlb va-b pos-r pot-2"></span></div>
        </Flex.Item>
      </Route>,
      // 游戏中
      <Route key="2" path="/game/:id">
        <React.Fragment>{[
          <Flex.Item key="0">
            <span className="pdl-22 pdr-22 clickable" onClick={ this.togglePanel }>彩种选择
              <span className="icon-triangle up rz_90 mgl-20 pos-r pot-5"></span>
            </span>
          </Flex.Item>,
          <Flex.Item className="txt-c clickable" key="1" onClick={ store.user.updateBalance }>
            <div className="mgb-5">{ this.state.gameName }</div>
            <div className="fs-24 c-textc">余额: ￥{ this.props.store.user.balance || '0.00' }<span className="mgl-10 refresh inlb va-b pos-r  pot-4"></span></div>
          </Flex.Item>,
          <Flex.Item className="txt-r pdr-22 flex ai-c jc-e" key="2">
            <span className="inlb clickable mgl-20 setting" onClick={this.setHandler}></span>
            <Popover
              visible={this.state.popoverVisible}
              onSelect={ this.popoverInnerClick }
              overlay={navs.map((x, i) => <Popover.Item key={i} >{x.name}</Popover.Item>)}
            >
              <span className="inlb clickable mgl-20 more"></span>
            </Popover>
          </Flex.Item>,
        ]}</React.Fragment>
      </Route>,
      <Route key="3" path="/betRecords">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">投注记录</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      <Route key="4" path="/openIssueHistory">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">历史开奖</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      <Route key="5" path="/playMethodRule">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">开奖说明</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      <Route key="6" path="/instruction">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">彩种说明</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      <Route key="7" path="/BookLeadingSettings">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">投注提醒</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      <Route key="8" path="/BookLeadingHistory">
        <Flex.Item onClick={ this.props.history.goBack }>
          <Icon type="left" size="lg" />
        </Flex.Item>
        <Flex.Item className="txt-c fs-32">投注提醒历史</Flex.Item>
        <Flex.Item></Flex.Item>
      </Route>,
      
    ]}</React.Fragment>)
  }
  render() {
    return (<header className="app-header-view pos-r">
      <Flex className="hp_100 fs-30 flex-auto w100 c-white">
        { this.getHeaderInner() }
      </Flex>
    </header>);
  }
}

export default withRouter(AppHeader)
