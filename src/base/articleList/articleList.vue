<template>
  <div class="article-list-wrapper">
    <div v-for="(item, index) in articleList" :key="index" class="aricle-lwrap">
      <h3 class="item-title" @click="selectItem(item)">{{item.ctitle}}</h3>
      <!--text-->
      <div class="item-digest-wrapper">
        <div class="img-link" v-if="item.image" @click="selectItem(item)">
          <img :src="item.image" alt="佳护安医疗">
        </div>
        <p class="item-digest" @click="selectItem(item)">
          {{item.cparagraph}}
        </p>
      </div>
      <div class="item-btm">
        <ul class="l">
          <li class="hd-pic">{{item.author}}</li>
          <li class="pass-time">{{item.publishDate}}</li>
          <li class="count">774浏览</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    articleList: {
      type: Array
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/mixin'
.article-list-wrapper
  position relative
  .aricle-lwrap
    border-bottom 1px solid #d9dde1
    .item-title
      padding 1.5rem 0 0.5rem
      font-size 1.25rem
      font-weight 700
      line-height 1.5rem
      color #14191e
      cursor pointer
      &:hover
        color #ec1500
    .item-digest-wrapper
      margin-top 0.625rem
      display flex
      // flex-direction row
      align-items center
      overflow hidden
      .img-link
        float left
        cursor pointer
        flex 0 0 200px
        width 200px
        margin-right 1rem
        @media screen and (max-device-width: 420px)
          // flex 0 0 150px
        img
          width 200px
          height 130px
          @media screen and (max-device-width: 420px)
            width 150px
            height 92px
      .item-digest
        // padding-right 0.5rem
        font-size 0.875rem
        line-height 2rem
        color #787d82
        margin-top -5px
        cursor pointer
        no-wrap(4,2rem)
    .item-btm
      font-size 0.875rem
      color #93999f
      line-height 1.25rem
      padding 1rem 0 1.25rem
      .l
        text-align left
        .hd-pic
          display inline
          margin-right 1rem
        .pass-time
          display inline
          margin-right 1.25rem
        .count
          display inline
          margin-right 1.25rem
</style>
