import{d as L,o as p,c as g,a as s,t as k,u as m,r as S,b as M,e as K,f as w,w as P,g as T,h as B,T as A,F as I,i as N,j as D,k as F,v as E,n as j,l as C,m as R,p as G,q as O,s as V,x as Q,y as X,z as $,A as q,B as H}from"./app.93c92701.js";import{s as z,_ as J,a as W}from"./FinishedSold.vue_vue_type_script_setup_true_lang.13a965b6.js";import"./helpers.ec2122b1.js";const Y={class:"mb-2 flex text-gray-700 justify-end"},Z={class:"bg-gray-50 px-2 py-1.5 shadow-sm w-32 border-b border-pink-500"},ee=s("p",{class:"text-sm text-gray-400 leading-none mb-2 flex justify-between"},[s("span",null," Umumiy "),s("i",{class:"fa-light fa-sigma text-pink-600"})],-1),te={class:"leading-none font-semibold"},se=s("div",{class:"h-full border-l mx-8"},null,-1),ne={class:"bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32"},ae=s("p",{class:"text-sm text-gray-400 leading-none mb-2 flex justify-between"},[s("span",null," Naxt "),s("i",{class:"fa-light fa-sack-dollar text-teal-600"})],-1),ie={class:"leading-none font-semibold"},oe={class:"bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32 mx-6"},re=s("p",{class:"text-sm text-gray-400 leading-none mb-2 flex justify-between"},[s("span",null," Plastik "),s("i",{class:"fa-light fa-money-check-dollar text-sky-600"})],-1),le={class:"leading-none font-semibold"},ce={class:"bg-gray-50 px-2 py-1.5 shadow-sm rounded w-32"},de=s("p",{class:"text-sm text-gray-400 leading-none mb-2 flex justify-between"},[s("span",null," Qarz "),s("i",{class:"fa-light fa-money-check-dollar-pen text-pink-600"})],-1),ue={class:"leading-none font-semibold"},fe=L({__name:"SummSale",setup(_){const u=z();return u.getDayInfo(),(l,e)=>(p(),g("section",Y,[s("div",Z,[ee,s("div",te,k(+m(u).Summa.cash+ +m(u).Summa.debt+ +m(u).Summa.electron),1)]),se,s("div",ne,[ae,s("div",ie,k(m(u).Summa.cash),1)]),s("div",oe,[re,s("div",le,k(m(u).Summa.electron),1)]),s("div",ce,[de,s("div",ue,k(m(u).Summa.debt),1)])]))}}),pe={class:"text-right bg-gray-100 border-b mb-0"},he=s("i",{class:"fa-light fa-minus relative top-px"},null,-1),me=[he],ve=s("i",{class:"far fa-times text-red-500"},null,-1),ye=[ve],ge={class:"flex-grow overflow-hidden overflow-y-auto list-products shadow-inner px-3"},_e={class:"w-full text-center mt-1"},be=s("tr",null,[s("td",{class:"py-2 font-semibold"},"Nomi"),s("td",{class:"py-2 font-semibold"},"Hajmi"),s("td",{class:"py-2 font-semibold"},"Narxi"),s("td",{class:"py-2 font-semibold"},"Soni"),s("td",{class:"py-2 font-semibold"},"Do'kondagi soni"),s("td",{class:"py-2 font-semibold"},"Umumiy narxi"),s("td",{class:"py-2 font-semibold"})],-1),xe=s("td",{class:"py-4 sticky bottom-0 bg-white",colspan:"4"},null,-1),we=s("td",{class:"py-3 sticky bottom-0 bg-white font-semibold text-[18px]"},"Umumiy summa",-1),ke={class:"py-4 sticky bottom-0 bg-white font-semibold text-[18px]"},Pe=s("td",{class:"py-4 sticky bottom-0 bg-white"},null,-1),Ce={class:"bg-white p-3 border-t text-right flex justify-between items-center"},Te=["disabled"],Se={key:0},De={key:1},Le=s("i",{class:"fa-light fa-arrow-right-long relative top-px ml-3 text-pink-500"},null,-1),$e=L({__name:"ListProductsSold",props:["listProducts"],emits:["close","sold","onrollup","onFinished"],setup(_,{emit:u}){const{listProducts:l}=_,e=R("getProductById",null),t=S(),a=S(!1);function n(){e(t.value),t.value=null}const c=M(()=>{const o=l.reduce((i,r)=>i+r.selled_price*r.totalCount,0);return Math.trunc(o*1e3)/1e3});function h(){a.value=!0,u("onFinished",a.value)}function y(){a.value=!1,u("onFinished",a.value)}const f=o=>{l.splice(o,1),l.length==0&&u("close")};return K(()=>{const o=document.getElementById("ListProducts");o.focus(),o.onkeyup=i=>{i.which==13&&i.ctrlKey?h():i.which==27&&u("close")}}),(o,i)=>(p(),g("section",{onClick:i[6]||(i[6]=r=>o.$emit("onrollup")),tabindex:"0",id:"ListProducts",class:"full-absolute flex-center p-4 pb-16 outline-none z-[100]"},[s("main",{onClick:i[5]||(i[5]=D(()=>{},["stop"])),class:"min-w-[630px] w-[900px] bg-white h-full flex flex-col justify-between relative"},[w(A,{name:"scale"},{default:P(()=>[a.value?(p(),T(J,{key:0,onClose:y,listProducts:_.listProducts,totalPrice:m(c),onSold:i[0]||(i[0]=r=>o.$emit("sold",r))},null,8,["listProducts","totalPrice"])):B("",!0)]),_:1}),s("header",pe,[s("button",{onClick:i[1]||(i[1]=r=>o.$emit("onrollup")),class:"px-4 py-2 hover:bg-gray-200"},me),s("button",{onClick:i[2]||(i[2]=r=>o.$emit("close")),class:"px-4 py-2 hover:bg-gray-200"},ye)]),s("main",ge,[s("table",_e,[be,(p(!0),g(I,null,N(_.listProducts,(r,d)=>(p(),T(W,{product:r,key:d,onDelete:v=>f(d)},null,8,["product","onDelete"]))),128)),s("tr",null,[xe,we,s("td",ke,k(m(c)),1),Pe])])]),s("footer",Ce,[s("form",{onSubmit:i[4]||(i[4]=D(r=>n(),["prevent"]))},[F(s("input",{type:"text",class:"text-input bg-inherit border","onUpdate:modelValue":i[3]||(i[3]=r=>t.value=r),placeholder:"Sotish ID-NNN"},null,512),[[E,t.value]])],32),s("button",{disabled:m(c)==0,onClick:h,class:j([{"!border-gray-300 text-gray-400 cursor-disabled bg-gray-300":m(c)==0},"py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 hover:bg-pink-100 active:bg-pink-50"])},[m(c)==0?(p(),g("span",Se," Mahsulot kiriting ")):(p(),g("span",De,[C(" Davom ettirish "),Le]))],10,Te)])])]))}});var U={exports:{}};(function(_,u){(function(l,e){_.exports=e()})(G,function(){var l={attachTo:function(e,t){if(e.scannerDetectionData!==void 0)throw new Error("onScan.js is already initialized for DOM element "+e);var a={onScan:function(n,c){},onScanError:function(n){},onKeyProcess:function(n,c){},onKeyDetect:function(n,c){},onPaste:function(n,c){},keyCodeMapper:function(n){return l.decodeKeyEvent(n)},onScanButtonLongPress:function(){},scanButtonKeyCode:!1,scanButtonLongPressTime:500,timeBeforeScanTest:100,avgTimeByChar:30,minLength:6,suffixKeyCodes:[9,13],prefixKeyCodes:[],ignoreIfFocusOn:!1,stopPropagation:!1,preventDefault:!1,captureEvents:!1,reactToKeydown:!0,reactToPaste:!1,singleScanQty:1};return t=this._mergeOptions(a,t),e.scannerDetectionData={options:t,vars:{firstCharTime:0,lastCharTime:0,accumulatedString:"",testTimer:!1,longPressTimeStart:0,longPressed:!1}},t.reactToPaste===!0&&e.addEventListener("paste",this._handlePaste,t.captureEvents),t.scanButtonKeyCode!==!1&&e.addEventListener("keyup",this._handleKeyUp,t.captureEvents),(t.reactToKeydown===!0||t.scanButtonKeyCode!==!1)&&e.addEventListener("keydown",this._handleKeyDown,t.captureEvents),this},detachFrom:function(e){e.scannerDetectionData.options.reactToPaste&&e.removeEventListener("paste",this._handlePaste),e.scannerDetectionData.options.scanButtonKeyCode!==!1&&e.removeEventListener("keyup",this._handleKeyUp),e.removeEventListener("keydown",this._handleKeyDown),e.scannerDetectionData=void 0},getOptions:function(e){return e.scannerDetectionData.options},setOptions:function(e,t){switch(e.scannerDetectionData.options.reactToPaste){case!0:t.reactToPaste===!1&&e.removeEventListener("paste",this._handlePaste);break;case!1:t.reactToPaste===!0&&e.addEventListener("paste",this._handlePaste);break}switch(e.scannerDetectionData.options.scanButtonKeyCode){case!1:t.scanButtonKeyCode!==!1&&e.addEventListener("keyup",this._handleKeyUp);break;default:t.scanButtonKeyCode===!1&&e.removeEventListener("keyup",this._handleKeyUp);break}return e.scannerDetectionData.options=this._mergeOptions(e.scannerDetectionData.options,t),this._reinitialize(e),this},decodeKeyEvent:function(e){var t=this._getNormalizedKeyNum(e);switch(!0){case(t>=48&&t<=90):case(t>=106&&t<=111):if(e.key!==void 0&&e.key!=="")return e.key;var a=String.fromCharCode(t);switch(e.shiftKey){case!1:a=a.toLowerCase();break;case!0:a=a.toUpperCase();break}return a;case(t>=96&&t<=105):return 0+(t-96)}return""},simulate:function(e,t){return this._reinitialize(e),Array.isArray(t)?t.forEach(function(a){var n={};(typeof a=="object"||typeof a=="function")&&a!==null?n=a:n.keyCode=parseInt(a);var c=new KeyboardEvent("keydown",n);document.dispatchEvent(c)}):this._validateScanCode(e,t),this},_reinitialize:function(e){var t=e.scannerDetectionData.vars;t.firstCharTime=0,t.lastCharTime=0,t.accumulatedString=""},_isFocusOnIgnoredElement:function(e){var t=e.scannerDetectionData.options.ignoreIfFocusOn;if(!t)return!1;var a=document.activeElement;if(Array.isArray(t)){for(var n=0;n<t.length;n++)if(a.matches(t[n])===!0)return!0}else if(a.matches(t))return!0;return!1},_validateScanCode:function(e,t){var a=e.scannerDetectionData,n=a.options,c=a.options.singleScanQty,h=a.vars.firstCharTime,y=a.vars.lastCharTime,f={},o;switch(!0){case t.length<n.minLength:f={message:"Receieved code is shorter then minimal length"};break;case y-h>t.length*n.avgTimeByChar:f={message:"Receieved code was not entered in time"};break;default:return n.onScan.call(e,t,c),o=new CustomEvent("scan",{detail:{scanCode:t,qty:c}}),e.dispatchEvent(o),l._reinitialize(e),!0}return f.scanCode=t,f.scanDuration=y-h,f.avgTimeByChar=n.avgTimeByChar,f.minLength=n.minLength,n.onScanError.call(e,f),o=new CustomEvent("scanError",{detail:f}),e.dispatchEvent(o),l._reinitialize(e),!1},_mergeOptions:function(e,t){var a={},n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n]);return a},_getNormalizedKeyNum:function(e){return e.which||e.keyCode},_handleKeyDown:function(e){var t=l._getNormalizedKeyNum(e),a=this.scannerDetectionData.options,n=this.scannerDetectionData.vars,c=!1;if(a.onKeyDetect.call(this,t,e)!==!1&&!l._isFocusOnIgnoredElement(this)){if(a.scanButtonKeyCode!==!1&&t==a.scanButtonKeyCode){n.longPressed||(n.longPressTimer=setTimeout(a.onScanButtonLongPress,a.scanButtonLongPressTime,this),n.longPressed=!0);return}switch(!0){case(n.firstCharTime&&a.suffixKeyCodes.indexOf(t)!==-1):e.preventDefault(),e.stopImmediatePropagation(),c=!0;break;case(!n.firstCharTime&&a.prefixKeyCodes.indexOf(t)!==-1):e.preventDefault(),e.stopImmediatePropagation(),c=!1;break;default:var h=a.keyCodeMapper.call(this,e);if(h===null)return;n.accumulatedString+=h,a.preventDefault&&e.preventDefault(),a.stopPropagation&&e.stopImmediatePropagation(),c=!1;break}n.firstCharTime||(n.firstCharTime=Date.now()),n.lastCharTime=Date.now(),n.testTimer&&clearTimeout(n.testTimer),c?(l._validateScanCode(this,n.accumulatedString),n.testTimer=!1):n.testTimer=setTimeout(l._validateScanCode,a.timeBeforeScanTest,this,n.accumulatedString),a.onKeyProcess.call(this,h,e)}},_handlePaste:function(e){var t=this.scannerDetectionData.options,a=this.scannerDetectionData.vars,n=(event.clipboardData||window.clipboardData).getData("text");l._isFocusOnIgnoredElement(this)||(e.preventDefault(),t.stopPropagation&&e.stopImmediatePropagation(),t.onPaste.call(this,n,event),a.firstCharTime=0,a.lastCharTime=0,l._validateScanCode(this,n))},_handleKeyUp:function(e){if(!l._isFocusOnIgnoredElement(this)){var t=l._getNormalizedKeyNum(e);t==this.scannerDetectionData.options.scanButtonKeyCode&&(clearTimeout(this.scannerDetectionData.vars.longPressTimer),this.scannerDetectionData.vars.longPressed=!1)}},isScanInProgressFor:function(e){return e.scannerDetectionData.vars.firstCharTime>0},isAttachedTo:function(e){return e.scannerDetectionData!==void 0}};return l})})(U);const Ke=U.exports,Be={name:"indexSale",class:"flex flex-col"},Ie={class:"flex-between-center mb-3"},Ne=s("i",{class:"fa-light fa-arrow-up-from-dotted-line text-red-600 mr-4"},null,-1),Fe=s("span",{class:"px-4"},null,-1),Ee=s("i",{class:"fa-light fa-arrow-down-to-dotted-line text-blue-600 mr-4"},null,-1),je={class:"-mb-4 -mx-4 px-3 py-2 relative z-[100] bg-white text-gray-500"},ze=["onClick"],Ue=s("i",{class:"fa-solid fa-memo mr-1.5"},null,-1),Ge=L({__name:"IndexSale",setup(_){const u=z(),l=S(),e=O({soldGrid:null,textInBarcode:null,listProducts:[],blocker:!0,searchInput:null,activeList:null,saleSummed:null});V(()=>e.textInBarcode,o=>{var i=null;o==null||e.blocker==!1||(e.blocker=!1,o.includes(window.location.host)?i=o.slice(o.lastIndexOf("/")+1):i=o.replace("product",""),t(i))});function t(o){e.searchInput=null,e.activeList==null&&(e.activeList=e.listProducts.push([])-1);const i=e.listProducts[e.activeList].find(r=>r.id==o);if(i)return i.count>i.totalCount&&i.totalCount++,e.blocker=!0;axios.get(`products/${o}`).then(({data:r})=>{e.blocker=!0,r.id?(r.totalCount=1,r.selled_price=r.price,e.listProducts[e.activeList].push(r)):(e.listProducts[e.activeList].length==0&&(e.listProducts.splice(e.activeList,1),e.activeList=null),swal.fire({text:"Mahsulot mavjud emas!",showCancelButton:!1,timer:1e3}))})}function a(){e.listProducts.splice(e.activeList,1),e.activeList=null,e.blocker=!0,f(!1)}function n(){e.activeList=null,e.blocker=!0}function c(o){e.activeList=null,setTimeout(()=>e.activeList=o,150)}function h(o){o.sells.forEach(i=>{if(l.value.productNames){const d=l.value.productNames.agGrid.api.getRowNode(i.product_names_id),b=d.data.products.find(x=>i.product_id==x.id).count-i.count;b==0?d.data.products=d.data.products.filter(x=>i.product_id!=x.id):d.data.products.forEach(x=>{x.id==i.product_id&&(x.count=b)}),d.setData(d.data)}if(l.value.products){const r=l.value.products.productAgGrid.api,d=r.getRowNode(i.product_id),v=d.data.count-i.count;v==0?r.applyTransaction({remove:[d.data]}):(d.data.count=v,d.setData(d.data))}}),l.value.SellAgGrid&&l.value.SellAgGrid.api.applyTransaction({add:[o],addIndex:0}),u.getDayInfo(),a()}document.scannerDetectionData==null&&Ke.attachTo(document);function y(o){setTimeout(()=>{e.textInBarcode=o.detail.scanCode,setTimeout(()=>e.textInBarcode=null)},50)}K(()=>document.addEventListener("scan",y)),Q(()=>document.removeEventListener("scan",y)),H("getProductById",t);function f(o){o?document.removeEventListener("scan",y):document.addEventListener("scan",y)}return(o,i)=>{const r=$("RouterLink"),d=$("RouterView");return p(),g("section",Be,[w(X,{name:"fade"},{default:P(()=>[e.activeList!=null&&e.listProducts[e.activeList].length?(p(),T($e,{key:0,onClose:a,onSold:h,onOnrollup:n,onOnFinished:f,listProducts:e.listProducts[e.activeList]},null,8,["listProducts"])):B("",!0)]),_:1}),w(fe),s("aside",Ie,[s("div",null,[w(r,{to:"/soldproducts",class:"py-1.5 inline-block"},{default:P(()=>[Ne,C(" Sotilgan ")]),_:1}),Fe,w(r,{to:"/existproduct",class:"py-1.5 inline-block"},{default:P(()=>[Ee,C(" Do'kondagi ")]),_:1})]),s("form",{onSubmit:i[1]||(i[1]=D(v=>t(e.searchInput),["prevent"]))},[F(s("input",{type:"text",class:"text-input bg-inherit text-center text-gray-600","onUpdate:modelValue":i[0]||(i[0]=v=>e.searchInput=v),placeholder:"Sotish ID-XXX"},null,512),[[E,e.searchInput]])],32)]),w(d,null,{default:P(({Component:v})=>[(p(),T(q(v),{ref_key:"tables",ref:l,class:"h-full"},null,512))]),_:1}),s("main",je,[(p(!0),g(I,null,N(e.listProducts,(v,b)=>(p(),g("button",{onClick:x=>c(b),key:b,class:j([{"bg-pink-500 text-white":b==e.activeList},"px-3 py-1 bg-gray-200 rounded-sm mr-3 border-b border-pink-600 transition-all"])},[Ue,C(" "+k(b+1),1)],10,ze))),128))])])}}});export{Ge as default};
