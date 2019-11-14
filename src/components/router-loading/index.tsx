import React, { Component } from 'react';

interface Props {
  isLoading?: boolean
  error?: any
}

class Loading extends Component<Props, object> {
  render() {
    return (
      <>
        {this.props.isLoading && <div>Loading...</div>}
        {this.props.error && <div>Sorry, there was a problem loading the page.</div>}
      </>
    )
  }
}
export default Loading;
