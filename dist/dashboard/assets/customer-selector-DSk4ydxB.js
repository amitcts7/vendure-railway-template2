import{r as i,d3 as x,aG as h,j as e,$ as p,a0 as j,B as f,aS as C,T as r,a2 as N,cq as g,cr as y,cs as S,ct as v,cv as O,aO as T,aI as b}from"./index-n8ng0CiC.js";const q=T(`
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
`);function I(t){const[l,o]=i.useState(!1),[m,c]=i.useState(""),a=x(m,300),{data:n,isLoading:d}=h({queryKey:["customers",a],queryFn:()=>b.query(q,{options:{sort:{lastName:"ASC"},filter:a?{firstName:{contains:a},lastName:{contains:a},emailAddress:{contains:a}}:void 0,filterOperator:a?"OR":void 0}}),staleTime:1e3*60}),u=s=>{c(s)};return e.jsxs(p,{open:l,onOpenChange:o,children:[e.jsx(j,{asChild:!0,children:e.jsxs(f,{variant:"outline",size:"sm",type:"button",disabled:t.readOnly,className:"gap-2",children:[e.jsx(C,{className:"h-4 w-4"}),t.label??e.jsx(r,{id:"C0uyNO"})]})}),e.jsx(N,{className:"p-0 w-[350px]",align:"start",children:e.jsxs(g,{shouldFilter:!1,children:[e.jsx(y,{placeholder:"Search customers...",onValueChange:u,className:"h-10 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"}),e.jsxs(S,{children:[e.jsx(v,{children:d?e.jsx(r,{id:"Z3FXyt"}):e.jsx(r,{id:"BLXWJv"})}),n==null?void 0:n.customers.items.map(s=>e.jsxs(O,{onSelect:()=>{t.onSelect(s),o(!1)},className:"flex flex-col items-start",children:[e.jsxs("div",{className:"font-medium",children:[s.firstName," ",s.lastName]}),e.jsx("div",{className:"text-sm text-muted-foreground",children:s.emailAddress})]},s.id))]})]})})]})}export{I as C};
