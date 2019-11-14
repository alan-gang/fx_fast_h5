import React, { Component, MouseEvent, ChangeEvent, FocusEvent } from 'react';
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems';

import './index.styl';

interface DsEventTarget extends EventTarget {
  nodeName: string;
  type: string;
  value: string;
}

interface DsMouseEvent extends MouseEvent<HTMLElement> {
  target: DsEventTarget
}

interface Props {
  store?: any;
  gameType: string;
  curGameMethodItems: any[];
  defaultInitMethodItemAmount: number;
  updateMethdItem(i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined): void;
}

@inject('store')
@observer
class Play extends Component<Props, object> {
  methodItems: any = methodItems;
  onMethodItemHandler = (i: number, j: number, k: number, selected: boolean, methodTypeName: string, event: MouseEvent<HTMLElement>) => {
    let myevent: DsMouseEvent = event as DsMouseEvent;
    let { nodeName } = myevent.target;
    if (nodeName === 'INPUT' && myevent.target.value) return;
    let amount = selected ? '' : String(this.props.defaultInitMethodItemAmount);
    amount = ['rx_nzn', 'zux_q2', 'zux_q3', 'zx_q2', 'zx_q3'].includes(methodTypeName) ? '0' : amount;
    this.props.updateMethdItem(i, j, k, !selected, amount);
  }
  onMethodItemValueChanged = (i: number, j: number, k: number, event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    let { value } = event.target;
    let eType  = event.type;
    if (!/^\d*$/g.test(value)) {
      value = this.props.curGameMethodItems[i].rows[j].vs[k].amt;
    }
    if (eType === 'blur' && !/^\d+$/g.test(value)) {
      value = String(this.props.defaultInitMethodItemAmount);
    }
    this.props.updateMethdItem(i, j, k, undefined, value);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.forceUpdate();
  }
  render() {
    let curGameMethodItems = this.props.curGameMethodItems;
    return (
      <article className={`play-view ${this.props.gameType}`}>
        {curGameMethodItems.map((methodItem: any, i: number) => (
          <div className={`method ${methodItem.layout} ${methodItem.class || ''}`} key={i} >
            {methodItem.rows.map((row: any, j: number) => (
              <div key={j}>
                  <div className={`pos-lebel ${row.hidePos ? 'hide' : ''}`} >{row.n}</div>
                  {row.vs.map((vsItem: any, k: number) => (
                    <div key={k} className={`method-item ${row.class || ''} ${vsItem.class || ''} ${vsItem.s ? 'selected' : ''}`} onClick={(e: MouseEvent<HTMLElement>) => this.onMethodItemHandler(i, j, k, vsItem.s, methodItem.methodTypeName, e)}>
                      <span className={`method-item-name`} n={vsItem.n}>
                        {vsItem.class === 'icon' && vsItem.icons && vsItem.icons.map((iconNum: number, m: number) => (<span className={`icon-item icon-item-${iconNum}`} key={m}></span>))}
                        {vsItem.class !== 'icon' && vsItem.n}
                      </span>
                      {row.noodd !== true && <span className={`odd`}>{vsItem.odd || ''}</span>}
                      {row.noInput !== true && 
                        <span className={`bet-amount`}>
                          <input value={vsItem.amt} onChange={(e: ChangeEvent<HTMLInputElement>) => this.onMethodItemValueChanged(i, j, k, e)} onBlur={(e: FocusEvent<HTMLInputElement>) => this.onMethodItemValueChanged(i, j, k, e)} />
                        </span>}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </article>
    )
  }
}

export default Play;
