import{r,d3 as i,aG as l,j as s,$ as m,a0 as p,B as x,aS as h,a2 as f,cq as j,cr as A,cs as N,ct as V,cu as g,cv as C,e2 as y,aO as P,e8 as S,aI as b}from"./index-t8kWDkHu.js";const k=P(`
        query ProductVariantList($options: ProductVariantListOptions) {
            productVariants(options: $options) {
                items {
                    id
                    name
                    sku
                    featuredAsset {
                        ...Asset
                    }
                    price
                    priceWithTax
                    product {
                        featuredAsset {
                            ...Asset
                        }
                    }
                }
                totalItems
            }
        }
    `,[S]);function I({onProductVariantSelect:c}){const[n,d]=r.useState(""),[u,o]=r.useState(!1),t=i(n,500),{data:a}=l({queryKey:["productVariants",t],staleTime:1e3*60*5,enabled:t.length>0,queryFn:()=>b.query(k,{options:{take:10,filter:{name:{contains:t},sku:{contains:t}},filterOperator:"OR"}})});return s.jsxs(m,{open:u,onOpenChange:o,children:[s.jsx(p,{asChild:!0,children:s.jsxs(x,{variant:"outline",role:"combobox",className:"w-full",children:["Add item to order",s.jsx(h,{className:"opacity-50"})]})}),s.jsx(f,{className:"p-0",children:s.jsxs(j,{shouldFilter:!1,children:[s.jsx(A,{placeholder:"Add item to order...",className:"h-9",onValueChange:e=>d(e)}),s.jsxs(N,{children:[s.jsx(V,{children:"No products found."}),s.jsx(g,{children:a==null?void 0:a.productVariants.items.map(e=>s.jsxs(C,{value:e.id,onSelect:()=>{c({productVariantId:e.id,productVariantName:e.name,sku:e.sku,productAsset:e.featuredAsset??e.product.featuredAsset??null,price:e.price,priceWithTax:e.priceWithTax}),o(!1)},className:"flex items-center gap-2 p-2",children:[e.featuredAsset&&s.jsx(y,{asset:e.featuredAsset,preset:"tiny",className:"size-8 rounded-md object-cover"}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx("span",{className:"text-sm font-medium",children:e.name}),s.jsx("span",{className:"text-xs text-muted-foreground",children:e.sku})]})]},e.id))})]})]})})]})}export{I as P};
