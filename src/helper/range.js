/**
 * totalSize：整个字节数，响应结束需要加上
 * range:bytes = [start]-[end];
 * Accept-Ranges:bytes;
 * Content-Range:bytes start-end/totalss
  **/
module.exports = (totalSize, req, res) => {
  const range = req.headers['range']// 获取range
  // 若果拿不到range，就返回200，正常返回就好
  if (!range) {
    return { code: 200 }
  }
  // 正则表达式获取range
  const sizes = range.match(/bytes=(\d*)-(\d*)/)
  // 如果有就返回第二，如果没有就取到结尾
  const end = sizes[2] || totalSize - 1
  const start = sizes[1] || totalSize - end
  // 非法条件  就返回200，正常返回就好
  if (start > end || start < 0 || end > totalSize) {
    return { code: 200 }
  }
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', end - start)
  return {
    code: 206, // 206表示部分内容返回
    start: parseInt(start),
    end: parseInt(end)
  }
}
