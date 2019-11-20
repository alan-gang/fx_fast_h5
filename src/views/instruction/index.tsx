import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { getGameTypeNameByGameId } from 'src/game/games'

interface MatchParams {
  id: any
}
interface Props extends RouteComponentProps<MatchParams> {
  store?: any
}

@inject("store")
@observer
class instruction extends Component<Props, object> {
  dom: any
  state: any
  constructor (props: Props) {
    super(props)
    this.dom = React.createRef()
    this.state = {
      gameTypeName: getGameTypeNameByGameId(this.props.match.params.id * 1),
      domstyle: {
        height: document.documentElement.clientHeight
      }
    }
  }
  componentDidMount () {
    this.setState({
      domstyle: {
        height: this.state.domstyle.height - this.dom.current.offsetTop
      }
    })
    const n: any = this.contains('.c-deeporange', this.state.gameTypeName)[0]
    n && n.scrollIntoView()
  }
  contains (selector: any, text: any) {
    return Array.prototype.filter.call(this.dom.current.querySelectorAll(selector), function(element){
      return RegExp(text).test(element.textContent)
    })
  }
  render() {

    return (<article className="fs-28 pdl-30 pdr-30 c-3 o_a" ref={ this.dom } style={this.state.domstyle}>

      <div className="fs-36 mgt-50 c-deeporange">时时彩</div>
      <div className="fw-b mgb-20 mgt-40">总大、总小</div>
      <div className="lh-48">开奖结果所有号码的和值大于22（23-45）时为大，小于23（0-22）为小；当投注和数大小与开奖结果的和数大小相符时，即为中奖。举例：投注者购买“总大”，档期开奖结果为20975（2+0+9+7+6=24为大）则视为中奖。</div>
      

      <div className="fw-b mgb-20 mgt-40">总单、总双</div>
      <div className="lh-48">开奖结果和值的个位数为1、3、5、7、9时为总单，若为0、2、4、6、8时则为总双；当投注总单双与开奖号码的和值总单双相符时，即为中奖。举例：投注者购买总双，当期开奖结果为20976（2+0+9+7+6=24为双）则视为中奖。</div>
      

      <div className="fw-b mgb-20 mgt-40">龙虎和（万个）</div>
      <div className="lh-48">比较开奖号码中万位与个位的大小。大则为龙，小则为虎，两个号码相同则为和。</div>

      <div className="fw-b mgb-20 mgt-40">大小</div>
      <div className="lh-48">开奖号码中万位、千位、百位、十位、个位的号码为5、6、7、8、9时为大；为0、1、2、3、4时为小；当投注的位置大小与开奖号码中对应位置的大小相符时即为中奖。举例：投注者投注百位小，当期开奖结果为20352（3为小），则视为中奖。</div>

      <div className="fw-b mgb-20 mgt-40">单双</div>
      <div className="lh-48">开奖号码中万位、千位、百位、十位、个位的号码为1、3、5、7、9时为单；为0、2、4、6、8时为双；当投注的位置单双与开奖号码中对应位置的单双相符时即为中奖。举例：投注者投注百位单，当期开奖结果为20352（3为单），则视为中奖。</div>

      <div className="fw-b mgb-20 mgt-40">定位</div>
      <div className="lh-48">以万位为例，取万位为基准，自0</div>

      <div className="fw-b mgb-20 mgt-40">全五一字</div>
      <div className="lh-48">9任选1个号码进行投注，当投注号码与开奖号码中（万位、千位、百位、十位、个位）任一位相同时即为中奖。同个号码在开奖号码中出现多次时只记为1次中奖。</div>

      <div className="fw-b mgb-20 mgt-40">前三一字</div>
      <div className="lh-48">9任选1个号码进行投注，当投注号码与开奖号码前三位（万位、千位、百位）任一位相同时即为中奖。同个号码在开奖号码中出现多次时只记为1次中奖。</div>

      <div className="fw-b mgb-20 mgt-40">中三一字</div>
      <div className="lh-48">9任选1个号码进行投注，当投注号码与开奖号码中间三位（千位、百位、十位）任一位相同时即为中奖。同个号码在开奖号码中出现多次时只记为1次中奖。</div>

      <div className="fw-b mgb-20 mgt-40">后三一字</div>
      <div className="lh-48">从0-9任选1个号码进行投注，当投注号码与开奖号码后三位（百位、十位、个位）任一位相同时即为中奖。同个号码在开奖号码中出现多次时只记为1次中奖。</div>

      <div className="fw-b mgb-20 mgt-40">前三、中三、后三（豹子、顺子、对子、半顺、杂六）</div>
      <div className="lh-48">豹子</div>
      <div className="lh-48">顺子：中奖号码的3位数字都相连，不分顺序。</div>
      <div className="lh-48">对子：中奖号码3位数字中任意2个数字相同。</div>
      <div className="lh-48">半顺：半顺：中奖号码3位数字中任意2个数字相连，不分顺序。</div>
      <div className="lh-48">杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖号码为146、379等，中奖号码位数之间无关联性，则投注杂六者为中奖，其它为不中奖。</div>

      <div className="fs-36 mgt-50 c-deeporange">11选5</div>

      <div className="fw-b mgb-20 mgt-40">总和</div>
      <div className="lh-48">以全部开出的5个号码，加起来的总和来判定。</div>
      

      <div className="fw-b mgb-20 mgt-40">总和大小</div>
      <div className="lh-48">所有开奖号码数字加总值大于30为和大；总和值小于30为和小；若总和值等于30为和 (不计算输赢)。</div>

      <div className="fw-b mgb-20 mgt-40">总和单双</div>
      <div className="lh-48">所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</div>

      <div className="fw-b mgb-20 mgt-40">总和尾数大小</div>
      <div className="lh-48">所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</div>

      <div className="fw-b mgb-20 mgt-40">龙虎</div>
      <div className="lh-48">以一位VS二位为例：</div>
      <div className="lh-48">龙：第一位开奖号码大于第二位开奖号码，如第一位开出10，第二位开出07。</div>
      <div className="lh-48">虎：第一位开奖号码小于第二位开奖号码，如第一位开出03，第二位开出07。</div>

      <div className="fw-b mgb-20 mgt-40">定位</div>
      <div className="lh-48">指第一位、第二位、第三位、第四位、第五位出现的顺序与号码为派彩依据。</div>

      <div className="fw-b mgb-20 mgt-40">定位第一位-第五位</div>
      <div className="lh-48">指下注的每一位与开出之号码其开奖顺序及开奖号码相同，视为中奖，如第一位开出号码05，下注第一位为05者为中奖，其余情形为不中奖。</div>

      <div className="fw-b mgb-20 mgt-40">大小</div>
      <div className="lh-48">开出的号码大于或等于06为大，小于或等于05为小，开出11为和 (不计算输赢)。</div>

      <div className="fw-b mgb-20 mgt-40">单</div>
      <div className="lh-48">号码为双数叫双，如02、08；号码为单数叫单，如05、09；开出11为和 (不计算输赢)。</div>

      <div className="fw-b mgb-20 mgt-40">任选</div>
      <div className="lh-48">一中一:投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</div>
      <div className="lh-48">二中二:投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">三中三:投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">四中四:投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">五中五:投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">六中六:投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">七中七:投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</div>
      <div className="lh-48">八中八:投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</div>

      <div className="fw-b mgb-20 mgt-40">组选</div>
      <div className="lh-48">前二组选:投注的2个号码与当期顺序开出的5个号码中的前2个号码相同，视为中奖。</div>
      <div className="lh-48">前三组选:投注的3个号码与当期顺序开出的5个号码中的前3个号码相同，视为中奖。</div>

      <div className="fw-b mgb-20 mgt-40">直选</div>
      <div className="lh-48">前二直选:投注的2个号码与当期顺序开出的5个号码中的前2个号码相同且顺序一致，视为中奖。</div>
      <div className="lh-48">前三直选:投注的3个号码与当期顺序开出的5个号码中的前3个号码相同且顺序一致，视为中奖。</div>


      <div className="fs-36 mgt-50 c-deeporange">PK10</div>
      <div className="fw-b mgb-20 mgt-40">1～10 两面</div>
      <div className="lh-48">单、双：号码为双数叫双，如04、08；号码为单数叫单，如05、09。</div>
      <div className="lh-48">大、小：开出之号码大于或等于6为大，小于或等于5为小。</div>

      <div className="fw-b mgb-20 mgt-40">1～5龙虎</div>
      <div className="lh-48">冠   军龙/虎：“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
      <div className="lh-48">亚   军龙/虎：“第二名”车号大于“第九名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
      <div className="lh-48">第三名龙/虎：“第三名”车号大于“第八名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
      <div className="lh-48">第四名龙/虎：“第四名”车号大于“第七名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>
      <div className="lh-48">第五名龙/虎：“第五名”车号大于“第六名”车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。</div>

      <div className="fw-b mgb-20 mgt-40">1～10数字</div>
      <div className="lh-48">每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。</div>

      <div className="fw-b mgb-20 mgt-40">冠亚和值</div>
      <div className="lh-48">冠军车号＋亚军车号＝冠亚和值（为3~19)</div>
      <div className="lh-48">冠亚和单双：“冠亚和值”为单视为投注“单”的注单视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。</div>
      <div className="lh-48">冠亚和大小：“冠亚和值”大于11时投注“大”的注单视为中奖，小于或等于11时投注“小”的注单视为中奖，其余视为不中奖。</div>
      <div className="lh-48">冠亚和指定：“冠亚和值”可能出现的结果为3～19， 投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。</div>

      <div className="fs-36 mgt-50 c-deeporange">快三</div>
      <div className="fw-b mgb-20 mgt-40">总和</div>
      <div className="lh-48">以全部开出的三个号码、加起来的总和来判定。</div>
      <div className="lh-48">总大/小：三个开奖号码总和值11~17 为「大」；总和值4~10 为「小」；若三个号码相同，视为不中奖 (扣除本金)。</div>
      <div className="lh-48">总单/双：三个开奖号码总和5、7、9、11、13、15、17为单；4、6、8、10、12、14、16为双；若三个号码相同，视为不中奖。 (扣除本金)。</div>

      <div className="fw-b mgb-20 mgt-40">三军</div>
      <div className="lh-48">三个开奖号码其中一个与所选号码相同时、即为中奖。</div>
      <div className="lh-48">举例：如开奖号码为1、1、3，则投注三军「1」或三军「3」皆视为中奖。</div>
      <div className="lh-48">备注：不论当局指定点数出现几次，仅派彩一次(不翻倍)。</div>

      <div className="fw-b mgb-20 mgt-40">围骰/全骰</div>
      <div className="lh-48">围骰：开奖号码三字同号、且与所选择的围骰组合相符时，即为中奖。</div>
      <div className="lh-48">全骰：全选围骰组合、开奖号码三字同号，即为中奖。</div>


      <div className="fw-b mgb-20 mgt-40">点数</div>
      <div className="lh-48">开奖号码总和值为4、5、6、7、8、9、10、11、12、13、14、15、16、17 时，即为中奖；若开出3、18，视为不中奖。 (扣除本金)。</div>
      <div className="lh-48">举例：如开奖号码为1、2、3、总和值为6、则投注「6」即为中奖。</div>



      <div className="fw-b mgb-20 mgt-40">长牌</div>
      <div className="lh-48">任选一长牌组合、当开奖结果任2码与所选组合相同时，即为中奖。</div>
      <div className="lh-48">举例：如开奖号码为1、2、3、则投注长牌「1、2」、长牌「2、3」、长牌「1、3」皆视为中奖。</div>


      <div className="fw-b mgb-20 mgt-40">短牌</div>
      <div className="lh-48">开奖号码任两字同号、且与所选择的短牌组合相符时，即为中奖。</div>
      <div className="lh-48">举例：如开奖号码为1、1、3，投注短牌「1、1」，即为中奖。</div>


      <div className="fw-b mgb-20 mgt-40">颜色：</div>
      <div className="lh-48">三粒骰子的颜色组合。</div>

      <div className="fw-b mgb-20 mgt-40">跨度：</div>
      <div className="lh-48">三里骰子中最大点数与最小点数之差。</div>

    </article>)
  }
}

export default instruction
