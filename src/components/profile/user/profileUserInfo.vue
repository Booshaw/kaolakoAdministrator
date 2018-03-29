<template>
  <div class="info-wrapper">
    <div class="content-wrapper">
      <div class="bread-crumb">
        <Breadcrumb v-if="usertype === '家庭用户'">
          <BreadcrumbItem to="/u">返回我的家庭</BreadcrumbItem>
          <BreadcrumbItem>成员详细</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb v-if="usertype === '医生用户'">
          <BreadcrumbItem to="/d/m">返回我的会员</BreadcrumbItem>
          <BreadcrumbItem>会员详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="add-patient-wrapper" v-if="basicInformation">
        <h2 class="title">基本资料
          <Tooltip content="点击修改资料" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkBasicInformation = !checkBasicInformation">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkBasicInformation">
          <Form :label-width="60" inline style="text-align: left;">
          <FormItem label="姓名">
            <i-input v-model="basicInformation.realName"></i-input>
          </FormItem>
          <FormItem label="性别">
            <Select v-model="basicInformation.gender">
              <Option value = "1">女</Option>
              <Option value = "2">男</Option>
            </Select>
          </FormItem>
          <FormItem label="婚否">
            <Select v-model="basicInformation.marriageStatus">
              <Option value = "0">未婚</Option>
              <Option value = "1">已婚</Option>
              <Option value = "2">离异</Option>
              <Option value = "3">丧偶</Option>
            </Select>
          </FormItem>
          <FormItem label="教育年限">
            <Select v-model="basicInformation.degree" style="width:6rem">
              <Option :value="item.value" v-for="(item, index6) in dict.degree" :key="index6">{{item.descName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="民族">
            <Select v-model="basicInformation.ethnicity" style="width:5rem">
              <Option v-for="(item, index) in dict.ethnicity" :value="item.value" :key="index">{{item.descName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="身高">
            <i-input v-model="basicInformation.height" style="width: 6rem">
              <span slot="append">cm</span>
            </i-input>
          </FormItem>
          <FormItem label="体重">
            <i-input v-model="basicInformation.weight" style="width: 6rem">
              <span slot="append">kg</span>
            </i-input>
          </FormItem>
          <FormItem label="电话">
            <i-input v-model="basicInformation.telephone"></i-input>
          </FormItem>
          <FormItem label="紧急电话">
            <i-input v-model="basicInformation.emergencyPhone"></i-input>
          </FormItem>
          <FormItem label="邮箱">
            <i-input v-model="basicInformation.email"></i-input>
          </FormItem>
          <FormItem label="出生日期">
            <DatePicker v-model="basicInformation.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd"></DatePicker>
          </FormItem>
          <FormItem label="户籍地址">
            <Cascader :data="dict.area" v-model="basicInformation.permanentAreaId" trigger="hover" style="width:10rem"></Cascader>
          </FormItem>
          <FormItem label="详细地址">
            <i-input v-model="basicInformation.permanentAddress"></i-input>
          </FormItem>
          <FormItem label="现居地">
            <Cascader :data="dict.area" v-model="basicInformation.presentAreaId" trigger="hover" style="width:12rem"></Cascader>
          </FormItem>
          <FormItem label="现居地址">
            <i-input v-model="basicInformation.presentAddress"></i-input>
          </FormItem>
          <FormItem label="身份证">
            <i-input v-model="basicInformation.idcardNumber"></i-input>
          </FormItem>
          <FormItem label="工作单位">
            <i-input v-model="basicInformation.company"></i-input>
          </FormItem>
        </Form>
        </div>
        <div class="base" v-if="!checkBasicInformation">
          <Row>
            <i-col :lg="5" :md="5" :sm="12" :xs="24">
              <p><span>姓名:</span>{{basicInformation.realName}}</p>
              <p><span>年龄:</span>{{basicInformation.age}}岁</p>
              <p><span>身高:</span>{{basicInformation.height}}cm</p>
            </i-col>
            <i-col :lg="5" :md="5" :sm="12" :xs="24">
              <p><span>性别:</span>{{basicInformation.gender | genderFilter}}</p>
              <p><span>名族:</span>{{basicInformation.ethnicity | ethnicityFilter}}</p>
              <p><span>体重:</span>{{basicInformation.weight}}Kg</p>
            </i-col>
            <i-col :lg="6" :md="6" :sm="12" :xs="24">
              <p><span>婚否:</span>{{basicInformation.marriageStatus | isOrFilter}}</p>
              <p><span>受教育年限:</span>{{basicInformation.degree | degreeFilter}}</p>
              <p><span>电话:</span>{{basicInformation.telephone}}</p>
            </i-col>
            <i-col :lg="8" :md="8" :sm="12" :xs="24">
              <p><span>邮箱:</span>{{basicInformation.email}}</p>
              <p><span>出生日期:</span>{{basicInformation.birthday | parseTime('{y}-{m}-{d}')}}</p>
              <p><span>紧急联系电话:</span>{{basicInformation.emergencyPhone}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>身份证:</span>{{basicInformation.idcardNumber}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>户籍地址:</span>{{basicInformation.permanentAddress}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>现居地址:</span>{{basicInformation.presentAddress}}</p>
            </i-col>
          </Row>
          <Row>
            <i-col :lg="24">
              <p><span>工作单位:</span>{{basicInformation.company}}</p>
            </i-col>
          </Row>
        </div>
        <div v-if="checkBasicInformation">
          <Poptip
          confirm
          transfer
          title="您确认提交修改吗?"
          @on-cancel="cancelUpload"
          @on-ok="uploadBasicInformation">
            <Button type="primary" icon="checkmark-round" :loading="loading">
              <span v-if="!loading">保存</span>
              <span v-else>Loading...</span>
            </Button>
          </Poptip>
        </div>
        <div class="add-follow-up" v-if="usertype === '医生用户' && !checkBasicInformation">
          <Button type="info" shape="circle" @click="addFollowupModal = !addFollowupModal">创建随访</Button>
          <div></div>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">个人史
          <Tooltip content="点击修改个人史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkPersonalHistory = !checkPersonalHistory">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkPersonalHistory">
           <Form :label-width="80" style="text-align: left" inline>
            <FormItem v-for="(item, index7) in personalHistory" :label="item.diseaseName" :key="index7" v-if="!((item.diseaseName === '吸烟史') || (item.diseaseName === '饮酒史'))" style="width:100%">
              <i-input v-model="item.detail.value">
              </i-input>
            </FormItem>
            <FormItem v-for="(item, index8) in personalHistory" :label="item.diseaseName" :key="index8" v-if="item.diseaseName === '吸烟史'">
              <i-input v-model="item.detail.years">
                <span slot="append">年</span>
              </i-input>
              <i-input v-model="item.detail.daily">
                <span slot="append">支/天</span>
              </i-input>
              <i-input v-model="item.detail.quit">
                <span slot="prepend">已戒</span>
                <span slot="append">月</span>
              </i-input>
            </FormItem>
            <FormItem v-for="(item, index9) in personalHistory" :label="item.diseaseName" :key="index9" v-if="item.diseaseName === '饮酒史'">
              <i-input v-model="item.detail.years">
                <span slot="append">年</span>
              </i-input>
              <i-input v-model="item.detail.daily">
                <span slot="append">克/天</span>
              </i-input>
              <i-input v-model="item.detail.quit">
                <span slot="prepend">已戒</span>
                <span slot="append">月</span>
              </i-input>
            </FormItem>
          </Form>
        </div>
        <div class="base" v-if="!checkPersonalHistory">
          <div v-for="(item, index) in personalHistory" :key="index">
            <p class="info"><span class="title-info">{{item.diseaseName}}:</span> <span class="text" v-html="item.detail.value"></span></p>
            <p class="info"><span v-if="item.diseaseName === '吸烟史'" class="text">吸烟{{item.detail.years}}年,{{item.detail.daily}}支/天,已戒{{item.detail.quit}}月</span></p>
            <p class="info"><span v-if="item.diseaseName === '饮酒史'" class="text">饮酒{{item.detail.years}}年,{{item.detail.daily}}克/天,已戒{{item.detail.quit}}月</span></p>
          </div>
        </div>
        <div v-if="checkPersonalHistory">
          <Poptip
          confirm
          transfer
          title="您确认提交修改吗?"
          @on-ok="uploadPersonalHistory"
          @on-cancel="cancelUpload">
            <Button type="primary" icon="checkmark-round" :loading="loading">
              <span v-if="!loading">保存</span>
              <span v-else>Loading...</span>
            </Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
         <h2 class="title">既往史
          <Tooltip content="点击修改既往史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkPastMedicalHistory = !checkPastMedicalHistory">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkPastMedicalHistory">
          <Form :label-width="50" inline>
            <Row v-for="(item, index) in pastMedicalHistory" :key="index" style="background-color:#f8f9f9;padding:0.5rem;border-radius:0.2rem;margin:1rem">
              <i-col :lg="3" :xs="3" style="margin-bottom:0.5rem">
                <span style="font-size: 1rem;">{{diseaseNameFilter(item.diseaseId)}}</span>
              </i-col>
              <i-col :lg="6" :xs="19" style="margin-bottom:0.5rem">
                <FormItem>
                  <DatePicker type="datetime" v-model="item.detail.diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
                </FormItem>
              </i-col>
              <i-col :lg="15" :xs="24">
                <FormItem  label="确诊于">
                  <i-input v-model="item.detail.diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构" style="width:100%">
                  </i-input>
                </FormItem>
              </i-col>
            </Row>
            <FormItem label="添加既往史" style="width:100%">
              <Row>
                <i-col :lg="4" :xs="24" style="margin-top:1rem;">
                  <Select v-model="diseaseId">
                    <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{item.diseaseName}}</Option>
                  </Select>
                </i-col>
                <i-col :lg="4" :xs="24" style="margin-top: 1rem;">
                  <DatePicker v-model="diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
                </i-col>
                <i-col :lg="10" :xs="20" style="margin-top: 1rem;">
                  <i-input v-model="diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构"></i-input>
                </i-col>
                <i-col :lg="2" offset="1" :xs="2" style="margin-top: 1rem;">
                  <Button type="ghost" shape="circle" @click.stop="addPastMedical" >添加</Button>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </div>
        <div class="base" v-if="!checkPastMedicalHistory">
          <ul>
            <li v-for="(item, index) in pastMedicalHistory" :key="index">
              <p class="info"><span class="title-info">{{diseaseNameFilter(item.diseaseId)}}:</span>{{item.detail.diseaseTime  | parseTime('{y}-{m}-{d}')}} <span class="contect">确诊于</span>{{item.detail.diseaseHospital}}</p>
            </li>
          </ul>
        </div>
        <div v-if="checkPastMedicalHistory">
          <Poptip
          confirm
          transfer
          title="您确认提交修改吗?"
          @on-ok="uploadPastMedicalHistory"
          @on-cancel="cancelUpload">
            <Button type="primary" icon="checkmark-round" :loading="loading">
              <span v-if="!loading">保存</span>
              <span v-else>Loading...</span>
            </Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">家族史
          <Tooltip content="点击修改家族史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkFamilyHistory = !checkFamilyHistory">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkFamilyHistory">
          <Form :label-width="90" style="text-align: left">
            <Row>
              <FormItem label="母亲是否健在">
                <RadioGroup v-model="familyHistory.isMotherAlive">
                  <Radio label="1" style="margin-right:3rem">{{this.is}}</Radio>
                  <Radio label="0">{{this.not}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="父亲是否健在">
                <RadioGroup v-model="familyHistory.isFatherAlive">
                  <Radio label="1" style="margin-right:3rem">{{this.is}}</Radio>
                  <Radio label="0">{{this.not}}</Radio>
                </RadioGroup>
              </FormItem>
            </Row>
            <FormItem label="母亲健康状况">
              <Select v-model="familyHistory.motherDisease" multiple>
                <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="父亲健康状况">
              <Select v-model="familyHistory.fatherDisease" multiple>
                <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="家中有无相关疾病">
              <Select v-model="familyHistory.familyDisease" multiple>
                <Option v-for="(d, index12) in dict.disease" :value="d.id" :key="index12">{{ d.diseaseName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="家中有无传染病史">
              <Select v-model="familyHistory.familyGeneticDisease" multiple not-found-text="下滑更多选项" placeholder="若无慢性病可忽略此项,可下拉多选">
                  <Option v-for="(i, index1) in dict.disease" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
                </Select>
            </FormItem>
          </Form>
        </div>
        <div class="base" v-if="!checkFamilyHistory">
          <ul class="disease-list">
            <li><span class="f-title">母亲是否健在:</span>{{familyHistory.isMotherAlive | isOrFilter}}</li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">母亲健康状况:</span>
             <li>
              <span v-if="familyHistory.motherDisease && familyHistory.motherDisease.length === 0">{{this.fouren}}</span>
            </li>
            <li v-for="(item1, index) in familyHistory.motherDisease" :key="index" >
              <span class="label-wrapper">{{diseaseNameFilter(item1)}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <li><span class="f-title">父亲是否健在:</span>{{familyHistory.isFatherAlive | isOrFilter}}</li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">父亲健康状况:</span>
            <li>
              <span v-if="familyHistory.fatherDisease && familyHistory.fatherDisease.length === 0">{{this.fouren}}</span>
            </li>
            <li v-for="(item, index) in familyHistory.fatherDisease" :key="index" >
              <span class="label-wrapper">{{diseaseNameFilter(item)}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">家中有无相关疾病记载:</span>
            <li v-for="(item, index) in familyHistory.familyDisease" :key="index">
              <span class="label-wrapper">{{diseaseNameFilter(item)}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">家中有无传染病及遗传病史:</span>
            <li v-for="(item, index) in familyHistory.familyGeneticDisease" :key="index">
              <span class="label-wrapper">{{diseaseNameFilter(item)}}</span>
            </li>
          </ul>
        </div>
        <div v-if="checkFamilyHistory">
          <Poptip
          confirm
          transfer
          title="您确认提交修改吗?"
          @on-ok="uploadFamilyHistory"
          @on-cancel="cancelUpload">
            <Button type="primary" icon="checkmark-round" :loading="loading">
              <span v-if="!loading">保存</span>
              <span v-else>Loading...</span>
            </Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper" v-if="obstericalHistory">
        <h2 class="title">婚育史
          <Tooltip content="点击修改婚育史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkObstericalHistory = !checkObstericalHistory">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkObstericalHistory">
          <Form :label-width="60" style="text-align: left">
            <Row v-if="basicInformation.gender && basicInformation.gender === '1'">
              <i-col :lg="6" :xs="24">
                <FormItem label="经期持续时间">
                  <i-input v-model="obstericalHistory.menstruationDuration">
                    <span slot="append">天</span>
                  </i-input>
                </FormItem>
              </i-col>
              <i-col :lg="6" :xs="24">
                <FormItem label="经期开始时间">
                  <i-input v-model="obstericalHistory.menstruationBeginAge">
                    <span slot="append">岁</span>
                  </i-input>
                </FormItem>
              </i-col>
              <i-col :lg="6" :xs="24">
                <FormItem label="绝经时间">
                  <i-input v-model="obstericalHistory.menstruationEndAge">
                    <span slot="append">岁</span>
                  </i-input>
                </FormItem>
              </i-col>
            </Row>
            <Row v-if="basicInformation.gender && basicInformation.gender === '1'">
              <FormItem label="月经颜色异常描述">
                <i-input v-model="obstericalHistory.menstruationUnusualColor" placeholder="如无异常请忽略此项"></i-input>
              </FormItem>
              <FormItem label="是否痛经">
                <RadioGroup v-model="obstericalHistory.isDysmenorrhea">
                  <Radio label="1"><span style="padding-right:3rem">{{this.is}}</span></Radio>
                  <Radio label="0">{{this.not}}</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="月经是否规律">
                <i-input v-model="obstericalHistory.menstruationUnusualCycle" placeholder="如无异常请忽略此项"></i-input>
              </FormItem>
              </Row>
              <Row>
                <FormItem label="配偶健康状况">
                  <Select v-model="obstericalHistory.spouseDisease" multiple not-found-text="下滑更多选项">
                    <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="子女健康状况">
                  <Select v-model="obstericalHistory.childrenDisease" multiple not-found-text="下滑更多选项">
                    <Option v-for="(item, index) in dict.disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
                  </Select>
                </FormItem>
              </Row>
          </Form>
        </div>
        <div class="base" v-if="!checkObstericalHistory">
          <Row v-if="basicInformation.gender && basicInformation.gender === '1'">
            <p class="info"><span class="title-info">月经持续:</span>{{obstericalHistory.menstruationDuration}} <span v-if="obstericalHistory.menstruationDuration">天</span></p>
            <p class="info"><span class="title-info">经期开始:</span>{{obstericalHistory.menstruationBeginAge}}{{(obstericalHistory.menstruationBeginAge) ? '岁' : '否认'}}</p>
            <p class="info"><span class="title-info">绝经时间:</span>{{obstericalHistory.menstruationEndAge}}{{(obstericalHistory.menstruationEndAge) ? '岁' : '否认'}}</p>
            <p class="info"><span class="title-info">月经颜色异常描述:</span>{{(obstericalHistory.menstruationUnusualColor) ? obstericalHistory.menstruationUnusualColor : '否认'}}</p>
            <p class="info"><span class="title-info">是否痛经:</span>{{obstericalHistory.isDysmenorrhea | isOrFilter}}</p>
            <p class="info"><span class="title-info">月经不规律:</span>{{(obstericalHistory.menstruationUnusualCycle) ? obstericalHistory.menstruationUnusualCycle : '否认'}}</p>
            </Row>
            <Row>
              <ul class="disease-list">
                <span class="f-title">配偶健康状况</span>
                <li v-for="(item, index) in obstericalHistory.spouseDisease" :key="index" >
                  <span class="label-wrapper">{{diseaseNameFilter(item)}}</span>
                </li>
              </ul>
              <ul class="disease-list">
                <span class="f-title">子女健康状况</span>
                <li v-for="(item, index) in obstericalHistory.childrenDisease " :key="index" >
                  <span class="label-wrapper">{{diseaseNameFilter(item)}}</span>
                </li>
              </ul>
            </Row>
        </div>
        <div v-if="checkObstericalHistory">
          <Poptip
          confirm
          transfer
          title="您确认提交修改吗?"
          @on-ok="uploadObstericalHistory"
          @on-cancel="cancelUpload">
           <Button type="primary" icon="checkmark-round" :loading="loading">
              <span v-if="!loading">保存</span>
              <span v-else>Loading...</span>
            </Button>
          </Poptip>
        </div>
      </div>
      <div class="medical-record-wrapper">
        <div class="record">
          <h2 class="title">健康档案</h2>
          <div v-for="(item, index) in medicalRecord" :key="index" class="record-item">
            <Form :label-width="70">
              <Row>
                <i-col :lg="8" :xs="24">
                  <FormItem label="档案类型">
                    <Select v-model="item.type">
                      <Option value ="1">住院记录</Option>
                      <Option value ="2">门诊记录</Option>
                      <Option value ="3">体检报告</Option>
                      <Option value ="3">随访记录</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col :lg="8" :xs="24">
                  <FormItem :label="item.type === '1' ? '入院时间' : '确诊时间'">
                    <DatePicker v-model="item.admissionDate" type="date" :placeholder="item.type === '1' ? '入院时间' : '确诊时间'"></DatePicker>
                  </FormItem>
                </i-col>
                <i-col :lg="8" :xs="24" v-if="item.type === '1'">
                  <FormItem label="出院时间">
                    <DatePicker v-model="item.dischargeDate" type="date" placeholder="出院时间"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col :lg="6" :xs="24">
                  <FormItem label="医生">
                    <i-input v-model="item.doctor">
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col :lg="18" :xs="24">
                  <FormItem label="机构">
                    <i-input v-model="item.hospital">
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <FormItem label="是否新发现慢性病">
                <Select v-model="item.newDisease" multiple not-found-text="暂无数据">
                    <Option v-for="(i, index1) in newDiseaseList" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="是否针对慢性病">
                <Select v-model="item.targetDisease" multiple not-found-text="暂无数据">
                    <Option v-for="(i, index1) in targetDiseaseList" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="检查项目" v-model="item.checkupList">
                <Button v-for="(r, index2) in item.checkupList" @click="selectMedical(r)" :key="index2" shape="circle" size="small" style="margin-right:0.4rem">{{r.checkupName}}</Button>
                <Button icon="plus-round" size="small" shape="circle" @click.stop="addMedicalRecordProject(item, index)"></Button>
              </FormItem>
              <FormItem label="描述" v-if="item.description">
                <i-input v-model="item.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
              </FormItem>
              <FormItem label="诊断" v-if="item.diagnosis">
                <i-input v-model="item.diagnosis" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
              </FormItem>
              <FormItem label="治疗方案" v-if="item.treatmentPlan">
                <i-input v-model="item.treatmentPlan" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
              </FormItem>
              <FormItem label="目前情况及出院注意事项" v-if="item.dischargeNote">
                <i-input v-model="item.dischargeNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
              </FormItem>
            </Form>
          </div>
          <div class="add-mecical-record-wrapper">
            <Button type="primary" @click="addMedicalRecord">新增健康档案</Button>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="medicalModel"
      title="修改"
      @on-ok="updateMedicalRecordCheckupData"
      width="768"
      transfer
      ok-text="保存">
      <!-- <JModel :data="selectMedicalData"></JModel> -->
      <Row class="update-title">
        <i-col span="12">检查项目名称</i-col>
        <i-col span="3">检查值</i-col>
        <i-col span="3">最小值</i-col>
        <i-col span="3">最大值</i-col>
        <i-col span="3">单位</i-col>
      </Row>
      <Row v-for="(item0, index0) in selectMedicalData.checkupData" :key="index0" class="update-input-item">
        <span class="title-i">{{item0.itemName}}</span>
        <i-input v-model="item0.value" class="value-input" size="small"></i-input>
        <i-input v-model="item0.valueMin" class="value-input" size="small"></i-input>
        <i-input v-model="item0.valueMax" class="value-input" size="small"></i-input>
        <span class="unit-i">{{item0.unit}}</span>
      </Row>
      <Row>
        <div v-for="(img, index10) in selectMedicalData.image" :key="index10" class="img-list">
          <img :src="img.url" :alt="img.url">
          <Row>
            <i-col span="18">{{img.fileName}}</i-col>
            <i-col span="4">
              <Button size="small" @click.stop="deleteCheckupImage(index10)">删除此图片</Button>
            </i-col>
          </Row>
        </div>
      </Row>
        <Upload
        ref="uploadImg"
        multiple
        type="drag"
        :headers= "{
          authorization: this.token
        }"
        :show-upload-list="false"
        :default-file-list="defaultImgList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="20480"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        action="http://192.168.0.6:9080/jiahuan/common/file/upload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传图片</p>
        </div>
    </Upload>
    </Modal>
    <Modal
      v-model="addMedicalRecordProjectModel"
      title="添加检查项目"
      @on-ok="addMedicalRecordCheckupData"
      ok-text="保存"
      transfer>
      <Row style="margin-bottom:1rem">
        <i-col span="12">
          <Cascader v-model="addMedicalDataId" :data="diseaseCategoryList" trigger="hover" @on-change="queryDiseaseCategoryList"></Cascader>
        </i-col>
        <i-col span="12">
          <DatePicker v-model="checkupTime" icon="ios-clock-outline" placeholder="检查时间" format="yyyy-MM-dd"></DatePicker>
        </i-col>
      </Row>
      <Row class="update-title" v-if="addMedicalDataId[0] === '1'">
        <i-col span="12">检查项目名称</i-col>
        <i-col span="3">检查值</i-col>
        <i-col span="3">最小值</i-col>
        <i-col span="3">最大值</i-col>
        <i-col span="3">单位</i-col>
      </Row>
      <Row v-for="(item0, index0) in addMedicalData.checkupData" :key="index0" class="update-input-item">
        <span class="title-i">{{item0.itemName}}</span>
        <i-input v-model="item0.value" class="value-input" size="small"></i-input>
        <i-input v-model="item0.valueMin" class="value-input" size="small"></i-input>
        <i-input v-model="item0.valueMax" class="value-input" size="small"></i-input>
        <span class="unit-i">{{item0.unit}}</span>
      </Row>
      <Row>
        <div v-for="(img, index11) in addMedicalData.image" :key="index11" class="img-list">
          <img :src="img.url" :alt="img.url">
          <Row>
            <i-col span="18">{{img.fileName}}</i-col>
            <i-col span="4">
              <Button size="small" @click.stop="deleteAddCheckupImage(index11)">删除此照片</Button>
            </i-col>
          </Row>
        </div>
      </Row>
      <Upload
        ref="uploadImg"
        multiple
        type="drag"
        :headers= "{
          authorization: this.token
        }"
        :show-upload-list="false"
        :default-file-list="defaultAddImgList"
        :on-success="handleAddSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="20480"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        action="http://192.168.0.6:9080/jiahuan/common/file/upload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>上传图片</p>
        </div>
    </Upload>
    </Modal>
    <Modal
      v-model="addMedicalDataModel"
      title="新增健康档案"
      @on-ok="uploadAddMedicalRecord"
      transfer>
      <Form :label-width="60" class="upload-form-item">
        <Row>
          <i-col :lg="8" :xs="24" :md="8" :sm="12">
            <FormItem label="档案类型">
              <Select v-model="medicalRecordData.type">
                <Option value ="1">住院记录</Option>
                <Option value ="2">门诊记录</Option>
                <Option value ="3">体检报告</Option>
                <Option value ="4">随访记录</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col :lg="8" :xs="24" :md="8" :sm="12">
            <FormItem :label="medicalRecordData.type === '1' ? '入院' : '确诊'">
              <DatePicker v-model="medicalRecordData.admissionDate" type="date" :placeholder="medicalRecordData.type === '1' ? '入院时间' : '确诊时间'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col :lg="8" :xs="24" :md="8" :sm="12" v-if="medicalRecordData.type === '1'">
             <FormItem label="出院">
              <DatePicker v-model="medicalRecordData.dischargeDate" type="date" placeholder="出院日期"></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col :lg="8" :xs="24">
            <FormItem label="医生">
              <i-input v-model="medicalRecordData.doctor">
              </i-input>
            </FormItem>
          </i-col>
          <i-col :lg="16" :xs="24">
            <FormItem label="机构">
              <i-input v-model="medicalRecordData.hospital">
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <FormItem label="是否新发现慢性病">
          <Select v-model="medicalRecordData.newDisease" multiple not-found-text="暂无数据" placeholder="可下拉多选">
            <Option v-for="(i, index1) in newDiseaseList" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否针对慢性病">
          <Select v-model="medicalRecordData.targetDisease" multiple not-found-text="暂无数据" placeholder="可下拉多选">
            <Option v-for="(i, index1) in targetDiseaseList" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="描述">
          <i-input v-model="medicalRecordData.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="初步诊断" v-if="medicalRecordData.type && medicalRecordData.type == '1'">
          <i-input v-model="medicalRecordData.firstDiagnosis" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="诊断">
          <i-input v-model="medicalRecordData.diagnosis" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="治疗方案" v-if="medicalRecordData.type && medicalRecordData.type == '1'">
          <i-input v-model="medicalRecordData.treatmentPlan" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="注意事项" v-if="medicalRecordData.type && medicalRecordData.type == '1'">
          <i-input v-model="medicalRecordData.dischargeNote" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
      </Form>
      <div>
        <p style="text-align:center">如有检查数据,请在确认新增档案后点击+号添加</p>
      </div>
    </Modal>
    <Modal
      v-model="addFollowupModal"
      title="新增随访计划"
      @on-ok="uploadFollowup"
      ok-text="保存"
      transfer
      loading>
      <div class="followup-wrapper">
        <Row>
          <i-col span="18">
            <DatePicker v-model="followupDefaultData.planDate" type="date" placeholder="选择随访日期" format="yyyy-MM-dd"></DatePicker>
          </i-col>
          <i-col span="5">
            <Select v-model="followupDefaultData.ampm" placeholder="时间段">
              <Option value="1">上午</Option>
              <Option value="2">下午</Option>
            </Select>
          </i-col>
        </Row>
        <div style="margin-top:1rem">
          <Select v-model="followupDefaultData.followDisease" multiple placeholder="选择随访疾病,可多选">
            <Option v-for="(i, index1) in dict.disease" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <Select v-model="followupDefaultData.hospitalId" placeholder="选择随访医院">
            <Option v-for="(i, index1) in dict.hospital" :value="i.id" :key="index1">{{ i.name }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <Select v-model="followupDefaultData.departmentId" placeholder="选择科室">
            <Option v-for="(i, index1) in dict.department" :value="i.id" :key="index1">{{ i.name }}</Option>
          </Select>
        </div>
        <div style="margin-top:1rem">
          <i-input v-model="followupDefaultData.doctor" placeholder="随访医生"></i-input>
        </div>
        <div style="margin-top:1rem">
          <i-input v-model="followupDefaultData.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="随访注意事项"></i-input>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
// import { getPatientDetail } from 'api/teamList'
import {getDict, getPatientInfo, getDiseaseCategory, getDiseaseList} from 'api/getData'
import { upload } from 'api/upload'
// import * as types from '../../../store/mutations-types'
import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'
// import JModel from 'base/jhylModel/jhylModel'
// import { parseTime } from 'utils/filter'
export default {
  data() {
    return {
      addFollowupModal: false, // 随访Modal
      followupDefaultData: {
        patientId: this.$route.query.id,
        planDate: null, // 随访日期
        ampm: '', // 上午1下午2,默认1
        followDisease: [], // 随访疾病
        hospitalId: null, // 随访医院id
        departmentId: null, // 科室id
        doctor: '', // 医生姓名
        memo: '' // 随访注意事项
      }, // 创建随访初始数据
      defaultImgList: [], // 修改检查数据的上传文件初始列表
      defaultAddImgList: [], // 新增检查项目的上传文件初始列表
      loading: false, // loding加载
      fouren: '否认', // 疾病中文字段filter 无内容显示否认
      is: '是',
      not: '否',
      dict: { // 数据字典初始定义
        area: [], // 地区
        degree: [], // 学位
        disease: [], // 慢性病
        ethnicity: [], // 民族
        hospital: [], // 医院
        title: [], // 职称
        department: [] // 科室
      },
      targetDiseaseList: [], // 针对慢病列表
      newDiseaseList: [], // 新发现慢病列表
      selectDiseaseList: [],
      patientDetail: {},
      personalHistoryInfo: [], // 手动编辑dom数据
      basicInformation: {}, // 个人基本信息
      checkBasicInformation: false, // 个人基本信息数据变动后提交修改button的display
      personalHistory: [
        {
          diseaseName: '疫区居住',
          diseaseId: 1,
          patientId: null,
          detail: {
            value: ''
          }
        },
        {
          diseaseName: '疫水、疫源接触史',
          diseaseId: 2,
          patientId: null,
          detail: {
            value: ''
          }
        },
        {
          diseaseName: '放射物、毒物接触史',
          diseaseId: 3,
          patientId: null,
          detail: {
            value: ''
          }
        },
        {
          diseaseName: '毒品接触史',
          diseaseId: 4,
          patientId: null,
          detail: {
            value: ''
          }
        },
        {
          diseaseName: '吸烟史',
          diseaseId: 5,
          patientId: null,
          detail: {
            years: null,
            daily: null,
            quit: null
          }
        },
        {
          diseaseName: '饮酒史',
          diseaseId: 6,
          patientId: null,
          detail: {
            years: null,
            daily: null,
            quit: null
          }
        }
      ], // 个人史列表渲染dom数据
      checkPersonalHistory: false, // 个人史数据变动后提交修改button的display
      pastMedicalHistory: [], // 既往史
      checkPastMedicalHistory: false, // 既往史数据变动后提交修改button的display
      familyHistory: {
        familyDisease: [],
        familyGeneticDisease: [],
        fatherDisease: [],
        isFatherAlive: '',
        isMotherAlive: '',
        motherDisease: [],
        patientId: this.$route.query.id
        }, // 家族史
      checkFamilyHistory: false, // 家族史初始数据变动后提交修改button的display
      obstericalHistory: {
        childrenDisease: [],
        isDysmenorrhea: null,
        menstruationBeginAge: null,
        menstruationDuration: null,
        menstruationEndAge: null,
        menstruationUnusualColor: null,
        menstruationUnusualCycle: null,
        patientId: null,
        spouseDisease: []
      }, // 婚育史初始数据
      addObstericalHistory: {
        childrenDisease: [], // 子女有无慢性病
        spouseDisease: [], // 配偶有无慢性病
        menstruationUnusualCycle: '', // 月经不规律描述
        isDysmenorrhea: '', // 是否痛经
        menstruationUnusualColor: '', // 经期异常描述
        menstruationEndAge: null, // 绝经时间
        menstruationBeginAge: null, // 开始时间
        menstruationDuration: null, // 持续时间
        patientId: null // 患者id
      }, // 婚育史初始数据变动后提交修改button的display
      checkObstericalHistory: false, // 婚育史
      medicalRecord: [], // 健康档案初始数据
      medicalModel: false, // 检查项目弹窗
      addMedicalRecordProjectModel: false, // 添加健康档案检查项目弹窗
      addMedicalDataModel: false, // 新增健康档案弹窗
      selectMedicalData: [], // 点击检查项目传送给子组件的数据
      medicalRecordIndex: '', // 点击添加按钮记录index值
      addMedicalDataId: [], // 新增检查项目分类id
      addMedicalData: {

      }, // 新增检查项初始对象
      recordId: null, // 提价健康档案检查项的健康档案id
      diseaseCategoryList: [ // 添加检查项目列表数据
      ],
      checkupTime: '', // 新增检查项目时间
      // 添加既往史临时存储数据对象
      diseaseId: null,
      diseaseName: null,
      diseaseHospital: null,
      diseaseTime: null,
      //
      // 添加健康档案初始数据

      medicalRecordData: {
        patientId: null,
        type: null,
        admissionDate: '',
        checkupList: [],
        description: null,
        diagnosis: null, // 诊断
        firstDiagnosis: null, // 初步诊断
        dischargeDate: null, // 出院时间
        dischargeNote: null, // 出院注意事项
        doctor: null, // 医生
        hospital: null, // 医院
        newDisease: [], // 是否新发现慢病
        targetDisease: [], // 是否针对发现慢病
        treatmentPlan: null // 治疗方案
      }
    }
  },
  created() {
    this._getDict()// 获取数据字典
    // this._getPatientInfo()
    // this._getPatientDetail()
  },
  mounted() {
    this._getPatientInfo()
  },
  // activated() {
  //   this._getPatientInfo()
  // },
  methods: {
    // 获取字典数据列表
    _getDict() {
      const params = {
        dictType: [
          'area', 'ethnicity', 'degree', 'disease', 'hospital', 'department'
        ]
      }
      getDict(params).then(res => {
        this.dict.disease = res.data.disease
        this.dict.area = res.data.area
        this.dict.degree = res.data.degree
        this.dict.ethnicity = res.data.ethnicity
        this.dict.hospital = res.data.hospital
        this.dict.department = res.data.department
      })
    },
    // 创建随访
    uploadFollowup() {
      let url = '/doctor/follow/add'
      let params = this.followupDefaultData
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          this.addFollowupModal = false
          this.loading = false
          this.$Message.info(`操作${res.message}`)
          } else {
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
    handleSuccess(res, file) { // 新增检查项目文件上传成功钩子
    let obj = {}
      obj = JSON.parse(JSON.stringify(res.data))
    this.selectMedicalData.image.push(obj)
    console.log(`上传图片成功后的图片list${this.selectMedicalData}`)
    console.log(this.selectMedicalData)
    },
    handleAddSuccess(res, file) { // 修改检查项目文件上传成功钩子
    let obj = {}
      obj = JSON.parse(JSON.stringify(res.data))
    this.addMedicalData.image.push(obj)
    console.log(`上传图片成功后的图片list${this.addMedicalData}`)
    console.log(this.selectMedicalData)
    },
    deleteCheckupImage(index10) { // 删除修改检查数据的影像文件
      this.selectMedicalData.image.splice(index10, 1)
      // console.log(this.selectMedicalData)
    },
    deleteAddCheckupImage(index11) { // 删除新增检查数据的影像文件
      this.addMedicalData.image.splice(index11, 1)
    },
    // 获取个人信息
    _getPatientInfo() {
      const params = {
        type: 0,
        patientId: this.$route.query.id
      }
      getPatientInfo(params).then(res => {
       let lengthF = Object.keys(res.data.patientObstetricalHistory).length
       console.log(lengthF)
        console.log(res.data)
        this.basicInformation = res.data.patientDetail
        if (Object.keys(res.data.patientPersonalHistory).length !== 0) {
          this.personalHistory = res.data.patientPersonalHistory
        }
        if (Object.keys(res.data.patientFamilyHistory).length !== 0) {
          this.familyHistory = res.data.patientFamilyHistory
        }
        if (Object.keys(res.data.patientObstetricalHistory).length !== 0) {
          this.obstericalHistory = res.data.patientObstetricalHistory
        }
        this.pastMedicalHistory = res.data.patientPastHistory
        // this.obstericalHistory = res.data.patientObstetricalHistory
        this.medicalRecord = res.data.patientHealthRecord
      })
    },
    // 取消修改
    cancelUpload() {
      this.checkBasicInformation = false
      this.checkPersonalHistory = false
      this.checkPastMedicalHistory = false
      this.checkFamilyHistory = false
      this.checkObstericalHistory = false
    },
    // 基本信息修改确认提交
    uploadBasicInformation () {
      let url = '/patient/update'
      let params = this.basicInformation
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          setTimeout(() => {
            this.checkBasicInformation = false
            this.loading = false
            this.$Message.info(`操作${res.message}`)
          }, 1000)
        } else {
          this.$Message.error(res.message)
        }
      })
      },
    // 个人史修改确认提交
    uploadPersonalHistory () {
      let url = '/patient/history/update'
      let params = {
        patientId: this.$route.query.id,
        patientPersonalHistory: this.personalHistory
      }
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          setTimeout(() => {
            this.checkPersonalHistory = false
            this.loading = false
            this.$Message.info(`操作${res.message}`)
          }, 1000)
        } else {
          this.$Message.error(res.message)
        }
      })
      },
    // 既往史修改确认提交
    uploadPastMedicalHistory () {
      let url = '/patient/history/update'
      let params = {
        patientId: this.$route.query.id,
        patientPastHistory: this.pastMedicalHistory
      }
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          setTimeout(() => {
            this.checkPastMedicalHistory = false
            this.loading = false
            this.$Message.info(`操作${res.message}`)
          }, 1000)
        } else {
          this.$Message.error(res.message)
          this.loading = false
        }
      })
      },
    // 家族史修改确认提交
    uploadFamilyHistory () {
      let url = '/patient/history/family/update'
      let params = {
        patientId: this.$route.query.id,
        patientFamilyHistory: this.familyHistory
      }
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          setTimeout(() => {
            this.checkFamilyHistory = false
            this.loading = false
            this.$Message.info(`操作${res.message}`)
          }, 1000)
        } else {
          this.$Message.error(res.message)
          this.loading = false
        }
      })
      },
    // 婚育史修改确认提交
    uploadObstericalHistory () {
     let url = '/patient/history/obstetrical/update'
      let params = {
        patientId: this.$route.query.id,
        patientObstetricalHistory: this.obstericalHistory
      }
      upload(url, params).then(res => {
        this.loading = true
        if (res.code === '200') {
          setTimeout(() => {
            this.checkObstericalHistory = false
            this.loading = false
            this.$Message.info(`操作${res.message}`)
          }, 1000)
        } else {
          this.$Message.error(res.message)
          this.loading = false
        }
      })
      },
    // 点击检查项目展示\修改列表
    selectMedical(r) {
      this.medicalModel = true
      this.selectMedicalData = r
      console.log(r)
      console.log(`点击检查项目${r.recordId}`)
      },
      addMedicalRecordProject(item, index) {
        this.addMedicalRecordProjectModel = true
        getDiseaseCategory().then(res => {
          this.diseaseCategoryList = res.data
        })
        this.medicalRecordIndex = index
        this.addRecordId = item.id
        console.log(this.addRecordId)
    },
    // 获取检查项目详细字段
    queryDiseaseCategoryList(id) {
      let params = {
        categoryId: id.pop()
      }
      getDiseaseList(params).then(res => {
        this.addMedicalData = res.data
        // console.log(this.addMedicalData)
      })
    },
    // 添加检查项目后的提交
    addMedicalRecordCheckupData() {
      let i = this.medicalRecordIndex
      var params = {
        checkupCategoryId: this.addMedicalData.checkupCategoryId,
        checkupData: this.addMedicalData.checkupData,
        recordId: this.addRecordId,
        image: this.addMedicalData.image,
        checkupTime: this.checkupTime
      }
      let url = '/patient/record/checkup/add'
      upload(url, params).then(res => {
        if (res.code === '200') {
        this.$Message.info(`操作${res.message}`)
        var obj = {}
        obj = JSON.parse(JSON.stringify(res.data))
        this.medicalRecord[i].checkupList.push(obj)
        this.medicalRecordIndex = ''
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    // 修改检查数据后的提交
    updateMedicalRecordCheckupData() {
      let url = '/patient/record/checkup/update'
      let params = this.selectMedicalData
      upload(url, params).then(res => {
        if (res.code === '200') {
        this.$Message.info(`操作${res.message}`)
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    // 新增健康档案model
    addMedicalRecord() {
      this.addMedicalDataModel = true
      this.targetDiseaseList = []
      this.newDiseaseList = []
      let obj = {}
      obj = JSON.parse(JSON.stringify(this.dict.disease))
      let pastObj = JSON.parse(JSON.stringify(this.pastMedicalHistory))
      for (let i in pastObj) {
        for (let j in obj) {
          if (pastObj[i].diseaseId === obj[j].id) {
            this.targetDiseaseList.push(obj[j])
          } else {
            this.newDiseaseList.push(obj[j])
          }
        }
      }
    },
    // 提交新增健康档案
    uploadAddMedicalRecord() {
      let url = '/patient/record/add'
      let params = {
        patientHealthRecord: this.medicalRecordData,
        patientId: this.$route.query.id
      }
      upload(url, params).then(res => {
        if (res.code === '200') {
        this.$Message.info(`操作${res.message}`)
        let obj = {}
        obj = JSON.parse(JSON.stringify(res.data))
        this.medicalRecord.unshift(obj)
        console.log(this.medicalRecord)
        } else {
          this.$Message.error(res.message)
        }
      })
      },
    // 添加既往史数据
    addPastMedical() {
      var diseaseTime = this.diseaseTime
      var diseaseId = this.diseaseId
      var diseaseHospital = this.diseaseHospital && this.diseaseHospital.trim()
      if (!diseaseTime || !diseaseId || !diseaseHospital) {
        return
      }
      this.pastMedicalHistory.push({
        diseaseId: diseaseId,
        detail: {
          diseaseTime: diseaseTime,
          diseaseHospital: diseaseHospital
        }
      })
    },
      //  疾病名称转换
    diseaseNameFilter(value) {
    if (value) {
      if (this.dict.disease && this.dict.disease.length > 0) {
      var arry = this.dict.disease
        for (let i = 0; i < arry.length; i++) {
          let obj = Object.values(arry[i])
          if (obj[2] === value) {
            // console.log(obj)
            return obj[1]
          }
        }
      } else {
        return value
      }
    } else {
      return ''
    }
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'usertype'
      ])
  },
  watch: {
    basicInformation: {
      handler(newValue, oldValue) {
        // console.log(newValue + '监听了变化')
        },
      deep: true
    }
  },
  filters: {
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      if (typeof time === 'string') {
        return time.slice(0, 10)
      }
      const format = cFormat || '{y}-{m}-{d}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return timeStr
    },
    genderFilter(value) {
      // if (!value) {
      //   return ''
      // }
      var genderList = ['', '女', '男']
      return genderList[value]
    },
    degreeFilter(value) {
      var degreeList = [
        '小学一年级',
        '小学二年级',
        '小学三年级',
        '小学四年级',
        '小学五年级',
        '小学六年级',
        '初一',
        '初二',
        '初三',
        '高一',
        '高二',
        '高三',
        '大一',
        '大二',
        '大三',
        '大四'
      ]
      return degreeList[value - 1]
    },
    isOrFilter(value) {
      var List = [
        '否',
        '是',
        '离异',
        '丧偶'
      ]
      if (!value) {
        return ''
      }
      return List[value]
    },
    ethnicityFilter(value) {
      var ethnicity = [
        '汉族',
        '壮族',
        '满族',
        '回族',
        '苗族',
        '维吾尔族',
        '土家族',
        '彝族',
        '蒙古族',
        '藏族',
        '布依族',
        '侗族',
        '瑶族',
        '朝鲜族',
        '白族',
        '哈尼族',
        '哈萨克族',
        '黎族',
        '傣族',
        '畲族',
        '傈僳族',
        '仡佬族',
        '东乡族',
        '高山族',
        '拉祜族',
        '水族',
        '佤族',
        '纳西族',
        '羌族',
        '土族',
        '仫佬族',
        '锡伯族',
        '柯尔克孜族',
        '达斡尔族',
        '景颇族',
        '毛南族',
        '撒拉族',
        '塔吉克族',
        '阿昌族',
        '普米族',
        '鄂温克族',
        '怒族',
        '京族',
        '基诺族',
        '德昂族',
        '保安族',
        '俄罗斯族',
        '裕固族',
        '乌兹别克族',
        '门巴族',
        '鄂伦春族',
        '独龙族',
        '塔塔尔族',
        '赫哲族',
        '珞巴族',
        '布朗族'
        ]
      if (!value) {
        return ''
      }
      return ethnicity[value - 1].toString()
    }
  }
}
</script>
<style lang="stylus">
.info-wrapper
  position relative
  margin-top 3.25rem
  // text-align left
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
        // span
        //   margin-right 1rem
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
        .disease-list
          margin-bottom 0.5rem
          li
            display inline
            margin-right 4px
        .label-wrapper
          padding 2px 4px
          border 1px solid #eeeeee
          border-radius 4px
          font-size 0.875rem
    .medical-record-wrapper
      padding 1rem
      background #fff
      .record
        .title
          // display inline-block
          text-align left
          font-size 1.2rem
          color #5a5e66
          border-bottom 1px solid #eeeeee
          padding-bottom 1rem
        .record-item
          width 90%
          @media screen and (max-width: 420px)
            width 100%
          margin 1rem auto
          padding 1rem
          background-color #f8f9f9
          border-radius 0.4rem
          text-align left
          .item
            display inline-block
            margin-right 0.6rem
            border 1px solid #eeeeee
            padding 0.1rem 0.4rem
            border-radius 0.2rem
  .update-icon
    width 1.5em
    height 1.5em
    vertical-align -0.4em
    fill currentColor
    overflow hidden
    cursor pointer
    color #61dfe1
.update-title
  text-align center
  border-bottom 1px solid #eeeeee
  padding-bottom 1rem
.update-input-item
  text-align center
  padding 0.5rem 0
  .title-i
    display inline-block
    text-align center
    width 45%
  .value-input
    width 13%
  .unit-i
    display inline-block
    width 10%
.img-list
  display inline-block
  width 100%
  height auto
  // padding-top 1rem
  text-align center
  // line-height 60px
  border 1px solid transparent
  border-radius 4px
  overflow hidden
  background #fff
  position relative
  box-shadow 0 1px 1px rgba(0,0,0,.2)
  margin-bottom 2rem
  padding-bottom 1rem
  img
    width 100%
    height auto
.ivu-form-item
  margin-bottom 1rem
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon
  left 0
  padding-left 1rem
.ivu-form-inline .ivu-form-item
  margin-right 0
</style>