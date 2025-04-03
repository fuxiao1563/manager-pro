<template>
  <el-button icon="Refresh" size="small" circle @click="handleRefresh" />
  <el-button icon="FullScreen" size="small" circle @click="handleFullScreen" />
  <el-dropdown class="tabbar_admin">
    <span class="el-dropdown-link">Dropdown List</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon>
            <User />
          </el-icon>
          <span>用户中心</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
// 刷新页面按钮
const handleRefresh = () => {
  layoutStore.refresh = !layoutStore.refresh
}
// 全屏按钮
const handleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
</script>

<style scoped lang="scss">
.tabbar_admin {
  margin-left: 12px;
}
</style>
