import React from 'react'
import { List, Switch } from 'antd-mobile'
import store from '../../store';
import { inject, observer } from 'mobx-react'

@inject("store")
@observer
class BookLeadingSettings extends React.Component<Props, object> {
  state: any
  constructor (props: Props) {
    super(props)
    this.state = {
      checked: true
    }
  }
  render() {
    return (<List>
        <List.Item
          extra={<Switch
            checked={this.props.store.local.bookLeading}
            onChange={() => store.local.setLocal({bookLeading: !this.props.store.local.bookLeading})}
          />}
        >投注提醒</List.Item>

        <List.Item
          extra={<Switch
            checked={this.props.store.local.bookLeadingVoice}
            onChange={() => store.local.setLocal({bookLeadingVoice: !this.props.store.local.bookLeadingVoice})}
          />}
        >声音提醒</List.Item>

        <List.Item
          extra={<Switch
            disabled
            checked={this.props.store.local.bookLeadingShake}
            onChange={() => store.local.setLocal({bookLeadingShake: !this.props.store.local.bookLeadingShake})}
          />}
        >震动提醒</List.Item>

      </List>)
  }
}

export default BookLeadingSettings