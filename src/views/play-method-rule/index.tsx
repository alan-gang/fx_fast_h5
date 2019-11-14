import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class playMethodRule extends Component<Props, object> {
  render() {
    return (<article></article>);
  }
}

export default playMethodRule;
