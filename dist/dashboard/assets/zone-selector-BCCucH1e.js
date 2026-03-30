import{at as r,j as e,ep as l,a4 as c,a5 as p,a6 as u,T as m,a7 as d,eq as x,a8 as h,aB as j,av as S}from"./index-vQ8vs7IN.js";const g=j(`
    query Zones($options: ZoneListOptions) {
        zones(options: $options) {
            items {
                id
                name
            }
        }
    }
`);function y({value:a,onChange:t}){const{data:n,isLoading:o,isPending:i}=r({queryKey:["zones"],staleTime:3e5,queryFn:()=>S.query(g,{options:{take:100}})});return o||i?e.jsx(l,{className:"h-10 w-full"}):e.jsxs(c,{value:a,onValueChange:s=>s&&t(s),children:[e.jsx(p,{children:e.jsx(u,{placeholder:e.jsx(m,{id:"p3M+0h"})})}),e.jsx(d,{children:n&&e.jsx(x,{children:n==null?void 0:n.zones.items.map(s=>e.jsx(h,{value:s.id,children:s.name},s.id))})})]})}export{y as Z};
