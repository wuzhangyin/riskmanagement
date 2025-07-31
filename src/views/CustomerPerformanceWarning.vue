<template>
  <div class="customer-performance-warning">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="nav-left">
                <span class="nav-path">
          <span class="nav-link" @click="goToHome">首页</span> /
          <span class="nav-link" @click="goToNonICTProjects">非ICT项目</span> /
          {{ decodeURIComponent(props.riskPointName) }}
        </span>
      </div>
      <div class="nav-right">
        <div class="nav-controls">
          <span class="control-label">统计方式：</span>
          <el-radio-group v-model="timeMode" size="small">
            <el-radio-button label="day">日</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
        </div>
        <div class="nav-controls">
          <span class="control-label">选择日期：</span>
          <el-date-picker
            v-model="selectedDate"
            type="month"
            placeholder="选择月份"
            format="YYYY-MM"
            value-format="YYYY-MM"
            size="small"
          />
        </div>
        <div class="nav-controls">
          <span class="control-label">地市：</span>
          <el-select v-model="selectedCity" placeholder="选择地市" size="small" style="width: 100px;">
            <el-option label="全省" value="all" />
            <el-option label="广州" value="guangzhou" />
            <el-option label="深圳" value="shenzhen" />
            <el-option label="东莞" value="dongguan" />
          </el-select>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content" style="padding: 20px;">
      <!-- 左侧区域 -->
      <div class="left-section">
        <!-- 风险概览卡片 -->
        <div class="kpi-cards">
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">健康度</span>
            </div>
            <div class="kpi-value health-status">
              <div class="status-icon excellent"></div>
              <span class="status-text">优秀</span>
            </div>
            <div class="kpi-trend trend-up">环比 +5.2%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">风险得分</span>
            </div>
            <div class="kpi-value">94.4</div>
            <div class="kpi-trend trend-down">环比 -2.1%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">预警量</span>
            </div>
            <div class="kpi-value">6</div>
            <div class="kpi-trend trend-up">环比 +8.7%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">涉及客户量</span>
            </div>
            <div class="kpi-value">1</div>
            <div class="kpi-trend trend-up">环比 +100.0%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">涉及项目量</span>
            </div>
            <div class="kpi-value">1</div>
            <div class="kpi-trend trend-up">环比 +100.0%</div>
          </div>
        </div>

        <!-- 健康度发展趋势 -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">健康度发展趋势</span>
          </div>
          <div class="chart-container">
            <HealthTrendChart />
          </div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
        <!-- 风险点分数计算口径 -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">风险点分数计算口径</span>
          </div>
          <div class="calculation-table">
            <table class="table">
              <thead>
                <tr>
                  <th>计算维度</th>
                  <th>指标值</th>
                  <th>风险分数</th>
                  <th>权重</th>
                  <th>加权扣分</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>风险预警量</td>
                  <td>6</td>
                  <td>85.0</td>
                  <td>60%</td>
                  <td>9.0</td>
                </tr>
                <tr>
                  <td>风险预警量环比</td>
                  <td>8.7%</td>
                  <td>85.0</td>
                  <td>40%</td>
                  <td>6.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 地市得分/地市风险分析 -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">地市得分</span>
            <div class="card-tabs">
              <el-radio-group v-model="cityAnalysisType" size="small">
                <el-radio-button label="score">地市得分</el-radio-button>
                <el-radio-button label="risk">地市风险分析</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chart-container">
            <CityScoreChart v-if="cityAnalysisType === 'score'" />
            <CityRiskAnalysisChart v-if="cityAnalysisType === 'risk'" />
          </div>
        </div>
      </div>
    </div>

    <!-- 风险点指标详情 -->
    <div class="risk-details-section" style="padding: 0 20px 20px 20px;">
      <!-- 风险点指标详情-非ICT大数据_上游客户存在高额欠费 -->
      <div class="risk-detail-card">
        <div class="card-header">
          <span class="card-title">风险点指标详情-非ICT大数据_上游客户存在高额欠费</span>
        </div>
        <div class="detail-content">
          <table class="detail-table">
            <thead>
              <tr>
                <th>差错原因</th>
                <th>风险等级</th>
                <th>项目唯一标识</th>
                <th>商机编码</th>
                <th>全网商机编码</th>
                <th>项目名称</th>
                <th>集团客户编码</th>
                <th>集团客户名称</th>
                <th>地市名称</th>
                <th>欠费总额</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in riskDetailData" :key="index">
                <td>{{ item.errorReason }}</td>
                <td>
                  <span :class="['risk-level', item.riskLevel]">{{ item.riskLevelText }}</span>
                </td>
                <td>{{ item.projectId }}</td>
                <td>{{ item.opportunityCode }}</td>
                <td>{{ item.fullNetworkCode }}</td>
                <td>{{ item.projectName }}</td>
                <td>{{ item.customerCode }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.cityName }}</td>
                <td>{{ item.arrearsAmount }}</td>
              </tr>
            </tbody>
          </table>
          <div class="table-footer">
            <div class="pagination">
              <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next, jumper"
                @current-change="handlePageChange"
              />
            </div>
            <div class="action-buttons">
              <el-button size="small">展现定义</el-button>
              <el-button size="small">口径&知识查看</el-button>
              <el-button size="small">导出</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 风险点指标详情-非ICT移动云_上游客户为异地客户 -->
      <div class="risk-detail-card">
        <div class="card-header">
          <span class="card-title">风险点指标详情-非ICT移动云_上游客户为异地客户</span>
        </div>
        <div class="detail-content">
          <table class="detail-table">
            <thead>
              <tr>
                <th>差错原因</th>
                <th>风险等级</th>
                <th>项目唯一标识</th>
                <th>商机编码</th>
                <th>全网商机编码</th>
                <th>项目名称</th>
                <th>集团客户名称</th>
                <th>合作商名称</th>
                <th>预估投入金额</th>
                <th>地市名称</th>
                <th>利润率</th>
                <th>IT利润率</th>
                <th>企业成立日期</th>
                <th>注册地市</th>
                <th>注册资本</th>
                <th>企业员工数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in mobileCloudData" :key="index">
                <td>{{ item.errorReason }}</td>
                <td>
                  <span :class="['risk-level', item.riskLevel]">{{ item.riskLevelText }}</span>
                </td>
                <td>{{ item.projectId }}</td>
                <td>{{ item.opportunityCode }}</td>
                <td>{{ item.fullNetworkCode }}</td>
                <td>{{ item.projectName }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.partnerName }}</td>
                <td>{{ item.estimatedAmount }}</td>
                <td>{{ item.cityName }}</td>
                <td>{{ item.profitMargin }}%</td>
                <td>{{ item.itProfitMargin }}%</td>
                <td>{{ item.establishmentDate }}</td>
                <td>{{ item.registeredCity }}</td>
                <td>{{ item.registeredCapital }}</td>
                <td>{{ item.employeeCount }}</td>
              </tr>
            </tbody>
          </table>
          <div class="table-footer">
            <div class="pagination">
              <el-pagination
                :current-page="currentPage2"
                :page-size="pageSize"
                :total="total2"
                layout="prev, pager, next, jumper"
                @current-change="handlePageChange2"
              />
            </div>
            <div class="action-buttons">
              <el-button size="small">展现定义</el-button>
              <el-button size="small">口径&知识查看</el-button>
              <el-button size="small">导出</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 风险点指标详情-非ICT移动云上游客户为成立时间较短的小型企业 -->
      <div class="risk-detail-card">
        <div class="card-header">
          <span class="card-title">风险点指标详情-非ICT移动云上游客户为成立时间较短的小型企业</span>
        </div>
        <div class="detail-content">
          <div class="summary-info">
            <span>风险指标预警总量0单,环比0.0%;涉及客户量0,环比0.0%</span>
            <div class="search-section">
              <el-input v-model="applicationId" placeholder="申请ID" size="small" style="width: 200px;" />
              <el-button size="small" type="primary">查询</el-button>
            </div>
          </div>
          <table class="detail-table">
            <thead>
              <tr>
                <th>差错原因</th>
                <th>风险等级</th>
                <th>项目唯一标识</th>
                <th>商机编码</th>
                <th>全网商机编码</th>
                <th>项目名称</th>
                <th>集团客户名称</th>
                <th>预估投入金额</th>
                <th>地市名称</th>
                <th>利润率</th>
                <th>IT利润率</th>
                <th>企业成立日期</th>
                <th>注册地市</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="13" class="no-data">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <div class="table-footer">
            <div class="action-buttons">
              <el-button size="small">展现定义</el-button>
              <el-button size="small">口径&知识查看</el-button>
              <el-button size="small">导出</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import HealthTrendChart from '@/components/charts/HealthTrendChart.vue'
import CityScoreChart from '@/components/charts/CityScoreChart.vue'
import CityRiskAnalysisChart from '@/components/charts/CityRiskAnalysisChart.vue'

// 定义props接收路由参数
const props = defineProps({
  riskPointName: {
    type: String,
    default: '客户履约能力预警'
  }
})

const router = useRouter()

// 响应式数据
const timeMode = ref('month')
const selectedDate = ref('2025-01')
const selectedCity = ref('all')
const cityAnalysisType = ref('score')
const currentPage = ref(1)
const currentPage2 = ref(1)
const pageSize = ref(10)
const total = ref(25)
const total2 = ref(15)
const applicationId = ref('')

// 生成随机数据
const generateRandomRiskData = () => {
  const errorReasons = ['上游客户欠费', '客户信用评级低', '合同履约异常', '资金周转困难', '经营状况恶化']
  const riskLevels = ['high', 'medium', 'low']
  const riskLevelTexts = ['高风险', '中风险', '低风险']
  const cities = ['福州', '厦门', '泉州', '漳州', '莆田', '三明', '南平', '龙岩', '宁德']
  const customerNames = ['福建网龙网络科技有限公司', '福建星网锐捷通讯股份有限公司', '福建新大陆科技集团有限公司', '福建福光股份有限公司', '福建天马科技集团股份有限公司', '福建三钢闽光股份有限公司', '福建水泥股份有限公司', '福建高速股份有限公司', '福建广电网络集团股份有限公司', '福建海峡银行股份有限公司', '福建兴业银行股份有限公司', '福建恒安集团有限公司', '福建七匹狼实业股份有限公司', '福建安踏体育用品有限公司', '福建特步国际控股有限公司', '福建361度国际有限公司', '福建匹克体育用品有限公司', '福建鸿星尔克体育用品有限公司', '福建贵人鸟股份有限公司', '福建德尔惠体育用品有限公司']
  const projectNames = ['大数据分析平台', '云计算基础设施', '物联网监控系统', '人工智能算法平台', '区块链技术应用', '5G网络优化项目', '数字化转型项目', '智慧城市解决方案', '企业级SaaS平台', '边缘计算部署']

  return Array.from({ length: 25 }, (_, index) => ({
    errorReason: errorReasons[Math.floor(Math.random() * errorReasons.length)],
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    riskLevelText: riskLevelTexts[Math.floor(Math.random() * riskLevelTexts.length)],
    projectId: `PRJ${String(index + 1).padStart(6, '0')}`,
    opportunityCode: `OPP${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    fullNetworkCode: `FNC${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
    customerCode: `CUST${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    cityName: cities[Math.floor(Math.random() * cities.length)],
    arrearsAmount: `${(Math.random() * 1000 + 100).toFixed(0)}万`
  }))
}

const generateRandomMobileCloudData = () => {
  const errorReasons = ['黄色预警:上游客户为异地客户', '红色预警:上游客户信用评级低', '橙色预警:上游客户经营异常']
  const riskLevels = ['high', 'medium', 'low']
  const riskLevelTexts = ['高风险', '中风险', '低风险']
  const cities = ['福州', '厦门', '泉州', '漳州', '莆田', '三明', '南平', '龙岩', '宁德']
  const customerNames = ['福建网龙网络科技有限公司', '福建星网锐捷通讯股份有限公司', '福建新大陆科技集团有限公司', '福建福光股份有限公司', '福建天马科技集团股份有限公司', '福建三钢闽光股份有限公司', '福建水泥股份有限公司', '福建高速股份有限公司', '福建广电网络集团股份有限公司', '福建海峡银行股份有限公司', '福建兴业银行股份有限公司', '福建恒安集团有限公司', '福建七匹狼实业股份有限公司', '福建安踏体育用品有限公司', '福建特步国际控股有限公司', '福建361度国际有限公司', '福建匹克体育用品有限公司', '福建鸿星尔克体育用品有限公司', '福建贵人鸟股份有限公司', '福建德尔惠体育用品有限公司']
  const partnerNames = ['华为技术有限公司', '腾讯科技有限公司', '阿里巴巴集团', '百度在线网络技术有限公司', '字节跳动科技有限公司', '美团点评集团', '滴滴出行科技有限公司', '京东集团', '网易公司', '小米集团']
  const projectNames = ['移动云平台建设', '大数据分析系统', '物联网监控平台', '人工智能算法优化', '区块链技术应用', '5G网络部署', '数字化转型项目', '智慧城市解决方案', '企业级云服务', '边缘计算平台']

  return Array.from({ length: 15 }, (_, index) => ({
    errorReason: errorReasons[Math.floor(Math.random() * errorReasons.length)],
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    riskLevelText: riskLevelTexts[Math.floor(Math.random() * riskLevelTexts.length)],
    projectId: `PRJ${String(index + 1).padStart(6, '0')}`,
    opportunityCode: `OPP${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    fullNetworkCode: `FNC${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
    projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    partnerName: partnerNames[Math.floor(Math.random() * partnerNames.length)],
    estimatedAmount: (Math.random() * 50000000 + 1000000).toFixed(2),
    cityName: cities[Math.floor(Math.random() * cities.length)],
    profitMargin: (Math.random() * 30 + 5).toFixed(2),
    itProfitMargin: (Math.random() * 25 + 8).toFixed(2),
    establishmentDate: `${Math.floor(Math.random() * 20) + 2000}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    registeredCity: cities[Math.floor(Math.random() * cities.length)],
    registeredCapital: `${(Math.random() * 1000 + 100).toFixed(0)}万`,
    employeeCount: Math.floor(Math.random() * 500 + 10)
  }))
}

// 数据
const riskDetailData = reactive(generateRandomRiskData())
const mobileCloudData = reactive(generateRandomMobileCloudData())

// 方法
const goToHome = () => {
  router.push('/')
}

const goToNonICTProjects = () => {
  router.push('/non-ict-projects')
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handlePageChange2 = (page) => {
  currentPage2.value = page
}
</script>

<style scoped>
.customer-performance-warning {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 0;
}

/* 顶部导航栏 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left .nav-path {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.nav-link {
  color: #409eff;
  cursor: pointer;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-right {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: nowrap;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  white-space: nowrap;
}

.control-label {
  font-size: 14px;
  color: #666;
}

/* 主要内容区域 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  align-items: stretch;
}

/* 左侧区域 */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
}

/* KPI卡片 */
.kpi-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.kpi-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

.kpi-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.kpi-title {
  font-size: 14px;
  color: #666;
}

.kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  margin: 8px 0;
}

.kpi-value.health-status {
  font-size: 16px;
  font-weight: 600;
  color: #67c23a;
  min-height: 40px;
  align-items: center;
}

.kpi-trend {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: auto;
}

.trend-up {
  color: #67c23a;
  background: rgba(103, 194, 58, 0.1);
}

.trend-down {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.1);
}

.kpi-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.status-icon.excellent {
  background: #67c23a;
}

.status-text {
  font-size: 16px;
  font-weight: 600;
  color: #67c23a;
}



/* 图表卡片 */
.chart-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.card-tabs {
  display: flex;
  align-items: center;
}

.chart-container {
  height: 300px;
  padding: 20px;
  flex: 1;
  min-height: 0;
}

/* 右侧区域 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
}

/* 计算表格 */
.calculation-table {
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.table th {
  background: #fafafa;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.table td {
  font-size: 13px;
  color: #666;
}

/* 风险点指标详情 */
.risk-details-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.risk-detail-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.detail-content {
  padding: 20px;
}

.summary-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.search-section {
  display: flex;
  gap: 8px;
  align-items: center;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.detail-table th,
.detail-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
}

.detail-table th {
  background: #fafafa;
  font-weight: 600;
  color: #333;
}

.detail-table td {
  color: #666;
}

.no-data {
  text-align: center;
  color: #999;
  font-style: italic;
}

.risk-level {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.risk-level.high {
  background: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

.risk-level.medium {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.risk-level.low {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
</style> 