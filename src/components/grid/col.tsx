import React, { PureComponent } from 'react';

import './col.styl';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  span?: number;
  gutter?: string;
}

class Col extends PureComponent<Props, object> {
  constructor (props: Props) {
    super(props);
  }
  getStyle () {
    let styl: any = {}
    if (this.props.gutter) {
      styl.padding = this.props.gutter;
    }
    return styl;
  }
  render () {
    return (<div className={`ds-col ${this.props.span ? 'col-' + this.props.span : ''} ${this.props.className}`} style={this.getStyle()} onClick={this.props.onClick}>{this.props.children}</div>)
  }
}

export default Col;
