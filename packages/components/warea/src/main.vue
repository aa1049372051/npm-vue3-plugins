<!-- 
<area 
:provinceId.sync="provinceId"  
:cityId.sync="cityId"  
:areaId.sync="areaId" 

:provinceName.sync='provinceName'
:cityName.sync='cityName'
:areaName.sync='areaName'

:isEmpty="true"
ref="area" 
:ruleStr="[]"
></area>

rulesStr 验证不通过显示的文字
isEmpty  初始的时候默认选择北京，不需要默认选择，传递 isEmpty = true

//获取验证结果
this.$refs.area.validate()

//重置验证
this.$refs.area.reset()


 -->
<template>
  <el-row>
    <el-form :model="ruleForm" ref="ruleForm" inline size="">
      <div class="in-block pad-bot4" style="width120">
        <el-form-item prop="myProvinceID" :rules="[
          {
            required: isCheck == true ? true : false,
            message: ruleStr[0] || ' ',
          },
        ]">
          <el-select :class="areaClass.p || {}" v-model="ruleForm.myProvinceID"
            :disabled="disabled || provinceDisabled || disabledRank > 0" :clearable="clearable" ref="province"
            :placeholder="emptyStr[0]">
            <el-option :key="0" label="全部" :value="0"
              v-if="showEmpty && provinceList && provinceList.length > 0 && isProvinceAll" />
            <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>

      <div class="in-block pad-bot4" style v-if="rank != 1">
        <el-form-item prop="myCityID" :rules="[
          {
            required: isCheck == true ? true : false,
            message: ruleStr[1] || ' ',
          },
        ]">
          <el-select :class="areaClass.c || {}" :disabled="cDisabled || disabled || disabledRank > 1"
            v-model="ruleForm.myCityID" ref="city" :placeholder="emptyStr[1]">
            <el-option :key="0" label="全部" :value="0" v-if="showEmpty && cityList && cityList.length > 0" />
            <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="in-block mar-r0 pad-bot4" v-if="rank == 3">
        <el-form-item prop="myAreaID" :rules="[
          {
            required: isCheck == true ? true : false,
            message: ruleStr[2] || ' ',
          },
        ]">
          <el-select :class="areaClass.a || {}" :disabled="aDisabled || disabled || disabledRank > 2"
            v-model="ruleForm.myAreaID" ref="area" :placeholder="emptyStr[2]" @change="keyUp">
            <el-option :key="0" label="全部" :value="0" v-if="showEmpty && areaList && areaList.length > 0" />
            <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </el-row>
</template>
<script>
import axios from "@/utils/httpV2";
export default {
  name: "WArea",
  setup() { },
  props: {
    provinceId: {
      type: [String, Number],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    showEmpty: {
      //是否显示全部省市区
      type: Boolean,
      default() {
        return false;
      },
    },
    provinceName: {
      type: [String, Number],
      //省份的名字
      default: "",
    },
    cityId: {
      type: [String, Number],
      default: 0,
    },
    cityName: {
      type: [String, Number],
      default: "",
    },
    areaId: {
      type: [String, Number],
      default: 0,
    },
    areaName: {
      type: [String, Number],
      //城市的名字
      default: "",
    },
    rank: {
      type: Number,
      default: 3, //联动的数量
    },
    emptyStr: {
      type: Array,
      default() {
        return ["选择省", "选择市", "选择区县"];
      },
    },
    htmlOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    clearable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    ruleStr: {
      type: Array,
      default() {
        return ["请选择省", "请选择市", "请选择区"];
      },
    },
    isEmpty: {
      type: Boolean,
      // 默认初始的时候不联动
      default() {
        return false;
      },
    },
    isCheck: {
      type: Boolean,
      // 默认验证
      default() {
        return true;
      },
    },
    isKeyUp: {
      type: Boolean,
      default() {
        return false;
      },
    },
    areaClass: {
      type: Object,
      default() {
        return { p: "width100", c: "width100", a: "width100" };
      },
    },
    isProvinceAll: {
      type: Boolean,
      //省份全部的控制显示
      default() {
        return true;
      },
    },
    disabledRank: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      provinceDisabled: false, //省select禁用
      provinceList: [], //省列表
      cityList: [],
      areaList: [],
      lock: false,
      defaultDate: {
        //默认值
        size: "small", //输入框尺寸
      },
      ruleForm: {
        myProvinceID: "",
        myCityID: "",
        myAreaID: "",
      },
      pTimeout: "",
      cTimeOut: "",
      aTimeOut: "",
      cDisabled: false,
      aDisabled: false,
    };
  },
  methods: {
    keyUp() {
      if (this.isKeyUp) {
        this.$emit("changeFocus");
      }
    },
    getCity(id) {
      this.$emit("update:provinceId", id);
      clearTimeout(this.pTimeout);
      //省份为空就返回空
      if (!id || id == 0) {
        this.$emit("update:cityId", "");
        this.$emit("update:cityName", "");
        this.$emit("update:provinceName", "");
        this.ruleForm.myCityID = "";
        this.cityList = [];
        this.getArea();
        return;
      }
      this.$refs.ruleForm.clearValidate();
      // //如果已经store 里已经存在城市列表就返回
      let cityList = sessionStorage.getItem(id) ? JSON.parse(sessionStorage.getItem(id)) : [];
      if (cityList && Object.keys(cityList).length) {
        this.cityList = cityList;
        //设置选中
        let oldCityID = this.cityId;

        let newCityID = "";
        if (oldCityID && parseInt(oldCityID / 10000) == parseInt(cityList[0]["id"] / 10000)) {
          //如果是同一个省份的城市
          newCityID = oldCityID;
        } else if (oldCityID == 0 && this.showEmpty) {
          newCityID = 0;
        } else {
          newCityID = cityList[0]["id"];
        }
        this.$emit("update:cityId", newCityID);
        //设置延迟器 获取城市名字
        clearTimeout(this.cTimeOut);
        this.ruleForm.myCityID = newCityID;
        this.getName();
        return;
      }
      //如果store 里不存在就请求获取数据
      this.cDisabled = true;
      this.aDisabled = true;
      axios.post("pqs/are001", { grade: 3, parentID: id }).then(
        (response) => {
          this.cDisabled = false;
          this.aDisabled = false;
          if (response.data.retCode == 200) {
            cityList = response.data.result.areaList || [];
            if (cityList) {
              cityList.forEach((value) => {
                value.label = value.name;
                value.value = value.id + "";
              });
              sessionStorage.setItem(id, JSON.stringify(cityList));
            } else {
              cityList = [];
            }
            this.cityList = cityList;

            let oldCityID = this.cityId;
            let newCityID = "";
            if (oldCityID && parseInt(oldCityID / 10000) == parseInt(cityList[0]["id"] / 10000)) {
              //如果是同一个省份的城市
              newCityID = oldCityID;
            } else {
              newCityID = cityList[0]["id"];
            }
            this.$emit("update:cityId", newCityID);
            clearTimeout(this.cTimeOut);
            this.ruleForm.myCityID = newCityID;
            this.getName();
          }
        },
        () => {
          this.cDisabled = false;
          this.aDisabled = false;
        }
      );
    },
    getArea(id) {
      //如果城市ID为空就返回
      if (!id || id == 0) {
        this.areaList = [];
        this.$emit("update:areaId", "");
        //没用的方法
        this.getAreaInfo();
        this.ruleForm.myAreaID = "";
        return;
      }

      //如果store 里已经存在城市列表就返回
      let areaList = sessionStorage.getItem(id) ? JSON.parse(sessionStorage.getItem(id)) : [];

      if (areaList && Object.keys(areaList).length) {
        this.areaList = areaList;
        //设置选中
        let oldAreaID = this.areaId;
        let newAreaID = "";
        if (oldAreaID && parseInt(oldAreaID / 100) == parseInt(areaList[0]["id"] / 100)) {
          newAreaID = oldAreaID;
        } else if (oldAreaID == 0 && this.showEmpty) {
          newAreaID = 0;
        } else {
          newAreaID = areaList[0]["id"];
        }
        this.$emit("update:areaId", newAreaID);
        //设置延迟器 获取地区名字
        clearTimeout(this.aTimeOut);
        this.ruleForm.myAreaID = newAreaID;
        this.getName();
        return;
      }
      this.aDisabled = true;
      axios.post("pqs/are001", { grade: 4, parentID: id }).then(
        (response) => {
          this.aDisabled = false;
          if (response.data.retCode == 200) {
            areaList = response.data.result.areaList || [];
            if (areaList) {
              areaList.forEach((value) => {
                value.label = value.name;
                value.value = value.id + "";
              });
            }

            sessionStorage.setItem(id, JSON.stringify(areaList));
            this.areaList = areaList;
            let oldAreaID = this.areaId;
            let newAreaID = "";
            if (oldAreaID && parseInt(oldAreaID / 100) == parseInt(areaList[0]["id"] / 100)) {
              newAreaID = oldAreaID;
            } else {
              newAreaID = areaList[0]["id"];
            }
            this.$emit("update:areaId", newAreaID);
            // clearTimeout(this.aTimeOut);
            //先赋值接口却没请求完出问题，所以这里再调一遍
            this.getName();
            this.ruleForm.myAreaID = newAreaID;
            return;
          }
        },
        () => {
          this.aDisabled = false;
        }
      );
    },
    getName() {
      clearTimeout(this.aTimeOut);
      this.aTimeOut = setTimeout(() => {
        this.$emit("update:provinceName", this.$refs.province.selectedLabel);
        if (this.rank != 1) this.$emit("update:cityName", this.$refs.city.selectedLabel);
        if (this.rank == 3) this.$emit("update:areaName", this.$refs.area.selectedLabel);
        this.$emit("change");
      }, 100);
    },
    getData() {
      return {
        provinceName: this.$refs.province && this.$refs.province.selectedLabel,
        cityName: this.$refs.city && this.$refs.city.selectedLabel,
        areaName: this.$refs.area && this.$refs.area.selectedLabel,
        provinceId: this.ruleForm.myProvinceID,
        cityId: this.ruleForm.myCityID,
        areaId: this.ruleForm.myAreaID,
      };
    },
    validate() {
      //验证结果
      let res = "";
      this.$refs.ruleForm.validate((valid) => {
        res = valid;
      });
      return res;
    },
    reset() {
      let provinceId;
      if (this.isEmpty) {
        provinceId = 0;
      } else {
        provinceId = parseInt(this.provinceList[0]["id"]);
      }
      this.$emit("update:provinceId", provinceId);
      this.ruleForm.myProvinceID = provinceId;
      this.getCity(provinceId);
      this.$refs.ruleForm.resetFields();
    },
    clear() {
      this.$refs.ruleForm.clearValidate();
    },
    getAreaInfo() {
      //获取省市区信息  暂时保留的方法
      this.$emit("arealist", {
        provinceId: this.ruleForm.myProvinceID,
        cityId: this.ruleForm.myCityID,
        areaId: this.ruleForm.myAreaID,
      });
    },
    getProvince() {
      let provinceList = window.sessionStorage.getItem("newProvinceList");
      //获取省份
      if (!provinceList) {
        this.provinceDisabled = true;
        axios
          .post("pqs/are001", { grade: 2, parentID: 0 })
          .then((response) => {
            if (response.data.retCode == 200) {
              let res = response.data.result.areaList || [];
              res.forEach((element) => {
                element.label = element.name;
                element.value = element.id + "";
              });
              this.provinceList = res;

              window.sessionStorage.setItem("newProvinceList", JSON.stringify(res));
            }
          })
          .finally(() => {
            this.$nextTick(() => {
              this.provinceList;
              this.provinceDisabled = false;
            });
          });
      } else {
        this.provinceList = provinceList ? JSON.parse(provinceList) : [];
      }
    },
  },
  computed: {
    //获得宽度  现在宽度固定了
    rowNum() {
      if (this.rank == 3) {
        return [8, 8, 8];
      } else if (this.rank == 2) {
        return [12, 12, 0];
      } else {
        return [24, 0, 0];
      }
    },
  },
  watch: {
    provinceId(val) {
      if (val == 0 && !this.showEmpty) {
        val = "";
      }

      //这里删除了if(val==old)
      this.ruleForm.myProvinceID = val;
    },
    cityId(val) {
      if (val == 0 && !this.showEmpty) {
        val = "";
      }
      //这里删除了if(val==old)
      this.ruleForm.myCityID = val;
    },
    areaId(val) {
      if (val == 0 && !this.showEmpty) {
        val = "";
      }
      //这里删除了if(val==old)
      this.ruleForm.myAreaID = val;
    },
    "ruleForm.myProvinceID"(val, old) {
      if (val && "number" != typeof val) {
        //空字符串转换的时候会出现NaN
        this.ruleForm.myProvinceID = parseInt(val) || val;
        return false;
      }
      this.getCity(val);
    },
    "ruleForm.myCityID"(val, old) {
      if (val && "number" != typeof val) {
        this.ruleForm.myCityID = parseInt(val) || val;
        return false;
      }
      if (val !== old) {
        this.$emit("update:cityId", val);
        this.getName();
        clearTimeout(this.cTimeOut);
        this.getArea(val);
      }
    },
    "ruleForm.myAreaID"(val, old) {
      if (val && "number" != typeof val) {
        this.ruleForm.myAreaID = parseInt(val) || val;
        return false;
      }
      if (val !== old && val) {
        this.$emit("update:areaId", val);
        clearTimeout(this.cTimeOut);
        this.getName();
      }
      if (val === "") {
        this.$emit("update:areaId", "");
        this.getName();
      }
      if (val === 0) {
        this.$emit("update:areaId", 0);
        this.getName();
      }
    },
    provinceList(provinceList) {
      if (provinceList && Object.keys(provinceList).length) {
        if (!this.isEmpty && !this.lock) {
          if (Object.keys(provinceList).length) {
            this.lock = true;
            this.ruleForm.myProvinceID = provinceList[0]["id"];
            this.$emit("update:provinceId", provinceList[0]["id"]);
          }
        }
      }
    },
  },
  beforeDestroy() {
    //销毁时候清理延迟器
    clearTimeout(this.pTimeout);
    clearTimeout(this.cTimeOut);
    clearTimeout(this.aTimeOut);
  },
  mounted() {
    this.getProvince();
    let provinceList = window.sessionStorage.getItem("newProvinceList");
    if (provinceList) {
      if (this.provinceId) {
        this.ruleForm.myProvinceID = this.provinceId ? this.provinceId : "";
        this.ruleForm.myCityID = this.cityId ? this.cityId : "";
        this.ruleForm.myAreaID = this.areaId ? this.areaId : "";
      }
    } else {
      //延迟初始化
      setTimeout(() => {
        if (this.provinceId) {
          this.ruleForm.myProvinceID = this.provinceId ? this.provinceId : "";
          this.ruleForm.myCityID = this.cityId ? this.cityId : "";
          this.ruleForm.myAreaID = this.areaId ? this.areaId : "";
        }
      }, 1500);
    }

  },
};
</script>
<style>
.el-form--inline .mar-r0 .el-form-item {
  margin-right: 0 !important;
}
</style>
