define("/modules/account/reg",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validator","/modules/vue/vue-common","/modules/vue/vue-validate","/modules/app/app"],function(e){var a=e("/modules/vue/vue");a.use(e("/modules/vue/vue-validator"));{var o=e("/modules/vue/vue-common"),t=e("/modules/vue/vue-validate"),r=e("/modules/app/app");new a({mixins:[o,t,r],el:"html",data:{title:"注册",init:!1,param:{userName:null,password:null},pwd:null,c:null},methods:{getCoupon:function(e){var a=this;a.httpAjax({url:"/h5/coupon/list",param:{pageIndex:1,pageSize:20},success:function(o){1==o.code?(a.c=o.data,console.log(console.log(a.coupon)),e&&e()):a.popup({content:o.msg})}})},reg:function(){var e=this,a=(new Date).getTime();e.valiForm(function(){e.param.password=e.base64(e.pwd+a+"");var o=localStorage.ref||e.getSearch("ref");localStorage.getItem("source")&&(e.param.source=localStorage.getItem("source")),/(group)/.test(o)&&(e.param.source=4),e.getSearch("source")&&(e.param.source=e.getSearch("source")),e.getSearch("channel")&&(e.param.channel=e.getSearch("channel")),localStorage.activityType&&(e.param.type=localStorage.activityType),e.httpAjax({url:"/h5/customer/register",param:e.param,type:"post",headers:{nowdate:a},success:function(a){1==a.code&&(localStorage.user=JSON.stringify(a.data),localStorage.mmToken=a.data.token,localStorage.userName=e.param.userName,localStorage.isNew=1,e.getCoupon(),e.popup({content:a.msg,type:"alert",ok:function(){o=o?decodeURIComponent(o):"../home/home.html",_hmt.push(["_trackEvent","success_register","注册成功"]),_maq.push(["_trackEvent","success_register",{suuid:localStorage.uuid,suuid2:localStorage.uuid2,source:localStorage.source,ref:o}]),localStorage.removeItem("channel"),localStorage.removeItem("ref"),e.go(o)}}))}})})},getAuth:function(){var e=this;e.param.userName?e.httpAjax({url:"/h5/sms/getAuth",param:e.param,success:function(a){e.popup({content:a.msg})}}):e.popup({content:"请输入手机号"})},otherLogin:function(e){var a="/sns/"+e+"/login?source=h5";location.href=CTX+a},ref:function(){return location.search}},ready:function(){var e=this;_hmt.push(["_trackEvent","user_regiser_page","进入注册页"]),_maq.push(["_trackEvent","user_regiser_page",{source:localStorage.source}]),e.isWeixin()?e.otherLogin("wechat"):(e.init=!0,e.$refs.loading.show=!1)},created:function(){}})}});