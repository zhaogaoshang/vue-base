import { Loading } from 'element-ui'
let loadingInstance

let $utils = {
  handleShowLoading () {
    loadingInstance = Loading.service()
  },

  handleHiddenLoading () {
    loadingInstance.close()
  },

  // 形成新的数据返回
  hadnleNewData (data) {
    return JSON.parse(JSON.stringify(data))
  },

  // 初始化aside列表数据
  handleInitAsideData (params) {
    let data = params
    function bc (editList) {
      editList.forEach(elemant => {
        elemant.open = false
        if (elemant.children) {
          return bc(elemant.children)
        } else {
          // return elemant
        }
      })
      return editList
    }
    return bc(data)
  },

  createHash (hashLength) {
    if (!hashLength || typeof (Number(hashLength)) !== 'number') { return }
    var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var hs = []
    var hl = Number(hashLength)
    var al = ar.length
    for (var i = 0; i < hl; i++) {
      hs.push(ar[Math.floor(Math.random() * al)])
    }
    return hs.join('')
  }
}

$utils.install = function (Vue, options) {
  Vue.prototype.$utils = $utils
}

export default $utils
