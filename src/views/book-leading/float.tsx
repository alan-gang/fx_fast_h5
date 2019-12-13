import React, { MouseEvent, TouchEvent } from 'react'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import './float.styl'
import BookLeadingHistory from  './history'
import Bus from 'src/utils/eventBus'
import { timeFormat } from '../../utils/date'


@inject('store')
@observer
class BookLeadingFloat extends React.Component<Props, object> {
  state: any
  constructor(props: any) {
    super(props)
    this.state = {
      expand: false,
      history: false,
      // row data receive from bookleading history
      rd: {
        lotteryName: '?',
        pos: '?',
        notifyVal: 0,
        contCount: 0,
        timming: 0
      }
    }
  }
  bookLeadingCurrentHandler = (rd: any) => {
    this.setState({rd})
  }
  componentDidMount() {
    Bus.on('BookLeadingCurrent', this.bookLeadingCurrentHandler);
  }
  closeFloatHandler = () => {
    this.setState({history: false})
  }
  componentWillUnmount() {
    Bus.off('BookLeadingCurrent', this.bookLeadingCurrentHandler);
  }
  maskHandler = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    this.setState({history: false});
  }
  maskTouchMoveHandler = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }
  render () {
    return (
      <div className={`${this.state.history ? 'history' : ''} flex ai-c fs-24 pdl-15 pdr-15 leading-book-float pos-a z_1002 por-0 pot-90 c-white ${this.state.expand ? 'expand' : ''}`}
        onClick={(e: any) => this.setState({
          expand: !this.state.expand
        })}
      >
        <Icon type={this.state.expand ? 'cross' : 'left'} className="clickable" size="md"  />
        <div className="leading-book-item">
          <div>
            <span className="mgr-20">{ this.state.rd.lotteryName }</span>
            <span className="mgr-20">{ this.state.rd.pos }{ this.state.rd.notifyVal }</span>
            <span className="mgr-20">
              { [null, '长龙', '单跳', '单边跳', '一厅两房', '拍拍连'][this.state.rd.notifyType] || '连出' }{ this.state.rd.contCount }期
            </span>
          </div>  
          <div className="mgt-15">
            <span className="c-deeporange mgr-20">{this.state.rd.timming > 0 ? timeFormat(this.state.rd.timming) : ''}</span>
            <span className="bgc-deeporange pdl-10 pdr-10 pdt-5 pdb-5 " onClick={ (e: any) => this.setState({history: !this.state.history}) }>快速投注</span>
          </div>  
        </div>
        <Link to="/BookLeadingHistory/1">
          <span className="leading-book-more clickable" >更多</span>
        </Link>
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mask bgc-0 o_60 fixed pol-0 pob-0 por-0 pot-0 z_0" onClick={(e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => this.maskHandler(e)} onTouchMove={(e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => this.maskTouchMoveHandler(e)}></div>
          <div className="history fixed pol-0 pob-0 hvh_70 wp_100 bgc-white">
            <BookLeadingHistory withAction={true} init={this.state.history} />
            <div className="close-bar" onClick={this.closeFloatHandler}>点击收起</div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookLeadingFloat