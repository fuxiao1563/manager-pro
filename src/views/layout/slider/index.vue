<template>
  <!-- Logo -->
  <Logo class="logo"></Logo>
  <!-- 展示菜单 -->
  <!-- 滚动组件 -->
  <el-scrollbar class="scrollbar">
    <!-- 根据路由动态生成菜单 -->
    <el-menu
      :default-active="$route.path"
      :collapse="layoutStore.isCollapse"
      unique-opened
    >
      <Menu :menuList="userStore.menuRoutes"></Menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
}
</style>
