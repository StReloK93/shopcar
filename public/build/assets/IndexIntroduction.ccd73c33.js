import{g as z,s as q,u as j,P as M,a as B}from"./Products.b499b60e.js";import{B as G,r as I,c as k,d as h,a as s,b as i,e,t as C,u,n as f,h as F,k as v,I as U,F as T,i as P,g as w,z as Q,v as D,G as E,x as O,q as A,j as V,l as L,f as y,_ as K}from"./app.eed0d982.js";import{a as J,G as R}from"./useGridProductStore.df2f0e79.js";const H=G("qrcode",()=>{const t=I(JSON.parse(z("qrcode",!0))),c=k(()=>t.value);function r(m){q("qrcode",m),t.value=JSON.parse(z("qrcode",!0))}return{qrcode:t,setQrcode:r,getQrcode:c}}),W={class:"mb-2"},X={class:"px-2"},Y={key:0,class:"pl-6"},Z=h({__name:"TreeItemFree",props:{category:Object,PageData:Object,Categories:Object},setup(t){const{category:c,PageData:r,Categories:m}=t;c.isOpen=!1;const a=k(()=>c.children_categories&&c.children_categories.length);function d(){if(a.value)m.forEach(o=>{o.id==c.id?o.isOpen=!o.isOpen:o.isOpen=!1});else{if(r.category_id==c.id)return r.category_id=null,r.category_name=null;r.category_id=c.id,r.category_name=c.name}}return(o,p)=>{const n=Q("TreeItemFree",!0);return s(),i("section",W,[e("div",{onmousedown:"return false",onClick:d,class:f([{"!bg-pink-500 text-white":t.PageData.category_id==t.category.id,"border-pink-600":u(a)==!1},"cursor-pointer flex-between-center py-1 w-full bg-gray-100 border-l-2"])},[e("span",X,C(t.category.name),1),u(a)?(s(),i("i",{key:0,class:f([{"rotate-180":t.category.isOpen},"mx-2 far fa-angle-down"])},null,2)):F("",!0)],2),u(a)?v((s(),i("ul",Y,[(s(!0),i(T,null,P(t.category.children_categories,$=>(s(),w(n,{class:"my-2",key:$.id,Categories:t.category.children_categories,category:$,PageData:t.PageData},null,8,["Categories","category","PageData"]))),128))],512)),[[U,t.category.isOpen]]):F("",!0)])}}}),ee={key:0,class:"fal fa-check text-teal-600"},te={key:1,class:"fal fa-check text-teal-600"},ae={key:2,class:"fal fa-check text-teal-600"},se={key:3,class:"fal fa-check text-teal-600"},ne={key:4,class:"fas fa-circle text-red-600 text-[8px]"},x=h({__name:"Validate",props:["FormData","keyname","inputType","value"],setup(t){return(c,r)=>t.inputType=="string"&&t.FormData[t.keyname].trim()!=""?(s(),i("i",ee)):t.inputType=="number"&&t.FormData[t.keyname]!=""?(s(),i("i",te)):t.inputType=="nullable"&&t.FormData[t.keyname]!=null?(s(),i("i",ae)):t.inputType=="array"&&t.value!=0?(s(),i("i",se)):(s(),i("i",ne))}}),oe=h({__name:"Select",props:["FormData","PageData"],setup(t){const{FormData:c,PageData:r}=t;function m(a){if(c.products=[],a==null)return;const{sizes:d}=r.sizeNames.find(o=>o.id==a);d.forEach(o=>{c.products.push({id:o.id,name:o.name,count:0})})}return(a,d)=>{const o=Q("vSelect");return s(),w(o,{class:"selects mb-2",options:t.PageData.sizeNames,"onUpdate:modelValue":[m,d[0]||(d[0]=p=>t.FormData.size_names_id=p)],reduce:p=>p.id,modelValue:t.FormData.size_names_id,label:"name",placeholder:"Tanlang"},null,8,["options","reduce","modelValue"])}}}),le={key:0,class:"flex min-w-min mb-2 relative z-50 bg-gray-50"},re=["onClick"],ie=e("i",{class:"far fa-angle-up"},null,-1),ce=[ie],de={class:"bg-gray-200 rounded-sm shadow flex flex-col items-center justify-between overflow-hidden"},ue={class:"w-10 text-center py-1 bg-gray-500 text-gray-100"},me=["onUpdate:modelValue"],_e=["disabled","onClick"],ge=e("i",{class:"far fa-angle-down"},null,-1),pe=[ge],ye={key:1,class:"flex min-w-min mb-2 relative z-50 bg-gray-50 border-y"},fe={class:"flex flex-col mr-1.5 text-gray-300"},be=e("main",{class:"size-button mb-1"},[e("i",{class:"far fa-angle-up"})],-1),he={class:"bg-gray-200 rounded shadow flex flex-col items-center justify-between"},xe=e("span",{class:"w-10 text-center py-1 bg-gray-100 text-gray-300"},"\u041A\u043E\u043B",-1),ke={class:"w-10 text-center py-1"},ve=e("main",{class:"size-button mt-1"},[e("i",{class:"far fa-angle-down"})],-1),we=h({__name:"Size",props:["FormData"],setup(t){const c=r=>{r.count>0&&r.count--};return(r,m)=>t.FormData.products.length!=0?(s(),i("main",le,[(s(!0),i(T,null,P(t.FormData.products,(a,d)=>(s(),i("div",{key:d,class:f([{"mr-0":d==t.FormData.products.length-1},"flex flex-col mr-1.5"])},[e("main",{onClick:o=>a.count++,class:"size-button mb-1"},ce,8,re),e("aside",de,[e("span",ue,C(a.name),1),v(e("input",{class:f([{"bg-pink-500 text-white":a.count!=0},"w-10 text-center py-1 outline-none px-0"]),type:"number",step:"0.001","onUpdate:modelValue":o=>a.count=o},null,10,me),[[D,a.count]])]),e("main",{disabled:a.count==0,onClick:o=>c(a),class:f([{"text-gray-300":a.count==0},"size-button mt-1"])},pe,10,_e)],2))),128))])):(s(),i("main",ye,[(s(),i(T,null,P(5,a=>e("div",fe,[be,e("aside",he,[xe,e("span",ke,C(a),1)]),ve])),64))]))}}),$e=["onSubmit"],De={class:"mb-2 flex justify-between text-gray-400"},Ce=e("i",{class:"fa-sharp fa-light fa-qrcode"},null,-1),Fe=[Ce],Te=e("i",{class:"fa-light fa-barcode-read"},null,-1),Pe=[Te],Se=e("i",{class:"far fa-times py-3 px-4 text-red-600"},null,-1),Ne=[Se],ze=e("h3",{class:"font-bold text-xl mb-2 text-gray-600"}," Mahsulot turini tanlang ",-1),Oe={class:"mb-2 cursor-pointer"},Ve=e("label",{class:"text-gray-400 mb-1 flex-between-center"},[e("span",null,"Mahsulot turi")],-1),Ie={key:0,class:"text-input rounde-sm bg-pink-500 text-white"},Qe={class:"font-semibold"},qe={key:1,class:"text-input px-0 flex-between-center"},je=e("i",{class:"fas fa-exclamation text-red-500 mr-0.5"},null,-1),Me={class:"mb-2"},Be={class:"text-gray-400 mb-1 flex-between-center"},Ge=e("span",null,"Mahsulot nomi",-1),Ue=["disabled"],Ee={class:"mb-2"},Ae={class:"text-gray-400 mb-1 flex-between-center"},Le=e("span",null,"Tan narxi",-1),Ke=["disabled"],Je={class:"mb-2"},Re={class:"text-gray-400 mb-1 flex-between-center"},He=e("span",null,"Sotiladigan narxi",-1),We=["disabled"],Xe={class:"mb-2"},Ye={class:"text-gray-400 mb-1 flex-between-center"},Ze=e("span",null,"O'lcham turi",-1),et={class:"text-gray-400 mb-1 flex-between-center"},tt=e("span",null,"O'lchamlar",-1),at=["disabled"],st={key:1,class:"text-rose-500 text-center mt-2"},nt=h({__name:"FormAddProduct",emits:["create-product"],setup(t,{emit:c}){const r=E(),m=H(),a=O({categories:[],sizeNames:[],selectCategory:!1,category_id:null,category_name:null});function d(g){a.selectCategory=g}axios.all([axios.get("categories"),axios.get("sizenames")]).then(axios.spread((g,l)=>{a.categories=g.data,a.sizeNames=l.data}));const o={name:"",original_price:"",price:"",size_names_id:null,products:[],category_id:null},p=I(!1),n=O({...o});A(()=>a.category_id,g=>{a.selectCategory=!1});function $(){if(S.value==!1)return p.value=!0,setTimeout(()=>p.value=!1,3e3);n.category_id=a.category_id,axios.post("/productnames",n).then(({data:g})=>{Object.assign(n,o),c("create-product",g),m.getQrcode?(r.productName=null,setTimeout(()=>r.productName=g)):(r.productQrName=null,setTimeout(()=>r.productQrName=g))})}const S=k(()=>n.name.trim()!=""&&n.original_price!=""&&n.price!=""&&n.size_names_id!=null&&N.value!=0),b=k(()=>a.category_id==null),N=k(()=>n.products.length==0?0:n.products.reduce((g,l)=>g+ +l.count,0));return(g,l)=>(s(),i("form",{onSubmit:V($,["prevent"]),class:"w-60"},[e("div",De,[e("button",{onClick:l[0]||(l[0]=_=>u(m).setQrcode(!1)),class:f([{"bg-pink-500 text-white":u(m).getQrcode==!1},"bg-gray-100 hover:opacity-60 active:bg-pink-500 active:text-white w-7 shadow-sm rounded-sm"]),type:"button"},Fe,2),e("button",{onClick:l[1]||(l[1]=_=>u(m).setQrcode(!0)),class:f([{"bg-pink-500 text-white":u(m).getQrcode},"bg-gray-100 hover:opacity-60 active:bg-pink-500 active:text-white w-7 shadow-sm rounded-sm"]),type:"button"},Pe,2)]),a.selectCategory?(s(),i("section",{key:0,onClick:l[4]||(l[4]=_=>d(!1)),class:"full-absolute items-start z-[100] p-8"},[e("main",{onClick:l[3]||(l[3]=V(()=>{},["stop"])),class:"bg-white min-w-[630px] w-[900px] max-h-full border-t-2 border-pink-500 px-4 py-3 relative"},[e("button",{onClick:l[2]||(l[2]=_=>d(!1)),type:"button",class:"absolute top-0 right-0 hover:bg-gray-100"},Ne),ze,(s(!0),i(T,null,P(a.categories,_=>(s(),w(Z,{Categories:a.categories,category:_,PageData:a},null,8,["Categories","category","PageData"]))),256))])])):F("",!0),e("div",Oe,[Ve,e("main",{onClick:l[5]||(l[5]=_=>d(!0))},[a.category_name?(s(),i("div",Ie,[e("span",Qe,C(a.category_name),1)])):(s(),i("div",qe,[L(" Tanlang "),je]))])]),e("div",Me,[e("label",Be,[Ge,y(x,{FormData:n,keyname:"name",inputType:"string"},null,8,["FormData"])]),v(e("input",{type:"text","onUpdate:modelValue":l[6]||(l[6]=_=>n.name=_),class:"text-input",placeholder:"Mahsulot nomi",disabled:u(b)},null,8,Ue),[[D,n.name]])]),e("div",Ee,[e("label",Ae,[Le,y(x,{FormData:n,keyname:"original_price",inputType:"number"},null,8,["FormData"])]),v(e("input",{type:"number","onUpdate:modelValue":l[7]||(l[7]=_=>n.original_price=_),class:"text-input",placeholder:"Tan narxi",disabled:u(b)},null,8,Ke),[[D,n.original_price]])]),e("div",Je,[e("label",Re,[He,y(x,{FormData:n,keyname:"price",inputType:"number"},null,8,["FormData"])]),v(e("input",{type:"number","onUpdate:modelValue":l[8]||(l[8]=_=>n.price=_),class:"text-input",placeholder:"Sotiladigan narxi",disabled:u(b)},null,8,We),[[D,n.price]])]),e("div",Xe,[e("label",Ye,[Ze,y(x,{FormData:n,keyname:"size_names_id",inputType:"nullable"},null,8,["FormData"])]),y(oe,{PageData:a,FormData:n,disabled:u(b)},null,8,["PageData","FormData","disabled"])]),e("label",et,[tt,y(x,{FormData:n,keyname:"sizes",value:u(N),inputType:"array"},null,8,["FormData","value"])]),y(we,{class:"-mx-4 px-4",FormData:n},null,8,["FormData"]),e("button",{class:f([{"!bg-gray-200":u(b),"!bg-pink-500 text-white":u(S)&&u(b)==!1},"px-2 py-0.5 bg-gray-300 rounded-sm w-full shadow active:bg-gray-200"]),disabled:u(b),type:"submit"}," Kiritish ",10,at),p.value?(s(),i("div",st," Malumotlar to'liq kiritilmagan ")):F("",!0)],40,$e))}}),ot={class:"relative flex items-start",name:"indexSale"},lt=h({__name:"IndexIntroduction",setup(t){const c=j(),r=J(),m=R();function a(d){d.products.forEach(o=>o.product_names={name:d.name}),c.getListType?m.addRow(d):r.addRow(d)}return(d,o)=>(s(),i("section",ot,[y(nt,{onCreateProduct:a}),u(c).getListType?(s(),w(M,{key:0,editable:!0,class:"ml-4 pl-4 border-l h-full"})):(s(),w(B,{key:1,editable:!0,class:"ml-4 pl-4 border-l h-full"}))]))}});const dt=K(lt,[["__scopeId","data-v-e23f7584"]]);export{dt as default};