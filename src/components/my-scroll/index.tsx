import React, { PureComponent } from 'react';
import BScroll, { BsOption } from 'better-scroll';

import './index.styl';

class MyScroll extends PureComponent<Props, object> {
  bscroll?: BScroll;
  myScrollRef: React.RefObject<HTMLDivElement>;
  options: Partial<BsOption> = {
    scrollX: true,
    scrollY: false,
    click: true
  }
  constructor(props: Props, options?: Partial<BsOption>) {
    super(props);
    Object.assign(this.options, options);
    this.myScrollRef = React.createRef<HTMLDivElement>();
  }
  componentDidMount() {
    this.initChildWidth();
    this.bscroll = new BScroll(this.myScrollRef.current || '.my-scroll-wrapper', this.options);
  }
  initChildWidth() {
    if (this.myScrollRef.current 
      && this.myScrollRef.current.children 
      && this.myScrollRef.current.children[0].children 
      && this.myScrollRef.current.children[0].children.length > 0) {
        let children: HTMLCollection = this.myScrollRef.current.children[0].children;
        let width = 0;
        for (let child of children) {
          width += child.clientWidth;
        }
      if (children.length > 3) {
        this.myScrollRef.current.children[0].classList.remove('child-normal')
        this.myScrollRef.current.children[0].setAttribute('style', `width: ${width + 10}px`);
      }else {
        this.myScrollRef.current.children[0].classList.add('child-normal')
      }
    }
  }
  refresh() {
    this.initChildWidth();
    this.bscroll && this.bscroll.refresh();
  }
  componentWillUnmount() {
    if (this.bscroll) this.bscroll.destroy();
  }
  render() {
    return (
      <section className={`my-scroll-wrapper`} ref={this.myScrollRef}>{this.props.children}</section>
    )
  }
}

export default MyScroll;
