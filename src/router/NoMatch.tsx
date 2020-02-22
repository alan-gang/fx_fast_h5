import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";

interface IProps {
  store?: any;
}

type Props = IProps & RouteComponentProps;

class NoMatch extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
    this.props.history.push('/')
  }
  render() {
    return (
      <div>404</div>
    )
  }
}

export default NoMatch;
