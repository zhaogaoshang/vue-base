let apis = {}

// 开发配置
// apis.devEnvHost = 'http://mid.ouryou.cn/'
apis.devEnvHost = 'http://192.168.0.21:8090'
// 测试打包配置
apis.preEnvHost = 'http://mid.ouryou.cn/'

// 生产打包配置
apis.prodEnvHost = 'https://mid.forniao.cn/'

// 阿里云项目图片的地址
apis.imagePath = 'https://3d-fabric.oss-cn-beijing.aliyuncs.com/public-images/'

module.exports = apis
