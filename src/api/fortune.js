import request from '@/utils/request'

export function getCalender1(_date) {
  var _timezone = 0 - new Date().getTimezoneOffset() / 60
  return request({
    url: '/m',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'calender1',
      params: [_date, _timezone]
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
