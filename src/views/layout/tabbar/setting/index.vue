<template>
  <el-button icon="Refresh" size="small" circle @click="handleRefresh" />
  <el-button icon="FullScreen" size="small" circle @click="handleFullScreen" />
  <el-dropdown class="tabbar_admin">
    <span class="el-dropdown-link">{{ userStore.userInfo.username }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- 用户中心 -->
        <el-dropdown-item @click="toForward">
          <el-icon>
            <User />
          </el-icon>
          <span>用户中心</span>
        </el-dropdown-item>
        <!-- 退出登录 -->
        <el-dropdown-item @click="logout">
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
import { useRouter } from 'vue-router'
const $router = useRouter()
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// 刷新页面按钮的回调
const handleRefresh = () => {
  layoutStore.refresh = !layoutStore.refresh
}
// 全屏按钮的回调
const handleFullScreen = () => {
  if (document.fullscreenElement) return document.exitFullscreen()
  document.documentElement.requestFullscreen()
}
// 退出登录按钮的回调
const logout = async () => {
  try {
    await userStore.userLogout()
    $router.push('/user/login')
    ElMessage.success({ message: '退出登录成功' })
  } catch (error) {
    ElMessage.error({ message: '退出登录失败' })
  }
}
// 个人中心按钮的回调
const toForward = () => {
  $router.push('/userCenter')
}
</script>

<style scoped lang="scss">
.tabbar_admin {
  margin-left: 12px;
}
</style>
