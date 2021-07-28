// aside/categoryList
const aside = {
  namespaced: true,
  state: () => ({
    activeItemPath: '/category/model'
  }),
  mutations: {
    switch (state, data) {
      state.activeItemPath = data
    }
  },

  /**
   * actions
  */
  actions: { },

  /**
   * getters
  */
  getters: {
  }
}

export default aside
