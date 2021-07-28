'use strict'
const apis = require('../src/http/packageApis')
module.exports = {
  NODE_ENV: '"production"',
  EVN_CONFIG: '"prod"',
  BASE_API:  '"' + apis.prodEnvHost + '"',
  IMAGE_PATH: '"' + apis.imagePath + '"'
}
