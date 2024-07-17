// 导入组件，组件必须声明 name
import WArea from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
WArea.install = function (Vue: any) {
  Vue.component(WArea.name, WArea);
};

export default WArea;
