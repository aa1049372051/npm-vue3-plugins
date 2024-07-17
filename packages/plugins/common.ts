/**
 * 公共方法
 */
const utils = {
  json: (data) => {
    return JSON.parse(JSON.stringify(data));
  },
};
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $ 方法
    app.config.globalProperties.$utils = utils;
  },
};
