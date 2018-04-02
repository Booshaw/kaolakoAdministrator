<template>
  <div class="error-wrappr">
    <div class="back-wrapper">
      <img src="./404.jpeg" alt="" @click.stop="toHome">
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
  width 100%
  background-color #fffcf5
  background-size cover
  .back-wrapper
    width 20%
    margin 0 auto
    top 45%
</style>
