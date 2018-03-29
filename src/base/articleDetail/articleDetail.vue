<template>
  <div class="article-detal-wrapper">
    <div class="head-wrapper">
      <div class="adv" v-if="showAdv">
        <span>动态广告位</span>
        <div class="hidden" @click.stop="hiddenAdv">
          关闭
        </div>
      </div>
      <row>
        <i-col :lg="17" :md="17" :sm="24">
          <div class="head-top">
            <div class="detail-path">
              <span class="bread-link" @click.stop="back">健康讲堂/</span>
            </div>
            <div class="detail-title-wrapper">
              <h3 class="detail-title">{{article.title}}</h3>
              <div class="dc-profile">
                <ul>
                  <li>{{article.publishTime}}</li>
                  <li>{{article.viewCount}}浏览</li>
                  <li v-for="(i, index) in article.tag" :key="index">{{i.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </i-col>
        <i-col :lg="6" :md="6" :sm="0">
          <div class="head-adv">广告位</div>
        </i-col>
      </row>
    </div>
    <row class="detail-content" type="flex" justify="space-between">
      <i-col :lg="18" :md="18" :sm="24">
        <div class="content-wrapper" v-html="article.content">
        </div>
      </i-col>
      <i-col :lg="6" :md="6" :sm="6" :xs="0">
        <div class="adv" >
          <h2 class="">精选推荐</h2>
          <ul>
            <li v-for="(item, index) in popList" :key="index">
              <div class="item">
                <h3 @click="toDetail(item)">{{item.title}}</h3>
              </div>
              <div class="show-box"><span>{{item.viewCount}}浏览</span></div>
            </li>
          </ul>
        </div>
      </i-col>
    </row>
  </div>
</template>
<script>
import { getArticleDetail, getArticleList } from 'api/getData'
export default {
  data() {
    return {
      article: {},
      showAdv: true,
      popList: []
    }
  },
  created() {
    this._getArticle()
    this._getArticleList()
  },
  methods: {
    _getArticle() {
      let params = {
        id: this.$route.query.id
      }
      getArticleDetail(params).then(res => {
        this.article = res.data
        console.log(this.article)
      })
    },
    _getArticleList() {
      let params = {
        recommend: 1,
        category: 1,
        page: 1,
        pageSize: 10
      }
      getArticleList(params).then(res => {
        this.popList = res.data.data
        // console.log(this.popList)
      })
    },
    hiddenAdv() {
      this.showAdv = !this.showAdv
      console.log(this.showAdv)
    },
    back() {
      this.$router.go(-1)
    },
    toDetail(item) {
      this.$router.push({
        path: `/a`,
        query: { id: item.id }
      })
      this._getArticle()
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.article-detal-wrapper
  .head-wrapper
    margin 0 auto
    background #f3f5f7
    box-shadow 0px 2px 10px 0px rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1)
    .adv
      background #f01414
      line-height 8rem
      color #ffffff
      .hidden
        position absolute
        top 0.5rem
        right 0.5rem
        cursor pointer
    .head-top
      width 80%
      padding 1rem 0
      margin-left 15%
      text-align left
      .detail-path
        font-size 0.625rem
        color #93999f
        line-height 1.5rem
        .bread-link
          cursor pointer
          &:hover
            color #ec1500
      .detail-title-wrapper
        .detail-title
          font-weight 700
          line-height 3rem
          margin 0.625rem 0
          word-wrap break-word
          word-break break-all
          font-size 1.5rem
          color #333
          overflow hidden
          text-overflow ellipsis
          -webkit-line-clamp 2
          -webkit-box-orient vertical
        .dc-profile
          font-size 0.625rem
          color #93999f
          line-height 1.25rem
          li
            display inline
            margin-right 0.5rem
    .head-adv
      line-height 5rem
  .detail-content
    .content-wrapper
      width 80%
      margin 2rem auto
      text-indent 2em
      font-size 0.875rem
      letter-spacing 1.5px
      word-wrap break-word
      color #333
      line-height 2rem
      text-align left
    .adv
      position relative
      margin-top 5rem
      text-align left
      padding-right 1rem
      // border 1px solid #999999
      h2
        color #14191e
        height 56px
        line-height 49px
        border-bottom 1px solid #b7bbbf
        font-size 16px
        font-weight 700
      h3
        margin-top 1rem
        font-size 1rem
        color #14191e
        line-height 24px
        no-wrap(2, 1.5rem)
        &:hover
          color #f01414
          cursor pointer
      li
        line-height 1.5
        max-height 15em
        word-break break-all
        border-bottom 1px solid #d9dde1
      .show-box
        margin 5px 0 1rem
        color #b5b9bc
        font-size 0.625rem
        line-height 1rem
</style>
