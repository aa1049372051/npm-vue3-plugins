import { defineStore } from "pinia";
import Crypto from "@/utils/crypto.js";
export const useOssStore = defineStore("oss", {
  state: () => {
    return {
      upOss: "" as string,
      ossConfig: {} as ApiData.OssConfig,
    };
  },
  actions: {
    setOssConfig(ossData: ApiData.OssConfig) {
      this.upOss = `https://${ossData.bucketName}.${ossData.endpoint}`;
      let data = Crypto.util.setOss(ossData);
      let myUpload = {
        policy: data.policy || "",
        accessKeyId: data.accessKeyId || "",
        signature: data.signature || "",
        accessKeySecret: data.accessKeySecret || "",
        endpoint: data.endpoint || "",
        bucketName: data.bucketName || "",
      };
      this.ossConfig = myUpload;
    },
  },
});
