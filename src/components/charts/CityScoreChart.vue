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
  
  // 生成随机数据
  const generateRandomData = () => {
    return Array.from({ length: 21 }, () => Math.random() * 0.8 + 0.1)
  }
  
  // 地市得分数据
  const cityScoreData = [99.67, 99.5, 99.3, 99.2, 99.1, 99.0, 98.9, 98.8, 98.7, 98.6, 98.5, 98.4, 98.3, 98.2, 97.5, 97.2, 96.8, 96.5, 96.2, 95.8, 95.5]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e4e7ed',
      borderWidth: 1,
      textStyle: {
        color: '#333',
        fontSize: 12
      },
      formatter: function(params) {
        const data = params[0]
        return `${data.name}<br/>得分: ${data.value}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['广州', '惠州', '中山', '江门', '汕头', '珠海', '清远', '梅州', '河源', '阳江', '韶关', '潮州', '汕尾', '云浮', '深圳', '东莞', '佛山', '湛江', '茂名', '揭阳', '肇庆'],
      axisLine: {
        lineStyle: {
          color: '#e4e7ed'
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 10,
        interval: 0,
        rotate: 45
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 90,
      max: 100,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '地市得分',
        type: 'bar',
        data: cityScoreData,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#409eff'
              },
              {
                offset: 1,
                color: '#67c23a'
              }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%'
      }
    ]
  }
  
  chart.setOption(option)
}

onMounted(() => {
  initChart()
  
  window.addEventListener('resize', () => {
    if (chart) {
      chart.resize()
    }
  })
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style> 