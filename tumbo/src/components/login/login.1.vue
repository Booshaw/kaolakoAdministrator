<template>
  <div class="login-wrapper">
    <row class="login-content">
      <i-col :lg="16" :md="16" :sm="24" :xs="24" class="left">
        <img class="img-responsive" src="./bg.png" alt="xxx">
      </i-col>
      <i-col :lg="7" :md="7" :xs="24" class="right">
        <div class="login">
          <Tabs type="card">
            <TabPane label="家庭用户">
              <Form ref="formUser" :model="formUser" :rules="rules" class="form">
                <FormItem>
                  <Input type="text" v-model="formUser.userName" placeholder="用户名">
                      <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
                  </Input>
                </FormItem>
                <FormItem>
                  <Input type="password" v-model="formUser.password" placeholder="密码">
                      <!-- <Icon type="ios-locked-outline" slot="prepend"></Icon> -->
                  </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary">登录</Button>
                </FormItem>
              </Form>
            </TabPane>
              <TabPane label="医生用户">
                医生用户
              </TabPane>
          </Tabs>
        </div>
      </i-col>
    </row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formUser: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>
<style lang="stylus">
.login-wrapper
  position relative
  height 100%
  margin-top 5rem
  .login-content
    position relative
    width 80%
    margin 0 auto
    padding 2rem
    background #ffffff
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
        .form
          width 90%
          margin 0 auto
        .ivu-tabs-tab
          border none
          margin-right 0
          background #ffffff
        .ivu-tabs-nav-container
          // height 2.2rem
          font-size 1.25rem
          margin-bottom 0.5rem

.tabs-card .ivu-tabs-bar .ivu-tabs-tab 
  margin 0
  margin-right: 4px
  height 31px
  padding 5px 16px 4px
  // border 1px solid #dddee1
  border-bottom 0
  border-radius 4px 4px 0 0
  -webkit-transition all .3s ease-in-out
  transition all .3s ease-in-out
  background #ffffff
</style>
