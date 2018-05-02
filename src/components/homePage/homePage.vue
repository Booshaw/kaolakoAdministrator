<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="90" v-model="isCollapsed">
          <i-menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                <span>内容管理</span>
              </template>
              <MenuItem name="1-1">
                <router-link to="/article" tag="li" class="nav-item">
                  <Icon type="pricetags"></Icon>
                  <span>文章管理</span>
                </router-link>
              </MenuItem>
              <MenuItem name="1-2">
                <router-link to="/course" tag="li" class="nav-item">
                  <Icon type="social-youtube"></Icon>
                  <span>课程管理</span>
                </router-link>
              </MenuItem>
            </Submenu>
             <Submenu name="2">
              <template slot="title">
                <Icon type="folder"></Icon>
                <span>分类管理</span>
              </template>
              <MenuItem name="2-1">
                <router-link to="/articleCategory" tag="li" class="nav-item">
                  <Icon type="ios-pricetags"></Icon>
                  <span>文章分类</span>
                </router-link>
              </MenuItem>
              <MenuItem name="2-2">
                <router-link to="/courseCategory" tag="li" class="nav-item">
                  <Icon type="ios-videocam"></Icon>
                  <span>课程分类</span>
                </router-link>
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                  <Icon type="person-stalker"></Icon>
                  <span>用户管理</span>
              </template>
              <MenuItem name="3-1">
                <Icon type="person"></Icon>
                <router-link to="/user" tag="li" class="nav-item"> <span>用户管理</span> </router-link>
              </MenuItem>
              <MenuItem name="3-2">
                <Icon type="ios-camera"></Icon>
                <router-link to="/identification" tag="li" class="nav-item"> <span>认证管理</span> </router-link>
              </MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                  <Icon type="social-html5"></Icon>
                  <span>网页配置</span>
              </template>
              <MenuItem name="4-1">
                <Icon type="android-image"></Icon>
                <router-link to="/" tag="li" class="nav-item"> <span>轮播配置</span> </router-link>
              </MenuItem>
              <MenuItem name="4-2">
                <Icon type="android-contact"></Icon>
                <router-link to="/" tag="li" class="nav-item"> <span>名师推荐</span> </router-link>
              </MenuItem>
              <MenuItem name="4-3">
                <Icon type="ios-paw"></Icon>
                <router-link to="/" tag="li" class="nav-item"> <span>微二维码</span> </router-link>
              </MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="social-google"></Icon>
                <span>SEO</span>
              </template>
              <MenuItem name="5-1">
                <Icon type="android-compass"></Icon>
                <router-link to="/" tag="li" class="nav-item"> <span>全局设置</span> </router-link>
              </MenuItem>
            </Submenu>
          </i-menu>
      </Sider>
      <Layout>
          <Header :style="{padding: 0}" class="layout-header-bar">
              <Icon @click.native="collapsedSider" :class="rotateIcon" class="nav-icon" type="navicon-round" size="24"></Icon>
              <span class="title">Administrator</span>
              <span class="logout" @click="logOut">退出</span>
          </Header>
          <Content class="content-wrapper">
            <div class="main">
              <router-view></router-view>
            </div>
          </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import * as types from '../../store/mutations-types'
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    logOut() {
      this.$store.commit(types.LOGOUT)
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="stylus">
.layout
  border 1px solid #d7dde4
  background #f5f7f9
  position relative
  border-radius 4px
  overflow hidden
  height 100%
  .ivu-layout
    height 100%
  .nav-item
    display inline-block
    padding 12px 48px
    margin -12px -48px
  .layout-header-bar
    background #fff
    box-shadow 0 1px 1px rgba(0, 0, 0, 0.1)
    .nav-icon
      float left
      margin 10px
    .title
      font-size 36px
      text-align center
      font-weight 700
      color #2d8cf0
    .logout
      margin-left 24px
  .content-wrapper
    display flex
    flex-direction column
    height 100%
    .main
      flex 1
      margin 32px auto
      width 90%
  .layout-logo-left
    width 90%
    height 30px
    background #5b6270
    border-radius 3px
    margin 15px auto
  .menu-icon
    transition all 0.3s
  .rotate-icon
    transform rotate(-90deg)
  .menu-item
    span
      display inline-block
      overflow hidden
      width 69px
      text-overflow ellipsis
      white-space nowrap
      vertical-align bottom
      transition width 0.2s ease 0.2s
  .menu-item
    i
      transform translateX(0px)
      transition font-size 0.2s ease, transform 0.2s ease
      vertical-align middle
      font-size 16px
  .collapsed-menu
    span
      width 0px
      transition width 0.2s ease
  .collapsed-menu
    i
      transform translateX(5px)
      transition font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s
      vertical-align middle
      font-size 14px
</style>