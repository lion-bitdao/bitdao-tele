import request from '@/utils/request'

export function getDailyForcast() {
  return request({
    url: '/m',
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
    url: '/m',
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
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'pickdate',
      params: [_dvType, _date]
    }
  })
}

export function getLuckyNumber(_numCount, _min, _max) {
  return request({
    url: '/m',
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
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'xiao6ren',
      params: [_dvType]
    }
  })
}
