import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import AppHeader from './components/app-header';
import { GameMenu, Loading } from './components';
import RouterConfig  from './router/index';
import { Provider } from 'mobx-react';
import store from './store';
import APIs from './http/APIs';
import { getUrlParams } from './utils/common';
import { getAllGameIds } from './game/games';
import 'antd-mobile/dist/antd-mobile.less';
import './assets/style/common/common.styl';
import './App.css';
import Socket from './socket';
import 'lib-flexible';
import { Drawer, List} from 'antd-mobile';
import Panel from './views/panel';
import BookLeadingFloat from './views/book-leading/float';

@observer
class App extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
    this.init();
  }
  init() {
    let sessionData: any = sessionStorage.getItem('sessionData');
    let agentCode = getUrlParams('agentCode');
    let param = getUrlParams('param');
    let data = {
      agentCode,
      param
    };
    if (!agentCode && !param && sessionData) {
      data = JSON.parse(sessionData);
    }
    this.autoLogin(data);
    this.getLimitData(getAllGameIds());
  }
  componentWillMount() {
    // this.getCfgInfo();
  }
  autoLogin(params: object) {
    APIs.signIn(params).then((data: any) => {
      if (data.success > 0) {
        store.common.setBroadcaseWSUrl(data.broadcaseWSUrl);
        store.user.setName(data.userName);
        store.user.setUserId(data.userId);
        store.user.setLogin(true);
        this.getUserPrefence();
        this.updateBalance();
        store.game.updateAvailableGames();
        // this.initSocket();
      }
    });
  }
  initSocket() {
    let mysocket = new Socket({
      url: store.common.broadcaseWSUrl,
      name: 'appIndex',
      receive: (data: any) => {
      },
      open: () => {
        mysocket.send(JSON.stringify(Object.assign({action: 'noauth'}, {})));
      }
    }, true);
  }
  getCfgInfo() {
    // APIs.getCfgInfo({}).then(({broadcaseWSUrl}: any) => {
      // if (!Socket.sockets.user) {
      //   Socket.connect(broadcaseWSUrl, 'user', this.connected);
      // }
      // Socket.notify.messages.push(this.message);
    // });
  }
  updateBalance() {
    store.user.updateBalance();
  }
  getUserPrefence() {
    APIs.getUserPrefence().then((data: any) => {
      if (data.success === 1) {
        // this.setMenuList(data.menuList);
      }
    });
  }
  getLimitData(ids: number[]) {
    APIs.lottSets({lotteryIds: ids.join(','), v: 1}).then((data: any) => {
      if (data.success === 1) {
        let limitList: LimitListItem[] = [];
        Object.keys(data.data).forEach((key: string) => {
          limitList.push(Object.assign({id: parseInt(key, 10)}, data.data[key]));
          // store.game.setLimitList([Object.assign({id: parseInt(key, 10)}, data.data[key])]);
        });
        store.game.setLimitList(limitList);
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Panel></Panel>
          <Route path="/game/:id">
            { store.local.bookLeading ?  <BookLeadingFloat/> : '' }
          </Route>
          <article className="pg-c">
            <AppHeader />
            <Suspense fallback={<Loading />}>
              <GameMenu />
            </Suspense>
            <article className="page-view">
              <RouterConfig />
            </article>
          </article>
        </Router>
      </Provider>
    );
  }
}

export default App;
