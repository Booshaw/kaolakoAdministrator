<template>
  <div>
    <article-list :articleList="articles" @select="selectArticle"></article-list>
    <div class="pages-wrapper">
      <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
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
      pageSize: 10
    }
  },
  mounted() {
    // this._getArticlesLabelList() // 执行获取articles页数据
    this._getArticleList() // 获取文章列表
  },
  methods: {
    _getArticleList() {
      let params = {
        category: 2,
        page: this.page,
        pageSize: this.pageSize
      }
      getArticleList(params).then(res => {
        this.articles = res.data.data
        this.totalRecord = res.data.totalRecord
        console.log(this.totalRecord)
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
.pages-wrapper
  width 80%
  margin 0 auto
  margin-top 2rem
</style>
