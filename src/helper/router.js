const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')// 模版引擎
const promisify = require('util').promisify// 解决回调问题
const stat = promisify(fs.stat)// 读取文件信息
const readdir = promisify(fs.readdir)
const mime = require('./mime')// 文件类型
const compress = require('./compress')// 文件压缩
const range = require('./range')

const tplPath = path.join(__dirname, '../template/dir.tpl')// 模版引擎
const source = fs.readFileSync(tplPath)
const config = require('../config/defaultConfig')
const template = Handlebars.compile(source.toString(), 'utf-8')
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    let isFile = stats.isFile()
    let isDirectory = stats.isDirectory()
    if (isFile) {
      const contentType = mime(filePath)
      res.setHeader('Content-Type', contentType)
      // fs.createReadStream(filePath).pipe(res)
      let rs
      const { code, start, end } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, { start, end })
      }
      rs = fs.createReadStream(filePath)
      if (filePath.match(config.compress)) { // 文件压缩
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (isDirectory) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      res.end(template(data))
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
