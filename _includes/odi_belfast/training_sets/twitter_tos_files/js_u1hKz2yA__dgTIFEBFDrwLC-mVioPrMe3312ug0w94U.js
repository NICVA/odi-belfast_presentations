/*
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Defines the global Placeholders object along with various utility methods
"use strict";!function(t){// Cross-browser DOM event binding
function e(t,e,n){return t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):void 0}// Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative)
function n(t,e){var n,i;for(n=0,i=t.length;i>n;n++)if(t[n]===e)return!0;return!1}// Move the caret to the index position specified. Assumes that the element has focus
function i(t,e){var n;t.createTextRange?(n=t.createTextRange(),n.move("character",e),n.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}// Attempt to change the type property of an input element
function r(t,e){try{return t.type=e,!0}catch(n){// You can't change input type in IE8 and below
return!1}}// Expose public methods
t.Placeholders={Utils:{addEventListener:e,inArray:n,moveCaret:i,changeType:r}}}(this),function(t){// No-op (used in place of public methods when native support is detected)
function e(){}// Avoid IE9 activeElement of death when an iframe is used.
// More info:
// http://bugs.jquery.com/ticket/13393
// https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
function n(){try{return document.activeElement}catch(t){}}// Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place)
function i(t,e){var n,i,r=!!e&&t.value!==e,o=t.value===t.getAttribute(N);// Restore the maxlength value
// Old FF returns -1 if attribute not set (see GH-56)
// If the polyfill has changed the type of the element we need to change it back
return(r||o)&&"true"===t.getAttribute(P)?(t.removeAttribute(P),t.value=t.value.replace(t.getAttribute(N),""),t.className=t.className.replace(I,""),i=t.getAttribute(K),parseInt(i,10)>=0&&(t.setAttribute("maxLength",i),t.removeAttribute(K)),n=t.getAttribute(F),n&&(t.type=n),!0):!1}// Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible)
function r(t){var e,n,i=t.getAttribute(N);// Store and remove the maxlength value
// If the type of element needs to change, change it (e.g. password inputs)
return""===t.value&&i?(t.setAttribute(P,"true"),t.value=i,t.className+=" "+C,n=t.getAttribute(K),n||(t.setAttribute(K,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(F),e?t.type="text":"password"===t.type&&Q.changeType(t,"text")&&t.setAttribute(F,"password"),!0):!1}function o(t,e){var n,i,r,o,a,s,c;// Check if the passed in node is an input/textarea (in which case it can't have any affected descendants)
if(t&&t.getAttribute(N))e(t);else// Run the callback for each element
for(// If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
r=t?t.getElementsByTagName("input"):g,o=t?t.getElementsByTagName("textarea"):m,n=r?r.length:0,i=o?o.length:0,c=0,s=n+i;s>c;c++)a=n>c?r[c]:o[c-n],e(a)}// Return all affected elements to their normal state (remove placeholder value if present)
function a(t){o(t,i)}// Show the placeholder value on all appropriate elements
function s(t){o(t,r)}// Returns a function that is used as a focus event handler
function c(t){return function(){// Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
y&&t.value===t.getAttribute(N)&&"true"===t.getAttribute(P)?// Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
Q.moveCaret(t,0):// Remove the placeholder
i(t)}}// Returns a function that is used as a blur event handler
function u(t){return function(){r(t)}}// Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
function f(t){return function(e){//Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
//Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
return b=t.value,"true"===t.getAttribute(P)&&b===t.getAttribute(N)&&Q.inArray(T,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function l(t){return function(){i(t,b),// If the element is now empty we need to show the placeholder
""===t.value&&(t.blur(),Q.moveCaret(t,0))}}function p(t){return function(){t===n()&&t.value===t.getAttribute(N)&&"true"===t.getAttribute(P)&&Q.moveCaret(t,0)}}// Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
function h(t){return function(){// Turn off placeholders on all appropriate descendant elements
a(t)}}// Bind event handlers to an element that we need to affect with the polyfill
function d(t){// If the element is part of a form, make sure the placeholder string is not submitted as a value
t.form&&(x=t.form,// If the type of the property is a string then we have a "form" attribute and need to get the real form
"string"==typeof x&&(x=document.getElementById(x)),// Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
x.getAttribute(B)||(Q.addEventListener(x,"submit",h(x)),x.setAttribute(B,"true"))),// Bind event handlers to the element so we can hide/show the placeholder as appropriate
Q.addEventListener(t,"focus",c(t)),Q.addEventListener(t,"blur",u(t)),// If the placeholder should hide on input rather than on focus we need additional event handlers
y&&(Q.addEventListener(t,"keydown",f(t)),Q.addEventListener(t,"keyup",l(t)),Q.addEventListener(t,"click",p(t))),// Remember that we've bound event handlers to this element
t.setAttribute(U,"true"),t.setAttribute(N,j),// If the element doesn't have a value and is not focussed, set it to the placeholder string
(y||t!==n())&&r(t)}var// These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
g,m,y,v,b,w,E,j,_,x,O,A,S,k=["text","search","url","tel","email","password","number","textarea"],// The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
T=[// The following keys all cause the caret to jump to the end of the input value
27,// Escape
33,// Page up
34,// Page down
35,// End
36,// Home
// Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
37,// Left
38,// Up
39,// Right
40,// Down
// The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
8,// Backspace
46],// Styling variables
D="#ccc",C="placeholdersjs",I=new RegExp("(?:^|\\s)"+C+"(?!\\S)"),// The various data-* attributes used by the polyfill
N="data-placeholder-value",P="data-placeholder-active",F="data-placeholder-type",B="data-placeholder-submit",U="data-placeholder-bound",R="data-placeholder-focus",z="data-placeholder-live",K="data-placeholder-maxlength",// Various other variables used throughout the rest of the script
M=document.createElement("input"),$=document.getElementsByTagName("head")[0],G=document.documentElement,L=t.Placeholders,Q=L.Utils;if(L.nativeSupport=void 0!==M.placeholder,!L.nativeSupport){// Set up the placeholders
for(// Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
g=document.getElementsByTagName("input"),m=document.getElementsByTagName("textarea"),// Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
y="false"===G.getAttribute(R),v="false"!==G.getAttribute(z),// Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
w=document.createElement("style"),w.type="text/css",// Create style rules as text node
E=document.createTextNode("."+C+" { color:"+D+"; }"),// Append style rules to newly created stylesheet
w.styleSheet?w.styleSheet.cssText=E.nodeValue:w.appendChild(E),// Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
$.insertBefore(w,$.firstChild),S=0,A=g.length+m.length;A>S;S++)O=S<g.length?g[S]:m[S-g.length],// Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
j=O.attributes.placeholder,j&&(// IE returns an empty object instead of undefined if the attribute is not present
j=j.nodeValue,// Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
j&&Q.inArray(k,O.type)&&d(O));// If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
_=setInterval(function(){for(S=0,A=g.length+m.length;A>S;S++)O=S<g.length?g[S]:m[S-g.length],// Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
j=O.attributes.placeholder,j?(j=j.nodeValue,j&&Q.inArray(k,O.type)&&(// If the element hasn't had event handlers bound to it then add them
O.getAttribute(U)||d(O),// If the placeholder value has changed or not been initialised yet we need to update the display
(j!==O.getAttribute(N)||"password"===O.type&&!O.getAttribute(F))&&(// Attempt to change the type of password inputs (fails in IE < 9)
"password"===O.type&&!O.getAttribute(F)&&Q.changeType(O,"text")&&O.setAttribute(F,"password"),// If the placeholder value has changed and the placeholder is currently on display we need to change it
O.value===O.getAttribute(N)&&(O.value=j),// Keep a reference to the current placeholder value in case it changes via another script
O.setAttribute(N,j)))):O.getAttribute(P)&&(i(O),O.removeAttribute(N));// If live updates are not enabled cancel the timer
v||clearInterval(_)},100)}Q.addEventListener(t,"beforeunload",function(){L.disable()}),// Expose public methods
L.disable=L.nativeSupport?e:a,L.enable=L.nativeSupport?e:s}(this),function(t){var e=t.fn.val,n=t.fn.prop;Placeholders.nativeSupport||(t.fn.val=function(t){var n=e.apply(this,arguments),i=this.eq(0).data("placeholder-value");return void 0===t&&this.eq(0).data("placeholder-active")&&n===i?"":n},t.fn.prop=function(t,e){return void 0===e&&this.eq(0).data("placeholder-active")&&"value"===t?"":n.apply(this,arguments)})}(jQuery),function(t,e){/*--------------------------------------------------------------------------*/
/**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
function n(t,e){var n=t.createElement("p"),i=t.getElementsByTagName("head")[0]||t.documentElement;return n.innerHTML="x<style>"+e+"</style>",i.insertBefore(n.lastChild,i.firstChild)}/**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
function i(){var t=v.elements;return"string"==typeof t?t.split(" "):t}/**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
function r(t){var e=y[t[g]];return e||(e={},m++,t[g]=m,y[m]=e),e}/**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
function o(t,n,i){if(n||(n=e),f)return n.createElement(t);i||(i=r(n));var o;// Avoid adding some elements to fragments in IE < 9 because
// * Attributes like `name` or `type` cannot be set/changed once an element
//   is inserted into a document/fragment
// * Link elements with `src` attributes that are inaccessible, as with
//   a 403 response, will cause the tab/window to crash
// * Script elements appended to fragments will execute when their `src`
//   or `text` property is set
return o=i.cache[t]?i.cache[t].cloneNode():d.test(t)?(i.cache[t]=i.createElem(t)).cloneNode():i.createElem(t),!o.canHaveChildren||h.test(t)||o.tagUrn?o:i.frag.appendChild(o)}/**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
function a(t,n){if(t||(t=e),f)return t.createDocumentFragment();n=n||r(t);for(var o=n.frag.cloneNode(),a=0,s=i(),c=s.length;c>a;a++)o.createElement(s[a]);return o}/**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
function s(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(n){//abort shiv
//abort shiv
return v.shivMethods?o(n,t,e):e.createElem(n)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+// unroll the `createElement` calls
i().join().replace(/[\w\-:]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(v,e.frag)}/*--------------------------------------------------------------------------*/
/**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
function c(t){t||(t=e);var i=r(t);// corrects block display not defined in IE6/7/8/9
return!v.shivCSS||u||i.hasCSS||(i.hasCSS=!!n(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||s(t,i),t}/*jshint evil:true */
/** version */
var u,f,l="3.7.1",p=t.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,d=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,y={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",//if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
u="hidden"in t,f=1==t.childNodes.length||function(){// assign a false positive if unable to shiv
e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(n){// assign a false positive if detection fails => unable to shiv
u=!0,f=!0}}();/*--------------------------------------------------------------------------*/
/**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
var v={/**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",/**
     * current version of html5shiv
     */
version:l,/**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
shivCSS:p.shivCSS!==!1,/**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
supportsUnknownElements:f,/**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
shivMethods:p.shivMethods!==!1,/**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
type:"default",// shivs the document according to the specified `html5` object options
shivDocument:c,//creates a shived element
createElement:o,//creates a shived documentFragment
createDocumentFragment:a};/*--------------------------------------------------------------------------*/
// expose html5
t.html5=v,// shiv the document
c(e)}(this,document),// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab
// Module systems magic dance
function(t){// RequireJS
"function"==typeof define?define(t):"function"==typeof YUI?YUI.add("es5-sham",t):t()}(function(){// ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6
// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/kriskowal/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423
function t(t){try{return Object.defineProperty(t,"sentinel",{}),"sentinel"in t}catch(e){}}// ES5 15.2.3.3
// http://es5.github.com/#x15.2.3.3
if(// ES5 15.2.3.2
// http://es5.github.com/#x15.2.3.2
Object.getPrototypeOf||(// https://github.com/kriskowal/es5-shim/issues#issue/2
// http://ejohn.org/blog/objectgetprototypeof/
// recommended by fschaefer on github
Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:prototypeOfObject)}),!Object.getOwnPropertyDescriptor){var e="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(t,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(e+t);// If object does not owns property return undefined immediately.
if(owns(t,n)){// If object has a property then it's for sure both `enumerable` and
// `configurable`.
var i={enumerable:!0,configurable:!0};// If JS engine supports accessor properties then property may be a
// getter or setter.
if(supportsAccessors){// Unfortunately `__lookupGetter__` will return a getter even
// if object has own non getter property along with a same named
// inherited getter. To avoid misbehavior we temporary remove
// `__proto__` so that `__lookupGetter__` will return getter only
// if it's owned by an object.
var r=t.__proto__;t.__proto__=prototypeOfObject;var o=lookupGetter(t,n),a=lookupSetter(t,n);if(// Once we have getter and setter we can put values back.
t.__proto__=r,o||a)// If it was accessor property we're done and return here
// in order to avoid adding `value` to the descriptor.
return o&&(i.get=o),a&&(i.set=a),i}// If we got this far we know that object has an own property that is
// not an accessor so we set it as a value and return descriptor.
return i.value=t[n],i}}}// check whether defineProperty works if it's given. Otherwise,
// shim partially.
if(// ES5 15.2.3.4
// http://es5.github.com/#x15.2.3.4
Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)}),// ES5 15.2.3.5
// http://es5.github.com/#x15.2.3.5
Object.create||(Object.create=function(t,e){var n;if(null===t)n={__proto__:null};else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'");var i=function(){};i.prototype=t,n=new i,// IE has no built-in implementation of `Object.getPrototypeOf`
// neither `__proto__`, but this manually setting `__proto__` will
// guarantee that `Object.getPrototypeOf` will work as expected with
// objects created using `Object.create`
n.__proto__=t}return void 0!==e&&Object.defineProperties(n,e),n}),Object.defineProperty){var n=t({}),i="undefined"==typeof document||t(document.createElement("div"));if(!n||!i)var r=Object.defineProperty}if(!Object.defineProperty||r){var o="Property description must be an object: ",a="Object.defineProperty called on non-object: ",s="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(t,e,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError(a+t);if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError(o+n);// make a valiant attempt to use the real defineProperty
// for I8's DOM elements.
if(r)try{return r.call(Object,t,e,n)}catch(i){}// If it's a data property.
if(owns(n,"value"))// fail silently if "writable", "enumerable", or "configurable"
// are requested but not supported
/*
            // alternate approach:
            if ( // can't implement these features; allow false but not true
                !(owns(descriptor, "writable") ? descriptor.writable : true) ||
                !(owns(descriptor, "enumerable") ? descriptor.enumerable : true) ||
                !(owns(descriptor, "configurable") ? descriptor.configurable : true)
            )
                throw new RangeError(
                    "This implementation of Object.defineProperty does not " +
                    "support configurable, enumerable, or writable."
                );
            */
if(supportsAccessors&&(lookupGetter(t,e)||lookupSetter(t,e))){// As accessors are supported only on engines implementing
// `__proto__` we can safely override `__proto__` while defining
// a property to make sure that we don't hit an inherited
// accessor.
var c=t.__proto__;t.__proto__=prototypeOfObject,// Deleting a property anyway since getter / setter may be
// defined on object itself.
delete t[e],t[e]=n.value,// Setting original `__proto__` back now.
t.__proto__=c}else t[e]=n.value;else{if(!supportsAccessors)throw new TypeError(s);// If we got that far then getters and setters can be defined !!
owns(n,"get")&&defineGetter(t,e,n.get),owns(n,"set")&&defineSetter(t,e,n.set)}return t}}// ES5 15.2.3.7
// http://es5.github.com/#x15.2.3.7
Object.defineProperties||(Object.defineProperties=function(t,e){for(var n in e)owns(e,n)&&"__proto__"!=n&&Object.defineProperty(t,n,e[n]);return t}),// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
Object.seal||(Object.seal=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t}),// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
Object.freeze||(Object.freeze=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t});// detect a Rhino bug and patch it
try{Object.freeze(function(){})}catch(c){Object.freeze=function(t){return function(e){return"function"==typeof e?e:t(e)}}(Object.freeze)}// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
Object.preventExtensions||(Object.preventExtensions=function(t){// this is misleading and breaks feature-detection, but
// allows "securable" code to "gracefully" degrade to working
// but insecure code.
return t}),// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
Object.isSealed||(Object.isSealed=function(){return!1}),// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
Object.isFrozen||(Object.isFrozen=function(){return!1}),// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
Object.isExtensible||(Object.isExtensible=function(t){// 1. If Type(O) is not Object throw a TypeError exception.
if(Object(t)!==t)throw new TypeError;for(// 2. Return the Boolean value of the [[Extensible]] internal property of O.
var e="";owns(t,e);)e+="?";t[e]=!0;var n=owns(t,e);return delete t[e],n})}),// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab
// Module systems magic dance
function(t){// RequireJS
"function"==typeof define?define(t):"function"==typeof YUI?YUI.add("es5",t):t()}(function(){/**
 * Brings an environment as close to ECMAScript 5 compliance
 * as is possible with the facilities of erstwhile engines.
 *
 * Annotated ES5: http://es5.github.com/ (specific links below)
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
 */
//
// Function
// ========
//
// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5
Function.prototype.bind||(Function.prototype.bind=function(t){// .length is 1
// 1. Let Target be the this value.
var e=this;// 2. If IsCallable(Target) is false, throw a TypeError exception.
if("function"!=typeof e)throw new TypeError("Function.prototype.bind called on incompatible "+e);// 3. Let A be a new (possibly empty) internal list of all of the
//   argument values provided after thisArg (arg1, arg2 etc), in order.
// XXX slicedArgs will stand in for "A" if used
var n=c.call(arguments,1),i=function(){if(this instanceof i){// 15.3.4.5.2 [[Construct]]
// When the [[Construct]] internal method of a function object,
// F that was created using the bind function is called with a
// list of arguments ExtraArgs, the following steps are taken:
// 1. Let target be the value of F's [[TargetFunction]]
//   internal property.
// 2. If target has no [[Construct]] internal method, a
//   TypeError exception is thrown.
// 3. Let boundArgs be the value of F's [[BoundArgs]] internal
//   property.
// 4. Let args be a new list containing the same values as the
//   list boundArgs in the same order followed by the same
//   values as the list ExtraArgs in the same order.
// 5. Return the result of calling the [[Construct]] internal
//   method of target providing args as the arguments.
var r=function(){};r.prototype=e.prototype;var o=new r,a=e.apply(o,n.concat(c.call(arguments)));return Object(a)===a?a:o}// 15.3.4.5.1 [[Call]]
// When the [[Call]] internal method of a function object, F,
// which was created using the bind function is called with a
// this value and a list of arguments ExtraArgs, the following
// steps are taken:
// 1. Let boundArgs be the value of F's [[BoundArgs]] internal
//   property.
// 2. Let boundThis be the value of F's [[BoundThis]] internal
//   property.
// 3. Let target be the value of F's [[TargetFunction]] internal
//   property.
// 4. Let args be a new list containing the same values as the
//   list boundArgs in the same order followed by the same
//   values as the list ExtraArgs in the same order.
// 5. Return the result of calling the [[Call]] internal method
//   of target providing boundThis as the this value and
//   providing args as the arguments.
// equiv: target.call(this, ...boundArgs, ...args)
return e.apply(t,n.concat(c.call(arguments)))};// XXX bound.length is never writable, so don't even try
//
// 15. If the [[Class]] internal property of Target is "Function", then
//     a. Let L be the length property of Target minus the length of A.
//     b. Set the length own property of F to either 0 or L, whichever is
//       larger.
// 16. Else set the length own property of F to 0.
// 17. Set the attributes of the length own property of F to the values
//   specified in 15.3.5.1.
// TODO
// 18. Set the [[Extensible]] internal property of F to true.
// TODO
// 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
// 20. Call the [[DefineOwnProperty]] internal method of F with
//   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
//   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
//   false.
// 21. Call the [[DefineOwnProperty]] internal method of F with
//   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
//   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
//   and false.
// TODO
// NOTE Function objects created using Function.prototype.bind do not
// have a prototype property or the [[Code]], [[FormalParameters]], and
// [[Scope]] internal properties.
// XXX can't delete prototype in pure-js.
// 22. Return F.
return i});// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var t,e,n,i,r,o=Function.prototype.call,a=Array.prototype,s=Object.prototype,c=a.slice,u=o.bind(s.toString),f=o.bind(s.hasOwnProperty);//
// Object
// ======
//
// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14
if((r=f(s,"__defineGetter__"))&&(t=o.bind(s.__defineGetter__),e=o.bind(s.__defineSetter__),n=o.bind(s.__lookupGetter__),i=o.bind(s.__lookupSetter__)),//
// Array
// =====
//
// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray||(Array.isArray=function(t){return"[object Array]"==u(t)}),// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function".  Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.
// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
Array.prototype.forEach||(Array.prototype.forEach=function(t){var e=w(this),n=arguments[1],i=-1,r=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError;for(;++i<r;)i in e&&// Invoke the callback function with call, passing arguments:
// context, property value, property key, thisArg object context
t.call(n,e[i],i,e)}),// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
Array.prototype.map||(Array.prototype.map=function(t){var e=w(this),n=e.length>>>0,i=Array(n),r=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)o in e&&(i[o]=t.call(r,e[o],o,e));return i}),// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
Array.prototype.filter||(Array.prototype.filter=function(t){var e,n=w(this),i=n.length>>>0,r=[],o=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");for(var a=0;i>a;a++)a in n&&(e=n[a],t.call(o,e,a,n)&&r.push(e));return r}),// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
Array.prototype.every||(Array.prototype.every=function(t){var e=w(this),n=e.length>>>0,i=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");for(var r=0;n>r;r++)if(r in e&&!t.call(i,e[r],r,e))return!1;return!0}),// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
Array.prototype.some||(Array.prototype.some=function(t){var e=w(this),n=e.length>>>0,i=arguments[1];// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");for(var r=0;n>r;r++)if(r in e&&t.call(i,e[r],r,e))return!0;return!1}),// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
Array.prototype.reduce||(Array.prototype.reduce=function(t){var e=w(this),n=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");// no value to return if no initial value and an empty array
if(!n&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var i,r=0;if(arguments.length>=2)i=arguments[1];else for(;;){if(r in e){i=e[r++];break}// if array contains no values, no initial value to return
if(++r>=n)throw new TypeError("reduce of empty array with no initial value")}for(;n>r;r++)r in e&&(i=t.call(void 0,i,e[r],r,e));return i}),// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var e=w(this),n=e.length>>>0;// If no callback function or if callback is not a callable function
if("[object Function]"!=u(t))throw new TypeError(t+" is not a function");// no value to return if no initial value, empty array
if(!n&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var i,r=n-1;if(arguments.length>=2)i=arguments[1];else for(;;){if(r in e){i=e[r--];break}// if array contains no values, no initial value to return
if(--r<0)throw new TypeError("reduceRight of empty array with no initial value")}do r in this&&(i=t.call(void 0,i,e[r],r,e));while(r--);return i}),// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
Array.prototype.indexOf||(Array.prototype.indexOf=function(t){var e=w(this),n=e.length>>>0;if(!n)return-1;var i=0;for(arguments.length>1&&(i=v(arguments[1])),// handle negative indices
i=i>=0?i:Math.max(0,n+i);n>i;i++)if(i in e&&e[i]===t)return i;return-1}),// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(t){var e=w(this),n=e.length>>>0;if(!n)return-1;var i=n-1;for(arguments.length>1&&(i=Math.min(i,v(arguments[1]))),// handle negative indices
i=i>=0?i:n-Math.abs(i);i>=0;i--)if(i in e&&t===e[i])return i;return-1}),!Object.keys){// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var l=!0,p=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],h=p.length;for(var d in{toString:null})l=!1;Object.keys=function E(t){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.keys called on a non-object");var E=[];for(var e in t)f(t,e)&&E.push(e);if(l)for(var n=0,i=h;i>n;n++){var r=p[n];f(t,r)&&E.push(r)}return E}}//
// Date
// ====
//
// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
Date.prototype.toISOString&&-1!==new Date(-621987552e5).toISOString().indexOf("-000001")||(Date.prototype.toISOString=function(){var t,e,n,i;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(// the date time string format is specified in 15.9.1.15.
t=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],i=this.getUTCFullYear(),i=(0>i?"-":i>9999?"+":"")+("00000"+Math.abs(i)).slice(i>=0&&9999>=i?-4:-6),e=t.length;e--;)n=t[e],// pad months, days, hours, minutes, and seconds to have two digits.
10>n&&(t[e]="0"+n);// pad milliseconds to have three digits.
return i+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}),// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
Date.now||(Date.now=function(){return(new Date).getTime()}),// ES5 15.9.5.44
// http://es5.github.com/#x15.9.5.44
// This function provides a String representation of a Date object for use by
// JSON.stringify (15.12.3).
Date.prototype.toJSON||(Date.prototype.toJSON=function(){// When the toJSON method is called with argument key, the following
// steps are taken:
// 1.  Let O be the result of calling ToObject, giving it the this
// value as its argument.
// 2. Let tv be ToPrimitive(O, hint Number).
// 3. If tv is a Number and is not finite, return null.
// XXX
// 4. Let toISO be the result of calling the [[Get]] internal method of
// O with argument "toISOString".
// 5. If IsCallable(toISO) is false, throw a TypeError exception.
if("function"!=typeof this.toISOString)throw new TypeError("toISOString property is not callable");// 6. Return the result of calling the [[Call]] internal method of
//  toISO with O as the this value and an empty argument list.
return this.toISOString()}),// ES5 15.9.4.2
// http://es5.github.com/#x15.9.4.2
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
Date.parse&&864e13===Date.parse("+275760-09-13T00:00:00.000Z")||(// XXX global assignment won't work in embeddings that use
// an alternate object for the context.
Date=function(t){// Date.length === 7
var e=function r(e,n,i,o,a,s,c){var u=arguments.length;if(this instanceof t){var f=1==u&&String(e)===e?// isString(Y)
// We explicitly pass it through parse:
new t(r.parse(e)):// We have to manually make calls depending on argument
// length here
u>=7?new t(e,n,i,o,a,s,c):u>=6?new t(e,n,i,o,a,s):u>=5?new t(e,n,i,o,a):u>=4?new t(e,n,i,o):u>=3?new t(e,n,i):u>=2?new t(e,n):u>=1?new t(e):new t;// Prevent mixups with unfixed Date object
return f.constructor=r,f}return t.apply(this,arguments)},n=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");// Copy any custom methods a 3rd party library may have added
for(var i in t)e[i]=t[i];// Copy "native" methods explicitly; they may be non-enumerable
// Upgrade Date.parse to handle simplified ISO 8601 strings
return e.now=t.now,e.UTC=t.UTC,e.prototype=t.prototype,e.prototype.constructor=e,e.parse=function(e){var i=n.exec(e);if(i){i.shift();// kill match[0], the full match
// parse months, days, hours, minutes, seconds, and milliseconds
for(var r=1;7>r;r++)// provide default values if necessary
i[r]=+(i[r]||(3>r?1:0)),// match[1] is the month. Months are 0-11 in JavaScript
// `Date` objects, but 1-12 in ISO notation, so we
// decrement.
1==r&&i[r]--;// parse the UTC offset component
var o=+i.pop(),a=+i.pop(),s=i.pop(),c=0;if(s){// detect invalid offsets and return early
if(a>23||o>59)return 0/0;// express the provided time zone offset in minutes. The offset is
// negative for time zones west of UTC; positive otherwise.
c=6e4*(60*a+o)*("+"==s?-1:1)}// Date.UTC for years between 0 and 99 converts year to 1900 + year
// The Gregorian calendar has a 400-year cycle, so
// to Date.UTC(year + 400, .... ) - 12622780800000 == Date.UTC(year, ...),
// where 12622780800000 - number of milliseconds in Gregorian calendar 400 years
var u=+i[0];return u>=0&&99>=u?(i[0]=u+400,t.UTC.apply(this,i)+c-126227808e5):t.UTC.apply(this,i)+c}return t.parse.apply(this,arguments)},e}(Date));//
// String
// ======
//
// ES5 15.5.4.20
// http://es5.github.com/#x15.5.4.20
var g="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||g.trim()){// http://blog.stevenlevithan.com/archives/faster-trim-javascript
// http://perfectionkills.com/whitespace-deviations/
g="["+g+"]";var m=new RegExp("^"+g+g+"*"),y=new RegExp(g+g+"*$");String.prototype.trim=function(){if(void 0===this||null===this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(m,"").replace(y,"")}}//
// Util
// ======
//
// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer
var v=function(t){// isNaN
return t=+t,t!==t?t=0:0!==t&&t!==1/0&&t!==-(1/0)&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t},b="a"!="a"[0],w=function(t){if(null==t)// this matches both null and undefined
throw new TypeError("can't convert "+t+" to object");// If the implementation doesn't support by-index access of
// string characters (ex. IE < 9), split the string
// If the implementation doesn't support by-index access of
// string characters (ex. IE < 9), split the string
return b&&"string"==typeof t&&t?t.split(""):Object(t)}}),/*! Flight v1.1.4 | (c) Twitter, Inc. | MIT License */
function(t,e){function n(){var t,e,n=Array.prototype.slice.call(arguments),i=[];"string"==typeof n[0]&&(t=n.shift()),a(n[0])&&(i=n.shift()),e=n.shift(),r[t]=[i,e]}function i(t){function e(e){var n=t.split("/"),i=e.split("/"),r=!1;for(n.pop();".."==i[0]&&n.length;)n.pop(),i.shift(),r=!0;return"."==i[0]&&(i.shift(),r=!0),r&&(i=n.concat(i)),i.join("/")}var n,a,c;return"undefined"==typeof o[t]&&(n=r[t],n&&(c=n[0],a=n[1],o[t]=a.apply(void 0,s(c,function(t){return i(e(t))})))),o[t]}var r={},o={},a=Array.isArray||function(t){return t.constructor==Array},s=Array.map||function(t,e,n){for(var i=0,r=t.length,o=[];r>i;i++)o.push(e.call(n,t[i]));return o};// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/utils",[],function(){var t=[],n=100,i={isDomObj:function(t){return!(!t.nodeType&&t!==window)},toArray:function(e,n){return t.slice.call(e,n)},merge:function(){for(// unpacking arguments by hand benchmarked faster
var t=arguments.length,n=0,i=new Array(t+1);t>n;n++)i[n+1]=arguments[n];//start with empty object so a copy is created
//jquery extend requires deep copy as first arg
return 0===t?{}:(i[0]={},i[i.length-1]===!0&&(i.pop(),i.unshift(!0)),e.extend.apply(void 0,i))},push:function(t,e,n){return t&&Object.keys(e||{}).forEach(function(i){if(t[i]&&n)throw new Error('utils.push attempted to overwrite "'+i+'" while running in protected mode');"object"==typeof t[i]&&"object"==typeof e[i]?// recurse
this.push(t[i],e[i]):// no protect, so extra wins
t[i]=e[i]},this),t},isEnumerable:function(t,e){return Object.keys(t).indexOf(e)>-1},compose:function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},uniqueArray:function(t){for(var e={},n=[],i=0,r=t.length;r>i;++i)e.hasOwnProperty(t[i])||(n.push(t[i]),e[t[i]]=1);return n},debounce:function(t,e,i){"number"!=typeof e&&(e=n);var r,o;return function(){var n=this,a=arguments,s=function(){r=null,i||(o=t.apply(n,a))},c=i&&!r;return clearTimeout(r),r=setTimeout(s,e),c&&(o=t.apply(n,a)),o}},throttle:function(t,e){"number"!=typeof e&&(e=n);var i,r,o,a,s,c,u=this.debounce(function(){s=a=!1},e);return function(){i=this,r=arguments;var n=function(){o=null,s&&(c=t.apply(i,r)),u()};return o||(o=setTimeout(n,e)),a?s=!0:(a=!0,c=t.apply(i,r)),u(),c}},countThen:function(t,e){return function(){return--t?void 0:e.apply(this,arguments)}},delegate:function(t){return function(n,i){var r,o=e(n.target);Object.keys(t).forEach(function(e){return!n.isPropagationStopped()&&(r=o.closest(e)).length?(i=i||{},i.el=r[0],t[e].apply(this,[n,i])):void 0},this)}},once:function(t){var e,n;return function(){return e?n:(e=!0,n=t.apply(this,arguments))}}};return i}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/debug",[],function(){// ==========================================
// Search object model
// ==========================================
function t(e,n,i){i=i||{};var r=i.obj||window,o=i.path||(r==window?"window":""),a=Object.keys(r);a.forEach(function(i){(d[e]||e)(n,r,i)&&console.log([o,".",i].join(""),"->",["(",typeof r[i],")"].join(""),r[i]),"[object Object]"==Object.prototype.toString.call(r[i])&&r[i]!=r&&-1==o.split(".").indexOf(i)&&t(e,n,{obj:r[i],path:[o,i].join(".")})})}function e(e,n,i,r){n&&typeof i!=n?console.error([i,"must be",n].join(" ")):t(e,i,r)}function n(t,n){e("name","string",t,n)}function i(t,n){e("nameContains","string",t,n)}function r(t,n){e("type","function",t,n)}function o(t,n){e("value",null,t,n)}function a(t,n){e("valueCoerced",null,t,n)}function s(e,n){t(e,null,n)}function c(){var t=[].slice.call(arguments);m.eventNames.length||(m.eventNames=g),m.actions=t.length?t:g,p()}function u(){var t=[].slice.call(arguments);m.actions.length||(m.actions=g),m.eventNames=t.length?t:g,p()}function f(){m.actions=[],m.eventNames=[],p()}function l(){m.actions=g,m.eventNames=g,p()}function p(){try{window.localStorage&&(localStorage.setItem("logFilter_eventNames",m.eventNames),localStorage.setItem("logFilter_actions",m.actions))}catch(t){}}function h(){var t,e;try{t=window.localStorage&&localStorage.getItem("logFilter_eventNames"),e=window.localStorage&&localStorage.getItem("logFilter_actions")}catch(n){return}t&&(m.eventNames=t),e&&(m.actions=e),// reconstitute arrays in place
Object.keys(m).forEach(function(t){var e=m[t];"string"==typeof e&&e!==g&&(m[t]=e?e.split(","):[])})}var d={name:function(t,e,n){return t==n},nameContains:function(t,e,n){return n.indexOf(t)>-1},type:function(t,e,n){return e[n]instanceof t},value:function(t,e,n){return e[n]===t},valueCoerced:function(t,e,n){return e[n]==t}},g="all",m={eventNames:[],actions:[]};return{enable:function(t){this.enabled=!!t,t&&window.console&&(console.info("Booting in DEBUG mode"),console.info("You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()")),h(),window.DEBUG=this},find:{byName:n,byNameContains:i,byType:r,byValue:o,byValueCoerced:a,custom:s},events:{logFilter:m,logByAction:c,logByName:u,logAll:l,logNone:f}}}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/compose",["./utils","./debug"],function(t,e){function n(t,e){if(o){var n=Object.create(null);Object.keys(t).forEach(function(i){if(a.indexOf(i)<0){var r=Object.getOwnPropertyDescriptor(t,i);r.writable=e,n[i]=r}}),Object.defineProperties(t,n)}}function i(t,e,n){var i;return o&&t.hasOwnProperty(e)?(i=Object.getOwnPropertyDescriptor(t,e).writable,Object.defineProperty(t,e,{writable:!0}),n.call(t),void Object.defineProperty(t,e,{writable:i})):void n.call(t)}function r(t,e){t.mixedIn=t.hasOwnProperty("mixedIn")?t.mixedIn:[];for(var i=0;i<e.length;i++)-1==t.mixedIn.indexOf(e[i])&&(n(t,!1),e[i].call(t),t.mixedIn.push(e[i]));n(t,!0)}//enumerables are shims - getOwnPropertyDescriptor shim doesn't work
var o=e.enabled&&!t.isEnumerable(Object,"getOwnPropertyDescriptor"),a=["mixedIn"];if(o)//IE8 getOwnPropertyDescriptor is built-in but throws exeption on non DOM objects
try{Object.getOwnPropertyDescriptor(Object,"keys")}catch(s){o=!1}return{mixin:r,unlockProperty:i}}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/advice",["./compose"],function(t){var e={around:function(t,e){return function(){// unpacking arguments by hand benchmarked faster
var n=0,i=arguments.length,r=new Array(i+1);for(r[0]=t.bind(this);i>n;n++)r[n+1]=arguments[n];return e.apply(this,r)}},before:function(t,e){var n="function"==typeof e?e:e.obj[e.fnName];return function(){return n.apply(this,arguments),t.apply(this,arguments)}},after:function(t,e){var n="function"==typeof e?e:e.obj[e.fnName];return function(){var e=(t.unbound||t).apply(this,arguments);return n.apply(this,arguments),e}},withAdvice:function(){["before","after","around"].forEach(function(n){this[n]=function(i,r){t.unlockProperty(this,i,function(){return this[i]="function"==typeof this[i]?e[n](this[i],r):r,this[i]})}},this)}};return e}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/registry",[],function(){function t(t,e){var n,i,r,o=e.length;return"function"==typeof e[o-1]&&(o-=1,r=e[o]),"object"==typeof e[o-1]&&(o-=1),2==o?(n=e[0],i=e[1]):(n=t.node,i=e[0]),{element:n,type:i,callback:r}}function e(t,e){return t.element==e.element&&t.type==e.type&&(null==e.callback||t.callback==e.callback)}function n(){function n(t){this.component=t,this.attachedTo=[],this.instances={},this.addInstance=function(t){var e=new i(t);return this.instances[t.identity]=e,this.attachedTo.push(t.node),e},this.removeInstance=function(t){delete this.instances[t.identity];var e=this.attachedTo.indexOf(t.node);e>-1&&this.attachedTo.splice(e,1),Object.keys(this.instances).length||//if I hold no more instances remove me from registry
r.removeComponentInfo(this)},this.isAttachedTo=function(t){return this.attachedTo.indexOf(t)>-1}}function i(t){this.instance=t,this.events=[],this.addBind=function(t){this.events.push(t),r.events.push(t)},this.removeBind=function(t){for(var n,i=0;n=this.events[i];i++)e(n,t)&&this.events.splice(i,1)}}var r=this;(this.reset=function(){this.components=[],this.allInstances={},this.events=[]}).call(this),this.addInstance=function(t){var e=this.findComponentInfo(t);e||(e=new n(t.constructor),this.components.push(e));var i=e.addInstance(t);return this.allInstances[t.identity]=i,e},this.removeInstance=function(t){var e=(this.findInstanceInfo(t),this.findComponentInfo(t));e&&e.removeInstance(t),//remove from registry
delete this.allInstances[t.identity]},this.removeComponentInfo=function(t){var e=this.components.indexOf(t);e>-1&&this.components.splice(e,1)},this.findComponentInfo=function(t){for(var e,n=t.attachTo?t:t.constructor,i=0;e=this.components[i];i++)if(e.component===n)return e;return null},this.findInstanceInfo=function(t){return this.allInstances[t.identity]||null},this.getBoundEventNames=function(t){return this.findInstanceInfo(t).events.map(function(t){return t.type})},this.findInstanceInfoByNode=function(t){var e=[];return Object.keys(this.allInstances).forEach(function(n){var i=this.allInstances[n];i.instance.node===t&&e.push(i)},this),e},this.on=function(e){for(var n,i=r.findInstanceInfo(this),o=arguments.length,a=1,s=new Array(o-1);o>a;a++)s[a-1]=arguments[a];if(i){n=e.apply(null,s),n&&(s[s.length-1]=n);var c=t(this,s);i.addBind(c)}},this.off=function(){var n=t(this,arguments),i=r.findInstanceInfo(this);i&&i.removeBind(n);//remove from global event registry
for(var o,a=0;o=r.events[a];a++)e(o,n)&&r.events.splice(a,1)},// debug tools may want to add advice to trigger
r.trigger=function(){},this.teardown=function(){r.removeInstance(this)},this.withRegistration=function(){this.after("initialize",function(){r.addInstance(this)}),this.around("on",r.on),this.after("off",r.off),//debug tools may want to add advice to trigger
window.DEBUG&&DEBUG.enabled&&this.after("trigger",r.trigger),this.after("teardown",{obj:r,fnName:"teardown"})}}return new n}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/base",["./utils","./registry","./debug"],function(t,n,i){function r(t){t.events.slice().forEach(function(t){var e=[t.type];t.element&&e.unshift(t.element),"function"==typeof t.callback&&e.push(t.callback),this.off.apply(this,e)},t.instance)}function o(t,e){try{window.postMessage(e,"*")}catch(n){throw console.log("unserializable data for event",t,":",e),new Error(["The event",t,"on component",this.toString(),"was triggered with non-serializable data"].join(" "))}}function a(t){return function(n,i){e(n.target).trigger(t,i)}}function s(){// delegate trigger, bind and unbind to an element
// if $element not supplied, use component's node
// other arguments are passed on
// event can be either a string specifying the type
// of the event, or a hash specifying both the type
// and a default function to be called.
this.trigger=function(){var t,n,r,a,s,c=arguments.length-1,u=arguments[c];return"string"==typeof u||u&&u.defaultBehavior||(c--,r=u),1==c?(t=e(arguments[0]),a=arguments[1]):(t=this.$node,a=arguments[0]),a.defaultBehavior&&(s=a.defaultBehavior,a=e.Event(a.type)),n=a.type||a,i.enabled&&window.postMessage&&o.call(this,n,r),"object"==typeof this.attr.eventData&&(r=e.extend(!0,{},this.attr.eventData,r)),t.trigger(a||n,r),s&&!a.isDefaultPrevented()&&(this[s]||s).call(this),t},this.on=function(){var n,i,r,o,s=arguments.length-1,c=arguments[s];if(//delegate callback
o="object"==typeof c?t.delegate(this.resolveDelegateRules(c)):"string"==typeof c?a(c):c,2==s?(n=e(arguments[0]),i=arguments[1]):(n=this.$node,i=arguments[0]),"function"!=typeof o&&"object"!=typeof o)throw new Error('Unable to bind to "'+i+'" because the given callback is not a function or an object');// store every bound version of the callback
return r=o.bind(this),r.target=o,r.context=this,n.on(i,r),o.bound||(o.bound=[]),o.bound.push(r),r},this.off=function(){var t,n,i,r=arguments.length-1;if("function"==typeof arguments[r]&&(i=arguments[r],r-=1),1==r?(t=e(arguments[0]),n=arguments[1]):(t=this.$node,n=arguments[0]),i){//this callback may be the original function or a bound version
var o=i.target?i.target.bound:i.bound||[];//set callback to version bound against this instance
o&&o.some(function(t,e,n){return t.context&&this.identity==t.context.identity?(n.splice(e,1),i=t,!0):void 0},this)}return t.off(n,i)},this.resolveDelegateRules=function(t){var e={};return Object.keys(t).forEach(function(n){if(!(n in this.attr))throw new Error('Component "'+this.toString()+'" wants to listen on "'+n+'" but no such attribute was defined.');e[this.attr[n]]="string"==typeof t[n]?a(t[n]):t[n]},this),e},this.defaultAttrs=function(e){t.push(this.defaults,e,!0)||(this.defaults=e)},this.select=function(t){return this.$node.find(this.attr[t])},this.initialize=function(t,n){if(n||(n={}),//only assign identity if there isn't one (initialize can be called multiple times)
this.identity||(this.identity=c++),!t)throw new Error("Component needs a node");t.jquery?(this.node=t[0],this.$node=t):(this.node=t,this.$node=e(t));// merge defaults with supplied options
// put options in attr.__proto__ to avoid merge overhead
var i=Object.create(n);for(var r in this.defaults)n.hasOwnProperty(r)||(i[r]=this.defaults[r]);return this.attr=i,Object.keys(this.defaults||{}).forEach(function(t){if(null===this.defaults[t]&&null===this.attr[t])throw new Error('Required attribute "'+t+'" not specified in attachTo for component "'+this.toString()+'".')},this),this},this.teardown=function(){r(n.findInstanceInfo(this))}}// common mixin allocates basic functionality - used by all component prototypes
// callback context is bound to component
var c=0;return s}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/logger",["./utils"],function(t){function e(t){var e=t.tagName?t.tagName.toLowerCase():t.toString(),n=t.className?"."+t.className:"",i=e+n;return t.tagName?["'","'"].join(i):i}function n(t,n,i){if(window.DEBUG&&window.DEBUG.enabled){var o,a,s,c,u,f,l,p,h,d;"function"==typeof i[i.length-1]&&(c=i.pop(),c=c.unbound||c),1==i.length?(s=n.$node[0],a=i[0]):2!=i.length||"object"!=typeof i[1]||i[1].type?(//2+ args, first arg is elem
s=i[0],a=i[1],"trigger"==t&&(u=i[2])):(//2 args, first arg is not elem
s=n.$node[0],a=i[0],"trigger"==t&&(u=i[1])),o="object"==typeof a?a.type:a,f=DEBUG.events.logFilter,// no regex for you, actions...
p="all"==f.actions||f.actions.indexOf(t)>-1,// event name filter allow wildcards or regex...
l=function(t){return t.test?t:new RegExp("^"+t.replace(/\*/g,".*")+"$")},h="all"==f.eventNames||f.eventNames.some(function(t){return l(t).test(o)}),p&&h&&(d=[r[t],t,"["+o+"]"],u&&d.push(u),d.push(e(s)),d.push(n.constructor.describe.split(" ").slice(0,3).join(" ")),console.groupCollapsed&&"trigger"==t&&console.groupCollapsed(t,o),console.info.apply(console,d))}}function i(){this.before("trigger",function(){n("trigger",this,t.toArray(arguments))}),console.groupCollapsed&&this.after("trigger",function(){console.groupEnd()}),this.before("on",function(){n("on",this,t.toArray(arguments))}),this.before("off",function(){n("off",this,t.toArray(arguments))})}var r={on:"<-",trigger:"->",off:"x "};return i}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/component",["./advice","./utils","./compose","./base","./registry","./logger","./debug"],function(t,n,i,r,o,a,s){// teardown for all instances of this constructor
function c(){var t=o.findComponentInfo(this);t&&Object.keys(t.instances).forEach(function(e){var n=t.instances[e];// It's possible that a previous teardown caused another component to teardown,
// so we can't assume that the instances object is as it was.
n&&n.instance&&n.instance.teardown()})}function u(t){for(var i=arguments.length,r=new Array(i-1),a=1;i>a;a++)r[a-1]=arguments[a];if(!t)throw new Error("Component needs to be attachTo'd a jQuery object, native node or selector string");var s=n.merge.apply(n,r),c=o.findComponentInfo(this);e(t).each(function(t,e){c&&c.isAttachedTo(e)||(new this).initialize(e,s)}.bind(this))}function f(){//could be called from constructor or constructor.prototype
var t=this.mixedIn||this.prototype.mixedIn||[];return t.map(function(t){if(null==t.name){// function name property not supported by this browser, use regex
var e=t.toString().match(p);return e&&e[1]?e[1]:""}return"withBase"!=t.name?t.name:""}).filter(Boolean).join(", ")}// define the constructor for a custom component type
// takes an unlimited number of mixin functions as arguments
// typical api call with 3 mixins: define(timeline, withTweetCapability, withScrollCapability);
function l(){for(var e=arguments.length,n=new Array(e),p=0;e>p;p++)n[p]=arguments[p];var h=function(){};// 'options' is optional hash to be merged with 'defaults' in the component definition
// enables extension of existing "base" Components
// prepend common mixins to supplied list, then mixin all flavors
return h.toString=h.prototype.toString=f,s.enabled&&(h.describe=h.prototype.describe=h.toString()),h.attachTo=u,h.mixin=function(){var t=l(),e=Object.create(h.prototype);return e.mixedIn=[].concat(h.prototype.mixedIn),i.mixin(e,arguments),t.prototype=e,t.prototype.constructor=t,t},h.teardownAll=c,s.enabled&&n.unshift(a),n.unshift(r,t.withAdvice,o.withRegistration),i.mixin(h.prototype,n),h}var p=/function (.*?)\s?\(/;return l.teardownAll=function(){o.components.slice().forEach(function(t){t.component.teardownAll()}),o.reset()},l}),// ==========================================
// Copyright 2013 Twitter, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
n("lib/index",["./advice","./component","./compose","./logger","./registry","./utils"],function(t,e,n,i,r,o){return{advice:t,component:e,compose:n,logger:i,registry:r,utils:o}}),t.flight=i("lib/index")}(this,jQuery),function(t,e){// GAZ is defined in gazebo.js is loaded very early on so
// it will not break the original code.
// gazebo.js is only included in the customer facing pages
// while this file is included everywhere.
// You can expect the following function to be accessible
// anytime unless your JS file is included before this file.
var n=t.GAZ||{};/**
   * Html escaping from hogan.js
   */
n.hoganEscape=function(t){var e=/&/g,n=/</g,i=/>/g,r=/\'/g,o=/\"/g,a=/[&<>\"\']/;return t=String(null===t||void 0===t?"":t),a.test(t)?t.replace(e,"&amp;").replace(n,"&lt;").replace(i,"&gt;").replace(r,"&#39;").replace(o,"&quot;"):t},n.loadDrupalSettings=function(){var t=e("#drupal-settings");if(t.length>0){var n=e.parseJSON(t.html());jQuery.extend(Drupal.settings,n)}},n.initializePrintButton=function(){e(".btn-print").click(function(e){e.preventDefault(),t.print()})},//Get a parameter value from the URL
n.getUrlQueryParamValue=function(e){var n,i,r=t.location.search.substring(1),o=r.split("&");for(n=0;n<o.length;n++)if(i=o[n].split("="),i[0]==e)return i[1];return!1},// moved here from init so Drupal.settings are available during page load
n.loadDrupalSettings(),e(document).ready(function(){n.initializePrintButton()}),t.GAZ=n}(window,jQuery),function(t){var e=flight.component(function(){this.defaultAttrs({buttonSelector:".Dropdown-button",listSelector:".Dropdown-list",toggleClass:"is-open"}),this.isActive=function(t){return t.hasClass(this.attr.toggleClass)},this.toggle=function(e){this.isActive(this.$node)?this.$node.removeClass(this.attr.toggleClass):this.$node.addClass(this.attr.toggleClass),t(e.target).focus(),e.preventDefault()},this.keydown=function(t){var e,n=!1,i=0;/(38|40|27)/.test(t.keyCode)&&(t.preventDefault(),// Get all elements within the list
e=this.select("listSelector").find("a"),0!==e.length&&(n=this.isActive(this.$node),(!n||n&&27==t.keyCode)&&this.$node.removeClass(this.attr.toggleClass),i=e.index(e.filter(":focus")),// If the user press on the up key then decrement the current position
// of the cursor unless the currentPosition is at 0
38===t.keyCode&&(i>0?i--:i=e.length-1),// If the user press on the down key then increment the current position
// of the cursor unless the current position is the last element
40===t.keyCode&&(i<e.length-1?i++:i=0),e.eq(i).focus()))},this.exit=function(e){t(e.target).closest(this.node).length||this.$node.removeClass(this.attr.toggleClass)},this.after("initialize",function(){this.on(this.attr.buttonSelector,"click",this.toggle),this.on("keydown",this.keydown),this.on(t(document),"click",this.exit),this.$node.attr("data-dropdown-init","true")})});window.Dropdown=e}(jQuery),function(){var t=flight.component(function(){this.defaultAttrs({tooltipAttr:"data-tooltip-init"}),this.toggle=function(t){var e=t.css("transition-delay");// if transitionDelay returns undefined
// then the browser doesn't support transition
// (tested on Chrome, Firefox, Safari, IE8 and IE9)
e||(t.css("opacity","0"),t.delay(1e3).animate({opacity:"1"},200))},this.center=function(t){var e=t.outerWidth();t.css({left:"50%","margin-left":"-"+e/2+"px","margin-right":"auto"})},this.after("initialize",function(){var t=this;this.$node.prev().on("focus mouseover",function(){t.center(t.$node),t.toggle(t.$node)}),this.$node.attr("data-tooltip-init","true")})});window.Tooltip=t}(jQuery),function(t,e){/*
    Transport mechanism for sending log data to an API endpoint.

    Options:
    * useAjax - Defaults to true, if false, the scribe API will be called using an <img> tag GET request
    * sync - If AJAX is enabled, the scribe API will be called with a synchronous AJAX request. Defaults to false.
    * bufferEvents - Scribe events will be buffered, reducing the number of scribe API calls. Defaults to true for
                     browsers that support sessionStorage. Will be set to false if bufferSize is 0.
    * bufferSize - The multiple of 2083 characters to store in the scribe buffer
    * bufferKey - specify a sessionStorage key for your buffered scribe events, defaults to SESSION_BUFFER_KEY
    * url - The scribe API url to send scribe events to. If not set, it will use the default endpoint SCRIBE_API_ENDPOINT.
    * debug - Enable debugging of scribe events in the scribe console.
    * flushOnUnload - Flush the scribe buffer when the page unloads. Defaults to true.
    * metrics - Enable recording of scribe reliability metrics. Used only on twitter.com.
    * encodeParameters - an optional function used to map the scribe event data into a request parameter hash
  */
function n(t){this.SESSION_BUFFER_KEY="ScribeTransport",this.SCRIBE_API_ENDPOINT="/i/jot",// initialize operating settings for ScribeTransport
this.options={},t&&(this.updateOptions(t),this.registerEventHandlers(t))}function i(n){// default global scribe data
this.scribeContext={},this.scribeData={},/**
     * Records a client_event (see http://go/scribe)
     * @param object a hash of event_name terms, see http://go/clienteventnamespace for details.
     * @param object the data sent with the client_event
     */
this.scribe=function(i,r){var o=n||t.scribeTransport;if(!o)throw new Error("You must create a global scribeTransport variable or pass one into this constructor.");if(!i||"object"!=typeof i||r&&"object"!=typeof r)throw new Error("Invalid terms or data hash argument when calling ClientEvent.scribe().");// Build up context
if(this.scribeContext){var a="function"==typeof this.scribeContext?this.scribeContext():this.scribeContext;i=e.extend({},a,i)}// properly snake-case
for(var s in i)i[s]=i[s]&&(""+i[s]).toLowerCase().replace(/_?[^a-z0-9_]+_?/g,"_");o.options.debug&&e.each(["client","action"],function(t,e){if(!i[e])throw new Error("You must specify a "+e+" term in your client_event.")});//  Build up data
var r=e.extend({},r);if(this.scribeData){var c="function"==typeof this.scribeData?this.scribeData():this.scribeData;r=e.extend({},c,r)}r.event_namespace=i,r.triggered_on=r.triggered_on||+new Date,r.format_version=r.format_version||2,o.send(r,"client_event")}}function r(n,i){this.experiments=n||{},// cached list of impressions to prevent re-scribing of DDG impressions
this.impressions={},// private method that should not be called directly
this.scribeExperiment=function(n,r,o){//  Build up context
var a=e.extend({page:"ddg",section:n.experiment_key,component:"",element:""},r);o=o||{},o.experiment_key=n.experiment_key,o.bucket=n.bucket,o.version=n.version,(i||t.clientEvent).scribe(a,o)},/**
     * Records a client_event for usage by Duck Duck Goose, the A/B testing platform (see http://go/ddg)
     * @param String the experiment name or alias impression being logged
     */
this.impression=function(t){var e=this.experiments[t],n="web";e&&(t=e.experiment_key,this.impressions[t]||(e.client_name&&(n=e.client_name),this.scribeExperiment(e,{client:n,action:"experiment"}),this.impressions[t]=!0))},/**
     * Scribes a custom tracked event for Duck Duck Goose, the A/B testing platform (see http://go/ddg). Custom events are events
     * that are only recorded for the purpose of an experiment. For more general events, you should scribe a client_event and
     * track the client_event in the DDG interface.
     * @param String the experiment name or alias impression being logged
     * @param String the name of the event being tracked
     */
this.track=function(t,e,n){if(!e)throw new Error("You must specify an event name to track custom DDG events. Event names should be lower-case, snake_cased strings.");var i=this.experiments[t];i&&this.scribeExperiment(i,{element:e,action:"track"},n)},/**
     * Returns the current bucket that the user is in. If the user isn't in the experiment, returns an empty string.
     * @param String the experiment name or alias that the user is bucketed in
     */
this.bucket=function(t){var e=this.experiments[t];return e?e.bucket:""}}n.prototype={flush:function(t,n){if(t&&t.length){if(// if no sync flag passed in, use options value if set
void 0===n&&(n=!!this.options.sync),this.options.useAjax){// use xhr POST to send request
var i={url:this.options.url,data:e.extend(this.ajaxParams(t),this.options.requestParameters),type:"POST",dataType:"json",async:!n,headers:{"X-Twitter-Polling":!0}};this.options.debug&&(this.options.debugHandler&&(i.success=this.options.debugHandler),i.data.debug="1"),e.ajax(i)}else{var r=this.options.debug?"&debug=1":"";(new Image).src=this.options.url+"?q="+(+new Date).toString().slice(-4)+r+"&"+this.imageParams(t)}this.reset()}},ajaxParams:function(t){if("string"==typeof t)return{log:"["+t+"]"};var e=this.options.encodeParameters;return e&&"function"==typeof e?e.apply(this,arguments):{log:JSON.stringify(t)}},imageParams:function(t){if("string"==typeof t)return"log=%5B"+t+"%5D";var e=this.options.encodeParameters;return e&&"function"==typeof e?e.apply(this,arguments):"log="+encodeURIComponent(JSON.stringify(t))},reset:function(){this.options.bufferEvents&&(this.skipUnloadFlush=!1,sessionStorage.removeItem(this.options.bufferKey))},getBuffer:function(){return sessionStorage.getItem(this.options.bufferKey)||""},logWithStorageException:function(t,e){var n={category:"client_scribe_storage_error",error:t.message,url:document.location.href,product_name:"swift",event_name:"storage_quota_exceeded",type:"js_error"};this.addCategoryField(n,n.category),this.flush(this.appendData(e,this.encodeEventData(n)))},storeData:function(t,e){try{sessionStorage.setItem(t,e)}catch(n){if("QuotaExceededError"!==n.name&&// IE10+, W3C standard, newer WebKit
"QuotaExceededError"!==n.message&&// IE9
"NS_ERROR_DOM_QUOTA_REACHED"!==n.name&&// Firefox
"QUOTA_EXCEEDED_ERR"!==n.name&&// Older WebKit. Unclear if sessionStorage ever has limits, though.
-2147024882!==n.number)throw n;// IE8
this.logWithStorageException(n,e)}},encodeEventData:function(t){var e=JSON.stringify(t);return this.options.useAjax||(e=encodeURIComponent(e)),e},appendData:function(t,e){return t+(t?this.SEPARATOR+e:e)},addToBuffer:function(t){var e=this.getBuffer(),n=this.encodeEventData(t),i=this.appendData(e,n);this.options.bufferSize&&this.fullBuffer(i)?this.options.useAjax?this.flush(i):(this.flush(e),this.storeData(this.options.bufferKey,n)):this.storeData(this.options.bufferKey,i)},addCategoryField:function(t,e){// specially encode Scribe category so it doesn't override a normal category field
t._category_=e},send:function(t,n,i){// if missing category, data, or client-side scribe is darkmoded, don't enqueue
!n||!t||this.options.bufferSize<0||(this.addCategoryField(t,n),!i&&this.options.bufferEvents&&this.options.bufferSize?this.addToBuffer(t):this.flush([t],i),// Send to Scribe Console
this.options.debug&&e(document).trigger("scribedata."+this.options.bufferKey,t),// event triggered every time a scribe event is enqueued, used for debugging purposes
this.options.metrics&&"debug"!=t.event_info&&e(document).trigger("debugscribe",t))},fullBuffer:function(t){// keep buffer sizes relative to the max IE URL
return t.length>=(this.options.useAjax?2083*this.options.bufferSize:2050-this.options.url.length)},updateOptions:function(n){// perform feature detection on sessionStorage. Using a
// try/catch to preserve testability in jasmine using file:// urls.
if(this.options=e.extend({},this.options,n),this.options.requestParameters||(this.options.requestParameters={}),void 0===this.options.flushOnUnload&&(this.options.flushOnUnload=!0),this.options.bufferKey||(this.options.bufferKey=this.SESSION_BUFFER_KEY),// if zero length buffer size, don't use the buffer
0===this.options.bufferSize&&(this.options.bufferEvents=!1),void 0===this.options.useAjax&&(this.options.useAjax=!0),this.options.bufferEvents||void 0==this.options.bufferEvents)try{sessionStorage.setItem(this.SESSION_BUFFER_KEY+".init","test");var i="test"==sessionStorage.getItem(this.SESSION_BUFFER_KEY+".init");sessionStorage.removeItem(this.SESSION_BUFFER_KEY+".init"),this.options.bufferEvents=i}catch(r){this.options.bufferEvents=!1}// set default debug handler if debug option set
if(this.options.debug&&!this.options.debugHandler){var o=this;this.options.debugHandler=n.debugHandler||function(t){e(document).trigger("handlescribe."+o.options.bufferKey,t)}}var a="https:"===t.location.protocol?"https:":"http:";this.options.url=void 0===this.options.url?this.options.useAjax?this.SCRIBE_API_ENDPOINT:"https://twitter.com"+this.SCRIBE_API_ENDPOINT:this.options.url.replace(/^[a-z]+:/g,a).replace(/\/$/,""),//default buffer size of 20
this.options.bufferEvents&&void 0===this.options.bufferSize&&(this.options.bufferSize=20)},// added to enable unit testing
appHost:function(){return t.location.host},registerEventHandlers:function(){var n=this,i=e(document);if(this.options.bufferEvents&&(i.on("flushscribe."+n.options.bufferKey,function(){n.flush(n.getBuffer(),!0)}),this.options.flushOnUnload)){var r=function(e){n.skipUnloadFlush=!e||!e.match(/http/)||!!e.match(new RegExp("^https?://"+n.appHost(),"gi")),n.skipUnloadFlush&&// need to unset skip flag since link could not
t.setTimeout(function(){n.skipUnloadFlush=!1},3e3)};i.on("mouseup."+this.options.bufferKey,"a",function(t){this.getAttribute("target")||t.button||t.metaKey||t.shiftKey||t.altKey||t.ctrlKey||r(this.getAttribute("href"))}),i.on("submit."+this.options.bufferKey,"form",function(){r(this.getAttribute("action"))}),// move this out and into swift on the monorail
i.on("uiNavigate."+this.options.bufferKey,function(t,e){r(e.url)}),e(t).on("unload."+this.options.bufferKey,function(){n.skipUnloadFlush||n.flush(n.getBuffer(),!0),n.skipUnloadFlush=!1})}this.SEPARATOR=this.options.useAjax?",":encodeURIComponent(",")},destroy:function(){this.flush(this.getBuffer()),e(document).off("flushscribe."+this.options.bufferKey),e(t).off("unload."+this.options.bufferKey),e(document).off("mouseup."+this.options.bufferKey),e(document).off("submit."+this.options.bufferKey),e(document).off("uiNavigate."+this.options.bufferKey)}},t.scribeTransport=new n,t.clientEvent=new i,t.ddg=new r,t.ScribeTransport=n,t.ClientEvent=i,t.DDG=r}(window,jQuery),/*jslint indent:2, browser: true*/
/*global jQuery: false, Drupal: false, window: false*/
// ScribeTransport, ClientEvent, DDG all defined in scribelib.js
// which is always loaded before this file
function(t,e,n){"undefined"!=typeof n.ScribeTransport&&"undefined"!=typeof n.ClientEvent&&"undefined"!=typeof n.DDG&&(e.behaviors.gazebo_experiment={// this object will hold the experiments which are running for this user on this page
experiments:{},// this object will hold the associated instructions
instructions:{},//scribelib allows for sending extra data, outside of the clientEvent stuff
data:{},// this holds the mapping for our instruction type enum
typeMapping:{0:"cssAugment",1:"textReplace",3:"attributeAugment",5:"removeElement"},initialized:!1,/**
     * @param context
     * @param settings
     */
attach:function(t,e){var n;if(this.initialized)return!0;// Don't go through all this code if one of these wasn't sent, which means
// no experiments are running. If we are in an experiment with no instructions,
// settings.gazebo_experiment_instruction will be an empty array.
if(this.bindDebugClose(),!e.gazebo_experiment||!e.gazebo_experiment_instruction)return!1;this.experiments=e.gazebo_experiment,this.instructions=e.gazebo_experiment_instruction,// Sets up relevant scribelib.js objects
this.setupScribeTransport(),this.setupClientEvent(),this.setupDDG(),this.attachDrupalAjaxCommands();for(n in this.experiments)this.initExperiment(this.experiments[n],this.instructions[n]);this.initialized=!0},/**
     * Add custom Drupal.ajax commands
     */
attachDrupalAjaxCommands:function(){e.ajax.prototype.commands.gazebo_experiment_client_event_scribe=this.ajaxResponseClientEventScribe},/**
     * Custom Drupal.ajax command
     *
     * @param ajax
     * @param response
     * @param status
     */
ajaxResponseClientEventScribe:function(t,e){n.clientEvent.scribe(e.data.clientEvent,e.data.data)},setupScribeTransport:function(){this.scribeTransport=new ScribeTransport({useAjax:!1,// the scribe API will be called using an <img> tag GET request
bufferEvents:!1,// scribe events will not be buffered
flushOnUnload:!0}),n.scribeTransport=this.scribeTransport},setupClientEvent:function(){this.clientEvent=new ClientEvent(this.scribeTransport),n.clientEvent=this.clientEvent},setupDDG:function(){var t,e;this.ddg_experiments={};for(t in this.experiments)e=this.experiments[t].ddg_id,this.ddg_experiments[e]=this.experiments[t],this.ddg_experiments[e].experiment_key=this.experiments[t].ddg_id;//construct the DDG object with the experiment data added
this.ddg=new DDG(this.ddg_experiments,this.clientEvent),n.ddg=this.ddg},// Initializes each experiment by executing instructions,
// recording an impression to DDG, and attaching event handlers
// to specified selectors from the running experiment(s)
initExperiment:function(e,n){var i,r;for(i in n)r=this.typeMapping[n[i].type],this.hasOwnProperty(r)&&"function"==typeof this[r]&&this[r](n[i]);// once instructions have been executed, and the user "would have seen" the changes,
// we scribe the experiment impression
this.ddg.impression(e.ddg_id),//iterates through actions, attaching event handlers for each user action in the instruction
"undefined"!=typeof e.events.actions&&t.each(e.events.actions,function(t,e){this.initEventHandler(e)}.bind(this))},// Attaches specified event handlers to selectors specified in experiment
initEventHandler:function(t){var e=t.clientEvent,n=t.event,i=t.selector;this.actions.hasOwnProperty(n)&&"function"==typeof this.actions[n]&&this.actions[n](i,e,this.data)},textReplace:function(e){t(e.options.target).text(e.options.text)},cssAugment:function(e){t(e.options.target).css(e.options.css)},attributeAugment:function(e){t(e.options.target).attr(e.options.attributes)},removeElement:function(e){t(e.options.target).remove()},actions:{click:function(e,i,r){// we use mousedown here so as to not interfere
// with the default action of clicking this element
t(e).on("mousedown",function(){n.clientEvent.scribe(i,r)})}},bindDebugClose:function(){t("#gazebo-experiment-ddg-debug .close-debug").on("click",function(e){e.preventDefault(),t("#gazebo-experiment-ddg-debug").hide()})}})}(jQuery,Drupal,window),/*global window */
function(t,e){e.behaviors.feature_system={attach:function(t,e){this.eventTracking.init(t,e)},eventTracking:{map:null,init:function(){t(document).on("click submit",this.trackAction.bind(this))},fillMap:function(){var e,n,i,r,o,a,s,c,u;//ensures that scribeMap is only filled in once
if(!this.map)for(this.map={},// Get all elements that have their clicks scribed
i=t("[data-analytics-element]"),e=0;e<i.length;e+=1){for(r=i[e],o=t(r).data("analytics-element"),// Set up mapping for element name to various scribe terms
this.map[o]={},this.map[o].element=o,a=["page","section","component","action"],n=0;n<a.length;n+=1)s=a[n],c=t(r).closest("[data-analytics-"+s+"]"),this.map[o][s]="",//If an element has this term-specific scribe attribute, store it
c.length&&(//value which identifies
u=c.first().data("analytics-"+s),this.map[o][s]=u);//default action
""===this.map[o].action&&(this.map[o].action="click")}},trackAction:function(e,n){var n,i,r,o,a,s=[];"undefined"!=typeof TwtrAnalytics&&(o=t(e.target).closest("[data-analytics-element], .click-tracking"),o.length&&("click"===e.type?(// whether the element is a link or not
r=!!o.attr("href"),// special key is pressed (like the Cmd key)
a=e.metaKey||e.ctrlKey||e.isDefaultPrevented(),// if the button should open in a new window
a=a||"_blank"===o.attr("target"),a===!1&&r===!0&&event.preventDefault(),i=function(){var t=o.attr("href");// no callback if specialKeyPressed is true
a===!1&&r===!0&&(window.location=t)}):"submit"===e.type&&o.is("input, button, form")&&(// We can only run submit on an input, button, or form.
e.preventDefault(),i=function(){o.submit()}),n=this.trackElementFromMap(o),n!==!1&&s.push(n),n=this.trackElementFromAttribute(o),n!==!1&&(s=s.concat(n)),TwtrAnalytics.track(s,i)))},trackElementFromAttribute:function(t){var e,n,i=[];if(!t.attr("data-tracking-action"))return!1;for(e=t.attr("data-tracking-action").split(","),n=0;n<e.length;n++)i.push([t.attr("data-tracking-category"),t.attr("data-tracking-type"),e[n]]);return i},trackElementFromMap:function(t){var e,n=!1;return this.fillMap(),(e=t.data("analytics-element"))?n=[this.map[e].page,this.map[e].section,this.map[e].component,e,this.map[e].action]:n}}}}(jQuery,Drupal),/*global window */
function(t,e){var n=!1;e.behaviors.helper_eu_cookie_notice={attach:function(){return n?!0:(this.checkCookie()===!1&&this.checkLocation(),void(n=!0))},checkCookie:function(){return"1"===t.cookie("eu_cn")},setCookie:function(){t.cookie("eu_cn","1",{expires:365,path:"/",domain:"twitter.com"})},checkLocation:function(){t.ajax({type:"GET",cache:!1,url:"/i/gazebo/ajax/notice/cookies",dataType:"json",success:this.checkLocationSuccess.bind(this)})},checkLocationSuccess:function(t){// request from eu
void 0!==t.eu_cn&&t.eu_cn===!0&&this.displayNotice(t.message,t.selector),// request from outside eu
void 0!==t.eu_cn&&t.eu_cn===!1&&null!==t.country_code_alpha2&&this.setCookie()},displayNotice:function(e,n){// show the message
t(n).prepend(e),// add functionality for the 'x' close button
this.bindDismissal()},bindDismissal:function(){var e=this;t(".alert.cookie-notice").bind("closed",function(){e.dismissNotice()}),t(".Message--euCookie .close, .cookie-notice").on("click",function(){e.dismissNotice(),t(this).closest(".Message--euCookie, .cookie-notice").hide()})},dismissNotice:function(){this.setCookie()}}}(jQuery,Drupal),/*global jQuery: false, Drupal: false, window: false*/
function(t,e){e.behaviors.feature_twitter_home={/**
     * @param context
     * @param settings
     */
attach:function(){this.authenticityToken.copy()},authenticityToken:{formInputName:"authenticity_token",copyFrom:".Form--signin",copyTo:".Form--signup div",copy:function(){t(this.copyFrom+' input[name="'+this.formInputName+'"]').clone().appendTo(this.copyTo)}}}}(jQuery,Drupal,window),function(t){t(document).ready(function(){Dropdown.attachTo(".Dropdown--language,.Dropdown--user")})}(jQuery),function(t){t(document).ready(function(){Tooltip.attachTo(".DropdownItem--language .Tooltip")})}(jQuery),function(t,e){e.behaviors.easyDownloadExperiment={attach:function(){var e=t(".PageDownload--easyPhone .countrycode-select"),n=t(".PageDownload--easyPhone .input-countrycode");e.change(function(){var t=e.val();if("0"!==t){n.val(t);var i=e.children(),r=i[t],o=r.text,a=o.substring(o.indexOf("(")+1,o.length-1);e.children().first().text(a),e.val("0")}})}}}(jQuery,Drupal,window),function(){window.twttr=function(t,e,n){var i,r=t.getElementsByTagName(e)[0],o=window.twttr||{};return t.getElementById(n)?o:(i=t.createElement(e),i.id=n,i.src="https://platform.twitter.com/widgets.js",r.parentNode.insertBefore(i,r),o._e=[],o.ready=function(t){o._e.push(t)},o)}(document,"script","twitter-wjs")}();;
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('K M;I(M)1S 2U("2a\'t 4k M 4K 2g 3l 4G 4H");(6(){6 r(f,e){I(!M.1R(f))1S 3m("3s 15 4R");K a=f.1w;f=M(f.1m,t(f)+(e||""));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?"g":"")+(f.4s?"i":"")+(f.4p?"m":"")+(f.4v?"x":"")+(f.3n?"y":"")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m("2a\'t 5r 5I 5F 5B 5C 15 5E 5p");H r(f)}I(v)1S 2U("2a\'t W 3l M 59 5m 5g 5x 5i");e=e||"";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h==="[")b=M.2I;Y I(h==="]")b=M.1B;a.U(h);c++}a=15(a.1K(""),n.Q.W(e,w,""));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v="1.5.0";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`\'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,"")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,"");H!f.12}(),y=6(){K f=/x/g;n.Q.W("x",f,"");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,"g"+(E?"y":"")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+"/"+(e||"");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,"g")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,"\\\\$&")};M.5e=6(f,e,a,b){e=r(e,"g"+(b&&E?"y":""));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U("2a\'t 55 1h 54 3q")}};M.1R=6(f){H 53.Z.1q.W(f)==="[2m 15]"};M.3p=6(f,e,a,b){O(K c=r(e,"g"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,"g"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||"":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,"")>-1){a=15(J.1m,n.Q.W(t(J),"g",""));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()==="3f"&&e.1i("${")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+="";I(1j e==="6")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+"";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24"$":H"$";24"&":H d[0];24"`":H d[d.L-1].1a(0,d[d.L-2]);24"\'":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i="";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||"":"$")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+"",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,"")||h)b.U("")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H"("});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H"("});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?"\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?"":"(?:)"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]==="[]"?"\\\\b\\\\B":"[\\\\s\\\\S]"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H""});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"},M.1B,6(){H J.2K("x")});M.1h(/\\./,6(){H"[\\\\s\\\\S]"},M.1B,6(){H J.2K("s")})})();1j 2e!="1d"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=" "+b)}6 t(a){H a.1i("3e")==0?a:"3e"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={"#":"1c",".":"1l"}[b.1o(0,1)]||"3h",g,i;g=h!="3h"?b.1o(1):b.5u();I((a[h]||"").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g("4U"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e("\\n"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K("\\n")}6 u(a,b){I(a==N||a.L==0||a=="\\n")H a;a=a.Q(/</g,"&1y;");a=a.Q(/ {2,}/g,6(c){O(K d="",h=0;h<c.L-1;h++)d+=e.13.1W;H d+" "});I(b!=N)a=v(a,6(c){I(c.L==0)H"";K d="";c=c.Q(/^(&2s;| )+/,6(h){d=h;H""});I(c.L==0)H d;H d+\'<17 1g="\'+b+\'">\'+c+"</17>"});H a}6 n(a,b){a.1e("\\n");O(K c="",d=0;d<50;d++)c+="                    ";H a=v(a,6(h){I(h.1i("\\t")==-1)H h;O(K g=0;(g=h.1i("\\t"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,"")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i=="3f")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d="",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H\'<a 2h="\'+c+\'">\'+c+"</a>"+d})}6 z(){O(K a=1E.36("1k"),b=[],c=0;c<a.L;c++)a[c].3s=="20"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,".20",R);a=p(a,".3O",R);K c=1E.4i("3t");I(!(!a||!b||p(a,"3t"))){B(b.1c);r(b,"1m");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K("\\r");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,"4u",6(){c.2G.4E(c);b.1l=b.1l.Q("1m","")})}}I(1j 3F!="1d"&&1j M=="1d")M=3F("M").M;K e={2v:{"1g-27":"","2i-1s":1,"2z-1s-2t":11,1M:N,1t:N,"42-45":R,"43-22":4,1u:R,16:R,"3V-17":R,2l:11,"41-40":R,2k:11,"1z-1k":11},13:{1W:"&2s;",2M:R,46:11,44:11,34:"4n",1x:{21:"4o 1m",2P:"?",1X:"1v\\n\\n",3E:"4r\'t 4t 1D O: ",4g:"4m 4B\'t 51 O 1z-1k 4F: ",37:\'<!4T 1z 4S "-//4V//3H 4W 1.0 4Z//4Y" "1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J"><1z 4I="1Z://2y.3L.3K/4L/5L"><3J><4N 1Z-4M="5G-5M" 6K="2O/1z; 6J=6I-8" /><1t>6L 1v</1t></3J><3B 1L="25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;"><T 1L="2O-3D:3C;3w-32:1.6z;"><T 1L="25-22:6A-6E;">1v</T><T 1L="25-22:.6C;3w-6B:6R;"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h="1Z://3u.2w/1v" 1F="38" 1L="2f:#3y">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h="6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O" 1L="2f:#3y">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>\'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/"([^\\\\"\\n]|\\\\.)*"/g,6o:/\'([^\\\\\'\\n]|\\\\.)*\'/g,6p:1f M(\'"([^\\\\\\\\"]|\\\\\\\\.)*"\',"3z"),6s:1f M("\'([^\\\\\\\\\']|\\\\\\\\.)*\'","3z"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c=\'<T 1g="16">\',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+="</T>";H c},2o:6(a,b,c){H\'<2W><a 2h="#" 1g="6e 6h\'+b+" "+b+\'">\'+c+"</a></2W>"},2b:6(a){K b=a.1F,c=b.1l||"";b=B(p(b,".20",R).1c);K d=6(h){H(h=15(h+"6f(\\\\w+)").X(c))?h[1]:N}("6g");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:["21","2P"],21:{1H:6(a){I(a.V("2l")!=R)H"";K b=a.V("1t");H e.16.2o(a,"21",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q("47","")}},2P:{2B:6(){K a="68=0";a+=", 18="+(31.30-33)/2+", 32="+(31.2Z-2Y)/2+", 30=33, 2Z=2Y";a=a.Q(/^,/,"");a=1P.6Z("","38",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M("^\\\\[(?<2V>(.*?))\\\\]$"),s=1f M("(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\".*?\\"|\'.*?\')\\\\s*;?","g");(j=s.X(k))!=N;){K o=j.1T.Q(/^[\'"]|[\'"]$/g,"");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k["1z-1k"]=="R"||e.2v["1z-1k"]==R){d=1f e.4l(j);j="4O"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i("<![6G[")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i("]]\\>")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||"")!="")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||"")!="")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,"4k",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i="2F 1H 2Q".1e(" ");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={"R":R,"11":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]=="2m")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V("2i-1s"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V("1M",[]);I(1j b!="2m"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=["1s","6i"+b,"P"+a,"6r"+(b%2==0?1:2).1q()];J.3U(b)&&a.U("67");b==0&&a.U("1N");H\'<T 1g="\'+a.1K(" ")+\'">\'+c+"</T>"},3Q:6(a,b){K c="",d=a.1e("\\n").L,h=2u(J.V("2i-1s")),g=J.V("2z-1s-2t");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l="0"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e("\\n");J.V("2z-1s-2t");K d=2u(J.V("2i-1s"));a="";O(K h=J.V("1D"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(" ",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?\'<17 1g="\'+h+\' 5N">\'+j+"</17>":"")+i)}H a},4f:6(a){H a?"<4a>"+a+"</4a>":""},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+" ":""}O(K d=0,h="",g=J.V("1D",""),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+"48")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+"48");H h},1H:6(a){K b="",c=["20"],d;I(J.V("2k")==R)J.1n.16=J.1n.1u=11;1l="20";J.V("2l")==R&&c.U("47");I((1u=J.V("1u"))==11)c.U("6S");c.U(J.V("1g-27"));c.U(J.V("1D"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,"").Q(/\\r/g," ");b=J.V("43-22");I(J.V("42-45")==R)a=n(a,b);Y{O(K h="",g=0;g<b;g++)h+=" ";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,"\\n");I(e.13.44==R)b=b.Q(h,"");b=b.1e("\\n");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K("\\n")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V("41-40"))b=E(b);1j 2H!="1d"&&2H.3S&&2H.3S.1C(/5s/)&&c.U("5t");H b=\'<T 1c="\'+t(J.1c)+\'" 1g="\'+c.1K(" ")+\'">\'+(J.V("16")?e.16.1H(J):"")+\'<3Z 5z="0" 5H="0" 5J="0">\'+J.4f(J.V("1t"))+"<3T><3P>"+(1u?\'<2d 1g="1u">\'+J.3Q(a)+"</2d>":"")+\'<2d 1g="17"><T 1g="3O">\'+b+"</T></2d></3P></3T></3Z></T>"},2F:6(a){I(a===N)a="";J.17=a;K b=J.3Y("T");b.3X=J.1H(a);J.V("16")&&w(p(b,".16"),"5c",e.16.2b);J.V("3V-17")&&w(p(b,".17"),"56",f);H b},2Q:6(a){J.1c=""+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V("2k")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,"").Q(/\\s+/g,"|");H"\\\\b(?:"+a+")\\\\b"},5f:6(a){J.28={18:{1I:a.18,23:"1k"},1b:{1I:a.1b,23:"1k"},17:1f M("(?<18>"+a.18.1m+")(?<17>.*?)(?<1b>"+a.1b.1m+")","5o")}}};H e}();1j 2e!="1d"&&(2e.1v=1v);',62,441,'||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83'.split('|'),0,{}))
;
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var funcs	=	'abs acos acosh addcslashes addslashes ' +
						'array_change_key_case array_chunk array_combine array_count_values array_diff '+
						'array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill '+
						'array_filter array_flip array_intersect array_intersect_assoc array_intersect_key '+
						'array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map '+
						'array_merge array_merge_recursive array_multisort array_pad array_pop array_product '+
						'array_push array_rand array_reduce array_reverse array_search array_shift '+
						'array_slice array_splice array_sum array_udiff array_udiff_assoc '+
						'array_udiff_uassoc array_uintersect array_uintersect_assoc '+
						'array_uintersect_uassoc array_unique array_unshift array_values array_walk '+
						'array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert '+
						'basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress '+
						'bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir '+
						'checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists '+
						'closedir closelog copy cos cosh count count_chars date decbin dechex decoct '+
						'deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log '+
						'error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded '+
						'feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents '+
						'fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype '+
						'floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf '+
						'fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname '+
						'gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt '+
						'getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext '+
						'gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set '+
						'interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double '+
						'is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long '+
						'is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault '+
						'is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br '+
						'parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir '+
						'round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split '+
						'str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes '+
						'stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk '+
						'strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime '+
						'strtoupper strtr strval substr substr_compare';

		var keywords =	'abstract and array as break case catch cfunction class clone const continue declare default die do ' +
						'else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach ' +
						'function include include_once global goto if implements interface instanceof namespace new ' +
						'old_function or private protected public return require require_once static switch ' +
						'throw try use var while xor ';
		
		var constants	= '__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// double quoted strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// single quoted strings
			{ regex: /\$\w+/g,											css: 'variable' },			// variables
			{ regex: new RegExp(this.getKeywords(funcs), 'gmi'),		css: 'functions' },			// common functions
			{ regex: new RegExp(this.getKeywords(constants), 'gmi'),	css: 'constants' },			// constants
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' }			// keyword
			];

		this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['php'];

	SyntaxHighlighter.brushes.Php = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
;
