<template>
  <div class="user-info-wrapper">
    <div class="content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/u">
            <Icon type="ios-home-outline"></Icon>我的家庭
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="title">
        <Button type="ghost" shape="circle" size="small">添加家庭成员</Button>
      </div>
      <row class="item" v-for="(item, index) in userList" :key="index">
        <i-col :lg="12" :sm="12" :xs="24">
          <div class="left">
            <div class="head-img" @click.stop="toUserInfo(item)">
              <img :src="item.headImage" alt="JIAHUAN">
            </div>
            <div class="info">
              <Badge :count="item.tips">
                <a href="#" class="name">{{item.realName}}</a>
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
  </div>
</template>
<script>
import { getPatientList } from 'api/getData'
export default {
  data() {
    return {
      userList: [],
      loading: true,
      invitedGuardian: false,
      invitedGuardianList: {
        name: '',
        phone: ''
      },
      addItem: {
        superviseName: ''
      }
    }
  },
  mounted() {
    this._getPatientList()
  },
  methods: {
    showModel(item) {
      this.invitedGuardian = true
    },
    _getPatientList() {
      getPatientList().then(res => {
        this.userList = res.data
        console.log(res.data)
      })
    },
    toUserInfo(item) {
      this.$router.push({
        path: '/u/p',
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
        console.log(this.userList[0].superviseList)
      }, 1000)
    }
  },
  computed: {}
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
</style>
