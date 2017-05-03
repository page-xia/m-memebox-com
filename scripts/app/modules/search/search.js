define("/modules/search/search",["require","exports","module","/modules/vue/vue","/modules/vue/vue-validator","/modules/vue/vue-validate","/modules/vue/vue-common"],function(e){var t=e("/modules/vue/vue");t.use(e("/modules/vue/vue-validator"));{var r=e("/modules/vue/vue-validate"),a=e("/modules/vue/vue-common");new t({mixins:[a,r],el:"html",data:{title:"搜索",init:!1,dataSearchType:{},keysFirstLevel:[],searchText:"",text:"",dataProductList:[],showResult:"",showSearch:!1,showBrandCard:!1,price:null,position:!0,sale:null,cartNumber:null,pageIndex:1,orderTotal:null,first:!0,noSearch:"",noFiler:"",filter:{},isShowFilter:!1,brands:[],currentBrandId:null,filterOption:{data:[],brand:[],category:[],functions:[],origin:[],price:[]},brandCardData:{},filterSwipe:null,letters:null,tab:{brand:{show:!0,text:"品牌"},category:{show:!1,text:"分类"},functions:{show:!1,text:"功效"},origin:{show:!1,text:"发货地"},price:{show:!1,text:"价格"}}},methods:{initMui:function(){function e(){setTimeout(function(){if(mui("#pullrefresh").pullRefresh().endPullupToRefresh(),10*t.pageIndex>=t.orderTotal)t.popup({content:"没有更多商品了",time:1e3,autoClose:!0}),mui("#pullrefresh").pullRefresh().endPullupToRefresh(!0);else{var e={q:t.text,pageIndex:t.ascIndex};t.pageIndex++,t.getList(e,function(e){t.dataProductList=t.dataProductList.concat(e.data)})}},0)}var t=this;mui.init({pullRefresh:{container:"#pullrefresh",up:{contentrefresh:"正在加载...",contentnomore:"",callback:e}}})},initFilterSwipe:function(){var e=this;e.filterSwipe=new Swiper("#filter .swiper-container",{observer:!0,slidesPerView:"auto",paginationClickable:!0,spaceBetween:10,freeMode:!0,direction:"horizontal"})},submit:function(e){var t=this;e.preventDefault(),t.valiForm(function(){location.search="?searchInput="+encodeURIComponent(t.searchText)}),localStorage.searchText=t.searchText},getBrandCard:function(e){var t,r=this,a=e,n=null;if(""==a)return!1;if(a=a.toLowerCase(),null==r.getCookie("brand"))r.httpAjax({url:"/h5/brand/cards",success:function(e){var i=e.data;if(1==e.code&&i.length>0){r.setCookie("brand",JSON.stringify(i),"h3"),t=JSON.parse(r.getCookie("brand"));for(var o=0;o<t.length;o++){var s=t[o].name.toLowerCase(),l=t[o].intro.toLowerCase(),u=t[o].searchKey;if(s.indexOf(a)>=0||l.indexOf(a)>=0){n=t[o].brandId,r.brandCardData=t[o];break}for(var c=0;c<u.length;c++){var d=u[c].toLowerCase();if(a==d){n=t[o].brandId,r.brandCardData=t[o];break}}}}else r.popup({content:e.msg})},error:function(){r.popup({content:"程序出错了"})}});else{t=JSON.parse(r.getCookie("brand"));for(var i=0;i<t.length;i++){var o=t[i].name.toLowerCase(),s=t[i].intro.toLowerCase(),l=t[i].searchKey;if(o.indexOf(a)>=0||s.indexOf(a)>=0){n=t[i].brandId,r.brandCardData=t[i];break}for(var u=0;u<l.length;u++){var c=l[u].toLowerCase();if(a==c){n=t[i].brandId,r.brandCardData=t[i];break}}}}return n},setCookie:function(e,t,r){var a=this,n=a.getsec(r),i=new Date;i.setTime(i.getTime()+1*n),document.cookie=e+"="+encodeURI(t)+";expires="+i.toGMTString()},getsec:function(e){var t=1*e.substring(1,e.length),r=e.substring(0,1);return"s"==r?1e3*t:"h"==r?60*t*60*1e3:"d"==r?24*t*60*60*1e3:void 0},getCookie:function(e){var t,r=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(r))?decodeURI(t[2]):null},delCookie:function(e){var t=new Date;t.setTime(t.getTime()-1);var r=getCookie(e);null!=r&&(document.cookie=e+"="+r+";expires="+t.toGMTString())},inputEmpty:function(){var e=this;e.searchText=""},priceChange:function(){var e=this;e.position=!1,e.sale=!1,e.price="asc"==e.price?"desc":"asc",e.first=!1,e.pageIndex=1,e.showResult&&(mui("#pullrefresh").pullRefresh().scrollTo(0,0,100),mui("#pullrefresh").pullRefresh().refresh(!0),e.getList()),e.isShowFilter=!1},positionSort:function(){var e=this;e.position=!0,e.price=null,e.sale=!1,e.pageIndex=1,e.showResult&&(mui("#pullrefresh").pullRefresh().scrollTo(0,0,100),mui("#pullrefresh").pullRefresh().refresh(!0),e.getList()),e.isShowFilter=!1},salesSort:function(){var e=this;e.position=!1,e.price=null,e.sale=!0,e.pageIndex=1,e.showResult&&(mui("#pullrefresh").pullRefresh().scrollTo(0,0,100),mui("#pullrefresh").pullRefresh().refresh(!0),e.getList()),e.isShowFilter=!1},getList:function(e,t){var r=this;e=e||{},e.order=1,r.price&&(e.order="asc"==r.price?"3":"4"),r.sale&&(e.order=2);for(var a in r.filterOption)if("data"!=a&&r.filterOption[a].length>0&&(e[a]=r.filterOption[a].toString(),"price"==a)){var n=e[a].match(/\d+/g);e[a]=n.length>1?parseInt(n[0])<parseInt(n[1])?n[0]+"-"+n[1]:n[1]+"-"+n[0]:n[0]+"-*"}e.q=r.text.replace(/(^\s*)|(\s*$)/g,""),e.pageIndex=r.pageIndex,r.httpAjax({url:"/global/search",domain:r.searchDomain,param:e,success:function(e){r.orderTotal=e.orderTotal,t?t(e):(0==r.orderTotal?(r.showResult=!1,r.noSearch=!0):(r.showResult=!0,r.noSearch=!1,r.orderTotal<10&&setTimeout(function(){mui("#pullrefresh").pullRefresh().endPullupToRefresh(!0)},0)),r.dataProductList=e.data),r.init=!0,setTimeout(function(){r.initEcho()},10)}})},getCart:function(){var e=this;e.httpAjax({url:"/h5/newcart/count",success:function(t){e.cartNumber=t.data.totalQty}})},pySort:function(e,t){var r=this;if(!String.prototype.localeCompare)return null;var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");r.letters=a;for(var n="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split(""),i=[],o=0;o<e.length;o++)i.push(e[o].name);for(var s,l=[],u=0;u<a.length;u++){if(s={letter:a[u],data:[]},26!=u)for(var c=0;c<i.length;c++){var d=i[c].toString(),h=d.charAt(0);h==a[u]||h==a[u].toLowerCase()?s.data.push(d):"*"!=n[u]&&r.isChinese(h)&&h.localeCompare(n[u])>=0&&(!n[u+1]||h.localeCompare(n[u+1])<0)&&s.data.push(d)}else for(var f=0;f<i.length;f++){var p=i[f].toString(),v=p.charAt(0);r.isChar(v)||r.isChinese(v)||s.data.push(p)}(t||s.data.length)&&l.push(s)}return l},isChinese:function(e){var t=/[^\u4E00-\u9FA5]/;return t.test(e)?!1:!0},isChar:function(e){var t=/[A-Za-z]/;return t.test(e)?!0:!1},scrollToGroup:function(e){var t=document.getElementById("brand");t.getElementsByClassName(e)[0]&&(t.scrollTop=t.getElementsByClassName(e)[0].offsetTop)},changeTab:function(e){var t=this;for(k in t.tab)t.tab[k].show=!1;t.tab[e].show=!0},selectOption:function(e,t,r){var a=this,n=r.currentTarget;if("active"==n.className)n.className="",a.deleteOption(e,t);else{if("price"==e||"origin"==e){a.filterOption[e]=[],a.emptyArr(e,a.filterOption.data);for(var i=document.getElementById(e),o=i.querySelectorAll(".active"),s=0;s<o.length;s++)o[s].className=""}n.className="active",a.addOption(e,t)}a.slideChange()},removeOption:function(e,t){var r=this;r.deleteOption(e,t);for(var a=document.getElementsByClassName("second-level-con")[0],n=a.querySelectorAll(".active"),i=0;i<n.length;i++)n[i].getAttribute("data-value")==t&&(n[i].className="")},addOption:function(e,t){var r=this;r.addArr({k:e,v:t},r.filterOption.data,!0),r.addArr(t,r.filterOption[e],!1)},deleteOption:function(e,t){var r=this;r.deleteArr({k:e,v:t},r.filterOption.data,!0),r.deleteArr(t,r.filterOption[e],!1)},addArr:function(e,t,r){var a=this;if(r){for(var n in t)if(t[n].k==e.k&&t[n].v==e.v)return a.deleteArr(t[n],t,r),!1}else for(var n=0;n<t.length;n++)if(e==t[n])return a.deleteArr(t[n],t,r),!1;t.push(e)},deleteArr:function(e,t,r){if(r){for(var a in t)if(t[a].k==e.k&&t[a].v==e.v)return t.splice(a,1),!1}else for(var a=0;a<t.length;a++)if(e==t[a])return t.splice(a,1),!1},emptyArr:function(e,t){for(var r in t)if(t[r].k==e)return t.splice(r,1),!1},slideChange:function(){var e=this,t=setTimeout(function(){var r=e.filterOption.data.length-1;e.filterSwipe.slideTo(r,300,!1),clearTimeout(t)},10)},clearFilter:function(){var e=this;for(var t in e.filterOption)e.filterOption[t]=[];for(var r=document.getElementsByClassName("second-level-con")[0],a=r.querySelectorAll(".active"),t=0;t<a.length;t++)a[t].className=""},sureFilter:function(){var e=this;e.pageIndex=1,e.showResult&&(mui("#pullrefresh").pullRefresh().scrollTo(0,0,100),mui("#pullrefresh").pullRefresh().refresh(!0)),e.getList(),e.isShowFilter=!1},showFilter:function(){var e=this;e.isShowFilter=!e.isShowFilter},enterBrand:function(){var e=this,t=e.currentBrandId;t&&_maq.push(["_trackEvent","search_enter_brand_click",{brand_id:t,keyword:e.searchText}])}},ready:function(){var e,t=this,r=t.getSearch("searchInput");t.init=!0,r&&""!=r?(localStorage.searchText=decodeURI(r),t.searchText=localStorage.searchText,t.text=t.searchText,t.getList({filter:1},function(e){e.data?(t.dataProductList=e.data,t.filter=e.filter,t.brands=t.pySort(t.filter.brand),0!=t.dataProductList.length&&(t.showResult=!0),0==t.dataProductList.length&&(t.noSearch=!0),t.title=t.searchText,setTimeout(function(){t.initMui(),t.getCart(),t.initFilterSwipe()},10)):(t.popup({content:"没有该商品",time:1e3,autoClose:!0,ok:function(){}}),t.noSearch=!0),t.showSearch=!0}),e=t.getBrandCard(t.searchText),e?(t.currentBrandId=e,t.showBrandCard=!0):t.showBrandCard=!1):t.httpAjax({url:"/h5/category/getCats",success:function(e){t.dataSearchType=e.data,t.showResult=!1,t.showSearch=!1}})},created:function(){"undefined"!=typeof Storage&&(sessionStorage.KEYNODE=2)}})}});