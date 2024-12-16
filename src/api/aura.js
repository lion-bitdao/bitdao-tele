import request from '@/utils/request'

export function getAuraHistory(_page, _size) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'aurahistory',
      params: [_page, _size]
    }
  })
}
