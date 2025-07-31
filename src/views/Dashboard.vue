<template>
  <div class="dashboard">
    <!-- 头部区域 -->
    <header class="dashboard-header">
      <div class="header-left">
        <div class="title-container">
          <img src="/images/china-mobile-logo.svg" alt="中国移动" class="mobile-logo" />
          <div class="separator"></div>
          <h1 class="platform-title">政企风控平台</h1>
        </div>
      </div>
      <div class="header-right">
        <div class="time-controls">
          <span class="label">时间周期:</span>
          <div class="radio-group">
            <label class="radio-item">
              <input 
                type="radio" 
                name="timeMode" 
                value="day" 
                :checked="store.timeMode === 'day'"
                @change="handleTimeModeChange('day')"
              >
              <span>今日</span>
            </label>
            <label class="radio-item">
              <input 
                type="radio" 
                name="timeMode" 
                value="week" 
                :checked="store.timeMode === 'week'"
                @change="handleTimeModeChange('week')"
              >
              <span>近7天</span>
            </label>
            <label class="radio-item">
              <input 
                type="radio" 
                name="timeMode" 
                value="month" 
                :checked="store.timeMode === 'month'"
                @change="handleTimeModeChange('month')"
              >
              <span>近30天</span>
            </label>
          </div>
          <div class="date-picker">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
            />
          </div>
        </div>
        <div class="user-info">
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="user-name">林婷婷</span>
          <el-dropdown>
            <el-icon class="dropdown-arrow"><ArrowDown /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="dashboard-main">
      <!-- KPI指标区域 -->
      <div class="kpi-section">
        <div class="kpi-card">
          <div class="kpi-title">总体健康度</div>
          <div class="kpi-value">93分</div>
          <div class="kpi-trend trend-up">环比+2.3%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">产品预警量</div>
          <div class="kpi-value">1,286</div>
          <div class="kpi-trend trend-down">环比-5.2%</div>
        </div>
        <div class="kpi-card clickable" @click="goToNonICTProjects">
          <div class="kpi-title">项目预警量</div>
          <div class="kpi-value">892</div>
          <div class="kpi-trend trend-stable">环比0%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">业务预警量</div>
          <div class="kpi-value">643</div>
          <div class="kpi-trend trend-up">环比+1.8%</div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 第一行：看业务、全省情况、看项目 -->
        <div class="content-row first-row">
          <!-- 看业务 -->
          <div class="card business-card">
            <div class="card-header">
              <div class="card-title-group">
                <span class="card-title">看业务</span>
              </div>
            </div>
            <div class="card-content">
              <!-- 整体情况区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">整体情况</span>
                </div>
                <div class="business-cards">
                  <div 
                    v-for="item in store.businessData" 
                    :key="item.name"
                    class="business-item"
                  >
                    <div class="business-name">{{ item.name }}</div>
                    <div class="business-value">{{ item.value }}</div>
                    <div :class="['business-trend', item.trendClass]">环比{{ item.trend }}</div>
                  </div>
                </div>
              </div>
              
              <!-- 业务趋势区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">业务趋势</span>
                </div>
                <div class="chart-container">
                  <BusinessTrendChart />
                </div>
              </div>
            </div>
          </div>

          <!-- 全省情况 -->
          <div class="card province-card">
            <div class="card-header">
              <div class="card-title-group">
                <span class="card-title">全省情况</span>
              </div>
            </div>
            <div class="card-content">
              <!-- 风险健康度地图区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">风险健康度地图</span>
                  <div class="dimension-tabs">
                    <el-radio-group v-model="mapDimension" size="small">
                      <el-radio-button label="product">产品领域</el-radio-button>
                      <el-radio-button label="business">业务领域</el-radio-button>
                      <el-radio-button label="ict">ICT项目</el-radio-button>
                      <el-radio-button label="non-ict">非ICT项目</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <div class="map-container">
                  <RiskMap />
                </div>
              </div>
              
              <!-- 地市风险均值排名区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">地市风险均值排名</span>
                </div>
                <div class="ranking-table">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>地市</th>
                        <th>健康度</th>
                        <th>预警量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in store.cityRankingData" :key="item.rank">
                        <td>{{ item.rank }}</td>
                        <td>{{ item.city }}</td>
                        <td>{{ item.health }}</td>
                        <td>{{ item.warnings }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- 看项目 -->
          <div class="card project-card">
            <div class="card-header">
              <div class="card-title-group">
                <span class="card-title">看项目</span>
              </div>
            </div>
            <div class="card-content">
              <!-- 整体情况区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">整体情况</span>
                </div>
                <div class="project-stats">
                  <!-- ICT项目 -->
                  <div class="project-section">
                    <div class="section-title-small">ICT项目</div>
                    <div class="stats-row">
                      <div class="stat-item">
                        <div class="stat-label">预警量</div>
                        <div class="stat-value">156</div>
                        <div class="stat-trend trend-up">环比+2.3%</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-label">涉及项目</div>
                        <div class="stat-value">89</div>
                        <div class="stat-trend trend-down">环比-1.5%</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-label">涉及客户</div>
                        <div class="stat-value">234</div>
                        <div class="stat-trend trend-up">环比+4.2%</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 非ICT项目 -->
                  <div class="project-section">
                    <div class="section-title-small">非ICT项目</div>
                    <div class="stats-row">
                      <div class="stat-item">
                        <div class="stat-label">预警量</div>
                        <div class="stat-value">98</div>
                        <div class="stat-trend trend-up">环比+1.8%</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-label">涉及项目</div>
                        <div class="stat-value">67</div>
                        <div class="stat-trend trend-down">环比-0.8%</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-label">涉及客户</div>
                        <div class="stat-value">156</div>
                        <div class="stat-trend trend-up">环比+2.7%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 项目风险结构区域 -->
              <div class="content-section">
                <div class="section-header">
                  <span class="section-title">项目风险结构</span>
                  <div class="project-risk-tabs">
                    <el-radio-group v-model="projectRiskType" size="small">
                      <el-radio-button label="ict">ICT项目</el-radio-button>
                      <el-radio-button label="non-ict">非ICT项目</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <div class="risk-structure">
                  <div class="chart-container">
                    <RiskStructureChart :project-type="projectRiskType" />
                  </div>
                  <div class="structure-tabs">
                    <!-- ICT项目标签页 -->
                    <div v-if="projectRiskType === 'ict'">
                      <el-radio-group v-model="ictRiskStage" size="small">
                        <el-radio-button label="pre-sale">售前</el-radio-button>
                        <el-radio-button label="in-sale">售中</el-radio-button>
                        <el-radio-button label="after-sale">售后</el-radio-button>
                      </el-radio-group>
                    </div>
                    <!-- 非ICT项目标签页 -->
                    <div v-if="projectRiskType === 'non-ict'">
                      <el-radio-group v-model="nonIctRiskType" size="small">
                        <el-radio-button label="mobile-cloud">移动云</el-radio-button>
                        <el-radio-button label="big-data">大数据</el-radio-button>
                        <el-radio-button label="iot">物联网</el-radio-button>
                        <el-radio-button label="dual-line">双线</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二行：看检查、看产品 -->
        <div class="content-row second-row">
          <!-- 看检查 -->
          <div class="card inspection-card">
            <div class="card-header">
              <div class="card-title-group">
                <span class="card-title">看检查</span>
                <span class="card-subtitle">检查事件</span>
              </div>
            </div>
            <div class="inspection-events">
              <div class="event-summary">
                <div class="event-total">
                  <div class="total-value">1,287</div>
                  <div class="total-trend trend-up">环比+5.2%</div>
                </div>
              </div>
              <div class="event-charts">
                <div class="chart-item">
                  <div class="chart-title">事件趋势</div>
                  <div class="chart-container">
                    <EventTrendChart />
                  </div>
                </div>
                <div class="chart-item">
                  <div class="chart-title">事件来源分布</div>
                  <div class="chart-container">
                    <EventSourceChart />
                  </div>
                </div>
                <div class="chart-item">
                  <div class="chart-title">事件状态分布</div>
                  <div class="chart-container">
                    <EventStatusChart />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 看产品 -->
          <div class="card product-card">
            <div class="card-header">
              <div class="card-title-group">
                <span class="card-title">看产品</span>
                <span class="card-subtitle">产品管理</span>
              </div>
            </div>
            <div class="product-cards">
              <div 
                v-for="item in store.productData" 
                :key="item.name"
                class="product-item"
              >
                <div class="product-name">{{ item.name }}</div>
                <div class="product-value">{{ item.value }}</div>
                <div :class="['product-trend', item.trendClass]">环比{{ item.trend }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { Search, ArrowDown, TrendCharts } from '@element-plus/icons-vue'
import BusinessTrendChart from '@/components/charts/BusinessTrendChart.vue'
import RiskMap from '@/components/charts/RiskMap.vue'
import RiskStructureChart from '@/components/charts/RiskStructureChart.vue'
import EventTrendChart from '@/components/charts/EventTrendChart.vue'
import EventSourceChart from '@/components/charts/EventSourceChart.vue'
import EventStatusChart from '@/components/charts/EventStatusChart.vue'

// 使用store和router
const store = useDashboardStore()
const router = useRouter()

// 响应式数据
const dateRange = ref([new Date(), new Date()])
const mapDimension = ref('product')
const projectType = ref('ict')
const riskStage = ref('pre-sale')
const projectRiskType = ref('ict')
const ictRiskStage = ref('pre-sale')
const nonIctRiskType = ref('mobile-cloud')

// 方法
const goToNonICTProjects = () => {
  router.push('/non-ict-projects')
}

const handleTimeModeChange = (mode) => {
  store.setTimeMode(mode)
  
  const today = new Date()
  let startDate, endDate
  
  switch (mode) {
    case 'day':
      startDate = today
      endDate = today
      break
    case 'week':
      startDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
      endDate = today
      break
    case 'month':
      startDate = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000)
      endDate = today
      break
  }
  
  dateRange.value = [startDate, endDate]
}
</script>

<style scoped>
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.dashboard-header {
  background: #1e3a8a;
  padding: 8px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.separator {
  width: 1px;
  height: 24px;
  background-color: #ffffff;
  opacity: 0.6;
}

.mobile-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin: -20px 0;
}

.platform-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.time-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.label {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.radio-group {
  display: flex;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.radio-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.radio-item input[type="radio"] {
  margin: 0;
}

.radio-item span {
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  width: 200px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-name {
  font-size: 12px;
  color: #ffffff;
}

.dropdown-arrow {
  color: #ffffff;
  font-size: 12px;
}

.dashboard-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.kpi-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
}

.kpi-card {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.kpi-card.clickable {
  cursor: pointer;
}

.kpi-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  border-color: #f56c6c;
}

.kpi-title {
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 8px;
}

.kpi-value {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 4px;
}

.kpi-trend {
  font-size: 14px;
  font-weight: 500;
}

.trend-up {
  color: #67c23a;
}

.trend-down {
  color: #f56c6c;
}

.trend-stable {
  color: #909399;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.second-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: 700px;
}

.business-card,
.province-card,
.project-card {
  height: 900px;
}

.inspection-card,
.product-card {
  height: 400px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
  flex-shrink: 0;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: #909399;
  font-weight: normal;
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
}

.content-section {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
  padding: 16px;
  flex: 1;
  min-height: 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;
  flex-shrink: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}





.business-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

.business-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
}

.business-item:last-child {
  border-bottom: none;
}

.business-name {
  font-weight: 500;
  color: #303133;
  flex: 1;
}

.business-value {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  text-align: right;
  min-width: 60px;
  margin: 0 16px;
}

.business-trend {
  font-size: 12px;
  font-weight: 500;
  text-align: right;
  min-width: 50px;
}

.map-container {
  flex: 1;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.project-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 12px;
}

.section-title-small {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.stats-row {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
}

.stat-label {
  font-size: 12px;
  color: #606266;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.stat-trend {
  font-size: 11px;
  font-weight: 500;
}

.chart-container {
  flex: 1;
  min-height: 0;
}

.ranking-table {
  flex: 1;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.table th,
.table td {
  padding: 4px 8px;
  text-align: left;
  border-bottom: 1px solid #e4e7ed;
}

.table th {
  background-color: #f5f7fa;
  font-weight: 500;
  color: #606266;
}

.risk-structure {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.structure-tabs {
  margin-top: 8px;
  flex-shrink: 0;
}

.inspection-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.event-summary {
  margin-bottom: 16px;
  flex-shrink: 0;
}

.event-total {
  display: flex;
  align-items: center;
  gap: 16px;
}

.total-value {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
}

.total-trend {
  font-size: 14px;
  font-weight: 500;
}

.event-charts {
  flex: 1;
  display: flex;
  gap: 16px;
  min-height: 0;
}

.chart-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-title {
  font-size: 12px;
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
  text-align: center;
}

.product-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
}

.product-item:last-child {
  border-bottom: none;
}

.product-name {
  font-weight: 500;
  color: #303133;
  flex: 1;
}

.product-value {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  text-align: right;
  min-width: 60px;
  margin: 0 16px;
}

.product-trend {
  font-size: 12px;
  font-weight: 500;
  text-align: right;
  min-width: 50px;
}

.dimension-tabs,
.project-risk-tabs {
  flex-shrink: 0;
}
</style> 