import React, { PureComponent, MouseEvent } from 'react';
import { inject, observer } from 'mobx-react';
import methodItems from '../../game/methodItems';
import { Row, Col } from '../grid';
import { LOTTERY_TYPES } from '../../utils/config';
import { GameSubMethodMenu } from '../../typings/games';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  curGameMethodItems: any[];
  defaultInitMethodItemAmount: number;
  updateMethodItem(i: number, j: number, k: number, selected?: boolean | undefined, value?: string | undefined): void;
  updateMethodRow(i: number, j: number, selected?: boolean | undefined): void;
  curSubMethod?: GameSubMethodMenu;
}

@inject('store')
@observer
class Play extends PureComponent<Props, object> {
  methodItems: any = methodItems;
  onMethodItemHandler = (i: number, j: number, k: number, selected: boolean, methodTypeName: string, event: MouseEvent<HTMLElement>) => {
    let amount = selected ? '' : String(this.props.defaultInitMethodItemAmount);
    amount = ['rx_nzn', 'zux_q2', 'zux_q3', 'zx_q2', 'zx_q3'].includes(methodTypeName) ? '0' : amount;
    this.props.updateMethodItem(i, j, k, !selected, amount);
  }
  onRowClickHandler = (i: number, j: number, selected?: boolean | undefined) => {
    if (this.props.gameType === LOTTERY_TYPES.HC6) {
      this.props.updateMethodRow(i, j, !selected);
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    this.forceUpdate();
  }
  render() {
    let curGameMethodItems = this.props.curGameMethodItems;
    return (
      <article className={`play-view ${this.props.gameType}`}>
        {curGameMethodItems.map((methodItem: any, i: number) => (
          <div className={`method ${methodItem.layout} ${methodItem.class || ''} clear`} key={i} >
            {methodItem.rows.map((row: any, j: number) => (
              <Row key={j} className={`clear ${row.s ? 'selected': ''}`} onClick={() => this.onRowClickHandler(i, j, row.s)}>
                <Col span={row.col} className={`flex pos-label ${row.hidePos ? 'hide' : ''}`} >
                  <div className="pos-name">{row.n}</div>
                  {row.subpn && <div className="sub-pn">{row.subpn}</div>}
                  {row.posOdd === true && <div className="row-odd">{row.odd}</div>}
                </Col>
                {row.vs.map((vsItem: any, k: number) => (
                  <Col span={vsItem.col}  key={k} className={`method-item-col ${row.class || ''}`}>
                    <div className={`method-item ${vsItem.class || ''} ${vsItem.s ? 'selected' : ''}`} onClick={(e: MouseEvent<HTMLElement>) => this.onMethodItemHandler(i, j, k, vsItem.s, methodItem.methodTypeName, e)}>
                      <span className={`method-item-name`} n={vsItem.n}>
                        {vsItem.class === 'icon' && vsItem.icons && vsItem.icons.map((iconNum: number, m: number) => (<span className={`icon-item icon-item-${iconNum}`} key={m}></span>))}
                        {vsItem.class !== 'icon' && vsItem.n}
                      </span>
                      {row.noodd !== true && methodItem.posOdd !==true && <span className={`odd`}>{vsItem.odd || ''}</span>}
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        ))}
      </article>
    )
  }
}

export default Play;
