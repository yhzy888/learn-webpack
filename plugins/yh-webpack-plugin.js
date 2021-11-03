const fs = require("fs");
// 插件的基本结构
// 根据之前使用插件的方式可以看出，插件就是一个类
class YhPlugin {
  constructor(options) {
    // 进行传参处理
    console.log('options', options);
  }
  // apply 核心
  apply(compilier) {
    // compilier 对应 webpack 的钩子
    // tapAsync 异步的方式注册事件
    // tap 同步的方式注册事件
    // 采用同步或者异步需要判断当前钩子函数的事件类型
    compilier.hooks.emit.tapAsync("事件名称最好和类名一致", (compilation, cb) => {
      // compilation 某个阶段下处理后的结果
      // console.log('compilation-assets:',compilation.assets);
      // console.log('compilation-fileDependencies:', compilation.fileDependencies);
      // 拿到依赖文件
      let fileDependencies = Array.from(compilation.fileDependencies);
      // 过滤出schema.json配置文件
      fileDependencies = fileDependencies.filter((item) => {
        return item.indexOf('schema.json') > -1
      });
      console.log('fileDependencies--', fileDependencies);
      const arr = [];
      fileDependencies.forEach((filepath) => {
        // 异步方式读取文件，在for循环外arr为空，故用同步方式获取
        // fs.readFile(filepath, 'utf-8', (err, data) => {
        //   if (err) {
        //     // console.log('err----', err);
        //   } else {
        //     arr.push(JSON.parse(data));
        //     // console.log('data----', data, JSON.parse(data).name);
        //   }
        // });
        // 同步方式读取文件，并获取文件内容
        let data = fs.readFileSync(filepath, 'utf-8');
        arr.push(JSON.parse(data));
        data = null;
      });
      // console.log('arr--', arr);
      // 对当前数组做类型的判断
      const configMap = {}
      const res = [];
      arr.forEach((config) => {
        if (configMap[config.type]) {
          configMap[config.type].groupList.push(config);
        } else {
          configMap[config.type] = {
            groupList: [],
            groupName: config.typeName
          }
          configMap[config.type].groupList.push(config);
        }
      });
      for (let key in configMap) {
        res.push(configMap[key])
      }
      // console.log('configMap', configMap);
      console.log('res', res);
      compilation.assets['yh.js'] = {
        source: function () {
          // return '我是通过 yh-webpack-plugin 生成的文件';
          return JSON.stringify(res);
        },
        size: function () {
          return 1024; // 注意：此处只是返回资源列表中显示的文件大小，并不是实际生成的文件的大小，并且对实际生成文件的大小不影响。
        }
      }
      cb(); // 异步有callback，如果不调用会导致webpack打包步骤卡住
    })
  }
}
module.exports = YhPlugin;
 