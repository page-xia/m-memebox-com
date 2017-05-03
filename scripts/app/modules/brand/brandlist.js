define("/modules/brand/brandlist",["require","exports","module","/modules/vue/vue","/modules/vue/vue-common"],function(e){{var t=e("/modules/vue/vue"),n=e("/modules/vue/vue-common");new t({mixins:[n],el:"html",data:{title:"品牌馆",init:!1,isEmpty:!1,brandCategory:[],brandList:[],swiper:null,nowBrand:null,nowCate:"",isNowCate:[],thisBrand:null,pageIndex:1,orderTotal:null,currentCate:0},computed:{currentBrand:function(){var e=this;return{ponyef:1==e.thisBrand,imeme:2==e.thisBrand,nooni:3==e.thisBrand,bonvivant:4==e.thisBrand}}},methods:{initMui:function(){function e(){setTimeout(function(){mui("#brandlist").pullRefresh().endPullupToRefresh(),10*t.pageIndex>=t.orderTotal?(t.popup({content:"没有更多商品了",time:1e3,autoClose:!0}),mui("#brandlist").pullRefresh().endPullupToRefresh(!0)):(t.pageIndex++,t.getBrandList(function(e){t.brandList=t.brandList.concat(e.data)}))},0)}var t=this;mui.init({pullRefresh:{container:"#brandlist",up:{contentrefresh:"正在加载...",contentnomore:"没有更多数据了",callback:e}}})},getBrandId:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?n[2]:null},initBrandlist:function(){var e=this,t=e.getBrandId("id");e.currentCate=e.getBrandId("index")?e.getBrandId("index"):0,e.thisBrand=t=t?t:1,e.isNowCate[e.currentCate]=!0,e.nowBrand=1==t?"PONY":2==t?"IMEME":3==t?"NOONI":4==t?"BONVIVANT":"PONY EFFECT",e.brandCategory=[],e.httpAjax({url:"/mobilev44/brand/category",param:{id:t},success:function(t){if(1==t.code){var n=t.data;n.length>0&&(e.brandCategory=n,setTimeout(function(){e.swiper=new Swiper(".brandlist-container .swiper-container",{slidesPerView:3,paginationClickable:!0,spaceBetween:10,freeMode:!0,resistanceRatio:0,initialSlide:e.currentCate})},10),e.getBrandList(),e.init=!0)}else e.popup({content:t.msg})},error:function(){e.popup({content:"程序出错了"})}})},getBrandList:function(e){var t=this,n={pageIndex:t.pageIndex,brand:t.nowBrand,category:t.nowCate};t.isEmpty=!1,t.httpAjax({url:"/global/search",domain:t.searchDomain,param:n,success:function(n){t.orderTotal=n.orderTotal,e?e(n):1==n.code&&0!=n.orderTotal?t.brandList=n.data:(t.isEmpty=!0,t.brandList=[])},error:function(){t.popup({content:"程序出错了"})}})},changeCate:function(e,t,n){var a=this,e=e?e:"PONY",r=t?t:"all",i=n.target.parentNode.className.split(" "),o=n.target.parentNode.getAttribute("value"),d="";return a.nowBrand=e,a.nowCate=r,d=_.indexOf(i,"active"),a.isNowCate=[],-1!=d?!1:(a.isNowCate[o]=!0,void a.getBrandList())},goToPage:function(e){var t=this;location.href=location.origin+t.page+"/productDetails/productDetails.html#"+e}},ready:function(){},created:function(){var e=this;e.initMui(),e.initBrandlist()}})}});