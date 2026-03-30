import{ab as c,r as n,aG as b,u as m,j as L,dz as p,aO as d,aI as f}from"./index-fGvXxrc-.js";function v(l){const{formatLanguageName:a}=c();return n.useMemo(()=>(l??[]).map(e=>({code:e,label:a(e)})).sort((e,s)=>e.label.localeCompare(s.label)),[l,a])}const x=d(`
    query AvailableGlobalLanguages {
        globalSettings {
            availableLanguages
        }
    }
`);function S(l){const{data:a}=b({queryKey:["availableGlobalLanguages"],queryFn:()=>f.query(x),staleTime:3e5}),{value:e,onChange:s,multiple:r,availableLanguageCodes:g}=l,{_:o}=m(),t=v(g??(a==null?void 0:a.globalSettings.availableLanguages)??void 0),i=n.useMemo(()=>t.map(u=>({value:u.code,label:u.label})),[t]);return L.jsx(p,{value:e,onChange:s,multiple:r,items:i,placeholder:o({id:"ffxVQ8"}),searchPlaceholder:o({id:"StoBff"})})}export{S as L,v as u};
