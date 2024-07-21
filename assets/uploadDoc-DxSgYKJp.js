import{j as n}from"./jsx-runtime-j_jdvEMj.js";import{useMDXComponents as o}from"./index-BSj771as.js";import{ae as r,af as a,ah as l,ai as t}from"./index-D-KqBC_u.js";import{U as p,B as m,F as d}from"./upload.stories-CAcIZWMC.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-DaTfPcID.js";import"../sb-preview/runtime.js";import"./index-D-8MO0q_.js";import"./index-DlJr0YTq.js";import"./index-DrFu-skq.js";import"./vue.esm-bundler-ngpQzEkL.js";import"./word-URG0C6V6.js";import"./oss-B4DI-S0s.js";import"./index-Bna4lvNQ.js";import"./index-D4rYSTCs.js";import"./index-DTpu9bs_.js";import"./httpV2-BKIcgRKj.js";function i(s){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{of:p}),`
`,n.jsx(e.h1,{id:"文件上传",children:"文件上传"}),`
`,n.jsx(e.p,{children:"文件上传组件"}),`
`,n.jsx(a,{}),`
`,n.jsx(e.h2,{id:"props",children:"Props"}),`
`,n.jsx(l,{}),`
`,n.jsx(e.h1,{id:"页面引用",children:"页面引用"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`import { WOssUpload } from "@my-plugins/vue-web";
`})}),`
`,n.jsx(e.h1,{id:"上传基本用法",children:"上传基本用法"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`<template>
      <WOssUpload
        ref="uploadRef"
        importType="Web"
        :my-file="{
          importType: '.png,.jpg',
          listType: 'text',
          fileCount: 1,
        }"
        :show-tips="false"
        :show-file-name="false"
        @uploadSuccess="(files)=>{console.log('上传成功',files)}"
      >
        <el-button link type="primary">上传</el-button>
      </WOssUpload>
</template>
`})}),`
`,n.jsx(e.h1,{id:"获取文件列表",children:"获取文件列表"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`import { ref } from "vue";
const uploadRef = ref();
//父组件中获取上传文件列表
uploadRef.value.fileList;
//判断是否在上传 true在上传/false不在
uploadRef.value.isStart;
`})}),`
`,n.jsx(e.h1,{id:"实现用户上传",children:"实现用户上传"}),`
`,n.jsx(t,{of:m}),`
`,n.jsx(e.h1,{id:"filelist初始化文件",children:"fileList初始化文件"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`<template>
      <WOssUpload
        importType="Web"
        :my-file="{
          importType: '.png,.jpg',
          listType: 'text',
          fileCount: 1,
          fileList: [
        {
          filePath:
            "https://img2.baidu.com/it/u=257191799,4243921961&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=854",
          fileName: "1.jpg",
        },
      ],
        }"
        :show-tips="false"
        :show-file-name="false"
      >
        <el-button link type="primary">上传</el-button>
      </WOssUpload>
</template>
`})}),`
`,n.jsx(e.h1,{id:"实现用户上传-1",children:"实现用户上传"}),`
`,n.jsx(t,{of:d})]})}function R(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{R as default};
