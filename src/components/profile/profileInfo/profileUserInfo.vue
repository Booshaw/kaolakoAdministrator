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
            <svg class="update-icon" aria-hidden="true" @click.stop="checkBasicInformation = true">
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
              <Option value = "1">是</Option>
              <Option value = "0">否</Option>
            </Select>
          </FormItem>
          <FormItem label="受教育年限">
            <Select v-model="basicInformation.degree">
              <Option :value="item.value" v-for="(item, index6) in dict.degree" :key="index6">{{item.descName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="民族">
            <Select v-model="basicInformation.ethnicity">
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
            <Cascader :data="dict.area" v-model="basicInformation.presentAreaId" trigger="hover" style="width:10rem"></Cascader>
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
            <i-col :lg="5" :md="4" :sm="12" :xs="24">
              <p><span>姓名:</span>{{basicInformation.realName}}</p>
              <p><span>年龄:</span>{{basicInformation.age}}岁</p>
              <p><span>身高:</span>{{basicInformation.height}}cm</p>
            </i-col>
            <i-col :lg="4" :md="4" :sm="12" :xs="24">
              <p><span>性别:</span>{{basicInformation.gender | genderFilter}}</p>
              <p><span>名族:</span>{{basicInformation.ethnicity | ethnicityFilter}}</p>
              <p><span>体重:</span>{{basicInformation.weight}}Kg</p>
            </i-col>
            <i-col :lg="6" :md="7" :sm="12" :xs="24">
              <p><span>婚否:</span>{{basicInformation.marriageStatus | isOrFilter}}</p>
              <p><span>受教育年限:</span>{{basicInformation.degree | degreeFilter}}</p>
              <p><span>电话:</span>{{basicInformation.telephone}}</p>
            </i-col>
            <i-col :lg="9" :md="9" :sm="12" :xs="24">
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
            <Button type="primary" icon="checkmark-round">提交修改</Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">个人史
          <Tooltip content="点击修改个人史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkPersonalHistory = true">
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
          @on-ok="uploadBasicInformation"
          @on-cancel="cancelUpload">
            <Button type="primary" icon="checkmark-round">提交修改</Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
         <h2 class="title">既往史
          <Tooltip content="点击修改既往史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkPastMedicalHistory = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkPastMedicalHistory">
          <Form :label-width="50" inline>
            <FormItem v-for="(item, index) in pastMedicalHistory" :key="index" :label="item.diseaseName">
              <Row style="background-color:#f8f9f9;padding:0.5rem;border-radius:0.2rem">
                <i-col :lg="9" :xs="24" style="margin-bottom:0.5rem">
                  <DatePicker type="datetime" v-model="item.detail.diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
                </i-col>
                <i-col :lg="15" :xs="24">
                  <i-input v-model="item.detail.diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构">
                  </i-input>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="添加既往史" style="width:100%">
              <Row>
                <i-col :lg="4" :xs="24" style="margin-top:1rem;">
                  <Select v-model="diseaseName">
                    <Option v-for="(item, index) in disease" :value="item.diseaseName" :key="index">{{item.diseaseName}}</Option>
                  </Select>
                </i-col>
                <i-col :lg="4" :xs="24" style="margin-top: 1rem;">
                  <DatePicker v-model="diseaseTime" icon="ios-clock-outline" placeholder="选择确诊时间" format="yyyy-MM-dd"></DatePicker>
                </i-col>
                <i-col :lg="10" :xs="20" style="margin-top: 1rem;">
                  <i-input v-model="diseaseHospital" icon="ios-world-outline" placeholder="输入确诊机构"></i-input>
                </i-col>
                <i-col :lg="2" offset="1" :xs="2" style="margin-top: 1rem;">
                  <Button type="ghost" shape="circle" @click.stop="addPastMedical">添加</Button>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </div>
        <div class="base" v-if="!checkPastMedicalHistory">
          <ul>
            <li v-for="(item, index) in pastMedicalHistory" :key="index">
              <p class="info"><span class="title-info">{{item.diseaseName}}:</span>{{item.detail.diseaseTime  | parseTime('{y}-{m}-{d}') }} <span class="contect">确诊于</span>{{item.detail.diseaseHospital}}</p>
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
            <Button type="primary" icon="checkmark-round">提交修改</Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">家族史
          <Tooltip content="点击修改家族史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkFamilyHistory = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkFamilyHistory">
          <Form :label-width="90" style="text-align: left">
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
            <FormItem label="家中有无相关疾病">
              <Select v-model="familyHistory.familyDisease" multiple>
                <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="家中有无传染/遗传病史">
              <Select v-model="familyHistory.familyGeneticDisease" multiple>
                <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div class="base" v-if="!checkFamilyHistory">
          <ul class="disease-list">
            <li><span class="f-title">母亲是否健在:</span>{{familyHistory.isMomtherAlive | isOrFilter}}</li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">母亲健康状况</span>
            <li v-for="(item, index) in familyHistory.motherDisease" :key="index" >
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <li><span class="f-title">父亲是否健在:</span>{{familyHistory.isFatherAlive | isOrFilter}}</li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">父亲健康状况</span>
            <li v-for="(item, index) in familyHistory.fatherDisease" :key="index" >
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">家中有无相关疾病记载</span>
            <li v-for="(item, index) in familyHistory.familyDisease" :key="index">
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
            </li>
          </ul>
          <ul class="disease-list">
            <span class="f-title">家中有无传染病及遗传病史</span>
            <li v-for="(item, index) in familyHistory.familyGeneticDisease" :key="index">
              <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
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
            <Button type="primary" icon="checkmark-round">提交修改</Button>
          </Poptip>
        </div>
      </div>
      <div class="add-patient-wrapper">
        <h2 class="title">婚育史
          <Tooltip content="点击修改婚育史" placement="top-start">
            <svg class="update-icon" aria-hidden="true" @click.stop="checkObstericalHistory = true">
              <use xlink:href="#icon-setup"></use>
            </svg>
          </Tooltip>
        </h2>
        <div class="base" v-if="checkObstericalHistory">
          <Form :label-width="60" style="text-align: left">
            <Row v-if="this.basicInformation.gender == '1'">
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
            <Row v-if="this.basicInformation.gender == '1'">
              <FormItem label="月经颜色异常描述">
                <i-input v-model="obstericalHistory.menstruationUnusualColor" placeholder="如无异常请忽略此项"></i-input>
              </FormItem>
              <FormItem label="是否痛经">
                <RadioGroup v-model="obstericalHistory.isDysmenorrhea">
                  <Radio label="1"><span style="padding-right:2rem">是</span></Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="月经是否规律">
                <i-input v-model="obstericalHistory.menstruationUnusualCycle" placeholder="如无异常请忽略此项"></i-input>
              </FormItem>
              </Row>
              <Row>
                <FormItem label="配偶健康状况">
                  <Select v-model="obstericalHistory.spouseDisease" multiple not-found-text="下滑更多选项">
                    <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="子女健康状况">
                  <Select v-model="obstericalHistory.childrenDisease" multiple not-found-text="下滑更多选项">
                    <Option v-for="(item, index) in disease" :value="item.id" :key="index">{{ item.diseaseName }}</Option>
                  </Select>
                </FormItem>
              </Row>
          </Form>
        </div>
        <div class="base" v-if="!checkObstericalHistory">
          <Row v-if="this.basicInformation.gender == '1'">
            <p class="info"><span class="title-info">月经持续:</span>{{obstericalHistory.menstruationDuration}}天</p>
            <p class="info"><span class="title-info">经期开始:</span>{{obstericalHistory.menstruationBeginAge}}岁</p>
            <p class="info"><span class="title-info">绝经时间:</span>{{obstericalHistory.menstruationEndAge}}岁</p>
            <p class="info"><span class="title-info">月经颜色异常描述:</span>{{obstericalHistory.menstruationUnusualColor}}</p>
            <p class="info"><span class="title-info">是否痛经:</span>{{obstericalHistory.isDysmenorrhea | isOrFilter}}</p>
            <p class="info"><span class="title-info">月经不规律:</span>{{obstericalHistory.menstruationUnusualCycle}}</p>
            </Row>
            <Row>
              <ul class="disease-list">
                <span class="f-title">配偶健康状况</span>
                <li v-for="(item, index) in obstericalHistory.spouseDisease" :key="index" >
                  <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
                </li>
              </ul>
              <ul class="disease-list">
                <span class="f-title">子女健康状况</span>
                <li v-for="(item, index) in obstericalHistory.childrenDisease " :key="index" >
                  <span class="label-wrapper">{{item | selectDiseaseArray}}</span>
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
            <Button type="primary" icon="checkmark-round">提交修改</Button>
          </Poptip>
        </div>
      </div>
      <div class="medical-record-wrapper">
        <div class="record">
          <h2 class="title">健康档案</h2>
          <div v-for="(item, index) in medicalRecord" :key="index" class="record-item">
            <Form :label-width="70">
              <Row>
                <i-col :lg="6" :xs="24">
                  <FormItem label="档案类型">
                    <Select v-model="item.type">
                      <Option value ="1">体检报告</Option>
                      <Option value ="2">住院记录</Option>
                      <Option value ="3">门诊记录</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col :lg="7" :xs="24">
                  <FormItem label="时间">
                    <DatePicker v-model="item.date" type="date" placeholder="选择日期" format="yyyy-MM-dd"></DatePicker>
                  </FormItem>
                </i-col>
                <i-col :lg="11" :xs="24">
                  <FormItem label="机构">
                    <i-input v-model="item.organization">
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <FormItem label="是否发现慢性病">
                <Select v-model="item.disease" multiple not-found-text="下滑更多选项">
                    <Option v-for="(i, index1) in disease" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="检查项目" v-model="item.project">
                <Button v-for="(r, index2) in item.project" @click="selectMedical(r)" :key="index2" shape="circle" size="small" style="margin-right:0.4rem">{{r.title}}</Button>
                <Button icon="plus-round" size="small" shape="circle" @click.stop="addMedicalRecordProject(index)"></Button>
              </FormItem>
              <FormItem label="描述" v-if="item.miaosu">
                <i-input v-model="item.miaosu" type="textarea"></i-input>
              </FormItem>
              <FormItem label="初步诊断" v-if="item.chubuzhenduan">
                <i-input v-model="item.chubuzhenduan" type="textarea"></i-input>
              </FormItem>
              <FormItem label="最终诊断" v-if="item.zuizongzhenduan">
                <i-input v-model="item.zuizongzhenduan" type="textarea"></i-input>
              </FormItem>
              <FormItem label="治疗方案" v-if="item.zhiliaofangan">
                <i-input v-model="item.zhiliaofangan" type="textarea"></i-input>
              </FormItem>
              <FormItem label="目前情况及出院注意事项" v-if="item.muqianqingkuangjichuyuanzhuyishixiang">
                <i-input v-model="item.muqianqingkuangjichuyuanzhuyishixiang" type="textarea"></i-input>
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
      title="修改">
      <!-- <JModel :data="selectMedicalData"></JModel> -->
      <Form inline>
        <Row v-for="(item0, index0) in selectMedicalData.lists" :key="index0">
          <FormItem style="width:30%">
            <i-input v-model="item0.value">
              <span slot="prepend">{{item0.notes}}</span>
              <span>{{item0.unit}}</span>
            </i-input>
          </FormItem>
          <FormItem style="width:25%">
            <i-input v-model="item0.valueMin">
              <span slot="prepend">min</span>
            </i-input>
          </FormItem>
          <FormItem style="width:25%">
            <i-input v-model="item0.valueMax">
              <span slot="prepend">max</span>
            </i-input>
          </FormItem>
          <FormItem><span>{{item0.unit}}</span></FormItem>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="addMedicalRecordProjectModel"
      title="添加检查项目"
      @on-ok="updateAddMedicalRecordProjectModel">
      <Form>
        <FormItem style="width:100%">
          <Select v-model="addMedicalData.id" placeholder="选择检查数据项目,向下滚动查看更多" @on-change="queryProjectDataList(addMedicalData.id)">
            <Option v-for="(item, index4) in projectList" :value="item.id" :key="index4">{{item.title}}</Option>
          </Select>
        </FormItem>
        <Row v-for="(item, index5) in addMedicalData.lists" :key="index5" v-if="addMedicalData.id" style="margin-bottom:1rem; background-color:#f8f8f9;padding:0.4rem;border-radius:0.4rem">
          <i-col :lg="12" :xs="24">
            <FormItem>
              <i-input v-model="item.value">
                <span slot="prepend">{{item.notes}}</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :lg="5" :xs="10">
            <FormItem>
              <i-input v-model="item.valueMin" placeholder="最小值">
                  <span slot="prepend">min</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :lg="5" :xs="10">
            <FormItem>
              <i-input v-model="item.valueMax" placeholder="最大值">
                  <span slot="prepend">max</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :lg="2" :xs="4">
            <FormItem><span>{{item.unit}}</span></FormItem>
          </i-col>
        </Row>
      </Form>
      <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        show-upload-list>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>上传影像检查</p>
        </div>
    </Upload>
    </Modal>
    <Modal
      v-model="addMedicalDataModel"
      title="新增健康档案"
      @on-ok="uploadAddMedicalRecord">
      <Form :label-width="40">
        <Row>
          <i-col :lg="7" :xs="24">
            <FormItem label="档案类型">
              <Select v-model="medicalRecordData.type">
                <Option value ="1">体检报告</Option>
                <Option value ="2">门诊记录</Option>
                <Option value ="3">住院记录</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col :lg="7" :xs="24">
            <FormItem label="时间">
              <DatePicker v-model="medicalRecordData.date" type="date" placeholder="选择日期" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
          </i-col>
          <i-col :lg="10" :xs="24">
            <FormItem label="机构">
              <i-input v-model="medicalRecordData.organization">
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <FormItem label="慢性病">
          <Select v-model="medicalRecordData.disease" multiple not-found-text="下滑更多选项" placeholder="若不慢性病可忽略此项,可下拉多选">
              <Option v-for="(i, index1) in disease" :value="i.id" :key="index1">{{ i.diseaseName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="描述">
          <i-input v-model="medicalRecordData.miaosu" type="textarea"></i-input>
        </FormItem>
        <FormItem label="初步诊断" v-if="medicalRecordData.type !== '1'">
          <i-input v-model="medicalRecordData.chubuzhenduan" type="textarea"></i-input>
        </FormItem>
        <FormItem label="最终诊断" v-if="medicalRecordData.type == '3'">
          <i-input v-model="medicalRecordData.zuizongzhendaun" type="textarea"></i-input>
        </FormItem>
        <FormItem label="治疗方案" v-if="medicalRecordData.type == '3'">
          <i-input v-model="medicalRecordData.zhiliaofangan" type="textarea"></i-input>
        </FormItem>
        <FormItem label="注意事项" v-if="medicalRecordData.type == '3'">
          <i-input v-model="medicalRecordData.muqianqingkuangjichuyuanzhuyishixiang" type="textarea"></i-input>
        </FormItem>
      </Form>
      <div>
        <p style="text-align:center">如有检查数据,请在确认新增档案后点击+号添加</p>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getPatientDetail } from 'api/teamList'
import { getDict, getPatientInfo } from 'api/getData'
import { upload } from 'api/upload'
// import * as types from '../../../store/mutations-types'
// import {mapGetters} from 'vuex'
// import {mapMutations} from 'vuex'
// import JModel from 'base/jhylModel/jhylModel'
// import { parseTime } from 'utils/filter'
export default {
  data() {
    return {
      dict: {}, // 数据字典
      selectDiseaseList: [],
      patientDetail: {},
      personalHistoryInfo: [], // 手动编辑dom数据
      basicInformation: {}, // 个人基本信息
      checkBasicInformation: false, // 个人基本信息数据变动后提交修改button的display
      personalHistory: [], // 个人史列表渲染dom数据
      checkPersonalHistory: false, // 个人史数据变动后提交修改button的display
      pastMedicalHistory: [], // 既往史
      checkPastMedicalHistory: false, // 既往史数据变动后提交修改button的display
      familyHistory: [], // 家族史
      checkFamilyHistory: false, // 家族史初始数据变动后提交修改button的display
      obstericalHistory: [], // 婚育史初始数据变动后提交修改button的display
      checkObstericalHistory: false, // 婚育史
      medicalRecord: [], // 健康档案初始数据
      medicalModel: false, // 检查项目弹窗
      addMedicalRecordProjectModel: false, // 添加健康档案检查项目弹窗
      addMedicalDataModel: false, // 新增健康档案弹窗
      selectMedicalData: [], // 点击检查项目传送给子组件的数据
      medicalRecordIndex: '', // 点击添加按钮记录index值
      addMedicalData: {},
      projectList: [ // 添加检查项目数据
        {
        id: '2090',
        title: '凝血功能'
        },
        {
        id: '2091',
        title: '生化全套'
        },
        {
        id: '2092',
        title: '肝功五项'
        },
        {
        id: '2093',
        title: '贫血三项'
        },
        {
        id: '2094',
        title: '肝功999项'
        },
        {
        id: '2095',
        title: '贫血20项'
        }
      ],
      // 添加既往史临时存储数据对象
      id: null,
      diseaseName: null,
      diseaseHospital: null,
      diseaseTime: null,
      //
      // 添加健康档案初始数据

      medicalRecordData: {
        type: '1',
        data: null,
        roganization: null,
        project: [],
        disease: [],
        miaosu: null,
        chubuzhenduan: null,
        zuizongzhenduan: null,
        zhiliaofangan: null,
        muqianqingkuangjichuyuanzhuyishixiang: null
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
    this._getPatientDetail()
    this._getDict()
    this._getPatientInfo()
  },
  methods: {
    // 获取个人信息
    _getPatientInfo() {
      const params = {
        type: 0,
        patientId: 1
      }
      getPatientInfo(params).then(res => {
        this.basicInformation = res.data.patientDetail
        this.personalHistory = res.data.patientDiseaseHistory
      })
    },
    // 获取字典数据列表
    _getDict() {
      const params = {
        dictType: [
          'area', 'ethnicity', 'degree', 'disease'
        ],
        diseaseType: 2
      }
      getDict(params).then(res => {
        this.dict = res.data
        console.log(this.dict)
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
      var url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/login'
      var params = {
      }
      upload(url, params).then(res => {
        if (res.data.code === 200) {
          this.$Message.info('点击了确定')
        } else {
          this.$Message.info('网络错误')
          this.checkBasicInformation = false
        }
      })
      },
    // 个人史修改确认提交
    uploadPersonalHistory () {
      var url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/login'
      var params = {
      }
      upload(url, params).then(res => {
        if (res.data.code === 200) {
          this.$Message.info('点击了确定')
        } else {
          this.$Message.info('网络错误')
          this.checkPersonalHistory = false
        }
      })
      },
      // 既往史修改确认提交
    uploadPastMedicalHistory () {
      var url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/login'
      var params = {
      }
      upload(url, params).then(res => {
        if (res.data.code === 200) {
          this.$Message.info('点击了确定')
        } else {
          this.$Message.info('网络错误')
          this.checkPastMedicalHistory = false
        }
      })
      },
      // 家族史修改确认提交
    uploadFamilyHistory () {
      var url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/login'
      var params = {
      }
      upload(url, params).then(res => {
        if (res.data.code === 200) {
          this.$Message.info('点击了确定')
        } else {
          this.$Message.info('网络错误')
          this.checkFamilyHistory = false
        }
      })
      },
      // 婚育史修改确认提交
    uploadObstericalHistory () {
      var url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/login'
      var params = {
      }
      upload(url, params).then(res => {
        if (res.data.code === 200) {
          this.$Message.info('点击了确定')
        } else {
          this.$Message.info('网络错误')
          this.checkObstericalHistory = false
        }
      })
      },
    // 点击检查项目展示\修改列表
    selectMedical(r) {
      this.medicalModel = true
      this.selectMedicalData = r
      console.log(r)
    },
      addMedicalRecordProject(index) {
      this.addMedicalRecordProjectModel = true
      // console.log(index)
      this.medicalRecordIndex = index
    },
    queryProjectDataList() {
      console.log(this.addMedicalData.id)
    },
    updateAddMedicalRecordProjectModel() {
      console.log(this.addMedicalData)
      let i = this.medicalRecordIndex
      // var data = Object.assign({}, this.addMedicalData)
      // this.medicalRecord[i].project.push(data)
      var obj = {}
      obj = JSON.parse(JSON.stringify(this.addMedicalData))
      this.medicalRecord[i].project.push(obj)
      // this.addMedicalData = {}
      console.log(this.medicalRecord)
      this.medicalRecordIndex = ''
    },
    // 新增健康档案
    addMedicalRecord() {
      this.addMedicalDataModel = true
    },
    // 提交新增健康档案
    uploadAddMedicalRecord() {
      var obj = {}
      obj = JSON.parse(JSON.stringify(this.medicalRecordData))
      this.medicalRecord.push(obj)
    },
    _getPatientDetail() {
      getPatientDetail().then(res => {
        this.patientDetail = res.data
        // this.setBasicInfoMation(res.data)
        // this.basicInformation = res.data.basicInformation
        // this.personalHistory = res.data.personalHistory
        this.pastMedicalHistory = res.data.pastMedicalHistory
        this.familyHistory = res.data.familyHistory
        this.obstericalHistory = res.data.obstericalHistory
        this.medicalRecord = res.data.medicalRecord
        this.addMedicalData = res.data.addMedicalData
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
    }
  },
  computed: {
  },
  watch: {
    basicInformation: {
      handler(newValue, oldValue) {
        console.log(newValue + '监听了变化')
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
        return time
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
      var degreeList = [
        '否',
        '是'
      ]
      return degreeList[value]
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
        span
          margin-right 1rem
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
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon
  left 0
  padding-left 1rem
</style>