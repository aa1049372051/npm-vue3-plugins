<template>
  <div :class="divWidth ? 'width100' : ''">
    <el-upload
      class="upload-demo fl wid90 myWOssUpload"
      v-if="showAdd"
      :action="upUrl"
      :before-upload="beforeUploadCompress"
      :disabled="updisabled"
      :on-success="upSuccess"
      :on-error="upError"
      :on-progress="uping"
      :on-change="upChange"
      :on-remove="upRemove"
      :file-list="fileList"
      :list-type="listType"
      :accept="fileType"
      :data="form"
      ref="myUpload"
    >
      <slot />
      <slot name="tip" />
      <div
        style="display: inline"
        slot="tip"
        class="el-upload__tip fc-gray6"
        v-if="showImgFile && showTips"
      >
        注：{{ fileTypeName }}单个文件大小{{ fileSize
        }}{{ unitKB ? "KB" : "MB" }}以内；附件数量最多{{ fileCount }}个{{
          showTipsMore || ""
        }}
      </div>
    </el-upload>
    <slot
      name="imageList"
      :flieList="fileList"
      :updisabled="updisabled"
      :myPercent="myPercent"
    ></slot>
    <div class="en-clo-li fl wid90 mar-top10" v-if="showImgFile && !customList">
      <span v-show="false">{{ funcFileLoading }}</span>
      <ul class="clear">
        <li v-for="(item, index) in newFile" :key="item.filePath + '' + index">
          <i class="del pointer" @click="deleteFile(item)" v-if="showDelIcon">
            <!-- <i
              style="color: red; font-size: 20px"
              class="el-icon-circle-close"
            /> -->
            <img src="../../../assets/images/icon/del.png" />
          </i>
          <i class="firstTag" v-if="showFirstTag && index == 0">
            <el-tag size="small">首图</el-tag>
          </i>
          <template v-if="item.fileName">
            <el-tooltip placement="bottom-start" :disabled="isTips">
              <template #content>
                <div>{{ item.fileName }}</div>
              </template>
              <template #default>
                <div
                  style="border: 1px solid #b5bfcf; height: 50px; width: 50px"
                  @click="show(item, index)"
                >
                  <img
                    v-if="
                      playType.indexOf(item.myFileType) >= 0 &&
                      !item.filePlaying
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/playing.png"
                  />
                  <img
                    v-else-if="
                      playType.indexOf(item.myFileType) >= 0 && item.filePlaying
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/myplaying.gif"
                  />
                  <img
                    v-else-if="
                      item.myFileType == 'xlsx' || item.myFileType == 'xls'
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/excel.png"
                  />
                  <img
                    v-else-if="item.myFileType == 'pdf'"
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/pdf.png"
                  />
                  <img
                    v-else-if="
                      item.myFileType == 'ppt' || item.myFileType == 'pptx'
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/ppt.png"
                  />
                  <img
                    v-else-if="item.myFileType == 'txt'"
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/txt.png"
                  />
                  <img
                    v-else-if="
                      item.myFileType == 'doc' || item.myFileType == 'docx'
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/word.png"
                  />
                  <!-- <img
                    v-else-if="
                      item.myFileType == 'rar' || item.myFileType == 'zip'
                    "
                    style="width: 50px; height: 50px"
                    src="../../../assets/images/icon/file.jpg"
                  /> -->
                  <el-image
                    v-else
                    style="width: 50px; height: 50px"
                    :src="item.thumbUrl"
                    :preview-src-list="[item.url]"
                  ></el-image>
                </div>
              </template>
            </el-tooltip>
          </template>
          <template v-else>
            <div
              style="border: 1px solid #b5bfcf; height: 50px; width: 50px"
              @click="show(item, index)"
            >
              <img
                v-if="
                  playType.indexOf(item.myFileType) >= 0 && !item.filePlaying
                "
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/playing.png"
              />
              <img
                v-else-if="
                  playType.indexOf(item.myFileType) >= 0 && item.filePlaying
                "
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/myplaying.gif"
              />
              <img
                v-else-if="
                  item.myFileType == 'xlsx' || item.myFileType == 'xls'
                "
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/excel.png"
              />
              <img
                v-else-if="item.myFileType == 'pdf'"
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/pdf.png"
              />
              <img
                v-else-if="
                  item.myFileType == 'ppt' || item.myFileType == 'pptx'
                "
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/ppt.png"
              />
              <img
                v-else-if="item.myFileType == 'txt'"
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/txt.png"
              />
              <img
                v-else-if="
                  item.myFileType == 'doc' || item.myFileType == 'docx'
                "
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/word.png"
              />
              <!-- <img
                v-else-if="item.myFileType == 'rar' || item.myFileType == 'zip'"
                style="width: 50px; height: 50px"
                src="../../../assets/images/icon/file.jpg"
              /> -->

              <el-image
                style="width: 50px; height: 50px"
                :lazy="!!item.thumbUrl"
                @click="$emit('imgClick', item.url)"
                :src="item.thumbUrl"
                :preview-src-list="[item.url]"
              ></el-image>
              <!-- <img
                style="width: 50px; height: 50px"
                @click="$emit('imgClick', item.url)"
                :src="item.thumbUrl"
              /> -->
            </div>
          </template>
          <el-tooltip
            placement="bottom-start"
            v-if="item.fileName && showFileName"
          >
            <div slot="content">{{ item.fileName }}</div>
            <p class="textover ft-size12 fc-6">{{ item.fileName }}</p>
          </el-tooltip>
          <slot name="bottomcontent" :data="item" :index="index"></slot>
        </li>
        <li v-if="updisabled" style="height: 50px; width: 50px">
          <el-progress :width="myWidth" type="circle" :percentage="myPercent" />
        </li>
      </ul>
    </div>
    <iframe id="ifile" style="display: none"></iframe>
  </div>
</template>
<script>
/**
 *
 *      <my-upload ref="file" :my-file="{importType:'.png,.jpg',listType:'text'}">
 *          <el-button size="small" type="primary">本地上传</el-button>
 *     </my-upload>
 *     import MyUpload from '@/plugins/OssUpload';
 *     父组件中获取上传文件列表
 *     this.$refs.file.fileList
 *     this.$refs.file.isStart  //判断是否在上传 true在上传/false不在
 */

import * as imageConversion from "image-conversion";
import * as OSS from "ali-oss";
import { useUserStore } from "@/stores/user";
import { useOssStore } from "@/stores/oss";
import { ElMessageBox } from "element-plus";
import axios from "@/utils/httpV2";
export default {
  name: "WOssUpload",
  components: {},

  data() {
    return {
      myWidth: 50,
      myPercent: 0, //进度
      isStart: false,
      //是否禁用
      updisabled: false,
      //上传
      fileList: [],
      //阿里云参数
      form: {},
      //文件大小
      fileSize: this.myFile.fileSize ? this.myFile.fileSize : 10,
      //文件数量
      fileCount: this.myFile.fileCount ? this.myFile.fileCount : 9,
      //上传类型
      fileType: this.myFile.importType ? this.myFile.importType : "",
      //上传类型名称
      fileTypeName: this.myFile.importTypeName
        ? "附件格式仅支持" + this.myFile.importTypeName + ";"
        : "",
      //显示类型 text/picture/picture-cardkey
      listType: this.myFile.listType ? this.myFile.listType : "text",
      //文件命名规则 (1/2/3/4/5/6,机构LOGO/联盟LOGO/个人LOGO/门面照片&营业执照/业务附件/聊天附件)
      nameType: this.myFile.nameType ? this.myFile.nameType : 5,
      //ID  默认登录账号的机构ID
      ID: this.myFile.ID ? this.myFile.ID : "",
      ossclient: null,
      uniqid: null,
      isInTheScreenshot: false,
      isHide: false,
      isInThePaste: false,
      chatMsgDg: false,
      imtime: null,
      phoneQrcodeDg: false,
      materialUrl: "",
      showScan: true,
      isKey: this.myFile.isKey ? true : false,
    };
  },
  props: {
    /** 默认文件 */
    myFile: {
      type: Object,
      default: function () {
        return {};
      },
    },
    playType: {
      type: Array,
      default() {
        return ["mp3"];
      },
    },
    imgType: {
      type: Array,
      default() {
        return ["jpg", "gif", "png", "image/jpeg"];
      },
    },
    isTips: {
      type: Boolean,
      default() {
        return false;
      },
    },
    unitKB: {
      type: Boolean,
      default() {
        return false;
      },
    },
    /**显示文件名 */
    showFileName: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showImgFile: {
      type: Boolean,
      default() {
        return true;
      },
    },
    importType: {
      type: String,
      default() {
        return "PC";
      },
    },
    /** 是否显示提示信息 */
    showTips: {
      type: Boolean,
      default() {
        return true;
      },
    },
    /** 是否显示删除按钮 */
    showDelIcon: {
      type: Boolean,
      default() {
        return true;
      },
    },
    /** 是否显示首图 */
    showFirstTag: {
      type: Boolean,
      default() {
        return false;
      },
    },
    /** 是否显示更多信息 */
    showTipsMore: {
      type: String,
      default() {
        return "";
      },
    },
    divWidth: {
      type: Boolean,
      default() {
        return false;
      },
    },
    getFileData: {
      type: Boolean,
      default() {
        return false;
      },
    },
    beforeUploadEvent: {
      type: Function,
      default() {
        return null;
      },
    },
    /** 是否自定义图片展示列表 */
    customList: {
      type: Boolean,
      default() {
        return false;
      },
    },
    screenshotText: {
      type: String,
      default() {
        return "截图";
      },
    },
    /** 上传附件是否视频 */
    isVideo: {
      type: Boolean,
      default() {
        return false;
      },
    },
    showAdd: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    //删除附件
    deleteFile(item) {
      let index = -1;
      this.fileList.forEach((val, i) => {
        if (val.filePath == item.filePath) {
          index = i;
          return;
        }
      });
      // let index = this.getDataIndex("randomKey", this.fileList, item.randomKey);
      if (index > -1) {
        this.fileList.splice(index, 1);
        /** 删除事件 */
        this.$emit("uploadRemoveSuccess");
      }
    },
    show(arg, index) {
      if (window.wx) {
        let url = this.upUrl + "/" + arg.filePath;
        let list = [];
        this.newFile.forEach((item) => {
          list.push(this.upUrl + "/" + item.filePath);
        });
        if (arg.fileType != 1) {
          // this.$alert(url);
          // window.download(url);
          window.open(url);
          return;
        }
        window.wx.previewImage({
          current: url, // 第一张显示的图片链接
          urls: list, // 需要预加载的图片http链接列表，预加载后，可以滑动浏览这些图片
        });
        return;
      }
      if (this.isBrowser) {
        return;
      }
      if ("img" == this.importType) {
        return;
      }
      if (this.importType == "Web") {
        let url = this.upUrl + "/" + arg.filePath;
        if (
          arg.filePath.indexOf(".xls") != -1 ||
          arg.filePath.indexOf(".xlsx") != -1
        ) {
          location.href = url;
          return false;
        }
        window.download(this.upUrl + "/" + arg.filePath);
        return;
      }
      //锁-加载
      if (this.loadingLock) {
        ElMessageBox.alert("文件加载中,请稍后在试。", "提示", {
          type: "warning",
        });
        return false;
      }
      this.loadingLock = true;
      //loading开关
      this.$set(this.newFile[index], "fileLoading", true);
      this.newFile.filter((item, index) => {
        this.$set(this.newFile[index], "filePlaying", false);
        return true;
      });
    },
    clean() {
      this.fileList = [];
    },
    myAbort() {
      this.$refs.myUpload.abort();
    },
    getFileUrl(data, showThumbnail = false) {
      let url = this.upUrl + "/" + data.filePath;
      if (showThumbnail) {
        url += `?x-oss-process=image/resize,m_pad,h_50,w_50,color_ffffff&randomkey=${Math.random()}`;
      }
      return url;
    },
    //获取名称
    getfilename() {
      let name = "";
      switch (this.nameType) {
        case 1:
          name = "logo/organ/" + this.ID + "_logo";
          break;
        case 2:
          name = "logo/union/" + this.ID + "_logo";
          break;
        case 3:
          name = "logo/user/" + this.ID + "_logo";
          break;
        case 4:
          name =
            "organ/" + this.ID + "_" + Math.round(new Date().getTime() / 1000);
          break;
        case 5:
          name =
            "business/" +
            this.ID +
            "_" +
            Math.round(new Date().getTime() / 1000) +
            "_" +
            parseInt(Math.random() * (9999 - 1000 + 1) + 1000, 10);
          break;
        case 9:
          name = "logo/wechat/" + this.ID + "_logo";
          break;
        case 10:
          name =
            "business/pxr/" +
            this.ID +
            "_" +
            Math.round(new Date().getTime() / 1000) +
            "_" +
            parseInt(Math.random() * (9999 - 1000 + 1) + 1000, 10);
          break;
        case 11:
          name = "logo/wx/organ/" + this.ID;
          break;
      }
      return name ? name : "error";
    },
    upChange() {
      this.updisabled = false;
      this.myPercent = 0;
    },
    uping(event) {
      this.myPercent = parseInt(event.percent);
    },
    beforeUploadCompress(file) {
      if (this.beforeUploadEvent) {
        let res = this.beforeUploadEvent(file);
        if (res === false) {
          return false;
        }
      }
      let res = this.beforeUpload(file);
      if (res == false) {
        return false;
      }
      if (file.type.indexOf("image") == -1) {
        return true;
      }
      return new Promise((resolve, reject) => {
        // let isLt2M = file.size / 1024 / 1024 < 1 // 判定图片大小是否小于4MB
        // if (isLt2M) {
        //   resolve(file)
        // }
        console.log(file); // 压缩到400KB,这里的400就是要压缩的大小,可自定义
        imageConversion
          .compress(file, {
            quality: 0.8,
            type: "image/png",
            scale: 0.5,
          })
          .then((res) => {
            resolve(res);
          });
      });
    },
    //配置上传参数
    beforeUpload(file) {
      let self = this;
      if (typeof FileReader === "undefined") {
        //如果不支持FileReader且文件key存在,根据文件key获取下载地址
      } else {
        //如果浏览器支持FileReader
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        // reader.readAsDataURL(file);
        if (this.getFileData) {
          reader.onload = function (ev) {
            try {
              //获取数据
              // var data = ev.target.result;
              self.$emit("getFileDataDone", ev);
            } catch (e) {
              console.log(e);
              console.log("文件类型不正确");
              return;
            }
          };
        }
        //当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.
        // reader.onloadend = function() {
        //   if (this.error === null) {
        //   } else {
        //     //如果有错误
        //   }
        // };
      }
      if (this.unitKB) {
        if (file.size > this.fileSize * 1024) {
          this.$alert("最大只能上传" + this.fileSize + "KB的文件");
          // this.$alert(
          //   this.$t("message.uploadMax", {
          //     size: this.fileSize
          //   })
          // );
          return false;
        }
      } else {
        if (file.size > this.fileSize * 1024 * 1024) {
          this.$alert("最大只能上传" + this.fileSize + "M的文件");
          // this.$alert(
          //   this.$t("message.uploadMax", {
          //     size: this.fileSize
          //   })
          // );
          return false;
        }
      }

      if (this.fileList.length >= this.fileCount) {
        this.$alert("最多只能上传" + this.fileCount + "个文件");
        // this.$alert(
        //   this.$t("message.uploadNum", {
        //     num: this.fileCount
        //   })
        // );
        return false;
      }
      /* 校验文件类型 */
      if (this.fileType && this.fileType != "*") {
        let fileType = this.fileType.replace(/,/g, "$|\\");
        // fileType = "/\\" + fileType + "$/i";
        // let reg = eval(fileType);
        let reg = new RegExp(`\\${fileType}$`, "i");
        if (!reg.test(file.name)) {
          this.$alert(`只能上传${this.fileType}类型的文件`);
          return false;
        }
      }

      // let suffix = file.name;
      let ext = file.name.replace(/.+\./, "");
      let name = this.getfilename();
      let key = "";
      if (
        this.nameType == "1" ||
        this.nameType == "2" ||
        this.nameType == "3" ||
        this.nameType == "9"
      ) {
        key = encodeURI(`${name}`);
      } else {
        key = encodeURI(`${name + "." + ext}`);
      }

      this.form.key = key;
      this.form.success_action_status = "200";
      let store = useOssStore(window.pinia);
      let uploaddata = store.ossConfig;
      console.log(uploaddata);
      this.form.policy = uploaddata.policy;
      this.form.OSSAccessKeyId = uploaddata.accessKeyId;
      this.form.signature = uploaddata.signature;
      this.updisabled = true;
      this.isStart = true;
      this.$emit("isStart");
      return true;
    },
    //上传成功
    upSuccess(response, file) {
      this.updisabled = false;
      //判断文件类型
      let fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
      fileType = this.getFileType(fileType);
      this.fileList.push({
        // url: this.myFile.isKey
        //   ? this.upUrl + "/" + this.form.key + "?key=" + new Date().getTime()
        //   : this.upUrl + "/" + this.form.key,
        fileType: file.fileType || fileType,
        fileName: file.name,
        filePath: this.form.key,
        fileSize: file.size,
        url: this.upUrl,
      });
      this.isStart = false;
      /** 上传成功 */
      this.$emit("uploadSuccess", this.fileList);
    },
    //上传失败
    upError() {
      this.$alert("上传失败,请重试");
      this.isStart = false;
      /** 上传失败 */
      this.$emit("uploadError");
      //获取上传时阿里云秘钥
      axios.post("mml-syj/sys002").then((res) => {
        let store = useOssStore(window.pinia);
        store.setOssConfig(res.data.result.oss);
      });
    },
    //删除
    upRemove(file, fileList) {
      this.fileList = fileList;
      this.$emit("uploadRemoveSuccess");
    },
    dataURLtoFile(dataurl) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime,
      }); // if env support File, also can use this: return new File([u8arr], filename, { type: mime });
    },
    getScreenShotKey(prefix = "screenShot", suffix = ".png") {
      let name = prefix + new Date().getTime() + suffix;
      return {
        name: name,
        key: "business/" + name,
      };
    },
    setOSSClient(data) {
      let endpoint = data.endpoint;
      if (endpoint.indexOf(".aliyuncs.com") > -1) {
        endpoint = endpoint.replace(".aliyuncs.com", "");
      }
      this.ossclient = new OSS.Wrapper({
        region: endpoint,
        accessKeyId: data.accessid,
        accessKeySecret: data.randomid,
        bucket: data.bucketName,
      });
    },
    getFileType(suffix) {
      let fileType;
      if (/jpg|png|jpeg/gi.test(suffix)) {
        fileType = 1;
      } else if (/mp3/gi.test(suffix)) {
        fileType = 2;
      } else if (/mp4|3gp|flv|xflv|mkv|wmv|avi|rmvb/gi.test(suffix)) {
        fileType = 4;
      } else {
        fileType = 3;
      }
      return fileType;
    },
  },
  mounted() {
    let data = useUserStore(window.pinia);
    let userInfo = data.userInfo || {};
    let userId = userInfo.id || 0;
    this.ID = this.myFile.ID ? this.myFile.ID : userId;
    if (this.isOpenPhoneUpload) {
      this.getSysParams();
    }
    if (window.isSend) return; //解决wgridview里面渲染多个发送多次请求
    window.isSend = true;
    this.fileList = this.myFile.fileList || [];
  },
  watch: {
    myFile: {
      handler(val, old) {
        if (
          (val.fileList && val.fileList.length) ||
          JSON.stringify(val) != JSON.stringify(old)
        ) {
          this.fileList = this.myFile.fileList || [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    isBrowser() {
      return true;
    },
    upUrl() {
      let store = useOssStore(window.pinia);
      return store.upOss;
    },
    funcFileLoading() {
      return 200;
    },
    newFile() {
      let fileList = JSON.parse(JSON.stringify(this.fileList));
      return fileList.filter((item) => {
        if (!item.randomKey) {
          item.randomKey = Math.random() + "" + item.filePath;
        }
        item.fileName ? item.fileName : (item.fileName = item.name);
        item.fileSize
          ? item.fileSize
          : (item.fileSize = item.size || item.filesize);
        item.fileSuffix
          ? item.fileSuffix
          : (item.fileSuffix = item.type || item.filetype);
        item.filePath
          ? item.filePath
          : (item.filePath = item.url || item.fileUrl);
        item.fileType
          ? item.fileType
          : (item.fileType = item.type || item.filetype);
        // if (item.filePath && item.filePath.indexOf("https://") == "-1") {
        //   item.myPath = this.upUrl + "/" + item.filePath;
        // } else {
        //   item.myPath = item.filePath;
        // }
        // if (!item.url) {
        //   item.url = item.myPath;
        // }
        item.url = this.getFileUrl(item);
        item.thumbUrl = this.getFileUrl(item, true);
        let ext = "";
        if (this.isVideo) {
          ext = "?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0";
        } else {
          ext = "?x-oss-process=image/resize,m_pad,h_50,w_50,color_ffffff";
        }
        if (!(item.myPath && item.myPath.includes(ext))) {
          item.myPath += this.myFile.isKey
            ? ext + "&key=" + new Date().getTime()
            : ext;
        }

        if (item.filePath) {
          if (item.filePath.indexOf(".") > -1) {
            item.myFileType = item.filePath.replace(/.+\./, "");
          } else {
            item.myFileType = item.type;
          }
          return true;
        }
        return false;
      });
    },
  },
  destroyed() {
    this.fileList = [];
    this.form = {};
  },
  deactivated: function () {},
  created() {},
};
</script>
<style>
.myWOssUpload .el-upload-list {
  display: none !important;
}
</style>
<style scoped>
#myFileList button:hover {
  color: #409eff !important;
  background: #ecf5ff !important;
  border-color: #b3d8ff !important;
}

#myFileList button {
  color: #409eff !important;
  background: #ecf5ff !important;
  border-color: #b3d8ff !important;
  padding: 4px !important;
  height: 28px;
}

.el-icon-play {
  float: right;
  width: 20px;
  height: 20px;
}

.el-icon-play img {
  width: 20px;
}

.el-icon-loading {
  line-height: 20px;
  float: left;
}

.textover {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fl {
  float: left;
}

.clear:before,
.clear:after {
  display: table;
  content: "";
}

.clear:after {
  clear: both;
}

.en-cl {
  width: 100px;
  text-align: right;
  height: 30px;
  line-height: 30px;
}

.mar-left-en-c {
  margin-left: 100px;
}

.in-block {
  display: inline-block;
}

.en-upload {
  padding: 2px 4px;
  border: 1px dashed #ccc;
  border-radius: 3px;
  line-height: 26px;
  cursor: pointer;
}

.en-upload i {
  float: left;
  height: 26px;
  padding: 0 2px;
}

.fc-6 {
  color: #666;
}

.ft-size12 {
  font-size: 12px;
}

.ft-size14 {
  font-size: 14px;
}

.en-clo-li li {
  float: left;
  width: 56px;
  position: relative;
  margin-right: 5px;
  margin-bottom: 5px;
}

.en-clo-li1 li {
  float: left;
  width: 80px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
}

.del {
  display: block;
  position: absolute;
  right: -6px;
  top: -10px;
  z-index: 3;
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.firstTag {
  display: block;
  position: absolute;
  right: 55px;
  top: -9px;
  z-index: 3;
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.del [class*="icon-"] {
  mar-top: 0;
}

.del img {
  width: 100%;
}

.scanRight {
  /* position: absolute;
  right: 60px;
  top: 0px; */
  z-index: 3;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  padding: 8px;
}

.sliderOn {
  position: absolute;
  right: 5px;
  top: 0;
  z-index: 4;
  cursor: pointer;
}

.sliderOff {
  display: block;
  text-align: center;
  cursor: pointer;
}

.sliderOff span {
  display: block;
  text-align: center;
  line-height: 20px;
}

.sliderOff img {
  display: block;
  margin: auto;
  width: 36px;
}

.width100 {
  width: 100px !important;
}
</style>
