define("/modules/special/help/help",["require","exports","module","/modules/vue/vue","/modules/vue/vue-common"],function(t){var e=t("/modules/vue/vue"),o=t("/modules/vue/vue-common");location.hash.substring(1)&&location.replace("#"),window.vue=new e({mixins:[o],el:"html",data:{title:"",isCreated:!1,list:[{hash:"some-question",text:"常见问题"},{hash:"about-account",text:"账户相关"},{hash:"free-shipping",text:"包邮政策"},{hash:"about-pay",text:"支付相关"},{hash:"about-transport",text:"物流相关"},{hash:"about-change",text:"退换政策"}]},computed:{},filters:{trim:function(t){return t.trim()}},methods:{syncCss:function(){this.$nextTick(function(){window.getComputedStyle(document.querySelector("body"),null).getPropertyValue("transform")})},goBack:function(){history.back(),1===history.length&&this.goHome()},goHome:function(){location.assign("/m/home/home.html")},hashChange:function(){!location.hash.substring(1)&&(this.title="")},toggleActive:function(t,e){var o=this;o.title=o.list[t].text,document.querySelector("#"+e).scrollTop=0}},created:function(){var t=this;t.isCreated=!0,window.addEventListener("hashchange",function(){t.hashChange()})}})});