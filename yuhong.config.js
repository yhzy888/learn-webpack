// 默认配置
const path = require('path');
// 一个对象，导出
module.exports = {
  // 打包入口，执行webpack打包任务时，从哪个模块开始编译，默认是 ./src/index.js
  entry: './src/index.js',
  // 出口，webpack打包编译结束后，产出的资源存放的位置
  output: {
    // 存放的位置，绝对路径，借助node的path模块
    // path: path.resolve(__dirname, "./dist"),
    path: path.resolve(__dirname, "./yuhong"),
    // 资源的名称
    // filename: 'main.js'
    filename: 'yh.js'
  },
  mode: 'development', // none(不开启编译模式) development（开发模式） production（生产模式）
}