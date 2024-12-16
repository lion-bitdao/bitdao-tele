import request from '@/utils/request'

export function getFortuneHistory(_page, _size) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'fortunehistory',
      params: [_page, _size]
    }
  })
}
