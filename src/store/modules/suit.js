const suit = {
  namespaced: true,
  state: () => ({
    suitList: []
  }),
  mutations: {
    set_suitList (state, data) {
      state.suitList = data
    },
    set_node3List (state, data) {
      state.node3List = data
    },
    push_node3List (state, data) {
      state.node3List.push(data)
    }
  },
  actions: { },
  getters: { }
}

export default suit
