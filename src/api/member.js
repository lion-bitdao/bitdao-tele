import request from '@/utils/request'

export function getMemberInfo() {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'memberinfo',
      params: []
    }
  })
}

export function getPersonList() {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'personlist',
      params: []
    }
  })
}

export function getPersonInfo(_id) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'personinfo',
      params: [_id]
    }
  })
}

export function personCreate(_type, _nickName, _gender, _date, _time) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'personcreate',
      params: [_type, _nickName, _gender, _date, _time]
    }
  })
}

export function personModify(_personId, _nickName, _gender, _date, _time) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'personmodify',
      params: [_personId, _nickName, _gender, _date, _time]
    }
  })
}

export function personRemove(_personId) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'personremove',
      params: [_personId]
    }
  })
}

export function bindEmail1(_email) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'bindemail1',
      params: [_email]
    }
  })
}

export function bindEmail2(_code) {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'bindemail2',
      params: [_code]
    }
  })
}

export function ActiveTrailVIP() {
  return request({
    url: '/i',
    method: 'post',
    dataType: 'json',
    data: {
      method: 'activetrailvip',
      params: []
    }
  })
}
