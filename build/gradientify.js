!function(){"use strict";var t=[];function e(){return void 0===this||Object.getPrototypeOf(this)!==e.prototype?new e:this}function n(t,e){t.map(t=>{e.appendChild(t)})}function i(t,e,n){return t.map((t,i)=>{let o=document.createElement("div");return Object.assign(o.style,{backgroundImage:t,opacity:0===i?1:0,transitionDuration:`${e/1e3}s`,zIndex:n===document.body?-999:2}),o.classList.add("gradientify-gradient"),o})}function o(t,e){setInterval(()=>{for(let e=0;e<t.length;e++)"1"===t[e].style.opacity&&(t[e].style.opacity=0,t[++e%t.length].style.opacity=1)},e+40)}e.prototype.gradientifize=function(e,r,a){let s;r.constructor!==Array?function(e){if(0===t.length){let n=new XMLHttpRequest;n.overrideMimeType("application/json"),n.open("GET","https://rawgit.com/karolsw2/gradientify.js/master/build/presets.json",!0),n.onreadystatechange=function(){4===n.readyState&&200===n.status&&(t=JSON.parse(n.responseText),e(t))},n.send(null)}else e(t)}(t=>{t.find(t=>{t.id===r&&(a=t.interval,r=t.gradients)}),n(s=i(r,a,e),e),o(s,a)}):(n(s=i(r,a,e),e),o(s,a))},window.Gradientify=e}();