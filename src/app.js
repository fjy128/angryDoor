const http = require('http')
const conf = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(conf.port, conf.hostname, () => {
  console.log(`Server running at http://${conf.hostname}:${conf.port}/`)
})
