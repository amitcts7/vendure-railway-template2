import{aG as r,j as e,ew as l,ah as c,ai as u,aj as p,T as m,ak as x,ex as d,al as h,aO as j,aI as S}from"./index-n8ng0CiC.js";const g=j(`
    query Zones($options: ZoneListOptions) {
        zones(options: $options) {
            items {
                id
                name
            }
        }
    }
`);function q({value:a,onChange:t}){const{data:n,isLoading:i,isPending:o}=r({queryKey:["zones"],staleTime:3e5,queryFn:()=>S.query(g,{options:{take:100}})});return i||o?e.jsx(l,{className:"h-10 w-full"}):e.jsxs(c,{value:a,onValueChange:s=>s&&t(s),children:[e.jsx(u,{children:e.jsx(p,{placeholder:e.jsx(m,{id:"p3M+0h"})})}),e.jsx(x,{children:n&&e.jsx(d,{children:n==null?void 0:n.zones.items.map(s=>e.jsx(h,{value:s.id,children:s.name},s.id))})})]})}export{q as Z};
