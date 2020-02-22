import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Modal, Icon } from 'antd-mobile';

import './index.styl';

interface Props {
  store?: any;
  isShowMask?: boolean;
  isShow: boolean;
  gameId: number;
  limitLevelList: LimitLevelItem[];
  isShowLimitSetDialogClose: boolean; // 是否显示弹出框关闭按钮
  onLimitChoiceCB(level: number): void;
  onCloseHandler?: () => void;
}

interface State {
  limitLevelList: LimitLevelItem[];
  curLimitIndex: number;
  level: number;
}

@inject("store")
@observer
class LimitSetDialog extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      limitLevelList: [],
      curLimitIndex: 0,
      level: 1
    }
  }
  componentWillMount() {
    this.init(this.props);
  }
  init(props: Props) {
    let level = ((props.store.game.getGameLimitLevelByGameId(props.gameId) || {}).level) || 1;
    let limitItem = props.store.game.getLimitListItemById(props.gameId);
    let limitLevelList: LimitLevelItem[] = limitItem ? limitItem.kqPrizeLimit : [];
    let index = limitLevelList.findIndex((item) => item.level === level);
    this.setState({
      limitLevelList,
      curLimitIndex: index,
      level
    });
  }
  componentWillReceiveProps(nextProps: Props) {
    this.init(nextProps);
  }
  onLimitChoiceHandler = (level: number, index: number) => {
    this.setState({curLimitIndex: index, level});
  }
  onCloseHandler = () => {
    if (this.props.onCloseHandler) {
      this.props.onCloseHandler();
    }
  }
  onConfirmHandler = () => {
    this.props.onLimitChoiceCB(this.state.level);
  }
  render() {
    return (
      <section className="limit-set-dialog">
         <Modal
          className="limit-set-modal"
          visible={true}
          maskClosable={false}
          title=""
        >
          <header className="flex ai-c jc-c limit-set-header">限红设置{this.props.isShowLimitSetDialogClose && <Icon type="cross" onClick={this.onCloseHandler} />}</header>
          <div className="bg-white limit-set-content">
            <section className="flex jc-c limit-list">
              {this.state.limitLevelList.map((item: LimitLevelItem, i: number) => (
                <Button key={i} className={`flex jc-c ai-c btn-limit-amount ${this.state.curLimitIndex === i ? 'selected' : ''}`} onClick={()=>this.onLimitChoiceHandler(item.level, i)}>{item.minAmt}-{item.maxAmt}</Button>
              ))}
            </section>
            <div><Button className="flex jc-c ai-c btn-confirm" onClick={this.onConfirmHandler}>确定</Button></div>
            <div className="limit-explain-tip">
              <p>限红说明：</p>
              <p>当切换不同的限红模式时，再次投注同一彩种，需至少间隔1期再投注。</p>
            </div>
          </div>
        </Modal>
      </section>
    )
  }
}

export default LimitSetDialog;
