import{c as R,u as b,at as D,as as f,au as h,av as c,t as x,_ as A,j as e,aJ as d,T as a,B as g,ad as E,ae as M,be as q,af as v,aj as j,aX as C,aY as L,a$ as P,b0 as I,bf as J,aB as l,bg as Q}from"./index-C-4cxa9H.js";import{P as z}from"./payload-dialog-B0cNbaWE.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]],B=R("CirclePlay",N),F=l(`
    query ScheduledTasks {
        scheduledTasks {
            id
            description
            schedule
            scheduleDescription
            lastExecutedAt
            nextExecutionAt
            isRunning
            lastResult
            enabled
        }
    }
`),K=l(`
    mutation UpdateScheduledTask($input: UpdateScheduledTaskInput!) {
        updateScheduledTask(input: $input) {
            id
            enabled
        }
    }
`),O=l(`
    mutation RunScheduledTask($id: String!) {
        runScheduledTask(id: $id) {
            success
        }
    }
`);function $(){var o;const{_:i}=b(),{data:t}=D({queryKey:["scheduledTasks"],queryFn:()=>c.query(F)}),r=f(),{mutate:m}=h({mutationFn:c.mutate(K),onSuccess:s=>{u()}}),u=()=>{r.invalidateQueries({queryKey:["scheduledTasks"]})},{mutate:p}=h({mutationFn:c.mutate(O),onSuccess:s=>{s.runScheduledTask.success?(x.success(i({id:"96xJ48"})),r.invalidateQueries({queryKey:["scheduledTasks"]})):x.error(i({id:"DzhRjJ"}))}}),{formatDate:y,formatRelativeDate:k}=A(),T={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"},n=Q(),S=[n.accessor("id",{header:i({id:"S0kLOH"})}),n.accessor("description",{header:i({id:"Nu4oKW"})}),n.accessor("enabled",{header:i({id:"RxzN1M"}),cell:({row:s})=>s.original.enabled?e.jsx(d,{variant:"success",children:e.jsx(a,{id:"RxzN1M"})}):e.jsx(d,{variant:"secondary",children:e.jsx(a,{id:"E/QGRL"})})}),n.accessor("schedule",{header:i({id:"pIxz4h"})}),n.accessor("scheduleDescription",{header:i({id:"gmB6oO"})}),n.accessor("lastExecutedAt",{header:i({id:"RhpMfE"}),cell:({row:s})=>s.original.lastExecutedAt?e.jsx("div",{title:s.original.lastExecutedAt,children:k(s.original.lastExecutedAt)}):e.jsx(a,{id:"qqeAJM"})}),n.accessor("nextExecutionAt",{header:i({id:"WwKMiy"}),cell:({row:s})=>s.original.nextExecutionAt?y(s.original.nextExecutionAt,T):e.jsx(a,{id:"qqeAJM"})}),n.accessor("isRunning",{header:i({id:"RiQMUh"}),cell:({row:s})=>s.original.isRunning?e.jsx(d,{variant:"success",children:e.jsx(a,{id:"RiQMUh"})}):e.jsx(d,{variant:"secondary",children:e.jsx(a,{id:"LXcUnJ"})})}),n.accessor("lastResult",{header:i({id:"ikhZzI"}),cell:({row:s})=>s.original.lastResult?e.jsx(z,{payload:s.original.lastResult,title:e.jsx(a,{id:"bDEHSp"}),description:e.jsx(a,{id:"swNxZp"}),trigger:e.jsx(g,{size:"sm",variant:"secondary",children:e.jsx(a,{id:"xwytAA"})})}):e.jsx("div",{className:"text-muted-foreground",children:e.jsx(a,{id:"YTKVwL"})})}),n.display({id:"actions",header:i({id:"7L01XJ"}),cell:({row:s})=>e.jsxs(E,{children:[e.jsx(M,{asChild:!0,children:e.jsx(g,{variant:"ghost",size:"icon",children:e.jsx(q,{})})}),e.jsxs(v,{children:[s.original.enabled&&e.jsxs(j,{onClick:()=>p({id:s.original.id}),children:[e.jsx(B,{className:"w-4 h-4"}),e.jsx(a,{id:"3JjdaA"})]}),e.jsx(j,{onClick:()=>m({input:{id:s.original.id,enabled:!s.original.enabled}}),children:s.original.enabled?e.jsx(a,{id:"cO9+2L"}):e.jsx(a,{id:"PaQ3df"})})]})]})})];return e.jsxs(C,{pageId:"scheduled-tasks-list",children:[e.jsx(L,{children:e.jsx(a,{id:"8OiyFS"})}),e.jsx(P,{children:e.jsx(I,{blockId:"list-table",children:e.jsx(J,{onRefresh:u,columns:S,data:(t==null?void 0:t.scheduledTasks)??[],totalItems:((o=t==null?void 0:t.scheduledTasks)==null?void 0:o.length)??0,defaultColumnVisibility:{schedule:!1}})})})]})}export{$ as component};
