<template>
  <div class="m-wrapper">
    <div class="search-wrapper">
      <span class="search-title">姓名:</span>
      <i-input v-model="search.name" class="input" size="small"></i-input>
      <span class="search-title">疾病名称:</span>
      <Select v-model="search.disease" class="input" size="small" clearable>
        <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{item.diseaseName}}</Option>
      </Select>
      <Button type="info" shape="circle" icon="ios-search" size="small" @click.stop="getMemberList">搜索</Button>
    </div>
    <div class="m-table">
      <Table :data="data" :columns="columns" size="small" @on-row-click="toMemberInfo"></Table>
    </div>
  </div>
</template>
<script>
import {getMemberList, getDict} from 'api/getData'
export default {
  data() {
    return {
      search: {
        name: null,
        disease: null,
        id: ''
      },
      dict: {
        disease: []
      },
      columns: [
                {
                    title: '姓名',
                    key: 'realName',
                    width: 120,
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                        h('strong', params.row.realName),
                        h('Icon', {
                          props: {
                            type: params.row.gender === '1' ? 'female' : 'male'
                          },
                          style: {
                            color: params.row.gender === '1' ? '#ec407a' : '#2196f3',
                            paddingLeft: '0.2rem'
                          }
                      })])
                    }
                },
                {
                    title: '年龄',
                    key: 'age',
                    width: 80,
                    sortable: true,
                    align: 'center'
                },
                {
                    title: '疾病类别',
                    key: 'diseaseClass',
                    align: 'center'
                }
            ],
      data: []
    }
  },
  created() {
    this._getDict()
    this.getMemberList()
  },
  methods: {
    // 跳转会员详情页
    toMemberInfo(data) {
      this.$router.push({
        path: '/u/p',
        query: { id: data.patientId }
      })
    },
    // 获取字典数据列表
    _getDict() {
      const params = {
        dictType: [
          'disease'
        ],
        diseaseType: 2
      }
      getDict(params).then(res => {
        this.dict.disease = res.data.disease
        console.log(this.dict.disease)
      })
    },
    getMemberList() {
      let params = {
        name: this.search.name,
        disease: this.search.disease
      }
      getMemberList(params).then(res => {
        if (res.code === '200') {
          this.data = res.data
        } else {
          this.$Message.error(res.message)
          this.data = []
        }
      })
    }
  }
}
</script>
<style lang="stylus">
  .m-wrapper
    .search-wrapper
      margin 0 auto
      .search-title
        font-size 0.875rem
      .input
        width 6rem
        margin-right 1rem
    .m-table
      margin 2rem 0
</style>
