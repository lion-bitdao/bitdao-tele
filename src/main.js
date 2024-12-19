import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

import store from './store'
import router from './router'
import './assets/global.css'
import moment from 'moment'

Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('formattimech', function (value) {
  try {
    var _date = moment(value).format('YYYY-MM-DD HH:mm:ss')
    return _date
  } catch {
    return ''
  }
})

Vue.filter('formatdate', function (value) {
  try {
    var _date = moment(value).format('YYYY-MM-DD')
    return _date
  } catch {
    return ''
  }
})

Vue.filter('round', function (value) {
  if (isNaN(value)) {
    return 0
  }
  return Number(value).toFixed(0)
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
