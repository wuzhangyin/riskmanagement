<template>
  <div class="non-ict-dashboard">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="nav-left">
        <span class="nav-path">
          <span class="nav-link" @click="goToHome">首页</span> / 非ICT项目
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
        <!-- 顶部KPI卡片 -->
        <div class="kpi-cards">
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">健康度</span>
            </div>
            <div class="kpi-value health-status">
              <div class="status-icon excellent"></div>
              <span class="status-text">优秀</span>
            </div>
            <div :class="['kpi-trend', parseFloat(healthTrend) >= 0 ? 'trend-up' : 'trend-down']">环比 {{ parseFloat(healthTrend) >= 0 ? '+' : '' }}{{ healthTrend }}%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">风险得分</span>
            </div>
            <div class="kpi-value">97.6</div>
            <div :class="['kpi-trend', riskScoreTrend >= 0 ? 'trend-up' : 'trend-down']">环比 {{ riskScoreTrend >= 0 ? '+' : '' }}{{ riskScoreTrend }}%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">预警量</span>
            </div>
            <div class="kpi-value">354</div>
            <div :class="['kpi-trend', warningTrend >= 0 ? 'trend-up' : 'trend-down']">环比 {{ warningTrend >= 0 ? '+' : '' }}{{ warningTrend }}%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">涉及客户量</span>
            </div>
            <div class="kpi-value">48</div>
            <div :class="['kpi-trend', customerTrend >= 0 ? 'trend-up' : 'trend-down']">环比 {{ customerTrend >= 0 ? '+' : '' }}{{ customerTrend }}%</div>
          </div>
          
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">涉及项目量</span>
            </div>
            <div class="kpi-value">55</div>
            <div :class="['kpi-trend', projectTrend >= 0 ? 'trend-up' : 'trend-down']">环比 {{ projectTrend >= 0 ? '+' : '' }}{{ projectTrend }}%</div>
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

        <!-- 综合分析 -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">综合分析</span>
          </div>
          <div class="analysis-content">
            <div class="analysis-section">
              <span class="section-title">得分情况</span>
              <div class="score-bars">
                <div class="score-item">
                  <span class="score-label">移动云</span>
                  <div class="score-bars-container">
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 89.6%; background: #ff6b6b;"></div>
                      <span class="bar-text">89.6 -6.5%</span>
                    </div>
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 96.7%; background: #4ecdc4;"></div>
                      <span class="bar-text">96.7 +0%</span>
                    </div>
                  </div>
                </div>
                
                <div class="score-item">
                  <span class="score-label">大数据</span>
                  <div class="score-bars-container">
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 97.8%; background: #ff6b6b;"></div>
                      <span class="bar-text">97.8 -1.1%</span>
                    </div>
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 100%; background: #4ecdc4;"></div>
                      <span class="bar-text">100.0 +0%</span>
                    </div>
                  </div>
                </div>
                
                <div class="score-item">
                  <span class="score-label">物联网</span>
                  <div class="score-bars-container">
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 92%; background: #ff6b6b;"></div>
                      <span class="bar-text">92.0 -6.2%</span>
                    </div>
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 100%; background: #4ecdc4;"></div>
                      <span class="bar-text">100.0 +2.4%</span>
                    </div>
                  </div>
                </div>
                
                <div class="score-item">
                  <span class="score-label">双线</span>
                  <div class="score-bars-container">
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 95%; background: #ff6b6b;"></div>
                      <span class="bar-text">95.0 -2.1%</span>
                    </div>
                    <div class="score-bar">
                      <div class="bar-fill" style="width: 98%; background: #4ecdc4;"></div>
                      <span class="bar-text">98.0 +0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
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

        <!-- 风险点综合情况 -->
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">风险点综合情况</span>
          </div>
          <div class="risk-table-container">
            <table class="risk-table">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>风险点</th>
                  <th>预警量</th>
                  <th>环比</th>
                  <th>得分</th>
                  <th>环比</th>
                </tr>
              </thead>
              <tbody>
                        <tr v-for="(item, index) in riskPoints" :key="index"
            :class="{ 'clickable-row': item.name.includes('客户履约能力预警') }"
            @click="item.name.includes('客户履约能力预警') ? goToCustomerPerformanceWarning(item.name) : null">
                  <td>{{ item.rank }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.warnings }}</td>
                  <td :class="item.warningTrend >= 0 ? 'trend-up' : 'trend-down'">
                    {{ item.warningTrend >= 0 ? '+' : '' }}{{ item.warningTrend }}%
                  </td>
                  <td>{{ item.score }}</td>
                  <td :class="item.scoreTrend >= 0 ? 'trend-up' : 'trend-down'">
                    {{ item.scoreTrend >= 0 ? '+' : '' }}{{ item.scoreTrend }}%
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next, jumper"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部标签页 -->
    <div class="bottom-tabs" style="margin: 0 20px 20px 20px;">
      <div class="tab-group">
        <el-radio-group v-model="selectedTab" size="small">
          <el-radio-button label="mobile-cloud">移动云</el-radio-button>
          <el-radio-button label="big-data">大数据</el-radio-button>
          <el-radio-button label="iot">物联网</el-radio-button>
          <el-radio-button label="dual-line">双线</el-radio-button>
          <el-radio-button label="sms">短彩</el-radio-button>
          <el-radio-button label="idc">IDC</el-radio-button>
        </el-radio-group>
      </div>
      <div class="legend">
        <div class="legend-item">
          <div class="legend-dot presales"></div>
          <span>售前</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot insales"></div>
          <span>售中</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot aftersales"></div>
          <span>售后</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import HealthTrendChart from '@/components/charts/HealthTrendChart.vue'
import CityScoreChart from '@/components/charts/CityScoreChart.vue'
import CityRiskAnalysisChart from '@/components/charts/CityRiskAnalysisChart.vue'

const router = useRouter()

// 响应式数据
const timeMode = ref('month')
const selectedDate = ref('2025-01')
const selectedCity = ref('all')
const cityAnalysisType = ref('score')
const selectedTab = ref('mobile-cloud')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(27)

// 生成随机环比数据
const generateRandomTrend = () => {
  return (Math.random() * 20 - 10).toFixed(1) // 生成-10到10之间的随机数
}

// KPI环比数据 - 使用固定值
const healthTrend = ref('9.5')
const riskScoreTrend = ref('-0.1')
const warningTrend = ref('7.8')
const customerTrend = ref('9.9')
const projectTrend = ref('-5.6')

// 风险点数据
const riskPoints = reactive([
  {
    rank: 1,
    name: '移动云-售前-客户履约能力预警',
    warnings: 114,
    warningTrend: '5.2',
    score: 81.0,
    scoreTrend: 1040.0
  },
  {
    rank: 2,
    name: '物联网-售前-客户履约能力预警',
    warnings: 72,
    warningTrend: '-2.1',
    score: 81.0,
    scoreTrend: 380.0
  },
  {
    rank: 3,
    name: '物联网-售前-上游客户欠费',
    warnings: 48,
    warningTrend: '3.8',
    score: 86.4,
    scoreTrend: 100.0
  },
  {
    rank: 4,
    name: '移动云-售前-整体利润率低',
    warnings: 36,
    warningTrend: '-1.5',
    score: 86.4,
    scoreTrend: 140.0
  },
  {
    rank: 5,
    name: '移动云-售前-上游客户欠费',
    warnings: 36,
    warningTrend: '4.2',
    score: 86.4,
    scoreTrend: 100.0
  },
  {
    rank: 6,
    name: '移动云-售中-交付实质不足',
    warnings: 18,
    warningTrend: '-3.7',
    score: 86.8,
    scoreTrend: 200.0
  },
  {
    rank: 7,
    name: '物联网-售前-整体利润率低',
    warnings: 12,
    warningTrend: '1.9',
    score: 92.4,
    scoreTrend: 100.0
  },
  {
    rank: 8,
    name: '大数据-售前-上游客户欠费',
    warnings: 6,
    warningTrend: '0.8',
    score: 94.4,
    scoreTrend: 100.0
  },
  {
    rank: 9,
    name: '移动云-售前-上游与下游存在关联关系',
    warnings: 6,
    warningTrend: '-0.5',
    score: 94.4,
    scoreTrend: 100.0
  },
  {
    rank: 10,
    name: '大数据-售前-上游与下游存在关联关系',
    warnings: 6,
    warningTrend: '2.3',
    score: 94.4,
    scoreTrend: 100.0
  }
])

// 方法
const handlePageChange = (page) => {
  currentPage.value = page
}

const goToHome = () => {
  router.push('/')
}

        const goToCustomerPerformanceWarning = (riskPointName) => {
          router.push(`/customer-performance-warning/${encodeURIComponent(riskPointName)}`)
        }
</script>

<style scoped>
.non-ict-dashboard {
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
  height: fit-content;
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
}

/* 综合分析 */
.analysis-content {
  padding: 20px;
  flex: 1;
}

.analysis-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: block;
}

.score-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.score-label {
  width: 60px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.score-bars-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.score-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 24px;
}

.bar-fill {
  height: 8px;
  border-radius: 4px;
  min-width: 20px;
  transition: width 0.3s ease;
}

.bar-text {
  font-size: 12px;
  color: #666;
  min-width: 80px;
}

/* 右侧区域 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
}

/* 风险点表格 */
.risk-table-container {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.risk-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  flex: 1;
}

.risk-table th,
.risk-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.risk-table th {
  background: #fafafa;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.risk-table td {
  font-size: 13px;
  color: #666;
}

.risk-table td:nth-child(2) {
  max-width: 200px;
  word-break: break-all;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: #f5f7fa;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

/* 底部标签页 */
.bottom-tabs {
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-group {
  display: flex;
  align-items: center;
}

.legend {
  display: flex;
  gap: 16px;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.presales {
  background: #409eff;
}

.legend-dot.insales {
  background: #67c23a;
}

.legend-dot.aftersales {
  background: #e6a23c;
}
</style> 