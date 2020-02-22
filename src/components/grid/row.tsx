import React, { PureComponent } from 'react';

import './row.styl';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  className?: string;
}

class Row extends PureComponent<Props, object> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (<div className={`ds-row ${this.props.className || ''}`} onClick={this.props.onClick}>{this.props.children}</div>)
  }
}

export default Row;
