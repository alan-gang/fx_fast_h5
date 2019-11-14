import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './index.styl';

@inject("store")
@observer
class AppHeader extends Component<Props, object> {
  render() {
    return (<article className="app-header-view">
      
    </article>);
  }
}

export default AppHeader;
