/**
 * 使用promisify
 **/
const chalk = require('chalk')
const http = require('http')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/router')
const open = require('./helper/open')
const log = console.log

class Serve {
  constructor (config) {
    // 拼接用户指定的端口、域名、
    this.conf = Object.assign({}, conf, config)
  }
  start () {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
    })

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      log(chalk.green(`Server running at http://${this.conf.hostname}:${this.conf.port}/`))
      open(addr)
    })
  }
}
module.exports = Serve
