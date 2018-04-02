<template>
  <div class="service-wrapper">
    <jnav></jnav>
    <div class="head">
      <img src="./service_bg.png" alt="服务项目">
      <div class="text-wrapper">
        <span class="text">服务项目</span>
        <span class="dot">一</span>
      </div>
    </div>
    <div class="service-content">
     <!--service-->
      <div class="j-service-wrapper">
        <row class="item-wrapper" type="flex" justify="center" >
          <i-col :lg="5" :md="11" :sm="11" :xs="11" class="item" v-for="(item, index) in service" :key="index">
            <a href="#">
              <svg class=" icon j-icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <p class="title">{{item.ctitle}}</p>
              <p class="desc">{{item.cparagraph}}</p>
            </a>
          </i-col>
        </row>
      </div>
    </div>
    <jfooter></jfooter>
  </div>
</template>
<script>
import Jnav from 'components/nav/nav'
import Jfooter from 'base/footer/footer'
import { getIndex } from 'api/teamList'
export default {
  data() {
    return {
      service: [] // service页列表数据
    }
  },
  mounted() {
    this._getServiceList() // 执行获取service页数据
  },
  methods: {
    _getServiceList() {
      // 获取/service页数据
      getIndex().then(res => {
        this.service = res.data.service
      })
    },
    change(page) {
      // 分页插件获取点击page页码
      console.log(page)
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
.service-wrapper
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
  .service-content
    position relative
    width 80%
    margin 2.5rem auto
    @media screen and (max-width: 1024px)
      width 100%
      padding 0 0.5rem
      margin-top 2rem
    .j-service-wrapper
      margin-top 6.23rem
      @media screen and (max-width: 420px)
        margin-top 2rem
      .title
        @media screen and (max-width: 420px)
          padding-left 1rem
          padding-right 1rem
      .item-wrapper
        margin-top 2.5rem
        .item
          margin-top 2.5rem
          padding 0.625rem
          margin 0.625rem
          border 1px solid #eeeeee
          transition 0.3s all linear
          &:hover
            // box-shadow 2px 2px 2px #eeeeee
            box-shadow 0 8px 16px 0 rgba(7, 17, 27, 0.1)
          .j-icon
            width 4rem
            height 4rem
            vertical-align -0.09rem
            color #61dfe1
            border-radius 4px
            fill currentColor
            overflow hidden
          .title
            padding 1rem
            font-size 1.125rem
          .desc
            // position relative
            font-size 0.875rem
            line-height 1.5rem
            text-align left
            color #878d99
            no-wrap(3, 1.5rem)
</style>
