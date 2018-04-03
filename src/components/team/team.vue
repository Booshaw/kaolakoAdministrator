<template>
  <div class="team-wrapper">
    <jnav></jnav>
    <div class="head">
      <img src="./team_bg.png" alt="健管理团队">
      <div class="text-wrapper">
        <span class="text">健管团队</span>
        <span class="dot">一</span>
      </div>
    </div>
    <div class="team-content">
      <!--search-->
      <div class="search">
        <Form ref="formUser" :model="formSearch" inline>
          <FormItem>
            <Cascader :data="city" v-model="formSearch.selectCity" size="small" filterable placeholder="选择所在地"></Cascader>
          </FormItem>
          <FormItem>
            <Select v-model="formSearch.adept" placeholder="选择主治" size="small">
                <Option value="wangyisheng">王医生</Option>
                <Option value="lidaoshi">李大师</Option>
                <Option value="taylor">泰勒</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Select v-model="formSearch.rating" placeholder="评级" size="small">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
            </Select>
        </FormItem>
        <Button type="info" shape="circle" icon="ios-search" size="small" @click="search">搜索</Button>
        </Form>
      </div>
       <!--team-->
      <div class="j-team">
        <ul>
          <li v-for="(i, index1) in teamList" :key="index1">
            <div class="j-team-item">
              <img v-lazy="i.teamImage" alt="">
              <p class="leader">首席专家:{{i.teamLeader}}</p>
              <p class="intro">{{i.teamDesc}}</p>
            </div>
          </li>
        </ul>
      </div>
       <!--page-->
      <div class="page-nav" v-show="teamList">
        <Page :total="100" size="small" show-total  @on-change="change"></Page>
      </div>
    </div>
    <jfooter></jfooter>
  </div>
</template>
<script>
import Jnav from 'components/nav/nav'
import Jfooter from 'base/footer/footer'
/* eslint-disable */
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      teamList: [], // team页列表数据
      formSearch: { // 查询表单数据
        selectCity: [], // 选择的城市
        adept: '', // 擅长的主治方向
        rating: '' // 健管团队的评分
      },
      city: [ // 城市列表
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园'
                },
                {
                  value: 'shizilin',
                  label: '狮子林'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this._getTeamList() // 执行获取team页数据
  },
  methods: {
    _getTeamList() { // 获取/team页数据
      getIndex().then(res => {
        this.teamList = res.data.teamlist
      })
    },
    change(page) { // 分页插件获取点击page页码
      console.log(page)
    },
    search() {
      console.log(this.formSearch)
    }
  },
  components: {
    Jnav,
    Jfooter
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.team-wrapper
  position relative
  width 100%
  background #f2f2f2
  margin-top 3.75rem
  .head
    position relative
    img
      display block
      width 100%
      height auto
    .text-wrapper
      // position fixed
      // top 50%
      // left 50%
      // width 50%
      // height 50%
      // transform translateX(-50%) translateY(-50%)
      position absolute
      top 45%
      left 45%
      .text, .dot
        display block
        font-size 1.5rem
        color #ffffff
        text-aglign center
        @media screen and (max-width: 420px)
          font-size 1rem
  .team-content
    position relative
    width 80%
    margin 2.5rem auto
    @media screen and (max-width: 1024px )
      width 100%
      padding 0
      margin-top 2rem
    .search
      position relative
      font-size 1rem
      margin-bottom 2rem
      .ivu-form-item-content
        line-height 22px
    .j-team
      position relative
      padding-left 1rem
      padding-right 1.5rem
      text-align left
      margin 0 auto
      li
        display inline-block
        margin 2rem
        width 18rem
        height 18rem
        text-align center
        background url('./usernotloginbg.png') center
        background-size cover
        border-radius 0.4rem
        transition 0.1s all linear
        @media screen and (max-width: 420px )
          margin 0.2rem
          width 14rem
        @media screen and (max-width: 420px )
          margin 0.5rem
          width 100%
        &:hover
          box-shadow 0 8px 12px 0 rgba(7,17,27,0.2)
          cursor pointer
        .j-team-item
          padding 1rem
          img
            width 7.5rem
            height 7.5rem
            border-radius 50%
          .leader
            text-align center
            margin 1rem
          .intro
            text-align left
            font-size 1rem
            line-height 1.5rem
            no-wrap(3,1.6rem)
            padding 0.5rem
    .page-nav
      // position relative
      margin-top 2rem
      color #7e8c8d
      padding-top 4rem
</style>
