define("/modules/account/findpwd",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validator","/modules/vue/vue-common","/modules/vue/vue-validate"],function(e){var u=e("/modules/vue/vue");u.use(e("/modules/vue/vue-validator"));{var a=e("/modules/vue/vue-common"),o=e("/modules/vue/vue-validate");new u({mixins:[a,o],el:"html",data:{title:"找回密码",init:!1,param:{userName:null,type:1},pwd:null,showPwd:!1},methods:{reg:function(){var e=this,u=(new Date).getTime();e.valiForm(function(){e.pwd&&(e.param.password=e.base64(e.pwd+u+"")),e.httpAjax({url:"/h5/customer/forgotPassword",param:e.param,type:"post",headers:{nowdate:u},success:function(u){1==u.code&&(localStorage.userName=e.param.userName,e.go("../account/login.html"))}})})},getAuth:function(){var e=this;e.param.userName?(e.showPwd=!0,e.httpAjax({url:"/h5/sms/getAuth",param:e.param,success:function(u){e.popup({content:u.msg})}})):e.popup({content:"请输入手机号"})}},ready:function(){this.init=!0,this.$refs.loading.show=!1},created:function(){}})}});