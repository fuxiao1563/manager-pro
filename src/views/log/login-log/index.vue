<template>
  <el-card>
    <template #header>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <span>登录日志</span>
      </div>
    </template>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 16px"
    >
      <div>
        <el-input
          v-model="loginLogStore.searchParams"
          placeholder="输入用户名或ID进行搜索"
          style="width: 240px; padding-right: 15px"
        ></el-input>
        <el-button type="default" @click="handleResetSearch">重置</el-button>
        <el-button type="primary" @click="handleSearchLog">搜索</el-button>
      </div>
      <el-button type="danger" @click="handleClearLog">清空登录日志</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="loginLogStore.logs"
      stripe
      border
      row-key="_id"
      @selection-change=""
      style="width: 100%"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!-- 登录用户 -->
      <el-table-column
        prop="username"
        label="登录用户"
        min-width="100"
        align="center"
      />
      <!-- 用户ID -->
      <el-table-column
        prop="userId"
        label="用户ID"
        min-width="120"
        align="center"
      />
      <!-- 联系方式 -->
      <el-table-column
        prop="phone"
        label="联系方式"
        min-width="120"
        align="center"
      />
      <!-- 邮箱 -->
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="180"
        align="center"
      />
      <!-- 登陆时间 -->
      <el-table-column
        prop="createdAt"
        label="登录时间"
        min-width="200"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import useLoginLogStore from '@/store/modules/log/login'
const loginLogStore = useLoginLogStore()
const { searchLog, clearLog } = loginLogStore
onMounted(() => {
  handleSearchLog()
})
// 获取 + 搜索登录日志的回调
const handleSearchLog = async () => {
  try {
    await searchLog()
    ElMessage.success({ message: '日志获取成功' })
  } catch (error: any) {
    ElMessage.error({ message: error.message || '日志获取失败' })
  }
}
// 重置按钮
const handleResetSearch = async () => {
  try {
    loginLogStore.searchParams = ''
    await searchLog()
    ElMessage.success({ message: '搜索重置成功' })
  } catch (error: any) {
      ElMessage.error({ message: error.message || '搜索重置失败' })
  }
}
// 清空登录日志的按钮
const handleClearLog = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要清空所有登录日志吗？此操作不可恢复！',
      '清空确认',
      {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
    )
    await clearLog()
    await searchLog()
    ElMessage.success({ message: '日志清空成功' })
  } catch (error: any) {
    ElMessage.error({ message: error.message || '日志清空失败' })
  }
}
</script>

<style scoped lang="scss"></style>
