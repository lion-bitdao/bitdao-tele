import crypto from 'crypto'

export function md5Hash(orgString) {
  var md5 = crypto.createHash('md5')
  // 更新hash值
  md5.update(orgString)
  // 计算MD5值
  return md5.digest('hex')
}
