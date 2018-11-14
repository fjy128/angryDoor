const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const log = console.log
const miles = 18
const calculateFeet = miles => miles * 5280

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(conf.port, conf.hostname, () => {
  log(chalk.keyword('orange')('Yay for orange colored text!'))
  log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'))
  log(chalk.hex('#DEADED').bold('Bold gray!'))
  log(chalk` There are {bold 5280 feet} in a mile. In {bold ${miles} miles}, there are {red.bold ${calculateFeet(miles)} feet}.`)
  log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`)
  log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'))
  log(chalk.blue.bgRed.bold('Hello world!'))
  log(chalk.green(`Server running at http://${conf.hostname}:${conf.port}/`))
})
