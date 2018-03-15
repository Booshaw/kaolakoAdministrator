<template>
  <div class="regin-wrapper">
    <row class="regin-content">
      <i-col :lg="16" :md="16" :sm="24" :xs="24" class="left">
        <img class="img-responsive" src="./bg_regin.png" alt="xxx">
      </i-col>
      <i-col :lg="8" :md="24" :sm="24" :xs="24" class="right">
        <div class="regin">
          <div class="select-regin-type">
            <RadioGroup v-model="userType" type="button" size="large">
              <Radio label="家庭用户"></Radio>
              <Radio label="医生用户"></Radio>
            </RadioGroup>
          </div>
          <div class="form">
            <Form ref="formRegist" :model="formRegist" :rules="ruleRegist">
              <FormItem prop="phone">
                <i-input type="text" v-model="formRegist.phone" placeholder="请输入手机号"></i-input>
              </FormItem>
              <!-- <FormItem prop="verifyImgCode">
                <i-input type="text" v-model="formRegist.verifyImgCode" placeholder="请输入验证码"><div slot="append"><img src="./verify_img.png" alt="图形验证码"><span>换一张</span></div></i-input>
              </FormItem> -->
              <!-- <FormItem prop="verifyPhoneCode" class="verfy-code">
                <i-input type="text" v-model="formRegist.verifyPhoneCode" placeholder="请输入短信验证码">
                <div slot="append" @click.prevent="getVerifyPhoneCode" v-if="!computedTime" :class="{getverify:rightPhoneNumber}">获取验证码</div>
                <div slot="append" @click.prevent v-if="computedTime">已发送{{computedTime}}</div></i-input>
              </FormItem> -->
              <FormItem prop="passwd">
                <i-input type="password" v-model="formRegist.passwd" placeholder="请输入密码"></i-input>
              </FormItem>
              <FormItem prop="passwdCheck">
                <i-input type="password" v-model="formRegist.passwdCheck" placeholder="请确认密码"></i-input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit">注册</Button>
              </FormItem>
            </Form>
          </div>
          <div>
            <ul>
              <router-link to="/login" class="to-login">已有账号,马上登录</router-link>
            </ul>
          </div>
        </div>
      </i-col>
    </row>
  </div>
</template>
<script>
import * as types from '../../store/mutations-types'
import { regist } from 'api/regist'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formRegist.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formRegist.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码确认'))
      } else if (value !== this.formRegist.passwd) {
        callback(new Error('两次输入的密码不匹配'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不可以为空'))
      }
    }

    return {
      token: null,
      userType: '家庭用户',
      passUserType: ['家庭用户', '医生用户'],
      formRegist: {
        passwd: '', // 密码
        passwdCheck: '', // 密码确认
        phone: '' // 手机号码
      },
      verifyImgCode: '', // 图形验证码
      verifyPhoneCode: '', // 手机短信验证码
      computedTime: 0, // 倒数计时
      ruleRegist: {
        passwd: [{ validator: validatePass, trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
        // verifyImgCode: [{ required: true, message: '请输入图片中的验证码', trigger: 'blur' }],
        // verifyPhoneCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    rightPhoneNumber() {
      return /^1\d{10}$/gi.test(this.formRegist.phone)
    }
  },
  methods: {
    handleSubmit() {
        let type = Object.values(this.passUserType).indexOf(this.userType) + 1
        let params = {
          cellPhone: this.formRegist.phone,
          password: this.formRegist.passwd,
          userType: type
        }
        regist(params).then(res => {
          if (res.data.code === '200') {
            this.token = res.headers.authorization
            if (this.token) {
            this.$store.commit(types.LOGIN, this.token)
            this.$store.commit(types.USERTYPE, this.userType)
            // let redirectUser = decodeURIComponent(
            //   this.$route.query.redirect || '/u'
            // )
            // let redirectUser = this.$route.query.redirect || '/userInfo'
            let redirectDoctor = decodeURIComponent(
              this.$route.query.redirect || '/d'
            )
            console.log(`token:${this.token}`)
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
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="stylus">
.regin-wrapper
  position relative
  height 100%
  margin-top 2rem
  .regin-content
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
      .regin
        .select-regin-type
          margin-bottom 2rem
          .ivu-radio-wrapper
            font-size 1rem
            padding 0 1.5rem
        .form
          .verfy-code
            button
              padding 0.5rem
              // border none
            .getverify
              background #61dfe1
              color #ffffff
              padding 0.5rem
              border-radius 4px
        .to-login
          font-size 0.625rem
          color #999999
        .ivu-form-item
          margin-bottom 18px
        .ivu-i-input-group-append
          padding 0 8px
        .ivu-btn
          line-height 1.5
          font-size 1rem
    .ivu-i-input
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
