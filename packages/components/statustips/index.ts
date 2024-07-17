// 导入组件，组件必须声明 name
import StatusTips from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
StatusTips.install = function (Vue: any) {
  Vue.component(StatusTips.name, StatusTips);
};

export default StatusTips;
