<template>
  <!-- 顶部左侧图标 -->
  <el-icon class="tabbar_icon">
    <component
      :is="layoutStore.isCollapse ? 'Fold' : 'Expand'"
      @click="handleCollapse"
    ></component>
  </el-icon>

  <el-breadcrumb class="tabbar_breadcrumb" :separator-icon="ArrowRight">
    <!-- 动态展示路由图标与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="{ path: item.path }"
    >
      <el-icon class="tabbar_breadcrumb_icon">
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon"></svg-icon>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
// 切换菜单栏
const handleCollapse = () => {
  layoutStore.isCollapse = !layoutStore.isCollapse
  layoutStore.isCollapse_title = !layoutStore.isCollapse_title
}
</script>

<style scoped lang="scss">
.tabbar_breadcrumb {
  margin-left: 20px;

  .tabbar_breadcrumb_icon {
    margin-right: 5px;
  }
}
</style>
