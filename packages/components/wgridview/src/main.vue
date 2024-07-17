<!-- 
<wgridview ref="gridview" :changePageCb="changePageCb" :url="url" :columns="columns" :searchData="searchData">
      <template slot-scope="scope" slot="carInfo">
         当前行名称:{{scope.rowName}} 
         当前数据:{{scope.value}} 
         当前行数据:{{JSON.stringify(scope.row)}}
      </template>
</wgridview>
//changePageCb中有三个入参
//第一个data为表格中的数据
//第二个size为将要跳转的页码
//第三个为WGridView中this对象
//确认跳转需调用  that._changePageTrue(size)
//取消跳转徐调用  that._changePageFalse();
changePageCb(data,size,that) {
    //
      let editCount = 0;
      for (let v of data) {
        if (v.isEdit == 1) editCount++;
      }
      if (editCount > 0) {
        this.$confirm("正在编辑商品信息,是否确认继续进行翻页", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "info"
        })
          .then(
            () => {
             that._changePageTrue(size);  
            },
            ()=>{
              that._changePageFalse();
            }
          )
          .catch(() => {});
      }else{
        that._changePageTrue(size);
      }

 export default {
   data(){
     return {
       {prop:'carInfo',label:'车型', scope:true}, 
       {prop:'inqUniqSN',label:'报价单号'},
     },
     searchData:{

     }
   },
   methods(){
     submit(){ //点击查询
       //把查询的参数传递到gridview 里
      this.$refs.wgridview.setSearchData(JSON.parse(JSON.stringify(this.searchData)));
      //触发wgriview 里的查询事件
      this.$refs.wgridview.submit();
     }
   }
 }
注：
1: columns 里新增一个scope 设置为true 可开启插槽
2：如果接口返回数据需要处理后渲染给wgriview，传递responseCb函数
3：开启插槽，插槽名字为 columns

:openScroll="true" //开启滚动 
:deviation="0" //误差值（先小屏滚动，让后再放大全屏，全屏可能会出现滚动条，如果出现手动给deviation赋值，如果没有出现忽略此参数）
 -->

<template>
  <!-- :max-height="maxTableHeight||tableOptions['max-height'] "
       :height="tableOptions.height"
  -->
  <div
    :id="tableID"
    :class="{ tableScroll: openScroll, clear: true, wapigridview: true }"
  >
    <el-table
      size="small"
      :cell-class-name="cellClassName"
      :row-key="tableOptions['row-key']"
      :data="dataProvider"
      ref="multipleTable"
      :style="tableOptions.style"
      :height="maxTableHeight"
      :max-height="
        tableOptions.maxTableHeight || maxTableHeight || newMaxTableHeight
      "
      :stripe="tableOptions.stripe"
      :border="tableOptions.border"
      :fit="tableOptions.fit"
      :show-header="tableOptions['show-header']"
      :highlight-current-row="tableOptions['highlight-current-row']"
      :current-row-key="tableOptions['current-row-key']"
      :row-class-name="tableOptions['row-class-name'] || rowClassName"
      :row-style="tableOptions['row-style'] || rowStyle"
      :empty-text="tableOptions['empty-text']"
      :default-expand-all="tableOptions['default-expand-all']"
      :expand-row-keys="tableOptions['expand-row-keys']"
      :default-sort="tableOptions['default-sort']"
      :tooltip-effect="tableOptions['tooltip-effect']"
      tooltip-open-delay="500"
      :show-summary="tableOptions['show-summary']"
      :sum-text="tableOptions['sum-text']"
      :span-method="tableOptions['sum-method']"
      :summary-method="summaryMethod"
      @select="select"
      @selection-all="selectionAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="currentChange"
      @header-dragend="headerDragend"
      @expand-change="expand"
      v-loading="loading"
    >
      <el-table-column
        :selectable="
          checkboxColumn['type'] == 'selection'
            ? checkboxColumn['selectable']
            : null
        "
        :reserve-selection="checkboxColumn['reserve-selection']"
        v-if="checkboxColumn"
        :type="checkboxColumn.type || defaultData.checkboxColumn.type"
        :width="checkboxColumn.width || defaultData.checkboxColumn.width"
        :fixed="checkboxColumn.fixed"
        :label="checkboxColumn.label || '序号'"
        align="center"
      />
      <template v-for="(value, key) in columns">
        <!-- 双表头 -->
        <el-table-column
          v-if="value['child']"
          :key="key + '-1'"
          :prop="value.prop"
          :label="value.label"
          :width="value.width"
          :min-width="value['min-width']"
          :fixed="value.fixed"
          :render-header="value['render-header']"
          :sortable="value.sortable"
          :sort-method="value['sort-method']"
          :resizable="value.resizable"
          :formatter="value.formatter"
          :show-overflow-tooltip="value['show-overflow-tooltip']"
          :align="value.aligh || tableOptions.aligh || defaultData.align"
          :header-cell-class-name="value['calssName']"
          :header-align="value['header-align']"
          :class-name="value['class-name']"
          :label-class-name="value['label-class-name']"
          :selectable="value['selectable']"
          :reserve-selection="value['reserve-selection']"
          :filters="value['filters']"
          :filter-placement="value['filter-placement']"
          :filter-multiple="value['filter-multiple']"
          :filter-method="value['filter-method']"
          :filtered-value="value['filtered-value']"
        >
          <el-table-column
            v-for="(value1, key1) in value['child']"
            :key="key1"
            :prop="value1.prop"
            :label="value1.label"
            :width="value1.width"
            :min-width="value1['min-width']"
            :fixed="value.fixed"
            :render-header="value1['render-header']"
            :sortable="value1.sortable"
            :sort-method="value1['sort-method']"
            :resizable="value1.resizable"
            :formatter="value1.formatter"
            :show-overflow-tooltip="value1['show-overflow-tooltip']"
            :align="value1.aligh || tableOptions.aligh || defaultData.align"
            :header-cell-class-name="value1['calssName']"
            :header-align="value1['header-align']"
            :class-name="value1['class-name']"
            :label-class-name="value1['label-class-name']"
            :selectable="value1['selectable']"
            :reserve-selection="value1['reserve-selection']"
            :filters="value1['filters']"
            :filter-placement="value1['filter-placement']"
            :filter-multiple="value1['filter-multiple']"
            :filter-method="value1['filter-method']"
            :filtered-value="value1['filtered-value']"
          >
            <template #header #default="scope">
              <slot
                v-if="value1.scopeHeader"
                :scop="scope"
                :name="value1.scopeHeader"
              ></slot>
              <span v-else>{{ value1.label }}</span>
            </template>
            <template #default="scope">
              <slot
                v-if="value1.scope"
                :scop="scope"
                :name="value.prop"
                :rowName="value1.prop"
                :row="scope.row"
                :value1="scope.row[value1.prop]"
              />
              <template v-else-if="value1.formatter">
                {{ value1.formatter(scope.row, scope.column) }}
              </template>
              <template v-else>{{ scope.row[value1.prop] }}</template>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 单表头 -->
        <el-table-column
          v-else-if="value.hide !== true"
          :key="key + '-2'"
          :prop="value.prop"
          :label="value.label"
          :width="value.width"
          :min-width="value['min-width']"
          :fixed="value.fixed"
          :render-header="value['render-header']"
          :sortable="value.sortable"
          :sort-method="value['sort-method']"
          :resizable="value.resizable"
          :formatter="value.formatter"
          :show-overflow-tooltip="value['show-overflow-tooltip']"
          :align="value.aligh || tableOptions.aligh || defaultData.align"
          :header-align="value['header-align']"
          :class-name="value['class-name']"
          :label-class-name="value['label-class-name']"
          :selectable="value['selectable']"
          :reserve-selection="value['reserve-selection']"
          :filters="value['filters']"
          :filter-placement="value['filter-placement']"
          :filter-multiple="value['filter-multiple']"
          :filter-method="value['filter-method']"
          :filtered-value="value['filtered-value']"
        >
          <template #header #default="scope">
            <slot
              v-if="value.scopeHeader"
              :scop="scope"
              :name="value.scopeHeader"
            ></slot>
            <span v-else>{{ value.label }}</span>
          </template>
          <template #default="scope">
            <slot
              v-if="value.scope"
              a="9"
              :name="value.prop"
              :scop="scope"
              :rowName="value.prop"
              :row="scope.row"
              :value="scope.row[value.prop]"
            />
            <template v-else-if="value.formatter">
              {{ value.formatter(scope.row, scope.column) }}
            </template>
            <template v-else>{{ scope.row[value.prop] }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :key="key + '-3'"
          v-else-if="value.hide == true && value.type && value.type == 'expand'"
          type="expand"
          :width="value.width"
          :label="value.label"
        >
          <template #default="scope">
            <slot :scop="scope" :name="value.prop" :row="scope.row" />
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="actionColumn"
        :fixed="
          maxTableHeight
            ? actionColumn.fixed || defaultData.actionColumn.fixed
            : null
        "
        :label="actionColumn.label || defaultData.actionColumn.label"
        :width="actionColumn.width || '100'"
        align="center"
      >
        <template #default="scope">
          <slot
            :scop="scope"
            :index="scope.$index"
            :row="scope.row"
            name="actionColumn"
          />
        </template>
      </el-table-column>

      <slot slot="empty" v-if="!loading">
        <template v-if="tableOptions['empty-text']">
          {{ tableOptions["empty-text"] }}
        </template>
        <statustips v-else :type="contentType" :content="content" />
      </slot>
    </el-table>
    <slot name="tips" />
    <slot name="summary"></slot>
    <div
      class="gridviewFoot"
      style="float: right; padding-top: 10px"
      v-if="
        (closePage && pageData_.total > 10 && dataProvider.length > 0) ||
        showPage
      "
    >
      <el-pagination
        :pager-count="pagerCount"
        :small="pageData_.small"
        :page-size="pageData_.pageSize"
        :popper-class="pageData_.popperClass"
        :page-sizes="pageData_.pageSizes"
        :total="pageData_.total"
        v-model:current-page="pageData_.page"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :layout="pageLayout || pageData_.layout"
      />
    </div>
  </div>
</template>

<script>
import baseScroll from "./baseScroll.vue";
import statustips from "../../statustips/src/main.vue";
export default {
  name: "WGridView",
  extends: baseScroll,
  components: {
    statustips,
  },
  props: {
    /** 表格数据列1 */
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    /** 表格多选列 */
    checkboxColumn: {
      type: Object,
      default() {
        return null;
      },
    },
    /** 表格操作列 */
    actionColumn: {
      type: [String, Object],
      default() {
        return null;
      },
    },
    /** 表格配置 */
    tableOptions: {
      type: Object,
      default() {
        return {
          width: "100%",
          border: true, 
          stripe: true
        };
      },
    },
    /** 行名称 */
    rowClassName: {
      type: Function,
      default: Function(),
    },
    /** 行风格 */
    rowStyle: {
      type: Function,
      default: Function(),
    },
    /** rowKey */
    rowKey: {
      type: Function,
      default: Function(),
    },
    /** summaryMethod */
    summaryMethod: {
      type: Function,
      default: Function(),
    },
    /** spanMethod */
    spanMethod: {
      type: Function,
      default: Function(),
    },
    renderHeader: {
      type: Function,
      default: Function(),
    },
    formatter: {
      type: Function,
      default: Function(),
    },
    selectable: {
      type: Function,
      default: Function(),
    },
    filterMethod: {
      type: Function,
      default: Function(),
    },
    /** 处理返回数据的格式化 */
    responseCb: {
      type: Function,
      default: null,
    },
    /** 翻页时判断提示 */
    changePageCb: {
      type: Function,
      default: null,
    },
    /** 分页数据 */
    pageData: {
      type: Object,
      default() {
        return {
          init: false,
        };
      }, //
    },
    /** 分页布局 */
    pageLayout: {
      type: String,
      default() {
        return "";
      }, //
    },
    /** 搜索条件 */
    searchData: {
      type: Object,
      default() {
        return {};
      },
    },
    /** api接口 */
    javaApi: {
      type: Function,
      default: Function(),
    },
    url: {
      type: String,
      default: "", //url地址
    },
    /** 开启分页 */
    closePage: {
      type: Boolean,
      default() {
        return true;
      },
    },
    /** 始终开启分页 */
    showPage: {
      type: Boolean,
      default() {
        return true;
      },
    },
    /** 分页 */
    pageSize: {
      type: [String, Number],
      default() {
        return null;
      },
    },
    pagerCount: {
      type: Number,
      default() {
        return 7;
      },
    },
    content: {
      type: String,
      default() {
        return "";
      },
    },
    contentType: {
      type: String,
      default() {
        return "empty";
      },
    },
    /**
     * 初始不加载数据的开关
      true 为不加载数据
      false 为加载数据
     */
    initSearch: {
      //初始不加载数据的开关
      //true 为不加载数据
      //false 为加载数据
      type: Boolean,
      default() {
        return false;
      },
    },
    maxTableHeightSwitch: {
      //表格最大高度
      //true 为计算高度
      //false 为不计算高度 auto
      type: Boolean,
      default() {
        return false;
      },
    },
    maxTableHeightDefault: {
      type: Number,
      default() {
        return 70;
      },
    },
    httpType: {
      type: String,
      default() {
        return "php"; //java,php,v3
      },
    },
    cellClassName: {
      type: Function,
      default: Function(),
    },
  },
  data() {
    return {
      tableID: `table_${parseInt(Math.random() * 100000)}`,
      newMaxTableHeight: "auto",
      initSearch_: this.initSearch,
      defaultData: {
        align: "center",
        actionColumn: {
          //表格操作列默认值
          fixed: undefined,
          label: "操作",
        },
        checkboxColumn: {
          type: "selection",
          width: 50,
        },
      },
      searchData_: {},
      dataProvider: [], //表格数据
      pageData_: {
        //分页默认值
        small: false,
        pageSize: 25, //每页显示条目个数
        total: 0,
        pageCount: undefined,
        page: 1, //当前页数
        popperClass: "",
        layout: "total, sizes, prev, pager, next, jumper",
        pageSizes: [25, 50, 75, 100],
      }, //分页属性
      triggerPage_: true, //是否触发分页
      lock_: false, //锁定多次提交
      loading: true,
      timeout: "",
    };
  },
  methods: {
    selectionChange() {
      this.$emit("selection-change", arguments);
    },
    select() {
      this.$emit("select", arguments);
    },
    selectionAll() {
      this.$emit("selection-all", arguments);
    },
    cellMouseEnter() {
      this.$emit("cell-mouse-enter", arguments);
    },
    cellMouseLeave() {
      this.$emit("cell-mouse-leave", arguments);
    },
    cellClick() {
      this.$emit("cell-click", arguments);
    },
    cellDblclick() {
      this.$emit("cell-dblclick", arguments);
    },
    rowClick() {
      this.$emit("row-click", arguments);
    },
    rowContextmenu() {
      this.$emit("row-contextmenu", arguments);
    },
    rowDblclick() {
      this.$emit("row-dblclick", arguments);
    },
    headerClick() {
      this.$emit("header-click", arguments);
    },
    sortChange() {
      this.$emit("sort-change", arguments);
    },
    filterChange() {
      this.$emit("filter-change", arguments);
    },
    currentChange() {
      this.$emit("current-change", arguments);
    },
    headerDragend() {
      this.$emit("header-dragend", arguments);
    },
    expand() {
      this.$emit("expand", arguments);
    },
    submit() {
      //发送请求
      this.triggerPage_ = false; //关闭触发分页
      this.pageData_.page = 1; //回到第一页
      // this.pageData_.pageSize = 15;//初始每页显示条数  ***
      console.log("请求数据6");
      this.getData_();
    },
    getData_() {
      console.log("请求数据");

      //如果需要处理接口返回数据，调用responseCb
      clearTimeout(this.timeout);
      if (this.lock_) return; //防止重复提交
      if (this.initSearch_) {
        this.loading = false;
        this.initSearch_ = false;
        return false;
      } //初始不加载数据的开关
      this.lock_ = true;
      this.loading = true;
      // let loading = this.$loading({ fullscreen: true });
      this.javaApi(JSON.parse(JSON.stringify(this.searchData_)))
        .then(
          (response) => {
            this.lock_ = false;
            if (response.data && response.status == 200) {
              if (this.responseCb) {
                this.dataProvider = this.responseCb(response);
              } else {
                this.dataProvider = [];
              }
              response.data = response.data.body
                ? response.data.body
                : response.data;
              this.pageData_.total = response.data.total || 0;
            } else {
              this.dataProvider = [];
            }
            this.$nextTick(() => {
              this.$emit("done", this.dataProvider);
            });

            //打开触发分页的开关
            this.timeout = setTimeout(() => {
              this.changeTable();
            }, 500);
            this.triggerPage_ = true;
          },
          () => {
            this.dataProvider = [];
            this.lock_ = false;
            this.triggerPage_ = true;
          }
        )
        .finally(() => {
          this.loading = false;
          // loading.close();
          this.lock_ = false;
          this.triggerPage_ = true;
        });
    },
    //刷新
    refresh() {
      console.log("请求数据1");
      this.getData_();
    },
    //头部插入数据
    unshift(data) {
      this.dataProvider.unshift(data);
    },
    //尾部插入数据
    push(data) {
      this.dataProvider.push(data);
    },
    setSearchData(arg) {
      this.searchData_ = arg || {};
      this.searchData_.pagesize = this.pageData_.pageSize;
      this.searchData_.pageno = 1;
      this.submit();
    },
    setSearchDataByPage(arg) {
      this.searchData_ = arg || {};
      this.searchData_.pagesize = this.pageData_.pageSize;
      this.searchData_.pageno = this.pageData_.page ? this.pageData_.page : 1;
      this.submitByPage();
    },
    submitByPage() {
      //发送请求
      this.triggerPage_ = false; //关闭触发分页
      // this.pageData_.pageSize = 15;//初始每页显示条数  ***
      console.log("请求数据2");
      this.getData_();
    },
    setRefresh() {
      console.log("请求数据3");
      this.getData_();
    },
    //页码修改-true
    _changePageTrue(size) {
      if (this.triggerPage_) {
        //分页分页变化
        this.searchData_.pageno = size;
        console.log("请求数据4");
        this.getData_();
      }
    },
    //页码修改-false
    _changePageFalse() {
      this.$set(this.pageData_, "page", this.searchData_.pageno);
    },
    handleCurrentChange(size) {
      if (this.changePageCb) {
        this.changePageCb(this.dataProvider, size, this);
      } else {
        this._changePageTrue(size);
      }
    },
    handleSizeChange(size) {
      if (this.triggerPage_) {
        //清空搜素条件里的当前页码
        this.pageData_.pageSize = size;
        this.searchData_.pageno = 1;
        this.searchData_.pagesize = size;
        this.pageData_.page = 1;
        console.log("请求数据5");
        this.getData_();
      }
    },
    setDataProvider(data) {
      this.dataProvider = data;
    },
    getDataProvider() {
      return JSON.parse(JSON.stringify(this.dataProvider));
    },
    toggleRowSelection(row, selected) {
      this.$refs.multipleTable.toggleRowSelection(row, selected);
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.multipleTable.toggleRowExpansion(row, expanded);
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    setCurrentRow(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },
    getNewMaxTableHeight() {
      if (!this.maxTableHeightSwitch) return;
      let isInDialog = false;
      let dialogList = document.getElementsByClassName("el-dialog");
      if (dialogList.length > 0) {
        Object.keys(dialogList).forEach((key) => {
          let item = dialogList[key];
          let tableList = item.getElementsByClassName("wapigridview");
          Object.keys(tableList).forEach((key1) => {
            let item1 = tableList[key1];
            let jsTableID = item1.getAttribute("id");
            if (jsTableID == this.tableID) isInDialog = true;
          });
        });
      }
      //弹窗中的表格-不加滚动条
      if (isInDialog) return false;
      let pageHeight = 0;
      if (
        (this.closePage &&
          this.pageData_.total > 10 &&
          this.dataProvider.length > 0) ||
        this.showPage
      ) {
        pageHeight = 70;
      }
      this.newMaxTableHeight =
        Math.floor(
          window.innerHeight -
            this.maxTableHeightDefault -
            document.querySelector(`#${this.tableID}`).getBoundingClientRect()
              .top -
            pageHeight //多减70预留给分页和插槽
        ) + "px";
    },
  },
  mounted() {
    this.getNewMaxTableHeight();
    if (this.pageSize) {
      this.pageData_.pageSize = this.pageSize;
    }
    if (
      this.pageData &&
      (this.pageData.pageSize || this.pageData.pageSize == 0)
    ) {
      this.pageData_.pageSize = this.pageData.pageSize;
      this.$set(this.pageData_, "pageSizes", this.pageData.pageSizes);
    }
    if (this.pageData.init !== false) {
      this.pageData_ = Object.assign(this.pageData_, this.pageData);
    }
    this.setSearchData(Object.assign({}, this.searchData));
  },
  beforeDestroy() {
    this.dataProvider = [];
  },
};
</script>
