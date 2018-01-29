<template>
  <div class="evaluate-wrapper">
    <div class="head">
      <img src="./evaluate_bg.png" alt="健康评估">
      <div class="text-wrapper">
        <span class="text">健康评估</span>
        <span class="dot">一</span>
      </div>
    </div>
    <div class="evaluate-content">
     <!--evaluate-->
      <div class="j-evaluate-wrapper">
        <row class="item-wrapper" type="flex" justify="center" >
          <i-col :lg="8" :md="12" :sm="12" :xs="24" class="item" v-for="(item, index) in evaluate" :key="index">
            <a href="#">
              <img :src="item.evaluateImage" :alt="item.evaluateName">
            </a>
            <div class="toggle-title-wrapper">
              <p class="text">{{item.evaluateName}}</p>
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
      evaluate: [] // evaluate页列表数据
    }
  },
  mounted() {
    this._getEvaluateList() // 执行获取evaluate页数据
  },
  methods: {
    _getEvaluateList() {
      // 获取/evaluate页数据
      getIndex().then(res => {
        this.evaluate = res.data.evaluate
        console.log(this.evaluate)
      })
    },
    change(page) {
      // 分页插件获取点击page页码
      console.log(page)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.evaluate-wrapper
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
  .evaluate-content
    position relative
    width 80%
    margin 2.5rem auto
    @media screen and (max-width: 1024px)
      width 100%
      padding 0 0.5rem
      margin-top 2rem
    .j-evaluate-wrapper
      margin-top 5rem
      @media screen and (max-width: 420px)
        margin-top 2rem
      .item-wrapper
        // margin-top 2.5rem
        .item
          position relative
          margin-top 0.1rem
          overflow hidden
          .toggle-title-wrapper
            display none
            position absolute
            height 100%
            left 0
            top 0
            width 100%
            background #0091ea
            opacity 0.8
            .text
              position absolute
              display block
              font-size 1rem
              top 45%
              left 45%
              color #ffffff
          &:hover
            // box-shadow 2px 2px 2px #eeeeee
            .toggle-title-wrapper
              display block
              box-shadow 0 8px 16px 0 rgba(7, 17, 27, 0.1)
          img
            display block
            height auto
            width 100%
</style>
