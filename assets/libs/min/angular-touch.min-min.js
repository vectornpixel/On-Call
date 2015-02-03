!function(n,e,t){"use strict";function o(n,e,t){c.directive(n,["$parse","$swipe",function(o,c){var i=75,a=.3,u=30;return function(r,s,l){function h(n){if(!g)return!1;var t=Math.abs(n.y-g.y);return n=(n.x-g.x)*e,d&&i>t&&n>0&&n>u&&a>t/n}var f=o(l[n]),g,d;c.bind(s,{start:function(n,e){g=n,d=!0},cancel:function(n){d=!1},end:function(n,e){h(n)&&r.$apply(function(){s.triggerHandler(t),f(r,{$event:e})})}})}}])}var c=e.module("ngTouch",[]);c.factory("$swipe",[function(){function n(n){var e=n.touches&&n.touches.length?n.touches:[n];return n=n.changedTouches&&n.changedTouches[0]||n.originalEvent&&n.originalEvent.changedTouches&&n.originalEvent.changedTouches[0]||e[0].originalEvent||e[0],{x:n.clientX,y:n.clientY}}return{bind:function(e,t){var o,c,i,a,u=!1;e.on("touchstart mousedown",function(e){i=n(e),u=!0,c=o=0,a=i,t.start&&t.start(i,e)}),e.on("touchcancel",function(n){u=!1,t.cancel&&t.cancel(n)}),e.on("touchmove mousemove",function(e){if(u&&i){var r=n(e);o+=Math.abs(r.x-a.x),c+=Math.abs(r.y-a.y),a=r,10>o&&10>c||(c>o?(u=!1,t.cancel&&t.cancel(e)):(e.preventDefault(),t.move&&t.move(r,e)))}}),e.on("touchend mouseup",function(e){u&&(u=!1,t.end&&t.end(n(e),e))})}}}]),c.config(["$provide",function(n){n.decorator("ngClickDirective",["$delegate",function(n){return n.shift(),n}])}]),c.directive("ngClick",["$parse","$timeout","$rootElement",function(n,t,o){function c(n,e,t){for(var o=0;o<n.length;o+=2)if(Math.abs(n[o]-e)<r&&Math.abs(n[o+1]-t)<r)return n.splice(o,o+2),!0;return!1}function i(n){if(!(Date.now()-l>u)){var e=n.touches&&n.touches.length?n.touches:[n],t=e[0].clientX,e=e[0].clientY;1>t&&1>e||f&&f[0]===t&&f[1]===e||(f&&(f=null),"label"===n.target.tagName.toLowerCase()&&(f=[t,e]),c(h,t,e)||(n.stopPropagation(),n.preventDefault(),n.target&&n.target.blur()))}}function a(n){n=n.touches&&n.touches.length?n.touches:[n];var e=n[0].clientX,o=n[0].clientY;h.push(e,o),t(function(){for(var n=0;n<h.length;n+=2)if(h[n]==e&&h[n+1]==o){h.splice(n,n+2);break}},u,!1)}var u=2500,r=25,s="ng-click-active",l,h,f;return function(t,u,r){function f(){d=!1,u.removeClass(s)}var g=n(r.ngClick),d=!1,v,p,m,w;u.on("touchstart",function(n){d=!0,v=n.target?n.target:n.srcElement,3==v.nodeType&&(v=v.parentNode),u.addClass(s),p=Date.now(),n=n.touches&&n.touches.length?n.touches:[n],n=n[0].originalEvent||n[0],m=n.clientX,w=n.clientY}),u.on("touchmove",function(n){f()}),u.on("touchcancel",function(n){f()}),u.on("touchend",function(n){var t=Date.now()-p,s=n.changedTouches&&n.changedTouches.length?n.changedTouches:n.touches&&n.touches.length?n.touches:[n],g=s[0].originalEvent||s[0],s=g.clientX,g=g.clientY,b=Math.sqrt(Math.pow(s-m,2)+Math.pow(g-w,2));d&&750>t&&12>b&&(h||(o[0].addEventListener("click",i,!0),o[0].addEventListener("touchstart",a,!0),h=[]),l=Date.now(),c(h,s,g),v&&v.blur(),e.isDefined(r.disabled)&&!1!==r.disabled||u.triggerHandler("click",[n])),f()}),u.onclick=function(n){},u.on("click",function(n,e){t.$apply(function(){g(t,{$event:e||n})})}),u.on("mousedown",function(n){u.addClass(s)}),u.on("mousemove mouseup",function(n){u.removeClass(s)})}}]),o("ngSwipeLeft",-1,"swipeleft"),o("ngSwipeRight",1,"swiperight")}(window,window.angular);