import{aB as w,d4 as b,r as j,at as B,d5 as F,j as t,ac as P,a0 as R,a1 as S,a2 as T,T as d,a9 as V,B as v,av as L,bZ as M,u as O,au as U,d6 as Y,t as $}from"./index-BpQC7dM6.js";import{D as _}from"./data-table-bulk-action-item-BWNm9lqb.js";import{C as G}from"./configurable-operation-input-BIG9AX5O.js";const H=w(`
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
    `,[b]);function N({open:h,onOpenChange:p,entityType:C,entityName:n,duplicatorCode:l,onConfirm:o}){var E;const[a,c]=j.useState(),{data:f}=B({queryKey:["entityDuplicators"],queryFn:()=>L.query(K),staleTime:1e3*60*60*5}),s=(E=f==null?void 0:f.entityDuplicators)==null?void 0:E.find(i=>i.code===l&&i.forEntities.includes(C));F.useEffect(()=>{var i;s&&!a&&c({code:s.code,arguments:((i=s.args)==null?void 0:i.map(g=>({name:g.name,value:g.defaultValue!=null?g.defaultValue.toString():""})))||[]})},[s,a]);const x=i=>{c(i)},y=()=>{a&&(o(a),p(!1),c(void 0))},m=()=>{p(!1),c(void 0)};return t.jsx(P,{open:h,onOpenChange:p,children:t.jsxs(R,{className:"sm:max-w-lg",children:[t.jsx(S,{children:t.jsx(T,{children:t.jsx(d,{id:"Lns7sP",values:{0:n.toLowerCase()}})})}),t.jsxs("div",{className:"space-y-4",children:[a&&s&&t.jsx(G,{operationDefinition:s,value:a,onChange:x,removable:!1}),!s&&t.jsx("div",{className:"text-sm text-muted-foreground",children:t.jsx(d,{id:"B6LoY7",values:{duplicatorCode:l,entityName:n}})})]}),t.jsxs(V,{children:[t.jsx(v,{variant:"outline",onClick:m,children:t.jsx(d,{id:"dEgA5A"})}),t.jsx(v,{onClick:y,disabled:!a,children:t.jsx(d,{id:"euc6Ns"})})]})]})})}function J({entityType:h,duplicatorCode:p,requiredPermissions:C,entityName:n,onSuccess:l,selection:o,table:a}){const{refetchPaginatedList:c}=M(),{_:f}=O(),[s,x]=j.useState(!1),[y,m]=j.useState({completed:0,total:0}),[E,i]=j.useState(!1),{mutateAsync:g}=U({mutationFn:L.mutate(H)}),k=()=>{s||i(!0)},q=async A=>{if(s)return;x(!0),m({completed:0,total:o.length});const e={success:0,failed:0,errors:[]};try{for(let r=0;r<o.length;r++){const D=o[r];try{const u=await g({input:{entityName:h,entityId:D.id,duplicatorInput:A}});if("newEntityId"in u.duplicateEntity)e.success++;else{e.failed++;const I=u.duplicateEntity.message||u.duplicateEntity.duplicationError||"Unknown error";e.errors.push(`${n} ${D.name||D.id}: ${I}`)}}catch(u){e.failed++,e.errors.push(`${n} ${D.name||D.id}: ${u instanceof Error?u.message:"Unknown error"}`)}m({completed:r+1,total:o.length})}if(e.success>0){const r=e.success;$.success(f({id:"YRTdLc",values:{count:r,entityName:n}}))}if(e.failed>0){const r=e.errors.length>3?`${e.errors.slice(0,3).join(", ")}... and ${e.errors.length-3} more`:e.errors.join(", ");$.error(`Failed to duplicate ${e.failed} ${n.toLowerCase()}s: ${r}`)}e.success>0&&(c(),a.resetRowSelection(),l==null||l())}finally{x(!1),m({completed:0,total:0})}};return t.jsxs(t.Fragment,{children:[t.jsx(_,{requiresPermission:C,onClick:k,label:s?t.jsx(d,{id:"+lpe0V",values:{0:y.completed,1:y.total}}):t.jsx(d,{id:"euc6Ns"}),icon:Y}),t.jsx(N,{open:E,onOpenChange:i,entityType:h,entityName:n,entities:o,duplicatorCode:p,onConfirm:q})]})}export{J as D};
