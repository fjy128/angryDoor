/**
 * 缓存
 * 先判断本地有没有失效
 * expires 绝对时间 一件
 * Cache-Control 相对时间
 * if-Modified-Since / Last-Modified 上次修改时间
 * if-None-Match /ETag 表示文件一改变就会发生改变
 **/

const {
  cache
} = require('../config/defaultConfig')

function refreshRes (stats, res) {
  const {
    maxAge,
    expires,
    cacheControl,
    lastModified,
    etag
  } = cache
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
  }
  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }
  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }
  if (etag) {
    res.setHeader('Etag', `${stats.size}-${stats.mtime}`)
  }
}
module.exports = function isFresh (stats, req, res) {
  refreshRes(stats, res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']
  if (!lastModified && !etag) {
    return false
  }
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false
  }
  if (etag && etag !== res.getHeader('Etag')) {
    return false
  }
  return true
}
