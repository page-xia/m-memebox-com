function log(){Function.apply.call(console.log,console,arguments)}var callbacks={},ua=navigator.userAgent,oproto=Object.prototype,ohasOwn=oproto.hasOwnProperty,rwindow=/^\[object (?:Window|DOMWindow|global)\]$/,serialize=oproto.toString,class2type={},ANDROID=/android/i.test(ua),IOS=/iphone|ipad/i.test(ua),WP=/windows phone/i.test(ua),noop=function(){},generateID=window.performance&&performance.now?function(){return("cxb"+performance.now()+performance.now()).replace(/\./g,"")}:function(){return("cxb"+Math.random()+Math.random()).replace(/0\./g,"")};