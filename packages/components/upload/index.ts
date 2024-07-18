// 导入组件，组件必须声明 name
import Upload from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
Upload.install = function (Vue: any) {
  Vue.component(Upload.name, Upload);
};

export default Upload;
