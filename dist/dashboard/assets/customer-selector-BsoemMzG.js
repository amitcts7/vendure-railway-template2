import{r as i,cS as x,at as h,j as e,P as p,J as f,B as j,aF as C,T as o,M as N,cd as g,ce as y,cf as S,cg as v,ci as O,aB as T,av as b}from"./index-vQ8vs7IN.js";const q=T(`
    query GetCustomers($options: CustomerListOptions) {
        customers(options: $options) {
            items {
                id
                firstName
                lastName
                emailAddress
            }
            totalItems
        }
    }
`);function A(t){const[l,r]=i.useState(!1),[m,c]=i.useState(""),a=x(m,300),{data:n,isLoading:d}=h({queryKey:["customers",a],queryFn:()=>b.query(q,{options:{sort:{lastName:"ASC"},filter:a?{firstName:{contains:a},lastName:{contains:a},emailAddress:{contains:a}}:void 0,filterOperator:a?"OR":void 0}}),staleTime:1e3*60}),u=s=>{c(s)};return e.jsxs(p,{open:l,onOpenChange:r,children:[e.jsx(f,{asChild:!0,children:e.jsxs(j,{variant:"outline",size:"sm",type:"button",disabled:t.readOnly,className:"gap-2",children:[e.jsx(C,{className:"h-4 w-4"}),t.label??e.jsx(o,{id:"C0uyNO"})]})}),e.jsx(N,{className:"p-0 w-[350px]",align:"start",children:e.jsxs(g,{shouldFilter:!1,children:[e.jsx(y,{placeholder:"Search customers...",onValueChange:u,className:"h-10 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"}),e.jsxs(S,{children:[e.jsx(v,{children:d?e.jsx(o,{id:"Z3FXyt"}):e.jsx(o,{id:"BLXWJv"})}),n==null?void 0:n.customers.items.map(s=>e.jsxs(O,{onSelect:()=>{t.onSelect(s),r(!1)},className:"flex flex-col items-start",children:[e.jsxs("div",{className:"font-medium",children:[s.firstName," ",s.lastName]}),e.jsx("div",{className:"text-sm text-muted-foreground",children:s.emailAddress})]},s.id))]})]})})]})}export{A as C};
