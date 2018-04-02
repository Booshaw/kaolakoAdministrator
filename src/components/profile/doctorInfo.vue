<template>
  <div class="d-info-wrapper">
    <div class="header">
      <Row class="header-wrapper">
        <i-col :lg="2" :xs="24">
          <div class="header-img">
            <img v-lazy="profileInfo.avatar" alt="" height="80px" width="80px">
          </div>
        </i-col>
        <i-col :lg="3" :xs="24">
          <div class="d-title">
            <h2 class="text">{{profileInfo.realName}}</h2>
            <p class="d-specal">{{profileInfo.speciality}} </p>
          </div>
        </i-col>
        <i-col :lg="16" :xs="24">
          <div class="desc">
            <ul>
              <li>评级:
                <Rate disabled allow-half v-model="profileInfo.score"></Rate>
              </li>
              <li>会员:{{profileInfo.vipCount}}人</li>
            </ul>
          </div>
        </i-col>
      </Row>
    </div>
    <div class="content-wrapper">
      <div class="top">
        <router-link exact  to="/d/p" tag="li">
          <span class="text">通知</span>
        </router-link>
        <router-link exact  to="/d/t" tag="li">
          <span class="text">团队</span>
        </router-link>
        <li>
          <span class="text">智库</span>
        </li>
        <router-link exact  to="/d/m" tag="li">
          <span class="text">会员</span>
        </router-link>
        <router-link exact  to="/d/f" tag="li">
          <span class="text">随访</span>
        </router-link>
        <router-link exact  to="/d/patient" tag="li">
          <span class="text">患者</span>
        </router-link>
        <router-link to="/d/c" tag="li">
          <span class="text">个人</span>
        </router-link>
      </div>
      <div class="line"></div>
      <div class="bt">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import {getDoctorInformation} from 'api/getData'
export default {
  data () {
    return {
      starCount: 4,
      patient: 200,
      profileInfo: {}
    }
  },
  created() {
    this._getDoctorProfile()
  },
  methods: {
    _getDoctorProfile() {
      getDoctorInformation().then(res => {
        this.profileInfo = res.data
        console.log(this.profileInfo)
      })
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
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
    .d-title
      color #ffffff
      text-align center
      line-height 1rem
      margin-top 1rem
      .text
        font-size 1.5rem
        font-weight 700
        margin-bottom 1rem
      .d-specal
        font-size 0.8rem
        margin-bottom 1rem
        font-size 0.875rem
        line-height 1.2rem
        text-align center
        no-wrap(2,1.2rem)
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
    width 70%
    margin 2rem auto
    @media screen and (max-width:1024px)
      width 100%
      padding 1rem
    .top
      // width 6.875rem
      padding 1rem 0
      border-bottom 2px solid #61dfe1
      margin-bottom 2rem
      li
        display inline-block
        line-height 1rem
        cursor pointer
        margin 0 1rem
        padding 0
        &:hover
          color #61dfe1
        &.router-link-active
          color #61dfe1
          // border-bottom 3px solid #61dfe1
        @media screen and (max-width:420px)
          margin 0 0.5rem
      .icon
        width 1.5em
        height 1.5em
        vertical-align -0.4em
        fill currentColor
        overflow hidden
        cursor pointer
        // color #61dfe1
    .bt
      margin 0 auto
</style>