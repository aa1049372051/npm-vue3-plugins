import{j as n}from"./jsx-runtime-j_jdvEMj.js";import{useMDXComponents as i}from"./index-BSj771as.js";import{ae as t,af as o,ag as c,ah as p,ai as m}from"./index-D-KqBC_u.js";import{W as d,B as a}from"./area.stories-Dk-bKOSR.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-DaTfPcID.js";import"../sb-preview/runtime.js";import"./index-D-8MO0q_.js";import"./index-DlJr0YTq.js";import"./index-DrFu-skq.js";import"./vue.esm-bundler-ngpQzEkL.js";function s(r){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{of:d}),`
`,n.jsx(e.h1,{id:"省市区",children:"省市区"}),`
`,n.jsx(e.p,{children:"选择省市区"}),`
`,n.jsx(o,{}),`
`,n.jsx(e.h1,{id:"description",children:"Description"}),`
`,n.jsx(c,{of:a}),`
`,n.jsx(e.h2,{id:"props",children:"Props"}),`
`,n.jsx(p,{}),`
`,n.jsx(e.h1,{id:"页面引用",children:"页面引用"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`import { WArea } from "@my-plugins/vue-web";
`})}),`
`,n.jsx(e.h1,{id:"方法",children:"方法"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`//获取验证结果
this.$refs.area.validate();

//重置验证
this.$refs.area.reset();
`})}),`
`,n.jsx(e.h1,{id:"基本用法",children:"基本用法"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`<template>
   <WArea
    :provinceId.sync="provinceId"
    :cityId.sync="cityId"
    :areaId.sync="areaId"

    :provinceName.sync='provinceName'
    :cityName.sync='cityName'
    :areaName.sync='areaName'

    :isEmpty="true"
    ref="area"
    :ruleStr="[]">
  </WArea>
</template>
`})}),`
`,n.jsx(m,{of:a})]})}function D(r={}){const{wrapper:e}={...i(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(s,{...r})}):s(r)}export{D as default};
