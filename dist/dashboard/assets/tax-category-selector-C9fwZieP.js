import{at as o,j as e,em as l,a4 as c,a5 as u,a6 as x,T as m,a7 as p,en as d,a8 as g,aB as j,av as h}from"./index-C-4cxa9H.js";const S=j(`
    query TaxCategories($options: TaxCategoryListOptions) {
        taxCategories(options: $options) {
            items {
                id
                name
                isDefault
            }
        }
    }
`);function y({value:t,onChange:i}){const{data:a,isLoading:n,isPending:r,status:T}=o({queryKey:["taxCategories"],staleTime:3e5,queryFn:()=>h.query(S,{options:{take:100}})});return n||r?e.jsx(l,{className:"h-10 w-full"}):e.jsxs(c,{value:t,onValueChange:s=>s&&i(s),children:[e.jsx(u,{children:e.jsx(x,{placeholder:e.jsx(m,{id:"LWiFS0"})})}),e.jsx(p,{children:a&&e.jsx(d,{children:a==null?void 0:a.taxCategories.items.map(s=>e.jsx(g,{value:s.id,children:s.name},s.id))})})]})}export{y as T};
