<template>
  <div>
    <article-list :articleList="articles" @select="selectArticle"></article-list>
  </div>
</template>
<script>
import ArticleList from 'base/articleList/articleList'
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this._getArticlesLabelList() // 执行获取articles页数据
    this._getArticles() // 获取文章列表
  },
  methods: {
    _getArticlesLabelList() {
      // 获取/articles页数据
      getIndex().then(res => {
        this.articlesLabels = res.data.articlesLabelLists
      })
    },
    _getArticles() {
      getIndex().then(res => {
        this.articles = res.data.articlesTest
        // console.log(this.articles)
      })
    },
    selectArticle(item) {
      this.$router.push({
        path: `/a`,
        query: { id: item.id }
      })
    }
  },
  components: {
    ArticleList
  }
}
</script>
<style lang="stylus">
</style>
