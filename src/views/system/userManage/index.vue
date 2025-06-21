<template>
  <el-card>
    <!-- 搜索 -->
    <Search :getUserInfoList :opts />
  </el-card>
  <!-- 管理表格 -->
  <DataTabel :getUserInfoList :colSetting>
    <!-- 分页器 -->
    <template #pagination>
      <Pagenation class="pagination" :getUserInfoList />
    </template>
  </DataTabel>
  <Drawer :getUserInfoList :opts />
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import DataTabel from './DataTable/index.vue'
import Pagenation from './Pagenation/index.vue'
import Drawer from './Drawer/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import useUserManage from '@/store/modules/userManage'
import {
  genderOpts,
  roleOpts,
  getDepartmentOpts,
  statusOpts,
} from '@/constants/options'

const userManage = useUserManage()
// 所有选项
const opts = reactive({
  genderOpts,
  roleOpts,
  departmentOpts: [] as string[],
  statusOpts,
})

onMounted(async () => {
  try {
    const result = await getDepartmentOpts()
    opts.departmentOpts = result as string[]
  } catch (error) {
    ElMessage.error({ message: '获取部门信息失败' })
  }

  // 初始化获取用户信息列表
  getUserInfoList()
})
// 获取用户信息列表
const getUserInfoList = async () => {
  const { searchFrom } = userManage
  try {
    await userManage.searchUserInfo(searchFrom)
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
