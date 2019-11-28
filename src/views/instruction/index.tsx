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
    n && n.scrollIntoView({behavior: 'smooth'})
  }
  contains (selector: any, text: any) {
    return Array.prototype.filter.call(this.dom.current.querySelectorAll(selector), function(element){
      return RegExp(text).test(element.textContent)
    })
  }
  render() {

    return (<article className="fs-28 pdl-30 pdr-30 c-3 o_a" ref={ this.dom } style={this.state.domstyle}>

      <div className="fs-36 mgt-50 c-deeporange">时时彩</div>

      <div className="fw-b mgb-20 mgt-40">腾讯分分彩</div>
      <div className="lh-48 break-all">开奖数据源于每分钟腾讯QQ的在线用户人数数字生成一个五位数字。</div>
      <div className="lh-48 break-all">计算公式如下：</div>
      <div className="lh-48 break-all">【万位】：依照官方公布当时的在线人数数字之总和，再取尾数；</div>
      <div className="lh-48 break-all">例如：线上人数227415242人，则为2+2+7+4+1+5+2+4+2=29，取尾数9，因此万位数为9）</div>
      <div className="lh-48 break-all">【后四位】：依照官方公布当时的在线人数，取末四位为千百十个这四个号码；</div>
      <div className="lh-48 break-all">例如：线上人数227415242人，则末4码为5242</div>
      <div className="lh-48 break-all">腾讯QQ的线用户人数数据可参见齐聚数据网：</div>
      <div className="lh-48 break-all"><a href="https://www.qiju.info/#/qijuData/2">https://www.qiju.info/#/qijuData/2</a></div>

      <div className="fw-b mgb-20 mgt-40">微博5分彩</div>
      <div className="lh-48 break-all">开奖数据源于每5分钟微博热搜榜前20名关键词的搜索次数。</div>
      <div className="lh-48 break-all">取排名第1、第6、第11、第16名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【万位】的开奖号码；</div>
      <div className="lh-48 break-all">取排名第2、第7、第12、第17名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【千位】的开奖号码；</div>
      <div className="lh-48 break-all">取排名第3、第8、第13、第18名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【百位】的开奖号码；</div>
      <div className="lh-48 break-all">取排名第4、第9、第14、第19名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【十位】的开奖号码；</div>
      <div className="lh-48 break-all">取排名第5、第10、第15、第20名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【个位】的开奖号码。</div>
      <div className="lh-48 break-all">以开奖号码的【万位】为例：</div>
      <div className="lh-48 break-all">00:05分第1名关键词的搜索次数为 80000 次（尾数为0），</div>
      <div className="lh-48 break-all">00:05分第6名关键词的搜索次数为 56789 次（尾数为9），</div>
      <div className="lh-48 break-all">00:05分第11名关键词的搜索次数为 36748次（尾数为8），</div>
      <div className="lh-48 break-all">00:05分第16名关键词的搜索次数为 17890 次（尾数为0），</div>
      <div className="lh-48 break-all">则：0+9+8+0=27，27的尾数为7 ，所以01期开奖号码的【万位】就是7。</div>
      <div className="lh-48 break-all">微博热搜的排名数据可参见微博官网：<a href="https://s.weibo.com/top/summary?cate=realtimehot">https://s.weibo.com/top/summary?cate=realtimehot</a> 或 </div>
      <div className="lh-48 break-all">齐聚数据网：<a href="https://www.qiju.info/#/qijuData/1">https://www.qiju.info/#/qijuData/1</a></div>

      <div className="fs-36 mgt-50 c-deeporange">11选5</div>
      <div className="fw-b mgb-20 mgt-20 pdb-30 c-9">暂无彩种说明</div>

      
      <div className="fs-36 mgt-50 c-deeporange">PK10</div>

      <div className="fw-b mgb-20 mgt-40">阿里云分分彩</div>
      <div className="lh-48 break-all">每期开奖号码根据阿里云官网主页（<a href="https:/cn.aliyun.com/">https:/cn.aliyun.com/</a>）“防御攻击次数”计算而成。</div>
      <div className="lh-48 break-all">阿里云分分彩规则介绍：</div>
      <div className="lh-48 break-all">1、以每分钟阿里云的防御攻击次数数字生成一个五位数字作为阿里云分分彩当期的开奖号码；</div>
      <div className="lh-48 break-all">2、开奖号码的第一位（即万位）数字为阿里云官网当前防御攻击次数总和的尾数；</div>
      <div className="lh-48 break-all">（如：当期采集数据为14,530,580,511，即开奖号码万位为1+4+5+3+0+5+8+0+5+1+1=33 取尾数3）</div>
      <div className="lh-48 break-all">3、开奖号码的后四位（即千百十位）数字对应防御攻击次数的后四位数字 ；</div>
      <div className="lh-48 break-all">（如：当期采集数据为14,530,580,511，即后四位开奖号码为,0511，结合第二点，完整开奖号即为3 0511）</div>
      <div className="lh-48 break-all">4、阿里云分分彩种每分钟一期，全天24小时不间断开放。</div>
      <div className="lh-48 break-all">5、阿里云分分彩开奖结果数据源来源请参考：<a href="https://www.qiju.info/#/qijuData/5">https://www.qiju.info/#/qijuData/5</a></div>
      <div className="lh-48 break-all">如当期开奖号码官网未开奖且三分钟内未进行补开，或开奖号码与上期相同，则进行撤单处理</div>

      <div className="fw-b mgb-20 mgt-40">腾讯赛车</div>
      <div className="lh-48 break-all">每期开奖号码以【腾讯在线人数】、【统计时间】与【在线人数数字之和】为基础，使用哈希算法（SHA512）得到对应的哈希值，再以哈希值中</div>
      <div className="lh-48 break-all">每个数字（0到9） 第一次出现的先后顺序作为赛车比赛的结果，数字【0】代表【10号赛车】。</div>
      <div className="lh-48 break-all">例如：统计时间为： 2019-03-06 21:58:00，当时的腾讯在线人数为：322446581，在线人数数字之和为：3+2+2+4+4+6+5+8+1=35。</div>
      <div className="lh-48 break-all">用【腾讯在线人数】+【统计时间】+【在线人数数字之和】，即： 3224465812019-03-06 21:58:0035 </div>
      <div className="lh-48 break-all">来执行SHA512哈希算法，并得到哈希值：</div>
      <div className="lh-48 break-all">63546e9461136bb5e10e3cf1bc81a0324cbe36e2313607bcf2b1cb5da1f121e3f4e4a7c7b699251922483c5f63d5fed714f4a2387ad62</div>
      <div className="lh-48 break-all">82eced6386e9c3551c6</div>
      <div className="lh-48 break-all">在这个哈希值中，数字6最先出现，数字3次之，再是数字5，之后分别是数字4、数字9、数字1、数字0、数字8、数字2、数字7。</div>
      <div className="lh-48 break-all">因此当期的赛车结果为：6,3,5,4,9,1,10,8,2,7。</div>
      <div className="lh-48 break-all">腾讯赛车的在线人数与统计时间及对应的赛车结果，请参见齐聚数据网：<a href="https://www.qiju.info/#/qijuData/3">https://www.qiju.info/#/qijuData/3</a></div>

      <div className="fw-b mgb-20 mgt-40">阿里云赛车（PK10）</div>
      <div className="lh-48 break-all">开奖号码是使用当期「阿里云实时防御攻击次数」加上「统计时间」以及【防御次数数字之和】， </div>
      <div className="lh-48 break-all">使用SHA512哈希算法执行哈希取得哈希值后，依据最先出现的数字做为赛车结果，0代表10号车。</div>
      <div className="lh-48 break-all">以统计时间2019-06-21 14:47:00为范例，当期的阿里云实时防御攻击次数为4193188428， </div>
      <div className="lh-48 break-all">系统会利用阿里云实时防御攻击次数+统计时间+防御攻击次数数字总和=> 41931884282019-06-21 </div>
      <div className="lh-48 break-all">14:47:0048执行SHA512哈希算法取得赛车结果。</div>
      <div className="lh-48 break-all">bbb423f614b61460fc24de045fac2b02085d2b30f316b22c774794cf642d6b88a8e23ed602021b78b55de027ddca3108c72215ded704b</div>
      <div className="lh-48 break-all">a005dbf92eb83f7d96b</div>
      <div className="lh-48 break-all">在这个哈希值中，数字4最先出现，数字2次之，再是数字3，之后分别是数字6、数字1、数字10、数字5、数字8、数字7、数字9。</div>
      <div className="lh-48 break-all">因此当期的赛车结果为：4,2,3,6,1,10,5,8,7,9。</div>
      <div className="lh-48 break-all">阿里云赛车的在线人数与统计时间及对应的赛车结果，请参见齐聚数据网：<a href="https://www.qiju.info/#/qijuData/6">https://www.qiju.info/#/qijuData/6</a></div>

      <div className="fs-36 mgt-50 c-deeporange">快三</div>
      <div className="fw-b mgb-20 mgt-20  pdb-30 c-9">暂无彩种说明</div>


    </article>)
  }
}

export default withRouter(instruction)
