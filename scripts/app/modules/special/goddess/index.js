define("/modules/special/goddess/index",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validate","/modules/vue/vue-common","/modules/app/app"],function(e){var t=e("/modules/vue/vue"),a=e("/modules/vue/vue-validate"),n=e("/modules/vue/vue-common"),o=e("/modules/app/app");vue=new t({mixins:[n,o,a],el:"html",data:{title:"女神节",cd:null,nowLv:0,nowImg:null,mistake:[],countLv:32,view:{INDEX:"index",MAIN:"main",END:"end",SHARE:"share"},showView:"",mainInit:!1,indexInit:!0,endInit:!1,shareInit:!1,col:2,checkIndex:null,shareLv:null,shareAvatar:null,avatar:null,countdown:null,commonShare:!0,mask:!1,isLogin:!1,text:[{s:0,me:"白天不懂夜的黑，直男这锅你背不背",ta:"我怀疑ta可能是位有少女心的汉子吧"},{s:10,me:"天若有情天亦老，有点粗糙你晓不晓",ta:"很少见这么不挑剔的女神"},{s:20,me:"你的表现很突出，让彩妆达人都相形见绌",ta:"高分女神秒杀彩妆达人"},{s:28,me:"真女神，请留步，美妆博主都得给你让让路",ta:"我想她一定是真女神无疑了"},{s:33,me:"你就是真女神！",ta:"她就是真女神！"}],imgMap:{0:{id:"23634",name:"PONY樱花浪漫口红",desc:"新鲜花瓣一样鲜明丰富的色感以及轻盈服帖的使用感"},1:{id:"23635",name:"轻奢保湿口红",desc:"像丝绸一样柔软丝滑的唇色"},2:{id:"21351",name:"纯真染色唇彩",desc:"不仅保湿滋润颜色丰富，还防水长效持久不易掉色"},3:{id:"23645",name:"轻奢丝绒口红",desc:"远离一般哑光唇膏的干涩质感，展现丝绒般的清爽舒适"},4:{id:"23648",name:"水凝唇釉",desc:"用水分紧紧包裹唇瓣，抚平唇部角质，多种颜色选择"},5:{id:"16300",name:"我爱蜡笔唇膏",desc:"像啫喱般的柔润顺滑，让肌肤看起来更白皙的色系"},6:{id:"23632",name:"我爱魔法棒",desc:"轻轻一抹均匀涂开打造完美小V脸妆容"},7:{id:"21460",name:"我爱柔蜜甜心气垫唇釉",desc:"糖果般的柔蜜鲜唇，持久不脱色，水润好涂抹"}}},methods:{userInfoCall:function(e){if(e&&e.data&&e.data.token)this.errorMsg=e.data.token,localStorage.mmToken=e.data.token,this.isLogin=!0,this.initPage();else{try{this.errorMsg=JSON.stringify(e)}catch(t){alert(t)}this.initPage()}},initPage:function(){var e=this,t={};e.openId&&(t.openId=e.openId),e.httpAjax({url:"/h5/activityview/girlsday",param:t,showLoading:!0,success:function(t){e.avatar=t.data.avatar}}),e.shareLv?(e.shareLv=parseInt(e.dbase64(e.shareLv),36),e.showView=e.shareLv>0?e.view.SHARE:e.view.INDEX):e.showView=e.view.INDEX},initMain:function(){var e=this;e.cd=45,e.mistake=[],e.nowLv=0,localStorage.mmToken&&(e.cd=60),e._initLv(e.nowLv),clearInterval(e.countdown),e.showView=e.view.MAIN,e.setShare()},linkStart:function(){var e=this;e.initMain()},getLvText:function(e){var t=this,a=null;e=e||t.nowLv;for(var n=0;n<t.text.length;n++){if(e>=t.text[n].s&&t.text[n+1]&&e<t.text[n+1].s){a=t.text[n];break}if(e>=t.text[n].s&&!t.text[n+1]){a=t.text[n];break}}return a},toProduct:function(e){var t=this;t.isApp()?t.app_product({productId:e}):(_maq.push(["_trackEvent","goddess_product",{token:localStorage.mmToken,pid:e}]),location.href="/m/productDetails/productDetails.html?p="+e)},_countdown:function(){var e=this;e.countdown=setInterval(function(){e.cd>0?e.cd--:(e.showView="end",e.setShare(),clearInterval(e.countdown))},1e3)},checkTap:function(e){var t=this;0==t.nowLv&&1===e.n&&(document.ontouchmove=function(e){e.preventDefault()},t._countdown()),1===e.n&&(t.nowLv==t.countLv?(t.nowLv=t.nowLv+1,t.showView="end",t.setShare(),clearInterval(t.countdown)):(t._initLv(++t.nowLv),t.setShare()))},_initLv:function(e){var t=this;t.col=e+1>=5?6:e+2,t.mistake=[],t.checkIndex=t._random(t.col*t.col);for(var a=0;a<t.col*t.col;a++)t.mistake.push(t.checkIndex==a?{n:1}:{n:(t.countLv+11-e)/10});t.nowImg=t._random(8)},_random:function(e){return Math.floor(Math.random()*e)},getShareData:function(){var e=this,t="分是女生还是女神就在此一搏了！！";e.nowLv>0&&(t="经权威机构检测，我的女神值高达"+e.nowLv*e.nowLv+"！");var a=[location.origin+location.pathname+"?l="+e.base64(e.nowLv.toString(36))];if(localStorage.user){var n=JSON.parse(localStorage.user);a.push("&su="+n.userId)}return e.avatar&&a.push("&sa="+e.base64(e.avatar)),e.share={title:t,text:"快来看看你够女神嘛~",url:a.join(""),image:location.origin+"/images/app/favicon.png"},{title:t,text:"快来看看你够女神嘛~",url:a.join(""),image:location.origin+"/images/app/favicon.png"}},setShare:function(){this.isApp()?this.app_setShare(this.getShareData()):this.set_share(this.getShareData())},appShare:function(){var e=this;this.isApp()?this.app_share(this.getShareData()):e.mask=!0},toLogin:function(){var e=this,t=location.href;localStorage.ref=t,localStorage.removeItem("mmToken"),e.isApp()?e.app_login({source:10}):e.h5_login(null,10)}},ready:function(){var e=this;e.setShare(),localStorage.mmToken&&(e.isLogin=!0),this.$refs.loading.show=!1},created:function(){var e=this;e.shareLv=e.getSearch("l"),e.shareAvatar=e.getSearch("sa"),e.shareAvatar&&(e.shareAvatar=e.dbase64(e.shareAvatar)),e.isApp()?(localStorage.removeItem("mmToken"),e.app_userinfo(),setTimeout(function(){localStorage.mmToken||e.initPage()},500)):e.isWeixin()?(e.getOpenId(),e.initPage()):e.initPage()}})});