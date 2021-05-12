const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  // 支持装饰器
  addBabelPlugins( 
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ]
  )
);