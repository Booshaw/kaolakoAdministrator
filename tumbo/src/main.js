import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'common/js/iconfont'
import 'iview/dist/styles/iview.css'
import 'common/stylus/index.styl'
import axios from './utils/request'
import fastclick from 'fastclick'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})