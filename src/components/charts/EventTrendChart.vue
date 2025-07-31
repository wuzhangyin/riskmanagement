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
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e4e7ed',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      formatter: function(params) {
        return `${params[0].name}<br/>
                <span style="color: #409eff;">●</span> 事件数量: ${params[0].value}`
      }
    },
    grid: {
      top: 15,
      right: 15,
      bottom: 25,
      left: 35,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: store.eventTrendData.map(item => item.month),
      axisLabel: {
        fontSize: 10,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#e4e7ed'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        color: '#666'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: [{
      data: store.eventTrendData.map(item => item.value),
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        color: '#409eff',
        width: 3,
        shadowColor: 'rgba(64, 158, 255, 0.3)',
        shadowBlur: 10
      },
      itemStyle: {
        color: '#409eff',
        borderColor: '#fff',
        borderWidth: 2,
        shadowColor: 'rgba(64, 158, 255, 0.3)',
        shadowBlur: 5
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ]
        }
      }
    }]
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

watch(() => store.eventTrendData, () => {
  if (chart) {
    initChart()
  }
}, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 