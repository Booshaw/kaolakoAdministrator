<template>
  <div id="app">
      <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="stylus">
#app
  height 100%
  width 100%
</style>