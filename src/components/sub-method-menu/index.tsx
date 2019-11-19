import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GameSubMethodMenu } from '../../typings/games';
import methodItems from '../../game/methodItems';

import './index.styl';

interface Props {
  store?: any;
  gameType: string;
  subMethods?: GameSubMethodMenu[];
  odds: any;
  curSubMenuIndex: number;
  updateSubMethods(method: GameSubMethodMenu): void;
  updateSubMethodMenuIndex(index: number): void;
}

@inject('store')
@observer
class SubMethodMenu extends Component<Props, object> {
  methodItems: any = methodItems;
  onSubMethodHandler = (subMethod: GameSubMethodMenu, index: number) => {
    console.log(JSON.stringify(subMethod));
    this.props.updateSubMethods(subMethod);
    this.props.updateSubMethodMenuIndex(index);
  }
  parseId(id: string = ''): string {
    return id.split(':')[0] || '';
  }
  getOddById(ids: string[], oddIndex: number) {
    let methodOdds = this.props.odds[this.parseId(ids[0])] 
    return (methodOdds && methodOdds[oddIndex] && methodOdds[oddIndex].maxprize) || '';
  }
  render() {
    let subMethods = this.props.subMethods;
    return (
      <section className={`sub-method-menu-view`}>
        <ul className={`flex fw-w sub-method-item-ls`}>
          {subMethods && subMethods.map((sm: GameSubMethodMenu, i: number) => (
            <li className={`sub-method-item ${sm.class} ${i === this.props.curSubMenuIndex ? 'selected' : ''}`} key={i} onClick={this.onSubMethodHandler.bind(this, sm, i)}>
              <div className="method-name">{sm.name}</div>
              <div className="odd">{this.getOddById(sm.ids, sm.oddIndex)}</div>
            </li>  
          ))}
        </ul>
      </section>
    )
  }
}

export default SubMethodMenu;
