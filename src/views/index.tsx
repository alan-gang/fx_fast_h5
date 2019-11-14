import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.styl';

@inject("store")
@observer
class Index extends Component<Props, object> {
  render() {
    return (
      <article className="index-view">
        
      </article>
    )
  }
}

export default Index;
