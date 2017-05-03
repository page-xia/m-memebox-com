define("/modules/newcomer/list",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validator","/modules/vue/vue-common","/modules/app/app"],function(t){var e=t("/modules/vue/vue");e.use(t("/modules/vue/vue-validator"));var a=t("/modules/vue/vue-common"),i=t("/modules/app/app");vue=new e({mixins:[a,i],el:"html",data:{appData:null,init:!1,errorMsg:null,dataProductList:[],pageIndex:1,bannerUrl:"",title:"新人专享商品",activityNum:"",grouponType:"",expired:!1,notYet:!1,isNewcomer:null},methods:{downloadApp:function(){_hmt.push(["_trackEvent","group buying_download","下载APP"])},initMui:function(){var t=this;mui.init({pullRefresh:{container:"#pullrefresh",up:{contentnomore:"没有更多产品了",callback:function(){t.getList({more:!0,self:this})}}}})},getShareData:function(t){return{title:t.title,text:t.text,url:location.href,image:t.image||"http://cn.m.memebox.com/images/app/favicon.png"}},userInfoCall:function(t){t&&t.data&&t.data.token?(this.errorMsg=t.data.token,localStorage.mmToken=t.data.token,this.getList()):this.getList()},goDetail:function(t){1==t.stockStatus&&(this.isAppGroupon()?this.app_product({productId:t.productId}):location.href=location.origin+this.page+"/productDetails/productDetails.html?p="+t.productId)},getUrl:function(t){return 1!=t.stockStatus||this.isAppGroupon()?void 0:location.origin+this.page+"/productDetails/productDetails.html?p="+t.productId},appShare:function(t){var e=this;e.set_share(this.getShareData(t)),e.app_setShare(this.getShareData(t))},getList:function(t){var e=this;t=t||{},e.httpAjax({url:"/h5/newcomer/list",alert:!0,param:{pageIndex:e.pageIndex},success:function(a){if(console.log(a.data.serverTime>=a.data.startTime),1==a.code&&a.data.list&&a.data.serverTime>=a.data.startTime&&a.data.serverTime<=a.data.endTime)if(e.$refs.loading.show=!1,e.isNewcomer=a.data.isNewcomer,t.more)e.dataProductList=e.dataProductList.concat(a.data.list),t.self.endPullupToRefresh(6*e.pageIndex>=a.data.total?!0:!1),e.pageIndex++;else{e.dataProductList=e.dataProductList.concat(a.data.list),e.init=!0;var i={title:e.title,text:"MEMEBOX活动分享",url:location.href,image:location.origin+"/images/app/newcomer/include/newcomer-icon.png"};e.appShare(i),setTimeout(function(){e.initMui()},100),e.pageIndex++}else 3==a.code||a.data.list.length<=0||a.data.serverTime<a.data.startTime?e.expired=!0:(4==a.code||a.data.serverTime>a.data.endTime)&&(e.expired=!0,e.notYet=!0);console.log(e.dataProductList)},complete:function(t){0==t.code&&(e.expired=!0),e.init=!0}})}},created:function(){var t=this;try{t.isApp()?(localStorage.removeItem("mmToken"),setTimeout(function(){t.app_userinfo()},0)):t.getList()}catch(e){alert(e),t.getList()}}})});