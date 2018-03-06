<template>
   <div class="category-wrapper">
      <Carousel v-model="sliderStartCategory" loop
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem v-for="(item, index) in category" :key="index">
          <row class="category-content" >
            <i-col :lg="16" :md="16" :sm="24" :xs="24" class="left">
              <img class="img-responsive" :src="item.categroyImage" alt="xxx">
            </i-col>
            <i-col :lg="8" :md="8" :sm="24" :xs="24" class="right" >
              <div class="category-content-info">
                <svg class="icon j-icon">
                  <use :xlink:href="item.icon"></use>
                </svg>
                <p class="title">{{item.ctitle}}</p>
                <p class="text">{{item.cparagraph}}</p>
              </div>
            </i-col>
          </row>
        </CarouselItem>
        <!-- <CarouselItem>
          <row class="category-content">
            <i-col :lg="16" :md="16" :sm="24" :xs="24" class="left">
              <img class="img-responsive" src="/static/jiahuan2.jpg" alt="xxx">
            </i-col>
            <i-col :lg="6" :md="8" :sm="24" :xs="24" class="right">
              <div>
                <p>info</p>
              </div>
            </i-col>
          </row>
        </CarouselItem> -->
    </Carousel>
   </div>
</template>
<script>
export default {
  props: {
    category: {
      type: Array
    }
  },
  data() {
    return {
      showScale: false,
      sliderStartCategory: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: 'none',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.category-wrapper
  position relative
  margin-top 6.25rem
  overflow hidden
  // height 21rem
  .category-content
    position relative
    background-color #61dee1
    .left
      .img-responsive
        display block
        width 100%
        height auto
    .right
      height 100%
      .category-content-info
        margin-top 2rem
        .icon
          width 1em
          height 1em
          // vertical-align -0.15em
          fill currentColor
          overflow hidden
        .j-icon
          width 4rem
          height 4rem
          color #ffffff
          border 1px solid #ffffff
          // padding 2px
          border-radius 50%
          background-color #87ecec
        .title
          margin-top 1.6rem
          text-align center
          font-size 1.6rem
          color #ffffff
        .text
          margin-top 1rem
          padding 1rem 4rem
          text-align center
          color rgb(255,255,255)
          font-size 0.875rem
          line-height 1.75rem
</style>
