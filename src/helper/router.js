const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat) // 读取文件基本信息
const readdir = promisify(fs.readdir)
// const isFresh = require('./cache')
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
      res.setHeader('Content-Type', 'text/plain')
      res.end(files.join(','))
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
