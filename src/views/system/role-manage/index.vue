<template>
  <el-card>
    <!-- 搜索 -->
    <Search :searchRole :opts="ROLE.statusOpts" />
  </el-card>
  <!-- 管理表格 -->
  <DataTabel :searchRole>
    <!-- 分页器 -->
    <template #pagination>
      <Pagenation class="pagination" :searchRole />
    </template>
  </DataTabel>
  <Drawer :searchRole :opts="ROLE.statusOpts" />
</template>

<script setup lang="ts">
import Search from './search/index.vue'
import DataTabel from './datatable/index.vue'
import Pagenation from './pagenation/index.vue'
import Drawer from './drawer/index.vue'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { ROLE } from '@/shared/constants/options'
import useRoleStore from '@/store/modules/system/role-manage'
const roleManage = useRoleStore()
// 初始化获取用户信息列表
onMounted(() => {
  searchRole()
})
// 获取用户信息列表
const searchRole = async () => {
  const { searchParams, searchRole } = roleManage
  try {
    await searchRole(searchParams)
    ElMessage.success({ message: '获取角色信息成功' })
  } catch (error: any) {
    ElMessage.error({ message: error.message || '获取角色信息失败' })
  }
}
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
