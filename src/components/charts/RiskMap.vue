<template>
  <div class="map-container">
    <div class="map-content">
      <!-- 广东省地图图片 -->
      <div class="map-wrapper">
        <img src="/images/map1.png" alt="广东省风险健康度地图" class="map-image" />
        
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