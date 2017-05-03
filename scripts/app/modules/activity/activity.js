define("/modules/activity/activity",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validator","/modules/vue/vue-common"],function(t){var o=t("/modules/vue/vue");o.use(t("/modules/vue/vue-validator"));{var s=t("/modules/vue/vue-common");new o({mixins:[s],el:"html",data:{title:"活动",init:!1,dataBanner:{},dataProductList:{},productList:{},showList:!0,price:!0,categoryId:"",asc:"",desc:"",cartNumber:""},methods:{sort:function(){var t=this;t.price=!t.price,1==t.price?(void 0!=t.productList.asc?t.dataProductList=t.productList.asc:(t.showList=!1,t.$refs.loading.show=!0,t.httpAjax({url:t.port+"/h5/category/productList?categoryId="+t.categoryId+"&dir=asc&order=price",success:function(o){t.dataProductList=o,t.productList.asc=t.dataProductList,t.$refs.loading.show=!1,t.showList=!0,t.initEcho()}})),t.asc=!0,t.desc=!1):(void 0!=t.productList.desc?t.dataProductList=t.productList.desc:(t.showList=!1,t.$refs.loading.show=!0,t.httpAjax({url:t.port+"/h5/category/productList?categoryId="+t.categoryId+"&dir=desc&order=price",success:function(o){t.dataProductList=o,t.productList.desc=t.dataProductList,t.$refs.loading.show=!1,t.showList=!0,t.initEcho()}})),t.asc=!1,t.desc=!0)}},ready:function(){var t=this;t.init=!0,t.$refs.loading.show=!0,t.$nextTick(function(){mui.init();var t=mui("#slider");t.slider({interval:2e3})}),t.httpAjax({url:t.port+"/h5/cart/count",success:function(o){t.cartNumber=o.data.totalQty}}),t.categoryId=location.hash.slice(1),t.httpAjax({url:t.port+"/h5/category/productList?categoryId="+t.categoryId,success:function(o){t.dataProductList=o,t.$refs.loading.show=!1,t.initEcho()}})},created:function(){}})}});