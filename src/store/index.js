import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user' // 用户模块
import aside from './modules/aside' // 男装女装左边侧边栏的
import cloth from './modules/cloth' // 面料
import suit from './modules/suit'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['aside', 'user']
})

const store = new Vuex.Store({
  modules: {
    user,
    aside,
    cloth,
    suit
  },
  state: {
  },
  mutations: {
  },
  plugins: [vuexLocal.plugin]
})

export default store
