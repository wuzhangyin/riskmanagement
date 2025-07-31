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
        return `${data.name}<br/>预警量: ${(data.value * 100).toFixed(1)}%`
      }
    },
    legend: {
      data: ['预警量', '环比'],
      top: 10,
      right: 10,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['广州', '深圳', '东莞', '佛山', '惠州', '湛江', '中山', '茂名', '揭阳', '江门', '汕头', '珠海', '清远', '肇庆', '梅州', '河源', '阳江', '韶关', '潮州', '汕尾', '云浮'],
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
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 1,
        interval: 0.2,
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
      {
        type: 'value',
        min: 0,
        max: 1,
        interval: 0.2,
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#666',
          fontSize: 12,
          formatter: function(value) {
            return (value * 100).toFixed(0) + '%'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '预警量',
        type: 'bar',
        data: generateRandomData(),
        itemStyle: {
          color: '#409eff',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%'
      },
      {
        name: '环比',
        type: 'line',
        yAxisIndex: 1,
        data: generateRandomData(),
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#67c23a',
          type: 'dashed',
          width: 2
        },
        itemStyle: {
          color: '#67c23a'
        }
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