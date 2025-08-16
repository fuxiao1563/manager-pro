<template>
  <!-- 搜索 -->
  <Search :getUser :opts />
  <!-- 管理表格 -->
  <DataTabel :getUser :colSetting>
    <!-- 分页器 -->
    <template #pagination>
      <Pagenation class="pagination" :getUser />
    </template>
  </DataTabel>
  <Drawer :getUser :opts />
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import DataTabel from './DataTable/index.vue'
import Pagenation from './Pagenation/index.vue'
import Drawer from './Drawer/index.vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
import { USER, COMPANY } from '@/shared/constants/options'
const opts = {
  ...USER,
  deptOpts: COMPANY.deptOpts,
}

// 初始化获取用户信息列表
onMounted(async () => {
  getUser()
})
// 获取用户信息列表
const getUser = async () => {
  const { searchParams } = userManage
  try {
    await userManage.searchUser(searchParams)
  } catch (error) {
    ElMessage.error({ message: '获取用户信息失败' })
  }
}
// 列设置数值
const colSetting = ref({
  check: true,
  index: true,
  username: true,
  gender: true,
  role: true,
  department: true,
  phone: true,
  email: true,
  status: true,
  ctrl: true,
})
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  width: 100%;
}

.userManage-card {
  margin-top: 15px;

  :deep(.header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
