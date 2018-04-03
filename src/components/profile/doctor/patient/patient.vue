<template>
  <div class="patient-wrapper">
    <Row>
      <i-col :lg="4" :md="6" :xs="24" class="item">
        <i-input v-model="patient.keyword" placeholder="查询字段"></i-input>
      </i-col>
      <i-col :lg="4" :md="4" :xs="24" offset="1" class="item">
        <Select v-model="patient.item" placeholder="选择字段" style="width:80%">
          <Option v-for="(i, index1) in searchItemList" :value="i.value" :key="index1">{{ i.key }}</Option>
        </Select>
      </i-col>
      <i-col :lg="4" :md="4" :xs="24" class="item">
        <i-input v-model="patient.valueMin" placeholder="最小值"></i-input>
      </i-col>
      <i-col :lg="4" :md="4" :xs="24" class="item">
        <i-input v-model="patient.valueMax" placeholder="最大值"></i-input>
      </i-col>
      <i-col :lg="4" :md="4" :xs="24" class="item">
        <Button type="primary" icon="search" @click="searchTalbe">搜索</Button>
      </i-col>
    </Row>
    <div class="table-wrapper">
      <Table :columns="tableColumns" :data="tableData" ref="table"></Table>
      <div class="export">
      <Upload
        ref="uploadTable"
        :headers= "{
          authorization: this.token
        }"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :max-size="20480"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        action="http://192.168.0.6:9080/jiahuan/doctor/excel/import">
        <Button type="info" size="small"><Icon type="ios-cloud-upload-outline"></Icon> <span style="padding-left:0.2rem">导入数据</span> </Button>
      </Upload>
        <Button type="info" size="small" @click="exportTable" v-if="pageShow"><Icon type="ios-download-outline"></Icon> <span style="padding-left:0.2rem" >导出数据</span> </Button>
      </div>
    </div>
    <div class="page-nav" v-if="pageShow">
      <Page :total="total" size="small" show-total show-elevator show-sizer :page-size-opts="pageSizeOptions" @on-change="change"></Page>
    </div>
  </div>
</template>
<script>
import {getPatient} from 'api/getData'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      patient: {
      keyword: '',
      item: '',
      valueMin: '',
      valueMax: ''
    },
    total: 0,
    pageShow: false,
    page: 1,
    pageSize: 10,
    searchItemList: [
      {
        key: '年龄',
        value: '年龄'
      },
      {
        key: 'MMSE',
        value: 'MMSE'
      },
      {
        key: 'MOCA',
        value: 'MOCA'
      },
      {
        key: '叶酸',
        value: '叶酸'
      },
      {
        key: '铁蛋白',
        value: '铁蛋白'
      },
      {
        key: '空腹葡萄糖',
        value: '空腹葡萄糖'
      },
      {
        key: '总胆固醇',
        value: '总胆固醇'
      },
      {
        key: '甘油三酯',
        value: '甘油三酯'
      },
      {
        key: '低密度蛋白',
        value: '低密度蛋白'
      },
      {
        key: '高密度蛋白',
        value: '高密度蛋白'
      },
      {
        key: '载脂蛋白a',
        value: '载脂蛋白a'
      },
      {
        key: '载脂蛋白b',
        value: '载脂蛋白b'
      },
      {
        key: '脂蛋白a',
        value: '脂蛋白a'
      },
      {
        key: '血沉',
        value: '血沉'
      },
      {
        key: '谷丙转氨酶',
        value: '谷丙转氨酶'
      },
      {
        key: '肌酐',
        value: '肌酐'
      },
      {
        key: '尿素',
        value: '尿素'
      },
      {
        key: '血红蛋白浓度',
        value: '血红蛋白浓度'
      },
      {
        key: '红细胞积压',
        value: '红细胞积压'
      },
      {
        key: '凝血酶原时间',
        value: '凝血酶原时间'
      },
      {
        key: '凝血酶时间',
        value: '凝血酶时间'
      },
      {
        key: '活化部分凝血活酶时间',
        value: '活化部分凝血活酶时间'
      },
      {
        key: '纤维原蛋白',
        value: '纤维原蛋白'
      },
      {
        key: 'D-二聚体',
        value: 'D-二聚体'
      },
      {
        key: '同型半胱氨酸',
        value: '同型半胱氨酸'
      }
    ],
    tableColumns: [],
    tableData: [],
    pageSizeOptions: [20, 30, 50],
    uploadTableModel: false,
    defaultList: []
    }
  },
  created() {
    this._getPatient()
  },
  methods: {
    _getPatient() {
      let params = {
        keyword: this.patient.keyword,
        item: this.patient.value,
        valueMin: this.patient.valueMin,
        valueMax: this.patient.valueMax,
        page: this.page,
        pageSize: this.pageSize
      }
      getPatient(params).then(res => {
        if (res.code === '200') {
          console.log(res.data.totalRecord)
          this.tableColumns = res.data.tableColumns
          this.tableData = res.data.pageData
          this.total = res.data.totalRecord
          this.pageShow = true
          if (res.data.totalRecord > 40) {
            this.pageSizeOptions.push(res.data.totalRecord)
          }
        } else {
          this.tableColumns = []
          this.tableData = []
          this.pageShow = false
          this.$Message.error(res.message)
        }
      })
    },
    // 文件上传
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
    handleSuccess(res, file) { // 文件上传成功钩子
      this.$Message.info('操作成功')
    },
    searchTalbe() {
      this._getPatient()
    },
    change(page) {
      this.page = page
      console.log(this.pageSize)
      this._getPatient()
    },
    exportTable() {
      this.$refs.table.exportCsv({
        filename: `患者导出数据`
      })
    },
    uploadTable() {

    }
  },
  computed: {
    ...mapGetters([
        'token',
        'usertype'
      ])
  }
}
</script>
<style lang="stylus">
.patient-wrapper
  .item
    margin-bottom 1rem
  .table-wrapper
    width 100%
    padding-top 1rem
  .export
    margin 1rem auto
    text-align left
  .page-nav
    margin-top 2rem
  .ivu-upload
    display inline-block
</style>
