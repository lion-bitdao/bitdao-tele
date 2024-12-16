import request from '@/utils/request'

export function getDivination(_tid, _dvType) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'divination',
      params: [_tid, _dvType]
    }
  })
}
