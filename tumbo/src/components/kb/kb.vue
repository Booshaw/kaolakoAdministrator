<template>
  <div class="knowledge-wrapper">
    <div class="head">
      <img src="../../../static/knowledge_base.png" alt="诊疗智库">
      <div class="text-wrapper">
        <span class="text">诊疗智库</span>
        <span class="dot">一</span>
      </div>
    </div>
    <div class="knowledge-content">
     <!--knowledge-->
      <div class="j-knowledge-wrapper">
        <row class="item-wrapper" type="flex" justify="space-around" >
          <i-col :lg="7" :md="10" :sm="11" :xs="24" class="item" v-for="(item, index) in knowledge" :key="index">
            <div class="title-wrapper">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <span class="title">{{item.knowledgeBaseTitle}}</span>
            </div>
            <div class="knowledge-list">
              <span class="text"></span>
            </div>
          </i-col>
        </row>
      </div>
    </div>
  </div>
</template>
<script>
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      knowledge: [] // knowledge页列表数据
    }
  },
  mounted() {
    this._getKnowledgeList() // 执行获取knowledge页数据
  },
  methods: {
    _getKnowledgeList() {
      // 获取/knowledge页数据
      getIndex().then(res => {
        this.knowledge = res.data.knowledgeBase
        console.log(this.knowledge)
      })
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.knowledge-wrapper
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
  .knowledge-content
    position relative
    width 80%
    margin 2.5rem auto
    @media screen and (max-width: 1024px)
      width 100%
      padding 0 0.5rem
      margin-top 2rem
    .j-knowledge-wrapper
      margin-top 5rem
      @media screen and (max-width: 420px)
        margin-top 2rem
      .item-wrapper
        // // margin-top 2.5rem
        // height 0
        // padding-top 0
        .item
          position relative
          margin-top 1rem
          overflow hidden
          border 1px solid #eeeeee
          .title-wrapper
            display flex
            line-height 1.5
            background #f2f6fc
            text-align left
            padding 0.5rem
            align-items center
            .icon
              width 1.2rem
              height 1.2rem
              vertical-align -0.09rem
              color #61dfe1
              fill currentColor
              overflow hidden
              margin-right 0.5rem
          .knowledge-list
            height 6rem
</style>
