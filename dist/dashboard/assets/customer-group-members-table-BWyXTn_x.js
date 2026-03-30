import{C as b}from"./customer-selector-BsoemMzG.js";import{r as a,u as y,as as j,au as A,t as o,ed as N,av as L,ee as P,j as s,dk as T,B as $,V as v,ec as D,T as F,aB as G}from"./index-vQ8vs7IN.js";const n=G(`
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
`);function q({customerGroupId:r,canAddCustomers:u=!0}){const[d,l]=a.useState([]),[m,c]=a.useState(1),[p,g]=a.useState(10),[C,f]=a.useState([]),{_:i}=y(),S=j(),{mutate:h}=A({mutationFn:L.mutate(P),onSuccess:()=>{o.success(i({id:"y3tQ/s"})),S.invalidateQueries({queryKey:[N,n]})},onError:()=>{o.error(i({id:"ZlA28n"}))}});return s.jsxs("div",{children:[s.jsx(T,{listQuery:D(n),transformVariables:e=>({...e,id:r}),page:m,itemsPerPage:p,sorting:d,columnFilters:C,onPageChange:(e,t,x)=>{c(t),g(x)},onSortChange:(e,t)=>{l(t)},onFilterChange:(e,t)=>{f(t)},onSearchTermChange:e=>({lastName:{contains:e},emailAddress:{contains:e}}),additionalColumns:{name:{header:"Name",cell:({row:e})=>{const t=`${e.original.firstName} ${e.original.lastName}`;return s.jsx($,{asChild:!0,variant:"ghost",children:s.jsx(v,{to:"/customers/$id",params:{id:e.original.id},children:t})})}}},defaultColumnOrder:["name","emailAddress"],defaultVisibility:{id:!1,createdAt:!1,updatedAt:!1,firstName:!1,lastName:!1}}),u&&s.jsx(b,{onSelect:e=>{h({customerId:e.id,groupId:r})},label:s.jsx(F,{id:"IswRMs"})})]})}export{q as C};
