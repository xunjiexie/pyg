// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import axios from 'axios'

Vue.use(ElementUI)
// 将axios添加到vue原型中
Vue.prototype.$http = axios
// 配置基础路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, (error) => {
  return Promise.reject(error)
}
)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
