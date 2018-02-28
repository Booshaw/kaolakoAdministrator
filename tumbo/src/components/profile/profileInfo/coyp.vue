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
            <svg class="update-icon" aria-hidden="true" @click.stop="changePersonalBaseMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <Row>
            <i-col :lg="5" :md="4" :sm="12" :xs="24">
              <p><span>姓名:</span>{{basicInformation.name}}</p>
              <p><span>年龄:</span>{{basicInformation.age}}岁</p>
              <p><span>身高:</span>{{basicInformation.height}}cm</p>
            </i-col>
            <i-col :lg="5" :md="4" :sm="12" :xs="24">
              <p><span>性别:</span>{{basicInformation.gender | genderFilter}}</p>
              <p><span>名族:</span>{{basicInformation.ethnicity | ethnicityFilter}}</p>
              <p><span>体重:</span>{{basicInformation.weight}}Kg</p>
            </i-col>
            <i-col :lg="5" :md="7" :sm="12" :xs="24">
              <p><span>学历:</span>{{basicInformation.degree | degreeFilter}}</p>
              <p><span>电话:</span>{{basicInformation.phone}}</p>
              <p><span>出生日期:</span>{{basicInformation.birthDate | parseTime('{y}-{m}-{d}')}}</p>
            </i-col>
            <i-col :lg="9" :md="9" :sm="12" :xs="24">
              <p><span>邮箱:</span>{{basicInformation.email}}</p>
              <p><span>紧急联系电话:</span>{{basicInformation.emergencyCall}}</p>
              <p><span>身份证:</span>{{basicInformation.idCard}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>户籍地址:</span>{{basicInformation.address}}</p>
              <p><span>现居地址:</span>{{basicInformation.addressNow}}</p>
              <p><span>工作单位:</span>{{basicInformation.unit}}</p>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">个人史
          <Tooltip content="点击修改个人史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="changePersonalHistoryMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <div v-for="(item, index) in personalHistory" :key="index">
            <p class="info"><span class="title-info">{{item.diseaseName}}:</span> <span class="text" v-html="item.detail.value"></span></p>
            <p class="info"><span v-if="item.diseaseKey === 'smokingHistory'" class="text">吸烟{{item.detail.years}}年,{{item.detail.daily}}支/天,已戒{{item.detail.quit}}月</span></p>
            <p class="info"><span v-if="item.diseaseKey === 'alcoholHistory'" class="text">饮酒{{item.detail.years}}年,{{item.detail.daily}}克/天,已戒{{item.detail.quit}}月</span></p>
          </div>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">既往史
          <Tooltip content="点击修改既往史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="changePastMedicalHistoryMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <ul>
            <li v-for="(item, index) in patientDetail.pastMedicalHistory" :key="index">
              <p class="info"><span class="title-info">{{item.diseaseName}}:</span>{{item.detail.diseaseTime  | parseTime('{y}-{m}-{d}') }} <span class="contect">确诊于</span>{{item.detail.diseaseHospital}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">家族史
          <Tooltip content="家族史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="changeFamilyHistoryMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <ul>
            <li>
              <span class="f-title">母亲是否健在</span>
              <RadioGroup v-model="familyHistory.isMomtherAlive">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </li>
          </ul>
          <ul>
            <span class="f-title">母亲健康状况</span>
            <li v-for="(item, index) in familyHistory.motherDisease" :key="index" >
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul>
            <li>
              <span class="f-title">父亲是否健在</span>
              <RadioGroup v-model="familyHistory.isFatherAlive">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </li>
          </ul>
          <ul>
            <span class="f-title">父亲健康状况</span>
            <li v-for="(item, index) in familyHistory.fatherDisease" :key="index" >
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul>
            <span class="f-title">家中有无相关疾病记载</span>
            <li v-for="(item, index) in familyHistory.familyDisease" :key="index">
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul>
            <span class="f-title">家中有无传染病及遗传病史</span>
            <li v-for="(item, index) in familyHistory.familyGeneticDisease" :key="index">
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">婚育史
          <Tooltip content="婚育史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="changeObstericalHistoryMedol = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base">
          <Row>
            <p class="info"><span class="title-info">月经持续时间:</span>{{obstericalHistory.menstruationDuration}}天</p>
            <p class="info"><span class="title-info">经期开始时间:</span>{{obstericalHistory.menstruationBeginAge}}岁</p>
            <p class="info"><span class="title-info">绝经时间:</span>{{obstericalHistory.menstruationEndAge}}岁</p>
            <p class="info"><span class="title-info">月经颜色异常描述:</span>{{obstericalHistory.menstruationUnusualColor}}</p>
            <ul>
              <li>
                <span class="title-info">是否痛经</span>
                <RadioGroup v-model="obstericalHistory.isDysmenorrhea">
                  <Radio label="1">是</Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
              </li>
            </ul>
            <p class="info"><span class="title-info">月经是否不规律:</span>{{obstericalHistory.menstruationUnusualCycle}}</p>
            <ul>
              <span class="f-title">配偶健康状况</span>
              <li v-for="(item, index) in obstericalHistory.spouseDisease" :key="index" >
                <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
              </li>
            </ul>
            <ul>
              <span class="f-title">子女健康状况</span>
              <li v-for="(item, index) in obstericalHistory.childrenDisease " :key="index" >
                <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
              </li>
            </ul>
          </Row>
        </div>
      </div>
    </div>
    <div class="medical-record-wrapper">
      <div class="record">
      </div>
    </div>
    <!--个人信息修改弹窗-->
    <Modal
      v-model="changePersonalBaseMedol"
      title="基本资料修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="40" inline style="text-align: left">
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
          <i-input v-model="basicInformation.name"></i-input>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="basicInformation.gender">
            <Option value ="1">女</Option>
            <Option value ="2">男</Option>
          </Select>
        </FormItem>
        <FormItem label="学历">
          <Select v-model="basicInformation.degree">
            <Option value="1">本科</Option>
            <Option value="2">二年级</Option>
          </Select>
        </FormItem>
        <FormItem label="名族">
          <Select v-model="basicInformation.ethnicity">
            <Option v-for="(item, index) in ethnicityDataList" :value="item.value" :key="index">{{item.key}}</Option>
          </Select>
        </FormItem>
         <FormItem label="身高">
          <i-input v-model="basicInformation.height" style="width: 80px">
            <span slot="append">cm</span>
          </i-input>
        </FormItem>
        <FormItem label="体重">
          <i-input v-model="basicInformation.weight" style="width: 80px">
            <span slot="append">kg</span>
          </i-input>
        </FormItem>
        <FormItem label="电话">
          <i-input v-model="basicInformation.phone"></i-input>
        </FormItem>
        <FormItem label="紧急电话">
          <i-input v-model="basicInformation.emergencyCall"></i-input>
        </FormItem>
        <FormItem label="邮箱">
          <i-input v-model="basicInformation.email"></i-input>
        </FormItem>
        <FormItem label="出生日期">
          <DatePicker v-model="basicInformation.birthDate" type="date" placeholder="选择日期" format="yyyy-MM-dd"></DatePicker>
        </FormItem>
        <FormItem label="户籍地址">
          <Cascader :data="cityData" trigger="hover"></Cascader>
        </FormItem>
        <FormItem label="详细地址">
          <i-input v-model="basicInformation.address"></i-input>
        </FormItem>
        <FormItem label="现居地">
          <Cascader :data="cityData" trigger="hover"></Cascader>
        </FormItem>
        <FormItem label="现居地址">
          <i-input v-model="basicInformation.address"></i-input>
        </FormItem>
        <FormItem label="身份证">
          <i-input v-model="basicInformation.idCard"></i-input>
        </FormItem>
        <FormItem label="工作单位">
          <i-input v-model="basicInformation.unit"></i-input>
        </FormItem>
      </Form>
    </Modal>
    <!--个人史修改弹窗-->
    <Modal
      v-model="changePersonalHistoryMedol"
      title="个人史修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="80" style="text-align: left" inline>
        <FormItem v-for="(item, index) in personalHistory" :label="item.diseaseName" :key="index" v-if="!((item.diseaseKey === 'smokingHistory') || (item.diseaseKey === 'alcoholHistory'))" style="width:100%">
          <i-input v-model="item.detail.value">
          </i-input>
        </FormItem>
        <FormItem v-for="(item, index) in personalHistory" :label="item.diseaseName" :key="index" v-if="item.diseaseKey === 'smokingHistory'">
          <i-input v-model="item.detail.years" style="width: 120px" size="small">
            <span slot="append">年</span>
          </i-input>
          <i-input v-model="item.detail.daily" style="width: 120px" size="small">
            <span slot="append">支/天</span>
          </i-input>
          <i-input v-model="item.detail.quit" style="width: 120px" size="small">
            <span slot="prepend">已戒</span>
            <span slot="append">月</span>
          </i-input>
        </FormItem>
        <FormItem v-for="(item, index) in personalHistory" :label="item.diseaseName" :key="index" v-if="item.diseaseKey === 'alcoholHistory'">
          <i-input v-model="item.detail.years" style="width: 120px" size="small">
            <span slot="append">年</span>
          </i-input>
          <i-input v-model="item.detail.daily" style="width: 120px" size="small">
            <span slot="append">克/天</span>
          </i-input>
          <i-input v-model="item.detail.quit" style="width: 120px" size="small">
            <span slot="prepend">已戒</span>
            <span slot="append">月</span>
          </i-input>
        </FormItem>
      </Form>
      <!-- <Form :label-width="80" inline style="text-align: left" class="form" v-if="personalHistoryInfo">
        <FormItem label="疫区居住" style="width: 100%">
          <i-input v-model="personalHistoryInfo.infectedZone"></i-input>
        </FormItem>
        <FormItem label="疫水、疫源接触史" style="width: 100%">
          <i-input v-model="personalHistoryInfo.epidemicFocusHistory" type="textarea"></i-input>
        </FormItem>
        <FormItem label="放射物、毒物接触史" style="width: 100%">
          <i-input v-model="personalHistoryInfo.radiationHistory" type="textarea"></i-input>
        </FormItem>
        <FormItem label="毒品接触史" style="width: 100%">
          <i-input v-model="personalHistoryInfo.drugHistory" type="textarea"></i-input>
        </FormItem>
        <FormItem label="吸烟史">
          <i-input v-model="personalHistoryInfo.smokingHistory.years" style="width: 60px" size="small">
            <span slot="append">年</span>
          </i-input>
        </FormItem>
        <FormItem style="margin-left: -60px">
          <i-input v-model="personalHistoryInfo.smokingHistory.daily" style="width: 80px" size="small">
            <span slot="append">支/天</span>
          </i-input>
        </FormItem>
        <FormItem label="已戒烟">
          <i-input v-model="personalHistoryInfo.smokingHistory.quit" style="width: 60px" size="small">
            <span slot="append">年</span>
          </i-input>
        </FormItem>
        <FormItem label="饮酒史">
          <i-input v-model="personalHistoryInfo.alcoholHistory.years" style="width: 60px" size="small">
            <span slot="append">年</span>
          </i-input>
        </FormItem>
        <FormItem style="margin-left: -60px">
          <i-input v-model="personalHistoryInfo.alcoholHistory.quit" style="width: 80px" size="small">
            <span slot="append">两/天</span>
          </i-input>
        </FormItem>
        <FormItem label="已戒酒">
          <i-input v-model="personalHistoryInfo.alcoholHistory.quit" style="width: 60px" size="small">
            <span slot="append">年</span>
          </i-input>
        </FormItem>
      </Form> -->
    </Modal>
    <!--既往史修改弹窗-->
    <Modal
      v-model="changePastMedicalHistoryMedol"
      title="既往史修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="80" style="text-align: left" inline>
        <FormItem v-for="(item, index) in pastMedicalHistory" :key="index" :label="item.diseaseName">
          <Row>
            <i-col span="10">
              <DatePicker type="datetime" v-model="item.detail.diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
            </i-col>
            <i-col span="13" offset="1">
              <i-input v-model="item.detail.diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构">
              </i-input>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="添加既往史">
          <i-col span="6">
            <Select v-model="diseaseName">
              <Option v-for="(item, index) in disease" :value="item.diseaseName" :key="index">{{item.diseaseName}}</Option>
            </Select>
          </i-col>
          <i-col span="7" offset="1">
            <DatePicker v-model="diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
          </i-col>
          <i-col span="6" offset="1">
            <i-input v-model="diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构"></i-input>
          </i-col>
          <i-col span="2" offset="1">
            <Button type="ghost" shape="circle" @click.stop="addPastMedical" size="small">添加</Button>
          </i-col>
        </FormItem>
      </Form>
    </Modal>
     <!--家族史修改弹窗-->
    <Modal
      v-model="changeFamilyHistoryMedol"
      title="家族史修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="90" style="text-align: left" inline v-if="familyHistory">
        <Row>
          <FormItem label="母亲是否健在">
            <RadioGroup v-model="familyHistory.isMomtherAlive">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="父亲是否健在">
            <RadioGroup v-model="familyHistory.isFatherAlive">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <FormItem label="母亲健康状况">
          <Select v-model="familyHistory.motherDisease" multiple>
            <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="父亲健康状况">
          <Select v-model="familyHistory.fatherDisease" multiple>
            <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="家中有无相关疾病记载">
          <Select v-model="familyHistory.familyDisease" multiple>
            <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="家中有无传染病及遗传病史">
          <Select v-model="familyHistory.familyGeneticDisease" multiple>
            <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
     <!--婚育史修改弹窗-->
    <Modal
      v-model="changeObstericalHistoryMedol"
      title="婚育史修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="90" style="text-align: left">
        <Row>
          <i-col span="8">
            <FormItem label="经期持续时间">
              <i-input v-model="obstericalHistory.menstruationDuration">
                <span slot="append">天</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="经期开始时间">
              <i-input v-model="obstericalHistory.menstruationBeginAge">
                <span slot="append">岁</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="绝经时间">
              <i-input v-model="obstericalHistory.menstruationEndAge">
                <span slot="append">岁</span>
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <FormItem label="月经颜色异常描述">
            <i-input v-model="obstericalHistory.menstruationUnusualColor" placeholder="如无异常请忽略此项"></i-input>
          </FormItem>
          <FormItem label="是否痛经">
            <RadioGroup v-model="obstericalHistory.isDysmenorrhea">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="月经是否规律">
            <i-input v-model="obstericalHistory.menstruationUnusualCycle" placeholder="如无异常请忽略此项"></i-input>
          </FormItem>
          <FormItem label="配偶健康状况">
            <Select v-model="obstericalHistory.spouseDisease" multiple>
              <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="子女健康状况">
            <Select v-model="obstericalHistory.childrenDisease" multiple>
              <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getPatientDetail } from 'api/teamList'
// import { parseTime } from 'utils/filter'
export default {
  data() {
    return {
      selectDiseaseList: [],
      patientDetail: {},
      changePersonalBaseMedol: false, // 基本资料
      changePersonalHistoryMedol: false, // 个人史
      changePastMedicalHistoryMedol: false, // 既往史
      changeFamilyHistoryMedol: false, // 家族史
      changeObstericalHistoryMedol: false, // 婚育史
      // personalInfo: {
      //   name: '张三',
      //   age: 24,
      //   height: 175,
      //   gender: '1',
      //   ethnicity: '0',
      //   weight: 55,
      //   degree: '1',
      //   phone: 17877706664,
      //   birthdate: '2018-8-10',
      //   email: '3565@gmial.com',
      //   emergencyCall: '19877773333',
      //   idCard: '512756789087564422',
      //   address: '成都市锦江区牛王庙东大街',
      //   unit: 'treeTumbo'
      // },
      personalHistoryInfo: [], // 手动编辑dom数据
      basicInformation: [],
      personalHistory: [], // 个人史列表渲染dom数据
      pastMedicalHistory: [],
      familyHistory: [], // 家族史初始数据
      obstericalHistory: [], // 婚育史初始数据
      // 添加既往史临时存储数据对象
      id: null,
      diseaseName: null,
      diseaseHospital: null,
      diseaseTime: null,
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
      ],
      ethnicityDataList: [
        {
          key: '汉',
          value: '0'
        },
        {
          key: '少数民族',
          value: '1'
        }
      ],
      diseaseDataList: [
        '结核',
        '疟疾',
        '高血压',
        '糖尿病',
        '冠心病',
        '肿瘤',
        '房颤',
        '血脂异常',
        '其他心脏病'
      ],
      disease: [
        {
          id: 0,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '结核'
        },
        {
          id: 1,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '疟疾'
        },
        {
          id: 2,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '高血压'
        },
        {
          id: 3,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '糖尿病'
        },
        {
          id: 4,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '冠心病'
        },
        {
          id: 5,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '脑卒中'
        },
        {
          id: 6,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '肿瘤'
        },
        {
          id: 7,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '房颤'
        },
        {
          id: 8,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '血脂异常'
        },
        {
          id: 9,
          type: 2,
          diseaseKey: 'hepatitis',
          diseaseName: '其他心脏病'
        }
      ]
    }
  },
  created() {
    this.init()
    this._getPatientDetail()
  },
  methods: {
    pritf() {
      console.log(this.patientDetail.familyHistory)
      console.log(this.patientDetail.familyHistory.isMomtherAlive)
    },
    ok() {
      this.$Message.info('Clicked ok')
      console.log(this.familyHistory)
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    },
    init() {},
    _getPatientDetail() {
      getPatientDetail().then(res => {
        this.patientDetail = res.data
        this.basicInformation = res.data.basicInformation
        this.personalHistory = res.data.personalHistory
        this.pastMedicalHistory = res.data.pastMedicalHistory
        this.familyHistory = res.data.familyHistory
        this.obstericalHistory = res.data.obstericalHistory
        console.log(this.patientDetail)
      })
    },
    addPastMedical() {
      var diseaseTime = this.diseaseTime
      var diseaseName = this.diseaseName
      var diseaseHospital = this.diseaseHospital && this.diseaseHospital.trim()
      if (!diseaseTime || !diseaseName || !diseaseHospital) {
        return
      }
      this.pastMedicalHistory.push({
        diseaseName: diseaseName,
        detail: {
          diseaseTime: diseaseTime,
          diseaseHospital: diseaseHospital
        }
      })
      // console.log(this.pastMedicalHistory)
    }
  },
  // computed: {
  //   selectDiseaseArrayComputed (value) {
  //     var label = this.diseaseDataList.slice(value, value + 1)
  //     return label.toString()
  //   }
  // },
  filters: {
    selectDiseaseArray(value) {
      // if (!value) {
      //   return ''
      // }
      var diseaseDataList = [
        '结核',
        '疟疾',
        '高血压',
        '糖尿病',
        '冠心病',
        '脑卒中',
        '肿瘤',
        '房颤',
        '血脂异常',
        '其他心脏病'
      ]
      // console.log(label)
      return diseaseDataList[value]
    },
    genderFilter(value) {
      // if (!value) {
      //   return ''
      // }
      var genderList = ['', '女', '男']
      return genderList[value]
    },
    ethnicityFilter(value) {
      // if (!value) {
      //   return ''
      // }
      var ethnicityList = ['汉族', '少数民族']
      return ethnicityList[value]
    },
    degreeFilter(value) {
      var degreeList = [
        '小学',
        '初中',
        '高中'
      ]
      return degreeList[value]
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
        position relative
        padding 1rem
        text-align left
        line-height 1.8
        font-size 1rem
        .info
          word-wrap break-word
          width 100%
          white-space normal
          .title-info
            margin-right 2rem
          .text
            display inline-block
            text-indent 1rem
            word-wrap break-word
            word-break break-all
            width 100%
            white-space normal
            padding-bottom 1rem
            // overflow hidden
          .contect
            padding-left 0.5rem
            padding-right 0.5rem
        .f-title
          margin-right 1rem
        ul
          margin-bottom 0.5rem
          li
            display inline
            margin-right 4px
        .label-wrapper
          padding 2px 4px
          border 1px solid #eeeeee
          border-radius 4px
          font-size 0.875rem
  .update-icon
    width 1.5em
    height 1.5em
    vertical-align -0.4em
    fill currentColor
    overflow hidden
    cursor pointer
    color #61dfe1
</style>