<template>
   <div class="j-slider-wrapper">
      <Carousel autoplay v-model="sliderStart" loop>
        <CarouselItem v-for="(item, index) in banner" :key="index" >
           <img class="img-responsive" :src="item.categroyImage" alt="">
        </CarouselItem>
    </Carousel>
   </div>
</template>
<script>
export default {
  props: {
    banner: {
      type: Array
    }
  },
  data() {
    return {
      sliderStart: 0
    }
  }
}
</script>
<style lang="stylus">
.j-slider-wrapper
  display block
  width 100%
  .img-responsive
    display block
    width 100%
    height auto
</style>