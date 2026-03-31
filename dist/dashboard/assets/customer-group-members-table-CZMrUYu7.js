import{C as y}from"./customer-selector-BlZbqmBi.js";import{r as a,u as b,aF as j,aH as A,t as o,ek as N,aI as L,el as P,j as s,dy as T,B as $,a6 as F,ej as D,T as G,aO as I}from"./index-t8kWDkHu.js";const n=I(`
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
`);function q({customerGroupId:r,canAddCustomers:u=!0}){const[l,d]=a.useState([]),[m,c]=a.useState(1),[p,g]=a.useState(10),[C,f]=a.useState([]),{_:i}=b(),S=j(),{mutate:h}=A({mutationFn:L.mutate(P),onSuccess:()=>{o.success(i({id:"y3tQ/s"})),S.invalidateQueries({queryKey:[N,n]})},onError:()=>{o.error(i({id:"ZlA28n"}))}});return s.jsxs("div",{children:[s.jsx(T,{listQuery:D(n),transformVariables:e=>({...e,id:r}),page:m,itemsPerPage:p,sorting:l,columnFilters:C,onPageChange:(e,t,x)=>{c(t),g(x)},onSortChange:(e,t)=>{d(t)},onFilterChange:(e,t)=>{f(t)},onSearchTermChange:e=>({lastName:{contains:e},emailAddress:{contains:e}}),additionalColumns:{name:{header:"Name",cell:({row:e})=>{const t=`${e.original.firstName} ${e.original.lastName}`;return s.jsx($,{asChild:!0,variant:"ghost",children:s.jsx(F,{to:"/customers/$id",params:{id:e.original.id},children:t})})}}},defaultColumnOrder:["name","emailAddress"],defaultVisibility:{id:!1,createdAt:!1,updatedAt:!1,firstName:!1,lastName:!1}}),u&&s.jsx(y,{onSelect:e=>{h({customerId:e.id,groupId:r})},label:s.jsx(G,{id:"IswRMs"})})]})}export{q as C};
