<template>
  <div class="j-nav-wrapper">
    <div class="j-nav" ref="menuButton" @click="toggleNavMobile">
      <row>
        <i-col span="20" class="title-wrapper">
          <span class="logo-mobile">JAHUAN</span>
        </i-col>
        <i-col span="4">
          <svg class="icon-toggle">
            <use xlink:href="#icon-other"></use>
          </svg>
        </i-col>
      </row>
    </div>
    <transition name="slide">
      <div class="nav-items" v-show="toggleNav" ref="toggle">
        <ul class="ul-wrapper">
          <router-link class="logo border-1px" to="/" tag="li" @click.native="hiddenNav">KAOLAKO</router-link>
          <router-link class="border-1px" to="/" exact tag="li" @click.native="hiddenNav">首页</router-link>
          <router-link class="login border-1px" to="/login" tag="li" @click.native="toInfoPage">
          <span v-if="!token">登录</span>
          <svg class="j-icon" aria-hidden="true" v-if="token">
            <use xlink:href="#icon-mine"></use>
          </svg>
          </router-link>
          <router-link class="regin border-1px" to="/regist" tag="li" @click.native="hiddenNav" v-if="!token">注册</router-link>
          <li @click="logout" v-if="token">退出</li>
        </ul>
      </div>
  </transition>
  </div>
</template>
<script>
import * as types from '../../store/mutations-types'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      toggleNav: false
    }
  },
  props: ['isLgin'],
  mounted() {
    this.show()
    // this.toInfoPage()
  },
  computed: mapState({
    token: state => state.token,
    title: state => state.title
  }),
  methods: {
    toInfoPage() {
      let token = window.localStorage.getItem('token')
      if (token) {
        this.isLogin = true
        this.$router.push({
          path: '/',
          activeClass: 'router-link-active'
        })
      } else {
        this.isLogin = false
        this.$router.push({
          path: '/login'
        })
      }
      // console.log(`${usertype} 获取本地存储的用户类型`)
      console.log(`${token} 本地token`)
      this.hiddenNav()
    },
    logout() {
      console.log('退出登录')
      this.$store.commit(types.LOGOUT)
      this.$router.push({
        path: '/login'
      })
    },
    hiddenNav() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      if (width < 1200) {
        this.toggleNav = false
      }
    },
    toggleNavMobile() {
      this.toggleNav = !this.toggleNav
    },
    show() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      console.log(width)
      if (width >= 1200) {
        this.toggleNav = true
      }
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.j-nav-wrapper
  position fixed
  z-index 100
  // fixed top
  top 0
  width 100%
  margin 0 auto
  height 3.75rem
  color #5a5366
  padding 1rem 0
  background-color #ffffff
  box-shadow 0.2rem 0.2rem 0.2rem 0 rgba(7, 17, 27, 0.1)
  @media screen and (max-width: 1200px)
    padding-top 1rem
  .j-nav
    // position absolute
    display none
    // height 3rem
    @media screen and (max-width: 1200px)
      display block
    .logo-mobile
      font-size 2rem
      color #61dfe1
    .icon-toggle
      width 2rem
      height 2rem
      // vertical-align -0.6rem
      color #61dfe1
      fill currentColor
      // overflow hidden
      // display block
      @media screen and (max-width: 1200px)
        display block
        // margin-top 0.5rem
  .nav-items
    // background-color #61dfe1
    @media screen and (max-width: 1200px)
      background-color #ffffff
      // top 2rem
    .ul-wrapper
      width 80%
      margin 0 auto
      display flex
      align-items center
      @media screen and (max-width: 1500px)
        width 95%
      @media screen and (max-width: 1200px)
        width 100%
        margin 0 auto
        display block
      li
        display inline-block
        margin-top 0
        padding-right 2.5rem
        font-size 1rem
        color #5a5e66
        line-height 1rem
        cursor pointer
        @media screen and (max-width: 1200px)
          display block
          text-align center
          background-color #ffffff
          color #999999
          // border-bottom 1px solid #eeeeee
          border-bottom-1px #eeeeee
          padding 1rem
        &.router-link-active
          color #61dfe1
      .logo
        padding-left 5rem
        padding-right 10rem
        color #61dfe1
        font-size 2rem
        background-color #ffffff
        // float left
        @media screen and (max-width: 1200px)
          display none
      .login
        margin-left 5rem
        @media screen and (max-width: 1300px)
          margin-left 3rem
        @media screen and (max-width: 1200px)
          margin-left 0
        .j-icon
          width 2rem
          height 2rem
          // vertical-align -0.6rem
          color #61dfe1
          fill currentColor
          // overflow hidden
      .regin
        @media screen and (max-width: 1200px)
          margin-left 0
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
