import{u as g,at as P,j as s,dl as T,aB as y,av as v,g$ as I,h0 as D,h1 as q,aA as C,h2 as A,f3 as F,q as w,D as B,E,G as k,h3 as R,ab as $,cx as U,bU as G,h4 as V,h5 as _,h6 as H,h7 as b,t as f,a_ as L,a$ as S,T as m,b0 as K,b1 as M,aE as O,B as Q,b2 as W,bV as N,I as h,bX as Z}from"./index-vQ8vs7IN.js";import{F as x}from"./form-field-wrapper-BsC3Gn0t.js";import{u as X}from"./use-grouped-permissions-BlWX2kfv.js";const Y=y(`
    query Roles($options: RoleListOptions) {
        roles(options: $options) {
            items {
                id
                code
                description
            }
        }
    }
`);function J(u){const{value:p,onChange:i,multiple:t}=u,{_:o}=g(),{data:d}=P({queryKey:["roles"],queryFn:()=>v.query(Y,{options:{take:100}}),select:a=>a.roles.items}),r=(d??[]).map(a=>({value:a.id,label:a.code,display:a.description?a.description:a.code}));return s.jsx(T,{value:p,onChange:i,multiple:t,items:r,placeholder:o({id:"h4pFju"}),searchPlaceholder:o({id:"jxxbqF"})})}const z=y(`
    query RolesById($options: RoleListOptions) {
        roles(options: $options) {
            items {
                id
                code
                permissions
                channels {
                    id
                    code
                }
            }
        }
    }
`);function ss({value:u=[]}){const{i18n:p}=g(),i=X(),{data:t}=P({queryKey:["rolesById",u],queryFn:()=>v.query(z,{options:{filter:{id:{in:u}}}})}),o=(t==null?void 0:t.roles.items)??[],d=o.flatMap(a=>a.channels).filter((a,c,l)=>c===l.findIndex(n=>n.code===a.code)),r=(a,c)=>o.some(l=>{const n=l.permissions.includes(a),e=l.channels.length>0;return n?e?l.channels.some(j=>j.code===c):!0:!1});return d.length?s.jsxs(I,{defaultValue:d[0].code,className:"w-full mt-4",children:[s.jsx(D,{children:d.map(a=>s.jsx(q,{value:a.code,children:s.jsx(C,{code:a.code})},a.code))}),d.map(a=>s.jsx(A,{value:a.code,className:"mt-0",children:s.jsx("div",{className:"rounded-md border",children:s.jsx("table",{className:"w-full",children:s.jsx("tbody",{children:i.map((c,l)=>s.jsx("tr",{className:l!==i.length-1?"border-b":void 0,children:s.jsx("td",{className:"p-4",children:s.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:c.permissions.map(n=>s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx(F,{checked:r(n.name,a.code),disabled:!0}),s.jsx(w,{children:s.jsxs(B,{children:[s.jsx(E,{asChild:!0,children:s.jsx("label",{className:"text-sm cursor-default",children:p.t(n.name)})}),s.jsx(k,{children:s.jsx("p",{children:p.t(n.description)})})]})})]},n.name))})})},c.label))})})})},a.code))]}):null}function rs(){const u=R.useParams(),p=$(),i=u.id===U,{_:t}=g(),{form:o,submitHandler:d,entity:r,isPending:a,resetForm:c}=G({pageId:b,queryDocument:V,createDocument:_,updateDocument:H,setValuesForUpdate:e=>({id:e.id,firstName:e.firstName,lastName:e.lastName,emailAddress:e.emailAddress,password:"",customFields:e.customFields,roleIds:e.user.roles.map(j=>j.id)}),transformUpdateInput:e=>({...e,password:e.password||void 0}),params:{id:u.id},onSuccess:async e=>{f(t(i?{id:"HHcgbv"}:{id:"U7aanB"})),c(),i&&await p({to:"../$id",params:{id:e.id}})},onError:e=>{f(t(i?{id:"1uyZgG"}:{id:"O8GQXx"}),{description:e instanceof Error?e.message:"Unknown error"})}}),l=`${r==null?void 0:r.firstName} ${r==null?void 0:r.lastName}`,n=o.watch("roleIds");return s.jsxs(L,{pageId:b,form:o,submitHandler:d,entity:r,children:[s.jsx(S,{children:i?s.jsx(m,{id:"WCpfqh"}):l}),s.jsx(K,{children:s.jsx(M,{children:s.jsx(O,{requires:["UpdateAdministrator"],children:s.jsx(Q,{type:"submit",disabled:!o.formState.isDirty||!o.formState.isValid||a,children:i?s.jsx(m,{id:"hYgDIe"}):s.jsx(m,{id:"EkH9pt"})})})})}),s.jsxs(W,{children:[s.jsx(N,{column:"main",blockId:"main-form",children:s.jsxs("div",{className:"md:grid md:grid-cols-2 gap-4",children:[s.jsx(x,{control:o.control,name:"firstName",label:s.jsx(m,{id:"V1EGGU"}),render:({field:e})=>s.jsx(h,{placeholder:"",...e})}),s.jsx(x,{control:o.control,name:"lastName",label:s.jsx(m,{id:"1ZaQUH"}),render:({field:e})=>s.jsx(h,{placeholder:"",...e})}),s.jsx(x,{control:o.control,name:"emailAddress",label:s.jsx(m,{id:"NfvVuV"}),render:({field:e})=>s.jsx(h,{placeholder:"",...e})}),s.jsx(x,{control:o.control,name:"password",label:s.jsx(m,{id:"8ZsakT"}),render:({field:e})=>s.jsx(h,{placeholder:"",type:"password",...e})})]})}),s.jsx(Z,{column:"main",entityType:"Administrator",control:o.control}),s.jsxs(N,{column:"main",blockId:"roles",title:s.jsx(m,{id:"5dJK4M"}),children:[s.jsx(x,{control:o.control,name:"roleIds",render:({field:e})=>s.jsx(J,{value:e.value??[],onChange:e.onChange,multiple:!0})}),s.jsx(ss,{value:n??[]})]})]})]})}export{rs as component};
