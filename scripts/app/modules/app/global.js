define("/modules/app/global",function(a,n,o){o.exports={methods:{app_info:function(a){window.callByJS&&window.callByJS({domain:"global",action:"appInfo",param:a,callback:function(a){vue.appInfoCall(a)}})},app_set_title:function(a){window.callByJS&&window.callByJS({domain:"global",action:"set_title",param:a})},app_product:function(a){a=a||{},a.url=location.href,window.callByJS&&window.callByJS({domain:"product",action:"detail",param:a})},app_channel:function(a){a=a||{},a.url=location.href,window.callByJS&&window.callByJS({domain:"channel",action:"channel",param:a})},app_main:function(a){window.callByJS&&window.callByJS({domain:"main",action:"to_main",param:a})},app_h5page:function(a){window.callByJS&&window.callByJS({domain:"h5page",action:"to_h5page",param:a})},app_back:function(a){window.callByJS&&window.callByJS({domain:"global",action:"back",param:a})}}}});