/**
 * 回调
 **/
const chalk = require('chalk')
const http = require('http')
const path = require('path')
const fs = require('fs')
const conf = require('./config/defaultConfig')
const log = console.log

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`${filePath}is not a directory or file`)
      return false
    }
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain')
          res.end(`${filePath}not find`)
          return false
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(files.join(','))
      })
    }
  })
})

server.listen(conf.port, conf.hostname, () => {
  log(chalk.green(`Server running at http://${conf.hostname}:${conf.port}/`))
})
