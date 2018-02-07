<template>
  <div class="footer-wrapper">
    <div class="footer-container">
      <row>
        <i-col :lg="6" :xs="12" :md="11" :sm="10" class="footer-item">
          <ul>
            <li class="title">公众服务</li>
            <li>专业风险评估</li>
            <li>健康团队即时服务</li>
            <li>专业知识获取</li>
            <li>全程健康管理</li>
          </ul>
        </i-col>
          <i-col :lg="6" :xs="12" :md="11" :sm="10" class="footer-item">
          <ul>
            <li class="title">医生服务</li>
            <li>与服务对象的即时沟通</li>
            <li>全方面的管理服务对象</li>
            <li>团队的组建于管理</li>
            <li>专业技能的提升</li>
          </ul>
        </i-col>
          <i-col :lg="5" :xs="12" :md="11" :sm="10" class="footer-item">
          <ul>
            <li class="title">佳护安实体</li>
            <li>一级实体</li>
            <li>二级实体</li>
            <li>三级实体</li>
            <li>纵向体系</li>
          </ul>
        </i-col>
          <i-col :lg="5" :xs="12" :md="11" :sm="10" class="footer-item">
          <ul>
            <li class="title">关于佳护安</li>
            <li>关于我们</li>
            <li>团队介绍</li>
            <li>加入我们</li>
            <li>联系我们</li>
          </ul>
        </i-col>
      </row>
    </div>
    <div class="copy-right">
      <span class="text"> Copyright&copy;2018.All Rights Reserved蜀ICP备15023422号</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.footer-wrapper
  margin-top 4.25rem
  background-color #2ca9e3
  padding 2.5rem
  .footer-container
    padding-bottom 1rem
    width 70%
    margin 0 auto
    border-bottom 1px solid #82d5ff
    @media screen and (max-device-width: 768px )
      display none
    .footer-item
      padding 1rem
      text-align left
      font-size 0.875rem
      color #ccefff
      .title
        font-size 1rem
        color #ffffff
        margin-bottom 1.875rem
      li
        line-height 2rem
        // padding 0.5rem
  .copy-right
    margin 0 auto
    .text
      font-size 14px
      color #82d5ff
      text-align left
      line-height 2rem
</style>
