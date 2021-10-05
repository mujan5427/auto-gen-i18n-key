require('babel-register')({
  presets: ['env']
});

module.exports = require('./genI18nKey.js');