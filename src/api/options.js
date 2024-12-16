import request from '@/utils/request'

export function getOptionState() {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'optionstate',
      params: []
    }
  })
}

export function optionChange(_type) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'optionchange',
      params: [_type]
    }
  })
}
