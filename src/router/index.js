import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/mutations-types'
import HomePage from 'components/homePage/homePage'
import Login from 'components/login/login'

import Error404 from 'components/error/404'
Vue.use(Router)
const routes = [
  {
    name: '/',
    path: '/',
    component: HomePage,
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    name: 'error',
    path: '*',
    component: Error404
  }
]
// 页面刷新时,重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
const router = new Router({
  // linkActiveClass: 'active',
  routes,
  base: '/dist/'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
