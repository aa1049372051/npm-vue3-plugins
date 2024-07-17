<!-- 附件显示附件 -->
<!-- 

<FileList :file="fileList"></FileList>

import {FileList} from '@my-plugins/vue-web'

 -->
<template>
  <!-- <div class="el-radio-group" id="myFileList">
    {{funcFileLoading}}{{newFile}}
    <el-button v-for="(item,index) in newFile" :loading="item.fileLoading" @click.native="show(item,index)" class="pointer" :size="size"
      :key="item.id" :type="type" plain>
      <i style="display:inline-block; line-height:20px;">{{item.fileName}}</i>
      <i v-if="(playType.indexOf(item.myFileType) >= 0) && item.filePlaying" class="el-icon-play">
        <img src="../assets/images/icon/myplaying.gif">
      </i>
      <i v-if="(playType.indexOf(item.myFileType) >= 0) && !item.filePlaying" class="el-icon-play">
        <img src="../assets/images/icon/playing.png">
      </i>
      <i v-if="(imgType.indexOf(item.myFileType) >=0)" class="el-icon-picture"></i>
    </el-button>
  </div>-->
  <div class="en-clo-li fl wid90">
    <span v-show="false">{{ funcFileLoading }}</span>
    <ul class="clear">
      <li v-for="(item, index) in newFile" @click="show(item, index)" :key="index">
        <i class="del" v-if="isDelete">
          <!-- <img src="../../../assets/images/icon/del.png" /> -->
        </i>
        <template v-if="item.fileName">
          <el-tooltip placement="bottom-start">
            <template #content>
              <div v-if="item.fileName">{{ item.fileName }}</div>
            </template>
            <div style="border: 1px solid #b5bfcf; height: 36px; width: 36px">
              <img class="pointer" v-if="
                playType.indexOf(item.myFileType) >= 0 && !item.filePlaying
              " style="width: 36px; height: 36px" src="../../../assets/images/icon/playing.png" />
              <img class="pointer" v-else-if="
                playType.indexOf(item.myFileType) >= 0 && item.filePlaying
              " style="width: 36px; height: 36px" src="../../../assets/images/icon/myplaying.gif" />
              <img class="pointer" v-else-if="
                item.myFileType == 'xlsx' || item.myFileType == 'xls'
              " style="width: 36px; height: 36px" src="../../../assets/images/icon/excel.png" />
              <img class="pointer" v-else-if="item.myFileType == 'pdf'" style="width: 36px; height: 36px"
                src="../../../assets/images/icon/pdf.png" />
              <img class="pointer" v-else-if="item.myFileType == 'txt'" style="width: 36px; height: 36px"
                src="../../../assets/images/icon/txt.png" />
              <img class="pointer" v-else-if="
                item.myFileType == 'ppt' || item.myFileType == 'pptx'
              " style="width: 36px; height: 36px" src="../../../assets/images/icon/ppt.png" />
              <img class="pointer" v-else-if="
                item.myFileType == 'doc' || item.myFileType == 'docx'
              " style="width: 36px; height: 36px" src="../../../assets/images/icon/word.png" />
              <img class="pointer" v-else-if="item.myFileType == 'rar' || item.myFileType == 'zip'"
                style="width: 36px; height: 36px" src="../../../assets/images/icon/ppt.png" />
              <template v-else>
                <el-image class="pointer" v-if="isViewImg" style="width: 36px; height: 36px" :src="item.myPath"
                  :preview-src-list="images" />
                <img v-else class="pointer" isImg="1" style="width: 36px; height: 36px" :src="item.myPath" />
              </template>
            </div>
          </el-tooltip>
        </template>
        <template v-else>
          <div class="images" style="border: 1px solid #b5bfcf; height: 36px; width: 36px">
            <img class="pointer" v-if="playType.indexOf(item.myFileType) >= 0 && !item.filePlaying"
              style="width: 36px; height: 36px" src="../../../assets/images/icon/playing.png" />
            <img class="pointer" v-else-if="
              playType.indexOf(item.myFileType) >= 0 && item.filePlaying
            " style="width: 36px; height: 36px" src="../../../assets/images/icon/myplaying.gif" />
            <img class="pointer" v-else-if="item.myFileType == 'xlsx' || item.myFileType == 'xls'"
              style="width: 36px; height: 36px" src="../../../assets/images/icon/excel.png" />
            <img class="pointer" v-else-if="item.myFileType == 'pdf'" style="width: 36px; height: 36px"
              src="../../../assets/images/icon/pdf.png" />
            <img class="pointer" v-else-if="item.myFileType == 'txt'" style="width: 36px; height: 36px"
              src="../../../assets/images/icon/txt.png" />
            <img class="pointer" v-else-if="item.myFileType == 'ppt' || item.myFileType == 'pptx'"
              style="width: 36px; height: 36px" src="../../../assets/images/icon/ppt.png" />
            <img class="pointer" v-else-if="item.myFileType == 'doc' || item.myFileType == 'docx'"
              style="width: 36px; height: 36px" src="../../../assets/images/icon/word.png" />
            <template v-else>
              <el-image class="pointer" v-if="isViewImg" style="width: 36px; height: 36px" :src="item.myPath"
                :preview-src-list="images" />
              <img v-else class="pointer" isImg="1" style="width: 36px; height: 36px" :src="item.myPath" />
            </template>
          </div>
        </template>
        <el-tooltip placement="bottom-start" v-if="item.fileName && showFileName">
          <template #content>
            <div>{{ item.fileName }}</div>
          </template>
          <p class="textover ft-size12 fc-6" style="width: 36px" :title="item.fileName">
            {{ item.fileName }}
          </p>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { useOssStore } from "@/stores/oss";
export default {
  name: "FileList",
  setup() { },
  components: {},
  data() {
    return {
      loadingLock: false, //锁-加载
      viewerOptions: {
        url(image) {
          return image.src.replace(
            "?x-oss-process=image/resize,m_pad,h_50,w_50,color_ffffff",
            ""
          );
        },
        filter(image) {
          return !!image.getAttribute("isImg");
        },
        toolbar: false,
        title: false,
        navbar: false,
      },
    };
  },
  props: {
    //是否删除
    isDelete: {
      //	主题
      type: Boolean,
      default() {
        return false;
      },
    },
    showFileName: {
      //	主题
      type: Boolean,
      default() {
        return true;
      },
    },
    type: {
      //	主题
      type: String,
      default() {
        return "primary";
      },
    },
    size: {
      //	尺寸
      type: String,
      default() {
        return "mini";
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
    file: {
      type: Array,
      default() {
        return [];
      },
    },
    importType: {
      type: String,
      default() {
        return "PC";
      },
    },
    isViewImg: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show(arg, index) {
      if (this.importType == "Web" && !this.isViewImg) {
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
      if (arg.fileType && arg.fileType != 1) {
        this.$alert("暂不支持查看此文件,请到手机端查看");
      }
    },
  },
  computed: {
    upUrl() {
      let store = useOssStore(window.pinia);
      return store.upOss;
    },

    images() {
      if (!this.file) {
        return [];
      }
      let data = [];
      this.file.forEach((item) => {
        if (item.fileType == 1) {
          let path = this.upUrl + "/" + item.filePath;
          data.push(path);
        }
      });
      return data;
    },
    funcFileLoading() {
      return 200;
    },
    newFile() {
      if (!this.file) {
        return [];
      }
      let fileList = JSON.parse(JSON.stringify(this.file));
      return this.file.length > 0
        ? fileList.filter((item) => {
          item.fileName ? item.fileName : (item.fileName = item.filename);
          item.fileSize ? item.fileSize : (item.fileSize = item.filesize);
          item.fileSuffix
            ? item.fileSuffix
            : (item.fileSuffix = item.filetype);
          item.filePath
            ? item.filePath
            : (item.filePath = item.fileurl || item.fileUrl);
          item.fileType
            ? item.fileType
            : (item.fileType = item.filetype || item.fileType);
          if (item.filePath && item.filePath.indexOf("https://") == "-1") {
            item.myPath = this.upUrl + "/" + item.filePath;
          } else {
            item.myPath = item.filePath;
          }
          item.myPath +=
            "?x-oss-process=image/resize,m_pad,h_50,w_50,color_ffffff";
          item.myFileType = item.filePath
            ? item.filePath.replace(/.+\./, "")
            : item.filePath;
          return true;
        })
        : [];
    },
  },
  deactivated: function () {
    // this.stopMedia();
    // window.jsBundle && window.jsBundle.notifyOpenFileState(210);
  },
  watch: {
    funcFileLoading() {
      let isPlaying = 0;
      let isLoading = 0;
      switch (this.$store.state.openFileState) {
        case 200:
          //打开附件成功
          this.newFile.filter((item) => {
            if (item.fileLoading) {
              isLoading++;
            }
            if (
              item.fileLoading &&
              (this.playType.indexOf(item.myFileType) >= 0 ||
                item.fileType == 2)
            ) {
              this.$set(item, "fileLoading", false);
              this.$set(item, "filePlaying", true);
              isPlaying++;
            } else if (item.fileLoading) {
              this.$set(item, "fileLoading", false);
            }
            return true;
          });
          this.loadingLock = false;
          if (isPlaying > 0) {
            window.jsBundle && window.jsBundle.notifyOpenFileState(201);
          } else if (isLoading > 0) {
            window.jsBundle && window.jsBundle.notifyOpenFileState(0);
          }
          break;
        case 210:
          //打开播放结束
          this.newFile.filter((item) => {
            this.$set(item, "filePlaying", false);
            return true;
          });
          this.loadingLock = false;
          window.jsBundle && window.jsBundle.notifyOpenFileState(0);
          break;
        case 400:
          //打开附件失败
          this.newFile.filter((item) => {
            this.$set(item, "fileLoading", false);
            return true;
          });
          this.loadingLock = false;
          window.jsBundle && window.jsBundle.notifyOpenFileState(0);
          this.$alert(this.$t("message.fileLoadingErr"), "提示", {
            type: "warning",
          });
          break;
        case 410:
          //附件播放失败
          this.newFile.filter((item) => {
            this.$set(item, "filePlaying", false);
            return true;
          });
          this.loadingLock = false;
          window.jsBundle && window.jsBundle.notifyOpenFileState(0);
          this.$alert(this.$t("message.filePlayErr"), "提示", {
            type: "warning",
          });
          break;
        default:
      }
      return "";
    },
  },
};
</script>
<style>
.wid90 {
  width: 90% !important;
}

.fl {
  float: left;
}

.clear {
  zoom: 1;
}

.clear:after {
  content: "";
  display: table;
  clear: both;
}

li {
  list-style: none;
}

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
  /* width: 56px; */
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;
}

.del {
  display: block;
  position: absolute;
  left: 45px;
  top: 5px;
  z-index: 3;
  width: 20px;
  height: 20px;
}

.del img {
  width: 100%;
}

.pointer {
  cursor: pointer;
}
</style>
