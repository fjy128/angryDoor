const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const config = require('../config/defaultConfig')
const template = Handlebars.compile(source.toString(), 'utf-8')
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    let isFile = stats.isFile()
    let isDirectory = stats.isDirectory()
    if (isFile) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (isDirectory) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files
      }
      res.end(template(data))
      // try {
      //   res.statusCode = 200
      //   res.setHeader('Content-Type', 'text/plain')
      //   res.end(files.join(','))
      // } catch (err) {
      //   res.statusCode = 404
      //   res.setHeader('Content-Type', 'text/plain')
      //   res.end(`${filePath}not found`)
      // }
    } else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('ok')
    }
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath}is not a directory or file/${ex + ''}`)
  }
}
