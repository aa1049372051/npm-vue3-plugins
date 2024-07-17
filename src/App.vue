<script setup>
import { ref, watch } from "vue";
const myfile = ref();
import HelloWorld from "./components/HelloWorld.vue";
// import { WGridView } from "@my-plugins/vue-web";
// import {
//   WGridView,
//   WOssUpload,
//   WArea,
//   utils,
//   plugins,
//   FileList,
//   Editor,
// } from "@my-plugins/vue-web";
// import "@my-plugins/vue-web/lib/style.css";
// 引用vue-web样式
import "../lib/style.css";
import {
  WGridView,
  WOssUpload,
  // WArea,
  utils,
  plugins,
  FileList,
  Editor,
} from "../packages/index";
console.log(plugins, utils);
const javaApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: "g",
          age: 100,
        },
      ]);
    }, 2000);
  });
};
let columns = [
  {
    label: "名称",
    prop: "name",
  },
  {
    label: "年龄",
    prop: "age",
  },
];

const content = ref("");
watch(content, (value) => {
  console.log(value);
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <!-- <el-row>
      <Editor style="height:200px" v-model="content"></Editor>
    </el-row> -->
    <!-- <WArea></WArea> -->
    <WOssUpload
      importType="Web"
      ref="myfile"
      :my-file="{
        importType: '.png,.jpg',
        listType: 'text',
        fileCount: 9,
        ID: 0,
        fileList: [
          { filePath: 'business/46551_1715658317_7164.png', fileType: 1 },
        ],
      }"
      :show-tips="false"
      :is-open-screenshot="false"
      :show-file-name="false"
    >
      <el-button link type="primary">上传</el-button>
    </WOssUpload>
    <el-button @click="console.log(myfile.fileList)">获取图片列表</el-button>
    <WGridView
      :closePage="false"
      :javaApi="javaApi"
      :columns="columns"
    ></WGridView>
    <FileList
      :file="[{ filePath: 'business/46551_1715658317_7164.png', fileType: 1 }]"
      :isViewImg="true"
    ></FileList>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
