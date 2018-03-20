<template>
  <div class="team-info-wrapper">
    <div class="t-info-header-wrapper">
      <img class="avatar" v-lazy="doctorDetail.avatar" alt="JIAHUAN">
      <p class="name">{{doctorDetail.realName}}</p>
      <p class="title"> <span>{{doctorDetail.title}}</span> <span>{{doctorDetail.profession}}</span> <span>{{doctorDetail.degree}}</span> </p>
      <p class="intro">{{doctorDetail.introduction}}</p>
      <p class="intro">{{doctorDetail.speciality}}</p>
      <div class="t-score">
        <ul>
          <li>
            <p class="score">{{doctorDetail.score}}</p>
            <p class="text">响应速度</p>
          </li>
          <li>
            <p class="score">{{0}}</p>
            <p class="text">服务态度</p>
          </li>
            <li>
            <p class="score">{{0}}</p>
            <p class="text">专业程度</p>
          </li>
        </ul>
      </div>
      <Button type="ghost" shape="circle" class="back" @click.stop="back()">返回团队</Button>
    </div>
  </div>
</template>
<script>
import {getDoctorInformation} from 'api/getData'
/* eslint-disable */
export default {
  data() {
    return {
      doctorDetail: {
        // avatar: '',
        // realName: '王麻子',
        // speciality: '擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长擅长',
        // title: '主任医师',
        // introduction: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介,简介简介简介简介简介简介简介简介,.简介简介简介简介简介简介简介简介',
        // score: '0',
        // profession: '科室',
        // degree: '博士'
      }
    }
  },
  mounted() {
    this._getDoctorProfile()
  },
  methods: {
    back() {
      this.$router.back()
    },
    _getDoctorProfile() {
      let id = this.$route.query.id
      let params = {
        id: id
      }
      getDoctorInformation(params).then(res => {
        this.doctorDetail = res.data
        // console.log(this.profileInfo)
      })
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.team-info-wrapper
  width 100%
  margin 0 auto
  .t-info-header-wrapper
    height 40rem
    background url('./team_bg.png') center
    background-repeat no-repeat
    background-size cover
    padding 2rem
    .avatar
      width 6.25rem
      height 6.25rem
      border-radius 50%
      border 3px solid #ffffff
      margin-top 1rem auto
    .name
      font-size 1.5rem
      margin 1rem
      font-weight 700
      color #ffffff
      line-height 1.5rem
    .intro
      width 60%
      @media screen and (max-width: 420px)
        width 100%
      margin 0 auto
      padding 1rem
      font-size 1rem
      line-height 1.5rem
      // text-indent 2rem
      overflow hidden
      color #ffffff
      text-align center
    .title
      font-size 0.875rem
      margin-top 0.4rem
      // font-weight 200
      color #ffffff
      line-height 1.5rem
      span
        display inline-block
        margin 0 0.5rem
    .t-score
      position relative
      margin 1rem auto 1.5rem
      font-size 1rem
      line-height 1.5rem
      li
        color #ffffff
        margin 0 1rem
        display inline-block
        .score
          margin-bottom 0.5rem
          font-size 1.5rem
          line-height 1.5rem
        .text
          font-size 0.875rem
          color rgba(255,255,255,0.6)
    .back
      color #ffffff
</style>
