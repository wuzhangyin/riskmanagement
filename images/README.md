# 图片资源目录

## 目录说明

这个目录用于存放项目的静态图片资源，包括：

- 地图图片
- 图标文件
- 背景图片
- 其他静态图片资源

## 使用方式

### 在Vue组件中引用

```vue
<template>
  <img src="/images/guangdong-map.png" alt="广东省地图" />
</template>
```

### 在CSS中引用

```css
.background {
  background-image: url('/images/background.jpg');
}
```

## 文件命名规范

- 使用小写字母和连字符
- 文件名要有描述性
- 例如：`guangdong-map.png`, `risk-icon.svg`, `dashboard-bg.jpg`

## 支持的格式

- PNG - 适用于图标和需要透明背景的图片
- JPG/JPEG - 适用于照片和复杂图片
- SVG - 适用于图标和矢量图形
- WebP - 适用于需要更好压缩的图片

## 注意事项

- 图片文件应该进行适当压缩以优化加载速度
- 大图片建议使用懒加载
- SVG文件可以直接内联到组件中使用 