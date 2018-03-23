<template>
  <div class="p-profile-wrapper">
    <Row class="title">
      <i-col span="18">
        <span class="text">基本信息</span>
      </i-col>
      <i-col span="6">
        <svg class="icon" aria-hidden="true" @click="changeDoctorInfoModal = !changeDoctorInfoModal">
          <use xlink:href="#icon-brush"></use>
        </svg>
        <span>编辑</span>
      </i-col>
    </Row>
    <div class="line"></div>
    <Row>
      <div class="p-content-wrapper" v-if="doctorInformation">
        <ul>
          <li><span class="content-title">姓名:</span><span class="info">{{doctorInformation.realName}}</span></li>
          <li><span class="content-title">性别:</span><span class="info">{{doctorInformation.gender ==='1' ? '女' : '男'}}</span></li>
          <li><span class="content-title">学历:</span><span class="info">{{doctorInformation.degree | degreeFilterProfile}}</span></li>
          <li><span class="content-title">出生日期:</span><span class="info">{{doctorInformation.birthday | parseTime()}}</span></li>
          <li><span class="content-title">简介:</span><span class="info">{{doctorInformation.introduction}}</span></li>
          <li><span class="content-title">擅长:</span><span class="info">{{doctorInformation.speciality}}</span></li>
        </ul>
      </div>
    </Row>
      <Modal
      v-model="changeDoctorInfoModal"
      title="修改"
      @on-ok="uploadDoctor">
      <Form :label-width="70" class="upload-form-item">
        <FormItem label="昵称:">
          <i-input v-model="doctorInformation.realName"></i-input>
        </FormItem>
        <FormItem label="性别:">
          <Select v-model="doctorInformation.gender">
              <Option value="1">女</Option>
              <Option value="2">男</Option>
            </Select>
        </FormItem>
        <Row>
          <i-col :lg="12" :xs="24">
            <FormItem label="出生日期">
              <DatePicker type="datetime" v-model="doctorInformation.birthday" icon="ios-clock-outline" placeholder="出生日期" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
          </i-col>
          <i-col :lg="12" :xs="24">
            <FormItem label="学历:">
              <Select v-model="doctorInformation.degree">
                <Option value="1">小学</Option>
                <Option value="2">初中</Option>
                <Option value="3">高中</Option>
                <Option value="4">专科</Option>
                <Option value="5">本科</Option>
                <Option value="6">硕士</Option>
                <Option value="7">博士</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <FormItem label="简介">
          <i-input v-model="doctorInformation.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="擅长">
          <i-input v-model="doctorInformation.speciality" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {getDoctorInformation} from 'api/getData'
import { upload } from 'api/upload'
export default {
  data () {
    return {
      changeDoctorInfoModal: false, // 医生基本信息弹窗
      doctorInformation: {} // 医生基本信息
    }
  },
  mounted() {
    this._getDoctorInformation()
  },
  methods: {
    uploadDoctor() {
      let url = '/doctor/detail/update'
      let params = this.doctorInformation
      upload(url, params).then(res => {
        console.log(res)
      })
    },
    _getDoctorInformation () {
      getDoctorInformation().then(res => {
        console.log(res.data)
        if (res.code === '200') {
          this.doctorInformation = res.data
        } else {
          this.$Message.error(res.message)
        }
      })
    }
  },
  filters: {
    degreeFilterProfile(value) {
     var degree = [
        '',
        '小学',
        '初中',
        '高中',
        '专科',
        '本科',
        '硕士',
        '博士'
      ]
      return degree[value]
    }
  }
}
</script>
<style lang="stylus">
  .p-profile-wrapper
    margin 2rem
    color #606266
    .title
      // border-bottom 1px solid #ffffff
      padding 0.5rem
      .text
        display inline-block
        font-size 1.2rem
        text-align left
      .icon
        width 1.5em
        height 1.5em
        vertical-align -0.4em
        fill currentColor
        overflow hidden
        cursor pointer
        color #61dfe1
    .line
      height 1px
      background #d0d6d9
      margin-top 1rem
    .p-content-wrapper
      margin 0 1rem 1rem 1rem
      text-align left
      li
        border-bottom 1px solid #d9dde1
        padding 0.6rem
      .content-title
        display inline-block
        width 5rem
        font-weight 700
        background-color #f3f5f7
        line-height 2rem
        padding 0.2rem
      .info
        margin-left 5rem
        text-align center
</style>
