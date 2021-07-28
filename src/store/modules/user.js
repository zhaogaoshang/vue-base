const user = {
  namespaced: true,
  state: () => ({
    userInfo: null,
    token: null
  }),
  mutations: {
    // 设置男性列表
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setToken (state, data) {
      state.token = data
    }
  },
  actions: { },
  getters: { }
}

export default user
