import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';

import './index.styl';

interface Props {

}

class MyScroll extends PureComponent<Props, object> {
  scroll?: BScroll;
  myScrollRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.myScrollRef = React.createRef<HTMLDivElement>();
  }
  componentDidMount() {
    console.log('this.myScrollRef.current=', this.myScrollRef.current)
    this.scroll = new BScroll(this.myScrollRef.current || '.my-scroll-wrapper', {
      scrollX: true,
      scrollY: false,
      click: true
    });
  }
  refresh() {
  }
  render() {
    return (
      <section className={`my-scroll-wrapper`} ref={this.myScrollRef}>{this.props.children}</section>
    )
  }
}

export default MyScroll;
