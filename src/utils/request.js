import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000, // request timeout
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json;charset=utf-8' }
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    var _token = getToken()
    if (_token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + _token
    } else {
      if (store.state.token || window.localStorage.getItem('TOKEN')) {
        config.headers['Authorization'] = store.state.token || window.localStorage.getItem('TOKEN')
      }
    }
    if (store.state.uid || window.localStorage.getItem('UID')) {
      config.params = {
        user_id: store.state.uid || window.localStorage.getItem('UID')
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    try {
      if (res.base_resp !== undefined && res.base_resp !== null && res.base_resp.status_code === 19001) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
          next(`/login?redirect=${to.path}`)
        })
        return
      } else if (res.base_resp !== undefined && res.base_resp !== null && res.base_resp.status_code !== 0) {
        return Promise.reject(res.base_resp.status_msg)
      }
    } catch (e) {
      console.log(e)
    }
    return Promise.resolve(res)
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
