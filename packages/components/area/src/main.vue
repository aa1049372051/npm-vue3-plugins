<template>
    <el-cascader v-model="value" :props="casprops"  @change="handleChange" :clearable="clearable"/>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'element-plus';

const props = withDefaults(defineProps<{
    /** 省id  */
    provinceId?: number,
    /** 市id  */
    cityId?: number,
    /** 区id  */
    areaId?: number,
    /** 显示到哪一级，1，2，3代表省市区  */
    rank?: number,
    /** 配置项  */
    casprops?:CascaderProps,
    /** 是否可清空  */
    clearable?:boolean
}>(), { rank: 3,clearable:true })

const casprops: CascaderProps = {
    lazy: true,
    lazyLoad(node, resolve) {
        console.log(node, 'node')
        //请求获取数据
        const { level } = node
        requestArea(resolve)
        // setTimeout(() => {
            //   const nodes = Array.from({ length: level + 1 }).map((item) => ({
            //     value: ++id,
            //     label: `Option - ${id}`,
            //     leaf: level >= 2,
            //   }))
            // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
            //   resolve(nodes)
        // }, 1000)
    },
    value:props.casprops?.value,
    label:props.casprops?.label,
    leaf:props.casprops?.leaf,
    children:props.casprops?.children
}
/** 触发的父级方法 */
const emit = defineEmits(['change', 'clear'])

/** 选中的值 */
const value = ref<[]>([])

/** 值变化时触发 */
function handleChange(value){
    console.log(value)
    emit('change', value)
}

/** 请求数据 */
function requestArea(resolve) {
}
/** 获取省市区数据 */
function getData() {
}
/** 设置省市区数据 */
function setData() {

}

defineExpose({
    getData,
    setData
})
</script>