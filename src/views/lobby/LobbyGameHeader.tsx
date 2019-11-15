import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Timer from '../../utils/timer';
import { timeFormat } from '../../utils/date';

import './lobbyGameHeader.styl'

interface Props {
  store?: any;
  gameType: string;
  gameId: number;
  curIssue?: string;
  remainTime: number;
  gameName: string;
  getNewestIssue(gameid: number): void;
}

interface State {
  timer: any;
  remainTime: number;
  hours: string;
  minutes: string;
  seconds: string;
}

@inject("store")
@observer
class LobbyGameHeader extends Component<Props, object> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      timer: null,
      remainTime: this.props.remainTime,
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  componentDidMount() {
    this.initTimer(this.props.remainTime);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.setState({remainTime: nextProps.remainTime});
    this.initTimer(nextProps.remainTime);
  }
  initTimer(remainTime: number) {
    if (remainTime <= 0) return;
    let timer = this.state.timer;
    let timeStr: string = '';
    let times: string[] = [];
    if (timer && timer.close) {
      timer.close();
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
  clearTimer(): void {
    if (this.state.timer && this.state.timer.close) {
      this.state.timer.close();
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  render() {
    return (
      <section className="flex ai-c lobby-game-header-view">
        <div className="flex jc-sb ai-c w100 ">
          <div className="txt-r cur-issue-wp">
            <span className="fw-b">{this.props.gameName}</span><span>{this.props.curIssue}期</span>
          </div>
          <div className={`time-wp ${parseInt(this.state.seconds, 10) <= 10 ? 'txt-c-r' : ''}`}>
            {/* <span className="hour time-item mg-r-3">{this.state.hours.split('')[0]}</span>
            <span className="hour time-item">{this.state.hours.split('')[1]}</span>
            <span className="colon">:</span> */}
            <span className="minute time-item mg-r-3">{this.state.minutes.split('')[0]}</span>
            <span className="minute time-item">{this.state.minutes.split('')[1]}</span>
            <span className="colon">:</span>
            <span className="second time-item mg-r-3">{this.state.seconds.split('')[0]}</span>
            <span className="second time-item">{this.state.seconds.split('')[1]}</span>
          </div>
        </div>
      </section>
    )
  }
}

export default LobbyGameHeader;
