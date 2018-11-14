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
      // fs.readFile(filePath, (err, data) => {
      //   console.log(data)
      // })
      fs.createReadStream(filePath).pipe(res)
    }
  })

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<body>')
  res.write('fjy 123334')
  res.write('</body>')
  res.write('</html>')
  res.end('Hello World\n')
})

server.listen(conf.port, conf.hostname, () => {
  log(chalk.green(`Server running at http://${conf.hostname}:${conf.port}/`))
})
