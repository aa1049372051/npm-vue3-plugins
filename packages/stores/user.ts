import { defineStore } from 'pinia';
import defaultConfig from '@/config';

export const useUserStore = defineStore('user', {
  state: () => ({
    tokenInfo: { token: '' } as ApiData.LoginRespType,
    userInfo: null as ApiData.User | null,
    channel: 'WEB',
  }),
  actions: {
    //写入token信息
    setTokenInfo(info: ApiData.LoginRespType) {
      this.tokenInfo = info;
      // this.userInfo=info;
      //用户信息写入缓存
      window.localStorage.setItem(defaultConfig.tokenKey, JSON.stringify(info));
    },
    //写入用户信息
    setUserInfo(info: ApiData.User) {
      this.userInfo = info;
      //用户信息写入缓存
      window.localStorage.setItem(defaultConfig.loginStorageKey, JSON.stringify(info));
    },
    //获取登录信息
    getUserInfo(): string {
      let localToken = window.localStorage.getItem(defaultConfig.tokenKey);
      let localUser = window.localStorage.getItem(defaultConfig.loginStorageKey);
      if (localToken && !this.tokenInfo.token) {
        this.setTokenInfo(JSON.parse(localToken) as ApiData.LoginRespType);
      }
      if (localUser && !this.userInfo) {
        this.setUserInfo(JSON.parse(localUser) as ApiData.User);
      }
      return this.tokenInfo.token;
    },
    //清空信息
    clearUserInfo() {
      this.userInfo = null;
      this.tokenInfo = { token: '' };
      window.localStorage.removeItem(defaultConfig.tokenKey);
      window.localStorage.removeItem(defaultConfig.loginStorageKey);
    },
    //退出登录
    loginOut() {
      this.clearUserInfo();
      // Taro.clearStorage();
      window.location.href = `/xldd/login`;
    },
  },
});
