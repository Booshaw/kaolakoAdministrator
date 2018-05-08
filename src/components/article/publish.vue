<template>
  <div class="p-wrapper">
    <div class="edit-container">
      <div class="box">
        <span class="t">标题</span>
        <i-input v-model="title" placeholder="请输入标题" :maxlength="80" style="width:80%"></i-input>
        <i-switch v-model="status" @on-change="setStatus" size="small" :true-value="1" :false-value="0">
        </i-switch>
        <span class="is-recommend">推荐</span>
      </div>
      <div class="box">
        <span class="t">正文</span>
        <div class="quill-editor">
          <quill-editor ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </div>
      </div>
      <div class="box">
        <span class="t">分类</span>
        <ul>
          <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)" :class="{selectTagClass: item.id === categoryCurrent}">{{item.name}}</li>
        </ul>
      </div>
      <div class="box">
        <span class="t">标签</span> <span>{{tagCurrent.length}}/3</span>
        <ul>
          <li v-for="(item, index) in tagList" :key="index" @click="selectTagGrou(item)" :class="{selectTagClass: (tagCurrent.indexOf(item.id))!== -1}">{{item.name}}</li>
        </ul>
      </div>
      <div class="box">
        <span class="t">文章封面</span>
        <Upload
          :with-credentials="true"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :max-size="20480"
          :on-error="handleError"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          action="http://kaola.eaon.win:8080/kaola/common/file/upload">
          <div class="logo-img">
            <img height="400" width="220" :src="thumbnailUrl" alt="手记缩略图" v-if="thumbnailUrl">
            <div v-else>上传手记封面图</div>
            <div class="upload-list-cover">
              <Icon type="camera"></Icon>
              <!-- <span type="ios-trash-outline" @click.native="uploadLogo()">上传Logo</span> -->
            </div>
          </div>
        </Upload>
      </div>
      <div>
        <Button type="error" :loading="loading" @click="createArticle">
          <span v-if="!loading">发布手记</span>
          <span v-else>Loading...</span>
        </Button>
        <!-- <router-link to="/" tag="li">返回</router-link> -->
        <Button type="info" @click="backHome">关闭</Button>
      </div>
      </div>
    </div>
</template>
<script>
// import hljs from 'highlight.js'
// import VueQuillEditor, { Quill } from 'vue-quill-editor'
// import { ImageDrop } from 'quill-image-drop-module'
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageDrop', ImageDrop)
// Quill.register('modules/imageResize', ImageResize)
import { getData } from 'api/getData'
import { uploadArticle } from 'api/upload'
export default {
  data() {
    return {
      title: '', // 文章标题
      tagList: [], // 标签列表
      status: 0, // 是否推荐
      categoryList: [], // 分类列表
      tagCurrent: [], // 选中标签列表
      loading: false, // 发布手记加载中
      thumbnail: '', // 缩略图id
      thumbnailUrl: '', // 缩略图url
      categoryCurrent: 0,
      defaultList: [],
      content: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
          // history: {
          //   delay: 1000,
          //   maxStack: 50,
          //   userOnly: false
          // },
          // imageDrop: true,
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        }
      }
    }
  },
  created() {
    this._getTagList() // 获取文章标签列表
    // console.log(this.cookie)
  },
  computed: {
    // selectTag(item) {
    //   let isSelect = false
    //   this.tagCurrent.forEach((value) => {
    //     if (value === item.id) {
    //       isSelect = true
    //     }
    //   })
    //   return {
    //     selectTagClass: true
    //   }
    // }
  },
  methods: {
    _getTagList() {
      let params = {}
      getData(params).then(res => {
        if (res.code === 200) {
          // console.log(res)
          this.tagList = res.data.tagList
          this.categoryList = res.data.categoryList
        }
      })
    },
    selectTagGrou(item) {
      // if(this.tagCurrent.indexOf(item.id) === -1) {
      //   console.log(i)
      // }

      let index = this.tagCurrent.indexOf(item.id)
      if (index === -1) {
        this.tagCurrent.push(item.id)
      } else {
        this.tagCurrent.splice(index, 1)
      }
      this.tagCurrent = Object.assign(this.tagCurrent.slice(0, 3))
      console.log(this.tagCurrent)
    },
    createArticle() {
      this.loading = true
      let params = {
        title: this.title,
        status: this.status,
        thumbnail: this.thumbnail,
        category: this.categoryCurrent,
        tag: this.tagCurrent,
        content: this.content
      }
      uploadArticle(params).then(res => {
        if (res.code === '200') {
          this.loading = false
          this.$Notice.info('操作成功')
        }
      })
    },
    // selectTagGroup(item) {
    //   if(this.tagCurrent.length === 0){
    //     this.tagCurrent.push(item.id)
    //   } else if (this.tagCurrent.length > 0 && this.tagCurrent.length <= 3) {
    //     let tLength = this.tagCurrent.length
    //     for(let i = 0;i < tLength; i++) {
    //       if(this.tagCurrent[i] === item.id) {
    //         this.tagCurrent.splice(i, 1)
    //       } else {
    //         this.tagCurrent.push(item.id)
    //       }
    //     }
    //   } else {
    //     return
    //   }
    //   console.log(this.tagCurrent)
    // },
    selectCategory(item) {
      this.categoryCurrent = item.id
      // console.log(item)
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },

    // 文件上传
    handleBeforeUpload() {
      // 上传前钩子
    },
    handleFormatError() {
      // 格式化检查钩子
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件超出限制大小',
        desc: '文件  ' + file.name + '不能超过20M.'
      })
    },
    handleSuccess(res, file) {
      // 文件上传成功钩子
      if (res.code === '200') {
        this.$Notice.success({
          title: '患者数据导入',
          desc: '上传excel数据成功',
          duration: 5
        })
        this.thumbnailUrl = res.data.url
        this.thumbnail = res.data.id
      } else {
        this.$Notice.error({
          title: '上传失败',
          desc: `${res.message}`,
          duration: 5
        })
      }
    },
    handleError(res, file) {
      this.$Notice.error({
        title: '上传失败',
        desc: `${res.message}`,
        duration: 5
      })
    },
    backHome() {
      this.$router.push({
        path: '/'
      })
    },
    setStatus(status) {
      console.log(status)
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
    .box
      position relative
      margin 16px 0 32px
      text-align left
      .t
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
      .is-recommend
        font-size 12px
        color #80818f
</style>