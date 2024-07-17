<!--提示-->
<!--
<statustips top="80px" content="抱歉,暂时没有数据"></statustips>

        <statustips type="address" top="80px" content="暂时没有数据">
          <div slot="title"></div>
          <div slot="tips">
            您暂无收货地址,<a class="fc-blue">手动去添加</a>
          </div>
        </statustips>

<statustips top="80px">
            <div slot="tips">
              <a class="ft-size12">
                抱歉,未搜索到数据,请到<span class="fc-blue"> 配件列表 </span>手动添加
              </a>
            </div>
        </statustips>
-->
<template>
  <div class="text-center" :style="{ 'margin-top': top }">
    <div style="display: inline-block; vertical-align: middle">
      <img src="../../../assets/images/empty.png" v-if="type == 'empty'" />
      <img src="../../../assets/images/error.png" v-if="type == 'error'" />
      <img src="../../../assets/images/cry.png" v-if="type == 'cry'" />
      <img src="../../../assets/images/address.png" v-if="type == 'address'" />
    </div>
    <div style="display: inline-block; vertical-align: middle">
      <slot name="title">
        <div class="text-left hei40" v-if="!content">
          <span class="ft-size16">无数据</span>
        </div>
      </slot>
      <slot name="tips">
        <a class="ft-size12" v-if="content">{{ content }}</a>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusTips",
  props: {
    content: {
      type: String,
      default() {
        return "";
      },
    },
    top: {
      type: String,
      default() {
        return "20px";
      },
    },
    type: {
      type: String,
      default() {
        return "empty"; //empty error 空数据  异常
      },
    },
  },
  components: {},
  computed: {},
  data() {
    return {
      str: {
        empty: "暂时没有数据",
        error: "加载失败",
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style></style>
