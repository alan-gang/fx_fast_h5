import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';

import './index.styl';

interface Props {
  store?: any;
  coinChoosed(value: string): void;
  value?: number;
}

interface Coin {
  name: string;
  value: string;
  class: string;
}

interface State {
  coins: Coin[];
  selectedIndex: number;
}

@inject('store')
@observer
class CoinSet extends PureComponent<Props, {}> {
  state = {
    selectedIndex: -1,
    coins: [
      {name: '10', value: '10', class: 'coin-gray'},
      {name: '20', value: '20', class: 'coin-gray'},
      {name: '50', value: '50', class: 'coin-gray'},
      {name: '100', value: '100', class: 'coin-gray'},
      {name: '500', value: '500', class: 'coin-gray'},
      {name: '全', value: 'all', class: 'coin-gray'}
    ]
  }
  onCoinHandler = (coin: Coin, index: number) => {
    this.setState({selectedIndex: index})
    this.props.coinChoosed(coin.value);
  }
  componentWillReceiveProps(nextProps: Props) {
    let index = this.state.coins.findIndex((c) => c.value === String(nextProps.value));
    if (parseInt(this.props.store.user.balance, 10) === nextProps.value) {
      index = this.state.coins.length - 1;
    }
    this.setState({selectedIndex:  index === undefined ? -1 : index});
  }
  render() {
    return (
      <section className="coin-set-view">
        <ul className="flex ai-c jc-sb">
          {this.state.coins.map((coin: Coin, i: number) => (<li key={i} className={`coin-item ${coin.class} ${this.state.selectedIndex === i ? 'selected' : ''}`} onClick={this.onCoinHandler.bind(this, coin, i)}>
            <span className="right"></span>
            <span>{coin.name}</span>
          </li>)) }
        </ul>
      </section>
    )
  }
}

export default CoinSet;
