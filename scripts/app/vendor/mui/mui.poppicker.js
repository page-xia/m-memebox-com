!function(e,i){e.dom=function(t){return"string"!=typeof t?t instanceof Array||t[0]&&t.length?[].slice.call(t):[t]:(e.__create_dom_div__||(e.__create_dom_div__=i.createElement("div")),e.__create_dom_div__.innerHTML=t,[].slice.call(e.__create_dom_div__.childNodes))};{var t='<div class="mui-poppicker">		<div class="mui-poppicker-header">			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>			<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>			<div class="mui-poppicker-clear"></div>		</div>		<div class="mui-poppicker-body">		</div>	</div>',c='<div class="mui-picker">		<div class="mui-picker-inner">			<div class="mui-pciker-rule mui-pciker-rule-ft"></div>			<ul class="mui-pciker-list">			</ul>			<div class="mui-pciker-rule mui-pciker-rule-bg"></div>		</div>	</div>';e.PopPicker=e.Class.extend({init:function(c){var a=this;a.options=c||{},a.options.buttons=a.options.buttons||["取消","确定"],a.panel=e.dom(t)[0],i.body.appendChild(a.panel),a.ok=a.panel.querySelector(".mui-poppicker-btn-ok"),a.cancel=a.panel.querySelector(".mui-poppicker-btn-cancel"),a.body=a.panel.querySelector(".mui-poppicker-body"),a.mask=e.createMask(),a.cancel.innerText=a.options.buttons[0],a.ok.innerText=a.options.buttons[1],a.cancel.addEventListener("tap",function(){a.hide()},!1),a.ok.addEventListener("tap",function(){if(a.callback){var e=a.callback(a.getSelectedItems());e!==!1&&a.hide()}},!1),a.mask[0].addEventListener("tap",function(){a.hide()},!1),a._createPicker(),a.panel.addEventListener("touchstart",function(e){e.preventDefault()},!1),a.panel.addEventListener("touchmove",function(e){e.preventDefault()},!1)},_createPicker:function(){var i=this,t=i.options.layer||1,a=100/t+"%";i.pickers=[];for(var n=1;t>=n;n++){var s=e.dom(c)[0];s.style.width=a,i.body.appendChild(s);var r=e(s).picker();i.pickers.push(r),s.addEventListener("change",function(e){var i=this.nextSibling;if(i&&i.picker){var t=e.detail||{},c=t.item||{};i.picker.setItems(c.children)}},!1)}},setData:function(e){var i=this;e=e||[],i.pickers[0].setItems(e)},getSelectedItems:function(){var e=this,i=[];for(var t in e.pickers){var c=e.pickers[t];i.push(c.getSelectedItem()||{})}return i},show:function(t){var c=this;c.callback=t,c.mask.show(),i.body.classList.add(e.className("poppicker-active-for-page")),c.panel.classList.add(e.className("active")),c.__back=e.back,e.back=function(){c.hide()}},hide:function(){var t=this;t.disposed||(t.panel.classList.remove(e.className("active")),t.mask.close(),i.body.classList.remove(e.className("poppicker-active-for-page")),e.back=t.__back)},dispose:function(){var e=this;e.hide(),setTimeout(function(){e.panel.parentNode.removeChild(e.panel);for(var i in e)e[i]=null,delete e[i];e.disposed=!0},300)}})}}(mui,document);