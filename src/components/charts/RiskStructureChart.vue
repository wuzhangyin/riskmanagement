<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import * as echarts from 'echarts'

// 定义props
const props = defineProps({
  projectType: {
    type: String,
    default: 'ict'
  }
})

const store = useDashboardStore()
const chartRef = ref(null)
let chart = null

// 计算图表数据
const chartData = computed(() => {
  if (props.projectType === 'ict') {
    // ICT项目数据：售前、售中、售后
    return [
      { name: '售前', value: 156, color: '#409eff' },
      { name: '售中', value: 89, color: '#67c23a' },
      { name: '售后', value: 234, color: '#e6a23c' }
    ]
  } else {
    // 非ICT项目数据：移动云、大数据、物联网、双线
    return [
      { name: '移动云', value: 98, color: '#409eff' },
      { name: '大数据', value: 67, color: '#67c23a' },
      { name: '物联网', value: 156, color: '#e6a23c' },
      { name: '双线', value: 123, color: '#f56c6c' }
    ]
  }
})

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: props.projectType === 'ict' ? 'ICT项目风险结构' : '非ICT项目风险结构',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c} ({d}%)',
          fontSize: 12,
          color: '#333'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 15,
          smooth: true,
          lineStyle: {
            color: '#666',
            width: 1
          }
        },
        data: chartData.value.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.color
          }
        }))
      }
    ]
  }
  
  chart.setOption(option, true)
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

// 监听projectType变化
watch(() => props.projectType, () => {
  if (chart) {
    initChart()
  }
}, { immediate: true })

// 监听chartData变化
watch(chartData, () => {
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