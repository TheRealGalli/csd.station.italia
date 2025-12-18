var Bh=t=>{throw TypeError(t)};var Rc=(t,e,n)=>e.has(t)||Bh("Cannot "+n);var ke=(t,e,n)=>(Rc(t,e,"read from private field"),n?n.call(t):e.get(t)),en=(t,e,n)=>e.has(t)?Bh("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),tn=(t,e,n,i)=>(Rc(t,e,"write to private field"),i?i.call(t,n):e.set(t,n),n),Mt=(t,e,n)=>(Rc(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();var o0={exports:{}},ac={},s0={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var us=Symbol.for("react.element"),mv=Symbol.for("react.portal"),xv=Symbol.for("react.fragment"),gv=Symbol.for("react.strict_mode"),vv=Symbol.for("react.profiler"),_v=Symbol.for("react.provider"),yv=Symbol.for("react.context"),Sv=Symbol.for("react.forward_ref"),Mv=Symbol.for("react.suspense"),bv=Symbol.for("react.memo"),Av=Symbol.for("react.lazy"),Gh=Symbol.iterator;function Ev(t){return t===null||typeof t!="object"?null:(t=Gh&&t[Gh]||t["@@iterator"],typeof t=="function"?t:null)}var l0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},c0=Object.assign,u0={};function Za(t,e,n){this.props=t,this.context=e,this.refs=u0,this.updater=n||l0}Za.prototype.isReactComponent={};Za.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Za.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function d0(){}d0.prototype=Za.prototype;function bf(t,e,n){this.props=t,this.context=e,this.refs=u0,this.updater=n||l0}var Af=bf.prototype=new d0;Af.constructor=bf;c0(Af,Za.prototype);Af.isPureReactComponent=!0;var Vh=Array.isArray,f0=Object.prototype.hasOwnProperty,Ef={current:null},h0={key:!0,ref:!0,__self:!0,__source:!0};function p0(t,e,n){var i,r={},a=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(a=""+e.key),e)f0.call(e,i)&&!h0.hasOwnProperty(i)&&(r[i]=e[i]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in s=t.defaultProps,s)r[i]===void 0&&(r[i]=s[i]);return{$$typeof:us,type:t,key:a,ref:o,props:r,_owner:Ef.current}}function Cv(t,e){return{$$typeof:us,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Cf(t){return typeof t=="object"&&t!==null&&t.$$typeof===us}function wv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Hh=/\/+/g;function Nc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wv(""+t.key):e.toString(36)}function dl(t,e,n,i,r){var a=typeof t;(a==="undefined"||a==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case us:case mv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Nc(o,0):i,Vh(r)?(n="",t!=null&&(n=t.replace(Hh,"$&/")+"/"),dl(r,e,n,"",function(c){return c})):r!=null&&(Cf(r)&&(r=Cv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Hh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Vh(t))for(var s=0;s<t.length;s++){a=t[s];var l=i+Nc(a,s);o+=dl(a,e,n,l,r)}else if(l=Ev(t),typeof l=="function")for(t=l.call(t),s=0;!(a=t.next()).done;)a=a.value,l=i+Nc(a,s++),o+=dl(a,e,n,l,r);else if(a==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function _s(t,e,n){if(t==null)return t;var i=[],r=0;return dl(t,i,"","",function(a){return e.call(n,a,r++)}),i}function Tv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var cn={current:null},fl={transition:null},Rv={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:fl,ReactCurrentOwner:Ef};function m0(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:_s,forEach:function(t,e,n){_s(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return _s(t,function(){e++}),e},toArray:function(t){return _s(t,function(e){return e})||[]},only:function(t){if(!Cf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};je.Component=Za;je.Fragment=xv;je.Profiler=vv;je.PureComponent=bf;je.StrictMode=gv;je.Suspense=Mv;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rv;je.act=m0;je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=c0({},t.props),r=t.key,a=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(a=e.ref,o=Ef.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(l in e)f0.call(e,l)&&!h0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&s!==void 0?s[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}return{$$typeof:us,type:t.type,key:r,ref:a,props:i,_owner:o}};je.createContext=function(t){return t={$$typeof:yv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:_v,_context:t},t.Consumer=t};je.createElement=p0;je.createFactory=function(t){var e=p0.bind(null,t);return e.type=t,e};je.createRef=function(){return{current:null}};je.forwardRef=function(t){return{$$typeof:Sv,render:t}};je.isValidElement=Cf;je.lazy=function(t){return{$$typeof:Av,_payload:{_status:-1,_result:t},_init:Tv}};je.memo=function(t,e){return{$$typeof:bv,type:t,compare:e===void 0?null:e}};je.startTransition=function(t){var e=fl.transition;fl.transition={};try{t()}finally{fl.transition=e}};je.unstable_act=m0;je.useCallback=function(t,e){return cn.current.useCallback(t,e)};je.useContext=function(t){return cn.current.useContext(t)};je.useDebugValue=function(){};je.useDeferredValue=function(t){return cn.current.useDeferredValue(t)};je.useEffect=function(t,e){return cn.current.useEffect(t,e)};je.useId=function(){return cn.current.useId()};je.useImperativeHandle=function(t,e,n){return cn.current.useImperativeHandle(t,e,n)};je.useInsertionEffect=function(t,e){return cn.current.useInsertionEffect(t,e)};je.useLayoutEffect=function(t,e){return cn.current.useLayoutEffect(t,e)};je.useMemo=function(t,e){return cn.current.useMemo(t,e)};je.useReducer=function(t,e,n){return cn.current.useReducer(t,e,n)};je.useRef=function(t){return cn.current.useRef(t)};je.useState=function(t){return cn.current.useState(t)};je.useSyncExternalStore=function(t,e,n){return cn.current.useSyncExternalStore(t,e,n)};je.useTransition=function(){return cn.current.useTransition()};je.version="18.3.1";s0.exports=je;var Ke=s0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nv=Ke,Pv=Symbol.for("react.element"),Lv=Symbol.for("react.fragment"),Iv=Object.prototype.hasOwnProperty,Dv=Nv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zv={key:!0,ref:!0,__self:!0,__source:!0};function x0(t,e,n){var i,r={},a=null,o=null;n!==void 0&&(a=""+n),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Iv.call(e,i)&&!zv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Pv,type:t,key:a,ref:o,props:r,_owner:Dv.current}}ac.Fragment=Lv;ac.jsx=x0;ac.jsxs=x0;o0.exports=ac;var d=o0.exports,g0={exports:{}},Rn={},v0={exports:{}},_0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,H){var $=I.length;I.push(H);e:for(;0<$;){var ae=$-1>>>1,Me=I[ae];if(0<r(Me,H))I[ae]=H,I[$]=Me,$=ae;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var H=I[0],$=I.pop();if($!==H){I[0]=$;e:for(var ae=0,Me=I.length,Je=Me>>>1;ae<Je;){var Qe=2*(ae+1)-1,rt=I[Qe],q=Qe+1,Q=I[q];if(0>r(rt,$))q<Me&&0>r(Q,rt)?(I[ae]=Q,I[q]=$,ae=q):(I[ae]=rt,I[Qe]=$,ae=Qe);else if(q<Me&&0>r(Q,$))I[ae]=Q,I[q]=$,ae=q;else break e}}return H}function r(I,H){var $=I.sortIndex-H.sortIndex;return $!==0?$:I.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;t.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var l=[],c=[],f=1,p=null,h=3,m=!1,_=!1,y=!1,x=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(I){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=I)i(c),H.sortIndex=H.expirationTime,e(l,H);else break;H=n(c)}}function b(I){if(y=!1,v(I),!_)if(n(l)!==null)_=!0,j(T);else{var H=n(c);H!==null&&J(b,H.startTime-I)}}function T(I,H){_=!1,y&&(y=!1,u(L),L=-1),m=!0;var $=h;try{for(v(H),p=n(l);p!==null&&(!(p.expirationTime>H)||I&&!N());){var ae=p.callback;if(typeof ae=="function"){p.callback=null,h=p.priorityLevel;var Me=ae(p.expirationTime<=H);H=t.unstable_now(),typeof Me=="function"?p.callback=Me:p===n(l)&&i(l),v(H)}else i(l);p=n(l)}if(p!==null)var Je=!0;else{var Qe=n(c);Qe!==null&&J(b,Qe.startTime-H),Je=!1}return Je}finally{p=null,h=$,m=!1}}var E=!1,w=null,L=-1,C=5,M=-1;function N(){return!(t.unstable_now()-M<C)}function z(){if(w!==null){var I=t.unstable_now();M=I;var H=!0;try{H=w(!0,I)}finally{H?B():(E=!1,w=null)}}else E=!1}var B;if(typeof g=="function")B=function(){g(z)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,W=Y.port2;Y.port1.onmessage=z,B=function(){W.postMessage(null)}}else B=function(){x(z,0)};function j(I){w=I,E||(E=!0,B())}function J(I,H){L=x(function(){I(t.unstable_now())},H)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){_||m||(_=!0,j(T))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(h){case 1:case 2:case 3:var H=3;break;default:H=h}var $=h;h=H;try{return I()}finally{h=$}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,H){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var $=h;h=I;try{return H()}finally{h=$}},t.unstable_scheduleCallback=function(I,H,$){var ae=t.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?ae+$:ae):$=ae,I){case 1:var Me=-1;break;case 2:Me=250;break;case 5:Me=1073741823;break;case 4:Me=1e4;break;default:Me=5e3}return Me=$+Me,I={id:f++,callback:H,priorityLevel:I,startTime:$,expirationTime:Me,sortIndex:-1},$>ae?(I.sortIndex=$,e(c,I),n(l)===null&&I===n(c)&&(y?(u(L),L=-1):y=!0,J(b,$-ae))):(I.sortIndex=Me,e(l,I),_||m||(_=!0,j(T))),I},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(I){var H=h;return function(){var $=h;h=H;try{return I.apply(this,arguments)}finally{h=$}}}})(_0);v0.exports=_0;var Uv=v0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fv=Ke,Tn=Uv;function ne(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var y0=new Set,Bo={};function Wr(t,e){ka(t,e),ka(t+"Capture",e)}function ka(t,e){for(Bo[t]=e,t=0;t<e.length;t++)y0.add(e[t])}var Pi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=Object.prototype.hasOwnProperty,Ov=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jh={},Wh={};function kv(t){return zu.call(Wh,t)?!0:zu.call(jh,t)?!1:Ov.test(t)?Wh[t]=!0:(jh[t]=!0,!1)}function Bv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Gv(t,e,n,i){if(e===null||typeof e>"u"||Bv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function un(t,e,n,i,r,a,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=a,this.removeEmptyString=o}var Wt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Wt[t]=new un(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Wt[e]=new un(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Wt[t]=new un(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Wt[t]=new un(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Wt[t]=new un(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Wt[t]=new un(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Wt[t]=new un(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Wt[t]=new un(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Wt[t]=new un(t,5,!1,t.toLowerCase(),null,!1,!1)});var wf=/[\-:]([a-z])/g;function Tf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(wf,Tf);Wt[e]=new un(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(wf,Tf);Wt[e]=new un(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(wf,Tf);Wt[e]=new un(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Wt[t]=new un(t,1,!1,t.toLowerCase(),null,!1,!1)});Wt.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Wt[t]=new un(t,1,!1,t.toLowerCase(),null,!0,!0)});function Rf(t,e,n,i){var r=Wt.hasOwnProperty(e)?Wt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Gv(e,n,r,i)&&(n=null),i||r===null?kv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ui=Fv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ys=Symbol.for("react.element"),ma=Symbol.for("react.portal"),xa=Symbol.for("react.fragment"),Nf=Symbol.for("react.strict_mode"),Uu=Symbol.for("react.profiler"),S0=Symbol.for("react.provider"),M0=Symbol.for("react.context"),Pf=Symbol.for("react.forward_ref"),Fu=Symbol.for("react.suspense"),Ou=Symbol.for("react.suspense_list"),Lf=Symbol.for("react.memo"),Xi=Symbol.for("react.lazy"),b0=Symbol.for("react.offscreen"),Xh=Symbol.iterator;function so(t){return t===null||typeof t!="object"?null:(t=Xh&&t[Xh]||t["@@iterator"],typeof t=="function"?t:null)}var Et=Object.assign,Pc;function Ao(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var Lc=!1;function Ic(t,e){if(!t||Lc)return"";Lc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),a=i.stack.split(`
`),o=r.length-1,s=a.length-1;1<=o&&0<=s&&r[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(r[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||r[o]!==a[s]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=s);break}}}finally{Lc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ao(t):""}function Vv(t){switch(t.tag){case 5:return Ao(t.type);case 16:return Ao("Lazy");case 13:return Ao("Suspense");case 19:return Ao("SuspenseList");case 0:case 2:case 15:return t=Ic(t.type,!1),t;case 11:return t=Ic(t.type.render,!1),t;case 1:return t=Ic(t.type,!0),t;default:return""}}function ku(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case xa:return"Fragment";case ma:return"Portal";case Uu:return"Profiler";case Nf:return"StrictMode";case Fu:return"Suspense";case Ou:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case M0:return(t.displayName||"Context")+".Consumer";case S0:return(t._context.displayName||"Context")+".Provider";case Pf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lf:return e=t.displayName||null,e!==null?e:ku(t.type)||"Memo";case Xi:e=t._payload,t=t._init;try{return ku(t(e))}catch{}}return null}function Hv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ku(e);case 8:return e===Nf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function dr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function A0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function jv(t){var e=A0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,a=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,a.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ss(t){t._valueTracker||(t._valueTracker=jv(t))}function E0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=A0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Bu(t,e){var n=e.checked;return Et({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Yh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=dr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function C0(t,e){e=e.checked,e!=null&&Rf(t,"checked",e,!1)}function Gu(t,e){C0(t,e);var n=dr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Vu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Vu(t,e.type,dr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function $h(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Vu(t,e,n){(e!=="number"||Nl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Eo=Array.isArray;function wa(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+dr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Hu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ne(91));return Et({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function qh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ne(92));if(Eo(n)){if(1<n.length)throw Error(ne(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:dr(n)}}function w0(t,e){var n=dr(e.value),i=dr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Kh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function T0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ju(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?T0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ms,R0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ms=Ms||document.createElement("div"),Ms.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ms.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Go(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ro={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wv=["Webkit","ms","Moz","O"];Object.keys(Ro).forEach(function(t){Wv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ro[e]=Ro[t]})});function N0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ro.hasOwnProperty(t)&&Ro[t]?(""+e).trim():e+"px"}function P0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=N0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Xv=Et({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Wu(t,e){if(e){if(Xv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ne(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ne(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ne(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ne(62))}}function Xu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yu=null;function If(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var $u=null,Ta=null,Ra=null;function Zh(t){if(t=hs(t)){if(typeof $u!="function")throw Error(ne(280));var e=t.stateNode;e&&(e=uc(e),$u(t.stateNode,t.type,e))}}function L0(t){Ta?Ra?Ra.push(t):Ra=[t]:Ta=t}function I0(){if(Ta){var t=Ta,e=Ra;if(Ra=Ta=null,Zh(t),e)for(t=0;t<e.length;t++)Zh(e[t])}}function D0(t,e){return t(e)}function z0(){}var Dc=!1;function U0(t,e,n){if(Dc)return t(e,n);Dc=!0;try{return D0(t,e,n)}finally{Dc=!1,(Ta!==null||Ra!==null)&&(z0(),I0())}}function Vo(t,e){var n=t.stateNode;if(n===null)return null;var i=uc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ne(231,e,typeof n));return n}var qu=!1;if(Pi)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){qu=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{qu=!1}function Yv(t,e,n,i,r,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var No=!1,Pl=null,Ll=!1,Ku=null,$v={onError:function(t){No=!0,Pl=t}};function qv(t,e,n,i,r,a,o,s,l){No=!1,Pl=null,Yv.apply($v,arguments)}function Kv(t,e,n,i,r,a,o,s,l){if(qv.apply(this,arguments),No){if(No){var c=Pl;No=!1,Pl=null}else throw Error(ne(198));Ll||(Ll=!0,Ku=c)}}function Xr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function F0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Qh(t){if(Xr(t)!==t)throw Error(ne(188))}function Zv(t){var e=t.alternate;if(!e){if(e=Xr(t),e===null)throw Error(ne(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var a=r.alternate;if(a===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===n)return Qh(r),t;if(a===i)return Qh(r),e;a=a.sibling}throw Error(ne(188))}if(n.return!==i.return)n=r,i=a;else{for(var o=!1,s=r.child;s;){if(s===n){o=!0,n=r,i=a;break}if(s===i){o=!0,i=r,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,i=r;break}if(s===i){o=!0,i=a,n=r;break}s=s.sibling}if(!o)throw Error(ne(189))}}if(n.alternate!==i)throw Error(ne(190))}if(n.tag!==3)throw Error(ne(188));return n.stateNode.current===n?t:e}function O0(t){return t=Zv(t),t!==null?k0(t):null}function k0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=k0(t);if(e!==null)return e;t=t.sibling}return null}var B0=Tn.unstable_scheduleCallback,Jh=Tn.unstable_cancelCallback,Qv=Tn.unstable_shouldYield,Jv=Tn.unstable_requestPaint,Nt=Tn.unstable_now,e_=Tn.unstable_getCurrentPriorityLevel,Df=Tn.unstable_ImmediatePriority,G0=Tn.unstable_UserBlockingPriority,Il=Tn.unstable_NormalPriority,t_=Tn.unstable_LowPriority,V0=Tn.unstable_IdlePriority,oc=null,ui=null;function n_(t){if(ui&&typeof ui.onCommitFiberRoot=="function")try{ui.onCommitFiberRoot(oc,t,void 0,(t.current.flags&128)===128)}catch{}}var Kn=Math.clz32?Math.clz32:a_,i_=Math.log,r_=Math.LN2;function a_(t){return t>>>=0,t===0?32:31-(i_(t)/r_|0)|0}var bs=64,As=4194304;function Co(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Dl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,a=t.pingedLanes,o=n&268435455;if(o!==0){var s=o&~r;s!==0?i=Co(s):(a&=o,a!==0&&(i=Co(a)))}else o=n&~r,o!==0?i=Co(o):a!==0&&(i=Co(a));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,a=e&-e,r>=a||r===16&&(a&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Kn(e),r=1<<n,i|=t[n],e&=~r;return i}function o_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function s_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,a=t.pendingLanes;0<a;){var o=31-Kn(a),s=1<<o,l=r[o];l===-1?(!(s&n)||s&i)&&(r[o]=o_(s,e)):l<=e&&(t.expiredLanes|=s),a&=~s}}function Zu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function H0(){var t=bs;return bs<<=1,!(bs&4194240)&&(bs=64),t}function zc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ds(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Kn(e),t[e]=n}function l_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Kn(n),a=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~a}}function zf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var at=0;function j0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var W0,Uf,X0,Y0,$0,Qu=!1,Es=[],nr=null,ir=null,rr=null,Ho=new Map,jo=new Map,qi=[],c_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ep(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":Ho.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(e.pointerId)}}function co(t,e,n,i,r,a){return t===null||t.nativeEvent!==a?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[r]},e!==null&&(e=hs(e),e!==null&&Uf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function u_(t,e,n,i,r){switch(e){case"focusin":return nr=co(nr,t,e,n,i,r),!0;case"dragenter":return ir=co(ir,t,e,n,i,r),!0;case"mouseover":return rr=co(rr,t,e,n,i,r),!0;case"pointerover":var a=r.pointerId;return Ho.set(a,co(Ho.get(a)||null,t,e,n,i,r)),!0;case"gotpointercapture":return a=r.pointerId,jo.set(a,co(jo.get(a)||null,t,e,n,i,r)),!0}return!1}function q0(t){var e=Rr(t.target);if(e!==null){var n=Xr(e);if(n!==null){if(e=n.tag,e===13){if(e=F0(n),e!==null){t.blockedOn=e,$0(t.priority,function(){X0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ju(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Yu=i,n.target.dispatchEvent(i),Yu=null}else return e=hs(n),e!==null&&Uf(e),t.blockedOn=n,!1;e.shift()}return!0}function tp(t,e,n){hl(t)&&n.delete(e)}function d_(){Qu=!1,nr!==null&&hl(nr)&&(nr=null),ir!==null&&hl(ir)&&(ir=null),rr!==null&&hl(rr)&&(rr=null),Ho.forEach(tp),jo.forEach(tp)}function uo(t,e){t.blockedOn===e&&(t.blockedOn=null,Qu||(Qu=!0,Tn.unstable_scheduleCallback(Tn.unstable_NormalPriority,d_)))}function Wo(t){function e(r){return uo(r,t)}if(0<Es.length){uo(Es[0],t);for(var n=1;n<Es.length;n++){var i=Es[n];i.blockedOn===t&&(i.blockedOn=null)}}for(nr!==null&&uo(nr,t),ir!==null&&uo(ir,t),rr!==null&&uo(rr,t),Ho.forEach(e),jo.forEach(e),n=0;n<qi.length;n++)i=qi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<qi.length&&(n=qi[0],n.blockedOn===null);)q0(n),n.blockedOn===null&&qi.shift()}var Na=Ui.ReactCurrentBatchConfig,zl=!0;function f_(t,e,n,i){var r=at,a=Na.transition;Na.transition=null;try{at=1,Ff(t,e,n,i)}finally{at=r,Na.transition=a}}function h_(t,e,n,i){var r=at,a=Na.transition;Na.transition=null;try{at=4,Ff(t,e,n,i)}finally{at=r,Na.transition=a}}function Ff(t,e,n,i){if(zl){var r=Ju(t,e,n,i);if(r===null)Wc(t,e,i,Ul,n),ep(t,i);else if(u_(r,t,e,n,i))i.stopPropagation();else if(ep(t,i),e&4&&-1<c_.indexOf(t)){for(;r!==null;){var a=hs(r);if(a!==null&&W0(a),a=Ju(t,e,n,i),a===null&&Wc(t,e,i,Ul,n),a===r)break;r=a}r!==null&&i.stopPropagation()}else Wc(t,e,i,null,n)}}var Ul=null;function Ju(t,e,n,i){if(Ul=null,t=If(i),t=Rr(t),t!==null)if(e=Xr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=F0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ul=t,null}function K0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(e_()){case Df:return 1;case G0:return 4;case Il:case t_:return 16;case V0:return 536870912;default:return 16}default:return 16}}var Ji=null,Of=null,pl=null;function Z0(){if(pl)return pl;var t,e=Of,n=e.length,i,r="value"in Ji?Ji.value:Ji.textContent,a=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[a-i];i++);return pl=r.slice(t,1<i?1-i:void 0)}function ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Cs(){return!0}function np(){return!1}function Nn(t){function e(n,i,r,a,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Cs:np,this.isPropagationStopped=np,this}return Et(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Cs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Cs)},persist:function(){},isPersistent:Cs}),e}var Qa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kf=Nn(Qa),fs=Et({},Qa,{view:0,detail:0}),p_=Nn(fs),Uc,Fc,fo,sc=Et({},fs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==fo&&(fo&&t.type==="mousemove"?(Uc=t.screenX-fo.screenX,Fc=t.screenY-fo.screenY):Fc=Uc=0,fo=t),Uc)},movementY:function(t){return"movementY"in t?t.movementY:Fc}}),ip=Nn(sc),m_=Et({},sc,{dataTransfer:0}),x_=Nn(m_),g_=Et({},fs,{relatedTarget:0}),Oc=Nn(g_),v_=Et({},Qa,{animationName:0,elapsedTime:0,pseudoElement:0}),__=Nn(v_),y_=Et({},Qa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),S_=Nn(y_),M_=Et({},Qa,{data:0}),rp=Nn(M_),b_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},E_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function C_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=E_[t])?!!e[t]:!1}function Bf(){return C_}var w_=Et({},fs,{key:function(t){if(t.key){var e=b_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?A_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bf,charCode:function(t){return t.type==="keypress"?ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),T_=Nn(w_),R_=Et({},sc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ap=Nn(R_),N_=Et({},fs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bf}),P_=Nn(N_),L_=Et({},Qa,{propertyName:0,elapsedTime:0,pseudoElement:0}),I_=Nn(L_),D_=Et({},sc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),z_=Nn(D_),U_=[9,13,27,32],Gf=Pi&&"CompositionEvent"in window,Po=null;Pi&&"documentMode"in document&&(Po=document.documentMode);var F_=Pi&&"TextEvent"in window&&!Po,Q0=Pi&&(!Gf||Po&&8<Po&&11>=Po),op=" ",sp=!1;function J0(t,e){switch(t){case"keyup":return U_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ex(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ga=!1;function O_(t,e){switch(t){case"compositionend":return ex(e);case"keypress":return e.which!==32?null:(sp=!0,op);case"textInput":return t=e.data,t===op&&sp?null:t;default:return null}}function k_(t,e){if(ga)return t==="compositionend"||!Gf&&J0(t,e)?(t=Z0(),pl=Of=Ji=null,ga=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Q0&&e.locale!=="ko"?null:e.data;default:return null}}var B_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!B_[t.type]:e==="textarea"}function tx(t,e,n,i){L0(i),e=Fl(e,"onChange"),0<e.length&&(n=new kf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Lo=null,Xo=null;function G_(t){fx(t,0)}function lc(t){var e=ya(t);if(E0(e))return t}function V_(t,e){if(t==="change")return e}var nx=!1;if(Pi){var kc;if(Pi){var Bc="oninput"in document;if(!Bc){var cp=document.createElement("div");cp.setAttribute("oninput","return;"),Bc=typeof cp.oninput=="function"}kc=Bc}else kc=!1;nx=kc&&(!document.documentMode||9<document.documentMode)}function up(){Lo&&(Lo.detachEvent("onpropertychange",ix),Xo=Lo=null)}function ix(t){if(t.propertyName==="value"&&lc(Xo)){var e=[];tx(e,Xo,t,If(t)),U0(G_,e)}}function H_(t,e,n){t==="focusin"?(up(),Lo=e,Xo=n,Lo.attachEvent("onpropertychange",ix)):t==="focusout"&&up()}function j_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return lc(Xo)}function W_(t,e){if(t==="click")return lc(e)}function X_(t,e){if(t==="input"||t==="change")return lc(e)}function Y_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jn=typeof Object.is=="function"?Object.is:Y_;function Yo(t,e){if(Jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!zu.call(e,r)||!Jn(t[r],e[r]))return!1}return!0}function dp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function fp(t,e){var n=dp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=dp(n)}}function rx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?rx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ax(){for(var t=window,e=Nl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Nl(t.document)}return e}function Vf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function $_(t){var e=ax(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&rx(n.ownerDocument.documentElement,n)){if(i!==null&&Vf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,a=Math.min(i.start,r);i=i.end===void 0?a:Math.min(i.end,r),!t.extend&&a>i&&(r=i,i=a,a=r),r=fp(n,a);var o=fp(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),a>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var q_=Pi&&"documentMode"in document&&11>=document.documentMode,va=null,ed=null,Io=null,td=!1;function hp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;td||va==null||va!==Nl(i)||(i=va,"selectionStart"in i&&Vf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Io&&Yo(Io,i)||(Io=i,i=Fl(ed,"onSelect"),0<i.length&&(e=new kf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=va)))}function ws(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var _a={animationend:ws("Animation","AnimationEnd"),animationiteration:ws("Animation","AnimationIteration"),animationstart:ws("Animation","AnimationStart"),transitionend:ws("Transition","TransitionEnd")},Gc={},ox={};Pi&&(ox=document.createElement("div").style,"AnimationEvent"in window||(delete _a.animationend.animation,delete _a.animationiteration.animation,delete _a.animationstart.animation),"TransitionEvent"in window||delete _a.transitionend.transition);function cc(t){if(Gc[t])return Gc[t];if(!_a[t])return t;var e=_a[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ox)return Gc[t]=e[n];return t}var sx=cc("animationend"),lx=cc("animationiteration"),cx=cc("animationstart"),ux=cc("transitionend"),dx=new Map,pp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){dx.set(t,e),Wr(e,[t])}for(var Vc=0;Vc<pp.length;Vc++){var Hc=pp[Vc],K_=Hc.toLowerCase(),Z_=Hc[0].toUpperCase()+Hc.slice(1);pr(K_,"on"+Z_)}pr(sx,"onAnimationEnd");pr(lx,"onAnimationIteration");pr(cx,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(ux,"onTransitionEnd");ka("onMouseEnter",["mouseout","mouseover"]);ka("onMouseLeave",["mouseout","mouseover"]);ka("onPointerEnter",["pointerout","pointerover"]);ka("onPointerLeave",["pointerout","pointerover"]);Wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Q_=new Set("cancel close invalid load scroll toggle".split(" ").concat(wo));function mp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Kv(i,e,void 0,t),t.currentTarget=null}function fx(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var a=void 0;if(e)for(var o=i.length-1;0<=o;o--){var s=i[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&r.isPropagationStopped())break e;mp(r,s,c),a=l}else for(o=0;o<i.length;o++){if(s=i[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&r.isPropagationStopped())break e;mp(r,s,c),a=l}}}if(Ll)throw t=Ku,Ll=!1,Ku=null,t}function mt(t,e){var n=e[od];n===void 0&&(n=e[od]=new Set);var i=t+"__bubble";n.has(i)||(hx(e,t,2,!1),n.add(i))}function jc(t,e,n){var i=0;e&&(i|=4),hx(n,t,i,e)}var Ts="_reactListening"+Math.random().toString(36).slice(2);function $o(t){if(!t[Ts]){t[Ts]=!0,y0.forEach(function(n){n!=="selectionchange"&&(Q_.has(n)||jc(n,!1,t),jc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ts]||(e[Ts]=!0,jc("selectionchange",!1,e))}}function hx(t,e,n,i){switch(K0(e)){case 1:var r=f_;break;case 4:r=h_;break;default:r=Ff}n=r.bind(null,e,n,t),r=void 0,!qu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Wc(t,e,n,i,r){var a=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var s=i.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;s!==null;){if(o=Rr(s),o===null)return;if(l=o.tag,l===5||l===6){i=a=o;continue e}s=s.parentNode}}i=i.return}U0(function(){var c=a,f=If(n),p=[];e:{var h=dx.get(t);if(h!==void 0){var m=kf,_=t;switch(t){case"keypress":if(ml(n)===0)break e;case"keydown":case"keyup":m=T_;break;case"focusin":_="focus",m=Oc;break;case"focusout":_="blur",m=Oc;break;case"beforeblur":case"afterblur":m=Oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=ip;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=x_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=P_;break;case sx:case lx:case cx:m=__;break;case ux:m=I_;break;case"scroll":m=p_;break;case"wheel":m=z_;break;case"copy":case"cut":case"paste":m=S_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=ap}var y=(e&4)!==0,x=!y&&t==="scroll",u=y?h!==null?h+"Capture":null:h;y=[];for(var g=c,v;g!==null;){v=g;var b=v.stateNode;if(v.tag===5&&b!==null&&(v=b,u!==null&&(b=Vo(g,u),b!=null&&y.push(qo(g,b,v)))),x)break;g=g.return}0<y.length&&(h=new m(h,_,null,n,f),p.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==Yu&&(_=n.relatedTarget||n.fromElement)&&(Rr(_)||_[Li]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(_=n.relatedTarget||n.toElement,m=c,_=_?Rr(_):null,_!==null&&(x=Xr(_),_!==x||_.tag!==5&&_.tag!==6)&&(_=null)):(m=null,_=c),m!==_)){if(y=ip,b="onMouseLeave",u="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(y=ap,b="onPointerLeave",u="onPointerEnter",g="pointer"),x=m==null?h:ya(m),v=_==null?h:ya(_),h=new y(b,g+"leave",m,n,f),h.target=x,h.relatedTarget=v,b=null,Rr(f)===c&&(y=new y(u,g+"enter",_,n,f),y.target=v,y.relatedTarget=x,b=y),x=b,m&&_)t:{for(y=m,u=_,g=0,v=y;v;v=qr(v))g++;for(v=0,b=u;b;b=qr(b))v++;for(;0<g-v;)y=qr(y),g--;for(;0<v-g;)u=qr(u),v--;for(;g--;){if(y===u||u!==null&&y===u.alternate)break t;y=qr(y),u=qr(u)}y=null}else y=null;m!==null&&xp(p,h,m,y,!1),_!==null&&x!==null&&xp(p,x,_,y,!0)}}e:{if(h=c?ya(c):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var T=V_;else if(lp(h))if(nx)T=X_;else{T=j_;var E=H_}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(T=W_);if(T&&(T=T(t,c))){tx(p,T,n,f);break e}E&&E(t,h,c),t==="focusout"&&(E=h._wrapperState)&&E.controlled&&h.type==="number"&&Vu(h,"number",h.value)}switch(E=c?ya(c):window,t){case"focusin":(lp(E)||E.contentEditable==="true")&&(va=E,ed=c,Io=null);break;case"focusout":Io=ed=va=null;break;case"mousedown":td=!0;break;case"contextmenu":case"mouseup":case"dragend":td=!1,hp(p,n,f);break;case"selectionchange":if(q_)break;case"keydown":case"keyup":hp(p,n,f)}var w;if(Gf)e:{switch(t){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else ga?J0(t,n)&&(L="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(L="onCompositionStart");L&&(Q0&&n.locale!=="ko"&&(ga||L!=="onCompositionStart"?L==="onCompositionEnd"&&ga&&(w=Z0()):(Ji=f,Of="value"in Ji?Ji.value:Ji.textContent,ga=!0)),E=Fl(c,L),0<E.length&&(L=new rp(L,t,null,n,f),p.push({event:L,listeners:E}),w?L.data=w:(w=ex(n),w!==null&&(L.data=w)))),(w=F_?O_(t,n):k_(t,n))&&(c=Fl(c,"onBeforeInput"),0<c.length&&(f=new rp("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=w))}fx(p,e)})}function qo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=Vo(t,n),a!=null&&i.unshift(qo(t,a,r)),a=Vo(t,e),a!=null&&i.push(qo(t,a,r))),t=t.return}return i}function qr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function xp(t,e,n,i,r){for(var a=e._reactName,o=[];n!==null&&n!==i;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===i)break;s.tag===5&&c!==null&&(s=c,r?(l=Vo(n,a),l!=null&&o.unshift(qo(n,l,s))):r||(l=Vo(n,a),l!=null&&o.push(qo(n,l,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var J_=/\r\n?/g,ey=/\u0000|\uFFFD/g;function gp(t){return(typeof t=="string"?t:""+t).replace(J_,`
`).replace(ey,"")}function Rs(t,e,n){if(e=gp(e),gp(t)!==e&&n)throw Error(ne(425))}function Ol(){}var nd=null,id=null;function rd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ad=typeof setTimeout=="function"?setTimeout:void 0,ty=typeof clearTimeout=="function"?clearTimeout:void 0,vp=typeof Promise=="function"?Promise:void 0,ny=typeof queueMicrotask=="function"?queueMicrotask:typeof vp<"u"?function(t){return vp.resolve(null).then(t).catch(iy)}:ad;function iy(t){setTimeout(function(){throw t})}function Xc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Wo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Wo(e)}function ar(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function _p(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ja=Math.random().toString(36).slice(2),oi="__reactFiber$"+Ja,Ko="__reactProps$"+Ja,Li="__reactContainer$"+Ja,od="__reactEvents$"+Ja,ry="__reactListeners$"+Ja,ay="__reactHandles$"+Ja;function Rr(t){var e=t[oi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Li]||n[oi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_p(t);t!==null;){if(n=t[oi])return n;t=_p(t)}return e}t=n,n=t.parentNode}return null}function hs(t){return t=t[oi]||t[Li],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ya(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ne(33))}function uc(t){return t[Ko]||null}var sd=[],Sa=-1;function mr(t){return{current:t}}function xt(t){0>Sa||(t.current=sd[Sa],sd[Sa]=null,Sa--)}function ft(t,e){Sa++,sd[Sa]=t.current,t.current=e}var fr={},Qt=mr(fr),mn=mr(!1),Or=fr;function Ba(t,e){var n=t.type.contextTypes;if(!n)return fr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in n)r[a]=e[a];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function xn(t){return t=t.childContextTypes,t!=null}function kl(){xt(mn),xt(Qt)}function yp(t,e,n){if(Qt.current!==fr)throw Error(ne(168));ft(Qt,e),ft(mn,n)}function px(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ne(108,Hv(t)||"Unknown",r));return Et({},n,i)}function Bl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||fr,Or=Qt.current,ft(Qt,t),ft(mn,mn.current),!0}function Sp(t,e,n){var i=t.stateNode;if(!i)throw Error(ne(169));n?(t=px(t,e,Or),i.__reactInternalMemoizedMergedChildContext=t,xt(mn),xt(Qt),ft(Qt,t)):xt(mn),ft(mn,n)}var Mi=null,dc=!1,Yc=!1;function mx(t){Mi===null?Mi=[t]:Mi.push(t)}function oy(t){dc=!0,mx(t)}function xr(){if(!Yc&&Mi!==null){Yc=!0;var t=0,e=at;try{var n=Mi;for(at=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Mi=null,dc=!1}catch(r){throw Mi!==null&&(Mi=Mi.slice(t+1)),B0(Df,xr),r}finally{at=e,Yc=!1}}return null}var Ma=[],ba=0,Gl=null,Vl=0,In=[],Dn=0,kr=null,Ei=1,Ci="";function Er(t,e){Ma[ba++]=Vl,Ma[ba++]=Gl,Gl=t,Vl=e}function xx(t,e,n){In[Dn++]=Ei,In[Dn++]=Ci,In[Dn++]=kr,kr=t;var i=Ei;t=Ci;var r=32-Kn(i)-1;i&=~(1<<r),n+=1;var a=32-Kn(e)+r;if(30<a){var o=r-r%5;a=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ei=1<<32-Kn(e)+r|n<<r|i,Ci=a+t}else Ei=1<<a|n<<r|i,Ci=t}function Hf(t){t.return!==null&&(Er(t,1),xx(t,1,0))}function jf(t){for(;t===Gl;)Gl=Ma[--ba],Ma[ba]=null,Vl=Ma[--ba],Ma[ba]=null;for(;t===kr;)kr=In[--Dn],In[Dn]=null,Ci=In[--Dn],In[Dn]=null,Ei=In[--Dn],In[Dn]=null}var Cn=null,En=null,vt=!1,Yn=null;function gx(t,e){var n=zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Mp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Cn=t,En=ar(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Cn=t,En=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:Ei,overflow:Ci}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Cn=t,En=null,!0):!1;default:return!1}}function ld(t){return(t.mode&1)!==0&&(t.flags&128)===0}function cd(t){if(vt){var e=En;if(e){var n=e;if(!Mp(t,e)){if(ld(t))throw Error(ne(418));e=ar(n.nextSibling);var i=Cn;e&&Mp(t,e)?gx(i,n):(t.flags=t.flags&-4097|2,vt=!1,Cn=t)}}else{if(ld(t))throw Error(ne(418));t.flags=t.flags&-4097|2,vt=!1,Cn=t}}}function bp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Cn=t}function Ns(t){if(t!==Cn)return!1;if(!vt)return bp(t),vt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!rd(t.type,t.memoizedProps)),e&&(e=En)){if(ld(t))throw vx(),Error(ne(418));for(;e;)gx(t,e),e=ar(e.nextSibling)}if(bp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ne(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){En=ar(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}En=null}}else En=Cn?ar(t.stateNode.nextSibling):null;return!0}function vx(){for(var t=En;t;)t=ar(t.nextSibling)}function Ga(){En=Cn=null,vt=!1}function Wf(t){Yn===null?Yn=[t]:Yn.push(t)}var sy=Ui.ReactCurrentBatchConfig;function ho(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ne(309));var i=n.stateNode}if(!i)throw Error(ne(147,t));var r=i,a=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===a?e.ref:(e=function(o){var s=r.refs;o===null?delete s[a]:s[a]=o},e._stringRef=a,e)}if(typeof t!="string")throw Error(ne(284));if(!n._owner)throw Error(ne(290,t))}return t}function Ps(t,e){throw t=Object.prototype.toString.call(e),Error(ne(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ap(t){var e=t._init;return e(t._payload)}function _x(t){function e(u,g){if(t){var v=u.deletions;v===null?(u.deletions=[g],u.flags|=16):v.push(g)}}function n(u,g){if(!t)return null;for(;g!==null;)e(u,g),g=g.sibling;return null}function i(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function r(u,g){return u=cr(u,g),u.index=0,u.sibling=null,u}function a(u,g,v){return u.index=v,t?(v=u.alternate,v!==null?(v=v.index,v<g?(u.flags|=2,g):v):(u.flags|=2,g)):(u.flags|=1048576,g)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function s(u,g,v,b){return g===null||g.tag!==6?(g=eu(v,u.mode,b),g.return=u,g):(g=r(g,v),g.return=u,g)}function l(u,g,v,b){var T=v.type;return T===xa?f(u,g,v.props.children,b,v.key):g!==null&&(g.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Xi&&Ap(T)===g.type)?(b=r(g,v.props),b.ref=ho(u,g,v),b.return=u,b):(b=Ml(v.type,v.key,v.props,null,u.mode,b),b.ref=ho(u,g,v),b.return=u,b)}function c(u,g,v,b){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=tu(v,u.mode,b),g.return=u,g):(g=r(g,v.children||[]),g.return=u,g)}function f(u,g,v,b,T){return g===null||g.tag!==7?(g=Fr(v,u.mode,b,T),g.return=u,g):(g=r(g,v),g.return=u,g)}function p(u,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=eu(""+g,u.mode,v),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ys:return v=Ml(g.type,g.key,g.props,null,u.mode,v),v.ref=ho(u,null,g),v.return=u,v;case ma:return g=tu(g,u.mode,v),g.return=u,g;case Xi:var b=g._init;return p(u,b(g._payload),v)}if(Eo(g)||so(g))return g=Fr(g,u.mode,v,null),g.return=u,g;Ps(u,g)}return null}function h(u,g,v,b){var T=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return T!==null?null:s(u,g,""+v,b);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ys:return v.key===T?l(u,g,v,b):null;case ma:return v.key===T?c(u,g,v,b):null;case Xi:return T=v._init,h(u,g,T(v._payload),b)}if(Eo(v)||so(v))return T!==null?null:f(u,g,v,b,null);Ps(u,v)}return null}function m(u,g,v,b,T){if(typeof b=="string"&&b!==""||typeof b=="number")return u=u.get(v)||null,s(g,u,""+b,T);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ys:return u=u.get(b.key===null?v:b.key)||null,l(g,u,b,T);case ma:return u=u.get(b.key===null?v:b.key)||null,c(g,u,b,T);case Xi:var E=b._init;return m(u,g,v,E(b._payload),T)}if(Eo(b)||so(b))return u=u.get(v)||null,f(g,u,b,T,null);Ps(g,b)}return null}function _(u,g,v,b){for(var T=null,E=null,w=g,L=g=0,C=null;w!==null&&L<v.length;L++){w.index>L?(C=w,w=null):C=w.sibling;var M=h(u,w,v[L],b);if(M===null){w===null&&(w=C);break}t&&w&&M.alternate===null&&e(u,w),g=a(M,g,L),E===null?T=M:E.sibling=M,E=M,w=C}if(L===v.length)return n(u,w),vt&&Er(u,L),T;if(w===null){for(;L<v.length;L++)w=p(u,v[L],b),w!==null&&(g=a(w,g,L),E===null?T=w:E.sibling=w,E=w);return vt&&Er(u,L),T}for(w=i(u,w);L<v.length;L++)C=m(w,u,L,v[L],b),C!==null&&(t&&C.alternate!==null&&w.delete(C.key===null?L:C.key),g=a(C,g,L),E===null?T=C:E.sibling=C,E=C);return t&&w.forEach(function(N){return e(u,N)}),vt&&Er(u,L),T}function y(u,g,v,b){var T=so(v);if(typeof T!="function")throw Error(ne(150));if(v=T.call(v),v==null)throw Error(ne(151));for(var E=T=null,w=g,L=g=0,C=null,M=v.next();w!==null&&!M.done;L++,M=v.next()){w.index>L?(C=w,w=null):C=w.sibling;var N=h(u,w,M.value,b);if(N===null){w===null&&(w=C);break}t&&w&&N.alternate===null&&e(u,w),g=a(N,g,L),E===null?T=N:E.sibling=N,E=N,w=C}if(M.done)return n(u,w),vt&&Er(u,L),T;if(w===null){for(;!M.done;L++,M=v.next())M=p(u,M.value,b),M!==null&&(g=a(M,g,L),E===null?T=M:E.sibling=M,E=M);return vt&&Er(u,L),T}for(w=i(u,w);!M.done;L++,M=v.next())M=m(w,u,L,M.value,b),M!==null&&(t&&M.alternate!==null&&w.delete(M.key===null?L:M.key),g=a(M,g,L),E===null?T=M:E.sibling=M,E=M);return t&&w.forEach(function(z){return e(u,z)}),vt&&Er(u,L),T}function x(u,g,v,b){if(typeof v=="object"&&v!==null&&v.type===xa&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case ys:e:{for(var T=v.key,E=g;E!==null;){if(E.key===T){if(T=v.type,T===xa){if(E.tag===7){n(u,E.sibling),g=r(E,v.props.children),g.return=u,u=g;break e}}else if(E.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Xi&&Ap(T)===E.type){n(u,E.sibling),g=r(E,v.props),g.ref=ho(u,E,v),g.return=u,u=g;break e}n(u,E);break}else e(u,E);E=E.sibling}v.type===xa?(g=Fr(v.props.children,u.mode,b,v.key),g.return=u,u=g):(b=Ml(v.type,v.key,v.props,null,u.mode,b),b.ref=ho(u,g,v),b.return=u,u=b)}return o(u);case ma:e:{for(E=v.key;g!==null;){if(g.key===E)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(u,g.sibling),g=r(g,v.children||[]),g.return=u,u=g;break e}else{n(u,g);break}else e(u,g);g=g.sibling}g=tu(v,u.mode,b),g.return=u,u=g}return o(u);case Xi:return E=v._init,x(u,g,E(v._payload),b)}if(Eo(v))return _(u,g,v,b);if(so(v))return y(u,g,v,b);Ps(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(n(u,g.sibling),g=r(g,v),g.return=u,u=g):(n(u,g),g=eu(v,u.mode,b),g.return=u,u=g),o(u)):n(u,g)}return x}var Va=_x(!0),yx=_x(!1),Hl=mr(null),jl=null,Aa=null,Xf=null;function Yf(){Xf=Aa=jl=null}function $f(t){var e=Hl.current;xt(Hl),t._currentValue=e}function ud(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Pa(t,e){jl=t,Xf=Aa=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(pn=!0),t.firstContext=null)}function On(t){var e=t._currentValue;if(Xf!==t)if(t={context:t,memoizedValue:e,next:null},Aa===null){if(jl===null)throw Error(ne(308));Aa=t,jl.dependencies={lanes:0,firstContext:t}}else Aa=Aa.next=t;return e}var Nr=null;function qf(t){Nr===null?Nr=[t]:Nr.push(t)}function Sx(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,qf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ii(t,i)}function Ii(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Yi=!1;function Kf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mx(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ti(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function or(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ii(t,n)}return r=i.interleaved,r===null?(e.next=e,qf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ii(t,n)}function xl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,zf(t,n)}}function Ep(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?r=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?r=a=e:a=a.next=e}else r=a=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Wl(t,e,n,i){var r=t.updateQueue;Yi=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,s=f.lastBaseUpdate,s!==o&&(s===null?f.firstBaseUpdate=c:s.next=c,f.lastBaseUpdate=l))}if(a!==null){var p=r.baseState;o=0,f=c=l=null,s=a;do{var h=s.lane,m=s.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var _=t,y=s;switch(h=e,m=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){p=_.call(m,p,h);break e}p=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(m,p,h):_,h==null)break e;p=Et({},p,h);break e;case 2:Yi=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[s]:h.push(s))}else m={eventTime:m,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},f===null?(c=f=m,l=p):f=f.next=m,o|=h;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;h=s,s=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=p),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else a===null&&(r.shared.lanes=0);Gr|=o,t.lanes=o,t.memoizedState=p}}function Cp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ne(191,r));r.call(i)}}}var ps={},di=mr(ps),Zo=mr(ps),Qo=mr(ps);function Pr(t){if(t===ps)throw Error(ne(174));return t}function Zf(t,e){switch(ft(Qo,e),ft(Zo,t),ft(di,ps),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ju(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ju(e,t)}xt(di),ft(di,e)}function Ha(){xt(di),xt(Zo),xt(Qo)}function bx(t){Pr(Qo.current);var e=Pr(di.current),n=ju(e,t.type);e!==n&&(ft(Zo,t),ft(di,n))}function Qf(t){Zo.current===t&&(xt(di),xt(Zo))}var bt=mr(0);function Xl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var $c=[];function Jf(){for(var t=0;t<$c.length;t++)$c[t]._workInProgressVersionPrimary=null;$c.length=0}var gl=Ui.ReactCurrentDispatcher,qc=Ui.ReactCurrentBatchConfig,Br=0,At=null,It=null,Ot=null,Yl=!1,Do=!1,Jo=0,ly=0;function Xt(){throw Error(ne(321))}function eh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jn(t[n],e[n]))return!1;return!0}function th(t,e,n,i,r,a){if(Br=a,At=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,gl.current=t===null||t.memoizedState===null?fy:hy,t=n(i,r),Do){a=0;do{if(Do=!1,Jo=0,25<=a)throw Error(ne(301));a+=1,Ot=It=null,e.updateQueue=null,gl.current=py,t=n(i,r)}while(Do)}if(gl.current=$l,e=It!==null&&It.next!==null,Br=0,Ot=It=At=null,Yl=!1,e)throw Error(ne(300));return t}function nh(){var t=Jo!==0;return Jo=0,t}function ri(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?At.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function kn(){if(It===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=It.next;var e=Ot===null?At.memoizedState:Ot.next;if(e!==null)Ot=e,It=t;else{if(t===null)throw Error(ne(310));It=t,t={memoizedState:It.memoizedState,baseState:It.baseState,baseQueue:It.baseQueue,queue:It.queue,next:null},Ot===null?At.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function es(t,e){return typeof e=="function"?e(t):e}function Kc(t){var e=kn(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=It,r=i.baseQueue,a=n.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}i.baseQueue=r=a,n.pending=null}if(r!==null){a=r.next,i=i.baseState;var s=o=null,l=null,c=a;do{var f=c.lane;if((Br&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=p,o=i):l=l.next=p,At.lanes|=f,Gr|=f}c=c.next}while(c!==null&&c!==a);l===null?o=i:l.next=s,Jn(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do a=r.lane,At.lanes|=a,Gr|=a,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zc(t){var e=kn(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,a=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do a=t(a,o.action),o=o.next;while(o!==r);Jn(a,e.memoizedState)||(pn=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),n.lastRenderedState=a}return[a,i]}function Ax(){}function Ex(t,e){var n=At,i=kn(),r=e(),a=!Jn(i.memoizedState,r);if(a&&(i.memoizedState=r,pn=!0),i=i.queue,ih(Tx.bind(null,n,i,t),[t]),i.getSnapshot!==e||a||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,ts(9,wx.bind(null,n,i,r,e),void 0,null),kt===null)throw Error(ne(349));Br&30||Cx(n,e,r)}return r}function Cx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function wx(t,e,n,i){e.value=n,e.getSnapshot=i,Rx(e)&&Nx(t)}function Tx(t,e,n){return n(function(){Rx(e)&&Nx(t)})}function Rx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jn(t,n)}catch{return!0}}function Nx(t){var e=Ii(t,1);e!==null&&Zn(e,t,1,-1)}function wp(t){var e=ri();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:es,lastRenderedState:t},e.queue=t,t=t.dispatch=dy.bind(null,At,t),[e.memoizedState,t]}function ts(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Px(){return kn().memoizedState}function vl(t,e,n,i){var r=ri();At.flags|=t,r.memoizedState=ts(1|e,n,void 0,i===void 0?null:i)}function fc(t,e,n,i){var r=kn();i=i===void 0?null:i;var a=void 0;if(It!==null){var o=It.memoizedState;if(a=o.destroy,i!==null&&eh(i,o.deps)){r.memoizedState=ts(e,n,a,i);return}}At.flags|=t,r.memoizedState=ts(1|e,n,a,i)}function Tp(t,e){return vl(8390656,8,t,e)}function ih(t,e){return fc(2048,8,t,e)}function Lx(t,e){return fc(4,2,t,e)}function Ix(t,e){return fc(4,4,t,e)}function Dx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function zx(t,e,n){return n=n!=null?n.concat([t]):null,fc(4,4,Dx.bind(null,e,t),n)}function rh(){}function Ux(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Fx(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Ox(t,e,n){return Br&21?(Jn(n,e)||(n=H0(),At.lanes|=n,Gr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,pn=!0),t.memoizedState=n)}function cy(t,e){var n=at;at=n!==0&&4>n?n:4,t(!0);var i=qc.transition;qc.transition={};try{t(!1),e()}finally{at=n,qc.transition=i}}function kx(){return kn().memoizedState}function uy(t,e,n){var i=lr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Bx(t))Gx(e,n);else if(n=Sx(t,e,n,i),n!==null){var r=on();Zn(n,t,i,r),Vx(n,e,i)}}function dy(t,e,n){var i=lr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bx(t))Gx(e,r);else{var a=t.alternate;if(t.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var o=e.lastRenderedState,s=a(o,n);if(r.hasEagerState=!0,r.eagerState=s,Jn(s,o)){var l=e.interleaved;l===null?(r.next=r,qf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Sx(t,e,r,i),n!==null&&(r=on(),Zn(n,t,i,r),Vx(n,e,i))}}function Bx(t){var e=t.alternate;return t===At||e!==null&&e===At}function Gx(t,e){Do=Yl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vx(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,zf(t,n)}}var $l={readContext:On,useCallback:Xt,useContext:Xt,useEffect:Xt,useImperativeHandle:Xt,useInsertionEffect:Xt,useLayoutEffect:Xt,useMemo:Xt,useReducer:Xt,useRef:Xt,useState:Xt,useDebugValue:Xt,useDeferredValue:Xt,useTransition:Xt,useMutableSource:Xt,useSyncExternalStore:Xt,useId:Xt,unstable_isNewReconciler:!1},fy={readContext:On,useCallback:function(t,e){return ri().memoizedState=[t,e===void 0?null:e],t},useContext:On,useEffect:Tp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,vl(4194308,4,Dx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vl(4194308,4,t,e)},useInsertionEffect:function(t,e){return vl(4,2,t,e)},useMemo:function(t,e){var n=ri();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ri();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=uy.bind(null,At,t),[i.memoizedState,t]},useRef:function(t){var e=ri();return t={current:t},e.memoizedState=t},useState:wp,useDebugValue:rh,useDeferredValue:function(t){return ri().memoizedState=t},useTransition:function(){var t=wp(!1),e=t[0];return t=cy.bind(null,t[1]),ri().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=At,r=ri();if(vt){if(n===void 0)throw Error(ne(407));n=n()}else{if(n=e(),kt===null)throw Error(ne(349));Br&30||Cx(i,e,n)}r.memoizedState=n;var a={value:n,getSnapshot:e};return r.queue=a,Tp(Tx.bind(null,i,a,t),[t]),i.flags|=2048,ts(9,wx.bind(null,i,a,n,e),void 0,null),n},useId:function(){var t=ri(),e=kt.identifierPrefix;if(vt){var n=Ci,i=Ei;n=(i&~(1<<32-Kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Jo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ly++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},hy={readContext:On,useCallback:Ux,useContext:On,useEffect:ih,useImperativeHandle:zx,useInsertionEffect:Lx,useLayoutEffect:Ix,useMemo:Fx,useReducer:Kc,useRef:Px,useState:function(){return Kc(es)},useDebugValue:rh,useDeferredValue:function(t){var e=kn();return Ox(e,It.memoizedState,t)},useTransition:function(){var t=Kc(es)[0],e=kn().memoizedState;return[t,e]},useMutableSource:Ax,useSyncExternalStore:Ex,useId:kx,unstable_isNewReconciler:!1},py={readContext:On,useCallback:Ux,useContext:On,useEffect:ih,useImperativeHandle:zx,useInsertionEffect:Lx,useLayoutEffect:Ix,useMemo:Fx,useReducer:Zc,useRef:Px,useState:function(){return Zc(es)},useDebugValue:rh,useDeferredValue:function(t){var e=kn();return It===null?e.memoizedState=t:Ox(e,It.memoizedState,t)},useTransition:function(){var t=Zc(es)[0],e=kn().memoizedState;return[t,e]},useMutableSource:Ax,useSyncExternalStore:Ex,useId:kx,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=Et({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function dd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Et({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hc={isMounted:function(t){return(t=t._reactInternals)?Xr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=on(),r=lr(t),a=Ti(i,r);a.payload=e,n!=null&&(a.callback=n),e=or(t,a,r),e!==null&&(Zn(e,t,r,i),xl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=on(),r=lr(t),a=Ti(i,r);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=or(t,a,r),e!==null&&(Zn(e,t,r,i),xl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=on(),i=lr(t),r=Ti(n,i);r.tag=2,e!=null&&(r.callback=e),e=or(t,r,i),e!==null&&(Zn(e,t,i,n),xl(e,t,i))}};function Rp(t,e,n,i,r,a,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,a,o):e.prototype&&e.prototype.isPureReactComponent?!Yo(n,i)||!Yo(r,a):!0}function Hx(t,e,n){var i=!1,r=fr,a=e.contextType;return typeof a=="object"&&a!==null?a=On(a):(r=xn(e)?Or:Qt.current,i=e.contextTypes,a=(i=i!=null)?Ba(t,r):fr),e=new e(n,a),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=a),e}function Np(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&hc.enqueueReplaceState(e,e.state,null)}function fd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Kf(t);var a=e.contextType;typeof a=="object"&&a!==null?r.context=On(a):(a=xn(e)?Or:Qt.current,r.context=Ba(t,a)),r.state=t.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(dd(t,e,a,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&hc.enqueueReplaceState(r,r.state,null),Wl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ja(t,e){try{var n="",i=e;do n+=Vv(i),i=i.return;while(i);var r=n}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:t,source:e,stack:r,digest:null}}function Qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function hd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var my=typeof WeakMap=="function"?WeakMap:Map;function jx(t,e,n){n=Ti(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Kl||(Kl=!0,bd=i),hd(t,e)},n}function Wx(t,e,n){n=Ti(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){hd(t,e)}}var a=t.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){hd(t,e),typeof i!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Pp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new my;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ry.bind(null,t,e,n),e.then(t,t))}function Lp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ip(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ti(-1,1),e.tag=2,or(n,e,1))),n.lanes|=1),t)}var xy=Ui.ReactCurrentOwner,pn=!1;function an(t,e,n,i){e.child=t===null?yx(e,null,n,i):Va(e,t.child,n,i)}function Dp(t,e,n,i,r){n=n.render;var a=e.ref;return Pa(e,r),i=th(t,e,n,i,a,r),n=nh(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(vt&&n&&Hf(e),e.flags|=1,an(t,e,i,r),e.child)}function zp(t,e,n,i,r){if(t===null){var a=n.type;return typeof a=="function"&&!fh(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=a,Xx(t,e,a,i,r)):(t=Ml(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(a=t.child,!(t.lanes&r)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Yo,n(o,i)&&t.ref===e.ref)return Di(t,e,r)}return e.flags|=1,t=cr(a,i),t.ref=e.ref,t.return=e,e.child=t}function Xx(t,e,n,i,r){if(t!==null){var a=t.memoizedProps;if(Yo(a,i)&&t.ref===e.ref)if(pn=!1,e.pendingProps=i=a,(t.lanes&r)!==0)t.flags&131072&&(pn=!0);else return e.lanes=t.lanes,Di(t,e,r)}return pd(t,e,n,i,r)}function Yx(t,e,n){var i=e.pendingProps,r=i.children,a=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(Ca,Mn),Mn|=n;else{if(!(n&1073741824))return t=a!==null?a.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ft(Ca,Mn),Mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=a!==null?a.baseLanes:n,ft(Ca,Mn),Mn|=i}else a!==null?(i=a.baseLanes|n,e.memoizedState=null):i=n,ft(Ca,Mn),Mn|=i;return an(t,e,r,n),e.child}function $x(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function pd(t,e,n,i,r){var a=xn(n)?Or:Qt.current;return a=Ba(e,a),Pa(e,r),n=th(t,e,n,i,a,r),i=nh(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(vt&&i&&Hf(e),e.flags|=1,an(t,e,n,r),e.child)}function Up(t,e,n,i,r){if(xn(n)){var a=!0;Bl(e)}else a=!1;if(Pa(e,r),e.stateNode===null)_l(t,e),Hx(e,n,i),fd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,s=e.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=On(c):(c=xn(n)?Or:Qt.current,c=Ba(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==i||l!==c)&&Np(e,o,i,c),Yi=!1;var h=e.memoizedState;o.state=h,Wl(e,i,o,r),l=e.memoizedState,s!==i||h!==l||mn.current||Yi?(typeof f=="function"&&(dd(e,n,f,i),l=e.memoizedState),(s=Yi||Rp(e,n,s,i,h,l,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=s):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Mx(t,e),s=e.memoizedProps,c=e.type===e.elementType?s:Wn(e.type,s),o.props=c,p=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=On(l):(l=xn(n)?Or:Qt.current,l=Ba(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==p||h!==l)&&Np(e,o,i,l),Yi=!1,h=e.memoizedState,o.state=h,Wl(e,i,o,r);var _=e.memoizedState;s!==p||h!==_||mn.current||Yi?(typeof m=="function"&&(dd(e,n,m,i),_=e.memoizedState),(c=Yi||Rp(e,n,c,i,h,_,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return md(t,e,n,i,a,r)}function md(t,e,n,i,r,a){$x(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Sp(e,n,!1),Di(t,e,a);i=e.stateNode,xy.current=e;var s=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Va(e,t.child,null,a),e.child=Va(e,null,s,a)):an(t,e,s,a),e.memoizedState=i.state,r&&Sp(e,n,!0),e.child}function qx(t){var e=t.stateNode;e.pendingContext?yp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&yp(t,e.context,!1),Zf(t,e.containerInfo)}function Fp(t,e,n,i,r){return Ga(),Wf(r),e.flags|=256,an(t,e,n,i),e.child}var xd={dehydrated:null,treeContext:null,retryLane:0};function gd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Kx(t,e,n){var i=e.pendingProps,r=bt.current,a=!1,o=(e.flags&128)!==0,s;if((s=o)||(s=t!==null&&t.memoizedState===null?!1:(r&2)!==0),s?(a=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ft(bt,r&1),t===null)return cd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,a?(i=e.mode,a=e.child,o={mode:"hidden",children:o},!(i&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=xc(o,i,0,null),t=Fr(t,i,n,null),a.return=e,t.return=e,a.sibling=t,e.child=a,e.child.memoizedState=gd(n),e.memoizedState=xd,t):ah(e,o));if(r=t.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return gy(t,e,o,i,s,r,n);if(a){a=i.fallback,o=e.mode,r=t.child,s=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=cr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),s!==null?a=cr(s,a):(a=Fr(a,o,n,null),a.flags|=2),a.return=e,i.return=e,i.sibling=a,e.child=i,i=a,a=e.child,o=t.child.memoizedState,o=o===null?gd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=t.childLanes&~n,e.memoizedState=xd,i}return a=t.child,t=a.sibling,i=cr(a,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function ah(t,e){return e=xc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ls(t,e,n,i){return i!==null&&Wf(i),Va(e,t.child,null,n),t=ah(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function gy(t,e,n,i,r,a,o){if(n)return e.flags&256?(e.flags&=-257,i=Qc(Error(ne(422))),Ls(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(a=i.fallback,r=e.mode,i=xc({mode:"visible",children:i.children},r,0,null),a=Fr(a,r,o,null),a.flags|=2,i.return=e,a.return=e,i.sibling=a,e.child=i,e.mode&1&&Va(e,t.child,null,o),e.child.memoizedState=gd(o),e.memoizedState=xd,a);if(!(e.mode&1))return Ls(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var s=i.dgst;return i=s,a=Error(ne(419)),i=Qc(a,i,void 0),Ls(t,e,o,i)}if(s=(o&t.childLanes)!==0,pn||s){if(i=kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Ii(t,r),Zn(i,t,r,-1))}return dh(),i=Qc(Error(ne(421))),Ls(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Ny.bind(null,t),r._reactRetry=e,null):(t=a.treeContext,En=ar(r.nextSibling),Cn=e,vt=!0,Yn=null,t!==null&&(In[Dn++]=Ei,In[Dn++]=Ci,In[Dn++]=kr,Ei=t.id,Ci=t.overflow,kr=e),e=ah(e,i.children),e.flags|=4096,e)}function Op(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),ud(t.return,e,n)}function Jc(t,e,n,i,r){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r)}function Zx(t,e,n){var i=e.pendingProps,r=i.revealOrder,a=i.tail;if(an(t,e,i.children,n),i=bt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Op(t,n,e);else if(t.tag===19)Op(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ft(bt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Xl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Jc(e,!1,r,n,a);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Xl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Jc(e,!0,n,null,a);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function _l(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Di(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Gr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ne(153));if(e.child!==null){for(t=e.child,n=cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function vy(t,e,n){switch(e.tag){case 3:qx(e),Ga();break;case 5:bx(e);break;case 1:xn(e.type)&&Bl(e);break;case 4:Zf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ft(Hl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ft(bt,bt.current&1),e.flags|=128,null):n&e.child.childLanes?Kx(t,e,n):(ft(bt,bt.current&1),t=Di(t,e,n),t!==null?t.sibling:null);ft(bt,bt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Zx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ft(bt,bt.current),i)break;return null;case 22:case 23:return e.lanes=0,Yx(t,e,n)}return Di(t,e,n)}var Qx,vd,Jx,eg;Qx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vd=function(){};Jx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Pr(di.current);var a=null;switch(n){case"input":r=Bu(t,r),i=Bu(t,i),a=[];break;case"select":r=Et({},r,{value:void 0}),i=Et({},i,{value:void 0}),a=[];break;case"textarea":r=Hu(t,r),i=Hu(t,i),a=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Ol)}Wu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var s=r[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Bo.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in i){var l=i[c];if(s=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Bo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&mt("scroll",t),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(e.updateQueue=c)&&(e.flags|=4)}};eg=function(t,e,n,i){n!==i&&(e.flags|=4)};function po(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function _y(t,e,n){var i=e.pendingProps;switch(jf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(e),null;case 1:return xn(e.type)&&kl(),Yt(e),null;case 3:return i=e.stateNode,Ha(),xt(mn),xt(Qt),Jf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ns(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(Cd(Yn),Yn=null))),vd(t,e),Yt(e),null;case 5:Qf(e);var r=Pr(Qo.current);if(n=e.type,t!==null&&e.stateNode!=null)Jx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ne(166));return Yt(e),null}if(t=Pr(di.current),Ns(e)){i=e.stateNode,n=e.type;var a=e.memoizedProps;switch(i[oi]=e,i[Ko]=a,t=(e.mode&1)!==0,n){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<wo.length;r++)mt(wo[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":Yh(i,a),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!a.multiple},mt("invalid",i);break;case"textarea":qh(i,a),mt("invalid",i)}Wu(n,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?i.textContent!==s&&(a.suppressHydrationWarning!==!0&&Rs(i.textContent,s,t),r=["children",s]):typeof s=="number"&&i.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Rs(i.textContent,s,t),r=["children",""+s]):Bo.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&mt("scroll",i)}switch(n){case"input":Ss(i),$h(i,a,!0);break;case"textarea":Ss(i),Kh(i);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(i.onclick=Ol)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=T0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[oi]=e,t[Ko]=i,Qx(t,e,!1,!1),e.stateNode=t;e:{switch(o=Xu(n,i),n){case"dialog":mt("cancel",t),mt("close",t),r=i;break;case"iframe":case"object":case"embed":mt("load",t),r=i;break;case"video":case"audio":for(r=0;r<wo.length;r++)mt(wo[r],t);r=i;break;case"source":mt("error",t),r=i;break;case"img":case"image":case"link":mt("error",t),mt("load",t),r=i;break;case"details":mt("toggle",t),r=i;break;case"input":Yh(t,i),r=Bu(t,i),mt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Et({},i,{value:void 0}),mt("invalid",t);break;case"textarea":qh(t,i),r=Hu(t,i),mt("invalid",t);break;default:r=i}Wu(n,r),s=r;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?P0(t,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&R0(t,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Go(t,l):typeof l=="number"&&Go(t,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Bo.hasOwnProperty(a)?l!=null&&a==="onScroll"&&mt("scroll",t):l!=null&&Rf(t,a,l,o))}switch(n){case"input":Ss(t),$h(t,i,!1);break;case"textarea":Ss(t),Kh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+dr(i.value));break;case"select":t.multiple=!!i.multiple,a=i.value,a!=null?wa(t,!!i.multiple,a,!1):i.defaultValue!=null&&wa(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Ol)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Yt(e),null;case 6:if(t&&e.stateNode!=null)eg(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ne(166));if(n=Pr(Qo.current),Pr(di.current),Ns(e)){if(i=e.stateNode,n=e.memoizedProps,i[oi]=e,(a=i.nodeValue!==n)&&(t=Cn,t!==null))switch(t.tag){case 3:Rs(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Rs(i.nodeValue,n,(t.mode&1)!==0)}a&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[oi]=e,e.stateNode=i}return Yt(e),null;case 13:if(xt(bt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(vt&&En!==null&&e.mode&1&&!(e.flags&128))vx(),Ga(),e.flags|=98560,a=!1;else if(a=Ns(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ne(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ne(317));a[oi]=e}else Ga(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Yt(e),a=!1}else Yn!==null&&(Cd(Yn),Yn=null),a=!0;if(!a)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||bt.current&1?Dt===0&&(Dt=3):dh())),e.updateQueue!==null&&(e.flags|=4),Yt(e),null);case 4:return Ha(),vd(t,e),t===null&&$o(e.stateNode.containerInfo),Yt(e),null;case 10:return $f(e.type._context),Yt(e),null;case 17:return xn(e.type)&&kl(),Yt(e),null;case 19:if(xt(bt),a=e.memoizedState,a===null)return Yt(e),null;if(i=(e.flags&128)!==0,o=a.rendering,o===null)if(i)po(a,!1);else{if(Dt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Xl(t),o!==null){for(e.flags|=128,po(a,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)a=n,t=i,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=t,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,t=o.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ft(bt,bt.current&1|2),e.child}t=t.sibling}a.tail!==null&&Nt()>Wa&&(e.flags|=128,i=!0,po(a,!1),e.lanes=4194304)}else{if(!i)if(t=Xl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),po(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!vt)return Yt(e),null}else 2*Nt()-a.renderingStartTime>Wa&&n!==1073741824&&(e.flags|=128,i=!0,po(a,!1),e.lanes=4194304);a.isBackwards?(o.sibling=e.child,e.child=o):(n=a.last,n!==null?n.sibling=o:e.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Nt(),e.sibling=null,n=bt.current,ft(bt,i?n&1|2:n&1),e):(Yt(e),null);case 22:case 23:return uh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(Yt(e),e.subtreeFlags&6&&(e.flags|=8192)):Yt(e),null;case 24:return null;case 25:return null}throw Error(ne(156,e.tag))}function yy(t,e){switch(jf(e),e.tag){case 1:return xn(e.type)&&kl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ha(),xt(mn),xt(Qt),Jf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qf(e),null;case 13:if(xt(bt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ne(340));Ga()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return xt(bt),null;case 4:return Ha(),null;case 10:return $f(e.type._context),null;case 22:case 23:return uh(),null;case 24:return null;default:return null}}var Is=!1,Kt=!1,Sy=typeof WeakSet=="function"?WeakSet:Set,pe=null;function Ea(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Tt(t,e,i)}else n.current=null}function _d(t,e,n){try{n()}catch(i){Tt(t,e,i)}}var kp=!1;function My(t,e){if(nd=zl,t=ax(),Vf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(s=o+r),p!==a||i!==0&&p.nodeType!==3||(l=o+i),p.nodeType===3&&(o+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++c===r&&(s=o),h===a&&++f===i&&(l=o),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(id={focusedElem:t,selectionRange:n},zl=!1,pe=e;pe!==null;)if(e=pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pe=t;else for(;pe!==null;){e=pe;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,x=_.memoizedState,u=e.stateNode,g=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:Wn(e.type,y),x);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ne(163))}}catch(b){Tt(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,pe=t;break}pe=e.return}return _=kp,kp=!1,_}function zo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var a=r.destroy;r.destroy=void 0,a!==void 0&&_d(e,n,a)}r=r.next}while(r!==i)}}function pc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function yd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tg(t){var e=t.alternate;e!==null&&(t.alternate=null,tg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[oi],delete e[Ko],delete e[od],delete e[ry],delete e[ay])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ng(t){return t.tag===5||t.tag===3||t.tag===4}function Bp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ng(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Sd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ol));else if(i!==4&&(t=t.child,t!==null))for(Sd(t,e,n),t=t.sibling;t!==null;)Sd(t,e,n),t=t.sibling}function Md(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Md(t,e,n),t=t.sibling;t!==null;)Md(t,e,n),t=t.sibling}var Vt=null,Xn=!1;function Oi(t,e,n){for(n=n.child;n!==null;)ig(t,e,n),n=n.sibling}function ig(t,e,n){if(ui&&typeof ui.onCommitFiberUnmount=="function")try{ui.onCommitFiberUnmount(oc,n)}catch{}switch(n.tag){case 5:Kt||Ea(n,e);case 6:var i=Vt,r=Xn;Vt=null,Oi(t,e,n),Vt=i,Xn=r,Vt!==null&&(Xn?(t=Vt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Vt.removeChild(n.stateNode));break;case 18:Vt!==null&&(Xn?(t=Vt,n=n.stateNode,t.nodeType===8?Xc(t.parentNode,n):t.nodeType===1&&Xc(t,n),Wo(t)):Xc(Vt,n.stateNode));break;case 4:i=Vt,r=Xn,Vt=n.stateNode.containerInfo,Xn=!0,Oi(t,e,n),Vt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!Kt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&_d(n,e,o),r=r.next}while(r!==i)}Oi(t,e,n);break;case 1:if(!Kt&&(Ea(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(s){Tt(n,e,s)}Oi(t,e,n);break;case 21:Oi(t,e,n);break;case 22:n.mode&1?(Kt=(i=Kt)||n.memoizedState!==null,Oi(t,e,n),Kt=i):Oi(t,e,n);break;default:Oi(t,e,n)}}function Gp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Sy),e.forEach(function(i){var r=Py.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Gn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var a=t,o=e,s=o;e:for(;s!==null;){switch(s.tag){case 5:Vt=s.stateNode,Xn=!1;break e;case 3:Vt=s.stateNode.containerInfo,Xn=!0;break e;case 4:Vt=s.stateNode.containerInfo,Xn=!0;break e}s=s.return}if(Vt===null)throw Error(ne(160));ig(a,o,r),Vt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)rg(e,t),e=e.sibling}function rg(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gn(e,t),ii(t),i&4){try{zo(3,t,t.return),pc(3,t)}catch(y){Tt(t,t.return,y)}try{zo(5,t,t.return)}catch(y){Tt(t,t.return,y)}}break;case 1:Gn(e,t),ii(t),i&512&&n!==null&&Ea(n,n.return);break;case 5:if(Gn(e,t),ii(t),i&512&&n!==null&&Ea(n,n.return),t.flags&32){var r=t.stateNode;try{Go(r,"")}catch(y){Tt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var a=t.memoizedProps,o=n!==null?n.memoizedProps:a,s=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&C0(r,a),Xu(s,o);var c=Xu(s,a);for(o=0;o<l.length;o+=2){var f=l[o],p=l[o+1];f==="style"?P0(r,p):f==="dangerouslySetInnerHTML"?R0(r,p):f==="children"?Go(r,p):Rf(r,f,p,c)}switch(s){case"input":Gu(r,a);break;case"textarea":w0(r,a);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var m=a.value;m!=null?wa(r,!!a.multiple,m,!1):h!==!!a.multiple&&(a.defaultValue!=null?wa(r,!!a.multiple,a.defaultValue,!0):wa(r,!!a.multiple,a.multiple?[]:"",!1))}r[Ko]=a}catch(y){Tt(t,t.return,y)}}break;case 6:if(Gn(e,t),ii(t),i&4){if(t.stateNode===null)throw Error(ne(162));r=t.stateNode,a=t.memoizedProps;try{r.nodeValue=a}catch(y){Tt(t,t.return,y)}}break;case 3:if(Gn(e,t),ii(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Wo(e.containerInfo)}catch(y){Tt(t,t.return,y)}break;case 4:Gn(e,t),ii(t);break;case 13:Gn(e,t),ii(t),r=t.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||(lh=Nt())),i&4&&Gp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Kt=(c=Kt)||f,Gn(e,t),Kt=c):Gn(e,t),ii(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(pe=t,f=t.child;f!==null;){for(p=pe=f;pe!==null;){switch(h=pe,m=h.child,h.tag){case 0:case 11:case 14:case 15:zo(4,h,h.return);break;case 1:Ea(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){Tt(i,n,y)}}break;case 5:Ea(h,h.return);break;case 22:if(h.memoizedState!==null){Hp(p);continue}}m!==null?(m.return=h,pe=m):Hp(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,c?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=p.stateNode,l=p.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=N0("display",o))}catch(y){Tt(t,t.return,y)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(y){Tt(t,t.return,y)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Gn(e,t),ii(t),i&4&&Gp(t);break;case 21:break;default:Gn(e,t),ii(t)}}function ii(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(ng(n)){var i=n;break e}n=n.return}throw Error(ne(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Go(r,""),i.flags&=-33);var a=Bp(t);Md(t,a,r);break;case 3:case 4:var o=i.stateNode.containerInfo,s=Bp(t);Sd(t,s,o);break;default:throw Error(ne(161))}}catch(l){Tt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function by(t,e,n){pe=t,ag(t)}function ag(t,e,n){for(var i=(t.mode&1)!==0;pe!==null;){var r=pe,a=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Is;if(!o){var s=r.alternate,l=s!==null&&s.memoizedState!==null||Kt;s=Is;var c=Kt;if(Is=o,(Kt=l)&&!c)for(pe=r;pe!==null;)o=pe,l=o.child,o.tag===22&&o.memoizedState!==null?jp(r):l!==null?(l.return=o,pe=l):jp(r);for(;a!==null;)pe=a,ag(a),a=a.sibling;pe=r,Is=s,Kt=c}Vp(t)}else r.subtreeFlags&8772&&a!==null?(a.return=r,pe=a):Vp(t)}}function Vp(t){for(;pe!==null;){var e=pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Kt||pc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Kt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var a=e.updateQueue;a!==null&&Cp(e,a,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Cp(e,o,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Wo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ne(163))}Kt||e.flags&512&&yd(e)}catch(h){Tt(e,e.return,h)}}if(e===t){pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,pe=n;break}pe=e.return}}function Hp(t){for(;pe!==null;){var e=pe;if(e===t){pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,pe=n;break}pe=e.return}}function jp(t){for(;pe!==null;){var e=pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{pc(4,e)}catch(l){Tt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var a=e.return;try{yd(e)}catch(l){Tt(e,a,l)}break;case 5:var o=e.return;try{yd(e)}catch(l){Tt(e,o,l)}}}catch(l){Tt(e,e.return,l)}if(e===t){pe=null;break}var s=e.sibling;if(s!==null){s.return=e.return,pe=s;break}pe=e.return}}var Ay=Math.ceil,ql=Ui.ReactCurrentDispatcher,oh=Ui.ReactCurrentOwner,Fn=Ui.ReactCurrentBatchConfig,et=0,kt=null,Lt=null,jt=0,Mn=0,Ca=mr(0),Dt=0,ns=null,Gr=0,mc=0,sh=0,Uo=null,hn=null,lh=0,Wa=1/0,Si=null,Kl=!1,bd=null,sr=null,Ds=!1,er=null,Zl=0,Fo=0,Ad=null,yl=-1,Sl=0;function on(){return et&6?Nt():yl!==-1?yl:yl=Nt()}function lr(t){return t.mode&1?et&2&&jt!==0?jt&-jt:sy.transition!==null?(Sl===0&&(Sl=H0()),Sl):(t=at,t!==0||(t=window.event,t=t===void 0?16:K0(t.type)),t):1}function Zn(t,e,n,i){if(50<Fo)throw Fo=0,Ad=null,Error(ne(185));ds(t,n,i),(!(et&2)||t!==kt)&&(t===kt&&(!(et&2)&&(mc|=n),Dt===4&&Ki(t,jt)),gn(t,i),n===1&&et===0&&!(e.mode&1)&&(Wa=Nt()+500,dc&&xr()))}function gn(t,e){var n=t.callbackNode;s_(t,e);var i=Dl(t,t===kt?jt:0);if(i===0)n!==null&&Jh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Jh(n),e===1)t.tag===0?oy(Wp.bind(null,t)):mx(Wp.bind(null,t)),ny(function(){!(et&6)&&xr()}),n=null;else{switch(j0(i)){case 1:n=Df;break;case 4:n=G0;break;case 16:n=Il;break;case 536870912:n=V0;break;default:n=Il}n=hg(n,og.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function og(t,e){if(yl=-1,Sl=0,et&6)throw Error(ne(327));var n=t.callbackNode;if(La()&&t.callbackNode!==n)return null;var i=Dl(t,t===kt?jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ql(t,i);else{e=i;var r=et;et|=2;var a=lg();(kt!==t||jt!==e)&&(Si=null,Wa=Nt()+500,Ur(t,e));do try{wy();break}catch(s){sg(t,s)}while(!0);Yf(),ql.current=a,et=r,Lt!==null?e=0:(kt=null,jt=0,e=Dt)}if(e!==0){if(e===2&&(r=Zu(t),r!==0&&(i=r,e=Ed(t,r))),e===1)throw n=ns,Ur(t,0),Ki(t,i),gn(t,Nt()),n;if(e===6)Ki(t,i);else{if(r=t.current.alternate,!(i&30)&&!Ey(r)&&(e=Ql(t,i),e===2&&(a=Zu(t),a!==0&&(i=a,e=Ed(t,a))),e===1))throw n=ns,Ur(t,0),Ki(t,i),gn(t,Nt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ne(345));case 2:Cr(t,hn,Si);break;case 3:if(Ki(t,i),(i&130023424)===i&&(e=lh+500-Nt(),10<e)){if(Dl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){on(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=ad(Cr.bind(null,t,hn,Si),e);break}Cr(t,hn,Si);break;case 4:if(Ki(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Kn(i);a=1<<o,o=e[o],o>r&&(r=o),i&=~a}if(i=r,i=Nt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Ay(i/1960))-i,10<i){t.timeoutHandle=ad(Cr.bind(null,t,hn,Si),i);break}Cr(t,hn,Si);break;case 5:Cr(t,hn,Si);break;default:throw Error(ne(329))}}}return gn(t,Nt()),t.callbackNode===n?og.bind(null,t):null}function Ed(t,e){var n=Uo;return t.current.memoizedState.isDehydrated&&(Ur(t,e).flags|=256),t=Ql(t,e),t!==2&&(e=hn,hn=n,e!==null&&Cd(e)),t}function Cd(t){hn===null?hn=t:hn.push.apply(hn,t)}function Ey(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],a=r.getSnapshot;r=r.value;try{if(!Jn(a(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ki(t,e){for(e&=~sh,e&=~mc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Kn(e),i=1<<n;t[n]=-1,e&=~i}}function Wp(t){if(et&6)throw Error(ne(327));La();var e=Dl(t,0);if(!(e&1))return gn(t,Nt()),null;var n=Ql(t,e);if(t.tag!==0&&n===2){var i=Zu(t);i!==0&&(e=i,n=Ed(t,i))}if(n===1)throw n=ns,Ur(t,0),Ki(t,e),gn(t,Nt()),n;if(n===6)throw Error(ne(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Cr(t,hn,Si),gn(t,Nt()),null}function ch(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(Wa=Nt()+500,dc&&xr())}}function Vr(t){er!==null&&er.tag===0&&!(et&6)&&La();var e=et;et|=1;var n=Fn.transition,i=at;try{if(Fn.transition=null,at=1,t)return t()}finally{at=i,Fn.transition=n,et=e,!(et&6)&&xr()}}function uh(){Mn=Ca.current,xt(Ca)}function Ur(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ty(n)),Lt!==null)for(n=Lt.return;n!==null;){var i=n;switch(jf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&kl();break;case 3:Ha(),xt(mn),xt(Qt),Jf();break;case 5:Qf(i);break;case 4:Ha();break;case 13:xt(bt);break;case 19:xt(bt);break;case 10:$f(i.type._context);break;case 22:case 23:uh()}n=n.return}if(kt=t,Lt=t=cr(t.current,null),jt=Mn=e,Dt=0,ns=null,sh=mc=Gr=0,hn=Uo=null,Nr!==null){for(e=0;e<Nr.length;e++)if(n=Nr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,a=n.pending;if(a!==null){var o=a.next;a.next=r,i.next=o}n.pending=i}Nr=null}return t}function sg(t,e){do{var n=Lt;try{if(Yf(),gl.current=$l,Yl){for(var i=At.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Yl=!1}if(Br=0,Ot=It=At=null,Do=!1,Jo=0,oh.current=null,n===null||n.return===null){Dt=1,ns=e,Lt=null;break}e:{var a=t,o=n.return,s=n,l=e;if(e=jt,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=s,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=Lp(o);if(m!==null){m.flags&=-257,Ip(m,o,s,a,e),m.mode&1&&Pp(a,c,e),e=m,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){Pp(a,c,e),dh();break e}l=Error(ne(426))}}else if(vt&&s.mode&1){var x=Lp(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Ip(x,o,s,a,e),Wf(ja(l,s));break e}}a=l=ja(l,s),Dt!==4&&(Dt=2),Uo===null?Uo=[a]:Uo.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,e&=-e,a.lanes|=e;var u=jx(a,l,e);Ep(a,u);break e;case 1:s=l;var g=a.type,v=a.stateNode;if(!(a.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(sr===null||!sr.has(v)))){a.flags|=65536,e&=-e,a.lanes|=e;var b=Wx(a,s,e);Ep(a,b);break e}}a=a.return}while(a!==null)}ug(n)}catch(T){e=T,Lt===n&&n!==null&&(Lt=n=n.return);continue}break}while(!0)}function lg(){var t=ql.current;return ql.current=$l,t===null?$l:t}function dh(){(Dt===0||Dt===3||Dt===2)&&(Dt=4),kt===null||!(Gr&268435455)&&!(mc&268435455)||Ki(kt,jt)}function Ql(t,e){var n=et;et|=2;var i=lg();(kt!==t||jt!==e)&&(Si=null,Ur(t,e));do try{Cy();break}catch(r){sg(t,r)}while(!0);if(Yf(),et=n,ql.current=i,Lt!==null)throw Error(ne(261));return kt=null,jt=0,Dt}function Cy(){for(;Lt!==null;)cg(Lt)}function wy(){for(;Lt!==null&&!Qv();)cg(Lt)}function cg(t){var e=fg(t.alternate,t,Mn);t.memoizedProps=t.pendingProps,e===null?ug(t):Lt=e,oh.current=null}function ug(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=yy(n,e),n!==null){n.flags&=32767,Lt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Dt=6,Lt=null;return}}else if(n=_y(n,e,Mn),n!==null){Lt=n;return}if(e=e.sibling,e!==null){Lt=e;return}Lt=e=t}while(e!==null);Dt===0&&(Dt=5)}function Cr(t,e,n){var i=at,r=Fn.transition;try{Fn.transition=null,at=1,Ty(t,e,n,i)}finally{Fn.transition=r,at=i}return null}function Ty(t,e,n,i){do La();while(er!==null);if(et&6)throw Error(ne(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ne(177));t.callbackNode=null,t.callbackPriority=0;var a=n.lanes|n.childLanes;if(l_(t,a),t===kt&&(Lt=kt=null,jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ds||(Ds=!0,hg(Il,function(){return La(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Fn.transition,Fn.transition=null;var o=at;at=1;var s=et;et|=4,oh.current=null,My(t,n),rg(n,t),$_(id),zl=!!nd,id=nd=null,t.current=n,by(n),Jv(),et=s,at=o,Fn.transition=a}else t.current=n;if(Ds&&(Ds=!1,er=t,Zl=r),a=t.pendingLanes,a===0&&(sr=null),n_(n.stateNode),gn(t,Nt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Kl)throw Kl=!1,t=bd,bd=null,t;return Zl&1&&t.tag!==0&&La(),a=t.pendingLanes,a&1?t===Ad?Fo++:(Fo=0,Ad=t):Fo=0,xr(),null}function La(){if(er!==null){var t=j0(Zl),e=Fn.transition,n=at;try{if(Fn.transition=null,at=16>t?16:t,er===null)var i=!1;else{if(t=er,er=null,Zl=0,et&6)throw Error(ne(331));var r=et;for(et|=4,pe=t.current;pe!==null;){var a=pe,o=a.child;if(pe.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(pe=c;pe!==null;){var f=pe;switch(f.tag){case 0:case 11:case 15:zo(8,f,a)}var p=f.child;if(p!==null)p.return=f,pe=p;else for(;pe!==null;){f=pe;var h=f.sibling,m=f.return;if(tg(f),f===c){pe=null;break}if(h!==null){h.return=m,pe=h;break}pe=m}}}var _=a.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var x=y.sibling;y.sibling=null,y=x}while(y!==null)}}pe=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,pe=o;else e:for(;pe!==null;){if(a=pe,a.flags&2048)switch(a.tag){case 0:case 11:case 15:zo(9,a,a.return)}var u=a.sibling;if(u!==null){u.return=a.return,pe=u;break e}pe=a.return}}var g=t.current;for(pe=g;pe!==null;){o=pe;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,pe=v;else e:for(o=g;pe!==null;){if(s=pe,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:pc(9,s)}}catch(T){Tt(s,s.return,T)}if(s===o){pe=null;break e}var b=s.sibling;if(b!==null){b.return=s.return,pe=b;break e}pe=s.return}}if(et=r,xr(),ui&&typeof ui.onPostCommitFiberRoot=="function")try{ui.onPostCommitFiberRoot(oc,t)}catch{}i=!0}return i}finally{at=n,Fn.transition=e}}return!1}function Xp(t,e,n){e=ja(n,e),e=jx(t,e,1),t=or(t,e,1),e=on(),t!==null&&(ds(t,1,e),gn(t,e))}function Tt(t,e,n){if(t.tag===3)Xp(t,t,n);else for(;e!==null;){if(e.tag===3){Xp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(sr===null||!sr.has(i))){t=ja(n,t),t=Wx(e,t,1),e=or(e,t,1),t=on(),e!==null&&(ds(e,1,t),gn(e,t));break}}e=e.return}}function Ry(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=on(),t.pingedLanes|=t.suspendedLanes&n,kt===t&&(jt&n)===n&&(Dt===4||Dt===3&&(jt&130023424)===jt&&500>Nt()-lh?Ur(t,0):sh|=n),gn(t,e)}function dg(t,e){e===0&&(t.mode&1?(e=As,As<<=1,!(As&130023424)&&(As=4194304)):e=1);var n=on();t=Ii(t,e),t!==null&&(ds(t,e,n),gn(t,n))}function Ny(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dg(t,n)}function Py(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ne(314))}i!==null&&i.delete(e),dg(t,n)}var fg;fg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return pn=!1,vy(t,e,n);pn=!!(t.flags&131072)}else pn=!1,vt&&e.flags&1048576&&xx(e,Vl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;_l(t,e),t=e.pendingProps;var r=Ba(e,Qt.current);Pa(e,n),r=th(null,e,i,t,r,n);var a=nh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,xn(i)?(a=!0,Bl(e)):a=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Kf(e),r.updater=hc,e.stateNode=r,r._reactInternals=e,fd(e,i,t,n),e=md(null,e,i,!0,a,n)):(e.tag=0,vt&&a&&Hf(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(_l(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Iy(i),t=Wn(i,t),r){case 0:e=pd(null,e,i,t,n);break e;case 1:e=Up(null,e,i,t,n);break e;case 11:e=Dp(null,e,i,t,n);break e;case 14:e=zp(null,e,i,Wn(i.type,t),n);break e}throw Error(ne(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),pd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Up(t,e,i,r,n);case 3:e:{if(qx(e),t===null)throw Error(ne(387));i=e.pendingProps,a=e.memoizedState,r=a.element,Mx(t,e),Wl(e,i,null,n);var o=e.memoizedState;if(i=o.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){r=ja(Error(ne(423)),e),e=Fp(t,e,i,n,r);break e}else if(i!==r){r=ja(Error(ne(424)),e),e=Fp(t,e,i,n,r);break e}else for(En=ar(e.stateNode.containerInfo.firstChild),Cn=e,vt=!0,Yn=null,n=yx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ga(),i===r){e=Di(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return bx(e),t===null&&cd(e),i=e.type,r=e.pendingProps,a=t!==null?t.memoizedProps:null,o=r.children,rd(i,r)?o=null:a!==null&&rd(i,a)&&(e.flags|=32),$x(t,e),an(t,e,o,n),e.child;case 6:return t===null&&cd(e),null;case 13:return Kx(t,e,n);case 4:return Zf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Va(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Dp(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,a=e.memoizedProps,o=r.value,ft(Hl,i._currentValue),i._currentValue=o,a!==null)if(Jn(a.value,o)){if(a.children===r.children&&!mn.current){e=Di(t,e,n);break e}}else for(a=e.child,a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===i){if(a.tag===1){l=Ti(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),ud(a.return,n,e),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===e.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(ne(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),ud(o,n,e),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===e){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Pa(e,n),r=On(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),zp(t,e,i,r,n);case 15:return Xx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),_l(t,e),e.tag=1,xn(i)?(t=!0,Bl(e)):t=!1,Pa(e,n),Hx(e,i,r),fd(e,i,r,n),md(null,e,i,!0,t,n);case 19:return Zx(t,e,n);case 22:return Yx(t,e,n)}throw Error(ne(156,e.tag))};function hg(t,e){return B0(t,e)}function Ly(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(t,e,n,i){return new Ly(t,e,n,i)}function fh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Iy(t){if(typeof t=="function")return fh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Pf)return 11;if(t===Lf)return 14}return 2}function cr(t,e){var n=t.alternate;return n===null?(n=zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ml(t,e,n,i,r,a){var o=2;if(i=t,typeof t=="function")fh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case xa:return Fr(n.children,r,a,e);case Nf:o=8,r|=8;break;case Uu:return t=zn(12,n,e,r|2),t.elementType=Uu,t.lanes=a,t;case Fu:return t=zn(13,n,e,r),t.elementType=Fu,t.lanes=a,t;case Ou:return t=zn(19,n,e,r),t.elementType=Ou,t.lanes=a,t;case b0:return xc(n,r,a,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case S0:o=10;break e;case M0:o=9;break e;case Pf:o=11;break e;case Lf:o=14;break e;case Xi:o=16,i=null;break e}throw Error(ne(130,t==null?t:typeof t,""))}return e=zn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=a,e}function Fr(t,e,n,i){return t=zn(7,t,i,e),t.lanes=n,t}function xc(t,e,n,i){return t=zn(22,t,i,e),t.elementType=b0,t.lanes=n,t.stateNode={isHidden:!1},t}function eu(t,e,n){return t=zn(6,t,null,e),t.lanes=n,t}function tu(t,e,n){return e=zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Dy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function hh(t,e,n,i,r,a,o,s,l){return t=new Dy(t,e,n,s,l),e===1?(e=1,a===!0&&(e|=8)):e=0,a=zn(3,null,null,e),t.current=a,a.stateNode=t,a.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Kf(a),t}function zy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ma,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function pg(t){if(!t)return fr;t=t._reactInternals;e:{if(Xr(t)!==t||t.tag!==1)throw Error(ne(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(xn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ne(171))}if(t.tag===1){var n=t.type;if(xn(n))return px(t,n,e)}return e}function mg(t,e,n,i,r,a,o,s,l){return t=hh(n,i,!0,t,r,a,o,s,l),t.context=pg(null),n=t.current,i=on(),r=lr(n),a=Ti(i,r),a.callback=e??null,or(n,a,r),t.current.lanes=r,ds(t,r,i),gn(t,i),t}function gc(t,e,n,i){var r=e.current,a=on(),o=lr(r);return n=pg(n),e.context===null?e.context=n:e.pendingContext=n,e=Ti(a,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=or(r,e,o),t!==null&&(Zn(t,r,o,a),xl(t,r,o)),o}function Jl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Yp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ph(t,e){Yp(t,e),(t=t.alternate)&&Yp(t,e)}function Uy(){return null}var xg=typeof reportError=="function"?reportError:function(t){console.error(t)};function mh(t){this._internalRoot=t}vc.prototype.render=mh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ne(409));gc(t,e,null,null)};vc.prototype.unmount=mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Vr(function(){gc(null,t,null,null)}),e[Li]=null}};function vc(t){this._internalRoot=t}vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Y0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<qi.length&&e!==0&&e<qi[n].priority;n++);qi.splice(n,0,t),n===0&&q0(t)}};function xh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function _c(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function $p(){}function Fy(t,e,n,i,r){if(r){if(typeof i=="function"){var a=i;i=function(){var c=Jl(o);a.call(c)}}var o=mg(e,i,t,0,null,!1,!1,"",$p);return t._reactRootContainer=o,t[Li]=o.current,$o(t.nodeType===8?t.parentNode:t),Vr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var s=i;i=function(){var c=Jl(l);s.call(c)}}var l=hh(t,0,!1,null,null,!1,!1,"",$p);return t._reactRootContainer=l,t[Li]=l.current,$o(t.nodeType===8?t.parentNode:t),Vr(function(){gc(e,l,n,i)}),l}function yc(t,e,n,i,r){var a=n._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var s=r;r=function(){var l=Jl(o);s.call(l)}}gc(e,o,t,r)}else o=Fy(n,e,t,r,i);return Jl(o)}W0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Co(e.pendingLanes);n!==0&&(zf(e,n|1),gn(e,Nt()),!(et&6)&&(Wa=Nt()+500,xr()))}break;case 13:Vr(function(){var i=Ii(t,1);if(i!==null){var r=on();Zn(i,t,1,r)}}),ph(t,1)}};Uf=function(t){if(t.tag===13){var e=Ii(t,134217728);if(e!==null){var n=on();Zn(e,t,134217728,n)}ph(t,134217728)}};X0=function(t){if(t.tag===13){var e=lr(t),n=Ii(t,e);if(n!==null){var i=on();Zn(n,t,e,i)}ph(t,e)}};Y0=function(){return at};$0=function(t,e){var n=at;try{return at=t,e()}finally{at=n}};$u=function(t,e,n){switch(e){case"input":if(Gu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=uc(i);if(!r)throw Error(ne(90));E0(i),Gu(i,r)}}}break;case"textarea":w0(t,n);break;case"select":e=n.value,e!=null&&wa(t,!!n.multiple,e,!1)}};D0=ch;z0=Vr;var Oy={usingClientEntryPoint:!1,Events:[hs,ya,uc,L0,I0,ch]},mo={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ky={bundleType:mo.bundleType,version:mo.version,rendererPackageName:mo.rendererPackageName,rendererConfig:mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ui.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=O0(t),t===null?null:t.stateNode},findFiberByHostInstance:mo.findFiberByHostInstance||Uy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zs.isDisabled&&zs.supportsFiber)try{oc=zs.inject(ky),ui=zs}catch{}}Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Oy;Rn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xh(e))throw Error(ne(200));return zy(t,e,null,n)};Rn.createRoot=function(t,e){if(!xh(t))throw Error(ne(299));var n=!1,i="",r=xg;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=hh(t,1,!1,null,null,n,!1,i,r),t[Li]=e.current,$o(t.nodeType===8?t.parentNode:t),new mh(e)};Rn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ne(188)):(t=Object.keys(t).join(","),Error(ne(268,t)));return t=O0(e),t=t===null?null:t.stateNode,t};Rn.flushSync=function(t){return Vr(t)};Rn.hydrate=function(t,e,n){if(!_c(e))throw Error(ne(200));return yc(null,t,e,!0,n)};Rn.hydrateRoot=function(t,e,n){if(!xh(t))throw Error(ne(405));var i=n!=null&&n.hydratedSources||null,r=!1,a="",o=xg;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=mg(e,null,t,1,n??null,r,!1,a,o),t[Li]=e.current,$o(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new vc(e)};Rn.render=function(t,e,n){if(!_c(e))throw Error(ne(200));return yc(null,t,e,!1,n)};Rn.unmountComponentAtNode=function(t){if(!_c(t))throw Error(ne(40));return t._reactRootContainer?(Vr(function(){yc(null,null,t,!1,function(){t._reactRootContainer=null,t[Li]=null})}),!0):!1};Rn.unstable_batchedUpdates=ch;Rn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!_c(n))throw Error(ne(200));if(t==null||t._reactInternals===void 0)throw Error(ne(38));return yc(t,e,n,!1,i)};Rn.version="18.3.1-next-f1338f8080-20240426";function gg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gg)}catch(t){console.error(t)}}gg(),g0.exports=Rn;var By=g0.exports,vg,qp=By;vg=qp.createRoot,qp.hydrateRoot;const Gy="/csd.station.italia/assets/logo-BxX5Tg7S.png";function Vy({current:t,onNavigate:e,onOpenChat:n}){return d.jsx("header",{id:"site-header",className:"sticky top-0 z-20 header-anim backdrop-blur",children:d.jsxs("div",{className:"px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 flex items-center justify-between",children:[d.jsxs("div",{className:"flex items-center gap-3 cursor-pointer",onClick:()=>e("home"),children:[d.jsx("img",{src:Gy,alt:"CSD Station logo",className:"h-10 w-10 md:h-12 md:w-12 rounded-md object-contain"}),d.jsx("h2",{className:"text-cream text-lg font-bold font-heading tracking-tight",children:"CSD Station"})]}),d.jsxs("nav",{className:"hidden md:flex items-center gap-8",children:[d.jsx("button",{className:`text-sm font-medium transition-colors ${t==="home"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("home"),children:"Home"}),d.jsx("button",{className:`text-sm font-medium transition-colors ${t==="servizi"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("servizi"),children:"Servizi"}),d.jsx("button",{className:`text-sm font-medium transition-colors ${t==="chiSiamo"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("chiSiamo"),children:"Chi Siamo"}),d.jsx("button",{className:`text-sm font-medium transition-colors ${t==="contatti"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("contatti"),children:"Contatti"})]})]})})}function Hy({onNavigate:t}){const e=new Date().getFullYear();return d.jsx("footer",{id:"site-footer",className:"mt-16 border-t border-white/10",children:d.jsxs("div",{className:"px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 flex flex-col gap-8 text-sm",children:[d.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10",children:[d.jsxs("div",{children:[d.jsx("h4",{className:"text-xl font-bold text-white mb-2",children:"Hai un processo da automatizzare?"}),d.jsx("p",{className:"text-gray-400",children:"Parla con noi per una consulenza rapida."})]}),d.jsx("button",{onClick:()=>t==null?void 0:t("contatti"),className:"bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors",children:"Contattaci"})]}),d.jsxs("div",{className:"flex items-center justify-between gap-4",children:[d.jsxs("div",{className:"flex flex-col gap-1",children:[d.jsxs("div",{className:"text-gray-400",children:["© ",e," CSD Station — Sezione Italia"]}),d.jsx("div",{className:"text-gray-600 text-[10px] md:text-xs",children:"DIE (Document Intelligence Engine) è una proprietà intellettuale riservata di Carlo Galli."})]}),d.jsxs("div",{className:"flex flex-wrap gap-2",children:[d.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"AI Agentics"}),d.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"Automazione"}),d.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"OpenAI SDK"})]})]}),d.jsxs("div",{className:"flex items-center justify-end gap-6",children:[d.jsxs("nav",{className:"flex items-center gap-4",children:[d.jsx("button",{onClick:()=>t==null?void 0:t("documentation"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left",children:"Documentation"}),d.jsx("button",{className:"text-white/60 hover:text-white/80 transition-colors text-left",disabled:!0,title:"In arrivo",children:"QR Code"}),d.jsx("button",{onClick:()=>t==null?void 0:t("contatti"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left",children:"Servizio Clienti"}),d.jsx("button",{className:"text-white/60 hover:text-white/80 transition-colors text-left",disabled:!0,title:"In arrivo",children:"Careers"})]}),d.jsxs("div",{className:"flex items-center gap-4",children:[d.jsx("a",{"aria-label":"LinkedIn",href:"https://www.linkedin.com/in/carlo-galli-086303367/",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle",children:d.jsx("svg",{className:"w-5 h-5 transform -translate-y-[1px]",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",role:"img",focusable:"false",children:d.jsx("path",{d:"M4.983 3.5c0 1.381-1.11 2.5-2.482 2.5C1.12 6 0 4.881 0 3.5 0 2.12 1.12 1 2.501 1c1.372 0 2.482 1.12 2.482 2.5zM.25 8.25h4.5v15.5H.25V8.25zM8.75 8.25h4.309v2.117h.062c.6-1.137 2.066-2.338 4.254-2.338 4.55 0 5.392 2.992 5.392 6.881v8.84h-4.5v-7.84c0-1.871-.033-4.277-2.607-4.277-2.61 0-3.01 2.04-3.01 4.145v7.972h-4.5V8.25z"})})}),d.jsx("a",{"aria-label":"GitHub",href:"https://github.com/TheRealGalli",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle",children:d.jsx("svg",{className:"w-5 h-5 transform translate-y-[1px]",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",role:"img",focusable:"false",children:d.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 .5C5.73.5.98 5.245.98 11.51c0 4.853 3.152 8.965 7.523 10.414.55.104.75-.237.75-.53 0-.262-.01-1.135-.017-2.06-3.06.665-3.705-1.296-3.705-1.296-.5-1.272-1.222-1.612-1.222-1.612-.998-.683.076-.67.076-.67 1.103.078 1.683 1.132 1.683 1.132.982 1.682 2.575 1.196 3.203.915.1-.712.384-1.196.698-1.472-2.441-.277-5.009-1.22-5.009-5.427 0-1.198.427-2.177 1.13-2.946-.113-.277-.49-1.396.106-2.91 0 0 .92-.294 3.017 1.127.874-.243 1.81-.365 2.742-.369.93.004 1.867.126 2.742.369 2.097-1.42 3.016-1.127 3.016-1.127.597 1.514.22 2.633.107 2.91.704.769 1.13 1.748 1.13 2.946 0 4.22-2.574 5.147-5.023 5.418.395.34.747 1.01.747 2.036 0 1.47-.013 2.654-.013 3.016 0 .296.198.64.757.53 4.366-1.45 7.516-5.56 7.516-10.413C23.02 5.245 18.27.5 12 .5z"})})})]})]}),d.jsxs("div",{className:"pt-4 border-t border-white/10 flex items-center justify-end gap-6 text-xs",children:[d.jsx("button",{onClick:()=>t==null?void 0:t("terms"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors",children:"Terms of Service"}),d.jsx("button",{onClick:()=>t==null?void 0:t("privacy"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors",children:"Privacy Policy"})]})]})})}function _g({onOpenChat:t}){const e=Ke.useRef(null);return Ke.useEffect(()=>{if(!document.querySelector('link[data-calcss="gcal-scheduling"]')){const i=document.createElement("link");i.rel="stylesheet",i.href="https://calendar.google.com/calendar/scheduling-button-script.css",i.setAttribute("data-calcss","gcal-scheduling"),document.head.appendChild(i)}function n(){var i,r;(r=(i=window.calendar)==null?void 0:i.schedulingButton)!=null&&r.load&&e.current&&window.calendar.schedulingButton.load({url:"https://calendar.google.com/calendar/appointments/schedules/AcZssZ0E8CK2CQprdzregpJedXs7o3oamfFtB3OTBbuvS7Z6Zi_P5YxA7VB-pjZzlqGu-R0cHLtCRXFU?gv=true",color:"#039BE5",label:"Fissa un appuntamento",target:e.current})}if(window.calendar)n();else{const i=document.createElement("script");i.src="https://calendar.google.com/calendar/scheduling-button-script.js",i.async=!0,i.onload=n,document.body.appendChild(i)}},[]),d.jsxs("div",{className:"flex flex-col gap-20 md:gap-32 pb-20",children:[d.jsxs("section",{className:"relative flex flex-col items-center text-center pt-44 md:pt-32 gap-8 px-4",children:[d.jsx("div",{className:"absolute inset-x-0 top-14 md:top-0 flex justify-center pointer-events-none select-none z-0 opacity-80",children:d.jsxs("svg",{className:"w-[90%] max-w-6xl h-32 md:h-48",viewBox:"0 0 1120 260",fill:"none",xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",children:[d.jsxs("defs",{children:[d.jsxs("linearGradient",{id:"arcGrad",x1:"0",y1:"0",x2:"1120",y2:"0",gradientUnits:"userSpaceOnUse",children:[d.jsx("stop",{offset:"0%",stopColor:"rgba(16,185,129,0.55)"}),d.jsx("stop",{offset:"50%",stopColor:"rgba(58,125,255,0.9)"}),d.jsx("stop",{offset:"100%",stopColor:"rgba(16,185,129,0.55)"})]}),d.jsx("mask",{id:"arcMask",children:d.jsx("rect",{x:"0",y:"0",width:"1120",height:"260",fill:"white",fillOpacity:"0.8"})}),d.jsxs("filter",{id:"arcGlow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[d.jsx("feGaussianBlur",{stdDeviation:"6",result:"blur"}),d.jsxs("feMerge",{children:[d.jsx("feMergeNode",{in:"blur"}),d.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),d.jsx("g",{mask:"url(#arcMask)",filter:"url(#arcGlow)",children:[184,196,208,220,232,244,256].map((n,i)=>d.jsxs("g",{children:[d.jsxs("path",{d:`M560 40 Q 840 40 1080 ${n}`,stroke:"url(#arcGrad)",strokeWidth:i===3?3:i%2===0?2:1.6,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke",pathLength:"500",strokeDasharray:"0 500",opacity:"0",children:[d.jsx("animate",{attributeName:"stroke-dasharray",values:"0 500;500 0;0 500",keyTimes:"0;0.5;1",dur:"12s",repeatCount:"indefinite"}),d.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.08;0.92;1",dur:"12s",repeatCount:"indefinite"})]}),d.jsxs("path",{d:`M560 40 Q 280 40 40 ${n}`,stroke:"url(#arcGrad)",strokeWidth:i===3?3:i%2===0?2:1.6,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke",pathLength:"500",strokeDasharray:"0 500",opacity:"0",children:[d.jsx("animate",{attributeName:"stroke-dasharray",values:"0 500;500 0;0 500",keyTimes:"0;0.5;1",dur:"12s",repeatCount:"indefinite"}),d.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.08;0.92;1",dur:"12s",repeatCount:"indefinite"})]})]},n))})]})}),d.jsxs("div",{className:"max-w-4xl space-y-6 relative z-10",children:[d.jsxs("h1",{className:"text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight",children:["L'Architettura Cloud per ",d.jsx("br",{className:"hidden md:block"}),d.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300",children:"l'Intelligenza Artificiale."})]}),d.jsx("h2",{className:"text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed",children:"Dagli assistenti conversazionali ai flussi agentici complessi: trasformiamo i migliori algoritmi globali in soluzioni operative per la tua azienda."})]}),d.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mt-8 relative z-10",children:[d.jsx("button",{onClick:()=>{var n;return(n=document.getElementById("die-section"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},className:"px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50",children:"Scopri il DIE Engine"}),d.jsx("button",{onClick:t,className:"px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white rounded-lg font-medium text-lg transition-all hover:bg-white/20",children:"Parla con un modello IA"})]})]}),d.jsx("section",{className:"container mx-auto px-6 -mt-10 mb-20 relative z-20",children:d.jsxs("div",{className:"bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/40 rounded-3xl border border-white/10 p-8 md:p-16 backdrop-blur-xl shadow-2xl overflow-hidden relative group",children:[d.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none md:group-hover:bg-blue-500/20 transition-all duration-700"}),d.jsx("div",{className:"absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"}),d.jsxs("div",{className:"max-w-4xl mx-auto text-center mb-16 relative z-10",children:[d.jsx("span",{className:"inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6",children:"Consulenza Strategica Gratuita"}),d.jsxs("h2",{className:"text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight",children:["Trasformiamo la visione ",d.jsx("br",{className:"hidden md:block"})," in ",d.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300",children:"Action Plan."})]}),d.jsx("p",{className:"text-xl text-gray-300 font-light leading-relaxed",children:"30 minuti per analizzare il potenziale della tua attività, fissare obiettivi chiari e delineare la rotta tecnologica. Senza impegno, solo valore."})]}),d.jsx("div",{className:"grid md:grid-cols-3 gap-8 mb-16 relative z-10",children:[{step:"01",title:"Analisi",desc:"Serve per capire i potenziali dell'attività del cliente e individuare le aree di automazione ad alto impatto.",icon:"🔍"},{step:"02",title:"Obiettivi",desc:"Fissiamo una visione condivisa del successo e stabiliamo aspettative chiare e misurabili.",icon:"🎯"},{step:"03",title:"Action Plan",desc:"Delineamento di una direzione chiara da seguire per content, strategy e development tecnico.",icon:"📋"}].map(n=>d.jsxs("div",{className:"bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1",children:[d.jsxs("div",{className:"flex items-center justify-between mb-6",children:[d.jsx("span",{className:"text-4xl",children:n.icon}),d.jsx("span",{className:"text-blue-500/30 font-black text-2xl font-mono",children:n.step})]}),d.jsx("h4",{className:"text-2xl font-bold text-white mb-4",children:n.title}),d.jsx("p",{className:"text-gray-400 leading-relaxed text-sm",children:n.desc})]},n.step))}),d.jsxs("div",{className:"flex flex-col items-center relative z-10 w-full px-4",children:[d.jsx("div",{className:"w-full max-w-2xl bg-black/20 rounded-xl min-h-[140px] border border-white/5 flex items-center justify-center py-6 px-4",children:d.jsx("div",{ref:e,className:"flex justify-center items-center overflow-visible"})}),d.jsx("p",{className:"mt-4 text-gray-500 text-xs text-center",children:"Seleziona una data e un orario per fissare la call su Google Meet."})]})]})}),d.jsx("section",{className:"border-y border-white/5 bg-white/[0.02] py-8 backdrop-blur-sm",children:d.jsxs("div",{className:"container mx-auto px-6 flex flex-col items-center gap-6",children:[d.jsx("span",{className:"text-xs font-bold tracking-[0.2em] text-gray-500 uppercase",children:"Powered by World-Class Infrastructure"}),d.jsxs("div",{className:"flex flex-wrap justify-center gap-4 max-w-4xl mx-auto",children:[d.jsx("img",{src:"https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white",alt:"Google Cloud",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white",alt:"Azure",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=openai&logoColor=white",alt:"OpenAI",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/Google-4285F4.svg?style=for-the-badge&logo=google&logoColor=white",alt:"Google",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34",alt:"Firebase",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",alt:"Supabase",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",alt:"Postgres",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white",alt:"SQL Server",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",alt:"Docker",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",alt:"React",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white",alt:"Vite",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",alt:"Tailwind",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",alt:"JS",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",alt:"TS",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",alt:"Node",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",alt:"Python",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white",alt:"C++",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white",alt:"PyTorch",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white",alt:"TensorFlow",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=numpy&logoColor=blue",alt:"MLFlow",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white",alt:"NumPy",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white",alt:"Canva",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white",alt:"Figma",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"}),d.jsx("img",{src:"https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",alt:"Github",className:"h-7 opacity-80 hover:opacity-100 transition-opacity"})]})]})}),d.jsx("section",{className:"container mx-auto px-6",children:d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[d.jsxs("div",{className:"glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group",children:[d.jsx("div",{className:"h-1 w-12 bg-blue-500 mb-6 group-hover:w-24 transition-all"}),d.jsx("h3",{className:"text-xl font-bold text-white mb-2",children:"Integrazione End-Point & API"}),d.jsx("p",{className:"text-sm font-mono text-blue-400 mb-4 uppercase tracking-wider",children:"Public-Facing"}),d.jsx("p",{className:"text-gray-400 leading-relaxed",children:"Potenziamo siti web open-public e piattaforme già avviate. Integriamo chat intelligenti, servizi clienti automatizzati e assistenti virtuali direttamente nei tuoi end-point esistenti, migliorando l'esperienza utente senza rifare l'infrastruttura."})]}),d.jsxs("div",{className:"glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group",children:[d.jsx("div",{className:"h-1 w-12 bg-cyan-500 mb-6 group-hover:w-24 transition-all"}),d.jsx("h3",{className:"text-xl font-bold text-white mb-2",children:"Centri di Controllo & Data Analysis"}),d.jsx("p",{className:"text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider",children:"AI Hub Interno"}),d.jsx("p",{className:"text-gray-400 leading-relaxed",children:"Costruiamo HUB IA centralizzati per il controllo dei processi aziendali. Sviluppiamo software interni di analisi dati che trasformano le informazioni grezze in decisioni strategiche, mantenendo i dati sicuri all'interno del perimetro aziendale."})]}),d.jsxs("div",{className:"glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group",children:[d.jsx("div",{className:"h-1 w-12 bg-purple-500 mb-6 group-hover:w-24 transition-all"}),d.jsx("h3",{className:"text-xl font-bold text-white mb-2",children:"Agenti & Generativa"}),d.jsx("p",{className:"text-sm font-mono text-purple-400 mb-4 uppercase tracking-wider",children:"Full Spectrum"}),d.jsxs("ul",{className:"space-y-4 text-gray-400 text-sm",children:[" ",d.jsxs("li",{className:"space-y-1",children:[" ",d.jsxs("div",{className:"block",children:[d.jsx("strong",{className:"text-white",children:"Agentiche:"})," Per azioni autonome complesse."]}),d.jsxs("div",{className:"block",children:[d.jsx("strong",{className:"text-white",children:"Generative:"})," Creazione contenuti e sintesi."]}),d.jsxs("div",{className:"block",children:[d.jsx("strong",{className:"text-white",children:"Conversazionali:"})," Chatbot evoluti e assistenti."]}),d.jsxs("div",{className:"block",children:[d.jsx("strong",{className:"text-white",children:"Predittive:"})," Per forecast e analisi trend."]})]}),d.jsxs("li",{className:"pt-2 border-t border-white/10",children:[" ",d.jsx("strong",{className:"text-white",children:"Automazioni No-LLM:"})," Algoritmi logici per efficienza."]})]})]})]})}),d.jsx("section",{id:"die-section",className:"container mx-auto px-6",children:d.jsxs("div",{className:"relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 shadow-2xl shadow-blue-900/20",children:[d.jsx("div",{className:"absolute top-0 right-0 p-4",children:d.jsx("span",{className:"px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/30 rounded-full bg-blue-900/10 tracking-widest uppercase",children:"Proprietary Technology"})}),d.jsxs("div",{className:"grid md:grid-cols-2 gap-12 p-10 md:p-16 relative z-10",children:[d.jsxs("div",{className:"space-y-8",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"text-4xl md:text-5xl font-extrabold text-white mb-2",children:"DIE"}),d.jsx("p",{className:"text-xl text-blue-400 font-mono",children:"Document Intelligence Engine"})]}),d.jsxs("div",{className:"space-y-6",children:[d.jsxs("h4",{className:"text-2xl font-bold text-white",children:["Il tuo ufficio, ma ",d.jsx("span",{className:"text-blue-500",children:"intelligente"}),"."]}),d.jsxs("p",{className:"text-gray-300 text-lg leading-relaxed",children:["Dimentica il data entry manuale. DIE non si limita a leggere caratteri: ne ",d.jsx("strong",{children:"comprende il significato"}),". Trasforma pile di contratti, visure e fatture in dati strutturati pronti per l'uso."]}),d.jsxs("ul",{className:"space-y-4 pt-2",children:[d.jsxs("li",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"bg-green-500/20 p-2 rounded-full text-green-400",children:d.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:d.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})})}),d.jsxs("div",{children:[d.jsx("strong",{className:"text-white block",children:"Zero Errori Umani"}),d.jsx("span",{className:"text-gray-400 text-sm",children:"Elimina refusi e distrazioni dai processi critici."})]})]}),d.jsxs("li",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"bg-blue-500/20 p-2 rounded-full text-blue-400",children:d.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:d.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 10V3L4 14h7v7l9-11h-7z"})})}),d.jsxs("div",{children:[d.jsx("strong",{className:"text-white block",children:"Velocità Supersonica"}),d.jsx("span",{className:"text-gray-400 text-sm",children:"Pratiche completate in secondi, non in ore."})]})]}),d.jsxs("li",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"bg-purple-500/20 p-2 rounded-full text-purple-400",children:d.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:d.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})})}),d.jsxs("div",{children:[d.jsx("strong",{className:"text-white block",children:"Intelligence Strategica"}),d.jsx("span",{className:"text-gray-400 text-sm",children:"Da carta inerte a database interrogabile per la tua BI."})]})]})]})]})]}),d.jsxs("div",{className:"flex flex-col justify-center space-y-8 bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/5",children:[d.jsx("h4",{className:"text-xl font-bold text-white",children:"Il Servizio CSD Station"}),d.jsx("p",{className:"text-gray-400",children:"Il valore aggiunto è nella nostra installazione sartoriale."}),d.jsxs("ol",{className:"space-y-6 relative border-l border-gray-700 ml-3",children:[d.jsxs("li",{className:"ml-6",children:[d.jsx("span",{className:"absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"}),d.jsx("h5",{className:"font-bold text-white",children:"1. Inizializzazione"}),d.jsx("p",{className:"text-sm text-gray-500",children:"Setup dell'istanza DIE specifica per il tuo studio."})]}),d.jsxs("li",{className:"ml-6",children:[d.jsx("span",{className:"absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"}),d.jsx("h5",{className:"font-bold text-white",children:"2. Personalizzazione"}),d.jsx("p",{className:"text-sm text-gray-500",children:"Training dei modelli sui tuoi flussi documentali unici."})]}),d.jsxs("li",{className:"ml-6",children:[d.jsx("span",{className:"absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"}),d.jsx("h5",{className:"font-bold text-white",children:"3. Integrazione"}),d.jsx("p",{className:"text-sm text-gray-500",children:"Connessione sicura ai tuoi database e gestionali."})]}),d.jsx("li",{className:"ml-6 h-0",children:d.jsx("span",{className:"absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 ring-4 ring-gray-900"})})]}),d.jsx("div",{className:"pt-4",children:d.jsx("button",{onClick:t,className:"w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors",children:"Richiedi Installazione DIE"})})]})]}),d.jsx("div",{className:"absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"}),d.jsx("div",{className:"absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"})]})}),d.jsx("section",{className:"container mx-auto px-6 py-12",children:d.jsxs("div",{className:"flex flex-col md:flex-row gap-16",children:[d.jsxs("div",{className:"md:w-1/2",children:[d.jsx("h3",{className:"text-3xl font-bold text-white mb-8",children:"Built for Scale & Security"}),d.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-8",children:[d.jsxs("div",{className:"border-l-2 border-accent/30 pl-4",children:[d.jsx("div",{className:"text-xs font-bold text-gray-500 uppercase tracking-wider mb-3",children:"AI Core"}),d.jsxs("div",{className:"flex flex-wrap gap-2",children:[d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Vertex AI"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Gemini"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"OpenAI"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Anthropic"})]})]}),d.jsxs("div",{className:"border-l-2 border-blue-500/30 pl-4",children:[d.jsx("div",{className:"text-xs font-bold text-gray-500 uppercase tracking-wider mb-3",children:"Backend"}),d.jsxs("div",{className:"flex flex-wrap gap-2",children:[d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Cloud Run"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Node.js"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Python"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Fast API"})]})]}),d.jsxs("div",{className:"border-l-2 border-purple-500/30 pl-4",children:[d.jsx("div",{className:"text-xs font-bold text-gray-500 uppercase tracking-wider mb-3",children:"Frontend"}),d.jsxs("div",{className:"flex flex-wrap gap-2",children:[d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"React 18"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"TypeScript"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Tailwind"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Vite"})]})]}),d.jsxs("div",{className:"border-l-2 border-green-500/30 pl-4",children:[d.jsx("div",{className:"text-xs font-bold text-gray-500 uppercase tracking-wider mb-3",children:"Storage"}),d.jsxs("div",{className:"flex flex-wrap gap-2",children:[d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"GCP Storage"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Pinecone"}),d.jsx("span",{className:"px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono",children:"Firebase"})]})]})]})]}),d.jsxs("div",{className:"md:w-1/2 bg-gray-900/50 p-8 rounded-xl border border-white/5",children:[d.jsx("h4",{className:"text-xl font-bold text-white mb-4",children:'Il Nostro Workflow "No-Backend"'}),d.jsx("p",{className:"text-gray-400 mb-6",children:"Riduciamo la complessità infrastrutturale delegando il backend a workflow agentici avanzati."}),d.jsxs("ul",{className:"space-y-4",children:[d.jsxs("li",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"flex bg-green-500/10 h-10 w-10 shrink-0 items-center justify-center rounded-lg text-green-400 text-xl leading-none pt-1",children:"🚀"}),d.jsxs("div",{children:[d.jsx("strong",{className:"text-white block",children:"Time-to-Value Rapido"}),d.jsx("span",{className:"text-gray-500 text-sm",children:"Dal prototipo alla produzione in settimane."})]})]}),d.jsxs("li",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"flex bg-blue-500/10 h-10 w-10 shrink-0 items-center justify-center rounded-lg text-blue-400 text-xl leading-none pt-1",children:"🔧"}),d.jsxs("div",{children:[d.jsx("strong",{className:"text-white block",children:"Manutenzione Zero"}),d.jsx("span",{className:"text-gray-400 text-sm",children:"Nessun server fisico, solo logica pura."})]})]})]})]})]})})]})}const jy=`Catalogo Nominale dei Workflow per Settore, Categoria e Livello di Digitalizzazione
Settore
Workflow Nome (Nominale)
Macro Categoria
Livello Digitalizzazione

No-Profit
Registrazione Donazione > Aggiornamento Airtable
No-IA
L0
No-Profit
Generazione Ringraziamento Personalizzato Donatore (GPT)
Generativo
L1
No-Profit
Notifica Nuovi Donatori su Slack/Teams
No-IA
L0
No-Profit
Onboarding Volontari con Calendly Booking
No-IA
L0
No-Profit
Promemoria Impegni Volontari via Telegram/WhatsApp (Spoki)
Conversazionale
L0
No-Profit
Aggregazione Dati Social Media e Sito (Reporting)
No-IA
L0
No-Profit
Analisi Sentiment (OpenAI) Feedback Progetti
Agentico
L1
No-Profit
Segmentazione Mailing List Basata sul Valore Donato
No-IA
L1
No-Profit
Creazione Automatica Bozza di Post Social Campagna
Generativo
L1
No-Profit
Invio File Rendicontazione Periodica ai Finanziatori
No-IA
L0
No-Profit
Parsing Email Richieste Partnership per Triage Interno
Altro
L1
No-Profit
Gestione Richieste Diritto all'Oblio (GDPR)
No-IA
L1
No-Profit
Allerta Scadenze Progetto (Bando) via Email
No-IA
L0
No-Profit
Sincronizzazione Contatti Mailchimp/Salesforce
No-IA
L0
No-Profit
Archiviazione Certificati Donazione in Cloud Storage (GCP)
No-IA
L0
No-Profit
Gestione Pagamenti Ricorrenti (Stripe) per Membri
No-IA
L1
No-Profit
Generazione Report KPI Settimanali (Email)
No-IA
L0
No-Profit
Monitoraggio Menzioni Brand sui Social Media (Scraping)
Altro
L1
No-Profit
Conversazionale Chatbot FAQ Istituzionali
Conversazionale
L1
No-Profit
Qualificazione Automatica Lead Istituzionali (AI)
Agentico
L2
Notai
Parsing Dati Cliente per Preventivo (IA)
Generativo
L1
Notai
Generazione Bozza Preventivo Dettagliato (GPT-4)
Generativo
L1
Notai
Raccolta Documenti Cliente in Portale Protetta (n8n/Jotform)
No-IA
L1
Notai
Rinominazione e Archiviazione Documenti su Google Drive
No-IA
L0
Notai
Creazione Task Adempimenti Post-Atto (Asana/Trello)
No-IA
L1
Notai
Reminder Scadenze Adempimenti Telematici (PEC/Email)
No-IA
L0
Notai
Notifica Collaboratore su Arrivo Documenti Essenziali
No-IA
L0
Notai
Chatbot (WhatsApp Business) Stato Pratica (FAQ)
Conversazionale
L1
Notai
Analisi Scadenze Fisco Post-Stipula (Predittiva)
Predittiva
L2
Notai
Onboarding Cliente Sicuro (Invio Dati Accesso Protetti)
No-IA
L1
Notai
Integrazione Dati Pratiche Gestionale-CRM (n8n/API)
No-IA
L1
Notai
Automazione Invio PEC per Convocazione Parti
No-IA
L0
Notai
Report Statistiche Pratiche/Tempi di Chiusura
No-IA
L0
Notai
Triage Richieste Via Email con Classificazione Intento (AI)
Agentico
L2
Notai
Backup Quotidiano Archivi su GCP Storage
No-IA
L1
Notai
Creazione Schede Cliente Dettagliate Pre-Preventivo
No-IA
L0
Notai
Monitoraggio Pubblicazione Avvisi Legali Online
Altro
L2
Notai
Generazione Abstract Bilingue Brevi Atti (Non Vincolante)
Generativo
L1
Notai
Controllo Congruità Campi Preventivo (Rule-Based)
No-IA
L1
Notai
Aggiornamento Tabella Storico Clienti Post-Stipula
No-IA
L0
Gioiellerie
Sincronizzazione Inventario POS Fisico - Shopify (Omnichannel)
No-IA
L1
Gioiellerie
Notifica Esaurimento Scorta in Negozio/Online (n8n)
No-IA
L0
Gioiellerie
Clienteling Anniversario Acquisto (Email/SMS)
Generativo
L1
Gioiellerie
Generazione Suggerimenti Acquisto Correlato (IA)
Generativo
L1
Gioiellerie
Creazione Ticket Riparazione/Ordine Speciale (Notion)
No-IA
L0
Gioiellerie
Notifica Stato Riparazione/Pronto Ritiro (Twilio/Spoki)
Conversazionale
L1
Gioiellerie
Recupero Carrello Abbandonato E-commerce (WhatsApp)
Conversazionale
L1
Gioiellerie
Analisi Sentiment (OpenAI) Recensioni Google Store
Agentico
L2
Gioiellerie
Pubblicazione Automatica Nuovo Pezzo Alta Gioielleria su Instagram
No-IA
L0
Gioiellerie
Matching Dati Acquisto con Newsletter Casa Madre (GDPR OK)
No-IA
L1
Gioiellerie
Etichettatura Automatica Pezzi (QR Code) per Magazzino
No-IA
L0
Gioiellerie
Generazione Scheda Tecnica Prodotto Dettagliata (GPT)
Generativo
L1
Gioiellerie
Gestione Ordini Fornitori in Base a Sottoscorta (No-IA)
No-IA
L0
Gioiellerie
Sincronizzazione Tassi di Cambio per Prezzi Internazionali
No-IA
L0
Gioiellerie
Richiesta Feedback Post-Acquisto (CSAT/NPS)
No-IA
L0
Gioiellerie
Triage Richieste WhatsApp (es. "Prezzo/Disponibilità")
Agentico
L1
Gioiellerie
Archiviazione Scatti Fotografo in Cartelle Cloud Dedicate
No-IA
L0
Gioiellerie
Allerta Variazione Prezzi Materie Prime (Scraping)
Altro
L2
Gioiellerie
Gestione Garanzie e Scadenze (CRM Notifiche)
No-IA
L0
Food-Chain
Calcolo Consumo Ingredienti da Dati Vendita POS
No-IA
L1
Food-Chain
Generazione Bozza Ordine Fornitore Sottoscorta
No-IA
L1
Food-Chain
Invio Ordine Fornitore Via Email (Approvazione Manager)
No-IA
L1
Food-Chain
Aggregazione Ordini Piattaforme Delivery (Tilby/Glovo/n8n)
No-IA
L1
Food-Chain
Analisi Sentiment (AI) Recensioni Online (Google/TripAdvisor)
Agentico
L2
Food-Chain
Report Sintesi Settimanale Sentiment/Trend al Manager
Generativo
L2
Food-Chain
Promemoria Turni di Lavoro via WhatsApp (Spoki)
Conversazionale
L0
Food-Chain
Inserimento Dati Prenotazione TheFork in CRM Interno
No-IA
L1
Food-Chain
Invio Richiesta Recensione Automatica Post-Visita
No-IA
L0
Food-Chain
Iscrizione Automatica Cliente a Programma Fedeltà (Bonus)
No-IA
L1
Food-Chain
Controllo Differenze Prezzi Tra Sedi (Multi-Sede Check)
No-IA
L1
Food-Chain
Predizione Flussi Clienti e Fabbisogno Personale (IA)
Predittiva
L2
Food-Chain
Aggregazione Dati Vendita Multi-Sede su Power BI/Looker Studio
No-IA
L1
Food-Chain
Parsing Fatture Fornitori (OCR) per Contabilità
Altro
L2
Food-Chain
Gestione Schede Pulizia e Manutenzione (Notifica Staff)
No-IA
L0
Food-Chain
Notifica Ritardo Ordine Delivery al Cliente (Spoki)
Conversazionale
L1
Food-Chain
Generazione Automatica Schede Ricetta Standardizzate (GPT)
Generativo
L1
Food-Chain
Allerta Variazione Food Cost (F&B Cost Monitoring)
No-IA
L1
Food-Chain
Ottimizzazione Piano Turni Basato su Previsione Domanda
Agentico
L2
Agenzie Immobiliari
Parsing Lead Immobiliare.it (Email) per Estrazione Dati
Altro
L1
Agenzie Immobiliari
Inserimento Automatico Lead in CRM (Gestim/Getrix)
No-IA
L1
Agenzie Immobiliari
Invio SMS Immediato di Conferma Ricezione Lead (Twilio)
Conversazionale
L0
Agenzie Immobiliari
Assegnazione 'Score di Priorità' Lead (Agentico AI)
Agentico
L2
Agenzie Immobiliari
Creazione Task Richiamo Agente (Entro 1 Ora)
No-IA
L0
Agenzie Immobiliari
Generazione Descrizione Immobile (Multi-Lingua GPT-4)
Generativo
L1
Agenzie Immobiliari
Bozza Post Social Network (Instagram/LinkedIn Hashtag)
Generativo
L1
Agenzial Immobiliari
Promemoria Visita Immobile Cliente (WhatsApp/Spoki)
Conversazionale
L1
Agenzie Immobiliari
Richiesta Feedback Post-Visita (Form)
No-IA
L0
Agenzie Immobiliari
Matching Domanda/Offerta Notturno (AI)
Agentico
L2
Agenzie Immobiliari
Notifica Agenti Nuovi Immobili Interfacciabili a Clienti
No-IA
L1
Agenzie Immobiliari
Aggiornamento Status Immobile Post-Proposta Accettata
No-IA
L1
Agenzie Immobiliari
Automazione Adempimenti Post-Vendita (n8n/Task)
No-IA
L0
Agenzie Immobiliari
Creazione Scheda Cliente Potenziale Proprietario (GPT)
Generativo
L1
Agenzie Immobiliari
Monitoraggio Prezzi Concorrenza (Scraping/Predittiva)
Predittiva
L2
Agenzie Immobiliari
Gestione Richieste Diritto all'Oblio (GDPR)
No-IA
L1
Agenzie Immobiliari
Creazione Report Mensili Performance Agenti/Lead
No-IA
L0
Agenzie Immobiliari
Sincronizzazione Pubblicazione Annunci (Portale/Sito Web)
No-IA
L1
Agenzie Immobiliari
Triage Email Ufficio Legale/Amministrativo (AI)
Agentico
L2
Agenzie Immobiliari
Gestione Documenti Preliminari in Cloud Protetta
No-IA
L0
Farmacie
Notifica Disponibilità Prodotto Ordinato (No Ricetta)
No-IA
L0
Farmacie
Chatbot Informativo FAQ (Non Mediche) Architettura RAG
Conversazionale
L1
Farmacie
Automazione Reportistica Semplice Vendite Settimanali
No-IA
L0
Farmacie
Gestione Prenotazioni Servizi e Reminder Appuntamento (SMS)
Conversazionale
L1
Farmacie
Parsing Automatico DDT/Fatture Fornitori (XML/PDF)
Altro
L2
Farmacie
Proposta di Riordino AI-Powered (GAIA Model)
Predittiva
L2
Farmacie
Reminder Terapeutici (Aderenza Cronica) - Consenso Esplicito
Conversazionale
L2
Farmacie
Pubblicazione Post Social da Calendario Contenuti Marketing
No-IA
L0
Farmacie
Sincronizzazione Ordine E-commerce - Gestionale (WF2Web/API)
No-IA
L1
Farmacie
Generazione Notifica Spedizione/Tracking al Cliente E-commerce
No-IA
L0
Farmacie
Invio Ricette Elettroniche Aggregate al Commercialista
No-IA
L0
Farmacie
Analisi Sentiment Recensioni Online (OpenAI)
Agentico
L2
Farmacie
Triage Richieste Via Chat (Intento Medico vs. Logistico)
Agentico
L2
Farmacie
Allerta Sottoscorta Critica e Prodotti a Breve Scadenza
No-IA
L1
Farmacie
Analisi Predittiva Domanda per Prodotti Stagionali (IA)
Predittiva
L2
Farmacie
Generazione Etichette Magazzino Ottimizzate
Generativo
L1
Farmacie
Gestione Consensi Marketing (Registrazione e Revoca GDPR)
No-IA
L1
Farmacie
Recupero Carrello Abbandonato E-commerce (Targeting)
Conversazionale
L1
Farmacie
Generazione di Bozza Risposta Recensioni Negative (GPT)
Generativo
L1
Farmacie
Invio di Offerte Commerciali Mirate (Consenso Marketing)
No-IA
L1
Hotel e B&B
Comunicazione Pre-Arrivo Personalizzata (Benvenuto/Info)
No-IA
L1
Hotel e B&B
Gestione e Risposta Intelligente Recensioni (OpenAI)
Generativo
L2
Hotel e B&B
Sincronizzazione Automatica Pagamenti (PMS-Contabilità)
No-IA
L1
Hotel e B&B
Chatbot FAQ Ospite H24 (Orari, Wi-Fi, Servizi)
Conversazionale
L1
Hotel e B&B
Automazione Invio Codice Self Check-in (Serratura Smart API)
No-IA
L1
Hotel e B&B
Upselling Pre-Soggiorno (Transfer, Colazione, Servizi Extra)
Generativo
L1
Hotel e B&B
Notifica Staff Pulizia (Trigger Check-out/Arrivo Previsto)
No-IA
L0
Hotel e B&B
Invio Messaggio Richiesta Recensione Post-Soggiorno
No-IA
L0
Hotel e B&B
Sincronizzazione Prenotazioni OTA in Google Sheets Log
No-IA
L0
Hotel e B&B
Predizione Tasso di Cancellazione e Dynamic Pricing (IA)
Predittiva
L2
Hotel e B&B
Creazione Scheda Cliente (PMS) da Dati Prenotazione OTA
No-IA
L1
Hotel e B&B
Gestione Richieste Speciali Ospite (Triage AI)
Agentico
L2
Hotel e B&B
Registrazione Consensi Privacy Ospiti (GDPR Log)
No-IA
L0
Hotel e B&B
Invio Offerte Loyalty/Sconto Diretto (Post-Soggiorno)
No-IA
L1
Hotel e B&B
Generazione Report KPI Occupazione/RevPAR Settimanale
No-IA
L0
Hotel e B&B
Parsing Email Richieste Gruppi per Creazione Bozza Offerta
Generativo
L1
Hotel e B&B
Monitoraggio Prezzi Competitor in Tempo Reale (Scraping)
Altro
L2
Hotel e B&B
Gestione Reclami in Chat con Triage Urgenza (Agentico)
Agentico
L2
Hotel e B&B
Creazione Voci di Spesa Contabile per Extra (POS Integration)
No-IA
L1
Locali con Liste
Raccolta Dati Nomi e Contatto via Telegram Bot
Conversazionale
L0
Locali con Liste
Generazione QR Code Ingresso Univoco/Nominativo
No-IA
L0
Locali con Liste
Sincronizzazione Lista Ospiti in Tempo Reale (Google Sheets)
No-IA
L0
Locali con Liste
Invio Promemoria Evento (Data/Ora) via Chat (Spoki)
Conversazionale
L0
Locali con Liste
Follow-up Post-Evento con Sondaggio Feedback
Conversazionale
L1
Locali con Liste
Analisi Sentiment (GPT) Risposte Sondaggio Post-Evento
Agentico
L1
Locali con Liste
Gestione Tavoli Intelligente con Approvazione Management
No-IA
L1
Locali con Liste
Notifica Staff di Sala su Tavoli Assegnati (Telegram)
No-IA
L0
Locali con Liste
Segmentazione Clienti (VIP/Standard/Frequenti)
No-IA
L1
Locali con Liste
Invio Offerte Personalizzate basate su Storico Presenze
Generativo
L1
Locali con Liste
Gestione Richieste Diritto all'Oblio (GDPR Cleanup)
No-IA
L1
Locali con Liste
Allerta Superamento Capacità Locale (Pre-Vendita Ticket)
No-IA
L0
Locali con Liste
Integrazione Vendita Biglietti Online - Lista Ingresso
No-IA
L1
Locali con Liste
Invio Notifica Ingresso Gratuito/Sconto Compleanno
No-IA
L1
Locali con Liste
Triage Richieste Speciali/Allergie al Bot
Agentico
L1
Locali con Liste
Generazione Report Affluenza per PR (Settimanale)
No-IA
L0
Locali con Liste
Backup Automatico Liste Giornaliere in Cloud
No-IA
L0
Locali con Liste
Promemoria Pagamento Tavolo/Caparra (Post-Prenotazione)
Conversazionale
L0
Locali con Liste
Creazione Automatica Lista Email Clienti con Consenso
No-IA
L0
Locali con Liste
Monitoraggio Menzioni Evento sui Social Media
Altro
L1
Servizi Clienti
Triage Intelligente Ticket in Base al Sentiment (AI)
Agentico
L2
Servizi Clienti
Routing Automatico Ticket (Intento) al Team Specializzato
Agentico
L2
Servizi Clienti
Self-Service Avanzato (Agente AI) per Stato Ordine/Rimborso
Conversazionale
L2
Servizi Clienti
Automazione Post-Interazione: Riassunto Chiamata (GPT)
Generativo
L2
Servizi Clienti
Aggiornamento Scheda Cliente CRM Post-Chiamata (Action Item)
No-IA
L2
Servizi Clienti
Sondaggio CSAT/NPS Automatico Post-Risoluzione Ticket
No-IA
L0
Servizi Clienti
Notifica Slack/Teams Ticket Non Assegnati (>24h)
No-IA
L0
Servizi Clienti
Creazione Bozza di Risposta per Agente (IA Assistita)
Generativo
L1
Servizi Clienti
Autenticazione Utente IVR/Voicebot (Sincronizzazione Dati)
Conversazionale
L2
Servizi Clienti
Generazione Ticket Automatico da Email non Strutturata
Altro
L1
Servizi Clienti
Escalation Automatica Ticket (Senza Risposta)
No-IA
L1
Servizi Clienti
Analisi Predittiva Volumi Ticket (Previsione Domanda)
Predittiva
L2
Servizi Clienti
Gestione Rimborsi/Resi Semi-Automatizzata (Approvazione 1-Click)
No-IA
L1
Servizi Clienti
Notifica SMS/WhatsApp Conferma Ricezione Ticket
Conversazionale
L0
Servizi Clienti
Training Continuo Chatbot (Identificazione Nuove FAQ)
Agentico
L2
Servizi Clienti
Creazione Report Causa Radice (Analisi Dati Ticket GPT)
Generativo
L2
Servizi Clienti
Monitoraggio Performance SLA in Tempo Reale
No-IA
L1
Servizi Clienti
Gestione Richieste di Diritto all'Esportazione Dati (GDPR)
No-IA
L1
Servizi Clienti
Integrazione Canali Social (DM) in Piattaforma Helpdesk
No-IA
L1
Servizi Clienti
Classificazione Prodotti/Servizi Menenti in Chat
Agentico
L2
Palestre
Automazione Controllo Accessi Tornello (Scadenza Abbonamento)
No-IA
L1
Palestre
Promemoria Scadenza Abbonamento (Email/WhatsApp Spoki)
Conversazionale
L0
Palestre
Gestione Pagamenti Ricorrenti Falliti (Retry Autom.)
No-IA
L1
Palestre
Chatbot Iscrizione e Orari (FAQ)
Conversazionale
L0
Palestre
Qualificazione Lead (Trial Pass) con Assegnazione Trainer (AI)
Agentico
L2
Palestre
Invio Contenuti Personalizzati (Programmi Allenamento GPT)
Generativo
L1
Palestre
Integrazione App Booking Lezioni - Registro Presenze
No-IA
L1
Palestre
Notifica Prossimo Posto Libero (Lista d'Attesa)
Conversazionale
L1
Palestre
Generazione Report Turn-over Membri e Fidelizzazione
No-IA
L1
Palestre
Analisi Sentiment Feedback Corsi/Istruttori (OpenAI)
Agentico
L2
Palestre
Sincronizzazione Dati Nutrizionali Personalizzati (App/DB)
No-IA
L1
Palestre
Promemoria Idratazione/Pausa (Notifica In-App)
No-IA
L0
Palestre
Gestione Scorte Prodotti Vendita (Bar/Integratori)
No-IA
L1
Palestre
Invio Buoni Sconto (Compleanno) Automatici
No-IA
L0
Palestre
Triage Richieste Manutenzione Attrezzature (Staff)
No-IA
L0
Palestre
Monitoraggio Utilizzo Attrezzature (Predittiva Manutenzione)
Predittiva
L2
Palestre
Gestione Risposta Automatica Richieste di Disdetta
Generativo
L1
Palestre
Registrazione Firma Digitale (Contratto Iscrizione)
No-IA
L0
Palestre
Invio Notifica Massiva (Chiusura Straordinaria/Eventi)
No-IA
L0
Palestre
Creazione Schede Anamnesi Sportiva (Parsing Questionari)
Altro
L1
Farmacie (Cont.)
Gestione richieste di Diritto all'Oblio (Dati Sanitari)
No-IA
L2
Farmacie (Cont.)
Notifica farmaci in Scorta Minima
No-IA
L1
Notai (Cont.)
Creazione Voci di Costo in Fattura da Preventivo (No-IA)
No-IA
L1
Notai (Cont.)
Assegnazione Pratica (Lead) al Collaboratore di Studio
Agentico
L1
Notai (Cont.)
Alert Variazione Normativa (Web Scraping Leggi)
Altro
L2
Gioiellerie (Cont.)
Generazione Certificati di Autenticità (Stampa Autom.)
No-IA
L0
Food-Chain (Cont.)
Generazione Codici Promozionali Personalizzati (IA)
Generativo
L1
Food-Chain (Cont.)
Allerta Recensione 1 Stella (Immediata)
Agentico
L1
Agenzie Immobiliari (Cont.)
Promemoria Scadenza Incarico Esclusiva Proprietario
No-IA
L0
Hotel e B&B (Cont.)
Invio Mappa e Istruzioni Parcheggio Automatico
No-IA
L0
Hotel e B&B (Cont.)
Analisi Profondità del Feedback (GPT)
Generativo
L2
Servizi Clienti (Cont.)
Triage in Tempo Reale Chat (Priorità Alta/Bassa)
Agentico
L2
Palestre (Cont.)
Invio automatico Vademecum Nuovi Iscritti
No-IA
L0
No-Profit (Cont.)
Monitoraggio Compliance GDPR/DPA di Terze Parti
Altro
L2
Notai (Cont.)
Gestione Flusso Lavoro Firma Digitale Remota
No-IA
L1
Gioiellerie (Cont.)
Tracciamento Fornitori Materie Prime (Logistica)
No-IA
L1
Food-Chain (Cont.)
Sincronizzazione Aggiornamenti Menu Multi-Sede
No-IA
L1
Agenzie Immobiliari (Cont.)
Rilevamento Falsi Lead/Spam da Portali (AI)
Agentico
L2
Farmacie (Cont.)
Gestione Ordine Prodotto Esaurito (Notifica Autom.)
No-IA
L0
Hotel e B&B (Cont.)
Raccolta Dati Preferenze Alimentari Ospiti (CRM)
No-IA
L0
Servizi Clienti (Cont.)
Voicebot per Reset Password/FAQ Telefoniche
Conversazionale
L2
Palestre (Cont.)
Gestione Iscrizioni Online e Firma Contratto (n8n)
No-IA
L0
Notai (Cont.)
Generazione Lista Documenti Richiesti (Tipo Atto Rule-Based)
No-IA
L1
Farmacie (Cont.)
Archiviazione Ottimizzata Report Magazzino (GCP)
No-IA
L1
Food-Chain (Cont.)
Previsione Sprechi Materie Prime (Scarti/Predittiva)
Predittiva
L2
Servizi Clienti (Cont.)
Triage Urgente (Parole Chiave Tossiche) - Escalation
Agentico
L2
Gioiellerie (Cont.)
Analisi Scorte in Base a Tendenze Moda (Predittiva IA)
Predittiva
L2
Agenzie Immobiliari (Cont.)
Generazione Report Valutazione Immobile (Dati Catastali)
Generativo
L1
Locali con Liste (Cont.)
Sincronizzazione Lista Bottiglie/Tavoli Consumati
No-IA
L0
Palestre (Cont.)
Automazione Invio Scontrini Fiscale Abbonamenti
No-IA
L0
Hotel e B&B (Cont.)
Chiusura Automatica Serratura Smart al Check-out
No-IA
L0
No-Profit (Cont.)
Invio Ringraziamenti per Evento (AI)
Generativo
L1
Farmacie (Cont.)
Promemoria Scadenza Ricetta Elettronica (Non Terapia Cronica)
No-IA
L1
Notai (Cont.)
Controllo Unicità Nominativo Pratica (Anti-Duplicazione)
No-IA
L0
Food-Chain (Cont.)
Notifica Scadenza Licenza/Certificazioni Igiene
No-IA
L0
Servizi Clienti (Cont.)
Triage Linguistico (Multi-Lingua) del Ticket
Agentico
L2
Agenzie Immobiliari (Cont.)
Invio Feedback Negativo Cliente a Gestore (Urgente)
No-IA
L0
Gioiellerie (Cont.)
Allerta Anti-Frode (Pattern Sospetti Acquisti Online)
Agentico
L2
Locali con Liste (Cont.)
Generazione Voci di Spesa (Bar) da Dati POS
No-IA
L1
Palestre (Cont.)
Allerta Utilizzo Eccessivo Impianto (Utenze)
Predittiva
L2
Farmacie (Cont.)
Creazione Dashboard Magazzino Ottimizzazione (BI)
No-IA
L1
Hotel e B&B (Cont.)
Predizione Tariffe Ottimali (Dynamic Pricing RevPAR)
Predittiva
L2
Servizi Clienti (Cont.)
Anonimizzazione Dati Cliente per Addestramento IA (GDPR)
No-IA
L2
Notai (Cont.)
Monitoraggio Pagamenti Imposte/Tasse Post-Atto
No-IA
L1
No-Profit (Cont.)
Generazione Lettera Annuale Bilancio Sociale (GPT)
Generativo
L1
Food-Chain (Cont.)
Analisi Prestazioni Menù (Bestseller/Flop Predittiva)
Predittiva
L2
Agenzie Immobiliari (Cont.)
Automazione Creazione Annunci su Portali Minori (Scraping/API)
Altro
L1
Gioiellerie (Cont.)
Gestione Lotti Produzione e Tracciamento (ERP Sync)
No-IA
L1
Palestre (Cont.)
Richiesta Certificato Medico (Scadenza Automatica)
No-IA
L0
Locali con Liste (Cont.)
Chatbot Riserva Tavolo (Caparra e Conferma Spoki)
Conversazionale
L1
Farmacie (Cont.)
Triage Ricette (Tipo di Farmaco/Disponibilità)
Agentico
L2
Hotel e B&B (Cont.)
Invio Fattura Automatica Post-Check-out
No-IA
L0
Servizi Clienti (Cont.)
Automazione Richiesta Dati Mancanti (Ticket Incompleto)
Generativo
L1
Notai (Cont.)
Notifica Esito Visure Catastali (Sister)
No-IA
L1
No-Profit (Cont.)
Onboarding Membri con Questionario Dati (Compliance)
No-IA
L0
Food-Chain (Cont.)
Report Settimanale Tendenze Consumo (IA)
Generativo
L2
Agenzie Immobiliari (Cont.)
Invio Documentazione Pre-Acquisto (Schede Tecniche)
No-IA
L0
Gioiellerie (Cont.)
Notifica al Cliente Avvenuta Consegna/Ritiro Prodotto
No-IA
L0
Palestre (Cont.)
Automazione Blocco Accesso (Mancato Pagamento)
No-IA
L1
Locali con Liste (Cont.)
Generazione Lista Contatti per Azioni Remarketing
No-IA
L1
Farmacie (Cont.)
Monitoraggio Prezzi Concorrenti E-commerce (Scraping)
Altro
L2
Hotel e B&B (Cont.)
Invio Messa a Disposizione Camera (Anticipo Check-in)
Conversazionale
L1
Servizi Clienti (Cont.)
Suggerimenti Articoli Knowledge Base (AI) per Agente
Generativo
L2
Notai (Cont.)
Allerta Ritardo Consegna Documentazione Cliente
No-IA
L0
No-Profit (Cont.)
Monitoraggio Scadenze PNRR/Fondi (Alert Interno)
No-IA
L1
Food-Chain (Cont.)
Gestione Ordini Interni Staff (Vestiario, Materiale)
No-IA
L0
Agenzie Immobiliari (Cont.)
Gestione Appuntamenti Multipli (Calendario Condiviso)
No-IA
L0
Gioiellerie (Cont.)
Allerta Variazioni Giurisprudenza di Settore (Scraping)
Altro
L2
Palestre (Cont.)
Gestione Pacchetti Lezioni Scaduti (Recupero)
No-IA
L1
Locali con Liste (Cont.)
Generazione Voci di Spesa Tavoli per Contabilità
No-IA
L1
Farmacie (Cont.)
Feedback Qualità Fornitori (Analisi Ordini/Ritardi)
Agentico
L2
Hotel e B&B (Cont.)
Invio Link Pagamento Tassa di Soggiorno (Automatizzato)
No-IA
L0
Servizi Clienti (Cont.)
Segmentazione Cliente da Sentiment (Loyalty/Churn)
Agentico
L2
Notai (Cont.)
Automazione Registrazione Documenti in Archivio Elettronico
No-IA
L0
No-Profit (Cont.)
Traduzione Automatica (GPT) Contenuti per Donatori Esteri
Generativo
L1
Food-Chain (Cont.)
Previsione Fabbisogno Scorte (Predittiva IA)
Predittiva
L2
Agenzie Immobiliari (Cont.)
Generazione Contratto Base di Proposta (IA)
Generativo
L1
Gioiellerie (Cont.)
Notifica Cliente (WhatsApp) Prodotto Pronto per Ritiro
Conversazionale
L0
Palestre (Cont.)
Assegnazione Cliente a Gruppi di Iscrizione (Segmentazione)
No-IA
L0
Locali con Liste (Cont.)
Analisi Geografica (GCP) Provenienza Ospiti
Altro
L1
Farmacie (Cont.)
Ottimizzazione Piano Promozionale (Predittiva Sconti)
Predittiva
L2
Hotel e B&B (Cont.)
Controllo Recensioni False/Bias (AI)
Agentico
L2
Servizi Clienti (Cont.)
Monitoraggio Dati di Contatto Obsoleti (CRM Clean-up)
No-IA
L1
Notai (Cont.)
Creazione Log Audit Trattamento Dati (GDPR)
No-IA
L2
No-Profit (Cont.)
Gestione Pagamenti Volontari (Rimborso Spese)
No-IA
L0
Food-Chain (Cont.)
Generazione Etichette Prodotti (Data Scadenza Autom.)
Generativo
L1
Agenzie Immobiliari (Cont.)
Invio Email (Autom.) Richiesta Dati Aggiuntivi Cliente
Generativo
L0
Gioiellerie (Cont.)
Previsione Domanda per Categoria (Predittiva)
Predittiva
L2
Palestre (Cont.)
Gestione Sospensione Abbonamento (Autom.)
No-IA
L0
Locali con Liste (Cont.)
Triage Eventi Privati (Valutazione Budget Minimo)
Agentico
L2
Farmacie (Cont.)
Notifica Urgente Errori Parsing DDT
No-IA
L2
Hotel e B&B (Cont.)
Report Giornaliero Pulizia Camere (Stato)
No-IA
L0
Servizi Clienti (Cont.)
Riassunto Trasferimento Chiamata (Agente a Team Leader)
Generativo
L2
Notai (Cont.)
Backup Automatico Dati Su GCP Vault Sicuro
No-IA
L1
No-Profit (Cont.)
Creazione Dashboard KPI Volontariato (Notion/Airtable)
No-IA
L0
Food-Chain (Cont.)
Notifica a Cliente (WhatsApp) Fine Preparazione Ordine
Conversazionale
L1
Agenzie Immobiliari (Cont.)
Allerta Mancata Risposta Lead Qualificato (>24h)
Agentico
L1
Gioiellerie (Cont.)
Gestione Dati Cliente VIP (Tracciamento Acquisti)
No-IA
L1
Palestre (Cont.)
Gestione Richiesta Interruzione Temporanea Servizio
No-IA
L0
Locali con Liste (Cont.)
Invio Offerte Last Minute (Posti Invenduti)
Generativo
L1
Farmacie (Cont.)
Triage Domande Chatbot (Mediche vs. Cosmetiche)
Agentico
L2
Hotel e B&B (Cont.)
Automazione Gestione Cauzione (Pre-Autorizzazione Carta)
No-IA
L1
Servizi Clienti (Cont.)
Classificazione Causa di Churn (Analisi GPT)
Agentico
L2
Notai (Cont.)
Rilevamento Anomalie Documentali (IA)
Agentico
L2
No-Profit (Cont.)
Segmentazione Potenziale Donatore (AI)
Agentico
L2
Food-Chain (Cont.)
Ottimizzazione Prezzi Menù Basata su Margine/Domanda
Predittiva
L2
Agenzie Immobiliari (Cont.)
Monitoraggio Modifiche Annunci (Controllo Qualità)
No-IA
L1
Gioiellerie (Cont.)
Notifica Esito Controllo Qualità Gioiello (Staff)
No-IA
L0
Palestre (Cont.)
Monitoraggio Frequenza Allenamenti (Intervento Istruttore)
Agentico
L2
Locali con Liste (Cont.)
Gestione Inviti Compleanno Personalizzati (AI)
Generativo
L1
Farmacie (Cont.)
Generazione di Riepiloghi Terapici (Uso Interno - IA)
Generativo
L2
Hotel e B&B (Cont.)
Promemoria Check-out (Ora/Istruzioni)
Conversazionale
L0
Servizi Clienti (Cont.)
Invio Link di Pagamento in Chat (Self-Service)
Conversazionale
L1
Notai (Cont.)
Controllo Coerenza Dati Cliente (Anagrafica)
No-IA
L1
No-Profit (Cont.)
Creazione Automatica Budget Progetto (Fogli di Calcolo)
No-IA
L0
Food-Chain (Cont.)
Gestione Lamentele (Sentiment Analysis)
Agentico
L1
Agenzie Immobiliari (Cont.)
Segmentazione Cliente in Base a Storico Ricerca
No-IA
L1
Gioiellerie (Cont.)
Controllo Conformità Etichettatura (Rule-Based)
No-IA
L1
Palestre (Cont.)
Richiesta Feedback Post-Lezione (Istruttore)
No-IA
L0
Locali con Liste (Cont.)
Generazione Lista Ospiti in Formato Excel per Ingresso
No-IA
L0
Farmacie (Cont.)
Gestione Ordine Prodotto Non Disponibile (Backorder)
No-IA
L1
Hotel e B&B (Cont.)
Integrazione Telecamera/Serratura Smart per Log Accessi
No-IA
L1
Servizi Clienti (Cont.)
Generazione Report Compliance GDPR (Audit Trail)
No-IA
L2
Notai (Cont.)
Analisi Rischio Operazione Immobiliare (Dati)
Predittiva
L2
No-Profit (Cont.)
Richiesta Rinnovo Tesseramento Annuale (Autom.)
No-IA
L0
Food-Chain (Cont.)
Gestione Ordini Interni Materie Prime (Magazzino Sede)
No-IA
L1
Agenzie Immobiliari (Cont.)
Analisi Prestazioni Annunci (ROAS/Click-through)
Altro
L2
Gioiellerie (Cont.)
Creazione Bozza Offerta Personalizzata per Cliente VIP
Generativo
L1
Palestre (Cont.)
Invio Notifiche Promozioni Servizi Aggiuntivi
No-IA
L0
Locali con Liste (Cont.)
Conversazionale Chatbot Prenotazione Tavoli (Spoki)
Conversazionale
L1
Farmacie (Cont.)
Automazione del Carico Merce da Parsing DDT
No-IA
L1
Hotel e B&B (Cont.)
Gestione Richiesta Culla/Letto Aggiuntivo (Staff Notifica)
No-IA
L0
Servizi Clienti (Cont.)
Agente AI per la Risoluzione di Problemi Semplici
Agentico
L2
Notai (Cont.)
Sincronizzazione Scadenze con Calendario Condiviso
No-IA
L0
No-Profit (Cont.)
Follow-up E-commerce (Merchandise/Gadget)
No-IA
L1
Food-Chain (Cont.)
Raccolta Dati Cliente Wi-Fi (Consenso Marketing)
No-IA
L0
Agenzie Immobiliari (Cont.)
Generazione Scheda Comparativa Valutazione Immobile (IA)
Generativo
L2
Gioiellerie (Cont.)
Invio Listino Prezzi Fornitori Aggiornato (Parsing)
Altro
L1
Palestre (Cont.)
Analisi Abbandono Iscritti (Predittiva Churn Rate)
Predittiva
L2
Locali con Liste (Cont.)
Invio Dettagli Evento/Dress Code Automatico
No-IA
L0
Farmacie (Cont.)
Generazione Riepilogo Acquisti (Fini Marketing GDPR)
No-IA
L1
Hotel e B&B (Cont.)
Monitoraggio Previsioni Meteo (Offerte Last Minute Predittive)
Predittiva
L2
Servizi Clienti (Cont.)
Integrazione Sistema Piattaforma Legacy (n8n Bridge)
Altro
L2
Notai (Cont.)
Automazione Controllo Legge Anti-Riciclaggio (Dati)
Agentico
L2
No-Profit (Cont.)
Gestione Richieste Rimborsi (Rule-Based)
No-IA
L0
Food-Chain (Cont.)
Notifica al Manager su Recensione Positiva (Incentivo Staff)
No-IA
L0
Agenzie Immobiliari (Cont.)
Raccolta Documenti Proprietario (Incarico)
No-IA
L0
Gioiellerie (Cont.)
Promemoria Manutenzione Periodica (Orologi Lusso)
No-IA
L1
Palestre (Cont.)
Notifica Posti Disponibili Classi (Conversazionale)
Conversazionale
L0
Locali con Liste (Cont.)
Triage Richieste Tavoli VIP (Agentico)
Agentico
L2
Farmacie (Cont.)
Generazione di Messaggi di Marketing (GPT)
Generativo
L1
Hotel e B&B (Cont.)
Gestione Richieste Diritti GDPR (Rimozione Dati Ospite)
No-IA
L1
Servizi Clienti (Cont.)
Generazione FAQ Dinamiche da Storico Ticket (GPT)
Generativo
L2
Notai (Cont.)
Creazione Report Fiscale su Transazioni
No-IA
L1
No-Profit (Cont.)
Analisi Efficacia Canale di Donazione (Analytics)
Predittiva
L2
Food-Chain (Cont.)
Gestione Liste di Attesa Tavoli (Notifica Via Chat)
Conversazionale
L1
Agenzie Immobiliari (Cont.)
Allerta Variazione Tassi Mutui (Predittiva)
Predittiva
L2
Gioiellerie (Cont.)
Gestione Pagamenti a Rate/Finanziamenti Cliente
No-IA
L1
Palestre (Cont.)
Generazione Testimonianze (Recensioni) Assistita da IA
Generativo
L1
Locali con Liste (Cont.)
Check-in Veloce (Scansione QR Code)
No-IA
L0
Farmacie (Cont.)
Integrazione Telemedicina (Pianificazione Consulti)
No-IA
L2
Hotel e B&B (Cont.)
Gestione Richiesta Servizio in Camera (Chatbot)
Conversazionale
L1
Servizi Clienti (Cont.)
Monitoraggio Velocità di Risoluzione (Agente/AI)
Predittiva
L2
Notai (Cont.)
Controllo Dati Partita IVA e Registro Imprese
No-IA
L0
No-Profit (Cont.)
Generazione Biglietti di Ringraziamento Scritti a Mano (Robotica)
Altro
L2
Food-Chain (Cont.)
Tracciamento Fornitori Bio/Certificati (Compliance Log)
No-IA
L1
Agenzie Immobiliari (Cont.)
Integrazione Dati Storici Prezzi Vendita (Valutazione)
Predittiva
L2
Gioiellerie (Cont.)
Notifica Scadenza Assicurazione Oggetti di Valore
No-IA
L0
Palestre (Cont.)
Generazione Contenuti Video Personalizzati (Deepfake Training)
Generativo
L2
Locali con Liste (Cont.)
Analisi Orari Picco/Flusso Ingresso (Report)
No-IA
L0
Farmacie (Cont.)
Riordino Basato su Promozioni Fornitori (Predittiva)
Predittiva
L2
Hotel e B&B (Cont.)
Sincronizzazione Calendario PMS con Pulizie (Real-Time)
No-IA
L1
Servizi Clienti (Cont.)
Traduzione Chat in Tempo Reale per Agente Umano
Generativo
L1
Notai (Cont.)
Richiesta Informazioni Mancanti (Cliente) via WhatsApp
Conversazionale
L0
No-Profit (Cont.)
Automazione Raccolta Quote Iscrizione (Tesseramento)
No-IA
L0
Food-Chain (Cont.)
Gestione Feedback Negativi in Tempo Reale (Intervento Staff)
Agentico
L2
Agenzie Immobiliari (Cont.)
Promozione Incrociata Servizi (Mutui/Assicurazioni)
No-IA
L1
Gioiellerie (Cont.)
Creazione Automatica Schede Caratteristiche Pietre
Generativo
L1
Palestre (Cont.)
Triage Richieste Sostituzione Istruttore (Agentico)
Agentico
L2
Locali con Liste (Cont.)
Allerta PR su Obiettivi Raggiunti (KPI)
No-IA
L0
Farmacie (Cont.)
Invio Notifica (WhatsApp) Ritardo Rifornimento Critico
No-IA
L1
Hotel e B&B (Cont.)
Automazione Triage Richieste (Staff Reception)
Agentico
L2
Servizi Clienti (Cont.)
Identificazione Cliente ad Alto Valore (Priorità Ticket)
Agentico
L2
Notai (Cont.)
Generazione Sommario Pratica (Uso Interno)
Generativo
L1
No-Profit (Cont.)
Automazione Consegna Materiale Digitale/Tessera (Post-Donazione)
No-IA
L0
Food-Chain (Cont.)
Gestione Prenotazioni Gruppi (Chatbot Complesso)
Conversazionale
L2
Agenzie Immobiliari (Cont.)
Matching Richieste Ipotecarie con Banche Dati
Altro
L2
Gioiellerie (Cont.)
Log Audit per Conformità Legale (Tracciamento)
No-IA
L2
Palestre (Cont.)
Gestione Logistica Materiale (Tappetini, Asciugamani)
No-IA
L0
Locali con Liste (Cont.)
Analisi Flusso di Cassa Evento (Tempo Reale)
No-IA
L1
Farmacie (Cont.)
Integrazione Telemedicina (Pianificazione Consulti)
No-IA
L2
Hotel e B&B (Cont.)
Promozione Eventi Locali agli Ospiti (Personalizzata IA)
Generativo
L1
Servizi Clienti (Cont.)
Automazione Feedback Loop (Risoluzione a Sviluppo Prodotto)
No-IA
L2
Notai (Cont.)
Aggiornamento Scheda Cliente su Modifica Dati Personali
No-IA
L0
No-Profit (Cont.)
Rilevamento Donazioni Sospette (Anti-Riciclaggio IA)
Agentico
L2
Food-Chain (Cont.)
Generazione di Immagini Promozionali (GPT Vision/DALLE)
Generativo
L1
Agenzie Immobiliari (Cont.)
Notifica Agente Su Proposta Acquisto Ricevuta
No-IA
L0
Gioiellerie (Cont.)
Gestione Schede Materiali (Compliance Etica/Origine)
No-IA
L1
Palestre (Cont.)
Generazione Contratto Elettronico di Iscrizione
No-IA
L0
Locali con Liste (Cont.)
Analisi Temi Ricorrenti (Feedback) per Miglioramento Locale
Agentico
L2
Farmacie (Cont.)
Integrazione Piattaforme Loyalty (Punti/Sconti)
No-IA
L1
Hotel e B&B (Cont.)
Generazione Bozza Risposta (Reclamo Igiene)
Generativo
L1
Servizi Clienti (Cont.)
Chatbot per FAQ Complesse Interne (Supporto IT/HR)
Conversazionale
L2
Notai (Cont.)
Creazione Dossier Telematico Post-Atto
No-IA
L1
No-Profit (Cont.)
Notifica Scadenza Consenso GDPR (Rinnovo Automatico)
No-IA
L1
Food-Chain (Cont.)
Report Settimanale Performance Delivery (Piattaforma X)
No-IA
L0
Agenzie Immobiliari (Cont.)
Aggiornamento Dati Valutazione (Prezzi Mercato)
Predittiva
L2
Gioiellerie (Cont.)
Segmentazione Clienti per Materiale Preferito (Oro/Argento)
No-IA
L1
Palestre (Cont.)
Integrazione Wearable Data con App Istruttore
Altro
L2
Locali con Liste (Cont.)
Generazione Messaggio di Scuse (Cancellazione Evento)
Generativo
L0
Farmacie (Cont.)
Monitoraggio Inventario Prodotti Dietetici/Cosmetici
No-IA
L0
Hotel e B&B (Cont.)
Automazione Apertura/Chiusura Impianti (Risparmio Energetico)
Altro
L2
Servizi Clienti (Cont.)
Assegnazione Ticket a Chatbot in Base a Volume Traffico
Agentico
L2




`,Us=new Set(["No-IA","Generativo","Conversazionale","Agentico","Predittiva","Altro"]),Fs=new Set(["L0","L1","L2"]);function Kp(t){const e=t.replace(/\s*\(Cont\.\)\s*$/i,"").trim();return/^Agenzial/i.test(e)?"Agenzie Immobiliari":e}const Os=(()=>{const t=jy.split(/\r?\n/).map(i=>i.trim()).filter(Boolean),e=[];let n="";for(let i=0;i<t.length;i++){const r=t[i];if(Fs.has(r)||Us.has(r))continue;const a=t[i+1],o=t[i+2],s=t[i+3];if(a&&o&&s&&Us.has(o)&&Fs.has(s)){n=Kp(r),e.push({sector:n,name:a,category:o,level:s}),i+=3;continue}if(n&&a&&Us.has(o)&&Fs.has(s)){e.push({sector:n,name:r,category:o,level:s}),i+=3;continue}if(!/^Catalogo|Settore$|Macro Categoria$|Livello Digitalizzazione$/i.test(r)&&!Us.has(r)&&!Fs.has(r)&&!/:/.test(r)){n=Kp(r);continue}}return e})();function Wy({onOpenWorkflow:t}){const[e,n]=Ke.useState(""),[i,r]=Ke.useState("Tutti"),[a,o]=Ke.useState("Tutte"),[s,l]=Ke.useState("Tutti"),c=Ke.useMemo(()=>["Tutti",...Array.from(new Set(Os.map(m=>m.sector))).sort()],[]),f=Ke.useMemo(()=>["Tutte",...Array.from(new Set(Os.map(m=>m.category))).sort()],[]),p=Ke.useMemo(()=>["Tutti","L0","L1","L2"],[]),h=Ke.useMemo(()=>Os.filter(m=>!(i!=="Tutti"&&m.sector!==i||a!=="Tutte"&&m.category!==a||s!=="Tutti"&&m.level!==s||e&&!`${m.name} ${m.sector} ${m.category} ${m.level}`.toLowerCase().includes(e.toLowerCase()))),[e,i,a,s]);return d.jsxs("div",{className:"flex flex-col gap-10",children:[d.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"Servizi"}),d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[d.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[d.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Assistenti operativi"}),d.jsx("p",{className:"text-gray-300 mt-2",children:"Agenti per supporto clienti, back-office, HR e vendite, collegati ai tuoi dati."})]}),d.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[d.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Automazioni end-to-end"}),d.jsx("p",{className:"text-gray-300 mt-2",children:"Workflow che orchestrano task, strumenti e API senza gestire un backend proprio."})]}),d.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[d.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Integrazioni e sicurezza"}),d.jsx("p",{className:"text-gray-300 mt-2",children:"Connettori sicuri verso CRM, ERP, knowledge base e storage documentale."})]})]}),d.jsxs("section",{className:"glass-panel rounded-lg p-6 md:p-8",children:[d.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-4",children:[d.jsx("h3",{className:"title-azure text-2xl font-bold font-heading",children:"I nostri workflow"}),d.jsxs("div",{className:"text-sm text-gray-400",children:["Totale: ",h.length," / ",Os.length]})]}),d.jsxs("div",{className:"mt-4 grid grid-cols-1 md:grid-cols-4 gap-3",children:[d.jsx("input",{value:e,onChange:m=>n(m.target.value),placeholder:"Cerca per nome, settore o categoria…",className:"rounded-lg bg-white/5 border-white/10 px-3 py-2"}),d.jsx("select",{value:i,onChange:m=>r(m.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:c.map(m=>d.jsx("option",{value:m,children:m},m))}),d.jsx("select",{value:a,onChange:m=>o(m.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:f.map(m=>d.jsx("option",{value:m,children:m},m))}),d.jsx("select",{value:s,onChange:m=>l(m.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:p.map(m=>d.jsx("option",{value:m,children:m},m))})]}),d.jsxs("div",{className:"mt-5",children:[d.jsx("div",{className:"rounded-xl bg-white/5 border border-white/10 p-3",children:d.jsx("div",{className:"h-[380px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-3",children:h.map((m,_)=>d.jsxs("button",{onClick:()=>t==null?void 0:t(m),className:"text-left rounded-lg bg-white/5 border border-white/10 p-4 flex flex-col gap-2 hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-primary/40",children:[d.jsxs("div",{className:"flex items-center justify-between gap-2",children:[d.jsx("div",{className:"text-cream font-semibold",children:m.name}),d.jsx("span",{className:"px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary",children:m.level})]}),d.jsx("div",{className:"text-sm text-gray-400",children:m.sector}),d.jsx("div",{className:"flex flex-wrap gap-2",children:d.jsx("span",{className:"px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold",children:m.category})})]},_))})}),d.jsxs("div",{className:"mt-3 flex items-center gap-3 text-xs text-gray-400",children:[d.jsx("button",{className:"px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10",onClick:()=>{n(""),r("Tutti"),o("Tutte"),l("Tutti")},children:"Reset filtri"}),d.jsxs("div",{className:"flex items-center gap-2",children:[d.jsxs("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:["Settori: ",c.length-1]}),d.jsxs("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:["Categorie: ",f.length-1]}),d.jsx("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:"Livelli: 3"})]})]})]})]})]})}function Xy({onOpenChat:t}){return d.jsxs("div",{className:"flex flex-col gap-12 md:gap-16",children:[d.jsxs("section",{className:"flex flex-col items-center text-center gap-6",children:[d.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[d.jsx("h1",{className:"text-cream text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tighter max-w-3xl",children:"Un ponte tra automazione e persone."}),d.jsx("p",{className:"text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl",children:"Sfruttiamo l'intelligenza artificiale per creare workflow personalizzati che potenziano il tuo business, con un approccio umano e consulenziale."})]}),d.jsx("button",{onClick:()=>t==null?void 0:t(),className:"h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-bold tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Scopri le nostre soluzioni"})]}),d.jsx("section",{className:"px-0",children:d.jsx("div",{className:"glass-panel rounded-lg p-6 md:p-8",children:d.jsx("p",{className:"text-gray-200 text-lg md:text-xl leading-relaxed text-center",children:"CSD Station Italia nasce per colmare il divario tra le complesse possibilità dell'automazione AI e le reali esigenze operative delle aziende. Consulenza, follow-up continuo e personalizzazione."})})}),d.jsxs("section",{className:"flex flex-col gap-8",children:[d.jsxs("div",{className:"text-center",children:[d.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"La Nostra Storia"}),d.jsx("p",{className:"text-gray-400 mt-2 font-mono text-sm",children:"Dal legame con la Florida alla leadership in Italia."})]}),d.jsxs("div",{className:"grid grid-cols-[auto_1fr] gap-x-4 max-w-xl mx-auto px-2",children:[d.jsxs("div",{className:"flex flex-col items-center gap-1 pt-2",children:[d.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"🌎"}),d.jsx("div",{className:"w-[2px] bg-white/10 grow"})]}),d.jsxs("div",{className:"py-2",children:[d.jsx("p",{className:"text-cream text-lg font-heading",children:"Le Origini in Florida"}),d.jsx("p",{className:"text-gray-400",children:"Sede madre e basi dell'expertise nell'automazione."}),d.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"2025"})]}),d.jsxs("div",{className:"flex flex-col items-center gap-1",children:[d.jsx("div",{className:"w-[2px] bg-white/10 h-2"}),d.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"🚩"}),d.jsx("div",{className:"w-[2px] bg-white/10 grow"})]}),d.jsxs("div",{className:"py-2",children:[d.jsx("p",{className:"text-cream text-lg font-heading",children:"Fondazione Sede Italiana"}),d.jsx("p",{className:"text-gray-400",children:"Soluzioni adattate alle specificità del mercato locale."}),d.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"2026"})]}),d.jsxs("div",{className:"flex flex-col items-center gap-1 pb-2",children:[d.jsx("div",{className:"w-[2px] bg-white/10 h-2"}),d.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"📈"})]}),d.jsxs("div",{className:"py-2",children:[d.jsx("p",{className:"text-cream text-lg font-heading",children:"Il Nostro Approccio Oggi"}),d.jsx("p",{className:"text-gray-400",children:"Crescita continua e servizi consulenziali centrati sulle persone."}),d.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"Presente"})]})]})]})]})}function Yy({onOpenChat:t,onNavigate:e}){return d.jsxs("div",{className:"flex flex-col gap-6",children:[d.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"Contattaci"}),d.jsx("p",{className:"text-gray-400 max-w-2xl",children:"Scrivici direttamente: apri la tua casella di posta con il destinatario precompilato."}),d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl",children:[d.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[d.jsxs("div",{children:[d.jsx("p",{className:"text-gray-300",children:"Email aziendale"}),d.jsx("p",{className:"text-cream font-semibold",children:"csd.station.ai@gmail.com"})]}),d.jsx("a",{href:"mailto:csd.station.ai@gmail.com?subject=Richiesta%20informazioni%20-%20CSD%20Station%20Italia",className:"mt-4 inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Apri email"})]}),d.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[d.jsxs("div",{children:[d.jsx("p",{className:"text-gray-300",children:"Domande frequenti"}),d.jsx("p",{className:"text-cream font-semibold",children:"FAQ"})]}),d.jsxs("div",{className:"mt-4 flex flex-col items-center",children:[d.jsx("button",{type:"button",className:"inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed",disabled:!0,children:"Apri FAQ"}),d.jsx("span",{className:"mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300",children:"Coming Soon"})]})]}),d.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[d.jsxs("div",{children:[d.jsx("p",{className:"text-gray-300",children:"Assistenza via AI"}),d.jsx("p",{className:"text-cream font-semibold",children:"Servizio Clienti IA"})]}),d.jsxs("div",{className:"mt-4 flex flex-col items-center",children:[d.jsx("button",{type:"button",className:"inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed",disabled:!0,children:"Chiama Servizio Clienti"}),d.jsx("span",{className:"mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300",children:"Coming Soon"})]})]})]})]})}function $y({open:t=!1,onClose:e,onOpen:n}){const[i,r]=Ke.useState([{role:"assistant",content:"Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?"}]),[a,o]=Ke.useState(""),[s,l]=Ke.useState(!1),c=Ke.useRef(null),[f,p]=Ke.useState({}),h=(()=>{const x="https://csd-station-api-346681848489.europe-west8.run.app";return typeof window<"u"&&/\.github\.io$/.test(window.location.hostname),x})();function m(){r([{role:"assistant",content:"Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?"}])}function _(x){if(!x)return null;let u=x;u=u.replace(/\*\*(.*?)\*\*/g,"$1"),u=u.replace(/\*([^*]+)\*/g,"$1"),u=u.replace(/^#{1,6}\s+/gm,"");const g=String(u||"").split(`
`),v=[];let b=0;for(;b<g.length;){const T=g[b].trimEnd(),E=/^\s*[-*•]\s+/.test(T),w=/^([^:]{1,64}):\s+.+$/.test(T);if(E||w){const L=[];for(;b<g.length;){const C=g[b].trimEnd();if(/^\s*[-*•]\s+/.test(C)){L.push(C.replace(/^\s*[-*•]\s+/,"").trim()),b++;continue}const M=C.match(/^([^:]{1,64}):\s+(.+)$/);if(M){L.push(`${M[1].trim()}: ${M[2].trim()}`),b++;continue}break}v.push(d.jsx("ul",{className:"list-disc marker:text-primary pl-5 space-y-1",children:L.map((C,M)=>d.jsx("li",{className:"text-gray-200",children:C},M))},`ul-${b}`));continue}if(T.trim()===""){v.push(d.jsx("div",{className:"h-2"},`sp-${b}`)),b++;continue}v.push(d.jsx("p",{className:"text-gray-200 whitespace-pre-wrap",children:T},`p-${b}`)),b++}return d.jsx("div",{className:"space-y-2",children:v})}async function y(){var u;if(!a.trim())return;const x={role:"user",content:a.trim()};r(g=>[...g,x]),o(""),l(!0);try{const g=i.length+1;r(w=>[...w,{role:"assistant",content:"",reasoning:""}]);const v=await fetch((h||"")+"/chat-stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:x.content,history:i.map(w=>({role:w.role,content:w.content})).slice(-12)})});if(!v.ok||!v.body){const L=await(await fetch((h||"")+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:x.content,history:i.map(N=>({role:N.role,content:N.content})).slice(-12)})})).json(),C=(L==null?void 0:L.reply)??"Si è verificato un errore, riprova più tardi.",M=typeof(L==null?void 0:L.reasoning)=="string"?L.reasoning:"";r(N=>{const z=[...N];return z[g]={role:"assistant",content:C,reasoning:M},z});return}const b=v.body.getReader(),T=new TextDecoder;let E="";for(;;){const{value:w,done:L}=await b.read();if(L)break;E+=T.decode(w,{stream:!0});const C=E.split(`
`);E=C.pop()||"";for(const M of C){if(!M.startsWith("data:"))continue;const N=M.slice(5).trim();if(N!=="[DONE]")try{const z=JSON.parse(N);console.log("[SSE Debug]",z);let B="",Y="";if((z==null?void 0:z.type)==="response.output_text.delta"&&typeof(z==null?void 0:z.delta)=="string")B=z.delta;else if((z==null?void 0:z.type)==="response.reasoning.delta"&&typeof(z==null?void 0:z.delta)=="string")Y=z.delta;else if(typeof(z==null?void 0:z.output_text_delta)=="string")B=z.output_text_delta;else if(Array.isArray(z==null?void 0:z.choices))for(const W of z.choices){const j=(u=W==null?void 0:W.delta)==null?void 0:u.content;typeof j=="string"&&(B+=j)}else if(Array.isArray(z==null?void 0:z.output))for(const W of z.output)for(const j of W.content||[])typeof(j==null?void 0:j.text)=="string"&&((j==null?void 0:j.type)==="reasoning"?Y+=j.text:B+=j.text);(B||Y)&&(r(W=>{var H,$;const j=[...W],J=((H=j[g])==null?void 0:H.content)??"",I=(($=j[g])==null?void 0:$.reasoning)??"";return j[g]={role:"assistant",content:J+(B||""),reasoning:I+(Y||"")},j}),queueMicrotask(()=>{c.current&&(c.current.scrollTop=c.current.scrollHeight)}))}catch{}}}}catch{r(v=>[...v,{role:"assistant",content:"Errore di rete. Riprova."}])}finally{l(!1),queueMicrotask(()=>{c.current&&(c.current.scrollTop=c.current.scrollHeight)})}}return t?d.jsxs("div",{className:"fixed inset-0 md:inset-auto md:bottom-4 md:right-4 md:left-auto w-full md:w-[380px] h-[100svh] md:max-h-[70vh] flex flex-col overflow-hidden rounded-none md:rounded-2xl bg-[#0c1218] md:bg-transparent glass-panel shadow-2xl z-50","aria-live":"polite",children:[d.jsxs("div",{className:"flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 sticky top-0",children:[d.jsx("strong",{className:"text-cream",children:"Assistente"}),d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("span",{className:"text-xs text-gray-400",children:s?"sta scrivendo…":"online"}),d.jsx("button",{"aria-label":"Chiudi chat",className:"text-gray-400 hover:text-white",onClick:()=>{m(),e==null||e()},children:"✕"})]})]}),d.jsx("div",{ref:c,className:"p-3 overflow-auto flex-1 flex flex-col gap-2",children:i.map((x,u)=>d.jsxs("div",{className:`px-3 py-2 rounded-xl max-w-[85%] leading-snug ${x.role==="user"?"self-end bg-primary/20 text-white":"self-start bg-white/10 text-gray-200"}`,children:[x.role==="assistant"?_(x.content):d.jsx("span",{className:"whitespace-pre-wrap",children:x.content}),x.role==="assistant"&&typeof x.reasoning=="string"&&x.reasoning.trim()&&d.jsxs("div",{className:"mt-2",children:[d.jsx("button",{className:"text-xs text-white/70 hover:text-white underline underline-offset-2",onClick:()=>p(g=>({...g,[u]:!g[u]})),children:f[u]?"Nascondi ragionamento":"Mostra ragionamento"}),f[u]&&d.jsx("div",{className:"mt-2 rounded-lg bg-white/5 border border-white/10 p-2 text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed",children:x.reasoning})]})]},u))}),d.jsxs("div",{className:"flex gap-2 p-2 border-t border-white/10 sticky bottom-0 bg-[#0c1218]",style:{paddingBottom:"max(env(safe-area-inset-bottom, 0px), 8px)"},children:[d.jsx("input",{className:"flex-1 rounded-lg bg-white/5 border-white/10",value:a,onChange:x=>o(x.target.value),onKeyDown:x=>x.key==="Enter"?y():null,placeholder:"Scrivi un messaggio…","aria-label":"Messaggio per l'assistente"}),d.jsx("button",{className:"px-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold disabled:opacity-60",onClick:y,disabled:s,children:"Invia"})]})]}):d.jsx("button",{"aria-label":"Apri chat assistente",className:"fixed right-4 h-12 w-12 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:bg-primary/90 z-50",style:{bottom:"calc(1rem + env(safe-area-inset-bottom, 0px))"},onClick:n,children:"💬"})}function qy({workflow:t,onClose:e}){const n=(()=>{const x="https://csd-station-api-346681848489.europe-west8.run.app";return typeof window<"u"&&/\.github\.io$/.test(window.location.hostname),x})(),[i,r]=Ke.useState(""),[a,o]=Ke.useState(""),[s,l]=Ke.useState(!0),[c,f]=Ke.useState(null),[p,h]=Ke.useState(!1),m=Ke.useMemo(()=>{const x=t.name,u=t.sector,g=t.category,v=t.level;return`Genera una pagina informativa strutturata per il workflow "${x}" (${u} - ${g} - ${v}).

LIVELLI DI COMPLESSITÀ TECNOLOGICA:
- L0 (Base): Soluzioni no-code/low-code, accesso manuale, strumenti entry-level. Richiede competenze minime.
- L1 (Intermedio): Integrazioni API, automazioni semi-automatiche, strumenti di orchestrazione (n8n, Zapier). Richiede competenze tecniche moderate.
- L2 (Avanzato): Workflow completamente automatizzati, AI/ML, backend custom, cloud-native. Richiede competenze tecniche avanzate.

Il workflow attuale è livello ${v}. Adatta contenuti, prerequisiti e complessità di conseguenza.

REGOLE DI FORMATTAZIONE OBBLIGATORIE:
- Usa ### [TITOLO SEZIONE] per le sezioni principali
- Usa **testo** per enfasi (verrà convertito in virgolette)
- Usa liste puntate con - per elenchi
- Scrivi paragrafi brevi (max 3-4 righe)
- Non usare markdown complesso (tabelle, codice)

STRUTTURA OBBLIGATORIA:

### [HEADLINE]
Scrivi un titolo accattivante seguito da un sottotitolo di valore (max 2 righe). Enfatizza il beneficio principale.

### [CHE COSA RISOLVE]
Descrivi il problema/pain point specifico nel contesto ${u} in modo chiaro e diretto. Spiega perché questo workflow è rilevante.

### [CASO D'USO CONCRETO]
Presenta uno scenario realistico nel settore con "prima/dopo":
- Situazione attuale (senza automazione)
- Come il workflow trasforma il processo
- Risultati tangibili

### [COME FUNZIONA]
Spiega il flusso del workflow in 3-5 step semplici. Per livello ${v}, la complessità degli step deve riflettere il livello tecnologico:
- L0: Step accessibili senza competenze tecniche
- L1: Step con integrazioni API/automazioni
- L2: Step con logiche avanzate o AI

### [PREREQUISITI E INTEGRAZIONI]
**Strumenti richiesti:**
Elenca strumenti/sistemi necessari adatti al livello ${v}:
- L0: Spreadsheet, form online, strumenti SaaS base
- L1: CRM/ERP, piattaforme di automazione (n8n, Make)
- L2: Cloud platforms (GCP, AWS), database, API custom

**Integrazioni consigliate:**
- Priorità: n8n, OpenAI Platform, Google Cloud, Spoki
- Tempo di implementazione: [Rapida/Media/Complessa] basato su ${v}

### [VALORE OPERATIVO]
**Tempo Operativo Salvato (TOS):**
Stima conservativa: es. "3-5 ore/settimana, riduzione 60% del task manuale"

**Valore Economico Previsto (VEP):**
Equivalente economico: es. "€200-400/mese di risparmio operativo"

**Effort/Cost Indicator:**
[Basso/Medio/Alto] con breve spiegazione. L'effort cresce con il livello (L0=Basso, L2=Alto).

### [GUARDRAIL E CONSIDERAZIONI]
Vincoli legali, settoriali, etici applicabili:
- GDPR (se tratta dati personali)
- Conformità settoriale (${u})
- Limiti tecnici per livello ${v}
- Ruolo del professionista (se applicabile)

### [PROSSIMI PASSI]
Invita il lettore all'azione in modo leggero e professionale.

NOTE PERSONALIZZATE DELL'UTENTE:
USER_CUSTOM_PROMPT

IMPORTANTE:
- Output in italiano
- Max 6000 parole (sfrutta tutto lo spazio disponibile per dettagli e valore)
- Completa TUTTE le sezioni richieste senza troncare
- Tono professionale e orientato alla soluzione
- Non proporre preventivi o listini
- Mantieni riferimenti chiari a ${x} e ${u}`},[t]);async function _(x){var u,g,v,b,T;l(!0),f(null),o("");try{const E=m.replace("USER_CUSTOM_PROMPT",x||""),w=await fetch((n||"")+"/chat-stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:E})});if(!w.ok||!w.body){const B=await fetch((n||"")+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:E})});if(!B.ok){const j=await B.text();throw new Error(j||"Errore upstream")}const Y=await B.json(),W=Y&&typeof Y.reply=="string"&&Y.reply.trim()||Y&&typeof Y.output_text=="string"&&Y.output_text.trim()||((b=(v=(g=(u=Y==null?void 0:Y.choices)==null?void 0:u[0])==null?void 0:g.message)==null?void 0:v.content)==null?void 0:b.trim())||"";W?o(W):f("Nessun contenuto dal modello.");return}const L=w.body.getReader(),C=new TextDecoder;let M="",N=!1,z=0;for(;;){const{value:B,done:Y}=await L.read();if(Y)break;M+=C.decode(B,{stream:!0});const W=M.split(`
`);M=W.pop()||"";for(const j of W){if(!j.startsWith("data:"))continue;const J=j.slice(5).trim();if(J!=="[DONE]")try{const I=JSON.parse(J);let H="";if((I==null?void 0:I.type)==="response.output_text.delta"&&typeof(I==null?void 0:I.delta)=="string")H=I.delta;else if(typeof(I==null?void 0:I.output_text_delta)=="string")H=I.output_text_delta;else if(Array.isArray(I==null?void 0:I.choices))for(const $ of I.choices){const ae=(T=$==null?void 0:$.delta)==null?void 0:T.content;typeof ae=="string"&&(H+=ae)}else if(Array.isArray(I==null?void 0:I.output))for(const $ of I.output)for(const ae of $.content||[])typeof(ae==null?void 0:ae.text)=="string"&&(H+=ae.text);H&&(N=!0,z+=H.length,o($=>$+H))}catch{}}}o(B=>{const Y=B.includes("[HEADLINE]")||B.includes("[CHE COSA RISOLVE]")||B.includes("[PROSSIMI PASSI]");return!(z>500&&Y)&&z>0,B}),N||f("Nessun contenuto dal modello.")}catch(E){f((E==null?void 0:E.message)||"Errore")}finally{l(!1)}}Ke.useEffect(()=>{_("")},[t==null?void 0:t.name]);function y(x){if(!x)return null;let u=x;u=u.replace(/^\*[^*]+\*:\s*.+$/gm,""),u=u.replace(/^---+\s*$/gm,""),u=u.replace(/^\[([A-Z_\s]+)\]\s*$/gm,""),u=u.replace(/>>>\s*CRITICAL\s+OVERRIDE[\s\S]*?>>>\s*FINE\s+OVERRIDE/gi,"");const g=u.split(/\r?\n/),v=[];let b=[];function T(){b.length!==0&&(v.push(d.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 my-3",children:b.map((E,w)=>d.jsx("li",{className:"text-[15px] leading-relaxed text-gray-200",children:E},w))},`ul-${v.length}`)),b=[])}for(let E=0;E<g.length;E++){const w=g[E].trimEnd();if(!w.trim()){T(),v.push(d.jsx("div",{className:"h-3"},`sp-${v.length}`));continue}const L=w.match(/^#{1,6}\s*\[(.+?)\]\s*$/)||w.match(/^\*\*\[(.+?)\]\*\*\s*$/);if(L){T();const N=L[1];v.push(d.jsx("h2",{className:"mt-8 mb-3 text-[24px] md:text-[26px] font-bold text-cream font-heading",children:N},`h-${v.length}`)),v.push(d.jsx("hr",{className:"border-t border-white/10 my-4"},`hr-${v.length}`));continue}const C=w.match(/^#{1,6}\s+(.+)$/)||w.match(/^\*\*(.+)\*\*\s*$/);if(C){T();const N=C[1].replace(/\*\*/g,"").trim();if(N&&N.length<100){v.push(d.jsx("h3",{className:"mt-6 mb-2 text-[20px] md:text-[22px] font-semibold text-cream/90 font-heading",children:N},`h-${v.length}`));continue}}if(/^[-*]\s+/.test(w)){const N=w.replace(/^[-*]+\s+/,"").replace(/\*\*/g,'"').replace(/\*/g,"");b.push(N);continue}if(/^\d+\.\s+/.test(w)){const N=w.replace(/^\d+\.\s+/,"").replace(/\*\*/g,'"').replace(/\*/g,"");b.push(N);continue}T();const M=w.replace(/\*\*(.+?)\*\*/g,'"$1"').replace(/\*(.+?)\*/g,"$1");v.push(d.jsx("p",{className:"text-[15px] leading-relaxed text-gray-200 my-2",children:M},`p-${v.length}`))}return T(),d.jsx("div",{className:"space-y-1",children:v})}return d.jsx("div",{className:"fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",children:d.jsxs("div",{className:"relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0c1218] border border-white/10 shadow-2xl",children:[d.jsxs("div",{className:"flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10",children:[d.jsxs("div",{className:"flex flex-col",children:[d.jsx("div",{className:"text-cream font-bold",children:t.name}),d.jsxs("div",{className:"text-xs text-gray-400",children:[t.sector," • ",t.category," • ",t.level]})]}),d.jsxs("div",{className:"flex items-center gap-2",children:[d.jsx("button",{onClick:()=>h(!0),className:"hidden md:block h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm",children:"✎ Nota"}),d.jsx("button",{onClick:()=>_(i),className:"h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Rigenera pagina"}),d.jsx("button",{"aria-label":"Chiudi",onClick:e,className:"h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white",children:"✕"})]})]}),d.jsxs("div",{className:"p-4 overflow-auto max-h-[calc(90vh-56px)]",children:[s&&d.jsx("div",{className:"flex items-center justify-center py-12",children:d.jsx("div",{className:"wire-square animate-wire-spin"})}),!s&&c&&d.jsx("div",{className:"text-yellow-400 text-sm",children:String(c)}),!c&&a&&d.jsx("article",{className:"max-w-none font-display",children:y(a)})]}),p&&d.jsx("div",{className:"absolute inset-0 bg-black/40 flex items-center justify-center p-4",children:d.jsxs("div",{className:"w-full max-w-lg rounded-xl bg-[#0f1621] border border-white/10 shadow-xl",children:[d.jsx("div",{className:"px-4 py-3 border-b border-white/10 text-cream font-medium",children:"Nota per la generazione"}),d.jsxs("div",{className:"p-4",children:[d.jsx("textarea",{value:i,onChange:x=>r(x.target.value),className:"w-full h-40 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none",placeholder:"Scrivi indicazioni specifiche (tone, esempi, vincoli)."}),d.jsxs("div",{className:"mt-3 flex items-center justify-end gap-2",children:[d.jsx("button",{onClick:()=>h(!1),className:"h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm",children:"Chiudi"}),d.jsx("button",{onClick:()=>{h(!1),_(i)},className:"h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold",children:"Usa nota e rigenera"})]})]})]})})]})})}function Ky(){return d.jsxs("article",{className:"max-w-none font-display",children:[d.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-3",children:"Benvenuto su CSD Station AI Advisor"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Scopri come la Piattaforma trasforma il tuo lavoro. CSD Station AI Advisor è il tuo consulente intelligente progettato per esplorare insieme a te il potenziale dell'Intelligenza Artificiale e dell’Iper‑Automazione applicati ai processi aziendali. Non è uno strumento tecnico complesso: è una conversazione che ti aiuta a capire come risparmiare tempo e costi nella tua attività quotidiana."}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Come Iniziare dalla Home"}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 1: Accedi alla Piattaforma"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dalla home di CSD Station trovi l’interfaccia di AI Advisor. È il tuo primo punto di contatto con la piattaforma: inizia una conversazione naturale con il nostro consulente digitale."}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 2: Racconta il tuo settore"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Il tuo settore (retail, servizi, manifattura, sanità, ecc.)."}),d.jsx("li",{children:"I processi che consumano più tempo nella tua giornata."}),d.jsx("li",{children:"Gli strumenti che già utilizzi (CRM, email, piattaforme di gestione, ecc.)."})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7 mt-2",children:"AI Advisor ascolta e comprende il tuo contesto specifico."}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 3: Ricevi suggerimenti mirati"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dopo pochi messaggi ricevi soluzioni concrete di automazione e AI pensate per te: non una lista generica, ma idee che risolvono problemi reali."}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Prenotare un Appuntamento"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Nella conversazione con AI Advisor trovi il pulsante “Prenota Appuntamento”."}),d.jsx("li",{children:"Un clic ti collega a Google Calendar."}),d.jsx("li",{children:"Scegli l’orario preferito e ricevi conferma via email."})]}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Esplorare i Servizi — Workflow Interattivi"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Cosa trovi nella sezione Servizi"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Una raccolta di workflow interattivi: non manuali da leggere, ma strumenti da provare. Ogni workflow è come un mini‑consulente per un’area specifica."}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Workflow per Ottimizzare il Servizio Clienti."}),d.jsx("li",{children:"Workflow per Gestione Amministrativa."}),d.jsx("li",{children:"Workflow per Analisi Dati."})]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Come usare i workflow"}),d.jsxs("ol",{className:"list-decimal pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Naviga nella sezione Servizi."}),d.jsx("li",{children:"Scegli il workflow più pertinente al tuo bisogno."}),d.jsx("li",{children:"Interagisci: è una conversazione guidata."}),d.jsx("li",{children:"Ricevi una pagina informativa personalizzata con scenario, TOS (tempo risparmiato) e VEP (valore economico previsto)."})]}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Valore della Piattaforma"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Conversazione, non compilazione"}),": linguaggio naturale, niente questionari interminabili."]}),d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Soluzioni concrete e misurabili"}),": stime realistiche di tempo e valore economico."]}),d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Zero pressione commerciale"}),": esplora in libertà, senza impegno."]})]}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Domande Frequenti"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Devo essere un esperto?"})," No. È pensata per chi non è tecnico: dialogo naturale, chiaro."]}),d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Quanto tempo serve?"})," Ogni interazione si legge in ~20 secondi."]}),d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Posso prenotare da qui?"})," Sì, via Google Calendar con conferma email."]}),d.jsxs("li",{children:[d.jsx("span",{className:"font-semibold",children:"Posso fidarmi delle stime?"})," Sono conservative e basate su dati di settore; la validazione puntuale avviene con il team."]})]}),d.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Inizia Subito"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dalla home, apri una conversazione con AI Advisor. Se preferisci il contatto diretto, usa “Prenota Appuntamento”."})]})}function Zy(){return d.jsxs("article",{className:"max-w-none font-display",children:[d.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-2",children:"Termini di Servizio - CSD Station Italia"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:d.jsx("em",{children:"Ultimo aggiornamento: 13 novembre 2025"})}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Una Conversazione Trasparente su Come Funziona"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Benvenuto su CSD Station. Vogliamo essere chiari e onesti su come funziona la nostra piattaforma e quale sia il nostro rapporto con te. Niente legalese: ti spieghiamo cosa aspettarti in modo semplice."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"1. Di Cosa Parliamo"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Questi Termini riguardano il sito CSD Station Italia, le conversazioni con AI Advisor, i workflow interattivi e i contenuti generati. In sintesi: la tua esperienza completa con noi."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"2. Come Usare CSD Station nel Modo Giusto"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Usa CSD Station per"}),": esplorare opportunità di automazione e AI, ricevere consulenza informativa, capire come risparmiare tempo e costi."]}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Non usarla per"}),":"]}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Attività illegittime o dannose"}),d.jsx("li",{children:"Offese, molestie o violazioni della privacy altrui"}),d.jsx("li",{children:"Violazione di diritti di proprietà intellettuale"}),d.jsx("li",{children:"Qualsiasi scopo che possa nuocere a terzi"})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Quello che ricevi da AI Advisor è consulenza informativa e ispirativa e non sostituisce pareri professionali (es. legale, fiscale o tecnico specializzato). Per casi sensibili, rivolgiti a un esperto qualificato."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"3. I Contenuti Che AI Advisor Genera Per Te"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Come funziona realmente"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Le informazioni potrebbero contenere imprecisioni o semplificazioni."}),d.jsx("li",{children:"Le soluzioni suggerite potrebbero non essere perfette per ogni caso."})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Verifica sempre le informazioni critiche prima di decisioni importanti. In caso di dubbi, contatta il nostro team."}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Protezione dei tuoi dati"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Evita di inserire dati personali sensibili senza adeguata base giuridica. Assicurati di avere diritto a condividere i dati in conformità a GDPR, leggi locali e policy aziendali."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"4. Cosa Non Ti Promettiamo"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Il servizio è fornito “così com’è”. Non garantiamo assenza di errori o interruzioni. Nella misura massima consentita dalla legge italiana, decliniamo responsabilità per:"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Danni indiretti/conseguenti (perdita di guadagno, dati, interruzioni)"}),d.jsx("li",{children:"Informazioni imprecise o incomplete generate dall’AI"}),d.jsx("li",{children:"Decisioni prese senza ulteriore verifica"})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"In parole semplici: se segui un nostro consiglio e qualcosa va storto, la responsabilità ultima resta tua."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"5. Quello Che È Nostro Rimane Nostro"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Logo, design, testi, codice e il nome “AI Advisor” sono di nostra proprietà (o concessi in licenza). Puoi usare i contenuti per scopi personali/aziendali legittimi, ma non copiarli, rivenderli o utilizzare il marchio senza permesso."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"6. Cambieremo Questi Termini"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Pubblicheremo i nuovi Termini su questa pagina"}),d.jsx("li",{children:"Aggiorneremo la data in cima"}),d.jsx("li",{children:"In caso di cambi significativi, proveremo a informarti"})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se continui a usare il servizio dopo un aggiornamento, accetti i nuovi Termini."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"7. La Legge Che Protegge Entrambi"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Per i consumatori si applicano le tutele di legge e la competenza del loro foro."}),d.jsx("li",{children:"Negli altri casi il foro competente è Firenze."})]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"8. Qualcosa da Chiarire?"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Dubbi o domande: contatta il nostro team."}),d.jsx("li",{children:"Privacy: consulta l’Informativa Privacy nel footer."}),d.jsx("li",{children:"Segnalazioni: scrivici e valuteremo con priorità."})]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Messaggio Finale"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"CSD Station è pensata per aiutarti a scoprire il valore dell’AI. Usala con fiducia e responsabilità. Se accetti questi Termini, riconosci come funziona il servizio e i relativi limiti. Se non sei d’accordo, non utilizzare la piattaforma e contattaci per trovare insieme una soluzione."}),d.jsx("p",{className:"text-gray-400 text-sm mt-4",children:"Ultimo aggiornamento: 13 novembre 2025"})]})}function Qy(){return d.jsxs("article",{className:"max-w-none font-display",children:[d.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-2",children:"Informativa Privacy - CSD Station Italia"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:d.jsx("em",{children:"Ultimo aggiornamento: 13 novembre 2025"})}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"La Nostra Promessa sui Tuoi Dati"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"La privacy non è solo una regola legale per noi: è un impegno. Qui spieghiamo, in modo semplice, come raccogliamo, usiamo e proteggiamo i tuoi dati quando utilizzi CSD Station."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"1. Chi Siamo (e a chi contattare)"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Titolare del Trattamento"}),": CSD Station Italia. Per domande o per esercitare i tuoi diritti, contattaci tramite la sezione ",d.jsx("strong",{children:"“Servizio Clienti”"})," del sito."]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"2. Quali Dati Raccogliamo (e perché)"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Dati di Navigazione"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Dispositivo, browser, indirizzo IP, fuso orario"}),d.jsx("li",{children:"Pagine visitate e tempi di permanenza"})]}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Perché"}),": per funzionamento, diagnostica e sicurezza del sito."]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati che condividi con AI Advisor"}),d.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-2 00",children:d.jsx("li",{children:"Messaggi utili a generare risposte, comprendere il tuo contesto e creare pagine informative personalizzate."})}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Attenzione"}),": non inserire dati sensibili (carte, dati medici, password, SSN). In caso di dubbio, contattaci prima."]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati da moduli"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se prenoti appuntamenti via Google Calendar o compili moduli, trattiamo nome, email, orari e dettagli essenziali per ricontattarti."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"3. Perché usiamo i tuoi dati (base legale)"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Per fornirti il servizio"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Base legale"}),": esecuzione di misure precontrattuali."]}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Generare contenuti informativi e consulenziali"}),d.jsx("li",{children:"Rispondere alle domande e creare pagine personalizzate"}),d.jsx("li",{children:"Gestire e confermare appuntamenti"})]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Per migliorare CSD Station"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Base legale"}),": legittimo interesse bilanciato."]}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Capire cosa funziona, migliorare risposte e performance"}),d.jsx("li",{children:"Rilevare problemi prima che impattino gli utenti"})]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Per proteggere la piattaforma"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[d.jsx("strong",{children:"Base legale"}),": obblighi legali e legittimo interesse (sicurezza)."]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"4. Per quanto tempo conserviamo i dati"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Chat e conversazioni"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsxs("li",{children:[d.jsx("strong",{children:"Durante la sessione"}),": memoria attiva per garantire continuità."]}),d.jsxs("li",{children:[d.jsx("strong",{children:"Dopo la sessione"}),": la chat non viene conservata a lungo termine."]})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Eccezioni specifiche possono essere valutate su richiesta (es. audit)."}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Log tecnici e sicurezza"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Sicurezza: circa 90 giorni"}),d.jsx("li",{children:"Diagnostica: per il tempo necessario alla risoluzione"}),d.jsx("li",{children:"Obblighi legali: per i tempi previsti"})]}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati da moduli e appuntamenti"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Conservati finché servono allo scopo; se diventi cliente, secondo contratto; eliminabili su richiesta ove possibile."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"5. Con chi condividiamo i dati"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Non vendiamo i tuoi dati."}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Fornitori"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Google Cloud Run (hosting)"}),d.jsx("li",{children:"Piattaforme AI per le risposte dell’Advisor"}),d.jsx("li",{children:"Servizi di comunicazione (calendar/confirm)"})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Vincoli contrattuali: uso limitato allo scopo, sicurezza adeguata, nessuna divulgazione non autorizzata."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"6. Trasferimenti all’estero"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Possibili per via dell’infrastruttura dei fornitori. Usiamo SCC o misure equivalenti per garantire protezione conforme agli standard UE."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"7. I tuoi diritti"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"Accesso, rettifica, cancellazione (“oblio”), limitazione"}),d.jsx("li",{children:"Opposizione e portabilità"}),d.jsx("li",{children:"Reclamo al Garante Privacy"})]}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:["Per esercitarli, scrivi al ",d.jsx("strong",{children:"Servizio Clienti"})," indicando il diritto e l’ambito. Rispondiamo entro 30 giorni (fino a 60 se necessario)."]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"8. Cookie e analytics"}),d.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Cookie tecnici essenziali"}),d.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:d.jsx("li",{children:"Autenticazione, preferenze, sicurezza"})}),d.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Analytics anonimi"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Statistiche aggregate e anonime per migliorare il servizio. Puoi limitare cookie non essenziali dal browser."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"9. Sicurezza"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[d.jsx("li",{children:"HTTPS per i dati in transito"}),d.jsx("li",{children:"Accesso limitato e monitoraggio continuo"}),d.jsx("li",{children:"Backup e conformità a standard di sicurezza"})]}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Nessun sistema è 100% sicuro: in caso di violazione, notificheremo entro 72 ore con i dettagli necessari."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"10. Aggiornamenti dell’informativa"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se cambiano le leggi o i processi, aggiorniamo questa pagina ed evidenziamo le modifiche importanti."}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"11. FAQ"}),d.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[d.jsxs("li",{children:[d.jsx("strong",{children:"Vendete i miei dati?"})," No."]}),d.jsxs("li",{children:[d.jsx("strong",{children:"Quanto dura la chat?"})," Solo per la sessione corrente, poi non viene conservata a lungo termine."]}),d.jsxs("li",{children:[d.jsx("strong",{children:"Posso cancellare i miei dati?"})," Sì, nei limiti di legge; contatta il Servizio Clienti."]}),d.jsxs("li",{children:[d.jsx("strong",{children:"Ho condiviso dati sensibili per errore?"})," Avvisaci subito; li elimineremo al più presto."]}),d.jsxs("li",{children:[d.jsx("strong",{children:"Dubbi?"})," Contattaci via “Servizio Clienti”."]})]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"12. Contatti e recapiti"}),d.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:["Per richieste su privacy, diritti o segnalazioni usa ",d.jsx("strong",{children:"“Servizio Clienti”"})," sul sito CSD Station. Autorità di riferimento: Garante per la Protezione dei Dati Personali — ",d.jsx("span",{className:"underline",children:"www.garanteprivacy.it"})]}),d.jsx("hr",{className:"my-4 border-white/10"}),d.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Messaggio Finale"}),d.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"I tuoi dati sono importanti. La sicurezza e la trasparenza sono fondamentali per noi. Se usi CSD Station, ci affidi la tua fiducia: la rispetteremo con responsabilità."}),d.jsx("p",{className:"text-gray-400 text-sm mt-4",children:"Ultimo aggiornamento: 13 novembre 2025"})]})}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gh="181",Jy=0,Zp=1,eS=2,yg=1,tS=2,yi=3,hr=0,sn=1,Ai=2,Ri=0,Ia=1,Qp=2,Jp=3,em=4,nS=5,wr=100,iS=101,rS=102,aS=103,oS=104,sS=200,lS=201,cS=202,uS=203,wd=204,Td=205,dS=206,fS=207,hS=208,pS=209,mS=210,xS=211,gS=212,vS=213,_S=214,Rd=0,Nd=1,Pd=2,Xa=3,Ld=4,Id=5,Dd=6,zd=7,vh=0,yS=1,SS=2,ur=0,MS=1,bS=2,AS=3,Sg=4,ES=5,CS=6,wS=7,Mg=300,Ya=301,$a=302,Ud=303,Fd=304,Sc=306,Od=1e3,wi=1001,kd=1002,wn=1003,TS=1004,ks=1005,Un=1006,nu=1007,Lr=1008,hi=1009,bg=1010,Ag=1011,is=1012,_h=1013,Hr=1014,si=1015,eo=1016,yh=1017,Sh=1018,rs=1020,Eg=35902,Cg=35899,wg=1021,Tg=1022,qn=1023,as=1026,os=1027,Mh=1028,bh=1029,Ah=1030,Eh=1031,Ch=1033,bl=33776,Al=33777,El=33778,Cl=33779,Bd=35840,Gd=35841,Vd=35842,Hd=35843,jd=36196,Wd=37492,Xd=37496,Yd=37808,$d=37809,qd=37810,Kd=37811,Zd=37812,Qd=37813,Jd=37814,ef=37815,tf=37816,nf=37817,rf=37818,af=37819,of=37820,sf=37821,lf=36492,cf=36494,uf=36495,df=36283,ff=36284,hf=36285,pf=36286,RS=3200,NS=3201,wh=0,PS=1,Zi="",bn="srgb",qa="srgb-linear",ec="linear",lt="srgb",Kr=7680,tm=519,LS=512,IS=513,DS=514,Rg=515,zS=516,US=517,FS=518,OS=519,nm=35044,im="300 es",li=2e3,tc=2001;function Ng(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function nc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function kS(){const t=nc("canvas");return t.style.display="block",t}const rm={};function am(...t){const e="THREE."+t.shift();console.log(e,...t)}function ze(...t){const e="THREE."+t.shift();console.warn(e,...t)}function Rt(...t){const e="THREE."+t.shift();console.error(e,...t)}function ss(...t){const e=t.join(" ");e in rm||(rm[e]=!0,ze(...t))}function BS(t,e,n){return new Promise(function(i,r){function a(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}class to{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let om=1234567;const Oo=Math.PI/180,ls=180/Math.PI;function no(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[t&255]+$t[t>>8&255]+$t[t>>16&255]+$t[t>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[n&63|128]+$t[n>>8&255]+"-"+$t[n>>16&255]+$t[n>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function Ve(t,e,n){return Math.max(e,Math.min(n,t))}function Th(t,e){return(t%e+e)%e}function GS(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function VS(t,e,n){return t!==e?(n-t)/(e-t):0}function ko(t,e,n){return(1-n)*t+n*e}function HS(t,e,n,i){return ko(t,e,1-Math.exp(-n*i))}function jS(t,e=1){return e-Math.abs(Th(t,e*2)-e)}function WS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function XS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function YS(t,e){return t+Math.floor(Math.random()*(e-t+1))}function $S(t,e){return t+Math.random()*(e-t)}function qS(t){return t*(.5-Math.random())}function KS(t){t!==void 0&&(om=t);let e=om+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ZS(t){return t*Oo}function QS(t){return t*ls}function JS(t){return(t&t-1)===0&&t!==0}function e1(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function t1(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function n1(t,e,n,i,r){const a=Math.cos,o=Math.sin,s=a(n/2),l=o(n/2),c=a((e+i)/2),f=o((e+i)/2),p=a((e-i)/2),h=o((e-i)/2),m=a((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(s*f,l*p,l*h,s*c);break;case"YZY":t.set(l*h,s*f,l*p,s*c);break;case"ZXZ":t.set(l*p,l*h,s*f,s*c);break;case"XZX":t.set(s*f,l*_,l*m,s*c);break;case"YXY":t.set(l*m,s*f,l*_,s*c);break;case"ZYZ":t.set(l*_,l*m,s*f,s*c);break;default:ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function pa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function nn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const mf={DEG2RAD:Oo,RAD2DEG:ls,generateUUID:no,clamp:Ve,euclideanModulo:Th,mapLinear:GS,inverseLerp:VS,lerp:ko,damp:HS,pingpong:jS,smoothstep:WS,smootherstep:XS,randInt:YS,randFloat:$S,randFloatSpread:qS,seededRandom:KS,degToRad:ZS,radToDeg:QS,isPowerOfTwo:JS,ceilPowerOfTwo:e1,floorPowerOfTwo:t1,setQuaternionFromProperEuler:n1,normalize:nn,denormalize:pa};class He{constructor(e=0,n=0){He.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ms{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,a,o,s){let l=i[r+0],c=i[r+1],f=i[r+2],p=i[r+3],h=a[o+0],m=a[o+1],_=a[o+2],y=a[o+3];if(s<=0){e[n+0]=l,e[n+1]=c,e[n+2]=f,e[n+3]=p;return}if(s>=1){e[n+0]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y;return}if(p!==y||l!==h||c!==m||f!==_){let x=l*h+c*m+f*_+p*y;x<0&&(h=-h,m=-m,_=-_,y=-y,x=-x);let u=1-s;if(x<.9995){const g=Math.acos(x),v=Math.sin(g);u=Math.sin(u*g)/v,s=Math.sin(s*g)/v,l=l*u+h*s,c=c*u+m*s,f=f*u+_*s,p=p*u+y*s}else{l=l*u+h*s,c=c*u+m*s,f=f*u+_*s,p=p*u+y*s;const g=1/Math.sqrt(l*l+c*c+f*f+p*p);l*=g,c*=g,f*=g,p*=g}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,a,o){const s=i[r],l=i[r+1],c=i[r+2],f=i[r+3],p=a[o],h=a[o+1],m=a[o+2],_=a[o+3];return e[n]=s*_+f*p+l*m-c*h,e[n+1]=l*_+f*h+c*p-s*m,e[n+2]=c*_+f*m+s*h-l*p,e[n+3]=f*_-s*p-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,a=e._z,o=e._order,s=Math.cos,l=Math.sin,c=s(i/2),f=s(r/2),p=s(a/2),h=l(i/2),m=l(r/2),_=l(a/2);switch(o){case"XYZ":this._x=h*f*p+c*m*_,this._y=c*m*p-h*f*_,this._z=c*f*_+h*m*p,this._w=c*f*p-h*m*_;break;case"YXZ":this._x=h*f*p+c*m*_,this._y=c*m*p-h*f*_,this._z=c*f*_-h*m*p,this._w=c*f*p+h*m*_;break;case"ZXY":this._x=h*f*p-c*m*_,this._y=c*m*p+h*f*_,this._z=c*f*_+h*m*p,this._w=c*f*p-h*m*_;break;case"ZYX":this._x=h*f*p-c*m*_,this._y=c*m*p+h*f*_,this._z=c*f*_-h*m*p,this._w=c*f*p+h*m*_;break;case"YZX":this._x=h*f*p+c*m*_,this._y=c*m*p+h*f*_,this._z=c*f*_-h*m*p,this._w=c*f*p-h*m*_;break;case"XZY":this._x=h*f*p-c*m*_,this._y=c*m*p-h*f*_,this._z=c*f*_+h*m*p,this._w=c*f*p+h*m*_;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],a=n[8],o=n[1],s=n[5],l=n[9],c=n[2],f=n[6],p=n[10],h=i+s+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(a-c)*m,this._z=(o-r)*m}else if(i>s&&i>p){const m=2*Math.sqrt(1+i-s-p);this._w=(f-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(a+c)/m}else if(s>p){const m=2*Math.sqrt(1+s-i-p);this._w=(a-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+p-i-s);this._w=(o-r)/m,this._x=(a+c)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,a=e._z,o=e._w,s=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*s+r*c-a*l,this._y=r*f+o*l+a*s-i*c,this._z=a*f+o*c+i*l-r*s,this._w=o*f-i*s-r*l-a*c,this._onChangeCallback(),this}slerp(e,n){if(n<=0)return this;if(n>=1)return this.copy(e);let i=e._x,r=e._y,a=e._z,o=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,o=-o,s=-s);let l=1-n;if(s<.9995){const c=Math.acos(s),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(n),a*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,n=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(sm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(sm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6]*r,this.y=a[1]*n+a[4]*i+a[7]*r,this.z=a[2]*n+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*n+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,a=e.x,o=e.y,s=e.z,l=e.w,c=2*(o*r-s*i),f=2*(s*n-a*r),p=2*(a*i-o*n);return this.x=n+l*c+o*p-s*f,this.y=i+l*f+s*c-a*p,this.z=r+l*p+a*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r,this.y=a[1]*n+a[5]*i+a[9]*r,this.z=a[2]*n+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this.z=Ve(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this.z=Ve(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,a=e.z,o=n.x,s=n.y,l=n.z;return this.x=r*l-a*s,this.y=a*o-i*l,this.z=i*s-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return iu.copy(this).projectOnVector(e),this.sub(iu)}reflect(e){return this.sub(iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ve(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const iu=new O,sm=new ms;class Oe{constructor(e,n,i,r,a,o,s,l,c){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c)}set(e,n,i,r,a,o,s,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=s,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[3],l=i[6],c=i[1],f=i[4],p=i[7],h=i[2],m=i[5],_=i[8],y=r[0],x=r[3],u=r[6],g=r[1],v=r[4],b=r[7],T=r[2],E=r[5],w=r[8];return a[0]=o*y+s*g+l*T,a[3]=o*x+s*v+l*E,a[6]=o*u+s*b+l*w,a[1]=c*y+f*g+p*T,a[4]=c*x+f*v+p*E,a[7]=c*u+f*b+p*w,a[2]=h*y+m*g+_*T,a[5]=h*x+m*v+_*E,a[8]=h*u+m*b+_*w,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*s*c-i*a*f+i*s*l+r*a*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8],p=f*o-s*c,h=s*l-f*a,m=c*a-o*l,_=n*p+i*h+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=p*y,e[1]=(r*c-f*i)*y,e[2]=(s*i-r*o)*y,e[3]=h*y,e[4]=(f*n-r*l)*y,e[5]=(r*a-s*n)*y,e[6]=m*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*a)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,a,o,s){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*s)+o+e,-r*c,r*l,-r*(-c*o+l*s)+s+n,0,0,1),this}scale(e,n){return this.premultiply(ru.makeScale(e,n)),this}rotate(e){return this.premultiply(ru.makeRotation(-e)),this}translate(e,n){return this.premultiply(ru.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ru=new Oe,lm=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cm=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function i1(){const t={enabled:!0,workingColorSpace:qa,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===lt&&(r.r=Ni(r.r),r.g=Ni(r.g),r.b=Ni(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(r.r=Da(r.r),r.g=Da(r.g),r.b=Da(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zi?ec:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[qa]:{primaries:e,whitePoint:i,transfer:ec,toXYZ:lm,fromXYZ:cm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:bn},outputColorSpaceConfig:{drawingBufferColorSpace:bn}},[bn]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:lm,fromXYZ:cm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:bn}}}),t}const it=i1();function Ni(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Da(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Zr;class r1{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Zr===void 0&&(Zr=nc("canvas")),Zr.width=e.width,Zr.height=e.height;const r=Zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Zr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=nc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Ni(a[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ni(n[i]/255)*255):n[i]=Ni(n[i]);return{data:n,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let a1=0;class Rh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:a1++}),this.uuid=no(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(au(r[o].image)):a.push(au(r[o]))}else a=au(r);i.url=a}return n||(e.images[this.uuid]=i),i}}function au(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?r1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let o1=0;const ou=new O;class ln extends to{constructor(e=ln.DEFAULT_IMAGE,n=ln.DEFAULT_MAPPING,i=wi,r=wi,a=Un,o=Lr,s=qn,l=hi,c=ln.DEFAULT_ANISOTROPY,f=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:o1++}),this.uuid=no(),this.name="",this.source=new Rh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ou).x}get height(){return this.source.getSize(ou).y}get depth(){return this.source.getSize(ou).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ze(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Od:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case kd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Od:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case kd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=Mg;ln.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,n=0,i=0,r=1){ct.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,a;const l=e.elements,c=l[0],f=l[4],p=l[8],h=l[1],m=l[5],_=l[9],y=l[2],x=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(p-y)<.01&&Math.abs(_-x)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+y)<.1&&Math.abs(_+x)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,b=(m+1)/2,T=(u+1)/2,E=(f+h)/4,w=(p+y)/4,L=(_+x)/4;return v>b&&v>T?v<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(v),r=E/i,a=w/i):b>T?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=E/r,a=L/r):T<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(T),i=w/a,r=L/a),this.set(i,r,a,n),this}let g=Math.sqrt((x-_)*(x-_)+(p-y)*(p-y)+(h-f)*(h-f));return Math.abs(g)<.001&&(g=1),this.x=(x-_)/g,this.y=(p-y)/g,this.z=(h-f)/g,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ve(this.x,e.x,n.x),this.y=Ve(this.y,e.y,n.y),this.z=Ve(this.z,e.z,n.z),this.w=Ve(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ve(this.x,e,n),this.y=Ve(this.y,e,n),this.z=Ve(this.z,e,n),this.w=Ve(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ve(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class s1 extends to{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new ct(0,0,e,n),this.scissorTest=!1,this.viewport=new ct(0,0,e,n);const r={width:e,height:n,depth:i.depth},a=new ln(r);this.textures=[];const o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Rh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jr extends s1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Pg extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class l1 extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yr{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(a,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Bs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bs.copy(i.boundingBox)),Bs.applyMatrix4(e.matrixWorld),this.union(Bs)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xo),Gs.subVectors(this.max,xo),Qr.subVectors(e.a,xo),Jr.subVectors(e.b,xo),ea.subVectors(e.c,xo),ki.subVectors(Jr,Qr),Bi.subVectors(ea,Jr),_r.subVectors(Qr,ea);let n=[0,-ki.z,ki.y,0,-Bi.z,Bi.y,0,-_r.z,_r.y,ki.z,0,-ki.x,Bi.z,0,-Bi.x,_r.z,0,-_r.x,-ki.y,ki.x,0,-Bi.y,Bi.x,0,-_r.y,_r.x,0];return!su(n,Qr,Jr,ea,Gs)||(n=[1,0,0,0,1,0,0,0,1],!su(n,Qr,Jr,ea,Gs))?!1:(Vs.crossVectors(ki,Bi),n=[Vs.x,Vs.y,Vs.z],su(n,Qr,Jr,ea,Gs))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const pi=[new O,new O,new O,new O,new O,new O,new O,new O],Vn=new O,Bs=new Yr,Qr=new O,Jr=new O,ea=new O,ki=new O,Bi=new O,_r=new O,xo=new O,Gs=new O,Vs=new O,yr=new O;function su(t,e,n,i,r){for(let a=0,o=t.length-3;a<=o;a+=3){yr.fromArray(t,a);const s=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),l=e.dot(yr),c=n.dot(yr),f=i.dot(yr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>s)return!1}return!0}const c1=new Yr,go=new O,lu=new O;class xs{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):c1.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);const n=go.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(go,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(lu)),this.expandByPoint(go.copy(e.center).sub(lu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const mi=new O,cu=new O,Hs=new O,Gi=new O,uu=new O,js=new O,du=new O;class Lg{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=mi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,n),mi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){cu.copy(e).add(n).multiplyScalar(.5),Hs.copy(n).sub(e).normalize(),Gi.copy(this.origin).sub(cu);const a=e.distanceTo(n)*.5,o=-this.direction.dot(Hs),s=Gi.dot(this.direction),l=-Gi.dot(Hs),c=Gi.lengthSq(),f=Math.abs(1-o*o);let p,h,m,_;if(f>0)if(p=o*l-s,h=o*s-l,_=a*f,p>=0)if(h>=-_)if(h<=_){const y=1/f;p*=y,h*=y,m=p*(p+o*h+2*s)+h*(o*p+h+2*l)+c}else h=a,p=Math.max(0,-(o*h+s)),m=-p*p+h*(h+2*l)+c;else h=-a,p=Math.max(0,-(o*h+s)),m=-p*p+h*(h+2*l)+c;else h<=-_?(p=Math.max(0,-(-o*a+s)),h=p>0?-a:Math.min(Math.max(-a,-l),a),m=-p*p+h*(h+2*l)+c):h<=_?(p=0,h=Math.min(Math.max(-a,-l),a),m=h*(h+2*l)+c):(p=Math.max(0,-(o*a+s)),h=p>0?a:Math.min(Math.max(-a,-l),a),m=-p*p+h*(h+2*l)+c);else h=o>0?-a:a,p=Math.max(0,-(o*h+s)),m=-p*p+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(cu).addScaledVector(Hs,h),m}intersectSphere(e,n){mi.subVectors(e.center,this.origin);const i=mi.dot(this.direction),r=mi.dot(mi)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),s=i-o,l=i+o;return l<0?null:s<0?this.at(l,n):this.at(s,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,a,o,s,l;const c=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),f>=0?(a=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(a=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),p>=0?(s=(e.min.z-h.z)*p,l=(e.max.z-h.z)*p):(s=(e.max.z-h.z)*p,l=(e.min.z-h.z)*p),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,n,i,r,a){uu.subVectors(n,e),js.subVectors(i,e),du.crossVectors(uu,js);let o=this.direction.dot(du),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;Gi.subVectors(this.origin,e);const l=s*this.direction.dot(js.crossVectors(Gi,js));if(l<0)return null;const c=s*this.direction.dot(uu.cross(Gi));if(c<0||l+c>o)return null;const f=-s*Gi.dot(du);return f<0?null:this.at(f/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,n,i,r,a,o,s,l,c,f,p,h,m,_,y,x){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c,f,p,h,m,_,y,x)}set(e,n,i,r,a,o,s,l,c,f,p,h,m,_,y,x){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=a,u[5]=o,u[9]=s,u[13]=l,u[2]=c,u[6]=f,u[10]=p,u[14]=h,u[3]=m,u[7]=_,u[11]=y,u[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ta.setFromMatrixColumn(e,0).length(),a=1/ta.setFromMatrixColumn(e,1).length(),o=1/ta.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),s=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(a),p=Math.sin(a);if(e.order==="XYZ"){const h=o*f,m=o*p,_=s*f,y=s*p;n[0]=l*f,n[4]=-l*p,n[8]=c,n[1]=m+_*c,n[5]=h-y*c,n[9]=-s*l,n[2]=y-h*c,n[6]=_+m*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,m=l*p,_=c*f,y=c*p;n[0]=h+y*s,n[4]=_*s-m,n[8]=o*c,n[1]=o*p,n[5]=o*f,n[9]=-s,n[2]=m*s-_,n[6]=y+h*s,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,m=l*p,_=c*f,y=c*p;n[0]=h-y*s,n[4]=-o*p,n[8]=_+m*s,n[1]=m+_*s,n[5]=o*f,n[9]=y-h*s,n[2]=-o*c,n[6]=s,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,m=o*p,_=s*f,y=s*p;n[0]=l*f,n[4]=_*c-m,n[8]=h*c+y,n[1]=l*p,n[5]=y*c+h,n[9]=m*c-_,n[2]=-c,n[6]=s*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*c,_=s*l,y=s*c;n[0]=l*f,n[4]=y-h*p,n[8]=_*p+m,n[1]=p,n[5]=o*f,n[9]=-s*f,n[2]=-c*f,n[6]=m*p+_,n[10]=h-y*p}else if(e.order==="XZY"){const h=o*l,m=o*c,_=s*l,y=s*c;n[0]=l*f,n[4]=-p,n[8]=c*f,n[1]=h*p+y,n[5]=o*f,n[9]=m*p-_,n[2]=_*p-m,n[6]=s*f,n[10]=y*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(u1,e,d1)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Vi.crossVectors(i,yn),Vi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Vi.crossVectors(i,yn)),Vi.normalize(),Ws.crossVectors(yn,Vi),r[0]=Vi.x,r[4]=Ws.x,r[8]=yn.x,r[1]=Vi.y,r[5]=Ws.y,r[9]=yn.y,r[2]=Vi.z,r[6]=Ws.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[4],l=i[8],c=i[12],f=i[1],p=i[5],h=i[9],m=i[13],_=i[2],y=i[6],x=i[10],u=i[14],g=i[3],v=i[7],b=i[11],T=i[15],E=r[0],w=r[4],L=r[8],C=r[12],M=r[1],N=r[5],z=r[9],B=r[13],Y=r[2],W=r[6],j=r[10],J=r[14],I=r[3],H=r[7],$=r[11],ae=r[15];return a[0]=o*E+s*M+l*Y+c*I,a[4]=o*w+s*N+l*W+c*H,a[8]=o*L+s*z+l*j+c*$,a[12]=o*C+s*B+l*J+c*ae,a[1]=f*E+p*M+h*Y+m*I,a[5]=f*w+p*N+h*W+m*H,a[9]=f*L+p*z+h*j+m*$,a[13]=f*C+p*B+h*J+m*ae,a[2]=_*E+y*M+x*Y+u*I,a[6]=_*w+y*N+x*W+u*H,a[10]=_*L+y*z+x*j+u*$,a[14]=_*C+y*B+x*J+u*ae,a[3]=g*E+v*M+b*Y+T*I,a[7]=g*w+v*N+b*W+T*H,a[11]=g*L+v*z+b*j+T*$,a[15]=g*C+v*B+b*J+T*ae,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[12],o=e[1],s=e[5],l=e[9],c=e[13],f=e[2],p=e[6],h=e[10],m=e[14],_=e[3],y=e[7],x=e[11],u=e[15];return _*(+a*l*p-r*c*p-a*s*h+i*c*h+r*s*m-i*l*m)+y*(+n*l*m-n*c*h+a*o*h-r*o*m+r*c*f-a*l*f)+x*(+n*c*p-n*s*m-a*o*p+i*o*m+a*s*f-i*c*f)+u*(-r*s*f-n*l*p+n*s*h+r*o*p-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],f=e[8],p=e[9],h=e[10],m=e[11],_=e[12],y=e[13],x=e[14],u=e[15],g=p*x*c-y*h*c+y*l*m-s*x*m-p*l*u+s*h*u,v=_*h*c-f*x*c-_*l*m+o*x*m+f*l*u-o*h*u,b=f*y*c-_*p*c+_*s*m-o*y*m-f*s*u+o*p*u,T=_*p*l-f*y*l-_*s*h+o*y*h+f*s*x-o*p*x,E=n*g+i*v+r*b+a*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=g*w,e[1]=(y*h*a-p*x*a-y*r*m+i*x*m+p*r*u-i*h*u)*w,e[2]=(s*x*a-y*l*a+y*r*c-i*x*c-s*r*u+i*l*u)*w,e[3]=(p*l*a-s*h*a-p*r*c+i*h*c+s*r*m-i*l*m)*w,e[4]=v*w,e[5]=(f*x*a-_*h*a+_*r*m-n*x*m-f*r*u+n*h*u)*w,e[6]=(_*l*a-o*x*a-_*r*c+n*x*c+o*r*u-n*l*u)*w,e[7]=(o*h*a-f*l*a+f*r*c-n*h*c-o*r*m+n*l*m)*w,e[8]=b*w,e[9]=(_*p*a-f*y*a-_*i*m+n*y*m+f*i*u-n*p*u)*w,e[10]=(o*y*a-_*s*a+_*i*c-n*y*c-o*i*u+n*s*u)*w,e[11]=(f*s*a-o*p*a-f*i*c+n*p*c+o*i*m-n*s*m)*w,e[12]=T*w,e[13]=(f*y*r-_*p*r+_*i*h-n*y*h-f*i*x+n*p*x)*w,e[14]=(_*s*r-o*y*r-_*i*l+n*y*l+o*i*x-n*s*x)*w,e[15]=(o*p*r-f*s*r+f*i*l-n*p*l-o*i*h+n*s*h)*w,this}scale(e){const n=this.elements,i=e.x,r=e.y,a=e.z;return n[0]*=i,n[4]*=r,n[8]*=a,n[1]*=i,n[5]*=r,n[9]*=a,n[2]*=i,n[6]*=r,n[10]*=a,n[3]*=i,n[7]*=r,n[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),a=1-i,o=e.x,s=e.y,l=e.z,c=a*o,f=a*s;return this.set(c*o+i,c*s-r*l,c*l+r*s,0,c*s+r*l,f*s+i,f*l-r*o,0,c*l-r*s,f*l+r*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,a=n._x,o=n._y,s=n._z,l=n._w,c=a+a,f=o+o,p=s+s,h=a*c,m=a*f,_=a*p,y=o*f,x=o*p,u=s*p,g=l*c,v=l*f,b=l*p,T=i.x,E=i.y,w=i.z;return r[0]=(1-(y+u))*T,r[1]=(m+b)*T,r[2]=(_-v)*T,r[3]=0,r[4]=(m-b)*E,r[5]=(1-(h+u))*E,r[6]=(x+g)*E,r[7]=0,r[8]=(_+v)*w,r[9]=(x-g)*w,r[10]=(1-(h+y))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let a=ta.set(r[0],r[1],r[2]).length();const o=ta.set(r[4],r[5],r[6]).length(),s=ta.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Hn.copy(this);const c=1/a,f=1/o,p=1/s;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=f,Hn.elements[5]*=f,Hn.elements[6]*=f,Hn.elements[8]*=p,Hn.elements[9]*=p,Hn.elements[10]*=p,n.setFromRotationMatrix(Hn),i.x=a,i.y=o,i.z=s,this}makePerspective(e,n,i,r,a,o,s=li,l=!1){const c=this.elements,f=2*a/(n-e),p=2*a/(i-r),h=(n+e)/(n-e),m=(i+r)/(i-r);let _,y;if(l)_=a/(o-a),y=o*a/(o-a);else if(s===li)_=-(o+a)/(o-a),y=-2*o*a/(o-a);else if(s===tc)_=-o/(o-a),y=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,a,o,s=li,l=!1){const c=this.elements,f=2/(n-e),p=2/(i-r),h=-(n+e)/(n-e),m=-(i+r)/(i-r);let _,y;if(l)_=1/(o-a),y=o/(o-a);else if(s===li)_=-2/(o-a),y=-(o+a)/(o-a);else if(s===tc)_=-1/(o-a),y=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ta=new O,Hn=new ht,u1=new O(0,0,0),d1=new O(1,1,1),Vi=new O,Ws=new O,yn=new O,um=new ht,dm=new ms;class ei{constructor(e=0,n=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],s=r[8],l=r[1],c=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Ve(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(s,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ve(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(s,m));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-f,m),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return um.makeRotationFromQuaternion(e),this.setFromRotationMatrix(um,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return dm.setFromEuler(this),this.setFromQuaternion(dm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Nh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let f1=0;const fm=new O,na=new ms,xi=new ht,Xs=new O,vo=new O,h1=new O,p1=new ms,hm=new O(1,0,0),pm=new O(0,1,0),mm=new O(0,0,1),xm={type:"added"},m1={type:"removed"},ia={type:"childadded",child:null},fu={type:"childremoved",child:null};class Zt extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new O,n=new ei,i=new ms,r=new O(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new Oe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return na.setFromAxisAngle(e,n),this.quaternion.multiply(na),this}rotateOnWorldAxis(e,n){return na.setFromAxisAngle(e,n),this.quaternion.premultiply(na),this}rotateX(e){return this.rotateOnAxis(hm,e)}rotateY(e){return this.rotateOnAxis(pm,e)}rotateZ(e){return this.rotateOnAxis(mm,e)}translateOnAxis(e,n){return fm.copy(e).applyQuaternion(this.quaternion),this.position.add(fm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(hm,e)}translateY(e){return this.translateOnAxis(pm,e)}translateZ(e){return this.translateOnAxis(mm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Xs.copy(e):Xs.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(vo,Xs,this.up):xi.lookAt(Xs,vo,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),na.setFromRotationMatrix(xi),this.quaternion.premultiply(na.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xm),ia.child=e,this.dispatchEvent(ia),ia.child=null):Rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(m1),fu.child=e,this.dispatchEvent(fu),fu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xm),ia.child=e,this.dispatchEvent(ia),ia.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,e,h1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,p1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(s=>({...s,boundingBox:s.boundingBox?s.boundingBox.toJSON():void 0,boundingSphere:s.boundingSphere?s.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(s=>({...s})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const p=l[c];a(e.shapes,p)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(a(e.materials,this.material[l]));r.material=s}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(a(e.animations,l))}}if(n){const s=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),p=o(e.shapes),h=o(e.skeletons),m=o(e.animations),_=o(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(s){const l=[];for(const c in s){const f=s[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Zt.DEFAULT_UP=new O(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new O,gi=new O,hu=new O,vi=new O,ra=new O,aa=new O,gm=new O,pu=new O,mu=new O,xu=new O,gu=new ct,vu=new ct,_u=new ct;class $n{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),jn.subVectors(e,n),r.cross(jn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,n,i,r,a){jn.subVectors(r,n),gi.subVectors(i,n),hu.subVectors(e,n);const o=jn.dot(jn),s=jn.dot(gi),l=jn.dot(hu),c=gi.dot(gi),f=gi.dot(hu),p=o*c-s*s;if(p===0)return a.set(0,0,0),null;const h=1/p,m=(c*l-s*f)*h,_=(o*f-s*l)*h;return a.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,n,i,r,a,o,s,l){return this.getBarycoord(e,n,i,r,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(s,vi.z),l)}static getInterpolatedAttribute(e,n,i,r,a,o){return gu.setScalar(0),vu.setScalar(0),_u.setScalar(0),gu.fromBufferAttribute(e,n),vu.fromBufferAttribute(e,i),_u.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(gu,a.x),o.addScaledVector(vu,a.y),o.addScaledVector(_u,a.z),o}static isFrontFacing(e,n,i,r){return jn.subVectors(i,n),gi.subVectors(e,n),jn.cross(gi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),jn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return $n.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,a){return $n.getInterpolation(e,this.a,this.b,this.c,n,i,r,a)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,a=this.c;let o,s;ra.subVectors(r,i),aa.subVectors(a,i),pu.subVectors(e,i);const l=ra.dot(pu),c=aa.dot(pu);if(l<=0&&c<=0)return n.copy(i);mu.subVectors(e,r);const f=ra.dot(mu),p=aa.dot(mu);if(f>=0&&p<=f)return n.copy(r);const h=l*p-f*c;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(ra,o);xu.subVectors(e,a);const m=ra.dot(xu),_=aa.dot(xu);if(_>=0&&m<=_)return n.copy(a);const y=m*c-l*_;if(y<=0&&c>=0&&_<=0)return s=c/(c-_),n.copy(i).addScaledVector(aa,s);const x=f*_-m*p;if(x<=0&&p-f>=0&&m-_>=0)return gm.subVectors(a,r),s=(p-f)/(p-f+(m-_)),n.copy(r).addScaledVector(gm,s);const u=1/(x+y+h);return o=y*u,s=h*u,n.copy(i).addScaledVector(ra,o).addScaledVector(aa,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ig={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function yu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Be{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=it.workingColorSpace){return this.r=e,this.g=n,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=it.workingColorSpace){if(e=Th(e,1),n=Ve(n,0,1),i=Ve(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=yu(o,a,e+1/3),this.g=yu(o,a,e),this.b=yu(o,a,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,n=bn){function i(a){a!==void 0&&parseFloat(a)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=bn){const i=Ig[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=Da(e.r),this.g=Da(e.g),this.b=Da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bn){return it.workingToColorSpace(qt.copy(this),e),Math.round(Ve(qt.r*255,0,255))*65536+Math.round(Ve(qt.g*255,0,255))*256+Math.round(Ve(qt.b*255,0,255))}getHexString(e=bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=it.workingColorSpace){it.workingToColorSpace(qt.copy(this),n);const i=qt.r,r=qt.g,a=qt.b,o=Math.max(i,r,a),s=Math.min(i,r,a);let l,c;const f=(s+o)/2;if(s===o)l=0,c=0;else{const p=o-s;switch(c=f<=.5?p/(o+s):p/(2-o-s),o){case i:l=(r-a)/p+(r<a?6:0);break;case r:l=(a-i)/p+2;break;case a:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=it.workingColorSpace){return it.workingToColorSpace(qt.copy(this),n),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=bn){it.workingToColorSpace(qt.copy(this),e);const n=qt.r,i=qt.g,r=qt.b;return e!==bn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(Ys);const i=ko(Hi.h,Ys.h,n),r=ko(Hi.s,Ys.s,n),a=ko(Hi.l,Ys.l,n);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*n+a[3]*i+a[6]*r,this.g=a[1]*n+a[4]*i+a[7]*r,this.b=a[2]*n+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Be;Be.NAMES=Ig;let x1=0;class io extends to{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Ia,this.side=hr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wd,this.blendDst=Td,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Xa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ze(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ia&&(i.blending=this.blending),this.side!==hr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wd&&(i.blendSrc=this.blendSrc),this.blendDst!==Td&&(i.blendDst=this.blendDst),this.blendEquation!==wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Kr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Kr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const s in a){const l=a[s];delete l.metadata,o.push(l)}return o}if(n){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Dg extends io{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new O,$s=new He;let g1=0;class Qn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=nm,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)$s.fromBufferAttribute(this,n),$s.applyMatrix3(e),this.setXY(n,$s.x,$s.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix3(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix4(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyNormalMatrix(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.transformDirection(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=pa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=nn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=pa(n,this.array)),n}setX(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=pa(n,this.array)),n}setY(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=pa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=pa(n,this.array)),n}setW(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array),r=nn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,a){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array),r=nn(r,this.array),a=nn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nm&&(e.usage=this.usage),e}}class zg extends Qn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Ug extends Qn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class fi extends Qn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let v1=0;const Ln=new ht,Su=new Zt,oa=new O,Sn=new Yr,_o=new Yr,Ft=new O;class Fi extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:v1++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ng(e)?Ug:zg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Oe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,n,i){return Ln.makeTranslation(e,n,i),this.applyMatrix4(Ln),this}scale(e,n,i){return Ln.makeScale(e,n,i),this.applyMatrix4(Ln),this}lookAt(e){return Su.lookAt(e),Su.updateMatrix(),this.applyMatrix4(Su.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oa).negate(),this.translate(oa.x,oa.y,oa.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fi(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const a=e[r];n.setXYZ(r,a.x,a.y,a.z||0)}e.length>n.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const a=n[i];Sn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const s=n[a];_o.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(Sn.min,_o.min),Sn.expandByPoint(Ft),Ft.addVectors(Sn.max,_o.max),Sn.expandByPoint(Ft)):(Sn.expandByPoint(_o.min),Sn.expandByPoint(_o.max))}Sn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)Ft.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let a=0,o=n.length;a<o;a++){const s=n[a],l=this.morphTargetsRelative;for(let c=0,f=s.count;c<f;c++)Ft.fromBufferAttribute(s,c),l&&(oa.fromBufferAttribute(e,c),Ft.add(oa)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),s=[],l=[];for(let L=0;L<i.count;L++)s[L]=new O,l[L]=new O;const c=new O,f=new O,p=new O,h=new He,m=new He,_=new He,y=new O,x=new O;function u(L,C,M){c.fromBufferAttribute(i,L),f.fromBufferAttribute(i,C),p.fromBufferAttribute(i,M),h.fromBufferAttribute(a,L),m.fromBufferAttribute(a,C),_.fromBufferAttribute(a,M),f.sub(c),p.sub(c),m.sub(h),_.sub(h);const N=1/(m.x*_.y-_.x*m.y);isFinite(N)&&(y.copy(f).multiplyScalar(_.y).addScaledVector(p,-m.y).multiplyScalar(N),x.copy(p).multiplyScalar(m.x).addScaledVector(f,-_.x).multiplyScalar(N),s[L].add(y),s[C].add(y),s[M].add(y),l[L].add(x),l[C].add(x),l[M].add(x))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let L=0,C=g.length;L<C;++L){const M=g[L],N=M.start,z=M.count;for(let B=N,Y=N+z;B<Y;B+=3)u(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const v=new O,b=new O,T=new O,E=new O;function w(L){T.fromBufferAttribute(r,L),E.copy(T);const C=s[L];v.copy(C),v.sub(T.multiplyScalar(T.dot(C))).normalize(),b.crossVectors(E,C);const N=b.dot(l[L])<0?-1:1;o.setXYZW(L,v.x,v.y,v.z,N)}for(let L=0,C=g.length;L<C;++L){const M=g[L],N=M.start,z=M.count;for(let B=N,Y=N+z;B<Y;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new O,a=new O,o=new O,s=new O,l=new O,c=new O,f=new O,p=new O;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),y=e.getX(h+1),x=e.getX(h+2);r.fromBufferAttribute(n,_),a.fromBufferAttribute(n,y),o.fromBufferAttribute(n,x),f.subVectors(o,a),p.subVectors(r,a),f.cross(p),s.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,x),s.add(f),l.add(f),c.add(f),i.setXYZ(_,s.x,s.y,s.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),a.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,a),p.subVectors(r,a),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(s,l){const c=s.array,f=s.itemSize,p=s.normalized,h=new c.constructor(l.length*f);let m=0,_=0;for(let y=0,x=l.length;y<x;y++){s.isInterleavedBufferAttribute?m=l[y]*s.data.stride+s.offset:m=l[y]*f;for(let u=0;u<f;u++)h[_++]=c[m++]}return new Qn(h,f,p)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Fi,i=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,i);n.setAttribute(s,c)}const a=this.morphAttributes;for(const s in a){const l=[],c=a[s];for(let f=0,p=c.length;f<p;f++){const h=c[f],m=e(h,i);l.push(m)}n.morphAttributes[s]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,l=o.length;s<l;s++){const c=o[s];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let p=0,h=c.length;p<h;p++){const m=c[p];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere=s.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const a=e.morphAttributes;for(const c in a){const f=[],p=a[c];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vm=new ht,Sr=new Lg,qs=new xs,_m=new O,Ks=new O,Zs=new O,Qs=new O,Mu=new O,Js=new O,ym=new O,el=new O;class Ht extends Zt{constructor(e=new Fi,n=new Dg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(a&&s){Js.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const f=s[l],p=a[l];f!==0&&(Mu.fromBufferAttribute(p,e),o?Js.addScaledVector(Mu,f):Js.addScaledVector(Mu.sub(n),f))}n.add(Js)}return n}raycast(e,n){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(a),Sr.copy(e.ray).recast(e.near),!(qs.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(qs,_m)===null||Sr.origin.distanceToSquared(_m)>(e.far-e.near)**2))&&(vm.copy(a).invert(),Sr.copy(e.ray).applyMatrix4(vm),!(i.boundingBox!==null&&Sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Sr)))}_computeIntersections(e,n,i){let r;const a=this.geometry,o=this.material,s=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,p=a.attributes.normal,h=a.groups,m=a.drawRange;if(s!==null)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const x=h[_],u=o[x.materialIndex],g=Math.max(x.start,m.start),v=Math.min(s.count,Math.min(x.start+x.count,m.start+m.count));for(let b=g,T=v;b<T;b+=3){const E=s.getX(b),w=s.getX(b+1),L=s.getX(b+2);r=tl(this,u,e,i,c,f,p,E,w,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),y=Math.min(s.count,m.start+m.count);for(let x=_,u=y;x<u;x+=3){const g=s.getX(x),v=s.getX(x+1),b=s.getX(x+2);r=tl(this,o,e,i,c,f,p,g,v,b),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const x=h[_],u=o[x.materialIndex],g=Math.max(x.start,m.start),v=Math.min(l.count,Math.min(x.start+x.count,m.start+m.count));for(let b=g,T=v;b<T;b+=3){const E=b,w=b+1,L=b+2;r=tl(this,u,e,i,c,f,p,E,w,L),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let x=_,u=y;x<u;x+=3){const g=x,v=x+1,b=x+2;r=tl(this,o,e,i,c,f,p,g,v,b),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}}}function _1(t,e,n,i,r,a,o,s){let l;if(e.side===sn?l=i.intersectTriangle(o,a,r,!0,s):l=i.intersectTriangle(r,a,o,e.side===hr,s),l===null)return null;el.copy(s),el.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(el);return c<n.near||c>n.far?null:{distance:c,point:el.clone(),object:t}}function tl(t,e,n,i,r,a,o,s,l,c){t.getVertexPosition(s,Ks),t.getVertexPosition(l,Zs),t.getVertexPosition(c,Qs);const f=_1(t,e,n,i,Ks,Zs,Qs,ym);if(f){const p=new O;$n.getBarycoord(ym,Ks,Zs,Qs,p),r&&(f.uv=$n.getInterpolatedAttribute(r,s,l,c,p,new He)),a&&(f.uv1=$n.getInterpolatedAttribute(a,s,l,c,p,new He)),o&&(f.normal=$n.getInterpolatedAttribute(o,s,l,c,p,new O),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:s,b:l,c,normal:new O,materialIndex:0};$n.getNormal(Ks,Zs,Qs,h.normal),f.face=h,f.barycoord=p}return f}class ro extends Fi{constructor(e=1,n=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],f=[],p=[];let h=0,m=0;_("z","y","x",-1,-1,i,n,e,o,a,0),_("z","y","x",1,-1,i,n,-e,o,a,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,a,4),_("x","y","z",-1,-1,e,n,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new fi(c,3)),this.setAttribute("normal",new fi(f,3)),this.setAttribute("uv",new fi(p,2));function _(y,x,u,g,v,b,T,E,w,L,C){const M=b/w,N=T/L,z=b/2,B=T/2,Y=E/2,W=w+1,j=L+1;let J=0,I=0;const H=new O;for(let $=0;$<j;$++){const ae=$*N-B;for(let Me=0;Me<W;Me++){const Je=Me*M-z;H[y]=Je*g,H[x]=ae*v,H[u]=Y,c.push(H.x,H.y,H.z),H[y]=0,H[x]=0,H[u]=E>0?1:-1,f.push(H.x,H.y,H.z),p.push(Me/w),p.push(1-$/L),J+=1}}for(let $=0;$<L;$++)for(let ae=0;ae<w;ae++){const Me=h+ae+W*$,Je=h+ae+W*($+1),Qe=h+(ae+1)+W*($+1),rt=h+(ae+1)+W*$;l.push(Me,Je,rt),l.push(Je,Qe,rt),I+=6}s.addGroup(m,I,C),m+=I,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ka(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function rn(t){const e={};for(let n=0;n<t.length;n++){const i=Ka(t[n]);for(const r in i)e[r]=i[r]}return e}function y1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Fg(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const S1={clone:Ka,merge:rn};var M1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends io{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M1,this.fragmentShader=b1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ka(e.uniforms),this.uniformsGroups=y1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Og extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ji=new O,Sm=new He,Mm=new He;class An extends Og{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=ls*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,n){return this.getViewBounds(e,Sm,Mm),n.subVectors(Mm,Sm)}setViewOffset(e,n,i,r,a,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Oo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const sa=-90,la=1;class A1 extends Zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new An(sa,la,e,n);r.layers=this.layers,this.add(r);const a=new An(sa,la,e,n);a.layers=this.layers,this.add(a);const o=new An(sa,la,e,n);o.layers=this.layers,this.add(o);const s=new An(sa,la,e,n);s.layers=this.layers,this.add(s);const l=new An(sa,la,e,n);l.layers=this.layers,this.add(l);const c=new An(sa,la,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,a,o,s,l]=n;for(const c of n)this.remove(c);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,s,l,c,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,a),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,s),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class kg extends ln{constructor(e=[],n=Ya,i,r,a,o,s,l,c,f){super(e,n,i,r,a,o,s,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class E1 extends jr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new kg(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ro(5,5,5),a=new zi({name:"CubemapFromEquirect",uniforms:Ka(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Ri});a.uniforms.tEquirect.value=n;const o=new Ht(r,a),s=n.minFilter;return n.minFilter===Lr&&(n.minFilter=Un),new A1(1,10,this).update(e,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(a)}}class nl extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const C1={type:"move"};class bu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,a=null,o=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const x=n.getJointPose(y,i),u=this._getHandJoint(c,y);x!==null&&(u.matrix.fromArray(x.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=x.radius),u.visible=x!==null}const f=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,_=.005;c.inputState.pinching&&h>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=n.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(C1)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new nl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class Bg extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Gg extends ln{constructor(e=null,n=1,i=1,r,a,o,s,l,c=wn,f=wn,p,h){super(null,o,s,l,c,f,r,a,p,h),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bm extends Qn{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ca=new ht,Am=new ht,il=[],Em=new Yr,w1=new ht,yo=new Ht,So=new xs;class Vg extends Ht{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new bm(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,w1)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Yr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ca),Em.copy(e.boundingBox).applyMatrix4(ca),this.boundingBox.union(Em)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new xs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ca),So.copy(e.boundingSphere).applyMatrix4(ca),this.boundingSphere.union(So)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,o=e*a+1;for(let s=0;s<i.length;s++)i[s]=r[o+s]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(yo.geometry=this.geometry,yo.material=this.material,yo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(i),e.ray.intersectsSphere(So)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,ca),Am.multiplyMatrices(i,ca),yo.matrixWorld=Am,yo.raycast(e,il);for(let o=0,s=il.length;o<s;o++){const l=il[o];l.instanceId=a,l.object=this,n.push(l)}il.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new bm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Gg(new Float32Array(r*this.count),r,this.count,Mh,si));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const s=this.geometry.morphTargetsRelative?1:1-o,l=r*e;a[l]=s,a.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Au=new O,T1=new O,R1=new Oe;class $i{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Au.subVectors(i,n).cross(T1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Au),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:n.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||R1.getNormalMatrix(e),r=this.coplanarPoint(Au).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new xs,N1=new He(.5,.5),rl=new O;class Ph{constructor(e=new $i,n=new $i,i=new $i,r=new $i,a=new $i,o=new $i){this.planes=[e,n,i,r,a,o]}set(e,n,i,r,a,o){const s=this.planes;return s[0].copy(e),s[1].copy(n),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=li,i=!1){const r=this.planes,a=e.elements,o=a[0],s=a[1],l=a[2],c=a[3],f=a[4],p=a[5],h=a[6],m=a[7],_=a[8],y=a[9],x=a[10],u=a[11],g=a[12],v=a[13],b=a[14],T=a[15];if(r[0].setComponents(c-o,m-f,u-_,T-g).normalize(),r[1].setComponents(c+o,m+f,u+_,T+g).normalize(),r[2].setComponents(c+s,m+p,u+y,T+v).normalize(),r[3].setComponents(c-s,m-p,u-y,T-v).normalize(),i)r[4].setComponents(l,h,x,b).normalize(),r[5].setComponents(c-l,m-h,u-x,T-b).normalize();else if(r[4].setComponents(c-l,m-h,u-x,T-b).normalize(),n===li)r[5].setComponents(c+l,m+h,u+x,T+b).normalize();else if(n===tc)r[5].setComponents(l,h,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(e){Mr.center.set(0,0,0);const n=N1.distanceTo(e.center);return Mr.radius=.7071067811865476+n,Mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(rl.x=r.normal.x>0?e.max.x:e.min.x,rl.y=r.normal.y>0?e.max.y:e.min.y,rl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hg extends ln{constructor(e,n,i=Hr,r,a,o,s=wn,l=wn,c,f=as,p=1){if(f!==as&&f!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:n,depth:p};super(h,r,a,o,s,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class jg extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mc extends Fi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const a=e/2,o=n/2,s=Math.floor(i),l=Math.floor(r),c=s+1,f=l+1,p=e/s,h=n/l,m=[],_=[],y=[],x=[];for(let u=0;u<f;u++){const g=u*h-o;for(let v=0;v<c;v++){const b=v*p-a;_.push(b,-g,0),y.push(0,0,1),x.push(v/s),x.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<s;g++){const v=g+c*u,b=g+c*(u+1),T=g+1+c*(u+1),E=g+1+c*u;m.push(v,b,E),m.push(b,T,E)}this.setIndex(m),this.setAttribute("position",new fi(_,3)),this.setAttribute("normal",new fi(y,3)),this.setAttribute("uv",new fi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.width,e.height,e.widthSegments,e.heightSegments)}}class Lh extends Fi{constructor(e=1,n=32,i=16,r=0,a=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:a,thetaStart:o,thetaLength:s},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+s,Math.PI);let c=0;const f=[],p=new O,h=new O,m=[],_=[],y=[],x=[];for(let u=0;u<=i;u++){const g=[],v=u/i;let b=0;u===0&&o===0?b=.5/n:u===i&&l===Math.PI&&(b=-.5/n);for(let T=0;T<=n;T++){const E=T/n;p.x=-e*Math.cos(r+E*a)*Math.sin(o+v*s),p.y=e*Math.cos(o+v*s),p.z=e*Math.sin(r+E*a)*Math.sin(o+v*s),_.push(p.x,p.y,p.z),h.copy(p).normalize(),y.push(h.x,h.y,h.z),x.push(E+b,1-v),g.push(c++)}f.push(g)}for(let u=0;u<i;u++)for(let g=0;g<n;g++){const v=f[u][g+1],b=f[u][g],T=f[u+1][g],E=f[u+1][g+1];(u!==0||o>0)&&m.push(v,b,E),(u!==i-1||l<Math.PI)&&m.push(b,T,E)}this.setIndex(m),this.setAttribute("position",new fi(_,3)),this.setAttribute("normal",new fi(y,3)),this.setAttribute("uv",new fi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xf extends io{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wh,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class P1 extends xf{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new He(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class L1 extends io{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wh,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class I1 extends io{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=RS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class D1 extends io{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wg extends Zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Eu=new ht,Cm=new O,wm=new O;class z1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ph,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Cm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Cm),wm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(wm),n.updateMatrixWorld(),Eu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eu,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Eu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tm=new ht,Mo=new O,Cu=new O;class U1 extends z1{constructor(){super(new An(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new He(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),Mo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Mo),Cu.copy(i.position),Cu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(Cu),i.updateMatrixWorld(),r.makeTranslation(-Mo.x,-Mo.y,-Mo.z),Tm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tm,i.coordinateSystem,i.reversedDepth)}}class Xg extends Wg{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new U1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class F1 extends Og{constructor(e=-1,n=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,s=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,s-=f*this.view.offsetY,l=s-f*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class O1 extends Wg{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class k1 extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class B1{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const Rm=new ht;class G1{constructor(e,n,i=0,r=1/0){this.ray=new Lg(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Nh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Rt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Rm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rm),this}intersectObject(e,n=!0,i=[]){return gf(e,this,i,n),i.sort(Nm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,a=e.length;r<a;r++)gf(e[r],this,i,n);return i.sort(Nm),i}}function Nm(t,e){return t.distance-e.distance}function gf(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const a=t.children;for(let o=0,s=a.length;o<s;o++)gf(a[o],e,n,!0)}}function Pm(t,e,n,i){const r=V1(i);switch(n){case wg:return t*e;case Mh:return t*e/r.components*r.byteLength;case bh:return t*e/r.components*r.byteLength;case Ah:return t*e*2/r.components*r.byteLength;case Eh:return t*e*2/r.components*r.byteLength;case Tg:return t*e*3/r.components*r.byteLength;case qn:return t*e*4/r.components*r.byteLength;case Ch:return t*e*4/r.components*r.byteLength;case bl:case Al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case El:case Cl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Gd:case Hd:return Math.max(t,16)*Math.max(e,8)/4;case Bd:case Vd:return Math.max(t,8)*Math.max(e,8)/2;case jd:case Wd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Xd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Yd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case $d:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case qd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Kd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Zd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Qd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Jd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case ef:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case tf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case nf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case rf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case af:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case of:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case sf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case lf:case cf:case uf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case df:case ff:return Math.ceil(t/4)*Math.ceil(e/4)*8;case hf:case pf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function V1(t){switch(t){case hi:case bg:return{byteLength:1,components:1};case is:case Ag:case eo:return{byteLength:2,components:1};case yh:case Sh:return{byteLength:2,components:4};case Hr:case _h:case si:return{byteLength:4,components:1};case Eg:case Cg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yg(){let t=null,e=!1,n=null,i=null;function r(a,o){n(a,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){n=a},setContext:function(a){t=a}}}function H1(t){const e=new WeakMap;function n(s,l){const c=s.array,f=s.usage,p=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,f),s.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=t.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:p}}function i(s,l,c){const f=l.array,p=l.updateRanges;if(t.bindBuffer(c,s),p.length===0)t.bufferSubData(c,0,f);else{p.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<p.length;m++){const _=p[h],y=p[m];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,p[h]=y)}p.length=h+1;for(let m=0,_=p.length;m<_;m++){const y=p[m];t.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=e.get(s);l&&(t.deleteBuffer(l.buffer),e.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const f=e.get(s);(!f||f.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=e.get(s);if(c===void 0)e.set(s,n(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:r,remove:a,update:o}}var j1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,W1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,X1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Y1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,q1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Z1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,J1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,aM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_M=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yM="gl_FragColor = linearToOutputTexel( gl_FragColor );",SM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,MM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,AM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,EM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,TM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,RM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,NM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,PM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,LM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,DM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,UM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,FM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,OM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,BM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,GM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,VM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,HM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,WM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,XM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,YM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$M=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,KM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ZM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,QM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,JM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,e3=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,t3=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n3=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,i3=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r3=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,a3=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,o3=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,l3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,c3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,f3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,h3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,p3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,m3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,g3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,v3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,S3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,M3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,C3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,w3=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,T3=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,R3=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N3=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,P3=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,L3=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,I3=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,D3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,U3=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,F3=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,O3=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,k3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,B3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,G3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,V3=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const H3=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,j3=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X3=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,K3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Z3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Q3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,J3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ib=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ab=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ob=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ub=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,db=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_b=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Sb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:j1,alphahash_pars_fragment:W1,alphamap_fragment:X1,alphamap_pars_fragment:Y1,alphatest_fragment:$1,alphatest_pars_fragment:q1,aomap_fragment:K1,aomap_pars_fragment:Z1,batching_pars_vertex:Q1,batching_vertex:J1,begin_vertex:eM,beginnormal_vertex:tM,bsdfs:nM,iridescence_fragment:iM,bumpmap_pars_fragment:rM,clipping_planes_fragment:aM,clipping_planes_pars_fragment:oM,clipping_planes_pars_vertex:sM,clipping_planes_vertex:lM,color_fragment:cM,color_pars_fragment:uM,color_pars_vertex:dM,color_vertex:fM,common:hM,cube_uv_reflection_fragment:pM,defaultnormal_vertex:mM,displacementmap_pars_vertex:xM,displacementmap_vertex:gM,emissivemap_fragment:vM,emissivemap_pars_fragment:_M,colorspace_fragment:yM,colorspace_pars_fragment:SM,envmap_fragment:MM,envmap_common_pars_fragment:bM,envmap_pars_fragment:AM,envmap_pars_vertex:EM,envmap_physical_pars_fragment:UM,envmap_vertex:CM,fog_vertex:wM,fog_pars_vertex:TM,fog_fragment:RM,fog_pars_fragment:NM,gradientmap_pars_fragment:PM,lightmap_pars_fragment:LM,lights_lambert_fragment:IM,lights_lambert_pars_fragment:DM,lights_pars_begin:zM,lights_toon_fragment:FM,lights_toon_pars_fragment:OM,lights_phong_fragment:kM,lights_phong_pars_fragment:BM,lights_physical_fragment:GM,lights_physical_pars_fragment:VM,lights_fragment_begin:HM,lights_fragment_maps:jM,lights_fragment_end:WM,logdepthbuf_fragment:XM,logdepthbuf_pars_fragment:YM,logdepthbuf_pars_vertex:$M,logdepthbuf_vertex:qM,map_fragment:KM,map_pars_fragment:ZM,map_particle_fragment:QM,map_particle_pars_fragment:JM,metalnessmap_fragment:e3,metalnessmap_pars_fragment:t3,morphinstance_vertex:n3,morphcolor_vertex:i3,morphnormal_vertex:r3,morphtarget_pars_vertex:a3,morphtarget_vertex:o3,normal_fragment_begin:s3,normal_fragment_maps:l3,normal_pars_fragment:c3,normal_pars_vertex:u3,normal_vertex:d3,normalmap_pars_fragment:f3,clearcoat_normal_fragment_begin:h3,clearcoat_normal_fragment_maps:p3,clearcoat_pars_fragment:m3,iridescence_pars_fragment:x3,opaque_fragment:g3,packing:v3,premultiplied_alpha_fragment:_3,project_vertex:y3,dithering_fragment:S3,dithering_pars_fragment:M3,roughnessmap_fragment:b3,roughnessmap_pars_fragment:A3,shadowmap_pars_fragment:E3,shadowmap_pars_vertex:C3,shadowmap_vertex:w3,shadowmask_pars_fragment:T3,skinbase_vertex:R3,skinning_pars_vertex:N3,skinning_vertex:P3,skinnormal_vertex:L3,specularmap_fragment:I3,specularmap_pars_fragment:D3,tonemapping_fragment:z3,tonemapping_pars_fragment:U3,transmission_fragment:F3,transmission_pars_fragment:O3,uv_pars_fragment:k3,uv_pars_vertex:B3,uv_vertex:G3,worldpos_vertex:V3,background_vert:H3,background_frag:j3,backgroundCube_vert:W3,backgroundCube_frag:X3,cube_vert:Y3,cube_frag:$3,depth_vert:q3,depth_frag:K3,distanceRGBA_vert:Z3,distanceRGBA_frag:Q3,equirect_vert:J3,equirect_frag:eb,linedashed_vert:tb,linedashed_frag:nb,meshbasic_vert:ib,meshbasic_frag:rb,meshlambert_vert:ab,meshlambert_frag:ob,meshmatcap_vert:sb,meshmatcap_frag:lb,meshnormal_vert:cb,meshnormal_frag:ub,meshphong_vert:db,meshphong_frag:fb,meshphysical_vert:hb,meshphysical_frag:pb,meshtoon_vert:mb,meshtoon_frag:xb,points_vert:gb,points_frag:vb,shadow_vert:_b,shadow_frag:yb,sprite_vert:Sb,sprite_frag:Mb},ce={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},ai={basic:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Be(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:rn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:rn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:rn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Be(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:rn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:rn([ce.points,ce.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:rn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:rn([ce.common,ce.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:rn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:rn([ce.sprite,ce.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:rn([ce.common,ce.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:rn([ce.lights,ce.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};ai.physical={uniforms:rn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const al={r:0,b:0,g:0},br=new ei,bb=new ht;function Ab(t,e,n,i,r,a,o){const s=new Be(0);let l=a===!0?0:1,c,f,p=null,h=0,m=null;function _(v){let b=v.isScene===!0?v.background:null;return b&&b.isTexture&&(b=(v.backgroundBlurriness>0?n:e).get(b)),b}function y(v){let b=!1;const T=_(v);T===null?u(s,l):T&&T.isColor&&(u(T,1),b=!0);const E=t.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function x(v,b){const T=_(b);T&&(T.isCubeTexture||T.mapping===Sc)?(f===void 0&&(f=new Ht(new ro(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:Ka(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(E,w,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),br.copy(b.backgroundRotation),br.x*=-1,br.y*=-1,br.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),f.material.uniforms.envMap.value=T,f.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(bb.makeRotationFromEuler(br)),f.material.toneMapped=it.getTransfer(T.colorSpace)!==lt,(p!==T||h!==T.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,p=T,h=T.version,m=t.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ht(new Mc(2,2),new zi({name:"BackgroundMaterial",uniforms:Ka(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:hr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=it.getTransfer(T.colorSpace)!==lt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(p!==T||h!==T.version||m!==t.toneMapping)&&(c.material.needsUpdate=!0,p=T,h=T.version,m=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function u(v,b){v.getRGB(al,Fg(t)),i.buffers.color.setClear(al.r,al.g,al.b,b,o)}function g(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(v,b=1){s.set(v),l=b,u(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,u(s,l)},render:y,addToRenderList:x,dispose:g}}function Eb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let a=r,o=!1;function s(M,N,z,B,Y){let W=!1;const j=p(B,z,N);a!==j&&(a=j,c(a.object)),W=m(M,B,z,Y),W&&_(M,B,z,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,b(M,N,z,B),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function f(M){return t.deleteVertexArray(M)}function p(M,N,z){const B=z.wireframe===!0;let Y=i[M.id];Y===void 0&&(Y={},i[M.id]=Y);let W=Y[N.id];W===void 0&&(W={},Y[N.id]=W);let j=W[B];return j===void 0&&(j=h(l()),W[B]=j),j}function h(M){const N=[],z=[],B=[];for(let Y=0;Y<n;Y++)N[Y]=0,z[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:B,object:M,attributes:{},index:null}}function m(M,N,z,B){const Y=a.attributes,W=N.attributes;let j=0;const J=z.getAttributes();for(const I in J)if(J[I].location>=0){const $=Y[I];let ae=W[I];if(ae===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),$===void 0||$.attribute!==ae||ae&&$.data!==ae.data)return!0;j++}return a.attributesNum!==j||a.index!==B}function _(M,N,z,B){const Y={},W=N.attributes;let j=0;const J=z.getAttributes();for(const I in J)if(J[I].location>=0){let $=W[I];$===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&($=M.instanceColor));const ae={};ae.attribute=$,$&&$.data&&(ae.data=$.data),Y[I]=ae,j++}a.attributes=Y,a.attributesNum=j,a.index=B}function y(){const M=a.newAttributes;for(let N=0,z=M.length;N<z;N++)M[N]=0}function x(M){u(M,0)}function u(M,N){const z=a.newAttributes,B=a.enabledAttributes,Y=a.attributeDivisors;z[M]=1,B[M]===0&&(t.enableVertexAttribArray(M),B[M]=1),Y[M]!==N&&(t.vertexAttribDivisor(M,N),Y[M]=N)}function g(){const M=a.newAttributes,N=a.enabledAttributes;for(let z=0,B=N.length;z<B;z++)N[z]!==M[z]&&(t.disableVertexAttribArray(z),N[z]=0)}function v(M,N,z,B,Y,W,j){j===!0?t.vertexAttribIPointer(M,N,z,Y,W):t.vertexAttribPointer(M,N,z,B,Y,W)}function b(M,N,z,B){y();const Y=B.attributes,W=z.getAttributes(),j=N.defaultAttributeValues;for(const J in W){const I=W[J];if(I.location>=0){let H=Y[J];if(H===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(H=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(H=M.instanceColor)),H!==void 0){const $=H.normalized,ae=H.itemSize,Me=e.get(H);if(Me===void 0)continue;const Je=Me.buffer,Qe=Me.type,rt=Me.bytesPerElement,q=Qe===t.INT||Qe===t.UNSIGNED_INT||H.gpuType===_h;if(H.isInterleavedBufferAttribute){const Q=H.data,xe=Q.stride,Ue=H.offset;if(Q.isInstancedInterleavedBuffer){for(let be=0;be<I.locationSize;be++)u(I.location+be,Q.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let be=0;be<I.locationSize;be++)x(I.location+be);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let be=0;be<I.locationSize;be++)v(I.location+be,ae/I.locationSize,Qe,$,xe*rt,(Ue+ae/I.locationSize*be)*rt,q)}else{if(H.isInstancedBufferAttribute){for(let Q=0;Q<I.locationSize;Q++)u(I.location+Q,H.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Q=0;Q<I.locationSize;Q++)x(I.location+Q);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let Q=0;Q<I.locationSize;Q++)v(I.location+Q,ae/I.locationSize,Qe,$,ae*rt,ae/I.locationSize*Q*rt,q)}}else if(j!==void 0){const $=j[J];if($!==void 0)switch($.length){case 2:t.vertexAttrib2fv(I.location,$);break;case 3:t.vertexAttrib3fv(I.location,$);break;case 4:t.vertexAttrib4fv(I.location,$);break;default:t.vertexAttrib1fv(I.location,$)}}}}g()}function T(){L();for(const M in i){const N=i[M];for(const z in N){const B=N[z];for(const Y in B)f(B[Y].object),delete B[Y];delete N[z]}delete i[M]}}function E(M){if(i[M.id]===void 0)return;const N=i[M.id];for(const z in N){const B=N[z];for(const Y in B)f(B[Y].object),delete B[Y];delete N[z]}delete i[M.id]}function w(M){for(const N in i){const z=i[N];if(z[M.id]===void 0)continue;const B=z[M.id];for(const Y in B)f(B[Y].object),delete B[Y];delete z[M.id]}}function L(){C(),o=!0,a!==r&&(a=r,c(a.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:L,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:x,disableUnusedAttributes:g}}function Cb(t,e,n){let i;function r(c){i=c}function a(c,f){t.drawArrays(i,c,f),n.update(f,i,1)}function o(c,f,p){p!==0&&(t.drawArraysInstanced(i,c,f,p),n.update(f,i,p))}function s(c,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_];n.update(m,i,1)}function l(c,f,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)o(c[_],f[_],h[_]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,p);let _=0;for(let y=0;y<p;y++)_+=f[y]*h[y];n.update(_,i,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=l}function wb(t,e,n,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==qn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(w){const L=w===eo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==hi&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==si&&!L)}function l(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(ze("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const p=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),x=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),b=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,E=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:x,maxAttributes:u,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:b,vertexTextures:T,maxSamples:E}}function Tb(t){const e=this;let n=null,i=0,r=!1,a=!1;const o=new $i,s=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const _=p.clippingPlanes,y=p.clipIntersection,x=p.clipShadows,u=t.get(p);if(!r||_===null||_.length===0||a&&!x)a?f(null):c();else{const g=a?0:i,v=g*4;let b=u.clippingState||null;l.value=b,b=f(_,h,v,m);for(let T=0;T!==v;++T)b[T]=n[T];u.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,_){const y=p!==null?p.length:0;let x=null;if(y!==0){if(x=l.value,_!==!0||x===null){const u=m+y*4,g=h.matrixWorldInverse;s.getNormalMatrix(g),(x===null||x.length<u)&&(x=new Float32Array(u));for(let v=0,b=m;v!==y;++v,b+=4)o.copy(p[v]).applyMatrix4(g,s),o.normal.toArray(x,b),x[b+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,x}}function Rb(t){let e=new WeakMap;function n(o,s){return s===Ud?o.mapping=Ya:s===Fd&&(o.mapping=$a),o}function i(o){if(o&&o.isTexture){const s=o.mapping;if(s===Ud||s===Fd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new E1(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const s=o.target;s.removeEventListener("dispose",r);const l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const tr=4,Lm=[.125,.215,.35,.446,.526,.582],Tr=20,Nb=256,bo=new F1,Im=new Be;let wu=null,Tu=0,Ru=0,Nu=!1;const Pb=new O;class vf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=Pb}=a;wu=this._renderer.getRenderTarget(),Tu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,s),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Um(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wu,Tu,Ru),this._renderer.xr.enabled=Nu,e.scissorTest=!1,ua(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ya||e.mapping===$a?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wu=this._renderer.getRenderTarget(),Tu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:eo,format:qn,colorSpace:qa,depthBuffer:!1},r=Dm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dm(e,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Lb(a)),this._blurMaterial=Db(a,e,n)}return r}_compileMaterial(e){const n=new Ht(new Fi,e);this._renderer.compile(n,bo)}_sceneToCubeUV(e,n,i,r,a){const l=new An(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,m=p.toneMapping;p.getClearColor(Im),p.toneMapping=ur,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(r),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ht(new ro,new Dg({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,x=y.material;let u=!1;const g=e.background;g?g.isColor&&(x.color.copy(g),e.background=null,u=!0):(x.color.copy(Im),u=!0);for(let v=0;v<6;v++){const b=v%3;b===0?(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[v],a.y,a.z)):b===1?(l.up.set(0,0,c[v]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[v],a.z)):(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[v]));const T=this._cubeSize;ua(r,b*T,v>2?T:0,T,T),p.setRenderTarget(r),u&&p.render(y,l),p.render(e,l)}p.toneMapping=m,p.autoClear=h,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ya||e.mapping===$a;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Um()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zm());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=e;const l=this._cubeSize;ua(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,bo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,a=this._pingPongRenderTarget;if(this._ggxMaterial===null){const g=3*Math.max(this._cubeSize,16),v=4*this._cubeSize;this._ggxMaterial=Ib(this._lodMax,g,v)}const o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-f*f),h=.05+c*.95,m=p*h,{_lodMax:_}=this,y=this._sizeLods[i],x=3*y*(i>_-tr?i-_+tr:0),u=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=_-n,ua(a,x,u,3*y,2*y),r.setRenderTarget(a),r.render(s,bo),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=_-i,ua(e,x,u,3*y,2*y),r.setRenderTarget(e),r.render(s,bo)}_blur(e,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",a),this._halfBlur(o,e,i,i,r,"longitudinal",a)}_halfBlur(e,n,i,r,a,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Rt("blur direction must be either latitudinal or longitudinal!");const f=3,p=this._lodMeshes[r];p.material=c;const h=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*Tr-1),y=a/_,x=isFinite(a)?1+Math.floor(f*y):Tr;x>Tr&&ze(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Tr}`);const u=[];let g=0;for(let w=0;w<Tr;++w){const L=w/y,C=Math.exp(-L*L/2);u.push(C),w===0?g+=C:w<x&&(g+=2*C)}for(let w=0;w<u.length;w++)u[w]=u[w]/g;h.envMap.value=e.texture,h.samples.value=x,h.weights.value=u,h.latitudinal.value=o==="latitudinal",s&&(h.poleAxis.value=s);const{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;const b=this._sizeLods[r],T=3*b*(r>v-tr?r-v+tr:0),E=4*(this._cubeSize-b);ua(n,T,E,3*b,2*b),l.setRenderTarget(n),l.render(p,bo)}}function Lb(t){const e=[],n=[],i=[];let r=t;const a=t-tr+1+Lm.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);e.push(s);let l=1/s;o>t-tr?l=Lm[o-t+tr-1]:o===0&&(l=0),n.push(l);const c=1/(s-2),f=-c,p=1+c,h=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,_=6,y=3,x=2,u=1,g=new Float32Array(y*_*m),v=new Float32Array(x*_*m),b=new Float32Array(u*_*m);for(let E=0;E<m;E++){const w=E%3*2/3-1,L=E>2?0:-1,C=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];g.set(C,y*_*E),v.set(h,x*_*E);const M=[E,E,E,E,E,E];b.set(M,u*_*E)}const T=new Fi;T.setAttribute("position",new Qn(g,y)),T.setAttribute("uv",new Qn(v,x)),T.setAttribute("faceIndex",new Qn(b,u)),i.push(new Ht(T,null)),r>tr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Dm(t,e,n){const i=new jr(t,e,n);return i.texture.mapping=Sc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ua(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Ib(t,e,n){return new zi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Nb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Db(t,e,n){const i=new Float32Array(Tr),r=new O(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function zm(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Um(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function bc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zb(t){let e=new WeakMap,n=null;function i(s){if(s&&s.isTexture){const l=s.mapping,c=l===Ud||l===Fd,f=l===Ya||l===$a;if(c||f){let p=e.get(s);const h=p!==void 0?p.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==h)return n===null&&(n=new vf(t)),p=c?n.fromEquirectangular(s,p):n.fromCubemap(s,p),p.texture.pmremVersion=s.pmremVersion,e.set(s,p),p.texture;if(p!==void 0)return p.texture;{const m=s.image;return c&&m&&m.height>0||f&&m&&r(m)?(n===null&&(n=new vf(t)),p=c?n.fromEquirectangular(s):n.fromCubemap(s),p.texture.pmremVersion=s.pmremVersion,e.set(s,p),s.addEventListener("dispose",a),p.texture):null}}}return s}function r(s){let l=0;const c=6;for(let f=0;f<c;f++)s[f]!==void 0&&l++;return l===c}function a(s){const l=s.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Ub(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ss("WebGLRenderer: "+i+" extension not supported."),r}}}function Fb(t,e,n,i){const r={},a=new WeakMap;function o(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete r[h.id];const m=a.get(h);m&&(e.remove(m),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function s(p,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(p){const h=p.attributes;for(const m in h)e.update(h[m],t.ARRAY_BUFFER)}function c(p){const h=[],m=p.index,_=p.attributes.position;let y=0;if(m!==null){const g=m.array;y=m.version;for(let v=0,b=g.length;v<b;v+=3){const T=g[v+0],E=g[v+1],w=g[v+2];h.push(T,E,E,w,w,T)}}else if(_!==void 0){const g=_.array;y=_.version;for(let v=0,b=g.length/3-1;v<b;v+=3){const T=v+0,E=v+1,w=v+2;h.push(T,E,E,w,w,T)}}else return;const x=new(Ng(h)?Ug:zg)(h,1);x.version=y;const u=a.get(p);u&&e.remove(u),a.set(p,x)}function f(p){const h=a.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&c(p)}else c(p);return a.get(p)}return{get:s,update:l,getWireframeAttribute:f}}function Ob(t,e,n){let i;function r(h){i=h}let a,o;function s(h){a=h.type,o=h.bytesPerElement}function l(h,m){t.drawElements(i,m,a,h*o),n.update(m,i,1)}function c(h,m,_){_!==0&&(t.drawElementsInstanced(i,m,a,h*o,_),n.update(m,i,_))}function f(h,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,a,h,0,_);let x=0;for(let u=0;u<_;u++)x+=m[u];n.update(x,i,1)}function p(h,m,_,y){if(_===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let u=0;u<h.length;u++)c(h[u]/o,m[u],y[u]);else{x.multiDrawElementsInstancedWEBGL(i,m,0,a,h,0,y,0,_);let u=0;for(let g=0;g<_;g++)u+=m[g]*y[g];n.update(u,i,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function kb(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=s*(a/3);break;case t.LINES:n.lines+=s*(a/2);break;case t.LINE_STRIP:n.lines+=s*(a-1);break;case t.LINE_LOOP:n.lines+=s*a;break;case t.POINTS:n.points+=s*a;break;default:Rt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Bb(t,e,n){const i=new WeakMap,r=new ct;function a(o,s,l){const c=o.morphTargetInfluences,f=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(s);if(h===void 0||h.count!==p){let M=function(){L.dispose(),i.delete(s),s.removeEventListener("dispose",M)};var m=M;h!==void 0&&h.texture.dispose();const _=s.morphAttributes.position!==void 0,y=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,u=s.morphAttributes.position||[],g=s.morphAttributes.normal||[],v=s.morphAttributes.color||[];let b=0;_===!0&&(b=1),y===!0&&(b=2),x===!0&&(b=3);let T=s.attributes.position.count*b,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const w=new Float32Array(T*E*4*p),L=new Pg(w,T,E,p);L.type=si,L.needsUpdate=!0;const C=b*4;for(let N=0;N<p;N++){const z=u[N],B=g[N],Y=v[N],W=T*E*4*N;for(let j=0;j<z.count;j++){const J=j*C;_===!0&&(r.fromBufferAttribute(z,j),w[W+J+0]=r.x,w[W+J+1]=r.y,w[W+J+2]=r.z,w[W+J+3]=0),y===!0&&(r.fromBufferAttribute(B,j),w[W+J+4]=r.x,w[W+J+5]=r.y,w[W+J+6]=r.z,w[W+J+7]=0),x===!0&&(r.fromBufferAttribute(Y,j),w[W+J+8]=r.x,w[W+J+9]=r.y,w[W+J+10]=r.z,w[W+J+11]=Y.itemSize===4?r.w:1)}}h={count:p,texture:L,size:new He(T,E)},i.set(s,h),s.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let x=0;x<c.length;x++)_+=c[x];const y=s.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:a}}function Gb(t,e,n,i){let r=new WeakMap;function a(l){const c=i.render.frame,f=l.geometry,p=e.get(l,f);if(r.get(p)!==c&&(e.update(p),r.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return p}function o(){r=new WeakMap}function s(l){const c=l.target;c.removeEventListener("dispose",s),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:a,dispose:o}}const $g=new ln,Fm=new Hg(1,1),qg=new Pg,Kg=new l1,Zg=new kg,Om=[],km=[],Bm=new Float32Array(16),Gm=new Float32Array(9),Vm=new Float32Array(4);function ao(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let a=Om[r];if(a===void 0&&(a=new Float32Array(r),Om[r]=a),e!==0){i.toArray(a,0);for(let o=1,s=0;o!==e;++o)s+=n,t[o].toArray(a,s)}return a}function zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ac(t,e){let n=km[e];n===void 0&&(n=new Int32Array(e),km[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Vb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Hb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function jb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(zt(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function Wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function Xb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;Vm.set(i),t.uniformMatrix2fv(this.addr,!1,Vm),Ut(n,i)}}function Yb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;Gm.set(i),t.uniformMatrix3fv(this.addr,!1,Gm),Ut(n,i)}}function $b(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;Bm.set(i),t.uniformMatrix4fv(this.addr,!1,Bm),Ut(n,i)}}function qb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Kb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function Zb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function Qb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function Jb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function e2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function t2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function n2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function i2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let a;this.type===t.SAMPLER_2D_SHADOW?(Fm.compareFunction=Rg,a=Fm):a=$g,n.setTexture2D(e||a,r)}function r2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Kg,r)}function a2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Zg,r)}function o2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||qg,r)}function s2(t){switch(t){case 5126:return Vb;case 35664:return Hb;case 35665:return jb;case 35666:return Wb;case 35674:return Xb;case 35675:return Yb;case 35676:return $b;case 5124:case 35670:return qb;case 35667:case 35671:return Kb;case 35668:case 35672:return Zb;case 35669:case 35673:return Qb;case 5125:return Jb;case 36294:return e2;case 36295:return t2;case 36296:return n2;case 35678:case 36198:case 36298:case 36306:case 35682:return i2;case 35679:case 36299:case 36307:return r2;case 35680:case 36300:case 36308:case 36293:return a2;case 36289:case 36303:case 36311:case 36292:return o2}}function l2(t,e){t.uniform1fv(this.addr,e)}function c2(t,e){const n=ao(e,this.size,2);t.uniform2fv(this.addr,n)}function u2(t,e){const n=ao(e,this.size,3);t.uniform3fv(this.addr,n)}function d2(t,e){const n=ao(e,this.size,4);t.uniform4fv(this.addr,n)}function f2(t,e){const n=ao(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function h2(t,e){const n=ao(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function p2(t,e){const n=ao(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function m2(t,e){t.uniform1iv(this.addr,e)}function x2(t,e){t.uniform2iv(this.addr,e)}function g2(t,e){t.uniform3iv(this.addr,e)}function v2(t,e){t.uniform4iv(this.addr,e)}function _2(t,e){t.uniform1uiv(this.addr,e)}function y2(t,e){t.uniform2uiv(this.addr,e)}function S2(t,e){t.uniform3uiv(this.addr,e)}function M2(t,e){t.uniform4uiv(this.addr,e)}function b2(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||$g,a[o])}function A2(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Kg,a[o])}function E2(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Zg,a[o])}function C2(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||qg,a[o])}function w2(t){switch(t){case 5126:return l2;case 35664:return c2;case 35665:return u2;case 35666:return d2;case 35674:return f2;case 35675:return h2;case 35676:return p2;case 5124:case 35670:return m2;case 35667:case 35671:return x2;case 35668:case 35672:return g2;case 35669:case 35673:return v2;case 5125:return _2;case 36294:return y2;case 36295:return S2;case 36296:return M2;case 35678:case 36198:case 36298:case 36306:case 35682:return b2;case 35679:case 36299:case 36307:return A2;case 35680:case 36300:case 36308:case 36293:return E2;case 36289:case 36303:case 36311:case 36292:return C2}}class T2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=s2(n.type)}}class R2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=w2(n.type)}}class N2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(e,n[s.id],i)}}}const Pu=/(\w+)(\])?(\[|\.)?/g;function Hm(t,e){t.seq.push(e),t.map[e.id]=e}function P2(t,e,n){const i=t.name,r=i.length;for(Pu.lastIndex=0;;){const a=Pu.exec(i),o=Pu.lastIndex;let s=a[1];const l=a[2]==="]",c=a[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===r){Hm(n,c===void 0?new T2(s,t,e):new R2(s,t,e));break}else{let p=n.map[s];p===void 0&&(p=new N2(s),Hm(n,p)),n=p}}}class wl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(n,r),o=e.getUniformLocation(n,a.name);P2(a,o,this)}}setValue(e,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function jm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const L2=37297;let I2=0;function D2(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===e?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const Wm=new Oe;function z2(t){it._getMatrix(Wm,it.workingColorSpace,t);const e=`mat3( ${Wm.elements.map(n=>n.toFixed(4))} )`;switch(it.getTransfer(t)){case ec:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Xm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),a=(t.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+D2(t.getShaderSource(e),s)}else return a}function U2(t,e){const n=z2(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function F2(t,e){let n;switch(e){case MS:n="Linear";break;case bS:n="Reinhard";break;case AS:n="Cineon";break;case Sg:n="ACESFilmic";break;case CS:n="AgX";break;case wS:n="Neutral";break;case ES:n="Custom";break;default:ze("WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ol=new O;function O2(){it.getLuminanceCoefficients(ol);const t=ol.x.toFixed(4),e=ol.y.toFixed(4),n=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k2(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(To).join(`
`)}function B2(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function G2(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=t.getActiveAttrib(e,r),o=a.name;let s=1;a.type===t.FLOAT_MAT2&&(s=2),a.type===t.FLOAT_MAT3&&(s=3),a.type===t.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:t.getAttribLocation(e,o),locationSize:s}}return n}function To(t){return t!==""}function Ym(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $m(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const V2=/^[ \t]*#include +<([\w\d./]+)>/gm;function _f(t){return t.replace(V2,j2)}const H2=new Map;function j2(t,e){let n=Fe[e];if(n===void 0){const i=H2.get(e);if(i!==void 0)n=Fe[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _f(n)}const W2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qm(t){return t.replace(W2,X2)}function X2(t,e,n,i){let r="";for(let a=parseInt(e);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Km(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Y2(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===yg?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===tS?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function $2(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ya:case $a:e="ENVMAP_TYPE_CUBE";break;case Sc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function q2(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case $a:e="ENVMAP_MODE_REFRACTION";break}return e}function K2(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case vh:e="ENVMAP_BLENDING_MULTIPLY";break;case yS:e="ENVMAP_BLENDING_MIX";break;case SS:e="ENVMAP_BLENDING_ADD";break}return e}function Z2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Q2(t,e,n,i){const r=t.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const l=Y2(n),c=$2(n),f=q2(n),p=K2(n),h=Z2(n),m=k2(n),_=B2(a),y=r.createProgram();let x,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(To).join(`
`),x.length>0&&(x+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(To).join(`
`),u.length>0&&(u+=`
`)):(x=[Km(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(To).join(`
`),u=[Km(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ur?"#define TONE_MAPPING":"",n.toneMapping!==ur?Fe.tonemapping_pars_fragment:"",n.toneMapping!==ur?F2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,U2("linearToOutputTexel",n.outputColorSpace),O2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(To).join(`
`)),o=_f(o),o=Ym(o,n),o=$m(o,n),s=_f(s),s=Ym(s,n),s=$m(s,n),o=qm(o),s=qm(s),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,u=["#define varying in",n.glslVersion===im?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===im?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const v=g+x+o,b=g+u+s,T=jm(r,r.VERTEX_SHADER,v),E=jm(r,r.FRAGMENT_SHADER,b);r.attachShader(y,T),r.attachShader(y,E),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function w(N){if(t.debug.checkShaderErrors){const z=r.getProgramInfoLog(y)||"",B=r.getShaderInfoLog(T)||"",Y=r.getShaderInfoLog(E)||"",W=z.trim(),j=B.trim(),J=Y.trim();let I=!0,H=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,T,E);else{const $=Xm(r,T,"vertex"),ae=Xm(r,E,"fragment");Rt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+W+`
`+$+`
`+ae)}else W!==""?ze("WebGLProgram: Program Info Log:",W):(j===""||J==="")&&(H=!1);H&&(N.diagnostics={runnable:I,programLog:W,vertexShader:{log:j,prefix:x},fragmentShader:{log:J,prefix:u}})}r.deleteShader(T),r.deleteShader(E),L=new wl(r,y),C=G2(r,y)}let L;this.getUniforms=function(){return L===void 0&&w(this),L};let C;this.getAttributes=function(){return C===void 0&&w(this),C};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(y,L2)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=I2++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=E,this}let J2=0;class eA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new tA(e),n.set(e,i)),i}}class tA{constructor(e){this.id=J2++,this.code=e,this.usedTimes=0}}function nA(t,e,n,i,r,a,o){const s=new Nh,l=new eA,c=new Set,f=[],p=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(C){return c.add(C),C===0?"uv":`uv${C}`}function x(C,M,N,z,B){const Y=z.fog,W=B.geometry,j=C.isMeshStandardMaterial?z.environment:null,J=(C.isMeshStandardMaterial?n:e).get(C.envMap||j),I=J&&J.mapping===Sc?J.image.height:null,H=_[C.type];C.precision!==null&&(m=r.getMaxPrecision(C.precision),m!==C.precision&&ze("WebGLProgram.getParameters:",C.precision,"not supported, using",m,"instead."));const $=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=$!==void 0?$.length:0;let Me=0;W.morphAttributes.position!==void 0&&(Me=1),W.morphAttributes.normal!==void 0&&(Me=2),W.morphAttributes.color!==void 0&&(Me=3);let Je,Qe,rt,q;if(H){const ot=ai[H];Je=ot.vertexShader,Qe=ot.fragmentShader}else Je=C.vertexShader,Qe=C.fragmentShader,l.update(C),rt=l.getVertexShaderID(C),q=l.getFragmentShaderID(C);const Q=t.getRenderTarget(),xe=t.state.buffers.depth.getReversed(),Ue=B.isInstancedMesh===!0,be=B.isBatchedMesh===!0,We=!!C.map,Bt=!!C.matcap,Ge=!!J,gt=!!C.aoMap,P=!!C.lightMap,Xe=!!C.bumpMap,Ye=!!C.normalMap,dt=!!C.displacementMap,_e=!!C.emissiveMap,_t=!!C.metalnessMap,Ee=!!C.roughnessMap,De=C.anisotropy>0,R=C.clearcoat>0,S=C.dispersion>0,k=C.iridescence>0,K=C.sheen>0,ee=C.transmission>0,X=De&&!!C.anisotropyMap,Se=R&&!!C.clearcoatMap,ue=R&&!!C.clearcoatNormalMap,Ce=R&&!!C.clearcoatRoughnessMap,ye=k&&!!C.iridescenceMap,te=k&&!!C.iridescenceThicknessMap,oe=K&&!!C.sheenColorMap,Ne=K&&!!C.sheenRoughnessMap,Te=!!C.specularMap,he=!!C.specularColorMap,Le=!!C.specularIntensityMap,D=ee&&!!C.transmissionMap,de=ee&&!!C.thicknessMap,se=!!C.gradientMap,le=!!C.alphaMap,ie=C.alphaTest>0,Z=!!C.alphaHash,ge=!!C.extensions;let Ie=ur;C.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ie=t.toneMapping);const pt={shaderID:H,shaderType:C.type,shaderName:C.name,vertexShader:Je,fragmentShader:Qe,defines:C.defines,customVertexShaderID:rt,customFragmentShaderID:q,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:m,batching:be,batchingColor:be&&B._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&B.instanceColor!==null,instancingMorph:Ue&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Q===null?t.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:qa,alphaToCoverage:!!C.alphaToCoverage,map:We,matcap:Bt,envMap:Ge,envMapMode:Ge&&J.mapping,envMapCubeUVHeight:I,aoMap:gt,lightMap:P,bumpMap:Xe,normalMap:Ye,displacementMap:h&&dt,emissiveMap:_e,normalMapObjectSpace:Ye&&C.normalMapType===PS,normalMapTangentSpace:Ye&&C.normalMapType===wh,metalnessMap:_t,roughnessMap:Ee,anisotropy:De,anisotropyMap:X,clearcoat:R,clearcoatMap:Se,clearcoatNormalMap:ue,clearcoatRoughnessMap:Ce,dispersion:S,iridescence:k,iridescenceMap:ye,iridescenceThicknessMap:te,sheen:K,sheenColorMap:oe,sheenRoughnessMap:Ne,specularMap:Te,specularColorMap:he,specularIntensityMap:Le,transmission:ee,transmissionMap:D,thicknessMap:de,gradientMap:se,opaque:C.transparent===!1&&C.blending===Ia&&C.alphaToCoverage===!1,alphaMap:le,alphaTest:ie,alphaHash:Z,combine:C.combine,mapUv:We&&y(C.map.channel),aoMapUv:gt&&y(C.aoMap.channel),lightMapUv:P&&y(C.lightMap.channel),bumpMapUv:Xe&&y(C.bumpMap.channel),normalMapUv:Ye&&y(C.normalMap.channel),displacementMapUv:dt&&y(C.displacementMap.channel),emissiveMapUv:_e&&y(C.emissiveMap.channel),metalnessMapUv:_t&&y(C.metalnessMap.channel),roughnessMapUv:Ee&&y(C.roughnessMap.channel),anisotropyMapUv:X&&y(C.anisotropyMap.channel),clearcoatMapUv:Se&&y(C.clearcoatMap.channel),clearcoatNormalMapUv:ue&&y(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&y(C.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&y(C.iridescenceMap.channel),iridescenceThicknessMapUv:te&&y(C.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&y(C.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&y(C.sheenRoughnessMap.channel),specularMapUv:Te&&y(C.specularMap.channel),specularColorMapUv:he&&y(C.specularColorMap.channel),specularIntensityMapUv:Le&&y(C.specularIntensityMap.channel),transmissionMapUv:D&&y(C.transmissionMap.channel),thicknessMapUv:de&&y(C.thicknessMap.channel),alphaMapUv:le&&y(C.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Ye||De),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(We||le),fog:!!Y,useFog:C.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:xe,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Me,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:C.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ie,decodeVideoTexture:We&&C.map.isVideoTexture===!0&&it.getTransfer(C.map.colorSpace)===lt,decodeVideoTextureEmissive:_e&&C.emissiveMap.isVideoTexture===!0&&it.getTransfer(C.emissiveMap.colorSpace)===lt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Ai,flipSided:C.side===sn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:ge&&C.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&C.extensions.multiDraw===!0||be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function u(C){const M=[];if(C.shaderID?M.push(C.shaderID):(M.push(C.customVertexShaderID),M.push(C.customFragmentShaderID)),C.defines!==void 0)for(const N in C.defines)M.push(N),M.push(C.defines[N]);return C.isRawShaderMaterial===!1&&(g(M,C),v(M,C),M.push(t.outputColorSpace)),M.push(C.customProgramCacheKey),M.join()}function g(C,M){C.push(M.precision),C.push(M.outputColorSpace),C.push(M.envMapMode),C.push(M.envMapCubeUVHeight),C.push(M.mapUv),C.push(M.alphaMapUv),C.push(M.lightMapUv),C.push(M.aoMapUv),C.push(M.bumpMapUv),C.push(M.normalMapUv),C.push(M.displacementMapUv),C.push(M.emissiveMapUv),C.push(M.metalnessMapUv),C.push(M.roughnessMapUv),C.push(M.anisotropyMapUv),C.push(M.clearcoatMapUv),C.push(M.clearcoatNormalMapUv),C.push(M.clearcoatRoughnessMapUv),C.push(M.iridescenceMapUv),C.push(M.iridescenceThicknessMapUv),C.push(M.sheenColorMapUv),C.push(M.sheenRoughnessMapUv),C.push(M.specularMapUv),C.push(M.specularColorMapUv),C.push(M.specularIntensityMapUv),C.push(M.transmissionMapUv),C.push(M.thicknessMapUv),C.push(M.combine),C.push(M.fogExp2),C.push(M.sizeAttenuation),C.push(M.morphTargetsCount),C.push(M.morphAttributeCount),C.push(M.numDirLights),C.push(M.numPointLights),C.push(M.numSpotLights),C.push(M.numSpotLightMaps),C.push(M.numHemiLights),C.push(M.numRectAreaLights),C.push(M.numDirLightShadows),C.push(M.numPointLightShadows),C.push(M.numSpotLightShadows),C.push(M.numSpotLightShadowsWithMaps),C.push(M.numLightProbes),C.push(M.shadowMapType),C.push(M.toneMapping),C.push(M.numClippingPlanes),C.push(M.numClipIntersection),C.push(M.depthPacking)}function v(C,M){s.disableAll(),M.supportsVertexTextures&&s.enable(0),M.instancing&&s.enable(1),M.instancingColor&&s.enable(2),M.instancingMorph&&s.enable(3),M.matcap&&s.enable(4),M.envMap&&s.enable(5),M.normalMapObjectSpace&&s.enable(6),M.normalMapTangentSpace&&s.enable(7),M.clearcoat&&s.enable(8),M.iridescence&&s.enable(9),M.alphaTest&&s.enable(10),M.vertexColors&&s.enable(11),M.vertexAlphas&&s.enable(12),M.vertexUv1s&&s.enable(13),M.vertexUv2s&&s.enable(14),M.vertexUv3s&&s.enable(15),M.vertexTangents&&s.enable(16),M.anisotropy&&s.enable(17),M.alphaHash&&s.enable(18),M.batching&&s.enable(19),M.dispersion&&s.enable(20),M.batchingColor&&s.enable(21),M.gradientMap&&s.enable(22),C.push(s.mask),s.disableAll(),M.fog&&s.enable(0),M.useFog&&s.enable(1),M.flatShading&&s.enable(2),M.logarithmicDepthBuffer&&s.enable(3),M.reversedDepthBuffer&&s.enable(4),M.skinning&&s.enable(5),M.morphTargets&&s.enable(6),M.morphNormals&&s.enable(7),M.morphColors&&s.enable(8),M.premultipliedAlpha&&s.enable(9),M.shadowMapEnabled&&s.enable(10),M.doubleSided&&s.enable(11),M.flipSided&&s.enable(12),M.useDepthPacking&&s.enable(13),M.dithering&&s.enable(14),M.transmission&&s.enable(15),M.sheen&&s.enable(16),M.opaque&&s.enable(17),M.pointsUvs&&s.enable(18),M.decodeVideoTexture&&s.enable(19),M.decodeVideoTextureEmissive&&s.enable(20),M.alphaToCoverage&&s.enable(21),C.push(s.mask)}function b(C){const M=_[C.type];let N;if(M){const z=ai[M];N=S1.clone(z.uniforms)}else N=C.uniforms;return N}function T(C,M){let N;for(let z=0,B=f.length;z<B;z++){const Y=f[z];if(Y.cacheKey===M){N=Y,++N.usedTimes;break}}return N===void 0&&(N=new Q2(t,M,C,a),f.push(N)),N}function E(C){if(--C.usedTimes===0){const M=f.indexOf(C);f[M]=f[f.length-1],f.pop(),C.destroy()}}function w(C){l.remove(C)}function L(){l.dispose()}return{getParameters:x,getProgramCacheKey:u,getUniforms:b,acquireProgram:T,releaseProgram:E,releaseShaderCache:w,programs:f,dispose:L}}function iA(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let s=t.get(o);return s===void 0&&(s={},t.set(o,s)),s}function i(o){t.delete(o)}function r(o,s,l){t.get(o)[s]=l}function a(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:a}}function rA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Zm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Qm(){const t=[];let e=0;const n=[],i=[],r=[];function a(){e=0,n.length=0,i.length=0,r.length=0}function o(p,h,m,_,y,x){let u=t[e];return u===void 0?(u={id:p.id,object:p,geometry:h,material:m,groupOrder:_,renderOrder:p.renderOrder,z:y,group:x},t[e]=u):(u.id=p.id,u.object=p,u.geometry=h,u.material=m,u.groupOrder=_,u.renderOrder=p.renderOrder,u.z=y,u.group=x),e++,u}function s(p,h,m,_,y,x){const u=o(p,h,m,_,y,x);m.transmission>0?i.push(u):m.transparent===!0?r.push(u):n.push(u)}function l(p,h,m,_,y,x){const u=o(p,h,m,_,y,x);m.transmission>0?i.unshift(u):m.transparent===!0?r.unshift(u):n.unshift(u)}function c(p,h){n.length>1&&n.sort(p||rA),i.length>1&&i.sort(h||Zm),r.length>1&&r.sort(h||Zm)}function f(){for(let p=e,h=t.length;p<h;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:s,unshift:l,finish:f,sort:c}}function aA(){let t=new WeakMap;function e(i,r){const a=t.get(i);let o;return a===void 0?(o=new Qm,t.set(i,[o])):r>=a.length?(o=new Qm,a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function oA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Be};break;case"SpotLight":n={position:new O,direction:new O,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function sA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let lA=0;function cA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function uA(t){const e=new oA,n=sA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,a=new ht,o=new ht;function s(c){let f=0,p=0,h=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let m=0,_=0,y=0,x=0,u=0,g=0,v=0,b=0,T=0,E=0,w=0;c.sort(cA);for(let C=0,M=c.length;C<M;C++){const N=c[C],z=N.color,B=N.intensity,Y=N.distance,W=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=z.r*B,p+=z.g*B,h+=z.b*B;else if(N.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(N.sh.coefficients[j],B);w++}else if(N.isDirectionalLight){const j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const J=N.shadow,I=n.get(N);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,i.directionalShadow[m]=I,i.directionalShadowMap[m]=W,i.directionalShadowMatrix[m]=N.shadow.matrix,g++}i.directional[m]=j,m++}else if(N.isSpotLight){const j=e.get(N);j.position.setFromMatrixPosition(N.matrixWorld),j.color.copy(z).multiplyScalar(B),j.distance=Y,j.coneCos=Math.cos(N.angle),j.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),j.decay=N.decay,i.spot[y]=j;const J=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,J.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[y]=J.matrix,N.castShadow){const I=n.get(N);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,i.spotShadow[y]=I,i.spotShadowMap[y]=W,b++}y++}else if(N.isRectAreaLight){const j=e.get(N);j.color.copy(z).multiplyScalar(B),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),i.rectArea[x]=j,x++}else if(N.isPointLight){const j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),j.distance=N.distance,j.decay=N.decay,N.castShadow){const J=N.shadow,I=n.get(N);I.shadowIntensity=J.intensity,I.shadowBias=J.bias,I.shadowNormalBias=J.normalBias,I.shadowRadius=J.radius,I.shadowMapSize=J.mapSize,I.shadowCameraNear=J.camera.near,I.shadowCameraFar=J.camera.far,i.pointShadow[_]=I,i.pointShadowMap[_]=W,i.pointShadowMatrix[_]=N.shadow.matrix,v++}i.point[_]=j,_++}else if(N.isHemisphereLight){const j=e.get(N);j.skyColor.copy(N.color).multiplyScalar(B),j.groundColor.copy(N.groundColor).multiplyScalar(B),i.hemi[u]=j,u++}}x>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==m||L.pointLength!==_||L.spotLength!==y||L.rectAreaLength!==x||L.hemiLength!==u||L.numDirectionalShadows!==g||L.numPointShadows!==v||L.numSpotShadows!==b||L.numSpotMaps!==T||L.numLightProbes!==w)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=x,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=b+T-E,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=w,L.directionalLength=m,L.pointLength=_,L.spotLength=y,L.rectAreaLength=x,L.hemiLength=u,L.numDirectionalShadows=g,L.numPointShadows=v,L.numSpotShadows=b,L.numSpotMaps=T,L.numLightProbes=w,i.version=lA++)}function l(c,f){let p=0,h=0,m=0,_=0,y=0;const x=f.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){const v=c[u];if(v.isDirectionalLight){const b=i.directional[p];b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(x),p++}else if(v.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(x),b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(x),m++}else if(v.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(x),o.identity(),a.copy(v.matrixWorld),a.premultiply(x),o.extractRotation(a),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(x),h++}else if(v.isHemisphereLight){const b=i.hemi[y];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(x),y++}}}return{setup:s,setupView:l,state:i}}function Jm(t){const e=new uA(t),n=[],i=[];function r(f){c.camera=f,n.length=0,i.length=0}function a(f){n.push(f)}function o(f){i.push(f)}function s(){e.setup(n)}function l(f){e.setupView(n,f)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:s,setupLightsView:l,pushLight:a,pushShadow:o}}function dA(t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let s;return o===void 0?(s=new Jm(t),e.set(r,[s])):a>=o.length?(s=new Jm(t),o.push(s)):s=o[a],s}function i(){e=new WeakMap}return{get:n,dispose:i}}const fA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pA(t,e,n){let i=new Ph;const r=new He,a=new He,o=new ct,s=new I1({depthPacking:NS}),l=new D1,c={},f=n.maxTextureSize,p={[hr]:sn,[sn]:hr,[Ai]:Ai},h=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:fA,fragmentShader:hA}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new Fi;_.setAttribute("position",new Qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ht(_,h),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yg;let u=this.type;this.render=function(E,w,L){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;const C=t.getRenderTarget(),M=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),z=t.state;z.setBlending(Ri),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const B=u!==yi&&this.type===yi,Y=u===yi&&this.type!==yi;for(let W=0,j=E.length;W<j;W++){const J=E[W],I=J.shadow;if(I===void 0){ze("WebGLShadowMap:",J,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const H=I.getFrameExtents();if(r.multiply(H),a.copy(I.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(a.x=Math.floor(f/H.x),r.x=a.x*H.x,I.mapSize.x=a.x),r.y>f&&(a.y=Math.floor(f/H.y),r.y=a.y*H.y,I.mapSize.y=a.y)),I.map===null||B===!0||Y===!0){const ae=this.type!==yi?{minFilter:wn,magFilter:wn}:{};I.map!==null&&I.map.dispose(),I.map=new jr(r.x,r.y,ae),I.map.texture.name=J.name+".shadowMap",I.camera.updateProjectionMatrix()}t.setRenderTarget(I.map),t.clear();const $=I.getViewportCount();for(let ae=0;ae<$;ae++){const Me=I.getViewport(ae);o.set(a.x*Me.x,a.y*Me.y,a.x*Me.z,a.y*Me.w),z.viewport(o),I.updateMatrices(J,ae),i=I.getFrustum(),b(w,L,I.camera,J,this.type)}I.isPointLightShadow!==!0&&this.type===yi&&g(I,L),I.needsUpdate=!1}u=this.type,x.needsUpdate=!1,t.setRenderTarget(C,M,N)};function g(E,w){const L=e.update(y);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new jr(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,t.setRenderTarget(E.mapPass),t.clear(),t.renderBufferDirect(w,null,L,h,y,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,t.setRenderTarget(E.map),t.clear(),t.renderBufferDirect(w,null,L,m,y,null)}function v(E,w,L,C){let M=null;const N=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)M=N;else if(M=L.isPointLight===!0?l:s,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const z=M.uuid,B=w.uuid;let Y=c[z];Y===void 0&&(Y={},c[z]=Y);let W=Y[B];W===void 0&&(W=M.clone(),Y[B]=W,w.addEventListener("dispose",T)),M=W}if(M.visible=w.visible,M.wireframe=w.wireframe,C===yi?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:p[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=t.properties.get(M);z.light=L}return M}function b(E,w,L,C,M){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===yi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const B=e.update(E),Y=E.material;if(Array.isArray(Y)){const W=B.groups;for(let j=0,J=W.length;j<J;j++){const I=W[j],H=Y[I.materialIndex];if(H&&H.visible){const $=v(E,H,C,M);E.onBeforeShadow(t,E,w,L,B,$,I),t.renderBufferDirect(L,null,B,$,E,I),E.onAfterShadow(t,E,w,L,B,$,I)}}}else if(Y.visible){const W=v(E,Y,C,M);E.onBeforeShadow(t,E,w,L,B,W,null),t.renderBufferDirect(L,null,B,W,E,null),E.onAfterShadow(t,E,w,L,B,W,null)}}const z=E.children;for(let B=0,Y=z.length;B<Y;B++)b(z[B],w,L,C,M)}function T(E){E.target.removeEventListener("dispose",T);for(const L in c){const C=c[L],M=E.target.uuid;M in C&&(C[M].dispose(),delete C[M])}}}const mA={[Rd]:Nd,[Pd]:Dd,[Ld]:zd,[Xa]:Id,[Nd]:Rd,[Dd]:Pd,[zd]:Ld,[Id]:Xa};function xA(t,e){function n(){let D=!1;const de=new ct;let se=null;const le=new ct(0,0,0,0);return{setMask:function(ie){se!==ie&&!D&&(t.colorMask(ie,ie,ie,ie),se=ie)},setLocked:function(ie){D=ie},setClear:function(ie,Z,ge,Ie,pt){pt===!0&&(ie*=Ie,Z*=Ie,ge*=Ie),de.set(ie,Z,ge,Ie),le.equals(de)===!1&&(t.clearColor(ie,Z,ge,Ie),le.copy(de))},reset:function(){D=!1,se=null,le.set(-1,0,0,0)}}}function i(){let D=!1,de=!1,se=null,le=null,ie=null;return{setReversed:function(Z){if(de!==Z){const ge=e.get("EXT_clip_control");Z?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),de=Z;const Ie=ie;ie=null,this.setClear(Ie)}},getReversed:function(){return de},setTest:function(Z){Z?Q(t.DEPTH_TEST):xe(t.DEPTH_TEST)},setMask:function(Z){se!==Z&&!D&&(t.depthMask(Z),se=Z)},setFunc:function(Z){if(de&&(Z=mA[Z]),le!==Z){switch(Z){case Rd:t.depthFunc(t.NEVER);break;case Nd:t.depthFunc(t.ALWAYS);break;case Pd:t.depthFunc(t.LESS);break;case Xa:t.depthFunc(t.LEQUAL);break;case Ld:t.depthFunc(t.EQUAL);break;case Id:t.depthFunc(t.GEQUAL);break;case Dd:t.depthFunc(t.GREATER);break;case zd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}le=Z}},setLocked:function(Z){D=Z},setClear:function(Z){ie!==Z&&(de&&(Z=1-Z),t.clearDepth(Z),ie=Z)},reset:function(){D=!1,se=null,le=null,ie=null,de=!1}}}function r(){let D=!1,de=null,se=null,le=null,ie=null,Z=null,ge=null,Ie=null,pt=null;return{setTest:function(ot){D||(ot?Q(t.STENCIL_TEST):xe(t.STENCIL_TEST))},setMask:function(ot){de!==ot&&!D&&(t.stencilMask(ot),de=ot)},setFunc:function(ot,ni,Bn){(se!==ot||le!==ni||ie!==Bn)&&(t.stencilFunc(ot,ni,Bn),se=ot,le=ni,ie=Bn)},setOp:function(ot,ni,Bn){(Z!==ot||ge!==ni||Ie!==Bn)&&(t.stencilOp(ot,ni,Bn),Z=ot,ge=ni,Ie=Bn)},setLocked:function(ot){D=ot},setClear:function(ot){pt!==ot&&(t.clearStencil(ot),pt=ot)},reset:function(){D=!1,de=null,se=null,le=null,ie=null,Z=null,ge=null,Ie=null,pt=null}}}const a=new n,o=new i,s=new r,l=new WeakMap,c=new WeakMap;let f={},p={},h=new WeakMap,m=[],_=null,y=!1,x=null,u=null,g=null,v=null,b=null,T=null,E=null,w=new Be(0,0,0),L=0,C=!1,M=null,N=null,z=null,B=null,Y=null;const W=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,J=0;const I=t.getParameter(t.VERSION);I.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(I)[1]),j=J>=1):I.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),j=J>=2);let H=null,$={};const ae=t.getParameter(t.SCISSOR_BOX),Me=t.getParameter(t.VIEWPORT),Je=new ct().fromArray(ae),Qe=new ct().fromArray(Me);function rt(D,de,se,le){const ie=new Uint8Array(4),Z=t.createTexture();t.bindTexture(D,Z),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ge=0;ge<se;ge++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,le,0,t.RGBA,t.UNSIGNED_BYTE,ie):t.texImage2D(de+ge,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ie);return Z}const q={};q[t.TEXTURE_2D]=rt(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=rt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=rt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=rt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),Q(t.DEPTH_TEST),o.setFunc(Xa),Xe(!1),Ye(Zp),Q(t.CULL_FACE),gt(Ri);function Q(D){f[D]!==!0&&(t.enable(D),f[D]=!0)}function xe(D){f[D]!==!1&&(t.disable(D),f[D]=!1)}function Ue(D,de){return p[D]!==de?(t.bindFramebuffer(D,de),p[D]=de,D===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=de),D===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=de),!0):!1}function be(D,de){let se=m,le=!1;if(D){se=h.get(de),se===void 0&&(se=[],h.set(de,se));const ie=D.textures;if(se.length!==ie.length||se[0]!==t.COLOR_ATTACHMENT0){for(let Z=0,ge=ie.length;Z<ge;Z++)se[Z]=t.COLOR_ATTACHMENT0+Z;se.length=ie.length,le=!0}}else se[0]!==t.BACK&&(se[0]=t.BACK,le=!0);le&&t.drawBuffers(se)}function We(D){return _!==D?(t.useProgram(D),_=D,!0):!1}const Bt={[wr]:t.FUNC_ADD,[iS]:t.FUNC_SUBTRACT,[rS]:t.FUNC_REVERSE_SUBTRACT};Bt[aS]=t.MIN,Bt[oS]=t.MAX;const Ge={[sS]:t.ZERO,[lS]:t.ONE,[cS]:t.SRC_COLOR,[wd]:t.SRC_ALPHA,[mS]:t.SRC_ALPHA_SATURATE,[hS]:t.DST_COLOR,[dS]:t.DST_ALPHA,[uS]:t.ONE_MINUS_SRC_COLOR,[Td]:t.ONE_MINUS_SRC_ALPHA,[pS]:t.ONE_MINUS_DST_COLOR,[fS]:t.ONE_MINUS_DST_ALPHA,[xS]:t.CONSTANT_COLOR,[gS]:t.ONE_MINUS_CONSTANT_COLOR,[vS]:t.CONSTANT_ALPHA,[_S]:t.ONE_MINUS_CONSTANT_ALPHA};function gt(D,de,se,le,ie,Z,ge,Ie,pt,ot){if(D===Ri){y===!0&&(xe(t.BLEND),y=!1);return}if(y===!1&&(Q(t.BLEND),y=!0),D!==nS){if(D!==x||ot!==C){if((u!==wr||b!==wr)&&(t.blendEquation(t.FUNC_ADD),u=wr,b=wr),ot)switch(D){case Ia:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Qp:t.blendFunc(t.ONE,t.ONE);break;case Jp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case em:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Rt("WebGLState: Invalid blending: ",D);break}else switch(D){case Ia:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Qp:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Jp:Rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case em:Rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Rt("WebGLState: Invalid blending: ",D);break}g=null,v=null,T=null,E=null,w.set(0,0,0),L=0,x=D,C=ot}return}ie=ie||de,Z=Z||se,ge=ge||le,(de!==u||ie!==b)&&(t.blendEquationSeparate(Bt[de],Bt[ie]),u=de,b=ie),(se!==g||le!==v||Z!==T||ge!==E)&&(t.blendFuncSeparate(Ge[se],Ge[le],Ge[Z],Ge[ge]),g=se,v=le,T=Z,E=ge),(Ie.equals(w)===!1||pt!==L)&&(t.blendColor(Ie.r,Ie.g,Ie.b,pt),w.copy(Ie),L=pt),x=D,C=!1}function P(D,de){D.side===Ai?xe(t.CULL_FACE):Q(t.CULL_FACE);let se=D.side===sn;de&&(se=!se),Xe(se),D.blending===Ia&&D.transparent===!1?gt(Ri):gt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),a.setMask(D.colorWrite);const le=D.stencilWrite;s.setTest(le),le&&(s.setMask(D.stencilWriteMask),s.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),s.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Q(t.SAMPLE_ALPHA_TO_COVERAGE):xe(t.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(D){M!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),M=D)}function Ye(D){D!==Jy?(Q(t.CULL_FACE),D!==N&&(D===Zp?t.cullFace(t.BACK):D===eS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):xe(t.CULL_FACE),N=D}function dt(D){D!==z&&(j&&t.lineWidth(D),z=D)}function _e(D,de,se){D?(Q(t.POLYGON_OFFSET_FILL),(B!==de||Y!==se)&&(t.polygonOffset(de,se),B=de,Y=se)):xe(t.POLYGON_OFFSET_FILL)}function _t(D){D?Q(t.SCISSOR_TEST):xe(t.SCISSOR_TEST)}function Ee(D){D===void 0&&(D=t.TEXTURE0+W-1),H!==D&&(t.activeTexture(D),H=D)}function De(D,de,se){se===void 0&&(H===null?se=t.TEXTURE0+W-1:se=H);let le=$[se];le===void 0&&(le={type:void 0,texture:void 0},$[se]=le),(le.type!==D||le.texture!==de)&&(H!==se&&(t.activeTexture(se),H=se),t.bindTexture(D,de||q[D]),le.type=D,le.texture=de)}function R(){const D=$[H];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function S(){try{t.compressedTexImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function k(){try{t.compressedTexImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function K(){try{t.texSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function ee(){try{t.texSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function X(){try{t.compressedTexSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Se(){try{t.compressedTexSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ue(){try{t.texStorage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Ce(){try{t.texStorage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ye(){try{t.texImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function te(){try{t.texImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function oe(D){Je.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),Je.copy(D))}function Ne(D){Qe.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),Qe.copy(D))}function Te(D,de){let se=c.get(de);se===void 0&&(se=new WeakMap,c.set(de,se));let le=se.get(D);le===void 0&&(le=t.getUniformBlockIndex(de,D.name),se.set(D,le))}function he(D,de){const le=c.get(de).get(D);l.get(de)!==le&&(t.uniformBlockBinding(de,le,D.__bindingPointIndex),l.set(de,le))}function Le(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),f={},H=null,$={},p={},h=new WeakMap,m=[],_=null,y=!1,x=null,u=null,g=null,v=null,b=null,T=null,E=null,w=new Be(0,0,0),L=0,C=!1,M=null,N=null,z=null,B=null,Y=null,Je.set(0,0,t.canvas.width,t.canvas.height),Qe.set(0,0,t.canvas.width,t.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:Q,disable:xe,bindFramebuffer:Ue,drawBuffers:be,useProgram:We,setBlending:gt,setMaterial:P,setFlipSided:Xe,setCullFace:Ye,setLineWidth:dt,setPolygonOffset:_e,setScissorTest:_t,activeTexture:Ee,bindTexture:De,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:k,texImage2D:ye,texImage3D:te,updateUBOMapping:Te,uniformBlockBinding:he,texStorage2D:ue,texStorage3D:Ce,texSubImage2D:K,texSubImage3D:ee,compressedTexSubImage2D:X,compressedTexSubImage3D:Se,scissor:oe,viewport:Ne,reset:Le}}function gA(t,e,n,i,r,a,o){const s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,f=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return m?new OffscreenCanvas(R,S):nc("canvas")}function y(R,S,k){let K=1;const ee=De(R);if((ee.width>k||ee.height>k)&&(K=k/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const X=Math.floor(K*ee.width),Se=Math.floor(K*ee.height);p===void 0&&(p=_(X,Se));const ue=S?_(X,Se):p;return ue.width=X,ue.height=Se,ue.getContext("2d").drawImage(R,0,0,X,Se),ze("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+X+"x"+Se+")."),ue}else return"data"in R&&ze("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function x(R){return R.generateMipmaps}function u(R){t.generateMipmap(R)}function g(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function v(R,S,k,K,ee=!1){if(R!==null){if(t[R]!==void 0)return t[R];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let X=S;if(S===t.RED&&(k===t.FLOAT&&(X=t.R32F),k===t.HALF_FLOAT&&(X=t.R16F),k===t.UNSIGNED_BYTE&&(X=t.R8)),S===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(X=t.R8UI),k===t.UNSIGNED_SHORT&&(X=t.R16UI),k===t.UNSIGNED_INT&&(X=t.R32UI),k===t.BYTE&&(X=t.R8I),k===t.SHORT&&(X=t.R16I),k===t.INT&&(X=t.R32I)),S===t.RG&&(k===t.FLOAT&&(X=t.RG32F),k===t.HALF_FLOAT&&(X=t.RG16F),k===t.UNSIGNED_BYTE&&(X=t.RG8)),S===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&(X=t.RG8UI),k===t.UNSIGNED_SHORT&&(X=t.RG16UI),k===t.UNSIGNED_INT&&(X=t.RG32UI),k===t.BYTE&&(X=t.RG8I),k===t.SHORT&&(X=t.RG16I),k===t.INT&&(X=t.RG32I)),S===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&(X=t.RGB8UI),k===t.UNSIGNED_SHORT&&(X=t.RGB16UI),k===t.UNSIGNED_INT&&(X=t.RGB32UI),k===t.BYTE&&(X=t.RGB8I),k===t.SHORT&&(X=t.RGB16I),k===t.INT&&(X=t.RGB32I)),S===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),k===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),k===t.UNSIGNED_INT&&(X=t.RGBA32UI),k===t.BYTE&&(X=t.RGBA8I),k===t.SHORT&&(X=t.RGBA16I),k===t.INT&&(X=t.RGBA32I)),S===t.RGB&&(k===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),k===t.UNSIGNED_INT_10F_11F_11F_REV&&(X=t.R11F_G11F_B10F)),S===t.RGBA){const Se=ee?ec:it.getTransfer(K);k===t.FLOAT&&(X=t.RGBA32F),k===t.HALF_FLOAT&&(X=t.RGBA16F),k===t.UNSIGNED_BYTE&&(X=Se===lt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function b(R,S){let k;return R?S===null||S===Hr||S===rs?k=t.DEPTH24_STENCIL8:S===si?k=t.DEPTH32F_STENCIL8:S===is&&(k=t.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Hr||S===rs?k=t.DEPTH_COMPONENT24:S===si?k=t.DEPTH_COMPONENT32F:S===is&&(k=t.DEPTH_COMPONENT16),k}function T(R,S){return x(R)===!0||R.isFramebufferTexture&&R.minFilter!==wn&&R.minFilter!==Un?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function E(R){const S=R.target;S.removeEventListener("dispose",E),L(S),S.isVideoTexture&&f.delete(S)}function w(R){const S=R.target;S.removeEventListener("dispose",w),M(S)}function L(R){const S=i.get(R);if(S.__webglInit===void 0)return;const k=R.source,K=h.get(k);if(K){const ee=K[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&C(R),Object.keys(K).length===0&&h.delete(k)}i.remove(R)}function C(R){const S=i.get(R);t.deleteTexture(S.__webglTexture);const k=R.source,K=h.get(k);delete K[S.__cacheKey],o.memory.textures--}function M(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let ee=0;ee<S.__webglFramebuffer[K].length;ee++)t.deleteFramebuffer(S.__webglFramebuffer[K][ee]);else t.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)t.deleteFramebuffer(S.__webglFramebuffer[K]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let K=0,ee=k.length;K<ee;K++){const X=i.get(k[K]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),o.memory.textures--),i.remove(k[K])}i.remove(R)}let N=0;function z(){N=0}function B(){const R=N;return R>=r.maxTextures&&ze("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),N+=1,R}function Y(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function W(R,S){const k=i.get(R);if(R.isVideoTexture&&_t(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const K=R.image;if(K===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{q(k,R,S);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+S)}function j(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){q(k,R,S);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+S)}function J(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){q(k,R,S);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+S)}function I(R,S){const k=i.get(R);if(R.version>0&&k.__version!==R.version){Q(k,R,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+S)}const H={[Od]:t.REPEAT,[wi]:t.CLAMP_TO_EDGE,[kd]:t.MIRRORED_REPEAT},$={[wn]:t.NEAREST,[TS]:t.NEAREST_MIPMAP_NEAREST,[ks]:t.NEAREST_MIPMAP_LINEAR,[Un]:t.LINEAR,[nu]:t.LINEAR_MIPMAP_NEAREST,[Lr]:t.LINEAR_MIPMAP_LINEAR},ae={[LS]:t.NEVER,[OS]:t.ALWAYS,[IS]:t.LESS,[Rg]:t.LEQUAL,[DS]:t.EQUAL,[FS]:t.GEQUAL,[zS]:t.GREATER,[US]:t.NOTEQUAL};function Me(R,S){if(S.type===si&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Un||S.magFilter===nu||S.magFilter===ks||S.magFilter===Lr||S.minFilter===Un||S.minFilter===nu||S.minFilter===ks||S.minFilter===Lr)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,H[S.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,H[S.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,H[S.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,$[S.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,$[S.minFilter]),S.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,ae[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===wn||S.minFilter!==ks&&S.minFilter!==Lr||S.type===si&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Je(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",E));const K=S.source;let ee=h.get(K);ee===void 0&&(ee={},h.set(K,ee));const X=Y(S);if(X!==R.__cacheKey){ee[X]===void 0&&(ee[X]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ee[X].usedTimes++;const Se=ee[R.__cacheKey];Se!==void 0&&(ee[R.__cacheKey].usedTimes--,Se.usedTimes===0&&C(S)),R.__cacheKey=X,R.__webglTexture=ee[X].texture}return k}function Qe(R,S,k){return Math.floor(Math.floor(R/k)/S)}function rt(R,S,k,K){const X=R.updateRanges;if(X.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,k,K,S.data);else{X.sort((te,oe)=>te.start-oe.start);let Se=0;for(let te=1;te<X.length;te++){const oe=X[Se],Ne=X[te],Te=oe.start+oe.count,he=Qe(Ne.start,S.width,4),Le=Qe(oe.start,S.width,4);Ne.start<=Te+1&&he===Le&&Qe(Ne.start+Ne.count-1,S.width,4)===he?oe.count=Math.max(oe.count,Ne.start+Ne.count-oe.start):(++Se,X[Se]=Ne)}X.length=Se+1;const ue=t.getParameter(t.UNPACK_ROW_LENGTH),Ce=t.getParameter(t.UNPACK_SKIP_PIXELS),ye=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let te=0,oe=X.length;te<oe;te++){const Ne=X[te],Te=Math.floor(Ne.start/4),he=Math.ceil(Ne.count/4),Le=Te%S.width,D=Math.floor(Te/S.width),de=he,se=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Le),t.pixelStorei(t.UNPACK_SKIP_ROWS,D),n.texSubImage2D(t.TEXTURE_2D,0,Le,D,de,se,k,K,S.data)}R.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ue),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),t.pixelStorei(t.UNPACK_SKIP_ROWS,ye)}}function q(R,S,k){let K=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=t.TEXTURE_3D);const ee=Je(R,S),X=S.source;n.bindTexture(K,R.__webglTexture,t.TEXTURE0+k);const Se=i.get(X);if(X.version!==Se.__version||ee===!0){n.activeTexture(t.TEXTURE0+k);const ue=it.getPrimaries(it.workingColorSpace),Ce=S.colorSpace===Zi?null:it.getPrimaries(S.colorSpace),ye=S.colorSpace===Zi||ue===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let te=y(S.image,!1,r.maxTextureSize);te=Ee(S,te);const oe=a.convert(S.format,S.colorSpace),Ne=a.convert(S.type);let Te=v(S.internalFormat,oe,Ne,S.colorSpace,S.isVideoTexture);Me(K,S);let he;const Le=S.mipmaps,D=S.isVideoTexture!==!0,de=Se.__version===void 0||ee===!0,se=X.dataReady,le=T(S,te);if(S.isDepthTexture)Te=b(S.format===os,S.type),de&&(D?n.texStorage2D(t.TEXTURE_2D,1,Te,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,Te,te.width,te.height,0,oe,Ne,null));else if(S.isDataTexture)if(Le.length>0){D&&de&&n.texStorage2D(t.TEXTURE_2D,le,Te,Le[0].width,Le[0].height);for(let ie=0,Z=Le.length;ie<Z;ie++)he=Le[ie],D?se&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,oe,Ne,he.data):n.texImage2D(t.TEXTURE_2D,ie,Te,he.width,he.height,0,oe,Ne,he.data);S.generateMipmaps=!1}else D?(de&&n.texStorage2D(t.TEXTURE_2D,le,Te,te.width,te.height),se&&rt(S,te,oe,Ne)):n.texImage2D(t.TEXTURE_2D,0,Te,te.width,te.height,0,oe,Ne,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){D&&de&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Te,Le[0].width,Le[0].height,te.depth);for(let ie=0,Z=Le.length;ie<Z;ie++)if(he=Le[ie],S.format!==qn)if(oe!==null)if(D){if(se)if(S.layerUpdates.size>0){const ge=Pm(he.width,he.height,S.format,S.type);for(const Ie of S.layerUpdates){const pt=he.data.subarray(Ie*ge/he.data.BYTES_PER_ELEMENT,(Ie+1)*ge/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,Ie,he.width,he.height,1,oe,pt)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,te.depth,oe,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ie,Te,he.width,he.height,te.depth,0,he.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?se&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,te.depth,oe,Ne,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ie,Te,he.width,he.height,te.depth,0,oe,Ne,he.data)}else{D&&de&&n.texStorage2D(t.TEXTURE_2D,le,Te,Le[0].width,Le[0].height);for(let ie=0,Z=Le.length;ie<Z;ie++)he=Le[ie],S.format!==qn?oe!==null?D?se&&n.compressedTexSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,oe,he.data):n.compressedTexImage2D(t.TEXTURE_2D,ie,Te,he.width,he.height,0,he.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?se&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,oe,Ne,he.data):n.texImage2D(t.TEXTURE_2D,ie,Te,he.width,he.height,0,oe,Ne,he.data)}else if(S.isDataArrayTexture)if(D){if(de&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Te,te.width,te.height,te.depth),se)if(S.layerUpdates.size>0){const ie=Pm(te.width,te.height,S.format,S.type);for(const Z of S.layerUpdates){const ge=te.data.subarray(Z*ie/te.data.BYTES_PER_ELEMENT,(Z+1)*ie/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,oe,Ne,ge)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,oe,Ne,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Te,te.width,te.height,te.depth,0,oe,Ne,te.data);else if(S.isData3DTexture)D?(de&&n.texStorage3D(t.TEXTURE_3D,le,Te,te.width,te.height,te.depth),se&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,oe,Ne,te.data)):n.texImage3D(t.TEXTURE_3D,0,Te,te.width,te.height,te.depth,0,oe,Ne,te.data);else if(S.isFramebufferTexture){if(de)if(D)n.texStorage2D(t.TEXTURE_2D,le,Te,te.width,te.height);else{let ie=te.width,Z=te.height;for(let ge=0;ge<le;ge++)n.texImage2D(t.TEXTURE_2D,ge,Te,ie,Z,0,oe,Ne,null),ie>>=1,Z>>=1}}else if(Le.length>0){if(D&&de){const ie=De(Le[0]);n.texStorage2D(t.TEXTURE_2D,le,Te,ie.width,ie.height)}for(let ie=0,Z=Le.length;ie<Z;ie++)he=Le[ie],D?se&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,oe,Ne,he):n.texImage2D(t.TEXTURE_2D,ie,Te,oe,Ne,he);S.generateMipmaps=!1}else if(D){if(de){const ie=De(te);n.texStorage2D(t.TEXTURE_2D,le,Te,ie.width,ie.height)}se&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,oe,Ne,te)}else n.texImage2D(t.TEXTURE_2D,0,Te,oe,Ne,te);x(S)&&u(K),Se.__version=X.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Q(R,S,k){if(S.image.length!==6)return;const K=Je(R,S),ee=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+k);const X=i.get(ee);if(ee.version!==X.__version||K===!0){n.activeTexture(t.TEXTURE0+k);const Se=it.getPrimaries(it.workingColorSpace),ue=S.colorSpace===Zi?null:it.getPrimaries(S.colorSpace),Ce=S.colorSpace===Zi||Se===ue?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const ye=S.isCompressedTexture||S.image[0].isCompressedTexture,te=S.image[0]&&S.image[0].isDataTexture,oe=[];for(let Z=0;Z<6;Z++)!ye&&!te?oe[Z]=y(S.image[Z],!0,r.maxCubemapSize):oe[Z]=te?S.image[Z].image:S.image[Z],oe[Z]=Ee(S,oe[Z]);const Ne=oe[0],Te=a.convert(S.format,S.colorSpace),he=a.convert(S.type),Le=v(S.internalFormat,Te,he,S.colorSpace),D=S.isVideoTexture!==!0,de=X.__version===void 0||K===!0,se=ee.dataReady;let le=T(S,Ne);Me(t.TEXTURE_CUBE_MAP,S);let ie;if(ye){D&&de&&n.texStorage2D(t.TEXTURE_CUBE_MAP,le,Le,Ne.width,Ne.height);for(let Z=0;Z<6;Z++){ie=oe[Z].mipmaps;for(let ge=0;ge<ie.length;ge++){const Ie=ie[ge];S.format!==qn?Te!==null?D?se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,Ie.width,Ie.height,Te,Ie.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,Le,Ie.width,Ie.height,0,Ie.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,0,0,Ie.width,Ie.height,Te,he,Ie.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge,Le,Ie.width,Ie.height,0,Te,he,Ie.data)}}}else{if(ie=S.mipmaps,D&&de){ie.length>0&&le++;const Z=De(oe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,le,Le,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){D?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,oe[Z].width,oe[Z].height,Te,he,oe[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Le,oe[Z].width,oe[Z].height,0,Te,he,oe[Z].data);for(let ge=0;ge<ie.length;ge++){const pt=ie[ge].image[Z].image;D?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,pt.width,pt.height,Te,he,pt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,Le,pt.width,pt.height,0,Te,he,pt.data)}}else{D?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Te,he,oe[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Le,Te,he,oe[Z]);for(let ge=0;ge<ie.length;ge++){const Ie=ie[ge];D?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,0,0,Te,he,Ie.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ge+1,Le,Te,he,Ie.image[Z])}}}x(S)&&u(t.TEXTURE_CUBE_MAP),X.__version=ee.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function xe(R,S,k,K,ee,X){const Se=a.convert(k.format,k.colorSpace),ue=a.convert(k.type),Ce=v(k.internalFormat,Se,ue,k.colorSpace),ye=i.get(S),te=i.get(k);if(te.__renderTarget=S,!ye.__hasExternalTextures){const oe=Math.max(1,S.width>>X),Ne=Math.max(1,S.height>>X);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,X,Ce,oe,Ne,S.depth,0,Se,ue,null):n.texImage2D(ee,X,Ce,oe,Ne,0,Se,ue,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),_e(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,ee,te.__webglTexture,0,dt(S)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,K,ee,te.__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ue(R,S,k){if(t.bindRenderbuffer(t.RENDERBUFFER,R),S.depthBuffer){const K=S.depthTexture,ee=K&&K.isDepthTexture?K.type:null,X=b(S.stencilBuffer,ee),Se=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=dt(S);_e(S)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,X,S.width,S.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,X,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,X,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,R)}else{const K=S.textures;for(let ee=0;ee<K.length;ee++){const X=K[ee],Se=a.convert(X.format,X.colorSpace),ue=a.convert(X.type),Ce=v(X.internalFormat,Se,ue,X.colorSpace),ye=dt(S);k&&_e(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ye,Ce,S.width,S.height):_e(S)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ye,Ce,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Ce,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function be(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W(S.depthTexture,0);const ee=K.__webglTexture,X=dt(S);if(S.depthTexture.format===as)_e(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(S.depthTexture.format===os)_e(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function We(R){const S=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=K}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=R.texture.mipmaps;K&&K.length>0?be(S.__webglFramebuffer[0],R):be(S.__webglFramebuffer,R)}else if(k){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=t.createRenderbuffer(),Ue(S.__webglDepthbuffer[K],R,!1);else{const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer[K];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,X)}}else{const K=R.texture.mipmaps;if(K&&K.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),Ue(S.__webglDepthbuffer,R,!1);else{const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,X)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Bt(R,S,k){const K=i.get(R);S!==void 0&&xe(K.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&We(R)}function Ge(R){const S=R.texture,k=i.get(R),K=i.get(S);R.addEventListener("dispose",w);const ee=R.textures,X=R.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=t.createTexture()),K.__version=S.version,o.memory.textures++),X){k.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ue]=[];for(let Ce=0;Ce<S.mipmaps.length;Ce++)k.__webglFramebuffer[ue][Ce]=t.createFramebuffer()}else k.__webglFramebuffer[ue]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ue=0;ue<S.mipmaps.length;ue++)k.__webglFramebuffer[ue]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(Se)for(let ue=0,Ce=ee.length;ue<Ce;ue++){const ye=i.get(ee[ue]);ye.__webglTexture===void 0&&(ye.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&_e(R)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const Ce=ee[ue];k.__webglColorRenderbuffer[ue]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[ue]);const ye=a.convert(Ce.format,Ce.colorSpace),te=a.convert(Ce.type),oe=v(Ce.internalFormat,ye,te,Ce.colorSpace,R.isXRRenderTarget===!0),Ne=dt(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ne,oe,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,k.__webglColorRenderbuffer[ue])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),Ue(k.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),Me(t.TEXTURE_CUBE_MAP,S);for(let ue=0;ue<6;ue++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)xe(k.__webglFramebuffer[ue][Ce],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ce);else xe(k.__webglFramebuffer[ue],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);x(S)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let ue=0,Ce=ee.length;ue<Ce;ue++){const ye=ee[ue],te=i.get(ye);let oe=t.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(oe,te.__webglTexture),Me(oe,ye),xe(k.__webglFramebuffer,R,ye,t.COLOR_ATTACHMENT0+ue,oe,0),x(ye)&&u(oe)}n.unbindTexture()}else{let ue=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ue,K.__webglTexture),Me(ue,S),S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)xe(k.__webglFramebuffer[Ce],R,S,t.COLOR_ATTACHMENT0,ue,Ce);else xe(k.__webglFramebuffer,R,S,t.COLOR_ATTACHMENT0,ue,0);x(S)&&u(ue),n.unbindTexture()}R.depthBuffer&&We(R)}function gt(R){const S=R.textures;for(let k=0,K=S.length;k<K;k++){const ee=S[k];if(x(ee)){const X=g(R),Se=i.get(ee).__webglTexture;n.bindTexture(X,Se),u(X),n.unbindTexture()}}}const P=[],Xe=[];function Ye(R){if(R.samples>0){if(_e(R)===!1){const S=R.textures,k=R.width,K=R.height;let ee=t.COLOR_BUFFER_BIT;const X=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(R),ue=S.length>1;if(ue)for(let ye=0;ye<S.length;ye++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const Ce=R.texture.mipmaps;Ce&&Ce.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ye=0;ye<S.length;ye++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),ue){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const te=i.get(S[ye]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,te,0)}t.blitFramebuffer(0,0,k,K,0,0,k,K,ee,t.NEAREST),l===!0&&(P.length=0,Xe.length=0,P.push(t.COLOR_ATTACHMENT0+ye),R.depthBuffer&&R.resolveDepthBuffer===!1&&(P.push(X),Xe.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Xe)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,P))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ue)for(let ye=0;ye<S.length;ye++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const te=i.get(S[ye]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,te,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function dt(R){return Math.min(r.maxSamples,R.samples)}function _e(R){const S=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function _t(R){const S=o.render.frame;f.get(R)!==S&&(f.set(R,S),R.update())}function Ee(R,S){const k=R.colorSpace,K=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==qa&&k!==Zi&&(it.getTransfer(k)===lt?(K!==qn||ee!==hi)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Rt("WebGLTextures: Unsupported texture color space:",k)),S}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.setTexture2D=W,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=I,this.rebindTextures=Bt,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=_e}function vA(t,e){function n(i,r=Zi){let a;const o=it.getTransfer(r);if(i===hi)return t.UNSIGNED_BYTE;if(i===yh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Sh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Eg)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Cg)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===bg)return t.BYTE;if(i===Ag)return t.SHORT;if(i===is)return t.UNSIGNED_SHORT;if(i===_h)return t.INT;if(i===Hr)return t.UNSIGNED_INT;if(i===si)return t.FLOAT;if(i===eo)return t.HALF_FLOAT;if(i===wg)return t.ALPHA;if(i===Tg)return t.RGB;if(i===qn)return t.RGBA;if(i===as)return t.DEPTH_COMPONENT;if(i===os)return t.DEPTH_STENCIL;if(i===Mh)return t.RED;if(i===bh)return t.RED_INTEGER;if(i===Ah)return t.RG;if(i===Eh)return t.RG_INTEGER;if(i===Ch)return t.RGBA_INTEGER;if(i===bl||i===Al||i===El||i===Cl)if(o===lt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===bl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===El)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===bl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===El)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bd||i===Gd||i===Vd||i===Hd)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Bd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jd||i===Wd||i===Xd)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===jd||i===Wd)return o===lt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Xd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yd||i===$d||i===qd||i===Kd||i===Zd||i===Qd||i===Jd||i===ef||i===tf||i===nf||i===rf||i===af||i===of||i===sf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Yd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$d)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ef)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===af)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===of)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lf||i===cf||i===uf)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===lf)return o===lt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===df||i===ff||i===hf||i===pf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===df)return a.COMPRESSED_RED_RGTC1_EXT;if(i===ff)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hf)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const _A=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class SA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new jg(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new zi({vertexShader:_A,fragmentShader:yA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ht(new Mc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class MA extends to{constructor(e,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",l=1,c=null,f=null,p=null,h=null,m=null,_=null;const y=typeof XRWebGLBinding<"u",x=new SA,u={},g=n.getContextAttributes();let v=null,b=null;const T=[],E=[],w=new He;let L=null;const C=new An;C.viewport=new ct;const M=new An;M.viewport=new ct;const N=[C,M],z=new k1;let B=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=T[q];return Q===void 0&&(Q=new bu,T[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=T[q];return Q===void 0&&(Q=new bu,T[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=T[q];return Q===void 0&&(Q=new bu,T[q]=Q),Q.getHandSpace()};function W(q){const Q=E.indexOf(q.inputSource);if(Q===-1)return;const xe=T[Q];xe!==void 0&&(xe.update(q.inputSource,q.frame,c||o),xe.dispatchEvent({type:q.type,data:q.inputSource}))}function j(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",J);for(let q=0;q<T.length;q++){const Q=E[q];Q!==null&&(E[q]=null,T[q].disconnect(Q))}B=null,Y=null,x.reset();for(const q in u)delete u[q];e.setRenderTarget(v),m=null,h=null,p=null,r=null,b=null,rt.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(r,n)),p},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",j),r.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await n.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(w),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ue=null,be=null;g.depth&&(be=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,xe=g.stencil?os:as,Ue=g.stencil?rs:Hr);const We={colorFormat:n.RGBA8,depthFormat:be,scaleFactor:a};p=this.getBinding(),h=p.createProjectionLayer(We),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new jr(h.textureWidth,h.textureHeight,{format:qn,type:hi,depthTexture:new Hg(h.textureWidth,h.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const xe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(r,n,xe),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new jr(m.framebufferWidth,m.framebufferHeight,{format:qn,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(s),rt.setContext(r),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(q){for(let Q=0;Q<q.removed.length;Q++){const xe=q.removed[Q],Ue=E.indexOf(xe);Ue>=0&&(E[Ue]=null,T[Ue].disconnect(xe))}for(let Q=0;Q<q.added.length;Q++){const xe=q.added[Q];let Ue=E.indexOf(xe);if(Ue===-1){for(let We=0;We<T.length;We++)if(We>=E.length){E.push(xe),Ue=We;break}else if(E[We]===null){E[We]=xe,Ue=We;break}if(Ue===-1)break}const be=T[Ue];be&&be.connect(xe)}}const I=new O,H=new O;function $(q,Q,xe){I.setFromMatrixPosition(Q.matrixWorld),H.setFromMatrixPosition(xe.matrixWorld);const Ue=I.distanceTo(H),be=Q.projectionMatrix.elements,We=xe.projectionMatrix.elements,Bt=be[14]/(be[10]-1),Ge=be[14]/(be[10]+1),gt=(be[9]+1)/be[5],P=(be[9]-1)/be[5],Xe=(be[8]-1)/be[0],Ye=(We[8]+1)/We[0],dt=Bt*Xe,_e=Bt*Ye,_t=Ue/(-Xe+Ye),Ee=_t*-Xe;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ee),q.translateZ(_t),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),be[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const De=Bt+_t,R=Ge+_t,S=dt-Ee,k=_e+(Ue-Ee),K=gt*Ge/R*De,ee=P*Ge/R*De;q.projectionMatrix.makePerspective(S,k,K,ee,De,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ae(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let Q=q.near,xe=q.far;x.texture!==null&&(x.depthNear>0&&(Q=x.depthNear),x.depthFar>0&&(xe=x.depthFar)),z.near=M.near=C.near=Q,z.far=M.far=C.far=xe,(B!==z.near||Y!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),B=z.near,Y=z.far),z.layers.mask=q.layers.mask|6,C.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;const Ue=q.parent,be=z.cameras;ae(z,Ue);for(let We=0;We<be.length;We++)ae(be[We],Ue);be.length===2?$(z,C,M):z.projectionMatrix.copy(C.projectionMatrix),Me(q,z,Ue)};function Me(q,Q,xe){xe===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(xe.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ls*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(z)},this.getCameraTexture=function(q){return u[q]};let Je=null;function Qe(q,Q){if(f=Q.getViewerPose(c||o),_=Q,f!==null){const xe=f.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let Ue=!1;xe.length!==z.cameras.length&&(z.cameras.length=0,Ue=!0);for(let Ge=0;Ge<xe.length;Ge++){const gt=xe[Ge];let P=null;if(m!==null)P=m.getViewport(gt);else{const Ye=p.getViewSubImage(h,gt);P=Ye.viewport,Ge===0&&(e.setRenderTargetTextures(b,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(b))}let Xe=N[Ge];Xe===void 0&&(Xe=new An,Xe.layers.enable(Ge),Xe.viewport=new ct,N[Ge]=Xe),Xe.matrix.fromArray(gt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(gt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(P.x,P.y,P.width,P.height),Ge===0&&(z.matrix.copy(Xe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ue===!0&&z.cameras.push(Xe)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){p=i.getBinding();const Ge=p.getDepthInformation(xe[0]);Ge&&Ge.isValid&&Ge.texture&&x.init(Ge,r.renderState)}if(be&&be.includes("camera-access")&&y){e.state.unbindTexture(),p=i.getBinding();for(let Ge=0;Ge<xe.length;Ge++){const gt=xe[Ge].camera;if(gt){let P=u[gt];P||(P=new jg,u[gt]=P);const Xe=p.getCameraImage(gt);P.sourceTexture=Xe}}}}for(let xe=0;xe<T.length;xe++){const Ue=E[xe],be=T[xe];Ue!==null&&be!==void 0&&be.update(Ue,Q,c||o)}Je&&Je(q,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const rt=new Yg;rt.setAnimationLoop(Qe),this.setAnimationLoop=function(q){Je=q},this.dispose=function(){}}}const Ar=new ei,bA=new ht;function AA(t,e){function n(x,u){x.matrixAutoUpdate===!0&&x.updateMatrix(),u.value.copy(x.matrix)}function i(x,u){u.color.getRGB(x.fogColor.value,Fg(t)),u.isFog?(x.fogNear.value=u.near,x.fogFar.value=u.far):u.isFogExp2&&(x.fogDensity.value=u.density)}function r(x,u,g,v,b){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(x,u):u.isMeshToonMaterial?(a(x,u),p(x,u)):u.isMeshPhongMaterial?(a(x,u),f(x,u)):u.isMeshStandardMaterial?(a(x,u),h(x,u),u.isMeshPhysicalMaterial&&m(x,u,b)):u.isMeshMatcapMaterial?(a(x,u),_(x,u)):u.isMeshDepthMaterial?a(x,u):u.isMeshDistanceMaterial?(a(x,u),y(x,u)):u.isMeshNormalMaterial?a(x,u):u.isLineBasicMaterial?(o(x,u),u.isLineDashedMaterial&&s(x,u)):u.isPointsMaterial?l(x,u,g,v):u.isSpriteMaterial?c(x,u):u.isShadowMaterial?(x.color.value.copy(u.color),x.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(x,u){x.opacity.value=u.opacity,u.color&&x.diffuse.value.copy(u.color),u.emissive&&x.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.bumpMap&&(x.bumpMap.value=u.bumpMap,n(u.bumpMap,x.bumpMapTransform),x.bumpScale.value=u.bumpScale,u.side===sn&&(x.bumpScale.value*=-1)),u.normalMap&&(x.normalMap.value=u.normalMap,n(u.normalMap,x.normalMapTransform),x.normalScale.value.copy(u.normalScale),u.side===sn&&x.normalScale.value.negate()),u.displacementMap&&(x.displacementMap.value=u.displacementMap,n(u.displacementMap,x.displacementMapTransform),x.displacementScale.value=u.displacementScale,x.displacementBias.value=u.displacementBias),u.emissiveMap&&(x.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,x.emissiveMapTransform)),u.specularMap&&(x.specularMap.value=u.specularMap,n(u.specularMap,x.specularMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest);const g=e.get(u),v=g.envMap,b=g.envMapRotation;v&&(x.envMap.value=v,Ar.copy(b),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),x.envMapRotation.value.setFromMatrix4(bA.makeRotationFromEuler(Ar)),x.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=u.reflectivity,x.ior.value=u.ior,x.refractionRatio.value=u.refractionRatio),u.lightMap&&(x.lightMap.value=u.lightMap,x.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,x.lightMapTransform)),u.aoMap&&(x.aoMap.value=u.aoMap,x.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,x.aoMapTransform))}function o(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform))}function s(x,u){x.dashSize.value=u.dashSize,x.totalSize.value=u.dashSize+u.gapSize,x.scale.value=u.scale}function l(x,u,g,v){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.size.value=u.size*g,x.scale.value=v*.5,u.map&&(x.map.value=u.map,n(u.map,x.uvTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function c(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.rotation.value=u.rotation,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function f(x,u){x.specular.value.copy(u.specular),x.shininess.value=Math.max(u.shininess,1e-4)}function p(x,u){u.gradientMap&&(x.gradientMap.value=u.gradientMap)}function h(x,u){x.metalness.value=u.metalness,u.metalnessMap&&(x.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,x.metalnessMapTransform)),x.roughness.value=u.roughness,u.roughnessMap&&(x.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,x.roughnessMapTransform)),u.envMap&&(x.envMapIntensity.value=u.envMapIntensity)}function m(x,u,g){x.ior.value=u.ior,u.sheen>0&&(x.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),x.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(x.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,x.sheenColorMapTransform)),u.sheenRoughnessMap&&(x.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,x.sheenRoughnessMapTransform))),u.clearcoat>0&&(x.clearcoat.value=u.clearcoat,x.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(x.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,x.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(x.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===sn&&x.clearcoatNormalScale.value.negate())),u.dispersion>0&&(x.dispersion.value=u.dispersion),u.iridescence>0&&(x.iridescence.value=u.iridescence,x.iridescenceIOR.value=u.iridescenceIOR,x.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(x.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,x.iridescenceMapTransform)),u.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),u.transmission>0&&(x.transmission.value=u.transmission,x.transmissionSamplerMap.value=g.texture,x.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(x.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,x.transmissionMapTransform)),x.thickness.value=u.thickness,u.thicknessMap&&(x.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=u.attenuationDistance,x.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(x.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(x.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=u.specularIntensity,x.specularColor.value.copy(u.specularColor),u.specularColorMap&&(x.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,x.specularColorMapTransform)),u.specularIntensityMap&&(x.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,x.specularIntensityMapTransform))}function _(x,u){u.matcap&&(x.matcap.value=u.matcap)}function y(x,u){const g=e.get(u).light;x.referencePosition.value.setFromMatrixPosition(g.matrixWorld),x.nearDistance.value=g.shadow.camera.near,x.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function EA(t,e,n,i){let r={},a={},o=[];const s=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){const b=v.program;i.uniformBlockBinding(g,b)}function c(g,v){let b=r[g.id];b===void 0&&(_(g),b=f(g),r[g.id]=b,g.addEventListener("dispose",x));const T=v.program;i.updateUBOMapping(g,T);const E=e.render.frame;a[g.id]!==E&&(h(g),a[g.id]=E)}function f(g){const v=p();g.__bindingPointIndex=v;const b=t.createBuffer(),T=g.__size,E=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,T,E),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,b),b}function p(){for(let g=0;g<s;g++)if(o.indexOf(g)===-1)return o.push(g),g;return Rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){const v=r[g.id],b=g.uniforms,T=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let E=0,w=b.length;E<w;E++){const L=Array.isArray(b[E])?b[E]:[b[E]];for(let C=0,M=L.length;C<M;C++){const N=L[C];if(m(N,E,C,T)===!0){const z=N.__offset,B=Array.isArray(N.value)?N.value:[N.value];let Y=0;for(let W=0;W<B.length;W++){const j=B[W],J=y(j);typeof j=="number"||typeof j=="boolean"?(N.__data[0]=j,t.bufferSubData(t.UNIFORM_BUFFER,z+Y,N.__data)):j.isMatrix3?(N.__data[0]=j.elements[0],N.__data[1]=j.elements[1],N.__data[2]=j.elements[2],N.__data[3]=0,N.__data[4]=j.elements[3],N.__data[5]=j.elements[4],N.__data[6]=j.elements[5],N.__data[7]=0,N.__data[8]=j.elements[6],N.__data[9]=j.elements[7],N.__data[10]=j.elements[8],N.__data[11]=0):(j.toArray(N.__data,Y),Y+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,z,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(g,v,b,T){const E=g.value,w=v+"_"+b;if(T[w]===void 0)return typeof E=="number"||typeof E=="boolean"?T[w]=E:T[w]=E.clone(),!0;{const L=T[w];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return T[w]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function _(g){const v=g.uniforms;let b=0;const T=16;for(let w=0,L=v.length;w<L;w++){const C=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,N=C.length;M<N;M++){const z=C[M],B=Array.isArray(z.value)?z.value:[z.value];for(let Y=0,W=B.length;Y<W;Y++){const j=B[Y],J=y(j),I=b%T,H=I%J.boundary,$=I+H;b+=H,$!==0&&T-$<J.storage&&(b+=T-$),z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=J.storage}}}const E=b%T;return E>0&&(b+=T-E),g.__size=b,g.__cache={},this}function y(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ze("WebGLRenderer: Unsupported uniform value type.",g),v}function x(g){const v=g.target;v.removeEventListener("dispose",x);const b=o.indexOf(v.__bindingPointIndex);o.splice(b,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete a[v.id]}function u(){for(const g in r)t.deleteBuffer(r[g]);o=[],r={},a={}}return{bind:l,update:c,dispose:u}}const CA=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let _i=null;function wA(){return _i===null&&(_i=new Gg(CA,32,32,Ah,eo),_i.minFilter=Un,_i.magFilter=Un,_i.wrapS=wi,_i.wrapT=wi,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}class TA{constructor(e={}){const{canvas:n=kS(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const _=new Set([Ch,Eh,bh]),y=new Set([hi,Hr,is,rs,yh,Sh]),x=new Uint32Array(4),u=new Int32Array(4);let g=null,v=null;const b=[],T=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ur,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let w=!1;this._outputColorSpace=bn;let L=0,C=0,M=null,N=-1,z=null;const B=new ct,Y=new ct;let W=null;const j=new Be(0);let J=0,I=n.width,H=n.height,$=1,ae=null,Me=null;const Je=new ct(0,0,I,H),Qe=new ct(0,0,I,H);let rt=!1;const q=new Ph;let Q=!1,xe=!1;const Ue=new ht,be=new O,We=new ct,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function gt(){return M===null?$:1}let P=i;function Xe(A,U){return n.getContext(A,U)}try{const A={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${gh}`),n.addEventListener("webglcontextlost",ie,!1),n.addEventListener("webglcontextrestored",Z,!1),n.addEventListener("webglcontextcreationerror",ge,!1),P===null){const U="webgl2";if(P=Xe(U,A),P===null)throw Xe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw A("WebGLRenderer: "+A.message),A}let Ye,dt,_e,_t,Ee,De,R,S,k,K,ee,X,Se,ue,Ce,ye,te,oe,Ne,Te,he,Le,D,de;function se(){Ye=new Ub(P),Ye.init(),Le=new vA(P,Ye),dt=new wb(P,Ye,e,Le),_e=new xA(P,Ye),dt.reversedDepthBuffer&&h&&_e.buffers.depth.setReversed(!0),_t=new kb(P),Ee=new iA,De=new gA(P,Ye,_e,Ee,dt,Le,_t),R=new Rb(E),S=new zb(E),k=new H1(P),D=new Eb(P,k),K=new Fb(P,k,_t,D),ee=new Gb(P,K,k,_t),Ne=new Bb(P,dt,De),ye=new Tb(Ee),X=new nA(E,R,S,Ye,dt,D,ye),Se=new AA(E,Ee),ue=new aA,Ce=new dA(Ye),oe=new Ab(E,R,S,_e,ee,m,l),te=new pA(E,ee,dt),de=new EA(P,_t,dt,_e),Te=new Cb(P,Ye,_t),he=new Ob(P,Ye,_t),_t.programs=X.programs,E.capabilities=dt,E.extensions=Ye,E.properties=Ee,E.renderLists=ue,E.shadowMap=te,E.state=_e,E.info=_t}se();const le=new MA(E,P);this.xr=le,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const A=Ye.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ye.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(I,H,!1))},this.getSize=function(A){return A.set(I,H)},this.setSize=function(A,U,G=!0){if(le.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}I=A,H=U,n.width=Math.floor(A*$),n.height=Math.floor(U*$),G===!0&&(n.style.width=A+"px",n.style.height=U+"px"),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(I*$,H*$).floor()},this.setDrawingBufferSize=function(A,U,G){I=A,H=U,$=G,n.width=Math.floor(A*G),n.height=Math.floor(U*G),this.setViewport(0,0,A,U)},this.getCurrentViewport=function(A){return A.copy(B)},this.getViewport=function(A){return A.copy(Je)},this.setViewport=function(A,U,G,V){A.isVector4?Je.set(A.x,A.y,A.z,A.w):Je.set(A,U,G,V),_e.viewport(B.copy(Je).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(Qe)},this.setScissor=function(A,U,G,V){A.isVector4?Qe.set(A.x,A.y,A.z,A.w):Qe.set(A,U,G,V),_e.scissor(Y.copy(Qe).multiplyScalar($).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(A){_e.setScissorTest(rt=A)},this.setOpaqueSort=function(A){ae=A},this.setTransparentSort=function(A){Me=A},this.getClearColor=function(A){return A.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,G=!0){let V=0;if(A){let F=!1;if(M!==null){const re=M.texture.format;F=_.has(re)}if(F){const re=M.texture.type,fe=y.has(re),ve=oe.getClearColor(),me=oe.getClearAlpha(),Re=ve.r,Pe=ve.g,Ae=ve.b;fe?(x[0]=Re,x[1]=Pe,x[2]=Ae,x[3]=me,P.clearBufferuiv(P.COLOR,0,x)):(u[0]=Re,u[1]=Pe,u[2]=Ae,u[3]=me,P.clearBufferiv(P.COLOR,0,u))}else V|=P.COLOR_BUFFER_BIT}U&&(V|=P.DEPTH_BUFFER_BIT),G&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ie,!1),n.removeEventListener("webglcontextrestored",Z,!1),n.removeEventListener("webglcontextcreationerror",ge,!1),oe.dispose(),ue.dispose(),Ce.dispose(),Ee.dispose(),R.dispose(),S.dispose(),ee.dispose(),D.dispose(),de.dispose(),X.dispose(),le.dispose(),le.removeEventListener("sessionstart",Ih),le.removeEventListener("sessionend",Dh),gr.stop()};function ie(A){A.preventDefault(),am("WebGLRenderer: Context Lost."),w=!0}function Z(){am("WebGLRenderer: Context Restored."),w=!1;const A=_t.autoReset,U=te.enabled,G=te.autoUpdate,V=te.needsUpdate,F=te.type;se(),_t.autoReset=A,te.enabled=U,te.autoUpdate=G,te.needsUpdate=V,te.type=F}function ge(A){Rt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ie(A){const U=A.target;U.removeEventListener("dispose",Ie),pt(U)}function pt(A){ot(A),Ee.remove(A)}function ot(A){const U=Ee.get(A).programs;U!==void 0&&(U.forEach(function(G){X.releaseProgram(G)}),A.isShaderMaterial&&X.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,G,V,F,re){U===null&&(U=Bt);const fe=F.isMesh&&F.matrixWorld.determinant()<0,ve=cv(A,U,G,V,F);_e.setMaterial(V,fe);let me=G.index,Re=1;if(V.wireframe===!0){if(me=K.getWireframeAttribute(G),me===void 0)return;Re=2}const Pe=G.drawRange,Ae=G.attributes.position;let $e=Pe.start*Re,st=(Pe.start+Pe.count)*Re;re!==null&&($e=Math.max($e,re.start*Re),st=Math.min(st,(re.start+re.count)*Re)),me!==null?($e=Math.max($e,0),st=Math.min(st,me.count)):Ae!=null&&($e=Math.max($e,0),st=Math.min(st,Ae.count));const Ct=st-$e;if(Ct<0||Ct===1/0)return;D.setup(F,V,ve,G,me);let wt,ut=Te;if(me!==null&&(wt=k.get(me),ut=he,ut.setIndex(wt)),F.isMesh)V.wireframe===!0?(_e.setLineWidth(V.wireframeLinewidth*gt()),ut.setMode(P.LINES)):ut.setMode(P.TRIANGLES);else if(F.isLine){let we=V.linewidth;we===void 0&&(we=1),_e.setLineWidth(we*gt()),F.isLineSegments?ut.setMode(P.LINES):F.isLineLoop?ut.setMode(P.LINE_LOOP):ut.setMode(P.LINE_STRIP)}else F.isPoints?ut.setMode(P.POINTS):F.isSprite&&ut.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ss("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const we=F._multiDrawStarts,yt=F._multiDrawCounts,tt=F._multiDrawCount,vn=me?k.get(me).bytesPerElement:1,$r=Ee.get(V).currentProgram.getUniforms();for(let _n=0;_n<tt;_n++)$r.setValue(P,"_gl_DrawID",_n),ut.render(we[_n]/vn,yt[_n])}else if(F.isInstancedMesh)ut.renderInstances($e,Ct,F.count);else if(G.isInstancedBufferGeometry){const we=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,yt=Math.min(G.instanceCount,we);ut.renderInstances($e,Ct,yt)}else ut.render($e,Ct)};function ni(A,U,G){A.transparent===!0&&A.side===Ai&&A.forceSinglePass===!1?(A.side=sn,A.needsUpdate=!0,vs(A,U,G),A.side=hr,A.needsUpdate=!0,vs(A,U,G),A.side=Ai):vs(A,U,G)}this.compile=function(A,U,G=null){G===null&&(G=A),v=Ce.get(G),v.init(U),T.push(v),G.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(v.pushLight(F),F.castShadow&&v.pushShadow(F))}),A!==G&&A.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(v.pushLight(F),F.castShadow&&v.pushShadow(F))}),v.setupLights();const V=new Set;return A.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const re=F.material;if(re)if(Array.isArray(re))for(let fe=0;fe<re.length;fe++){const ve=re[fe];ni(ve,G,F),V.add(ve)}else ni(re,G,F),V.add(re)}),v=T.pop(),V},this.compileAsync=function(A,U,G=null){const V=this.compile(A,U,G);return new Promise(F=>{function re(){if(V.forEach(function(fe){Ee.get(fe).currentProgram.isReady()&&V.delete(fe)}),V.size===0){F(A);return}setTimeout(re,10)}Ye.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Bn=null;function lv(A){Bn&&Bn(A)}function Ih(){gr.stop()}function Dh(){gr.start()}const gr=new Yg;gr.setAnimationLoop(lv),typeof self<"u"&&gr.setContext(self),this.setAnimationLoop=function(A){Bn=A,le.setAnimationLoop(A),A===null?gr.stop():gr.start()},le.addEventListener("sessionstart",Ih),le.addEventListener("sessionend",Dh),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){Rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),A.isScene===!0&&A.onBeforeRender(E,A,U,M),v=Ce.get(A,T.length),v.init(U),T.push(v),Ue.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(Ue,li,U.reversedDepth),xe=this.localClippingEnabled,Q=ye.init(this.clippingPlanes,xe),g=ue.get(A,b.length),g.init(),b.push(g),le.enabled===!0&&le.isPresenting===!0){const re=E.xr.getDepthSensingMesh();re!==null&&wc(re,U,-1/0,E.sortObjects)}wc(A,U,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(ae,Me),Ge=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ge&&oe.addToRenderList(g,A),this.info.render.frame++,Q===!0&&ye.beginShadows();const G=v.state.shadowsArray;te.render(G,A,U),Q===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=g.opaque,F=g.transmissive;if(v.setupLights(),U.isArrayCamera){const re=U.cameras;if(F.length>0)for(let fe=0,ve=re.length;fe<ve;fe++){const me=re[fe];Uh(V,F,A,me)}Ge&&oe.render(A);for(let fe=0,ve=re.length;fe<ve;fe++){const me=re[fe];zh(g,A,me,me.viewport)}}else F.length>0&&Uh(V,F,A,U),Ge&&oe.render(A),zh(g,A,U);M!==null&&C===0&&(De.updateMultisampleRenderTarget(M),De.updateRenderTargetMipmap(M)),A.isScene===!0&&A.onAfterRender(E,A,U),D.resetDefaultState(),N=-1,z=null,T.pop(),T.length>0?(v=T[T.length-1],Q===!0&&ye.setGlobalState(E.clippingPlanes,v.state.camera)):v=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function wc(A,U,G,V){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)G=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)v.pushLight(A),A.castShadow&&v.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){V&&We.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ue);const fe=ee.update(A),ve=A.material;ve.visible&&g.push(A,fe,ve,G,We.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const fe=ee.update(A),ve=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),We.copy(A.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),We.copy(fe.boundingSphere.center)),We.applyMatrix4(A.matrixWorld).applyMatrix4(Ue)),Array.isArray(ve)){const me=fe.groups;for(let Re=0,Pe=me.length;Re<Pe;Re++){const Ae=me[Re],$e=ve[Ae.materialIndex];$e&&$e.visible&&g.push(A,fe,$e,G,We.z,Ae)}}else ve.visible&&g.push(A,fe,ve,G,We.z,null)}}const re=A.children;for(let fe=0,ve=re.length;fe<ve;fe++)wc(re[fe],U,G,V)}function zh(A,U,G,V){const{opaque:F,transmissive:re,transparent:fe}=A;v.setupLightsView(G),Q===!0&&ye.setGlobalState(E.clippingPlanes,G),V&&_e.viewport(B.copy(V)),F.length>0&&gs(F,U,G),re.length>0&&gs(re,U,G),fe.length>0&&gs(fe,U,G),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Uh(A,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[V.id]===void 0&&(v.state.transmissionRenderTarget[V.id]=new jr(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?eo:hi,minFilter:Lr,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const re=v.state.transmissionRenderTarget[V.id],fe=V.viewport||B;re.setSize(fe.z*E.transmissionResolutionScale,fe.w*E.transmissionResolutionScale);const ve=E.getRenderTarget(),me=E.getActiveCubeFace(),Re=E.getActiveMipmapLevel();E.setRenderTarget(re),E.getClearColor(j),J=E.getClearAlpha(),J<1&&E.setClearColor(16777215,.5),E.clear(),Ge&&oe.render(G);const Pe=E.toneMapping;E.toneMapping=ur;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),v.setupLightsView(V),Q===!0&&ye.setGlobalState(E.clippingPlanes,V),gs(A,G,V),De.updateMultisampleRenderTarget(re),De.updateRenderTargetMipmap(re),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let st=0,Ct=U.length;st<Ct;st++){const wt=U[st],{object:ut,geometry:we,material:yt,group:tt}=wt;if(yt.side===Ai&&ut.layers.test(V.layers)){const vn=yt.side;yt.side=sn,yt.needsUpdate=!0,Fh(ut,G,V,we,yt,tt),yt.side=vn,yt.needsUpdate=!0,$e=!0}}$e===!0&&(De.updateMultisampleRenderTarget(re),De.updateRenderTargetMipmap(re))}E.setRenderTarget(ve,me,Re),E.setClearColor(j,J),Ae!==void 0&&(V.viewport=Ae),E.toneMapping=Pe}function gs(A,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,re=A.length;F<re;F++){const fe=A[F],{object:ve,geometry:me,group:Re}=fe;let Pe=fe.material;Pe.allowOverride===!0&&V!==null&&(Pe=V),ve.layers.test(G.layers)&&Fh(ve,U,G,me,Pe,Re)}}function Fh(A,U,G,V,F,re){A.onBeforeRender(E,U,G,V,F,re),A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),F.onBeforeRender(E,U,G,V,A,re),F.transparent===!0&&F.side===Ai&&F.forceSinglePass===!1?(F.side=sn,F.needsUpdate=!0,E.renderBufferDirect(G,U,V,F,A,re),F.side=hr,F.needsUpdate=!0,E.renderBufferDirect(G,U,V,F,A,re),F.side=Ai):E.renderBufferDirect(G,U,V,F,A,re),A.onAfterRender(E,U,G,V,F,re)}function vs(A,U,G){U.isScene!==!0&&(U=Bt);const V=Ee.get(A),F=v.state.lights,re=v.state.shadowsArray,fe=F.state.version,ve=X.getParameters(A,F.state,re,U,G),me=X.getProgramCacheKey(ve);let Re=V.programs;V.environment=A.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(A.isMeshStandardMaterial?S:R).get(A.envMap||V.environment),V.envMapRotation=V.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Re===void 0&&(A.addEventListener("dispose",Ie),Re=new Map,V.programs=Re);let Pe=Re.get(me);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===fe)return kh(A,ve),Pe}else ve.uniforms=X.getUniforms(A),A.onBeforeCompile(ve,E),Pe=X.acquireProgram(ve,me),Re.set(me,Pe),V.uniforms=ve.uniforms;const Ae=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ae.clippingPlanes=ye.uniform),kh(A,ve),V.needsLights=dv(A),V.lightsStateVersion=fe,V.needsLights&&(Ae.ambientLightColor.value=F.state.ambient,Ae.lightProbe.value=F.state.probe,Ae.directionalLights.value=F.state.directional,Ae.directionalLightShadows.value=F.state.directionalShadow,Ae.spotLights.value=F.state.spot,Ae.spotLightShadows.value=F.state.spotShadow,Ae.rectAreaLights.value=F.state.rectArea,Ae.ltc_1.value=F.state.rectAreaLTC1,Ae.ltc_2.value=F.state.rectAreaLTC2,Ae.pointLights.value=F.state.point,Ae.pointLightShadows.value=F.state.pointShadow,Ae.hemisphereLights.value=F.state.hemi,Ae.directionalShadowMap.value=F.state.directionalShadowMap,Ae.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ae.spotShadowMap.value=F.state.spotShadowMap,Ae.spotLightMatrix.value=F.state.spotLightMatrix,Ae.spotLightMap.value=F.state.spotLightMap,Ae.pointShadowMap.value=F.state.pointShadowMap,Ae.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Pe,V.uniformsList=null,Pe}function Oh(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=wl.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function kh(A,U){const G=Ee.get(A);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function cv(A,U,G,V,F){U.isScene!==!0&&(U=Bt),De.resetTextureUnits();const re=U.fog,fe=V.isMeshStandardMaterial?U.environment:null,ve=M===null?E.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:qa,me=(V.isMeshStandardMaterial?S:R).get(V.envMap||fe),Re=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Pe=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!G.morphAttributes.position,$e=!!G.morphAttributes.normal,st=!!G.morphAttributes.color;let Ct=ur;V.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Ct=E.toneMapping);const wt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=wt!==void 0?wt.length:0,we=Ee.get(V),yt=v.state.lights;if(Q===!0&&(xe===!0||A!==z)){const Jt=A===z&&V.id===N;ye.setState(V,A,Jt)}let tt=!1;V.version===we.__version?(we.needsLights&&we.lightsStateVersion!==yt.state.version||we.outputColorSpace!==ve||F.isBatchedMesh&&we.batching===!1||!F.isBatchedMesh&&we.batching===!0||F.isBatchedMesh&&we.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&we.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&we.instancing===!1||!F.isInstancedMesh&&we.instancing===!0||F.isSkinnedMesh&&we.skinning===!1||!F.isSkinnedMesh&&we.skinning===!0||F.isInstancedMesh&&we.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&we.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&we.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&we.instancingMorph===!1&&F.morphTexture!==null||we.envMap!==me||V.fog===!0&&we.fog!==re||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ye.numPlanes||we.numIntersection!==ye.numIntersection)||we.vertexAlphas!==Re||we.vertexTangents!==Pe||we.morphTargets!==Ae||we.morphNormals!==$e||we.morphColors!==st||we.toneMapping!==Ct||we.morphTargetsCount!==ut)&&(tt=!0):(tt=!0,we.__version=V.version);let vn=we.currentProgram;tt===!0&&(vn=vs(V,U,F));let $r=!1,_n=!1,oo=!1;const St=vn.getUniforms(),dn=we.uniforms;if(_e.useProgram(vn.program)&&($r=!0,_n=!0,oo=!0),V.id!==N&&(N=V.id,_n=!0),$r||z!==A){_e.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),St.setValue(P,"projectionMatrix",A.projectionMatrix),St.setValue(P,"viewMatrix",A.matrixWorldInverse);const fn=St.map.cameraPosition;fn!==void 0&&fn.setValue(P,be.setFromMatrixPosition(A.matrixWorld)),dt.logarithmicDepthBuffer&&St.setValue(P,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&St.setValue(P,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,_n=!0,oo=!0)}if(F.isSkinnedMesh){St.setOptional(P,F,"bindMatrix"),St.setOptional(P,F,"bindMatrixInverse");const Jt=F.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),St.setValue(P,"boneTexture",Jt.boneTexture,De))}F.isBatchedMesh&&(St.setOptional(P,F,"batchingTexture"),St.setValue(P,"batchingTexture",F._matricesTexture,De),St.setOptional(P,F,"batchingIdTexture"),St.setValue(P,"batchingIdTexture",F._indirectTexture,De),St.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&St.setValue(P,"batchingColorTexture",F._colorsTexture,De));const Pn=G.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&Ne.update(F,G,vn),(_n||we.receiveShadow!==F.receiveShadow)&&(we.receiveShadow=F.receiveShadow,St.setValue(P,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(dn.envMap.value=me,dn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(dn.envMapIntensity.value=U.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=wA()),_n&&(St.setValue(P,"toneMappingExposure",E.toneMappingExposure),we.needsLights&&uv(dn,oo),re&&V.fog===!0&&Se.refreshFogUniforms(dn,re),Se.refreshMaterialUniforms(dn,V,$,H,v.state.transmissionRenderTarget[A.id]),wl.upload(P,Oh(we),dn,De)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(wl.upload(P,Oh(we),dn,De),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&St.setValue(P,"center",F.center),St.setValue(P,"modelViewMatrix",F.modelViewMatrix),St.setValue(P,"normalMatrix",F.normalMatrix),St.setValue(P,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Jt=V.uniformsGroups;for(let fn=0,Tc=Jt.length;fn<Tc;fn++){const vr=Jt[fn];de.update(vr,vn),de.bind(vr,vn)}}return vn}function uv(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function dv(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(A,U,G){const V=Ee.get(A);V.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Ee.get(A.texture).__webglTexture=U,Ee.get(A.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){const G=Ee.get(A);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const fv=P.createFramebuffer();this.setRenderTarget=function(A,U=0,G=0){M=A,L=U,C=G;let V=!0,F=null,re=!1,fe=!1;if(A){const me=Ee.get(A);if(me.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(me.__webglFramebuffer===void 0)De.setupRenderTarget(A);else if(me.__hasExternalTextures)De.rebindTextures(A,Ee.get(A.texture).__webglTexture,Ee.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ae=A.depthTexture;if(me.__boundDepthTexture!==Ae){if(Ae!==null&&Ee.has(Ae)&&(A.width!==Ae.image.width||A.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");De.setupDepthRenderbuffer(A)}}const Re=A.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(fe=!0);const Pe=Ee.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?F=Pe[U][G]:F=Pe[U],re=!0):A.samples>0&&De.useMultisampledRTT(A)===!1?F=Ee.get(A).__webglMultisampledFramebuffer:Array.isArray(Pe)?F=Pe[G]:F=Pe,B.copy(A.viewport),Y.copy(A.scissor),W=A.scissorTest}else B.copy(Je).multiplyScalar($).floor(),Y.copy(Qe).multiplyScalar($).floor(),W=rt;if(G!==0&&(F=fv),_e.bindFramebuffer(P.FRAMEBUFFER,F)&&V&&_e.drawBuffers(A,F),_e.viewport(B),_e.scissor(Y),_e.setScissorTest(W),re){const me=Ee.get(A.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,G)}else if(fe){const me=U;for(let Re=0;Re<A.textures.length;Re++){const Pe=Ee.get(A.textures[Re]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Re,Pe.__webglTexture,G,me)}}else if(A!==null&&G!==0){const me=Ee.get(A.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,me.__webglTexture,G)}N=-1},this.readRenderTargetPixels=function(A,U,G,V,F,re,fe,ve=0){if(!(A&&A.isWebGLRenderTarget)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me){_e.bindFramebuffer(P.FRAMEBUFFER,me);try{const Re=A.textures[ve],Pe=Re.format,Ae=Re.type;if(!dt.textureFormatReadable(Pe)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dt.textureTypeReadable(Ae)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-V&&G>=0&&G<=A.height-F&&(A.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ve),P.readPixels(U,G,V,F,Le.convert(Pe),Le.convert(Ae),re))}finally{const Re=M!==null?Ee.get(M).__webglFramebuffer:null;_e.bindFramebuffer(P.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(A,U,G,V,F,re,fe,ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Ee.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me)if(U>=0&&U<=A.width-V&&G>=0&&G<=A.height-F){_e.bindFramebuffer(P.FRAMEBUFFER,me);const Re=A.textures[ve],Pe=Re.format,Ae=Re.type;if(!dt.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dt.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,$e),P.bufferData(P.PIXEL_PACK_BUFFER,re.byteLength,P.STREAM_READ),A.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ve),P.readPixels(U,G,V,F,Le.convert(Pe),Le.convert(Ae),0);const st=M!==null?Ee.get(M).__webglFramebuffer:null;_e.bindFramebuffer(P.FRAMEBUFFER,st);const Ct=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await BS(P,Ct,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,$e),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,re),P.deleteBuffer($e),P.deleteSync(Ct),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,G=0){const V=Math.pow(2,-G),F=Math.floor(A.image.width*V),re=Math.floor(A.image.height*V),fe=U!==null?U.x:0,ve=U!==null?U.y:0;De.setTexture2D(A,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,fe,ve,F,re),_e.unbindTexture()};const hv=P.createFramebuffer(),pv=P.createFramebuffer();this.copyTextureToTexture=function(A,U,G=null,V=null,F=0,re=null){re===null&&(F!==0?(ss("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=F,F=0):re=0);let fe,ve,me,Re,Pe,Ae,$e,st,Ct;const wt=A.isCompressedTexture?A.mipmaps[re]:A.image;if(G!==null)fe=G.max.x-G.min.x,ve=G.max.y-G.min.y,me=G.isBox3?G.max.z-G.min.z:1,Re=G.min.x,Pe=G.min.y,Ae=G.isBox3?G.min.z:0;else{const Pn=Math.pow(2,-F);fe=Math.floor(wt.width*Pn),ve=Math.floor(wt.height*Pn),A.isDataArrayTexture?me=wt.depth:A.isData3DTexture?me=Math.floor(wt.depth*Pn):me=1,Re=0,Pe=0,Ae=0}V!==null?($e=V.x,st=V.y,Ct=V.z):($e=0,st=0,Ct=0);const ut=Le.convert(U.format),we=Le.convert(U.type);let yt;U.isData3DTexture?(De.setTexture3D(U,0),yt=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(De.setTexture2DArray(U,0),yt=P.TEXTURE_2D_ARRAY):(De.setTexture2D(U,0),yt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const tt=P.getParameter(P.UNPACK_ROW_LENGTH),vn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),$r=P.getParameter(P.UNPACK_SKIP_PIXELS),_n=P.getParameter(P.UNPACK_SKIP_ROWS),oo=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,wt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,wt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Re),P.pixelStorei(P.UNPACK_SKIP_ROWS,Pe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ae);const St=A.isDataArrayTexture||A.isData3DTexture,dn=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const Pn=Ee.get(A),Jt=Ee.get(U),fn=Ee.get(Pn.__renderTarget),Tc=Ee.get(Jt.__renderTarget);_e.bindFramebuffer(P.READ_FRAMEBUFFER,fn.__webglFramebuffer),_e.bindFramebuffer(P.DRAW_FRAMEBUFFER,Tc.__webglFramebuffer);for(let vr=0;vr<me;vr++)St&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ee.get(A).__webglTexture,F,Ae+vr),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ee.get(U).__webglTexture,re,Ct+vr)),P.blitFramebuffer(Re,Pe,fe,ve,$e,st,fe,ve,P.DEPTH_BUFFER_BIT,P.NEAREST);_e.bindFramebuffer(P.READ_FRAMEBUFFER,null),_e.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(F!==0||A.isRenderTargetTexture||Ee.has(A)){const Pn=Ee.get(A),Jt=Ee.get(U);_e.bindFramebuffer(P.READ_FRAMEBUFFER,hv),_e.bindFramebuffer(P.DRAW_FRAMEBUFFER,pv);for(let fn=0;fn<me;fn++)St?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pn.__webglTexture,F,Ae+fn):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Pn.__webglTexture,F),dn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Jt.__webglTexture,re,Ct+fn):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Jt.__webglTexture,re),F!==0?P.blitFramebuffer(Re,Pe,fe,ve,$e,st,fe,ve,P.COLOR_BUFFER_BIT,P.NEAREST):dn?P.copyTexSubImage3D(yt,re,$e,st,Ct+fn,Re,Pe,fe,ve):P.copyTexSubImage2D(yt,re,$e,st,Re,Pe,fe,ve);_e.bindFramebuffer(P.READ_FRAMEBUFFER,null),_e.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else dn?A.isDataTexture||A.isData3DTexture?P.texSubImage3D(yt,re,$e,st,Ct,fe,ve,me,ut,we,wt.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(yt,re,$e,st,Ct,fe,ve,me,ut,wt.data):P.texSubImage3D(yt,re,$e,st,Ct,fe,ve,me,ut,we,wt):A.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,re,$e,st,fe,ve,ut,we,wt.data):A.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,re,$e,st,wt.width,wt.height,ut,wt.data):P.texSubImage2D(P.TEXTURE_2D,re,$e,st,fe,ve,ut,we,wt);P.pixelStorei(P.UNPACK_ROW_LENGTH,tt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,$r),P.pixelStorei(P.UNPACK_SKIP_ROWS,_n),P.pixelStorei(P.UNPACK_SKIP_IMAGES,oo),re===0&&U.generateMipmaps&&P.generateMipmap(yt),_e.unbindTexture()},this.initRenderTarget=function(A){Ee.get(A).__webglFramebuffer===void 0&&De.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?De.setTextureCube(A,0):A.isData3DTexture?De.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?De.setTexture2DArray(A,0):De.setTexture2D(A,0),_e.unbindTexture()},this.resetState=function(){L=0,C=0,M=null,_e.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),n.unpackColorSpace=it._getUnpackColorSpace()}}class RA extends Bg{constructor(){super();const e=new ro;e.deleteAttribute("uv");const n=new xf({side:sn}),i=new xf,r=new Xg(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const a=new Ht(e,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const o=new Vg(e,i,6),s=new Zt;s.position.set(-10.906,2.009,1.846),s.rotation.set(0,-.195,0),s.scale.set(2.328,7.905,4.651),s.updateMatrix(),o.setMatrixAt(0,s.matrix),s.position.set(-5.607,-.754,-.758),s.rotation.set(0,.994,0),s.scale.set(1.97,1.534,3.955),s.updateMatrix(),o.setMatrixAt(1,s.matrix),s.position.set(6.167,.857,7.803),s.rotation.set(0,.561,0),s.scale.set(3.927,6.285,3.687),s.updateMatrix(),o.setMatrixAt(2,s.matrix),s.position.set(-2.017,.018,6.124),s.rotation.set(0,.333,0),s.scale.set(2.002,4.566,2.064),s.updateMatrix(),o.setMatrixAt(3,s.matrix),s.position.set(2.291,-.756,-2.621),s.rotation.set(0,-.286,0),s.scale.set(1.546,1.552,1.496),s.updateMatrix(),o.setMatrixAt(4,s.matrix),s.position.set(-2.193,-.369,-5.547),s.rotation.set(0,.516,0),s.scale.set(3.875,3.487,2.986),s.updateMatrix(),o.setMatrixAt(5,s.matrix),this.add(o);const l=new Ht(e,da(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Ht(e,da(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const f=new Ht(e,da(17));f.position.set(14.904,12.198,-1.832),f.scale.set(.15,4.265,6.331),this.add(f);const p=new Ht(e,da(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const h=new Ht(e,da(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const m=new Ht(e,da(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(const n of e)n.dispose()}}function da(t){return new L1({color:0,emissive:16777215,emissiveIntensity:t})}var Gt,Ir,Dr,Qi,za,Ua,Fa,zr,bi,cs,Ze,Qg,Jg,ev,tv,nv,iv,yf,Tl,rv,Sf,av,Mf,Rl,Oa;class NA{constructor(e){en(this,Ze);en(this,Gt);en(this,Ir);en(this,Dr);en(this,Qi);en(this,za);en(this,Ua);en(this,Fa);en(this,zr);en(this,bi);en(this,cs);en(this,Oa);this.size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0},this.render=ke(this,Oa),this.onBeforeRender=n=>{},this.onAfterRender=n=>{},this.onAfterResize=n=>{},tn(this,Dr,!1),tn(this,Qi,!1),this.isDisposed=!1,tn(this,zr,new B1),tn(this,bi,{elapsed:0,delta:0}),tn(this,Oa,()=>{this.renderer.render(this.scene,this.camera)}),tn(this,Gt,{...e}),this.maxPixelRatio=ke(this,Gt).maxPixelRatio||2,this.minPixelRatio=ke(this,Gt).minPixelRatio||1,Mt(this,Ze,Qg).call(this),Mt(this,Ze,Jg).call(this),Mt(this,Ze,ev).call(this),this.resize(),Mt(this,Ze,tv).call(this)}resize(){let e,n;ke(this,Gt).size instanceof Object?(e=ke(this,Gt).size.width,n=ke(this,Gt).size.height):ke(this,Gt).size==="parent"&&this.canvas.parentNode?(e=this.canvas.parentNode.offsetWidth,n=this.canvas.parentNode.offsetHeight):(e=window.innerWidth,n=window.innerHeight),this.size.width=e;const i=Math.abs(n-this.size.height);window.innerWidth<768&&this.size.height>0&&i<this.size.height*.15||(this.size.height=n,this.size.ratio=e/n,Mt(this,Ze,rv).call(this),Mt(this,Ze,av).call(this),this.onAfterResize(this.size))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const e=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(e/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}get postprocessing(){return ke(this,Ir)}set postprocessing(e){tn(this,Ir,e),this.render=e.render.bind(e)}clear(){this.scene.traverse(e=>{e.isMesh&&typeof e.material=="object"&&e.material!==null&&(Object.keys(e.material).forEach(n=>{const i=e.material[n];i!==null&&typeof i=="object"&&typeof i.dispose=="function"&&i.dispose()}),e.material.dispose(),e.geometry.dispose())}),this.scene.clear()}dispose(){var e;Mt(this,Ze,nv).call(this),Mt(this,Ze,Rl).call(this),this.clear(),(e=ke(this,Ir))==null||e.dispose(),this.renderer.dispose(),this.isDisposed=!0}}Gt=new WeakMap,Ir=new WeakMap,Dr=new WeakMap,Qi=new WeakMap,za=new WeakMap,Ua=new WeakMap,Fa=new WeakMap,zr=new WeakMap,bi=new WeakMap,cs=new WeakMap,Ze=new WeakSet,Qg=function(){this.camera=new An,this.cameraFov=this.camera.fov},Jg=function(){this.scene=new Bg},ev=function(){ke(this,Gt).canvas?this.canvas=ke(this,Gt).canvas:ke(this,Gt).id?this.canvas=document.getElementById(ke(this,Gt).id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const e={canvas:this.canvas,powerPreference:"high-performance",...ke(this,Gt).rendererOptions??{}};this.renderer=new TA(e),this.renderer.outputColorSpace=bn},tv=function(){ke(this,Gt).size instanceof Object||(window.addEventListener("resize",Mt(this,Ze,Tl).bind(this)),ke(this,Gt).size==="parent"&&this.canvas.parentNode&&(tn(this,Ua,new ResizeObserver(Mt(this,Ze,Tl).bind(this))),ke(this,Ua).observe(this.canvas.parentNode))),tn(this,za,new IntersectionObserver(Mt(this,Ze,iv).bind(this),{root:null,rootMargin:"0px",threshold:0})),ke(this,za).observe(this.canvas),document.addEventListener("visibilitychange",Mt(this,Ze,yf).bind(this))},nv=function(){var e,n;window.removeEventListener("resize",Mt(this,Ze,Tl).bind(this)),(e=ke(this,Ua))==null||e.disconnect(),(n=ke(this,za))==null||n.disconnect(),document.removeEventListener("visibilitychange",Mt(this,Ze,yf).bind(this))},iv=function(e){tn(this,Dr,e[0].isIntersecting),ke(this,Dr)?Mt(this,Ze,Mf).call(this):Mt(this,Ze,Rl).call(this)},yf=function(){ke(this,Dr)&&(document.hidden?Mt(this,Ze,Rl).call(this):Mt(this,Ze,Mf).call(this))},Tl=function(){ke(this,Fa)&&clearTimeout(ke(this,Fa)),tn(this,Fa,setTimeout(this.resize.bind(this),100))},rv=function(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?Mt(this,Ze,Sf).call(this,this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?Mt(this,Ze,Sf).call(this,this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()},Sf=function(e){const n=Math.tan(mf.degToRad(this.cameraFov/2))/(this.camera.aspect/e);this.camera.fov=2*mf.radToDeg(Math.atan(n))},av=function(){var n;this.renderer.setSize(this.size.width,this.size.height),(n=ke(this,Ir))==null||n.setSize(this.size.width,this.size.height);let e=window.devicePixelRatio;this.maxPixelRatio&&e>this.maxPixelRatio?e=this.maxPixelRatio:this.minPixelRatio&&e<this.minPixelRatio&&(e=this.minPixelRatio),this.renderer.setPixelRatio(e),this.size.pixelRatio=e},Mf=function(){if(ke(this,Qi))return;const e=()=>{tn(this,cs,requestAnimationFrame(e)),ke(this,bi).delta=ke(this,zr).getDelta(),ke(this,bi).elapsed+=ke(this,bi).delta,this.onBeforeRender(ke(this,bi)),ke(this,Oa).call(this),this.onAfterRender(ke(this,bi))};tn(this,Qi,!0),ke(this,zr).start(),e()},Rl=function(){ke(this,Qi)&&(cancelAnimationFrame(ke(this,cs)),tn(this,Qi,!1),ke(this,zr).stop())},Oa=new WeakMap;const ci=new Map,ti=new He;let Lu=!1;function PA(t){const e={position:new He,nPosition:new He,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...t};return function(n,i){ci.has(n)||(ci.set(n,i),Lu||(document.body.addEventListener("pointermove",e0,{passive:!0}),document.body.addEventListener("pointerleave",n0,{passive:!0}),document.body.addEventListener("click",t0,{passive:!0}),document.body.addEventListener("touchstart",i0,{passive:!0}),document.body.addEventListener("touchmove",r0,{passive:!0}),document.body.addEventListener("touchend",sl,{passive:!0}),document.body.addEventListener("touchcancel",sl,{passive:!0}),Lu=!0))}(t.domElement,e),e.dispose=()=>{const n=t.domElement;ci.delete(n),ci.size===0&&(document.body.removeEventListener("pointermove",e0),document.body.removeEventListener("pointerleave",n0),document.body.removeEventListener("click",t0),document.body.removeEventListener("touchstart",i0),document.body.removeEventListener("touchmove",r0),document.body.removeEventListener("touchend",sl),document.body.removeEventListener("touchcancel",sl),Lu=!1)},e}function e0(t){ti.x=t.clientX,ti.y=t.clientY,LA()}function LA(){for(const[t,e]of ci){const n=t.getBoundingClientRect();Cc(n)?(Ec(e,n),e.hover||(e.hover=!0,e.onEnter(e)),e.onMove(e)):e.hover&&!e.touching&&(e.hover=!1,e.onLeave(e))}}function t0(t){ti.x=t.clientX,ti.y=t.clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();Ec(n,i),Cc(i)&&n.onClick(n)}}function n0(){for(const t of ci.values())t.hover&&(t.hover=!1,t.onLeave(t))}function i0(t){if(t.touches.length>0){ti.x=t.touches[0].clientX,ti.y=t.touches[0].clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();Cc(i)&&(n.touching=!0,Ec(n,i),n.hover||(n.hover=!0,n.onEnter(n)),n.onMove(n))}}}function r0(t){if(t.touches.length>0){ti.x=t.touches[0].clientX,ti.y=t.touches[0].clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();Ec(n,i),Cc(i)?(n.hover||(n.hover=!0,n.touching=!0,n.onEnter(n)),n.onMove(n)):n.hover&&n.touching&&n.onMove(n)}}}function sl(){for(const[,t]of ci)t.touching&&(t.touching=!1,t.hover&&(t.hover=!1,t.onLeave(t)))}function Ec(t,e){const{position:n,nPosition:i}=t;n.x=ti.x-e.left,n.y=ti.y-e.top,i.x=n.x/e.width*2-1,i.y=-n.y/e.height*2+1}function Cc(t){const{x:e,y:n}=ti,{left:i,top:r,width:a,height:o}=t;return e>=i&&e<=i+a&&n>=r&&n<=r+o}const{randFloat:Iu}=mf,Du=new O,qe=new O,ll=new O,IA=new O,nt=new O,cl=new O,fa=new O,Wi=new O,ul=new O,a0=new O;var ic,ov;class DA{constructor(e){en(this,ic);this.center=new O,this.config=e,this.positionData=new Float32Array(3*e.count).fill(0),this.velocityData=new Float32Array(3*e.count).fill(0),this.sizeData=new Float32Array(e.count).fill(1),Mt(this,ic,ov).call(this),this.setSizes(),this.setInitialVelocities()}setSizes(){const{config:e,sizeData:n}=this;n[0]=e.size0;for(let i=1;i<e.count;i++)n[i]=Iu(e.minSize,e.maxSize)}setInitialVelocities(){const{velocityData:e,config:n}=this;for(let i=0;i<n.count;i++){const r=3*i;e[r]=Iu(-.2,.2),e[r+1]=Iu(-.2,.2),e[r+2]=0}}update(e){const{config:n,center:i,positionData:r,sizeData:a,velocityData:o}=this;let s=0;n.controlSphere0&&(s=1,Du.fromArray(r,0),Du.lerp(i,.1).toArray(r,0),IA.set(0,0,0).toArray(o,0));for(let l=s;l<n.count;l++){const c=3*l;if(qe.fromArray(r,c),nt.fromArray(o,c),n.gravity===0){const p=.04+.02*a[l];nt.x+=p*Math.sin((qe.y+e.elapsed)*.15),nt.y+=p*Math.cos((qe.x+e.elapsed)*.15)}else nt.y-=e.delta*n.gravity*a[l];nt.multiplyScalar(n.friction),nt.clampLength(0,n.maxVelocity),qe.add(nt),qe.toArray(r,c),nt.toArray(o,c)}for(let l=s;l<n.count;l++){const c=3*l;qe.fromArray(r,c),nt.fromArray(o,c);const f=a[l];for(let h=l+1;h<n.count;h++){const m=3*h;ll.fromArray(r,m),cl.fromArray(o,m);const _=a[h];fa.copy(ll).sub(qe);const y=fa.length(),x=f+_;if(y<x){const u=x-y;Wi.copy(fa).normalize().multiplyScalar(.5*u),ul.copy(Wi).multiplyScalar(Math.max(nt.length(),1)),a0.copy(Wi).multiplyScalar(Math.max(cl.length(),1)),qe.sub(Wi),nt.sub(ul),qe.toArray(r,c),nt.toArray(o,c),ll.add(Wi),cl.add(a0),ll.toArray(r,m),cl.toArray(o,m)}}if(n.controlSphere0){fa.copy(Du).sub(qe);const h=fa.length(),m=f+a[0];if(h<m){const _=m-h;Wi.copy(fa.normalize()).multiplyScalar(_),ul.copy(Wi).multiplyScalar(Math.max(nt.length(),2)),qe.sub(Wi),nt.sub(ul)}}Math.abs(qe.x)+f>n.maxX&&(qe.x=Math.sign(qe.x)*(n.maxX-f),nt.x=-nt.x*n.wallBounce),n.gravity===0?Math.abs(qe.y)+f>n.maxY&&(qe.y=Math.sign(qe.y)*(n.maxY-f),nt.y=-nt.y*n.wallBounce):qe.y-f<-n.maxY&&(qe.y=-n.maxY+f,nt.y=-nt.y*n.wallBounce);const p=Math.max(n.maxZ,n.maxSize);if(Math.abs(qe.z)+f>p&&(qe.z=Math.sign(qe.z)*(n.maxZ-f),nt.z=-nt.z*n.wallBounce),qe.toArray(r,c),nt.toArray(o,c),Array.isArray(n.obstacles))for(const h of n.obstacles){const m=qe.x>h.minX+f&&qe.x<h.maxX-f,_=qe.y>h.minY+f&&qe.y<h.maxY-f;if(m&&_){const y=Math.abs(qe.x-(h.minX+f)),x=Math.abs(h.maxX-f-qe.x),u=Math.abs(qe.y-(h.minY+f)),g=Math.abs(h.maxY-f-qe.y),v=Math.min(y,x,u,g);v===y?(qe.x=h.minX+f,nt.x=Math.abs(nt.x)*n.wallBounce):v===x?(qe.x=h.maxX-f,nt.x=-Math.abs(nt.x)*n.wallBounce):v===u?(qe.y=h.minY+f,nt.y=Math.abs(nt.y)*n.wallBounce):(qe.y=h.maxY-f,nt.y=-Math.abs(nt.y)*n.wallBounce),qe.toArray(r,c),nt.toArray(o,c)}}}}}ic=new WeakSet,ov=function(){const{config:e,positionData:n}=this;for(let i=0;i<e.count;i++){const r=3*i,a=(Math.random()*2-1)*(e.maxX*.95),o=(Math.random()*2-1)*(e.maxY*.95),s=(Math.random()*2-1)*(Math.max(e.maxZ,e.maxSize)*.3);n[r]=a,n[r+1]=o,n[r+2]=s}};class zA extends P1{constructor(e){super(e),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=n=>{Object.assign(n.uniforms,this.uniforms),n.fragmentShader=`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      `+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("void main() {",`
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
      `);const i=Fe.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);n.fragmentShader=n.fragmentShader.replace("#include <lights_fragment_begin>",i),this.onBeforeCompile2&&this.onBeforeCompile2(n)}}}const UA={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},ha=new Zt;var rc,sv;class FA extends Vg{constructor(n,i={}){const r={...UA,...i},a=new RA,o=new vf(n,.04).fromScene(a).texture,s=new Lh,l=new zA({envMap:o,...r.materialParams});l.envMapRotation.x=-Math.PI/2;super(s,l,r.count);en(this,rc);this.config=r,this.physics=new DA(r),Mt(this,rc,sv).call(this),this.setColors(r.colors)}setColors(n){if(Array.isArray(n)&&n.length>1){const i=function(r){let a,o;function s(l){a=l,o=[],a.forEach(c=>{o.push(new Be(c))})}return s(r),{setColors:s,getColorAt:function(l,c=new Be){const f=Math.max(0,Math.min(1,l))*(a.length-1),p=Math.floor(f),h=o[p];if(p>=a.length-1)return h.clone();const m=f-p,_=o[p+1];return c.r=h.r+m*(_.r-h.r),c.g=h.g+m*(_.g-h.g),c.b=h.b+m*(_.b-h.b),c}}}(n);for(let r=0;r<this.count;r++)this.setColorAt(r,i.getColorAt(r/this.count)),r===0&&this.light.color.copy(i.getColorAt(r/this.count));this.instanceColor.needsUpdate=!0}}update(n){this.physics.update(n);for(let i=0;i<this.count;i++)ha.position.fromArray(this.physics.positionData,3*i),i===0&&this.config.followCursor===!1?ha.scale.setScalar(0):ha.scale.setScalar(this.physics.sizeData[i]),ha.updateMatrix(),this.setMatrixAt(i,ha.matrix),i===0&&this.light.position.copy(ha.position);this.instanceMatrix.needsUpdate=!0}}rc=new WeakSet,sv=function(){this.ambientLight=new O1(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new Xg(this.config.colors[0],this.config.lightIntensity),this.add(this.light)};function OA(t,e={}){const n=new NA({canvas:t,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let i;n.renderer.toneMapping=Sg,n.camera.position.set(0,0,20),n.camera.lookAt(0,0,0),n.cameraMaxAspect=1.5,n.resize(),c(e);const r=new G1,a=new $i(new O(0,0,1),0),o=new O;let s=!1,l=null;e.followCursor&&(l=PA({domElement:t,onMove(){r.setFromCamera(l.nPosition,n.camera),n.camera.getWorldDirection(a.normal),r.ray.intersectPlane(a,o),i.physics.center.copy(o),i.config.controlSphere0=!0},onLeave(){i.config.controlSphere0=!1}}));function c(f){i&&(n.clear(),n.scene.remove(i));const{wWidth:p,wHeight:h}=n.size,m={maxX:p/2,maxY:h,...f};i=new FA(n.renderer,m),n.scene.add(i)}return n.onBeforeRender=f=>{s||i.update(f)},n.onAfterResize=f=>{i.config.maxX=f.wWidth,i.config.maxY=f.wHeight*1.5},{three:n,get spheres(){return i},setCount(f){c({...i.config,count:f})},togglePause(){s=!s},dispose(){l&&typeof l.dispose=="function"&&l.dispose(),n.dispose()}}}const kA=({className:t="",followCursor:e=!0,obstacleSelectors:n=[],...i})=>{const r=Ke.useRef(null),a=Ke.useRef(null),o=Ke.useRef([]),s=()=>{var x,u;const l=r.current,c=a.current;if(!l||!c)return;if(!n||n.length===0){o.current=[],(x=c.spheres)!=null&&x.config&&(c.spheres.config.obstacles=[]);return}const f=l.getBoundingClientRect(),{maxX:p,maxY:h}=c.spheres.config,m=2*p/f.width,_=2*h/f.height,y=[];n.forEach(g=>{document.querySelectorAll(g).forEach(v=>{const b=v.getBoundingClientRect(),T=Math.max(0,b.left-f.left),E=Math.min(f.width,b.right-f.left),w=Math.max(0,b.top-f.top),L=Math.min(f.height,b.bottom-f.top);if(E>T&&L>w){const C=(T-f.width/2)*m,M=(E-f.width/2)*m,N=f.height/2-w,z=f.height/2-L,B=N*_,Y=z*_;y.push({minX:C,maxX:M,minY:Y,maxY:B})}})}),o.current=y,(u=c.spheres)!=null&&u.config&&(c.spheres.config.obstacles=y)};return Ke.useEffect(()=>{const l=r.current;if(!l)return;a.current=OA(l,{followCursor:e,...i});const c=new ResizeObserver(()=>s());c.observe(l);const f=()=>s();return window.addEventListener("resize",f),()=>{a.current&&a.current.dispose(),c.disconnect(),window.removeEventListener("resize",f)}},[]),d.jsx("canvas",{className:t,ref:r,style:{width:"100%",height:"100%",pointerEvents:"none"}})},BA={home:_g,servizi:Wy,chiSiamo:Xy,contatti:Yy,documentation:Ky,terms:Zy,privacy:Qy};function GA(){const[t,e]=Ke.useState("home"),[n,i]=Ke.useState(!1),[r,a]=Ke.useState(null),[o,s]=Ke.useState(56),[l,c]=Ke.useState(96),f=Ke.useMemo(()=>BA[t]??_g,[t]);return Ke.useEffect(()=>{function p(){const x=document.getElementById("site-header"),u=document.getElementById("site-footer");x&&s(x.getBoundingClientRect().height||56),u&&c(u.getBoundingClientRect().height||96)}p();const h=new ResizeObserver(p),m=new ResizeObserver(p),_=document.getElementById("site-header"),y=document.getElementById("site-footer");return _&&h.observe(_),y&&m.observe(y),window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p),h.disconnect(),m.disconnect()}},[]),d.jsxs("div",{className:"relative min-h-screen overflow-x-hidden",children:[d.jsx("div",{className:"fixed inset-0 -z-10 overflow-hidden pointer-events-none",style:{willChange:"transform",background:window.innerWidth<768?"radial-gradient(circle at 10% 10%, rgba(168, 85, 247, 0.2) 0%, transparent 40%), radial-gradient(circle at 90% 30%, rgba(37, 99, 235, 0.2) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), #060b14":"transparent"},children:window.innerWidth>=768&&d.jsxs(d.Fragment,{children:[d.jsx("div",{className:"bg-blob top-[-20%] left-[-15%] w-[500px] h-[500px] bg-primary/20"}),d.jsx("div",{className:"bg-blob bottom-[-10%] right-[-15%] w-[600px] h-[600px] bg-accent/10"}),t==="home"&&d.jsx("div",{style:{position:"absolute",inset:0},children:d.jsx(kA,{count:100,gravity:0,friction:.98,wallBounce:.99,followCursor:!1,colors:[3833343,1096065,16643558],minSize:.5,maxSize:1.2,size0:.8,ambientIntensity:1.2,lightIntensity:450,maxPixelRatio:2})})]})}),d.jsx(Vy,{current:t,onNavigate:e,onOpenChat:()=>i(!0)}),d.jsx("main",{className:"relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 md:py-12",children:d.jsx(f,{onOpenChat:()=>i(!0),onOpenWorkflow:p=>a(p),onNavigate:e})}),d.jsx(Hy,{onNavigate:e}),d.jsx($y,{open:n,onClose:()=>i(!1),onOpen:()=>i(!0)}),r&&d.jsx(qy,{workflow:r,onClose:()=>a(null)})]})}const VA=document.getElementById("root"),HA=vg(VA);HA.render(d.jsx(GA,{}));
