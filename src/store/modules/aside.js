// aside/categoryList
const aside = {
  namespaced: true,
  state: () => ({
    manCategoryList: [], // 男品类的列表
    manOpen: '0-0',

    womanCategoryList: [],
    womanOpen: '0-0',

    // 选择的操作项
    pickItem: {
      id: '', // 如果是新增品类则不传，修改,删除必传
      name: '', // 品类名称
      type: '', // 0为男装1为女装
      genreType: '', // 0为目录1为类型图片
      status: '', // 0为正常1为删除
      numberSort: '', // 同一父分类下排序默认第一个值为1
      referredName: '', // 所属父子类型名称（自动拼接）
      parentId: '', // 父级id,根默认为0
      photoPath: '', // 图片路径(当genreType等于1时须传入)
      photoType: '' // 0为已上传1为未上传(photoPath为空时默认未上传)
    },
    pickCengJi: 1, // 当前选择的层级

    loadDataLast: {}, // 被选中的，加载数据的最后一项 用来文字变颜色
    bianJiDeTongJiLieBiao: [], // 编辑分类的时候选择的同级分类列表

    // 点击后计算出右边的列表渲染
    computedList: [],
    // 要渲染的列表
    computedData: {
      current: 1, // 当前
      pageSize: 5, // 每页显示的数量
      list: []
    },

    // 点击的层级
    clickCengji: 0,
    clickItem: {}
  }),
  mutations: {

    // 设置点击项
    setClickitem (state, data) {
      state.clickItem = data
    },

    // 设置点击的层级 并不是选择的层级
    setClickCengji (state, data) {
      state.clickCengji = data
    },

    // 设置层级
    setPickCengJi (state, data) {
      state.pickCengJi = data
    },

    // 设置选择 的同级列表
    setBianJiDeTongJiLieBiao (state, data) {
      state.bianJiDeTongJiLieBiao = data
    },

    // 设置加载数据的最后一项
    setLoadDataLast (state, data) {
      state.loadDataLast = data
      state.computedList = []
      this.commit('aside/computedShow')
      this.commit('aside/initComputedData')
    },

    // 设置男性列表
    setmanCategoryList (state, data) {
      function bc (editList) {
        editList.forEach(elemant => {
          elemant.open = false
          if (elemant.children) {
            return bc(elemant.children)
          } else {
            return elemant
          }
        })
      }
      bc(data)
      state.manCategoryList = data
    },

    // 设置女性列表
    setWomanCategoryList (state, data) {
      function bc (editList) {
        editList.forEach(elemant => {
          elemant.open = false
          if (elemant.children) {
            return bc(elemant.children)
          } else {
            return elemant
          }
        })
      }
      bc(data)

      state.womanCategoryList = data
    },

    // 设置选择
    setpickItem (state, params) {
      if (state.pickItem.id === params.id) {
        this.commit('aside/initPick')
      } else {
        state.pickItem = params
      }
    },

    // 设置每页显示的数量
    setSizeChange (state, params) {
      state.computedData.pageSize = params
      state.computedData.current = 1
      this.commit('aside/computedShow')
    },

    // 设置当前的数量
    setCurrentChange (state, params) {
      state.computedData.current = params
      this.commit('aside/computedShow')
    },

    // 初始化选择
    initPick (state) {
      state.pickItem = {
        id: '', // 如果是新增品类则不传，修改,删除必传
        name: '', // 品类名称
        type: '', // 0为男装1为女装
        genreType: '', // 0为目录1为类型图片
        status: '', // 0为正常1为删除
        numberSort: '', // 同一父分类下排序默认第一个值为1
        referredName: '', // 所属父子类型名称（自动拼接）
        parentId: '', // 父级id,根默认为0
        photoPath: '', // 图片路径(当genreType等于1时须传入)
        photoType: '' // 0为已上传1为未上传(photoPath为空时默认未上传)
      }
      state.pickCengJi = 1 // 当前的层级
      state.loadDataLast = {} // 被选中的，加载数据的最后一项
      state.bianJiDeTongJiLieBiao = [] // 编辑分类的时候选择的同级分类列表
    },

    // 设置列表项是否打开
    handleIsOpen (state, params) {
      let data = params.type === 'man' ? state.manCategoryList : state.womanCategoryList
      function bc (editList) {
        editList.forEach(elemant => {
          if (elemant.children) {
            if (elemant.id !== params.id) {
              return bc(elemant.children)
            } else {
              elemant.open = !elemant.open
              return false
            }
          } else {
          }
        })
      }
      bc(data)
      params.type === 'man' ? state.manCategoryList = data : state.womanCategoryList = data
    },

    // 计算列表
    handleComputedList (state, data) {
      console.log(data)
      // let list = []
      // function bc (editList) {
      //   list = list.concat(editList)
      //   editList.forEach(elemant => {
      //     if (elemant.children) {
      //       return bc(elemant.children)
      //     } else {
      //       return elemant
      //     }
      //   })
      // }
      // bc(data.children)
      // state.computedList = list
      state.computedList = data.children
      this.commit('aside/computedShow')
      this.commit('aside/initComputedData')
    },

    // 初始化分页
    initComputedData (state) {
      state.computedData.current = 1
      state.computedData.pageSize = 5
    },

    // 计算显示列表
    computedShow (state) {
      let current = state.computedData.current
      state.computedData.list = state.computedList.slice((current - 1) * state.computedData.pageSize, current * state.computedData.pageSize)
    },

    // 刷新位置
    refreshLocation (state, data) {
      // console.log(data)
      let arrList = state.computedData.list

      function bc (list) {
        list.forEach(item => {
          if (item.id === data.parentId) {
            item.children = data.dataList
            return false
          } else {
            if (item.children) {
              bc(item.children)
            } else {
              return false
            }
          }
        })
      }
      bc(arrList)
      state.computedData.list = arrList
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
    getManClothTwoCategory: state => {
      let list = []
      state.manCategoryList[0].children.forEach(item => {
        list.push({
          id: item.id,
          name: item.name
        })
      })
      return list
    },

    getWomanClothTwoCategory: state => {
      let list = []
      state.womanCategoryList[0].children.forEach(item => {
        list.push({
          id: item.id,
          name: item.name
        })
      })
      return list
    }
  }
}

export default aside
