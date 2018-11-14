/**
 * 使用promisify
 **/
const chalk = require('chalk')
const http = require('http')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/router')

const log = console.log

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
  log(chalk.green(`Server running at http://${conf.hostname}:${conf.port}/`))
})
