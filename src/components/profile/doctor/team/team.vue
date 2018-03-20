<template>
  <div class="t-profile-wrapper">
    <!-- <div class="add">
      <h3 class="add-title">佳护安医疗</h3>
      <div class="add-btn">
        <span class="btn-note" @click="addDoctorGroupModal = !addDoctorGroupModal">新建团队</span>
        <span class="middle-line"></span>
        <router-link exact  to="/" tag="li" class="btn-note">
          <span class="text">加入团队</span>
        </router-link>
      </div>
    </div> -->
    <div class="t-top">
      <div class="top-bg-mask">
        <div class="t-content">
          <div class="team-info-wrapper">
            <img class="team-logo" v-lazy="doctorGroupInformation.logo.url" alt="健管团队">
            <div class="team-title">
              <p class="team-text">官方认证</p>
              <h3 class="team-p">精品团队</h3>
            </div>
            <p class="team-name">{{doctorGroupInfo.name}}</p>
            <p class="team-area"><span v-for="(a, index) in doctorGroupInfo.serviceArea" :key="index">{{a}}</span></p>
            <p class="team-sick"><span v-for="(item, index) in doctorGroupInfo.skilledDiseaseId" :key="index">{{diseaseNameFilter(item)}}</span></p>
            <div class="team-score">
              <ul>
                <li>
                  <p class="score">{{doctorGroupInfo.score}}</p>
                  <p class="text">响应速度</p>
                </li>
                <li>
                  <p class="score">{{0}}</p>
                  <p class="text">服务态度</p>
                </li>
                  <li>
                  <p class="score">{{0}}</p>
                  <p class="text">专业程度</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=t-content>
      <h2 class="t-intro">团队介绍</h2>
        <div class="t-intro-wrapper">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-barrage"></use>
            </svg>
          </p>
          <p class="text">团队简介</p>
          <p class="info">{{doctorGroupInfo.introduction}}</p>
        </div>
        <div class="t-intro-wrapper">
          <p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-barrage"></use>
            </svg>
          </p>
          <p class="text">团队荣誉</p>
          <p class="info">{{doctorGroupInfo.honor}}</p>
        </div>
        <h2 class="t-intro">团队成员</h2>
        <div class="t-team-list">
          <ul>
            <li v-for="(item, index) in doctorGroupInfo.doctorList" :key="index" @click="toDoctorInfo(item)">
              <div class="item">
                <img v-lazy="item.avatar" alt="佳护安">
                <p class="name">{{item.realName}}</p>
                <p class="profession">{{item.profession}}</p>
                <p class="text">
                  <span>{{item.roleName}}</span>
                  <span>{{item.title}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
    </div>
    <Modal
      v-model="addDoctorGroupModal"
      title="新建健管团队"
      @on-ok="uploadDoctorGroup"
      okText="保存">
      <Upload
        ref="uploadImg"
        :headers= "{
          authorization: this.token
        }"
        :show-upload-list="false"
        :default-file-list="defaultLogoImgList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="20480"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        action="http://192.168.0.6:9080/jiahuan/common/file/upload">
        <div class="logo-img">
          <img height="120" width="120" v-lazy="doctorGroupInformation.logo.url" alt="佳护安">
          <div class="upload-list-cover">
            <Icon type="camera"></Icon>
            <!-- <span type="ios-trash-outline" @click.native="uploadLogo()">上传Logo</span> -->
          </div>
        </div>
      </Upload>
      <div class="tips">
        <p class="text">上传医疗团队Logo</p>
      </div>
      <Form :label-width="70" class="upload-form-item">
        <FormItem label="团队名称:">
          <i-input v-model="doctorGroupInformation.name"></i-input>
        </FormItem>
        <FormItem label="擅长">
          <Select v-model="doctorGroupInformation.speciality" multiple>
            <Option v-for="(item2, index2) in dict.disease" :value="item2.id" :key="index2">{{ item2.diseaseName }}</Option>
          </Select>
        </FormItem>
        <Row v-for="(item1, index1) in doctorGroupInformation.serviceAreaId" :key="index1">
          <i-col span="22">
            <FormItem :label="`服务区域${index1 + 1}:`" v-model="doctorGroupInformation.serviceAreaId">
              <Cascader change-on-select :data="dict.area" trigger="hover"></Cascader>
            </FormItem>
          </i-col>
          <i-col span="2">
            <svg class="icon" aria-hidden="true" @click="deleteServiceAreaId(index1)">
              <use xlink:href="#icon-close"></use>
            </svg>
          </i-col>
        </Row>
        <Row style="margin-bottom:1rem">
          <span>添加更多服务区域</span>
          <svg class="icon-add" aria-hidden="true" @click="addServiceAreaId()">
              <use xlink:href="#icon-addition"></use>
            </svg>
        </Row>
        <FormItem label="团队简介">
          <i-input v-model="doctorGroupInformation.introduction" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :maxlength= '150'></i-input>
        </FormItem>
        <FormItem label="团队荣誉">
          <i-input v-model="doctorGroupInformation.honor" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :maxlength= '150'></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
// import {getDict, getPatientInfo, getDiseaseCategory, getDiseaseList} from 'api/getData'
import {getDict, getDoctorGroupInformation} from 'api/getData'
import {mapGetters} from 'vuex'
// import { upload } from 'api/upload'
export default {
  data () {
    return {
      defaultLogoImgList: [], // 健管团队logo图片默认list
      serviceItem: [], // 添加服务区域空数组
      addDoctorGroupModal: false, // 新建健管团队弹窗
      doctorGroupInformation: { // 创建健管团队初始数据
        name: '',
        serviceAreaId: [[], []],
        introduction: '',
        honor: '',
        speciality: [],
        logo: {
          url: '',
          id: ''
        }
      },
      doctorGroupInfo: { // 网络获取健管团队信息
      },
       dict: { // 数据字典初始定义
        area: [],
        degree: [],
        disease: [],
        ethnicity: []
      }
    }
  },
  created() {
    this._getDict()
    this._getDoctorGroupInformation()
  },
  methods: {
    // 跳转医生团员详情页
    toDoctorInfo(item) {
      this.$router.push({
        path: `/team/detail`,
        query: {id: item.id}
      })
    },
    // 医疗团队logo上传
    handleBeforeUpload() { // 上传前钩子
    },
    handleFormatError() { // 格式化检查钩子
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件超出限制大小',
        desc: '文件  ' + file.name + '不能超过20M.'
      })
    },
    handleSuccess(res, file) { // 新增检查项目文件上传成功钩子
      // var obj = {}
      // obj = JSON.parse(JSON.stringify(res))
      this.doctorGroupInformation.logo.url = res.data.url
      console.log(this.doctorGroupInformation)
    },
    // 提交创建团队数据
    uploadDoctorGroup() {
    },
    _getDoctorGroupInformation () {
      getDoctorGroupInformation().then(res => {
        if (res.code === '200') {
          this.doctorGroupInfo = res.data
        } else {
          this.$Message.error(res.message)
        }
      })
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
        this.dict.disease = res.data.disease.splice(6)
        this.dict.area = res.data.area
        console.log(this.dict.area)
        this.dict.degree = res.data.degree
        this.dict.ethnicity = res.data.ethnicity
      })
    },
    // 删除服务区域
    deleteServiceAreaId(index) {
      this.doctorGroupInformation.serviceAreaId.splice(index, 1)
    },
    // 添加服务区域
    addServiceAreaId() {
      this.doctorGroupInformation.serviceAreaId.push(this.serviceItem)
    },
    //  疾病名称转换
    diseaseNameFilter(value) {
    if (value) {
      if (this.dict.disease && this.dict.disease.length > 0) {
      var arry = this.dict.disease
        for (let i = 0; i < arry.length; i++) {
          let obj = Object.values(arry[i])
          if (obj[2] === value) {
            // console.log(obj)
            return obj[1]
          }
        }
      } else {
        return value
      }
    } else {
      return ''
    }
    }
  },
  computed: {
    ...mapGetters([
    'token'
  ])
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
@import '~common/stylus/mixin'
  .t-profile-wrapper
    margin 1rem
    color #606266
    background #f2f2f2
    .add
      width 90%
      margin 0 auto
      height 10rem
      background url('./usernotloginbg.png')
      background-size cover
      border-radius 0.625rem
      .add-title
        font-size 1.6rem
        padding 1rem
      .add-btn
        width 60%
        @media screen and (max-width: 420px)
          width 90%
        margin 0.5rem auto
        line-height 3rem
        height 3rem
        background rgba(240,20,20,0.8)
        border-radius 1.5rem
      .btn-note
        display inline-block
        width 45%
        text-align center
        cursor pointer
        color #ffffff
        &:hover
          cursor pointer
          background #f01414
          border-radius 1.5rem
      .middle-line
        width 2px
        height 1rem
        background-color rgba(255,255,255,0.4)
        display inline-block
        // margin-top 1rem
    .t-top
      position relative
      width 100%
      height 30rem
      background url('./team_bg.png') center
      background-size cover
      background-repeat no-repeat
      .top-bg-mask
        width 100%
        height 30rem
        background rgba(0,0,0,0,6)
        .t-content
          width 100%
          margin 0 auto
          height 100%
          .team-info-wrapper
            position relative
            margin 0 auto
            padding 1rem
            text-align center
            z-index 2
            .team-logo
              width 6.25rem
              height 6.25rem
              border-radius 50%
              border 3px solid #ffffff
              margin-top 1rem auto
            .team-title
              position relative
              margin -1.5rem auto 0
              width 12.5rem
              height 3.5rem
              color #fff
              background url('./flag-bg.png') center
              background-repeat no-repeat
            .team-text
              opacity 0.7
              font-size 0.625rem
              line-height 1.25rem
              // padding 0.2rem
            .team-p
              font-weight 700
              font-size 0.825rem
              line-height 1.75rem
            .team-name
              font-size 1.5rem
              margin 1rem
              font-weight 700
              color #ffffff
              line-height 1.5rem
            .team-area, .team-sick
              font-size 0.875rem
              margin-top 0.4rem
              // font-weight 200
              color #ffffff
              line-height 1.5rem
              span
                display inline-block
                margin 0 0.5rem
            .team-score
              position relative
              margin 2rem auto 1.5rem
              font-size 1rem
              line-height 1.5rem
              li
                color #ffffff
                margin 0 1rem
                display inline-block
                .score
                  margin-bottom 0.5rem
                  font-size 1.5rem
                  line-height 1.5rem
                .text
                  font-size 0.875rem
                  color rgba(255,255,255,0.6)
    .t-content
      // width 60%
      margin 0 auto
      .t-intro
        font-size 1.5rem
        line-height 1.5rem
        font-weight 700
        color #07111b
        text-align center
        margin 3rem 0
      .t-intro-wrapper
        font-size 0.875rem
        padding 1rem
        margin-bottom 1rem
        text-align left
        border-radius 4px
        box-shadow 2px 4px 8px 0 rgba(7,17,27,.03)
        background #ffffff
        .icon
          width 2em
          height 2em
          vertical-align -0.4em
          fill currentColor
          overflow hidden
          color #2ca9e3
        .text
          color #ffffff
          background #2ca9e3
          display inline-block
          padding 0.2rem
          margin-top 0.5rem
          border-radius 4px
        .info
          padding 1rem
          // no-wrap(4,1.5rem)
          line-height 1.5rem
          font-size 0.875rem
          color #93999f
          word-wrap break-word
      .t-team-list
        width 100%
        margin 0 auto
        li
          display inline-block
          height 15rem
          width 15rem
          background #ffffff
          margin 2rem
          border-radius 50%
          overflow hidden
          background url('./usernotloginbg.png')
          background-size cover
          transition 0.1s all linear
          &:hover
            box-shadow 0 8px 12px 0 rgba(7,17,27,0.2)
            cursor pointer
          .name
            color #303133
            margin-bottom 0.5rem
          .profession
            color #909099
            margin-bottom 00.5rem
            font-size 0.875rem
          .text
            color #909099
            font-size 0.875rem
          img
            margin-top 0.5rem
            width 7.5rem
            height 7.5rem
            border-radius 50%
.upload-form-item
  .icon
    width 1.5em
    height 1.5em
    vertical-align -0.8em
    fill currentColor
    overflow hidden
    cursor pointer
    &:hover
      color #f01414
  .icon-add
    text-align left
    width 2.5em
    height 2.5em
    vertical-align -0.8em
    fill currentColor
    overflow hidden
    cursor pointer
    color #2ca9e3
.logo-img
  position relative
  display inline-block
  width 120px
  height 120px
  text-align center
  line-height 120px
  border 1px solid transparent
  border-radius 50%
  overflow hidden
  background #ffffff
  box-shadow 0 1px 1px rgba(0,0,0,0.2)
  img
    width 100%
    height 100%
  &:hover
    .upload-list-cover
      display block
  .upload-list-cover
    display none
    position absolute
    color #ffffff
    font-size 2rem
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,.6)
.tips
  margin-bottom 1rem
  .text
    font-size 0.6rem
    padding 0.2rem
    text-align center
</style>
