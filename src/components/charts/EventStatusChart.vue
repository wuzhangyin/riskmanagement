<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const eventStatusData = [
    { name: '已处理', value: 75 },
    { name: '待处理', value: 25 }
  ]
  
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e4e7ed',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      formatter: '{a} <br/>{b}: {c}%'
    },
    series: [
      {
        name: '事件状态',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}%',
          fontSize: 10,
          color: '#333',
          fontWeight: 500
        },
        labelLine: {
          show: true,
          length: 8,
          length2: 12,
          smooth: true,
          lineStyle: {
            color: '#666',
            width: 1
          }
        },
        data: eventStatusData.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.name === '已处理' ? '#67c23a' : '#f56c6c',
            borderColor: '#fff',
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 5
          }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            fontSize: 12,
            fontWeight: 'bold'
          }
        }
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