import Vue from 'vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'

// flexible
import 'lib-flexible/flexible'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
