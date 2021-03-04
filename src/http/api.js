
// process.env.NODE_ENV = ""production
// process.env.NODE_ENV = 'development'

// let host = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''
const apis = {}

apis.host = 'http://192.168.0.11:8090/' // 域名
apis.photoHost = 'http://192.168.0.11:8090' // 域名

const $apis = {
  host: apis.host,
  photoHost: apis.photoHost,
  api_login_get: 'api/login/get',
  api_login_login: 'api/login/login',
  api_upload_uploadPhoto: 'api/upload/uploadPhoto', // 上传图片
  api_upload_modelingUploadPhoto: 'api/upload/modelingUploadPhoto', // 上传模型文件
  api_upload_categoriesUploadPhoto: 'api/upload/categoriesUploadPhoto', // 其他文件上传

  // 模型部件管理
  api_modeling_save: 'api/modeling/save', // 模型管理
  api_modeling_update: 'api/modeling/update', // 模型部件修改

  // 整套衣服的模板
  api_modeling_list: 'api/modeling/list', // 获取整套依衣服的模板

  // 模型部件的管理
  api_modelingPart_list: 'api/modelingPart/list', // 获取列表
  api_modelingPart_storage: 'api/modelingPart/storage', // 新增

  api_categories: 'api/categories/storage', // 品类增删改查
  api_categories_list: 'api/categories/list', // 品类接口列表 0为男装1为女装
  api_categories_etNumberSortByList: 'api/categories/setNumberSortByList',

  api_brand_list: 'api/brand/list', // 面料品牌列表
  api_brand_stroage: 'api/brand/storage', // 面料品牌的添加

  api_colour_list: 'api/colour/list', // 面料颜色列表
  api_colour_storage: 'api/colour/storage', // 面料颜色管理

  api_element_list: 'api/element/list', // 面料成分的列表
  api_element_storage: 'api/element/storage', // 面料成分的列表

  api_attribute_list: 'api/attribute/list', // 面料属性的列表
  api_attribute_storage: 'api/attribute/storage', // 面料属性的列表

  api_material_list: 'api/material/list', // 面料列表
  api_material_storage: 'api/material/storage' // 面料操作
}

apis.install = function (Vue, options) {
  Vue.prototype.$apis = $apis
}

export default apis
