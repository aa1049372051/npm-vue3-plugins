// 导入组件，组件必须声明 name
import WGridView from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
WGridView.install = function (Vue: any) {
  Vue.component(WGridView.name, WGridView);
};

export default WGridView;
