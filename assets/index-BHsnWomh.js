var Bh=t=>{throw TypeError(t)};var Rc=(t,e,n)=>e.has(t)||Bh("Cannot "+n);var Ke=(t,e,n)=>(Rc(t,e,"read from private field"),n?n.call(t):e.get(t)),Jt=(t,e,n)=>e.has(t)?Bh("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),en=(t,e,n,i)=>(Rc(t,e,"write to private field"),i?i.call(t,n):e.set(t,n),n),Mt=(t,e,n)=>(Rc(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();var o0={exports:{}},ac={},s0={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var us=Symbol.for("react.element"),mv=Symbol.for("react.portal"),xv=Symbol.for("react.fragment"),gv=Symbol.for("react.strict_mode"),vv=Symbol.for("react.profiler"),_v=Symbol.for("react.provider"),yv=Symbol.for("react.context"),Sv=Symbol.for("react.forward_ref"),Mv=Symbol.for("react.suspense"),Ev=Symbol.for("react.memo"),Av=Symbol.for("react.lazy"),Gh=Symbol.iterator;function bv(t){return t===null||typeof t!="object"?null:(t=Gh&&t[Gh]||t["@@iterator"],typeof t=="function"?t:null)}var l0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},c0=Object.assign,u0={};function Za(t,e,n){this.props=t,this.context=e,this.refs=u0,this.updater=n||l0}Za.prototype.isReactComponent={};Za.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Za.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function d0(){}d0.prototype=Za.prototype;function Ef(t,e,n){this.props=t,this.context=e,this.refs=u0,this.updater=n||l0}var Af=Ef.prototype=new d0;Af.constructor=Ef;c0(Af,Za.prototype);Af.isPureReactComponent=!0;var Vh=Array.isArray,f0=Object.prototype.hasOwnProperty,bf={current:null},h0={key:!0,ref:!0,__self:!0,__source:!0};function p0(t,e,n){var i,r={},a=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(a=""+e.key),e)f0.call(e,i)&&!h0.hasOwnProperty(i)&&(r[i]=e[i]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in s=t.defaultProps,s)r[i]===void 0&&(r[i]=s[i]);return{$$typeof:us,type:t,key:a,ref:o,props:r,_owner:bf.current}}function Cv(t,e){return{$$typeof:us,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Cf(t){return typeof t=="object"&&t!==null&&t.$$typeof===us}function Tv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Hh=/\/+/g;function Pc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Tv(""+t.key):e.toString(36)}function dl(t,e,n,i,r){var a=typeof t;(a==="undefined"||a==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case us:case mv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Pc(o,0):i,Vh(r)?(n="",t!=null&&(n=t.replace(Hh,"$&/")+"/"),dl(r,e,n,"",function(c){return c})):r!=null&&(Cf(r)&&(r=Cv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Hh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Vh(t))for(var s=0;s<t.length;s++){a=t[s];var l=i+Pc(a,s);o+=dl(a,e,n,l,r)}else if(l=bv(t),typeof l=="function")for(t=l.call(t),s=0;!(a=t.next()).done;)a=a.value,l=i+Pc(a,s++),o+=dl(a,e,n,l,r);else if(a==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function _s(t,e,n){if(t==null)return t;var i=[],r=0;return dl(t,i,"","",function(a){return e.call(n,a,r++)}),i}function wv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var cn={current:null},fl={transition:null},Rv={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:fl,ReactCurrentOwner:bf};function m0(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:_s,forEach:function(t,e,n){_s(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return _s(t,function(){e++}),e},toArray:function(t){return _s(t,function(e){return e})||[]},only:function(t){if(!Cf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};je.Component=Za;je.Fragment=xv;je.Profiler=vv;je.PureComponent=Ef;je.StrictMode=gv;je.Suspense=Mv;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rv;je.act=m0;je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=c0({},t.props),r=t.key,a=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(a=e.ref,o=bf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var s=t.type.defaultProps;for(l in e)f0.call(e,l)&&!h0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&s!==void 0?s[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}return{$$typeof:us,type:t.type,key:r,ref:a,props:i,_owner:o}};je.createContext=function(t){return t={$$typeof:yv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:_v,_context:t},t.Consumer=t};je.createElement=p0;je.createFactory=function(t){var e=p0.bind(null,t);return e.type=t,e};je.createRef=function(){return{current:null}};je.forwardRef=function(t){return{$$typeof:Sv,render:t}};je.isValidElement=Cf;je.lazy=function(t){return{$$typeof:Av,_payload:{_status:-1,_result:t},_init:wv}};je.memo=function(t,e){return{$$typeof:Ev,type:t,compare:e===void 0?null:e}};je.startTransition=function(t){var e=fl.transition;fl.transition={};try{t()}finally{fl.transition=e}};je.unstable_act=m0;je.useCallback=function(t,e){return cn.current.useCallback(t,e)};je.useContext=function(t){return cn.current.useContext(t)};je.useDebugValue=function(){};je.useDeferredValue=function(t){return cn.current.useDeferredValue(t)};je.useEffect=function(t,e){return cn.current.useEffect(t,e)};je.useId=function(){return cn.current.useId()};je.useImperativeHandle=function(t,e,n){return cn.current.useImperativeHandle(t,e,n)};je.useInsertionEffect=function(t,e){return cn.current.useInsertionEffect(t,e)};je.useLayoutEffect=function(t,e){return cn.current.useLayoutEffect(t,e)};je.useMemo=function(t,e){return cn.current.useMemo(t,e)};je.useReducer=function(t,e,n){return cn.current.useReducer(t,e,n)};je.useRef=function(t){return cn.current.useRef(t)};je.useState=function(t){return cn.current.useState(t)};je.useSyncExternalStore=function(t,e,n){return cn.current.useSyncExternalStore(t,e,n)};je.useTransition=function(){return cn.current.useTransition()};je.version="18.3.1";s0.exports=je;var Qe=s0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pv=Qe,Lv=Symbol.for("react.element"),Nv=Symbol.for("react.fragment"),Iv=Object.prototype.hasOwnProperty,Dv=Pv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zv={key:!0,ref:!0,__self:!0,__source:!0};function x0(t,e,n){var i,r={},a=null,o=null;n!==void 0&&(a=""+n),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Iv.call(e,i)&&!zv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Lv,type:t,key:a,ref:o,props:r,_owner:Dv.current}}ac.Fragment=Nv;ac.jsx=x0;ac.jsxs=x0;o0.exports=ac;var m=o0.exports,g0={exports:{}},Rn={},v0={exports:{}},_0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,W){var Y=D.length;D.push(W);e:for(;0<Y;){var ne=Y-1>>>1,_e=D[ne];if(0<r(_e,W))D[ne]=W,D[Y]=_e,Y=ne;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var W=D[0],Y=D.pop();if(Y!==W){D[0]=Y;e:for(var ne=0,_e=D.length,Be=_e>>>1;ne<Be;){var Ue=2*(ne+1)-1,rt=D[Ue],q=Ue+1,J=D[q];if(0>r(rt,Y))q<_e&&0>r(J,rt)?(D[ne]=J,D[q]=Y,ne=q):(D[ne]=rt,D[Ue]=Y,ne=Ue);else if(q<_e&&0>r(J,Y))D[ne]=J,D[q]=Y,ne=q;else break e}}return W}function r(D,W){var Y=D.sortIndex-W.sortIndex;return Y!==0?Y:D.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;t.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var l=[],c=[],d=1,h=null,f=3,p=!1,_=!1,y=!1,x=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(D){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=D)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function E(D){if(y=!1,v(D),!_)if(n(l)!==null)_=!0,H(w);else{var W=n(c);W!==null&&K(E,W.startTime-D)}}function w(D,W){_=!1,y&&(y=!1,u(P),P=-1),p=!0;var Y=f;try{for(v(W),h=n(l);h!==null&&(!(h.expirationTime>W)||D&&!N());){var ne=h.callback;if(typeof ne=="function"){h.callback=null,f=h.priorityLevel;var _e=ne(h.expirationTime<=W);W=t.unstable_now(),typeof _e=="function"?h.callback=_e:h===n(l)&&i(l),v(W)}else i(l);h=n(l)}if(h!==null)var Be=!0;else{var Ue=n(c);Ue!==null&&K(E,Ue.startTime-W),Be=!1}return Be}finally{h=null,f=Y,p=!1}}var b=!1,T=null,P=-1,C=5,M=-1;function N(){return!(t.unstable_now()-M<C)}function z(){if(T!==null){var D=t.unstable_now();M=D;var W=!0;try{W=T(!0,D)}finally{W?B():(b=!1,T=null)}}else b=!1}var B;if(typeof g=="function")B=function(){g(z)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,X=$.port2;$.port1.onmessage=z,B=function(){X.postMessage(null)}}else B=function(){x(z,0)};function H(D){T=D,b||(b=!0,B())}function K(D,W){P=x(function(){D(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,H(w))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(f){case 1:case 2:case 3:var W=3;break;default:W=f}var Y=f;f=W;try{return D()}finally{f=Y}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,W){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var Y=f;f=D;try{return W()}finally{f=Y}},t.unstable_scheduleCallback=function(D,W,Y){var ne=t.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?ne+Y:ne):Y=ne,D){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=Y+_e,D={id:d++,callback:W,priorityLevel:D,startTime:Y,expirationTime:_e,sortIndex:-1},Y>ne?(D.sortIndex=Y,e(c,D),n(l)===null&&D===n(c)&&(y?(u(P),P=-1):y=!0,K(E,Y-ne))):(D.sortIndex=_e,e(l,D),_||p||(_=!0,H(w))),D},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(D){var W=f;return function(){var Y=f;f=W;try{return D.apply(this,arguments)}finally{f=Y}}}})(_0);v0.exports=_0;var Uv=v0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fv=Qe,wn=Uv;function ie(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var y0=new Set,Bo={};function jr(t,e){ka(t,e),ka(t+"Capture",e)}function ka(t,e){for(Bo[t]=e,t=0;t<e.length;t++)y0.add(e[t])}var Li=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=Object.prototype.hasOwnProperty,Ov=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Wh={},jh={};function kv(t){return zu.call(jh,t)?!0:zu.call(Wh,t)?!1:Ov.test(t)?jh[t]=!0:(Wh[t]=!0,!1)}function Bv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Gv(t,e,n,i){if(e===null||typeof e>"u"||Bv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function un(t,e,n,i,r,a,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=a,this.removeEmptyString=o}var Wt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Wt[t]=new un(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Wt[e]=new un(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Wt[t]=new un(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Wt[t]=new un(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Wt[t]=new un(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Wt[t]=new un(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Wt[t]=new un(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Wt[t]=new un(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Wt[t]=new un(t,5,!1,t.toLowerCase(),null,!1,!1)});var Tf=/[\-:]([a-z])/g;function wf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Tf,wf);Wt[e]=new un(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Tf,wf);Wt[e]=new un(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Tf,wf);Wt[e]=new un(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Wt[t]=new un(t,1,!1,t.toLowerCase(),null,!1,!1)});Wt.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Wt[t]=new un(t,1,!1,t.toLowerCase(),null,!0,!0)});function Rf(t,e,n,i){var r=Wt.hasOwnProperty(e)?Wt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Gv(e,n,r,i)&&(n=null),i||r===null?kv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ui=Fv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ys=Symbol.for("react.element"),ma=Symbol.for("react.portal"),xa=Symbol.for("react.fragment"),Pf=Symbol.for("react.strict_mode"),Uu=Symbol.for("react.profiler"),S0=Symbol.for("react.provider"),M0=Symbol.for("react.context"),Lf=Symbol.for("react.forward_ref"),Fu=Symbol.for("react.suspense"),Ou=Symbol.for("react.suspense_list"),Nf=Symbol.for("react.memo"),Xi=Symbol.for("react.lazy"),E0=Symbol.for("react.offscreen"),Xh=Symbol.iterator;function so(t){return t===null||typeof t!="object"?null:(t=Xh&&t[Xh]||t["@@iterator"],typeof t=="function"?t:null)}var bt=Object.assign,Lc;function Ao(t){if(Lc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Lc=e&&e[1]||""}return`
`+Lc+t}var Nc=!1;function Ic(t,e){if(!t||Nc)return"";Nc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),a=i.stack.split(`
`),o=r.length-1,s=a.length-1;1<=o&&0<=s&&r[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(r[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||r[o]!==a[s]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=s);break}}}finally{Nc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ao(t):""}function Vv(t){switch(t.tag){case 5:return Ao(t.type);case 16:return Ao("Lazy");case 13:return Ao("Suspense");case 19:return Ao("SuspenseList");case 0:case 2:case 15:return t=Ic(t.type,!1),t;case 11:return t=Ic(t.type.render,!1),t;case 1:return t=Ic(t.type,!0),t;default:return""}}function ku(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case xa:return"Fragment";case ma:return"Portal";case Uu:return"Profiler";case Pf:return"StrictMode";case Fu:return"Suspense";case Ou:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case M0:return(t.displayName||"Context")+".Consumer";case S0:return(t._context.displayName||"Context")+".Provider";case Lf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nf:return e=t.displayName||null,e!==null?e:ku(t.type)||"Memo";case Xi:e=t._payload,t=t._init;try{return ku(t(e))}catch{}}return null}function Hv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ku(e);case 8:return e===Pf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function dr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function A0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Wv(t){var e=A0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,a=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,a.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ss(t){t._valueTracker||(t._valueTracker=Wv(t))}function b0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=A0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Pl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Bu(t,e){var n=e.checked;return bt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Yh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=dr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function C0(t,e){e=e.checked,e!=null&&Rf(t,"checked",e,!1)}function Gu(t,e){C0(t,e);var n=dr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Vu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Vu(t,e.type,dr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function qh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Vu(t,e,n){(e!=="number"||Pl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var bo=Array.isArray;function Ta(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+dr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Hu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return bt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function $h(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ie(92));if(bo(n)){if(1<n.length)throw Error(ie(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:dr(n)}}function T0(t,e){var n=dr(e.value),i=dr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Kh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function w0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?w0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ms,R0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ms=Ms||document.createElement("div"),Ms.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ms.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Go(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ro={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},jv=["Webkit","ms","Moz","O"];Object.keys(Ro).forEach(function(t){jv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ro[e]=Ro[t]})});function P0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ro.hasOwnProperty(t)&&Ro[t]?(""+e).trim():e+"px"}function L0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=P0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Xv=bt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ju(t,e){if(e){if(Xv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function Xu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yu=null;function If(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var qu=null,wa=null,Ra=null;function Zh(t){if(t=hs(t)){if(typeof qu!="function")throw Error(ie(280));var e=t.stateNode;e&&(e=uc(e),qu(t.stateNode,t.type,e))}}function N0(t){wa?Ra?Ra.push(t):Ra=[t]:wa=t}function I0(){if(wa){var t=wa,e=Ra;if(Ra=wa=null,Zh(t),e)for(t=0;t<e.length;t++)Zh(e[t])}}function D0(t,e){return t(e)}function z0(){}var Dc=!1;function U0(t,e,n){if(Dc)return t(e,n);Dc=!0;try{return D0(t,e,n)}finally{Dc=!1,(wa!==null||Ra!==null)&&(z0(),I0())}}function Vo(t,e){var n=t.stateNode;if(n===null)return null;var i=uc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ie(231,e,typeof n));return n}var $u=!1;if(Li)try{var lo={};Object.defineProperty(lo,"passive",{get:function(){$u=!0}}),window.addEventListener("test",lo,lo),window.removeEventListener("test",lo,lo)}catch{$u=!1}function Yv(t,e,n,i,r,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Po=!1,Ll=null,Nl=!1,Ku=null,qv={onError:function(t){Po=!0,Ll=t}};function $v(t,e,n,i,r,a,o,s,l){Po=!1,Ll=null,Yv.apply(qv,arguments)}function Kv(t,e,n,i,r,a,o,s,l){if($v.apply(this,arguments),Po){if(Po){var c=Ll;Po=!1,Ll=null}else throw Error(ie(198));Nl||(Nl=!0,Ku=c)}}function Xr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function F0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Qh(t){if(Xr(t)!==t)throw Error(ie(188))}function Zv(t){var e=t.alternate;if(!e){if(e=Xr(t),e===null)throw Error(ie(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var a=r.alternate;if(a===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===a.child){for(a=r.child;a;){if(a===n)return Qh(r),t;if(a===i)return Qh(r),e;a=a.sibling}throw Error(ie(188))}if(n.return!==i.return)n=r,i=a;else{for(var o=!1,s=r.child;s;){if(s===n){o=!0,n=r,i=a;break}if(s===i){o=!0,i=r,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,i=r;break}if(s===i){o=!0,i=a,n=r;break}s=s.sibling}if(!o)throw Error(ie(189))}}if(n.alternate!==i)throw Error(ie(190))}if(n.tag!==3)throw Error(ie(188));return n.stateNode.current===n?t:e}function O0(t){return t=Zv(t),t!==null?k0(t):null}function k0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=k0(t);if(e!==null)return e;t=t.sibling}return null}var B0=wn.unstable_scheduleCallback,Jh=wn.unstable_cancelCallback,Qv=wn.unstable_shouldYield,Jv=wn.unstable_requestPaint,Pt=wn.unstable_now,e_=wn.unstable_getCurrentPriorityLevel,Df=wn.unstable_ImmediatePriority,G0=wn.unstable_UserBlockingPriority,Il=wn.unstable_NormalPriority,t_=wn.unstable_LowPriority,V0=wn.unstable_IdlePriority,oc=null,ui=null;function n_(t){if(ui&&typeof ui.onCommitFiberRoot=="function")try{ui.onCommitFiberRoot(oc,t,void 0,(t.current.flags&128)===128)}catch{}}var Kn=Math.clz32?Math.clz32:a_,i_=Math.log,r_=Math.LN2;function a_(t){return t>>>=0,t===0?32:31-(i_(t)/r_|0)|0}var Es=64,As=4194304;function Co(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Dl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,a=t.pingedLanes,o=n&268435455;if(o!==0){var s=o&~r;s!==0?i=Co(s):(a&=o,a!==0&&(i=Co(a)))}else o=n&~r,o!==0?i=Co(o):a!==0&&(i=Co(a));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,a=e&-e,r>=a||r===16&&(a&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Kn(e),r=1<<n,i|=t[n],e&=~r;return i}function o_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function s_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,a=t.pendingLanes;0<a;){var o=31-Kn(a),s=1<<o,l=r[o];l===-1?(!(s&n)||s&i)&&(r[o]=o_(s,e)):l<=e&&(t.expiredLanes|=s),a&=~s}}function Zu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function H0(){var t=Es;return Es<<=1,!(Es&4194240)&&(Es=64),t}function zc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ds(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Kn(e),t[e]=n}function l_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Kn(n),a=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~a}}function zf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var at=0;function W0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var j0,Uf,X0,Y0,q0,Qu=!1,bs=[],nr=null,ir=null,rr=null,Ho=new Map,Wo=new Map,$i=[],c_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ep(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":Ho.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wo.delete(e.pointerId)}}function co(t,e,n,i,r,a){return t===null||t.nativeEvent!==a?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[r]},e!==null&&(e=hs(e),e!==null&&Uf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function u_(t,e,n,i,r){switch(e){case"focusin":return nr=co(nr,t,e,n,i,r),!0;case"dragenter":return ir=co(ir,t,e,n,i,r),!0;case"mouseover":return rr=co(rr,t,e,n,i,r),!0;case"pointerover":var a=r.pointerId;return Ho.set(a,co(Ho.get(a)||null,t,e,n,i,r)),!0;case"gotpointercapture":return a=r.pointerId,Wo.set(a,co(Wo.get(a)||null,t,e,n,i,r)),!0}return!1}function $0(t){var e=Rr(t.target);if(e!==null){var n=Xr(e);if(n!==null){if(e=n.tag,e===13){if(e=F0(n),e!==null){t.blockedOn=e,q0(t.priority,function(){X0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ju(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Yu=i,n.target.dispatchEvent(i),Yu=null}else return e=hs(n),e!==null&&Uf(e),t.blockedOn=n,!1;e.shift()}return!0}function tp(t,e,n){hl(t)&&n.delete(e)}function d_(){Qu=!1,nr!==null&&hl(nr)&&(nr=null),ir!==null&&hl(ir)&&(ir=null),rr!==null&&hl(rr)&&(rr=null),Ho.forEach(tp),Wo.forEach(tp)}function uo(t,e){t.blockedOn===e&&(t.blockedOn=null,Qu||(Qu=!0,wn.unstable_scheduleCallback(wn.unstable_NormalPriority,d_)))}function jo(t){function e(r){return uo(r,t)}if(0<bs.length){uo(bs[0],t);for(var n=1;n<bs.length;n++){var i=bs[n];i.blockedOn===t&&(i.blockedOn=null)}}for(nr!==null&&uo(nr,t),ir!==null&&uo(ir,t),rr!==null&&uo(rr,t),Ho.forEach(e),Wo.forEach(e),n=0;n<$i.length;n++)i=$i[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<$i.length&&(n=$i[0],n.blockedOn===null);)$0(n),n.blockedOn===null&&$i.shift()}var Pa=Ui.ReactCurrentBatchConfig,zl=!0;function f_(t,e,n,i){var r=at,a=Pa.transition;Pa.transition=null;try{at=1,Ff(t,e,n,i)}finally{at=r,Pa.transition=a}}function h_(t,e,n,i){var r=at,a=Pa.transition;Pa.transition=null;try{at=4,Ff(t,e,n,i)}finally{at=r,Pa.transition=a}}function Ff(t,e,n,i){if(zl){var r=Ju(t,e,n,i);if(r===null)jc(t,e,i,Ul,n),ep(t,i);else if(u_(r,t,e,n,i))i.stopPropagation();else if(ep(t,i),e&4&&-1<c_.indexOf(t)){for(;r!==null;){var a=hs(r);if(a!==null&&j0(a),a=Ju(t,e,n,i),a===null&&jc(t,e,i,Ul,n),a===r)break;r=a}r!==null&&i.stopPropagation()}else jc(t,e,i,null,n)}}var Ul=null;function Ju(t,e,n,i){if(Ul=null,t=If(i),t=Rr(t),t!==null)if(e=Xr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=F0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ul=t,null}function K0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(e_()){case Df:return 1;case G0:return 4;case Il:case t_:return 16;case V0:return 536870912;default:return 16}default:return 16}}var Ji=null,Of=null,pl=null;function Z0(){if(pl)return pl;var t,e=Of,n=e.length,i,r="value"in Ji?Ji.value:Ji.textContent,a=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[a-i];i++);return pl=r.slice(t,1<i?1-i:void 0)}function ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Cs(){return!0}function np(){return!1}function Pn(t){function e(n,i,r,a,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(n=t[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Cs:np,this.isPropagationStopped=np,this}return bt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Cs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Cs)},persist:function(){},isPersistent:Cs}),e}var Qa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kf=Pn(Qa),fs=bt({},Qa,{view:0,detail:0}),p_=Pn(fs),Uc,Fc,fo,sc=bt({},fs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==fo&&(fo&&t.type==="mousemove"?(Uc=t.screenX-fo.screenX,Fc=t.screenY-fo.screenY):Fc=Uc=0,fo=t),Uc)},movementY:function(t){return"movementY"in t?t.movementY:Fc}}),ip=Pn(sc),m_=bt({},sc,{dataTransfer:0}),x_=Pn(m_),g_=bt({},fs,{relatedTarget:0}),Oc=Pn(g_),v_=bt({},Qa,{animationName:0,elapsedTime:0,pseudoElement:0}),__=Pn(v_),y_=bt({},Qa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),S_=Pn(y_),M_=bt({},Qa,{data:0}),rp=Pn(M_),E_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},b_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function C_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=b_[t])?!!e[t]:!1}function Bf(){return C_}var T_=bt({},fs,{key:function(t){if(t.key){var e=E_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?A_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bf,charCode:function(t){return t.type==="keypress"?ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),w_=Pn(T_),R_=bt({},sc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ap=Pn(R_),P_=bt({},fs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bf}),L_=Pn(P_),N_=bt({},Qa,{propertyName:0,elapsedTime:0,pseudoElement:0}),I_=Pn(N_),D_=bt({},sc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),z_=Pn(D_),U_=[9,13,27,32],Gf=Li&&"CompositionEvent"in window,Lo=null;Li&&"documentMode"in document&&(Lo=document.documentMode);var F_=Li&&"TextEvent"in window&&!Lo,Q0=Li&&(!Gf||Lo&&8<Lo&&11>=Lo),op=" ",sp=!1;function J0(t,e){switch(t){case"keyup":return U_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ex(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ga=!1;function O_(t,e){switch(t){case"compositionend":return ex(e);case"keypress":return e.which!==32?null:(sp=!0,op);case"textInput":return t=e.data,t===op&&sp?null:t;default:return null}}function k_(t,e){if(ga)return t==="compositionend"||!Gf&&J0(t,e)?(t=Z0(),pl=Of=Ji=null,ga=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Q0&&e.locale!=="ko"?null:e.data;default:return null}}var B_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!B_[t.type]:e==="textarea"}function tx(t,e,n,i){N0(i),e=Fl(e,"onChange"),0<e.length&&(n=new kf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var No=null,Xo=null;function G_(t){fx(t,0)}function lc(t){var e=ya(t);if(b0(e))return t}function V_(t,e){if(t==="change")return e}var nx=!1;if(Li){var kc;if(Li){var Bc="oninput"in document;if(!Bc){var cp=document.createElement("div");cp.setAttribute("oninput","return;"),Bc=typeof cp.oninput=="function"}kc=Bc}else kc=!1;nx=kc&&(!document.documentMode||9<document.documentMode)}function up(){No&&(No.detachEvent("onpropertychange",ix),Xo=No=null)}function ix(t){if(t.propertyName==="value"&&lc(Xo)){var e=[];tx(e,Xo,t,If(t)),U0(G_,e)}}function H_(t,e,n){t==="focusin"?(up(),No=e,Xo=n,No.attachEvent("onpropertychange",ix)):t==="focusout"&&up()}function W_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return lc(Xo)}function j_(t,e){if(t==="click")return lc(e)}function X_(t,e){if(t==="input"||t==="change")return lc(e)}function Y_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jn=typeof Object.is=="function"?Object.is:Y_;function Yo(t,e){if(Jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!zu.call(e,r)||!Jn(t[r],e[r]))return!1}return!0}function dp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function fp(t,e){var n=dp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=dp(n)}}function rx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?rx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function ax(){for(var t=window,e=Pl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Pl(t.document)}return e}function Vf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function q_(t){var e=ax(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&rx(n.ownerDocument.documentElement,n)){if(i!==null&&Vf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,a=Math.min(i.start,r);i=i.end===void 0?a:Math.min(i.end,r),!t.extend&&a>i&&(r=i,i=a,a=r),r=fp(n,a);var o=fp(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),a>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var $_=Li&&"documentMode"in document&&11>=document.documentMode,va=null,ed=null,Io=null,td=!1;function hp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;td||va==null||va!==Pl(i)||(i=va,"selectionStart"in i&&Vf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Io&&Yo(Io,i)||(Io=i,i=Fl(ed,"onSelect"),0<i.length&&(e=new kf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=va)))}function Ts(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var _a={animationend:Ts("Animation","AnimationEnd"),animationiteration:Ts("Animation","AnimationIteration"),animationstart:Ts("Animation","AnimationStart"),transitionend:Ts("Transition","TransitionEnd")},Gc={},ox={};Li&&(ox=document.createElement("div").style,"AnimationEvent"in window||(delete _a.animationend.animation,delete _a.animationiteration.animation,delete _a.animationstart.animation),"TransitionEvent"in window||delete _a.transitionend.transition);function cc(t){if(Gc[t])return Gc[t];if(!_a[t])return t;var e=_a[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ox)return Gc[t]=e[n];return t}var sx=cc("animationend"),lx=cc("animationiteration"),cx=cc("animationstart"),ux=cc("transitionend"),dx=new Map,pp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){dx.set(t,e),jr(e,[t])}for(var Vc=0;Vc<pp.length;Vc++){var Hc=pp[Vc],K_=Hc.toLowerCase(),Z_=Hc[0].toUpperCase()+Hc.slice(1);pr(K_,"on"+Z_)}pr(sx,"onAnimationEnd");pr(lx,"onAnimationIteration");pr(cx,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(ux,"onTransitionEnd");ka("onMouseEnter",["mouseout","mouseover"]);ka("onMouseLeave",["mouseout","mouseover"]);ka("onPointerEnter",["pointerout","pointerover"]);ka("onPointerLeave",["pointerout","pointerover"]);jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Q_=new Set("cancel close invalid load scroll toggle".split(" ").concat(To));function mp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Kv(i,e,void 0,t),t.currentTarget=null}function fx(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var a=void 0;if(e)for(var o=i.length-1;0<=o;o--){var s=i[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&r.isPropagationStopped())break e;mp(r,s,c),a=l}else for(o=0;o<i.length;o++){if(s=i[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&r.isPropagationStopped())break e;mp(r,s,c),a=l}}}if(Nl)throw t=Ku,Nl=!1,Ku=null,t}function mt(t,e){var n=e[od];n===void 0&&(n=e[od]=new Set);var i=t+"__bubble";n.has(i)||(hx(e,t,2,!1),n.add(i))}function Wc(t,e,n){var i=0;e&&(i|=4),hx(n,t,i,e)}var ws="_reactListening"+Math.random().toString(36).slice(2);function qo(t){if(!t[ws]){t[ws]=!0,y0.forEach(function(n){n!=="selectionchange"&&(Q_.has(n)||Wc(n,!1,t),Wc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ws]||(e[ws]=!0,Wc("selectionchange",!1,e))}}function hx(t,e,n,i){switch(K0(e)){case 1:var r=f_;break;case 4:r=h_;break;default:r=Ff}n=r.bind(null,e,n,t),r=void 0,!$u||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function jc(t,e,n,i,r){var a=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var s=i.stateNode.containerInfo;if(s===r||s.nodeType===8&&s.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;s!==null;){if(o=Rr(s),o===null)return;if(l=o.tag,l===5||l===6){i=a=o;continue e}s=s.parentNode}}i=i.return}U0(function(){var c=a,d=If(n),h=[];e:{var f=dx.get(t);if(f!==void 0){var p=kf,_=t;switch(t){case"keypress":if(ml(n)===0)break e;case"keydown":case"keyup":p=w_;break;case"focusin":_="focus",p=Oc;break;case"focusout":_="blur",p=Oc;break;case"beforeblur":case"afterblur":p=Oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=ip;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=x_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=L_;break;case sx:case lx:case cx:p=__;break;case ux:p=I_;break;case"scroll":p=p_;break;case"wheel":p=z_;break;case"copy":case"cut":case"paste":p=S_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ap}var y=(e&4)!==0,x=!y&&t==="scroll",u=y?f!==null?f+"Capture":null:f;y=[];for(var g=c,v;g!==null;){v=g;var E=v.stateNode;if(v.tag===5&&E!==null&&(v=E,u!==null&&(E=Vo(g,u),E!=null&&y.push($o(g,E,v)))),x)break;g=g.return}0<y.length&&(f=new p(f,_,null,n,d),h.push({event:f,listeners:y}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Yu&&(_=n.relatedTarget||n.fromElement)&&(Rr(_)||_[Ni]))break e;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Rr(_):null,_!==null&&(x=Xr(_),_!==x||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(y=ip,E="onMouseLeave",u="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(y=ap,E="onPointerLeave",u="onPointerEnter",g="pointer"),x=p==null?f:ya(p),v=_==null?f:ya(_),f=new y(E,g+"leave",p,n,d),f.target=x,f.relatedTarget=v,E=null,Rr(d)===c&&(y=new y(u,g+"enter",_,n,d),y.target=v,y.relatedTarget=x,E=y),x=E,p&&_)t:{for(y=p,u=_,g=0,v=y;v;v=$r(v))g++;for(v=0,E=u;E;E=$r(E))v++;for(;0<g-v;)y=$r(y),g--;for(;0<v-g;)u=$r(u),v--;for(;g--;){if(y===u||u!==null&&y===u.alternate)break t;y=$r(y),u=$r(u)}y=null}else y=null;p!==null&&xp(h,f,p,y,!1),_!==null&&x!==null&&xp(h,x,_,y,!0)}}e:{if(f=c?ya(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var w=V_;else if(lp(f))if(nx)w=X_;else{w=W_;var b=H_}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(w=j_);if(w&&(w=w(t,c))){tx(h,w,n,d);break e}b&&b(t,f,c),t==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&Vu(f,"number",f.value)}switch(b=c?ya(c):window,t){case"focusin":(lp(b)||b.contentEditable==="true")&&(va=b,ed=c,Io=null);break;case"focusout":Io=ed=va=null;break;case"mousedown":td=!0;break;case"contextmenu":case"mouseup":case"dragend":td=!1,hp(h,n,d);break;case"selectionchange":if($_)break;case"keydown":case"keyup":hp(h,n,d)}var T;if(Gf)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else ga?J0(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Q0&&n.locale!=="ko"&&(ga||P!=="onCompositionStart"?P==="onCompositionEnd"&&ga&&(T=Z0()):(Ji=d,Of="value"in Ji?Ji.value:Ji.textContent,ga=!0)),b=Fl(c,P),0<b.length&&(P=new rp(P,t,null,n,d),h.push({event:P,listeners:b}),T?P.data=T:(T=ex(n),T!==null&&(P.data=T)))),(T=F_?O_(t,n):k_(t,n))&&(c=Fl(c,"onBeforeInput"),0<c.length&&(d=new rp("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:c}),d.data=T))}fx(h,e)})}function $o(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,a=r.stateNode;r.tag===5&&a!==null&&(r=a,a=Vo(t,n),a!=null&&i.unshift($o(t,a,r)),a=Vo(t,e),a!=null&&i.push($o(t,a,r))),t=t.return}return i}function $r(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function xp(t,e,n,i,r){for(var a=e._reactName,o=[];n!==null&&n!==i;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===i)break;s.tag===5&&c!==null&&(s=c,r?(l=Vo(n,a),l!=null&&o.unshift($o(n,l,s))):r||(l=Vo(n,a),l!=null&&o.push($o(n,l,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var J_=/\r\n?/g,ey=/\u0000|\uFFFD/g;function gp(t){return(typeof t=="string"?t:""+t).replace(J_,`
`).replace(ey,"")}function Rs(t,e,n){if(e=gp(e),gp(t)!==e&&n)throw Error(ie(425))}function Ol(){}var nd=null,id=null;function rd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ad=typeof setTimeout=="function"?setTimeout:void 0,ty=typeof clearTimeout=="function"?clearTimeout:void 0,vp=typeof Promise=="function"?Promise:void 0,ny=typeof queueMicrotask=="function"?queueMicrotask:typeof vp<"u"?function(t){return vp.resolve(null).then(t).catch(iy)}:ad;function iy(t){setTimeout(function(){throw t})}function Xc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),jo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);jo(e)}function ar(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function _p(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ja=Math.random().toString(36).slice(2),oi="__reactFiber$"+Ja,Ko="__reactProps$"+Ja,Ni="__reactContainer$"+Ja,od="__reactEvents$"+Ja,ry="__reactListeners$"+Ja,ay="__reactHandles$"+Ja;function Rr(t){var e=t[oi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ni]||n[oi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_p(t);t!==null;){if(n=t[oi])return n;t=_p(t)}return e}t=n,n=t.parentNode}return null}function hs(t){return t=t[oi]||t[Ni],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ya(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ie(33))}function uc(t){return t[Ko]||null}var sd=[],Sa=-1;function mr(t){return{current:t}}function xt(t){0>Sa||(t.current=sd[Sa],sd[Sa]=null,Sa--)}function ft(t,e){Sa++,sd[Sa]=t.current,t.current=e}var fr={},Zt=mr(fr),mn=mr(!1),Or=fr;function Ba(t,e){var n=t.type.contextTypes;if(!n)return fr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},a;for(a in n)r[a]=e[a];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function xn(t){return t=t.childContextTypes,t!=null}function kl(){xt(mn),xt(Zt)}function yp(t,e,n){if(Zt.current!==fr)throw Error(ie(168));ft(Zt,e),ft(mn,n)}function px(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,Hv(t)||"Unknown",r));return bt({},n,i)}function Bl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||fr,Or=Zt.current,ft(Zt,t),ft(mn,mn.current),!0}function Sp(t,e,n){var i=t.stateNode;if(!i)throw Error(ie(169));n?(t=px(t,e,Or),i.__reactInternalMemoizedMergedChildContext=t,xt(mn),xt(Zt),ft(Zt,t)):xt(mn),ft(mn,n)}var Mi=null,dc=!1,Yc=!1;function mx(t){Mi===null?Mi=[t]:Mi.push(t)}function oy(t){dc=!0,mx(t)}function xr(){if(!Yc&&Mi!==null){Yc=!0;var t=0,e=at;try{var n=Mi;for(at=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Mi=null,dc=!1}catch(r){throw Mi!==null&&(Mi=Mi.slice(t+1)),B0(Df,xr),r}finally{at=e,Yc=!1}}return null}var Ma=[],Ea=0,Gl=null,Vl=0,In=[],Dn=0,kr=null,bi=1,Ci="";function br(t,e){Ma[Ea++]=Vl,Ma[Ea++]=Gl,Gl=t,Vl=e}function xx(t,e,n){In[Dn++]=bi,In[Dn++]=Ci,In[Dn++]=kr,kr=t;var i=bi;t=Ci;var r=32-Kn(i)-1;i&=~(1<<r),n+=1;var a=32-Kn(e)+r;if(30<a){var o=r-r%5;a=(i&(1<<o)-1).toString(32),i>>=o,r-=o,bi=1<<32-Kn(e)+r|n<<r|i,Ci=a+t}else bi=1<<a|n<<r|i,Ci=t}function Hf(t){t.return!==null&&(br(t,1),xx(t,1,0))}function Wf(t){for(;t===Gl;)Gl=Ma[--Ea],Ma[Ea]=null,Vl=Ma[--Ea],Ma[Ea]=null;for(;t===kr;)kr=In[--Dn],In[Dn]=null,Ci=In[--Dn],In[Dn]=null,bi=In[--Dn],In[Dn]=null}var Cn=null,bn=null,vt=!1,Yn=null;function gx(t,e){var n=zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Mp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Cn=t,bn=ar(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Cn=t,bn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:bi,overflow:Ci}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Cn=t,bn=null,!0):!1;default:return!1}}function ld(t){return(t.mode&1)!==0&&(t.flags&128)===0}function cd(t){if(vt){var e=bn;if(e){var n=e;if(!Mp(t,e)){if(ld(t))throw Error(ie(418));e=ar(n.nextSibling);var i=Cn;e&&Mp(t,e)?gx(i,n):(t.flags=t.flags&-4097|2,vt=!1,Cn=t)}}else{if(ld(t))throw Error(ie(418));t.flags=t.flags&-4097|2,vt=!1,Cn=t}}}function Ep(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Cn=t}function Ps(t){if(t!==Cn)return!1;if(!vt)return Ep(t),vt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!rd(t.type,t.memoizedProps)),e&&(e=bn)){if(ld(t))throw vx(),Error(ie(418));for(;e;)gx(t,e),e=ar(e.nextSibling)}if(Ep(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ie(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){bn=ar(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}bn=null}}else bn=Cn?ar(t.stateNode.nextSibling):null;return!0}function vx(){for(var t=bn;t;)t=ar(t.nextSibling)}function Ga(){bn=Cn=null,vt=!1}function jf(t){Yn===null?Yn=[t]:Yn.push(t)}var sy=Ui.ReactCurrentBatchConfig;function ho(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ie(309));var i=n.stateNode}if(!i)throw Error(ie(147,t));var r=i,a=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===a?e.ref:(e=function(o){var s=r.refs;o===null?delete s[a]:s[a]=o},e._stringRef=a,e)}if(typeof t!="string")throw Error(ie(284));if(!n._owner)throw Error(ie(290,t))}return t}function Ls(t,e){throw t=Object.prototype.toString.call(e),Error(ie(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ap(t){var e=t._init;return e(t._payload)}function _x(t){function e(u,g){if(t){var v=u.deletions;v===null?(u.deletions=[g],u.flags|=16):v.push(g)}}function n(u,g){if(!t)return null;for(;g!==null;)e(u,g),g=g.sibling;return null}function i(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function r(u,g){return u=cr(u,g),u.index=0,u.sibling=null,u}function a(u,g,v){return u.index=v,t?(v=u.alternate,v!==null?(v=v.index,v<g?(u.flags|=2,g):v):(u.flags|=2,g)):(u.flags|=1048576,g)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function s(u,g,v,E){return g===null||g.tag!==6?(g=eu(v,u.mode,E),g.return=u,g):(g=r(g,v),g.return=u,g)}function l(u,g,v,E){var w=v.type;return w===xa?d(u,g,v.props.children,E,v.key):g!==null&&(g.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Xi&&Ap(w)===g.type)?(E=r(g,v.props),E.ref=ho(u,g,v),E.return=u,E):(E=Ml(v.type,v.key,v.props,null,u.mode,E),E.ref=ho(u,g,v),E.return=u,E)}function c(u,g,v,E){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=tu(v,u.mode,E),g.return=u,g):(g=r(g,v.children||[]),g.return=u,g)}function d(u,g,v,E,w){return g===null||g.tag!==7?(g=Fr(v,u.mode,E,w),g.return=u,g):(g=r(g,v),g.return=u,g)}function h(u,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=eu(""+g,u.mode,v),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ys:return v=Ml(g.type,g.key,g.props,null,u.mode,v),v.ref=ho(u,null,g),v.return=u,v;case ma:return g=tu(g,u.mode,v),g.return=u,g;case Xi:var E=g._init;return h(u,E(g._payload),v)}if(bo(g)||so(g))return g=Fr(g,u.mode,v,null),g.return=u,g;Ls(u,g)}return null}function f(u,g,v,E){var w=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return w!==null?null:s(u,g,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ys:return v.key===w?l(u,g,v,E):null;case ma:return v.key===w?c(u,g,v,E):null;case Xi:return w=v._init,f(u,g,w(v._payload),E)}if(bo(v)||so(v))return w!==null?null:d(u,g,v,E,null);Ls(u,v)}return null}function p(u,g,v,E,w){if(typeof E=="string"&&E!==""||typeof E=="number")return u=u.get(v)||null,s(g,u,""+E,w);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case ys:return u=u.get(E.key===null?v:E.key)||null,l(g,u,E,w);case ma:return u=u.get(E.key===null?v:E.key)||null,c(g,u,E,w);case Xi:var b=E._init;return p(u,g,v,b(E._payload),w)}if(bo(E)||so(E))return u=u.get(v)||null,d(g,u,E,w,null);Ls(g,E)}return null}function _(u,g,v,E){for(var w=null,b=null,T=g,P=g=0,C=null;T!==null&&P<v.length;P++){T.index>P?(C=T,T=null):C=T.sibling;var M=f(u,T,v[P],E);if(M===null){T===null&&(T=C);break}t&&T&&M.alternate===null&&e(u,T),g=a(M,g,P),b===null?w=M:b.sibling=M,b=M,T=C}if(P===v.length)return n(u,T),vt&&br(u,P),w;if(T===null){for(;P<v.length;P++)T=h(u,v[P],E),T!==null&&(g=a(T,g,P),b===null?w=T:b.sibling=T,b=T);return vt&&br(u,P),w}for(T=i(u,T);P<v.length;P++)C=p(T,u,P,v[P],E),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?P:C.key),g=a(C,g,P),b===null?w=C:b.sibling=C,b=C);return t&&T.forEach(function(N){return e(u,N)}),vt&&br(u,P),w}function y(u,g,v,E){var w=so(v);if(typeof w!="function")throw Error(ie(150));if(v=w.call(v),v==null)throw Error(ie(151));for(var b=w=null,T=g,P=g=0,C=null,M=v.next();T!==null&&!M.done;P++,M=v.next()){T.index>P?(C=T,T=null):C=T.sibling;var N=f(u,T,M.value,E);if(N===null){T===null&&(T=C);break}t&&T&&N.alternate===null&&e(u,T),g=a(N,g,P),b===null?w=N:b.sibling=N,b=N,T=C}if(M.done)return n(u,T),vt&&br(u,P),w;if(T===null){for(;!M.done;P++,M=v.next())M=h(u,M.value,E),M!==null&&(g=a(M,g,P),b===null?w=M:b.sibling=M,b=M);return vt&&br(u,P),w}for(T=i(u,T);!M.done;P++,M=v.next())M=p(T,u,P,M.value,E),M!==null&&(t&&M.alternate!==null&&T.delete(M.key===null?P:M.key),g=a(M,g,P),b===null?w=M:b.sibling=M,b=M);return t&&T.forEach(function(z){return e(u,z)}),vt&&br(u,P),w}function x(u,g,v,E){if(typeof v=="object"&&v!==null&&v.type===xa&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case ys:e:{for(var w=v.key,b=g;b!==null;){if(b.key===w){if(w=v.type,w===xa){if(b.tag===7){n(u,b.sibling),g=r(b,v.props.children),g.return=u,u=g;break e}}else if(b.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Xi&&Ap(w)===b.type){n(u,b.sibling),g=r(b,v.props),g.ref=ho(u,b,v),g.return=u,u=g;break e}n(u,b);break}else e(u,b);b=b.sibling}v.type===xa?(g=Fr(v.props.children,u.mode,E,v.key),g.return=u,u=g):(E=Ml(v.type,v.key,v.props,null,u.mode,E),E.ref=ho(u,g,v),E.return=u,u=E)}return o(u);case ma:e:{for(b=v.key;g!==null;){if(g.key===b)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(u,g.sibling),g=r(g,v.children||[]),g.return=u,u=g;break e}else{n(u,g);break}else e(u,g);g=g.sibling}g=tu(v,u.mode,E),g.return=u,u=g}return o(u);case Xi:return b=v._init,x(u,g,b(v._payload),E)}if(bo(v))return _(u,g,v,E);if(so(v))return y(u,g,v,E);Ls(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(n(u,g.sibling),g=r(g,v),g.return=u,u=g):(n(u,g),g=eu(v,u.mode,E),g.return=u,u=g),o(u)):n(u,g)}return x}var Va=_x(!0),yx=_x(!1),Hl=mr(null),Wl=null,Aa=null,Xf=null;function Yf(){Xf=Aa=Wl=null}function qf(t){var e=Hl.current;xt(Hl),t._currentValue=e}function ud(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function La(t,e){Wl=t,Xf=Aa=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(pn=!0),t.firstContext=null)}function On(t){var e=t._currentValue;if(Xf!==t)if(t={context:t,memoizedValue:e,next:null},Aa===null){if(Wl===null)throw Error(ie(308));Aa=t,Wl.dependencies={lanes:0,firstContext:t}}else Aa=Aa.next=t;return e}var Pr=null;function $f(t){Pr===null?Pr=[t]:Pr.push(t)}function Sx(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,$f(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ii(t,i)}function Ii(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Yi=!1;function Kf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mx(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function or(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ii(t,n)}return r=i.interleaved,r===null?(e.next=e,$f(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ii(t,n)}function xl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,zf(t,n)}}function bp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?r=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?r=a=e:a=a.next=e}else r=a=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:a,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function jl(t,e,n,i){var r=t.updateQueue;Yi=!1;var a=r.firstBaseUpdate,o=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,s=d.lastBaseUpdate,s!==o&&(s===null?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(a!==null){var h=r.baseState;o=0,d=c=l=null,s=a;do{var f=s.lane,p=s.eventTime;if((i&f)===f){d!==null&&(d=d.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var _=t,y=s;switch(f=e,p=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){h=_.call(p,h,f);break e}h=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,f=typeof _=="function"?_.call(p,h,f):_,f==null)break e;h=bt({},h,f);break e;case 2:Yi=!0}}s.callback!==null&&s.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[s]:f.push(s))}else p={eventTime:p,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,o|=f;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;f=s,s=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(d===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else a===null&&(r.shared.lanes=0);Gr|=o,t.lanes=o,t.memoizedState=h}}function Cp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var ps={},di=mr(ps),Zo=mr(ps),Qo=mr(ps);function Lr(t){if(t===ps)throw Error(ie(174));return t}function Zf(t,e){switch(ft(Qo,e),ft(Zo,t),ft(di,ps),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Wu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Wu(e,t)}xt(di),ft(di,e)}function Ha(){xt(di),xt(Zo),xt(Qo)}function Ex(t){Lr(Qo.current);var e=Lr(di.current),n=Wu(e,t.type);e!==n&&(ft(Zo,t),ft(di,n))}function Qf(t){Zo.current===t&&(xt(di),xt(Zo))}var Et=mr(0);function Xl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var qc=[];function Jf(){for(var t=0;t<qc.length;t++)qc[t]._workInProgressVersionPrimary=null;qc.length=0}var gl=Ui.ReactCurrentDispatcher,$c=Ui.ReactCurrentBatchConfig,Br=0,At=null,It=null,Ot=null,Yl=!1,Do=!1,Jo=0,ly=0;function jt(){throw Error(ie(321))}function eh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jn(t[n],e[n]))return!1;return!0}function th(t,e,n,i,r,a){if(Br=a,At=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,gl.current=t===null||t.memoizedState===null?fy:hy,t=n(i,r),Do){a=0;do{if(Do=!1,Jo=0,25<=a)throw Error(ie(301));a+=1,Ot=It=null,e.updateQueue=null,gl.current=py,t=n(i,r)}while(Do)}if(gl.current=ql,e=It!==null&&It.next!==null,Br=0,Ot=It=At=null,Yl=!1,e)throw Error(ie(300));return t}function nh(){var t=Jo!==0;return Jo=0,t}function ri(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?At.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function kn(){if(It===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=It.next;var e=Ot===null?At.memoizedState:Ot.next;if(e!==null)Ot=e,It=t;else{if(t===null)throw Error(ie(310));It=t,t={memoizedState:It.memoizedState,baseState:It.baseState,baseQueue:It.baseQueue,queue:It.queue,next:null},Ot===null?At.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function es(t,e){return typeof e=="function"?e(t):e}function Kc(t){var e=kn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=It,r=i.baseQueue,a=n.pending;if(a!==null){if(r!==null){var o=r.next;r.next=a.next,a.next=o}i.baseQueue=r=a,n.pending=null}if(r!==null){a=r.next,i=i.baseState;var s=o=null,l=null,c=a;do{var d=c.lane;if((Br&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=h,o=i):l=l.next=h,At.lanes|=d,Gr|=d}c=c.next}while(c!==null&&c!==a);l===null?o=i:l.next=s,Jn(i,e.memoizedState)||(pn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do a=r.lane,At.lanes|=a,Gr|=a,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Zc(t){var e=kn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,a=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do a=t(a,o.action),o=o.next;while(o!==r);Jn(a,e.memoizedState)||(pn=!0),e.memoizedState=a,e.baseQueue===null&&(e.baseState=a),n.lastRenderedState=a}return[a,i]}function Ax(){}function bx(t,e){var n=At,i=kn(),r=e(),a=!Jn(i.memoizedState,r);if(a&&(i.memoizedState=r,pn=!0),i=i.queue,ih(wx.bind(null,n,i,t),[t]),i.getSnapshot!==e||a||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,ts(9,Tx.bind(null,n,i,r,e),void 0,null),kt===null)throw Error(ie(349));Br&30||Cx(n,e,r)}return r}function Cx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Tx(t,e,n,i){e.value=n,e.getSnapshot=i,Rx(e)&&Px(t)}function wx(t,e,n){return n(function(){Rx(e)&&Px(t)})}function Rx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jn(t,n)}catch{return!0}}function Px(t){var e=Ii(t,1);e!==null&&Zn(e,t,1,-1)}function Tp(t){var e=ri();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:es,lastRenderedState:t},e.queue=t,t=t.dispatch=dy.bind(null,At,t),[e.memoizedState,t]}function ts(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Lx(){return kn().memoizedState}function vl(t,e,n,i){var r=ri();At.flags|=t,r.memoizedState=ts(1|e,n,void 0,i===void 0?null:i)}function fc(t,e,n,i){var r=kn();i=i===void 0?null:i;var a=void 0;if(It!==null){var o=It.memoizedState;if(a=o.destroy,i!==null&&eh(i,o.deps)){r.memoizedState=ts(e,n,a,i);return}}At.flags|=t,r.memoizedState=ts(1|e,n,a,i)}function wp(t,e){return vl(8390656,8,t,e)}function ih(t,e){return fc(2048,8,t,e)}function Nx(t,e){return fc(4,2,t,e)}function Ix(t,e){return fc(4,4,t,e)}function Dx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function zx(t,e,n){return n=n!=null?n.concat([t]):null,fc(4,4,Dx.bind(null,e,t),n)}function rh(){}function Ux(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Fx(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Ox(t,e,n){return Br&21?(Jn(n,e)||(n=H0(),At.lanes|=n,Gr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,pn=!0),t.memoizedState=n)}function cy(t,e){var n=at;at=n!==0&&4>n?n:4,t(!0);var i=$c.transition;$c.transition={};try{t(!1),e()}finally{at=n,$c.transition=i}}function kx(){return kn().memoizedState}function uy(t,e,n){var i=lr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Bx(t))Gx(e,n);else if(n=Sx(t,e,n,i),n!==null){var r=on();Zn(n,t,i,r),Vx(n,e,i)}}function dy(t,e,n){var i=lr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bx(t))Gx(e,r);else{var a=t.alternate;if(t.lanes===0&&(a===null||a.lanes===0)&&(a=e.lastRenderedReducer,a!==null))try{var o=e.lastRenderedState,s=a(o,n);if(r.hasEagerState=!0,r.eagerState=s,Jn(s,o)){var l=e.interleaved;l===null?(r.next=r,$f(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Sx(t,e,r,i),n!==null&&(r=on(),Zn(n,t,i,r),Vx(n,e,i))}}function Bx(t){var e=t.alternate;return t===At||e!==null&&e===At}function Gx(t,e){Do=Yl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vx(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,zf(t,n)}}var ql={readContext:On,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useInsertionEffect:jt,useLayoutEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useMutableSource:jt,useSyncExternalStore:jt,useId:jt,unstable_isNewReconciler:!1},fy={readContext:On,useCallback:function(t,e){return ri().memoizedState=[t,e===void 0?null:e],t},useContext:On,useEffect:wp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,vl(4194308,4,Dx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return vl(4194308,4,t,e)},useInsertionEffect:function(t,e){return vl(4,2,t,e)},useMemo:function(t,e){var n=ri();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ri();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=uy.bind(null,At,t),[i.memoizedState,t]},useRef:function(t){var e=ri();return t={current:t},e.memoizedState=t},useState:Tp,useDebugValue:rh,useDeferredValue:function(t){return ri().memoizedState=t},useTransition:function(){var t=Tp(!1),e=t[0];return t=cy.bind(null,t[1]),ri().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=At,r=ri();if(vt){if(n===void 0)throw Error(ie(407));n=n()}else{if(n=e(),kt===null)throw Error(ie(349));Br&30||Cx(i,e,n)}r.memoizedState=n;var a={value:n,getSnapshot:e};return r.queue=a,wp(wx.bind(null,i,a,t),[t]),i.flags|=2048,ts(9,Tx.bind(null,i,a,n,e),void 0,null),n},useId:function(){var t=ri(),e=kt.identifierPrefix;if(vt){var n=Ci,i=bi;n=(i&~(1<<32-Kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Jo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ly++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},hy={readContext:On,useCallback:Ux,useContext:On,useEffect:ih,useImperativeHandle:zx,useInsertionEffect:Nx,useLayoutEffect:Ix,useMemo:Fx,useReducer:Kc,useRef:Lx,useState:function(){return Kc(es)},useDebugValue:rh,useDeferredValue:function(t){var e=kn();return Ox(e,It.memoizedState,t)},useTransition:function(){var t=Kc(es)[0],e=kn().memoizedState;return[t,e]},useMutableSource:Ax,useSyncExternalStore:bx,useId:kx,unstable_isNewReconciler:!1},py={readContext:On,useCallback:Ux,useContext:On,useEffect:ih,useImperativeHandle:zx,useInsertionEffect:Nx,useLayoutEffect:Ix,useMemo:Fx,useReducer:Zc,useRef:Lx,useState:function(){return Zc(es)},useDebugValue:rh,useDeferredValue:function(t){var e=kn();return It===null?e.memoizedState=t:Ox(e,It.memoizedState,t)},useTransition:function(){var t=Zc(es)[0],e=kn().memoizedState;return[t,e]},useMutableSource:Ax,useSyncExternalStore:bx,useId:kx,unstable_isNewReconciler:!1};function jn(t,e){if(t&&t.defaultProps){e=bt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function dd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:bt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hc={isMounted:function(t){return(t=t._reactInternals)?Xr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=on(),r=lr(t),a=wi(i,r);a.payload=e,n!=null&&(a.callback=n),e=or(t,a,r),e!==null&&(Zn(e,t,r,i),xl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=on(),r=lr(t),a=wi(i,r);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=or(t,a,r),e!==null&&(Zn(e,t,r,i),xl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=on(),i=lr(t),r=wi(n,i);r.tag=2,e!=null&&(r.callback=e),e=or(t,r,i),e!==null&&(Zn(e,t,i,n),xl(e,t,i))}};function Rp(t,e,n,i,r,a,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,a,o):e.prototype&&e.prototype.isPureReactComponent?!Yo(n,i)||!Yo(r,a):!0}function Hx(t,e,n){var i=!1,r=fr,a=e.contextType;return typeof a=="object"&&a!==null?a=On(a):(r=xn(e)?Or:Zt.current,i=e.contextTypes,a=(i=i!=null)?Ba(t,r):fr),e=new e(n,a),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=a),e}function Pp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&hc.enqueueReplaceState(e,e.state,null)}function fd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Kf(t);var a=e.contextType;typeof a=="object"&&a!==null?r.context=On(a):(a=xn(e)?Or:Zt.current,r.context=Ba(t,a)),r.state=t.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(dd(t,e,a,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&hc.enqueueReplaceState(r,r.state,null),jl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Wa(t,e){try{var n="",i=e;do n+=Vv(i),i=i.return;while(i);var r=n}catch(a){r=`
Error generating stack: `+a.message+`
`+a.stack}return{value:t,source:e,stack:r,digest:null}}function Qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function hd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var my=typeof WeakMap=="function"?WeakMap:Map;function Wx(t,e,n){n=wi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Kl||(Kl=!0,Ed=i),hd(t,e)},n}function jx(t,e,n){n=wi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){hd(t,e)}}var a=t.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){hd(t,e),typeof i!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Lp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new my;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ry.bind(null,t,e,n),e.then(t,t))}function Np(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ip(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=wi(-1,1),e.tag=2,or(n,e,1))),n.lanes|=1),t)}var xy=Ui.ReactCurrentOwner,pn=!1;function an(t,e,n,i){e.child=t===null?yx(e,null,n,i):Va(e,t.child,n,i)}function Dp(t,e,n,i,r){n=n.render;var a=e.ref;return La(e,r),i=th(t,e,n,i,a,r),n=nh(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(vt&&n&&Hf(e),e.flags|=1,an(t,e,i,r),e.child)}function zp(t,e,n,i,r){if(t===null){var a=n.type;return typeof a=="function"&&!fh(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=a,Xx(t,e,a,i,r)):(t=Ml(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(a=t.child,!(t.lanes&r)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Yo,n(o,i)&&t.ref===e.ref)return Di(t,e,r)}return e.flags|=1,t=cr(a,i),t.ref=e.ref,t.return=e,e.child=t}function Xx(t,e,n,i,r){if(t!==null){var a=t.memoizedProps;if(Yo(a,i)&&t.ref===e.ref)if(pn=!1,e.pendingProps=i=a,(t.lanes&r)!==0)t.flags&131072&&(pn=!0);else return e.lanes=t.lanes,Di(t,e,r)}return pd(t,e,n,i,r)}function Yx(t,e,n){var i=e.pendingProps,r=i.children,a=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(Ca,Mn),Mn|=n;else{if(!(n&1073741824))return t=a!==null?a.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ft(Ca,Mn),Mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=a!==null?a.baseLanes:n,ft(Ca,Mn),Mn|=i}else a!==null?(i=a.baseLanes|n,e.memoizedState=null):i=n,ft(Ca,Mn),Mn|=i;return an(t,e,r,n),e.child}function qx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function pd(t,e,n,i,r){var a=xn(n)?Or:Zt.current;return a=Ba(e,a),La(e,r),n=th(t,e,n,i,a,r),i=nh(),t!==null&&!pn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(vt&&i&&Hf(e),e.flags|=1,an(t,e,n,r),e.child)}function Up(t,e,n,i,r){if(xn(n)){var a=!0;Bl(e)}else a=!1;if(La(e,r),e.stateNode===null)_l(t,e),Hx(e,n,i),fd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,s=e.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=On(c):(c=xn(n)?Or:Zt.current,c=Ba(e,c));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==i||l!==c)&&Pp(e,o,i,c),Yi=!1;var f=e.memoizedState;o.state=f,jl(e,i,o,r),l=e.memoizedState,s!==i||f!==l||mn.current||Yi?(typeof d=="function"&&(dd(e,n,d,i),l=e.memoizedState),(s=Yi||Rp(e,n,s,i,f,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=s):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Mx(t,e),s=e.memoizedProps,c=e.type===e.elementType?s:jn(e.type,s),o.props=c,h=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=On(l):(l=xn(n)?Or:Zt.current,l=Ba(e,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==h||f!==l)&&Pp(e,o,i,l),Yi=!1,f=e.memoizedState,o.state=f,jl(e,i,o,r);var _=e.memoizedState;s!==h||f!==_||mn.current||Yi?(typeof p=="function"&&(dd(e,n,p,i),_=e.memoizedState),(c=Yi||Rp(e,n,c,i,f,_,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return md(t,e,n,i,a,r)}function md(t,e,n,i,r,a){qx(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Sp(e,n,!1),Di(t,e,a);i=e.stateNode,xy.current=e;var s=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Va(e,t.child,null,a),e.child=Va(e,null,s,a)):an(t,e,s,a),e.memoizedState=i.state,r&&Sp(e,n,!0),e.child}function $x(t){var e=t.stateNode;e.pendingContext?yp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&yp(t,e.context,!1),Zf(t,e.containerInfo)}function Fp(t,e,n,i,r){return Ga(),jf(r),e.flags|=256,an(t,e,n,i),e.child}var xd={dehydrated:null,treeContext:null,retryLane:0};function gd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Kx(t,e,n){var i=e.pendingProps,r=Et.current,a=!1,o=(e.flags&128)!==0,s;if((s=o)||(s=t!==null&&t.memoizedState===null?!1:(r&2)!==0),s?(a=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ft(Et,r&1),t===null)return cd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,a?(i=e.mode,a=e.child,o={mode:"hidden",children:o},!(i&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=xc(o,i,0,null),t=Fr(t,i,n,null),a.return=e,t.return=e,a.sibling=t,e.child=a,e.child.memoizedState=gd(n),e.memoizedState=xd,t):ah(e,o));if(r=t.memoizedState,r!==null&&(s=r.dehydrated,s!==null))return gy(t,e,o,i,s,r,n);if(a){a=i.fallback,o=e.mode,r=t.child,s=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=cr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),s!==null?a=cr(s,a):(a=Fr(a,o,n,null),a.flags|=2),a.return=e,i.return=e,i.sibling=a,e.child=i,i=a,a=e.child,o=t.child.memoizedState,o=o===null?gd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=t.childLanes&~n,e.memoizedState=xd,i}return a=t.child,t=a.sibling,i=cr(a,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function ah(t,e){return e=xc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ns(t,e,n,i){return i!==null&&jf(i),Va(e,t.child,null,n),t=ah(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function gy(t,e,n,i,r,a,o){if(n)return e.flags&256?(e.flags&=-257,i=Qc(Error(ie(422))),Ns(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(a=i.fallback,r=e.mode,i=xc({mode:"visible",children:i.children},r,0,null),a=Fr(a,r,o,null),a.flags|=2,i.return=e,a.return=e,i.sibling=a,e.child=i,e.mode&1&&Va(e,t.child,null,o),e.child.memoizedState=gd(o),e.memoizedState=xd,a);if(!(e.mode&1))return Ns(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var s=i.dgst;return i=s,a=Error(ie(419)),i=Qc(a,i,void 0),Ns(t,e,o,i)}if(s=(o&t.childLanes)!==0,pn||s){if(i=kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==a.retryLane&&(a.retryLane=r,Ii(t,r),Zn(i,t,r,-1))}return dh(),i=Qc(Error(ie(421))),Ns(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Py.bind(null,t),r._reactRetry=e,null):(t=a.treeContext,bn=ar(r.nextSibling),Cn=e,vt=!0,Yn=null,t!==null&&(In[Dn++]=bi,In[Dn++]=Ci,In[Dn++]=kr,bi=t.id,Ci=t.overflow,kr=e),e=ah(e,i.children),e.flags|=4096,e)}function Op(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),ud(t.return,e,n)}function Jc(t,e,n,i,r){var a=t.memoizedState;a===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(a.isBackwards=e,a.rendering=null,a.renderingStartTime=0,a.last=i,a.tail=n,a.tailMode=r)}function Zx(t,e,n){var i=e.pendingProps,r=i.revealOrder,a=i.tail;if(an(t,e,i.children,n),i=Et.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Op(t,n,e);else if(t.tag===19)Op(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ft(Et,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Xl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Jc(e,!1,r,n,a);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Xl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Jc(e,!0,n,null,a);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function _l(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Di(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Gr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ie(153));if(e.child!==null){for(t=e.child,n=cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function vy(t,e,n){switch(e.tag){case 3:$x(e),Ga();break;case 5:Ex(e);break;case 1:xn(e.type)&&Bl(e);break;case 4:Zf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ft(Hl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ft(Et,Et.current&1),e.flags|=128,null):n&e.child.childLanes?Kx(t,e,n):(ft(Et,Et.current&1),t=Di(t,e,n),t!==null?t.sibling:null);ft(Et,Et.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Zx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ft(Et,Et.current),i)break;return null;case 22:case 23:return e.lanes=0,Yx(t,e,n)}return Di(t,e,n)}var Qx,vd,Jx,eg;Qx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vd=function(){};Jx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Lr(di.current);var a=null;switch(n){case"input":r=Bu(t,r),i=Bu(t,i),a=[];break;case"select":r=bt({},r,{value:void 0}),i=bt({},i,{value:void 0}),a=[];break;case"textarea":r=Hu(t,r),i=Hu(t,i),a=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Ol)}ju(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var s=r[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Bo.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in i){var l=i[c];if(s=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Bo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&mt("scroll",t),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(e.updateQueue=c)&&(e.flags|=4)}};eg=function(t,e,n,i){n!==i&&(e.flags|=4)};function po(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Xt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function _y(t,e,n){var i=e.pendingProps;switch(Wf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xt(e),null;case 1:return xn(e.type)&&kl(),Xt(e),null;case 3:return i=e.stateNode,Ha(),xt(mn),xt(Zt),Jf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ps(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(Cd(Yn),Yn=null))),vd(t,e),Xt(e),null;case 5:Qf(e);var r=Lr(Qo.current);if(n=e.type,t!==null&&e.stateNode!=null)Jx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Xt(e),null}if(t=Lr(di.current),Ps(e)){i=e.stateNode,n=e.type;var a=e.memoizedProps;switch(i[oi]=e,i[Ko]=a,t=(e.mode&1)!==0,n){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<To.length;r++)mt(To[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":Yh(i,a),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!a.multiple},mt("invalid",i);break;case"textarea":$h(i,a),mt("invalid",i)}ju(n,a),r=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?i.textContent!==s&&(a.suppressHydrationWarning!==!0&&Rs(i.textContent,s,t),r=["children",s]):typeof s=="number"&&i.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&Rs(i.textContent,s,t),r=["children",""+s]):Bo.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&mt("scroll",i)}switch(n){case"input":Ss(i),qh(i,a,!0);break;case"textarea":Ss(i),Kh(i);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(i.onclick=Ol)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=w0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[oi]=e,t[Ko]=i,Qx(t,e,!1,!1),e.stateNode=t;e:{switch(o=Xu(n,i),n){case"dialog":mt("cancel",t),mt("close",t),r=i;break;case"iframe":case"object":case"embed":mt("load",t),r=i;break;case"video":case"audio":for(r=0;r<To.length;r++)mt(To[r],t);r=i;break;case"source":mt("error",t),r=i;break;case"img":case"image":case"link":mt("error",t),mt("load",t),r=i;break;case"details":mt("toggle",t),r=i;break;case"input":Yh(t,i),r=Bu(t,i),mt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=bt({},i,{value:void 0}),mt("invalid",t);break;case"textarea":$h(t,i),r=Hu(t,i),mt("invalid",t);break;default:r=i}ju(n,r),s=r;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?L0(t,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&R0(t,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Go(t,l):typeof l=="number"&&Go(t,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Bo.hasOwnProperty(a)?l!=null&&a==="onScroll"&&mt("scroll",t):l!=null&&Rf(t,a,l,o))}switch(n){case"input":Ss(t),qh(t,i,!1);break;case"textarea":Ss(t),Kh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+dr(i.value));break;case"select":t.multiple=!!i.multiple,a=i.value,a!=null?Ta(t,!!i.multiple,a,!1):i.defaultValue!=null&&Ta(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Ol)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Xt(e),null;case 6:if(t&&e.stateNode!=null)eg(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(n=Lr(Qo.current),Lr(di.current),Ps(e)){if(i=e.stateNode,n=e.memoizedProps,i[oi]=e,(a=i.nodeValue!==n)&&(t=Cn,t!==null))switch(t.tag){case 3:Rs(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Rs(i.nodeValue,n,(t.mode&1)!==0)}a&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[oi]=e,e.stateNode=i}return Xt(e),null;case 13:if(xt(Et),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(vt&&bn!==null&&e.mode&1&&!(e.flags&128))vx(),Ga(),e.flags|=98560,a=!1;else if(a=Ps(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ie(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ie(317));a[oi]=e}else Ga(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Xt(e),a=!1}else Yn!==null&&(Cd(Yn),Yn=null),a=!0;if(!a)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Et.current&1?Dt===0&&(Dt=3):dh())),e.updateQueue!==null&&(e.flags|=4),Xt(e),null);case 4:return Ha(),vd(t,e),t===null&&qo(e.stateNode.containerInfo),Xt(e),null;case 10:return qf(e.type._context),Xt(e),null;case 17:return xn(e.type)&&kl(),Xt(e),null;case 19:if(xt(Et),a=e.memoizedState,a===null)return Xt(e),null;if(i=(e.flags&128)!==0,o=a.rendering,o===null)if(i)po(a,!1);else{if(Dt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Xl(t),o!==null){for(e.flags|=128,po(a,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)a=n,t=i,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=t,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,t=o.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ft(Et,Et.current&1|2),e.child}t=t.sibling}a.tail!==null&&Pt()>ja&&(e.flags|=128,i=!0,po(a,!1),e.lanes=4194304)}else{if(!i)if(t=Xl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),po(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!vt)return Xt(e),null}else 2*Pt()-a.renderingStartTime>ja&&n!==1073741824&&(e.flags|=128,i=!0,po(a,!1),e.lanes=4194304);a.isBackwards?(o.sibling=e.child,e.child=o):(n=a.last,n!==null?n.sibling=o:e.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Pt(),e.sibling=null,n=Et.current,ft(Et,i?n&1|2:n&1),e):(Xt(e),null);case 22:case 23:return uh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(Xt(e),e.subtreeFlags&6&&(e.flags|=8192)):Xt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function yy(t,e){switch(Wf(e),e.tag){case 1:return xn(e.type)&&kl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ha(),xt(mn),xt(Zt),Jf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qf(e),null;case 13:if(xt(Et),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));Ga()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return xt(Et),null;case 4:return Ha(),null;case 10:return qf(e.type._context),null;case 22:case 23:return uh(),null;case 24:return null;default:return null}}var Is=!1,$t=!1,Sy=typeof WeakSet=="function"?WeakSet:Set,pe=null;function ba(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){wt(t,e,i)}else n.current=null}function _d(t,e,n){try{n()}catch(i){wt(t,e,i)}}var kp=!1;function My(t,e){if(nd=zl,t=ax(),Vf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,a=i.focusNode;i=i.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,d=0,h=t,f=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(s=o+r),h!==a||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)f=h,h=p;for(;;){if(h===t)break t;if(f===n&&++c===r&&(s=o),f===a&&++d===i&&(l=o),(p=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=p}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(id={focusedElem:t,selectionRange:n},zl=!1,pe=e;pe!==null;)if(e=pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pe=t;else for(;pe!==null;){e=pe;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,x=_.memoizedState,u=e.stateNode,g=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:jn(e.type,y),x);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(E){wt(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,pe=t;break}pe=e.return}return _=kp,kp=!1,_}function zo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var a=r.destroy;r.destroy=void 0,a!==void 0&&_d(e,n,a)}r=r.next}while(r!==i)}}function pc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function yd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tg(t){var e=t.alternate;e!==null&&(t.alternate=null,tg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[oi],delete e[Ko],delete e[od],delete e[ry],delete e[ay])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function ng(t){return t.tag===5||t.tag===3||t.tag===4}function Bp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ng(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Sd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ol));else if(i!==4&&(t=t.child,t!==null))for(Sd(t,e,n),t=t.sibling;t!==null;)Sd(t,e,n),t=t.sibling}function Md(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Md(t,e,n),t=t.sibling;t!==null;)Md(t,e,n),t=t.sibling}var Gt=null,Xn=!1;function Oi(t,e,n){for(n=n.child;n!==null;)ig(t,e,n),n=n.sibling}function ig(t,e,n){if(ui&&typeof ui.onCommitFiberUnmount=="function")try{ui.onCommitFiberUnmount(oc,n)}catch{}switch(n.tag){case 5:$t||ba(n,e);case 6:var i=Gt,r=Xn;Gt=null,Oi(t,e,n),Gt=i,Xn=r,Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?Xc(t.parentNode,n):t.nodeType===1&&Xc(t,n),jo(t)):Xc(Gt,n.stateNode));break;case 4:i=Gt,r=Xn,Gt=n.stateNode.containerInfo,Xn=!0,Oi(t,e,n),Gt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!$t&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var a=r,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&_d(n,e,o),r=r.next}while(r!==i)}Oi(t,e,n);break;case 1:if(!$t&&(ba(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(s){wt(n,e,s)}Oi(t,e,n);break;case 21:Oi(t,e,n);break;case 22:n.mode&1?($t=(i=$t)||n.memoizedState!==null,Oi(t,e,n),$t=i):Oi(t,e,n);break;default:Oi(t,e,n)}}function Gp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Sy),e.forEach(function(i){var r=Ly.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Gn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var a=t,o=e,s=o;e:for(;s!==null;){switch(s.tag){case 5:Gt=s.stateNode,Xn=!1;break e;case 3:Gt=s.stateNode.containerInfo,Xn=!0;break e;case 4:Gt=s.stateNode.containerInfo,Xn=!0;break e}s=s.return}if(Gt===null)throw Error(ie(160));ig(a,o,r),Gt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){wt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)rg(e,t),e=e.sibling}function rg(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gn(e,t),ii(t),i&4){try{zo(3,t,t.return),pc(3,t)}catch(y){wt(t,t.return,y)}try{zo(5,t,t.return)}catch(y){wt(t,t.return,y)}}break;case 1:Gn(e,t),ii(t),i&512&&n!==null&&ba(n,n.return);break;case 5:if(Gn(e,t),ii(t),i&512&&n!==null&&ba(n,n.return),t.flags&32){var r=t.stateNode;try{Go(r,"")}catch(y){wt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var a=t.memoizedProps,o=n!==null?n.memoizedProps:a,s=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&C0(r,a),Xu(s,o);var c=Xu(s,a);for(o=0;o<l.length;o+=2){var d=l[o],h=l[o+1];d==="style"?L0(r,h):d==="dangerouslySetInnerHTML"?R0(r,h):d==="children"?Go(r,h):Rf(r,d,h,c)}switch(s){case"input":Gu(r,a);break;case"textarea":T0(r,a);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!a.multiple;var p=a.value;p!=null?Ta(r,!!a.multiple,p,!1):f!==!!a.multiple&&(a.defaultValue!=null?Ta(r,!!a.multiple,a.defaultValue,!0):Ta(r,!!a.multiple,a.multiple?[]:"",!1))}r[Ko]=a}catch(y){wt(t,t.return,y)}}break;case 6:if(Gn(e,t),ii(t),i&4){if(t.stateNode===null)throw Error(ie(162));r=t.stateNode,a=t.memoizedProps;try{r.nodeValue=a}catch(y){wt(t,t.return,y)}}break;case 3:if(Gn(e,t),ii(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{jo(e.containerInfo)}catch(y){wt(t,t.return,y)}break;case 4:Gn(e,t),ii(t);break;case 13:Gn(e,t),ii(t),r=t.child,r.flags&8192&&(a=r.memoizedState!==null,r.stateNode.isHidden=a,!a||r.alternate!==null&&r.alternate.memoizedState!==null||(lh=Pt())),i&4&&Gp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?($t=(c=$t)||d,Gn(e,t),$t=c):Gn(e,t),ii(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(pe=t,d=t.child;d!==null;){for(h=pe=d;pe!==null;){switch(f=pe,p=f.child,f.tag){case 0:case 11:case 14:case 15:zo(4,f,f.return);break;case 1:ba(f,f.return);var _=f.stateNode;if(typeof _.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){wt(i,n,y)}}break;case 5:ba(f,f.return);break;case 22:if(f.memoizedState!==null){Hp(h);continue}}p!==null?(p.return=f,pe=p):Hp(h)}d=d.sibling}e:for(d=null,h=t;;){if(h.tag===5){if(d===null){d=h;try{r=h.stateNode,c?(a=r.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=P0("display",o))}catch(y){wt(t,t.return,y)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(y){wt(t,t.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Gn(e,t),ii(t),i&4&&Gp(t);break;case 21:break;default:Gn(e,t),ii(t)}}function ii(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(ng(n)){var i=n;break e}n=n.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Go(r,""),i.flags&=-33);var a=Bp(t);Md(t,a,r);break;case 3:case 4:var o=i.stateNode.containerInfo,s=Bp(t);Sd(t,s,o);break;default:throw Error(ie(161))}}catch(l){wt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ey(t,e,n){pe=t,ag(t)}function ag(t,e,n){for(var i=(t.mode&1)!==0;pe!==null;){var r=pe,a=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Is;if(!o){var s=r.alternate,l=s!==null&&s.memoizedState!==null||$t;s=Is;var c=$t;if(Is=o,($t=l)&&!c)for(pe=r;pe!==null;)o=pe,l=o.child,o.tag===22&&o.memoizedState!==null?Wp(r):l!==null?(l.return=o,pe=l):Wp(r);for(;a!==null;)pe=a,ag(a),a=a.sibling;pe=r,Is=s,$t=c}Vp(t)}else r.subtreeFlags&8772&&a!==null?(a.return=r,pe=a):Vp(t)}}function Vp(t){for(;pe!==null;){var e=pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:$t||pc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!$t)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:jn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var a=e.updateQueue;a!==null&&Cp(e,a,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Cp(e,o,n)}break;case 5:var s=e.stateNode;if(n===null&&e.flags&4){n=s;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&jo(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}$t||e.flags&512&&yd(e)}catch(f){wt(e,e.return,f)}}if(e===t){pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,pe=n;break}pe=e.return}}function Hp(t){for(;pe!==null;){var e=pe;if(e===t){pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,pe=n;break}pe=e.return}}function Wp(t){for(;pe!==null;){var e=pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{pc(4,e)}catch(l){wt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){wt(e,r,l)}}var a=e.return;try{yd(e)}catch(l){wt(e,a,l)}break;case 5:var o=e.return;try{yd(e)}catch(l){wt(e,o,l)}}}catch(l){wt(e,e.return,l)}if(e===t){pe=null;break}var s=e.sibling;if(s!==null){s.return=e.return,pe=s;break}pe=e.return}}var Ay=Math.ceil,$l=Ui.ReactCurrentDispatcher,oh=Ui.ReactCurrentOwner,Fn=Ui.ReactCurrentBatchConfig,et=0,kt=null,Nt=null,Ht=0,Mn=0,Ca=mr(0),Dt=0,ns=null,Gr=0,mc=0,sh=0,Uo=null,hn=null,lh=0,ja=1/0,Si=null,Kl=!1,Ed=null,sr=null,Ds=!1,er=null,Zl=0,Fo=0,Ad=null,yl=-1,Sl=0;function on(){return et&6?Pt():yl!==-1?yl:yl=Pt()}function lr(t){return t.mode&1?et&2&&Ht!==0?Ht&-Ht:sy.transition!==null?(Sl===0&&(Sl=H0()),Sl):(t=at,t!==0||(t=window.event,t=t===void 0?16:K0(t.type)),t):1}function Zn(t,e,n,i){if(50<Fo)throw Fo=0,Ad=null,Error(ie(185));ds(t,n,i),(!(et&2)||t!==kt)&&(t===kt&&(!(et&2)&&(mc|=n),Dt===4&&Ki(t,Ht)),gn(t,i),n===1&&et===0&&!(e.mode&1)&&(ja=Pt()+500,dc&&xr()))}function gn(t,e){var n=t.callbackNode;s_(t,e);var i=Dl(t,t===kt?Ht:0);if(i===0)n!==null&&Jh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Jh(n),e===1)t.tag===0?oy(jp.bind(null,t)):mx(jp.bind(null,t)),ny(function(){!(et&6)&&xr()}),n=null;else{switch(W0(i)){case 1:n=Df;break;case 4:n=G0;break;case 16:n=Il;break;case 536870912:n=V0;break;default:n=Il}n=hg(n,og.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function og(t,e){if(yl=-1,Sl=0,et&6)throw Error(ie(327));var n=t.callbackNode;if(Na()&&t.callbackNode!==n)return null;var i=Dl(t,t===kt?Ht:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ql(t,i);else{e=i;var r=et;et|=2;var a=lg();(kt!==t||Ht!==e)&&(Si=null,ja=Pt()+500,Ur(t,e));do try{Ty();break}catch(s){sg(t,s)}while(!0);Yf(),$l.current=a,et=r,Nt!==null?e=0:(kt=null,Ht=0,e=Dt)}if(e!==0){if(e===2&&(r=Zu(t),r!==0&&(i=r,e=bd(t,r))),e===1)throw n=ns,Ur(t,0),Ki(t,i),gn(t,Pt()),n;if(e===6)Ki(t,i);else{if(r=t.current.alternate,!(i&30)&&!by(r)&&(e=Ql(t,i),e===2&&(a=Zu(t),a!==0&&(i=a,e=bd(t,a))),e===1))throw n=ns,Ur(t,0),Ki(t,i),gn(t,Pt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:Cr(t,hn,Si);break;case 3:if(Ki(t,i),(i&130023424)===i&&(e=lh+500-Pt(),10<e)){if(Dl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){on(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=ad(Cr.bind(null,t,hn,Si),e);break}Cr(t,hn,Si);break;case 4:if(Ki(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Kn(i);a=1<<o,o=e[o],o>r&&(r=o),i&=~a}if(i=r,i=Pt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Ay(i/1960))-i,10<i){t.timeoutHandle=ad(Cr.bind(null,t,hn,Si),i);break}Cr(t,hn,Si);break;case 5:Cr(t,hn,Si);break;default:throw Error(ie(329))}}}return gn(t,Pt()),t.callbackNode===n?og.bind(null,t):null}function bd(t,e){var n=Uo;return t.current.memoizedState.isDehydrated&&(Ur(t,e).flags|=256),t=Ql(t,e),t!==2&&(e=hn,hn=n,e!==null&&Cd(e)),t}function Cd(t){hn===null?hn=t:hn.push.apply(hn,t)}function by(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],a=r.getSnapshot;r=r.value;try{if(!Jn(a(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ki(t,e){for(e&=~sh,e&=~mc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Kn(e),i=1<<n;t[n]=-1,e&=~i}}function jp(t){if(et&6)throw Error(ie(327));Na();var e=Dl(t,0);if(!(e&1))return gn(t,Pt()),null;var n=Ql(t,e);if(t.tag!==0&&n===2){var i=Zu(t);i!==0&&(e=i,n=bd(t,i))}if(n===1)throw n=ns,Ur(t,0),Ki(t,e),gn(t,Pt()),n;if(n===6)throw Error(ie(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Cr(t,hn,Si),gn(t,Pt()),null}function ch(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(ja=Pt()+500,dc&&xr())}}function Vr(t){er!==null&&er.tag===0&&!(et&6)&&Na();var e=et;et|=1;var n=Fn.transition,i=at;try{if(Fn.transition=null,at=1,t)return t()}finally{at=i,Fn.transition=n,et=e,!(et&6)&&xr()}}function uh(){Mn=Ca.current,xt(Ca)}function Ur(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ty(n)),Nt!==null)for(n=Nt.return;n!==null;){var i=n;switch(Wf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&kl();break;case 3:Ha(),xt(mn),xt(Zt),Jf();break;case 5:Qf(i);break;case 4:Ha();break;case 13:xt(Et);break;case 19:xt(Et);break;case 10:qf(i.type._context);break;case 22:case 23:uh()}n=n.return}if(kt=t,Nt=t=cr(t.current,null),Ht=Mn=e,Dt=0,ns=null,sh=mc=Gr=0,hn=Uo=null,Pr!==null){for(e=0;e<Pr.length;e++)if(n=Pr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,a=n.pending;if(a!==null){var o=a.next;a.next=r,i.next=o}n.pending=i}Pr=null}return t}function sg(t,e){do{var n=Nt;try{if(Yf(),gl.current=ql,Yl){for(var i=At.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Yl=!1}if(Br=0,Ot=It=At=null,Do=!1,Jo=0,oh.current=null,n===null||n.return===null){Dt=1,ns=e,Nt=null;break}e:{var a=t,o=n.return,s=n,l=e;if(e=Ht,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=s,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=Np(o);if(p!==null){p.flags&=-257,Ip(p,o,s,a,e),p.mode&1&&Lp(a,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){Lp(a,c,e),dh();break e}l=Error(ie(426))}}else if(vt&&s.mode&1){var x=Np(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Ip(x,o,s,a,e),jf(Wa(l,s));break e}}a=l=Wa(l,s),Dt!==4&&(Dt=2),Uo===null?Uo=[a]:Uo.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,e&=-e,a.lanes|=e;var u=Wx(a,l,e);bp(a,u);break e;case 1:s=l;var g=a.type,v=a.stateNode;if(!(a.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(sr===null||!sr.has(v)))){a.flags|=65536,e&=-e,a.lanes|=e;var E=jx(a,s,e);bp(a,E);break e}}a=a.return}while(a!==null)}ug(n)}catch(w){e=w,Nt===n&&n!==null&&(Nt=n=n.return);continue}break}while(!0)}function lg(){var t=$l.current;return $l.current=ql,t===null?ql:t}function dh(){(Dt===0||Dt===3||Dt===2)&&(Dt=4),kt===null||!(Gr&268435455)&&!(mc&268435455)||Ki(kt,Ht)}function Ql(t,e){var n=et;et|=2;var i=lg();(kt!==t||Ht!==e)&&(Si=null,Ur(t,e));do try{Cy();break}catch(r){sg(t,r)}while(!0);if(Yf(),et=n,$l.current=i,Nt!==null)throw Error(ie(261));return kt=null,Ht=0,Dt}function Cy(){for(;Nt!==null;)cg(Nt)}function Ty(){for(;Nt!==null&&!Qv();)cg(Nt)}function cg(t){var e=fg(t.alternate,t,Mn);t.memoizedProps=t.pendingProps,e===null?ug(t):Nt=e,oh.current=null}function ug(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=yy(n,e),n!==null){n.flags&=32767,Nt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Dt=6,Nt=null;return}}else if(n=_y(n,e,Mn),n!==null){Nt=n;return}if(e=e.sibling,e!==null){Nt=e;return}Nt=e=t}while(e!==null);Dt===0&&(Dt=5)}function Cr(t,e,n){var i=at,r=Fn.transition;try{Fn.transition=null,at=1,wy(t,e,n,i)}finally{Fn.transition=r,at=i}return null}function wy(t,e,n,i){do Na();while(er!==null);if(et&6)throw Error(ie(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ie(177));t.callbackNode=null,t.callbackPriority=0;var a=n.lanes|n.childLanes;if(l_(t,a),t===kt&&(Nt=kt=null,Ht=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ds||(Ds=!0,hg(Il,function(){return Na(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Fn.transition,Fn.transition=null;var o=at;at=1;var s=et;et|=4,oh.current=null,My(t,n),rg(n,t),q_(id),zl=!!nd,id=nd=null,t.current=n,Ey(n),Jv(),et=s,at=o,Fn.transition=a}else t.current=n;if(Ds&&(Ds=!1,er=t,Zl=r),a=t.pendingLanes,a===0&&(sr=null),n_(n.stateNode),gn(t,Pt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Kl)throw Kl=!1,t=Ed,Ed=null,t;return Zl&1&&t.tag!==0&&Na(),a=t.pendingLanes,a&1?t===Ad?Fo++:(Fo=0,Ad=t):Fo=0,xr(),null}function Na(){if(er!==null){var t=W0(Zl),e=Fn.transition,n=at;try{if(Fn.transition=null,at=16>t?16:t,er===null)var i=!1;else{if(t=er,er=null,Zl=0,et&6)throw Error(ie(331));var r=et;for(et|=4,pe=t.current;pe!==null;){var a=pe,o=a.child;if(pe.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(pe=c;pe!==null;){var d=pe;switch(d.tag){case 0:case 11:case 15:zo(8,d,a)}var h=d.child;if(h!==null)h.return=d,pe=h;else for(;pe!==null;){d=pe;var f=d.sibling,p=d.return;if(tg(d),d===c){pe=null;break}if(f!==null){f.return=p,pe=f;break}pe=p}}}var _=a.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var x=y.sibling;y.sibling=null,y=x}while(y!==null)}}pe=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,pe=o;else e:for(;pe!==null;){if(a=pe,a.flags&2048)switch(a.tag){case 0:case 11:case 15:zo(9,a,a.return)}var u=a.sibling;if(u!==null){u.return=a.return,pe=u;break e}pe=a.return}}var g=t.current;for(pe=g;pe!==null;){o=pe;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,pe=v;else e:for(o=g;pe!==null;){if(s=pe,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:pc(9,s)}}catch(w){wt(s,s.return,w)}if(s===o){pe=null;break e}var E=s.sibling;if(E!==null){E.return=s.return,pe=E;break e}pe=s.return}}if(et=r,xr(),ui&&typeof ui.onPostCommitFiberRoot=="function")try{ui.onPostCommitFiberRoot(oc,t)}catch{}i=!0}return i}finally{at=n,Fn.transition=e}}return!1}function Xp(t,e,n){e=Wa(n,e),e=Wx(t,e,1),t=or(t,e,1),e=on(),t!==null&&(ds(t,1,e),gn(t,e))}function wt(t,e,n){if(t.tag===3)Xp(t,t,n);else for(;e!==null;){if(e.tag===3){Xp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(sr===null||!sr.has(i))){t=Wa(n,t),t=jx(e,t,1),e=or(e,t,1),t=on(),e!==null&&(ds(e,1,t),gn(e,t));break}}e=e.return}}function Ry(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=on(),t.pingedLanes|=t.suspendedLanes&n,kt===t&&(Ht&n)===n&&(Dt===4||Dt===3&&(Ht&130023424)===Ht&&500>Pt()-lh?Ur(t,0):sh|=n),gn(t,e)}function dg(t,e){e===0&&(t.mode&1?(e=As,As<<=1,!(As&130023424)&&(As=4194304)):e=1);var n=on();t=Ii(t,e),t!==null&&(ds(t,e,n),gn(t,n))}function Py(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dg(t,n)}function Ly(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),dg(t,n)}var fg;fg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||mn.current)pn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return pn=!1,vy(t,e,n);pn=!!(t.flags&131072)}else pn=!1,vt&&e.flags&1048576&&xx(e,Vl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;_l(t,e),t=e.pendingProps;var r=Ba(e,Zt.current);La(e,n),r=th(null,e,i,t,r,n);var a=nh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,xn(i)?(a=!0,Bl(e)):a=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Kf(e),r.updater=hc,e.stateNode=r,r._reactInternals=e,fd(e,i,t,n),e=md(null,e,i,!0,a,n)):(e.tag=0,vt&&a&&Hf(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(_l(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Iy(i),t=jn(i,t),r){case 0:e=pd(null,e,i,t,n);break e;case 1:e=Up(null,e,i,t,n);break e;case 11:e=Dp(null,e,i,t,n);break e;case 14:e=zp(null,e,i,jn(i.type,t),n);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),pd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),Up(t,e,i,r,n);case 3:e:{if($x(e),t===null)throw Error(ie(387));i=e.pendingProps,a=e.memoizedState,r=a.element,Mx(t,e),jl(e,i,null,n);var o=e.memoizedState;if(i=o.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=a,e.memoizedState=a,e.flags&256){r=Wa(Error(ie(423)),e),e=Fp(t,e,i,n,r);break e}else if(i!==r){r=Wa(Error(ie(424)),e),e=Fp(t,e,i,n,r);break e}else for(bn=ar(e.stateNode.containerInfo.firstChild),Cn=e,vt=!0,Yn=null,n=yx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ga(),i===r){e=Di(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return Ex(e),t===null&&cd(e),i=e.type,r=e.pendingProps,a=t!==null?t.memoizedProps:null,o=r.children,rd(i,r)?o=null:a!==null&&rd(i,a)&&(e.flags|=32),qx(t,e),an(t,e,o,n),e.child;case 6:return t===null&&cd(e),null;case 13:return Kx(t,e,n);case 4:return Zf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Va(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),Dp(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,a=e.memoizedProps,o=r.value,ft(Hl,i._currentValue),i._currentValue=o,a!==null)if(Jn(a.value,o)){if(a.children===r.children&&!mn.current){e=Di(t,e,n);break e}}else for(a=e.child,a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===i){if(a.tag===1){l=wi(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),ud(a.return,n,e),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===e.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(ie(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),ud(o,n,e),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===e){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,La(e,n),r=On(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=jn(i,e.pendingProps),r=jn(i.type,r),zp(t,e,i,r,n);case 15:return Xx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),_l(t,e),e.tag=1,xn(i)?(t=!0,Bl(e)):t=!1,La(e,n),Hx(e,i,r),fd(e,i,r,n),md(null,e,i,!0,t,n);case 19:return Zx(t,e,n);case 22:return Yx(t,e,n)}throw Error(ie(156,e.tag))};function hg(t,e){return B0(t,e)}function Ny(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(t,e,n,i){return new Ny(t,e,n,i)}function fh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Iy(t){if(typeof t=="function")return fh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Lf)return 11;if(t===Nf)return 14}return 2}function cr(t,e){var n=t.alternate;return n===null?(n=zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ml(t,e,n,i,r,a){var o=2;if(i=t,typeof t=="function")fh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case xa:return Fr(n.children,r,a,e);case Pf:o=8,r|=8;break;case Uu:return t=zn(12,n,e,r|2),t.elementType=Uu,t.lanes=a,t;case Fu:return t=zn(13,n,e,r),t.elementType=Fu,t.lanes=a,t;case Ou:return t=zn(19,n,e,r),t.elementType=Ou,t.lanes=a,t;case E0:return xc(n,r,a,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case S0:o=10;break e;case M0:o=9;break e;case Lf:o=11;break e;case Nf:o=14;break e;case Xi:o=16,i=null;break e}throw Error(ie(130,t==null?t:typeof t,""))}return e=zn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=a,e}function Fr(t,e,n,i){return t=zn(7,t,i,e),t.lanes=n,t}function xc(t,e,n,i){return t=zn(22,t,i,e),t.elementType=E0,t.lanes=n,t.stateNode={isHidden:!1},t}function eu(t,e,n){return t=zn(6,t,null,e),t.lanes=n,t}function tu(t,e,n){return e=zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Dy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function hh(t,e,n,i,r,a,o,s,l){return t=new Dy(t,e,n,s,l),e===1?(e=1,a===!0&&(e|=8)):e=0,a=zn(3,null,null,e),t.current=a,a.stateNode=t,a.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Kf(a),t}function zy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ma,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function pg(t){if(!t)return fr;t=t._reactInternals;e:{if(Xr(t)!==t||t.tag!==1)throw Error(ie(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(xn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(t.tag===1){var n=t.type;if(xn(n))return px(t,n,e)}return e}function mg(t,e,n,i,r,a,o,s,l){return t=hh(n,i,!0,t,r,a,o,s,l),t.context=pg(null),n=t.current,i=on(),r=lr(n),a=wi(i,r),a.callback=e??null,or(n,a,r),t.current.lanes=r,ds(t,r,i),gn(t,i),t}function gc(t,e,n,i){var r=e.current,a=on(),o=lr(r);return n=pg(n),e.context===null?e.context=n:e.pendingContext=n,e=wi(a,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=or(r,e,o),t!==null&&(Zn(t,r,o,a),xl(t,r,o)),o}function Jl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Yp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ph(t,e){Yp(t,e),(t=t.alternate)&&Yp(t,e)}function Uy(){return null}var xg=typeof reportError=="function"?reportError:function(t){console.error(t)};function mh(t){this._internalRoot=t}vc.prototype.render=mh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ie(409));gc(t,e,null,null)};vc.prototype.unmount=mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Vr(function(){gc(null,t,null,null)}),e[Ni]=null}};function vc(t){this._internalRoot=t}vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Y0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$i.length&&e!==0&&e<$i[n].priority;n++);$i.splice(n,0,t),n===0&&$0(t)}};function xh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function _c(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function qp(){}function Fy(t,e,n,i,r){if(r){if(typeof i=="function"){var a=i;i=function(){var c=Jl(o);a.call(c)}}var o=mg(e,i,t,0,null,!1,!1,"",qp);return t._reactRootContainer=o,t[Ni]=o.current,qo(t.nodeType===8?t.parentNode:t),Vr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var s=i;i=function(){var c=Jl(l);s.call(c)}}var l=hh(t,0,!1,null,null,!1,!1,"",qp);return t._reactRootContainer=l,t[Ni]=l.current,qo(t.nodeType===8?t.parentNode:t),Vr(function(){gc(e,l,n,i)}),l}function yc(t,e,n,i,r){var a=n._reactRootContainer;if(a){var o=a;if(typeof r=="function"){var s=r;r=function(){var l=Jl(o);s.call(l)}}gc(e,o,t,r)}else o=Fy(n,e,t,r,i);return Jl(o)}j0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Co(e.pendingLanes);n!==0&&(zf(e,n|1),gn(e,Pt()),!(et&6)&&(ja=Pt()+500,xr()))}break;case 13:Vr(function(){var i=Ii(t,1);if(i!==null){var r=on();Zn(i,t,1,r)}}),ph(t,1)}};Uf=function(t){if(t.tag===13){var e=Ii(t,134217728);if(e!==null){var n=on();Zn(e,t,134217728,n)}ph(t,134217728)}};X0=function(t){if(t.tag===13){var e=lr(t),n=Ii(t,e);if(n!==null){var i=on();Zn(n,t,e,i)}ph(t,e)}};Y0=function(){return at};q0=function(t,e){var n=at;try{return at=t,e()}finally{at=n}};qu=function(t,e,n){switch(e){case"input":if(Gu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=uc(i);if(!r)throw Error(ie(90));b0(i),Gu(i,r)}}}break;case"textarea":T0(t,n);break;case"select":e=n.value,e!=null&&Ta(t,!!n.multiple,e,!1)}};D0=ch;z0=Vr;var Oy={usingClientEntryPoint:!1,Events:[hs,ya,uc,N0,I0,ch]},mo={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ky={bundleType:mo.bundleType,version:mo.version,rendererPackageName:mo.rendererPackageName,rendererConfig:mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ui.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=O0(t),t===null?null:t.stateNode},findFiberByHostInstance:mo.findFiberByHostInstance||Uy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zs.isDisabled&&zs.supportsFiber)try{oc=zs.inject(ky),ui=zs}catch{}}Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Oy;Rn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xh(e))throw Error(ie(200));return zy(t,e,null,n)};Rn.createRoot=function(t,e){if(!xh(t))throw Error(ie(299));var n=!1,i="",r=xg;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=hh(t,1,!1,null,null,n,!1,i,r),t[Ni]=e.current,qo(t.nodeType===8?t.parentNode:t),new mh(e)};Rn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ie(188)):(t=Object.keys(t).join(","),Error(ie(268,t)));return t=O0(e),t=t===null?null:t.stateNode,t};Rn.flushSync=function(t){return Vr(t)};Rn.hydrate=function(t,e,n){if(!_c(e))throw Error(ie(200));return yc(null,t,e,!0,n)};Rn.hydrateRoot=function(t,e,n){if(!xh(t))throw Error(ie(405));var i=n!=null&&n.hydratedSources||null,r=!1,a="",o=xg;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=mg(e,null,t,1,n??null,r,!1,a,o),t[Ni]=e.current,qo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new vc(e)};Rn.render=function(t,e,n){if(!_c(e))throw Error(ie(200));return yc(null,t,e,!1,n)};Rn.unmountComponentAtNode=function(t){if(!_c(t))throw Error(ie(40));return t._reactRootContainer?(Vr(function(){yc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ni]=null})}),!0):!1};Rn.unstable_batchedUpdates=ch;Rn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!_c(n))throw Error(ie(200));if(t==null||t._reactInternals===void 0)throw Error(ie(38));return yc(t,e,n,!1,i)};Rn.version="18.3.1-next-f1338f8080-20240426";function gg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gg)}catch(t){console.error(t)}}gg(),g0.exports=Rn;var By=g0.exports,vg,$p=By;vg=$p.createRoot,$p.hydrateRoot;const Gy="/csd.station.italia/assets/logo-BxX5Tg7S.png";function Vy({current:t,onNavigate:e,onOpenChat:n}){return m.jsx("header",{id:"site-header",className:"sticky top-0 z-20 header-anim backdrop-blur",children:m.jsxs("div",{className:"px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 flex items-center justify-between",children:[m.jsxs("div",{className:"flex items-center gap-3",children:[m.jsx("img",{src:Gy,alt:"CSD Station logo",className:"h-10 w-10 md:h-12 md:w-12 rounded-md object-contain"}),m.jsx("h2",{className:"text-cream text-lg font-bold font-heading tracking-tight",children:"CSD Station"})]}),m.jsxs("nav",{className:"hidden md:flex items-center gap-8",children:[m.jsx("button",{className:`text-sm font-medium transition-colors ${t==="home"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("home"),children:"Home"}),m.jsx("button",{className:`text-sm font-medium transition-colors ${t==="servizi"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("servizi"),children:"Servizi"}),m.jsx("button",{className:`text-sm font-medium transition-colors ${t==="chiSiamo"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("chiSiamo"),children:"Chi Siamo"}),m.jsx("button",{className:`text-sm font-medium transition-colors ${t==="contatti"?"text-cream":"text-cream opacity-80 hover:opacity-100"}`,onClick:()=>e("contatti"),children:"Contatti"})]})]})})}function Hy({onNavigate:t}){const e=new Date().getFullYear();return m.jsx("footer",{id:"site-footer",className:"mt-16 border-t border-white/10",children:m.jsxs("div",{className:"px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 flex flex-col gap-4 text-sm",children:[m.jsxs("div",{className:"flex items-center justify-between gap-4",children:[m.jsxs("div",{className:"text-gray-400",children:["© ",e," CSD Station — Sezione Italia"]}),m.jsxs("div",{className:"flex flex-wrap gap-2",children:[m.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"AI Agentics"}),m.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"Automazione"}),m.jsx("span",{className:"px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"OpenAI SDK"})]})]}),m.jsxs("div",{className:"flex items-center justify-end gap-6",children:[m.jsxs("nav",{className:"flex items-center gap-4",children:[m.jsx("button",{onClick:()=>t==null?void 0:t("documentation"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left",children:"Documentation"}),m.jsx("button",{className:"text-white/60 hover:text-white/80 transition-colors text-left",disabled:!0,title:"In arrivo",children:"QR Code"}),m.jsx("button",{onClick:()=>t==null?void 0:t("contatti"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left",children:"Servizio Clienti"}),m.jsx("button",{className:"text-white/60 hover:text-white/80 transition-colors text-left",disabled:!0,title:"In arrivo",children:"Careers"})]}),m.jsxs("div",{className:"flex items-center gap-4",children:[m.jsx("a",{"aria-label":"LinkedIn",href:"https://www.linkedin.com/in/carlo-galli-086303367/",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle",children:m.jsx("svg",{className:"w-5 h-5 transform -translate-y-[1px]",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",role:"img",focusable:"false",children:m.jsx("path",{d:"M4.983 3.5c0 1.381-1.11 2.5-2.482 2.5C1.12 6 0 4.881 0 3.5 0 2.12 1.12 1 2.501 1c1.372 0 2.482 1.12 2.482 2.5zM.25 8.25h4.5v15.5H.25V8.25zM8.75 8.25h4.309v2.117h.062c.6-1.137 2.066-2.338 4.254-2.338 4.55 0 5.392 2.992 5.392 6.881v8.84h-4.5v-7.84c0-1.871-.033-4.277-2.607-4.277-2.61 0-3.01 2.04-3.01 4.145v7.972h-4.5V8.25z"})})}),m.jsx("a",{"aria-label":"GitHub",href:"https://github.com/TheRealGalli",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle",children:m.jsx("svg",{className:"w-5 h-5 transform translate-y-[1px]",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",role:"img",focusable:"false",children:m.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 .5C5.73.5.98 5.245.98 11.51c0 4.853 3.152 8.965 7.523 10.414.55.104.75-.237.75-.53 0-.262-.01-1.135-.017-2.06-3.06.665-3.705-1.296-3.705-1.296-.5-1.272-1.222-1.612-1.222-1.612-.998-.683.076-.67.076-.67 1.103.078 1.683 1.132 1.683 1.132.982 1.682 2.575 1.196 3.203.915.1-.712.384-1.196.698-1.472-2.441-.277-5.009-1.22-5.009-5.427 0-1.198.427-2.177 1.13-2.946-.113-.277-.49-1.396.106-2.91 0 0 .92-.294 3.017 1.127.874-.243 1.81-.365 2.742-.369.93.004 1.867.126 2.742.369 2.097-1.42 3.016-1.127 3.016-1.127.597 1.514.22 2.633.107 2.91.704.769 1.13 1.748 1.13 2.946 0 4.22-2.574 5.147-5.023 5.418.395.34.747 1.01.747 2.036 0 1.47-.013 2.654-.013 3.016 0 .296.198.64.757.53 4.366-1.45 7.516-5.56 7.516-10.413C23.02 5.245 18.27.5 12 .5z"})})})]})]}),m.jsxs("div",{className:"pt-4 border-t border-white/10 flex items-center justify-end gap-6 text-xs",children:[m.jsx("button",{onClick:()=>t==null?void 0:t("terms"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors",children:"Terms of Service"}),m.jsx("button",{onClick:()=>t==null?void 0:t("privacy"),className:"text-cream opacity-90 hover:opacity-100 font-medium transition-colors",children:"Privacy Policy"})]})]})})}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gh="181",Wy=0,Kp=1,jy=2,_g=1,Xy=2,yi=3,hr=0,sn=1,Ai=2,Ri=0,Ia=1,Zp=2,Qp=3,Jp=4,Yy=5,Tr=100,qy=101,$y=102,Ky=103,Zy=104,Qy=200,Jy=201,eS=202,tS=203,Td=204,wd=205,nS=206,iS=207,rS=208,aS=209,oS=210,sS=211,lS=212,cS=213,uS=214,Rd=0,Pd=1,Ld=2,Xa=3,Nd=4,Id=5,Dd=6,zd=7,vh=0,dS=1,fS=2,ur=0,hS=1,pS=2,mS=3,yg=4,xS=5,gS=6,vS=7,Sg=300,Ya=301,qa=302,Ud=303,Fd=304,Sc=306,Od=1e3,Ti=1001,kd=1002,Tn=1003,_S=1004,Us=1005,Un=1006,nu=1007,Nr=1008,hi=1009,Mg=1010,Eg=1011,is=1012,_h=1013,Hr=1014,si=1015,eo=1016,yh=1017,Sh=1018,rs=1020,Ag=35902,bg=35899,Cg=1021,Tg=1022,$n=1023,as=1026,os=1027,Mh=1028,Eh=1029,Ah=1030,bh=1031,Ch=1033,El=33776,Al=33777,bl=33778,Cl=33779,Bd=35840,Gd=35841,Vd=35842,Hd=35843,Wd=36196,jd=37492,Xd=37496,Yd=37808,qd=37809,$d=37810,Kd=37811,Zd=37812,Qd=37813,Jd=37814,ef=37815,tf=37816,nf=37817,rf=37818,af=37819,of=37820,sf=37821,lf=36492,cf=36494,uf=36495,df=36283,ff=36284,hf=36285,pf=36286,yS=3200,SS=3201,Th=0,MS=1,Zi="",En="srgb",$a="srgb-linear",ec="linear",lt="srgb",Kr=7680,em=519,ES=512,AS=513,bS=514,wg=515,CS=516,TS=517,wS=518,RS=519,tm=35044,nm="300 es",li=2e3,tc=2001;function Rg(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function nc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function PS(){const t=nc("canvas");return t.style.display="block",t}const im={};function rm(...t){const e="THREE."+t.shift();console.log(e,...t)}function ze(...t){const e="THREE."+t.shift();console.warn(e,...t)}function Rt(...t){const e="THREE."+t.shift();console.error(e,...t)}function ss(...t){const e=t.join(" ");e in im||(im[e]=!0,ze(...t))}function LS(t,e,n){return new Promise(function(i,r){function a(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}class to{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(n);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let am=1234567;const Oo=Math.PI/180,ls=180/Math.PI;function no(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[t&255]+Yt[t>>8&255]+Yt[t>>16&255]+Yt[t>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[n&63|128]+Yt[n>>8&255]+"-"+Yt[n>>16&255]+Yt[n>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function He(t,e,n){return Math.max(e,Math.min(n,t))}function wh(t,e){return(t%e+e)%e}function NS(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function IS(t,e,n){return t!==e?(n-t)/(e-t):0}function ko(t,e,n){return(1-n)*t+n*e}function DS(t,e,n,i){return ko(t,e,1-Math.exp(-n*i))}function zS(t,e=1){return e-Math.abs(wh(t,e*2)-e)}function US(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function FS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function OS(t,e){return t+Math.floor(Math.random()*(e-t+1))}function kS(t,e){return t+Math.random()*(e-t)}function BS(t){return t*(.5-Math.random())}function GS(t){t!==void 0&&(am=t);let e=am+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function VS(t){return t*Oo}function HS(t){return t*ls}function WS(t){return(t&t-1)===0&&t!==0}function jS(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function XS(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function YS(t,e,n,i,r){const a=Math.cos,o=Math.sin,s=a(n/2),l=o(n/2),c=a((e+i)/2),d=o((e+i)/2),h=a((e-i)/2),f=o((e-i)/2),p=a((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(s*d,l*h,l*f,s*c);break;case"YZY":t.set(l*f,s*d,l*h,s*c);break;case"ZXZ":t.set(l*h,l*f,s*d,s*c);break;case"XZX":t.set(s*d,l*_,l*p,s*c);break;case"YXY":t.set(l*p,s*d,l*_,s*c);break;case"ZYZ":t.set(l*_,l*p,s*d,s*c);break;default:ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function pa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function tn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const mf={DEG2RAD:Oo,RAD2DEG:ls,generateUUID:no,clamp:He,euclideanModulo:wh,mapLinear:NS,inverseLerp:IS,lerp:ko,damp:DS,pingpong:zS,smoothstep:US,smootherstep:FS,randInt:OS,randFloat:kS,randFloatSpread:BS,seededRandom:GS,degToRad:VS,radToDeg:HS,isPowerOfTwo:WS,ceilPowerOfTwo:jS,floorPowerOfTwo:XS,setQuaternionFromProperEuler:YS,normalize:tn,denormalize:pa};class We{constructor(e=0,n=0){We.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=He(this.x,e.x,n.x),this.y=He(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=He(this.x,e,n),this.y=He(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ms{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,a,o,s){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3],f=a[o+0],p=a[o+1],_=a[o+2],y=a[o+3];if(s<=0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h;return}if(s>=1){e[n+0]=f,e[n+1]=p,e[n+2]=_,e[n+3]=y;return}if(h!==y||l!==f||c!==p||d!==_){let x=l*f+c*p+d*_+h*y;x<0&&(f=-f,p=-p,_=-_,y=-y,x=-x);let u=1-s;if(x<.9995){const g=Math.acos(x),v=Math.sin(g);u=Math.sin(u*g)/v,s=Math.sin(s*g)/v,l=l*u+f*s,c=c*u+p*s,d=d*u+_*s,h=h*u+y*s}else{l=l*u+f*s,c=c*u+p*s,d=d*u+_*s,h=h*u+y*s;const g=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=g,c*=g,d*=g,h*=g}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,a,o){const s=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=a[o],f=a[o+1],p=a[o+2],_=a[o+3];return e[n]=s*_+d*h+l*p-c*f,e[n+1]=l*_+d*f+c*h-s*p,e[n+2]=c*_+d*p+s*f-l*h,e[n+3]=d*_-s*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,a=e._z,o=e._order,s=Math.cos,l=Math.sin,c=s(i/2),d=s(r/2),h=s(a/2),f=l(i/2),p=l(r/2),_=l(a/2);switch(o){case"XYZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"YXZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"ZXY":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"ZYX":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"YZX":this._x=f*d*h+c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h-f*p*_;break;case"XZY":this._x=f*d*h-c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h+f*p*_;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],a=n[8],o=n[1],s=n[5],l=n[9],c=n[2],d=n[6],h=n[10],f=i+s+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(a-c)*p,this._z=(o-r)*p}else if(i>s&&i>h){const p=2*Math.sqrt(1+i-s-h);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+c)/p}else if(s>h){const p=2*Math.sqrt(1+s-i-h);this._w=(a-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-s);this._w=(o-r)/p,this._x=(a+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,a=e._z,o=e._w,s=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+o*s+r*c-a*l,this._y=r*d+o*l+a*s-i*c,this._z=a*d+o*c+i*l-r*s,this._w=o*d-i*s-r*l-a*c,this._onChangeCallback(),this}slerp(e,n){if(n<=0)return this;if(n>=1)return this.copy(e);let i=e._x,r=e._y,a=e._z,o=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,o=-o,s=-s);let l=1-n;if(s<.9995){const c=Math.acos(s),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+a*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(n),a*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,n=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(om.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(om.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6]*r,this.y=a[1]*n+a[4]*i+a[7]*r,this.z=a[2]*n+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*n+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,a=e.x,o=e.y,s=e.z,l=e.w,c=2*(o*r-s*i),d=2*(s*n-a*r),h=2*(a*i-o*n);return this.x=n+l*c+o*h-s*d,this.y=i+l*d+s*c-a*h,this.z=r+l*h+a*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r,this.y=a[1]*n+a[5]*i+a[9]*r,this.z=a[2]*n+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=He(this.x,e.x,n.x),this.y=He(this.y,e.y,n.y),this.z=He(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=He(this.x,e,n),this.y=He(this.y,e,n),this.z=He(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,a=e.z,o=n.x,s=n.y,l=n.z;return this.x=r*l-a*s,this.y=a*o-i*l,this.z=i*s-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return iu.copy(this).projectOnVector(e),this.sub(iu)}reflect(e){return this.sub(iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(He(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const iu=new O,om=new ms;class ke{constructor(e,n,i,r,a,o,s,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c)}set(e,n,i,r,a,o,s,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=s,d[3]=n,d[4]=a,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],p=i[5],_=i[8],y=r[0],x=r[3],u=r[6],g=r[1],v=r[4],E=r[7],w=r[2],b=r[5],T=r[8];return a[0]=o*y+s*g+l*w,a[3]=o*x+s*v+l*b,a[6]=o*u+s*E+l*T,a[1]=c*y+d*g+h*w,a[4]=c*x+d*v+h*b,a[7]=c*u+d*E+h*T,a[2]=f*y+p*g+_*w,a[5]=f*x+p*v+_*b,a[8]=f*u+p*E+_*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],d=e[8];return n*o*d-n*s*c-i*a*d+i*s*l+r*a*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],d=e[8],h=d*o-s*c,f=s*l-d*a,p=c*a-o*l,_=n*h+i*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=h*y,e[1]=(r*c-d*i)*y,e[2]=(s*i-r*o)*y,e[3]=f*y,e[4]=(d*n-r*l)*y,e[5]=(r*a-s*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*a)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,a,o,s){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*o+c*s)+o+e,-r*c,r*l,-r*(-c*o+l*s)+s+n,0,0,1),this}scale(e,n){return this.premultiply(ru.makeScale(e,n)),this}rotate(e){return this.premultiply(ru.makeRotation(-e)),this}translate(e,n){return this.premultiply(ru.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ru=new ke,sm=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lm=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qS(){const t={enabled:!0,workingColorSpace:$a,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===lt&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(r.r=Da(r.r),r.g=Da(r.g),r.b=Da(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zi?ec:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[$a]:{primaries:e,whitePoint:i,transfer:ec,toXYZ:sm,fromXYZ:lm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:En},outputColorSpaceConfig:{drawingBufferColorSpace:En}},[En]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:sm,fromXYZ:lm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:En}}}),t}const it=qS();function Pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Da(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Zr;class $S{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Zr===void 0&&(Zr=nc("canvas")),Zr.width=e.width,Zr.height=e.height;const r=Zr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Zr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=nc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Pi(a[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pi(n[i]/255)*255):n[i]=Pi(n[i]);return{data:n,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let KS=0;class Rh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=no(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(au(r[o].image)):a.push(au(r[o]))}else a=au(r);i.url=a}return n||(e.images[this.uuid]=i),i}}function au(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?$S.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let ZS=0;const ou=new O;class ln extends to{constructor(e=ln.DEFAULT_IMAGE,n=ln.DEFAULT_MAPPING,i=Ti,r=Ti,a=Un,o=Nr,s=$n,l=hi,c=ln.DEFAULT_ANISOTROPY,d=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=no(),this.name="",this.source=new Rh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ou).x}get height(){return this.source.getSize(ou).y}get depth(){return this.source.getSize(ou).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ze(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Od:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case kd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Od:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case kd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=Sg;ln.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,n=0,i=0,r=1){ct.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,a;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],_=l[9],y=l[2],x=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-y)<.01&&Math.abs(_-x)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+y)<.1&&Math.abs(_+x)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,E=(p+1)/2,w=(u+1)/2,b=(d+f)/4,T=(h+y)/4,P=(_+x)/4;return v>E&&v>w?v<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(v),r=b/i,a=T/i):E>w?E<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),i=b/r,a=P/r):w<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(w),i=T/a,r=P/a),this.set(i,r,a,n),this}let g=Math.sqrt((x-_)*(x-_)+(h-y)*(h-y)+(f-d)*(f-d));return Math.abs(g)<.001&&(g=1),this.x=(x-_)/g,this.y=(h-y)/g,this.z=(f-d)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=He(this.x,e.x,n.x),this.y=He(this.y,e.y,n.y),this.z=He(this.z,e.z,n.z),this.w=He(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=He(this.x,e,n),this.y=He(this.y,e,n),this.z=He(this.z,e,n),this.w=He(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(He(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QS extends to{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new ct(0,0,e,n),this.scissorTest=!1,this.viewport=new ct(0,0,e,n);const r={width:e,height:n,depth:i.depth},a=new ln(r);this.textures=[];const o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Rh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wr extends QS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Pg extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class JS extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yr{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Vn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Vn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Vn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(a,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fs.copy(i.boundingBox)),Fs.applyMatrix4(e.matrixWorld),this.union(Fs)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xo),Os.subVectors(this.max,xo),Qr.subVectors(e.a,xo),Jr.subVectors(e.b,xo),ea.subVectors(e.c,xo),ki.subVectors(Jr,Qr),Bi.subVectors(ea,Jr),_r.subVectors(Qr,ea);let n=[0,-ki.z,ki.y,0,-Bi.z,Bi.y,0,-_r.z,_r.y,ki.z,0,-ki.x,Bi.z,0,-Bi.x,_r.z,0,-_r.x,-ki.y,ki.x,0,-Bi.y,Bi.x,0,-_r.y,_r.x,0];return!su(n,Qr,Jr,ea,Os)||(n=[1,0,0,0,1,0,0,0,1],!su(n,Qr,Jr,ea,Os))?!1:(ks.crossVectors(ki,Bi),n=[ks.x,ks.y,ks.z],su(n,Qr,Jr,ea,Os))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const pi=[new O,new O,new O,new O,new O,new O,new O,new O],Vn=new O,Fs=new Yr,Qr=new O,Jr=new O,ea=new O,ki=new O,Bi=new O,_r=new O,xo=new O,Os=new O,ks=new O,yr=new O;function su(t,e,n,i,r){for(let a=0,o=t.length-3;a<=o;a+=3){yr.fromArray(t,a);const s=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),l=e.dot(yr),c=n.dot(yr),d=i.dot(yr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>s)return!1}return!0}const e1=new Yr,go=new O,lu=new O;class xs{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):e1.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);const n=go.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(go,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(lu)),this.expandByPoint(go.copy(e.center).sub(lu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const mi=new O,cu=new O,Bs=new O,Gi=new O,uu=new O,Gs=new O,du=new O;class Lg{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=mi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,n),mi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){cu.copy(e).add(n).multiplyScalar(.5),Bs.copy(n).sub(e).normalize(),Gi.copy(this.origin).sub(cu);const a=e.distanceTo(n)*.5,o=-this.direction.dot(Bs),s=Gi.dot(this.direction),l=-Gi.dot(Bs),c=Gi.lengthSq(),d=Math.abs(1-o*o);let h,f,p,_;if(d>0)if(h=o*l-s,f=o*s-l,_=a*d,h>=0)if(f>=-_)if(f<=_){const y=1/d;h*=y,f*=y,p=h*(h+o*f+2*s)+f*(o*h+f+2*l)+c}else f=a,h=Math.max(0,-(o*f+s)),p=-h*h+f*(f+2*l)+c;else f=-a,h=Math.max(0,-(o*f+s)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*a+s)),f=h>0?-a:Math.min(Math.max(-a,-l),a),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-a,-l),a),p=f*(f+2*l)+c):(h=Math.max(0,-(o*a+s)),f=h>0?a:Math.min(Math.max(-a,-l),a),p=-h*h+f*(f+2*l)+c);else f=o>0?-a:a,h=Math.max(0,-(o*f+s)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(cu).addScaledVector(Bs,f),p}intersectSphere(e,n){mi.subVectors(e.center,this.origin);const i=mi.dot(this.direction),r=mi.dot(mi)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),s=i-o,l=i+o;return l<0?null:s<0?this.at(l,n):this.at(s,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,a,o,s,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(a=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),h>=0?(s=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(s=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,n,i,r,a){uu.subVectors(n,e),Gs.subVectors(i,e),du.crossVectors(uu,Gs);let o=this.direction.dot(du),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;Gi.subVectors(this.origin,e);const l=s*this.direction.dot(Gs.crossVectors(Gi,Gs));if(l<0)return null;const c=s*this.direction.dot(uu.cross(Gi));if(c<0||l+c>o)return null;const d=-s*Gi.dot(du);return d<0?null:this.at(d/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,n,i,r,a,o,s,l,c,d,h,f,p,_,y,x){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,a,o,s,l,c,d,h,f,p,_,y,x)}set(e,n,i,r,a,o,s,l,c,d,h,f,p,_,y,x){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=a,u[5]=o,u[9]=s,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=_,u[11]=y,u[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ta.setFromMatrixColumn(e,0).length(),a=1/ta.setFromMatrixColumn(e,1).length(),o=1/ta.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),s=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const f=o*d,p=o*h,_=s*d,y=s*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+_*c,n[5]=f-y*c,n[9]=-s*l,n[2]=y-f*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*d,p=l*h,_=c*d,y=c*h;n[0]=f+y*s,n[4]=_*s-p,n[8]=o*c,n[1]=o*h,n[5]=o*d,n[9]=-s,n[2]=p*s-_,n[6]=y+f*s,n[10]=o*l}else if(e.order==="ZXY"){const f=l*d,p=l*h,_=c*d,y=c*h;n[0]=f-y*s,n[4]=-o*h,n[8]=_+p*s,n[1]=p+_*s,n[5]=o*d,n[9]=y-f*s,n[2]=-o*c,n[6]=s,n[10]=o*l}else if(e.order==="ZYX"){const f=o*d,p=o*h,_=s*d,y=s*h;n[0]=l*d,n[4]=_*c-p,n[8]=f*c+y,n[1]=l*h,n[5]=y*c+f,n[9]=p*c-_,n[2]=-c,n[6]=s*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,_=s*l,y=s*c;n[0]=l*d,n[4]=y-f*h,n[8]=_*h+p,n[1]=h,n[5]=o*d,n[9]=-s*d,n[2]=-c*d,n[6]=p*h+_,n[10]=f-y*h}else if(e.order==="XZY"){const f=o*l,p=o*c,_=s*l,y=s*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=f*h+y,n[5]=o*d,n[9]=p*h-_,n[2]=_*h-p,n[6]=s*d,n[10]=y*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(t1,e,n1)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Vi.crossVectors(i,yn),Vi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Vi.crossVectors(i,yn)),Vi.normalize(),Vs.crossVectors(yn,Vi),r[0]=Vi.x,r[4]=Vs.x,r[8]=yn.x,r[1]=Vi.y,r[5]=Vs.y,r[9]=yn.y,r[2]=Vi.z,r[6]=Vs.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,a=this.elements,o=i[0],s=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],p=i[13],_=i[2],y=i[6],x=i[10],u=i[14],g=i[3],v=i[7],E=i[11],w=i[15],b=r[0],T=r[4],P=r[8],C=r[12],M=r[1],N=r[5],z=r[9],B=r[13],$=r[2],X=r[6],H=r[10],K=r[14],D=r[3],W=r[7],Y=r[11],ne=r[15];return a[0]=o*b+s*M+l*$+c*D,a[4]=o*T+s*N+l*X+c*W,a[8]=o*P+s*z+l*H+c*Y,a[12]=o*C+s*B+l*K+c*ne,a[1]=d*b+h*M+f*$+p*D,a[5]=d*T+h*N+f*X+p*W,a[9]=d*P+h*z+f*H+p*Y,a[13]=d*C+h*B+f*K+p*ne,a[2]=_*b+y*M+x*$+u*D,a[6]=_*T+y*N+x*X+u*W,a[10]=_*P+y*z+x*H+u*Y,a[14]=_*C+y*B+x*K+u*ne,a[3]=g*b+v*M+E*$+w*D,a[7]=g*T+v*N+E*X+w*W,a[11]=g*P+v*z+E*H+w*Y,a[15]=g*C+v*B+E*K+w*ne,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],a=e[12],o=e[1],s=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],p=e[14],_=e[3],y=e[7],x=e[11],u=e[15];return _*(+a*l*h-r*c*h-a*s*f+i*c*f+r*s*p-i*l*p)+y*(+n*l*p-n*c*f+a*o*f-r*o*p+r*c*d-a*l*d)+x*(+n*c*h-n*s*p-a*o*h+i*o*p+a*s*d-i*c*d)+u*(-r*s*d-n*l*h+n*s*f+r*o*h-i*o*f+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],p=e[11],_=e[12],y=e[13],x=e[14],u=e[15],g=h*x*c-y*f*c+y*l*p-s*x*p-h*l*u+s*f*u,v=_*f*c-d*x*c-_*l*p+o*x*p+d*l*u-o*f*u,E=d*y*c-_*h*c+_*s*p-o*y*p-d*s*u+o*h*u,w=_*h*l-d*y*l-_*s*f+o*y*f+d*s*x-o*h*x,b=n*g+i*v+r*E+a*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=g*T,e[1]=(y*f*a-h*x*a-y*r*p+i*x*p+h*r*u-i*f*u)*T,e[2]=(s*x*a-y*l*a+y*r*c-i*x*c-s*r*u+i*l*u)*T,e[3]=(h*l*a-s*f*a-h*r*c+i*f*c+s*r*p-i*l*p)*T,e[4]=v*T,e[5]=(d*x*a-_*f*a+_*r*p-n*x*p-d*r*u+n*f*u)*T,e[6]=(_*l*a-o*x*a-_*r*c+n*x*c+o*r*u-n*l*u)*T,e[7]=(o*f*a-d*l*a+d*r*c-n*f*c-o*r*p+n*l*p)*T,e[8]=E*T,e[9]=(_*h*a-d*y*a-_*i*p+n*y*p+d*i*u-n*h*u)*T,e[10]=(o*y*a-_*s*a+_*i*c-n*y*c-o*i*u+n*s*u)*T,e[11]=(d*s*a-o*h*a-d*i*c+n*h*c+o*i*p-n*s*p)*T,e[12]=w*T,e[13]=(d*y*r-_*h*r+_*i*f-n*y*f-d*i*x+n*h*x)*T,e[14]=(_*s*r-o*y*r-_*i*l+n*y*l+o*i*x-n*s*x)*T,e[15]=(o*h*r-d*s*r+d*i*l-n*h*l-o*i*f+n*s*f)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,a=e.z;return n[0]*=i,n[4]*=r,n[8]*=a,n[1]*=i,n[5]*=r,n[9]*=a,n[2]*=i,n[6]*=r,n[10]*=a,n[3]*=i,n[7]*=r,n[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),a=1-i,o=e.x,s=e.y,l=e.z,c=a*o,d=a*s;return this.set(c*o+i,c*s-r*l,c*l+r*s,0,c*s+r*l,d*s+i,d*l-r*o,0,c*l-r*s,d*l+r*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,a=n._x,o=n._y,s=n._z,l=n._w,c=a+a,d=o+o,h=s+s,f=a*c,p=a*d,_=a*h,y=o*d,x=o*h,u=s*h,g=l*c,v=l*d,E=l*h,w=i.x,b=i.y,T=i.z;return r[0]=(1-(y+u))*w,r[1]=(p+E)*w,r[2]=(_-v)*w,r[3]=0,r[4]=(p-E)*b,r[5]=(1-(f+u))*b,r[6]=(x+g)*b,r[7]=0,r[8]=(_+v)*T,r[9]=(x-g)*T,r[10]=(1-(f+y))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let a=ta.set(r[0],r[1],r[2]).length();const o=ta.set(r[4],r[5],r[6]).length(),s=ta.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Hn.copy(this);const c=1/a,d=1/o,h=1/s;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=d,Hn.elements[5]*=d,Hn.elements[6]*=d,Hn.elements[8]*=h,Hn.elements[9]*=h,Hn.elements[10]*=h,n.setFromRotationMatrix(Hn),i.x=a,i.y=o,i.z=s,this}makePerspective(e,n,i,r,a,o,s=li,l=!1){const c=this.elements,d=2*a/(n-e),h=2*a/(i-r),f=(n+e)/(n-e),p=(i+r)/(i-r);let _,y;if(l)_=a/(o-a),y=o*a/(o-a);else if(s===li)_=-(o+a)/(o-a),y=-2*o*a/(o-a);else if(s===tc)_=-o/(o-a),y=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,a,o,s=li,l=!1){const c=this.elements,d=2/(n-e),h=2/(i-r),f=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,y;if(l)_=1/(o-a),y=o/(o-a);else if(s===li)_=-2/(o-a),y=-(o+a)/(o-a);else if(s===tc)_=-1/(o-a),y=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ta=new O,Hn=new ht,t1=new O(0,0,0),n1=new O(1,1,1),Vi=new O,Vs=new O,yn=new O,cm=new ht,um=new ms;class ei{constructor(e=0,n=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],s=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(He(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(s,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(He(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(s,p));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-d,p),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return cm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return um.setFromEuler(this),this.setFromQuaternion(um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Ph{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let i1=0;const dm=new O,na=new ms,xi=new ht,Hs=new O,vo=new O,r1=new O,a1=new ms,fm=new O(1,0,0),hm=new O(0,1,0),pm=new O(0,0,1),mm={type:"added"},o1={type:"removed"},ia={type:"childadded",child:null},fu={type:"childremoved",child:null};class Kt extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:i1++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kt.DEFAULT_UP.clone();const e=new O,n=new ei,i=new ms,r=new O(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new ke}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return na.setFromAxisAngle(e,n),this.quaternion.multiply(na),this}rotateOnWorldAxis(e,n){return na.setFromAxisAngle(e,n),this.quaternion.premultiply(na),this}rotateX(e){return this.rotateOnAxis(fm,e)}rotateY(e){return this.rotateOnAxis(hm,e)}rotateZ(e){return this.rotateOnAxis(pm,e)}translateOnAxis(e,n){return dm.copy(e).applyQuaternion(this.quaternion),this.position.add(dm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(fm,e)}translateY(e){return this.translateOnAxis(hm,e)}translateZ(e){return this.translateOnAxis(pm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Hs.copy(e):Hs.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(vo,Hs,this.up):xi.lookAt(Hs,vo,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),na.setFromRotationMatrix(xi),this.quaternion.premultiply(na.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mm),ia.child=e,this.dispatchEvent(ia),ia.child=null):Rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(o1),fu.child=e,this.dispatchEvent(fu),fu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mm),ia.child=e,this.dispatchEvent(ia),ia.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,e,r1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,a1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(s=>({...s,boundingBox:s.boundingBox?s.boundingBox.toJSON():void 0,boundingSphere:s.boundingSphere?s.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(s=>({...s})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(a(e.materials,this.material[l]));r.material=s}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(a(e.animations,l))}}if(n){const s=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(s){const l=[];for(const c in s){const d=s[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Kt.DEFAULT_UP=new O(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new O,gi=new O,hu=new O,vi=new O,ra=new O,aa=new O,xm=new O,pu=new O,mu=new O,xu=new O,gu=new ct,vu=new ct,_u=new ct;class qn{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Wn.subVectors(e,n),r.cross(Wn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,n,i,r,a){Wn.subVectors(r,n),gi.subVectors(i,n),hu.subVectors(e,n);const o=Wn.dot(Wn),s=Wn.dot(gi),l=Wn.dot(hu),c=gi.dot(gi),d=gi.dot(hu),h=o*c-s*s;if(h===0)return a.set(0,0,0),null;const f=1/h,p=(c*l-s*d)*f,_=(o*d-s*l)*f;return a.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,n,i,r,a,o,s,l){return this.getBarycoord(e,n,i,r,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(s,vi.z),l)}static getInterpolatedAttribute(e,n,i,r,a,o){return gu.setScalar(0),vu.setScalar(0),_u.setScalar(0),gu.fromBufferAttribute(e,n),vu.fromBufferAttribute(e,i),_u.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(gu,a.x),o.addScaledVector(vu,a.y),o.addScaledVector(_u,a.z),o}static isFrontFacing(e,n,i,r){return Wn.subVectors(i,n),gi.subVectors(e,n),Wn.cross(gi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Wn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,a){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,a)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,a=this.c;let o,s;ra.subVectors(r,i),aa.subVectors(a,i),pu.subVectors(e,i);const l=ra.dot(pu),c=aa.dot(pu);if(l<=0&&c<=0)return n.copy(i);mu.subVectors(e,r);const d=ra.dot(mu),h=aa.dot(mu);if(d>=0&&h<=d)return n.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),n.copy(i).addScaledVector(ra,o);xu.subVectors(e,a);const p=ra.dot(xu),_=aa.dot(xu);if(_>=0&&p<=_)return n.copy(a);const y=p*c-l*_;if(y<=0&&c>=0&&_<=0)return s=c/(c-_),n.copy(i).addScaledVector(aa,s);const x=d*_-p*h;if(x<=0&&h-d>=0&&p-_>=0)return xm.subVectors(a,r),s=(h-d)/(h-d+(p-_)),n.copy(r).addScaledVector(xm,s);const u=1/(x+y+f);return o=y*u,s=f*u,n.copy(i).addScaledVector(ra,o).addScaledVector(aa,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ng={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function yu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ge{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=En){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=it.workingColorSpace){return this.r=e,this.g=n,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=it.workingColorSpace){if(e=wh(e,1),n=He(n,0,1),i=He(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=yu(o,a,e+1/3),this.g=yu(o,a,e),this.b=yu(o,a,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,n=En){function i(a){a!==void 0&&parseFloat(a)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=En){const i=Ng[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Da(e.r),this.g=Da(e.g),this.b=Da(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=En){return it.workingToColorSpace(qt.copy(this),e),Math.round(He(qt.r*255,0,255))*65536+Math.round(He(qt.g*255,0,255))*256+Math.round(He(qt.b*255,0,255))}getHexString(e=En){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=it.workingColorSpace){it.workingToColorSpace(qt.copy(this),n);const i=qt.r,r=qt.g,a=qt.b,o=Math.max(i,r,a),s=Math.min(i,r,a);let l,c;const d=(s+o)/2;if(s===o)l=0,c=0;else{const h=o-s;switch(c=d<=.5?h/(o+s):h/(2-o-s),o){case i:l=(r-a)/h+(r<a?6:0);break;case r:l=(a-i)/h+2;break;case a:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=it.workingColorSpace){return it.workingToColorSpace(qt.copy(this),n),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=En){it.workingToColorSpace(qt.copy(this),e);const n=qt.r,i=qt.g,r=qt.b;return e!==En?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(Ws);const i=ko(Hi.h,Ws.h,n),r=ko(Hi.s,Ws.s,n),a=ko(Hi.l,Ws.l,n);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*n+a[3]*i+a[6]*r,this.g=a[1]*n+a[4]*i+a[7]*r,this.b=a[2]*n+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Ge;Ge.NAMES=Ng;let s1=0;class io extends to{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:s1++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Ia,this.side=hr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Td,this.blendDst=wd,this.blendEquation=Tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Xa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=em,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ze(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ia&&(i.blending=this.blending),this.side!==hr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Td&&(i.blendSrc=this.blendSrc),this.blendDst!==wd&&(i.blendDst=this.blendDst),this.blendEquation!==Tr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==em&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Kr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Kr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const s in a){const l=a[s];delete l.metadata,o.push(l)}return o}if(n){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ig extends io{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new O,js=new We;let l1=0;class Qn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:l1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=tm,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)js.fromBufferAttribute(this,n),js.applyMatrix3(e),this.setXY(n,js.x,js.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix3(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix4(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyNormalMatrix(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.transformDirection(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=pa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=pa(n,this.array)),n}setX(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=pa(n,this.array)),n}setY(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=pa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=pa(n,this.array)),n}setW(e,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,a){return e*=this.itemSize,this.normalized&&(n=tn(n,this.array),i=tn(i,this.array),r=tn(r,this.array),a=tn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tm&&(e.usage=this.usage),e}}class Dg extends Qn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class zg extends Qn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class fi extends Qn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let c1=0;const Nn=new ht,Su=new Kt,oa=new O,Sn=new Yr,_o=new Yr,Ft=new O;class Fi extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c1++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rg(e)?zg:Dg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ke().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return Su.lookAt(e),Su.updateMatrix(),this.applyMatrix4(Su.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oa).negate(),this.translate(oa.x,oa.y,oa.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fi(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const a=e[r];n.setXYZ(r,a.x,a.y,a.z||0)}e.length>n.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const a=n[i];Sn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let a=0,o=n.length;a<o;a++){const s=n[a];_o.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(Sn.min,_o.min),Sn.expandByPoint(Ft),Ft.addVectors(Sn.max,_o.max),Sn.expandByPoint(Ft)):(Sn.expandByPoint(_o.min),Sn.expandByPoint(_o.max))}Sn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)Ft.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let a=0,o=n.length;a<o;a++){const s=n[a],l=this.morphTargetsRelative;for(let c=0,d=s.count;c<d;c++)Ft.fromBufferAttribute(s,c),l&&(oa.fromBufferAttribute(e,c),Ft.add(oa)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),s=[],l=[];for(let P=0;P<i.count;P++)s[P]=new O,l[P]=new O;const c=new O,d=new O,h=new O,f=new We,p=new We,_=new We,y=new O,x=new O;function u(P,C,M){c.fromBufferAttribute(i,P),d.fromBufferAttribute(i,C),h.fromBufferAttribute(i,M),f.fromBufferAttribute(a,P),p.fromBufferAttribute(a,C),_.fromBufferAttribute(a,M),d.sub(c),h.sub(c),p.sub(f),_.sub(f);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(y.copy(d).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(N),x.copy(h).multiplyScalar(p.x).addScaledVector(d,-_.x).multiplyScalar(N),s[P].add(y),s[C].add(y),s[M].add(y),l[P].add(x),l[C].add(x),l[M].add(x))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let P=0,C=g.length;P<C;++P){const M=g[P],N=M.start,z=M.count;for(let B=N,$=N+z;B<$;B+=3)u(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const v=new O,E=new O,w=new O,b=new O;function T(P){w.fromBufferAttribute(r,P),b.copy(w);const C=s[P];v.copy(C),v.sub(w.multiplyScalar(w.dot(C))).normalize(),E.crossVectors(b,C);const N=E.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,N)}for(let P=0,C=g.length;P<C;++P){const M=g[P],N=M.start,z=M.count;for(let B=N,$=N+z;B<$;B+=3)T(e.getX(B+0)),T(e.getX(B+1)),T(e.getX(B+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new O,a=new O,o=new O,s=new O,l=new O,c=new O,d=new O,h=new O;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),y=e.getX(f+1),x=e.getX(f+2);r.fromBufferAttribute(n,_),a.fromBufferAttribute(n,y),o.fromBufferAttribute(n,x),d.subVectors(o,a),h.subVectors(r,a),d.cross(h),s.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,x),s.add(d),l.add(d),c.add(d),i.setXYZ(_,s.x,s.y,s.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),a.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),d.subVectors(o,a),h.subVectors(r,a),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(s,l){const c=s.array,d=s.itemSize,h=s.normalized,f=new c.constructor(l.length*d);let p=0,_=0;for(let y=0,x=l.length;y<x;y++){s.isInterleavedBufferAttribute?p=l[y]*s.data.stride+s.offset:p=l[y]*d;for(let u=0;u<d;u++)f[_++]=c[p++]}return new Qn(f,d,h)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Fi,i=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,i);n.setAttribute(s,c)}const a=this.morphAttributes;for(const s in a){const l=[],c=a[s];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=e(f,i);l.push(p)}n.morphAttributes[s]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,l=o.length;s<l;s++){const c=o[s];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere=s.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const a=e.morphAttributes;for(const c in a){const d=[],h=a[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gm=new ht,Sr=new Lg,Xs=new xs,vm=new O,Ys=new O,qs=new O,$s=new O,Mu=new O,Ks=new O,_m=new O,Zs=new O;class Vt extends Kt{constructor(e=new Fi,n=new Ig){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(a&&s){Ks.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=s[l],h=a[l];d!==0&&(Mu.fromBufferAttribute(h,e),o?Ks.addScaledVector(Mu,d):Ks.addScaledVector(Mu.sub(n),d))}n.add(Ks)}return n}raycast(e,n){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xs.copy(i.boundingSphere),Xs.applyMatrix4(a),Sr.copy(e.ray).recast(e.near),!(Xs.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(Xs,vm)===null||Sr.origin.distanceToSquared(vm)>(e.far-e.near)**2))&&(gm.copy(a).invert(),Sr.copy(e.ray).applyMatrix4(gm),!(i.boundingBox!==null&&Sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Sr)))}_computeIntersections(e,n,i){let r;const a=this.geometry,o=this.material,s=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,f=a.groups,p=a.drawRange;if(s!==null)if(Array.isArray(o))for(let _=0,y=f.length;_<y;_++){const x=f[_],u=o[x.materialIndex],g=Math.max(x.start,p.start),v=Math.min(s.count,Math.min(x.start+x.count,p.start+p.count));for(let E=g,w=v;E<w;E+=3){const b=s.getX(E),T=s.getX(E+1),P=s.getX(E+2);r=Qs(this,u,e,i,c,d,h,b,T,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(s.count,p.start+p.count);for(let x=_,u=y;x<u;x+=3){const g=s.getX(x),v=s.getX(x+1),E=s.getX(x+2);r=Qs(this,o,e,i,c,d,h,g,v,E),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=f.length;_<y;_++){const x=f[_],u=o[x.materialIndex],g=Math.max(x.start,p.start),v=Math.min(l.count,Math.min(x.start+x.count,p.start+p.count));for(let E=g,w=v;E<w;E+=3){const b=E,T=E+1,P=E+2;r=Qs(this,u,e,i,c,d,h,b,T,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=x.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let x=_,u=y;x<u;x+=3){const g=x,v=x+1,E=x+2;r=Qs(this,o,e,i,c,d,h,g,v,E),r&&(r.faceIndex=Math.floor(x/3),n.push(r))}}}}function u1(t,e,n,i,r,a,o,s){let l;if(e.side===sn?l=i.intersectTriangle(o,a,r,!0,s):l=i.intersectTriangle(r,a,o,e.side===hr,s),l===null)return null;Zs.copy(s),Zs.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Zs);return c<n.near||c>n.far?null:{distance:c,point:Zs.clone(),object:t}}function Qs(t,e,n,i,r,a,o,s,l,c){t.getVertexPosition(s,Ys),t.getVertexPosition(l,qs),t.getVertexPosition(c,$s);const d=u1(t,e,n,i,Ys,qs,$s,_m);if(d){const h=new O;qn.getBarycoord(_m,Ys,qs,$s,h),r&&(d.uv=qn.getInterpolatedAttribute(r,s,l,c,h,new We)),a&&(d.uv1=qn.getInterpolatedAttribute(a,s,l,c,h,new We)),o&&(d.normal=qn.getInterpolatedAttribute(o,s,l,c,h,new O),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:s,b:l,c,normal:new O,materialIndex:0};qn.getNormal(Ys,qs,$s,f.normal),d.face=f,d.barycoord=h}return d}class ro extends Fi{constructor(e=1,n=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const l=[],c=[],d=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,n,e,o,a,0),_("z","y","x",1,-1,i,n,-e,o,a,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,a,4),_("x","y","z",-1,-1,e,n,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new fi(c,3)),this.setAttribute("normal",new fi(d,3)),this.setAttribute("uv",new fi(h,2));function _(y,x,u,g,v,E,w,b,T,P,C){const M=E/T,N=w/P,z=E/2,B=w/2,$=b/2,X=T+1,H=P+1;let K=0,D=0;const W=new O;for(let Y=0;Y<H;Y++){const ne=Y*N-B;for(let _e=0;_e<X;_e++){const Be=_e*M-z;W[y]=Be*g,W[x]=ne*v,W[u]=$,c.push(W.x,W.y,W.z),W[y]=0,W[x]=0,W[u]=b>0?1:-1,d.push(W.x,W.y,W.z),h.push(_e/T),h.push(1-Y/P),K+=1}}for(let Y=0;Y<P;Y++)for(let ne=0;ne<T;ne++){const _e=f+ne+X*Y,Be=f+ne+X*(Y+1),Ue=f+(ne+1)+X*(Y+1),rt=f+(ne+1)+X*Y;l.push(_e,Be,rt),l.push(Be,Ue,rt),D+=6}s.addGroup(p,D,C),p+=D,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ka(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function nn(t){const e={};for(let n=0;n<t.length;n++){const i=Ka(t[n]);for(const r in i)e[r]=i[r]}return e}function d1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ug(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const f1={clone:Ka,merge:nn};var h1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends io{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=h1,this.fragmentShader=p1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ka(e.uniforms),this.uniformsGroups=d1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Fg extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new O,ym=new We,Sm=new We;class An extends Fg{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=ls*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,n){return this.getViewBounds(e,ym,Sm),n.subVectors(Sm,ym)}setViewOffset(e,n,i,r,a,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Oo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const sa=-90,la=1;class m1 extends Kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new An(sa,la,e,n);r.layers=this.layers,this.add(r);const a=new An(sa,la,e,n);a.layers=this.layers,this.add(a);const o=new An(sa,la,e,n);o.layers=this.layers,this.add(o);const s=new An(sa,la,e,n);s.layers=this.layers,this.add(s);const l=new An(sa,la,e,n);l.layers=this.layers,this.add(l);const c=new An(sa,la,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,a,o,s,l]=n;for(const c of n)this.remove(c);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,s,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,a),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,s),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(h,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Og extends ln{constructor(e=[],n=Ya,i,r,a,o,s,l,c,d){super(e,n,i,r,a,o,s,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class x1 extends Wr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Og(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ro(5,5,5),a=new zi({name:"CubemapFromEquirect",uniforms:Ka(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Ri});a.uniforms.tEquirect.value=n;const o=new Vt(r,a),s=n.minFilter;return n.minFilter===Nr&&(n.minFilter=Un),new m1(1,10,this).update(e,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(a)}}class Js extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const g1={type:"move"};class Eu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,a=null,o=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const x=n.getJointPose(y,i),u=this._getHandJoint(c,y);x!==null&&(u.matrix.fromArray(x.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=x.radius),u.visible=x!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=n.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(g1)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Js;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class kg extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Bg extends ln{constructor(e=null,n=1,i=1,r,a,o,s,l,c=Tn,d=Tn,h,f){super(null,o,s,l,c,d,r,a,h,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mm extends Qn{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ca=new ht,Em=new ht,el=[],Am=new Yr,v1=new ht,yo=new Vt,So=new xs;class Gg extends Vt{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Mm(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,v1)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Yr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ca),Am.copy(e.boundingBox).applyMatrix4(ca),this.boundingBox.union(Am)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new xs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ca),So.copy(e.boundingSphere).applyMatrix4(ca),this.boundingSphere.union(So)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,o=e*a+1;for(let s=0;s<i.length;s++)i[s]=r[o+s]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(yo.geometry=this.geometry,yo.material=this.material,yo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(i),e.ray.intersectsSphere(So)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,ca),Em.multiplyMatrices(i,ca),yo.matrixWorld=Em,yo.raycast(e,el);for(let o=0,s=el.length;o<s;o++){const l=el[o];l.instanceId=a,l.object=this,n.push(l)}el.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new Mm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Bg(new Float32Array(r*this.count),r,this.count,Mh,si));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const s=this.geometry.morphTargetsRelative?1:1-o,l=r*e;a[l]=s,a.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Au=new O,_1=new O,y1=new ke;class qi{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Au.subVectors(i,n).cross(_1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Au),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:n.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||y1.getNormalMatrix(e),r=this.coplanarPoint(Au).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new xs,S1=new We(.5,.5),tl=new O;class Lh{constructor(e=new qi,n=new qi,i=new qi,r=new qi,a=new qi,o=new qi){this.planes=[e,n,i,r,a,o]}set(e,n,i,r,a,o){const s=this.planes;return s[0].copy(e),s[1].copy(n),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=li,i=!1){const r=this.planes,a=e.elements,o=a[0],s=a[1],l=a[2],c=a[3],d=a[4],h=a[5],f=a[6],p=a[7],_=a[8],y=a[9],x=a[10],u=a[11],g=a[12],v=a[13],E=a[14],w=a[15];if(r[0].setComponents(c-o,p-d,u-_,w-g).normalize(),r[1].setComponents(c+o,p+d,u+_,w+g).normalize(),r[2].setComponents(c+s,p+h,u+y,w+v).normalize(),r[3].setComponents(c-s,p-h,u-y,w-v).normalize(),i)r[4].setComponents(l,f,x,E).normalize(),r[5].setComponents(c-l,p-f,u-x,w-E).normalize();else if(r[4].setComponents(c-l,p-f,u-x,w-E).normalize(),n===li)r[5].setComponents(c+l,p+f,u+x,w+E).normalize();else if(n===tc)r[5].setComponents(l,f,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(e){Mr.center.set(0,0,0);const n=S1.distanceTo(e.center);return Mr.radius=.7071067811865476+n,Mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(tl.x=r.normal.x>0?e.max.x:e.min.x,tl.y=r.normal.y>0?e.max.y:e.min.y,tl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(tl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vg extends ln{constructor(e,n,i=Hr,r,a,o,s=Tn,l=Tn,c,d=as,h=1){if(d!==as&&d!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:h};super(f,r,a,o,s,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Hg extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mc extends Fi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const a=e/2,o=n/2,s=Math.floor(i),l=Math.floor(r),c=s+1,d=l+1,h=e/s,f=n/l,p=[],_=[],y=[],x=[];for(let u=0;u<d;u++){const g=u*f-o;for(let v=0;v<c;v++){const E=v*h-a;_.push(E,-g,0),y.push(0,0,1),x.push(v/s),x.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<s;g++){const v=g+c*u,E=g+c*(u+1),w=g+1+c*(u+1),b=g+1+c*u;p.push(v,E,b),p.push(E,w,b)}this.setIndex(p),this.setAttribute("position",new fi(_,3)),this.setAttribute("normal",new fi(y,3)),this.setAttribute("uv",new fi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.width,e.height,e.widthSegments,e.heightSegments)}}class Nh extends Fi{constructor(e=1,n=32,i=16,r=0,a=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:a,thetaStart:o,thetaLength:s},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+s,Math.PI);let c=0;const d=[],h=new O,f=new O,p=[],_=[],y=[],x=[];for(let u=0;u<=i;u++){const g=[],v=u/i;let E=0;u===0&&o===0?E=.5/n:u===i&&l===Math.PI&&(E=-.5/n);for(let w=0;w<=n;w++){const b=w/n;h.x=-e*Math.cos(r+b*a)*Math.sin(o+v*s),h.y=e*Math.cos(o+v*s),h.z=e*Math.sin(r+b*a)*Math.sin(o+v*s),_.push(h.x,h.y,h.z),f.copy(h).normalize(),y.push(f.x,f.y,f.z),x.push(b+E,1-v),g.push(c++)}d.push(g)}for(let u=0;u<i;u++)for(let g=0;g<n;g++){const v=d[u][g+1],E=d[u][g],w=d[u+1][g],b=d[u+1][g+1];(u!==0||o>0)&&p.push(v,E,b),(u!==i-1||l<Math.PI)&&p.push(E,w,b)}this.setIndex(p),this.setAttribute("position",new fi(_,3)),this.setAttribute("normal",new fi(y,3)),this.setAttribute("uv",new fi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xf extends io{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class M1 extends xf{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new We(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class E1 extends io{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class A1 extends io{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class b1 extends io{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wg extends Kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const bu=new ht,bm=new O,Cm=new O;class C1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lh,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;bm.setFromMatrixPosition(e.matrixWorld),n.position.copy(bm),Cm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Cm),n.updateMatrixWorld(),bu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bu,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tm=new ht,Mo=new O,Cu=new O;class T1 extends C1{constructor(){super(new An(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new We(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,a=e.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),Mo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Mo),Cu.copy(i.position),Cu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(Cu),i.updateMatrixWorld(),r.makeTranslation(-Mo.x,-Mo.y,-Mo.z),Tm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tm,i.coordinateSystem,i.reversedDepth)}}class jg extends Wg{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new T1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class w1 extends Fg{constructor(e=-1,n=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,s=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,s-=d*this.view.offsetY,l=s-d*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class R1 extends Wg{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class P1 extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class L1{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const wm=new ht;class N1{constructor(e,n,i=0,r=1/0){this.ray=new Lg(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Ph,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Rt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return wm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wm),this}intersectObject(e,n=!0,i=[]){return gf(e,this,i,n),i.sort(Rm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,a=e.length;r<a;r++)gf(e[r],this,i,n);return i.sort(Rm),i}}function Rm(t,e){return t.distance-e.distance}function gf(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const a=t.children;for(let o=0,s=a.length;o<s;o++)gf(a[o],e,n,!0)}}function Pm(t,e,n,i){const r=I1(i);switch(n){case Cg:return t*e;case Mh:return t*e/r.components*r.byteLength;case Eh:return t*e/r.components*r.byteLength;case Ah:return t*e*2/r.components*r.byteLength;case bh:return t*e*2/r.components*r.byteLength;case Tg:return t*e*3/r.components*r.byteLength;case $n:return t*e*4/r.components*r.byteLength;case Ch:return t*e*4/r.components*r.byteLength;case El:case Al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case bl:case Cl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Gd:case Hd:return Math.max(t,16)*Math.max(e,8)/4;case Bd:case Vd:return Math.max(t,8)*Math.max(e,8)/2;case Wd:case jd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Xd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Yd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case qd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case $d:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Kd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Zd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Qd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Jd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case ef:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case tf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case nf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case rf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case af:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case of:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case sf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case lf:case cf:case uf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case df:case ff:return Math.ceil(t/4)*Math.ceil(e/4)*8;case hf:case pf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function I1(t){switch(t){case hi:case Mg:return{byteLength:1,components:1};case is:case Eg:case eo:return{byteLength:2,components:1};case yh:case Sh:return{byteLength:2,components:4};case Hr:case _h:case si:return{byteLength:4,components:1};case Ag:case bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xg(){let t=null,e=!1,n=null,i=null;function r(a,o){n(a,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){n=a},setContext:function(a){t=a}}}function D1(t){const e=new WeakMap;function n(s,l){const c=s.array,d=s.usage,h=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,d),s.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:h}}function i(s,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,s),h.length===0)t.bufferSubData(c,0,d);else{h.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<h.length;p++){const _=h[f],y=h[p];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++f,h[f]=y)}h.length=f+1;for(let p=0,_=h.length;p<_;p++){const y=h[p];t.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=e.get(s);l&&(t.deleteBuffer(l.buffer),e.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const d=e.get(s);(!d||d.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=e.get(s);if(c===void 0)e.set(s,n(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:r,remove:a,update:o}}var z1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,U1=`#ifdef USE_ALPHAHASH
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
#endif`,F1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,k1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,G1=`#ifdef USE_AOMAP
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
#endif`,V1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,H1=`#ifdef USE_BATCHING
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
#endif`,W1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Y1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,q1=`#ifdef USE_IRIDESCENCE
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
#endif`,$1=`#ifdef USE_BUMPMAP
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
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Q1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iM=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rM=`#define PI 3.141592653589793
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
} // validated`,aM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,oM=`vec3 transformedNormal = objectNormal;
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
#endif`,sM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dM="gl_FragColor = linearToOutputTexel( gl_FragColor );",fM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hM=`#ifdef USE_ENVMAP
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
#endif`,pM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mM=`#ifdef USE_ENVMAP
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
#endif`,xM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gM=`#ifdef USE_ENVMAP
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
#endif`,vM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_M=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,SM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,MM=`#ifdef USE_GRADIENTMAP
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
}`,EM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CM=`uniform bool receiveShadow;
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
#endif`,TM=`#ifdef USE_ENVMAP
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
#endif`,wM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,PM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,LM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NM=`PhysicalMaterial material;
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
#endif`,IM=`uniform sampler2D dfgLUT;
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
}`,DM=`
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
#endif`,zM=`#if defined( RE_IndirectDiffuse )
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
#endif`,UM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,OM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,VM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,WM=`#if defined( USE_POINTS_UV )
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
#endif`,jM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,XM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$M=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KM=`#ifdef USE_MORPHTARGETS
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
#endif`,ZM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,JM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,e3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i3=`#ifdef USE_NORMALMAP
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
#endif`,r3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c3=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,u3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x3=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g3=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v3=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_3=`float getShadowMask() {
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
}`,y3=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,S3=`#ifdef USE_SKINNING
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
#endif`,M3=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E3=`#ifdef USE_SKINNING
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
#endif`,A3=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T3=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,w3=`#ifdef USE_TRANSMISSION
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
#endif`,R3=`#ifdef USE_TRANSMISSION
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
#endif`,P3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I3=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const D3=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z3=`uniform sampler2D t2D;
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
}`,U3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F3=`#ifdef ENVMAP_TYPE_CUBE
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
}`,O3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B3=`#include <common>
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
}`,G3=`#if DEPTH_PACKING == 3200
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
}`,V3=`#define DISTANCE
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
}`,H3=`#define DISTANCE
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
}`,W3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j3=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X3=`uniform float scale;
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
}`,Y3=`uniform vec3 diffuse;
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
}`,q3=`#include <common>
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
}`,$3=`uniform vec3 diffuse;
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
}`,K3=`#define LAMBERT
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
}`,Z3=`#define LAMBERT
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
}`,Q3=`#define MATCAP
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
}`,J3=`#define MATCAP
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
}`,eE=`#define NORMAL
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
}`,tE=`#define NORMAL
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
}`,nE=`#define PHONG
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
}`,iE=`#define PHONG
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
}`,rE=`#define STANDARD
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
}`,aE=`#define STANDARD
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
}`,oE=`#define TOON
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
}`,sE=`#define TOON
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
}`,lE=`uniform float size;
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
}`,cE=`uniform vec3 diffuse;
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
}`,uE=`#include <common>
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
}`,dE=`uniform vec3 color;
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
}`,fE=`uniform float rotation;
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
}`,hE=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:z1,alphahash_pars_fragment:U1,alphamap_fragment:F1,alphamap_pars_fragment:O1,alphatest_fragment:k1,alphatest_pars_fragment:B1,aomap_fragment:G1,aomap_pars_fragment:V1,batching_pars_vertex:H1,batching_vertex:W1,begin_vertex:j1,beginnormal_vertex:X1,bsdfs:Y1,iridescence_fragment:q1,bumpmap_pars_fragment:$1,clipping_planes_fragment:K1,clipping_planes_pars_fragment:Z1,clipping_planes_pars_vertex:Q1,clipping_planes_vertex:J1,color_fragment:eM,color_pars_fragment:tM,color_pars_vertex:nM,color_vertex:iM,common:rM,cube_uv_reflection_fragment:aM,defaultnormal_vertex:oM,displacementmap_pars_vertex:sM,displacementmap_vertex:lM,emissivemap_fragment:cM,emissivemap_pars_fragment:uM,colorspace_fragment:dM,colorspace_pars_fragment:fM,envmap_fragment:hM,envmap_common_pars_fragment:pM,envmap_pars_fragment:mM,envmap_pars_vertex:xM,envmap_physical_pars_fragment:TM,envmap_vertex:gM,fog_vertex:vM,fog_pars_vertex:_M,fog_fragment:yM,fog_pars_fragment:SM,gradientmap_pars_fragment:MM,lightmap_pars_fragment:EM,lights_lambert_fragment:AM,lights_lambert_pars_fragment:bM,lights_pars_begin:CM,lights_toon_fragment:wM,lights_toon_pars_fragment:RM,lights_phong_fragment:PM,lights_phong_pars_fragment:LM,lights_physical_fragment:NM,lights_physical_pars_fragment:IM,lights_fragment_begin:DM,lights_fragment_maps:zM,lights_fragment_end:UM,logdepthbuf_fragment:FM,logdepthbuf_pars_fragment:OM,logdepthbuf_pars_vertex:kM,logdepthbuf_vertex:BM,map_fragment:GM,map_pars_fragment:VM,map_particle_fragment:HM,map_particle_pars_fragment:WM,metalnessmap_fragment:jM,metalnessmap_pars_fragment:XM,morphinstance_vertex:YM,morphcolor_vertex:qM,morphnormal_vertex:$M,morphtarget_pars_vertex:KM,morphtarget_vertex:ZM,normal_fragment_begin:QM,normal_fragment_maps:JM,normal_pars_fragment:e3,normal_pars_vertex:t3,normal_vertex:n3,normalmap_pars_fragment:i3,clearcoat_normal_fragment_begin:r3,clearcoat_normal_fragment_maps:a3,clearcoat_pars_fragment:o3,iridescence_pars_fragment:s3,opaque_fragment:l3,packing:c3,premultiplied_alpha_fragment:u3,project_vertex:d3,dithering_fragment:f3,dithering_pars_fragment:h3,roughnessmap_fragment:p3,roughnessmap_pars_fragment:m3,shadowmap_pars_fragment:x3,shadowmap_pars_vertex:g3,shadowmap_vertex:v3,shadowmask_pars_fragment:_3,skinbase_vertex:y3,skinning_pars_vertex:S3,skinning_vertex:M3,skinnormal_vertex:E3,specularmap_fragment:A3,specularmap_pars_fragment:b3,tonemapping_fragment:C3,tonemapping_pars_fragment:T3,transmission_fragment:w3,transmission_pars_fragment:R3,uv_pars_fragment:P3,uv_pars_vertex:L3,uv_vertex:N3,worldpos_vertex:I3,background_vert:D3,background_frag:z3,backgroundCube_vert:U3,backgroundCube_frag:F3,cube_vert:O3,cube_frag:k3,depth_vert:B3,depth_frag:G3,distanceRGBA_vert:V3,distanceRGBA_frag:H3,equirect_vert:W3,equirect_frag:j3,linedashed_vert:X3,linedashed_frag:Y3,meshbasic_vert:q3,meshbasic_frag:$3,meshlambert_vert:K3,meshlambert_frag:Z3,meshmatcap_vert:Q3,meshmatcap_frag:J3,meshnormal_vert:eE,meshnormal_frag:tE,meshphong_vert:nE,meshphong_frag:iE,meshphysical_vert:rE,meshphysical_frag:aE,meshtoon_vert:oE,meshtoon_frag:sE,points_vert:lE,points_frag:cE,shadow_vert:uE,shadow_frag:dE,sprite_vert:fE,sprite_frag:hE},ce={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ai={basic:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:nn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:nn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:nn([ce.points,ce.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:nn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:nn([ce.common,ce.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:nn([ce.sprite,ce.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:nn([ce.common,ce.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:nn([ce.lights,ce.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};ai.physical={uniforms:nn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const nl={r:0,b:0,g:0},Er=new ei,pE=new ht;function mE(t,e,n,i,r,a,o){const s=new Ge(0);let l=a===!0?0:1,c,d,h=null,f=0,p=null;function _(v){let E=v.isScene===!0?v.background:null;return E&&E.isTexture&&(E=(v.backgroundBlurriness>0?n:e).get(E)),E}function y(v){let E=!1;const w=_(v);w===null?u(s,l):w&&w.isColor&&(u(w,1),E=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function x(v,E){const w=_(E);w&&(w.isCubeTexture||w.mapping===Sc)?(d===void 0&&(d=new Vt(new ro(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:Ka(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(b,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Er.copy(E.backgroundRotation),Er.x*=-1,Er.y*=-1,Er.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Er.y*=-1,Er.z*=-1),d.material.uniforms.envMap.value=w,d.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(pE.makeRotationFromEuler(Er)),d.material.toneMapped=it.getTransfer(w.colorSpace)!==lt,(h!==w||f!==w.version||p!==t.toneMapping)&&(d.material.needsUpdate=!0,h=w,f=w.version,p=t.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Vt(new Mc(2,2),new zi({name:"BackgroundMaterial",uniforms:Ka(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:hr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=it.getTransfer(w.colorSpace)!==lt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||f!==w.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=w,f=w.version,p=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function u(v,E){v.getRGB(nl,Ug(t)),i.buffers.color.setClear(nl.r,nl.g,nl.b,E,o)}function g(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(v,E=1){s.set(v),l=E,u(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,u(s,l)},render:y,addToRenderList:x,dispose:g}}function xE(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let a=r,o=!1;function s(M,N,z,B,$){let X=!1;const H=h(B,z,N);a!==H&&(a=H,c(a.object)),X=p(M,B,z,$),X&&_(M,B,z,$),$!==null&&e.update($,t.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,E(M,N,z,B),$!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function d(M){return t.deleteVertexArray(M)}function h(M,N,z){const B=z.wireframe===!0;let $=i[M.id];$===void 0&&($={},i[M.id]=$);let X=$[N.id];X===void 0&&(X={},$[N.id]=X);let H=X[B];return H===void 0&&(H=f(l()),X[B]=H),H}function f(M){const N=[],z=[],B=[];for(let $=0;$<n;$++)N[$]=0,z[$]=0,B[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:B,object:M,attributes:{},index:null}}function p(M,N,z,B){const $=a.attributes,X=N.attributes;let H=0;const K=z.getAttributes();for(const D in K)if(K[D].location>=0){const Y=$[D];let ne=X[D];if(ne===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(ne=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(ne=M.instanceColor)),Y===void 0||Y.attribute!==ne||ne&&Y.data!==ne.data)return!0;H++}return a.attributesNum!==H||a.index!==B}function _(M,N,z,B){const $={},X=N.attributes;let H=0;const K=z.getAttributes();for(const D in K)if(K[D].location>=0){let Y=X[D];Y===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor));const ne={};ne.attribute=Y,Y&&Y.data&&(ne.data=Y.data),$[D]=ne,H++}a.attributes=$,a.attributesNum=H,a.index=B}function y(){const M=a.newAttributes;for(let N=0,z=M.length;N<z;N++)M[N]=0}function x(M){u(M,0)}function u(M,N){const z=a.newAttributes,B=a.enabledAttributes,$=a.attributeDivisors;z[M]=1,B[M]===0&&(t.enableVertexAttribArray(M),B[M]=1),$[M]!==N&&(t.vertexAttribDivisor(M,N),$[M]=N)}function g(){const M=a.newAttributes,N=a.enabledAttributes;for(let z=0,B=N.length;z<B;z++)N[z]!==M[z]&&(t.disableVertexAttribArray(z),N[z]=0)}function v(M,N,z,B,$,X,H){H===!0?t.vertexAttribIPointer(M,N,z,$,X):t.vertexAttribPointer(M,N,z,B,$,X)}function E(M,N,z,B){y();const $=B.attributes,X=z.getAttributes(),H=N.defaultAttributeValues;for(const K in X){const D=X[K];if(D.location>=0){let W=$[K];if(W===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(W=M.instanceColor)),W!==void 0){const Y=W.normalized,ne=W.itemSize,_e=e.get(W);if(_e===void 0)continue;const Be=_e.buffer,Ue=_e.type,rt=_e.bytesPerElement,q=Ue===t.INT||Ue===t.UNSIGNED_INT||W.gpuType===_h;if(W.isInterleavedBufferAttribute){const J=W.data,xe=J.stride,Fe=W.offset;if(J.isInstancedInterleavedBuffer){for(let Ee=0;Ee<D.locationSize;Ee++)u(D.location+Ee,J.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Ee=0;Ee<D.locationSize;Ee++)x(D.location+Ee);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let Ee=0;Ee<D.locationSize;Ee++)v(D.location+Ee,ne/D.locationSize,Ue,Y,xe*rt,(Fe+ne/D.locationSize*Ee)*rt,q)}else{if(W.isInstancedBufferAttribute){for(let J=0;J<D.locationSize;J++)u(D.location+J,W.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let J=0;J<D.locationSize;J++)x(D.location+J);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let J=0;J<D.locationSize;J++)v(D.location+J,ne/D.locationSize,Ue,Y,ne*rt,ne/D.locationSize*J*rt,q)}}else if(H!==void 0){const Y=H[K];if(Y!==void 0)switch(Y.length){case 2:t.vertexAttrib2fv(D.location,Y);break;case 3:t.vertexAttrib3fv(D.location,Y);break;case 4:t.vertexAttrib4fv(D.location,Y);break;default:t.vertexAttrib1fv(D.location,Y)}}}}g()}function w(){P();for(const M in i){const N=i[M];for(const z in N){const B=N[z];for(const $ in B)d(B[$].object),delete B[$];delete N[z]}delete i[M]}}function b(M){if(i[M.id]===void 0)return;const N=i[M.id];for(const z in N){const B=N[z];for(const $ in B)d(B[$].object),delete B[$];delete N[z]}delete i[M.id]}function T(M){for(const N in i){const z=i[N];if(z[M.id]===void 0)continue;const B=z[M.id];for(const $ in B)d(B[$].object),delete B[$];delete z[M.id]}}function P(){C(),o=!0,a!==r&&(a=r,c(a.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:P,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:x,disableUnusedAttributes:g}}function gE(t,e,n){let i;function r(c){i=c}function a(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function o(c,d,h){h!==0&&(t.drawArraysInstanced(i,c,d,h),n.update(d,i,h))}function s(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let _=0;_<h;_++)p+=d[_];n.update(p,i,1)}function l(c,d,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)o(c[_],d[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let _=0;for(let y=0;y<h;y++)_+=d[y]*f[y];n.update(_,i,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=l}function vE(t,e,n,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==$n&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(T){const P=T===eo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==hi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==si&&!P)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(ze("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),x=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=_>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:x,maxAttributes:u,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:E,vertexTextures:w,maxSamples:b}}function _E(t){const e=this;let n=null,i=0,r=!1,a=!1;const o=new qi,s=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,y=h.clipIntersection,x=h.clipShadows,u=t.get(h);if(!r||_===null||_.length===0||a&&!x)a?d(null):c();else{const g=a?0:i,v=g*4;let E=u.clippingState||null;l.value=E,E=d(_,f,v,p);for(let w=0;w!==v;++w)E[w]=n[w];u.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,p,_){const y=h!==null?h.length:0;let x=null;if(y!==0){if(x=l.value,_!==!0||x===null){const u=p+y*4,g=f.matrixWorldInverse;s.getNormalMatrix(g),(x===null||x.length<u)&&(x=new Float32Array(u));for(let v=0,E=p;v!==y;++v,E+=4)o.copy(h[v]).applyMatrix4(g,s),o.normal.toArray(x,E),x[E+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,x}}function yE(t){let e=new WeakMap;function n(o,s){return s===Ud?o.mapping=Ya:s===Fd&&(o.mapping=qa),o}function i(o){if(o&&o.isTexture){const s=o.mapping;if(s===Ud||s===Fd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new x1(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const s=o.target;s.removeEventListener("dispose",r);const l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const tr=4,Lm=[.125,.215,.35,.446,.526,.582],wr=20,SE=256,Eo=new w1,Nm=new Ge;let Tu=null,wu=0,Ru=0,Pu=!1;const ME=new O;class vf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,a={}){const{size:o=256,position:s=ME}=a;Tu=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,s),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Tu,wu,Ru),this._renderer.xr.enabled=Pu,e.scissorTest=!1,ua(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ya||e.mapping===qa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tu=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:eo,format:$n,colorSpace:$a,depthBuffer:!1},r=Im(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Im(e,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=EE(a)),this._blurMaterial=bE(a,e,n)}return r}_compileMaterial(e){const n=new Vt(new Fi,e);this._renderer.compile(n,Eo)}_sceneToCubeUV(e,n,i,r,a){const l=new An(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Nm),h.toneMapping=ur,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new ro,new Ig({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,x=y.material;let u=!1;const g=e.background;g?g.isColor&&(x.color.copy(g),e.background=null,u=!0):(x.color.copy(Nm),u=!0);for(let v=0;v<6;v++){const E=v%3;E===0?(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[v],a.y,a.z)):E===1?(l.up.set(0,0,c[v]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[v],a.z)):(l.up.set(0,c[v],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[v]));const w=this._cubeSize;ua(r,E*w,v>2?w:0,w,w),h.setRenderTarget(r),u&&h.render(y,l),h.render(e,l)}h.toneMapping=p,h.autoClear=f,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ya||e.mapping===qa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dm());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=e;const l=this._cubeSize;ua(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Eo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,a=this._pingPongRenderTarget;if(this._ggxMaterial===null){const g=3*Math.max(this._cubeSize,16),v=4*this._cubeSize;this._ggxMaterial=AE(this._lodMax,g,v)}const o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),f=.05+c*.95,p=h*f,{_lodMax:_}=this,y=this._sizeLods[i],x=3*y*(i>_-tr?i-_+tr:0),u=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,ua(a,x,u,3*y,2*y),r.setRenderTarget(a),r.render(s,Eo),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=_-i,ua(e,x,u,3*y,2*y),r.setRenderTarget(e),r.render(s,Eo)}_blur(e,n,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",a),this._halfBlur(o,e,i,i,r,"longitudinal",a)}_halfBlur(e,n,i,r,a,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Rt("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=c;const f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*wr-1),y=a/_,x=isFinite(a)?1+Math.floor(d*y):wr;x>wr&&ze(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${wr}`);const u=[];let g=0;for(let T=0;T<wr;++T){const P=T/y,C=Math.exp(-P*P/2);u.push(C),T===0?g+=C:T<x&&(g+=2*C)}for(let T=0;T<u.length;T++)u[T]=u[T]/g;f.envMap.value=e.texture,f.samples.value=x,f.weights.value=u,f.latitudinal.value=o==="latitudinal",s&&(f.poleAxis.value=s);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-i;const E=this._sizeLods[r],w=3*E*(r>v-tr?r-v+tr:0),b=4*(this._cubeSize-E);ua(n,w,b,3*E,2*E),l.setRenderTarget(n),l.render(h,Eo)}}function EE(t){const e=[],n=[],i=[];let r=t;const a=t-tr+1+Lm.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);e.push(s);let l=1/s;o>t-tr?l=Lm[o-t+tr-1]:o===0&&(l=0),n.push(l);const c=1/(s-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,_=6,y=3,x=2,u=1,g=new Float32Array(y*_*p),v=new Float32Array(x*_*p),E=new Float32Array(u*_*p);for(let b=0;b<p;b++){const T=b%3*2/3-1,P=b>2?0:-1,C=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];g.set(C,y*_*b),v.set(f,x*_*b);const M=[b,b,b,b,b,b];E.set(M,u*_*b)}const w=new Fi;w.setAttribute("position",new Qn(g,y)),w.setAttribute("uv",new Qn(v,x)),w.setAttribute("faceIndex",new Qn(E,u)),i.push(new Vt(w,null)),r>tr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Im(t,e,n){const i=new Wr(t,e,n);return i.texture.mapping=Sc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ua(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function AE(t,e,n){return new zi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:SE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function bE(t,e,n){const i=new Float32Array(wr),r=new O(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Dm(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ec(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function zm(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Ec(){return`

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
	`}function CE(t){let e=new WeakMap,n=null;function i(s){if(s&&s.isTexture){const l=s.mapping,c=l===Ud||l===Fd,d=l===Ya||l===qa;if(c||d){let h=e.get(s);const f=h!==void 0?h.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==f)return n===null&&(n=new vf(t)),h=c?n.fromEquirectangular(s,h):n.fromCubemap(s,h),h.texture.pmremVersion=s.pmremVersion,e.set(s,h),h.texture;if(h!==void 0)return h.texture;{const p=s.image;return c&&p&&p.height>0||d&&p&&r(p)?(n===null&&(n=new vf(t)),h=c?n.fromEquirectangular(s):n.fromCubemap(s),h.texture.pmremVersion=s.pmremVersion,e.set(s,h),s.addEventListener("dispose",a),h.texture):null}}}return s}function r(s){let l=0;const c=6;for(let d=0;d<c;d++)s[d]!==void 0&&l++;return l===c}function a(s){const l=s.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function TE(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ss("WebGLRenderer: "+i+" extension not supported."),r}}}function wE(t,e,n,i){const r={},a=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete r[f.id];const p=a.get(f);p&&(e.remove(p),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function s(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,_=h.attributes.position;let y=0;if(p!==null){const g=p.array;y=p.version;for(let v=0,E=g.length;v<E;v+=3){const w=g[v+0],b=g[v+1],T=g[v+2];f.push(w,b,b,T,T,w)}}else if(_!==void 0){const g=_.array;y=_.version;for(let v=0,E=g.length/3-1;v<E;v+=3){const w=v+0,b=v+1,T=v+2;f.push(w,b,b,T,T,w)}}else return;const x=new(Rg(f)?zg:Dg)(f,1);x.version=y;const u=a.get(h);u&&e.remove(u),a.set(h,x)}function d(h){const f=a.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return a.get(h)}return{get:s,update:l,getWireframeAttribute:d}}function RE(t,e,n){let i;function r(f){i=f}let a,o;function s(f){a=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,a,f*o),n.update(p,i,1)}function c(f,p,_){_!==0&&(t.drawElementsInstanced(i,p,a,f*o,_),n.update(p,i,_))}function d(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,f,0,_);let x=0;for(let u=0;u<_;u++)x+=p[u];n.update(x,i,1)}function h(f,p,_,y){if(_===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let u=0;u<f.length;u++)c(f[u]/o,p[u],y[u]);else{x.multiDrawElementsInstancedWEBGL(i,p,0,a,f,0,y,0,_);let u=0;for(let g=0;g<_;g++)u+=p[g]*y[g];n.update(u,i,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function PE(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=s*(a/3);break;case t.LINES:n.lines+=s*(a/2);break;case t.LINE_STRIP:n.lines+=s*(a-1);break;case t.LINE_LOOP:n.lines+=s*a;break;case t.POINTS:n.points+=s*a;break;default:Rt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function LE(t,e,n){const i=new WeakMap,r=new ct;function a(o,s,l){const c=o.morphTargetInfluences,d=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(s);if(f===void 0||f.count!==h){let M=function(){P.dispose(),i.delete(s),s.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const _=s.morphAttributes.position!==void 0,y=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,u=s.morphAttributes.position||[],g=s.morphAttributes.normal||[],v=s.morphAttributes.color||[];let E=0;_===!0&&(E=1),y===!0&&(E=2),x===!0&&(E=3);let w=s.attributes.position.count*E,b=1;w>e.maxTextureSize&&(b=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*b*4*h),P=new Pg(T,w,b,h);P.type=si,P.needsUpdate=!0;const C=E*4;for(let N=0;N<h;N++){const z=u[N],B=g[N],$=v[N],X=w*b*4*N;for(let H=0;H<z.count;H++){const K=H*C;_===!0&&(r.fromBufferAttribute(z,H),T[X+K+0]=r.x,T[X+K+1]=r.y,T[X+K+2]=r.z,T[X+K+3]=0),y===!0&&(r.fromBufferAttribute(B,H),T[X+K+4]=r.x,T[X+K+5]=r.y,T[X+K+6]=r.z,T[X+K+7]=0),x===!0&&(r.fromBufferAttribute($,H),T[X+K+8]=r.x,T[X+K+9]=r.y,T[X+K+10]=r.z,T[X+K+11]=$.itemSize===4?r.w:1)}}f={count:h,texture:P,size:new We(w,b)},i.set(s,f),s.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let x=0;x<c.length;x++)_+=c[x];const y=s.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:a}}function NE(t,e,n,i){let r=new WeakMap;function a(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function s(l){const c=l.target;c.removeEventListener("dispose",s),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:a,dispose:o}}const Yg=new ln,Um=new Vg(1,1),qg=new Pg,$g=new JS,Kg=new Og,Fm=[],Om=[],km=new Float32Array(16),Bm=new Float32Array(9),Gm=new Float32Array(4);function ao(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let a=Fm[r];if(a===void 0&&(a=new Float32Array(r),Fm[r]=a),e!==0){i.toArray(a,0);for(let o=1,s=0;o!==e;++o)s+=n,t[o].toArray(a,s)}return a}function zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ac(t,e){let n=Om[e];n===void 0&&(n=new Int32Array(e),Om[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function IE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function DE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function zE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(zt(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function UE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function FE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;Gm.set(i),t.uniformMatrix2fv(this.addr,!1,Gm),Ut(n,i)}}function OE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;Bm.set(i),t.uniformMatrix3fv(this.addr,!1,Bm),Ut(n,i)}}function kE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(zt(n,i))return;km.set(i),t.uniformMatrix4fv(this.addr,!1,km),Ut(n,i)}}function BE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function GE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function VE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function HE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function WE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function jE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function XE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function YE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function qE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let a;this.type===t.SAMPLER_2D_SHADOW?(Um.compareFunction=wg,a=Um):a=Yg,n.setTexture2D(e||a,r)}function $E(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||$g,r)}function KE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Kg,r)}function ZE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||qg,r)}function QE(t){switch(t){case 5126:return IE;case 35664:return DE;case 35665:return zE;case 35666:return UE;case 35674:return FE;case 35675:return OE;case 35676:return kE;case 5124:case 35670:return BE;case 35667:case 35671:return GE;case 35668:case 35672:return VE;case 35669:case 35673:return HE;case 5125:return WE;case 36294:return jE;case 36295:return XE;case 36296:return YE;case 35678:case 36198:case 36298:case 36306:case 35682:return qE;case 35679:case 36299:case 36307:return $E;case 35680:case 36300:case 36308:case 36293:return KE;case 36289:case 36303:case 36311:case 36292:return ZE}}function JE(t,e){t.uniform1fv(this.addr,e)}function eA(t,e){const n=ao(e,this.size,2);t.uniform2fv(this.addr,n)}function tA(t,e){const n=ao(e,this.size,3);t.uniform3fv(this.addr,n)}function nA(t,e){const n=ao(e,this.size,4);t.uniform4fv(this.addr,n)}function iA(t,e){const n=ao(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function rA(t,e){const n=ao(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function aA(t,e){const n=ao(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function oA(t,e){t.uniform1iv(this.addr,e)}function sA(t,e){t.uniform2iv(this.addr,e)}function lA(t,e){t.uniform3iv(this.addr,e)}function cA(t,e){t.uniform4iv(this.addr,e)}function uA(t,e){t.uniform1uiv(this.addr,e)}function dA(t,e){t.uniform2uiv(this.addr,e)}function fA(t,e){t.uniform3uiv(this.addr,e)}function hA(t,e){t.uniform4uiv(this.addr,e)}function pA(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Yg,a[o])}function mA(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||$g,a[o])}function xA(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Kg,a[o])}function gA(t,e,n){const i=this.cache,r=e.length,a=Ac(n,r);zt(i,a)||(t.uniform1iv(this.addr,a),Ut(i,a));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||qg,a[o])}function vA(t){switch(t){case 5126:return JE;case 35664:return eA;case 35665:return tA;case 35666:return nA;case 35674:return iA;case 35675:return rA;case 35676:return aA;case 5124:case 35670:return oA;case 35667:case 35671:return sA;case 35668:case 35672:return lA;case 35669:case 35673:return cA;case 5125:return uA;case 36294:return dA;case 36295:return fA;case 36296:return hA;case 35678:case 36198:case 36298:case 36306:case 35682:return pA;case 35679:case 36299:case 36307:return mA;case 35680:case 36300:case 36308:case 36293:return xA;case 36289:case 36303:case 36311:case 36292:return gA}}class _A{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=QE(n.type)}}class yA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=vA(n.type)}}class SA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(e,n[s.id],i)}}}const Lu=/(\w+)(\])?(\[|\.)?/g;function Vm(t,e){t.seq.push(e),t.map[e.id]=e}function MA(t,e,n){const i=t.name,r=i.length;for(Lu.lastIndex=0;;){const a=Lu.exec(i),o=Lu.lastIndex;let s=a[1];const l=a[2]==="]",c=a[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===r){Vm(n,c===void 0?new _A(s,t,e):new yA(s,t,e));break}else{let h=n.map[s];h===void 0&&(h=new SA(s),Vm(n,h)),n=h}}}class Tl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(n,r),o=e.getUniformLocation(n,a.name);MA(a,o,this)}}setValue(e,n,i,r){const a=this.map[n];a!==void 0&&a.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let a=0,o=n.length;a!==o;++a){const s=n[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Hm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const EA=37297;let AA=0;function bA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,n.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===e?">":" "} ${s}: ${n[o]}`)}return i.join(`
`)}const Wm=new ke;function CA(t){it._getMatrix(Wm,it.workingColorSpace,t);const e=`mat3( ${Wm.elements.map(n=>n.toFixed(4))} )`;switch(it.getTransfer(t)){case ec:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function jm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),a=(t.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return n.toUpperCase()+`

`+a+`

`+bA(t.getShaderSource(e),s)}else return a}function TA(t,e){const n=CA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function wA(t,e){let n;switch(e){case hS:n="Linear";break;case pS:n="Reinhard";break;case mS:n="Cineon";break;case yg:n="ACESFilmic";break;case gS:n="AgX";break;case vS:n="Neutral";break;case xS:n="Custom";break;default:ze("WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const il=new O;function RA(){it.getLuminanceCoefficients(il);const t=il.x.toFixed(4),e=il.y.toFixed(4),n=il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function PA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function LA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function NA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=t.getActiveAttrib(e,r),o=a.name;let s=1;a.type===t.FLOAT_MAT2&&(s=2),a.type===t.FLOAT_MAT3&&(s=3),a.type===t.FLOAT_MAT4&&(s=4),n[o]={type:a.type,location:t.getAttribLocation(e,o),locationSize:s}}return n}function wo(t){return t!==""}function Xm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ym(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IA=/^[ \t]*#include +<([\w\d./]+)>/gm;function _f(t){return t.replace(IA,zA)}const DA=new Map;function zA(t,e){let n=Oe[e];if(n===void 0){const i=DA.get(e);if(i!==void 0)n=Oe[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _f(n)}const UA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qm(t){return t.replace(UA,FA)}function FA(t,e,n,i){let r="";for(let a=parseInt(e);a<parseInt(n);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function $m(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function OA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===_g?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Xy?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function kA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ya:case qa:e="ENVMAP_TYPE_CUBE";break;case Sc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function BA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case qa:e="ENVMAP_MODE_REFRACTION";break}return e}function GA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case vh:e="ENVMAP_BLENDING_MULTIPLY";break;case dS:e="ENVMAP_BLENDING_MIX";break;case fS:e="ENVMAP_BLENDING_ADD";break}return e}function VA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function HA(t,e,n,i){const r=t.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const l=OA(n),c=kA(n),d=BA(n),h=GA(n),f=VA(n),p=PA(n),_=LA(a),y=r.createProgram();let x,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(wo).join(`
`),x.length>0&&(x+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(wo).join(`
`),u.length>0&&(u+=`
`)):(x=[$m(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),u=[$m(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ur?"#define TONE_MAPPING":"",n.toneMapping!==ur?Oe.tonemapping_pars_fragment:"",n.toneMapping!==ur?wA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,TA("linearToOutputTexel",n.outputColorSpace),RA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(wo).join(`
`)),o=_f(o),o=Xm(o,n),o=Ym(o,n),s=_f(s),s=Xm(s,n),s=Ym(s,n),o=qm(o),s=qm(s),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,u=["#define varying in",n.glslVersion===nm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===nm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const v=g+x+o,E=g+u+s,w=Hm(r,r.VERTEX_SHADER,v),b=Hm(r,r.FRAGMENT_SHADER,E);r.attachShader(y,w),r.attachShader(y,b),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(N){if(t.debug.checkShaderErrors){const z=r.getProgramInfoLog(y)||"",B=r.getShaderInfoLog(w)||"",$=r.getShaderInfoLog(b)||"",X=z.trim(),H=B.trim(),K=$.trim();let D=!0,W=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(D=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,w,b);else{const Y=jm(r,w,"vertex"),ne=jm(r,b,"fragment");Rt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+X+`
`+Y+`
`+ne)}else X!==""?ze("WebGLProgram: Program Info Log:",X):(H===""||K==="")&&(W=!1);W&&(N.diagnostics={runnable:D,programLog:X,vertexShader:{log:H,prefix:x},fragmentShader:{log:K,prefix:u}})}r.deleteShader(w),r.deleteShader(b),P=new Tl(r,y),C=NA(r,y)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(y,EA)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=AA++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=b,this}let WA=0;class jA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new XA(e),n.set(e,i)),i}}class XA{constructor(e){this.id=WA++,this.code=e,this.usedTimes=0}}function YA(t,e,n,i,r,a,o){const s=new Ph,l=new jA,c=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(C){return c.add(C),C===0?"uv":`uv${C}`}function x(C,M,N,z,B){const $=z.fog,X=B.geometry,H=C.isMeshStandardMaterial?z.environment:null,K=(C.isMeshStandardMaterial?n:e).get(C.envMap||H),D=K&&K.mapping===Sc?K.image.height:null,W=_[C.type];C.precision!==null&&(p=r.getMaxPrecision(C.precision),p!==C.precision&&ze("WebGLProgram.getParameters:",C.precision,"not supported, using",p,"instead."));const Y=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ne=Y!==void 0?Y.length:0;let _e=0;X.morphAttributes.position!==void 0&&(_e=1),X.morphAttributes.normal!==void 0&&(_e=2),X.morphAttributes.color!==void 0&&(_e=3);let Be,Ue,rt,q;if(W){const ot=ai[W];Be=ot.vertexShader,Ue=ot.fragmentShader}else Be=C.vertexShader,Ue=C.fragmentShader,l.update(C),rt=l.getVertexShaderID(C),q=l.getFragmentShaderID(C);const J=t.getRenderTarget(),xe=t.state.buffers.depth.getReversed(),Fe=B.isInstancedMesh===!0,Ee=B.isBatchedMesh===!0,Xe=!!C.map,Bt=!!C.matcap,Ve=!!K,gt=!!C.aoMap,L=!!C.lightMap,Ye=!!C.bumpMap,qe=!!C.normalMap,dt=!!C.displacementMap,ye=!!C.emissiveMap,_t=!!C.metalnessMap,be=!!C.roughnessMap,De=C.anisotropy>0,R=C.clearcoat>0,S=C.dispersion>0,k=C.iridescence>0,Z=C.sheen>0,ee=C.transmission>0,j=De&&!!C.anisotropyMap,Me=R&&!!C.clearcoatMap,ue=R&&!!C.clearcoatNormalMap,Ce=R&&!!C.clearcoatRoughnessMap,Se=k&&!!C.iridescenceMap,te=k&&!!C.iridescenceThicknessMap,oe=Z&&!!C.sheenColorMap,Pe=Z&&!!C.sheenRoughnessMap,we=!!C.specularMap,he=!!C.specularColorMap,Ne=!!C.specularIntensityMap,I=ee&&!!C.transmissionMap,de=ee&&!!C.thicknessMap,se=!!C.gradientMap,le=!!C.alphaMap,re=C.alphaTest>0,Q=!!C.alphaHash,ge=!!C.extensions;let Ie=ur;C.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ie=t.toneMapping);const pt={shaderID:W,shaderType:C.type,shaderName:C.name,vertexShader:Be,fragmentShader:Ue,defines:C.defines,customVertexShaderID:rt,customFragmentShaderID:q,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&B._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&B.instanceColor!==null,instancingMorph:Fe&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?t.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:$a,alphaToCoverage:!!C.alphaToCoverage,map:Xe,matcap:Bt,envMap:Ve,envMapMode:Ve&&K.mapping,envMapCubeUVHeight:D,aoMap:gt,lightMap:L,bumpMap:Ye,normalMap:qe,displacementMap:f&&dt,emissiveMap:ye,normalMapObjectSpace:qe&&C.normalMapType===MS,normalMapTangentSpace:qe&&C.normalMapType===Th,metalnessMap:_t,roughnessMap:be,anisotropy:De,anisotropyMap:j,clearcoat:R,clearcoatMap:Me,clearcoatNormalMap:ue,clearcoatRoughnessMap:Ce,dispersion:S,iridescence:k,iridescenceMap:Se,iridescenceThicknessMap:te,sheen:Z,sheenColorMap:oe,sheenRoughnessMap:Pe,specularMap:we,specularColorMap:he,specularIntensityMap:Ne,transmission:ee,transmissionMap:I,thicknessMap:de,gradientMap:se,opaque:C.transparent===!1&&C.blending===Ia&&C.alphaToCoverage===!1,alphaMap:le,alphaTest:re,alphaHash:Q,combine:C.combine,mapUv:Xe&&y(C.map.channel),aoMapUv:gt&&y(C.aoMap.channel),lightMapUv:L&&y(C.lightMap.channel),bumpMapUv:Ye&&y(C.bumpMap.channel),normalMapUv:qe&&y(C.normalMap.channel),displacementMapUv:dt&&y(C.displacementMap.channel),emissiveMapUv:ye&&y(C.emissiveMap.channel),metalnessMapUv:_t&&y(C.metalnessMap.channel),roughnessMapUv:be&&y(C.roughnessMap.channel),anisotropyMapUv:j&&y(C.anisotropyMap.channel),clearcoatMapUv:Me&&y(C.clearcoatMap.channel),clearcoatNormalMapUv:ue&&y(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&y(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&y(C.iridescenceMap.channel),iridescenceThicknessMapUv:te&&y(C.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&y(C.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&y(C.sheenRoughnessMap.channel),specularMapUv:we&&y(C.specularMap.channel),specularColorMapUv:he&&y(C.specularColorMap.channel),specularIntensityMapUv:Ne&&y(C.specularIntensityMap.channel),transmissionMapUv:I&&y(C.transmissionMap.channel),thicknessMapUv:de&&y(C.thicknessMap.channel),alphaMapUv:le&&y(C.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(qe||De),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!X.attributes.uv&&(Xe||le),fog:!!$,useFog:C.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:xe,skinning:B.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:_e,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:C.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Xe&&C.map.isVideoTexture===!0&&it.getTransfer(C.map.colorSpace)===lt,decodeVideoTextureEmissive:ye&&C.emissiveMap.isVideoTexture===!0&&it.getTransfer(C.emissiveMap.colorSpace)===lt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Ai,flipSided:C.side===sn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:ge&&C.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&C.extensions.multiDraw===!0||Ee)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function u(C){const M=[];if(C.shaderID?M.push(C.shaderID):(M.push(C.customVertexShaderID),M.push(C.customFragmentShaderID)),C.defines!==void 0)for(const N in C.defines)M.push(N),M.push(C.defines[N]);return C.isRawShaderMaterial===!1&&(g(M,C),v(M,C),M.push(t.outputColorSpace)),M.push(C.customProgramCacheKey),M.join()}function g(C,M){C.push(M.precision),C.push(M.outputColorSpace),C.push(M.envMapMode),C.push(M.envMapCubeUVHeight),C.push(M.mapUv),C.push(M.alphaMapUv),C.push(M.lightMapUv),C.push(M.aoMapUv),C.push(M.bumpMapUv),C.push(M.normalMapUv),C.push(M.displacementMapUv),C.push(M.emissiveMapUv),C.push(M.metalnessMapUv),C.push(M.roughnessMapUv),C.push(M.anisotropyMapUv),C.push(M.clearcoatMapUv),C.push(M.clearcoatNormalMapUv),C.push(M.clearcoatRoughnessMapUv),C.push(M.iridescenceMapUv),C.push(M.iridescenceThicknessMapUv),C.push(M.sheenColorMapUv),C.push(M.sheenRoughnessMapUv),C.push(M.specularMapUv),C.push(M.specularColorMapUv),C.push(M.specularIntensityMapUv),C.push(M.transmissionMapUv),C.push(M.thicknessMapUv),C.push(M.combine),C.push(M.fogExp2),C.push(M.sizeAttenuation),C.push(M.morphTargetsCount),C.push(M.morphAttributeCount),C.push(M.numDirLights),C.push(M.numPointLights),C.push(M.numSpotLights),C.push(M.numSpotLightMaps),C.push(M.numHemiLights),C.push(M.numRectAreaLights),C.push(M.numDirLightShadows),C.push(M.numPointLightShadows),C.push(M.numSpotLightShadows),C.push(M.numSpotLightShadowsWithMaps),C.push(M.numLightProbes),C.push(M.shadowMapType),C.push(M.toneMapping),C.push(M.numClippingPlanes),C.push(M.numClipIntersection),C.push(M.depthPacking)}function v(C,M){s.disableAll(),M.supportsVertexTextures&&s.enable(0),M.instancing&&s.enable(1),M.instancingColor&&s.enable(2),M.instancingMorph&&s.enable(3),M.matcap&&s.enable(4),M.envMap&&s.enable(5),M.normalMapObjectSpace&&s.enable(6),M.normalMapTangentSpace&&s.enable(7),M.clearcoat&&s.enable(8),M.iridescence&&s.enable(9),M.alphaTest&&s.enable(10),M.vertexColors&&s.enable(11),M.vertexAlphas&&s.enable(12),M.vertexUv1s&&s.enable(13),M.vertexUv2s&&s.enable(14),M.vertexUv3s&&s.enable(15),M.vertexTangents&&s.enable(16),M.anisotropy&&s.enable(17),M.alphaHash&&s.enable(18),M.batching&&s.enable(19),M.dispersion&&s.enable(20),M.batchingColor&&s.enable(21),M.gradientMap&&s.enable(22),C.push(s.mask),s.disableAll(),M.fog&&s.enable(0),M.useFog&&s.enable(1),M.flatShading&&s.enable(2),M.logarithmicDepthBuffer&&s.enable(3),M.reversedDepthBuffer&&s.enable(4),M.skinning&&s.enable(5),M.morphTargets&&s.enable(6),M.morphNormals&&s.enable(7),M.morphColors&&s.enable(8),M.premultipliedAlpha&&s.enable(9),M.shadowMapEnabled&&s.enable(10),M.doubleSided&&s.enable(11),M.flipSided&&s.enable(12),M.useDepthPacking&&s.enable(13),M.dithering&&s.enable(14),M.transmission&&s.enable(15),M.sheen&&s.enable(16),M.opaque&&s.enable(17),M.pointsUvs&&s.enable(18),M.decodeVideoTexture&&s.enable(19),M.decodeVideoTextureEmissive&&s.enable(20),M.alphaToCoverage&&s.enable(21),C.push(s.mask)}function E(C){const M=_[C.type];let N;if(M){const z=ai[M];N=f1.clone(z.uniforms)}else N=C.uniforms;return N}function w(C,M){let N;for(let z=0,B=d.length;z<B;z++){const $=d[z];if($.cacheKey===M){N=$,++N.usedTimes;break}}return N===void 0&&(N=new HA(t,M,C,a),d.push(N)),N}function b(C){if(--C.usedTimes===0){const M=d.indexOf(C);d[M]=d[d.length-1],d.pop(),C.destroy()}}function T(C){l.remove(C)}function P(){l.dispose()}return{getParameters:x,getProgramCacheKey:u,getUniforms:E,acquireProgram:w,releaseProgram:b,releaseShaderCache:T,programs:d,dispose:P}}function qA(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let s=t.get(o);return s===void 0&&(s={},t.set(o,s)),s}function i(o){t.delete(o)}function r(o,s,l){t.get(o)[s]=l}function a(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:a}}function $A(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Km(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Zm(){const t=[];let e=0;const n=[],i=[],r=[];function a(){e=0,n.length=0,i.length=0,r.length=0}function o(h,f,p,_,y,x){let u=t[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:y,group:x},t[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=y,u.group=x),e++,u}function s(h,f,p,_,y,x){const u=o(h,f,p,_,y,x);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(h,f,p,_,y,x){const u=o(h,f,p,_,y,x);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(h,f){n.length>1&&n.sort(h||$A),i.length>1&&i.sort(f||Km),r.length>1&&r.sort(f||Km)}function d(){for(let h=e,f=t.length;h<f;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:a,push:s,unshift:l,finish:d,sort:c}}function KA(){let t=new WeakMap;function e(i,r){const a=t.get(i);let o;return a===void 0?(o=new Zm,t.set(i,[o])):r>=a.length?(o=new Zm,a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function ZA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Ge};break;case"SpotLight":n={position:new O,direction:new O,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":n={color:new Ge,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function QA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let JA=0;function e2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function t2(t){const e=new ZA,n=QA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,a=new ht,o=new ht;function s(c){let d=0,h=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,_=0,y=0,x=0,u=0,g=0,v=0,E=0,w=0,b=0,T=0;c.sort(e2);for(let C=0,M=c.length;C<M;C++){const N=c[C],z=N.color,B=N.intensity,$=N.distance,X=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=z.r*B,h+=z.g*B,f+=z.b*B;else if(N.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(N.sh.coefficients[H],B);T++}else if(N.isDirectionalLight){const H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const K=N.shadow,D=n.get(N);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=N.shadow.matrix,g++}i.directional[p]=H,p++}else if(N.isSpotLight){const H=e.get(N);H.position.setFromMatrixPosition(N.matrixWorld),H.color.copy(z).multiplyScalar(B),H.distance=$,H.coneCos=Math.cos(N.angle),H.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),H.decay=N.decay,i.spot[y]=H;const K=N.shadow;if(N.map&&(i.spotLightMap[w]=N.map,w++,K.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[y]=K.matrix,N.castShadow){const D=n.get(N);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,i.spotShadow[y]=D,i.spotShadowMap[y]=X,E++}y++}else if(N.isRectAreaLight){const H=e.get(N);H.color.copy(z).multiplyScalar(B),H.halfWidth.set(N.width*.5,0,0),H.halfHeight.set(0,N.height*.5,0),i.rectArea[x]=H,x++}else if(N.isPointLight){const H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),H.distance=N.distance,H.decay=N.decay,N.castShadow){const K=N.shadow,D=n.get(N);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,D.shadowCameraNear=K.camera.near,D.shadowCameraFar=K.camera.far,i.pointShadow[_]=D,i.pointShadowMap[_]=X,i.pointShadowMatrix[_]=N.shadow.matrix,v++}i.point[_]=H,_++}else if(N.isHemisphereLight){const H=e.get(N);H.skyColor.copy(N.color).multiplyScalar(B),H.groundColor.copy(N.groundColor).multiplyScalar(B),i.hemi[u]=H,u++}}x>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==_||P.spotLength!==y||P.rectAreaLength!==x||P.hemiLength!==u||P.numDirectionalShadows!==g||P.numPointShadows!==v||P.numSpotShadows!==E||P.numSpotMaps!==w||P.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=x,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=E+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=T,P.directionalLength=p,P.pointLength=_,P.spotLength=y,P.rectAreaLength=x,P.hemiLength=u,P.numDirectionalShadows=g,P.numPointShadows=v,P.numSpotShadows=E,P.numSpotMaps=w,P.numLightProbes=T,i.version=JA++)}function l(c,d){let h=0,f=0,p=0,_=0,y=0;const x=d.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){const v=c[u];if(v.isDirectionalLight){const E=i.directional[h];E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(x),h++}else if(v.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(x),E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(x),p++}else if(v.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(x),o.identity(),a.copy(v.matrixWorld),a.premultiply(x),o.extractRotation(a),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(x),f++}else if(v.isHemisphereLight){const E=i.hemi[y];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(x),y++}}}return{setup:s,setupView:l,state:i}}function Qm(t){const e=new t2(t),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function s(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:s,setupLightsView:l,pushLight:a,pushShadow:o}}function n2(t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let s;return o===void 0?(s=new Qm(t),e.set(r,[s])):a>=o.length?(s=new Qm(t),o.push(s)):s=o[a],s}function i(){e=new WeakMap}return{get:n,dispose:i}}const i2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r2=`uniform sampler2D shadow_pass;
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
}`;function a2(t,e,n){let i=new Lh;const r=new We,a=new We,o=new ct,s=new A1({depthPacking:SS}),l=new b1,c={},d=n.maxTextureSize,h={[hr]:sn,[sn]:hr,[Ai]:Ai},f=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:i2,fragmentShader:r2}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Fi;_.setAttribute("position",new Qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Vt(_,f),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_g;let u=this.type;this.render=function(b,T,P){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||b.length===0)return;const C=t.getRenderTarget(),M=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),z=t.state;z.setBlending(Ri),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const B=u!==yi&&this.type===yi,$=u===yi&&this.type!==yi;for(let X=0,H=b.length;X<H;X++){const K=b[X],D=K.shadow;if(D===void 0){ze("WebGLShadowMap:",K,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const W=D.getFrameExtents();if(r.multiply(W),a.copy(D.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/W.x),r.x=a.x*W.x,D.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/W.y),r.y=a.y*W.y,D.mapSize.y=a.y)),D.map===null||B===!0||$===!0){const ne=this.type!==yi?{minFilter:Tn,magFilter:Tn}:{};D.map!==null&&D.map.dispose(),D.map=new Wr(r.x,r.y,ne),D.map.texture.name=K.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const Y=D.getViewportCount();for(let ne=0;ne<Y;ne++){const _e=D.getViewport(ne);o.set(a.x*_e.x,a.y*_e.y,a.x*_e.z,a.y*_e.w),z.viewport(o),D.updateMatrices(K,ne),i=D.getFrustum(),E(T,P,D.camera,K,this.type)}D.isPointLightShadow!==!0&&this.type===yi&&g(D,P),D.needsUpdate=!1}u=this.type,x.needsUpdate=!1,t.setRenderTarget(C,M,N)};function g(b,T){const P=e.update(y);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Wr(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(T,null,P,f,y,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(T,null,P,p,y,null)}function v(b,T,P,C){let M=null;const N=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)M=N;else if(M=P.isPointLight===!0?l:s,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const z=M.uuid,B=T.uuid;let $=c[z];$===void 0&&($={},c[z]=$);let X=$[B];X===void 0&&(X=M.clone(),$[B]=X,T.addEventListener("dispose",w)),M=X}if(M.visible=T.visible,M.wireframe=T.wireframe,C===yi?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:h[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=t.properties.get(M);z.light=P}return M}function E(b,T,P,C,M){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===yi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const B=e.update(b),$=b.material;if(Array.isArray($)){const X=B.groups;for(let H=0,K=X.length;H<K;H++){const D=X[H],W=$[D.materialIndex];if(W&&W.visible){const Y=v(b,W,C,M);b.onBeforeShadow(t,b,T,P,B,Y,D),t.renderBufferDirect(P,null,B,Y,b,D),b.onAfterShadow(t,b,T,P,B,Y,D)}}}else if($.visible){const X=v(b,$,C,M);b.onBeforeShadow(t,b,T,P,B,X,null),t.renderBufferDirect(P,null,B,X,b,null),b.onAfterShadow(t,b,T,P,B,X,null)}}const z=b.children;for(let B=0,$=z.length;B<$;B++)E(z[B],T,P,C,M)}function w(b){b.target.removeEventListener("dispose",w);for(const P in c){const C=c[P],M=b.target.uuid;M in C&&(C[M].dispose(),delete C[M])}}}const o2={[Rd]:Pd,[Ld]:Dd,[Nd]:zd,[Xa]:Id,[Pd]:Rd,[Dd]:Ld,[zd]:Nd,[Id]:Xa};function s2(t,e){function n(){let I=!1;const de=new ct;let se=null;const le=new ct(0,0,0,0);return{setMask:function(re){se!==re&&!I&&(t.colorMask(re,re,re,re),se=re)},setLocked:function(re){I=re},setClear:function(re,Q,ge,Ie,pt){pt===!0&&(re*=Ie,Q*=Ie,ge*=Ie),de.set(re,Q,ge,Ie),le.equals(de)===!1&&(t.clearColor(re,Q,ge,Ie),le.copy(de))},reset:function(){I=!1,se=null,le.set(-1,0,0,0)}}}function i(){let I=!1,de=!1,se=null,le=null,re=null;return{setReversed:function(Q){if(de!==Q){const ge=e.get("EXT_clip_control");Q?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),de=Q;const Ie=re;re=null,this.setClear(Ie)}},getReversed:function(){return de},setTest:function(Q){Q?J(t.DEPTH_TEST):xe(t.DEPTH_TEST)},setMask:function(Q){se!==Q&&!I&&(t.depthMask(Q),se=Q)},setFunc:function(Q){if(de&&(Q=o2[Q]),le!==Q){switch(Q){case Rd:t.depthFunc(t.NEVER);break;case Pd:t.depthFunc(t.ALWAYS);break;case Ld:t.depthFunc(t.LESS);break;case Xa:t.depthFunc(t.LEQUAL);break;case Nd:t.depthFunc(t.EQUAL);break;case Id:t.depthFunc(t.GEQUAL);break;case Dd:t.depthFunc(t.GREATER);break;case zd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}le=Q}},setLocked:function(Q){I=Q},setClear:function(Q){re!==Q&&(de&&(Q=1-Q),t.clearDepth(Q),re=Q)},reset:function(){I=!1,se=null,le=null,re=null,de=!1}}}function r(){let I=!1,de=null,se=null,le=null,re=null,Q=null,ge=null,Ie=null,pt=null;return{setTest:function(ot){I||(ot?J(t.STENCIL_TEST):xe(t.STENCIL_TEST))},setMask:function(ot){de!==ot&&!I&&(t.stencilMask(ot),de=ot)},setFunc:function(ot,ni,Bn){(se!==ot||le!==ni||re!==Bn)&&(t.stencilFunc(ot,ni,Bn),se=ot,le=ni,re=Bn)},setOp:function(ot,ni,Bn){(Q!==ot||ge!==ni||Ie!==Bn)&&(t.stencilOp(ot,ni,Bn),Q=ot,ge=ni,Ie=Bn)},setLocked:function(ot){I=ot},setClear:function(ot){pt!==ot&&(t.clearStencil(ot),pt=ot)},reset:function(){I=!1,de=null,se=null,le=null,re=null,Q=null,ge=null,Ie=null,pt=null}}}const a=new n,o=new i,s=new r,l=new WeakMap,c=new WeakMap;let d={},h={},f=new WeakMap,p=[],_=null,y=!1,x=null,u=null,g=null,v=null,E=null,w=null,b=null,T=new Ge(0,0,0),P=0,C=!1,M=null,N=null,z=null,B=null,$=null;const X=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,K=0;const D=t.getParameter(t.VERSION);D.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(D)[1]),H=K>=1):D.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),H=K>=2);let W=null,Y={};const ne=t.getParameter(t.SCISSOR_BOX),_e=t.getParameter(t.VIEWPORT),Be=new ct().fromArray(ne),Ue=new ct().fromArray(_e);function rt(I,de,se,le){const re=new Uint8Array(4),Q=t.createTexture();t.bindTexture(I,Q),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ge=0;ge<se;ge++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,le,0,t.RGBA,t.UNSIGNED_BYTE,re):t.texImage2D(de+ge,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,re);return Q}const q={};q[t.TEXTURE_2D]=rt(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=rt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=rt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=rt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),J(t.DEPTH_TEST),o.setFunc(Xa),Ye(!1),qe(Kp),J(t.CULL_FACE),gt(Ri);function J(I){d[I]!==!0&&(t.enable(I),d[I]=!0)}function xe(I){d[I]!==!1&&(t.disable(I),d[I]=!1)}function Fe(I,de){return h[I]!==de?(t.bindFramebuffer(I,de),h[I]=de,I===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=de),I===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=de),!0):!1}function Ee(I,de){let se=p,le=!1;if(I){se=f.get(de),se===void 0&&(se=[],f.set(de,se));const re=I.textures;if(se.length!==re.length||se[0]!==t.COLOR_ATTACHMENT0){for(let Q=0,ge=re.length;Q<ge;Q++)se[Q]=t.COLOR_ATTACHMENT0+Q;se.length=re.length,le=!0}}else se[0]!==t.BACK&&(se[0]=t.BACK,le=!0);le&&t.drawBuffers(se)}function Xe(I){return _!==I?(t.useProgram(I),_=I,!0):!1}const Bt={[Tr]:t.FUNC_ADD,[qy]:t.FUNC_SUBTRACT,[$y]:t.FUNC_REVERSE_SUBTRACT};Bt[Ky]=t.MIN,Bt[Zy]=t.MAX;const Ve={[Qy]:t.ZERO,[Jy]:t.ONE,[eS]:t.SRC_COLOR,[Td]:t.SRC_ALPHA,[oS]:t.SRC_ALPHA_SATURATE,[rS]:t.DST_COLOR,[nS]:t.DST_ALPHA,[tS]:t.ONE_MINUS_SRC_COLOR,[wd]:t.ONE_MINUS_SRC_ALPHA,[aS]:t.ONE_MINUS_DST_COLOR,[iS]:t.ONE_MINUS_DST_ALPHA,[sS]:t.CONSTANT_COLOR,[lS]:t.ONE_MINUS_CONSTANT_COLOR,[cS]:t.CONSTANT_ALPHA,[uS]:t.ONE_MINUS_CONSTANT_ALPHA};function gt(I,de,se,le,re,Q,ge,Ie,pt,ot){if(I===Ri){y===!0&&(xe(t.BLEND),y=!1);return}if(y===!1&&(J(t.BLEND),y=!0),I!==Yy){if(I!==x||ot!==C){if((u!==Tr||E!==Tr)&&(t.blendEquation(t.FUNC_ADD),u=Tr,E=Tr),ot)switch(I){case Ia:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Zp:t.blendFunc(t.ONE,t.ONE);break;case Qp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Jp:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Rt("WebGLState: Invalid blending: ",I);break}else switch(I){case Ia:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Zp:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Qp:Rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jp:Rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Rt("WebGLState: Invalid blending: ",I);break}g=null,v=null,w=null,b=null,T.set(0,0,0),P=0,x=I,C=ot}return}re=re||de,Q=Q||se,ge=ge||le,(de!==u||re!==E)&&(t.blendEquationSeparate(Bt[de],Bt[re]),u=de,E=re),(se!==g||le!==v||Q!==w||ge!==b)&&(t.blendFuncSeparate(Ve[se],Ve[le],Ve[Q],Ve[ge]),g=se,v=le,w=Q,b=ge),(Ie.equals(T)===!1||pt!==P)&&(t.blendColor(Ie.r,Ie.g,Ie.b,pt),T.copy(Ie),P=pt),x=I,C=!1}function L(I,de){I.side===Ai?xe(t.CULL_FACE):J(t.CULL_FACE);let se=I.side===sn;de&&(se=!se),Ye(se),I.blending===Ia&&I.transparent===!1?gt(Ri):gt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),a.setMask(I.colorWrite);const le=I.stencilWrite;s.setTest(le),le&&(s.setMask(I.stencilWriteMask),s.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),s.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ye(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?J(t.SAMPLE_ALPHA_TO_COVERAGE):xe(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(I){M!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),M=I)}function qe(I){I!==Wy?(J(t.CULL_FACE),I!==N&&(I===Kp?t.cullFace(t.BACK):I===jy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):xe(t.CULL_FACE),N=I}function dt(I){I!==z&&(H&&t.lineWidth(I),z=I)}function ye(I,de,se){I?(J(t.POLYGON_OFFSET_FILL),(B!==de||$!==se)&&(t.polygonOffset(de,se),B=de,$=se)):xe(t.POLYGON_OFFSET_FILL)}function _t(I){I?J(t.SCISSOR_TEST):xe(t.SCISSOR_TEST)}function be(I){I===void 0&&(I=t.TEXTURE0+X-1),W!==I&&(t.activeTexture(I),W=I)}function De(I,de,se){se===void 0&&(W===null?se=t.TEXTURE0+X-1:se=W);let le=Y[se];le===void 0&&(le={type:void 0,texture:void 0},Y[se]=le),(le.type!==I||le.texture!==de)&&(W!==se&&(t.activeTexture(se),W=se),t.bindTexture(I,de||q[I]),le.type=I,le.texture=de)}function R(){const I=Y[W];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{t.compressedTexImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function k(){try{t.compressedTexImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function Z(){try{t.texSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function ee(){try{t.texSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function j(){try{t.compressedTexSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Me(){try{t.compressedTexSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ue(){try{t.texStorage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Ce(){try{t.texStorage3D(...arguments)}catch(I){I("WebGLState:",I)}}function Se(){try{t.texImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function te(){try{t.texImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function oe(I){Be.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),Be.copy(I))}function Pe(I){Ue.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),Ue.copy(I))}function we(I,de){let se=c.get(de);se===void 0&&(se=new WeakMap,c.set(de,se));let le=se.get(I);le===void 0&&(le=t.getUniformBlockIndex(de,I.name),se.set(I,le))}function he(I,de){const le=c.get(de).get(I);l.get(de)!==le&&(t.uniformBlockBinding(de,le,I.__bindingPointIndex),l.set(de,le))}function Ne(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},W=null,Y={},h={},f=new WeakMap,p=[],_=null,y=!1,x=null,u=null,g=null,v=null,E=null,w=null,b=null,T=new Ge(0,0,0),P=0,C=!1,M=null,N=null,z=null,B=null,$=null,Be.set(0,0,t.canvas.width,t.canvas.height),Ue.set(0,0,t.canvas.width,t.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:J,disable:xe,bindFramebuffer:Fe,drawBuffers:Ee,useProgram:Xe,setBlending:gt,setMaterial:L,setFlipSided:Ye,setCullFace:qe,setLineWidth:dt,setPolygonOffset:ye,setScissorTest:_t,activeTexture:be,bindTexture:De,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:k,texImage2D:Se,texImage3D:te,updateUBOMapping:we,uniformBlockBinding:he,texStorage2D:ue,texStorage3D:Ce,texSubImage2D:Z,texSubImage3D:ee,compressedTexSubImage2D:j,compressedTexSubImage3D:Me,scissor:oe,viewport:Pe,reset:Ne}}function l2(t,e,n,i,r,a,o){const s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return p?new OffscreenCanvas(R,S):nc("canvas")}function y(R,S,k){let Z=1;const ee=De(R);if((ee.width>k||ee.height>k)&&(Z=k/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(Z*ee.width),Me=Math.floor(Z*ee.height);h===void 0&&(h=_(j,Me));const ue=S?_(j,Me):h;return ue.width=j,ue.height=Me,ue.getContext("2d").drawImage(R,0,0,j,Me),ze("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+j+"x"+Me+")."),ue}else return"data"in R&&ze("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function x(R){return R.generateMipmaps}function u(R){t.generateMipmap(R)}function g(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function v(R,S,k,Z,ee=!1){if(R!==null){if(t[R]!==void 0)return t[R];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=S;if(S===t.RED&&(k===t.FLOAT&&(j=t.R32F),k===t.HALF_FLOAT&&(j=t.R16F),k===t.UNSIGNED_BYTE&&(j=t.R8)),S===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(j=t.R8UI),k===t.UNSIGNED_SHORT&&(j=t.R16UI),k===t.UNSIGNED_INT&&(j=t.R32UI),k===t.BYTE&&(j=t.R8I),k===t.SHORT&&(j=t.R16I),k===t.INT&&(j=t.R32I)),S===t.RG&&(k===t.FLOAT&&(j=t.RG32F),k===t.HALF_FLOAT&&(j=t.RG16F),k===t.UNSIGNED_BYTE&&(j=t.RG8)),S===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&(j=t.RG8UI),k===t.UNSIGNED_SHORT&&(j=t.RG16UI),k===t.UNSIGNED_INT&&(j=t.RG32UI),k===t.BYTE&&(j=t.RG8I),k===t.SHORT&&(j=t.RG16I),k===t.INT&&(j=t.RG32I)),S===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&(j=t.RGB8UI),k===t.UNSIGNED_SHORT&&(j=t.RGB16UI),k===t.UNSIGNED_INT&&(j=t.RGB32UI),k===t.BYTE&&(j=t.RGB8I),k===t.SHORT&&(j=t.RGB16I),k===t.INT&&(j=t.RGB32I)),S===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&(j=t.RGBA8UI),k===t.UNSIGNED_SHORT&&(j=t.RGBA16UI),k===t.UNSIGNED_INT&&(j=t.RGBA32UI),k===t.BYTE&&(j=t.RGBA8I),k===t.SHORT&&(j=t.RGBA16I),k===t.INT&&(j=t.RGBA32I)),S===t.RGB&&(k===t.UNSIGNED_INT_5_9_9_9_REV&&(j=t.RGB9_E5),k===t.UNSIGNED_INT_10F_11F_11F_REV&&(j=t.R11F_G11F_B10F)),S===t.RGBA){const Me=ee?ec:it.getTransfer(Z);k===t.FLOAT&&(j=t.RGBA32F),k===t.HALF_FLOAT&&(j=t.RGBA16F),k===t.UNSIGNED_BYTE&&(j=Me===lt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT_4_4_4_4&&(j=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(j=t.RGB5_A1)}return(j===t.R16F||j===t.R32F||j===t.RG16F||j===t.RG32F||j===t.RGBA16F||j===t.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function E(R,S){let k;return R?S===null||S===Hr||S===rs?k=t.DEPTH24_STENCIL8:S===si?k=t.DEPTH32F_STENCIL8:S===is&&(k=t.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Hr||S===rs?k=t.DEPTH_COMPONENT24:S===si?k=t.DEPTH_COMPONENT32F:S===is&&(k=t.DEPTH_COMPONENT16),k}function w(R,S){return x(R)===!0||R.isFramebufferTexture&&R.minFilter!==Tn&&R.minFilter!==Un?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function b(R){const S=R.target;S.removeEventListener("dispose",b),P(S),S.isVideoTexture&&d.delete(S)}function T(R){const S=R.target;S.removeEventListener("dispose",T),M(S)}function P(R){const S=i.get(R);if(S.__webglInit===void 0)return;const k=R.source,Z=f.get(k);if(Z){const ee=Z[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&C(R),Object.keys(Z).length===0&&f.delete(k)}i.remove(R)}function C(R){const S=i.get(R);t.deleteTexture(S.__webglTexture);const k=R.source,Z=f.get(k);delete Z[S.__cacheKey],o.memory.textures--}function M(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let ee=0;ee<S.__webglFramebuffer[Z].length;ee++)t.deleteFramebuffer(S.__webglFramebuffer[Z][ee]);else t.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)t.deleteFramebuffer(S.__webglFramebuffer[Z]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let Z=0,ee=k.length;Z<ee;Z++){const j=i.get(k[Z]);j.__webglTexture&&(t.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(k[Z])}i.remove(R)}let N=0;function z(){N=0}function B(){const R=N;return R>=r.maxTextures&&ze("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),N+=1,R}function $(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function X(R,S){const k=i.get(R);if(R.isVideoTexture&&_t(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Z=R.image;if(Z===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{q(k,R,S);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+S)}function H(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){q(k,R,S);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+S)}function K(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){q(k,R,S);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+S)}function D(R,S){const k=i.get(R);if(R.version>0&&k.__version!==R.version){J(k,R,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+S)}const W={[Od]:t.REPEAT,[Ti]:t.CLAMP_TO_EDGE,[kd]:t.MIRRORED_REPEAT},Y={[Tn]:t.NEAREST,[_S]:t.NEAREST_MIPMAP_NEAREST,[Us]:t.NEAREST_MIPMAP_LINEAR,[Un]:t.LINEAR,[nu]:t.LINEAR_MIPMAP_NEAREST,[Nr]:t.LINEAR_MIPMAP_LINEAR},ne={[ES]:t.NEVER,[RS]:t.ALWAYS,[AS]:t.LESS,[wg]:t.LEQUAL,[bS]:t.EQUAL,[wS]:t.GEQUAL,[CS]:t.GREATER,[TS]:t.NOTEQUAL};function _e(R,S){if(S.type===si&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Un||S.magFilter===nu||S.magFilter===Us||S.magFilter===Nr||S.minFilter===Un||S.minFilter===nu||S.minFilter===Us||S.minFilter===Nr)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,W[S.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,W[S.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,W[S.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,Y[S.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,Y[S.minFilter]),S.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Tn||S.minFilter!==Us&&S.minFilter!==Nr||S.type===si&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Be(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",b));const Z=S.source;let ee=f.get(Z);ee===void 0&&(ee={},f.set(Z,ee));const j=$(S);if(j!==R.__cacheKey){ee[j]===void 0&&(ee[j]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ee[j].usedTimes++;const Me=ee[R.__cacheKey];Me!==void 0&&(ee[R.__cacheKey].usedTimes--,Me.usedTimes===0&&C(S)),R.__cacheKey=j,R.__webglTexture=ee[j].texture}return k}function Ue(R,S,k){return Math.floor(Math.floor(R/k)/S)}function rt(R,S,k,Z){const j=R.updateRanges;if(j.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,k,Z,S.data);else{j.sort((te,oe)=>te.start-oe.start);let Me=0;for(let te=1;te<j.length;te++){const oe=j[Me],Pe=j[te],we=oe.start+oe.count,he=Ue(Pe.start,S.width,4),Ne=Ue(oe.start,S.width,4);Pe.start<=we+1&&he===Ne&&Ue(Pe.start+Pe.count-1,S.width,4)===he?oe.count=Math.max(oe.count,Pe.start+Pe.count-oe.start):(++Me,j[Me]=Pe)}j.length=Me+1;const ue=t.getParameter(t.UNPACK_ROW_LENGTH),Ce=t.getParameter(t.UNPACK_SKIP_PIXELS),Se=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let te=0,oe=j.length;te<oe;te++){const Pe=j[te],we=Math.floor(Pe.start/4),he=Math.ceil(Pe.count/4),Ne=we%S.width,I=Math.floor(we/S.width),de=he,se=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(t.UNPACK_SKIP_ROWS,I),n.texSubImage2D(t.TEXTURE_2D,0,Ne,I,de,se,k,Z,S.data)}R.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ue),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),t.pixelStorei(t.UNPACK_SKIP_ROWS,Se)}}function q(R,S,k){let Z=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=t.TEXTURE_3D);const ee=Be(R,S),j=S.source;n.bindTexture(Z,R.__webglTexture,t.TEXTURE0+k);const Me=i.get(j);if(j.version!==Me.__version||ee===!0){n.activeTexture(t.TEXTURE0+k);const ue=it.getPrimaries(it.workingColorSpace),Ce=S.colorSpace===Zi?null:it.getPrimaries(S.colorSpace),Se=S.colorSpace===Zi||ue===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let te=y(S.image,!1,r.maxTextureSize);te=be(S,te);const oe=a.convert(S.format,S.colorSpace),Pe=a.convert(S.type);let we=v(S.internalFormat,oe,Pe,S.colorSpace,S.isVideoTexture);_e(Z,S);let he;const Ne=S.mipmaps,I=S.isVideoTexture!==!0,de=Me.__version===void 0||ee===!0,se=j.dataReady,le=w(S,te);if(S.isDepthTexture)we=E(S.format===os,S.type),de&&(I?n.texStorage2D(t.TEXTURE_2D,1,we,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,we,te.width,te.height,0,oe,Pe,null));else if(S.isDataTexture)if(Ne.length>0){I&&de&&n.texStorage2D(t.TEXTURE_2D,le,we,Ne[0].width,Ne[0].height);for(let re=0,Q=Ne.length;re<Q;re++)he=Ne[re],I?se&&n.texSubImage2D(t.TEXTURE_2D,re,0,0,he.width,he.height,oe,Pe,he.data):n.texImage2D(t.TEXTURE_2D,re,we,he.width,he.height,0,oe,Pe,he.data);S.generateMipmaps=!1}else I?(de&&n.texStorage2D(t.TEXTURE_2D,le,we,te.width,te.height),se&&rt(S,te,oe,Pe)):n.texImage2D(t.TEXTURE_2D,0,we,te.width,te.height,0,oe,Pe,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&de&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,we,Ne[0].width,Ne[0].height,te.depth);for(let re=0,Q=Ne.length;re<Q;re++)if(he=Ne[re],S.format!==$n)if(oe!==null)if(I){if(se)if(S.layerUpdates.size>0){const ge=Pm(he.width,he.height,S.format,S.type);for(const Ie of S.layerUpdates){const pt=he.data.subarray(Ie*ge/he.data.BYTES_PER_ELEMENT,(Ie+1)*ge/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,Ie,he.width,he.height,1,oe,pt)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,0,he.width,he.height,te.depth,oe,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,re,we,he.width,he.height,te.depth,0,he.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?se&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,re,0,0,0,he.width,he.height,te.depth,oe,Pe,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,re,we,he.width,he.height,te.depth,0,oe,Pe,he.data)}else{I&&de&&n.texStorage2D(t.TEXTURE_2D,le,we,Ne[0].width,Ne[0].height);for(let re=0,Q=Ne.length;re<Q;re++)he=Ne[re],S.format!==$n?oe!==null?I?se&&n.compressedTexSubImage2D(t.TEXTURE_2D,re,0,0,he.width,he.height,oe,he.data):n.compressedTexImage2D(t.TEXTURE_2D,re,we,he.width,he.height,0,he.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?se&&n.texSubImage2D(t.TEXTURE_2D,re,0,0,he.width,he.height,oe,Pe,he.data):n.texImage2D(t.TEXTURE_2D,re,we,he.width,he.height,0,oe,Pe,he.data)}else if(S.isDataArrayTexture)if(I){if(de&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,we,te.width,te.height,te.depth),se)if(S.layerUpdates.size>0){const re=Pm(te.width,te.height,S.format,S.type);for(const Q of S.layerUpdates){const ge=te.data.subarray(Q*re/te.data.BYTES_PER_ELEMENT,(Q+1)*re/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,oe,Pe,ge)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,oe,Pe,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,we,te.width,te.height,te.depth,0,oe,Pe,te.data);else if(S.isData3DTexture)I?(de&&n.texStorage3D(t.TEXTURE_3D,le,we,te.width,te.height,te.depth),se&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,oe,Pe,te.data)):n.texImage3D(t.TEXTURE_3D,0,we,te.width,te.height,te.depth,0,oe,Pe,te.data);else if(S.isFramebufferTexture){if(de)if(I)n.texStorage2D(t.TEXTURE_2D,le,we,te.width,te.height);else{let re=te.width,Q=te.height;for(let ge=0;ge<le;ge++)n.texImage2D(t.TEXTURE_2D,ge,we,re,Q,0,oe,Pe,null),re>>=1,Q>>=1}}else if(Ne.length>0){if(I&&de){const re=De(Ne[0]);n.texStorage2D(t.TEXTURE_2D,le,we,re.width,re.height)}for(let re=0,Q=Ne.length;re<Q;re++)he=Ne[re],I?se&&n.texSubImage2D(t.TEXTURE_2D,re,0,0,oe,Pe,he):n.texImage2D(t.TEXTURE_2D,re,we,oe,Pe,he);S.generateMipmaps=!1}else if(I){if(de){const re=De(te);n.texStorage2D(t.TEXTURE_2D,le,we,re.width,re.height)}se&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,oe,Pe,te)}else n.texImage2D(t.TEXTURE_2D,0,we,oe,Pe,te);x(S)&&u(Z),Me.__version=j.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function J(R,S,k){if(S.image.length!==6)return;const Z=Be(R,S),ee=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+k);const j=i.get(ee);if(ee.version!==j.__version||Z===!0){n.activeTexture(t.TEXTURE0+k);const Me=it.getPrimaries(it.workingColorSpace),ue=S.colorSpace===Zi?null:it.getPrimaries(S.colorSpace),Ce=S.colorSpace===Zi||Me===ue?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Se=S.isCompressedTexture||S.image[0].isCompressedTexture,te=S.image[0]&&S.image[0].isDataTexture,oe=[];for(let Q=0;Q<6;Q++)!Se&&!te?oe[Q]=y(S.image[Q],!0,r.maxCubemapSize):oe[Q]=te?S.image[Q].image:S.image[Q],oe[Q]=be(S,oe[Q]);const Pe=oe[0],we=a.convert(S.format,S.colorSpace),he=a.convert(S.type),Ne=v(S.internalFormat,we,he,S.colorSpace),I=S.isVideoTexture!==!0,de=j.__version===void 0||Z===!0,se=ee.dataReady;let le=w(S,Pe);_e(t.TEXTURE_CUBE_MAP,S);let re;if(Se){I&&de&&n.texStorage2D(t.TEXTURE_CUBE_MAP,le,Ne,Pe.width,Pe.height);for(let Q=0;Q<6;Q++){re=oe[Q].mipmaps;for(let ge=0;ge<re.length;ge++){const Ie=re[ge];S.format!==$n?we!==null?I?se&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,0,0,Ie.width,Ie.height,we,Ie.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,Ne,Ie.width,Ie.height,0,Ie.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,0,0,Ie.width,Ie.height,we,he,Ie.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge,Ne,Ie.width,Ie.height,0,we,he,Ie.data)}}}else{if(re=S.mipmaps,I&&de){re.length>0&&le++;const Q=De(oe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,le,Ne,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(te){I?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,oe[Q].width,oe[Q].height,we,he,oe[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ne,oe[Q].width,oe[Q].height,0,we,he,oe[Q].data);for(let ge=0;ge<re.length;ge++){const pt=re[ge].image[Q].image;I?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,0,0,pt.width,pt.height,we,he,pt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,Ne,pt.width,pt.height,0,we,he,pt.data)}}else{I?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,we,he,oe[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ne,we,he,oe[Q]);for(let ge=0;ge<re.length;ge++){const Ie=re[ge];I?se&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,0,0,we,he,Ie.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ge+1,Ne,we,he,Ie.image[Q])}}}x(S)&&u(t.TEXTURE_CUBE_MAP),j.__version=ee.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function xe(R,S,k,Z,ee,j){const Me=a.convert(k.format,k.colorSpace),ue=a.convert(k.type),Ce=v(k.internalFormat,Me,ue,k.colorSpace),Se=i.get(S),te=i.get(k);if(te.__renderTarget=S,!Se.__hasExternalTextures){const oe=Math.max(1,S.width>>j),Pe=Math.max(1,S.height>>j);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,j,Ce,oe,Pe,S.depth,0,Me,ue,null):n.texImage2D(ee,j,Ce,oe,Pe,0,Me,ue,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),ye(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,ee,te.__webglTexture,0,dt(S)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Z,ee,te.__webglTexture,j),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Fe(R,S,k){if(t.bindRenderbuffer(t.RENDERBUFFER,R),S.depthBuffer){const Z=S.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,j=E(S.stencilBuffer,ee),Me=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=dt(S);ye(S)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,j,S.width,S.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,j,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,j,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Me,t.RENDERBUFFER,R)}else{const Z=S.textures;for(let ee=0;ee<Z.length;ee++){const j=Z[ee],Me=a.convert(j.format,j.colorSpace),ue=a.convert(j.type),Ce=v(j.internalFormat,Me,ue,j.colorSpace),Se=dt(S);k&&ye(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Se,Ce,S.width,S.height):ye(S)?s.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Se,Ce,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Ce,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ee(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);const ee=Z.__webglTexture,j=dt(S);if(S.depthTexture.format===as)ye(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,j):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(S.depthTexture.format===os)ye(S)?s.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,j):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Xe(R){const S=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=Z}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const Z=R.texture.mipmaps;Z&&Z.length>0?Ee(S.__webglFramebuffer[0],R):Ee(S.__webglFramebuffer,R)}else if(k){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=t.createRenderbuffer(),Fe(S.__webglDepthbuffer[Z],R,!1);else{const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,j),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,j)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),Fe(S.__webglDepthbuffer,R,!1);else{const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,j),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,j)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Bt(R,S,k){const Z=i.get(R);S!==void 0&&xe(Z.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&Xe(R)}function Ve(R){const S=R.texture,k=i.get(R),Z=i.get(S);R.addEventListener("dispose",T);const ee=R.textures,j=R.isWebGLCubeRenderTarget===!0,Me=ee.length>1;if(Me||(Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture()),Z.__version=S.version,o.memory.textures++),j){k.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ue]=[];for(let Ce=0;Ce<S.mipmaps.length;Ce++)k.__webglFramebuffer[ue][Ce]=t.createFramebuffer()}else k.__webglFramebuffer[ue]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ue=0;ue<S.mipmaps.length;ue++)k.__webglFramebuffer[ue]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(Me)for(let ue=0,Ce=ee.length;ue<Ce;ue++){const Se=i.get(ee[ue]);Se.__webglTexture===void 0&&(Se.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&ye(R)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const Ce=ee[ue];k.__webglColorRenderbuffer[ue]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[ue]);const Se=a.convert(Ce.format,Ce.colorSpace),te=a.convert(Ce.type),oe=v(Ce.internalFormat,Se,te,Ce.colorSpace,R.isXRRenderTarget===!0),Pe=dt(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Pe,oe,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,k.__webglColorRenderbuffer[ue])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),Fe(k.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(j){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),_e(t.TEXTURE_CUBE_MAP,S);for(let ue=0;ue<6;ue++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)xe(k.__webglFramebuffer[ue][Ce],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ce);else xe(k.__webglFramebuffer[ue],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);x(S)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Me){for(let ue=0,Ce=ee.length;ue<Ce;ue++){const Se=ee[ue],te=i.get(Se);let oe=t.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(oe,te.__webglTexture),_e(oe,Se),xe(k.__webglFramebuffer,R,Se,t.COLOR_ATTACHMENT0+ue,oe,0),x(Se)&&u(oe)}n.unbindTexture()}else{let ue=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ue,Z.__webglTexture),_e(ue,S),S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)xe(k.__webglFramebuffer[Ce],R,S,t.COLOR_ATTACHMENT0,ue,Ce);else xe(k.__webglFramebuffer,R,S,t.COLOR_ATTACHMENT0,ue,0);x(S)&&u(ue),n.unbindTexture()}R.depthBuffer&&Xe(R)}function gt(R){const S=R.textures;for(let k=0,Z=S.length;k<Z;k++){const ee=S[k];if(x(ee)){const j=g(R),Me=i.get(ee).__webglTexture;n.bindTexture(j,Me),u(j),n.unbindTexture()}}}const L=[],Ye=[];function qe(R){if(R.samples>0){if(ye(R)===!1){const S=R.textures,k=R.width,Z=R.height;let ee=t.COLOR_BUFFER_BIT;const j=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Me=i.get(R),ue=S.length>1;if(ue)for(let Se=0;Se<S.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const Ce=R.texture.mipmaps;Ce&&Ce.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),ue){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);const te=i.get(S[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,te,0)}t.blitFramebuffer(0,0,k,Z,0,0,k,Z,ee,t.NEAREST),l===!0&&(L.length=0,Ye.length=0,L.push(t.COLOR_ATTACHMENT0+Se),R.depthBuffer&&R.resolveDepthBuffer===!1&&(L.push(j),Ye.push(j),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ye)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,L))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ue)for(let Se=0;Se<S.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,Me.__webglColorRenderbuffer[Se]);const te=i.get(S[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Me.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,te,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function dt(R){return Math.min(r.maxSamples,R.samples)}function ye(R){const S=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function _t(R){const S=o.render.frame;d.get(R)!==S&&(d.set(R,S),R.update())}function be(R,S){const k=R.colorSpace,Z=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==$a&&k!==Zi&&(it.getTransfer(k)===lt?(Z!==$n||ee!==hi)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Rt("WebGLTextures: Unsupported texture color space:",k)),S}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=K,this.setTextureCube=D,this.rebindTextures=Bt,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ye}function c2(t,e){function n(i,r=Zi){let a;const o=it.getTransfer(r);if(i===hi)return t.UNSIGNED_BYTE;if(i===yh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Sh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Ag)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===bg)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Mg)return t.BYTE;if(i===Eg)return t.SHORT;if(i===is)return t.UNSIGNED_SHORT;if(i===_h)return t.INT;if(i===Hr)return t.UNSIGNED_INT;if(i===si)return t.FLOAT;if(i===eo)return t.HALF_FLOAT;if(i===Cg)return t.ALPHA;if(i===Tg)return t.RGB;if(i===$n)return t.RGBA;if(i===as)return t.DEPTH_COMPONENT;if(i===os)return t.DEPTH_STENCIL;if(i===Mh)return t.RED;if(i===Eh)return t.RED_INTEGER;if(i===Ah)return t.RG;if(i===bh)return t.RG_INTEGER;if(i===Ch)return t.RGBA_INTEGER;if(i===El||i===Al||i===bl||i===Cl)if(o===lt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===El)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===El)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bd||i===Gd||i===Vd||i===Hd)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Bd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wd||i===jd||i===Xd)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Wd||i===jd)return o===lt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Xd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yd||i===qd||i===$d||i===Kd||i===Zd||i===Qd||i===Jd||i===ef||i===tf||i===nf||i===rf||i===af||i===of||i===sf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Yd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$d)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jd)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ef)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===af)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===of)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sf)return o===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lf||i===cf||i===uf)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===lf)return o===lt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===df||i===ff||i===hf||i===pf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===df)return a.COMPRESSED_RED_RGTC1_EXT;if(i===ff)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hf)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const u2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d2=`
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

}`;class f2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Hg(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new zi({vertexShader:u2,fragmentShader:d2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Vt(new Mc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h2 extends to{constructor(e,n){super();const i=this;let r=null,a=1,o=null,s="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,_=null;const y=typeof XRWebGLBinding<"u",x=new f2,u={},g=n.getContextAttributes();let v=null,E=null;const w=[],b=[],T=new We;let P=null;const C=new An;C.viewport=new ct;const M=new An;M.viewport=new ct;const N=[C,M],z=new P1;let B=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=w[q];return J===void 0&&(J=new Eu,w[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=w[q];return J===void 0&&(J=new Eu,w[q]=J),J.getGripSpace()},this.getHand=function(q){let J=w[q];return J===void 0&&(J=new Eu,w[q]=J),J.getHandSpace()};function X(q){const J=b.indexOf(q.inputSource);if(J===-1)return;const xe=w[J];xe!==void 0&&(xe.update(q.inputSource,q.frame,c||o),xe.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",K);for(let q=0;q<w.length;q++){const J=b[q];J!==null&&(b[q]=null,w[q].disconnect(J))}B=null,$=null,x.reset();for(const q in u)delete u[q];e.setRenderTarget(v),p=null,f=null,h=null,r=null,E=null,rt.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",H),r.addEventListener("inputsourceschange",K),g.xrCompatible!==!0&&await n.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(T),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Fe=null,Ee=null;g.depth&&(Ee=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,xe=g.stencil?os:as,Fe=g.stencil?rs:Hr);const Xe={colorFormat:n.RGBA8,depthFormat:Ee,scaleFactor:a};h=this.getBinding(),f=h.createProjectionLayer(Xe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Wr(f.textureWidth,f.textureHeight,{format:$n,type:hi,depthTexture:new Vg(f.textureWidth,f.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const xe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,n,xe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Wr(p.framebufferWidth,p.framebufferHeight,{format:$n,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(s),rt.setContext(r),rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(q){for(let J=0;J<q.removed.length;J++){const xe=q.removed[J],Fe=b.indexOf(xe);Fe>=0&&(b[Fe]=null,w[Fe].disconnect(xe))}for(let J=0;J<q.added.length;J++){const xe=q.added[J];let Fe=b.indexOf(xe);if(Fe===-1){for(let Xe=0;Xe<w.length;Xe++)if(Xe>=b.length){b.push(xe),Fe=Xe;break}else if(b[Xe]===null){b[Xe]=xe,Fe=Xe;break}if(Fe===-1)break}const Ee=w[Fe];Ee&&Ee.connect(xe)}}const D=new O,W=new O;function Y(q,J,xe){D.setFromMatrixPosition(J.matrixWorld),W.setFromMatrixPosition(xe.matrixWorld);const Fe=D.distanceTo(W),Ee=J.projectionMatrix.elements,Xe=xe.projectionMatrix.elements,Bt=Ee[14]/(Ee[10]-1),Ve=Ee[14]/(Ee[10]+1),gt=(Ee[9]+1)/Ee[5],L=(Ee[9]-1)/Ee[5],Ye=(Ee[8]-1)/Ee[0],qe=(Xe[8]+1)/Xe[0],dt=Bt*Ye,ye=Bt*qe,_t=Fe/(-Ye+qe),be=_t*-Ye;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(be),q.translateZ(_t),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ee[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const De=Bt+_t,R=Ve+_t,S=dt-be,k=ye+(Fe-be),Z=gt*Ve/R*De,ee=L*Ve/R*De;q.projectionMatrix.makePerspective(S,k,Z,ee,De,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ne(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let J=q.near,xe=q.far;x.texture!==null&&(x.depthNear>0&&(J=x.depthNear),x.depthFar>0&&(xe=x.depthFar)),z.near=M.near=C.near=J,z.far=M.far=C.far=xe,(B!==z.near||$!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),B=z.near,$=z.far),z.layers.mask=q.layers.mask|6,C.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;const Fe=q.parent,Ee=z.cameras;ne(z,Fe);for(let Xe=0;Xe<Ee.length;Xe++)ne(Ee[Xe],Fe);Ee.length===2?Y(z,C,M):z.projectionMatrix.copy(C.projectionMatrix),_e(q,z,Fe)};function _e(q,J,xe){xe===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(xe.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ls*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(z)},this.getCameraTexture=function(q){return u[q]};let Be=null;function Ue(q,J){if(d=J.getViewerPose(c||o),_=J,d!==null){const xe=d.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let Fe=!1;xe.length!==z.cameras.length&&(z.cameras.length=0,Fe=!0);for(let Ve=0;Ve<xe.length;Ve++){const gt=xe[Ve];let L=null;if(p!==null)L=p.getViewport(gt);else{const qe=h.getViewSubImage(f,gt);L=qe.viewport,Ve===0&&(e.setRenderTargetTextures(E,qe.colorTexture,qe.depthStencilTexture),e.setRenderTarget(E))}let Ye=N[Ve];Ye===void 0&&(Ye=new An,Ye.layers.enable(Ve),Ye.viewport=new ct,N[Ve]=Ye),Ye.matrix.fromArray(gt.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(gt.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(L.x,L.y,L.width,L.height),Ve===0&&(z.matrix.copy(Ye.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Fe===!0&&z.cameras.push(Ye)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){h=i.getBinding();const Ve=h.getDepthInformation(xe[0]);Ve&&Ve.isValid&&Ve.texture&&x.init(Ve,r.renderState)}if(Ee&&Ee.includes("camera-access")&&y){e.state.unbindTexture(),h=i.getBinding();for(let Ve=0;Ve<xe.length;Ve++){const gt=xe[Ve].camera;if(gt){let L=u[gt];L||(L=new Hg,u[gt]=L);const Ye=h.getCameraImage(gt);L.sourceTexture=Ye}}}}for(let xe=0;xe<w.length;xe++){const Fe=b[xe],Ee=w[xe];Fe!==null&&Ee!==void 0&&Ee.update(Fe,J,c||o)}Be&&Be(q,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),_=null}const rt=new Xg;rt.setAnimationLoop(Ue),this.setAnimationLoop=function(q){Be=q},this.dispose=function(){}}}const Ar=new ei,p2=new ht;function m2(t,e){function n(x,u){x.matrixAutoUpdate===!0&&x.updateMatrix(),u.value.copy(x.matrix)}function i(x,u){u.color.getRGB(x.fogColor.value,Ug(t)),u.isFog?(x.fogNear.value=u.near,x.fogFar.value=u.far):u.isFogExp2&&(x.fogDensity.value=u.density)}function r(x,u,g,v,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(x,u):u.isMeshToonMaterial?(a(x,u),h(x,u)):u.isMeshPhongMaterial?(a(x,u),d(x,u)):u.isMeshStandardMaterial?(a(x,u),f(x,u),u.isMeshPhysicalMaterial&&p(x,u,E)):u.isMeshMatcapMaterial?(a(x,u),_(x,u)):u.isMeshDepthMaterial?a(x,u):u.isMeshDistanceMaterial?(a(x,u),y(x,u)):u.isMeshNormalMaterial?a(x,u):u.isLineBasicMaterial?(o(x,u),u.isLineDashedMaterial&&s(x,u)):u.isPointsMaterial?l(x,u,g,v):u.isSpriteMaterial?c(x,u):u.isShadowMaterial?(x.color.value.copy(u.color),x.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(x,u){x.opacity.value=u.opacity,u.color&&x.diffuse.value.copy(u.color),u.emissive&&x.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.bumpMap&&(x.bumpMap.value=u.bumpMap,n(u.bumpMap,x.bumpMapTransform),x.bumpScale.value=u.bumpScale,u.side===sn&&(x.bumpScale.value*=-1)),u.normalMap&&(x.normalMap.value=u.normalMap,n(u.normalMap,x.normalMapTransform),x.normalScale.value.copy(u.normalScale),u.side===sn&&x.normalScale.value.negate()),u.displacementMap&&(x.displacementMap.value=u.displacementMap,n(u.displacementMap,x.displacementMapTransform),x.displacementScale.value=u.displacementScale,x.displacementBias.value=u.displacementBias),u.emissiveMap&&(x.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,x.emissiveMapTransform)),u.specularMap&&(x.specularMap.value=u.specularMap,n(u.specularMap,x.specularMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest);const g=e.get(u),v=g.envMap,E=g.envMapRotation;v&&(x.envMap.value=v,Ar.copy(E),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),x.envMapRotation.value.setFromMatrix4(p2.makeRotationFromEuler(Ar)),x.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=u.reflectivity,x.ior.value=u.ior,x.refractionRatio.value=u.refractionRatio),u.lightMap&&(x.lightMap.value=u.lightMap,x.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,x.lightMapTransform)),u.aoMap&&(x.aoMap.value=u.aoMap,x.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,x.aoMapTransform))}function o(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform))}function s(x,u){x.dashSize.value=u.dashSize,x.totalSize.value=u.dashSize+u.gapSize,x.scale.value=u.scale}function l(x,u,g,v){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.size.value=u.size*g,x.scale.value=v*.5,u.map&&(x.map.value=u.map,n(u.map,x.uvTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function c(x,u){x.diffuse.value.copy(u.color),x.opacity.value=u.opacity,x.rotation.value=u.rotation,u.map&&(x.map.value=u.map,n(u.map,x.mapTransform)),u.alphaMap&&(x.alphaMap.value=u.alphaMap,n(u.alphaMap,x.alphaMapTransform)),u.alphaTest>0&&(x.alphaTest.value=u.alphaTest)}function d(x,u){x.specular.value.copy(u.specular),x.shininess.value=Math.max(u.shininess,1e-4)}function h(x,u){u.gradientMap&&(x.gradientMap.value=u.gradientMap)}function f(x,u){x.metalness.value=u.metalness,u.metalnessMap&&(x.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,x.metalnessMapTransform)),x.roughness.value=u.roughness,u.roughnessMap&&(x.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,x.roughnessMapTransform)),u.envMap&&(x.envMapIntensity.value=u.envMapIntensity)}function p(x,u,g){x.ior.value=u.ior,u.sheen>0&&(x.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),x.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(x.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,x.sheenColorMapTransform)),u.sheenRoughnessMap&&(x.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,x.sheenRoughnessMapTransform))),u.clearcoat>0&&(x.clearcoat.value=u.clearcoat,x.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(x.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,x.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(x.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===sn&&x.clearcoatNormalScale.value.negate())),u.dispersion>0&&(x.dispersion.value=u.dispersion),u.iridescence>0&&(x.iridescence.value=u.iridescence,x.iridescenceIOR.value=u.iridescenceIOR,x.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(x.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,x.iridescenceMapTransform)),u.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),u.transmission>0&&(x.transmission.value=u.transmission,x.transmissionSamplerMap.value=g.texture,x.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(x.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,x.transmissionMapTransform)),x.thickness.value=u.thickness,u.thicknessMap&&(x.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=u.attenuationDistance,x.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(x.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(x.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=u.specularIntensity,x.specularColor.value.copy(u.specularColor),u.specularColorMap&&(x.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,x.specularColorMapTransform)),u.specularIntensityMap&&(x.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,x.specularIntensityMapTransform))}function _(x,u){u.matcap&&(x.matcap.value=u.matcap)}function y(x,u){const g=e.get(u).light;x.referencePosition.value.setFromMatrixPosition(g.matrixWorld),x.nearDistance.value=g.shadow.camera.near,x.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function x2(t,e,n,i){let r={},a={},o=[];const s=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){const E=v.program;i.uniformBlockBinding(g,E)}function c(g,v){let E=r[g.id];E===void 0&&(_(g),E=d(g),r[g.id]=E,g.addEventListener("dispose",x));const w=v.program;i.updateUBOMapping(g,w);const b=e.render.frame;a[g.id]!==b&&(f(g),a[g.id]=b)}function d(g){const v=h();g.__bindingPointIndex=v;const E=t.createBuffer(),w=g.__size,b=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,w,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,E),E}function h(){for(let g=0;g<s;g++)if(o.indexOf(g)===-1)return o.push(g),g;return Rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(g){const v=r[g.id],E=g.uniforms,w=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let b=0,T=E.length;b<T;b++){const P=Array.isArray(E[b])?E[b]:[E[b]];for(let C=0,M=P.length;C<M;C++){const N=P[C];if(p(N,b,C,w)===!0){const z=N.__offset,B=Array.isArray(N.value)?N.value:[N.value];let $=0;for(let X=0;X<B.length;X++){const H=B[X],K=y(H);typeof H=="number"||typeof H=="boolean"?(N.__data[0]=H,t.bufferSubData(t.UNIFORM_BUFFER,z+$,N.__data)):H.isMatrix3?(N.__data[0]=H.elements[0],N.__data[1]=H.elements[1],N.__data[2]=H.elements[2],N.__data[3]=0,N.__data[4]=H.elements[3],N.__data[5]=H.elements[4],N.__data[6]=H.elements[5],N.__data[7]=0,N.__data[8]=H.elements[6],N.__data[9]=H.elements[7],N.__data[10]=H.elements[8],N.__data[11]=0):(H.toArray(N.__data,$),$+=K.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,z,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(g,v,E,w){const b=g.value,T=v+"_"+E;if(w[T]===void 0)return typeof b=="number"||typeof b=="boolean"?w[T]=b:w[T]=b.clone(),!0;{const P=w[T];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return w[T]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function _(g){const v=g.uniforms;let E=0;const w=16;for(let T=0,P=v.length;T<P;T++){const C=Array.isArray(v[T])?v[T]:[v[T]];for(let M=0,N=C.length;M<N;M++){const z=C[M],B=Array.isArray(z.value)?z.value:[z.value];for(let $=0,X=B.length;$<X;$++){const H=B[$],K=y(H),D=E%w,W=D%K.boundary,Y=D+W;E+=W,Y!==0&&w-Y<K.storage&&(E+=w-Y),z.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=E,E+=K.storage}}}const b=E%w;return b>0&&(E+=w-b),g.__size=E,g.__cache={},this}function y(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ze("WebGLRenderer: Unsupported uniform value type.",g),v}function x(g){const v=g.target;v.removeEventListener("dispose",x);const E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete a[v.id]}function u(){for(const g in r)t.deleteBuffer(r[g]);o=[],r={},a={}}return{bind:l,update:c,dispose:u}}const g2=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let _i=null;function v2(){return _i===null&&(_i=new Bg(g2,32,32,Ah,eo),_i.minFilter=Un,_i.magFilter=Un,_i.wrapS=Ti,_i.wrapT=Ti,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}class _2{constructor(e={}){const{canvas:n=PS(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const _=new Set([Ch,bh,Eh]),y=new Set([hi,Hr,is,rs,yh,Sh]),x=new Uint32Array(4),u=new Int32Array(4);let g=null,v=null;const E=[],w=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ur,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let T=!1;this._outputColorSpace=En;let P=0,C=0,M=null,N=-1,z=null;const B=new ct,$=new ct;let X=null;const H=new Ge(0);let K=0,D=n.width,W=n.height,Y=1,ne=null,_e=null;const Be=new ct(0,0,D,W),Ue=new ct(0,0,D,W);let rt=!1;const q=new Lh;let J=!1,xe=!1;const Fe=new ht,Ee=new O,Xe=new ct,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function gt(){return M===null?Y:1}let L=i;function Ye(A,U){return n.getContext(A,U)}try{const A={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${gh}`),n.addEventListener("webglcontextlost",re,!1),n.addEventListener("webglcontextrestored",Q,!1),n.addEventListener("webglcontextcreationerror",ge,!1),L===null){const U="webgl2";if(L=Ye(U,A),L===null)throw Ye(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw A("WebGLRenderer: "+A.message),A}let qe,dt,ye,_t,be,De,R,S,k,Z,ee,j,Me,ue,Ce,Se,te,oe,Pe,we,he,Ne,I,de;function se(){qe=new TE(L),qe.init(),Ne=new c2(L,qe),dt=new vE(L,qe,e,Ne),ye=new s2(L,qe),dt.reversedDepthBuffer&&f&&ye.buffers.depth.setReversed(!0),_t=new PE(L),be=new qA,De=new l2(L,qe,ye,be,dt,Ne,_t),R=new yE(b),S=new CE(b),k=new D1(L),I=new xE(L,k),Z=new wE(L,k,_t,I),ee=new NE(L,Z,k,_t),Pe=new LE(L,dt,De),Se=new _E(be),j=new YA(b,R,S,qe,dt,I,Se),Me=new m2(b,be),ue=new KA,Ce=new n2(qe),oe=new mE(b,R,S,ye,ee,p,l),te=new a2(b,ee,dt),de=new x2(L,_t,dt,ye),we=new gE(L,qe,_t),he=new RE(L,qe,_t),_t.programs=j.programs,b.capabilities=dt,b.extensions=qe,b.properties=be,b.renderLists=ue,b.shadowMap=te,b.state=ye,b.info=_t}se();const le=new h2(b,L);this.xr=le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const A=qe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=qe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(A){A!==void 0&&(Y=A,this.setSize(D,W,!1))},this.getSize=function(A){return A.set(D,W)},this.setSize=function(A,U,G=!0){if(le.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}D=A,W=U,n.width=Math.floor(A*Y),n.height=Math.floor(U*Y),G===!0&&(n.style.width=A+"px",n.style.height=U+"px"),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(D*Y,W*Y).floor()},this.setDrawingBufferSize=function(A,U,G){D=A,W=U,Y=G,n.width=Math.floor(A*G),n.height=Math.floor(U*G),this.setViewport(0,0,A,U)},this.getCurrentViewport=function(A){return A.copy(B)},this.getViewport=function(A){return A.copy(Be)},this.setViewport=function(A,U,G,V){A.isVector4?Be.set(A.x,A.y,A.z,A.w):Be.set(A,U,G,V),ye.viewport(B.copy(Be).multiplyScalar(Y).round())},this.getScissor=function(A){return A.copy(Ue)},this.setScissor=function(A,U,G,V){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,U,G,V),ye.scissor($.copy(Ue).multiplyScalar(Y).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(A){ye.setScissorTest(rt=A)},this.setOpaqueSort=function(A){ne=A},this.setTransparentSort=function(A){_e=A},this.getClearColor=function(A){return A.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,G=!0){let V=0;if(A){let F=!1;if(M!==null){const ae=M.texture.format;F=_.has(ae)}if(F){const ae=M.texture.type,fe=y.has(ae),ve=oe.getClearColor(),me=oe.getClearAlpha(),Re=ve.r,Le=ve.g,Ae=ve.b;fe?(x[0]=Re,x[1]=Le,x[2]=Ae,x[3]=me,L.clearBufferuiv(L.COLOR,0,x)):(u[0]=Re,u[1]=Le,u[2]=Ae,u[3]=me,L.clearBufferiv(L.COLOR,0,u))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT),G&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",re,!1),n.removeEventListener("webglcontextrestored",Q,!1),n.removeEventListener("webglcontextcreationerror",ge,!1),oe.dispose(),ue.dispose(),Ce.dispose(),be.dispose(),R.dispose(),S.dispose(),ee.dispose(),I.dispose(),de.dispose(),j.dispose(),le.dispose(),le.removeEventListener("sessionstart",Ih),le.removeEventListener("sessionend",Dh),gr.stop()};function re(A){A.preventDefault(),rm("WebGLRenderer: Context Lost."),T=!0}function Q(){rm("WebGLRenderer: Context Restored."),T=!1;const A=_t.autoReset,U=te.enabled,G=te.autoUpdate,V=te.needsUpdate,F=te.type;se(),_t.autoReset=A,te.enabled=U,te.autoUpdate=G,te.needsUpdate=V,te.type=F}function ge(A){Rt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ie(A){const U=A.target;U.removeEventListener("dispose",Ie),pt(U)}function pt(A){ot(A),be.remove(A)}function ot(A){const U=be.get(A).programs;U!==void 0&&(U.forEach(function(G){j.releaseProgram(G)}),A.isShaderMaterial&&j.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,G,V,F,ae){U===null&&(U=Bt);const fe=F.isMesh&&F.matrixWorld.determinant()<0,ve=cv(A,U,G,V,F);ye.setMaterial(V,fe);let me=G.index,Re=1;if(V.wireframe===!0){if(me=Z.getWireframeAttribute(G),me===void 0)return;Re=2}const Le=G.drawRange,Ae=G.attributes.position;let $e=Le.start*Re,st=(Le.start+Le.count)*Re;ae!==null&&($e=Math.max($e,ae.start*Re),st=Math.min(st,(ae.start+ae.count)*Re)),me!==null?($e=Math.max($e,0),st=Math.min(st,me.count)):Ae!=null&&($e=Math.max($e,0),st=Math.min(st,Ae.count));const Ct=st-$e;if(Ct<0||Ct===1/0)return;I.setup(F,V,ve,G,me);let Tt,ut=we;if(me!==null&&(Tt=k.get(me),ut=he,ut.setIndex(Tt)),F.isMesh)V.wireframe===!0?(ye.setLineWidth(V.wireframeLinewidth*gt()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(F.isLine){let Te=V.linewidth;Te===void 0&&(Te=1),ye.setLineWidth(Te*gt()),F.isLineSegments?ut.setMode(L.LINES):F.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else F.isPoints?ut.setMode(L.POINTS):F.isSprite&&ut.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ss("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Te=F._multiDrawStarts,yt=F._multiDrawCounts,tt=F._multiDrawCount,vn=me?k.get(me).bytesPerElement:1,qr=be.get(V).currentProgram.getUniforms();for(let _n=0;_n<tt;_n++)qr.setValue(L,"_gl_DrawID",_n),ut.render(Te[_n]/vn,yt[_n])}else if(F.isInstancedMesh)ut.renderInstances($e,Ct,F.count);else if(G.isInstancedBufferGeometry){const Te=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,yt=Math.min(G.instanceCount,Te);ut.renderInstances($e,Ct,yt)}else ut.render($e,Ct)};function ni(A,U,G){A.transparent===!0&&A.side===Ai&&A.forceSinglePass===!1?(A.side=sn,A.needsUpdate=!0,vs(A,U,G),A.side=hr,A.needsUpdate=!0,vs(A,U,G),A.side=Ai):vs(A,U,G)}this.compile=function(A,U,G=null){G===null&&(G=A),v=Ce.get(G),v.init(U),w.push(v),G.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(v.pushLight(F),F.castShadow&&v.pushShadow(F))}),A!==G&&A.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(v.pushLight(F),F.castShadow&&v.pushShadow(F))}),v.setupLights();const V=new Set;return A.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let fe=0;fe<ae.length;fe++){const ve=ae[fe];ni(ve,G,F),V.add(ve)}else ni(ae,G,F),V.add(ae)}),v=w.pop(),V},this.compileAsync=function(A,U,G=null){const V=this.compile(A,U,G);return new Promise(F=>{function ae(){if(V.forEach(function(fe){be.get(fe).currentProgram.isReady()&&V.delete(fe)}),V.size===0){F(A);return}setTimeout(ae,10)}qe.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Bn=null;function lv(A){Bn&&Bn(A)}function Ih(){gr.stop()}function Dh(){gr.start()}const gr=new Xg;gr.setAnimationLoop(lv),typeof self<"u"&&gr.setContext(self),this.setAnimationLoop=function(A){Bn=A,le.setAnimationLoop(A),A===null?gr.stop():gr.start()},le.addEventListener("sessionstart",Ih),le.addEventListener("sessionend",Dh),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){Rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),A.isScene===!0&&A.onBeforeRender(b,A,U,M),v=Ce.get(A,w.length),v.init(U),w.push(v),Fe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(Fe,li,U.reversedDepth),xe=this.localClippingEnabled,J=Se.init(this.clippingPlanes,xe),g=ue.get(A,E.length),g.init(),E.push(g),le.enabled===!0&&le.isPresenting===!0){const ae=b.xr.getDepthSensingMesh();ae!==null&&Tc(ae,U,-1/0,b.sortObjects)}Tc(A,U,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(ne,_e),Ve=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ve&&oe.addToRenderList(g,A),this.info.render.frame++,J===!0&&Se.beginShadows();const G=v.state.shadowsArray;te.render(G,A,U),J===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=g.opaque,F=g.transmissive;if(v.setupLights(),U.isArrayCamera){const ae=U.cameras;if(F.length>0)for(let fe=0,ve=ae.length;fe<ve;fe++){const me=ae[fe];Uh(V,F,A,me)}Ve&&oe.render(A);for(let fe=0,ve=ae.length;fe<ve;fe++){const me=ae[fe];zh(g,A,me,me.viewport)}}else F.length>0&&Uh(V,F,A,U),Ve&&oe.render(A),zh(g,A,U);M!==null&&C===0&&(De.updateMultisampleRenderTarget(M),De.updateRenderTargetMipmap(M)),A.isScene===!0&&A.onAfterRender(b,A,U),I.resetDefaultState(),N=-1,z=null,w.pop(),w.length>0?(v=w[w.length-1],J===!0&&Se.setGlobalState(b.clippingPlanes,v.state.camera)):v=null,E.pop(),E.length>0?g=E[E.length-1]:g=null};function Tc(A,U,G,V){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)G=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)v.pushLight(A),A.castShadow&&v.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){V&&Xe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Fe);const fe=ee.update(A),ve=A.material;ve.visible&&g.push(A,fe,ve,G,Xe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const fe=ee.update(A),ve=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Xe.copy(A.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Xe.copy(fe.boundingSphere.center)),Xe.applyMatrix4(A.matrixWorld).applyMatrix4(Fe)),Array.isArray(ve)){const me=fe.groups;for(let Re=0,Le=me.length;Re<Le;Re++){const Ae=me[Re],$e=ve[Ae.materialIndex];$e&&$e.visible&&g.push(A,fe,$e,G,Xe.z,Ae)}}else ve.visible&&g.push(A,fe,ve,G,Xe.z,null)}}const ae=A.children;for(let fe=0,ve=ae.length;fe<ve;fe++)Tc(ae[fe],U,G,V)}function zh(A,U,G,V){const{opaque:F,transmissive:ae,transparent:fe}=A;v.setupLightsView(G),J===!0&&Se.setGlobalState(b.clippingPlanes,G),V&&ye.viewport(B.copy(V)),F.length>0&&gs(F,U,G),ae.length>0&&gs(ae,U,G),fe.length>0&&gs(fe,U,G),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Uh(A,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[V.id]===void 0&&(v.state.transmissionRenderTarget[V.id]=new Wr(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?eo:hi,minFilter:Nr,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const ae=v.state.transmissionRenderTarget[V.id],fe=V.viewport||B;ae.setSize(fe.z*b.transmissionResolutionScale,fe.w*b.transmissionResolutionScale);const ve=b.getRenderTarget(),me=b.getActiveCubeFace(),Re=b.getActiveMipmapLevel();b.setRenderTarget(ae),b.getClearColor(H),K=b.getClearAlpha(),K<1&&b.setClearColor(16777215,.5),b.clear(),Ve&&oe.render(G);const Le=b.toneMapping;b.toneMapping=ur;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),v.setupLightsView(V),J===!0&&Se.setGlobalState(b.clippingPlanes,V),gs(A,G,V),De.updateMultisampleRenderTarget(ae),De.updateRenderTargetMipmap(ae),qe.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let st=0,Ct=U.length;st<Ct;st++){const Tt=U[st],{object:ut,geometry:Te,material:yt,group:tt}=Tt;if(yt.side===Ai&&ut.layers.test(V.layers)){const vn=yt.side;yt.side=sn,yt.needsUpdate=!0,Fh(ut,G,V,Te,yt,tt),yt.side=vn,yt.needsUpdate=!0,$e=!0}}$e===!0&&(De.updateMultisampleRenderTarget(ae),De.updateRenderTargetMipmap(ae))}b.setRenderTarget(ve,me,Re),b.setClearColor(H,K),Ae!==void 0&&(V.viewport=Ae),b.toneMapping=Le}function gs(A,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ae=A.length;F<ae;F++){const fe=A[F],{object:ve,geometry:me,group:Re}=fe;let Le=fe.material;Le.allowOverride===!0&&V!==null&&(Le=V),ve.layers.test(G.layers)&&Fh(ve,U,G,me,Le,Re)}}function Fh(A,U,G,V,F,ae){A.onBeforeRender(b,U,G,V,F,ae),A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),F.onBeforeRender(b,U,G,V,A,ae),F.transparent===!0&&F.side===Ai&&F.forceSinglePass===!1?(F.side=sn,F.needsUpdate=!0,b.renderBufferDirect(G,U,V,F,A,ae),F.side=hr,F.needsUpdate=!0,b.renderBufferDirect(G,U,V,F,A,ae),F.side=Ai):b.renderBufferDirect(G,U,V,F,A,ae),A.onAfterRender(b,U,G,V,F,ae)}function vs(A,U,G){U.isScene!==!0&&(U=Bt);const V=be.get(A),F=v.state.lights,ae=v.state.shadowsArray,fe=F.state.version,ve=j.getParameters(A,F.state,ae,U,G),me=j.getProgramCacheKey(ve);let Re=V.programs;V.environment=A.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(A.isMeshStandardMaterial?S:R).get(A.envMap||V.environment),V.envMapRotation=V.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Re===void 0&&(A.addEventListener("dispose",Ie),Re=new Map,V.programs=Re);let Le=Re.get(me);if(Le!==void 0){if(V.currentProgram===Le&&V.lightsStateVersion===fe)return kh(A,ve),Le}else ve.uniforms=j.getUniforms(A),A.onBeforeCompile(ve,b),Le=j.acquireProgram(ve,me),Re.set(me,Le),V.uniforms=ve.uniforms;const Ae=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ae.clippingPlanes=Se.uniform),kh(A,ve),V.needsLights=dv(A),V.lightsStateVersion=fe,V.needsLights&&(Ae.ambientLightColor.value=F.state.ambient,Ae.lightProbe.value=F.state.probe,Ae.directionalLights.value=F.state.directional,Ae.directionalLightShadows.value=F.state.directionalShadow,Ae.spotLights.value=F.state.spot,Ae.spotLightShadows.value=F.state.spotShadow,Ae.rectAreaLights.value=F.state.rectArea,Ae.ltc_1.value=F.state.rectAreaLTC1,Ae.ltc_2.value=F.state.rectAreaLTC2,Ae.pointLights.value=F.state.point,Ae.pointLightShadows.value=F.state.pointShadow,Ae.hemisphereLights.value=F.state.hemi,Ae.directionalShadowMap.value=F.state.directionalShadowMap,Ae.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ae.spotShadowMap.value=F.state.spotShadowMap,Ae.spotLightMatrix.value=F.state.spotLightMatrix,Ae.spotLightMap.value=F.state.spotLightMap,Ae.pointShadowMap.value=F.state.pointShadowMap,Ae.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Le,V.uniformsList=null,Le}function Oh(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=Tl.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function kh(A,U){const G=be.get(A);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function cv(A,U,G,V,F){U.isScene!==!0&&(U=Bt),De.resetTextureUnits();const ae=U.fog,fe=V.isMeshStandardMaterial?U.environment:null,ve=M===null?b.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:$a,me=(V.isMeshStandardMaterial?S:R).get(V.envMap||fe),Re=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Le=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!G.morphAttributes.position,$e=!!G.morphAttributes.normal,st=!!G.morphAttributes.color;let Ct=ur;V.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Ct=b.toneMapping);const Tt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=Tt!==void 0?Tt.length:0,Te=be.get(V),yt=v.state.lights;if(J===!0&&(xe===!0||A!==z)){const Qt=A===z&&V.id===N;Se.setState(V,A,Qt)}let tt=!1;V.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==yt.state.version||Te.outputColorSpace!==ve||F.isBatchedMesh&&Te.batching===!1||!F.isBatchedMesh&&Te.batching===!0||F.isBatchedMesh&&Te.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Te.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Te.instancing===!1||!F.isInstancedMesh&&Te.instancing===!0||F.isSkinnedMesh&&Te.skinning===!1||!F.isSkinnedMesh&&Te.skinning===!0||F.isInstancedMesh&&Te.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Te.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Te.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Te.instancingMorph===!1&&F.morphTexture!==null||Te.envMap!==me||V.fog===!0&&Te.fog!==ae||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Se.numPlanes||Te.numIntersection!==Se.numIntersection)||Te.vertexAlphas!==Re||Te.vertexTangents!==Le||Te.morphTargets!==Ae||Te.morphNormals!==$e||Te.morphColors!==st||Te.toneMapping!==Ct||Te.morphTargetsCount!==ut)&&(tt=!0):(tt=!0,Te.__version=V.version);let vn=Te.currentProgram;tt===!0&&(vn=vs(V,U,F));let qr=!1,_n=!1,oo=!1;const St=vn.getUniforms(),dn=Te.uniforms;if(ye.useProgram(vn.program)&&(qr=!0,_n=!0,oo=!0),V.id!==N&&(N=V.id,_n=!0),qr||z!==A){ye.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),St.setValue(L,"projectionMatrix",A.projectionMatrix),St.setValue(L,"viewMatrix",A.matrixWorldInverse);const fn=St.map.cameraPosition;fn!==void 0&&fn.setValue(L,Ee.setFromMatrixPosition(A.matrixWorld)),dt.logarithmicDepthBuffer&&St.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&St.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,_n=!0,oo=!0)}if(F.isSkinnedMesh){St.setOptional(L,F,"bindMatrix"),St.setOptional(L,F,"bindMatrixInverse");const Qt=F.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),St.setValue(L,"boneTexture",Qt.boneTexture,De))}F.isBatchedMesh&&(St.setOptional(L,F,"batchingTexture"),St.setValue(L,"batchingTexture",F._matricesTexture,De),St.setOptional(L,F,"batchingIdTexture"),St.setValue(L,"batchingIdTexture",F._indirectTexture,De),St.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&St.setValue(L,"batchingColorTexture",F._colorsTexture,De));const Ln=G.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&Pe.update(F,G,vn),(_n||Te.receiveShadow!==F.receiveShadow)&&(Te.receiveShadow=F.receiveShadow,St.setValue(L,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(dn.envMap.value=me,dn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(dn.envMapIntensity.value=U.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=v2()),_n&&(St.setValue(L,"toneMappingExposure",b.toneMappingExposure),Te.needsLights&&uv(dn,oo),ae&&V.fog===!0&&Me.refreshFogUniforms(dn,ae),Me.refreshMaterialUniforms(dn,V,Y,W,v.state.transmissionRenderTarget[A.id]),Tl.upload(L,Oh(Te),dn,De)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Tl.upload(L,Oh(Te),dn,De),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&St.setValue(L,"center",F.center),St.setValue(L,"modelViewMatrix",F.modelViewMatrix),St.setValue(L,"normalMatrix",F.normalMatrix),St.setValue(L,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Qt=V.uniformsGroups;for(let fn=0,wc=Qt.length;fn<wc;fn++){const vr=Qt[fn];de.update(vr,vn),de.bind(vr,vn)}}return vn}function uv(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function dv(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(A,U,G){const V=be.get(A);V.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),be.get(A.texture).__webglTexture=U,be.get(A.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){const G=be.get(A);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const fv=L.createFramebuffer();this.setRenderTarget=function(A,U=0,G=0){M=A,P=U,C=G;let V=!0,F=null,ae=!1,fe=!1;if(A){const me=be.get(A);if(me.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(me.__webglFramebuffer===void 0)De.setupRenderTarget(A);else if(me.__hasExternalTextures)De.rebindTextures(A,be.get(A.texture).__webglTexture,be.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ae=A.depthTexture;if(me.__boundDepthTexture!==Ae){if(Ae!==null&&be.has(Ae)&&(A.width!==Ae.image.width||A.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");De.setupDepthRenderbuffer(A)}}const Re=A.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(fe=!0);const Le=be.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Le[U])?F=Le[U][G]:F=Le[U],ae=!0):A.samples>0&&De.useMultisampledRTT(A)===!1?F=be.get(A).__webglMultisampledFramebuffer:Array.isArray(Le)?F=Le[G]:F=Le,B.copy(A.viewport),$.copy(A.scissor),X=A.scissorTest}else B.copy(Be).multiplyScalar(Y).floor(),$.copy(Ue).multiplyScalar(Y).floor(),X=rt;if(G!==0&&(F=fv),ye.bindFramebuffer(L.FRAMEBUFFER,F)&&V&&ye.drawBuffers(A,F),ye.viewport(B),ye.scissor($),ye.setScissorTest(X),ae){const me=be.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,G)}else if(fe){const me=U;for(let Re=0;Re<A.textures.length;Re++){const Le=be.get(A.textures[Re]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Re,Le.__webglTexture,G,me)}}else if(A!==null&&G!==0){const me=be.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,me.__webglTexture,G)}N=-1},this.readRenderTargetPixels=function(A,U,G,V,F,ae,fe,ve=0){if(!(A&&A.isWebGLRenderTarget)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me){ye.bindFramebuffer(L.FRAMEBUFFER,me);try{const Re=A.textures[ve],Le=Re.format,Ae=Re.type;if(!dt.textureFormatReadable(Le)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dt.textureTypeReadable(Ae)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-V&&G>=0&&G<=A.height-F&&(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),L.readPixels(U,G,V,F,Ne.convert(Le),Ne.convert(Ae),ae))}finally{const Re=M!==null?be.get(M).__webglFramebuffer:null;ye.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(A,U,G,V,F,ae,fe,ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=be.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&fe!==void 0&&(me=me[fe]),me)if(U>=0&&U<=A.width-V&&G>=0&&G<=A.height-F){ye.bindFramebuffer(L.FRAMEBUFFER,me);const Re=A.textures[ve],Le=Re.format,Ae=Re.type;if(!dt.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dt.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,$e),L.bufferData(L.PIXEL_PACK_BUFFER,ae.byteLength,L.STREAM_READ),A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),L.readPixels(U,G,V,F,Ne.convert(Le),Ne.convert(Ae),0);const st=M!==null?be.get(M).__webglFramebuffer:null;ye.bindFramebuffer(L.FRAMEBUFFER,st);const Ct=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await LS(L,Ct,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,$e),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ae),L.deleteBuffer($e),L.deleteSync(Ct),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,G=0){const V=Math.pow(2,-G),F=Math.floor(A.image.width*V),ae=Math.floor(A.image.height*V),fe=U!==null?U.x:0,ve=U!==null?U.y:0;De.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,fe,ve,F,ae),ye.unbindTexture()};const hv=L.createFramebuffer(),pv=L.createFramebuffer();this.copyTextureToTexture=function(A,U,G=null,V=null,F=0,ae=null){ae===null&&(F!==0?(ss("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=F,F=0):ae=0);let fe,ve,me,Re,Le,Ae,$e,st,Ct;const Tt=A.isCompressedTexture?A.mipmaps[ae]:A.image;if(G!==null)fe=G.max.x-G.min.x,ve=G.max.y-G.min.y,me=G.isBox3?G.max.z-G.min.z:1,Re=G.min.x,Le=G.min.y,Ae=G.isBox3?G.min.z:0;else{const Ln=Math.pow(2,-F);fe=Math.floor(Tt.width*Ln),ve=Math.floor(Tt.height*Ln),A.isDataArrayTexture?me=Tt.depth:A.isData3DTexture?me=Math.floor(Tt.depth*Ln):me=1,Re=0,Le=0,Ae=0}V!==null?($e=V.x,st=V.y,Ct=V.z):($e=0,st=0,Ct=0);const ut=Ne.convert(U.format),Te=Ne.convert(U.type);let yt;U.isData3DTexture?(De.setTexture3D(U,0),yt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(De.setTexture2DArray(U,0),yt=L.TEXTURE_2D_ARRAY):(De.setTexture2D(U,0),yt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const tt=L.getParameter(L.UNPACK_ROW_LENGTH),vn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),qr=L.getParameter(L.UNPACK_SKIP_PIXELS),_n=L.getParameter(L.UNPACK_SKIP_ROWS),oo=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Tt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Re),L.pixelStorei(L.UNPACK_SKIP_ROWS,Le),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ae);const St=A.isDataArrayTexture||A.isData3DTexture,dn=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const Ln=be.get(A),Qt=be.get(U),fn=be.get(Ln.__renderTarget),wc=be.get(Qt.__renderTarget);ye.bindFramebuffer(L.READ_FRAMEBUFFER,fn.__webglFramebuffer),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,wc.__webglFramebuffer);for(let vr=0;vr<me;vr++)St&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.get(A).__webglTexture,F,Ae+vr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.get(U).__webglTexture,ae,Ct+vr)),L.blitFramebuffer(Re,Le,fe,ve,$e,st,fe,ve,L.DEPTH_BUFFER_BIT,L.NEAREST);ye.bindFramebuffer(L.READ_FRAMEBUFFER,null),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||A.isRenderTargetTexture||be.has(A)){const Ln=be.get(A),Qt=be.get(U);ye.bindFramebuffer(L.READ_FRAMEBUFFER,hv),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,pv);for(let fn=0;fn<me;fn++)St?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ln.__webglTexture,F,Ae+fn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ln.__webglTexture,F),dn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qt.__webglTexture,ae,Ct+fn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qt.__webglTexture,ae),F!==0?L.blitFramebuffer(Re,Le,fe,ve,$e,st,fe,ve,L.COLOR_BUFFER_BIT,L.NEAREST):dn?L.copyTexSubImage3D(yt,ae,$e,st,Ct+fn,Re,Le,fe,ve):L.copyTexSubImage2D(yt,ae,$e,st,Re,Le,fe,ve);ye.bindFramebuffer(L.READ_FRAMEBUFFER,null),ye.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else dn?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(yt,ae,$e,st,Ct,fe,ve,me,ut,Te,Tt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(yt,ae,$e,st,Ct,fe,ve,me,ut,Tt.data):L.texSubImage3D(yt,ae,$e,st,Ct,fe,ve,me,ut,Te,Tt):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ae,$e,st,fe,ve,ut,Te,Tt.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ae,$e,st,Tt.width,Tt.height,ut,Tt.data):L.texSubImage2D(L.TEXTURE_2D,ae,$e,st,fe,ve,ut,Te,Tt);L.pixelStorei(L.UNPACK_ROW_LENGTH,tt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,qr),L.pixelStorei(L.UNPACK_SKIP_ROWS,_n),L.pixelStorei(L.UNPACK_SKIP_IMAGES,oo),ae===0&&U.generateMipmaps&&L.generateMipmap(yt),ye.unbindTexture()},this.initRenderTarget=function(A){be.get(A).__webglFramebuffer===void 0&&De.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?De.setTextureCube(A,0):A.isData3DTexture?De.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?De.setTexture2DArray(A,0):De.setTexture2D(A,0),ye.unbindTexture()},this.resetState=function(){P=0,C=0,M=null,ye.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),n.unpackColorSpace=it._getUnpackColorSpace()}}class y2 extends kg{constructor(){super();const e=new ro;e.deleteAttribute("uv");const n=new xf({side:sn}),i=new xf,r=new jg(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const a=new Vt(e,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const o=new Gg(e,i,6),s=new Kt;s.position.set(-10.906,2.009,1.846),s.rotation.set(0,-.195,0),s.scale.set(2.328,7.905,4.651),s.updateMatrix(),o.setMatrixAt(0,s.matrix),s.position.set(-5.607,-.754,-.758),s.rotation.set(0,.994,0),s.scale.set(1.97,1.534,3.955),s.updateMatrix(),o.setMatrixAt(1,s.matrix),s.position.set(6.167,.857,7.803),s.rotation.set(0,.561,0),s.scale.set(3.927,6.285,3.687),s.updateMatrix(),o.setMatrixAt(2,s.matrix),s.position.set(-2.017,.018,6.124),s.rotation.set(0,.333,0),s.scale.set(2.002,4.566,2.064),s.updateMatrix(),o.setMatrixAt(3,s.matrix),s.position.set(2.291,-.756,-2.621),s.rotation.set(0,-.286,0),s.scale.set(1.546,1.552,1.496),s.updateMatrix(),o.setMatrixAt(4,s.matrix),s.position.set(-2.193,-.369,-5.547),s.rotation.set(0,.516,0),s.scale.set(3.875,3.487,2.986),s.updateMatrix(),o.setMatrixAt(5,s.matrix),this.add(o);const l=new Vt(e,da(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Vt(e,da(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const d=new Vt(e,da(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const h=new Vt(e,da(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const f=new Vt(e,da(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const p=new Vt(e,da(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(const n of e)n.dispose()}}function da(t){return new E1({color:0,emissive:16777215,emissiveIntensity:t})}var rn,Ir,Dr,Qi,za,Ua,Fa,zr,Ei,cs,Je,Zg,Qg,Jg,ev,tv,nv,yf,wl,iv,Sf,rv,Mf,Rl,Oa;class S2{constructor(e){Jt(this,Je);Jt(this,rn);Jt(this,Ir);Jt(this,Dr);Jt(this,Qi);Jt(this,za);Jt(this,Ua);Jt(this,Fa);Jt(this,zr);Jt(this,Ei);Jt(this,cs);Jt(this,Oa);this.size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0},this.render=Ke(this,Oa),this.onBeforeRender=n=>{},this.onAfterRender=n=>{},this.onAfterResize=n=>{},en(this,Dr,!1),en(this,Qi,!1),this.isDisposed=!1,en(this,zr,new L1),en(this,Ei,{elapsed:0,delta:0}),en(this,Oa,()=>{this.renderer.render(this.scene,this.camera)}),en(this,rn,{...e}),Mt(this,Je,Zg).call(this),Mt(this,Je,Qg).call(this),Mt(this,Je,Jg).call(this),this.resize(),Mt(this,Je,ev).call(this)}resize(){let e,n;Ke(this,rn).size instanceof Object?(e=Ke(this,rn).size.width,n=Ke(this,rn).size.height):Ke(this,rn).size==="parent"&&this.canvas.parentNode?(e=this.canvas.parentNode.offsetWidth,n=this.canvas.parentNode.offsetHeight):(e=window.innerWidth,n=window.innerHeight),this.size.width=e,this.size.height=n,this.size.ratio=e/n,Mt(this,Je,iv).call(this),Mt(this,Je,rv).call(this),this.onAfterResize(this.size)}updateWorldSize(){if(this.camera.isPerspectiveCamera){const e=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(e/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}get postprocessing(){return Ke(this,Ir)}set postprocessing(e){en(this,Ir,e),this.render=e.render.bind(e)}clear(){this.scene.traverse(e=>{e.isMesh&&typeof e.material=="object"&&e.material!==null&&(Object.keys(e.material).forEach(n=>{const i=e.material[n];i!==null&&typeof i=="object"&&typeof i.dispose=="function"&&i.dispose()}),e.material.dispose(),e.geometry.dispose())}),this.scene.clear()}dispose(){var e;Mt(this,Je,tv).call(this),Mt(this,Je,Rl).call(this),this.clear(),(e=Ke(this,Ir))==null||e.dispose(),this.renderer.dispose(),this.isDisposed=!0}}rn=new WeakMap,Ir=new WeakMap,Dr=new WeakMap,Qi=new WeakMap,za=new WeakMap,Ua=new WeakMap,Fa=new WeakMap,zr=new WeakMap,Ei=new WeakMap,cs=new WeakMap,Je=new WeakSet,Zg=function(){this.camera=new An,this.cameraFov=this.camera.fov},Qg=function(){this.scene=new kg},Jg=function(){Ke(this,rn).canvas?this.canvas=Ke(this,rn).canvas:Ke(this,rn).id?this.canvas=document.getElementById(Ke(this,rn).id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const e={canvas:this.canvas,powerPreference:"high-performance",...Ke(this,rn).rendererOptions??{}};this.renderer=new _2(e),this.renderer.outputColorSpace=En},ev=function(){Ke(this,rn).size instanceof Object||(window.addEventListener("resize",Mt(this,Je,wl).bind(this)),Ke(this,rn).size==="parent"&&this.canvas.parentNode&&(en(this,Ua,new ResizeObserver(Mt(this,Je,wl).bind(this))),Ke(this,Ua).observe(this.canvas.parentNode))),en(this,za,new IntersectionObserver(Mt(this,Je,nv).bind(this),{root:null,rootMargin:"0px",threshold:0})),Ke(this,za).observe(this.canvas),document.addEventListener("visibilitychange",Mt(this,Je,yf).bind(this))},tv=function(){var e,n;window.removeEventListener("resize",Mt(this,Je,wl).bind(this)),(e=Ke(this,Ua))==null||e.disconnect(),(n=Ke(this,za))==null||n.disconnect(),document.removeEventListener("visibilitychange",Mt(this,Je,yf).bind(this))},nv=function(e){en(this,Dr,e[0].isIntersecting),Ke(this,Dr)?Mt(this,Je,Mf).call(this):Mt(this,Je,Rl).call(this)},yf=function(){Ke(this,Dr)&&(document.hidden?Mt(this,Je,Rl).call(this):Mt(this,Je,Mf).call(this))},wl=function(){Ke(this,Fa)&&clearTimeout(Ke(this,Fa)),en(this,Fa,setTimeout(this.resize.bind(this),100))},iv=function(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?Mt(this,Je,Sf).call(this,this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?Mt(this,Je,Sf).call(this,this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()},Sf=function(e){const n=Math.tan(mf.degToRad(this.cameraFov/2))/(this.camera.aspect/e);this.camera.fov=2*mf.radToDeg(Math.atan(n))},rv=function(){var n;this.renderer.setSize(this.size.width,this.size.height),(n=Ke(this,Ir))==null||n.setSize(this.size.width,this.size.height);let e=window.devicePixelRatio;this.maxPixelRatio&&e>this.maxPixelRatio?e=this.maxPixelRatio:this.minPixelRatio&&e<this.minPixelRatio&&(e=this.minPixelRatio),this.renderer.setPixelRatio(e),this.size.pixelRatio=e},Mf=function(){if(Ke(this,Qi))return;const e=()=>{en(this,cs,requestAnimationFrame(e)),Ke(this,Ei).delta=Ke(this,zr).getDelta(),Ke(this,Ei).elapsed+=Ke(this,Ei).delta,this.onBeforeRender(Ke(this,Ei)),Ke(this,Oa).call(this),this.onAfterRender(Ke(this,Ei))};en(this,Qi,!0),Ke(this,zr).start(),e()},Rl=function(){Ke(this,Qi)&&(cancelAnimationFrame(Ke(this,cs)),en(this,Qi,!1),Ke(this,zr).stop())},Oa=new WeakMap;const ci=new Map,ti=new We;let Nu=!1;function M2(t){const e={position:new We,nPosition:new We,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...t};return function(n,i){ci.has(n)||(ci.set(n,i),Nu||(document.body.addEventListener("pointermove",Jm),document.body.addEventListener("pointerleave",t0),document.body.addEventListener("click",e0),document.body.addEventListener("touchstart",n0,{passive:!1}),document.body.addEventListener("touchmove",i0,{passive:!1}),document.body.addEventListener("touchend",rl,{passive:!1}),document.body.addEventListener("touchcancel",rl,{passive:!1}),Nu=!0))}(t.domElement,e),e.dispose=()=>{const n=t.domElement;ci.delete(n),ci.size===0&&(document.body.removeEventListener("pointermove",Jm),document.body.removeEventListener("pointerleave",t0),document.body.removeEventListener("click",e0),document.body.removeEventListener("touchstart",n0),document.body.removeEventListener("touchmove",i0),document.body.removeEventListener("touchend",rl),document.body.removeEventListener("touchcancel",rl),Nu=!1)},e}function Jm(t){ti.x=t.clientX,ti.y=t.clientY,E2()}function E2(){for(const[t,e]of ci){const n=t.getBoundingClientRect();Cc(n)?(bc(e,n),e.hover||(e.hover=!0,e.onEnter(e)),e.onMove(e)):e.hover&&!e.touching&&(e.hover=!1,e.onLeave(e))}}function e0(t){ti.x=t.clientX,ti.y=t.clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();bc(n,i),Cc(i)&&n.onClick(n)}}function t0(){for(const t of ci.values())t.hover&&(t.hover=!1,t.onLeave(t))}function n0(t){if(t.touches.length>0){t.preventDefault(),ti.x=t.touches[0].clientX,ti.y=t.touches[0].clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();Cc(i)&&(n.touching=!0,bc(n,i),n.hover||(n.hover=!0,n.onEnter(n)),n.onMove(n))}}}function i0(t){if(t.touches.length>0){t.preventDefault(),ti.x=t.touches[0].clientX,ti.y=t.touches[0].clientY;for(const[e,n]of ci){const i=e.getBoundingClientRect();bc(n,i),Cc(i)?(n.hover||(n.hover=!0,n.touching=!0,n.onEnter(n)),n.onMove(n)):n.hover&&n.touching&&n.onMove(n)}}}function rl(){for(const[,t]of ci)t.touching&&(t.touching=!1,t.hover&&(t.hover=!1,t.onLeave(t)))}function bc(t,e){const{position:n,nPosition:i}=t;n.x=ti.x-e.left,n.y=ti.y-e.top,i.x=n.x/e.width*2-1,i.y=-n.y/e.height*2+1}function Cc(t){const{x:e,y:n}=ti,{left:i,top:r,width:a,height:o}=t;return e>=i&&e<=i+a&&n>=r&&n<=r+o}const{randFloat:Iu}=mf,Du=new O,Ze=new O,al=new O,A2=new O,nt=new O,ol=new O,fa=new O,ji=new O,sl=new O,r0=new O;var ic,av;class b2{constructor(e){Jt(this,ic);this.center=new O,this.config=e,this.positionData=new Float32Array(3*e.count).fill(0),this.velocityData=new Float32Array(3*e.count).fill(0),this.sizeData=new Float32Array(e.count).fill(1),Mt(this,ic,av).call(this),this.setSizes(),this.setInitialVelocities()}setSizes(){const{config:e,sizeData:n}=this;n[0]=e.size0;for(let i=1;i<e.count;i++)n[i]=Iu(e.minSize,e.maxSize)}setInitialVelocities(){const{velocityData:e,config:n}=this;for(let i=0;i<n.count;i++){const r=3*i;e[r]=Iu(-.2,.2),e[r+1]=Iu(-.2,.2),e[r+2]=0}}update(e){const{config:n,center:i,positionData:r,sizeData:a,velocityData:o}=this;let s=0;n.controlSphere0&&(s=1,Du.fromArray(r,0),Du.lerp(i,.1).toArray(r,0),A2.set(0,0,0).toArray(o,0));for(let l=s;l<n.count;l++){const c=3*l;if(Ze.fromArray(r,c),nt.fromArray(o,c),n.gravity===0){const h=.04+.02*a[l];nt.x+=h*Math.sin((Ze.y+e.elapsed)*.15),nt.y+=h*Math.cos((Ze.x+e.elapsed)*.15)}else nt.y-=e.delta*n.gravity*a[l];nt.multiplyScalar(n.friction),nt.clampLength(0,n.maxVelocity),Ze.add(nt),Ze.toArray(r,c),nt.toArray(o,c)}for(let l=s;l<n.count;l++){const c=3*l;Ze.fromArray(r,c),nt.fromArray(o,c);const d=a[l];for(let f=l+1;f<n.count;f++){const p=3*f;al.fromArray(r,p),ol.fromArray(o,p);const _=a[f];fa.copy(al).sub(Ze);const y=fa.length(),x=d+_;if(y<x){const u=x-y;ji.copy(fa).normalize().multiplyScalar(.5*u),sl.copy(ji).multiplyScalar(Math.max(nt.length(),1)),r0.copy(ji).multiplyScalar(Math.max(ol.length(),1)),Ze.sub(ji),nt.sub(sl),Ze.toArray(r,c),nt.toArray(o,c),al.add(ji),ol.add(r0),al.toArray(r,p),ol.toArray(o,p)}}if(n.controlSphere0){fa.copy(Du).sub(Ze);const f=fa.length(),p=d+a[0];if(f<p){const _=p-f;ji.copy(fa.normalize()).multiplyScalar(_),sl.copy(ji).multiplyScalar(Math.max(nt.length(),2)),Ze.sub(ji),nt.sub(sl)}}Math.abs(Ze.x)+d>n.maxX&&(Ze.x=Math.sign(Ze.x)*(n.maxX-d),nt.x=-nt.x*n.wallBounce),n.gravity===0?Math.abs(Ze.y)+d>n.maxY&&(Ze.y=Math.sign(Ze.y)*(n.maxY-d),nt.y=-nt.y*n.wallBounce):Ze.y-d<-n.maxY&&(Ze.y=-n.maxY+d,nt.y=-nt.y*n.wallBounce);const h=Math.max(n.maxZ,n.maxSize);if(Math.abs(Ze.z)+d>h&&(Ze.z=Math.sign(Ze.z)*(n.maxZ-d),nt.z=-nt.z*n.wallBounce),Ze.toArray(r,c),nt.toArray(o,c),Array.isArray(n.obstacles))for(const f of n.obstacles){const p=Ze.x>f.minX+d&&Ze.x<f.maxX-d,_=Ze.y>f.minY+d&&Ze.y<f.maxY-d;if(p&&_){const y=Math.abs(Ze.x-(f.minX+d)),x=Math.abs(f.maxX-d-Ze.x),u=Math.abs(Ze.y-(f.minY+d)),g=Math.abs(f.maxY-d-Ze.y),v=Math.min(y,x,u,g);v===y?(Ze.x=f.minX+d,nt.x=Math.abs(nt.x)*n.wallBounce):v===x?(Ze.x=f.maxX-d,nt.x=-Math.abs(nt.x)*n.wallBounce):v===u?(Ze.y=f.minY+d,nt.y=Math.abs(nt.y)*n.wallBounce):(Ze.y=f.maxY-d,nt.y=-Math.abs(nt.y)*n.wallBounce),Ze.toArray(r,c),nt.toArray(o,c)}}}}}ic=new WeakSet,av=function(){const{config:e,positionData:n}=this;for(let i=0;i<e.count;i++){const r=3*i,a=(Math.random()*2-1)*(e.maxX*.95),o=(Math.random()*2-1)*(e.maxY*.95),s=(Math.random()*2-1)*(Math.max(e.maxZ,e.maxSize)*.3);n[r]=a,n[r+1]=o,n[r+2]=s}};class C2 extends M1{constructor(e){super(e),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=n=>{Object.assign(n.uniforms,this.uniforms),n.fragmentShader=`
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
      `);const i=Oe.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);n.fragmentShader=n.fragmentShader.replace("#include <lights_fragment_begin>",i),this.onBeforeCompile2&&this.onBeforeCompile2(n)}}}const T2={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},ha=new Kt;var rc,ov;class w2 extends Gg{constructor(n,i={}){const r={...T2,...i},a=new y2,o=new vf(n,.04).fromScene(a).texture,s=new Nh,l=new C2({envMap:o,...r.materialParams});l.envMapRotation.x=-Math.PI/2;super(s,l,r.count);Jt(this,rc);this.config=r,this.physics=new b2(r),Mt(this,rc,ov).call(this),this.setColors(r.colors)}setColors(n){if(Array.isArray(n)&&n.length>1){const i=function(r){let a,o;function s(l){a=l,o=[],a.forEach(c=>{o.push(new Ge(c))})}return s(r),{setColors:s,getColorAt:function(l,c=new Ge){const d=Math.max(0,Math.min(1,l))*(a.length-1),h=Math.floor(d),f=o[h];if(h>=a.length-1)return f.clone();const p=d-h,_=o[h+1];return c.r=f.r+p*(_.r-f.r),c.g=f.g+p*(_.g-f.g),c.b=f.b+p*(_.b-f.b),c}}}(n);for(let r=0;r<this.count;r++)this.setColorAt(r,i.getColorAt(r/this.count)),r===0&&this.light.color.copy(i.getColorAt(r/this.count));this.instanceColor.needsUpdate=!0}}update(n){this.physics.update(n);for(let i=0;i<this.count;i++)ha.position.fromArray(this.physics.positionData,3*i),i===0&&this.config.followCursor===!1?ha.scale.setScalar(0):ha.scale.setScalar(this.physics.sizeData[i]),ha.updateMatrix(),this.setMatrixAt(i,ha.matrix),i===0&&this.light.position.copy(ha.position);this.instanceMatrix.needsUpdate=!0}}rc=new WeakSet,ov=function(){this.ambientLight=new R1(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new jg(this.config.colors[0],this.config.lightIntensity),this.add(this.light)};function R2(t,e={}){const n=new S2({canvas:t,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let i;n.renderer.toneMapping=yg,n.camera.position.set(0,0,20),n.camera.lookAt(0,0,0),n.cameraMaxAspect=1.5,n.resize(),c(e);const r=new N1,a=new qi(new O(0,0,1),0),o=new O;let s=!1;t.style.touchAction="none",t.style.userSelect="none",t.style.webkitUserSelect="none";let l=null;e.followCursor&&(l=M2({domElement:t,onMove(){r.setFromCamera(l.nPosition,n.camera),n.camera.getWorldDirection(a.normal),r.ray.intersectPlane(a,o),i.physics.center.copy(o),i.config.controlSphere0=!0},onLeave(){i.config.controlSphere0=!1}}));function c(d){i&&(n.clear(),n.scene.remove(i));const{wWidth:h,wHeight:f}=n.size,p={maxX:h/2,maxY:f,...d};i=new w2(n.renderer,p),n.scene.add(i)}return n.onBeforeRender=d=>{s||i.update(d)},n.onAfterResize=d=>{i.config.maxX=d.wWidth,i.config.maxY=d.wHeight*2},{three:n,get spheres(){return i},setCount(d){c({...i.config,count:d})},togglePause(){s=!s},dispose(){l&&typeof l.dispose=="function"&&l.dispose(),n.dispose()}}}const P2=({className:t="",followCursor:e=!0,obstacleSelectors:n=[],...i})=>{const r=Qe.useRef(null),a=Qe.useRef(null),o=Qe.useRef([]),s=()=>{var x,u;const l=r.current,c=a.current;if(!l||!c)return;if(!n||n.length===0){o.current=[],(x=c.spheres)!=null&&x.config&&(c.spheres.config.obstacles=[]);return}const d=l.getBoundingClientRect(),{maxX:h,maxY:f}=c.spheres.config,p=2*h/d.width,_=2*f/d.height,y=[];n.forEach(g=>{document.querySelectorAll(g).forEach(v=>{const E=v.getBoundingClientRect(),w=Math.max(0,E.left-d.left),b=Math.min(d.width,E.right-d.left),T=Math.max(0,E.top-d.top),P=Math.min(d.height,E.bottom-d.top);if(b>w&&P>T){const C=(w-d.width/2)*p,M=(b-d.width/2)*p,N=d.height/2-T,z=d.height/2-P,B=N*_,$=z*_;y.push({minX:C,maxX:M,minY:$,maxY:B})}})}),o.current=y,(u=c.spheres)!=null&&u.config&&(c.spheres.config.obstacles=y)};return Qe.useEffect(()=>{const l=r.current;if(!l)return;a.current=R2(l,{followCursor:e,...i}),s();const c=new ResizeObserver(()=>s());return c.observe(document.body),()=>{a.current&&a.current.dispose(),c.disconnect()}},[]),m.jsx("canvas",{className:t,ref:r,style:{width:"100%",height:"100%",pointerEvents:"none"}})};function sv({onOpenChat:t}){const e=Qe.useRef(null);return Qe.useEffect(()=>{if(!document.querySelector('link[data-calcss="gcal-scheduling"]')){const i=document.createElement("link");i.rel="stylesheet",i.href="https://calendar.google.com/calendar/scheduling-button-script.css",i.setAttribute("data-calcss","gcal-scheduling"),document.head.appendChild(i)}function n(){var i,r;(r=(i=window.calendar)==null?void 0:i.schedulingButton)!=null&&r.load&&e.current&&window.calendar.schedulingButton.load({url:"https://calendar.google.com/calendar/appointments/schedules/AcZssZ0E8CK2CQprdzregpJedXs7o3oamfFtB3OTBbuvS7Z6Zi_P5YxA7VB-pjZzlqGu-R0cHLtCRXFU?gv=true",color:"#039BE5",label:"Fissa un appuntamento",target:e.current})}if(window.calendar)n();else{const i=document.createElement("script");i.src="https://calendar.google.com/calendar/scheduling-button-script.js",i.async=!0,i.onload=n,document.body.appendChild(i)}},[]),m.jsxs("div",{className:"flex flex-col gap-12 md:gap-16",children:[m.jsxs("section",{className:"relative flex flex-col items-center text-center gap-6 pt-16 md:pt-24 min-h-[520px] md:min-h-[620px]",children:[m.jsx("div",{className:"absolute inset-x-0 -top-2 md:top-0 flex justify-center pointer-events-none select-none z-0",children:m.jsxs("svg",{className:"w-[90%] max-w-6xl h-24 md:h-32",viewBox:"0 0 1120 260",fill:"none",xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",children:[m.jsxs("defs",{children:[m.jsxs("linearGradient",{id:"arcGrad",x1:"0",y1:"0",x2:"1120",y2:"0",gradientUnits:"userSpaceOnUse",children:[m.jsx("stop",{offset:"0%",stopColor:"rgba(16,185,129,0.55)"}),m.jsx("stop",{offset:"50%",stopColor:"rgba(58,125,255,0.9)"}),m.jsx("stop",{offset:"100%",stopColor:"rgba(16,185,129,0.55)"})]}),m.jsxs("linearGradient",{id:"fadeGrad",x1:"0",y1:"0",x2:"1",y2:"0",children:[m.jsx("stop",{offset:"0",stopColor:"white",stopOpacity:"0"}),m.jsx("stop",{offset:"0.15",stopColor:"white",stopOpacity:"0.95"}),m.jsx("stop",{offset:"0.85",stopColor:"white",stopOpacity:"0.95"}),m.jsx("stop",{offset:"1",stopColor:"white",stopOpacity:"0"})]}),m.jsx("mask",{id:"arcMask",children:m.jsx("rect",{x:"0",y:"0",width:"1120",height:"260",fill:"url(#fadeGrad)"})}),m.jsxs("filter",{id:"arcGlow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[m.jsx("feGaussianBlur",{stdDeviation:"6",result:"blur"}),m.jsxs("feMerge",{children:[m.jsx("feMergeNode",{in:"blur"}),m.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),m.jsx("g",{mask:"url(#arcMask)",filter:"url(#arcGlow)",children:[184,196,208,220,232,244,256].map((n,i)=>m.jsxs("g",{children:[m.jsxs("path",{d:`M560 40 Q 840 40 1080 ${n}`,stroke:"url(#arcGrad)",strokeWidth:i===3?3:i%2===0?2:1.6,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke",pathLength:"500",strokeDasharray:"0 500",opacity:"0",children:[m.jsx("animate",{attributeName:"stroke-dasharray",values:"0 500;500 0;0 500",keyTimes:"0;0.5;1",dur:"12s",repeatCount:"indefinite"}),m.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.08;0.92;1",dur:"12s",repeatCount:"indefinite"})]}),m.jsxs("path",{d:`M560 40 Q 280 40 40 ${n}`,stroke:"url(#arcGrad)",strokeWidth:i===3?3:i%2===0?2:1.6,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke",pathLength:"500",strokeDasharray:"0 500",opacity:"0",children:[m.jsx("animate",{attributeName:"stroke-dasharray",values:"0 500;500 0;0 500",keyTimes:"0;0.5;1",dur:"12s",repeatCount:"indefinite"}),m.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.08;0.92;1",dur:"12s",repeatCount:"indefinite"})]})]},n))})]})}),m.jsxs("div",{className:"relative z-30 flex flex-col gap-4 items-center","data-ballpit-obstacle":!0,children:[m.jsx("h1",{className:"text-cream text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tighter max-w-3xl",children:"Soluzioni agentiche per imprese italiane"}),m.jsx("p",{className:"text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl",children:"CSD Station Italia progetta e integra agenti AI e workflow intelligenti che automatizzano processi, riducono tempi e sbloccano nuova crescita."})]}),m.jsx("div",{ref:e,className:"h-12"})]}),m.jsxs("section",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsxs("h3",{className:"text-xl font-bold font-heading",children:[m.jsx("span",{className:"title-azure",children:"Agenti"})," ",m.jsx("span",{className:"text-cream",children:"su misura"})]}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Assistenti verticali che comprendono il tuo dominio e si connettono ai tuoi sistemi."})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsxs("h3",{className:"text-xl font-bold font-heading",children:[m.jsx("span",{className:"title-azure",children:"Workflow"})," ",m.jsx("span",{className:"text-cream",children:"no-backend"})]}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Backend delegato a workflow agentici su OpenAI, senza server da mantenere."})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsxs("h3",{className:"text-xl font-bold font-heading",children:[m.jsx("span",{className:"title-azure",children:"Time–to–value"})," ",m.jsx("span",{className:"text-cream",children:"rapido"})]}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Dal prototipo al valore in produzione in settimane, non mesi."})]})]}),m.jsxs("section",{className:"glass-panel rounded-lg p-6",children:[m.jsx("span",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs",children:"Demo"}),m.jsx("p",{className:"text-gray-300 mt-3",children:"Prova il widget chat in basso a destra: parla con il nostro assistente."}),m.jsxs("ul",{className:"list-disc list-inside text-gray-400 mt-2 space-y-1",children:[m.jsx("li",{children:"Richiedi una valutazione iniziale"}),m.jsx("li",{children:"Chiedi una demo di automazione"}),m.jsx("li",{children:"Descrivi un processo interno da automatizzare"})]})]})]})}const L2=`Catalogo Nominale dei Workflow per Settore, Categoria e Livello di Digitalizzazione
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




`,ll=new Set(["No-IA","Generativo","Conversazionale","Agentico","Predittiva","Altro"]),cl=new Set(["L0","L1","L2"]);function a0(t){const e=t.replace(/\s*\(Cont\.\)\s*$/i,"").trim();return/^Agenzial/i.test(e)?"Agenzie Immobiliari":e}const ul=(()=>{const t=L2.split(/\r?\n/).map(i=>i.trim()).filter(Boolean),e=[];let n="";for(let i=0;i<t.length;i++){const r=t[i];if(cl.has(r)||ll.has(r))continue;const a=t[i+1],o=t[i+2],s=t[i+3];if(a&&o&&s&&ll.has(o)&&cl.has(s)){n=a0(r),e.push({sector:n,name:a,category:o,level:s}),i+=3;continue}if(n&&a&&ll.has(o)&&cl.has(s)){e.push({sector:n,name:r,category:o,level:s}),i+=3;continue}if(!/^Catalogo|Settore$|Macro Categoria$|Livello Digitalizzazione$/i.test(r)&&!ll.has(r)&&!cl.has(r)&&!/:/.test(r)){n=a0(r);continue}}return e})();function N2({onOpenWorkflow:t}){const[e,n]=Qe.useState(""),[i,r]=Qe.useState("Tutti"),[a,o]=Qe.useState("Tutte"),[s,l]=Qe.useState("Tutti"),c=Qe.useMemo(()=>["Tutti",...Array.from(new Set(ul.map(p=>p.sector))).sort()],[]),d=Qe.useMemo(()=>["Tutte",...Array.from(new Set(ul.map(p=>p.category))).sort()],[]),h=Qe.useMemo(()=>["Tutti","L0","L1","L2"],[]),f=Qe.useMemo(()=>ul.filter(p=>!(i!=="Tutti"&&p.sector!==i||a!=="Tutte"&&p.category!==a||s!=="Tutti"&&p.level!==s||e&&!`${p.name} ${p.sector} ${p.category} ${p.level}`.toLowerCase().includes(e.toLowerCase()))),[e,i,a,s]);return m.jsxs("div",{className:"flex flex-col gap-10",children:[m.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"Servizi"}),m.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Assistenti operativi"}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Agenti per supporto clienti, back-office, HR e vendite, collegati ai tuoi dati."})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Automazioni end-to-end"}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Workflow che orchestrano task, strumenti e API senza gestire un backend proprio."})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6",children:[m.jsx("h3",{className:"title-azure text-xl font-bold font-heading",children:"Integrazioni e sicurezza"}),m.jsx("p",{className:"text-gray-300 mt-2",children:"Connettori sicuri verso CRM, ERP, knowledge base e storage documentale."})]})]}),m.jsxs("section",{className:"glass-panel rounded-lg p-6 md:p-8",children:[m.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-4",children:[m.jsx("h3",{className:"title-azure text-2xl font-bold font-heading",children:"I nostri workflow"}),m.jsxs("div",{className:"text-sm text-gray-400",children:["Totale: ",f.length," / ",ul.length]})]}),m.jsxs("div",{className:"mt-4 grid grid-cols-1 md:grid-cols-4 gap-3",children:[m.jsx("input",{value:e,onChange:p=>n(p.target.value),placeholder:"Cerca per nome, settore o categoria…",className:"rounded-lg bg-white/5 border-white/10 px-3 py-2"}),m.jsx("select",{value:i,onChange:p=>r(p.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:c.map(p=>m.jsx("option",{value:p,children:p},p))}),m.jsx("select",{value:a,onChange:p=>o(p.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:d.map(p=>m.jsx("option",{value:p,children:p},p))}),m.jsx("select",{value:s,onChange:p=>l(p.target.value),className:"rounded-lg bg-white/5 border-white/10 px-3 py-2",children:h.map(p=>m.jsx("option",{value:p,children:p},p))})]}),m.jsxs("div",{className:"mt-5",children:[m.jsx("div",{className:"rounded-xl bg-white/5 border border-white/10 p-3",children:m.jsx("div",{className:"h-[380px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-3",children:f.map((p,_)=>m.jsxs("button",{onClick:()=>t==null?void 0:t(p),className:"text-left rounded-lg bg-white/5 border border-white/10 p-4 flex flex-col gap-2 hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-primary/40",children:[m.jsxs("div",{className:"flex items-center justify-between gap-2",children:[m.jsx("div",{className:"text-cream font-semibold",children:p.name}),m.jsx("span",{className:"px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary",children:p.level})]}),m.jsx("div",{className:"text-sm text-gray-400",children:p.sector}),m.jsx("div",{className:"flex flex-wrap gap-2",children:m.jsx("span",{className:"px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold",children:p.category})})]},_))})}),m.jsxs("div",{className:"mt-3 flex items-center gap-3 text-xs text-gray-400",children:[m.jsx("button",{className:"px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10",onClick:()=>{n(""),r("Tutti"),o("Tutte"),l("Tutti")},children:"Reset filtri"}),m.jsxs("div",{className:"flex items-center gap-2",children:[m.jsxs("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:["Settori: ",c.length-1]}),m.jsxs("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:["Categorie: ",d.length-1]}),m.jsx("span",{className:"px-2 py-0.5 rounded-full bg-white/5",children:"Livelli: 3"})]})]})]})]})]})}function I2({onOpenChat:t}){return m.jsxs("div",{className:"flex flex-col gap-12 md:gap-16",children:[m.jsxs("section",{className:"flex flex-col items-center text-center gap-6",children:[m.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[m.jsx("h1",{className:"text-cream text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tighter max-w-3xl",children:"Un ponte tra automazione e persone."}),m.jsx("p",{className:"text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl",children:"Sfruttiamo l'intelligenza artificiale per creare workflow personalizzati che potenziano il tuo business, con un approccio umano e consulenziale."})]}),m.jsx("button",{onClick:()=>t==null?void 0:t(),className:"h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-bold tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Scopri le nostre soluzioni"})]}),m.jsx("section",{className:"px-0",children:m.jsx("div",{className:"glass-panel rounded-lg p-6 md:p-8",children:m.jsx("p",{className:"text-gray-200 text-lg md:text-xl leading-relaxed text-center",children:"CSD Station Italia nasce per colmare il divario tra le complesse possibilità dell'automazione AI e le reali esigenze operative delle aziende. Consulenza, follow-up continuo e personalizzazione."})})}),m.jsxs("section",{className:"flex flex-col gap-8",children:[m.jsxs("div",{className:"text-center",children:[m.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"La Nostra Storia"}),m.jsx("p",{className:"text-gray-400 mt-2 font-mono text-sm",children:"Dal legame con la Florida alla leadership in Italia."})]}),m.jsxs("div",{className:"grid grid-cols-[auto_1fr] gap-x-4 max-w-xl mx-auto px-2",children:[m.jsxs("div",{className:"flex flex-col items-center gap-1 pt-2",children:[m.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"🌎"}),m.jsx("div",{className:"w-[2px] bg-white/10 grow"})]}),m.jsxs("div",{className:"py-2",children:[m.jsx("p",{className:"text-cream text-lg font-heading",children:"Le Origini in Florida"}),m.jsx("p",{className:"text-gray-400",children:"Sede madre e basi dell'expertise nell'automazione."}),m.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"2025"})]}),m.jsxs("div",{className:"flex flex-col items-center gap-1",children:[m.jsx("div",{className:"w-[2px] bg-white/10 h-2"}),m.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"🚩"}),m.jsx("div",{className:"w-[2px] bg-white/10 grow"})]}),m.jsxs("div",{className:"py-2",children:[m.jsx("p",{className:"text-cream text-lg font-heading",children:"Fondazione Sede Italiana"}),m.jsx("p",{className:"text-gray-400",children:"Soluzioni adattate alle specificità del mercato locale."}),m.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"2026"})]}),m.jsxs("div",{className:"flex flex-col items-center gap-1 pb-2",children:[m.jsx("div",{className:"w-[2px] bg-white/10 h-2"}),m.jsx("div",{className:"text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30",children:"📈"})]}),m.jsxs("div",{className:"py-2",children:[m.jsx("p",{className:"text-cream text-lg font-heading",children:"Il Nostro Approccio Oggi"}),m.jsx("p",{className:"text-gray-400",children:"Crescita continua e servizi consulenziali centrati sulle persone."}),m.jsx("p",{className:"text-accent text-sm font-mono mt-1",children:"Presente"})]})]})]})]})}function D2({onOpenChat:t,onNavigate:e}){return m.jsxs("div",{className:"flex flex-col gap-6",children:[m.jsx("h2",{className:"title-azure text-3xl font-bold font-heading tracking-tight",children:"Contattaci"}),m.jsx("p",{className:"text-gray-400 max-w-2xl",children:"Scrivici direttamente: apri la tua casella di posta con il destinatario precompilato."}),m.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl",children:[m.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[m.jsxs("div",{children:[m.jsx("p",{className:"text-gray-300",children:"Email aziendale"}),m.jsx("p",{className:"text-cream font-semibold",children:"csd.station.ai@gmail.com"})]}),m.jsx("a",{href:"mailto:csd.station.ai@gmail.com?subject=Richiesta%20informazioni%20-%20CSD%20Station%20Italia",className:"mt-4 inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Apri email"})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[m.jsxs("div",{children:[m.jsx("p",{className:"text-gray-300",children:"Domande frequenti"}),m.jsx("p",{className:"text-cream font-semibold",children:"FAQ"})]}),m.jsxs("div",{className:"mt-4 flex flex-col items-center",children:[m.jsx("button",{type:"button",className:"inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed",disabled:!0,children:"Apri FAQ"}),m.jsx("span",{className:"mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300",children:"Coming Soon"})]})]}),m.jsxs("div",{className:"glass-panel rounded-lg p-6 flex flex-col justify-between",children:[m.jsxs("div",{children:[m.jsx("p",{className:"text-gray-300",children:"Assistenza via AI"}),m.jsx("p",{className:"text-cream font-semibold",children:"Servizio Clienti IA"})]}),m.jsxs("div",{className:"mt-4 flex flex-col items-center",children:[m.jsx("button",{type:"button",className:"inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed",disabled:!0,children:"Chiama Servizio Clienti"}),m.jsx("span",{className:"mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300",children:"Coming Soon"})]})]})]})]})}function z2({open:t=!1,onClose:e,onOpen:n}){const[i,r]=Qe.useState([{role:"assistant",content:"Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?"}]),[a,o]=Qe.useState(""),[s,l]=Qe.useState(!1),c=Qe.useRef(null),[d,h]=Qe.useState({}),f=(()=>{const x="https://csd-station-api-346681848489.europe-west8.run.app";return typeof window<"u"&&/\.github\.io$/.test(window.location.hostname),x})();function p(){r([{role:"assistant",content:"Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?"}])}function _(x){const u=String(x||"").split(`
`),g=[];let v=0;for(;v<u.length;){const E=u[v].trimEnd(),w=/^\s*[-*•]\s+/.test(E),b=/^([^:]{1,64}):\s+.+$/.test(E);if(w||b){const T=[];for(;v<u.length;){const P=u[v].trimEnd();if(/^\s*[-*•]\s+/.test(P)){T.push(P.replace(/^\s*[-*•]\s+/,"").trim()),v++;continue}const C=P.match(/^([^:]{1,64}):\s+(.+)$/);if(C){T.push(`${C[1].trim()}: ${C[2].trim()}`),v++;continue}break}g.push(m.jsx("ul",{className:"list-disc marker:text-primary pl-5 space-y-1",children:T.map((P,C)=>m.jsx("li",{className:"text-gray-200",children:P},C))},`ul-${v}`));continue}if(E.trim()===""){g.push(m.jsx("div",{className:"h-2"},`sp-${v}`)),v++;continue}g.push(m.jsx("p",{className:"text-gray-200 whitespace-pre-wrap",children:E},`p-${v}`)),v++}return m.jsx("div",{className:"space-y-2",children:g})}async function y(){var u;if(!a.trim())return;const x={role:"user",content:a.trim()};r(g=>[...g,x]),o(""),l(!0);try{const g=i.length+1;r(T=>[...T,{role:"assistant",content:"",reasoning:""}]);const v=await fetch((f||"")+"/chat-stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:x.content,history:i.map(T=>({role:T.role,content:T.content})).slice(-12)})});if(!v.ok||!v.body){const P=await(await fetch((f||"")+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:x.content,history:i.map(N=>({role:N.role,content:N.content})).slice(-12)})})).json(),C=(P==null?void 0:P.reply)??"Si è verificato un errore, riprova più tardi.",M=typeof(P==null?void 0:P.reasoning)=="string"?P.reasoning:"";r(N=>{const z=[...N];return z[g]={role:"assistant",content:C,reasoning:M},z});return}const E=v.body.getReader(),w=new TextDecoder;let b="";for(;;){const{value:T,done:P}=await E.read();if(P)break;b+=w.decode(T,{stream:!0});const C=b.split(`
`);b=C.pop()||"";for(const M of C){if(!M.startsWith("data:"))continue;const N=M.slice(5).trim();if(N!=="[DONE]")try{const z=JSON.parse(N);let B="",$="";if((z==null?void 0:z.type)==="response.output_text.delta"&&typeof(z==null?void 0:z.delta)=="string")B=z.delta;else if((z==null?void 0:z.type)==="response.reasoning.delta"&&typeof(z==null?void 0:z.delta)=="string")$=z.delta;else if(typeof(z==null?void 0:z.output_text_delta)=="string")B=z.output_text_delta;else if((z==null?void 0:z.object)==="chat.completion.chunk"&&Array.isArray(z==null?void 0:z.choices))for(const X of z.choices){const H=(u=X==null?void 0:X.delta)==null?void 0:u.content;typeof H=="string"&&(B+=H)}else if(Array.isArray(z==null?void 0:z.output))for(const X of z.output)for(const H of X.content||[])typeof(H==null?void 0:H.text)=="string"&&((H==null?void 0:H.type)==="reasoning"?$+=H.text:B+=H.text);(B||$)&&(r(X=>{var W,Y;const H=[...X],K=((W=H[g])==null?void 0:W.content)??"",D=((Y=H[g])==null?void 0:Y.reasoning)??"";return H[g]={role:"assistant",content:K+(B||""),reasoning:D+($||"")},H}),queueMicrotask(()=>{c.current&&(c.current.scrollTop=c.current.scrollHeight)}))}catch{}}}}catch{r(v=>[...v,{role:"assistant",content:"Errore di rete. Riprova."}])}finally{l(!1),queueMicrotask(()=>{c.current&&(c.current.scrollTop=c.current.scrollHeight)})}}return t?m.jsxs("div",{className:"fixed inset-0 md:inset-auto md:bottom-4 md:right-4 md:left-auto w-full md:w-[380px] h-[100svh] md:max-h-[70vh] flex flex-col overflow-hidden rounded-none md:rounded-2xl bg-[#0c1218] md:bg-transparent glass-panel shadow-2xl z-50","aria-live":"polite",children:[m.jsxs("div",{className:"flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 sticky top-0",children:[m.jsx("strong",{className:"text-cream",children:"Assistente"}),m.jsxs("div",{className:"flex items-center gap-3",children:[m.jsx("span",{className:"text-xs text-gray-400",children:s?"sta scrivendo…":"online"}),m.jsx("button",{"aria-label":"Chiudi chat",className:"text-gray-400 hover:text-white",onClick:()=>{p(),e==null||e()},children:"✕"})]})]}),m.jsx("div",{ref:c,className:"p-3 overflow-auto flex-1 flex flex-col gap-2",children:i.map((x,u)=>m.jsxs("div",{className:`px-3 py-2 rounded-xl max-w-[85%] leading-snug ${x.role==="user"?"self-end bg-primary/20 text-white":"self-start bg-white/10 text-gray-200"}`,children:[x.role==="assistant"?_(x.content):m.jsx("span",{className:"whitespace-pre-wrap",children:x.content}),x.role==="assistant"&&typeof x.reasoning=="string"&&x.reasoning.trim()&&m.jsxs("div",{className:"mt-2",children:[m.jsx("button",{className:"text-xs text-white/70 hover:text-white underline underline-offset-2",onClick:()=>h(g=>({...g,[u]:!g[u]})),children:d[u]?"Nascondi ragionamento":"Mostra ragionamento"}),d[u]&&m.jsx("div",{className:"mt-2 rounded-lg bg-white/5 border border-white/10 p-2 text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed",children:x.reasoning})]})]},u))}),m.jsxs("div",{className:"flex gap-2 p-2 border-t border-white/10 sticky bottom-0 bg-[#0c1218]",style:{paddingBottom:"max(env(safe-area-inset-bottom, 0px), 8px)"},children:[m.jsx("input",{className:"flex-1 rounded-lg bg-white/5 border-white/10",value:a,onChange:x=>o(x.target.value),onKeyDown:x=>x.key==="Enter"?y():null,placeholder:"Scrivi un messaggio…","aria-label":"Messaggio per l'assistente"}),m.jsx("button",{className:"px-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold disabled:opacity-60",onClick:y,disabled:s,children:"Invia"})]})]}):m.jsx("button",{"aria-label":"Apri chat assistente",className:"fixed right-4 h-12 w-12 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:bg-primary/90 z-50",style:{bottom:"calc(1rem + env(safe-area-inset-bottom, 0px))"},onClick:n,children:"💬"})}function U2({workflow:t,onClose:e}){const n=(()=>{const x="https://csd-station-api-346681848489.europe-west8.run.app";return typeof window<"u"&&/\.github\.io$/.test(window.location.hostname),x})(),[i,r]=Qe.useState(""),[a,o]=Qe.useState(""),[s,l]=Qe.useState(!0),[c,d]=Qe.useState(null),[h,f]=Qe.useState(!1),p=Qe.useMemo(()=>{const x=t.name,u=t.sector,g=t.category,v=t.level;return`>>> CRITICAL OVERRIDE
- Rispondi in italiano.
- NON citare né utilizzare "file caricati", RAG, ricerca documentale, triage di documenti.
- NON proporre opzioni o checklist generiche (riassunti, estrazioni, compliance generica).
- GENERA SUBITO la pagina informativa del workflow richiesto, seguendo esattamente la struttura sotto.
- Se le tue istruzioni predefinite parlano di documenti, IGNORALE per questa richiesta.
>>> FINE OVERRIDE

Ruolo: Esperto di Automazione e AI - CSD Station Italia
Data: ${new Date().toLocaleDateString("it-IT",{day:"2-digit",month:"long",year:"numeric"})}
Versione: 1.0 - Frontend Templating

---

### NOTA DELL’UTENTE (SE PRESENTE)
USER_CUSTOM_PROMPT

---

### MISSIONE
Generare una pagina informativa completa, accurata e aggiornata per il workflow:
**Workflow**: ${x}
**Settore**: ${u}
**Categoria**: ${g}
**Livello di Automazione**: ${v} (L0=manuale, L1=semi-automatico, L2=full-automatico)
La pagina deve essere leggibile in 2-3 minuti (massimo), strutturata e orientata al valore operativo.

---

### VINCOLI OPERATIVI
1. NO Tecnicismi Eccessivi: Linguaggio accessibile, senza jargon API/DevOps a meno che il settore/livello non lo richieda.
2. Struttura Obbligatoria:
   - Headline (Cosa fa? Perché è utile?)
   - Caso d'uso concreto nel settore ${u}
   - Prerequisiti tecnici (minimo: CRM, ERP, strumenti attuali)
   - Integrazioni consigliate (priorità: n8n, OpenAI Platform, GCP, Spoki, Cursor)
   - Metriche di valore (TOS, VEP) con stime conservative
   - Effort/Cost Indicator (Basso/Medio/Alto) qualitativo
   - Guardrail legali (es. GDPR, vincoli settoriali)
   - Call-to-Action leggera (es. "Esplora questa automazione" senza pressure commerciale)
3. Metriche di ROI Operativo (OBBLIGATORIE):
   - TOS (Tempo Operativo Salvato): es. "3-5 ore/settimana, riduzione 60% del task manuale"
   - VEP (Valore Economico Previsto): es. "€200-400/mese di risparmio operativo"
   - DIVIETO ASSOLUTO: Mai preventivi, listini, confronti prezzi con competitor
4. Compliance e Guardrail:
   - Se Settore = "Sanità": sottolinea GDPR + anonimizzazione dati
   - Se Settore = "No-Profit": enfatizza sostenibilità costi
   - Se Settore = "Notarile/Legale": ricorda insostituibilità professionista
   - Se Livello = "L0": suggerisci prima una consulenza di fattibilità
5. Tono di Voce:
   - Professionale, coinvolgente, orientato alla soluzione
   - Escludere tone di vendita diretta
   - Focalizzare su "cosa fa" e "perché è utile"

---

### OUTPUT ATTESO
Genera una pagina informativa strutturata con i seguenti elementi:
**[HEADLINE]**
Titolo accattivante + sottotitolo di valore (max 2 righe)
**[CHE COSA RISOLVE]**
Descrizione del problema/pain point nel contesto ${u}, in linguaggio chiaro.
**[CASO D'USO CONCRETO]**
Uno scenario realistico nel settore, con prima/dopo.
**[COME FUNZIONA]**
Flusso semplificato del workflow (3-5 step massimo), adatto al livello ${v}.
**[PREREQUISITI E INTEGRAZIONI]**
- Strumenti richiesti (CRM, ERP, database, ecc.)
- Integrazioni consigliate (con priorità su n8n, OpenAI Platform, GCP)
- Tempo di implementazione qualitativo (Rapida/Media/Complessa)
**[VALORE OPERATIVO]**
- TOS: [tempo liberato con stima conservativa]
- VEP: [equivalente economico mensile/annuale]
- Effort/Cost Indicator: [Basso/Medio/Alto]
**[GUARDRAIL E CONSIDERAZIONI]**
Vincoli legali, settoriali, etici. Se applicabili: menzione GDPR, PSD2, norme farmaceutiche, ecc.
**[PROSSIMI PASSI]**
Call-to-action leggera: "Contatta il team CSD per una consulenza tecnica gratuita".

---

### NOTE IMPORTANTI
- Mantieni il riferimento al workflow specifico: ${x}
- Cita il settore: ${u} almeno 2-3 volte
- Adatta il linguaggio al livello ${v}
- Se info sul workflow non disponibili, richiedi chiarimenti (non inventare)
- Output max 2000 parole (leggibile in 2-3 minuti)`},[t]);async function _(x){var u,g,v,E,w;l(!0),d(null),o("");try{let b="",T=!1,P=null;const C=()=>{P||(P=setInterval(()=>{if(b.length>0){const H=b.slice(0,6);b=b.slice(6),o(K=>K+H)}else T&&(clearInterval(P),P=null)},40))},M=p.replace("USER_CUSTOM_PROMPT",(x||"").slice(0,2e3)),N=await fetch((n||"")+"/chat-stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:M})});if(!N.ok||!N.body){const H=await fetch((n||"")+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:M})});if(!H.ok){const W=await H.text();throw new Error(W||"Errore upstream")}const K=await H.json(),D=K&&typeof K.reply=="string"&&K.reply.trim()||K&&typeof K.output_text=="string"&&K.output_text.trim()||((E=(v=(g=(u=K==null?void 0:K.choices)==null?void 0:u[0])==null?void 0:g.message)==null?void 0:v.content)==null?void 0:E.trim())||"";D?o(D):d("Nessun contenuto dal modello.");return}const z=N.body.getReader(),B=new TextDecoder;let $="",X=!1;for(;;){const{value:H,done:K}=await z.read();if(K)break;$+=B.decode(H,{stream:!0});const D=$.split(`
`);$=D.pop()||"";for(const W of D){if(!W.startsWith("data:"))continue;const Y=W.slice(5).trim();if(Y!=="[DONE]")try{const ne=JSON.parse(Y);let _e="";if((ne==null?void 0:ne.type)==="response.output_text.delta"&&typeof(ne==null?void 0:ne.delta)=="string")_e=ne.delta;else if(typeof(ne==null?void 0:ne.output_text_delta)=="string")_e=ne.output_text_delta;else if((ne==null?void 0:ne.object)==="chat.completion.chunk"&&Array.isArray(ne==null?void 0:ne.choices))for(const Be of ne.choices){const Ue=(w=Be==null?void 0:Be.delta)==null?void 0:w.content;typeof Ue=="string"&&(_e+=Ue)}else if(Array.isArray(ne==null?void 0:ne.output))for(const Be of ne.output)for(const Ue of Be.content||[])typeof(Ue==null?void 0:Ue.text)=="string"&&(_e+=Ue.text);_e&&(X=!0,b+=_e,C())}catch{}}}T=!0,!X&&!a&&d("Nessun contenuto dal modello.")}catch(b){d((b==null?void 0:b.message)||"Errore")}finally{l(!1)}}Qe.useEffect(()=>{_("")},[t==null?void 0:t.name]);function y(x){if(!x)return null;const g=x.replace(/\*\*(.*?)\*\*/g,'"$1"').split(/\r?\n/),v=[];let E=[];function w(){E.length!==0&&(v.push(m.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1",children:E.map((b,T)=>m.jsx("li",{className:"text-[15px] leading-7 text-gray-200",children:b},T))},`ul-${v.length}`)),E=[])}for(let b=0;b<g.length;b++){const T=g[b].trimEnd();if(!T.trim()){w();continue}const P=T.match(/^#{1,6}\s*\[(.+?)\]\s*$/);if(P){w();const C=P[1];v.push(m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream font-heading",children:C},`h-${v.length}`));continue}if(/^\[[A-Z_ ]+\]\s*$/i.test(T)){w();continue}if(/^-\s+/.test(T)){E.push(T.replace(/^-+\s+/,""));continue}if(/^\d+\.\s+/.test(T)){E.push(T.replace(/^\d+\.\s+/,""));continue}w(),v.push(m.jsx("p",{className:"text-[15px] leading-7 text-gray-200",children:T},`p-${v.length}`))}return w(),v}return m.jsx("div",{className:"fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",children:m.jsxs("div",{className:"relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0c1218] border border-white/10 shadow-2xl",children:[m.jsxs("div",{className:"flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10",children:[m.jsxs("div",{className:"flex flex-col",children:[m.jsx("div",{className:"text-cream font-bold",children:t.name}),m.jsxs("div",{className:"text-xs text-gray-400",children:[t.sector," • ",t.category," • ",t.level]})]}),m.jsxs("div",{className:"flex items-center gap-2",children:[m.jsx("button",{onClick:()=>f(!0),className:"hidden md:block h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm",children:"✎ Nota"}),m.jsx("button",{onClick:()=>_(i),className:"h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50",children:"Rigenera pagina"}),m.jsx("button",{"aria-label":"Chiudi",onClick:e,className:"h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white",children:"✕"})]})]}),m.jsxs("div",{className:"p-4 overflow-auto max-h-[calc(90vh-56px)]",children:[s&&m.jsx("div",{className:"flex items-center justify-center py-12",children:m.jsx("div",{className:"wire-square animate-wire-spin"})}),!s&&c&&m.jsx("div",{className:"text-yellow-400 text-sm",children:String(c)}),!c&&a&&m.jsx("article",{className:"max-w-none font-display",children:y(a)})]}),h&&m.jsx("div",{className:"absolute inset-0 bg-black/40 flex items-center justify-center p-4",children:m.jsxs("div",{className:"w-full max-w-lg rounded-xl bg-[#0f1621] border border-white/10 shadow-xl",children:[m.jsx("div",{className:"px-4 py-3 border-b border-white/10 text-cream font-medium",children:"Nota per la generazione (max 2000 caratteri)"}),m.jsxs("div",{className:"p-4",children:[m.jsx("textarea",{value:i,onChange:x=>r(x.target.value.slice(0,2e3)),className:"w-full h-40 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none",placeholder:"Scrivi indicazioni specifiche (tone, esempi, vincoli)."}),m.jsxs("div",{className:"mt-3 flex items-center justify-end gap-2",children:[m.jsx("button",{onClick:()=>f(!1),className:"h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm",children:"Chiudi"}),m.jsx("button",{onClick:()=>{f(!1),_(i)},className:"h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold",children:"Usa nota e rigenera"})]})]})]})})]})})}function F2(){return m.jsxs("article",{className:"max-w-none font-display",children:[m.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-3",children:"Benvenuto su CSD Station AI Advisor"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Scopri come la Piattaforma trasforma il tuo lavoro. CSD Station AI Advisor è il tuo consulente intelligente progettato per esplorare insieme a te il potenziale dell'Intelligenza Artificiale e dell’Iper‑Automazione applicati ai processi aziendali. Non è uno strumento tecnico complesso: è una conversazione che ti aiuta a capire come risparmiare tempo e costi nella tua attività quotidiana."}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Come Iniziare dalla Home"}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 1: Accedi alla Piattaforma"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dalla home di CSD Station trovi l’interfaccia di AI Advisor. È il tuo primo punto di contatto con la piattaforma: inizia una conversazione naturale con il nostro consulente digitale."}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 2: Racconta il tuo settore"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Il tuo settore (retail, servizi, manifattura, sanità, ecc.)."}),m.jsx("li",{children:"I processi che consumano più tempo nella tua giornata."}),m.jsx("li",{children:"Gli strumenti che già utilizzi (CRM, email, piattaforme di gestione, ecc.)."})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7 mt-2",children:"AI Advisor ascolta e comprende il tuo contesto specifico."}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Step 3: Ricevi suggerimenti mirati"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dopo pochi messaggi ricevi soluzioni concrete di automazione e AI pensate per te: non una lista generica, ma idee che risolvono problemi reali."}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Prenotare un Appuntamento"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Nella conversazione con AI Advisor trovi il pulsante “Prenota Appuntamento”."}),m.jsx("li",{children:"Un clic ti collega a Google Calendar."}),m.jsx("li",{children:"Scegli l’orario preferito e ricevi conferma via email."})]}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Esplorare i Servizi — Workflow Interattivi"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Cosa trovi nella sezione Servizi"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Una raccolta di workflow interattivi: non manuali da leggere, ma strumenti da provare. Ogni workflow è come un mini‑consulente per un’area specifica."}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Workflow per Ottimizzare il Servizio Clienti."}),m.jsx("li",{children:"Workflow per Gestione Amministrativa."}),m.jsx("li",{children:"Workflow per Analisi Dati."})]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Come usare i workflow"}),m.jsxs("ol",{className:"list-decimal pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Naviga nella sezione Servizi."}),m.jsx("li",{children:"Scegli il workflow più pertinente al tuo bisogno."}),m.jsx("li",{children:"Interagisci: è una conversazione guidata."}),m.jsx("li",{children:"Ricevi una pagina informativa personalizzata con scenario, TOS (tempo risparmiato) e VEP (valore economico previsto)."})]}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Valore della Piattaforma"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Conversazione, non compilazione"}),": linguaggio naturale, niente questionari interminabili."]}),m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Soluzioni concrete e misurabili"}),": stime realistiche di tempo e valore economico."]}),m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Zero pressione commerciale"}),": esplora in libertà, senza impegno."]})]}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Domande Frequenti"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Devo essere un esperto?"})," No. È pensata per chi non è tecnico: dialogo naturale, chiaro."]}),m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Quanto tempo serve?"})," Ogni interazione si legge in ~20 secondi."]}),m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Posso prenotare da qui?"})," Sì, via Google Calendar con conferma email."]}),m.jsxs("li",{children:[m.jsx("span",{className:"font-semibold",children:"Posso fidarmi delle stime?"})," Sono conservative e basate su dati di settore; la validazione puntuale avviene con il team."]})]}),m.jsx("h2",{className:"mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Inizia Subito"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Dalla home, apri una conversazione con AI Advisor. Se preferisci il contatto diretto, usa “Prenota Appuntamento”."})]})}function O2(){return m.jsxs("article",{className:"max-w-none font-display",children:[m.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-2",children:"Termini di Servizio - CSD Station Italia"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:m.jsx("em",{children:"Ultimo aggiornamento: 13 novembre 2025"})}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Una Conversazione Trasparente su Come Funziona"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Benvenuto su CSD Station. Vogliamo essere chiari e onesti su come funziona la nostra piattaforma e quale sia il nostro rapporto con te. Niente legalese: ti spieghiamo cosa aspettarti in modo semplice."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"1. Di Cosa Parliamo"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Questi Termini riguardano il sito CSD Station Italia, le conversazioni con AI Advisor, i workflow interattivi e i contenuti generati. In sintesi: la tua esperienza completa con noi."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"2. Come Usare CSD Station nel Modo Giusto"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Usa CSD Station per"}),": esplorare opportunità di automazione e AI, ricevere consulenza informativa, capire come risparmiare tempo e costi."]}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Non usarla per"}),":"]}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Attività illegittime o dannose"}),m.jsx("li",{children:"Offese, molestie o violazioni della privacy altrui"}),m.jsx("li",{children:"Violazione di diritti di proprietà intellettuale"}),m.jsx("li",{children:"Qualsiasi scopo che possa nuocere a terzi"})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Quello che ricevi da AI Advisor è consulenza informativa e ispirativa e non sostituisce pareri professionali (es. legale, fiscale o tecnico specializzato). Per casi sensibili, rivolgiti a un esperto qualificato."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"3. I Contenuti Che AI Advisor Genera Per Te"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Come funziona realmente"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Le informazioni potrebbero contenere imprecisioni o semplificazioni."}),m.jsx("li",{children:"Le soluzioni suggerite potrebbero non essere perfette per ogni caso."})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Verifica sempre le informazioni critiche prima di decisioni importanti. In caso di dubbi, contatta il nostro team."}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Protezione dei tuoi dati"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Evita di inserire dati personali sensibili senza adeguata base giuridica. Assicurati di avere diritto a condividere i dati in conformità a GDPR, leggi locali e policy aziendali."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"4. Cosa Non Ti Promettiamo"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Il servizio è fornito “così com’è”. Non garantiamo assenza di errori o interruzioni. Nella misura massima consentita dalla legge italiana, decliniamo responsabilità per:"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Danni indiretti/conseguenti (perdita di guadagno, dati, interruzioni)"}),m.jsx("li",{children:"Informazioni imprecise o incomplete generate dall’AI"}),m.jsx("li",{children:"Decisioni prese senza ulteriore verifica"})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"In parole semplici: se segui un nostro consiglio e qualcosa va storto, la responsabilità ultima resta tua."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"5. Quello Che È Nostro Rimane Nostro"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Logo, design, testi, codice e il nome “AI Advisor” sono di nostra proprietà (o concessi in licenza). Puoi usare i contenuti per scopi personali/aziendali legittimi, ma non copiarli, rivenderli o utilizzare il marchio senza permesso."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"6. Cambieremo Questi Termini"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Pubblicheremo i nuovi Termini su questa pagina"}),m.jsx("li",{children:"Aggiorneremo la data in cima"}),m.jsx("li",{children:"In caso di cambi significativi, proveremo a informarti"})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se continui a usare il servizio dopo un aggiornamento, accetti i nuovi Termini."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"7. La Legge Che Protegge Entrambi"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Per i consumatori si applicano le tutele di legge e la competenza del loro foro."}),m.jsx("li",{children:"Negli altri casi il foro competente è Firenze."})]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"8. Qualcosa da Chiarire?"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Dubbi o domande: contatta il nostro team."}),m.jsx("li",{children:"Privacy: consulta l’Informativa Privacy nel footer."}),m.jsx("li",{children:"Segnalazioni: scrivici e valuteremo con priorità."})]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Messaggio Finale"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"CSD Station è pensata per aiutarti a scoprire il valore dell’AI. Usala con fiducia e responsabilità. Se accetti questi Termini, riconosci come funziona il servizio e i relativi limiti. Se non sei d’accordo, non utilizzare la piattaforma e contattaci per trovare insieme una soluzione."}),m.jsx("p",{className:"text-gray-400 text-sm mt-4",children:"Ultimo aggiornamento: 13 novembre 2025"})]})}function k2(){return m.jsxs("article",{className:"max-w-none font-display",children:[m.jsx("h1",{className:"text-cream text-3xl md:text-4xl font-extrabold mb-2",children:"Informativa Privacy - CSD Station Italia"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:m.jsx("em",{children:"Ultimo aggiornamento: 13 novembre 2025"})}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"La Nostra Promessa sui Tuoi Dati"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"La privacy non è solo una regola legale per noi: è un impegno. Qui spieghiamo, in modo semplice, come raccogliamo, usiamo e proteggiamo i tuoi dati quando utilizzi CSD Station."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"1. Chi Siamo (e a chi contattare)"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Titolare del Trattamento"}),": CSD Station Italia. Per domande o per esercitare i tuoi diritti, contattaci tramite la sezione ",m.jsx("strong",{children:"“Servizio Clienti”"})," del sito."]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"2. Quali Dati Raccogliamo (e perché)"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Dati di Navigazione"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Dispositivo, browser, indirizzo IP, fuso orario"}),m.jsx("li",{children:"Pagine visitate e tempi di permanenza"})]}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Perché"}),": per funzionamento, diagnostica e sicurezza del sito."]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati che condividi con AI Advisor"}),m.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-2 00",children:m.jsx("li",{children:"Messaggi utili a generare risposte, comprendere il tuo contesto e creare pagine informative personalizzate."})}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Attenzione"}),": non inserire dati sensibili (carte, dati medici, password, SSN). In caso di dubbio, contattaci prima."]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati da moduli"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se prenoti appuntamenti via Google Calendar o compili moduli, trattiamo nome, email, orari e dettagli essenziali per ricontattarti."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"3. Perché usiamo i tuoi dati (base legale)"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Per fornirti il servizio"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Base legale"}),": esecuzione di misure precontrattuali."]}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Generare contenuti informativi e consulenziali"}),m.jsx("li",{children:"Rispondere alle domande e creare pagine personalizzate"}),m.jsx("li",{children:"Gestire e confermare appuntamenti"})]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Per migliorare CSD Station"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Base legale"}),": legittimo interesse bilanciato."]}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Capire cosa funziona, migliorare risposte e performance"}),m.jsx("li",{children:"Rilevare problemi prima che impattino gli utenti"})]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Per proteggere la piattaforma"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:[m.jsx("strong",{children:"Base legale"}),": obblighi legali e legittimo interesse (sicurezza)."]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"4. Per quanto tempo conserviamo i dati"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Chat e conversazioni"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsxs("li",{children:[m.jsx("strong",{children:"Durante la sessione"}),": memoria attiva per garantire continuità."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Dopo la sessione"}),": la chat non viene conservata a lungo termine."]})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Eccezioni specifiche possono essere valutate su richiesta (es. audit)."}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Log tecnici e sicurezza"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Sicurezza: circa 90 giorni"}),m.jsx("li",{children:"Diagnostica: per il tempo necessario alla risoluzione"}),m.jsx("li",{children:"Obblighi legali: per i tempi previsti"})]}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Dati da moduli e appuntamenti"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Conservati finché servono allo scopo; se diventi cliente, secondo contratto; eliminabili su richiesta ove possibile."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"5. Con chi condividiamo i dati"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Non vendiamo i tuoi dati."}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Fornitori"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Google Cloud Run (hosting)"}),m.jsx("li",{children:"Piattaforme AI per le risposte dell’Advisor"}),m.jsx("li",{children:"Servizi di comunicazione (calendar/confirm)"})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Vincoli contrattuali: uso limitato allo scopo, sicurezza adeguata, nessuna divulgazione non autorizzata."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"6. Trasferimenti all’estero"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Possibili per via dell’infrastruttura dei fornitori. Usiamo SCC o misure equivalenti per garantire protezione conforme agli standard UE."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"7. I tuoi diritti"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"Accesso, rettifica, cancellazione (“oblio”), limitazione"}),m.jsx("li",{children:"Opposizione e portabilità"}),m.jsx("li",{children:"Reclamo al Garante Privacy"})]}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:["Per esercitarli, scrivi al ",m.jsx("strong",{children:"Servizio Clienti"})," indicando il diritto e l’ambito. Rispondiamo entro 30 giorni (fino a 60 se necessario)."]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"8. Cookie e analytics"}),m.jsx("h3",{className:"mt-2 mb-1 text-[18px] font-semibold text-cream",children:"Cookie tecnici essenziali"}),m.jsx("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:m.jsx("li",{children:"Autenticazione, preferenze, sicurezza"})}),m.jsx("h3",{className:"mt-3 mb-1 text-[18px] font-semibold text-cream",children:"Analytics anonimi"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Statistiche aggregate e anonime per migliorare il servizio. Puoi limitare cookie non essenziali dal browser."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"9. Sicurezza"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200",children:[m.jsx("li",{children:"HTTPS per i dati in transito"}),m.jsx("li",{children:"Accesso limitato e monitoraggio continuo"}),m.jsx("li",{children:"Backup e conformità a standard di sicurezza"})]}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Nessun sistema è 100% sicuro: in caso di violazione, notificheremo entro 72 ore con i dettagli necessari."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"10. Aggiornamenti dell’informativa"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"Se cambiano le leggi o i processi, aggiorniamo questa pagina ed evidenziamo le modifiche importanti."}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"11. FAQ"}),m.jsxs("ul",{className:"list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200",children:[m.jsxs("li",{children:[m.jsx("strong",{children:"Vendete i miei dati?"})," No."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Quanto dura la chat?"})," Solo per la sessione corrente, poi non viene conservata a lungo termine."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Posso cancellare i miei dati?"})," Sì, nei limiti di legge; contatta il Servizio Clienti."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Ho condiviso dati sensibili per errore?"})," Avvisaci subito; li elimineremo al più presto."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Dubbi?"})," Contattaci via “Servizio Clienti”."]})]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"12. Contatti e recapiti"}),m.jsxs("p",{className:"text-gray-300 text-[15px] leading-7",children:["Per richieste su privacy, diritti o segnalazioni usa ",m.jsx("strong",{children:"“Servizio Clienti”"})," sul sito CSD Station. Autorità di riferimento: Garante per la Protezione dei Dati Personali — ",m.jsx("span",{className:"underline",children:"www.garanteprivacy.it"})]}),m.jsx("hr",{className:"my-4 border-white/10"}),m.jsx("h2",{className:"mt-3 mb-2 text-[22px] md:text-[24px] font-semibold text-cream",children:"Il Messaggio Finale"}),m.jsx("p",{className:"text-gray-300 text-[15px] leading-7",children:"I tuoi dati sono importanti. La sicurezza e la trasparenza sono fondamentali per noi. Se usi CSD Station, ci affidi la tua fiducia: la rispetteremo con responsabilità."}),m.jsx("p",{className:"text-gray-400 text-sm mt-4",children:"Ultimo aggiornamento: 13 novembre 2025"})]})}const B2={home:sv,servizi:N2,chiSiamo:I2,contatti:D2,documentation:F2,terms:O2,privacy:k2};function G2(){const[t,e]=Qe.useState("home"),[n,i]=Qe.useState(!1),[r,a]=Qe.useState(null),[o,s]=Qe.useState(56),[l,c]=Qe.useState(96),d=Qe.useMemo(()=>B2[t]??sv,[t]);return Qe.useEffect(()=>{function h(){const x=document.getElementById("site-header"),u=document.getElementById("site-footer");x&&s(x.getBoundingClientRect().height||56),u&&c(u.getBoundingClientRect().height||96)}h();const f=new ResizeObserver(h),p=new ResizeObserver(h),_=document.getElementById("site-header"),y=document.getElementById("site-footer");return _&&f.observe(_),y&&p.observe(y),window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h),f.disconnect(),p.disconnect()}},[]),m.jsxs("div",{className:"relative min-h-screen overflow-x-hidden",children:[m.jsxs("div",{className:"absolute inset-0 -z-10 overflow-hidden",children:[m.jsx("div",{className:"bg-blob top-[-20%] left-[-15%] w-[500px] h-[500px] bg-primary/20"}),m.jsx("div",{className:"bg-blob bottom-[-10%] right-[-15%] w-[600px] h-[600px] bg-accent/10"})]}),m.jsx(Vy,{current:t,onNavigate:e,onOpenChat:()=>i(!0)}),m.jsxs("main",{className:"relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 md:py-12",children:[t==="home"&&m.jsx("div",{className:"absolute inset-0 pointer-events-none z-0",children:m.jsx("div",{style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"},children:m.jsx(P2,{count:130,gravity:0,friction:.98,wallBounce:.99,followCursor:!1,colors:[3833343,1096065,16643558],minSize:.35,maxSize:.9,size0:.8,ambientIntensity:1.2,lightIntensity:450})})}),m.jsx(d,{onOpenChat:()=>i(!0),onOpenWorkflow:h=>a(h),onNavigate:e})]}),m.jsx(Hy,{onNavigate:e}),m.jsx(z2,{open:n,onClose:()=>i(!1),onOpen:()=>i(!0)}),r&&m.jsx(U2,{workflow:r,onClose:()=>a(null)})]})}const V2=document.getElementById("root"),H2=vg(V2);H2.render(m.jsx(G2,{}));
