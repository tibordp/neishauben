(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,n){n.performOperation=(e,n,r)=>{for(var a=e.stackSave(),t=e.stackAlloc(54),i=0;i<54;++i)e.setValue(t+i,n[i]);e._perform(t,r);const o=[];for(i=0;i<54;++i)o[i]=e.getValue(t+i);return e.stackRestore(a),o},n.recolor=(e,n)=>{for(var r=e.stackSave(),a=e.stackAlloc(54),t=0;t<54;++t)e.setValue(a+t,n[t]);e._recolor(a);const i=[];for(t=0;t<54;++t)i[t]=e.getValue(a+t);return e.stackRestore(r),i},n.solve=(e,n)=>{for(var r=e.stackSave(),a=e.stackAlloc(54),t=e.stackAlloc(2048),i=0;i<54;++i)e.setValue(a+i,n[i]);e._solve(a,t);const o=[];for(i=0;i<512;++i){const n=e.getValue(t+4*i,"i32");if(-1===n)break;o.push(n)}return e.stackRestore(r),o},n.scramble=(e,n)=>{var r=e.stackSave(),a=e.stackAlloc(4*n);e._scramble(a,n);const t=[];for(var i=0;i<n;++i){const n=e.getValue(a+4*i,"i32");t[i]=n}return e.stackRestore(r),t},n.scrambled=(e,n)=>{var r=e.stackSave(),a=e.stackAlloc(54);e._scrambled_cube(a,n);const t=[];for(var i=0;i<54;++i)t[i]=e.getValue(a+i);return e.stackRestore(r),t}},,,,function(e,n,r){"use strict";var a=r(3),t=r.n(a),i=r(4),o=r.n(i)()(t.a);o.push([e.i,"canvas {\n    display: block;\n    outline: none;\n}\n\n#top-bar,\n#bottom-bar {\n    padding: 5px;\n    position: fixed;\n    left: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#right-bar {\n    padding: 5px;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    flex-direction: column;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#algorithm {\n    flex-basis: 100%;\n    text-align: center;\n    background-color: rgba(245, 242, 240, 0.7);\n    border-radius: 10px;\n    padding: 5px;   \n}\n\n.algorithm-current {\n    color: #f22d54;\n    background-color: #f22d54;\n    box-sizing: border-box;\n    padding: 4px;\n    color: white;\n    border-radius: 5px;\n    font-weight: bold;\n    position: relative;\n    z-index: 1;\n}\n\n.algorithm-done {\n    font-weight: bold;\n}\n\n\n#top-bar {\n    top: 0;\n}\n\n#bottom-bar {\n    bottom: 0;\n}\n\n#top-bar >*,\n#bottom-bar >* {\n    margin: 5px;\n}\n\n.slider-container {\n    width: 10em;\n    padding: 5px;\n}\n\n.slider-label {\n    display: inline-block;\n    padding: 5px;\n    text-align: center;\n    width: 100%;\n    color: #222;\n}\n\n.slider {\n    -webkit-appearance: none;\n    width: 100%;\n    height: 15px;\n    border-radius: 5px;\n    background: #d3d3d3;\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.slider::-moz-range-thumb {\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.github-link {\n    height: 2.5em;\n    width: 2.5em;\n}","",{version:3,sources:["webpack://src/index.css"],names:[],mappings:"AAAA;IACI,cAAc;IACd,aAAa;AACjB;;AAEA;;IAEI,YAAY;IACZ,eAAe;IACf,OAAO;IACP,QAAQ;IACR,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,MAAM;IACN,SAAS;IACT,QAAQ;IACR,sBAAsB;IACtB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,0CAA0C;IAC1C,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,cAAc;IACd,yBAAyB;IACzB,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;IAClB,UAAU;AACd;;AAEA;IACI,iBAAiB;AACrB;;;AAGA;IACI,MAAM;AACV;;AAEA;IACI,SAAS;AACb;;AAEA;;IAEI,WAAW;AACf;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,kBAAkB;IAClB,WAAW;IACX,WAAW;AACf;;AAEA;IACI,wBAAwB;IACxB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,wBAAwB;IACxB,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;IACxB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,YAAY;AAChB",sourcesContent:["canvas {\n    display: block;\n    outline: none;\n}\n\n#top-bar,\n#bottom-bar {\n    padding: 5px;\n    position: fixed;\n    left: 0;\n    right: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#right-bar {\n    padding: 5px;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    flex-direction: column;\n    display: flex;\n    justify-content: center;\n    align-items: center;   \n    flex-wrap: wrap;\n}\n\n#algorithm {\n    flex-basis: 100%;\n    text-align: center;\n    background-color: rgba(245, 242, 240, 0.7);\n    border-radius: 10px;\n    padding: 5px;   \n}\n\n.algorithm-current {\n    color: #f22d54;\n    background-color: #f22d54;\n    box-sizing: border-box;\n    padding: 4px;\n    color: white;\n    border-radius: 5px;\n    font-weight: bold;\n    position: relative;\n    z-index: 1;\n}\n\n.algorithm-done {\n    font-weight: bold;\n}\n\n\n#top-bar {\n    top: 0;\n}\n\n#bottom-bar {\n    bottom: 0;\n}\n\n#top-bar >*,\n#bottom-bar >* {\n    margin: 5px;\n}\n\n.slider-container {\n    width: 10em;\n    padding: 5px;\n}\n\n.slider-label {\n    display: inline-block;\n    padding: 5px;\n    text-align: center;\n    width: 100%;\n    color: #222;\n}\n\n.slider {\n    -webkit-appearance: none;\n    width: 100%;\n    height: 15px;\n    border-radius: 5px;\n    background: #d3d3d3;\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n}\n\n.slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.slider::-moz-range-thumb {\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background: #4caf50;\n    cursor: pointer;\n}\n\n.github-link {\n    height: 2.5em;\n    width: 2.5em;\n}"],sourceRoot:""}]),n.a=o},,,function(e,n,r){var a,t=(a="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(e){var n,r,t=void 0!==(e=e||{})?e:{};t.ready=new Promise((function(e,a){n=e,r=a}));var i,o={};for(i in t)t.hasOwnProperty(i)&&(o[i]=t[i]);var s,c=[],l="";"undefined"!=typeof document&&document.currentScript&&(l=document.currentScript.src),a&&(l=a),l=0!==l.indexOf("blob:")?l.substr(0,l.lastIndexOf("/")+1):"",t.print||console.log.bind(console);var d,u,p=t.printErr||console.warn.bind(console);for(i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);o=null,t.arguments&&(c=t.arguments),t.thisProgram&&t.thisProgram,t.quit&&t.quit,t.wasmBinary&&(d=t.wasmBinary),t.noExitRuntime&&t.noExitRuntime,"object"!=typeof WebAssembly&&L("no native wasm support detected");var A=!1;function y(e){var n,r=t["_"+e];return n="Cannot call unknown function "+e+", make sure it is exported",r||L("Assertion failed: "+n),r}function m(e,n,r,a,t){var i={string:function(e){var n=0;if(null!=e&&0!==e){var r=1+(e.length<<2);!function(e,n,r){!function(e,n,r,a){if(!(a>0))return 0;for(var t=r+a-1,i=0;i<e.length;++i){var o=e.charCodeAt(i);if(o>=55296&&o<=57343){var s=e.charCodeAt(++i);o=65536+((1023&o)<<10)|1023&s}if(o<=127){if(r>=t)break;n[r++]=o}else if(o<=2047){if(r+1>=t)break;n[r++]=192|o>>6,n[r++]=128|63&o}else if(o<=65535){if(r+2>=t)break;n[r++]=224|o>>12,n[r++]=128|o>>6&63,n[r++]=128|63&o}else{if(r+3>=t)break;n[r++]=240|o>>18,n[r++]=128|o>>12&63,n[r++]=128|o>>6&63,n[r++]=128|63&o}}n[r]=0}(e,g,n,r)}(e,n=j(r),r)}return n},array:function(e){var n=j(e.length);return function(e,n){h.set(e,n)}(e,n),n}},o=y(e),s=[],c=0;if(a)for(var l=0;l<a.length;l++){var d=i[r[l]];d?(0===c&&(c=H()),s[l]=d(a[l])):s[l]=a[l]}var u=o.apply(null,s);return u=function(e){return"string"===n?(r=e)?function(e,n,r){for(var a=n+r,t=n;e[t]&&!(t>=a);)++t;if(t-n>16&&e.subarray&&k)return k.decode(e.subarray(n,t));for(var i="";n<t;){var o=e[n++];if(128&o){var s=63&e[n++];if(192!=(224&o)){var c=63&e[n++];if((o=224==(240&o)?(15&o)<<12|s<<6|c:(7&o)<<18|s<<12|c<<6|63&e[n++])<65536)i+=String.fromCharCode(o);else{var l=o-65536;i+=String.fromCharCode(55296|l>>10,56320|1023&l)}}else i+=String.fromCharCode((31&o)<<6|s)}else i+=String.fromCharCode(o)}return i}(g,r,a):"":"boolean"===n?Boolean(e):e;var r,a}(u),0!==c&&V(c),u}var f,h,g,b,w,v,C,B,I,k="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,x=t.INITIAL_MEMORY||16777216;(u=t.wasmMemory?t.wasmMemory:new WebAssembly.Memory({initial:x/65536,maximum:x/65536}))&&(f=u.buffer),x=f.byteLength,f=B=f,t.HEAP8=h=new Int8Array(B),t.HEAP16=b=new Int16Array(B),t.HEAP32=w=new Int32Array(B),t.HEAPU8=g=new Uint8Array(B),t.HEAPU16=new Uint16Array(B),t.HEAPU32=new Uint32Array(B),t.HEAPF32=v=new Float32Array(B),t.HEAPF64=C=new Float64Array(B);var T=[],q=[],N=[],E=[],S=0,M=null,R=null;function L(e){t.onAbort&&t.onAbort(e),p(e+=""),A=!0,e="abort("+e+"). Build with -s ASSERTIONS=1 for more info.";var n=new WebAssembly.RuntimeError(e);throw r(n),n}function W(e){return n=e,r="data:application/octet-stream;base64,",String.prototype.startsWith?n.startsWith(r):0===n.indexOf(r);var n,r}t.preloadedImages={},t.preloadedAudios={};var P,_,Y,O="rubiks.wasm";function D(){try{if(d)return new Uint8Array(d);if(s)return s(O);throw"both async and sync fetching of the wasm failed"}catch(e){L(e)}}function Q(e){for(;e.length>0;){var n=e.shift();if("function"!=typeof n){var r=n.func;"number"==typeof r?void 0===n.arg?I.get(r)():I.get(r)(n.arg):r(void 0===n.arg?null:n.arg)}else n(t)}}W(O)||(P=O,O=t.locateFile?t.locateFile(P,l):l+P),q.push({func:function(){F()}});var U,z={b:function(e,n,r){g.copyWithin(e,n,n+r)},a:u,c:function(e){var n=Date.now()/1e3|0;return e&&(w[e>>2]=n),n}},F=(function(){var e={a:z};function n(e,n){var r=e.exports;t.asm=r,I=t.asm.d,function(e){if(S--,t.monitorRunDependencies&&t.monitorRunDependencies(S),0==S&&(null!==M&&(clearInterval(M),M=null),R)){var n=R;R=null,n()}}()}function a(e){n(e.instance)}function i(n){return(d||"function"!=typeof fetch?Promise.resolve().then(D):fetch(O,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+O+"'";return e.arrayBuffer()})).catch((function(){return D()}))).then((function(n){return WebAssembly.instantiate(n,e)})).then(n,(function(e){p("failed to asynchronously prepare wasm: "+e),L(e)}))}if(S++,t.monitorRunDependencies&&t.monitorRunDependencies(S),t.instantiateWasm)try{return t.instantiateWasm(e,n)}catch(e){return p("Module.instantiateWasm callback failed with error: "+e),!1}(d||"function"!=typeof WebAssembly.instantiateStreaming||W(O)||"function"!=typeof fetch?i(a):fetch(O,{credentials:"same-origin"}).then((function(n){return WebAssembly.instantiateStreaming(n,e).then(a,(function(e){return p("wasm streaming compile failed: "+e),p("falling back to ArrayBuffer instantiation"),i(a)}))}))).catch(r)}(),t.___wasm_call_ctors=function(){return(F=t.___wasm_call_ctors=t.asm.e).apply(null,arguments)}),H=(t._init=function(){return(t._init=t.asm.f).apply(null,arguments)},t._perform=function(){return(t._perform=t.asm.g).apply(null,arguments)},t._recolor=function(){return(t._recolor=t.asm.h).apply(null,arguments)},t._scramble=function(){return(t._scramble=t.asm.i).apply(null,arguments)},t._scrambled_cube=function(){return(t._scrambled_cube=t.asm.j).apply(null,arguments)},t._solve=function(){return(t._solve=t.asm.k).apply(null,arguments)},t.stackSave=function(){return(H=t.stackSave=t.asm.l).apply(null,arguments)}),V=t.stackRestore=function(){return(V=t.stackRestore=t.asm.m).apply(null,arguments)},j=t.stackAlloc=function(){return(j=t.stackAlloc=t.asm.n).apply(null,arguments)};function Z(e){function r(){U||(U=!0,t.calledRun=!0,A||(Q(q),Q(N),n(t),t.onRuntimeInitialized&&t.onRuntimeInitialized(),function(){if(t.postRun)for("function"==typeof t.postRun&&(t.postRun=[t.postRun]);t.postRun.length;)e=t.postRun.shift(),E.unshift(e);var e;Q(E)}()))}e=e||c,S>0||(function(){if(t.preRun)for("function"==typeof t.preRun&&(t.preRun=[t.preRun]);t.preRun.length;)e=t.preRun.shift(),T.unshift(e);var e;Q(T)}(),S>0||(t.setStatus?(t.setStatus("Running..."),setTimeout((function(){setTimeout((function(){t.setStatus("")}),1),r()}),1)):r()))}if(t.cwrap=function(e,n,r,a){var t=(r=r||[]).every((function(e){return"number"===e}));return"string"!==n&&t&&!a?y(e):function(){return m(e,n,r,arguments)}},t.setValue=function(e,n,r,a){switch("*"===(r=r||"i8").charAt(r.length-1)&&(r="i32"),r){case"i1":case"i8":h[e>>0]=n;break;case"i16":b[e>>1]=n;break;case"i32":w[e>>2]=n;break;case"i64":Y=[n>>>0,(_=n,+Math.abs(_)>=1?_>0?(0|Math.min(+Math.floor(_/4294967296),4294967295))>>>0:~~+Math.ceil((_-+(~~_>>>0))/4294967296)>>>0:0)],w[e>>2]=Y[0],w[e+4>>2]=Y[1];break;case"float":v[e>>2]=n;break;case"double":C[e>>3]=n;break;default:L("invalid type for setValue: "+r)}},t.getValue=function(e,n,r){switch("*"===(n=n||"i8").charAt(n.length-1)&&(n="i32"),n){case"i1":case"i8":return h[e>>0];case"i16":return b[e>>1];case"i32":case"i64":return w[e>>2];case"float":return v[e>>2];case"double":return C[e>>3];default:L("invalid type for getValue: "+n)}return null},R=function e(){U||Z(),U||(R=e)},t.run=Z,t.preInit)for("function"==typeof t.preInit&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.pop()();return Z(),e.ready});e.exports=t},,function(e,n,r){"use strict";r.r(n);var a=r(0),t=r(7),i=r(2),o=r.n(i),s=r(5),c={insert:"head",singleton:!1},l=(o()(s.a,c),s.a.locals,r(9),r(8)),d=r.n(l),u=r.p+"ce3ce3478850a36e0c771ebad810c299.wasm",p=r(1);const A=[3441877,4309576,15982400,15526621,16217646,15871316],y=[20,32,53,12,27,45,7,25,40,2,22,35,9,26,42,15,29,48,14,28,47,17,30,50,19,31,52,6,24,39,4,23,37,1,21,34,0,8,13,3,10,16,5,11,18,46,41,33,49,43,36,51,44,38],m=[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5],f=[{id:0,name:"F",center:[0,0,1]},{id:1,name:"B",center:[0,0,-1]},{id:2,name:"U",center:[0,1,0]},{id:3,name:"D",center:[0,-1,0]},{id:4,name:"L",center:[-1,0,0]},{id:5,name:"R",center:[1,0,0]}],h=[{code:0,displayName:"F",plane:0,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:1,displayName:"F'",plane:0,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:2,displayName:"B",plane:1,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:3,displayName:"B'",plane:1,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:4,displayName:"U",plane:2,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:5,displayName:"U'",plane:2,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:6,displayName:"D",plane:3,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:7,displayName:"D'",plane:3,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:8,displayName:"L",plane:4,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:9,displayName:"L'",plane:4,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:10,displayName:"R",plane:5,direction:-1,layers:1,quarterTurns:1,category:"Basic"},{code:11,displayName:"R'",plane:5,direction:1,layers:1,quarterTurns:1,category:"Basic"},{code:12,displayName:"f",plane:0,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:13,displayName:"f'",plane:0,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:14,displayName:"b",plane:1,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:15,displayName:"b'",plane:1,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:16,displayName:"u",plane:2,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:17,displayName:"u'",plane:2,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:18,displayName:"d",plane:3,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:19,displayName:"d'",plane:3,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:20,displayName:"l",plane:4,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:21,displayName:"l'",plane:4,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:22,displayName:"r",plane:5,direction:-1,layers:2,quarterTurns:1,category:"Two Layers"},{code:23,displayName:"r'",plane:5,direction:1,layers:2,quarterTurns:1,category:"Two Layers"},{code:24,displayName:"F2",plane:0,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:25,displayName:"B2",plane:1,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:26,displayName:"U2",plane:2,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:27,displayName:"D2",plane:3,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:28,displayName:"L2",plane:4,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:29,displayName:"R2",plane:5,direction:1,layers:1,quarterTurns:2,category:"Basic"},{code:30,displayName:"z",plane:0,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:31,displayName:"z'",plane:0,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:32,displayName:"y",plane:2,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:33,displayName:"y'",plane:2,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:34,displayName:"x'",plane:5,direction:1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:35,displayName:"x",plane:5,direction:-1,layers:3,quarterTurns:1,category:"Whole Cube"},{code:36,displayName:"S",plane:0,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:37,displayName:"S'",plane:1,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:38,displayName:"E'",plane:2,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:39,displayName:"E",plane:3,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:40,displayName:"M",plane:4,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:41,displayName:"M'",plane:5,direction:-1,layers:-1,quarterTurns:1,category:"Middle Layer"},{code:42,displayName:"S2",plane:0,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:43,displayName:"E2",plane:2,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:44,displayName:"M2",plane:4,direction:1,layers:-1,quarterTurns:2,category:"Middle Layer"},{code:45,displayName:"z2",plane:0,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"},{code:46,displayName:"y2",plane:2,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"},{code:47,displayName:"x2",plane:5,direction:1,layers:3,quarterTurns:2,category:"Whole Cube"},{code:48,displayName:"f2",plane:0,direction:1,layers:2,quarterTurns:2,category:"Two Layers"},{code:49,displayName:"b2",plane:1,direction:1,layers:2,quarterTurns:2,category:"Two Layers"},{code:50,displayName:"u2",plane:2,direction:1,layers:2,quarterTurns:2,category:"Two Layers"},{code:51,displayName:"d2",plane:3,direction:1,layers:2,quarterTurns:2,category:"Two Layers"},{code:52,displayName:"l2",plane:4,direction:1,layers:2,quarterTurns:2,category:"Two Layers"},{code:53,displayName:"r2",plane:5,direction:1,layers:2,quarterTurns:2,category:"Two Layers"}];var g=r.p+"d8c6d6c90bdccf76d860cc3f6dddb39c.png";const b=(e,n,r)=>{var a=document.createElement("button");return a.className="pure-button",a.innerText=n,a.addEventListener("click",r),e.appendChild(a),a},w=(e,n,r)=>{var a=document.createElement("div");a.className="slider-container";var t=document.createElement("input"),i=document.createElement("span");return i.className="slider-label",i.innerText=n,t.type="range",t.min=1,t.max=5,t.value=1,t.className="slider",t.oninput=function(){r(this.value)},a.appendChild(i),a.appendChild(t),e.appendChild(a),t},v=e=>{var n=document.querySelector("body"),r=document.createElement("div");r.id="top-bar";var a=document.createElement("div");a.id="bottom-bar";var t=document.createElement("div");t.id="right-bar";var i=[],o=[];const s=b(r,"Clear",()=>{i=[],o=[],e.clearQueue()}),c=b(r,"Demo",()=>{i=[...h],o=[],e.enqueueOperation(...i)}),l=b(r,"Pause",()=>{o=[...e.operationQueue],e.clearQueue()}),d=b(r,"Resume",()=>{e.enqueueOperation(...o),o=[]}),u=b(r,"Scramble",()=>{o=[],i=e.runtime.scramble(25).map(e=>h.find(({code:n})=>n===e)),e.enqueueOperation(...i)}),p=b(r,"Solve",()=>{o=[],i=e.runtime.solve(e.currentCube).map(e=>h.find(({code:n})=>n===e)),e.enqueueOperation(...i)});w(r,"Animation speed",n=>{e.animationSpeed=n}),(e=>{var n=document.createElement("a");n.href="https://github.com/tibordp/neishauben",n.target="_blank";var r=document.createElement("img");r.className="github-link",r.src=g,r.alt="Neishauben on GitHub",n.appendChild(r),e.appendChild(n)})(r);const A=document.createElement("div");A.id="algorithm",r.appendChild(A);const y=h.filter(({category:e})=>"Basic"===e).map(n=>b(a,n.displayName,()=>{o.length>0&&(i=[],o=[],e.clearQueue()),i.push(n),e.enqueueOperation(n)})),m=()=>{const n=0!==e.operationQueue.length,r=[s,c,u,p,d,...y],a=[l];d.hidden=n||0===o.length,l.hidden=!n&&o.length>0,A.innerHTML="";for(var t=0;t<i.length;++t){0!==t&&A.appendChild(document.createTextNode(" "));const r=document.createElement("span");r.innerText=i[t].displayName;const a=e.operationQueue.length+o.length,s=i.length-a-1;n&&t==s?r.className="algorithm-current":t<=s&&(r.className="algorithm-done"),A.appendChild(r)}r.forEach(e=>{e.disabled=n}),a.forEach(e=>{e.disabled=!n})};m(),e.addQueueChangeListener(m),n.appendChild(r),n.appendChild(a),n.appendChild(t)},C=(e,n,r)=>Math.abs(e)+Math.abs(n)+Math.abs(r),B=e=>{const[n,r,a]=e.userData;e.position.set(n,r,a),e.rotation.set(0,0,0),e.updateMatrix()},I=(e,n,r)=>{const{plane:t,direction:i,layers:o,quarterTurns:s}=n,c=s*Math.PI/2;var l=c;const[d,u]=((e,n,r)=>{const a=[];let t=null;function i(e,n,r){switch(r){case-1:return 0===e||0==n;case 1:return 0===e||e===n;case 2:return 0===e||e===n||0==n;case 3:return!0}}const o=f[n].center;function s(e,n,r,a){return i(o[0],e,a)&&i(o[1],n,a)&&i(o[2],r,a)}return e.forEach(e=>{const[n,i,o]=e.userData;s(n,i,o,r)&&a.push(e),1===C(n,i,o)&&s(n,i,o,1)&&(t=e)}),[t,a]})(e,t,o);return{step(){if(l<=0)return;const e=.07*(1.1-Math.pow((2*l-c)/c,2))*s*r;l-=e,u.forEach(n=>{!function(e,n,r,a){e.position.sub(n),e.position.applyAxisAngle(r,a),e.position.add(n),e.rotateOnAxis(r,a)}(n,new a.q(0,0,0),d.position,e*i),n.updateMatrix()})},reset(){u.forEach(e=>B(e))},finished:()=>l<=0}},k=()=>{var e=function(e,n,r,t,i){let o=new a.k,s=1e-5,c=t-s;o.absarc(s,s,s,-Math.PI/2,-Math.PI,!0),o.absarc(s,n-2*c,s,Math.PI,Math.PI/2,!0),o.absarc(e-2*c,n-2*c,s,Math.PI/2,0,!0),o.absarc(e-2*c,s,s,0,-Math.PI/2,!0);let l=new a.c(o,{depth:r-2*t,bevelEnabled:!0,bevelSegments:2*i,steps:1,bevelSize:c,bevelThickness:t,curveSegments:i});return l.center(),l}(1,1,1,.07,5),n=new a.g({color:3355443,opacity:1});return new a.f(e,n)},x=(e,n,r,t)=>{if(void 0!==t){var i=document.createElement("canvas");i.height=256,i.width=256;var o=i.getContext("2d");const e=75,n=""+t;o.font=e+"pt Arial",o.fillStyle="white",o.fillRect(0,0,i.width,i.height),o.textAlign="center",o.textBaseline="middle",o.fillStyle="black",o.fillText(n,i.width/2,i.height/2);var s=new a.o(i);s.offset.set(.5,.5),s.needsUpdate=!0}const c=function(e,n,r){let t=new a.k;t.absarc(-e/2+r,-n/2+r,r,-Math.PI/2,-Math.PI,!0),t.absarc(-e/2+r,n/2-r,r,Math.PI,Math.PI/2,!0),t.absarc(e/2-r,n/2-r,r,Math.PI/2,0,!0),t.absarc(e/2-r,-n/2+r,r,0,-Math.PI/2,!0);const i=new a.l(t,5);return i.center(),i}(.88,.88,.05);c.center();const l=new a.g({color:0,map:s||null,side:a.a,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4});var d=new a.f(c,l);return 0!==e?d.rotateY(e*(Math.PI/2)):0!==n?d.rotateX(-n*(Math.PI/2)):-1==r&&d.rotateY(Math.PI),d.position.set(e/2,n/2,r/2),d.matrixAutoUpdate=!1,d.updateMatrix(),d.userData=[e,n,r],d};!async function(){var e=await(async()=>{const e=await d()({locateFile:e=>e.endsWith(".wasm")?u:e});return e._init(),{performOperation:p.performOperation.bind(void 0,e),recolor:p.performOperation.bind(void 0,e),solve:p.solve.bind(void 0,e),scramble:p.scramble.bind(void 0,e)}})();window._runtime=e;var n=new a.j,r=new a.h(75,window.innerWidth/window.innerHeight,.1,1e3);r.position.z=6,n.add(r);var i=new a.r({antialias:!0});i.setClearColor(16118512),i.setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(i.domElement);const o=new t.a(r,i.domElement);o.enableDamping=!0,o.dampingFactor=.25,o.enableZoom=!0,o.enableKeys=!1,o.enablePan=!1,o.minDistance=4,o.maxDistance=8,o.update();const[s,c,l]=(()=>{const e=[],n=[],r=new a.d;r.matrixAutoUpdate=!1;for(var t=-1;t<2;++t)for(var i=-1;i<2;++i)for(var o=-1;o<2;++o){const a=[];switch(C(t,i,o)){case 0:continue;case 1:{const e=f.find(({center:[e,n,r]})=>e==t&&n==i&&r==o).name;a.push(x(t,i,o,e));break}case 2:0==t?(a.push(x(t,i,0)),a.push(x(t,0,o))):0==i?(a.push(x(t,i,0)),a.push(x(0,i,o))):0==o&&(a.push(x(t,0,o)),a.push(x(0,i,o)));break;case 3:a.push(x(t,0,0)),a.push(x(0,i,0)),a.push(x(0,0,o))}const s=k();s.userData=[t,i,o],s.matrixAutoUpdate=!1,B(s),s.add(...a),e.push(...a),r.add(s),n.push(s)}return[r,n,e]})();n.add(s);var h,g=!1;const b={runtime:e,currentCube:[...m],operationQueue:[],queueListeners:[],animationSpeed:1,checkAndStartRendering(){g||(g=!0,window.requestAnimationFrame(h))},setColors(e){this.currentCube=e,((e,n)=>{for(var r=0;r<54;++r)e[y[r]].material.color.setHex(A[n[r]])})(l,this.currentCube),this.checkAndStartRendering()},enqueueOperation(...e){this.operationQueue.push(...e),this.queueListeners.forEach(e=>e()),this.checkAndStartRendering()},clearQueue(){this.operationQueue=[],this.queueListeners.forEach(e=>e())},addQueueChangeListener(e){this.queueListeners.push(e)}};var w=null,T=null;h=()=>{null!==T?w.finished()?(w.reset(),b.setColors(e.performOperation(b.currentCube,T.code)),T=null):w.step():0!==b.operationQueue.length?(T=b.operationQueue.shift(),b.queueListeners.forEach(e=>e()),w=I(c,T,b.animationSpeed)):g=!1,g&&window.requestAnimationFrame(h),i.render(n,r)},v(b),o.addEventListener("change",()=>b.checkAndStartRendering()),window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight),b.checkAndStartRendering()},!1),b.setColors([...m]),b.checkAndStartRendering()}(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(r.p+"service-worker.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})})}],[[10,1,2]]]);
//# sourceMappingURL=main.8d8d70ac.js.map