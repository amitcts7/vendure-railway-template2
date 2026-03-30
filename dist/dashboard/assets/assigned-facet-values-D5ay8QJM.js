import{c as m,r as x,j as c,cV as f,eb as j}from"./index-n8ng0CiC.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],F=m("Pen",p);function S({value:r=[],facetValues:i,canUpdate:a=!0,onChange:s}){const[l,n]=x.useState(i);function o(t){n(e=>[...e,t]),s==null||s([...new Set([...r??[],t.id])])}function d(t){s==null||s((r==null?void 0:r.filter(e=>e!==t))??[])}return c.jsxs(c.Fragment,{children:[c.jsx("div",{className:"flex flex-wrap",children:(r??[]).map(t=>{const e=l.find(u=>u.id===t);return e?c.jsx("div",{className:"mb-2 mr-1",children:c.jsx(f,{facetValue:e,removable:a,onRemove:d})},e.id):null})}),a&&c.jsx(j,{onValueSelect:o})]})}export{S as A,F as P};
