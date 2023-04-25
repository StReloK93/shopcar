import{u as O,P as j,a as M}from"./Products.8f1f3be8.js";import{d as b,a as w,b as n,e as l,f as e,t as D,u as d,n as f,i as F,l as k,K as U,F as C,j as T,h as v,z as I,v as $,q as S,r as N,s as A,I as B,k as V,m as E,g,_ as L}from"./app.0e1eeed2.js";const q={class:"mb-2"},G={class:"px-2"},K={key:0,class:"pl-6"},H=b({__name:"TreeItemFree",props:{category:Object,PageData:Object,Categories:Object},setup(a){const{category:r,PageData:s,Categories:u}=a;r.isOpen=!1;const o=w(()=>r.children_categories&&r.children_categories.length);function i(){if(o.value)u.forEach(t=>{t.id==r.id?t.isOpen=!t.isOpen:t.isOpen=!1});else{if(s.category_id==r.id)return s.category_id=null,s.category_name=null;s.category_id=r.id,s.category_name=r.name}}return(t,p)=>{const P=I("TreeItemFree",!0);return n(),l("section",q,[e("div",{onmousedown:"return false",onClick:i,class:f([{"!bg-pink-500 text-white":a.PageData.category_id==a.category.id,"border-pink-600":d(o)==!1},"cursor-pointer flex-between-center py-1 w-full bg-gray-100 border-l-2"])},[e("span",G,D(a.category.name),1),d(o)?(n(),l("i",{key:0,class:f([{"rotate-180":a.category.isOpen},"mx-2 far fa-angle-down"])},null,2)):F("",!0)],2),d(o)?k((n(),l("ul",K,[(n(!0),l(C,null,T(a.category.children_categories,x=>(n(),v(P,{class:"my-2",key:x.id,Categories:a.category.children_categories,category:x,PageData:a.PageData},null,8,["Categories","category","PageData"]))),128))],512)),[[U,a.category.isOpen]]):F("",!0)])}}}),J={key:0,class:"fal fa-check text-teal-600"},Q={key:1,class:"fal fa-check text-teal-600"},R={key:2,class:"fal fa-check text-teal-600"},W={key:3,class:"fal fa-check text-teal-600"},X={key:4,class:"fas fa-circle text-red-600 text-[8px]"},h=b({__name:"Validate",props:["FormData","keyname","inputType","value"],setup(a){return(r,s)=>a.inputType=="string"&&a.FormData[a.keyname].trim()!=""?(n(),l("i",J)):a.inputType=="number"&&a.FormData[a.keyname]!=""?(n(),l("i",Q)):a.inputType=="nullable"&&a.FormData[a.keyname]!=null?(n(),l("i",R)):a.inputType=="array"&&a.value!=0?(n(),l("i",W)):(n(),l("i",X))}}),Y=b({__name:"Select",props:["FormData","PageData"],setup(a){const{FormData:r,PageData:s}=a;function u(o){if(r.products=[],o==null)return;const{sizes:i}=s.sizeNames.find(t=>t.id==o);i.forEach(t=>{r.products.push({id:t.id,name:t.name,count:0})})}return(o,i)=>{const t=I("vSelect");return n(),v(t,{class:"selects mb-2",options:a.PageData.sizeNames,"onUpdate:modelValue":[u,i[0]||(i[0]=p=>a.FormData.size_names_id=p)],reduce:p=>p.id,modelValue:a.FormData.size_names_id,label:"name",placeholder:"Tanlang"},null,8,["options","reduce","modelValue"])}}}),Z={key:0,class:"flex min-w-min mb-2 relative z-50 bg-gray-50"},ee=["onClick"],te=e("i",{class:"far fa-angle-up"},null,-1),ae=[te],se={class:"bg-gray-200 rounded-sm shadow flex flex-col items-center justify-between overflow-hidden"},ne={class:"w-10 text-center py-1 bg-gray-500 text-gray-100"},oe=["onUpdate:modelValue"],le=["disabled","onClick"],ie=e("i",{class:"far fa-angle-down"},null,-1),re=[ie],ce={key:1,class:"flex min-w-min mb-2 relative z-50 bg-gray-50 border-y"},de={class:"flex flex-col mr-1.5 text-gray-300"},ue=e("main",{class:"size-button mb-1"},[e("i",{class:"far fa-angle-up"})],-1),me={class:"bg-gray-200 rounded shadow flex flex-col items-center justify-between"},_e=e("span",{class:"w-10 text-center py-1 bg-gray-100 text-gray-300"},"\u041A\u043E\u043B",-1),pe={class:"w-10 text-center py-1"},ge=e("main",{class:"size-button mt-1"},[e("i",{class:"far fa-angle-down"})],-1),ye=b({__name:"Size",props:["FormData"],setup(a){const r=s=>{s.count>0&&s.count--};return(s,u)=>a.FormData.products.length!=0?(n(),l("main",Z,[(n(!0),l(C,null,T(a.FormData.products,(o,i)=>(n(),l("div",{key:i,class:f([{"mr-0":i==a.FormData.products.length-1},"flex flex-col mr-1.5"])},[e("main",{onClick:t=>o.count++,class:"size-button mb-1"},ae,8,ee),e("aside",se,[e("span",ne,D(o.name),1),k(e("input",{class:f([{"bg-pink-500 text-white":o.count!=0},"w-10 text-center py-1 outline-none px-0"]),type:"number",step:"0.001","onUpdate:modelValue":t=>o.count=t},null,10,oe),[[$,o.count]])]),e("main",{disabled:o.count==0,onClick:t=>r(o),class:f([{"text-gray-300":o.count==0},"size-button mt-1"])},re,10,le)],2))),128))])):(n(),l("main",ce,[(n(),l(C,null,T(5,o=>e("div",de,[ue,e("aside",me,[_e,e("span",pe,D(o),1)]),ge])),64))]))}}),fe=["onSubmit"],be=e("i",{class:"far fa-times py-3 px-4 text-red-600"},null,-1),xe=[be],he=e("h3",{class:"font-bold text-xl mb-2 text-gray-600"}," Mahsulot turini tanlang ",-1),ke={class:"mb-2 cursor-pointer"},ve=e("label",{class:"text-gray-400 mb-1 flex-between-center"},[e("span",null,"Mahsulot turi")],-1),we={key:0,class:"text-input rounde-sm bg-pink-500 text-white"},$e={class:"font-semibold"},De={key:1,class:"text-input px-0 flex-between-center"},Fe=e("i",{class:"fas fa-exclamation text-red-500 mr-0.5"},null,-1),Ce={class:"mb-2"},Te={class:"text-gray-400 mb-1 flex-between-center"},Pe=e("span",null,"Mahsulot nomi",-1),Ne=["disabled"],ze={class:"mb-2"},Se={class:"text-gray-400 mb-1 flex-between-center"},Ve=e("span",null,"Tan narxi",-1),Ie=["disabled"],Oe={class:"mb-2"},je={class:"text-gray-400 mb-1 flex-between-center"},Me=e("span",null,"Sotiladigan narxi",-1),Ue=["disabled"],Ae={class:"mb-2"},Be={class:"text-gray-400 mb-1 flex-between-center"},Ee=e("span",null,"O'lcham turi",-1),Le={class:"text-gray-400 mb-1 flex-between-center"},qe=e("span",null,"O'lchamlar",-1),Ge=["disabled"],Ke={key:1,class:"text-rose-500 text-center mt-2"},He=b({__name:"FormAddProduct",emits:["create-product"],setup(a,{emit:r}){const s=S({categories:[],sizeNames:[],selectCategory:!1,category_id:null,category_name:null});function u(m){s.selectCategory=m}axios.all([axios.get("categories"),axios.get("sizenames")]).then(axios.spread((m,c)=>{s.categories=m.data,s.sizeNames=c.data}));const o={name:"",original_price:"",price:"",size_names_id:null,products:[],category_id:null},i=N(!1),t=S({...o});A(()=>s.category_id,m=>{s.selectCategory=!1});const p=B();function P(){if(x.value==!1)return i.value=!0,setTimeout(()=>i.value=!1,3e3);t.category_id=s.category_id,axios.post("/productnames",t).then(({data:m})=>{Object.assign(t,o),r("create-product",m),p.productName=null,setTimeout(()=>p.productName=m)})}const x=w(()=>t.name.trim()!=""&&t.original_price!=""&&t.price!=""&&t.size_names_id!=null&&z.value!=0),y=w(()=>s.category_id==null),z=w(()=>t.products.length==0?0:t.products.reduce((m,c)=>m+ +c.count,0));return(m,c)=>(n(),l("form",{onSubmit:V(P,["prevent"]),class:"w-60"},[s.selectCategory?(n(),l("section",{key:0,onClick:c[2]||(c[2]=_=>u(!1)),class:"full-absolute items-start z-[100] p-8"},[e("main",{onClick:c[1]||(c[1]=V(()=>{},["stop"])),class:"bg-white min-w-[630px] w-[900px] max-h-full border-t-2 border-pink-500 px-4 py-3 relative"},[e("button",{onClick:c[0]||(c[0]=_=>u(!1)),type:"button",class:"absolute top-0 right-0 hover:bg-gray-100"},xe),he,(n(!0),l(C,null,T(s.categories,_=>(n(),v(H,{Categories:s.categories,category:_,PageData:s},null,8,["Categories","category","PageData"]))),256))])])):F("",!0),e("div",ke,[ve,e("main",{onClick:c[3]||(c[3]=_=>u(!0))},[s.category_name?(n(),l("div",we,[e("span",$e,D(s.category_name),1)])):(n(),l("div",De,[E(" Tanlang "),Fe]))])]),e("div",Ce,[e("label",Te,[Pe,g(h,{FormData:t,keyname:"name",inputType:"string"},null,8,["FormData"])]),k(e("input",{type:"text","onUpdate:modelValue":c[4]||(c[4]=_=>t.name=_),class:"text-input",placeholder:"Mahsulot nomi",disabled:d(y)},null,8,Ne),[[$,t.name]])]),e("div",ze,[e("label",Se,[Ve,g(h,{FormData:t,keyname:"original_price",inputType:"number"},null,8,["FormData"])]),k(e("input",{type:"number","onUpdate:modelValue":c[5]||(c[5]=_=>t.original_price=_),class:"text-input",placeholder:"Tan narxi",disabled:d(y)},null,8,Ie),[[$,t.original_price]])]),e("div",Oe,[e("label",je,[Me,g(h,{FormData:t,keyname:"price",inputType:"number"},null,8,["FormData"])]),k(e("input",{type:"number","onUpdate:modelValue":c[6]||(c[6]=_=>t.price=_),class:"text-input",placeholder:"Sotiladigan narxi",disabled:d(y)},null,8,Ue),[[$,t.price]])]),e("div",Ae,[e("label",Be,[Ee,g(h,{FormData:t,keyname:"size_names_id",inputType:"nullable"},null,8,["FormData"])]),g(Y,{PageData:s,FormData:t,disabled:d(y)},null,8,["PageData","FormData","disabled"])]),e("label",Le,[qe,g(h,{FormData:t,keyname:"sizes",value:d(z),inputType:"array"},null,8,["FormData","value"])]),g(ye,{class:"-mx-4 px-4",FormData:t},null,8,["FormData"]),e("button",{class:f([{"!bg-gray-200":d(y),"!bg-pink-500 text-white":d(x)&&d(y)==!1},"px-2 py-0.5 bg-gray-300 rounded-sm w-full shadow active:bg-gray-200"]),disabled:d(y),type:"submit"}," Kiritish ",10,Ge),i.value?(n(),l("div",Ke," Malumotlar to'liq kiritilmagan ")):F("",!0)],40,fe))}}),Je={class:"relative flex items-start",name:"indexSale"},Qe=b({__name:"IndexIntroduction",setup(a){const r=O(),s=N(null),u=N(null);function o(i){i.products.forEach(t=>t.product_names={name:i.name}),r.getListType?s.value.agGrid.api.applyTransaction({add:[i],addIndex:0}):u.value.productAgGrid.api.applyTransaction({add:i.products,addIndex:0})}return(i,t)=>(n(),l("section",Je,[g(He,{onCreateProduct:t[0]||(t[0]=p=>o(p))}),d(r).getListType?(n(),v(j,{key:0,editable:!0,ref_key:"productNames",ref:s,class:"ml-4 pl-4 border-l h-full"},null,512)):(n(),v(M,{key:1,ref_key:"products",ref:u,editable:!0,class:"ml-4 pl-4 border-l h-full"},null,512))]))}});const Xe=L(Qe,[["__scopeId","data-v-bdc717da"]]);export{Xe as default};
