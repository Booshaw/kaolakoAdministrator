import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as types from '../store/mutations-types'
import HomePage from 'components/homePage/homePage'
import Login from 'components/login/login'
import UserInfo from 'components/profile/userInfo'
import DoctorInfo from 'components/profile/doctorInfo'
import Regin from 'components/regist/regist'
import Team from 'components/team/team'
import Service from 'components/service/service'
import Evaluate from 'components/evaluate/evaluate'
import Kb from 'components/kb/kb'
import Articles from 'components/articles/articles'
import PreventDisease from 'components/articles/preventDisease/preventDisease'
import Treatment from 'components/articles/treatment/treatment'
import ArticleDetail from 'base/articleDetail/articleDetail'
import ProfileUserInfo from 'components/profile/user/profileUserInfo'
import ProfileDoctor from 'components/profile/doctor/profileDoctor/profileDoctor'
import personalCenter from 'components/profile/doctor/personalCenter/personalCenter'
import BasicProfile from 'components/profile/doctor/personalCenter/profile/profile'
import TeamGroup from 'components/profile/doctor/team/team'

Vue.use(Router)
const routes = [
{
    name: '/',
    path: '/',
    component: HomePage,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/service',
    name: 'service',
    component: Service
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: Evaluate
  },
  {
    path: '/kb',
    name: 'kb',
    component: Kb
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles,
    children: [
      // {
      //   path: '/',
      //   component: PreventDisease
      //   // redirect: '/articles/prevent_disease'
      // },
      {
        path: 'prevent_disease',
        name: 'prevent_disease',
        component: PreventDisease
        // children: [
        //   {
        //     path: ':id',
        //     component: ArticleDetail
        //   }
        // ]
      },
      {
        path: 'treatment',
        name: 'treatment',
        component: Treatment
        // children: [
        //   {
        //     path: ':id',
        //     component: ArticleDetail
        //   }
        // ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regin
  },
  {
    name: 'userInfo',
    path: '/u',
    component: UserInfo,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'doctorInfo', // 医生个人中心首页
    path: '/d',
    component: DoctorInfo,
    redirect: '/d/p', // 默认跳转到最新提示
    meta: {
      requireAuth: true
    },
    children: [{
      name: 'ProfileDoctor', // 医生端最新提示页,即默认页
      path: 'p',
      component: ProfileDoctor,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'teamDoctor', // 医生端我的团队页
      path: 't',
      component: TeamGroup,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'personalCenter', // 医生端个人中心页
      path: 'c',
      component: personalCenter,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'profile', // 个人中心的基本信息
      path: 'profile',
      component: BasicProfile,
      meta: {
        requireAuth: true
      }
    }
  ]
  },
  {
    name: 'profileUserInfo',
    path: '/u/p',
    component: ProfileUserInfo,
    meta: {
      requireAuth: true
    }
  },
  // 测试路由
  {
    name: 'articleDetail',
    path: '/a',
    component: ArticleDetail
  }
]
// 页面刷新时,重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
if (window.localStorage.getItem('usertype')) {
  store.commit(types.USERTYPE, window.localStorage.getItem('usertype'))
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
