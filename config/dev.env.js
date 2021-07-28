'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const apis = require('../src/http/packageApis')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  BASE_API: '"' + apis.devEnvHost + '"'
})
