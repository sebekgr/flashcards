const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
  module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireLess.withLoaderOptions({
  modifyVars:
   { 
     "@body-background": "@cyan-7" ,
     "@primary-color": "@cyan-6",
     "@text-color": "@cyan-1",
     "@text-color-secondary": "@cyan-9",
     "@background-color-light": "@cyan-9",
     "@background-color-base": "@cyan-9",
     "@menu-item-color": '@cyan-9',
     "@input-placeholder-color"     : "@cyan-7",
     "@input-color"                : "@text-color",
     "@input-border-color"          : "@cyan-1",
     "@input-bg"                  : "@cyan-7",
     "@input-addon-bg"              : "@background-color-light",
     "@input-hover-border-color"   :" @cyan-7",
     "@input-disabled-bg"           : "@cyan-7",
     "@component-background": "@cyan-7",
     "@item-active-bg"        : "@cyan-7",
     "@item-hover-bg"         : "@cyan-9",
     "@menu-bg": "#fff",
     "@label-color ": "@text-color"

   },
  })(config, env);
    return config;
  };