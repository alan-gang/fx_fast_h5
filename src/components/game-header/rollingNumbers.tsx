import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getAnimalOfNumber } from '../../utils/num';
import { GameCommonDataContext } from '../../context/gameContext';

import './rollingNumbers.styl';

interface Props {
  store?: any;
  gameType?: string;
  numbers: string[];
}

interface State {
  numbers: string[];
}

@inject("store")
@observer
class RollingNumbers extends Component<Props, object> {
  static contextType = GameCommonDataContext;
  context!: React.ContextType<typeof GameCommonDataContext>;
  type: number = 1;
  state: State;
  recover: boolean = false;
  constructor(props: Props) {
    super(props);
    this.state = {
      numbers: props.numbers || []
    }
  }
  displayNumbers() {
    return this.props.numbers.map(n => {
      if (typeof n === 'object' && n[0] !== undefined) {
        // return n.map(nn => {
        //   return getAnimalOfNumber(nn)[this.type - 2] || nn
        // })
      } else {
        return getAnimalOfNumber(n)[this.type - 2] || n
      }
    })
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.numbers.join('') !== this.state.numbers.join('')) {
      let numbers = nextProps.numbers.slice(0);
      numbers = numbers.fill('0', 0, numbers.length);
      this.recover = true;
      this.setState({numbers}, () => {
        setTimeout(() => {
          this.recover = false;
          this.setState({numbers: nextProps.numbers.slice(0)})
        }, 100)
      })
    }
  }
  render() {
    return (
      <div className={`rolling-numbers pos-r ${this.props.gameType}`}>
        {this.props.gameType !== 'k3' && this.state.numbers.length > 0 && this.state.numbers.map((n, i) => (
          <div className="number-box" key={i} >
            <div className="number">
              <div className="the-number-box" style={{transform: 'translateY(' + (-n / (this.state.numbers.length > 10 ? 0.81 : 0.5))  + '%)' , transition: 'transform ' + (this.recover ? 0 : (1 + (1 * i)))  + 's ease'}}>
                {Array.from(Array(this.state.numbers.length > 10 ? 81 : 50)).map((nn: number, j: number) => (
                  <div className="the-number" key={j}>{ j === parseInt(n, 10) ? this.displayNumbers()[i] : j }</div>
                ))}
              </div>
            </div>
            <div className={`decorations  n_${n}`}></div>
          </div>
        ))}
        {this.props.gameType === 'pcdd' && 
          <div className="number-gaps">
          <div className="number-gap">+</div>
          <div className="number-gap">+</div>
          <div className="number-gap">=</div>
          <div className="number.number-gap">
            <div className="the-number-box">
              <div className="the-number">{ parseInt(this.props.numbers[0], 10) + parseInt(this.props.numbers[1], 10) + parseInt(this.props.numbers[2]) }</div>
            </div>
          </div>
        </div>
        }
        {this.props.gameType === 'k3' && this.props.numbers.slice(0, 3).map((num, n) => (
          <div className={`dice-box inlb`} key={n}>
            {Array.from(Array(6)).map((nn: any, i: number) => (
              <div className={`dice dead icon-item-${i+1}`} key={i} style={ {transform: 'translateY(' + (-100 * (parseInt(num, 10) - 1))  + '%)' , transition: 'transform ' + (1 + (1 * n)) + 's ease' } }></div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default RollingNumbers;
