<template>
  <Form>
    <FormItem v-for="(item, index) in data.lists" :key="index">
      <i-input v-model="item.value">
        <span slot="prepend">{{item.notes}}</span>
        <span slot="append">{{item.unit}}</span>
      </i-input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  props: {
    data: {
      Type: Array
    }
  }
}
</script>
<style lang="stylus">
</style>