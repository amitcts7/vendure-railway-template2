import{j as t,e8 as y,r as l,H as P,dh as k,b6 as B,e9 as S,B as T,V as A,aF as L,T as $,aB as q}from"./index-BpQC7dM6.js";import{D as v}from"./delete-bulk-action-Bbl0-KUZ.js";const O=({selection:n,table:i})=>t.jsx(v,{mutationDocument:y,entityName:"facets",requiredPermissions:["DeleteCatalog","DeleteFacet"],selection:n,table:i}),c="facet-values-table",z=q(`
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
`);function Z({facetId:n,registerRefresher:i}){var d;const[p,f]=l.useState([]),[r,F]=l.useState(1),[u,V]=l.useState(10),{setTableSettings:m,settings:b}=P(),x=l.useRef(()=>{}),s=(d=b.tableSettings)==null?void 0:d[c],h={name:!0,code:!0},j=(s==null?void 0:s.columnVisibility)??h,C=(s==null?void 0:s.columnOrder)??[],D=s==null?void 0:s.columnFilters;return t.jsxs(t.Fragment,{children:[t.jsx(k,{listQuery:S(z),page:r,itemsPerPage:u,sorting:p,columnFilters:D,defaultColumnOrder:C,defaultVisibility:j,onPageChange:(e,a,o)=>{V(o),F(a)},onSortChange:(e,a)=>{f(a)},onFilterChange:(e,a)=>{m(c,"columnFilters",a)},onColumnVisibilityChange:(e,a)=>{m(c,"columnVisibility",a)},registerRefresher:e=>{x.current=e,i==null||i(e)},transformVariables:e=>{var o,g;return{options:{filter:{...((o=e.options)==null?void 0:o.filter)??{},facetId:{eq:n}},sort:(g=e.options)==null?void 0:g.sort,take:u,skip:(r-1)*u}}},onSearchTermChange:e=>({name:{contains:e}}),customizeColumns:{name:{header:"Name",cell:({row:e})=>t.jsx(B,{id:e.original.id,label:e.original.name,href:`/facets/${n}/values/${e.original.id}`})}},bulkActions:[{order:400,component:O}]}),t.jsx("div",{className:"mt-4",children:t.jsx(T,{asChild:!0,variant:"outline",children:t.jsxs(A,{to:`/facets/${n}/values/new`,children:[t.jsx(L,{}),t.jsx($,{id:"GZg2Zw"})]})})})]})}export{Z as F};
