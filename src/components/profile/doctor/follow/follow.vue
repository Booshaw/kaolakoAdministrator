<template>
  <div class="f-wrapper">
    <div class="item-wrapper">
      <div class="item" v-for="(item, index) in followListData" :key="index" >
        <div v-if="item.status < 2" class="upload-follow">
          <i class="ivu-icon ivu-icon-edit edit-icon" @click.stop="show(index)">修改</i>
        </div>
        <div v-if="item.status > 2 && item.status < 4" class="upload-follow">
          <i class="ivu-icon ivu-icon-edit edit-icon" @click.stop="addFollowData(item)">录入</i>
        </div>
        <span class="time">
          <p class="follow-data">{{item.planDate | parseTime()}}</p>
          <p class="ampm">{{item.ampm === '1'? '上午': '下午'}}</p>
          <p class="follow-notes"><span class="text">{{item.nextFollowDay}}</span>
          </p>
        </span>
        <div class="f-info-wrapper">
          <p class="name">{{item.realName}}
            <span class="gender-icon-female" v-if="item.gender === '1'">
              <Icon type="female"/>
            </span>
            <span class="gender-icon-male" v-else>
              <Icon type="male"/>
            </span>
          </p>
          <p class="disease"> <span v-for="(i, index) in item.followDisease" :key="index">{{diseaseNameFilter(i)}}</span> </p>
          <p class="hospital">{{hospitalFilter(item.hospitalId)}}</p>
          <p class="hospital">{{departmentFilter(item.departmentId)}}</p>
          <p class="doctor">{{item.doctor}}</p>
          <p class="memo">{{item.memo}}</p>
        </div>
        <div class="time-step">
          <i class="step-notes">进度</i>
          <i :class="timeStepClass0(item.status)"></i>
          <i :class="timeStepClass1(item.status)"></i>
          <i :class="timeStepClass2(item.status)"></i>
          <i :class="timeStepClass3(item.status)"></i>
          <i :class="timeStepClass4(item.status)" v-if="item.status === 4"></i>
          <div class="linebottom"></div>
        </div>
      </div>
    </div>
    <Modal
      ok-text="保存"
      v-model="uploadFollowModal"
      @on-ok="uploadFollow"
      title="随访修改">
      <div class="followup-wrapper">
        <Row>
          <i-col :lg="12" :sm="24" style="margin-bottom:0.5rem">
            <span>日期:</span>
            <DatePicker v-model="followModalData.planDate" :options="options" type="date" placeholder="选择随访日期" format="yyyy-MM-dd" style="width:80%"></DatePicker>
          </i-col>
          <i-col :lg="12" :sm="24">
            <span>时间:</span>
            <Select v-model="followModalData.ampm" placeholder="时间段" style="width:80%">
              <Option value="1">上午</Option>
              <Option value="2">下午</Option>
            </Select>
          </i-col>
        </Row>
        <div style="margin-top:1rem">
          <span>疾病:</span>
          <Select v-model="followModalData.followDisease" multiple placeholder="选择随访疾病,可多选" style="width:80%">
            <Option v-for="(i, index1) in dict.disease" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <span>医院:</span>
          <Select v-model="followModalData.hospitalId" placeholder="选择随访医院" style="width:80%">
            <Option v-for="(i, index1) in dict.hospital" :value="i.id" :key="index1">{{ i.name }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <span>科室:</span>
          <Select v-model="followModalData.departmentId" placeholder="选择科室" style="width:80%">
            <Option v-for="(i, index1) in dict.department" :value="i.id" :key="index1">{{ i.name }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <span>医生:</span>
          <i-input v-model="followModalData.doctor" placeholder="随访医生" style="width:80%"></i-input>
        </div>
        <div style="margin-top:1rem">
          <span>备注:</span>
          <i-input v-model="followModalData.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="随访注意事项" style="width:80%"></i-input>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as types from '../../../../store/mutations-types'
// import { mapState } from 'vuex'
import { getDict, getFollowList } from 'api/getData'
import { upload } from 'api/upload'
export default {
  data() {
    return {
      patientOnFollow: true,
      addFollowMedal: false,
      step: null, // timestep时间步骤计数器,来自后端请求status
      followListData: [], // 随访列表数据
      followModalData: [], // 随访修改临时数据
      dict: { // 数据字典初始定义
        area: [], // 地区
        degree: [], // 学位
        disease: [], // 慢性病
        ethnicity: [], // 民族
        hospital: [], // 医院
        title: [], // 职称
        department: [] // 医院
      },
      uploadFollowModal: false, // 修改随访modal
      options: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now();
        }
      } // disable datePicker
    }
  },
  mounted() {
    this._getDict()
    this._getFollowList()
  },
  methods: {
    // 获取字典数据列表
    _getDict() {
      const params = {
        dictType: [
          'area', 'ethnicity', 'degree', 'disease', 'hospital', 'department'
        ]
      }
      getDict(params).then(res => {
        this.dict.disease = res.data.disease
        this.dict.area = res.data.area
        this.dict.degree = res.data.degree
        this.dict.ethnicity = res.data.ethnicity
        this.dict.hospital = res.data.hospital
        this.dict.department = res.data.department
      })
    },
    // 获取随访
    _getFollowList() {
      getFollowList().then(res => {
        if (res.code === '200') {
          this.followListData = res.data
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    //  疾病名称转换
    diseaseNameFilter(value) {
    if (value) {
      if (this.dict.disease && this.dict.disease.length > 0) {
      var arry = this.dict.disease
        for (let i = 0; i < arry.length; i++) {
          if (arry[i].id === value) {
            return arry[i].diseaseName
          }
        }
      } else {
        return value
      }
    } else {
      return ''
    }
    },
    //  医院名称转换
    hospitalFilter(value) {
      if (value) {
        if (this.dict.hospital && this.dict.hospital.length > 0) {
        var arry = this.dict.hospital
          for (let i = 0; i < arry.length; i++) {
            if (arry[i].id === value) {
              return arry[i].name
            }
          }
        } else {
          return value
        }
      } else {
        return ''
      }
    },
    //  医院名称转换
    departmentFilter(value) {
      if (value) {
        if (this.dict.department && this.dict.department.length > 0) {
        var arry = this.dict.department
          for (let i = 0; i < arry.length; i++) {
            if (arry[i].id === value) {
              return arry[i].name
            }
          }
        } else {
          return value
        }
      } else {
        return ''
      }
    },
    timeStepClass0(status) {
      return {
        no: status >= 0,
        'ivu-icon': true,
        'ivu-icon-ios-circle-filled': true
      }
    },
    timeStepClass1(status) {
      return {
        message: status >= 1,
        'ivu-icon': true,
        'ivu-icon-chatbox-working': true
      }
    },
    timeStepClass2(status) {
      return {
        on: status >= 2 && status !== 4,
        'ivu-icon': true,
        'ivu-icon-android-arrow-dropright-circle': true
      }
    },
    timeStepClass3(status) {
      return {
        finished: status >= 3 && status !== 4,
        'ivu-icon': true,
        'ivu-icon-checkmark-circled': true
      }
    },
    timeStepClass4(status) {
      return {
        error: status === 4,
        finished: false,
        on: false,
        no: false,
        message: false,
        'ivu-icon': true,
        'ivu-icon-ios-close': true
      }
    },
    line(status) {
      if (status === 4) {
        return {
          line80: true
        }
      } else if (status === 3) {
        return {
          line62: true
        }
      } else if (status === 2) {
        return {
          line40: true
        }
      } else if (status === 1) {
        return {
          line18: true
        }
      }
    },
    dayFilter(value) {
      let day = Math.abs(value)
      if (day === 0) {
        return '今天'
      } else if (day === 9999) {
        return '已过期'
      } else {
        return day.toString()
      }
    },
    show(index) {
      this.uploadFollowModal = true
      this.followModalData = this.followListData[index]
    },
    uploadFollow() {
      let url = '/doctor/follow/update'
      let params = this.followModalData
      upload(url, params).then(res => {
        if (res.code === '200') {
           this.$Message.info(res.message)
           this.uploadFollowModal = false
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    addFollowData(item) {
      console.log(item)
      this.$store.commit(types.SET_PATIENTONFOLLOW, item.patientId)
      this.$router.push({
        path: '/u/p',
        query: {
          id: item.patientId
        }
      })
    }
  },
  // computed: mapState({
  //   patientOnFollow: state => state.patientOnFollow
  // }),
  filters: {
  }
}
</script>
<style lang="stylus">
.f-wrapper
  width 80%
  margin 0 auto
  .item-wrapper
    width 80%
    margin 0 auto
    padding 0 0 0 4rem
    @media screen and (max-width:420px)
      width 100%
      padding 0 0 0 5rem
    .upload-follow
      padding-top 1rem
      .edit-icon
        color #2ca9e3
        cursor pointer
        padding 0.2rem
        font-size 1rem
        line-height 1rem
        text-align center
    .item
      position relative
      padding-left 1rem
      border-left 1px solid #c0c4cc
      // background #ffffff
      margin 0 1rem
      .time
        position absolute
        left 0
        top 1rem
        margin-left -7rem
        line-height 1rem
        font-size 1rem
        color #818c8f
        .follow-date
          font-size 1rem
          line-height 1.5rem
        .ampm
          margin-top 1rem
          text-align right
          padding-right 0.5rem
        .follow-notes
          padding 1rem
          margin-top 2rem
          .text
            color #495060
            font-size 1.2rem
            line-height 1.2rem
            font-weight 700
            color #ed3f14
      .f-info-wrapper
        position relative
        padding 1rem
        border-bottom 1px solid #e4e7ed
        text-align left
        .name
          color #303133
          font-size 1rem
          margin-bottom 1rem
          text-align left
          .gender-icon-female
            color #ec407a
          .gender-icon-male
            color #2196f3
        .disease
          margin-bottom 1rem
          font-size 0.875rem
          span
            text-align center
            margin 0 0.5rem
            border 1px solid #c0c4cc
            border-radius 4px
            padding 0.1rem
            line-height 1.6rem
        .hospital
          text-align left
          margin-bottom 1rem
        .doctor
          margin-bottom 1rem
        .memo
          font-size 1rem
          line-height 1.2rem
          padding 0.5rem
      .time-step
        position absolute
        top 1rem
        right 0
        margin-top 0.5rem
        width 1rem
        .step-notes
          font-size 0.625rem
        i
          display inline-block
          border-radius 50%
          margin-bottom 1rem
          font-size 1rem
        .defalut
          color #80848f
        .message
          color #2ca9e3
        .no
          color #ff9900
        .on
          color #2d8cf0
        .finished
          color #19be6b
        .error
          color #ed3f14
        .linebottom
          margin-top -0.5rem
          width 100%
        .line18
          width 18%
          margin-top -0.5rem
          border-bottom 1px solid #19be6b
        .line40
          width 40%
          margin-top -0.5rem
          border-bottom 1px solid #19be6b
        .line62
          width 62%
          margin-top -0.5rem
          border-bottom 1px solid #19be6b
        .line80
          width 80%
          margin-top -0.5rem
          border-bottom 1px solid #19be6b
      .change-wrapper
        display none
        position absolute
        background #f8f8f9
        width 100%
        height 100%
        top 0
        opacity 0.7
</style>
