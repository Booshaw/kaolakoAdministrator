<template>
  <div class="pop-wrapper">
    <ul>
      <li v-for="(item, index) in popList" :key="index" @click="selectPop">
        <div class="item">
          <h3>{{item.title}}</h3>
        </div>
        <div class="show-box"><span>{{item.viewCount}}浏览</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    popList: {
      type: Array
    }
  },
  methods: {
    selectPop(item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.pop-wrapper
  h3
    margin-top 1rem
    font-size 1rem
    color #14191e
    line-height 1.5rem
    no-wrap(2,1.5rem)
    &:hover
      color #f01414
  li
    line-height 1.5
    max-height 15em
    word-break break-all
    border-bottom 1px solid #d9dde1
  .show-box
    margin 5px 0 1rem
    color #b5b9bc
    font-size 0.625rem
    line-height 1rem
</style>
