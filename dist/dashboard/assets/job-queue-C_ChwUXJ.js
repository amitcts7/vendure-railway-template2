import{c as A,aB as c,r,u as L,_ as D,j as e,bh as k,bi as J,a_ as M,ad as x,ae as h,B as o,bj as S,T as t,bk as P,af as p,aj as b,av as f,au as q,aJ as F,bl as T}from"./index-DEB5T4ki.js";import{L as B}from"./list-page-DHEGWNEf.js";import{P as v}from"./payload-dialog-DDY4836Z.js";import{C as w,a as O}from"./circle-x-BzRraEBK.js";import{R as z,B as R}from"./rotate-ccw-CP4io0HS.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]],_=A("Loader",Q),C=c(`
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
`),G=c(`
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
`),$=c(`
        mutation CancelJob($jobId: ID!) {
            cancelJob(jobId: $jobId) {
                ...JobInfo
            }
        }
    `,[C]),N=[{label:"Pending",value:"PENDING",icon:k},{label:"Completed",value:"COMPLETED",icon:w},{label:"Running",value:"RUNNING",icon:_},{label:"Failed",value:"FAILED",icon:O},{label:"Retrying",value:"RETRYING",icon:z},{label:"Cancelled",value:"CANCELLED",icon:R}],y=[{label:e.jsx(t,{id:"az8lvo"}),value:0},{label:e.jsx(t,{id:"a5xvsE"}),value:5e3},{label:e.jsx(t,{id:"UFvKgT"}),value:1e4},{label:e.jsx(t,{id:"hYZ3aH"}),value:3e4},{label:e.jsx(t,{id:"rjE0f3"}),value:6e4}];function X(){const d=r.useRef(()=>{}),{_:m}=L(),{formatRelativeDate:I}=D(),[n,E]=r.useState(1e4),l=r.useRef(!1);r.useEffect(()=>{if(n===0)return;const a=setInterval(()=>{l.current||d.current()},n);return()=>clearInterval(a)},[n]);const u=y.find(a=>a.value===n);return e.jsx(B,{pageId:"job-queue-list",title:e.jsx(t,{id:"AsRAnH"}),defaultSort:[{id:"createdAt",desc:!0}],listQuery:G,route:J,customizeColumns:{createdAt:{cell:({row:a})=>e.jsx("div",{title:a.original.createdAt,children:I(a.original.createdAt)})},data:{cell:({row:a})=>e.jsx(v,{payload:a.original.data,title:e.jsx(t,{id:"XBRZ0Q"}),onOpenChange:s=>l.current=s,description:e.jsx(t,{id:"6V+g40"}),trigger:e.jsx(o,{size:"sm",variant:"secondary",children:e.jsx(t,{id:"gqSqrj"})})})},queueName:{cell:({row:a})=>e.jsx("span",{className:"font-mono",children:a.original.queueName})},result:{cell:({row:a})=>a.original.result?e.jsx(v,{payload:a.original.result,title:e.jsx(t,{id:"bDEHSp"}),onOpenChange:s=>l.current=s,description:e.jsx(t,{id:"swNxZp"}),trigger:e.jsx(o,{size:"sm",variant:"secondary",children:e.jsx(t,{id:"xwytAA"})})}):e.jsx("div",{className:"text-muted-foreground",children:e.jsx(t,{id:"YTKVwL"})})},state:{cell:({row:a,table:s})=>{const j=q({mutationFn:i=>f.mutate($,{jobId:i}),onSuccess:()=>{d.current()}}),g=N.find(i=>i.value===a.original.state);return e.jsxs(F,{variant:a.original.state==="PENDING"?"secondary":a.original.state==="COMPLETED"?"success":a.original.state==="FAILED"?"destructive":"outline",children:[g&&e.jsx(g.icon,{}),a.original.state,a.original.state==="RUNNING"?e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(x,{onOpenChange:i=>l.current=i,children:[e.jsx(h,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",className:"h-6 w-6 p-0",children:e.jsx(T,{className:"h-4 w-4"})})}),e.jsx(p,{align:"end",children:e.jsxs(b,{onClick:()=>j.mutate(a.original.id),disabled:j.isPending,className:"text-destructive focus:text-destructive",children:[e.jsx(R,{className:"mr-2 h-4 w-4"}),e.jsx(t,{id:"FnSb+y"})]})})]})}):null]})}},duration:{cell:({row:a})=>a.original.duration?`${a.original.duration}ms`:null}},defaultVisibility:{isSettled:!1,settledAt:!1,progress:!1,retries:!1,attempts:!1,error:!1,startedAt:!1},facetedFilters:{queueName:{title:m({id:"b24kPi"}),optionsFn:async()=>f.query(V).then(a=>a.jobQueues.map(s=>({label:s.name,value:s.name})))},state:{title:m({id:"RS0o7b"}),options:N}},registerRefresher:a=>{d.current=a},children:e.jsx(M,{children:e.jsxs(x,{children:[e.jsx(h,{asChild:!0,children:e.jsxs(o,{variant:"outline",size:"sm",className:"gap-2",children:[e.jsx(S,{className:"h-4 w-4"}),e.jsx("span",{children:e.jsx(t,{id:"0OgmBr",values:{0:u==null?void 0:u.label}})}),e.jsx(P,{className:"h-4 w-4"})]})}),e.jsx(p,{align:"end",children:y.map(a=>e.jsx(b,{onClick:()=>E(a.value),className:n===a.value?"bg-accent":"",children:a.label},a.value))})]})})})}export{X as component};
