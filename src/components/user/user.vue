<template>
  <div class="wrapper">
     <div class="table">
       <div class="render">
        <div class="search">
          <i-input v-model="searchTitle" style="width:25%" placeholder="搜索标题">
            <Button slot="append" icon="ios-search"></Button>
          </i-input>
        </div>
        <Button type="primary" size="small" icon="ios-compose-outline">创建</Button>
        <Button type="error" size="small" icon="ios-trash-outline">删除</Button>
       </div>
        <Table border ref="selection" :columns="tableColumns" :data="tableData" @on-select="select"></Table>
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '昵称',
          key: 'author',
          sortable: true,
          width: 120,
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
                params.row.author
              )
            ])
          }
        },
        {
          title: '注册时间',
          key: 'publishTime',
          sortable: true,
          width: 120
        },
        {
          title: '最近浏览',
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
      .search
        margin 16px auto
  .pages-wrapper
    width 80%
    margin 0 auto
    margin-top 32px
</style>
