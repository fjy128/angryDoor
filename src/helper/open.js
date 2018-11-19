/**
 * 支持运行脚本的时候自动打开浏览器跑脚本
 * process 是node默认就有的默认属性
 **/
const {
  exec
} = require('child_process')
module.exports = url => {
  switch (process.platform) {
    // mac 系统
    case 'darwin':
      exec(`open ${url}`)
      break
      // window
    case 'win32':
      exec(`start ${url}`)
      break
  }
}
