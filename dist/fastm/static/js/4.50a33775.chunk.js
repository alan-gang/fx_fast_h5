(this.webpackJsonpxystc_fxwap_fast=this.webpackJsonpxystc_fxwap_fast||[]).push([[4],{246:function(e,t,s){"use strict";var a=s(13),n=s(14),i=function(){function e(t,s,n){Object(a.a)(this,e),this.timerItval=0,this.fn=void 0,this.fn=s,this.start(t,s,n)}return Object(n.a)(e,[{key:"start",value:function(e,t){var s=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;this.timerItval=window.setInterval((function(){if(e<=0)return clearInterval(s.timerItval),void t(0,!0);t(e,!1),e--}),a)}},{key:"close",value:function(){clearInterval(this.timerItval)}}]),e}();t.a=i},247:function(e,t,s){},248:function(e,t,s){},249:function(e,t,s){"use strict";var a,n,i=s(13),o=s(14),c=s(20),u=s(19),m=s(21),r=s(0),l=s.n(r),p=s(16),h=s(43),d=s(30),f=s(92),v=(s(247),Object(p.b)("store")(a=Object(p.c)(a=function(e){function t(e){var s;return Object(i.a)(this,t),(s=Object(c.a)(this,Object(u.a)(t).call(this,e))).myScrollRef=void 0,s.changeMenu=function(e){s.props.updateMenu(e)},s.myScrollRef=l.a.createRef(),s}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){d.a.emit("ludanSelectMenuChange",this.props.selectedMenu),document.querySelector(".ludan-menu-view .menu-item.selected")&&this.myScrollRef.current.bscroll.scrollToElement(".menu-item.selected")}},{key:"componentWillReceiveProps",value:function(e){this.props.selectedMenu!==e.selectedMenu&&d.a.emit("ludanSelectMenuChange",e.selectedMenu),this.myScrollRef.current.refresh();var t=document.querySelector(".ludan-menu-view .menu-item.selected");this.myScrollRef.current.bscroll&&t&&this.myScrollRef.current.bscroll.scrollToElement(t,150,!0)}},{key:"render",value:function(){var e=this;return l.a.createElement("section",{className:"ludan-menu-view"},l.a.createElement(f.a,{ref:this.myScrollRef},l.a.createElement("nav",{className:"menu"},this.props.tabs&&this.props.tabs.length>0&&this.props.tabs.map((function(t,s){return l.a.createElement("div",{key:s,className:"menu-item ".concat(e.props.selectedMenu===t.name?"selected":""),onClick:function(){return e.changeMenu(t)}},t.title)})))))}}]),t}(r.Component))||a)||a),b=s(95),g=(s(248),Object(p.b)("store")(n=Object(p.c)(n=function(e){function t(e){var s;Object(i.a)(this,t),(s=Object(c.a)(this,Object(u.a)(t).call(this,e))).state=void 0,s.updateMenu=function(e){s.setState({selectedMenu:e.name},s.updateLudanList)},s.updateLudanList=function(){s.setState({ludanList:Object(h.d)(s.props.issueList.slice(0),s.props.gameType,s.state.selectedMenu||"",s.props.maxRows,s.props.maxColumns)||[]})};var a=Object(h.a)(s.props.gameType,s.props.methodMenuName),n=s.props.defaultMenu||(a.length>0?a[0].name:""),o=Object(h.d)(s.props.issueList.slice(0),s.props.gameType,n||"",s.props.maxRows,s.props.maxColumns)||[];return s.state={selectedMenu:n,ludanList:o,tabs:a},s}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=Object(h.a)(this.props.gameType,this.props.methodMenuName),s=e.defaultMenu||(t.length>0?t[0].name:""),a=Object(h.d)(e.issueList.slice(0),e.gameType,this.state.selectedMenu||"",e.maxRows,e.maxColumns)||[];this.setState({selectedMenu:s,ludanList:a,tabs:t})}},{key:"render",value:function(){return l.a.createElement("section",{className:"ludan-view"},!1!==this.props.isShowLudanMenu&&l.a.createElement(v,{selectedMenu:this.state.selectedMenu,tabs:this.state.tabs,updateMenu:this.updateMenu}),l.a.createElement(b.a,{maxColumns:this.props.maxColumns,maxRows:this.props.maxRows,ludanList:this.state.ludanList}))}}]),t}(r.Component))||n)||n);t.a=g},254:function(e,t,s){},255:function(e,t,s){},256:function(e,t,s){},278:function(e,t,s){"use strict";s.r(t);var a,n,i,o=s(13),c=s(14),u=s(20),m=s(19),r=s(21),l=s(0),p=s.n(l),h=s(16),d=s(246),f=s(65),v=(s(254),Object(h.b)("store")(a=Object(h.c)(a=function(e){function t(e){var s;return Object(o.a)(this,t),(s=Object(u.a)(this,Object(m.a)(t).call(this,e))).state=void 0,s.state={timer:null,remainTime:s.props.remainTime,hours:"00",minutes:"00",seconds:"00"},s}return Object(r.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.initTimer(this.props.remainTime)}},{key:"componentWillReceiveProps",value:function(e){this.setState({remainTime:e.remainTime}),this.initTimer(e.remainTime)}},{key:"initTimer",value:function(e){var t=this;if(!(e<=0)){var s=this.state.timer,a="",n=[];s&&s.close&&s.close(),s=new d.a(Math.floor(e),(function(e){e<=0&&t.props.getNewestIssue(t.props.gameId),a=Object(f.a)(1e3*e),n=a.split(":"),t.setState({hours:n[0],minutes:n[1],seconds:n[2]})})),this.setState({timer:s})}}},{key:"clearTimer",value:function(){this.state.timer&&this.state.timer.close&&this.state.timer.close()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"render",value:function(){return p.a.createElement("section",{className:"flex ai-c lobby-game-header-view"},p.a.createElement("div",{className:"flex jc-sb ai-c w100 "},p.a.createElement("div",{className:"txt-r cur-issue-wp"},p.a.createElement("span",{className:"fw-b"},this.props.gameName),p.a.createElement("span",null,this.props.curIssue,"\u671f")),p.a.createElement("div",{className:"time-wp ".concat(parseInt(this.state.seconds,10)<=10?"txt-c-r":"")},p.a.createElement("span",{className:"minute time-item mg-r-3"},this.state.minutes.split("")[0]),p.a.createElement("span",{className:"minute time-item"},this.state.minutes.split("")[1]),p.a.createElement("span",{className:"colon"},":"),p.a.createElement("span",{className:"second time-item mg-r-3"},this.state.seconds.split("")[0]),p.a.createElement("span",{className:"second time-item"},this.state.seconds.split("")[1]))))}}]),t}(l.Component))||a)||a),b=s(249),g=s(24),y=s(29),M=s(43),j=s(94),O=(s(255),Object(h.b)("store")(n=Object(h.c)(n=function(e){function t(e){var s;Object(o.a)(this,t),(s=Object(u.a)(this,Object(m.a)(t).call(this,e))).state=void 0,s.mysocket=void 0,s.getCurIssue=function(e){g.a.curIssue({gameid:e}).then((function(e){e.success>0?s.setState({curIssue:e.issue,curTime:e.current,remainTime:Math.floor((e.saleend-e.current)/1e3)||s.state.remainTime+.05}):s.setState({curIssue:""})}))},s.gotoGame=function(){s.props.goto("/game/".concat(s.props.gameId))},s.onIntoGame=function(){if(s.props.store.game.getGameLimitLevelByGameId(s.props.gameId))s.gotoGame();else{var e=s.props.store.game.getLimitListItemById(s.props.gameId);s.setState({isShowLimitSetDialog:!0,limitLevelList:e?e.kqPrizeLimit:[]})}},s.onLimitChoiceCB=function(e){s.props.store.game.updateGamesLimitLevel({gameId:s.props.gameId,level:e}),s.gotoGame()},s.onCloseLimitChoiceHandler=function(){s.setState({isShowLimitSetDialog:!1})};var a={ssc:{methodMenuName:"zhenghe",defaultMenu:"zh_dx",title:"\u603b\u548c\u5927\u5c0f"},"11x5":{methodMenuName:"zhenghe",defaultMenu:"zh_dx",title:"\u603b\u548c\u5927\u5c0f"},pk10:{methodMenuName:"zhenghe",defaultMenu:"zh_dx",title:"\u51a0\u4e9a\u548c\u503c\u5927\u5c0f"},k3:{methodMenuName:"diansu",defaultMenu:"zh_dx",title:"\u603b\u548c\u5927\u5c0f"},hc6:{methodMenuName:"",defaultMenu:"",title:"\u603b\u548c\u5927\u5c0f"}},n=Object(y.e)(e.gameId),i=e.store.game.getLimitListItemById(e.gameId),c=i&&i.bestLudan,r=(Object(M.f)(n,c&&c.codeStyle)||a[n].title)+"\u8def\u5355",l=Object(M.g)(n,c&&c.codeStyle)||a[n].methodMenuName,p=Object(M.e)(n,l,c&&c.codeStyle),h=p&&p.name||a[n].defaultMenu;return s.state={gameType:n,curIssue:"",curTime:0,remainTime:0,issueList:[],maxColumns:19,maxRows:6,isShowLudanMenu:!1,bestLudanConfig:a,bestLudanName:r,isShowLimitSetDialog:!1,limitLevelList:[],methodMenuName:l,defaultMenu:h},s}return Object(r.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.init()}},{key:"init",value:function(){this.getCurIssue(this.props.gameId),this.getHistoryIssue(this.props.gameId)}},{key:"initSocket",value:function(){var e=this;this.mysocket=new j.a({url:this.props.store.common.broadcaseWSUrl,name:"lobbyGame"+this.props.gameId,receive:function(t){"openWinCode"===t.type&&e.openWinCode(parseInt(t.content[0].lottId,10),t.content[0])},open:function(){e.mysocket&&e.mysocket.send(JSON.stringify(Object.assign({action:"noauth"},{})))}},!0)}},{key:"openWinCode",value:function(e,t){if(e===this.props.gameId){var s=this.state.issueList;s.unshift(t),this.setState({lastIssue:s[0].issue,openNumbers:s[0].code.split(","),issueList:s}),this.getCurIssue(this.props.gameId)}}},{key:"componentDidMount",value:function(){this.initSocket()}},{key:"getHistoryIssue",value:function(e){var t=this;g.a.historyIssue({gameid:e}).then((function(e){1===e.success&&e.items.length>0&&t.setState({lastIssue:e.items[0].issue,openNumbers:e.items[0].code.split(","),issueList:e.items})}))}},{key:"componentWillUnmount",value:function(){this.mysocket&&this.mysocket.removeListen()}},{key:"render",value:function(){return p.a.createElement("section",{className:"lobby-game-view crs-p",onClick:this.gotoGame},p.a.createElement(v,{gameType:this.props.gameType,gameId:this.props.gameId,curIssue:this.state.curIssue,remainTime:this.state.remainTime,gameName:this.props.gameName,getNewestIssue:this.getCurIssue}),p.a.createElement("div",{className:"best-dudan-name"},this.state.bestLudanName),p.a.createElement("div",{className:"ludan-wp"},p.a.createElement(b.a,{isShowLudanMenu:this.state.isShowLudanMenu,gameId:this.props.gameId,gameType:this.state.gameType,maxColumns:this.state.maxColumns,maxRows:this.state.maxRows,issueList:this.state.issueList.slice(0).reverse(),methodMenuName:this.state.methodMenuName,defaultMenu:this.state.defaultMenu})))}}]),t}(l.Component))||n)||n),I=(s(256),Object(h.b)("store")(i=Object(h.c)(i=function(e){function t(e){var s;Object(o.a)(this,t),(s=Object(u.a)(this,Object(m.a)(t).call(this,e))).DEFAULT_GAME_TYPE="hot",s.state=void 0,s.goto=function(e){s.props.history.push(e)},s.onMenuChanged=function(e){s.setState({curGames:e===s.DEFAULT_GAME_TYPE?Object(y.c)():Object(y.g)(e)})};var a=s.filterAvailableGames(Object(y.c)());return s.state={curGameType:s.DEFAULT_GAME_TYPE,curGames:a},s}return Object(r.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.state.curGames.length<=0&&this.props.store.game.getAvailableGames((function(t){e.setState({curGames:e.filterAvailableGames(Object(y.c)())})}))}},{key:"filterAvailableGames",value:function(e){var t=this;if(this.props.store.game.availableGames.length<=0)return[];var s=[];return e.forEach((function(e){t.props.store.game.hasAvailableGame(e.id)&&s.push(e)})),s}},{key:"render",value:function(){var e=this;return p.a.createElement("article",{className:"lobby-view"},p.a.createElement("section",{className:"flex lobby-game-ls"},this.state.curGames.map((function(t){return p.a.createElement(O,{key:t.id,gameType:e.state.curGameType,gameId:t.id,gameName:t.name,goto:e.goto})}))))}}]),t}(l.Component))||i)||i);t.default=I}}]);
//# sourceMappingURL=4.50a33775.chunk.js.map