(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{4:function(e,n,r){"use strict";var a=r(2),t=r.n(a),i=r(3),o=r.n(i)()(t.a);o.push([e.i,"canvas {\n    display: block;\n    outline: none;\n}\n\n#top-bar,\n#bottom-bar {\n    padding: 5px;\n    position: fixed;\n    left: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#right-bar {\n    padding: 5px;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    flex-direction: column;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#top-bar {\n    top: 0;\n}\n\n#bottom-bar {\n    bottom: 0;\n}\n\n#top-bar >*,\n#bottom-bar >* {\n    margin: 5px;\n}\n\n.slider-container {\n    width: 10em;\n    padding: 5px;\n}\n\n.slider-label {\n    display: inline-block;\n    padding: 5px;\n    text-align: center;\n    width: 100%;\n    color: white;\n}\n\n.slider {\n    -webkit-appearance: none;\n    width: 100%;\n    height: 15px;\n    border-radius: 5px;\n    background: #d3d3d3;\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.slider::-moz-range-thumb {\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.github-link {\n    height: 3em;\n    width: 3em;\n}","",{version:3,sources:["webpack://src/index.css"],names:[],mappings:"AAAA;IACI,cAAc;IACd,aAAa;AACjB;;AAEA;;IAEI,YAAY;IACZ,eAAe;IACf,OAAO;IACP,QAAQ;IACR,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,MAAM;IACN,SAAS;IACT,QAAQ;IACR,sBAAsB;IACtB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,MAAM;AACV;;AAEA;IACI,SAAS;AACb;;AAEA;;IAEI,WAAW;AACf;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,wBAAwB;IACxB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,wBAAwB;IACxB,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;IACxB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,UAAU;AACd",sourcesContent:["canvas {\n    display: block;\n    outline: none;\n}\n\n#top-bar,\n#bottom-bar {\n    padding: 5px;\n    position: fixed;\n    left: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#right-bar {\n    padding: 5px;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    flex-direction: column;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#top-bar {\n    top: 0;\n}\n\n#bottom-bar {\n    bottom: 0;\n}\n\n#top-bar >*,\n#bottom-bar >* {\n    margin: 5px;\n}\n\n.slider-container {\n    width: 10em;\n    padding: 5px;\n}\n\n.slider-label {\n    display: inline-block;\n    padding: 5px;\n    text-align: center;\n    width: 100%;\n    color: white;\n}\n\n.slider {\n    -webkit-appearance: none;\n    width: 100%;\n    height: 15px;\n    border-radius: 5px;\n    background: #d3d3d3;\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.slider::-moz-range-thumb {\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.github-link {\n    height: 3em;\n    width: 3em;\n}"],sourceRoot:""}]),n.a=o},7:function(e,n,r){var a,t=(a="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(e){var n,r,t=void 0!==(e=e||{})?e:{};t.ready=new Promise((function(e,a){n=e,r=a}));var i,o={};for(i in t)t.hasOwnProperty(i)&&(o[i]=t[i]);var s,c=[],l="";"undefined"!=typeof document&&document.currentScript&&(l=document.currentScript.src),a&&(l=a),l=0!==l.indexOf("blob:")?l.substr(0,l.lastIndexOf("/")+1):"",t.print||console.log.bind(console);var u,d,p=t.printErr||console.warn.bind(console);for(i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);o=null,t.arguments&&(c=t.arguments),t.thisProgram&&t.thisProgram,t.quit&&t.quit,t.wasmBinary&&(u=t.wasmBinary),t.noExitRuntime&&t.noExitRuntime,"object"!=typeof WebAssembly&&R("no native wasm support detected");var A=!1;function y(e){var n,r=t["_"+e];return n="Cannot call unknown function "+e+", make sure it is exported",r||R("Assertion failed: "+n),r}function m(e,n,r,a,t){var i={string:function(e){var n=0;if(null!=e&&0!==e){var r=1+(e.length<<2);!function(e,n,r){!function(e,n,r,a){if(!(a>0))return 0;for(var t=r+a-1,i=0;i<e.length;++i){var o=e.charCodeAt(i);if(o>=55296&&o<=57343){var s=e.charCodeAt(++i);o=65536+((1023&o)<<10)|1023&s}if(o<=127){if(r>=t)break;n[r++]=o}else if(o<=2047){if(r+1>=t)break;n[r++]=192|o>>6,n[r++]=128|63&o}else if(o<=65535){if(r+2>=t)break;n[r++]=224|o>>12,n[r++]=128|o>>6&63,n[r++]=128|63&o}else{if(r+3>=t)break;n[r++]=240|o>>18,n[r++]=128|o>>12&63,n[r++]=128|o>>6&63,n[r++]=128|63&o}}n[r]=0}(e,b,n,r)}(e,n=j(r),r)}return n},array:function(e){var n=j(e.length);return function(e,n){h.set(e,n)}(e,n),n}},o=y(e),s=[],c=0;if(a)for(var l=0;l<a.length;l++){var u=i[r[l]];u?(0===c&&(c=z()),s[l]=u(a[l])):s[l]=a[l]}var d=o.apply(null,s);return d=function(e){return"string"===n?(r=e)?function(e,n,r){for(var a=n+r,t=n;e[t]&&!(t>=a);)++t;if(t-n>16&&e.subarray&&k)return k.decode(e.subarray(n,t));for(var i="";n<t;){var o=e[n++];if(128&o){var s=63&e[n++];if(192!=(224&o)){var c=63&e[n++];if((o=224==(240&o)?(15&o)<<12|s<<6|c:(7&o)<<18|s<<12|c<<6|63&e[n++])<65536)i+=String.fromCharCode(o);else{var l=o-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}else i+=String.fromCharCode((31&o)<<6|s)}else i+=String.fromCharCode(o)}return i}(b,r,a):"":"boolean"===n?Boolean(e):e;var r,a}(d),0!==c&&V(c),d}var f,h,b,g,w,v,C,I,B,k="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,x=t.INITIAL_MEMORY||16777216;(d=t.wasmMemory?t.wasmMemory:new WebAssembly.Memory({initial:x/65536,maximum:x/65536}))&&(f=d.buffer),x=f.byteLength,f=I=f,t.HEAP8=h=new Int8Array(I),t.HEAP16=g=new Int16Array(I),t.HEAP32=w=new Int32Array(I),t.HEAPU8=b=new Uint8Array(I),t.HEAPU16=new Uint16Array(I),t.HEAPU32=new Uint32Array(I),t.HEAPF32=v=new Float32Array(I),t.HEAPF64=C=new Float64Array(I);var T=[],q=[],N=[],E=[],S=0,W=null,M=null;function R(e){t.onAbort&&t.onAbort(e),p(e+=""),A=!0,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.";var n=new WebAssembly.RuntimeError(e);throw r(n),n}function L(e){return n=e,r="data:application/octet-stream;base64,",String.prototype.startsWith?n.startsWith(r):0===n.indexOf(r);var n,r}t.preloadedImages={},t.preloadedAudios={};var P,_,Y,D="rubiks.wasm";function O(){try{if(u)return new Uint8Array(u);if(s)return s(D);throw"both async and sync fetching of the wasm failed"}catch(e){R(e)}}function U(e){for(;e.length>0;){var n=e.shift();if("function"!=typeof n){var r=n.func;"number"==typeof r?void 0===n.arg?B.get(r)():B.get(r)(n.arg):r(void 0===n.arg?null:n.arg)}else n(t)}}L(D)||(P=D,D=t.locateFile?t.locateFile(P,l):l+P),q.push({func:function(){H()}});var Q,F={b:function(e,n,r){b.copyWithin(e,n,n+r)},a:d,c:function(e){var n=Date.now()/1e3|0;return e&&(w[e>>2]=n),n}},H=(function(){var e={a:F};function n(e,n){var r=e.exports;t.asm=r,B=t.asm.d,function(e){if(S--,t.monitorRunDependencies&&t.monitorRunDependencies(S),0==S&&(null!==W&&(clearInterval(W),W=null),M)){var n=M;M=null,n()}}()}function a(e){n(e.instance)}function i(n){return(u||"function"!=typeof fetch?Promise.resolve().then(O):fetch(D,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+D+"'";return e.arrayBuffer()})).catch((function(){return O()}))).then((function(n){return WebAssembly.instantiate(n,e)})).then(n,(function(e){p("failed to asynchronously prepare wasm: "+e),R(e)}))}if(S++,t.monitorRunDependencies&&t.monitorRunDependencies(S),t.instantiateWasm)try{return t.instantiateWasm(e,n)}catch(e){return p("Module.instantiateWasm callback failed with error: "+e),!1}(u||"function"!=typeof WebAssembly.instantiateStreaming||L(D)||"function"!=typeof fetch?i(a):fetch(D,{credentials:"same-origin"}).then((function(n){return WebAssembly.instantiateStreaming(n,e).then(a,(function(e){return p("wasm streaming compile failed: "+e),p("falling back to ArrayBuffer instantiation"),i(a)}))}))).catch(r)}(),t.___wasm_call_ctors=function(){return(H=t.___wasm_call_ctors=t.asm.e).apply(null,arguments)}),z=(t._init=function(){return(t._init=t.asm.f).apply(null,arguments)},t._perform=function(){return(t._perform=t.asm.g).apply(null,arguments)},t._recolor=function(){return(t._recolor=t.asm.h).apply(null,arguments)},t._scramble=function(){return(t._scramble=t.asm.i).apply(null,arguments)},t._solve=function(){return(t._solve=t.asm.j).apply(null,arguments)},t.stackSave=function(){return(z=t.stackSave=t.asm.k).apply(null,arguments)}),V=t.stackRestore=function(){return(V=t.stackRestore=t.asm.l).apply(null,arguments)},j=t.stackAlloc=function(){return(j=t.stackAlloc=t.asm.m).apply(null,arguments)};function Z(e){function r(){Q||(Q=!0,t.calledRun=!0,A||(U(q),U(N),n(t),t.onRuntimeInitialized&&t.onRuntimeInitialized(),function(){if(t.postRun)for("function"==typeof t.postRun&&(t.postRun=[t.postRun]);t.postRun.length;)e=t.postRun.shift(),E.unshift(e);var e;U(E)}()))}e=e||c,S>0||(function(){if(t.preRun)for("function"==typeof t.preRun&&(t.preRun=[t.preRun]);t.preRun.length;)e=t.preRun.shift(),T.unshift(e);var e;U(T)}(),S>0||(t.setStatus?(t.setStatus("Running..."),setTimeout((function(){setTimeout((function(){t.setStatus("")}),1),r()}),1)):r()))}if(t.cwrap=function(e,n,r,a){var t=(r=r||[]).every((function(e){return"number"===e}));return"string"!==n&&t&&!a?y(e):function(){return m(e,n,r,arguments)}},t.setValue=function(e,n,r,a){switch("*"===(r=r||"i8").charAt(r.length-1)&&(r="i32"),r){case"i1":case"i8":h[e>>0]=n;break;case"i16":g[e>>1]=n;break;case"i32":w[e>>2]=n;break;case"i64":Y=[n>>>0,(_=n,+Math.abs(_)>=1?_>0?(0|Math.min(+Math.floor(_/4294967296),4294967295))>>>0:~~+Math.ceil((_-+(~~_>>>0))/4294967296)>>>0:0)],w[e>>2]=Y[0],w[e+4>>2]=Y[1];break;case"float":v[e>>2]=n;break;case"double":C[e>>3]=n;break;default:R("invalid type for setValue: "+r)}},t.getValue=function(e,n,r){switch("*"===(n=n||"i8").charAt(n.length-1)&&(n="i32"),n){case"i1":case"i8":return h[e>>0];case"i16":return g[e>>1];case"i32":case"i64":return w[e>>2];case"float":return v[e>>2];case"double":return C[e>>3];default:R("invalid type for getValue: "+n)}return null},M=function e(){Q||Z(),Q||(M=e)},t.run=Z,t.preInit)for("function"==typeof t.preInit&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.pop()();return Z(),e.ready});e.exports=t},9:function(e,n,r){"use strict";r.r(n);var a=r(0),t=r(6),i=r(1),o=r.n(i),s=r(4),c={insert:"head",singleton:!1},l=(o()(s.a,c),s.a.locals,r(8),r(7)),u=r.n(l),d=r.p+"550448dad947c895af5371ec9e9ba7aa.wasm";const p=[1644970,52480,16776960,16777215,16741632,14555674],A=[20,32,53,12,27,45,7,25,40,2,22,35,9,26,42,15,29,48,14,28,47,17,30,50,19,31,52,6,24,39,4,23,37,1,21,34,0,8,13,3,10,16,5,11,18,46,41,33,49,43,36,51,44,38],y=[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5],m=[{id:0,name:"F",center:[0,0,1]},{id:1,name:"B",center:[0,0,-1]},{id:2,name:"U",center:[0,1,0]},{id:3,name:"D",center:[0,-1,0]},{id:4,name:"L",center:[-1,0,0]},{id:5,name:"R",center:[1,0,0]}],f=[{code:0,displayName:"F",plane:0,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:1,displayName:"F'",plane:0,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:2,displayName:"B",plane:1,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:3,displayName:"B'",plane:1,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:4,displayName:"U",plane:2,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:5,displayName:"U'",plane:2,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:6,displayName:"D",plane:3,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:7,displayName:"D'",plane:3,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:8,displayName:"L",plane:4,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:9,displayName:"L'",plane:4,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:10,displayName:"R",plane:5,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:11,displayName:"R'",plane:5,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:12,displayName:"f",plane:0,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:13,displayName:"f'",plane:0,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:14,displayName:"b",plane:1,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:15,displayName:"b'",plane:1,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:16,displayName:"u",plane:2,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:17,displayName:"u'",plane:2,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:18,displayName:"d",plane:3,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:19,displayName:"d'",plane:3,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:20,displayName:"l",plane:4,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:21,displayName:"l'",plane:4,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:22,displayName:"r",plane:5,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:23,displayName:"r'",plane:5,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:24,displayName:"F2",plane:0,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:25,displayName:"B2",plane:1,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:26,displayName:"U2",plane:2,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:27,displayName:"D2",plane:3,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:28,displayName:"L2",plane:4,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:29,displayName:"R2",plane:5,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:30,displayName:"z",plane:0,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:31,displayName:"z'",plane:0,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:32,displayName:"y",plane:2,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:33,displayName:"y'",plane:2,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:34,displayName:"x'",plane:5,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:35,displayName:"x",plane:5,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:36,displayName:"S",plane:0,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:37,displayName:"S'",plane:1,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:38,displayName:"E'",plane:2,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:39,displayName:"E",plane:3,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:40,displayName:"M",plane:4,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:41,displayName:"M'",plane:5,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:42,displayName:"S2",plane:0,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:43,displayName:"E2",plane:2,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:44,displayName:"M2",plane:4,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:45,displayName:"z2",plane:0,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"},{code:46,displayName:"y2",plane:2,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"},{code:47,displayName:"x2",plane:5,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"}];var h=r.p+"a192764b75fd3f412d9bdc87e3cf30b6.png";const b=(e,n,r)=>{var a=document.createElement("button");return a.className="pure-button",a.innerText=n,a.addEventListener("click",r),e.appendChild(a),a},g=(e,n,r)=>{var a=document.createElement("div");a.className="slider-container";var t=document.createElement("input"),i=document.createElement("span");return i.className="slider-label",i.innerText=n,t.type="range",t.min=1,t.max=5,t.value=1,t.className="slider",t.oninput=function(){r(this.value)},a.appendChild(i),a.appendChild(t),e.appendChild(a),t},w=e=>{var n=document.querySelector("body"),r=document.createElement("div");r.id="top-bar";var a=document.createElement("div");a.id="bottom-bar";var t=document.createElement("div");t.id="right-bar";const i=b(r,"Clear",()=>{e.setColors([...y])}),o=b(r,"Demo",()=>{e.enqueueOperation(...f)}),s=b(r,"Stop",()=>{e.clearQueue()}),c=b(r,"Scramble",()=>{e.enqueueOperation(...e.runtime.scramble(23).map(e=>f.find(({code:n})=>n===e)))}),l=b(r,"Solve",()=>{e.enqueueOperation(...e.runtime.solve(e.currentCube).map(e=>f.find(({code:n})=>n===e)))});g(r,"Animation speed",n=>{e.animationSpeed=n}),(e=>{var n=document.createElement("a");n.href="https://github.com/tibordp/neishauben";var r=document.createElement("img");r.className="github-link",r.src=h,r.alt="GitHub",n.appendChild(r),e.appendChild(n)})(r);const u=f.filter(({category:e})=>"Basic"===e).map(n=>b(a,n.displayName,()=>{e.enqueueOperation(n)})),d=()=>{const n=[i,o,c,l,...u],r=[s];n.forEach(n=>{n.disabled=0!==e.operationQueue.length}),r.forEach(n=>{n.disabled=0===e.operationQueue.length})};d(),e.addQueueChangeListener(d),n.appendChild(r),n.appendChild(a),n.appendChild(t)},v=(e,n,r)=>Math.abs(e)+Math.abs(n)+Math.abs(r),C=e=>{const[n,r,a]=e.userData;e.position.set(n,r,a),e.rotation.set(0,0,0),e.updateMatrix()},I=(e,n,r)=>{const{plane:t,direction:i,layers:o,quarterTurns:s}=n,c=s*Math.PI/2;var l=c;const[u,d]=((e,n,r)=>{const a=[];let t=null;function i(e,n,r){switch(r){case-1:return 0===e||0==n;case 1:return 0===e||e===n;case 2:return 0===e||e===n||0==n;case 3:return!0}}const o=m[n].center;function s(e,n,r,a){return i(o[0],e,a)&&i(o[1],n,a)&&i(o[2],r,a)}return e.forEach(e=>{const[n,i,o]=e.userData;s(n,i,o,r)&&a.push(e),1===v(n,i,o)&&s(n,i,o,1)&&(t=e)}),[t,a]})(e,t,o);return{step(){if(l<=0)return;const e=.07*(1.1-Math.pow((2*l-c)/c,2))*s*r;l-=e,d.forEach(n=>{!function(e,n,r,a,t){(t=void 0!==t&&t)&&e.parent.localToWorld(e.position),e.position.sub(n),e.position.applyAxisAngle(r,a),e.position.add(n),t&&e.parent.worldToLocal(e.position),e.rotateOnAxis(r,a)}(n,new a.r(0,0,0),u.position,e*i,!0),n.updateMatrix()})},reset(){d.forEach(e=>C(e))},finished:()=>l<=0}},B=e=>{var n=function(e,n,r,t,i){let o=new a.m,s=1e-5,c=t-s;o.absarc(s,s,s,-Math.PI/2,-Math.PI,!0),o.absarc(s,n-2*c,s,Math.PI,Math.PI/2,!0),o.absarc(e-2*c,n-2*c,s,Math.PI/2,0,!0),o.absarc(e-2*c,s,s,0,-Math.PI/2,!0);let l=new a.c(o,{depth:r-2*t,bevelEnabled:!0,bevelSegments:2*i,steps:1,bevelSize:c,bevelThickness:t,curveSegments:i});return l.center(),l}(1,1,1,.05,5),r=new a.g({color:e});return new a.f(n,r)},k=(e,n,r,t)=>{if(void 0!==t){var i=document.createElement("canvas");i.height=256,i.width=256;var o=i.getContext("2d");const e=48,n=""+t;o.font=e+"pt Arial",o.fillStyle="white",o.fillRect(0,0,i.width,i.height),o.textAlign="center",o.textBaseline="middle",o.fillStyle="black",o.fillText(n,i.width/2,i.height/2);var s=new a.p(i);s.needsUpdate=!0}const c=new a.i(.9,.9,1,1);c.center();const l=new a.g({color:0,map:s||null,side:a.a});var u=new a.f(c,l);return 0!==e?u.rotateY(e*(Math.PI/2)):0!==n?u.rotateX(-n*(Math.PI/2)):-1==r&&u.rotateY(Math.PI),u.position.set(e/2,n/2,r/2),u.position.multiplyScalar(1.001),u.matrixAutoUpdate=!1,u.updateMatrix(),u.userData=[e,n,r],u},x=(e,n)=>{for(var r=0;r<54;++r)e[A[r]].material.color.setHex(p[n[r]])};!async function(){var e=await(async()=>{const e=await u()({locateFile:e=>e.endsWith(".wasm")?d:e});return e._init(),{performOperation(n,r){for(var a=e.stackSave(),t=e.stackAlloc(54),i=0;i<54;++i)e.setValue(t+i,n[i]);e._perform(t,r);const o=[];for(i=0;i<54;++i)o[i]=e.getValue(t+i);return e.stackRestore(a),o},recolor(n){for(var r=e.stackSave(),a=e.stackAlloc(54),t=0;t<54;++t)e.setValue(a+t,n[t]);e._recolor(a);const i=[];for(t=0;t<54;++t)i[t]=e.getValue(a+t);return e.stackRestore(r),i},solve(n){for(var r=e.stackSave(),a=e.stackAlloc(54),t=e.stackAlloc(1024),i=0;i<54;++i)e.setValue(a+i,n[i]);e._solve(a,t);const o=[];for(i=0;i<1024;++i){const n=e.getValue(t+i);if(-1===n)break;-2!==n&&o.push(n)}return e.stackRestore(r),o},scramble(n){var r=e.stackSave(),a=e.stackAlloc(n+1);e._scramble(a,n);const t=[];for(var i=0;;++i){const n=e.getValue(a+i);if(-1===n)break;t[i]=n}return e.stackRestore(r),t}}})();window._runtime=e;var n=new a.l,r=new a.h(75,window.innerWidth/window.innerHeight,.1,1e3);r.position.z=6,n.add(r);var i=new a.s({antialias:!0});i.setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(i.domElement);var o=new a.j(16777215,1.2,100);o.position.set(0,0,5),r.add(o);const s=new t.a(r,i.domElement);s.enableDamping=!0,s.dampingFactor=.25,s.enableZoom=!1,r.rotation.set(-.041,1.9,-1.21),s.update(),window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)},!1);const[c,l,p]=(()=>{const e=[],n=[],r=new a.d;r.matrixAutoUpdate=!1;for(var t=-1;t<2;++t)for(var i=-1;i<2;++i)for(var o=-1;o<2;++o){const a=[];switch(v(t,i,o)){case 0:break;case 1:{const e=m.find(({center:[e,n,r]})=>e==t&&n==i&&r==o).name;a.push(k(t,i,o,e));break}case 2:0==t?(a.push(k(t,i,0)),a.push(k(t,0,o))):0==i?(a.push(k(t,i,0)),a.push(k(0,i,o))):0==o&&(a.push(k(t,0,o)),a.push(k(0,i,o)));break;case 3:a.push(k(t,0,0)),a.push(k(0,i,0)),a.push(k(0,0,o))}const s=B(13421772);s.userData=[t,i,o],s.matrixAutoUpdate=!1,C(s),s.add(...a),e.push(...a),r.add(s),n.push(s)}return[r,n,e]})();n.add(c);const A={runtime:e,currentCube:[...y],operationQueue:[],queueListeners:[],animationSpeed:1,setColors(e){this.currentCube=e,x(p,this.currentCube)},enqueueOperation(...e){this.operationQueue.push(...e),this.queueListeners.forEach(e=>e())},clearQueue(){this.operationQueue=[],this.queueListeners.forEach(e=>e())},addQueueChangeListener(e){this.queueListeners.push(e)}};x(p,A.currentCube);var f=null,h=null;const b=()=>{window.requestAnimationFrame(b),null!==h&&(f.finished()?(f.reset(),A.currentCube=e.performOperation(A.currentCube,h.code),x(p,A.currentCube),h=null):f.step()),null===h&&0!==A.operationQueue.length&&(h=A.operationQueue.shift(),A.queueListeners.forEach(e=>e()),f=I(l,h,A.animationSpeed)),i.render(n,r)};w(A),window.requestAnimationFrame(b)}(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})})}},[[9,1,2]]]);
//# sourceMappingURL=main.3e575e80.js.map