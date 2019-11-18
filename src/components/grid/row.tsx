import React, { PureComponent } from 'react';

import './row.styl';

interface Props {
  className?: string;
}

class Row extends PureComponent<Props, object> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (<div className={`ds-row ${this.props.className || ''}`}>{this.props.children}</div>)
  }
}

export default Row;
