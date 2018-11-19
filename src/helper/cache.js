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
  // public 表示静态资源
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
// 请求中的一些信息
module.exports = function isFresh (stats, req, res) {
  refreshRes(stats, res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']
  // 若客户端没有发 lastModified、 etag这两个信息
  if (!lastModified && !etag) {
    return false
  }
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false
  }
  // 若客户端没有发 etag与客户端一样不
  if (etag && etag !== res.getHeader('Etag')) {
    return false
  }
  return true // 表示认为缓存还是OK
}
