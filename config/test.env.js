'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const apis = require('../src/http/packageApis')
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  EVN_CONFIG: '"test"',
  BASE_API: '"' + apis.devEnvHost + '"'
})
