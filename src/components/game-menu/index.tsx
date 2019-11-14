import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './index.styl';


@inject("store")
@observer
class GameMenu extends Component<Props, object> {
  render() {
    return (<article></article>);
  }
}

export default GameMenu;
