<template>
  <div class="i-wrapper">
    <div class="i-container">
      <div class="box">
      <span class="t">姓名:</span>
      <p>{{identificationInfo.name}}</p>
    </div>
    <div class="box">
      <span class="t">身份证:</span>
      <p>{{identificationInfo.idCard}}</p>
    </div>
     <div class="box">
      <span class="t">主讲科目:</span>
      <p>{{identificationInfo.speciality}}</p>
    </div>
     <div class="box">
      <span class="t">个人简介:</span>
      <p>{{identificationInfo.introduction}}</p>
    </div>
    <div class="box">
      <img :src="identificationInfo.img" alt="证件照">
    </div>
    <div class="render">
      <Button type="info" size="small" @click="passIdentification">通过</Button>
      <Button type="error" size="small" @click="identificationModal = !identificationModal">拒绝</Button>
    </div>
    </div>
    <Modal
        v-model="identificationModal"
        title="拒绝通过审核理由"
        :loading="loading"
        @on-ok="rejectIdentification">
        <i-input v-model="easonForRejection" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
    </Modal>
  </div>
</template>
<script>
import { getIdendificationDetail } from 'api/getData'
export default {
  data () {
    return {
      identificationModal: false, // 决绝认证弹窗
      loading: false, // 加载状态
      easonForRejection: '', // 拒绝理由
      identificationInfo: {
        name: '你大爷',
        idCard: '513088880034893453',
        introduction: '很牛逼的老师',
        speciality: '',
        img: ''
      }
    }
  },
  created() {
    this._getIdendificationDetail()
  },
  methods: {
    _getIdendificationDetail() {
      let params = {}
      getIdendificationDetail(params).then(res => {
        this.identificationInfo = res.data
      })
    },
    passIdentification() {
      console.log('通过了')
    },
    rejectIdentification() {
      this.$Notice.success({
        title: '拒绝通过',
        desc: '已拒绝通过认证',
        duration: 5
      })
    }
  }
}
</script>
<style lang="stylus">
.i-wrapper
  height 100%
  .i-container
    background #ffffff
    box-shadow 0 8px 16px 0 rgba(7, 17, 27, 0.05)
    padding 32px
    border-radius 8px
    .box
      position relative
      margin 16px 0 32px
      text-align left
      margin-bottom 16px
      border-bottom 1px solid #eeeeee
      padding 16px
      .t
        font-size 14px
        line-height 28px
        margin-right 8px
        display inline-block
        margin-bottom 16px
      img
        margin 0 auto
        display block
        width 100%
    .render
      text-align center
</style>