/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import { ElMessage } from 'element-plus'
import axios from "axios";
import { useUserStore } from "@/stores/user"

let store = {};
/**
 * 提示函数
 */
const tip = msg => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'error',
  })
};

/**
 * 改变登录状态
 */
const toLogin = () => {
  store.loginOut();
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 300:
      tip("登录过期，请重新登录");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    case 502:
      tip("请求超时，请重试");
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
var instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: 1000 * 20
});
// 设置post请求头
// instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// instance.defaults.headers.post["Content-Type"] = "application/json";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  config => {
    console.log(config, "config");
    store = useUserStore(window.pinia)
    if (config.baseURL) {
      config.url = config.url;
    } else {
      config.url = "/v3-yyt/" + config.url;
    }
    if (store.tokenInfo.token) {
      config['headers']['Authorization'] = 'Bearer ' + store.tokenInfo.token
    }
    return config;
  },
  error => {
    tip("请求异常，请刷新重试");
    Promise.error(error);
  }
);

instance.defaults.transformRequest = [
  function (data) {
    // console.log(data, "data");
    // console.log(store.state.config.header, "header");
    // Do whatever you want to transform the data
    let post = {};
    // if (data != undefined) {
    //   Object.assign(post, store.state.config.header);
    // } else {
    //   post = store.state.config.header;
    // }
    if (data && (data.pageno != undefined || data.pagesize != undefined)) {
      post.pageno = data.pageno;
      post.pagesize = data.pagesize;
      delete data.pageno;
      delete data.pagesize;
    }
    post.param = data;
    //统一采用qs发送数据
    // return qs.stringify(post);
    return JSON.stringify(post);
  }
];

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  response => {
    //兼容php返参
    // let res = { body: {}, header: {} };
    // res.body = response.data;
    // res.header = {
    //   code: response.data.retCode,
    //   msg: response.data.retMsg,
    //   success: response.data.retCode == "200" ? true : false
    // }
    // response.data = res
    if (response.data && response.data.body && "300" == response.data.body.retCode && "您的登录状态已失效，请重新登录" == response.data.body.retMsg) {
      toLogin();
    }
    return response;
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit("changeNetwork", false);
        tip("网络已断开，请检查网络设置");
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
