/* eslint no-param-reassign: ["error", { "props": false }] */
const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias.components = path.join(__dirname, 'components')
    return config
  }
}
