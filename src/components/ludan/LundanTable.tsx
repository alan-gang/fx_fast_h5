import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getCellStyle, getCellData } from '../../utils/ludan';
import MyScroll from '../my-scroll';

import './ludanTable.styl';

interface Props {
  store?: any;
  maxColumns: number;
  maxRows: number;
  ludanList: any[];
  isScroll?: boolean;
}

@inject('store')
@observer
class LundanTable extends Component<Props, object> {
  filter(value: any) {
    return ['icon-cur', 'icon-qs'].indexOf(value) !== -1 ? '' : value;
  }
  renderLudanTable() {
    return (
      <div className="tb-wp flex">
        {this.props.maxColumns && Array.from(Array(this.props.maxColumns)).map((n, i) => (
          <div className="col" key={i}>
            {this.props.maxRows && Array.from(Array(this.props.maxRows)).map((n, j) => (
              <React.Fragment key={j}>
                {j === this.props.maxRows - 1 && <div className="tb-cell flex ai-c jc-c"><span className={`ld-item code-bg txt-c ${getCellStyle(this.props.ludanList, i, j, this.props.maxRows)}`} >{this.filter(getCellData(this.props.ludanList, i, j, this.props.maxRows)) }</span></div>}
                {j !== this.props.maxRows - 1 && <div className="tb-cell flex ai-c jc-c"><span className={`ld-item code-bg txt-c ${getCellStyle(this.props.ludanList, i, j, this.props.maxRows)}`} >{this.filter(getCellData(this.props.ludanList, i, j, this.props.maxRows))}</span></div>}
              </React.Fragment>
            ))} 
          </div>
        ))}
      </div>
    )
  }
  renderLudan() {
    if (this.props.isScroll === false) {
      return this.renderLudanTable();
    } else {
      return <MyScroll>{this.renderLudanTable()}</MyScroll>;
    }
  }
  render() {
    return (
      <section className="ludan-table-view">
        {this.renderLudan()}
      </section>  
    )
  }
}

export default LundanTable;
