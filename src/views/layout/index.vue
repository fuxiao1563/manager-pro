<template>
  <el-container class="container">
    <!-- 左侧菜单 -->
    <div class="slider" :class="{ fold: layoutStore.isCollapse }">
      <Slider></Slider>
    </div>
    <el-container class="inner">
      <!-- 顶部导航 -->
      <el-header class="data_tabbar" :class="{ fold: layoutStore.isCollapse }">
        <Tabbar />
      </el-header>
      <!-- 内容展示区域 -->
      <el-main class="main" :class="{ fold: layoutStore.isCollapse }">
        <Main></Main>
        <el-footer class="footer">
          <el-link
            type="primary"
            href="https://github.com/fuxiao1563/manager-pro"
            target="_blank"
          >
            Copyright MIT © 2025 manager
          </el-link>
        </el-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Slider from './slider/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: $layout-container-background;

  .slider {
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

  .inner {
    .data_tabbar {
      position: fixed;
      width: calc(100% - $layout-menu-width - $layout-space);
      height: $layout-tabbar-height;
      background: $layout-container-item-background;
      box-shadow: $layout-container-item-boxShadow;
      top: 0;
      left: $layout-menu-width + $layout-space;
      transition: $layout-transition;
      z-index: 100;

      &.fold {
        width: calc(100% - $layout-menu-min-width - $layout-space);
        left: $layout-menu-min-width + $layout-space;
      }
    }

    .main {
      width: calc(100% - $layout-menu-width - $layout-space);
      height: calc(100% - $layout-tabbar-height - $layout-space);
      position: absolute;
      top: $layout-tabbar-height + $layout-space;
      left: $layout-menu-width + $layout-space;
      transition: $layout-transition;

      &.fold {
        width: calc(100% - $layout-menu-min-width - $layout-space);
        left: $layout-menu-min-width + $layout-space;
      }

      .footer {
        padding-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>
