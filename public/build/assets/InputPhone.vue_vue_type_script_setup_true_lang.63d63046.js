var c=Object.defineProperty;var d=(l,t,e)=>t in l?c(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var i=(l,t,e)=>(d(l,typeof t!="symbol"?t+"":t,e),e);import{d as m,r as p,e as h,o as b,c as f,a as u,u as n}from"./app.93c92701.js";class g{constructor(){i(this,"max",9)}onlyNumber(t){return t.replace(/[^-\d]/g,"")}clearMinuses(t){return t.replaceAll("-","")}limitsLetters(t){return t.substring(0,this.max)}addMinuses(t){const e=this.max-t.length;for(let r=0;r<e;r++)t+="-";return t}caretPosition(t){var e=this.clearMinuses(t.value);e=e.trimEnd(),t.selectionStart=e.length,t.selectionEnd=e.length}placeholder(e){var e=this.onlyNumber(e);return e=this.clearProbels(e),e=this.clearMinuses(e),e=this.limitsLetters(e),e=this.addMinuses(e),this.phoneFormat(e)}clearOne(t){var e=t.value;return e=this.clearProbels(e),e=this.clearMinuses(e),e=e.slice(0,-1),e=this.addMinuses(e),this.phoneFormat(e)}clearAll(t){var e=t.value;return e=this.clearProbels(e),e=this.clearMinuses(e),e=e.substring(10),e=this.addMinuses(e),this.phoneFormat(e)}phoneFormat(t){var e=t.toString();return e.replace(/([-\d]{2})([-\d]{3})([-\d]{2})([-\d]{2})/,"$1 $2 $3 $4")}clearProbels(t){return t=""+t,t.replaceAll(" ","")}input(t){t.target.value=this.placeholder(t.target.value),this.caretPosition(t.target)}keydown(t){t.keyCode==8&&(t.preventDefault(),t.ctrlKey?t.target.value=this.clearAll(t.target):t.target.value=this.clearOne(t.target),this.caretPosition(t.target))}allFormats(t){const e=this.clearProbels(t),r=this.clearMinuses(e);var s=!1;return r.length==9&&(s=!0),{number:t,clearNumber:e,fullNumber:"998"+e,pure:r,isValid:s}}}const v={class:"flex"},x=u("input",{class:"text-input w-12 mb-2 border-b font-mono bg-dark",value:"+998",disabled:""},null,-1),N=m({__name:"InputPhone",props:["activeNumber"],setup(l,{expose:t}){const{activeNumber:e}=l,r=new g,s=p(null);return t({getValues:()=>r.allFormats(s.value.value)}),h(()=>{e?s.value.value=r.placeholder(e.number):s.value.value=r.placeholder("")}),(P,a)=>(b(),f("div",v,[x,u("input",{ref_key:"inputNumber",ref:s,autocomplete:"off",inputmode:"decimal",onInput:a[0]||(a[0]=(...o)=>n(r).input&&n(r).input(...o)),onKeydown:a[1]||(a[1]=(...o)=>n(r).keydown&&n(r).keydown(...o)),onKeyup:a[2]||(a[2]=o=>n(r).caretPosition(n(s))),onClick:a[3]||(a[3]=o=>n(r).caretPosition(n(s))),class:"text-input font-mono flex-grow mb-2 ml-1",required:""},null,544)]))}});export{N as _};
