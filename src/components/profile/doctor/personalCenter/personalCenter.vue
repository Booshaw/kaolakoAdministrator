<template>
  <div class="c-profile-wrapper">
    <div class="title">
      <h3 class="text">账户信息</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.basicInformation" :key="index" :lg="5" :xs="11" class="item">
          <router-link exact :to="item.path" tag="div">
            {{item.type}}
          </router-link>
        </i-col>
      </Row>
    </div>
    <div class="title">
      <h3 class="text">服务层级</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.rate" :key="index" :lg="5" :xs="11" class="item">
          <Badge dot>
            <a href="#">{{item.type}} <Icon type="ios-bell-outline" size="24"></Icon></a>
          </Badge>
        </i-col>
      </Row>
    </div>
    <div class="title">
      <h3 class="text">建议与投诉</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.complaint" :key="index" :lg="5" :xs="11" class="item">
          <Badge dot>
            <a href="#">{{item.type}} <Icon type="ios-bell-outline" size="24"></Icon></a>
          </Badge>
        </i-col>
      </Row>
    </div>
    <div class="title">
      <h3 class="text">我的财富</h3>
      <Row>
        <i-col :lg="5" :xs="11" class="item">
          <router-link to="/c/profile" tag="li">
            <span>我的积分</span>
          </router-link>
        </i-col>
      </Row>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      messageList: {
        basicInformation: [
        {
          type: '基本信息',
          value: '',
          path: '/d/profile'
        },
        {
          type: '身份证认证',
          value: '',
          // path: '/d/authenticate'
          path: '#'
        },
        {
          type: '执业认证',
          value: '9',
          // path: '/d/certificate'
          path: '#'
        },
        {
          type: '账户安全',
          value: '',
          // path: '/d/bindsns'
          path: '#'
        }
      ],
      treasure: [
        {
          type: '我的积分',
          value: '20000000'
        }
      ],
      rate: [
        {
          type: '我的评级',
          value: ''
        },
        {
          type: '团队评级',
          value: ''
        }
      ],
      complaint: [
        {
          type: '我的好建议',
          value: '2'
      },
        {
          type: '投诉',
          value: '2'
      }]
      }
    }
  },
  watch: {
    $roue() {
      console.log(this.$roue)
    }
  }
}
</script>
<style lang="stylus">
  .c-profile-wrapper
    margin-top 1rem
    margin-left 2rem
    text-align left
    .title
      margin-bottom 2rem
      .text
        font-size 1rem
        border-bottom 1px solid #eeeeee
        padding-bottom 0.5rem
        margin-bottom 1rem
      .item
        display inline-block
        // padding 2rem
        background #ffffff
        margin-right 0.5rem
        // @media screen and (max-width:420px)
        //   margin 1px
        text-align center
        border-radius 4px
        margin-bottom 1.5rem
        line-height 5rem
        cursor pointer
        &:hover
          box-shadow 0.2rem 0.2rem 0.2rem 0 rgba(7, 17, 27, 0.1)
        &.router-link-active
          color #61dfe1
          border-left 3px solid #61dfe1
</style>
