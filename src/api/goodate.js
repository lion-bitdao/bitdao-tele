import request from '@/utils/request'

export function getGoodDate(_tid, _dvType, _date) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'goodate',
      params: [_tid, _dvType, _date]
    }
  })
}
