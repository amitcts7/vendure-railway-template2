import{u as g,aG as P,j as s,dz as v,aO as y,aI as T,h6 as I,h7 as D,h8 as q,aN as C,h9 as F,fa as w,K as A,X as R,Y as k,Z as B,ha as E,ao as G,cK as U,c5 as $,hb as H,hc as L,hd as S,he as b,t as f,bb as V,bc as _,T as m,bd as K,be as O,aR as Z,B as M,bf as Q,c6 as N,I as x,c8 as W}from"./index-BKjBMJl-.js";import{F as h}from"./form-field-wrapper-jHWFbDxv.js";import{u as Y}from"./use-grouped-permissions-CcrHdXoc.js";const X=y(`
    query Roles($options: RoleListOptions) {
        roles(options: $options) {
            items {
                id
                code
                description
            }
        }
    }
`);function z(u){const{value:p,onChange:i,multiple:n}=u,{_:o}=g(),{data:d}=P({queryKey:["roles"],queryFn:()=>T.query(X,{options:{take:100}}),select:a=>a.roles.items}),r=(d??[]).map(a=>({value:a.id,label:a.code,display:a.description?a.description:a.code}));return s.jsx(v,{value:p,onChange:i,multiple:n,items:r,placeholder:o({id:"h4pFju"}),searchPlaceholder:o({id:"jxxbqF"})})}const J=y(`
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
`);function ss({value:u=[]}){const{i18n:p}=g(),i=Y(),{data:n}=P({queryKey:["rolesById",u],queryFn:()=>T.query(J,{options:{filter:{id:{in:u}}}})}),o=(n==null?void 0:n.roles.items)??[],d=o.flatMap(a=>a.channels).filter((a,c,l)=>c===l.findIndex(t=>t.code===a.code)),r=(a,c)=>o.some(l=>{const t=l.permissions.includes(a),e=l.channels.length>0;return t?e?l.channels.some(j=>j.code===c):!0:!1});return d.length?s.jsxs(I,{defaultValue:d[0].code,className:"w-full mt-4",children:[s.jsx(D,{children:d.map(a=>s.jsx(q,{value:a.code,children:s.jsx(C,{code:a.code})},a.code))}),d.map(a=>s.jsx(F,{value:a.code,className:"mt-0",children:s.jsx("div",{className:"rounded-md border",children:s.jsx("table",{className:"w-full",children:s.jsx("tbody",{children:i.map((c,l)=>s.jsx("tr",{className:l!==i.length-1?"border-b":void 0,children:s.jsx("td",{className:"p-4",children:s.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:c.permissions.map(t=>s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx(w,{checked:r(t.name,a.code),disabled:!0}),s.jsx(A,{children:s.jsxs(R,{children:[s.jsx(k,{asChild:!0,children:s.jsx("label",{className:"text-sm cursor-default",children:p.t(t.name)})}),s.jsx(B,{children:s.jsx("p",{children:p.t(t.description)})})]})})]},t.name))})})},c.label))})})})},a.code))]}):null}function rs(){const u=E.useParams(),p=G(),i=u.id===U,{_:n}=g(),{form:o,submitHandler:d,entity:r,isPending:a,resetForm:c}=$({pageId:b,queryDocument:H,createDocument:L,updateDocument:S,setValuesForUpdate:e=>({id:e.id,firstName:e.firstName,lastName:e.lastName,emailAddress:e.emailAddress,password:"",customFields:e.customFields,roleIds:e.user.roles.map(j=>j.id)}),transformUpdateInput:e=>({...e,password:e.password||void 0}),params:{id:u.id},onSuccess:async e=>{f(n(i?{id:"HHcgbv"}:{id:"U7aanB"})),c(),i&&await p({to:"../$id",params:{id:e.id}})},onError:e=>{f(n(i?{id:"1uyZgG"}:{id:"O8GQXx"}),{description:e instanceof Error?e.message:"Unknown error"})}}),l=`${r==null?void 0:r.firstName} ${r==null?void 0:r.lastName}`,t=o.watch("roleIds");return s.jsxs(V,{pageId:b,form:o,submitHandler:d,entity:r,children:[s.jsx(_,{children:i?s.jsx(m,{id:"WCpfqh"}):l}),s.jsx(K,{children:s.jsx(O,{children:s.jsx(Z,{requires:["UpdateAdministrator"],children:s.jsx(M,{type:"submit",disabled:!o.formState.isDirty||!o.formState.isValid||a,children:i?s.jsx(m,{id:"hYgDIe"}):s.jsx(m,{id:"EkH9pt"})})})})}),s.jsxs(Q,{children:[s.jsx(N,{column:"main",blockId:"main-form",children:s.jsxs("div",{className:"md:grid md:grid-cols-2 gap-4",children:[s.jsx(h,{control:o.control,name:"firstName",label:s.jsx(m,{id:"V1EGGU"}),render:({field:e})=>s.jsx(x,{placeholder:"",...e})}),s.jsx(h,{control:o.control,name:"lastName",label:s.jsx(m,{id:"1ZaQUH"}),render:({field:e})=>s.jsx(x,{placeholder:"",...e})}),s.jsx(h,{control:o.control,name:"emailAddress",label:s.jsx(m,{id:"NfvVuV"}),render:({field:e})=>s.jsx(x,{placeholder:"",...e})}),s.jsx(h,{control:o.control,name:"password",label:s.jsx(m,{id:"8ZsakT"}),render:({field:e})=>s.jsx(x,{placeholder:"",type:"password",...e})})]})}),s.jsx(W,{column:"main",entityType:"Administrator",control:o.control}),s.jsxs(N,{column:"main",blockId:"roles",title:s.jsx(m,{id:"5dJK4M"}),children:[s.jsx(h,{control:o.control,name:"roleIds",render:({field:e})=>s.jsx(z,{value:e.value??[],onChange:e.onChange,multiple:!0})}),s.jsx(ss,{value:t??[]})]})]})]})}export{rs as component};
