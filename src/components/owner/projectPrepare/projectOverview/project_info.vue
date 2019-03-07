<template>
    <div class="info-block">
        <!-- <table>
            <tr>
                <td><label>项目名称：</label><span>{{ infoData.plantName }}</span></td>
                <td><label>项目类型：</label><span>{{ infoData.projectType }}</span></td>
                <td><label>项目法人：</label><span>{{ infoData.legalPersonName }}</span></td>
                <td><label>法人代表：</label><span>{{ infoData.legalRepresentativeName }}</span></td>
            </tr>
            <tr>
                <td><label>工程级别：</label><span>{{ infoData.level }}</span></td>
                <td><label>所在地：</label><span>{{ infoData.location }}</span></td>
                <td><label>所在县：</label><span>{{ infoData.county }}</span></td>
                <td><label>项目来源：</label><span>{{ infoData.projectSource }}</span></td>
            </tr>
            <tr>
                <td><label>经度：</label><span>{{ infoData.longitude }}</span></td>
                <td><label>纬度：</label><span>{{ infoData.latitude }}</span></td>
                <td><label>规模：</label><span>{{ infoData.scale }}</span></td>
                <td><label>工期：</label><span>{{ infoData.timeLimit }}</span></td>
            </tr>
            <tr>
                <td><label>总容量：</label><span>{{ infoData.storage }}</span></td>
                <td><label>兴利库容:</label><span>{{ infoData.utilizablCapacity }}</span></td>
                <td><label>是否签订枢纽工程施工承包合同：</label><span>{{ infoData.hasSignedConstructionContract }}</span></td>
                <td><label>枢纽工程是否完工：</label><span>{{ infoData.hasAcceptCompletion }}</span></td>
            </tr>
            <tr>
                <td><label>监理、施工招标情况：</label><span>{{ infoData.supervisorBid }}</span></td>
                <td><label>是否竣工验收:</label><span>{{ infoData.hasProjectCompleted }}</span></td>
            </tr>
            <tr>
                <td><label>坝型：</label><span>{{ infoData.damType }}</span></td>
                <td><label>最大坝高（m）:</label><span>{{ infoData.maxDamHeight }}</span></td>
                <td><label>度汛高程：</label><span>{{ infoData.installedCapacity }}</span></td>
                <td><label>溢洪道（m）：</label><span>{{ infoData.cellProjectAmount }}</span></td>
            </tr>
            <tr>
                <td><label>灌溉面积(万亩）：</label><span>{{ infoData.irrigatedArea }}</span></td>
                <td><label>积水面积:</label><span>{{ infoData.catchmentArea }}</span></td>
                <td><label>供水量（万m³/年)：</label><span>{{ infoData.irrigatedArea }}</span></td>
                <td><label>装机容积（Kw）：</label><span>{{ infoData.installedCapacity }}</span></td>
            </tr>
            <tr>
                <td><label>城镇供水人口（万人)：</label><span>{{ infoData.waterSupplyPopulation }}</span></td>
                <td><label>农村人饮（万人）：</label><span>{{ infoData.ruralHumanWater }}</span></td>
                <td><label>大牲畜（万头）:</label><span>{{ infoData.livestock }}</span></td>
                <td><label>工程占地（亩）：</label><span>{{ infoData.areaCoverage }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>总投资（万元）：</label><span>{{ infoData.totalInvestment }}</span></td>
            </tr>
            <tr>
                <td><label>单位工程数：</label><span>{{ infoData.unitProjectAmount }}</span></td>
                <td><label>单元工程数：</label><span>{{ infoData.cellProjectAmount }}</span></td>
                <td><label>分部工程数:</label><span>{{ infoData.branchProjectAmount }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>项目概况：</label><span>{{ infoData.overview }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>工程任务及主要建筑物：</label><span>{{ infoData.unitProjectOverview }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>建设用地：</label><span>{{ infoData.constructionLand }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>土地复垦方案：</label><span>{{ infoData.landReclamationPlan }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>单位工程概况：</label><span>{{ infoData.unitProjectOverview }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>单元工程概况：</label><span>{{ infoData.cellProjectOverview }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>分布工程概况：</label><span>{{ infoData.branchProjectOverview }}</span></td>
            </tr>
            <tr>
                <td colspan="4"><label>备注：</label><span>{{ infoData.remark }}</span></td>
            </tr>
        </table> -->
        <el-row :gutter="20">
            <el-col :span="12">
                <el-collapse v-model="register_info">
                    <el-collapse-item name="1">
                        <div slot="title">注册信息</div>
                        <div class="info">
                            <table>
                                <tr>
                                    <td colspan="2"><label>项目名称：</label><span>{{ infoData.plantName }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><label>项目类型：</label><span>{{ infoData.projectType }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>规模：</label><span>{{ infoData.scale }}</span></td>
                                    <td><label>工程级别：</label><span>{{ infoData.level }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>项目法人：</label><span>{{ infoData.legalPersonName }}</span></td>
                                    <td><label>法人代表：</label><span>{{ infoData.legalRepresentativeName }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>所在县：</label><span>{{ infoData.county }}</span></td>
                                    <td><label>所在地：</label><span>{{ infoData.location }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>纬度：</label><span>{{ infoData.latitude }}</span></td>
                                    <td><label>规模：</label><span>{{ infoData.scale }}</span></td>
                                </tr>
                            </table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="12">
                <el-collapse v-model="base_info">
                    <el-collapse-item name="1">
                        <div slot="title">基础信息<span></span></div>
                        <div class="info">
                            <table>
                                <tr>
                                    <td colspan="2"><label>坝型：</label><span>{{ infoData.damType }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>最大坝高（m）:</label><span>{{ infoData.maxDamHeight }}</span></td>
                                    <td><label>溢洪道（m）：</label><span>{{ infoData.cellProjectAmount }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>度汛高程：</label><span>{{ infoData.installedCapacity }}</span></td>
                                    <td><label>总容量：</label><span>{{ infoData.storage }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>兴利库容:</label><span>{{ infoData.utilizablCapacity }}</span></td>
                                    <td><label>装机容积（Kw）：</label><span>{{ infoData.installedCapacity }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>灌溉面积(万亩）：</label><span>{{ infoData.irrigatedArea }}</span></td>
                                    <td><label>积水面积:</label><span>{{ infoData.catchmentArea }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>城镇供水人口（万人)：</label><span>{{ infoData.waterSupplyPopulation }}</span></td>
                                    <td><label>农村人饮（万人）：</label><span>{{ infoData.ruralHumanWater }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>大牲畜（万头）:</label><span>{{ infoData.livestock }}</span></td>
                                    <td><label>供水量（万m³/年)：</label><span>{{ infoData.irrigatedArea }}</span></td>
                                </tr>
                            </table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="24">
                <el-collapse v-model="engineering_info">
                    <el-collapse-item name="1">
                        <div slot="title">工程信息</div>
                        <div class="info">
                            <table>
                                <tr>
                                    <td colspan="4"><label>项目来源：</label><span>{{ infoData.projectSource }}</span></td>
                                </tr>
                                <tr>

                                    <td><label>工期：</label><span>{{ infoData.timeLimit }}</span></td>
                                    <td><label>是否签订枢纽工程施工承包合同：</label><span>{{ infoData.hasSignedConstructionContract }}</span></td>
                                    <td><label>枢纽工程是否完工：</label><span>{{ infoData.hasAcceptCompletion }}</span></td>
                                    <td><label>是否竣工验收:</label><span>{{ infoData.hasProjectCompleted }}</span></td>
                                </tr>
                                <tr>
                                    <td><label>工程占地（亩）：</label><span>{{ infoData.areaCoverage }}</span></td>
                                    <td><label>单位工程数：</label><span>{{ infoData.unitProjectAmount }}</span></td>
                                    <td><label>单元工程数：</label><span>{{ infoData.cellProjectAmount }}</span></td>
                                    <td><label>分部工程数:</label><span>{{ infoData.branchProjectAmount }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>项目概况：</label><span>{{ infoData.overview }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>工程任务及主要建筑物：</label><span>{{ infoData.unitProjectOverview }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>建设用地：</label><span>{{ infoData.constructionLand }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>土地复垦方案：</label><span>{{ infoData.landReclamationPlan }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>单位工程概况：</label><span>{{ infoData.unitProjectOverview }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>单元工程概况：</label><span>{{ infoData.cellProjectOverview }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>分布工程概况：</label><span>{{ infoData.branchProjectOverview }}</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><label>备注：</label><span>{{ infoData.remark }}</span></td>
                                </tr>
                            </table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="24">
                <el-collapse v-model="investment_info">
                    <el-collapse-item name="1">
                        <div slot="title">投资信息</div>
                        <dt>
                            <dl><label>项目名称：</label><span>{{ infoData.plantName }}</span></dl>
                            <dl><label>项目类型：</label><span>{{ infoData.projectType }}</span></dl>
                            <dl><label>项目法人：</label><span>{{ infoData.legalPersonName }}</span></dl>
                            <dl><label>法人代表：</label><span>{{ infoData.legalRepresentativeName }}</span></dl>
                            <dl><label>项目名称：</label><span>{{ infoData.plantName }}</span></dl>
                            <dl><label>项目类型：</label><span>{{ infoData.projectType }}</span></dl>
                            <dl><label>项目法人：</label><span>{{ infoData.legalPersonName }}</span></dl>
                            <dl><label>法人代表：</label><span>{{ infoData.legalRepresentativeName }}</span></dl>
                            <dl><label>项目名称：</label><span>{{ infoData.plantName }}</span></dl>
                            <dl><label>项目类型：</label><span>{{ infoData.projectType }}</span></dl>
                            <dl><label>项目法人：</label><span>{{ infoData.legalPersonName }}</span></dl>
                            <dl><label>法人代表：</label><span>{{ infoData.legalRepresentativeName }}</span></dl>
                        </dt>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['infoData'],
    data() {
        return {
            infoDatas: {}
        }
    }
}
</script>
