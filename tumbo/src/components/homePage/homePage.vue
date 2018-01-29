<template>
  <div class="homepage-wrapper">
    <div class="slider-wrapper">
      <div class="slider-content">
        <j-slider :banner="category"></j-slider>
      </div>
    </div>
    <div class="content-wrapper">
      <!--team-->
      <div class="j-team" v-show="teamList">
        <row type="flex" align="middle">
          <i-col span="22" class="title-wrapper">
            <span class="title">健管团队</span>
          </i-col>
          <i-col span="2">
            <span class="more">更多</span>
          </i-col>
        </row>
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
      <!--service-->
      <div class="j-service-wrapper">
        <row type="flex" align="middle" class="title">
          <i-col span="22" class="title-wrapper">
            <span class="title">服务项目</span>
          </i-col>
          <i-col span="2">
            <span class="more">更多</span>
          </i-col>
        </row>
        <row class="item-wrapper">
          <i-col :lg="5" :md="11" :sm="11" :xs="11" class="item" v-for="(item, index) in service" :key="index">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <p class="title">{{item.ctitle}}</p>
              <p class="desc">{{item.cparagraph}}</p>
            </a>
          </i-col>
        </row>
      </div>
      <!--service-category-->
      <j-category :category="category"></j-category>

      <!--therapeutic schedule-->
      <div class="j-therapeutic-schedule">
        <row type="flex" align="middle">
          <i-col span="22" class="title-wrapper">
            <span class="title">诊疗智库</span>
          </i-col>
        </row>
        <row class="item-wrapper">
          <i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-accessory"></use>
              </svg>
              <p>诊治指南库</p>
            </a>
          </i-col><i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-label"></use>
              </svg>
              <p>典型病例</p>
            </a>
          </i-col><i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-manage"></use>
              </svg>
              <p>问诊表库</p>
            </a>
          </i-col><i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-accessory"></use>
              </svg>
              <p>用药手册</p>
            </a>
          </i-col><i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-workbench"></use>
              </svg>
              <p>随访模板库</p>
            </a>
          </i-col><i-col :lg="3" :md="11" :sm="11" :xs="11" class="item">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use xlink:href="#icon-accessory"></use>
              </svg>
              <p>医学计算器</p>
            </a>
          </i-col>
        </row>
      </div>
      <!--articles-->
      <div class="j-article-wrapper">
          <row type="flex" align="middle">
            <i-col span="22" class="title-wrapper">
              <span class="title">健康讲堂</span>
            </i-col>
            <!-- <i-col span="2">
              <span class="more">更多</span>
            </i-col> -->
          </row>
          <row>
            <ul>
              <li v-for="(item, index) in articles" :key="index">
                <i-col :lg="8" :xs="24" :md="24" :sm="24" class="articles-category">
                  <row type="flex" align="middle" class="title">
                    <i-col span="20">
                      <p class="text">{{item.precaution_title}}</p>
                    </i-col>
                    <i-col span="4">
                      <span>更多</span>
                    </i-col>
                  </row>
                <div class="articles">
                  <div class="left">
                    <svg class=" icon j-icon" aria-hidden="true">
                      <use :xlink:href="item.icon"></use>
                    </svg>
                  </div>
                  <div class="right">
                    <ul v-for="(c, index1) in item.article" :key="index1">
                      <li><p>{{c.ctitle}}</p></li>
                    </ul>
                    <!-- <svg class="icon j-icon-more" aria-hidden="true">
                      <use xlink:href="#icon-unfold"></use>
                    </svg> -->
                  </div>
                </div>
                </i-col>
              </li>
            </ul>
          </row>
      </div>
    </div>
    <div class="loading-wrapper" v-show="!category">
      <Spin fix></Spin>
    </div>
  </div>
</template>
<script>
import JSlider from 'base/slider/slider'
import JCategory from 'base/category/category'
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      teamList: [],
      articles: {},
      category: [],
      service: []
    }
  },
  mounted() {
    this._getIndex()
  },
  methods: {
    _getIndex() {
      getIndex().then(res => {
        this.teamList = res.data.teamlist
        this.articles = res.data.articles
        this.category = res.data.category
        this.service = res.data.service
      })
    }
  },
  components: {
    JSlider,
    JCategory
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
.loading-wrapper
  position fixed
  height 100%
  width 100%
  left 0
  right 0
  top 0
  bottom 0
  background #ffffff
.homepage-wrapper
  position relative
  .slider-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 50%
    overflow: hidden
    .slider-content
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
  .content-wrapper
    width 80%
    margin 0 auto
    margin-top 3.75rem
    @media screen and (max-width: 1024px )
      width 100%
     .j-team
      @media screen and (max-width: 420px )
        padding 1rem
        margin-top 1rem
      .j-team-wrapper
        position relative
        .team
          margin-top 2.5rem
          // padding-top 1rem
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
            flex 0 0 200px
            // display inline-block
            // overflow hidden
            @media screen and (max-width: 420px )
              width 120px
              height 120px
              flex 0 0 120px
            img
              display block
              width 200px
              height 250px
              @media screen and (max-width: 420px )
                width 120px
                height 160px
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
                padding-top 0.2rem
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
      @media screen and (max-width: 420px )
        padding 1rem
        margin-top 2rem
      .title-wrapper
        text-align left
        .title
          display inline-block
          font-size 1.5rem
          color #2d2f33
          text-align left
          padding-left 0.625rem
          border-left 3px solid #2ca9e3
        .more
          text-align right
          font-size 0.875rem
    .j-article-wrapper
      margin-top 6.23rem
      @media screen and (max-width: 420px )
        padding 1rem
        margin-top 2rem
      .title-wrapper
        text-align left
        .title
          display inline-block
          font-size 1.5rem
          color #2d2f33
          text-align left
          padding-left 0.625rem
          border-left 3px solid #2ca9e3
        .more
          text-align right
          font-size 0.875rem
      .articles-category
        margin-top 2rem
        overflow hidden
        .title
          text-align left
          margin-bottom 1rem
          font-size 0.875rem
          .text
            margin 0.5rem
            font-size 1rem
        .articles
          display flex
          flex-direction row
          font-size 1rem
          .left
            .j-icon
              width 7.5rem
              height 7.5rem
              // vertical-align -0.09rem
              color #ffffff
              background-color #61dfe1
              // padding 1.5rem
              border-radius 4px
              text-align center
            .title
              text-align left
              margin-bottom 1rem
          .right
            margin-left 1.2rem
            li
              position relative
              // text-overflow ellipsis
              // white-space nowrap
              font-size 0.875rem
              text-align left
              padding-right 1rem
              line-height 1.9rem
              height 1.9rem
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 1
              overflow hidden
    .j-service-wrapper
      margin-top 6.23rem
      @media screen and (max-width: 420px )
        margin-top 2rem
      .title
        @media screen and (max-width: 420px )
          padding-left 1rem
          padding-right 1rem
        .title-wrapper
          text-align left
          .title
            display inline-block
            font-size 1.5rem
            color #2d2f33
            text-align left
            padding-left 0.625rem
            border-left 3px solid #2ca9e3
          .more
            text-align right
            font-size 0.875rem
      .item-wrapper
        margin-top 2.5rem
        overflow hidden
        .item
          margin-top 2.5rem
          padding 0.5rem
          margin 0.5rem
          border 1px solid #eeeeee
          transition .3s all linear
          &:hover
            // box-shadow 2px 2px 2px #eeeeee
            box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1)
          .j-icon
              width 4rem
              height 4rem
              vertical-align -0.09rem
              color #61dfe1
              border-radius 4px
          .title
            padding 1rem
            font-size 1.125rem
          .desc
            // position relative
            font-size 0.875rem
            line-height 1.5rem
            text-align left
            color #878d99
            no-wrap(3,1.4rem)
    .j-therapeutic-schedule
      margin-top 6.23rem
      @media screen and (max-width: 420px )
        margin-top 1rem
      .title-wrapper
        text-align left
        @media screen and (max-width: 420px )
          padding 1rem
        .title
          display inline-block
          font-size 1.5rem
          color #2d2f33
          text-align left
          padding-left 0.625rem
          border-left 3px solid #2ca9e3
      .item-wrapper
        margin-top 2rem
        .item
          // margin-top 2.5rem
          // padding 0.625rem
          margin 0.625rem
          border 1px solid #eeeeee
          transition .3s all linear
          p
            display inline-block
            line-height 3rem
          &:hover
            // box-shadow 2px 2px 2px #eeeeee
            box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1)
</style>
