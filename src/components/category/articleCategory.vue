<template>
  <div class="p-wrapper">
    <div class="edit-container">
      <Button type="info" icon="plus" size="small" @click="categoryAddModal = !categoryAddModal">添加分类</Button>
      <div class="box">
        <span>文章分类</span>
        <ul>
          <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)">{{item.name}}
          </li>
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
        width="360">
        <i-input v-model="uploadData.name"></i-input>
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>确认修改</span>
        </p>
        <div style="text-align:center">
            <p>如填写内容为空则会删除此项</p>
        </div>
        <div slot="footer">
            <i-button type="error" size="large" long :loading="loading" @click="categoryUpload">确定</i-button>
        </div>
      </Modal>
      <Modal
        v-model="categoryAddModal"
        width="360">
        <div>
          <Select v-model="categoryAddData.type" style="width:100%;margin-bottom:32px" placeholder="选择添加类型">
            <Option :value = 1>分类</Option>
            <Option :value = 2>标签</Option>
          </Select>
          <i-input v-model="categoryAddData.name" style="width:100%" placeholder="请确认添加字段唯一"></i-input>
        </div>
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>确认添加</span>
        </p>
        <div slot="footer">
            <i-button type="primary" size="large" long :loading="loading" @click="categoryAdd">添加</i-button>
        </div>
      </Modal>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>
<script>
import { getCategoryTag } from 'api/getData'
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
      spinShow: true, // 数据加载loading
      categoryAddData: {
        type: 1,
        name: '',
        action: 2 // 1课程,2文章
      } // 添加分类初始数据
    }
  },
  created() {
    this._getTagList() // 获取文章标签列表
  },
  computed: {},
  methods: {
    _getTagList() {
      let params = {
        dictType: ['articleCategory', 'articleTag']
      }
      getCategoryTag(params).then(res => {
        if (res.code === '200') {
          this.tagList = res.data.articleTag.splice(1)
          this.categoryList = res.data.articleCategory.slice(1)
          this.spinShow = false
        }
      })
    },
    selectCategory(item) {
      console.log(item)
      this.categoryUploadModal = true
      this.uploadData = item
    },
    categoryUpload() {
      let params = {
        id: this.uploadData.id,
        isDelete: this.uploadData.name.length ? 0 : 1,
        name: this.uploadData.name,
        action: 2,
        type: this.uploadData.type !== undefined ? this.uploadData.type : 1
      }
      updateCategory(params).then(res => {
        if (res.code === '200') {
          this.loading = false
          this.categoryUploadModal = false
          this.$Notice.info({
            title: res.message,
            desc: false
          })
          this._getTagList()
        } else {
          this.$Notice.error({
            title: res.message,
            desc: false
          })
        }
      })
    },
    categoryAdd() {
      let params = {
        // isDelete: 0,
        name: this.categoryAddData.name,
        action: 2,
        type: this.categoryAddData.type
      }
      updateCategory(params).then(res => {
        if (res.code === '200') {
          this.loading = false
          this.categoryAddModal = false
          this.$Notice.info({
            title: res.message,
            desc: false
          })
          this._getTagList()
        } else {
          this.$Notice.error({
            title: res.message,
            desc: false
          })
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
        position relative
        display inline-block
        margin 8px 16px 0 0
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