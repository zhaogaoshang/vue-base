// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 第三方
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import instance from '@/http' // vue-axios
import VueAxios from 'vue-axios' // vue-axios
import store from '@/store' // vuex
import 'lib-flexible'

// 自定义
import $utils from './utils' // utils
import apis from '@/http/api' // apis

// 第三方
Vue.use(ElementUI)
Vue.use(VueAxios, instance) // vue-axios

// 自定义
Vue.use($utils) // utils
Vue.use(apis) // apis

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
