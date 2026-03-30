import{aO as w,dk as F,r as j,aG as P,dl as b,j as e,ap as B,ad as R,ae as S,af as T,T as d,am as V,B as $,aI as k,cd as M,u as O,aH as G,dm as H,t as v}from"./index-BKjBMJl-.js";import{D as U}from"./data-table-bulk-action-item-lBWYkd-K.js";import{C as Y}from"./configurable-operation-input-C83oYiyh.js";const _=w(`
    mutation DuplicateEntity($input: DuplicateEntityInput!) {
        duplicateEntity(input: $input) {
            ... on DuplicateEntitySuccess {
                newEntityId
            }
            ... on ErrorResult {
                errorCode
                message
            }
            ... on DuplicateEntityError {
                duplicationError
            }
        }
    }
`),K=w(`
        query GetEntityDuplicators {
            entityDuplicators {
                code
                description
                requiresPermission
                forEntities
                args {
                    ...ConfigArgDefinition
                }
            }
        }
    `,[F]);function N({open:h,onOpenChange:p,entityType:C,entityName:n,duplicatorCode:l,onConfirm:o}){var E;const[a,c]=j.useState(),{data:f}=P({queryKey:["entityDuplicators"],queryFn:()=>k.query(K),staleTime:1e3*60*60*5}),s=(E=f==null?void 0:f.entityDuplicators)==null?void 0:E.find(i=>i.code===l&&i.forEntities.includes(C));b.useEffect(()=>{var i;s&&!a&&c({code:s.code,arguments:((i=s.args)==null?void 0:i.map(g=>({name:g.name,value:g.defaultValue!=null?g.defaultValue.toString():""})))||[]})},[s,a]);const x=i=>{c(i)},y=()=>{a&&(o(a),p(!1),c(void 0))},m=()=>{p(!1),c(void 0)};return e.jsx(B,{open:h,onOpenChange:p,children:e.jsxs(R,{className:"sm:max-w-lg",children:[e.jsx(S,{children:e.jsx(T,{children:e.jsx(d,{id:"Lns7sP",values:{0:n.toLowerCase()}})})}),e.jsxs("div",{className:"space-y-4",children:[a&&s&&e.jsx(Y,{operationDefinition:s,value:a,onChange:x,removable:!1}),!s&&e.jsx("div",{className:"text-sm text-muted-foreground",children:e.jsx(d,{id:"B6LoY7",values:{duplicatorCode:l,entityName:n}})})]}),e.jsxs(V,{children:[e.jsx($,{variant:"outline",onClick:m,children:e.jsx(d,{id:"dEgA5A"})}),e.jsx($,{onClick:y,disabled:!a,children:e.jsx(d,{id:"euc6Ns"})})]})]})})}function W({entityType:h,duplicatorCode:p,requiredPermissions:C,entityName:n,onSuccess:l,selection:o,table:a}){const{refetchPaginatedList:c}=M(),{_:f}=O(),[s,x]=j.useState(!1),[y,m]=j.useState({completed:0,total:0}),[E,i]=j.useState(!1),{mutateAsync:g}=G({mutationFn:k.mutate(_)}),I=()=>{s||i(!0)},L=async q=>{if(s)return;x(!0),m({completed:0,total:o.length});const t={success:0,failed:0,errors:[]};try{for(let r=0;r<o.length;r++){const D=o[r];try{const u=await g({input:{entityName:h,entityId:D.id,duplicatorInput:q}});if("newEntityId"in u.duplicateEntity)t.success++;else{t.failed++;const A=u.duplicateEntity.message||u.duplicateEntity.duplicationError||"Unknown error";t.errors.push(`${n} ${D.name||D.id}: ${A}`)}}catch(u){t.failed++,t.errors.push(`${n} ${D.name||D.id}: ${u instanceof Error?u.message:"Unknown error"}`)}m({completed:r+1,total:o.length})}if(t.success>0){const r=t.success;v.success(f({id:"YRTdLc",values:{count:r,entityName:n}}))}if(t.failed>0){const r=t.errors.length>3?`${t.errors.slice(0,3).join(", ")}... and ${t.errors.length-3} more`:t.errors.join(", ");v.error(`Failed to duplicate ${t.failed} ${n.toLowerCase()}s: ${r}`)}t.success>0&&(c(),a.resetRowSelection(),l==null||l())}finally{x(!1),m({completed:0,total:0})}};return e.jsxs(e.Fragment,{children:[e.jsx(U,{requiresPermission:C,onClick:I,label:s?e.jsx(d,{id:"+lpe0V",values:{0:y.completed,1:y.total}}):e.jsx(d,{id:"euc6Ns"}),icon:H}),e.jsx(N,{open:E,onOpenChange:i,entityType:h,entityName:n,entities:o,duplicatorCode:p,onConfirm:L})]})}export{W as D};
