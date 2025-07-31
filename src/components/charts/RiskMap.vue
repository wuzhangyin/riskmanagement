<template>
  <div class="map-container">
    <div class="map-content">
      <!-- 广东省地图图片 -->
      <div class="map-wrapper">
        <img :src="`/images/map1.png?t=${timestamp}`" alt="福建省风险健康度地图" class="map-image" />
        
        <!-- 刷新按钮 -->
        <button @click="refreshImage" class="refresh-btn" title="刷新地图">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
        </button>
        
        <!-- 图例 - 放在地图图片内 -->
        <div class="map-legend">
          <div class="legend-items">
            <div class="legend-item">
              <div class="legend-dot excellent"></div>
              <span>优秀 (90-99)</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot good"></div>
              <span>良好 (80-89)</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot warning"></div>
              <span>警告 (70-79)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

// 添加时间戳，强制重新加载图片
const timestamp = ref(Date.now())

// 刷新图片方法
const refreshImage = () => {
  timestamp.value = Date.now()
}

// 城市数据
const cityData = computed(() => dashboardStore.mapData)
</script>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
  position: relative;
  border: none;
  border-radius: 0;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.map-wrapper {
  position: relative;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.map-image:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.refresh-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e4e7ed;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #606266;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.refresh-btn:hover {
  background: #409eff;
  color: white;
  border-color: #409eff;
  transform: scale(1.1);
}

.map-legend {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  backdrop-filter: blur(4px);
}

.legend-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 12px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.legend-dot.excellent {
  background: #52c41a;
}

.legend-dot.good {
  background: #1890ff;
}

.legend-dot.warning {
  background: #faad14;
}
</style> 