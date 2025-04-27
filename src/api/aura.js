import request from '@/utils/request'

export function getAuraHistory(_page, _size) {
  return request({
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'pointlog',
      params: [_page, _size]
    }
  })
}
