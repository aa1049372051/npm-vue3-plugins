// packages / index.js

// 导入单个组件
import WGridView from './components/wgridview/index'
import StatusTips from './components/statustips/index'
import WOssUpload from './components/wossupload/index'
import WArea from './components/warea/index'
import Editor from './components/editor/index'
import FileList from "./components/flieList/index"
import * as utils from './utils'

import * as plugins from './plugins'

// 以数组的结构保存组件，便于遍历
const components = [
    WGridView,
    StatusTips,
    WArea,
    WOssUpload,
    Editor,
    FileList
]

// 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {
    WGridView,
    StatusTips,
    WArea,
    WOssUpload,
    Editor,
    utils,
    plugins,
    FileList
}
export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components
}
