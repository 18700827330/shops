import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'

import qs from 'qs';
Vue.prototype.$qs = qs;

// 配置请求的根路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://106.52.248.231:10713'

axios.interceptors.request.use(config => {
config.headers.Authorization = window.sessionStorage.getItem('token')
return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
