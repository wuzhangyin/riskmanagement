import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // 状态
  const timeMode = ref('day')
  const searchKeyword = ref('')
  
  // 数据
  const healthTrendData = ref([
    { date: '202502', value: 85 },
    { date: '202503', value: 87 },
    { date: '202504', value: 89 },
    { date: '202506', value: 92 },
    { date: '202507', value: 90 },
    { date: '202508', value: 93 }
  ])

  const businessData = ref([
    { name: '客户信息', value: '156', trend: '+2.3%', trendClass: 'trend-up' },
    { name: '营销资源', value: '98', trend: '-1.5%', trendClass: 'trend-down' },
    { name: '财务管理', value: '187', trend: '-3.2%', trendClass: 'trend-down' },
    { name: '营收资金管理', value: '132', trend: '+1.8%', trendClass: 'trend-up' },
    { name: '信贷欠票与发票管理', value: '211', trend: '+4.5%', trendClass: 'trend-up' },
    { name: '资金支出管理', value: '176', trend: '-2.1%', trendClass: 'trend-down' }
  ])

  const mapData = ref([
    { name: '广州市', value: 92.3, warnings: 156 },
    { name: '深圳市', value: 91.7, warnings: 198 },
    { name: '珠海市', value: 89.2, warnings: 234 },
    { name: '汕头市', value: 87.8, warnings: 167 },
    { name: '佛山市', value: 85.4, warnings: 145 },
    { name: '韶关市', value: 83.1, warnings: 123 },
    { name: '湛江市', value: 81.6, warnings: 98 },
    { name: '肇庆市', value: 79.3, warnings: 87 },
    { name: '江门市', value: 88.5, warnings: 134 },
    { name: '茂名市', value: 86.2, warnings: 112 },
    { name: '惠州市', value: 84.7, warnings: 156 },
    { name: '梅州市', value: 82.9, warnings: 89 },
    { name: '汕尾市', value: 80.4, warnings: 67 },
    { name: '河源市', value: 78.6, warnings: 78 },
    { name: '阳江市', value: 85.1, warnings: 95 },
    { name: '清远市', value: 83.8, warnings: 103 },
    { name: '东莞市', value: 90.2, warnings: 178 },
    { name: '中山市', value: 88.9, warnings: 145 },
    { name: '潮州市', value: 81.3, warnings: 76 },
    { name: '揭阳市', value: 79.8, warnings: 82 },
    { name: '云浮市', value: 77.5, warnings: 54 }
  ])

  const cityRankingData = ref([
    { rank: 1, city: '广州市', health: '92.3', warnings: '156' },
    { rank: 2, city: '深圳市', health: '91.7', warnings: '198' },
    { rank: 3, city: '东莞市', health: '90.2', warnings: '178' },
    { rank: 4, city: '珠海市', health: '89.2', warnings: '234' },
    { rank: 5, city: '中山市', health: '88.9', warnings: '145' },
    { rank: 6, city: '江门市', health: '88.5', warnings: '134' },
    { rank: 7, city: '汕头市', health: '87.8', warnings: '167' },
    { rank: 8, city: '阳江市', health: '85.1', warnings: '95' }
  ])

  const productData = ref([
    { name: '和教育', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
    { name: '物联网', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
    { name: '云视讯', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
    { name: '短彩信', value: '156', trend: '-2.3%', trendClass: 'trend-down' },
    { name: '移动云', value: '156', trend: '-2.3%', trendClass: 'trend-down' }
  ])

  const riskStructureData = ref([
    { name: '售前', value: 252, percentage: 30.1 },
    { name: '售中', value: 586, percentage: 69.9 },
    { name: '售后', value: 0, percentage: 0.0 }
  ])

  const eventTrendData = ref([
    { month: '3月', value: 195 },
    { month: '4月', value: 240 },
    { month: '5月', value: 280 },
    { month: '6月', value: 320 },
    { month: '7月', value: 350 },
    { month: '8月', value: 380 }
  ])

  // 计算属性
  const overallHealth = computed(() => {
    return healthTrendData.value[healthTrendData.value.length - 1]?.value || 0
  })

  const totalWarnings = computed(() => {
    return mapData.value.reduce((sum, city) => sum + city.warnings, 0)
  })

  // 方法
  const setTimeMode = (mode) => {
    timeMode.value = mode
  }

  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword
  }

  return {
    // 状态
    timeMode,
    searchKeyword,
    
    // 数据
    healthTrendData,
    businessData,
    mapData,
    cityRankingData,
    productData,
    riskStructureData,
    eventTrendData,
    
    // 计算属性
    overallHealth,
    totalWarnings,
    
    // 方法
    setTimeMode,
    setSearchKeyword
  }
}) 