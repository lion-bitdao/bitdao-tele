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

export function postPickDate(_matter, _date) {
  return request({
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'pickdate',
      params: [_matter, _date]
    }
  })
}

export function postLuckyNumber(_num, _min, _max) {
  return request({
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'luckynumber',
      params: [_num, _min, _max]
    }
  })
}

export function postXiao6Ren(_matter) {
  return request({
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'xiao6ren',
      params: [_matter]
    }
  })
}
