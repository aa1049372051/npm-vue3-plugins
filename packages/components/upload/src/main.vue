<template>
  <div class="">
    <el-upload
      class="upload-demo fl wid90 myWOssUpload"
      :action="upUrl"
      :before-upload="beforeUpload"
      :disabled="state.updisabled"
      :on-success="upSuccess"
      :on-error="upError"
      :on-progress="onProgress"
      :on-change="onChange"
      :on-remove="onRemove"
      :file-list="state.fileList"
      :list-type="listType"
      :accept="state.accept"
      :data="state.form"
      ref="myUpload"
      :on-exceed="onExceed"
      :limit="fileCount"
    >
      <slot />
      <slot name="tip">
        <div
          style="display: inline"
          class="el-upload__tip fc-gray6"
          v-if="showImgFile && showTips"
        >
          注：{{ fileTypeName }}单个文件大小{{ fileSize
          }}{{ unitKB ? "KB" : "MB" }}以内；附件数量最多{{ fileCount }}个{{
            showTipsMore || ""
          }}
        </div>
      </slot>
    </el-upload>
    <slot
      name="imageList"
      :flieList="fileList"
      :updisabled="state.updisabled"
      :myPercent="state.myPercent"
    ></slot>
    <div class="en-clo-li fl wid90 mar-top10" v-if="showImgFile">
      <ul class="clear">
        <li
          v-for="(item, index) in state.fileList"
          :key="item.filePath + '' + index"
        >
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
          <el-tooltip
            placement="bottom-start"
            v-if="item.fileName && showFileName"
          >
            <p class="textover ft-size12 fc-6">{{ item.fileName }}</p>
          </el-tooltip>
          <slot name="bottomcontent" :data="item" :index="index"></slot>
        </li>
        <li v-if="state.updisabled" style="height: 50px; width: 50px">
          <el-progress
            :width="50"
            type="circle"
            :percentage="state.myPercent"
          />
        </li>
      </ul>
    </div>
  </div>
</template>



<script setup lang="ts">
import { reactive, watchEffect, computed } from "vue";
import { useOssStore } from "@/stores/oss";
import Toast from "@/utils/toast";
import axios from "@/utils/httpV2";

interface File {
  filePath: string;
  fileName?: string;
  fileType?: string | number; //1-图片 2-语音
  fileSize?: number;
  fileUrl?: string; //文件url
}

const upUrl = computed(() => {
  let store = useOssStore(window.pinia);
  return store.upOss;
});

const props = defineProps({
  /** 默认文件列表 */
  fileList: {
    type: Array<File>,
    default() {
      return [];
    },
  },
  /** 默认上传路径 */
  uploadPath: {
    type: String,
    default() {
      return "bussiness/";
    },
  },
  /** 最大文件上传数量 */
  fileCount: {
    type: Number,
    default() {
      return 9;
    },
  },
  /** 是否只显示文件 */
  showImg: {
    type: Boolean,
    default() {
      return false;
    },
  },
  /** 指定文件上传key */
  fileKey: {
    type: String,
    default() {
      return "";
    },
  },
  /** 可上传的文件类型 */
  accept: {
    type: String,
    default() {
      return ".jpg, .png,.jpeg,.doc,.xlsx,.ppt,.xls,.docx";
    },
  },
  /** 需要额外传递的参数 */
  changeParam: {
    type: Object,
    default() {
      return {};
    },
  },
  /** 是否显示提示信息 */
  showTips: {
    type: Boolean,
    default() {
      return true;
    },
  },
  /** 是否显示已上传文件列表 */
  showImgFile: {
    type: Boolean,
    default() {
      return true;
    },
  },
  /** 允许上传的文件大小 */
  fileSize: {
    type: Number,
    default() {
      return 1024;
    },
  },
  listType: {
    type: String,
    default() {
      return "picture"; //'text' | 'picture' | 'picture-card'
    },
  },
});
const state = reactive({
  fileList: [],
  updisabled: false,
  form: {},
  myPercent: null,
});

const emit = defineEmits(["change", "uploadError"]);

const getOssFileUrl = (path) => {};
watchEffect(() => {
  let list: any = [];
  let imgType = ["gif", "jpg", "jpeg", "png"];
  console.log(JSON.stringify(props.fileList), "props.fileList");
  props.fileList.forEach((item) => {
    let value = Object.assign({}, item, { status: "success", type: "image" });
    if (!value.url) {
      if (value.filePath.indexOf("http") > -1) {
        value.url = value.filePath;
      } else {
        value.url = getOssFileUrl(item.filePath);
      }
    }
    if (!value.fileType) {
      let exts = value.filePath.split(".");
      let ext = exts[exts.length - 1];
      value.fileType = 3;
      if (imgType.indexOf(ext) > -1) {
        value.fileType = 1;
      }
    }
    if (value.fileType != 1) {
      value.type = "file";
    }
    if (!value.name) {
      value.name = value.fileName;
    }
    list.push(value);
  });
  console.log(JSON.stringify(list), "listlistlist");
  state.files = list;
});

/** 超出最大上传数时触发 */
const onExceed = () => {
  Toast.message("最多上传3张图片，请先删除在上传");
};

const getFileType = (suffix) => {
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
};

const onChange = () => {
  state.updisabled = false;
  state.myPercent = 0;
};

const onRemove = (file, fileList) => {
  state.fileList = fileList;
  emit("change");
};

/** 上传成功 */
const upSuccess = (response, file) => {
  state.updisabled = false;
  //判断文件类型
  let fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
  fileType = getFileType(fileType);
  state.fileList.push({
    fileType: file.fileType || fileType,
    fileName: file.name,
    filePath: state.form.key,
    fileSize: file.size,
  });
  emit("change", state.fileList);
};

/** 上传失败 */
const upError = () => {
  Toast.message("上传失败,请重试");
  /** 上传失败 */
  emit("uploadError");
  //获取上传时阿里云秘钥
  axios.post("mml-syj/sys002").then((res) => {
    let store = useOssStore(window.pinia);
    store.setOssConfig(res.data.result.oss);
  });
};

/** 上传文件前校验 */
const beforeUpload = async (file) => {
  let res = configUploadParams(file);
  if (res == false) {
    return false;
  }
  return true;
};

/**
 * 获取文件名称
 */
const getFileKey = () => {
  let name = "";
  let userId = "";
  name =
    props.uploadPath +
    userId +
    "_" +
    Math.round(new Date().getTime() / 1000) +
    "_" +
    parseInt(Math.random() * (9999 - 1000 + 1) + 1000, 10);
  return name ? name : "error";
};

const onProgress = (event) => {
  state.myPercent = parseInt(event.percent);
};

//配置上传参数
const configUploadParams = (file) => {
  if (file.size > props.fileSize * 1024 * 1024) {
    Toast.message("最大只能上传" + props.fileSize + "M的文件");
    return false;
  }

  if (state.fileList.length >= props.fileCount) {
    Toast.message("最多只能上传" + props.fileCount + "个文件");
    return false;
  }
  /* 校验文件类型 */
  if (props.fileType && props.fileType != "*") {
    let fileType = props.fileType.replace(/,/g, "$|\\");
    let reg = new RegExp(`\\${fileType}$`, "i");
    if (!reg.test(file.name)) {
      Toast.message(`只能上传${props.fileType}类型的文件`);
      return false;
    }
  }

  // let suffix = file.name;
  let ext = file.name.replace(/.+\./, "");
  let name = getFileKey();
  let key = encodeURI(`${name + "." + ext}`);
  state.form.key = key;
  state.form.success_action_status = "200";
  let store = useOssStore(window.pinia);
  let uploaddata = store.ossConfig;
  state.form.policy = uploaddata.policy;
  state.form.OSSAccessKeyId = uploaddata.accessKeyId;
  state.form.signature = uploaddata.signature;
  state.updisabled = true;
  return true;
};

function handleFiles(data) {
  let list: any = [];
  data.forEach((item) => {
    if (item.status != "success") {
      return;
    }
    list.push({
      filePath: item.filePath || "",
      fileType: item.fileType || 1,
      fileName: item.name || "",
    });
  });
  return list;
}
</script>