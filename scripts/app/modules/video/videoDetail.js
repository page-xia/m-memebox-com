define("/modules/video/videoDetail",["require","exports","module","/modules/vue/vue","/modules/vue/vue-common","/modules/app/app"],function(e){var t=e("/modules/vue/vue"),r=e("/modules/vue/vue-common"),o=e("/modules/app/app");vue=new t({mixins:[r,o],el:"html",data:{title:"视频详情",init:!1,detailData:{},videoId:"",isShowPreview:!0,isShowControlBar:!1,isPlay:!1,timer:null,videoCurrentTime:"00:00",videoTotalTime:"00:00",playProgress:"0%",bufferProgress:"0%",videoHeight:"0",cartNumber:""},methods:{initCart:function(e){var t=this;t.httpAjax({url:"/h5/newcart/count",showLoading:e,success:function(e){t.cartNumber=e.data.totalQty}})},getDetail:function(){var e=this;e.httpAjax({url:"/h5/video/detail?videoId="+e.videoId,complete:function(t){if(1==t.code){e.detailData=t.data,e.isShowPreview=!0,e.initCart(!0);var r=setTimeout(function(){e.init=!0,e.$refs.loading.show=!1,r=null;var t=setTimeout(function(){e.videoHeight=parseInt(.56*document.getElementById("videoBox").offsetWidth)+"px",t=null},200)},300)}else e.popup({type:"confirm",title:"",content:"视频已失效",btn:["知道啦"]})},alert:function(){}})},initBuffer:function(){var e=this,t=document.getElementById("myVideo");setTimeout(function(){e.bufferProgress=parseInt(t.buffered.end(0))/parseInt(t.duration)*100+"%"},500)},dragProBarStart:function(){var e=this;e.isShowControlBar=!0,e.timer=null},dragProBar:function(e){var t=this,r=document.getElementById("myVideo"),o=document.getElementById("proBar"),n=document.getElementById("progress"),i=parseInt((e.touches[0].clientX-n.offsetLeft-o.offsetLeft)/o.offsetWidth*100);t.playProgress=i>100?"100%":i+"%",t.videoCurrentTime=(parseInt(r.currentTime/60)<10?"0"+parseInt(r.currentTime/60):parseInt(r.currentTime/60))+":"+(parseInt(r.currentTime%60)<10?"0"+parseInt(r.currentTime%60):parseInt(r.currentTime%60)),t.isShowControlBar=!0;var a=parseInt((e.touches[0].clientX-n.offsetLeft-o.offsetLeft)/o.offsetWidth*r.duration);a&&(r.currentTime=a)},dragProBarEnd:function(){var e=this;e.updateProgress()},endPlay:function(){var e=this;e.videoPause()},showVideo:function(){var e=this;e.isShowPreview=!1,e.videoPlay()},changeControlBar:function(){var e=this;e.isShowControlBar=!e.isShowControlBar},changeVideo:function(){var e=this,t=document.getElementById("myVideo");t.paused?e.videoPlay():e.videoPause()},videoPlay:function(){var e=this,t=document.getElementById("myVideo");t.play(),e.isPlay=!0,e.isShowControlBar=!0,e.hideControlBar(),e.updateProgress()},videoPause:function(){var e=this,t=document.getElementById("myVideo");t.pause(),e.isPlay=!1,e.isShowControlBar=!0,e.hideControlBar(),e.timer=null},hideControlBar:function(){var e=this;if(e.isShowControlBar)var t=setTimeout(function(){e.isShowControlBar=!1,t=null},3e3)},updateProgress:function(){var e=this,t=document.getElementById("myVideo");e.timer=setInterval(function(){e.playProgress=parseInt(t.currentTime)/parseInt(t.duration)*100+"%",e.videoTotalTime=(parseInt(t.duration/60)<10?"0"+parseInt(t.duration/60):parseInt(t.duration/60))+":"+(parseInt(t.duration%60)<10?"0"+parseInt(t.duration%60):parseInt(t.duration%60)),e.videoCurrentTime=(parseInt(t.currentTime/60)<10?"0"+parseInt(t.currentTime/60):parseInt(t.currentTime/60))+":"+(parseInt(t.currentTime%60)<10?"0"+parseInt(t.currentTime%60):parseInt(t.currentTime%60))},1e3)}},ready:function(){var e=this;mui.init(),e.getDetail(),document.getElementById("myVideo").pause(),window.onblur=function(){e.isPlay&&e.videoPause()}},created:function(){var e=this;e.videoId=e.getSearch("videoId")},watch:{}})});