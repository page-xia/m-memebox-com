define("/modules/my/logistics",["require","exports","module","/modules/vue/vue","/modules/vue/vue-common"],function(t){{var e=t("/modules/vue/vue"),o=t("/modules/vue/vue-common");new e({mixins:[o],el:"html",data:{title:"物流信息",init:!1,outs:null,outsid:null},methods:{initOuts:function(){var t=this;t.outsid=t.getSearch("outsid"),t.httpAjax({url:"/h5/tracker/info",param:{number:t.outsid},success:function(e){1==e.code?(t.outs=e.data,t.init=!0):t.popup({content:e.msg})}})}},created:function(){var t=this;localStorage.mmToken?t.initOuts():location.href="../account/login.html"}})}});