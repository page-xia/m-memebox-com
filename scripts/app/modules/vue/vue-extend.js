define("/modules/vue/vue-extend",["require","exports","module","/modules/vue/vue-swipe","mui","/modules/libs/echo"],function(e,t,o){var i=e("/modules/vue/vue-swipe"),n=e("mui"),u=e("/modules/libs/echo");o.exports={components:{swipe:i.Swipe,"swipe-item":i.SwipeItem},methods:{initSwipe:function(){setTimeout(function(){for(var e=document.querySelectorAll(".swipe-items-wrap img"),t=136,o=0;o<e.length;o++)e[o].offsetHeight>t&&(t=e[o].offsetHeight)},10)},popup:function(e){var t=this,o=e.title||"提示",i=e.time||3e3;if(e.type)if("confirm"==e.type){var u=e.btn||["否","是"];n.confirm(e.content,o,u,function(t){1==t.index?e.ok&&e.ok():e.n&&e.n(t)})}else"alert"==e.type&&(n.alert(e.content,o,e.btn,function(t){1==t.index?e.ok&&e.ok(t):e.no&&e.no(t)}),e.autoClose&&1!=e.autoClose||setTimeout(function(){e.ok&&e.ok()},i));else t.$refs.loading&&(t.$refs.alert.show=!0,t.$refs.alert.text=e.content,e.autoClose&&1!=e.autoClose||setTimeout(function(){t.$refs.alert.show=!1,e.ok&&e.ok()},i))},initEcho:function(e){e=e||{offsetTop:1e3},u.init(e),u.render()},initView:function(e){var t=mui,o=t("#app").view({defaultPage:e}),i=(o.view,t.back);t.back=function(){o.canBack()?o.back():i()}},isImgLoad:function(e){var t,o=this,i=mui,n=!0;i("img").each(function(){return this.complete?void 0:(n=!1,!1)}),n?(clearTimeout(t),e()):(n=!0,t=setTimeout(function(){o.isImgLoad(e)},200))}}}});