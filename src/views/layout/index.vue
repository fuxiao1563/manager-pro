<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutStore.isCollapse }">
      <Slider></Slider>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: layoutStore.isCollapse }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ fold: layoutStore.isCollapse }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from './slider/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: $layout-container-background;

  .layout_slider {
    position: fixed;
    width: $layout-menu-width;
    height: 100%;
    background: $layout-menu-background;
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
    left: 0;
    transition: $layout-transition;

    &.fold {
      width: $layout-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $layout-menu-width - $layout-space);
    height: $layout-tabbar-height;
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
    top: 0;
    left: $layout-menu-width + $layout-space;
    transition: $layout-transition;

    &.fold {
      width: calc(100% - $layout-menu-min-width - $layout-space);
      left: $layout-menu-min-width + $layout-space;
    }
  }

  .layout_main {
    width: calc(100% - $layout-menu-width - $layout-space);
    height: calc(100% - $layout-tabbar-height - $layout-space);
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
    position: absolute;
    top: $layout-tabbar-height + $layout-space;
    left: $layout-menu-width + $layout-space;
    transition: $layout-transition;

    &.fold {
      width: calc(100% - $layout-menu-min-width - $layout-space);
      left: $layout-menu-min-width + $layout-space;
    }
  }
}
</style>
