if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,n,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const c={uri:location.origin+s.slice(1)};return Promise.all(n.map(s=>{switch(s){case"exports":return a;case"module":return c;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/neishauben/39f949098c6885ffee5690026ecc36fa.wasm",revision:"b39476b41c6a24c5ae815df165542a3f"},{url:"/neishauben/assets/android-chrome-144x144.png",revision:"8ff8781b9cb70a2a65d8a5cefabd149f"},{url:"/neishauben/assets/android-chrome-192x192.png",revision:"8c2973ce39a055d060537633e5c802c5"},{url:"/neishauben/assets/android-chrome-256x256.png",revision:"ad0be19fa90ea78fc115975bd032748c"},{url:"/neishauben/assets/android-chrome-36x36.png",revision:"fb78d07d8e272ab397c9cdbd7e0d10e4"},{url:"/neishauben/assets/android-chrome-384x384.png",revision:"cb7be588c247bd2e9286aee6f2d76e08"},{url:"/neishauben/assets/android-chrome-48x48.png",revision:"9adf08886f0e62e3fb0b3d092fd8484e"},{url:"/neishauben/assets/android-chrome-512x512.png",revision:"ae81c1b5d6c35001ab1d113aef0c6f15"},{url:"/neishauben/assets/android-chrome-72x72.png",revision:"8938c0ce94a8cb8ba6518b2f11b02f3e"},{url:"/neishauben/assets/android-chrome-96x96.png",revision:"a1191a0cc24997ed9dfbe9d307e25c1d"},{url:"/neishauben/assets/apple-touch-icon-1024x1024.png",revision:"1e3ef85bdecfd66f0a20761536330187"},{url:"/neishauben/assets/apple-touch-icon-114x114.png",revision:"053611e769511c78d588931526ffbe24"},{url:"/neishauben/assets/apple-touch-icon-120x120.png",revision:"d7d37e7573f9b72f1badc20026717cd1"},{url:"/neishauben/assets/apple-touch-icon-144x144.png",revision:"97331bc6556f0c0f34785c2f55f8f380"},{url:"/neishauben/assets/apple-touch-icon-152x152.png",revision:"30d2ac507037e72b9ac4ed5dbc464abf"},{url:"/neishauben/assets/apple-touch-icon-167x167.png",revision:"04627a6ac400ade3e70f1a53ffebd3c0"},{url:"/neishauben/assets/apple-touch-icon-180x180.png",revision:"a34cfb5432ea09f60532df6767f2cc5a"},{url:"/neishauben/assets/apple-touch-icon-57x57.png",revision:"86d608d4614bf77ae05c91db16d9544e"},{url:"/neishauben/assets/apple-touch-icon-60x60.png",revision:"b0256774b19ca33c554ef4a90cfa4241"},{url:"/neishauben/assets/apple-touch-icon-72x72.png",revision:"c2be365adf2f4b109d59967025191e5b"},{url:"/neishauben/assets/apple-touch-icon-76x76.png",revision:"c8458f93b7235703d1db7ad66c9c7a84"},{url:"/neishauben/assets/apple-touch-icon-precomposed.png",revision:"a34cfb5432ea09f60532df6767f2cc5a"},{url:"/neishauben/assets/apple-touch-icon.png",revision:"a34cfb5432ea09f60532df6767f2cc5a"},{url:"/neishauben/assets/apple-touch-startup-image-1125x2436.png",revision:"74d34a7b99c4ad9db77d8e6be2032daa"},{url:"/neishauben/assets/apple-touch-startup-image-1136x640.png",revision:"20f1473bd6d38bba2167c17ca9ad0d92"},{url:"/neishauben/assets/apple-touch-startup-image-1242x2208.png",revision:"23c84bdc71e97cbafe36566d8ab7afd9"},{url:"/neishauben/assets/apple-touch-startup-image-1242x2688.png",revision:"c28e612a910113d144b5e6626f51da77"},{url:"/neishauben/assets/apple-touch-startup-image-1334x750.png",revision:"24963bb2c0efddbc804326984fe8cbd0"},{url:"/neishauben/assets/apple-touch-startup-image-1536x2048.png",revision:"656fce9dac4ae112d42ec4ebafd45446"},{url:"/neishauben/assets/apple-touch-startup-image-1620x2160.png",revision:"63f335129027f7d464550a67501c339f"},{url:"/neishauben/assets/apple-touch-startup-image-1668x2224.png",revision:"cd3387cf231722f8f45ac84743cdcd68"},{url:"/neishauben/assets/apple-touch-startup-image-1668x2388.png",revision:"0f78f98a9ee19f5619c53a09531026d8"},{url:"/neishauben/assets/apple-touch-startup-image-1792x828.png",revision:"f45a863cfb3cf6c711c7c23bc9e297c8"},{url:"/neishauben/assets/apple-touch-startup-image-2048x1536.png",revision:"09503b3dd3328722f239db1d3e53eb64"},{url:"/neishauben/assets/apple-touch-startup-image-2048x2732.png",revision:"99f3036ef1ed3ca833f35376a50c92fc"},{url:"/neishauben/assets/apple-touch-startup-image-2160x1620.png",revision:"dd2282bc10622f37214fa49bdfc064aa"},{url:"/neishauben/assets/apple-touch-startup-image-2208x1242.png",revision:"d45720ca685430254f01fcb59e09a4c4"},{url:"/neishauben/assets/apple-touch-startup-image-2224x1668.png",revision:"8a022b2e35c9493a823d6f1ddbc60e82"},{url:"/neishauben/assets/apple-touch-startup-image-2388x1668.png",revision:"a93c6555982df9db6a4c6a0a5ebac452"},{url:"/neishauben/assets/apple-touch-startup-image-2436x1125.png",revision:"c345d02e8df67cb43ee2132f2ef4303a"},{url:"/neishauben/assets/apple-touch-startup-image-2688x1242.png",revision:"04710a2c6e686bf2d29c93a5e19eb770"},{url:"/neishauben/assets/apple-touch-startup-image-2732x2048.png",revision:"b8b21fc128551e021a633671a123e562"},{url:"/neishauben/assets/apple-touch-startup-image-640x1136.png",revision:"310986e75726c8e55de76c5d06d39310"},{url:"/neishauben/assets/apple-touch-startup-image-750x1334.png",revision:"ac1aa12870d013eddb346c0f1e4c78bb"},{url:"/neishauben/assets/apple-touch-startup-image-828x1792.png",revision:"4fd5b3bf00cda112ef3046bf8559f4cd"},{url:"/neishauben/assets/browserconfig.xml",revision:"7b95cea1b2d0d5b2c6c9a5bde5bc5a59"},{url:"/neishauben/assets/favicon-16x16.png",revision:"4c52f44d7a139e6795ff022c52c4be33"},{url:"/neishauben/assets/favicon-32x32.png",revision:"1101c5ee6fa9affc40cd70826d32d0fd"},{url:"/neishauben/assets/favicon-48x48.png",revision:"9adf08886f0e62e3fb0b3d092fd8484e"},{url:"/neishauben/assets/favicon.ico",revision:"be89568ca6189c0ae3d09b27f7f03211"},{url:"/neishauben/assets/firefox_app_128x128.png",revision:"78bf97ec17b04d550aa667bc1296961f"},{url:"/neishauben/assets/firefox_app_512x512.png",revision:"25fd558ca6d15c9c23a402e76f15feb2"},{url:"/neishauben/assets/firefox_app_60x60.png",revision:"d81fd361e7e66b4b69bf8f9f0b623342"},{url:"/neishauben/assets/manifest.json",revision:"11875c4cc68082304ae3a12c223c182c"},{url:"/neishauben/assets/manifest.webapp",revision:"c55a48fac56858a861884f545124eb5c"},{url:"/neishauben/assets/mstile-144x144.png",revision:"8ff8781b9cb70a2a65d8a5cefabd149f"},{url:"/neishauben/assets/mstile-150x150.png",revision:"cd57a544aff28b09544d15f40534d614"},{url:"/neishauben/assets/mstile-310x150.png",revision:"1f33b39bf9a3d02e9fa3f8d5ebfd7537"},{url:"/neishauben/assets/mstile-310x310.png",revision:"ef4bdaa68fd1744b9dc33ca8a4e31e04"},{url:"/neishauben/assets/mstile-70x70.png",revision:"17f05dd4c1482d83f912d6d0ba3a7c16"},{url:"/neishauben/d8c6d6c90bdccf76d860cc3f6dddb39c.png",revision:"ef7a02b69836dc8b6a732a54c4200dcb"},{url:"/neishauben/main.57ae7171.js",revision:"b8aca10f3ff31cdae6ac74b835d1c0c9"},{url:"/neishauben/runtime.ec10d221.js",revision:"0941ae9b8c1a7560f22ba78369eeb2a6"},{url:"/neishauben/vendors.a90ef7a0.js",revision:"eeced95d49e34af66f75c5d180e994c8"}],{})}));
//# sourceMappingURL=service-worker.js.map
