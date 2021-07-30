
// process.env.NODE_ENV = ""production
// process.env.NODE_ENV = 'development'

// let host = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''
const apis = {}

apis.host = process.env.BASE_API // 域名
apis.photoHost = process.env.BASE_API // 域名

const $apis = {
  host: apis.host,
  photoHost: apis.photoHost,
  api_login_get: 'api/login/get',
  api_login_login: 'api/login/login',
  api_upload_uploadPhoto: 'api/upload/uploadPhoto', // 上传图片
  api_upload_modelingUploadPhoto: 'api/upload/modelingUploadPhoto', // 上传模型文件
  api_upload_categoriesUploadPhoto: 'api/upload/categoriesUploadPhoto', // 其他文件上传

  // 特体信息管理
  api_specialBodily_list: '/api/specialBodily/list', // 特体信息管理 列表
  api_specialBodily_save: '/api/specialBodily/save', // 父级特体
  api_specialBodily_update: '/api/specialBodily/update', // 修改
  api_specialBodily_subsetUpdate: '/api/specialBodily/subsetUpdate', // 修改子集

  // 报损原因维护
  api_materialLossCause_list: '/api/materialLossCause/list', // 报损原因列表
  api_materialLossCause_update: '/api/materialLossCause/update', // 修改
  api_materialLossCause_save: '/api/materialLossCause/save', // 添加
  api_appVersion_pageList: '/api/appVersion/pageList', // 版本管理列表
  api_appVersion_save: '/api/appVersion/save', // 添加版本
  appVersion_update: '/api/appVersion/update', // 修改版本
  api_appVersion_delete: '/api/appVersion/delete', // 删除版本
  api_upload_appUpload: '/api/upload/appUpload', // 上传版本包

  // 账号管理
  api_user_save: '/api/user/save', // 添加
  api_user_select: '/api/user/select', // 查找
  api_user_update: '/api/user/update', // 修改

  // 获取地址
  api_address_all: '/api/address/all' // 获取地址
}

apis.install = function (Vue, options) {
  Vue.prototype.$apis = $apis
}

export default apis
