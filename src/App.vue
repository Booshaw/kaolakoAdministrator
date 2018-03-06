<template>
  <div id="app">
    <div class="nav">
      <jnav></jnav>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer">
      <jfooter></jfooter>
    </div>
  </div>
</template>
<script>
import Jnav from 'components/nav/nav'
import Jfooter from 'base/footer/footer'
export default {
  components: {
    Jnav,
    Jfooter
  }
}
</script>
<style lang="stylus">
#app
  display -webkit-flex
  display -webkit-box
  display flex
  display -moz-box
  display -ms-flexbox
  height 100%
  min-height 100vh
  flex-direction column
  .content
    margin-top 3.75rem
    flex 1 0 auto
  .footer
    flex-shrink 0
    margin-top 2rem
</style>