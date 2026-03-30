import{C as x}from"./customer-selector-eGTGdl5x.js";import{r as a,u as y,as as j,au as A,t as o,ea as N,av as L,eb as P,j as s,dh as T,B as $,V as v,e9 as D,T as F,aB as G}from"./index-C-4cxa9H.js";const n=G(`
    query CustomerGroupMemberList($id: ID!, $options: CustomerListOptions) {
        customerGroup(id: $id) {
            customers(options: $options) {
                items {
                    id
                    createdAt
                    updatedAt
                    firstName
                    lastName
                    emailAddress
                }
                totalItems
            }
        }
    }
`);function q({customerGroupId:r,canAddCustomers:u=!0}){const[l,d]=a.useState([]),[m,c]=a.useState(1),[p,g]=a.useState(10),[C,f]=a.useState([]),{_:i}=y(),h=j(),{mutate:S}=A({mutationFn:L.mutate(P),onSuccess:()=>{o.success(i({id:"y3tQ/s"})),h.invalidateQueries({queryKey:[N,n]})},onError:()=>{o.error(i({id:"ZlA28n"}))}});return s.jsxs("div",{children:[s.jsx(T,{listQuery:D(n),transformVariables:e=>({...e,id:r}),page:m,itemsPerPage:p,sorting:l,columnFilters:C,onPageChange:(e,t,b)=>{c(t),g(b)},onSortChange:(e,t)=>{d(t)},onFilterChange:(e,t)=>{f(t)},onSearchTermChange:e=>({lastName:{contains:e},emailAddress:{contains:e}}),additionalColumns:{name:{header:"Name",cell:({row:e})=>{const t=`${e.original.firstName} ${e.original.lastName}`;return s.jsx($,{asChild:!0,variant:"ghost",children:s.jsx(v,{to:"/customers/$id",params:{id:e.original.id},children:t})})}}},defaultColumnOrder:["name","emailAddress"],defaultVisibility:{id:!1,createdAt:!1,updatedAt:!1,firstName:!1,lastName:!1}}),u&&s.jsx(x,{onSelect:e=>{S({customerId:e.id,groupId:r})},label:s.jsx(F,{id:"IswRMs"})})]})}export{q as C};
