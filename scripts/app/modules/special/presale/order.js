define("/modules/special/presale/order",["require","exports","module","/modules/vue/vue","/modules/vue/vue-common","/modules/payment/ga","/modules/vue/vue-validate","/modules/app/app","/modules/vue/vue-validator"],function(e){var t=e("/modules/vue/vue"),r=e("/modules/vue/vue-common"),a=(e("/modules/payment/ga"),e("/modules/vue/vue-validate")),s=e("/modules/app/app");t.use(e("/modules/vue/vue-validator")),t.filter("pcc",function(e,t){return e.match("¥")?0==t?e.slice(t,1):parseInt(e.slice(t)):0==t?"":e.replace(".","")}),t.component("idcard",{mixins:[a],props:["address"],data:function(){return{ID:null}},methods:{close:function(){mui("#idcardPop").popover("toggle")},addIdcard:function(){var e=this;e.$parent.valiForm(function(){var t=JSON.parse(JSON.stringify(e.address));t.idcard=e.ID,e.$parent.saveAddress(!0,t,function(){mui("#idcardPop").popover("toggle"),setTimeout(function(){e.$parent.checkout()},500)})},e.$idvali)}},template:'<div id="idcardPop" class="mui-popover mui-popover-action mui-popover-bottom mui-popover-idcard">\n   <validator name="idvali">\n      <form novalidate>\n   <ul>\n      <li class="title mui-table-view-cell">\n         实名认证\n         <span class="close fr" @tap="close">×</span>\n      </li>\n      <li class="content">\n         <p>由于国家政策要求实名认证，您的姓名或身份证信息不正确，请修改后再提交！\n         </p>\n         <input  type="text" v-model="ID" v-validate:idcard="{idcard:{rule:false,message:\'请填写正确的身份证号\'},minlength:{rule:1,message:\'应海关要求，购买跨境商品时必须填写身份证号\'}}" placeholder="收货人身份证号（将加密处理）">\n         <button type="button" @tap="addIdcard" class="mui-btn mui-btn-block mui-btn-mm">提交并支付</button>\n      </li>\n   </ul>\n      </form>\n   </validator>\n</div>'}),vue=new t({mixins:[r,a,s],el:"html",data:{init:!1,title:"预付确认",orderAddress:null,addressText:null,param:{},product:{},points:null,address:null,gwpItem:null,pay:{wx:!1,ali:!1,global:!1,orderId:null,totalAmount:0,time:"",step:!1},successOrders:[],presale:!0,params:{},startPayTime:"",Property:{},appReport:{},notBuyAgain:"",proType:""},methods:{userInfoCall:function(e){var t=this;e&&e.data&&e.data.token&&(this.errorMsg=e.data.token,localStorage.mmToken=e.data.token),setTimeout(function(){localStorage.mmToken?t.initOrder():t.app_login()},100)},agreePresale:function(){var e=this;e.presale=!e.presale,console.log(e.presale)},changePrice:function(e){var t;return t=e.match("折")?["",parseInt(e.replace(".","").slice(0,e.length-1)),"折"]:["¥",parseInt(e.slice(1))]},selectCity:function(e){e.target.focus();var t=this,r=new mui.PopPicker({layer:3});r.setData(cityData3),r.show(function(e){t.addressText=(e[0]||{}).text+" "+(e[1]||{}).text+" "+((e[2]||{}).text||(e[1]||{}).text),t.param.province=(e[0]||{}).text,t.param.postcode=(e[0]||{}).value,t.param.city=(e[1]||{}).text,t.param.district=(e[2]||{}).text||(e[1]||{}).text,t.param.provinceId=(e[0]||{}).value})},addClick:function(){this.param={},this.addressText=null},editAddress:function(e){var t=this,r=t.address[e];t.param=_.clone(r),t.addressText=r.province+" "+r.city+" "+r.district},selectAddress:function(e){this.orderAddress=this.address[e],this.initOrder(),mui.back()},removeAddress:function(e,t){var r=this;r.popup({type:"confirm",content:"确认删除？",ok:function(){r.address.$remove(r.address[t]),r.httpAjax({url:"/h5/address/delete",param:{addressId:e},success:function(t){r.orderAddress&&e==r.orderAddress.addressId&&(r.orderAddress=null),r.param={},0!=mui(".add-address .address-box").length&&r.da(0),r.popup({content:t.msg})}})}})},sendSave:function(e,t,r){var a=this;a.httpAjax({url:"/h5/address/save",param:t,success:function(t){1==t.code&&(a.initOrder(),e?a.orderAddress.idcard=a.$refs.idcard.ID:mui.back(),r&&r(t)),a.popup({content:t.msg})}})},saveAddress:function(e,t,r){var a=this;t?a.sendSave(e,t,r):a.valiForm(function(){a.sendSave(e,a.param,r)})},da:function(e){var t=this;t.httpAjax({url:"/h5/address/setdefault",param:{addressId:t.address[e].addressId},success:function(){t.initOrder()}})},changePoints:function(){this.initRewardPoints()},appPayCall:function(e){var t=this;e&&1==e.code&&e.data&&e.data.orderId&&(this.finishReport(),_maq.push(["_trackEvent","Depositpay_success",t.Property]),t.app_orderList({menu:0}))},submitReport:function(){this.getReport("?category=1&eventName=submit_order_pay")},finishReport:function(){this.getReport("?category=1&eventName=finish_order&property="+encodeURIComponent(JSON.stringify(this.appReport)))},getReport:function(e){var t=this,r="ios_h5";if(t.isApp()){var a=t.iosVer()||t.androidVer();t.isAndroidApp()&&(r="android_h5");var s=new Image;s.src="https://report.cn.memebox.com/index.html"+e+"&time="+parseInt((new Date).getTime()/1e3)+"&network=h5&deviceId=h5&platform="+r+"&channel=h5&model=mobile&clientVersion="+a+"&userToken="+localStorage.mmToken+"&userId="+localStorage.mmToken+"&useragent="+navigator.userAgent}},checkout:function(){var e=this;return e.params.addressId=e.orderAddress.addressId,e.params.remark=e.iosVer()?"iOS":e.androidVer()?"Android":"h5",1==e.notBuyAgain?!1:void(e.presale?e.orderAddress&&e.orderAddress.addressId?!e.orderAddress.idcard&&e.isShowID()?mui("#idcardPop").popover("toggle"):(e.notBuyAgain=!0,e.httpAjax({url:"/h5/presalecheckout/placeorder",param:e.params,success:function(t){if(""!=t.data){console.log(t),_maq.push(["_trackEvent","checkout_Depositpay",e.Property]);var r={grantTotal:e.product.depositTotal,time:t.data.closedLeftTime,type:2,orderId:t.data.increment_id,showCloseBox:!0,step:1};e.isAppPay()?e.app_pay({orderId:t.data.increment_id}):(e.$refs.pay.payBoxInit(r),setTimeout(function(){mui("#select-pay").popover("show")},1e3))}}})):e.popup(e.address&&e.address.length>0?{content:"请选择地址"}:{content:"请填写地址信息"}):e.popup({type:"confirm",title:" ",content:"请同意预售规则",btn:['<span style="color:#999">关闭</span>',"同意"],ok:function(){e.presale=!0}}))},showPayBox:function(){var e=this;mui("#select-pay").popover("toggle");var t=e.successOrders[0];t.type=t.warehouse;var r=t.orderId;e.isWeixin()&&"2"==t.type?(e.pay.wx=!0,e.pay.ali=!1,e.pay.wxOk=function(){location.href="/m/payment/payment.html?orderIds="+e.getOrderIds("orderIds")+"&orderId="+r}):(e.pay.wx=!1,e.pay.ali=!0),e.pay.global="1"==t.type?!0:!1},initOrder:function(){var e=this,t={};e.orderAddress&&e.orderAddress.addressId&&(t.addressId=e.orderAddress.addressId),console.log(e.params),e.httpAjax({url:"/h5/presalecheckout/index",source:7,param:e.params,alert:2,success:function(t){if(1==t.code){e.initAddress(t.data.addressList),e.product=t.data.productInfo,e.product.preTotal=t.data.preTotal,e.product.depositTotal=t.data.depositTotal,e.startPayTime=e.formatDate(e.product.startRetainageTime),e.Property.Product_id=e.product.productId;var r={1:{text:"韩国仓",name:"korea"},2:{text:"极速仓",name:"china"},4:{text:"保税仓",name:"bonded"},8:{text:"韩国直邮／特快",name:"korea"}};e.proType=r[e.product.warehouse]}else e.popup({content:t.msg,type:"alert"});e.init=!0},complete:function(t){0==t.code&&e.popup({content:t.msg,type:"alert",autoClose:!1,ok:function(){mui.back()}})}})},getType:function(){var e=this,t={1:"韩国仓",2:"极速仓",4:"保税仓",8:"韩国直邮／特快"};return t[e.product.warehouse]},initAddress:function(e){var t=this;if(t.address=e,!t.orderAddress){for(var r=0;r<t.address.length;r++)t.address[r]&&1==t.address[r].isDefault&&(t.orderAddress=t.address[r]);t.address[0]&&!t.orderAddress&&(t.orderAddress=t.address[0],t.da(0),t.address[0].isDefault=1)}},initRewardPoints:function(){var e=this,t=this.points&&1==this.points.is_used_points?0:1;e.httpAjax({url:"/h5/newcheckout/useRewardPoints",param:{usePoints:t},success:function(t){1==t.code?(e.points=t.data,e.setPrice(t.data),e.pageData.rewardBack=t.data.rewardBack):e.popup({content:t.msg})}})},selectCart:function(e){this.sc.type=e,this.sc.list=this.cartItems[e]},initView:function(e){var t=mui("#app").view({defaultPage:"#order"});mui(".mui-scroll-wrapper").scroll();var r=(t.view,e.back);e.back=function(){t.canBack()?t.back():r()}},isShowID:function(){return!0},changeDesc:function(e){e.target.classList.toggle("show")},qty:function(e){for(var t=0,r=0;r<e.length;r++)t+=Number(e[r].qty);return t}},ready:function(){var e=this;e.$nextTick(function(){mui.init(),e.initView(mui)})},created:function(){var e=this;e.params.qty=e.getSearch("qty"),e.params.productId=e.getSearch("productId"),e.getSearch("option_id")&&"null"!=e.getSearch("option_id")&&(e.params["options["+e.getSearch("option_id")+"]"]=e.getSearch("value"));var e=this;e.isApp()?(localStorage.removeItem("mmToken"),e.app_userinfo()):(e.isWeixin()&&e.getOpenId(),e.initOrder())}})});