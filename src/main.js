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
import * as filters from './utils/filter'
import VueLazyLoad from 'vue-lazyload'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/img/default.png'),
  error: require('common/img/default.png')
})
Vue.use(iView)
/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Object.keys(filters).forEach((key) => { // 全局注册过滤器
  Vue.filter(key, filters[key])
})