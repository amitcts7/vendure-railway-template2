import{j as t,ei as D,r as l,_ as P,dy as S,bm as k,ej as T,B as A,a6 as B,aS as L,T as O,aO as $}from"./index-n8ng0CiC.js";import{D as q}from"./delete-bulk-action-Bj-NSOMZ.js";const v=({selection:i,table:n})=>t.jsx(q,{mutationDocument:D,entityName:"facets",requiredPermissions:["DeleteCatalog","DeleteFacet"],selection:i,table:n}),c="facet-values-table",z=$(`
    query FacetValueList($options: FacetValueListOptions) {
        facetValues(options: $options) {
            items {
                id
                createdAt
                updatedAt
                name
                code
                customFields
            }
            totalItems
        }
    }
`);function Z({facetId:i,registerRefresher:n}){var d;const[p,f]=l.useState([]),[r,F]=l.useState(1),[u,V]=l.useState(10),{setTableSettings:m,settings:b}=P(),x=l.useRef(()=>{}),s=(d=b.tableSettings)==null?void 0:d[c],j={name:!0,code:!0},h=(s==null?void 0:s.columnVisibility)??j,C=(s==null?void 0:s.columnOrder)??[],y=s==null?void 0:s.columnFilters;return t.jsxs(t.Fragment,{children:[t.jsx(S,{listQuery:T(z),page:r,itemsPerPage:u,sorting:p,columnFilters:y,defaultColumnOrder:C,defaultVisibility:h,onPageChange:(e,a,o)=>{V(o),F(a)},onSortChange:(e,a)=>{f(a)},onFilterChange:(e,a)=>{m(c,"columnFilters",a)},onColumnVisibilityChange:(e,a)=>{m(c,"columnVisibility",a)},registerRefresher:e=>{x.current=e,n==null||n(e)},transformVariables:e=>{var o,g;return{options:{filter:{...((o=e.options)==null?void 0:o.filter)??{},facetId:{eq:i}},sort:(g=e.options)==null?void 0:g.sort,take:u,skip:(r-1)*u}}},onSearchTermChange:e=>({name:{contains:e}}),customizeColumns:{name:{header:"Name",cell:({row:e})=>t.jsx(k,{id:e.original.id,label:e.original.name,href:`/facets/${i}/values/${e.original.id}`})}},bulkActions:[{order:400,component:v}]}),t.jsx("div",{className:"mt-4",children:t.jsx(A,{asChild:!0,variant:"outline",children:t.jsxs(B,{to:`/facets/${i}/values/new`,children:[t.jsx(L,{}),t.jsx(O,{id:"GZg2Zw"})]})})})]})}export{Z as F};
