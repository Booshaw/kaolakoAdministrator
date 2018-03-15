<template>
  <div class="login-wrapper">
    <row class="login-content">
      <i-col :lg="16" :md="16" :sm="24" :xs="24" class="left">
        <img class="img-responsive" src="./bg_login.png" alt="xxx">
      </i-col>
      <i-col :lg="8" :md="24" :sm="24" :xs="24" class="right">
        <div class="login">
          <div class="select-login-type">
            <RadioGroup v-model="userType" type="button" size="large">
              <Radio label="家庭用户"></Radio>
              <Radio label="医生用户"></Radio>
            </RadioGroup>
          </div>
          <Form ref="formUser" :rules="rules">
            <FormItem prop="user">
              <i-input type="text" v-model="username" placeholder="用户名"></i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model="password" placeholder="密码"></i-input>
            </FormItem>
            <FormItem>
              <Button type="primary" long @click="login" class="login-btn">登录</Button>
              <!-- <button @click="login" class="login-btn">登录</button> -->
            </FormItem>
          </Form>
          <div>
            <ul class="text">
              <li>忘记密码</li>
              <li>马上注册</li>
            </ul>
          </div>
        </div>
      </i-col>
    </row>
  </div>
</template>
<script>
/* eslint-disable */
import * as types from '../../store/mutations-types'
import { sendLogin } from 'api/login'
export default {
  data() {
    return {
      token: null,
      userType: '家庭用户',
      username: null,
      password: null,
      passUserType: ['家庭用户','医生用户'],
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
      let type = Object.values(this.passUserType).indexOf(this.userType) + 1
      const params = {
      username: this.username,
      password: this.password,
      userType: type
      }
      sendLogin(params).then((res) => {
        // console.log(res.getAllResponseHeaders())
        // console.log(res)
        if (res.data.code === '200') {
          this.token = res.headers.authorization
          // console.log(this.token)
          if (this.token) {
          this.$store.commit(types.LOGIN, this.token)
          this.$store.commit(types.USERTYPE, this.userType)
          let redirectUser = decodeURIComponent(
            this.$route.query.redirect || '/u'
          )
          // let redirectUser = this.$route.query.redirect || '/userInfo'
          let redirectDoctor = decodeURIComponent(
            this.$route.query.redirect || '/d'
          )
          // console.log(`token:${this.token}`)
          if (this.userType === '家庭用户') {
            this.$router.push({
              path: '/u'
            })
          } else {
            this.$router.push({
              path: redirectDoctor
            })
          }
        }
        } else {
        this.$Message.error(`操作失败:${res.data.message}`)
        }
      })
      // if (this.token) {
      //     this.$store.commit(types.LOGIN, this.token)
      //     this.$store.commit(types.USERTYPE, this.userType)
      //     let redirectUser = decodeURIComponent(
      //       this.$route.query.redirect || '/userInfo'
      //     )
      //     // let redirectUser = this.$route.query.redirect || '/userInfo'
      //     let redirectDoctor = decodeURIComponent(
      //       this.$route.query.redirect || '/doctorInfo'
      //     )
      //     console.log(`token:${this.token}`)
      //     if (this.userType === '家庭用户') {
      //       this.$router.push({
      //         path: '/userInfo'
      //       })
      //     } else {
      //       this.$router.push({
      //         path: redirectDoctor
      //       })
      //     }
      //   }
    },
     passType(value) {
       

      },
  }
}
</script>
<style lang="stylus">
.login-wrapper
  position relative
  height 100%
  margin-top 2rem
  .login-content
    position relative
    width 80%
    margin 0 auto
    padding 2rem
    background #ffffff
    @media screen and (max-width: 1200px)
      width 50%
    @media screen and (max-width: 420px)
      width 90%
    .left
      @media screen and (max-width: 1200px)
        display none
      .img-responsive
        display block
        width 100%
        height auto
    .right
      height 100%
      padding 0 1rem
      background #ffffff
      margin 0 auto
      .login
        .select-login-type
          margin-bottom 2rem
          .ivu-radio-wrapper
            font-size 1rem
            padding 0 2rem
        .login-btn
          cursor pointer
        .text
          padding-left 30%
          font-size 0.75rem
          li
            display inline
            margin-left 1rem
        .ivu-btn
          line-height 1.5
          font-size 1rem
    .ivu-input
      height 2.5rem
.tabs-card .ivu-tabs-bar .ivu-tabs-tab
  margin 0
  margin-right 4px
  height 31px
  padding 5px 16px 4px
  // border 1px solid #dddee1
  border-bottom 0
  border-radius 4px 4px 0 0
  -webkit-transition all 0.3s ease-in-out
  transition all 0.3s ease-in-out
  background #ffffff
</style>
