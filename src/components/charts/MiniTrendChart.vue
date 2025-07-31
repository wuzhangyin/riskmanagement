<template>
  <div ref="chartRef" class="mini-trend-chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: '#409eff'
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)
  
  const option = {
    grid: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      show: false,
      data: props.data.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: props.data.map(item => item.value),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: props.color,
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.color + '40'
              },
              {
                offset: 1,
                color: props.color + '10'
              }
            ]
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

watch(() => props.data, () => {
  if (chart) {
    initChart()
  }
}, { deep: true })

watch(() => props.color, () => {
  if (chart) {
    initChart()
  }
})
</script>

<style scoped>
.mini-trend-chart {
  width: 100%;
  height: 100%;
}
</style> 