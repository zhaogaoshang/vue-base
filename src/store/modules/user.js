const user = {
  namespaced: true,
  state: () => ({
    userInfo: null
  }),
  mutations: {
    // 设置男性列表
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: { },
  getters: { }
}

export default user
