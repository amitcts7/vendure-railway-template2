import{aG as o,j as e,ew as l,ah as c,ai as u,aj as x,T as p,ak as m,ex as d,al as g,aO as j,aI as h}from"./index-n8ng0CiC.js";const S=j(`
    query TaxCategories($options: TaxCategoryListOptions) {
        taxCategories(options: $options) {
            items {
                id
                name
                isDefault
            }
        }
    }
`);function y({value:t,onChange:i}){const{data:a,isLoading:n,isPending:r,status:T}=o({queryKey:["taxCategories"],staleTime:3e5,queryFn:()=>h.query(S,{options:{take:100}})});return n||r?e.jsx(l,{className:"h-10 w-full"}):e.jsxs(c,{value:t,onValueChange:s=>s&&i(s),children:[e.jsx(u,{children:e.jsx(x,{placeholder:e.jsx(p,{id:"LWiFS0"})})}),e.jsx(m,{children:a&&e.jsx(d,{children:a==null?void 0:a.taxCategories.items.map(s=>e.jsx(g,{value:s.id,children:s.name},s.id))})})]})}export{y as T};
