import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/mutations-types'
import HomePage from 'components/homePage/homePage'
import ArticleRender from 'components/article/render'
import Edit from 'components/article/edit'
import ArticleCategory from 'components/category/articleCategory'
import CourseCategory from 'components/category/courseCategory'
import Publish from 'components/article/publish'
import CreateCourse from 'components/course/create'
import User from 'components/user/user'
import Identification from 'components/user/identification'
import IdentificationDetail from 'components/user/identificationDetail'
import Course from 'components/course/courses'
import CourseDetail from 'components/course/courseDetail'
import Login from 'components/login/login'
import Error404 from 'components/error/404'
Vue.use(Router)
const routes = [{
    name: '/',
    path: '/',
    component: HomePage,
    meta: {
      title: '首页',
      keepAlive: true
      // requireAuth: true
    },
    redirect: '/article',
    children: [{
        name: 'articleRender',
        path: 'article',
        component: ArticleRender,
        meta: {
          title: '文章管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'articleEdit',
        path: 'edit',
        component: Edit,
        meta: {
          title: '文章编辑',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'createArticle',
        path: 'publish',
        component: Publish,
        meta: {
          title: '创建文章',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'articleCategory',
        path: 'articleCategory',
        component: ArticleCategory,
        meta: {
          title: '文章分类管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'courseCategory',
        path: 'courseCategory',
        component: CourseCategory,
        meta: {
          title: '课程分类管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'Course',
        path: 'course',
        component: Course,
        meta: {
          title: '课程管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'createCourse',
        path: 'createCourse',
        component: CreateCourse,
        meta: {
          title: '发布课程',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'courseDetail',
        path: 'courseDetail',
        component: CourseDetail,
        meta: {
          title: '课程详情',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'user',
        path: 'user',
        component: User,
        meta: {
          title: '用户管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'identification',
        path: 'identification',
        component: Identification,
        meta: {
          title: '认证管理',
          keepAlive: true
          // requireAuth: true
        }
      },
      {
        name: 'identificationDetail',
        path: 'identificationDetail',
        component: IdentificationDetail,
        meta: {
          title: '认证详情',
          keepAlive: true
          // requireAuth: true
        }
      }
    ]
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
