define("/modules/vue/vue-config",["require","exports","module","/modules/vue/vue"],function(e){var o=e("/modules/vue/vue"),u=function(){return/^dev|qa|cdn/.test(location.hostname)};u()&&(o.config.debug=!0,o.config.silent=!1,o.config.devtools=!0)});