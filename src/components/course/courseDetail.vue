<template>
  <div class="p-wrapper">
    <div class="edit-container">
      <div class="box">
        <span class="t">课程标题</span>
        <i-input v-model="sectionData[0].title" placeholder="请输入标题" :maxlength="80" style="width:80%"></i-input>
        <i-switch v-model="courseInfo.status" size="small" :true-value="1" :false-value="0">
        </i-switch>
        <span class="is-recommend">推荐</span>
      </div>
        <div class="box">
        <span class="t">课程简介</span>
        <i-input v-model="courseInfo.description" placeholder="课程描述" :maxlength="80" style="width:80%" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
      </div>
      <div class="box">
        <span class="t">课程分类</span>
        <ul>
          <li v-for="(item, index) in categoryList" :key="index" @click="selectCategory(item)" :class="{selectTagClass: item.id === courseInfo.categoryCurrent}">{{item.name}}</li>
        </ul>
      </div>
      <!-- <div class="box">
        <span class="t">课程标签</span>
        <ul>
          <li v-for="(item, index) in tagList" :key="index" @click="selectTagGrou(item)" :class="{selectTagClass: item.id === courseInfo.tagCurrent}">{{item.name}}</li>
        </ul>
      </div> -->
      <div class="box">
        <span class="t">课程封面</span>
        <Upload
          :with-credentials="true"
          :show-upload-list="false"
          :default-file-list="courseInfo.defaultListThumbnail"
          :on-success="handleSuccessThumbnail"
          :max-size="20480"
          :on-error="handleError"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          action="http://cd.godo.pub:18080/kaola/common/file/upload">
          <div class="logo-img">
            <img height="220" width="400" :src="courseInfo.thumbnailUrl" alt="手记缩略图" v-if="courseInfo.thumbnailUrl">
            <div v-else>上传课程封面图</div>
            <div class="upload-list-cover">
              <Icon type="camera"></Icon>
              <!-- <span type="ios-trash-outline" @click.native="uploadLogo()">上传Logo</span> -->
            </div>
          </div>
        </Upload>
      </div>
      <div class="box">
        <span class="t">课程详情介绍图</span>
        <Upload
          :with-credentials="true"
          :show-upload-list="false"
          :default-file-list="courseInfo.defaultListInformation"
          :on-success="handleSuccessInformation"
          :max-size="20480"
          :on-error="handleError"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          action="http://cd.godo.pub:18080/kaola/common/file/upload">
          <div class="info-img">
            <img height="400" width="220" :src="courseInfo.informationUrl" alt="课程详细图" v-if="courseInfo.informationUrl">
            <div v-else>上传课程封面图</div>
            <div class="upload-list-cover">
              <Icon type="camera"></Icon>
              <!-- <span type="ios-trash-outline" @click.native="uploadLogo()">上传Logo</span> -->
            </div>
          </div>
        </Upload>
      </div>
      <div class="box">
        <span class="t">授课老师</span>
        <Select v-model="courseInfo.teacher" multiple>
          <Option v-for="item in teacherList" :value="item.value" :key="item.id">{{ item.realName }}</Option>
        </Select>
      </div>
      <div class="section-box">
        <span class="t">课程章节</span>
        <div class="input">
          <i-input v-model="searchName" style="width:45%" placeholder="搜索上传视频">
            <Button slot="append" icon="ios-search" @click="searchVideo">
              <span v-if="!loadingSearch">查询</span>
              <span v-else>loading...</span>
            </Button>
          </i-input>
        </div>
        <div class="input">
          <Table highlight-row ref="currentRowTable" :columns="columnsSearch" :data="searchResult" size="small" @on-select="selectVideo"></Table>
        </div>
        <div class="input">
          <i-input v-model="sectionAddData.title" placeholder="请输入章节标题,章标题不要选视频,添加小节必须且只能勾选一个视频" :maxlength="80"></i-input>
        </div>
        <Tree :data="sectionData" :render="renderContent"></Tree>
      </div>
      <div>
        <Button type="error" :loading="loading" @click="updateCourse">
          <span v-if="!loading">更新课程</span>
          <span v-else>Loading...</span>
        </Button>
        <!-- <router-link to="/" tag="li">返回</router-link> -->
        <Button type="info" @click="backHome">关闭</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getCategoryTag, getCourseDetail, getTeacherList, searchVideoHandle } from 'api/getData'
import { createCourse } from 'api/upload'
export default {
  data() {
    return {
      tagList: [], // 标签列表
      categoryList: [], // 分类列表
      loading: false, // 发布手记加载中
      loadingSearch: false, // 查询视频加载
      courseInfo: {
        status: 0, // 是否推荐
        tagCurrent: [], // 选中标签列表
        thumbnail: null, // 缩略图id
        thumbnailUrl: '', // 缩略图url
        information: null, // 详情图id
        informationUrl: '', // 详情图url
        categoryCurrent: 0,
        defaultListThumbnail: [], // 课程缩略图背景默认
        defaultListInformation: [], // 课程详情图背景默认
        description: '', // 课程描述
        teacher: [] // 授课老师

      },
      sectionAddData: {
        title: '',
        videoId: '',
        duration: ''
      },
      sectionTree: [
        // {
        //   title: '这是第一章标题',
        //   expand: true,
        //   children: [
        //     {
        //       title: '这tm是第一小节标题',
        //       expand: true
        //     },
        //     {
        //       title: '这tm是第二小节标题',
        //       expand: true
        //     }
        //   ]
        // },
        // {
        //   title: '这tm是第二章标题',
        //   expand: true
        // }
      ], // 章节树形树初始数据
      sectionData: [
        {
          title: '', // 课程名称标题
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              },
              [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'social-youtube'
                    },
                    style: {
                      marginRight: '8px',
                      color: '#1c2438',
                      fontSize: '16px'
                    }
                  }),
                  h(
                    'span',
                    {
                      style: {
                        color: '#1c2438',
                        fontSize: '16px',
                        fontWeight: '700'
                      }
                    },
                    data.title
                  )
                ]),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      float: 'right',
                      marginRight: '32px'
                    }
                  },
                  [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-plus-empty',
                        type: 'info'
                      }),
                      style: {
                        width: '52px'
                      },
                      on: {
                        click: () => {
                          this.appendSectionTitle(data)
                        }
                      }
                    })
                  ]
                )
              ]
            )
          },
          children: []
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      },
      searchName: '', // 搜索上传视频文件
      columnsSearch: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '视频id',
          key: 'videoId'
        },
        {
          title: '名称',
          key: 'fileName'
        },

        {
          title: '上传日期',
          key: 'createTime',
          width: '120'
        }
      ],
      searchResult: [], // 按名称查询结果
      teacherList: []
    }
  },
  created() {
    this._getTagList() // 获取文章标签列表
    this._getCourseDetail()
    this._getTeacherList()
    this.sectionData[0].children = this.sectionTree
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
      let params = {
        dictType: ['courseCategory']
      }
      getCategoryTag(params).then(res => {
        if (res.code === '200') {
          // this.tagList = res.data.articleTag.splice(1)
          this.categoryList = res.data.courseCategory.slice(1)
        }
      })
    },
    _getTeacherList() {
      let params = {
        page: 1,
        pageSize: 100,
        nameOnly: true
      }
      getTeacherList(params).then(res => {
        if (res.code === '200') {
          this.teacherList = res.data
        }
      })
    },
    _getCourseDetail() {
      let params = {
        id: this.$route.query.id
      }
      getCourseDetail(params).then(res => {
        if (res.code === '200') {
          console.log(res)
        }
        this.sectionData[0].title = res.data.title
        this.courseInfo.tagCurrent = res.data.tag
        this.courseInfo.categoryCurrent = res.data.categoryId
        this.courseInfo.description = res.data.description
        this.courseInfo.informationUrl = res.data.informationUrl
        this.courseInfo.thumbnailUrl = res.data.thumbnailUrl
        this.sectionData[0].children = res.data.sectionList
        // this.courseInfo.status = res.data.status
        this.courseInfo.teacher = res.data.teacher
      })
    },
    selectTagGrou(item) {
      this.courseInfo.tagCurrent = item.id
    },
    updateCourse() {
      this.loading = true
      let params = {
        title: this.sectionData[0].title,
        description: this.courseInfo.description,
        category: this.courseInfo.categoryCurrent,
        thumbnail: this.courseInfo.thumbnail,
        information: this.courseInfo.information,
        section: this.sectionData[0].children,
        teacher: this.courseInfo.teacher
      }
      createCourse(params).then(res => {
        if (res.code === '200') {
          this.loading = false
          this.$Notice.info('操作成功')
        } else {
          this.loading = false
          this.$Notice.error({
            title: res.message,
            desc: false
          })
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
      this.courseInfo.categoryCurrent = item.id
      // console.log(item)
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
    handleSuccessThumbnail(res, file) {
      // 课程缩略图上传成功钩子
      if (res.code === '200') {
        this.$Notice.success({
          title: '操作成功',
          desc: '操作成功,请完善其他信息',
          duration: 5
        })
        this.courseInfo.thumbnailUrl = res.data.url
        this.courseInfo.thumbnail = res.data.id
      } else {
        this.$Notice.error({
          title: '上传失败',
          desc: `${res.message}`,
          duration: 5
        })
      }
    },
    handleSuccessInformation(res, file) {
      // 课程详情图上传成功钩子
      if (res.code === '200') {
        this.$Notice.success({
          title: '操作成功',
          desc: '操作成功,请完善其他信息',
          duration: 5
        })
        this.courseInfo.informationUrl = res.data.url
        this.courseInfo.information = res.data.id
      } else {
        this.$Notice.error({
          title: '操作失败',
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
    setRecommend(status) {
      console.log(status)
    },
    // 章节操作
    renderContent(h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-videocam'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            },
            [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-plus-empty'
                }),
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.appendVideo(data)
                    console.log(data)
                  }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-minus-empty'
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data)
                  }
                }
              })
            ]
          )
        ]
      )
    },
    // 按名称搜索课程
    searchVideo() {
      console.log(this.searchName)
      let params = {
        fileName: this.searchName,
        pageSize: 50
      }
      searchVideoHandle(params).then(res => {
        this.loadingSearch = true
        if (res.code === '200') {
          this.searchResult = res.data.pageData
          this.loadingSearch = false
        } else {
          this.loadingSearch = false
          this.$Notice.error({
            title: res.message,
            desc: false
          })
        }
      })
    },
    selectVideo(status) {
      console.log(status)
      this.sectionAddData.videoId = status[0].videoId
      this.sectionAddData.duration = status[0].duration
    },
    appendSectionTitle(data) {
      const children = data.children || []
      children.push({
        title: this.sectionAddData.title,
        expand: true
      })
      this.sectionAddData.title = ''
      this.$set(data, 'children', children)
    },
    appendVideo(data) {
      const children = data.children || []
      children.push({
        title: this.sectionAddData.title,
        videoId: this.sectionAddData.videoId,
        duration: this.sectionAddData.duration,
        expand: true
      })
      this.sectionAddData.title = ''
      this.sectionAddData.videoId = ''
      this.$set(data, 'children', children)
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
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
      .info-img
        position relative
        display inline-block
        width 220px
        height 400px
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
    .section-box
      text-align left
      background #f8f8f9
      padding 16px
      margin 32px auto
      .t
        font-size 14px
        line-height 28px
        color #002500
        margin-right 8px
      .input
        margin-bottom 16px
</style>