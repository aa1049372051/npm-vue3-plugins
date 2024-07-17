export interface DefaultConfig {
  // apiHost: string;
  // apiV3Host: string;
  apiPayHost: string;
  channel: string;
  loginStorageKey: string;
  loginBeforePages: string;
  ossConfigStorageKey: string;
  storageWChatKey: string;
  tokenKey:string;
  //是否开启日志记录
  logger: boolean;
  urlApis: Array<string>; //请求白名单。非登录下可访问
  loginHome:string;//登录后跳转的路由
  loginFhzHome:string;//登录后跳转的路由
}
// let apiHost = "/jiaparts-support-api"; //开发
// let apiV3Host = "/jiaparts-support-api-v3"; //开发

// let apiPayHost = "/commonApi/jppapi.do"; //测试

export default {
  tokenKey: "tokenKey",
  loginBeforePages: "loginBeforePages",
  loginStorageKey: "loginStorageKey",
  ossConfigStorageKey: "ossConfigStorageKey",
  channel: "WEB",
  logger: true,
  loginHome:'x_payable',
  loginFhzHome:'f_dispatchStation',
  urlApis: [
    "/v3-syj/qsg/login/qsgLogin001",
    "/v3-syj/qsg/login/qsgLogin002",
    "/v3-syj/qsg/login/qsgLogin003",
    "/v3-syj/qsg/login/qsgLogin004",
    "/mml-syj/sys002",
    "/mml-syj_v2/mdwx002",
    "/mml-syj_v2/pubs100",
    "/v3-syj/cad007",
    "/v3-syj/cad002",
    "/v3-syj/cad006",
    "/tzb/cps014",
    "/v3-syj/orgLabel/lb001",
  ],
} as DefaultConfig;
