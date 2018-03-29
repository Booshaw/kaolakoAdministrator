<template>
  <div class="treatment-wrapper">
    <article-list :articleList="articles" @select="selectArticle"></article-list>
    <div class="pages-wrapper" v-if="pageShow">
      <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
    </div>
    <div v-if="!pageShow" class="error-loading">
      <p>Opps....加载失败</p>
    </div>
  </div>
</template>
<script>
import ArticleList from 'base/articleList/articleList'
import { getArticleList } from 'api/getData'
export default {
  data() {
    return {
      articles: [],
      totalRecord: null,
      page: 1,
      pageSize: 10,
      pageShow: false
    }
  },
  mounted() {
    this._getArticleList() // 获取文章列表
  },
  methods: {
    _getArticleList() {
      let params = {
        category: 1,
        page: this.page,
        pageSize: this.pageSize
      }
      getArticleList(params).then(res => {
        this.articles = res.data.pageData
        this.totalRecord = res.data.totalRecord
        this.pageShow = true
      })
    },
    selectArticle(item) {
      this.$router.push({
        path: `/a`,
        query: { id: item.id }
      })
    },
    pageNum (page) {
      this.page = page
      this._getArticleList()
    },
    pageSizeNum (size) {
      this.pageSize = size
      this._getArticleList()
    }
  },
  components: {
    ArticleList
  }
}
</script>
<style lang="stylus">
.treatment-wrapper
  .pages-wrapper
    width 80%
    margin 0 auto
    margin-top 2rem
  .error-loading
    width 50%
    margin 20% auto
</style>
