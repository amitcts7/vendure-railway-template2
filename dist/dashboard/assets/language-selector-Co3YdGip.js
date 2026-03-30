import{_ as c,r as n,at as b,u as m,j as L,di as p,aB as v,av as d}from"./index-C-4cxa9H.js";function f(l){const{formatLanguageName:a}=c();return n.useMemo(()=>(l??[]).map(e=>({code:e,label:a(e)})).sort((e,s)=>e.label.localeCompare(s.label)),[l,a])}const x=v(`
    query AvailableGlobalLanguages {
        globalSettings {
            availableLanguages
        }
    }
`);function S(l){const{data:a}=b({queryKey:["availableGlobalLanguages"],queryFn:()=>d.query(x),staleTime:3e5}),{value:e,onChange:s,multiple:r,availableLanguageCodes:g}=l,{_:o}=m(),t=f(g??(a==null?void 0:a.globalSettings.availableLanguages)??void 0),i=n.useMemo(()=>t.map(u=>({value:u.code,label:u.label})),[t]);return L.jsx(p,{value:e,onChange:s,multiple:r,items:i,placeholder:o({id:"ffxVQ8"}),searchPlaceholder:o({id:"StoBff"})})}export{S as L,f as u};
