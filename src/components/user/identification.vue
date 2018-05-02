<template>
  <div class="wrapper">
     <div class="table">
       <div class="render">
         <h2 class="title">认证管理</h2>
       </div>
        <Table border ref="selection" :columns="tableColumns" :data="tableData" @on-select="select" @on-row-click="toIdentificationDetail"></Table>
    </div>
    <div class="pages-wrapper" v-if="pageShow">
      <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
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
      totalRecord: 20, // 总条数
      page: 1, // 页数
      pageSize: 10, // 每页/条
      tableColumns: [
        {
          title: '昵称',
          key: 'author',
          sortable: true,
          width: 120,
          render: (h, params) => {
            return h(
                'strong',
                {
                  style: {
                    cursor: 'pointer',
                    color: '#1c2438',
                    fontSize: '14px'
                  }
                },
                params.row.author
              )
          }
        },
        {
          title: '申请时间',
          key: 'publishTime',
          sortable: true,
          width: 120
        },
             {
          title: '擅长',
          width: 100
        },
        {
          title: '个性签名',
          key: 'title'
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
      let params = {}
      getArticleList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.articleList
          this.pageShow = true
          console.log(this.tableData)
        }
      })
    },
    select(item) {
      this.selectList = item
      console.log(this.selectList)
    },
    toIdentificationDetail(item) {
      this.$router.push({
        path: '/identificationDetail'
      })
    },
    pageNum(page) {
      this.page = page
      this._getArticleList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getArticleList()
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
      .title
        margin 16px auto
        font-size 16px
        font-weight 700
        color #1c2438
        text-align center
  .pages-wrapper
    width 80%
    margin 0 auto
    margin-top 32px
</style>
