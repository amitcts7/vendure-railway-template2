import{c as A,aO as c,r,u as L,ab as D,j as e,bx as k,by as M,be as S,aq as x,ar as b,B as o,bz as q,T as s,bA as J,as as h,aw as p,aI as f,aH as P,aW as F,bB as T}from"./index-fGvXxrc-.js";import{L as w}from"./list-page-DkvAqFRk.js";import{P as v}from"./payload-dialog-CuSuxHci.js";import{C as B,a as O}from"./circle-x-BE_eGowY.js";import{R as z,B as R}from"./rotate-ccw-DLuvMNgZ.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]],G=A("Loader",Q),C=c(`
    fragment JobInfo on Job {
        id
        queueName
        createdAt
        startedAt
        settledAt
        state
        isSettled
        progress
        duration
        data
        result
        error
        retries
        attempts
    }
`),H=c(`
        query JobList($options: JobListOptions) {
            jobs(options: $options) {
                items {
                    ...JobInfo
                }
                totalItems
            }
        }
    `,[C]),V=c(`
    query JobQueueList {
        jobQueues {
            name
            running
        }
    }
`),_=c(`
        mutation CancelJob($jobId: ID!) {
            cancelJob(jobId: $jobId) {
                ...JobInfo
            }
        }
    `,[C]),N=[{label:"Pending",value:"PENDING",icon:k},{label:"Completed",value:"COMPLETED",icon:B},{label:"Running",value:"RUNNING",icon:G},{label:"Failed",value:"FAILED",icon:O},{label:"Retrying",value:"RETRYING",icon:z},{label:"Cancelled",value:"CANCELLED",icon:R}],y=[{label:e.jsx(s,{id:"az8lvo"}),value:0},{label:e.jsx(s,{id:"a5xvsE"}),value:5e3},{label:e.jsx(s,{id:"UFvKgT"}),value:1e4},{label:e.jsx(s,{id:"hYZ3aH"}),value:3e4},{label:e.jsx(s,{id:"rjE0f3"}),value:6e4}];function X(){const d=r.useRef(()=>{}),{_:m}=L(),{formatRelativeDate:I}=D(),[n,E]=r.useState(1e4),l=r.useRef(!1);r.useEffect(()=>{if(n===0)return;const a=setInterval(()=>{l.current||d.current()},n);return()=>clearInterval(a)},[n]);const u=y.find(a=>a.value===n);return e.jsx(w,{pageId:"job-queue-list",title:e.jsx(s,{id:"AsRAnH"}),defaultSort:[{id:"createdAt",desc:!0}],listQuery:H,route:M,customizeColumns:{createdAt:{cell:({row:a})=>e.jsx("div",{title:a.original.createdAt,children:I(a.original.createdAt)})},data:{cell:({row:a})=>e.jsx(v,{payload:a.original.data,title:e.jsx(s,{id:"XBRZ0Q"}),onOpenChange:t=>l.current=t,description:e.jsx(s,{id:"6V+g40"}),trigger:e.jsx(o,{size:"sm",variant:"secondary",children:e.jsx(s,{id:"gqSqrj"})})})},queueName:{cell:({row:a})=>e.jsx("span",{className:"font-mono",children:a.original.queueName})},result:{cell:({row:a})=>a.original.result?e.jsx(v,{payload:a.original.result,title:e.jsx(s,{id:"bDEHSp"}),onOpenChange:t=>l.current=t,description:e.jsx(s,{id:"swNxZp"}),trigger:e.jsx(o,{size:"sm",variant:"secondary",children:e.jsx(s,{id:"xwytAA"})})}):e.jsx("div",{className:"text-muted-foreground",children:e.jsx(s,{id:"YTKVwL"})})},state:{cell:({row:a,table:t})=>{const j=P({mutationFn:i=>f.mutate(_,{jobId:i}),onSuccess:()=>{d.current()}}),g=N.find(i=>i.value===a.original.state);return e.jsxs(F,{variant:a.original.state==="PENDING"?"secondary":a.original.state==="COMPLETED"?"success":a.original.state==="FAILED"?"destructive":"outline",children:[g&&e.jsx(g.icon,{}),a.original.state,a.original.state==="RUNNING"?e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(x,{onOpenChange:i=>l.current=i,children:[e.jsx(b,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",className:"h-6 w-6 p-0",children:e.jsx(T,{className:"h-4 w-4"})})}),e.jsx(h,{align:"end",children:e.jsxs(p,{onClick:()=>j.mutate(a.original.id),disabled:j.isPending,className:"text-destructive focus:text-destructive",children:[e.jsx(R,{className:"mr-2 h-4 w-4"}),e.jsx(s,{id:"FnSb+y"})]})})]})}):null]})}},duration:{cell:({row:a})=>a.original.duration?`${a.original.duration}ms`:null}},defaultVisibility:{isSettled:!1,settledAt:!1,progress:!1,retries:!1,attempts:!1,error:!1,startedAt:!1},facetedFilters:{queueName:{title:m({id:"b24kPi"}),optionsFn:async()=>f.query(V).then(a=>a.jobQueues.map(t=>({label:t.name,value:t.name})))},state:{title:m({id:"RS0o7b"}),options:N}},registerRefresher:a=>{d.current=a},children:e.jsx(S,{children:e.jsxs(x,{children:[e.jsx(b,{asChild:!0,children:e.jsxs(o,{variant:"outline",size:"sm",className:"gap-2",children:[e.jsx(q,{className:"h-4 w-4"}),e.jsx("span",{children:e.jsx(s,{id:"0OgmBr",values:{0:u==null?void 0:u.label}})}),e.jsx(J,{className:"h-4 w-4"})]})}),e.jsx(h,{align:"end",children:y.map(a=>e.jsx(p,{onClick:()=>E(a.value),className:n===a.value?"bg-accent":"",children:a.label},a.value))})]})})})}export{X as component};
