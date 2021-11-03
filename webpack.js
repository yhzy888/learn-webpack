const webpack = require("webpack");
const options = require("./webpack.config.js");
const compiler = webpack(options);
Object.keys(compiler.hooks).forEach((hookName) => {
  compiler.hooks[hookName].tap("事件名称", (compilation) => {
    console.log('run======>', hookName);
  })
});
compiler.run();
