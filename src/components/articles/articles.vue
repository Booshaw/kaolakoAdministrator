<template>
  <div class="articles-wrapper">
    <div class="head">
      <img src="./articles_bg.png" alt="健康讲堂">
      <div class="text-wrapper">
        <span class="text">健康讲堂</span>
        <span class="dot">一</span>
      </div>
    </div>
    <div class="articles-content">
      <row type="flex" justify="space-between">
        <i-col :lg="17" :md="17" :sm="24">
          <div class="label-wrapper">
            <a href="" class="item" v-for="(item, index) in articlesLabels" :key="index">
              {{item.labelName}}
            </a>
          </div>
          <div class="article-item-wrapper">
            <div class="nav-wrapper">
              <router-link to="/articles/prevent_disease" tag="li" class="tab-link">风险评估与预防</router-link>
              <router-link to="/articles/treatment" tag="li" class="tab-link">诊断与治疗</router-link>
            </div>
            <keep-alive><router-view></router-view></keep-alive>
          </div>
           <!--page-->
          <div class="page-nav" v-if="articles.length">
            <Page :total="100" size="small" show-total  @on-change="change"></Page>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="0" :xs="0">
          <div class="adv" >
            <h2 class="">精选推荐</h2>
            <pop-list :popList="popList" @select="selectPop"></pop-list>
          </div>
        </i-col>
      </row>
    </div>
     <!--articles-->
  </div>
</template>
<script>
import { getArticleList } from 'api/getData'
import PopList from 'base/popList/popList'
export default {
  data() {
    return {
      articlesLabels: [], // label标签列表数据
      articles: [], // 文章列表
      popList: [] // 热门推荐文章
    }
  },
  created() {
    // this._getArticlesLabelList() // 执行获取articles页数据
    this._getArticleList() // 获取文章列表
  },
  methods: {
    _getArticleList() {
      let params = {
        recommend: 1,
        category: 1,
        page: 1,
        pageSize: 10
      }
      getArticleList(params).then(res => {
        this.popList = res.data.data
        console.log(this.popList)
      })
    },
    change(page) {
      console.log(page)
    },
    selectPop(item) {
      this.$router.push({
        path: `/a`,
        query: { id: item.id }
      })
    }
  },
  components: {
    PopList
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.articles-wrapper
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
  .articles-content
    position relative
    width 80%
    margin 2.5rem auto
    @media screen and (max-width: 1024px)
      width 100%
      padding 0 0.5rem
      margin-top 2rem
    .label-wrapper
      position relative
      text-align left
      .item
        display inline-block
        line-height 1.875rem
        margin-right 0.625rem
        padding 0 0.625rem
        font-size 0.875rem
        color #4d555d
        background-color #f3f5f7
        text-align left
        &:hover
          text-decoration none
          color #4d555d
          background-color #d9dde1
    .article-item-wrapper
      margin-top 3rem
      text-align left
      .nav-wrapper
        border-bottom 1px solid #eeeeee
        li
          display inline-block
          text-align center
          color #4d555d
        .tab-link
          text-align center
          padding 0.5rem 0.5rem
          cursor pointer
          &.router-link-active
            color #f01414
            border-bottom 2px solid #f01414
    .page-nav
      margin-top 2rem
    .adv
      position relative
      margin-top 5rem
      text-align left
      // border 1px solid #999999
      h2
        color #14191e
        height 3.5rem
        line-height 3rem
        border-bottom 1px solid #b7bbbf
        font-size 1rem
        font-weight 700
</style>