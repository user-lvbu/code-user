import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from './router'
// 导入axios
import axios from 'axios'
// 导入 element-ui
import ElementUI, { Loading } from 'element-ui'
// 导入 element-ui 的样式表
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 将 ElementUI 安装为 vue 的插件
Vue.use(ElementUI)

Vue.filter('dateFormat', (dtStr) =>{
  const dt = new Date(dtStr)
  
  const y = padZero(dt.getFullYear())
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`


})

function padZero(n){
  return n >9 ? n : '0'+n
}



// 全局配置axios
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'

// 声明请求拦截器
let loadingInstance = null
axios.interceptors.request.use(config => {
  // 展示Loading效果
  loadingInstance = Loading.service({fullscreen:true})
  return config
})
// 声明响应拦截器
axios.interceptors.response.use(response => {
  // 隐藏Loading效果
  loadingInstance.close()
  return response
})
new Vue({
  // 挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
