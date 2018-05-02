<template>
  <div class="login-wrapper">
    <div class="main">
      <div class="login-wrapper">
        <div class="input">
          <h1>Administrator</h1>
        </div>
        <div class="input">
          <i-input v-model="username" placeholder="用户名" ></i-input>
        </div>
        <div class="input">
          <i-input v-model="password" placeholder="密码" type="password"></i-input>
         </div>
        <div class="input">
          <Button type="primary" size="large" @click.stop="login">Sign in</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import * as types from '../../store/mutations-types'
import { sendLogin } from 'api/login'
export default {
  data() {
    return {
      token: '已登录',
      username: null,
      password: null,
      rules: {
        // user: [
        //   {
        //     required: true,
        //     message: '请输入账号',
        //     trigger: 'blur'
        //   }
        // ]
        // password: [
        //   {
        //     required: true,
        //     message: '请输入密码.',
        //     trigger: 'blur'
        //   },
        //   {
        //     type: 'string',
        //     min: 6,
        //     message: '密码不得少于6位',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  mounted() {
    this.$store.commit(types.TITLE, 'Login')
  },
  methods: {
    login() {
      const params = {
      username: this.username,
      password: this.password,
      }
      sendLogin(params).then((res) => {
        // console.log(res.getAllResponseHeaders())
        // console.log(res)
        if (res.data.code === '200') {
          // this.token = res.headers.Cookie
          this.$router.push({
            path: '/'
          })
        } else {
        this.$Message.error(`ERROR${res.data.message}`)
        }
      })
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
.login-wrapper
  text-align center
  height 100%
  .main
    position relative
    background #495060 url('/static/about.png') no-repeat bottom
    height 100%
    width 100%
    .login-wrapper
      position absolute
      top 40%
      left 50%
      transform translate(-50%, -40%)
      width 25%
      height 400px
      margin 48px auto
      // background #ffffff
      // border-radius 8px
      // box-shadow 0 2px 4px rgba(7,17,27,0.1)
      // padding 32px
      text-align center
      color #ffffff
      .input
        margin 32px auto
        h1
          font-size 32px
          color #ffffff
  .ivu-form .ivu-form-item-label
    color #ffffff
  .ivu-input
    color #ffffff
    background transparent
    height 48px
</style>
