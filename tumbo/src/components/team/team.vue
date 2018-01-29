<template>
  <div class="team-wrapper">
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
            <Cascader :data="city" v-model="formSearch.seletCity" size="small" filterable placeholder="选择所在地"></Cascader>
          </FormItem>
          <FormItem>
            <Select v-model="formSearch.adept" placeholder="选择主治" size="small">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Select v-model="formSearch.rating" placeholder="评级" size="small">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <Button type="info" shape="circle" icon="ios-search" size="small">搜索</Button>
        </Form>
      </div>
       <!--team-->
      <div class="j-team">
        <Row class="j-team-wrapper">
          <i-col :lg="12" :xs="24" :sm="24" v-for="(item, index) in teamList" :key="index">
            <div class="team">
              <div class="left">
                <img :src="item.teamImage" :alt="item.teamLeader">
              </div>
              <div class="right">
                <ul class="right-item">
                  <li class="leader">
                    首席专家:{{item.teamLeader}}
                  </li>
                  <li class="action" v-html="item.action"></li>
                  <li class="team-info-title">团队介绍:</li>
                  <li class="team-desc">{{item.teamDesc}}</li>
                  <li class="team-for">服务会员200名,团队成员10名</li>
                  <li>5颗星</li>
                </ul>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
       <!--page-->
      <div class="page-nav" v-show="teamList">
        <Page :total="100" size="small" show-total  @on-change="change"></Page>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      teamList: [], // team页列表数据
      formSearch: { // 查询表单数据
        selectCity: '', // 选择的城市
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
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.team-wrapper
  position relative
  width 100%
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
      padding 1rem
      // position relative
      // width 100%
      // height 0
      // padding-top 60%
      // overflow hidden
      // @media screen and (max-width: 420px )
      //   padding-top 240%
      //   padding-left 1rem
      //   padding-right 1rem
      //   margin-top 1rem
      .j-team-wrapper
        position: relative
        // top: 0
        // left: 0
        // width: 100%
        // height: 100%
        .team
          margin-top 2.5rem
          font-size 1rem
          display -webkit-flex
          display -webkit-box
          display flex
          display -moz-box
          display -ms-flexbox
          align-items top
          // overflow hidden
          .left
            font-size 1rem
            flex 0 0 150px
            // display inline-block
            // overflow hidden
            @media screen and (max-width: 420px )
              width 92px
              height 120px
              flex 0 0 92px
            img
              display block
              width 150px
              height 200px
              @media screen and (max-width: 420px )
                width 92px
                height 120px
          .right
            flex-grow 1
            overflow hidden
            .right-item
              margin-bottom 0.8rem
              margin-top 0.2rem
              font-size 0.875rem
              line-height 1rem
              padding 0 1.125rem
              text-align left
              color #909399
              line-height 2
              .leader
                font-size 1.125rem
                color #303133
                font-weight 200
                line-height 1
              .action
                margin-top 1rem
                line-height 1.5rem
                font-size 0.875rem
                no-wrap(2,1.5rem)
              .team-info-title
                font-size 1rem
                color #303133
                margin-top 1.25rem
              .team-desc
                line-height 1.8
                no-wrap(2,1.5rem)
              .team-for
                padding-top 5px
                line-height 2.5
              .item-title
                text-align right
                line-height 1rem
              .item-info-desc
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
              .item-info-action
                position relative
                line-height 1.5rem
                no-wrap(2,1.5rem)
              .item-info
                position relative
                line-height 1.5rem
                no-wrap(3,1.5rem)
    .page-nav
      // position relative
      margin-top 2rem
      color #7e8c8d
      padding-top 4rem
</style>
