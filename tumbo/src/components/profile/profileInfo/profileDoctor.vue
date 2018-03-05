<template>
  <div class="d-profile-wrapper">
    <div class="title">
      <h3 class="text">会员消息</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.member" :key="index" :lg="5" class="item">
          <Badge dot :count="item.value">
            <a href="#">{{item.type}} <Icon type="ios-bell-outline" size="24"></Icon></a>
          </Badge>
        </i-col>
      </Row>
    </div>
    <div class="title">
      <h3 class="text">团队消息</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.team" :key="index" :lg="5" class="item">
          <Badge dot :count="item.value">
            <a href="#">{{item.type}} <Icon type="ios-bell-outline" size="24"></Icon></a>
          </Badge>
        </i-col>
      </Row>
    </div>
    <div class="title">
      <h3 class="text">平台消息</h3>
      <Row>
        <i-col v-for="(item, index) in messageList.admin" :key="index" :lg="5" class="item">
          <Badge dot :count="item.value">
            <a href="#">{{item.type}} <Icon type="ios-bell-outline" size="24"></Icon></a>
          </Badge>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      messageList: {
        member: [
        {
          type: '风险警示',
          value: '19'
        },
        {
          type: '最新咨询',
          value: '1'
        },
        {
          type: '会员投诉',
          value: '0'
        },
        {
          type: '随访提示',
          value: '9'
        }
      ],
      team: [
        {
          type: '成员沟通',
          value: '19'
        },
        {
          type: '成员加入',
          value: '1'
        },
        {
          type: '成员退出',
          value: '0'
        },
        {
          type: '团队授权',
          value: '9'
        }
      ],
      admin: [
        {
          type: '平台通知',
          value: '19'
        }
      ]
      }
    }
  }
}
</script>
<style lang="stylus">
  .d-profile-wrapper
    margin-top 1rem
    margin-left 2rem
    text-align left
    .title
      margin-bottom 2rem
      .text
        font-size 1rem
        border-bottom 1px solid #eeeeee
        padding-bottom 0.5rem
      .item
        display inline-block
        padding 2rem
        background #ffffff
        margin-right 0.5rem
        text-align center
        border-radius 4px
        &:hover
          box-shadow 0.2rem 0.2rem 0.2rem 0 rgba(7, 17, 27, 0.1)
</style>
