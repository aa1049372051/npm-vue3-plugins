<template>
  <div class="myEditor">
    <QuillEditor
      class="ql-editor"
      ref="myQuillEditor"
      theme="snow"
      v-model:content="content"
      :options="data.editorOption"
      contentType="html"
      @update:content="setValue()"
    />
    <!-- 使用自定义图片上传 -->
    <el-upload
      style="display: none"
      class="avatar-uploader"
      :action="upUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      :data="ossHeader"
    />
  </div>
</template>
<script setup>
defineOptions({
  name: "Editor",
});
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, onMounted, ref, toRaw, watch } from "vue";
import { useOssStore } from "@/stores/oss";
import Toast from "@/utils/toast";

const props = defineProps(["value"]);
watch(
  () => props.value,
  (val) => {
    if (val) {
      toRaw(myQuillEditor.value).setHTML(val);
    }
  },
  { deep: true }
);
const emit = defineEmits(["updateValue"]);
const content = defineModel();
const myQuillEditor = ref();
let store = useOssStore(window.pinia);
const upUrl = store.upOss;
const ossHeader = {
  key: "",
  success_action_status: "",
  policy: "",
  OSSAccessKeyId: "",
  signature: "",
};
const data = reactive({
  content: "",
  editorOption: {
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ header: 1 }, { header: 2 }],
          ["image"],
          [{ direction: "rtl" }],
          [{ color: [] }],
          [{ background: [] }],
          ["clean"],
        ],
        handlers: {
          // //如果需要上传图片/视频 到后台，然后在富文本框添加图片的地址，则可在handlers 里添加图片/视频处理函数。如果可以接受图片在富文本框中是base64形式，则无需设置。
          image: function (value) {
            if (value) {
              document
                .querySelector(".myEditor .avatar-uploader input")
                .click();
            }
          },
        },
      },
    },
    placeholder: "",
  },
});

const setValue = () => {
  // const text = toRaw(myQuillEditor.value).getHTML();
  // emit('updateValue', text);
};
const getHtml = () => {
  return toRaw(myQuillEditor.value).getHTML();
};
const uploadSuccess = () => {
  // 获取富文本组件实例
  let quill = toRaw(myQuillEditor.value).getQuill();
  // 如果上传成功
  // 获取光标所在位置
  let length = quill.getSelection() ? quill.getSelection().index : 0;
  let store = useOssStore(window.pinia);
  // 插入图片
  quill.insertEmbed(length, "image", store.upOss + "/" + ossHeader.key);
  // 调整光标到最后
  quill.setSelection(length + 1);
};
const uploadError = () => {
  Toast.error("图片插入失败");
};
const beforeUpload = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    Toast.error("最大只能上传10m的文件");
    return false;
  }
  /* 校验文件类型 */
  // let fileType = ".png,.jpg,.jpeg".replace(/,/g, "$|\\");
  // fileType = "/\\" + fileType + "$/i";
  // let reg = eval(fileType);

  let fileTypes = [".png", ".jpg", ".jpeg"];
  let reg = new RegExp("^.*(" + fileTypes.join("|") + ")$", "i");
  if (!reg.test(file.name)) {
    Toast.error("只能上传png,jpg,jpeg类型的文件");
    return false;
  }

  let ext = file.name.replace(/.+\./, "");
  let name =
    "editer/" +
    Math.round(new Date().getTime() / 1000) +
    "_" +
    parseInt(Math.random() * (9999 - 1000 + 1) + 1000, 10);
  let key = encodeURI(`${name + "." + ext}`);
  ossHeader.key = key;
  ossHeader.success_action_status = "200";
  let store = useOssStore(window.pinia);
  ossHeader.policy = store.ossConfig.policy;
  ossHeader.OSSAccessKeyId = store.ossConfig.accessKeyId;
  ossHeader.signature = store.ossConfig.signature;
  console.log(ossHeader, "ossHeader");
  return true;
};
onMounted(() => {
  if(props.value)  toRaw(myQuillEditor.value).setHTML(props.value);
});

defineExpose({
  getHtml,
});
</script>
<style>
.ql-editor {
  padding: 2px !important;
}

.ql-picker-label {
  line-height: normal;
  vertical-align: super;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-editor .ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}

.ql-editor .ql-font-SimSun {
  font-family: "SimSun";
}

.ql-editor .ql-font-SimHei {
  font-family: "SimHei";
}

.ql-editor .ql-font-KaiTi {
  font-family: "KaiTi";
}

.ql-editor .ql-font-Arial {
  font-family: "Arial";
}

.ql-editor .Times-New-Roman {
  font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "微软雅黑";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Times-New-Roman"]::before {
  content: "Times New Roman";
}
</style>
