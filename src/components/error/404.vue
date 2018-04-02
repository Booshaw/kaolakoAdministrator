<template>
  <div class="error-wrapper">
    <div class="back-wrapper">
      <img src="./error.jpeg" alt="" @click.stop="toHome" class="point">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    toHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="stylus">
.error-wrapper
  display flex
  width 100%
  height 100%
  background-color #007bc1
  // background url('./error.jpeg') center
  // background-size cover
  .back-wrapper
    margin 0 auto
    &:hover
      cursor pointer
</style>
