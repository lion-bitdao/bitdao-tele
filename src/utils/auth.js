import Cookies from 'js-cookie'

const TokenKey = 'DAO-Token'
const UidKey = 'DAO-UID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUid() {
  return Cookies.get(UidKey)
}

export function setUid(uid) {
  return Cookies.set(UidKey, uid)
}
