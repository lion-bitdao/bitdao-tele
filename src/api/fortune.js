import request from '@/utils/request'

export function getDailyForcast() {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'dailyforcast',
      params: []
    }
  })
}

export function getFortuneHistory(_page, _size) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'predictlog',
      params: [_page, _size]
    }
  })
}

export function getGoodDate(_dvType, _date) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'goodate',
      params: [_dvType, _date]
    }
  })
}

export function getLuckyNumber(_numCount, _min, _max) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'luckynumber',
      params: [_numCount, _min, _max]
    }
  })
}

export function getDivination(_dvType) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'divination',
      params: [_dvType]
    }
  })
}
