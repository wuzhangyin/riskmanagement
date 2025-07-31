# 组件图片资源目录

## 目录说明

这个目录用于存放Vue组件中使用的图片资源，这些图片会被Vite打包处理。

## 使用方式

### 在Vue组件中引用

```vue
<template>
  <img :src="mapImage" alt="广东省地图" />
</template>

<script setup>
import mapImage from '@/assets/images/guangdong-map.png'
</script>
```

### 在CSS中引用

```vue
<style scoped>
.background {
  background-image: url('@/assets/images/background.jpg');
}
</style>
```

## 与public/images的区别

- **public/images**: 静态资源，不会被Vite处理，直接复制到构建目录
- **src/assets/images**: 会被Vite处理，支持导入和优化

## 推荐使用场景

### 使用public/images的情况：
- 需要在HTML中直接引用的图片
- 动态路径的图片
- 第三方库需要的图片

### 使用src/assets/images的情况：
- 组件中使用的图片
- 需要Vite优化的图片
- 需要导入处理的图片

## 文件命名规范

- 使用小写字母和连字符
- 文件名要有描述性
- 例如：`guangdong-map.png`, `risk-icon.svg`, `dashboard-bg.jpg` 