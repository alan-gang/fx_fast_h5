const path = require('path');

// 主题配置
const themeFiles = {
  themeBlue: [
  ]
}

// 默认主题
const defaultFiles = [
  '../src/assets/style/theme/default.styl',
  // 函数
  '../src/assets/style/common/functions.styl'
]

// 全局样式文件
const commonFiles = [
  '../src/assets/style/common/common.styl'
]

let theme = themeFiles[process.env.ENV_CHANNEL] || defaultFiles;
// theme.push(...commonFiles)
theme = theme.map((file) => {
  return path.resolve(__dirname, file);
});

module.exports = theme;