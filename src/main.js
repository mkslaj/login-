import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// // 分页组件
// import Pagination from '@/components/Pagination'
// // 自定义表格工具组件
// import RightToolbar from '@/components/RightToolbar'
// // 富文本组件
// import Editor from "@/components/Editor"
// // 文件上传组件
// import FileUpload from "@/components/FileUpload"
// // 图片上传组件
// import ImageUpload from "@/components/ImageUpload"
// // 图片预览组件
// import ImagePreview from "@/components/ImagePreview"
// // 自定义树选择组件
// import TreeSelect from '@/components/TreeSelect'
// // 字典标签组件
// import DictTag from '@/components/DictTag'
app.use(router)
app.use(ElementPlus,{size:"large"})
app.mount('#app')
