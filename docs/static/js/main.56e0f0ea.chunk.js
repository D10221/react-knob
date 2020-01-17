(this["webpackJsonp@d10221/react-knob-demo"]=this["webpackJsonp@d10221/react-knob-demo"]||[]).push([[0],{13:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(2),o=a(7),i=a(0),l=a.n(i);function c(e){var t={transform:"rotate("+e.rotation+"deg) translateZ("+(e.translateZ||0)+"px)",transformOrigin:"50% 50%"};return l.a.createElement(l.a.Fragment,{},l.a.Children.map(e.children,(function(e){return l.a.isValidElement(e)?l.a.cloneElement(e,{style:Object.assign({},e.props.style,t)}):e})))}function s(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}var u=function(e){var t=e.children,a=e.size;void 0===a&&(a=65);var n=e.className,r=e.style,o=s(e,["children","size","className","style"]);return l.a.createElement("div",Object.assign({},o,{style:Object.assign({},{width:a,height:a},r),className:n}),l.a.Children.map(t,(function(e){if(l.a.isValidElement(e)){var t=e.props,a=t.style,n=s(t,["style"]);return l.a.cloneElement(e,Object.assign({},n,{style:Object.assign({},{touchAction:"none",pointerEvents:"none"},a)}))}return e})))},v={scale:1,cursorPos:[],knobCenter:[],topPosition:0};function m(e,t,a){return(e-t)/(a-t)}function d(){return null}var f=function(e){var t=e.value;void 0===t&&(t=0);var a=e.min;void 0===a&&(a=1);var n=e.max;void 0===n&&(n=100);var r=e.step;void 0===r&&(r=1);var o=e.size;void 0===o&&(o=65);var s=e.bufferSize;void 0===s&&(s=300);var f=e.render,h=e.onChange;void 0===h&&(h=void 0);var p=e.children;void 0===p&&(p=void 0);var g=e.containerProps;void 0===g&&(g=void 0),f=f||d;var b=function(e){var t=Object(i.useState)(v),a=t[1];return{state:t[0],setState:a,start:function(){},move:function(t){var n=t.value;void 0===n&&(n=0);var r=t.cursorPos;void 0===r&&(r=[]);var o=t.knobCenter;void 0===o&&(o=[]);var i=t.scale;void 0===i&&(i=1);var l=t.topPosition;void 0===l&&(l=0),e&&e(n),a({cursorPos:r,knobCenter:o,scale:i,topPosition:l})},done:function(){a({scale:1,cursorPos:[],knobCenter:[],topPosition:0})}}}((function(e){return"function"==typeof h&&e!==t&&h(e)})),y=b.state,E=y.cursorPos,O=y.knobCenter,C=y.scale,N=y.topPosition,x=function(e){var t=e.value;void 0===t&&(t=0);var a=e.min;void 0===a&&(a=0);var n=e.max;void 0===n&&(n=100);var r=e.step;void 0===r&&(r=1);var o=e.onMove,i=e.onUp,l=e.onDown;return function(e){e.preventDefault();var c=e.currentTarget;if(c instanceof HTMLElement){var s=e.clientY,u=c.getBoundingClientRect();"function"==typeof l&&l({clientY:e.clientY,rect:u});var v,d=(v=c)&&v.ownerDocument||document;d.addEventListener("pointermove",f,!1),d.addEventListener("pointerup",(function e(){d.removeEventListener("pointermove",f,!1),d.removeEventListener("pointerup",e,!1),"function"==typeof i&&i()}),!1)}function f(e){e.preventDefault();var i=e.clientX,l=e.clientY,c=Math.abs(i-(u.left+u.width/2))/200+1,v=l-(100*c-m(t,a,n)*(100*c));s<v&&(v=s),s>v+100*c&&(v=s-100*c);var d,f,h,p=(d=(100-100/(100*c)*(s-v))/100*(n-a),void 0===(f=r)&&(f=d),void 0===(h=a)&&(h=d),Math.round(d/f)*f+h);p!==t&&o&&o({value:p,scale:c,cursorPos:[i,l],knobCenter:[u.left+u.width/2,u.top+u.height/2],topPosition:v})}}}({value:t,min:a,max:n,step:r,onMove:b.move,onDown:b.start,onUp:b.done}),w=function(e){var t=e.value;void 0===t&&(t=0);var a=e.min;void 0===a&&(a=0);var n=e.max;void 0===n&&(n=100);var r=e.bufferSize;return void 0===r&&(r=360),m(t,a,n)*r-r/2}({value:t,min:a,max:n,bufferSize:s});return l.a.createElement(u,Object.assign({size:o,onPointerDown:x},g),l.a.createElement(c,{rotation:w},p),l.a.createElement(f,Object.assign({},{cursorPos:E,knobCenter:O,scale:C,topPosition:N,value:t})))},p=function(e){var t=e.topPosition;void 0===t&&(t=0);var a=e.scale;void 0===a&&(a=1);var n=e.knobCenter;void 0===n&&(n=[]);var r=e.cursorPos;void 0===r&&(r=[]);var o=e.className,i=e.lineClassName,c=e.style,s=e.lineStyle,u=e.baseHight;void 0===u&&(u=100);var v=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}(e,["topPosition","scale","knobCenter","cursorPos","className","lineClassName","style","lineStyle","baseHight"]);if(!t)return null;var m,d,f=(m=r[0]-n[0],d=r[1]-n[1],{distance:Math.sqrt(m*m+d*d),degrees:Math.atan2(d,m)*(180/Math.PI)}),h=function(e){var t=e.style;void 0===t&&(t=void 0);var a=e.lineStyle;void 0===a&&(a=void 0);var n=e.knobCenter;void 0===n&&(n=[]);var r=e.cursorPos;void 0===r&&(r=[]);var o=e.degrees;void 0===o&&(o=0);var i=e.topPosition;void 0===i&&(i=0);var l=e.distance;void 0===l&&(l=0);var c=e.verticalLineScale;void 0===c&&(c=0);var s=Object.assign({},{position:"absolute",top:0,left:0,width:1,height:1},a);return{knobPath:Object.assign({},s,{opacity:.5,transformOrigin:"left center",transform:"translateX("+n[0]+"px) translateY("+n[1]+"px) translateZ(0) rotate("+o+"deg) scaleX("+l+")"}),bodyPath:Object.assign({},s,{transformOrigin:"center top",transform:"translateX("+r[0]+"px) translateY("+i+"px) translateZ(0) scaleY("+c+")"}),topPath:Object.assign({},s,{transform:"translateX("+r[0]+"px) translateY("+i+"px) translateZ(0) scaleX(12)"}),centerPath:Object.assign({},s,{transform:"translateX("+r[0]+"px) translateY("+(i+c/2)+"px) translateZ(0) scaleX(12)"}),bottomPath:Object.assign({},s,{transform:"translateX("+r[0]+"px) translateY("+(i+c)+"px) translateZ(0) scaleX(12)"}),overlay:Object.assign({},{position:"fixed",zIndex:100,top:0,left:0,width:window.innerWidth,height:window.innerHeight,cursor:"ns-resize",touchAction:"none",pointerEvents:"none"},t)}}({style:c,lineStyle:s,distance:f.distance,degrees:f.degrees,cursorPos:r,topPosition:t,verticalLineScale:u*a,knobCenter:n});return l.a.createElement("div",Object.assign({className:o,style:h.overlay},v),l.a.createElement("div",{className:i,style:h.knobPath}),l.a.createElement("div",{className:i,style:h.bodyPath}),l.a.createElement("div",{className:i,style:h.topPath}),l.a.createElement("div",{className:i,style:h.centerPath}),l.a.createElement("div",{className:i,style:h.bottomPath}))};function g(e,t){return function(e){var t=document.createElement("style");return t.innerHTML=e,document.head.appendChild(t),function(){document.head.removeChild(t)}}("."+t+" {"+e+"}")}for(var b="",y=65;y<=90;y++)b+=String.fromCharCode(y);for(var E="",O=97;O<=122;O++)E+=String.fromCharCode(O);for(var C="",N=0;N<=9;N++)C+=""+N;var x={chars:b+E+C};function w(e){return e.charAt(Math.floor(Math.random()*e.length))}function k(e,t){var a;return void 0===t&&(void 0===a&&(a=10),t=function e(t){return t.length>=a?t:e(t+w(x.chars))}(w(b+E))),Object(i.useEffect)((function(){return g(e,t)}),[e,t]),t}for(var j="",P=65;P<=90;P++)j+=String.fromCharCode(P);for(var S="",z=97;z<=122;z++)S+=String.fromCharCode(z);for(var M="",A=0;A<=9;A++)M+=""+A;var F={chars:j+S+M};function D(e){return e.charAt(Math.floor(Math.random()*e.length))}function B(e){return void 0===e&&(e=10),function t(a){return a.length>=e?a:t(a+D(F.chars))}(D(j+S))}function X(){for(var e=arguments,t=[],a=arguments.length;a--;)t[a]=e[a];return t&&t.filter(Boolean).join(" ")}function L(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}var Y=B(),Z=function(e){var t=e.children,a=e.className,n=e.borderColor;void 0===n&&(n="black");var r=e.color;void 0===r&&(r="#f37d02");var o=L(e,["children","className","borderColor","color"]);return l.a.createElement("div",Object.assign({className:X(a,k("\n      position: relative;\n      width: 85%;\n      height: 85%;\n      border-radius: 50%;\n      border: solid "+n+" 5px;  \n      background-color: "+r+";\n      margin:0;\n      padding: 0;\n      overflow: hidden;\n      ",Y))},o),t)},T=B(),H=function(e){var t=e.children,a=e.className,n=e.color;void 0===n&&(n="black");var r=L(e,["children","className","color"]);return l.a.createElement("div",Object.assign({className:X(a,k("\n      position: relative;\n      width: 10%;\n      height: 45%;\n      background-color: "+n+";\n      top: -5%;\n      left: 50%;\n      transform: translateX(-50%);  \n      margin:0;\n      padding: 0;\n      ",T))},r),t)},I=function(e){var t=e.color,a=e.borderColor,n=e.circleClass,r=e.dialClass,o=L(e,["color","borderColor","circleClass","dialClass"]);return l.a.createElement(Z,Object.assign({},o,{color:t,borderColor:a,className:n}),l.a.createElement(H,{color:a,className:r}))},R=a(1),V=a(4);function J(e,t){return function(e){var t=document.createElement("style");return t.innerHTML=e,document.head.appendChild(t),function(){document.head.removeChild(t)}}("."+t+" {"+e+"}")}for(var U="",W=65;W<=90;W++)U+=String.fromCharCode(W);for(var q="",K=97;K<=122;K++)q+=String.fromCharCode(K);for(var $="",G=0;G<=9;G++)$+=""+G;var Q={chars:U+q+$};function _(e){return e.charAt(Math.floor(Math.random()*e.length))}var ee=function(e,t){var a;return void 0===t&&(void 0===a&&(a=10),t=function e(t){return t.length>=a?t:e(t+_(Q.chars))}(_(U+q))),Object(i.useEffect)((function(){return J(e,t)}),[e,t]),t};for(var te="",ae=65;ae<=90;ae++)te+=String.fromCharCode(ae);for(var ne="",re=97;re<=122;re++)ne+=String.fromCharCode(re);for(var oe="",ie=0;ie<=9;ie++)oe+=""+ie;var le={chars:te+ne+oe};function ce(e){return e.charAt(Math.floor(Math.random()*e.length))}function se(e){return void 0===e&&(e=10),function t(a){return a.length>=e?a:t(a+ce(le.chars))}(ce(te+ne))}function ue(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return e&&e.filter(Boolean).join(" ")}var ve=function(e){var t={transform:"rotate("+e.rotation+"deg) translateZ("+(e.translateZ||0)+"px)",transformOrigin:"50% 50%"};return l.a.createElement(l.a.Fragment,{},l.a.Children.map(e.children,(function(e){return l.a.isValidElement(e)?l.a.cloneElement(e,{style:Object.assign({},e.props.style,t)}):e})))};function me(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function de(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?me(Object(a),!0).forEach((function(t){Object(R.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):me(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var fe={outter:void 0,inner:void 0,labels:void 0},he={outter:void 0,inner:void 0,labels:void 0},pe=se(),ge=se(),be=se(),ye=function(e){var t=e.className,a=e.bufferSize,n=void 0===a?300:a,r=e.style,o=e.styles,i=void 0===o?he:o,c=e.classes,s=void 0===c?fe:c,u=Object(V.a)(e,["className","bufferSize","style","styles","classes"]);return ee("fill: black",pe),ee("fill: darkgrey",ge),ee("    \n    stroke: whitesmoke;\n    font-size: .8rem;\n    ",be),l.a.createElement("svg",Object.assign({className:t,viewBox:"0 0 100 100",focusable:"false",style:de({},r,{touchAction:"none"})},u),l.a.createElement("g",null,l.a.createElement("circle",{cx:"50%",cy:"50%",r:"47%",className:ue(pe,s.outter),style:de({},i.outter)}),l.a.createElement("circle",{cx:"50%",cy:"50%",r:"25%",className:ue(ge,s.inner),style:de({},i.inner)}),l.a.createElement(Ce,{rotation:n,labels:Ee,y:"12.5",className:ue(be,s.labels),style:de({},i.labels)})))},Ee=[0,1,2,3,4,5,6,7,8,9,10],Oe=function(e){var t=e.children,a=Object(V.a)(e,["children"]);return l.a.createElement("svg",{viewBox:"0 0 100 100",style:{pointerEvents:"none",touchAction:"none"}},l.a.createElement("text",Object.assign({dominantBaseline:"middle",textAnchor:"middle"},a),t))},Ce=function(e){var t=e.labels,a=e.rotation,n=e.id,o=Object(V.a)(e,["labels","rotation","id"]);t=t&&t.length?t:[];var c,s,u=(c=a/(t.length-1),s=2,parseFloat(c.toFixed(s))),v=Object(i.useState)([]),m=Object(r.a)(v,2),d=m[0],f=m[1];return d.length||requestAnimationFrame((function(){f(t.map((function(e,t){return l.a.createElement(ve,{rotation:t*u*-1,key:"".concat(n,"-label-").concat(t)},l.a.createElement(Oe,Object.assign({id:"".concat(n,"-label-").concat(t),x:"50%",y:"10%"},o,{children:e})))})))})),d};function Ne(e,t){return function(e){var t=document.createElement("style");return t.innerHTML=e,document.head.appendChild(t),function(){document.head.removeChild(t)}}("."+t+" {"+e+"}")}for(var xe="",we=65;we<=90;we++)xe+=String.fromCharCode(we);for(var ke="",je=97;je<=122;je++)ke+=String.fromCharCode(je);for(var Pe="",Se=0;Se<=9;Se++)Pe+=""+Se;var ze={chars:xe+ke+Pe};function Me(e){return e.charAt(Math.floor(Math.random()*e.length))}function Ae(e,t){var a;return void 0===t&&(void 0===a&&(a=10),t=function e(t){return t.length>=a?t:e(t+Me(ze.chars))}(Me(xe+ke))),Object(i.useEffect)((function(){return Ne(e,t)}),[e,t]),t}for(var Fe="",De=65;De<=90;De++)Fe+=String.fromCharCode(De);for(var Be="",Xe=97;Xe<=122;Xe++)Be+=String.fromCharCode(Xe);for(var Le="",Ye=0;Ye<=9;Ye++)Le+=""+Ye;var Ze={chars:Fe+Be+Le};function Te(e){return e.charAt(Math.floor(Math.random()*e.length))}function He(e){return void 0===e&&(e=10),function t(a){return a.length>=e?a:t(a+Te(Ze.chars))}(Te(Fe+Be))}function Ie(){for(var e=arguments,t=[],a=arguments.length;a--;)t[a]=e[a];return t&&t.filter(Boolean).join(" ")}var Re=He(),Ve=He(),Je={circle:void 0,dial:void 0},Ue={circle:void 0,dial:void 0},We=function(e){var t=e.className,a=e.style,n=e.styles;void 0===n&&(n=Je);var r=e.classes;void 0===r&&(r=Ue);var o=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(a[n]=e[n]);return a}(e,["className","style","styles","classes"]);return Ae("fill: #f37d02; stroke: black; stroke-width: 5%",Re),Ae("width: 8%;height: 35%; fill: black;",Ve),h("svg",Object.assign({},{viewBox:"0 0 100 100",focusable:"false",className:t,style:Object.assign({},a,{touchAction:"none"})},o),h("circle",{cx:"50%",cy:"50%",r:"47%",className:Ie(Re,r.dial),style:n.circle}),h("rect",{x:"48%",y:"4%",className:Ie(Ve,r.dial),style:n.dial}))},qe=a(3),Ke=a.n(qe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));window.h=l.a.createElement;var $e=Object(i.memo)((function(e){return l.a.createElement(p,Object.assign({},e,{lineClassName:"overlay-line"}))}));function Ge(e,t){return parseFloat(e.toFixed(t))}var Qe=function(e){var t=e.label,a=void 0===t?"":t,n=e.value,r=void 0===n?"":n,o=e.className,i=void 0===o?"icon":o;return l.a.createElement("span",{className:i,role:"img","aria-label":a||"","aria-hidden":!Boolean(a)},r)},_e=function(){return l.a.createElement("div",{style:{flex:"1 0"}})},et=[{key:"css:1",display:"css"},{key:"css:2",display:"css custom"},{key:"svg:0",display:"svg fancy"},{key:"svg:1",display:"svg simple"},{key:"svg:2",display:"svg custom #1"},{key:"svg:3",display:"svg custom #2"}];var tt={value:0,dialogOpen:!1,size:65,overlay:!0,skin:"svg:1",bufferSize:300,step:1,min:0,max:100};Ke.a.render(l.a.createElement((function(){var e=Object(i.useState)(tt),t=Object(r.a)(e,2),a=t[0],c=a.value,s=a.dialogOpen,u=a.size,v=a.overlay,m=a.skin,d=a.bufferSize,h=a.step,p=a.min,g=a.max,b=t[1];function y(e){b(Object(n.a)({value:c,dialogOpen:s,size:u,overlay:v,skin:m,bufferSize:d,step:h,min:p,max:g},e))}function E(e){return!isNaN(e)&&e>=p&&e<=g}function O(e){E(e)&&y({value:e})}function C(){y({dialogOpen:!1})}return l.a.createElement(l.a.Fragment,null,l.a.createElement("header",null,l.a.createElement("a",{"aria-label":"project home",href:"https://github.com/D10221/react-knob"},"React Knob")),l.a.createElement("main",null,l.a.createElement(f,{value:c,onChange:O,size:u,min:p,max:g,step:h,bufferSize:d,render:v?$e:void 0},function(e){var t=e.skin,a=void 0===t?"svg:1":t,n=e.bufferSize,r=void 0===n?300:n;switch(a){case"css:1":return l.a.createElement(I,null);case"css:2":return l.a.createElement(I,{circleClass:"knob-circle"});case"svg:0":return l.a.createElement(ye,{bufferSize:r,classes:{},styles:{labels:{}}});case"svg:1":return l.a.createElement(We,null);case"svg:2":return l.a.createElement(We,{styles:{dial:{fill:"white"}}});case"svg:3":return l.a.createElement(We,{classes:{dial:"red-dial"}});default:return null}}({skin:m,bufferSize:d})),l.a.createElement("div",{className:"row margin-1 align-center"},l.a.createElement("button",{className:"color-extra-20 clear",onClick:function(){var e=c-h;E(e)&&y({value:e})}},l.a.createElement(Qe,{value:"\u25c0"})),l.a.createElement("input",{id:"value-input",type:"number",value:c,onChange:function(e){O(e.target.valueAsNumber)},min:p,max:g,step:h,style:{width:"".concat(.7*u,"px")}}),l.a.createElement("button",{className:"color-extra-20 clear",onClick:function(){var e=c+h;E(e)&&y({value:e})}},l.a.createElement(Qe,{value:"\u25b6"})))),l.a.createElement("footer",null,l.a.createElement("div",null,l.a.createElement(Qe,{value:"\ud83d\udcac",label:"Feedback"}),l.a.createElement("a",{href:"https://github.com/D10221/react-knob/issues"},"Feedback"))),l.a.createElement("div",{className:"settings"},l.a.createElement("button",{className:"clear",onClick:function(e){e.preventDefault(),y({dialogOpen:!s})}},l.a.createElement(Qe,{value:"\u2699",label:"Settings",className:"icon xx-large"}))),l.a.createElement(o.a,{onClickAway:C},l.a.createElement("dialog",{open:s,className:s?"open":""},l.a.createElement("div",{className:"column"},l.a.createElement("div",{className:"row space-between no-margin no-padding"},l.a.createElement(_e,null),l.a.createElement("button",{onClick:C,className:"clear color-extra-20"},l.a.createElement(Qe,{value:"\u2716"}))),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"fixed",htmlFor:"size-input-range"},"Size"),l.a.createElement("input",{id:"size-input-range",type:"range",min:25,max:250,value:u,onChange:function(e){y({size:e.target.valueAsNumber})}})),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"fixed",htmlFor:"Overlay"},"Overlay"),l.a.createElement("input",{type:"checkbox",checked:v,onChange:function(e){y({overlay:e.target.checked})}}),l.a.createElement("div",{style:{flex:"1 0"}})),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"fixed"},"Skin"),l.a.createElement("select",{onChange:function(e){y({skin:e.currentTarget.value})},value:m},et.map((function(e){return l.a.createElement("option",{key:"options-select-skin-option-".concat(e.key),value:e.key},e.display)}))),l.a.createElement("div",{style:{flex:"1 0"}})),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"row fixed"},"Step"),l.a.createElement("input",{id:"step-range",type:"range",min:.5,max:Ge(g/4),step:.5,value:h,onChange:function(e){return y({step:e.target.valueAsNumber})}}))),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"row fixed",htmlFor:"size-input-range"},"Min"),l.a.createElement("input",{id:"min-range",type:"range",min:0,max:Ge(g/4),step:1,value:p,onChange:function(e){return y({min:e.target.valueAsNumber})}})),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"row fixed",htmlFor:"size-input-range"},"Max"),l.a.createElement("input",{id:"max-range",type:"range",min:Ge(g/4),max:1e3,step:1,value:g,onChange:function(e){return y({max:e.target.valueAsNumber})}})),l.a.createElement("div",{className:"row space-between"},l.a.createElement("label",{className:"row fixed",htmlFor:"size-input-range"},"Buffer Size"),l.a.createElement("input",{id:"buffer-size-range",type:"range",min:100,max:360,step:1,value:d,onChange:function(e){return y({bufferSize:e.target.valueAsNumber})}})),l.a.createElement("pre",null,JSON.stringify({SIZE:u,OVERLAY:v,SKIN:m,STEP:h,MIN:p,MAX:g,"BUFFER SIZE":d},null,2).replace(/({|}|,|")/gi,"")),l.a.createElement("div",{className:"row",style:{justifyContent:"flex-end"}},l.a.createElement("button",{className:"clear color-extra-20 border-thin-solid-color-extra-20",onClick:function(){y(tt)}},l.a.createElement(Qe,{value:"RESET"}))))))}),null),document.body),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,a){e.exports=a(13)}},[[8,1,2]]]);
//# sourceMappingURL=main.56e0f0ea.chunk.js.map