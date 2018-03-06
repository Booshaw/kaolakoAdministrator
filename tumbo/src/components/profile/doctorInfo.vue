<template>
  <div class="d-info-wrapper">
    <div class="header">
      <Row class="header-wrapper">
        <i-col :lg="2" :xs="24">
          <div class="header-img">
            <img src="./avatar.jpg" alt="" height="80px" width="80px">
          </div>
        </i-col>
        <i-col :lg="3" :xs="24">
          <div class="title">
            <h2 class="text">王医生</h2>
            <p>XXX工作室 </p>
          </div>
        </i-col>
        <i-col :lg="16" :xs="24">
          <div class="desc">
            <ul>
              <li>评级:
                <Rate disabled allow-half v-model="starCount"></Rate>
              </li>
              <li>会员:{{patient}}人</li>
            </ul>
          </div>
        </i-col>
      </Row>
    </div>
    <div class="content-wrapper">
      <Row>
        <i-col :lg="4" :xs="3">
          <div class="left">
            <router-link exact  to="/doctorInfo/d" tag="li">
              <span class="text">最新提示</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link>
            <router-link exact  to="/" tag="li">
              <span class="text">我的团队</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link>
            <router-link exact  to="/" tag="li">
              <span class="text">诊疗智库</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link>
             <router-link exact  to="/" tag="li">
              <span class="text">会员列表</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link> <router-link exact  to="/" tag="li">
              <span class="text">随访统计</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link> <router-link exact  to="/" tag="li">
              <span class="text">健康报告</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link> <router-link exact  to="/" tag="li">
              <span class="text">个人中心</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-setup"></use>
              </svg>
            </router-link>
          </div>
        </i-col>
        <i-col :lg="20" :xs="21">
          <div class="right">
            <router-view></router-view>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      starCount: 4,
      patient: 200
    }
  }
}
</script>
<style lang="stylus">
.d-info-wrapper
  font-size 1rem
  background #f2f2f2
  .header
    padding 1rem
    background-color #5FC3E4
    background-image linear-gradient(160deg, #E55D87, #5FC3E4)
    .header-wrapper
      width 80%
      margin 0 auto
      @media screen and (max-width:420px)
        width 100%
    .header-img
      img
        border 4px solid #f2f6fc
        border-radius 50%
    .title
      color #ffffff
      text-align center
      line-height 1rem
      margin-top 1rem
      .text
        font-size 1.5rem
        font-weight 700
        margin-bottom 1rem
      p
       font-size 0.8rem
       margin-bottom 1rem
    .desc
      color #ffffff
      font-size 1rem
      li
        display inline-block
        margin 2rem
        @media screen and (max-width:420px)
          margin 1rem
  .content-wrapper
    // position relative
    width 80%
    margin 1rem auto
    @media screen and (max-width:1024px)
      width 100%
      padding 1rem
    .left
      // width 6.875rem
      padding 1rem 0
      @media screen and (max-width:420px)
        left -6.875rem
      li
        line-height 1rem
        cursor pointer
        margin-bottom 1.5rem
        &:hover
          color #61dfe1
        &.router-link-active
          color #61dfe1
          border-left 3px solid #61dfe1
        .text
          @media screen and (max-width:420px)
            display none
      .icon
        width 1.5em
        height 1.5em
        vertical-align -0.4em
        fill currentColor
        overflow hidden
        cursor pointer
        // color #61dfe1
    .right
      margin 0 auto
</style>