<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import * as echarts from 'echarts'

const store = useDashboardStore()
const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const businessTrendData = [
    { name: '客户信息', score: 85, trend: 2.3 },
    { name: '营销资源', score: 78, trend: -1.5 },
    { name: '财务管理', score: 92, trend: -3.2 },
    { name: '营收资金管理', score: 88, trend: 1.8 },
    { name: '信贷欠票与发票管理', score: 95, trend: 4.5 },
    { name: '资金支出管理', score: 82, trend: -2.1 }
  ]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: businessTrendData.map(item => item.name),
      axisLabel: {
        fontSize: 10,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10
      }
    },
    series: [
      {
        name: '健康度',
        type: 'bar',
        data: businessTrendData.map(item => ({
          value: item.score,
          itemStyle: {
            color: item.trend >= 0 ? '#67c23a' : '#f56c6c'
          }
        })),
        barWidth: '60%'
      }
    ]
  }
  
  chart.setOption(option)
}

const resizeChart = () => {
  if (chart) {
    chart.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', resizeChart)
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 