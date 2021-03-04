const user = {
  namespaced: true,
  state: () => ({
    brandList: [], // 品牌
    colorList: [], // 颜色
    elementList: [], // 元素
    attributeList: [], // 属性
    editItem: {} // 编辑项
  }),
  mutations: {
    // 设置品牌
    setBrandList (state, data) {
      state.brandList = data
    },

    // 设置颜色
    setColorList (state, data) {
      state.colorList = data
    },

    // 设置元素
    setElementList (state, data) {
      state.elementList = data
    },

    // 设置属性
    setAttributeList (state, data) {
      state.attributeList = data
    },

    // 设置编辑项
    setEditItem (state, data) {
      state.editItem = data
    }
  },
  actions: { },
  getters: { }
}

export default user
