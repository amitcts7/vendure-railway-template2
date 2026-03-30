import{at as r,j as e,em as l,a4 as c,a5 as u,a6 as p,T as m,a7 as d,en as x,a8 as h,aB as j,av as S}from"./index-DEB5T4ki.js";const g=j(`
    query Zones($options: ZoneListOptions) {
        zones(options: $options) {
            items {
                id
                name
            }
        }
    }
`);function q({value:a,onChange:t}){const{data:n,isLoading:o,isPending:i}=r({queryKey:["zones"],staleTime:3e5,queryFn:()=>S.query(g,{options:{take:100}})});return o||i?e.jsx(l,{className:"h-10 w-full"}):e.jsxs(c,{value:a,onValueChange:s=>s&&t(s),children:[e.jsx(u,{children:e.jsx(p,{placeholder:e.jsx(m,{id:"p3M+0h"})})}),e.jsx(d,{children:n&&e.jsx(x,{children:n==null?void 0:n.zones.items.map(s=>e.jsx(h,{value:s.id,children:s.name},s.id))})})]})}export{q as Z};
