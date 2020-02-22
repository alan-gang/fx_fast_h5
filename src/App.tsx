import React, { Component, Suspense } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import AppHeader from './components/app-header'
import RouterConfig from './router/index'
import { Provider } from 'mobx-react'
import store from './store'
import APIs from './http/APIs'
import { getUrlParams } from './utils/common'
import { getAllGameIds } from './game/games'
import 'antd-mobile/dist/antd-mobile.less'
import './assets/style/common/common.styl'
import './App.css'
import Socket from './socket'
import 'lib-flexible'
import { Drawer, List, Toast } from 'antd-mobile'
import Panel from './views/panel'
import BookLeadingFloat from './views/book-leading/float'

interface State {
  invokedLogin: boolean
}
@observer
class App extends Component<Props, object> {
  mysocket?: Socket
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      invokedLogin: false
    }
    this.init()
  }
  init() {
    let sessionData: any = sessionStorage.getItem('sessionData')
    let agentCode = getUrlParams('agentCode')
    let param = getUrlParams('param')
    let data = {
      agentCode,
      param
    }
    if (!agentCode || (!param && sessionData)) {
      data = JSON.parse(sessionData)
    }
    this.autoLogin(data)
  }
  componentWillMount() {
    // this.getCfgInfo();
  }
  autoLogin(params: object) {
    APIs.signIn(params).then((data: any) => {
      this.setState({ invokedLogin: true })
      this.getLimitData(getAllGameIds())
      if (data.success > 0) {
        store.common.setBroadcaseWSUrl(data.broadcaseWSUrl)
        store.user.setName(data.userName)
        store.user.setUserId(data.userId)
        store.user.setLogin(true)
        store.user.setPlayTypes(data.playTypes)
        this.getUserPrefence()
        this.updateBalance()
        store.game.updateAvailableGames()
        this.initSocket()
      } else {
        Toast.fail('请登录！')
        this.getCfgInfo()
      }
    })
  }
  initSocket() {
    this.mysocket = new Socket(
      {
        url: store.common.broadcaseWSUrl,
        name: 'appIndex',
        receive: (data: any) => {
          if (data.type === 'prizeNotice') {
            this.updateBalance()
          }
        },
        open: () => {
          if (this.mysocket) {
            let params: any = { action: 'noauth' }
            if (store.user.login) {
              params = {
                parameter: {
                  userId: store.user.userId,
                  app: 'web'
                },
                action: 'auth'
              }
            }
            this.mysocket.send(JSON.stringify(params))
          }
        }
      },
      true
    )
  }
  getCfgInfo() {
    APIs.getCfgInfo({}).then(({ broadcaseWSUrl }: any) => {
      store.common.setBroadcaseWSUrl(broadcaseWSUrl)
      this.initSocket()
    })
  }
  updateBalance() {
    store.user.updateBalance()
  }
  getUserPrefence() {
    APIs.getUserPrefence().then((data: any) => {
      if (data.success === 1) {
        // this.setMenuList(data.menuList);
      }
    })
  }
  getLimitData(ids: number[]) {
    APIs.lottSets({ lotteryIds: ids.join(','), v: 1 }).then((data: any) => {
      if (data.success === 1) {
        let limitList: LimitListItem[] = []
        Object.keys(data.data).forEach((key: string) => {
          limitList.push(
            Object.assign({ id: parseInt(key, 10) }, data.data[key])
          )
          // store.game.setLimitList([Object.assign({id: parseInt(key, 10)}, data.data[key])]);
        })
        store.game.setLimitList(limitList)
      }
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          {this.state.invokedLogin && (
            <>
            {/* 左面侧边栏内容 */}
              <Panel />
              {/* 右面侧边栏内容 */}
              <Route path="/game/:id">
                {store.local.bookLeading ? <BookLeadingFloat /> : ''}
              </Route>
              <article className="pg-c">
                {/* 头部文件 */}
                <AppHeader />
                {/* 内容部分匹配 */}
                <article className="page-view">
                  <RouterConfig />
                </article>
              </article>
            </>
          )}
        </Router>
      </Provider>
    )
  }
}

export default App
