define("/modules/vue/vue-validator",function(t,i,e){!function(t,n){"object"==typeof i&&"undefined"!=typeof e?e.exports=n():"function"==typeof define&&define.amd?define("/modules/vue/vue-validator",n):t.VueValidator=n()}(this,function(){"use strict";function t(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}function i(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function e(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)}function n(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i}function a(t,i){window.console&&(console.warn("[vue-validator] "+t),i&&console.warn(i.stack))}function o(t){if(null===t)return!0;if(Array.isArray(t)){if(t.length>0)return!1;if(0===t.length)return!0}else if(b.Vue.util.isPlainObject(t))for(var i in t)if(b.Vue.util.hasOwn(t,i))return!1;return!0}function s(t,i,e){if(Array.isArray(t))for(var n=0;n<t.length;n++)i.call(e||t[n],t[n],n);else if(b.Vue.util.isPlainObject(t)){var a=b.Vue.util.hasOwn;for(var o in t)a(t,o)&&i.call(e||t[o],t[o],o)}}function r(t,i){var e=b.Vue.util.indexOf(t,i);return~e?t.splice(e,1):null}function l(t,i){var e=document.createEvent("HTMLEvents");e.initEvent(i,!0,!1);try{t.dispatchEvent(e)}catch(e){}}function u(i){if(Array.isArray(i)){if(0!==i.length){for(var e=!0,n=0,a=i.length;a>n&&(e=u(i[n]));n++);return e}return!1}return"number"==typeof i||"function"==typeof i?!0:"boolean"==typeof i?i:"string"==typeof i?i.length>0:null!==i&&"object"===("undefined"==typeof i?"undefined":t(i))?Object.keys(i).length>0:null===i||void 0===i?!1:void 0}function d(t,i){if("string"!=typeof i)return!1;var e=i.match(new RegExp("^/(.*?)/([gimy]*)$"));return e?new RegExp(e[1],e[2]).test(t):!1}function h(t,i){return"string"==typeof t?_(i,10)&&t.length>=parseInt(i,10):Array.isArray(t)?t.length>=parseInt(i,10):!1}function c(t,i){return"string"==typeof t?_(i,10)&&t.length<=parseInt(i,10):Array.isArray(t)?t.length<=parseInt(i,10):!1}function v(t,i){return!isNaN(+t)&&!isNaN(+i)&&+t>=+i}function f(t,i){return!isNaN(+t)&&!isNaN(+i)&&+i>=+t}function _(t){return/^(-?[1-9]\d*|0)$/.test(t)}function p(t){var i=t.util.extend,e=Object.create(null);i(e,w),t.options.validators=e;var n=t.config.optionMergeStrategies;n&&(n.validators=function(t,e){if(!e)return t;if(!t)return e;var n=Object.create(null);i(n,t);for(var a in e)n[a]=e[a];return n}),t.validator=function(i,e){return e?void(t.options.validators[i]=e):t.options.validators[i]}}function m(t){var i=t.prototype._init;t.prototype._init=function(t){this._validatorMaps||(this._validatorMaps=Object.create(null)),i.call(this,t)};var e=t.prototype._destroy;t.prototype._destroy=function(){e.apply(this,arguments),this._validatorMaps=null}}function g(t){var i=t.util,e=t.directive("if"),n=t.FragmentFactory;t.compiler.terminalDirectives.push("validate"),t.directive("validate",{priority:e.priority+1,params:["group","field"],bind:function(){if(this.el.__vue__)return void a('v-validate="'+this.expression+'" cannot be used on an instance root element.');var t=this.vm.$options._validator;return t?(this.model=this.el.getAttribute("v-model"),this.setupFragment(),this.setupValidate(t,this.model),void this.listen()):void a('v-validate need to use into validator element directive: (e.g. <validator name="validator"><input type="text" v-validate:field1="[\'required\']"></validator>).')},update:function(t){t&&(i.isPlainObject(t)?this.handleObject(t):Array.isArray(t)&&this.handleArray(t),this.validator.validate(this.validation))},unbind:function(){this.unlisten(),this.teardownValidate(),this.teardownFragment(),this.model=null},setupValidate:function(t,e){var n=this.params,a=this.validator=this.vm._validatorMaps[t];this.field=i.camelize(this.arg?this.arg:n.field),this.validation=a.manageValidation(this.field,e,this.vm,this.frag.node,this._scope),n.group&&a.addGroupValidation(n.group,this.field)},listen:function(){var t=this.model,e=this.validation,n=this.frag.node;this.onBlur=i.bind(e.listener,e),i.on(n,"blur",this.onBlur),"checkbox"!==n.type&&"radio"!==n.type&&"SELECT"!==n.tagName||t?t||(this.onInput=i.bind(e.listener,e),i.on(n,"input",this.onInput)):(this.onChange=i.bind(e.listener,e),i.on(n,"change",this.onChange))},unlisten:function(){var t=this.frag.node;this.onInput&&(i.off(t,"input",this.onInput),this.onInput=null),this.onChange&&(i.off(t,"change",this.onChange),this.onChange=null),this.onBlur&&(i.off(t,"blur",this.onBlur),this.onBlur=null)},teardownValidate:function(){if(this.validator&&this.validation){var t=this.frag.node;this.params.group&&this.validator.removeGroupValidation(this.params.group,this.field),this.validator.unmanageValidation(this.field,t),this.validator=null,this.validation=null,this.field=null}},setupFragment:function(){this.anchor=i.createAnchor("v-validate"),i.replace(this.el,this.anchor),this.factory=new n(this.vm,this.el),this.frag=this.factory.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)},teardownFragment:function(){this.frag&&(this.frag.remove(),this.frag=null,this.factory=null),i.replace(this.anchor,this.el),this.anchor=null},handleArray:function(t){var i=this;s(t,function(t){i.validation.setValidation(t)},this)},handleObject:function(t){var e=this;s(t,function(t,n){if(i.isPlainObject(t)){if("rule"in t){var a="message"in t?t.message:null;e.validation.setValidation(n,t.rule,a)}}else e.validation.setValidation(n,t)},this)}})}function y(t){var i=t.util,e=t.FragmentFactory,n=t.directive("if"),o=t.util.bind,s=t.util.camelize;t.elementDirective("validator",{params:["name","groups","lazy"],bind:function(){var t=this;if(!this.params.name)return void a("TODO: should be implemented validator:bind name params nothing error");var e=this.validatorName="$"+s(this.params.name);if(!this.vm._validatorMaps)return void a("TODO: should be implemented error message");var n=[];this.params.groups&&(i.isArray(this.params.groups)?n=this.params.groups:i.isPlainObject(this.params.groups)||"string"!=typeof this.params.groups||n.push(this.params.groups));var r=this.validator=new j(e,this,n);r.enableReactive(),r.setupScope(),r.waitFor(o(function(){t.render(r,e),r.validate()},this)),this.params.lazy||this.vm.$activateValidator()},render:function(t,e){this.anchor=i.createAnchor("vue-validator"),i.replace(this.el,this.anchor),this.insert(e)},insert:function(t){i.extend(this.vm.$options,{_validator:t}),this.factory=new e(this.vm,this.el.innerHTML),n.insert.call(this)},unbind:function(){n.unbind.call(this),this.validator.disableReactive(),this.validatorName&&(this.validatorName=null,this.validator=null)}})}function V(t){return arguments.length<=1||void 0===arguments[1]?{}:arguments[1],V.installed?void a("already installed."):(b.Vue=t,p(t),m(t),y(t),void g(t))}var k=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),b={},w=Object.freeze({required:u,pattern:d,minlength:h,maxlength:c,min:v,max:f}),O=function(){function t(e,n,a,o,s,r){i(this,t),this.field=e,this.touched=!1,this.dirty=!1,this.modified=!1,this._model=n,this._validator=r,this._vm=a,this._el=o,this._forScope=s,this._init=this._getValue(o),this._value=o.value,this._validators={}}return k(t,[{key:"_getValue",value:function(t){return t.value}},{key:"_getScope",value:function(){return this._forScope||this._vm}},{key:"manageElement",value:function(t){var i=this,e=b.Vue.util,n=this._getScope(),a=this._model;a&&(t.value=n.$get(a)||"",this._unwatch=n.$watch(a,e.bind(function(e,n){e!==n&&i.handleValidate(t)},this),{deep:!0}))}},{key:"unmanageElement",value:function(){this._unwatch&&this._unwatch()}},{key:"setValidation",value:function(t,i,e){var n=this._validators[t];n||(n=this._validators[t]={},n.name=t),n.arg=i,e&&(n.msg=e)}},{key:"listener",value:function(t){(!t.relatedTarget||"A"!==t.relatedTarget.tagName&&"BUTTON"!==t.relatedTarget.tagName)&&this.handleValidate(t.target,t.type)}},{key:"handleValidate",value:function(t,i){i&&"blur"===i&&(this.touched=!0),!this.dirty&&this._checkModified(t)&&(this.dirty=!0),this.modified=this._checkModified(t),this._validator.validate()}},{key:"_checkModified",value:function(t){return this._init!==this._getValue(t)}},{key:"validate",value:function(){var t=this,i=b.Vue.util,e={},n={},a=!0;s(this._validators,function(o,s){var r=t._resolveValidator(s),l=null,u=null;if(i.isPlainObject(r)?(r.check&&"function"==typeof r.check&&(l=r.check),r.message&&(u=r.message)):"function"==typeof r&&(l=r),o.msg&&(u=o.msg),l){var d=l.call(t._vm,t._getValue(t._el),o.arg);d||(a=!1,u&&(n[s]="function"==typeof u?u.call(t._vm,t.field,o.arg):u)),e[s]=!d}},this),this._fireEvent(this._el,a);var r={valid:a,invalid:!a,touched:this.touched,untouched:!this.touched,dirty:this.dirty,pristine:!this.dirty,modified:this.modified};return o(n)||(r.messages=n),i.extend(e,r),e}},{key:"_fireEvent",value:function(t,i){l(t,i?"valid":"invalid")}},{key:"_resolveValidator",value:function(t){var i=b.Vue.util.resolveAsset;return i(this._vm.$options,"validators",t)}}]),t}(),E=function(t){function a(t,e,o,s,r,l){i(this,a);var u=n(this,Object.getPrototypeOf(a).call(this,t,e,o,s,r,l));return u._multiple=u._el.hasAttribute("multiple"),u}return e(a,t),k(a,[{key:"_getValue",value:function(t){for(var i=[],e=0,n=t.options.length;n>e;e++){var a=t.options[e];!a.disabled&&a.selected&&i.push(a.value)}return i}},{key:"_setOption",value:function(t,i){for(var e=0,n=t.length;n>e;e++)for(var a=t[e],o=0,s=i.options.length;s>o;o++){var r=i.options[o];r.disabled||r.value!==a||r.hasAttribute("selected")&&r.selected||(r.selected=!0)}}},{key:"manageElement",value:function(t){var i=this,e=b.Vue.util,n=this._getScope(),a=this._model;if(a){var o=n.$get(a),s=Array.isArray(o)?o:[o];this._setOption(s,t),this._unwatch=n.$watch(a,e.bind(function(e,n){var a=Array.isArray(e)?e:[e],o=Array.isArray(n)?n:[n];a.slice().sort().toString()!==o.slice().sort().toString()&&i.handleValidate(t)},this))}}},{key:"unmanageElement",value:function(){this._unwatch&&this._unwatch()}},{key:"_checkModified",value:function(t){var i=this._getValue(t).slice().sort();if(this._init.length!==i.length)return!0;var e=this._init.slice().sort();return e.toString()!==i.toString()}}]),a}(O),x=function(a){function o(t,e,a,s,r,l){i(this,o);var u=n(this,Object.getPrototypeOf(o).call(this,t,e,a,s,r,l));return u._inits=[],u}return e(o,a),k(o,[{key:"_addItem",value:function(t){var i={el:t,init:t.checked,value:t.value};return this._inits.push(i),i}},{key:"_setChecked",value:function(t,i,e){i.value===t&&(i.checked=!0,this._init=i.checked,e.init=i.checked,e.value=t)}},{key:"manageElement",value:function(t){var i=this,e=b.Vue.util,n=this._addItem(t),a=this._getScope(),o=n.model=this._model;if(o){var s=a.$get(o);this._setChecked(s,t,n),n.unwatch=a.$watch(o,e.bind(function(e,n){e!==n&&i.handleValidate(t)},this))}else this._validator.validate()}},{key:"unmanageElement",value:function(t){var i=-1;s(this._inits,function(e,n){e.el===t&&(i=n)}),-1!==i&&(this._inits.splice(i,1),this._validator.validate())}},{key:"_getValue",value:function(i){var e=this;if(!this._inits||0===this._inits.length)return i.checked;var n=function(){var t=[];return s(e._inits,function(i){i.el.checked&&t.push(i.el.value)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":t(n))?n.v:void 0}},{key:"_checkModified",value:function(i){var e=this;if(0===this._inits.length)return this._init!==i.checked;var n=function(){var t=!1;return s(e._inits,function(i){t||(t=i.init!==i.el.checked)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":t(n))?n.v:void 0}}]),o}(O),A=function(a){function o(t,e,a,s,r,l){i(this,o);var u=n(this,Object.getPrototypeOf(o).call(this,t,e,a,s,r,l));return u._inits=[],u}return e(o,a),k(o,[{key:"_addItem",value:function(t){var i={el:t,init:t.checked,value:t.value};return this._inits.push(i),i}},{key:"_setChecked",value:function(t,i){for(var e=0,n=t.length;n>e;e++){var a=t[e];i.disabled||i.value!==a||i.checked||(i.checked=!0)}}},{key:"manageElement",value:function(t){var i=this,e=b.Vue.util,n=this._addItem(t),a=this._getScope(),o=n.model=this._model;if(o){var s=a.$get(o);Array.isArray(s)?(this._setChecked(s,n.el),n.unwatch=a.$watch(o,e.bind(function(t,e){t!==e&&i.handleValidate(n.el)},this))):(t.checked=s||!1,this._init=t.checked,n.init=t.checked,n.value=t.value,n.unwatch=a.$watch(o,e.bind(function(e,n){e!==n&&i.handleValidate(t)},this)))}else this._validator.validate()}},{key:"unmanageElement",value:function(t){var i=-1;s(this._inits,function(e,n){e.el===t&&(i=n,e.unwatch&&e.model&&(e.unwatch(),e.unwatch=null,e.model=null))}),-1!==i&&(this._inits.splice(i,1),this._validator.validate())}},{key:"_getValue",value:function(i){var e=this;if(!this._inits||0===this._inits.length)return i.checked;var n=function(){var t=[];return s(e._inits,function(i){i.el.checked&&t.push(i.el.value)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":t(n))?n.v:void 0}},{key:"_checkModified",value:function(i){var e=this;if(0===this._inits.length)return this._init!==i.checked;var n=function(){var t=!1;return s(e._inits,function(i){t||(t=i.init!==i.el.checked)}),{v:t}}();return"object"===("undefined"==typeof n?"undefined":t(n))?n.v:void 0}}]),o}(O),j=function(){function t(e,n,a){var o=this;i(this,t),this.name=e,this._scope={},this._dir=n,this._validations={},this._checkboxValidations={},this._radioValidations={},this._groups=a,this._groupValidations={},s(a,function(t){o._groupValidations[t]=[]},this)}return k(t,[{key:"enableReactive",value:function(){b.Vue.util.defineReactive(this._dir.vm,this.name,this._scope),this._dir.vm._validatorMaps[this.name]=this}},{key:"disableReactive",value:function(){this._dir.vm._validatorMaps[this.name]=null,this._dir.vm[this.name]=null}},{key:"manageValidation",value:function(t,i,e,n,a){var o=null;return o="SELECT"===n.tagName?this._manageSelectValidation(t,i,e,n,a):"checkbox"===n.type?this._manageCheckboxValidation(t,i,e,n,a):"radio"===n.type?this._manageRadioValidation(t,i,e,n,a):this._manageBaseValidation(t,i,e,n,a)}},{key:"unmanageValidation",value:function(t,i){"checkbox"===i.type?this._unmanageCheckboxValidation(t,i):"radio"===i.type?this._unmanageRadioValidation(t,i):"SELECT"===i.tagName?this._unmanageSelectValidation(t,i):this._unmanageBaseValidation(t,i)}},{key:"_manageBaseValidation",value:function(t,i,e,n,a){var o=this._validations[t]=new O(t,i,e,n,a,this);return o.manageElement(n),o}},{key:"_unmanageBaseValidation",value:function(t,i){var e=this._validations[t];e&&(e.unmanageElement(i),b.Vue["delete"](this._scope,t),this._validations[t]=null,delete this._validations[t])}},{key:"_manageCheckboxValidation",value:function(t,i,e,n,a){var o=this._checkboxValidations[t];if(!o){var s=new A(t,i,e,n,a,this);o={validation:s,elements:0},this._checkboxValidations[t]=o}return o.elements++,o.validation.manageElement(n),o.validation}},{key:"_unmanageCheckboxValidation",value:function(t,i){var e=this._checkboxValidations[t];e&&(e.elements--,e.validation.unmanageElement(i),0===e.elements&&(b.Vue["delete"](this._scope,t),this._checkboxValidations[t]=null,delete this._checkboxValidations[t]))}},{key:"_manageRadioValidation",value:function(t,i,e,n,a){var o=this._radioValidations[t];if(!o){var s=new x(t,i,e,n,a,this);o={validation:s,elements:0},this._radioValidations[t]=o}return o.elements++,o.validation.manageElement(n),o.validation}},{key:"_unmanageRadioValidation",value:function(t,i){var e=this._radioValidations[t];e&&(e.elements--,e.validation.unmanageElement(i),0===e.elements&&(b.Vue["delete"](this._scope,t),this._radioValidations[t]=null,delete this._radioValidations[t]))}},{key:"_manageSelectValidation",value:function(t,i,e,n,a){var o=this._validations[t]=new E(t,i,e,n,a,this);return o.manageElement(n),o}},{key:"_unmanageSelectValidation",value:function(t,i){var e=this._validations[t];e&&(e.unmanageElement(i),b.Vue["delete"](this._scope,t),this._validations[t]=null,delete this._validations[t])}},{key:"addGroupValidation",value:function(t,i){var e=b.Vue.util.indexOf,n=this._validations[i]||this._checkboxValidations[i].validation||this._radioValidations[i].validation,a=this._groupValidations[t];a&&(~e(a,n)||a.push(n))}},{key:"removeGroupValidation",value:function(t,i){var e=this._validations[i]||this._checkboxValidations[i].validation||this._radioValidations[i].validation,n=this._groupValidations[t];n&&r(n,e)}},{key:"validate",value:function(){var t=this;s(this._validations,function(i,e){var n=i.validate();b.Vue.set(t._scope,e,n)},this),s(this._checkboxValidations,function(i,e){var n=i.validation.validate();b.Vue.set(t._scope,e,n)},this),s(this._radioValidations,function(i,e){var n=i.validation.validate();b.Vue.set(t._scope,e,n)},this)}},{key:"setupScope",value:function(){var t=this,i=b.Vue.util.bind,e=i(function(){return t.validations},this),n=i(function(){return t._scope},this);this._defineProperties(e,n),s(this._groups,function(i){var e=t._groupValidations[i],n={};b.Vue.set(t._scope,i,n),t._defineProperties(function(){return e},function(){return n})},this)}},{key:"waitFor",value:function(t){var i=this._dir.vm,e="$activateValidator";this._dir.vm[e]=function(){t(),i[e]=null}}},{key:"_defineProperties",value:function(t,i){var e=this,n=b.Vue.util.bind;s({valid:{fn:this._defineValid,arg:t},invalid:{fn:this._defineInvalid,arg:i},touched:{fn:this._defineTouched,arg:t},untouched:{fn:this._defineUntouched,arg:i},modified:{fn:this._defineModified,arg:t},dirty:{fn:this._defineDirty,arg:t},pristine:{fn:this._definePristine,arg:i},messages:{fn:this._defineMessages,arg:t}},function(t,a){Object.defineProperty(i(),a,{enumerable:!0,configurable:!0,get:function(){return n(t.fn,e)(t.arg)}})},this)}},{key:"_walkValidations",value:function(t,i,e){var n=this,a=b.Vue.util.hasOwn,o=e;return s(t,function(t){if(o!==!e&&a(n._scope,t.field)){var s=n._scope[t.field];s&&s[i]===!e&&(o=!e)}},this),o}},{key:"_defineValid",value:function(t){return this._walkValidations(t(),"valid",!0)}},{key:"_defineInvalid",value:function(t){return!t().valid}},{key:"_defineTouched",value:function(t){return this._walkValidations(t(),"touched",!1)}},{key:"_defineUntouched",value:function(t){return!t().touched}},{key:"_defineModified",value:function(t){return this._walkValidations(t(),"modified",!1)}},{key:"_defineDirty",value:function(t){return this._walkValidations(t(),"dirty",!1)}},{key:"_definePristine",value:function(t){return!t().dirty}},{key:"_defineMessages",value:function(t){var i=this,e=b.Vue.util.extend,n=b.Vue.util.hasOwn,a={};return s(t(),function(t){if(n(i._scope,t.field)){var s=i._scope[t.field];s&&!o(s.messages)&&(a[t.field]=e({},s.messages))}},this),o(a)?void 0:a}},{key:"validations",get:function(){var t=b.Vue.util.extend,i={};return t(i,this._validations),s(this._checkboxValidations,function(t,e){i[e]=t.validation},this),s(this._radioValidations,function(t,e){i[e]=t.validation},this),i}}]),t}();return V.version="2.0.0-alpha.16","undefined"!=typeof window&&window.Vue&&window.Vue.use(V),V})});