<template>
  <div class="p-wrapper">
    <div class="edit-container">
      <Button type="info" icon="plus" size="small" @click="categoryAddModal = !categoryAddModal">添加分类</Button>
      <div class="box">
        <span>视频分类</span>
        <ul>
          <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="box">
        <span>标签</span>
        <ul>
          <li v-for="(item, index) in tagList" :key="index" @click="selectCategory(item)">{{item.name}}</li>
        </ul>
      </div>
      <Modal
        v-model="categoryUploadModal"
        title="分类管理"
        @on-ok="categoryUpload"
        transfer
        :loading="loading">
        <i-input v-model="uploadData.name"></i-input>
      </Modal>
      <Modal
        v-model="categoryAddModal"
        title="分类管理"
        @on-ok="categoryAdd"
        transfer
        :loading="loading">
        <div>
          <Select v-model="categoryAddData.type" style="width:100%;margin-bottom:32px" placeholder="选择添加类型">
            <Option :value = "1">分类</Option>
            <Option :value = "2">标签</Option>
          </Select>
          <i-input v-model="categoryAddData.name" style="width:100%" placeholder="请确认添加字段唯一"></i-input>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import { getData } from 'api/getData'
import { updateCategory } from 'api/upload'
export default {
  data() {
    return {
      tagList: [], // 标签列表
      categoryList: [], // 分类列表
      tagCurrent: [], // 选中标签列表
      loading: false, // 发布手记加载中
      categoryUploadModal: false, // 修改分类modal
      categoryAddModal: false, // 添加分类modal
      uploadData: {}, // 修改分类存放数据
      categoryAddData: {
        type: null,
        name: '',
        action: 2
      }, // 添加分类初始数据
      type: null // 分类操作添加类型
    }
  },
  created() {
    this._getTagList() // 获取文章标签列表
  },
  computed: {},
  methods: {
    _getTagList() {
      let params = {}
      getData(params).then(res => {
        if (res.code === 200) {
          this.tagList = res.data.tagList
          this.categoryList = res.data.categoryList
        }
      })
    },
    selectCategory(item) {
      this.categoryUploadModal = true
      this.uploadData = item
    },
    categoryUpload() {
      let params = this.uploadData
      updateCategory(params).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.$Notice.info('操作成功')
        }
      })
    },
    categoryAdd() {
      let params = this.categoryAddData
      updateCategory(params).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.$Notice.info('操作成功')
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="stylus">
.p-wrapper
  height 100%
  .edit-container
    background #ffffff
    box-shadow 0 8px 16px 0 rgba(7, 17, 27, 0.05)
    padding 32px
    border-radius 8px
    .action-title
      display inline-block
      font-size 14px
      margin-right 32px
      line-height 32px
    .box
      position relative
      margin 16px 0 32px
      text-align left
      span
        font-size 14px
        line-height 28px
        color #002500
        margin-right 8px
      li
        display inline-block
        margin 8px 8px 0 0
        background rgba(7, 17, 27, 0.05)
        color #4D555D
        padding 0 12px
        height 24px
        line-height 24px
        cursor pointer
        border-radius 12px
        &:hover
          background rgba(7, 17, 27, 0.1)
          color #07111b
      .selectTagClass
        color #ffffff
        background #93999F
        &:hover
          color #ffffff
          background #93999F
      .logo-img
        position relative
        display inline-block
        width 400px
        height 220px
        text-align center
        line-height 120px
        border 1px solid transparent
        // border-radius 50%
        overflow hidden
        background #f8f8f9
        box-shadow 0 1px 1px rgba(0, 0, 0, 0.2)
        cursor pointer
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
          background rgba(0, 0, 0, 0.4)
      .quill-editor
        min-height 200px
        max-height 100%
        overflow-y auto
</style>