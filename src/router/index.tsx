import React, { Suspense, lazy } from 'react';
import { Route, RouteProps, Switch } from "react-router-dom";
import Loading from '../components/router-loading/index';
import { inject } from 'mobx-react';

import NoMatch from './NoMatch';

interface ExtendRouteProps extends RouteProps {
  routes?: RouteProps[]
}

export const routes = [
    {
      title: '大厅',
      exact: true,
      path: '/',
      component: lazy(() => import('../views/lobby'))
    },
    {
      title: '游戏',
      path: '/game/:id',
      component: lazy(() => import('../views/game'))
    },
    {
      title: '投注记录',
      path: '/betRecords',
      component: lazy(() => import('../views/bet-records/test'))
    },
    {
      title: '开奖历史',
      path: '/openIssueHistory/:id',
      component: lazy(() => import('../views/open-issue-history'))
    },
    {
      title: '玩法说明',
      path: '/playMethodRule/:id',
      component: lazy(() => import('../views/play-method-rule'))
    },
    {
      title: '彩种说明',
      path: '/instruction/:id',
      component: lazy(() => import('../views/instruction'))
    },
    {
      title: '投注提醒',
      path: '/BookLeadingSettings/:id',
      component: lazy(() => import('src/views/book-leading/settings'))
    },
    {
      title: '投注提醒历史',
      path: '/BookLeadingHistory/:id',
      component: lazy(() => import('../views/book-leading/history'))
    },
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route: ExtendRouteProps) => (
  <Route 
    exact={route.exact}
    strict={route.strict}
    path={route.path}
    component={route.component}
    // render={
    //   props => (
    //     // pass the sub-routes down to keep nesting
    //     <route.component {...props} routes={route.routes} />
    //   )
    // }
  />
);

@inject("store")
class RouterConfig extends React.Component<Props, object> {
  componentWillMount() {
  }
  render() {
    return (
      <>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, i) => {
              return (              
                <RouteWithSubRoutes key={i} {...route} />
              )}
            )}
            <Route component={NoMatch}></Route>
          </Switch>
        </Suspense>
      </>
    )
  }
}

export default RouterConfig;
