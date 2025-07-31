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
    { name: '南平市', value: 96, warnings: 167 },
    { name: '福州市', value: 92.3, warnings: 156 },
    { name: '龙岩市', value: 91, warnings: 95 },
    { name: '泉州市', value: 88, warnings: 178 },
    { name: '厦门市', value: 86, warnings: 198 },
    { name: '宁德市', value: 78, warnings: 123 },
    { name: '莆田市', value: 77, warnings: 145 },
    { name: '三明市', value: 71, warnings: 134 }
  ])

  const cityRankingData = ref([
    { rank: 1, city: '南平市', health: '96', warnings: '167' },
    { rank: 2, city: '福州市', health: '92.3', warnings: '156' },
    { rank: 3, city: '龙岩市', health: '91', warnings: '95' },
    { rank: 4, city: '泉州市', health: '88', warnings: '178' },
    { rank: 5, city: '厦门市', health: '86', warnings: '198' },
    { rank: 6, city: '宁德市', health: '78', warnings: '123' },
    { rank: 7, city: '莆田市', health: '77', warnings: '145' },
    { rank: 8, city: '三明市', health: '71', warnings: '134' }
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