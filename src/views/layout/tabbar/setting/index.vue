<template>
  <el-button type="danger" size="small" @click="">主题??</el-button>
  <el-button type="danger" size="small" @click="">语言??</el-button>
  <!-- 全部公告 -->
  <el-badge :is-dot="layoutStore.isDot" class="item" style="margin: 0 12px">
    <el-button type="primary" size="small" plain @click="handleAllBoard()">
      <el-icon>
        <Message />
      </el-icon>
    </el-button>
  </el-badge>
  <el-button icon="Refresh" size="small" circle @click="handleRefresh" />
  <el-button icon="FullScreen" size="small" circle @click="handleFullScreen" />
  <el-dropdown class="tabbar_admin">
    <template #default>
      <el-avatar :size="30">
        <img :src="layoutStore.avatar" />
      </el-avatar>
    </template>
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
  <!-- 全部公告对话框 -->
  <AllBoard v-if="isAllBoard" v-model="isAllBoard" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
import { useRouter } from 'vue-router'
const $router = useRouter()
import useUserStore from '@/store/modules/auth'
const userStore = useUserStore()
onMounted(() => {
  layoutStore.getAvatar()
  layoutStore.getDotCount()
})
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
    await userStore.logout()
    $router.push('/user/login')
    ElMessage.success({ message: '退出登录成功' })
  } catch (error:any) {
    ElMessage.error({ message: error.message || '退出登录失败' })
  }
}
// 个人中心按钮的回调
const toForward = () => {
  $router.push('/userCenter')
}
// 全部公告按钮的回调
const isAllBoard = ref(false)
const handleAllBoard = () => {
  isAllBoard.value = true
}
</script>

<style scoped lang="scss">
.tabbar_admin {
  margin-left: 12px;
}
</style>
