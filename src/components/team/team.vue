<template>
  <div class="team-wrapper">
    <jnav class="nav"></jnav>
    <div class="main">
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
          <Cascader :data="city" change-on-select @on-change="changeArea" v-model="selectCity" trigger="hover" size="small" filterable placeholder="服务区域" style="width:25%;display:inline-block;"></Cascader>
          <Select v-model="skilledDiseaseId" size="small" clearable style="width:15%;display:inline-block;margin-right:0.5rem" placeholder="擅长疾病">
            <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{item.diseaseName}}</Option>
          </Select>
          <Button type="info" shape="circle" icon="ios-search" size="small" @click="search">搜索</Button>
        </div>
        <!--team-->
        <div class="j-team" v-if="teamList && teamList.length > 0">
          <ul>
            <li v-for="(i, index1) in teamList" :key="index1">
              <div class="j-team-item">
                <img v-lazy="i.logo" :alt="i.introduction">
                <p class="leader">首席专家:{{i.realName}}</p>
                <p class="intro">{{i.introduction}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--page-->
        <div class="pages-wrapper" v-if="pageShow">
          <Page :total="totalRecord" size="small" transfer show-elevator show-sizer @on-change="pageNum" @on-page-size-change="pageSizeNum"></Page>
        </div>
        <div class="no-result" v-if="!teamList">Opps...暂无数据</div>
      </div>
    </div>
    <jfooter class="j-footer"></jfooter>
  </div>
</template>
<script>
import Jnav from 'components/nav/nav'
import Jfooter from 'base/footer/footer'
/* eslint-disable */
import { getTeamList, getDict } from 'api/getData'
export default {
  data() {
    return {
      teamList: [], // team页列表数据
      selectCity: [], // 团队服务区域
      page: 1, // 默认一页
      pageSize: 8, // 默认每页8条
      pageShow: false, // 翻页条是否显示
      dataLoadError: false, // 数据加载失败
      totalRecord: 0, // 团队总数
      skilledDiseaseId: '', // 擅长疾病 
      city: [],
      disease: [] // 擅长疾病列表
    }
  },
  created() {
    this._getDict()
    this._getTeamList() // 执行获取team页数据
  },
  methods: {
    _getDict() {
      const params = {
        dictType: [
          'area', 'disease'
        ]
      }
      getDict(params).then(res => {
        if (res.code === '200') {
          this.city = res.data.area
          this.disease = res.data.disease
        }
      })
    },
    _getTeamList() { // 获取/team页数据
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        serviceAreaId: this.selectCity.pop(),
        skilledDiseaseId: this.skilledDiseaseId
      }
      getTeamList(params).then((res) => {
        if (res.code === '200') {
          this.teamList = res.data.pageData
          this.pageShow = true
          this.totalRecord = res.data.totalRecord
        } else {
          this.$Message.error(res.message)
          this.pageShow = false
        }
      })
    },
    pageNum(page) { // 分页插件获取点击page页码
      this.page = page
      this._getTeamList()
    },
    pageSizeNum(size) {
      this.pageSize = size
      this._getTeamList()
    },
    changeArea() {},
    search() {
      this._getTeamList()
    }
  },
  components: {
    Jnav,
    Jfooter
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
  .team-wrapper
    display flex
    flex-direction column
    width 100%
    height 100%
    .main
      margin-top 3.5rem
      flex-grow 1
      flex 1 0 auto
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
          position relative
          padding-left 1rem
          padding-right 1.5rem
          text-align left
          margin 0 auto
          li
            display inline-block
            margin 2rem
            width 18rem
            height 18rem
            text-align center
            background url('./usernotloginbg.png') center
            background-size cover
            border-radius 0.4rem
            transition 0.1s all linear
            @media screen and (max-width: 420px )
              margin 0.2rem
              width 14rem
            @media screen and (max-width: 420px )
              margin 0.5rem
              width 100%
            &:hover
              box-shadow 0 8px 12px 0 rgba(7,17,27,0.2)
              cursor pointer
            .j-team-item
              padding 1rem
              img
                width 7.5rem
                height 7.5rem
                border-radius 50%
              .leader
                text-align center
                margin 1rem
              .intro
                text-align left
                font-size 1rem
                line-height 1.5rem
                no-wrap(3,1.6rem)
                padding 0.5rem
        .pages-wrapper
          // position relative
          margin-top 2rem
          color #7e8c8d
          padding-top 4rem
      .no-result
        position: absolute
        width: 100%
        top: 30%
        transform: translateY(-50%)
    .j-footer
      flex 0 0 auto
</style>
