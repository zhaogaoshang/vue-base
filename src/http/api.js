
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
  api_upload_categoriesUploadPhoto: 'api/upload/categoriesUploadPhoto' // 其他文件上传
}

apis.install = function (Vue, options) {
  Vue.prototype.$apis = $apis
}

export default apis
