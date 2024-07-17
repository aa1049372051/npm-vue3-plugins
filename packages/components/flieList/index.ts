import FileList from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
FileList.install = function (Vue: any) {
  Vue.component(FileList.name, FileList);
};

export default FileList;