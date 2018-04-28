const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
  module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireLess.withLoaderOptions({
  modifyVars:
   { 



   },
  })(config, env);
    return config;
  };

  /* "@card-head-background": "#fff",
     "@card-actions-background": "#fff",
          "@card-padding-base": "0",
     "@card-padding-wider": "10px"

  */