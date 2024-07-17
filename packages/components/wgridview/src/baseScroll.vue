<script>
import { debounce } from "../../../utils/index";
export default {
  name: "BaseScroll",
  props: {
    openScroll: {
      //组件用的 是否开启
      type: Boolean,
      default() {
        return false;
      },
    },
    deviation: {
      type: Number,
      //组件用的  误差值
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      maxTableHeight: null, //表格的高度 动态的
      toScroll: false, //页面用的 是否开启
      deviationValue: null, //页面用的 ，误差值
      hasScroll: false,
    };
  },
  computed: {},
  methods: {
    changeTable() {
      //屏幕的高度
      let windowH = window.innerHeight;
      //获取表格头高度
      if (!document.getElementsByClassName("tableScroll")[0]) return;
      let tHeadH = document.getElementsByClassName(
        "el-table__header-wrapper"
      )[0].clientHeight;
      let tBodyH = document
        .getElementsByClassName("el-table__body")[0]
        .getElementsByTagName("tbody")[0].clientHeight;

      if (tBodyH == 0) {
        this.hasScroll = false;
        this.maxTableHeight = "";
        return false;
      }
      //获取误差值
      let deviation = this.deviationValue || this.deviation;
      //表格内容最大高

      let tMAxH = tHeadH * 1 + tBodyH + deviation * 1;
      // 分页高度
      let pageH = document.getElementsByClassName("gridviewFoot")[0]
        ? document.getElementsByClassName("gridviewFoot")[0].clientHeight
        : 0;
      //table 距离顶部高度
      // let tableOffsetH = this.getStyle(document.getElementsByClassName('mainContent')[0], 'marginTop') + (document.getElementsByClassName('mainContent')[0].clientHeight - document.getElementsByClassName('tableScroll')[0].clientHeight + (
      //             this.getStyle(document.getElementsByClassName('tableScroll')[0], 'paddingTop')
      //             + this.getStyle(document.getElementsByClassName('tableScroll')[0], 'paddingBottom')
      //         ) - this.getStyle(document.getElementsByClassName('mainContent')[0], 'paddingBottom')
      //     );
      let tableOffsetH = this.getNodeHeight(
        document.getElementsByClassName("tableScroll")[0]
      );
      /* 获取头部的高度 */
      let mainHeaderH = document.getElementsByClassName("mainHeader")[0]
        ? document.getElementsByClassName("mainHeader")[0].clientHeight
        : 0;
      //表格最大高度
      let tableH =
        windowH -
        tableOffsetH -
        this.getStyle(
          document.getElementsByClassName("mainContent")[0],
          "paddingBottom"
        ) -
        this.getStyle(
          document.getElementsByClassName("mainContent")[0],
          "paddingTop"
        ) -
        pageH -
        mainHeaderH * 1;
      if (tableH > tMAxH) {
        this.maxTableHeight = tMAxH;
        this.hasScroll = false;
      } else {
        this.maxTableHeight = tableH;
        this.hasScroll = true;
      }
    },
    getNodeHeight(dom, totalTop = 0) {
      if (!dom) {
        return 0;
      }
      let top = dom.offsetTop;
      let p = dom.offsetParent;
      totalTop = top + totalTop;
      if (p && p.nodeName != "BODY") {
        return this.getNodeHeight(p, totalTop);
      }
      return totalTop;
    },
    getStyle(obj, attr) {
      //获取元素的样式
      if (obj.currentStyle) {
        return obj.currentStyle[attr].replace("px", "") * 1;
      } else {
        return (
          document.defaultView
            .getComputedStyle(obj, null)
            [attr].replace("px", "") * 1
        );
      }
    },
  },
  activated() {
    if (this.openScroll || this.toScroll) {
      this.changeTable();
    }
  },
  mounted() {
    window.addEventListener(
      "resize",
      debounce(() => {
        if (this.openScroll || this.toScroll) {
          this.changeTable();
        }
      }, 500)
    );
  },
};
</script>
