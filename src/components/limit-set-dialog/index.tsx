import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd-mobile';
import BaseModal from '../base-modal';

import './index.styl';

interface Props {
  isShowMask?: boolean;
  isShow: boolean;
  gameId: number;
  limitLevelList: LimitLevelItem[]
  onLimitChoiceCB(level: number): void;
  onCloseHandler?: () => void;
}

interface State {
  [prop: string]: string;
}

@inject("store")
@observer
class LimitSetDialog extends Component<Props, object> {
  state: State = {
    width: '4.3rem',
    height: '2.6rem'
  }
  onLimitChoiceHandler = (level: number) => {
    this.props.onLimitChoiceCB(level);
  }
  onCloseHandler = () => {
    if (this.props.onCloseHandler) {
      this.props.onCloseHandler();
    }
  }
  render() {
    return (
      <section className="limit-set-dialog">
        <BaseModal isShow={this.props.isShow} isShowMask={this.props.isShowMask} width={this.state.width} height={this.state.height} onCloseHandler={this.onCloseHandler}>
          <div className="bg-white limit-set-content">
            <section className={`game-logo logo-${this.props.gameId}`}></section>
            <p className="txt-c mgt-35">选择限红进入游戏</p>
            <section className="flex jc-c limit-list">
              {this.props.limitLevelList.map((item: LimitLevelItem, i: number) => (
                <Button key={i} className="crs-p btn-limit-amount" onClick={()=>this.onLimitChoiceHandler(item.level)}>{item.minAmt}-{item.maxAmt}</Button>
              ))}
            </section>
          </div>
        </BaseModal>
      </section>
    )
  }
}

export default LimitSetDialog;
