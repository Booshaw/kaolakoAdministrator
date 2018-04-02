<template>
  <div class="user-info-wrapper">
    <jnav></jnav>
    <div class="content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/u">
            <Icon type="ios-home-outline"></Icon>我的家庭
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="title">
        <Button type="ghost" shape="circle" size="small" @click="addPatientModel = !addPatientModel"><span v-html="addPatientModel ? '取消添加' : '添加家庭成员'"></span></Button>
      </div>
      <Row v-if="addPatientModel" class="add-form-wrapper">
        <Form ref="patientDetail" :label-width="80" :model="patientDetail" :rules="ruleValidate">
          <FormItem label="姓名" prop="realName">
            <i-input v-model="patientDetail.realName"></i-input>
          </FormItem>
          <FormItem label="身份证" prop="idcardNumber">
            <i-input v-model="patientDetail.idcardNumber"></i-input>
          </FormItem>
          <FormItem label="性别" prop="gender">
            <Select v-model="patientDetail.gender">
              <Option value = "1">女</Option>
              <Option value = "2">男</Option>
            </Select>
          </FormItem>
          <FormItem label="身高" prop="height">
            <i-input v-model="patientDetail.height">
              <span slot="append">cm</span>
            </i-input>
          </FormItem>
           <FormItem label="出生日期" prop="birthday">
            <DatePicker v-model="patientDetail.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd"></DatePicker>
          </FormItem>
          <FormItem label="婚否">
            <Select v-model="patientDetail.marriageStatus">
              <Option value = "0">未婚</Option>
              <Option value = "1">已婚</Option>
              <Option value = "2">离异</Option>
              <Option value = "3">丧偶</Option>
            </Select>
          </FormItem>
          <FormItem label="教育年限">
            <Select v-model="patientDetail.degree">
              <Option :value="item.value" v-for="(item, index6) in dict.degree" :key="index6">{{item.descName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="民族">
            <Select v-model="patientDetail.ethnicity">
              <Option v-for="(item, index) in dict.ethnicity" :value="item.value" :key="index">{{item.descName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="体重">
            <i-input v-model="patientDetail.weight">
              <span slot="append">kg</span>
            </i-input>
          </FormItem>
          <FormItem label="手机号">
            <i-input v-model="patientDetail.telephone"></i-input>
          </FormItem>
          <FormItem label="紧急电话">
            <i-input v-model="patientDetail.emergencyPhone"></i-input>
          </FormItem>
          <FormItem label="邮箱">
            <i-input v-model="patientDetail.email"></i-input>
          </FormItem>
          <FormItem label="户籍地址">
            <Cascader :data="dict.area" v-model="patientDetail.permanentAreaId" trigger="hover" style="width:10rem"></Cascader>
          </FormItem>
          <FormItem label="详细地址">
            <i-input v-model="patientDetail.permanentAddress"></i-input>
          </FormItem>
          <FormItem label="现居地">
            <Cascader :data="dict.area" v-model="patientDetail.presentAreaId" trigger="hover" style="width:12rem"></Cascader>
          </FormItem>
          <FormItem label="现居地址">
            <i-input v-model="patientDetail.presentAddress"></i-input>
          </FormItem>
          <FormItem label="工作单位">
            <i-input v-model="patientDetail.company"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="uploadPatient('patientDetail')">提交</Button>
          </FormItem>
        </Form>
      </Row>
      <row class="item" v-for="(item, index) in patientList" :key="index">
        <i-col :lg="12" :sm="12" :xs="24">
          <div class="left">
            <div class="head-img" @click.stop="toUserInfo(item)">
              <img :src="item.headImage" alt="JIAHUAN">
            </div>
            <div class="info">
              <Badge dot>
                <a href="#" class="name" @click="toUserInfo(item)">{{item.realName}}</a>
              </Badge>
              <p>年龄:{{item.age}}岁</p>
              <p>电话:{{item.telephone}}</p>
              <p>监管成员: <span v-for="(i, index1) in item.managerList" :key="index1">{{i}}</span>
              <span class="invite" @click.stop="showModel(item)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-addition"></use>
                </svg>
                </span>
              </p>
            </div>
          </div>
        </i-col>
        <i-col :ls="2" :sm="2" :xs="24">
          <div class="connection">
            <svg class="icon" aria-hidden="true" v-if="item.doctorGroup">
              <use xlink:href="#icon-enter"></use>
            </svg>
          </div>
        </i-col>
        <i-col :lg="10" :sm="10" :xs="24">
          <div class="right" v-if="item.doctorGroup">
            <div class="team-image">
              <img :src="item.doctorGroup.teamImage" alt="JIAHUAN">
            </div>
            <div class="info">
              <p class="name">{{item.doctorGroup.teamName}}医疗团队</p>
              <p>主治医生:{{item.doctorGroup.attendingPhysician}}</p>
              <p>首席专家:{{item.doctorGroup.chiefExpert}}</p>
            </div>
          </div>
          <div class="add-doctor-group" v-if="!item.doctorGroup">
            <div class="group-item" @click.stop="addDoctorGroup">
              <svg class="icon">
                <use xlink:href="#icon-add"></use>
              </svg>
            <p class="text">添加医疗团队</p>
            </div>
          </div>
        </i-col>
      </row>
      <router-view></router-view>
    </div>
    <!--invite-model-->
    <Modal
      v-model="invitedGuardian"
      title="邀请监管对象"
      :loading="loading"
      @on-ok="asyncOK"
      ok-text="发起邀请">
      <Form :model="invitedGuardianList" :label-width="40">
        <FormItem label="姓名">
          <i-input v-model="invitedGuardianList.name" placeholder="请输入被邀请人的姓名"></i-input>
        </FormItem>
        <FormItem label="电话">
          <i-input v-model="invitedGuardianList.telephone" placeholder="请输入被邀请人的手机"></i-input>
        </FormItem>
        <!-- <FormItem>
          <Button type="primary">查询</Button>
        </FormItem> -->
      </Form>
    </Modal>
    <jfooter></jfooter>
  </div>
</template>
<script>
import Jnav from 'components/nav/nav'
import Jfooter from 'base/footer/footer'
import { getDict, getPatientList } from 'api/getData'
import { upload } from 'api/upload'
export default {
  data() {
    // 大陆身份证验证
    const idCardPass = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (value === '') {
        callback(new Error('身份证号不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      }
    }
    return {
      loadingUpload: false, // button加载loading
      addPatientModel: false, // 添加家庭成员model
      patientDetail: {
        age: '',
        birthday: '',
        company: '',
        degree: '',
        email: '',
        emergencyPhone: '',
        ethnicity: '',
        gender: '',
        height: '',
        idcardNumber: '',
        marriageStatus: '',
        permanentAddress: '',
        permanentAreaId: [],
        presentAddress: '',
        presentAreaId: [],
        realName: '',
        telephone: '',
        weight: ''
      },
      dict: { // 数据字典初始定义
        area: [],
        degree: [],
        disease: [],
        ethnicity: []
      },
      patientList: [], // 家庭成员患者列表
      loading: true,
      invitedGuardian: false,
      invitedGuardianList: {
        name: '',
        phone: ''
      },
      addItem: { // 邀请监管成员对象
        superviseName: '' // 邀请监管成员姓名
      },
      // 表单验证
      ruleValidate: {
        realName: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        birthday: [
          { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
        ],
        ethnicity: [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' }
        ],
        idcardNumber: [
          {validator: idCardPass, trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this._getPatientList()
    this._getDict()
  },
  methods: {
    // 提交新增家庭成员数据
    uploadPatient(name) {
      let url = '/patient/add'
      let params = this.patientDetail
       this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('成功!')
          } else {
            this.$Message.error('错误!')
          }
      }).then(upload(url, params).then(res => {
          if (res.code === '200') {
            this.patientList.unshift(res.data)
            this.$Message.info(`操作${res.message}`)
            this.addPatientModel = false
          } else {
            this.$Message.error(`操作失败:${res.message}`)
          }
        }))
    },
    // 获取字典数据列表
    _getDict() {
      const params = {
        dictType: [
          'area', 'ethnicity', 'degree', 'disease'
        ],
        diseaseType: 0
      }
      getDict(params).then(res => {
        this.dict.disease = res.data.disease.slice(6)
        this.dict.area = res.data.area
        this.dict.degree = res.data.degree
        this.dict.ethnicity = res.data.ethnicity
      })
    },
    showModel(item) {
      this.invitedGuardian = true
    },
    _getPatientList() {
      getPatientList().then(res => {
        this.patientList = res.data
        console.log(res.data)
      })
    },
    toUserInfo(item) {
      this.$router.push({
        path: `/u/p`,
        query: { id: item.id }
      })
    },
    addDoctorGroup() {
      // console.log('addDoctorGroup')
    },
    asyncOK() {
      setTimeout(() => {
        this.invitedGuardian = false
        this.addItem.superviseName = this.invitedGuardianList.name
        if (this.addItem.superviseName) {
          this.$Message.info({
            content: '邀请提交成功,请等待同意',
            duration: 3,
            top: 50
          })
        }
        console.log(this.patientList[0].superviseList)
      }, 1000)
    }
  },
  computed: {},
  components: {
    Jnav,
    Jfooter
  }
}
</script>
<style lang="stylus">
.user-info-wrapper
  width 100%
  margin-top -1.5rem
  .content
    width 70%
    margin 0 auto
    background #ffffff
    @media screen and (max-width: 1200px)
      width 100%
    .breadcrumb
      text-align left
      background #f8f8f9
      padding 1rem
      line-height 1.2
      @media screen and (max-width: 420px)
        display none
    .title
      text-align center
      padding 0.5rem
      font-size 1rem
      border-bottom 1px solid #eeeeee
    .add-form-wrapper
      width 60%
      margin 1rem auto
    .item
      padding 1rem
      background #ffffff
      transition all 0.3s
      font-size 0.875rem
      // border-radius 4px
      @media screen and (min-device-width: 1200px)
        &:hover
          box-shadow 0.5rem 0.5rem 0.5rem 0 rgba(7, 17, 27, 0.1)
          margin-bottom 1rem
          padding-top 1.5rem
      border-bottom 1px solid #eeeeee
      .left
        display flex
        .head-img
          padding-right 1rem
          cursor pointer
          img
            display block
            width 100px
            height 120px
        .info
          font-size 0.875rem
          text-align left
          .name
            display inline
            font-size 1rem
            color #333333
          p
            line-height 2rem
            span
              margin 0 0.25rem
          .ivu-badge-count
            top -5px
            right -5px
            height 0.875rem
            min-width 0.875rem
            line-height 0.875rem
            padding 0
            font-size px
          .tips-wrapper
            position relative
            display inline-block
            // width 2rem
            .tips
              position absolute
              right -0.9rem
              margin 0
              top 0
              display inline-block
              background #f01414
              width 1rem
              height 1rem
              font-size 0.625rem
              line-height 1
              text-align center
              padding 2px 2px
              color #ffffff
              border-radius 50%
              overflow hidden
          .invite
            display inline-block
            // border 1px solid #f01414
            cursor pointer
            // padding 0.5rem
            .icon
              width 2em
              height 2em
              vertical-align -0.5em
              fill currentColor
              overflow hidden
              &:hover
                color #61dfe1
      .connection
        height 100%
        display flex
        align-items center
        // text-align left
        @media screen and (max-width: 768px)
          justify-content center
        .icon
          text-align center
          width 2rem
          height 2rem
          vertical-align -0.6rem
          color #61dfe1
          fill currentColor
          overflow hidden
      .right
        display flex
        .team-image
          padding-right 1rem
          img
            display block
            width 100px
            height 120px
        .info
          font-size 0.875rem
          text-align left
          .name
            font-size 1rem
            color #333333
          p
            line-height 2rem
            span
              margin 0 0.25rem
      .add-doctor-group
        display flex
        flex-direction column
        justify-content center
        height 100%
        .group-item
          width 50%
          margin 0 auto
          cursor pointer
          padding 1rem
          .icon
            width 2rem
            height 2rem
            vertical-align -0.6rem
            color #61dfe1
            fill currentColor
            overflow hidden
          .text
            font-size 0.875rem
            line-height 1rem
            display inline-block
  .base
    .title
      float left
</style>
