<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <!-- Logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 根据路由动态生成菜单 -->
        <el-menu :default-active="$route.path">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: $layout-container-background;

  .layout_slider {
    width: $layout-menu-width - $layout-space;
    height: 100%;
    background: $layout-menu-background;
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $layout-menu-width);
    height: $layout-tabbar-height;
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
    top: 0;
    left: $layout-menu-width;
  }

  .layout_main {
    width: calc(100% - $layout-menu-width);
    height: calc(100% - $layout-tabbar-height - $layout-space);
    background: $layout-container-item-background;
    box-shadow: $layout-container-item-boxShadow;
    position: absolute;
    top: $layout-tabbar-height + $layout-space;
    left: $layout-menu-width;
  }
}
</style>
