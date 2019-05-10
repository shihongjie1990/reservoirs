<template>
  <div class="owner-paper">
    <div class="title page-title"><span>月报填写</span></div>
    <el-steps :active="activeNum - 1"
              process-status="finish"
              finish-status="success">
      <el-step title="基础信息"
               icon="fa fa-edit fa-lg"></el-step>
      <el-step title="投资情况"
               icon="fa fa-rmb fa-lg"></el-step>
      <el-step title="工程量情况"
               icon="fa fa-building fa-lg"></el-step>
      <el-step title="项目情况"
               icon="fa fa-folder-open-o fa-lg"></el-step>
      <el-step title="附件"
               icon="fa fa-image fa-lg"></el-step>
    </el-steps>
    <div class="paper-base"
         v-show="activeNum === 1">
      <el-form ref="form1"
               :rules="rules"
               :model="baseForm"
               label-width="120px">
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="上报人"
                          prop="submitter">
              <el-input v-model="baseForm.submitter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="统计负责人"
                          prop="statisticalLeader">
              <el-input v-model="baseForm.statisticalLeader"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="填报月份"
                          prop="submitDate">
              <el-date-picker v-model="baseForm.submitDate"
                              type="month"
                              placeholder="选择月"
                              value-format="yyyy-MM">
                <!-- <el-date-picker v-model="baseForm.submitDate"
                              type="month"
                              placeholder="选择月"> -->
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="investment-status"
         v-show="activeNum === 2">
      <el-form ref="investmentForm"
               :model="investmentForm"
               label-width="220px"
               :rules="rules2">
        <div>
          <div class="title">工程投资部分</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="建筑工程(万元)"
                            prop="civilEngineering">
                <el-input v-model="investmentForm.civilEngineering"
                          @keyup.native="changeValue('civilEngineering')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearCivilEngineering || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarCivilEngineering || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机电设备及安装工程(万元)"
                            prop="electromechanicalEquipment">
                <el-input v-model="investmentForm.electromechanicalEquipment"
                          @keyup.native="changeValue('electromechanicalEquipment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearElectromechanicalEquipment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarElectromechanicalEquipment || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="金属机构设备及安装工程(万元)"
                            prop="metalMechanism">
                <el-input v-model="investmentForm.metalMechanism"
                          @keyup.native="changeValue('metalMechanism')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearMetalMechanism || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarMetalMechanism || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="施工临时工程(万元)"
                            prop="temporaryWork">
                <el-input v-model="investmentForm.temporaryWork"
                          @keyup.native="changeValue('temporaryWork')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearTemporaryWork || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarTemporaryWork || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="独立费用(万元)"
                            prop="independentCost">
                <el-input v-model="investmentForm.independentCost"
                          @keyup.native="changeValue('independentCost')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearIndependentCost || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarIndependentCost || 0 }}</div>
            </el-col>
          </el-row>
          <!-- </el-form> -->
        </div>
        <div>
          <div class="title">移民、环境投资</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="建设征地移民安置补偿费(万元)"
                            prop="resettlementArrangement">
                <el-input v-model="investmentForm.resettlementArrangement"
                          @keyup.native="changeValue('resettlementArrangement')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearResettlementArrangement || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarResettlementArrangement || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="水土保持工程投资(万元)"
                            prop="waterConservation">
                <el-input v-model="investmentForm.waterConservation"
                          @keyup.native="changeValue('waterConservation')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearWaterConservation || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarWaterConservation || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="环境保护工程投资(万元)"
                            prop="environmentalProtection">
                <el-input v-model="investmentForm.environmentalProtection"
                          @keyup.native="changeValue('environmentalProtection')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearEnvironmentalProtection || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarEnvironmentalProtection || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他(万元)"
                            prop="otherCost">
                <el-input v-model="investmentForm.otherCost"
                          @keyup.native="changeValue('otherCost')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearOtherCost || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarOtherCost || 0 }}</div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="title">资金来源</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="中央投资(万元)"
                            prop="sourceCentralInvestment">
                <el-input v-model="investmentForm.sourceCentralInvestment"
                          @keyup.native="changeValue('sourceCentralInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearSourceCentralInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarSourceCentralInvestment || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省级投资(万元)"
                            prop="sourceProvincialInvestment">
                <el-input v-model="investmentForm.sourceProvincialInvestment"
                          @keyup.native="changeValue('sourceProvincialInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearSourceProvincialInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarSourceProvincialInvestment || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="市县投资(万元)"
                            prop="sourceLocalInvestment">
                <el-input v-model="investmentForm.sourceLocalInvestment"
                          @keyup.native="changeValue('sourceLocalInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearSourceLocalInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarSourceLocalInvestment || 0 }}</div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="title">资金到位</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="中央投资(万元)"
                            prop="availableCentralInvestment">
                <el-input v-model="investmentForm.availableCentralInvestment"
                          @keyup.native="changeValue('availableCentralInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearAvailableCentralInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarAvailableCentralInvestment || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省级投资(万元)"
                            prop="availableProvincialInvestment">
                <el-input v-model="investmentForm.availableProvincialInvestment"
                          @keyup.native="changeValue('availableProvincialInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearAvailableProvincialInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarAvailableProvincialInvestment || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="市县投资(万元)"
                            prop="availableLocalInvestment">
                <el-input v-model="investmentForm.availableLocalInvestment"
                          @keyup.native="changeValue('availableLocalInvestment')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearAvailableLocalInvestment || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarAvailableLocalInvestment || 0 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="investment-status"
         v-show="activeNum === 3">
      <el-form ref="engineerForm"
               :model="investmentForm"
               label-width="220px"
               :rules="rules3">
        <div>
          <div class="title">本月工程量</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
            <el-col :span="8">
              <pre> </pre>
            </el-col>
            <el-col :span="2">
              <div>本年度累计</div>
            </el-col>
            <el-col :span="2">
              <div>开工累计</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="土石方明挖（万/m³）"
                            prop="openDug">
                <el-input v-model="investmentForm.openDug"
                          @keyup.native="changeValue('openDug')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearOpenDug || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarOpenDug || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="土石方洞挖（万/m³）"
                            prop="holeDug">
                <el-input v-model="investmentForm.holeDug"
                          @keyup.native="changeValue('holeDug')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearHoleDug || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarHoleDug || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="土石方回填（万/m³）"
                            prop="backfill">
                <el-input v-model="investmentForm.backfill"
                          @keyup.native="changeValue('backfill')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearBackfill || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarBackfill || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="砌石（万/m³）"
                            prop="masonry">
                <el-input v-model="investmentForm.masonry"
                          @keyup.native="changeValue('masonry')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearMasonry || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarMasonry || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="混凝土（万/m³）"
                            prop="concrete">
                <el-input v-model="investmentForm.concrete"
                          @keyup.native="changeValue('concrete')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearConcrete || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarConcrete || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="钢筋（t）"
                            prop="rebar">
                <el-input v-model="investmentForm.rebar"
                          @keyup.native="changeValue('rebar')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearRebar || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarRebar || 0 }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="灌浆（m或m³）"
                            prop="grout">
                <el-input v-model="investmentForm.grout"
                          @keyup.native="changeValue('grout')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearGrout || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarGrout || 0 }}</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="劳动力投入（万工日）"
                            prop="labourForce">
                <el-input v-model="investmentForm.labourForce"
                          @keyup.native="changeValue('labourForce')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.yearLabourForce || 0 }}</div>
            </el-col>
            <el-col :span="2">
              <div class="investment-view">{{ investmentViewData.sofarLabourForce || 0 }}</div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="project-situation"
         v-show="activeNum === 4">
      <el-form ref="projectForm"
               :model="projectForm"
               label-width="180px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主要建设内容">
              <el-input v-model="projectForm.constructionContent"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程形象进度及节点工期">
              <el-input v-model="projectForm.visualProgress"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="存在困难及问题">
              <el-input v-model="projectForm.difficulty"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采取的主要措施">
              <el-input v-model="projectForm.measure"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="下一步建议">
              <el-input v-model="projectForm.suggestion"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="projectForm.remark"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="attachment"
         v-show="activeNum === 5">
      <el-upload class="upload-file"
                 ref="upload"
                 action=""
                 multiple
                 :auto-upload="false"
                 :file-list="fileList"
                 :on-preview="$common.showFullScreenPic"
                 :on-change="handleChange"
                 list-type="picture-card"
                 style="width:100%">
        <i class="el-icon-plus"></i>
        <!-- <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
      </el-upload>
    </div>
    <div class="toolbar">
      <el-button :type="activeNum === 1 ? 'info' : 'primary'"
                 plain
                 :disabled="activeNum === 1 ? true : false"
                 @click="activeNum--">上一步</el-button>
      <el-button v-if="activeNum < 5"
                 type="primary"
                 @click="nextStep">下一步</el-button>
      <el-button v-if="activeNum === 5"
                 type="success"
                 @click="fileUpload">提交</el-button>
      <!-- <el-button type="danger" @click="validateForm">测试校验</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNum: 1,
      baseForm: {
        name: '',
        monthDate: '',
        submitDate: '',
        submitter: '',
        statisticalLeader: ''
      },
      projectForm: {},
      fileList: [],
      // 机电设备和金属结构
      investmentForm: {
        civilEngineering: '', // 建筑工程
        electromechanicalEquipment: '', // 机电设备及安装工程
        metalMechanism: '', // 金属机构设备及安装工程
        temporaryWork: '', // 施工临时工程
        independentCost: '', // 独立费用
        resettlementArrangement: '', // 建设征地移民安置补偿费
        waterConservation: '', // 水土保持工程投资
        environmentalProtection: '', // 环境保护工程投资
        otherCost: '', // 其他
        sourceCentralInvestment: '', // 资金来源--中央投资
        sourceProvincialInvestment: '', // 资金来源--省级投资
        sourceLocalInvestment: '', // 资金来源--市县投资
        availableCentralInvestment: '', // 资金到位--中央投资
        availableProvincialInvestment: '', // 资金到位--省级投资
        availableLocalInvestment: '', // 资金到位--市县投资
        openDug: '', // 土石方明挖
        holeDug: '', // 土石方洞挖
        backfill: '', // 土石方回填
        masonry: '', // 砌石
        concrete: '', // 混凝土
        rebar: '', // 钢筋
        grout: '', // 灌浆
        labourForce: '' // 劳动力
      },
      rules2: {
        civilEngineering: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        electromechanicalEquipment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        metalMechanism: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        temporaryWork: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        independentCost: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        resettlementArrangement: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        waterConservation: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        environmentalProtection: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        otherCost: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        sourceCentralInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        sourceProvincialInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        sourceLocalInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        availableCentralInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        availableProvincialInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        availableLocalInvestment: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ]
      },
      rules3: {
        openDug: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        holeDug: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        backfill: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        masonry: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        concrete: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        rebar: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        grout: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        labourForce: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ]
      },
      investmentResponseData: {},
      investmentViewData: {
        // 年累计
        yearCivilEngineering: '',
        yearElectromechanicalEquipment: '',
        yearMetalMechanism: '',
        yearTemporaryWork: '',
        yearIndependentCost: '',
        yearResettlementArrangement: '',
        yearWaterConservation: '',
        yearEnvironmentalProtection: '',
        yearOtherCost: '',
        yearSourceCentralInvestment: '',
        yearSourceProvincialInvestment: '',
        yearSourceLocalInvestment: '',
        yearAvailableCentralInvestment: '',
        yearAvailableProvincialInvestment: '',
        yearAvailableLocalInvestment: '',
        yearOpenDug: '',
        yearHoleDug: '',
        yearBackfill: '',
        yearMasonry: '',
        yearConcrete: '',
        yearRebar: '',
        yearGrout: '',
        yearLabourForce: '',
        // 当前累计
        sofarCivilEngineering: '',
        sofarElectromechanicalEquipment: '',
        sofarMetalMechanism: '',
        sofarTemporaryWork: '',
        sofarIndependentCost: '',
        sofarResettlementArrangement: '',
        sofarWaterConservation: '',
        sofarEnvironmentalProtection: '',
        sofarOtherCost: '',
        sofarSourceCentralInvestment: '',
        sofarSourceProvincialInvestment: '',
        sofarSourceLocalInvestment: '',
        sofarAvailableCentralInvestment: '',
        sofarAvailableProvincialInvestment: '',
        sofarAvailableLocalInvestment: '',
        sofarOpenDug: '',
        sofarHoleDug: '',
        sofarBackfill: '',
        sofarMasonry: '',
        sofarConcrete: '',
        sofarRebar: '',
        sofarGrout: '',
        sofarLabourForce: ''
      },
      rules: {
        submitter: [
          { required: true, message: '请填写上报人', trigger: 'blur' }
        ],
        submitDate: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        statisticalLeader: [
          { required: true, message: '请填写统计负责人', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'baseForm.submitDate' (curDate, oldDate) {
      this.getMonthlyReportPostHistory(curDate).then(res => {
        let data = res.data
        this.investmentResponseData = data
        this.investmentViewData = JSON.parse(JSON.stringify(data))
      })
    }
  },
  methods: {
    validNum (rule, value, callback) {
      if (!value) {
        return callback(new Error('必填'))
      } else if (isNaN(value)) {
        return callback(new Error('只能填数字！'))
      } else {
        callback()
      }
    },
    handleChange (file, files) {
      let fileContent = file.raw
      if (fileContent.type.indexOf('.sheet') > 0) {
        file.url = 'static/images/excel.jpg?time=' + new Date().getTime()
      } else if (fileContent.type.indexOf('.document') > 0) {
        file.url = 'static/images/word.jpg'
      }
    },
    nextStep () {
      let refName = ''
      let activeNum = this.activeNum
      switch (activeNum) {
        case 1:
          refName = 'form1'
          break
        case 2:
          refName = 'investmentForm'
          break
        case 3:
          refName = 'engineerForm'
          break
        case 4:
          refName = 'projectForm'
          break
        default:
          break
      }
      this.validateForm(refName).then(res => {
        if (res) {
          this.activeNum++
        }
      })
    },
    getMonthlyReportPostHistory (currentDate) {
      let thisRequest = this.$http.get(`/api/pmr/historystatistic/${currentDate}`)
      return thisRequest
    },
    changeValue (key) {
      let thisValue = parseFloat(this.investmentForm[key])
      if (isNaN(thisValue)) {
        thisValue = 0
      }
      let toUpper = key.substring(0, 1).toUpperCase() + key.substring(1)
      let yearKey = 'year' + toUpper
      let sofarKey = 'sofar' + toUpper
      let investmentResponseData = this.investmentResponseData
      this.investmentViewData[yearKey] = investmentResponseData[yearKey] + thisValue
      this.investmentViewData[sofarKey] = investmentResponseData[sofarKey] + thisValue
    },
    detailSubmit () {
      /* this.investmentForm.submitter = this.baseForm.submitter
      this.investmentForm.statisticalLeader = this.baseForm.statisticalLeader */
      Object.assign(this.investmentForm, this.baseForm, this.projectForm)
      this.investmentForm.submitDate = this.baseForm.submitDate + '-01 08:00:00'
      this.$http.post('/api/pmr', this.investmentForm, { loading: { operation: true } }).then(res => {
        if (res.code === 1002) {
          this.$message({ type: 'success', message: '月报新增成功！' })
          this.$router.push({ path: '/monthpaper/management' })
        } else {
          this.$alert(res.msg || res.content || res.error, '警告', { type: 'error' })
        }
      })
    },
    fileUpload () {
      let files = this.$refs.upload.uploadFiles
      if (files && files.length > 0) {
        let fd = new FormData()
        files.map((item, index) => {
          let raw = item.raw
          if (item.raw) {
            fd.append('uploadfile', raw)
          }
        })
        this.$http.post('/api/file/uploadtempfiles', fd, { loading: { operation: true } }).then(res => {
          if (res.code === 1002) {
            this.investmentForm.tempFolderRelativePath = res.data
            this.$nextTick(() => {
              this.detailSubmit()
            })
          }
        })
      }
    },
    /**
     *  表单校验
     */
    validateForm (formRef) {
      // 三个表单 form1, investmentForm, engineerForm
      return new Promise((resolve, reject) => {
        this.$refs[formRef].validate((valid) => {
          resolve(valid)
        })
      })
    }
  },
  mounted () {
    let param = this.$route.params
    let dateString = ''
    if (param && param.createDate) {
      dateString = param.createDate
    } else {
      let nowDate = new Date()
      let month = nowDate.getMonth() + 1
      dateString = nowDate.getFullYear() + '-' + (month < 10 ? '0' + month : month)
    }
    this.baseForm.submitDate = dateString
  }
}
</script>
