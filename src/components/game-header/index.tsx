import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Timer from '../../utils/timer';
import { timeFormat } from '../../utils/date';
import { LOTTERY_TYPES } from '../../utils/config';
import { getAnimalByNum } from '../../game/hc6';

import './index.styl';
interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  curIssue?: string;
  lastIssue?: string;
  curTime?: number;
  remainTime: number;
  openNumbers: string[];
  isExpandLudan: boolean;
  getNewestIssue(gameid: number): void;
  update(data: any): void;
}

interface State {
  timer: any;
  remainTime: number;
  hours: string;
  minutes: string;
  seconds: string;
  limitLevelList: LimitLevelItem[];
  curGameLimitLevel: number;
  tipText: string;
}

@inject("store")
@observer
class GameHeader extends Component<Props, object> {
  state: State;
  curIssue?: string;
  curTime?: number;
  constructor(props: Props) {
    super(props);
    let limitItem = props.store.game.getLimitListItemById(props.gameId);
    let curGameLimitLevel = props.store.game.getGameLimitLevelByGameId(props.gameId);
    this.curIssue = props.curIssue;
    this.curTime = props.curTime;
    this.state = {
      timer: null,
      remainTime: this.props.remainTime,
      hours: '00',
      minutes: '00',
      seconds: '00',
      limitLevelList: (limitItem && limitItem.kqPrizeLimit) || [],
      curGameLimitLevel: (curGameLimitLevel && curGameLimitLevel.level) || 1,
      tipText: '第一次进入需选择限红；再次进入不需要选择限红；除非该游戏限红与之前游戏限红不同。当切换不同的限红模式时，再次投注同一彩种，需至少间隔1期再投注。'
    }
  }
  componentDidMount() {
    this.initTimer(this.props.remainTime);
  }
  componentWillReceiveProps(nextProps: Props) {
    let limitItem = nextProps.store.game.getLimitListItemById(nextProps.gameId);
    let curGameLimitLevel = nextProps.store.game.getGameLimitLevelByGameId(nextProps.gameId);
    let stateData: any = {
      limitLevelList: (limitItem && limitItem.kqPrizeLimit) || [],
      curGameLimitLevel: (curGameLimitLevel && curGameLimitLevel.level) || 1
    }
    if (this.curIssue !== nextProps.curIssue || this.curTime !== nextProps.curTime) {
      this.curIssue = nextProps.curIssue;
      this.curTime = nextProps.curTime;
      stateData.remainTime = nextProps.remainTime;
      this.initTimer(nextProps.remainTime);
    }
    this.setState(stateData);
  }
  initTimer(remainTime: number) {
    if (remainTime <= 0) return;
    let timer = this.state.timer;
    let timeStr: string = '';
    let times: string[] = [];
    if (timer && timer.close) {
      timer.close();
      timer = null;
    }
    timer = new Timer(Math.floor(remainTime), (t: number): void => {
      if (t <= 0) {
        this.props.getNewestIssue(this.props.gameId);
      }
      timeStr = timeFormat(t * 1000);
      times = timeStr.split(':');
      this.setState({hours: times[0], minutes: times[1], seconds: times[2]});
    });
    this.setState({timer});
  }
  onLimitLevelChanged = (value: any) => {
    this.props.store.game.updateGamesLimitLevel({gameId: this.props.gameId, level: parseInt(value, 10)});
    this.setState({
      curGameLimitLevel: parseInt(value, 10)
    });
  }
  onLudanHandler = () => {
    this.props.update({type: 'ludan', data: !this.props.isExpandLudan})
  }
  clearTimer(): void {
    if (this.state.timer && this.state.timer.close) {
      this.state.timer.close();
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  isHc6() {
    return this.props.gameType === LOTTERY_TYPES.HC6;
  }
  getNum = (n: any) => {
    if (LOTTERY_TYPES.K3 === this.props.gameType) {
      return '';
    } else {
      return n;
    }
  }
  renderOpenNumbers(num: string, i: number) {
    if (this.isHc6()) {
      if (i === 5) {
        return (<div key={i} className={`icon-plus`}>+</div>)
      }
      return (<div className={`flex fdr-c ai-c jc-c bg-${i >= 3 ? (i % 3 + 1) : i + 1}`}><div key={i} className={`open-num-item n-${String(num).padStart(2, '0')}`}>{String(num).padStart(2, '0')}</div><div className="animal">{getAnimalByNum(parseInt(num, 10))}</div></div>)
    } else {
      return <div key={i} className={`open-num-item n-${num}`}>{this.getNum(num)}</div> 
    }
  }
  render() {
    return (
      <section className={`game-header-view mgt-10 ${this.props.gameType}`}>
        <section className="flex ai-c last-issue-sec">
          <div className="c-textc">第{this.props.lastIssue}期：</div>
          <div className="nums-wp">
            {this.props.openNumbers.map((num: string, i: number) => (
              <React.Fragment  key={i}>{this.renderOpenNumbers(num, i)}</React.Fragment>
            ))}
          </div>
        </section>
        <section className="flex ai-c jc-sb cur-issue-sec">
          <div className="flex ai-c">
            <div className="txt-r mgr-18 c-textc cur-issue-wp">距{this.props.curIssue}期截止 :</div>
            <div className="time-wp flex ai-c jc-c">
              <span className="hour-wp">{this.state.hours}</span>
              <span className="colon">:</span>
              <span className="minute-wp">{this.state.minutes}</span>
              <span className="colon">:</span>
              <span className="second-wp">{this.state.seconds}</span>
            </div>
          </div>
          <div className="flex ai-c c-textc-2" onClick={this.onLudanHandler}>路单走势<span className={`icon-triangle c-yellow mgl-6 ${this.props.isExpandLudan ? 'up' : 'down'}`}></span></div>
        </section>
      </section>
    );
  }
}

export default GameHeader;
