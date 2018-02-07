<template>
  <div class="info-wrapper">
    <div class="content-wrapper">
      <div class="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem to="/userInfo">返回我的家庭</BreadcrumbItem>
          <BreadcrumbItem>成员详细</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">基本资料
          <Tooltip content="点击修改资料" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="addPersonalMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <Row>
            <i-col :lg="5" :md="4" :sm="12" :xs="24">
              <p><span>姓名:</span>{{basicInformation.name}}</p>
              <p><span>年龄:</span>{{basicInformation.age}}</p>
              <p><span>身高:</span>{{basicInformation.height}}cm</p>
            </i-col>
            <i-col :lg="5" :md="4" :sm="12" :xs="24">
              <p><span>性别:</span>{{basicInformation.gender}}</p>
              <p><span>名族:</span>{{basicInformation.nation}}</p>
              <p><span>体重:</span>{{basicInformation.weight}}Kg</p>
            </i-col>
            <i-col :lg="5" :md="7" :sm="12" :xs="24">
              <p><span>学历:</span>{{basicInformation.degree}}</p>
              <p><span>电话:</span>{{basicInformation.phone}}</p>
              <p><span>出生日期:</span>{{basicInformation.birthdate}}</p>
            </i-col>
            <i-col :lg="9" :md="9" :sm="12" :xs="24">
              <p><span>邮箱:</span>{{basicInformation.email}}</p>
              <p><span>紧急联系电话:</span>{{basicInformation.emergencyCall}}</p>
              <p><span>身份证:</span>{{basicInformation.idCard}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>联系地址:</span>{{basicInformation.address}}</p>
              <p><span>工作单位:</span>{{basicInformation.unit}}</p>
            </i-col>
          </Row>
          <!-- <ul>
            <li v-for="(item, index) in patientDetail.basicInformation" :key="index" class="item">
              {{item.notes}}:{{item.value}}
            </li>
          </ul> -->
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">个人史
          <Tooltip content="点击修改个人史" placement="top-start">
            <svg class="update-icon" aria-hidden="true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <ul>
            <li v-for="(item, index) in patientDetail.personalHistory" :key="index" class="item">
              <p><span>{{item.notes}}:</span>{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">既往史
          <Tooltip content="点击修改既往史" placement="top-start">
            <svg class="update-icon" aria-hidden="true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <ul>
            <li v-for="(item, index) in patientDetail.pastMedicalHistory" :key="index" class="item">
              <p><span>{{item.notes}}:</span>{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">家族史
          <Tooltip content="家族史" placement="top-start">
            <svg class="update-icon" aria-hidden="true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <ul>
            <li v-for="(item, index) in patientDetail.familyHistory" :key="index" class="item">
              <p><span>{{item.notes}}:</span>{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--个人信息修改弹窗-->
    <Modal
      v-model="addPersonalMedol"
      title="基本资料修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="40" inline class="form">
        <!-- <FormItem v-for="(item, index) in personalInfo" :label="item.notes" :key="index">
          <i-input v-model="item.value" v-if="item.inputType === 'text'">
          </i-input>
          <DatePicker type="date" placeholder="选择时间" v-model="item.value" v-if="item.inputType === 'date'"></DatePicker>
          <Select v-model="item.value" v-if="item.inputType === 'select'">
            <Option v-for="options in item.dataList" :value="options.value" :key="options.value">{{ options.label }}</Option>
          </Select>
          <Cascader :data="cityData" trigger="hover" v-if="item.inputType === 'cascader'"></Cascader>
        </FormItem> -->
        <FormItem label="姓名">
          <i-input v-model="personalInfo.name"></i-input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="personalInfo.gender">
            <Option value="1">男</Option>
            <Option value="2">女</Option>
          </Select>
        </FormItem>
        <FormItem label="学历">
          <Select v-model="personalInfo.degree">
            <Option value="1">本科</Option>
            <Option value="2">二年级</Option>
          </Select>
        </FormItem>
        <FormItem label="名族">
          <Select v-model="personalInfo.nation.value">
            <Option v-for="(item, index) in personalInfo.nation.dataList" :value="item.value" :key="index">{{item.key}}</Option>
          </Select>
        </FormItem>
        <FormItem label="年龄">
          <i-input v-model="personalInfo.age" style="width: 60px"></i-input>
        </FormItem>
         <FormItem label="身高">
          <i-input v-model="personalInfo.height" style="width: 60px"></i-input>
        </FormItem>
        <FormItem label="体重">
          <i-input v-model="personalInfo.weight" style="width: 60px"></i-input>
        </FormItem>
        <FormItem label="电话">
          <i-input v-model="personalInfo.phone"></i-input>
        </FormItem>
        <FormItem label="紧急电话">
          <i-input v-model="personalInfo.emergencyCall"></i-input>
        </FormItem>
        <FormItem label="邮箱">
          <i-input v-model="personalInfo.email"></i-input>
        </FormItem>
        <FormItem label="出生日期">
          <DatePicker type="date" placeholder="选择日期"></DatePicker>
        </FormItem>
        <FormItem label="地址">
          <Cascader :data="cityData" trigger="hover"></Cascader>
        </FormItem>
        <FormItem label="详细地址">
          <i-input v-model="personalInfo.address"></i-input>
        </FormItem>
        <FormItem label="身份证">
          <i-input v-model="personalInfo.idCard"></i-input>
        </FormItem>
        <FormItem label="工作单位">
          <i-input v-model="personalInfo.unit"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getPatientDetail } from 'api/teamList'
export default {
  data() {
    return {
      patientDetail: {},
      basicInformation: {},
      addPersonalMedol: false,
      personalInfo: {
        name: '张三',
        age: 24,
        height: 175,
        gender: '1',
        nation: {
          key: '汉族',
          value: '0',
          dataList: [
            {
              key: '汉',
              value: '0'
            },
            {
              key: '汉族',
              value: '1'
            },
            {
              key: '汉族',
              value: '2'
            },
            {
              key: '汉族',
              value: '3'
            },
            {
              key: '汉族',
              value: '4'
            },
            {
              key: '汉族',
              value: '5'
            }
          ]
        },
        weight: 55,
        degree: '1',
        phone: 17877706664,
        birthdate: '2018-8-10',
        email: '3565@gmial.com',
        emergencyCall: '19877773333',
        idCard: '512756789087564422',
        address: '成都市锦江区牛王庙东大街',
        unit: 'treeTumbo'
      },
      info: [
        {
          value: null,
          key: 'name',
          notes: '姓名',
          inputType: 'text'
        },
        {
          value: null,
          key: 'age',
          notes: '年龄',
          inputType: 'text'
        },
        {
          value: null,
          key: 'gender',
          notes: '性别',
          dataList: [
            {
              value: '1',
              label: '男'
            },
            {
              value: '2',
              label: '女'
            }
          ],
          inputType: 'select'
        },
        {
          value: null,
          key: 'height',
          notes: '身高',
          inputType: 'text'
        },
        {
          value: null,
          key: 'nation',
          notes: '名族',
          inputType: 'select'
        },
        {
          value: null,
          key: 'weight',
          notes: '体重',
          inputType: 'text'
        },
        {
          value: null,
          key: 'degree',
          notes: '学历',
          dataList: [
            {
              value: '1',
              label: '小学一年级'
            },
            {
              value: '2',
              label: '小学二年级'
            },
            {
              value: '3',
              label: '小学三年级'
            },
            {
              value: '4',
              label: '小学四年级'
            },
            {
              value: '5',
              label: '小学一年级'
            },
            {
              value: '6',
              label: '小学二年级'
            },
            {
              value: '7',
              label: '小学三年级'
            },
            {
              value: '8',
              label: '小学四年级'
            },
            {
              value: '9',
              label: '小学一年级'
            },
            {
              value: '10',
              label: '小学二年级'
            },
            {
              value: '11',
              label: '小学三年级'
            },
            {
              value: '12',
              label: '小学四年级'
            },
            {
              value: '13',
              label: '小学一年级'
            },
            {
              value: '14',
              label: '小学二年级'
            },
            {
              value: '15',
              label: '小学三年级'
            },
            {
              value: '16',
              label: '小学四年级'
            },
            {
              value: '17',
              label: '中学'
            }
          ],
          inputType: 'select'
        },
        {
          value: null,
          key: 'phone',
          inputType: 'text',
          notes: '电话'
        },
        {
          value: null,
          key: 'email',
          notes: '邮箱',
          inputType: 'text'
        },
        {
          value: '2018-11-12',
          key: 'birthdate',
          notes: '出生日期',
          inputType: 'date'
        },
        {
          value: null,
          key: 'idCard',
          notes: '身份证',
          inputType: 'text'
        },
        {
          value: null,
          key: 'emergencyCall',
          notes: '紧急联系电话',
          inputType: 'text'
        },
        {
          value: null,
          key: 'address',
          notes: '地址',
          inputType: 'cascader'
        },
        {
          value: null,
          key: 'addressInfo',
          notes: '详细地址',
          inputType: 'text'
        },
        {
          value: null,
          key: 'unit',
          notes: '工作单位',
          inputType: 'text'
        }
      ],
      cityData: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        },
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.init()
    this._getPatientDetail()
  },
  methods: {
    ok() {
      this.$Message.info('Clicked ok')
      console.log(this.personalInfo)
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    },
    init() {
      console.log('测试个人页面')
    },
    _getPatientDetail() {
      getPatientDetail().then(res => {
        this.patientDetail = res.data
        this.basicInformation = res.data.basicInformation
        console.log(this.patientDetail)
      })
    }
  }
}
</script>
<style lang="stylus">
.info-wrapper
  position relative
  margin-top 3.25rem
  .content-wrapper
    width 70%
    margin 0 auto
    @media screen and (max-width: 768px)
      width 100%
      padding 0 0.5rem
    .bread-crumb
      text-align left
      padding 0.5rem
      line-height 1.2
    .add-patient-wrapper
      padding 1rem
      background #fff
      .title
        // display inline-block
        text-align left
        font-size 1.2rem
        color #5a5e66
        border-bottom 1px solid #eeeeee
        padding-bottom 1rem
      .base
        padding 1rem
        text-align left
        line-height 1.8
        font-size 1rem
        border-radius 4px
        // box-shadow 0.5rem 0.5rem 0.5rem 0 rgba(7, 17, 27, 0.1)
        span
          margin-right 0.5rem
    .form
      text-align left
  .update-icon
    width 1.5em
    height 1.5em
    vertical-align -0.4em
    fill currentColor
    overflow hidden
    cursor pointer
    color #61dfe1
</style>