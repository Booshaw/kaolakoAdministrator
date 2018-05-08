<template>
  <div class="wrapper">
     <div class="table">
       <div class="render">
        <div class="search">
          <i-input v-model="searchTitle" style="width:25%" placeholder="搜索标题">
            <Button slot="append" icon="ios-search"></Button>
          </i-input>
        </div>
        <Button type="primary" size="small" icon="ios-compose-outline" @click="createArticle">新建</Button>
        <Button type="warning" size="small" icon="forward">精选推荐</Button>
        <Button type="error" size="small" icon="reply-all">撤销推荐</Button>
        <Button type="error" size="small" icon="ios-trash-outline">删除</Button>
       </div>
        <Table border ref="selection" :loading="loading" :columns="tableColumns" :data="tableData" @on-select="select" @on-row-click="toArticleDetail"></Table>
    </div>
    <div class="pages-wrapper" v-if="pageShow">
      <Page :total="totalRecord"  size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
    </div>
  </div>
</template>
<script>
import { getArticleList } from 'api/getData'
export default {
  data() {
    return {
      searchTitle: '', // 按文章标题查询
      pageShow: false, // 分页导航是否显示
      totalRecord: 10, // 总条数
      page: 1, // 页数
      pageSize: 10, // 每页/条
      loading: true, // 加载loading
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type:
                    params.row.isRecommend === 1
                      ? 'ios-star'
                      : 'ios-star-outline'
                },
                style: {
                  color: params.row.isRecommend === 1 ? '#ff9900' : '#bbbec4',
                  paddingLeft: '0.2rem'
                }
              }),
              h(
                'strong',
                {
                  style: {
                    cursor: 'pointer'
                  }
                },
                params.row.title
              )
            ])
          }
        },
        {
          title: '作者',
          key: 'nickName',
          sortable: true,
          width: 100
        },
        {
          title: '发布时间',
          key: 'publishTime',
          sortable: true,
          width: 120
        },
        {
          title: '阅读量',
          key: 'viewCount',
          sortable: true,
          width: 100
        }
      ],
      tableData: [],
      selectList: [] // 选中的文章
    }
  },
  created() {
    this._getArticleList()
  },
  methods: {
    _getArticleList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      getArticleList(params).then(res => {
        console.log(res)
        if (res.code === '200') {
          this.tableData = res.data.pageData
          this.pageShow = true
          this.loading = false
          this.totalRecord = res.data.totalRecord
          console.log(this.tableData)
        }
      })
    },
    select(item) {
      this.selectList = item
      console.log(this.selectList)
    },
    toArticleDetail(item) {
      console.log(item)
      this.$router.push({
        path: '/edit',
        query: { id: item.id }
      })
    },
    pageNum(page) {
      this.page = page
      this._getArticleList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getArticleList()
    },
    createArticle() {
      this.$router.push({
        path: '/publish'
      })
    }
  }
}
</script>
<style lang="stylus">
.wrapper
  .table
    .render
      margin 16px auto
      text-align left
      .search
        margin 16px auto
  .pages-wrapper
    width 80%
    margin 0 auto
    margin-top 32px
</style>
