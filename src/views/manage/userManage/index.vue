<template>
  <el-card>
    <!-- 搜索 -->
    <Search />
  </el-card>
  <el-card class="manage-card">
    <template #header>
      <div class="header">
        <div>
          <span>用户管理</span>
        </div>
        <div>
          <el-button type="primary" plain @click="handledrawer">新增</el-button>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            title="你确定要删除吗？"
            @confirm="deleteUserInfoList"
          >
            <template #reference>
              <el-button type="danger" plain>批量删除</el-button>
            </template>
          </el-popconfirm>
          <el-button plain @click="refresh">刷新</el-button>
          <el-button plain>列设置</el-button>
        </div>
      </div>
    </template>
    <!-- 管理表格 -->
    <el-table
      v-if="flag"
      ref="multipleTableRef"
      :data="userInfoList"
      stripe
      border
      row-key="_id"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- 选择框 -->
      <el-table-column type="selection" width="40" />
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!-- 用户名 -->
      <el-table-column
        prop="username"
        label="用户名"
        min-width="100"
        align="center"
      />
      <!-- 性别 -->
      <el-table-column prop="gender" label="性别" width="60" align="center" />
      <!-- 手机号 -->
      <el-table-column
        prop="phone"
        label="手机号"
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
      <!-- 角色 -->
      <el-table-column
        prop="role"
        label="角色"
        min-width="100"
        align="center"
      />
      <!-- 用户状态 -->
      <el-table-column label="用户状态" width="100" align="center">
        <template #default="item">
          <el-tag
            v-if="item.row.status === 'online'"
            type="primary"
            size="small"
          >
            {{ item.row.status }}
          </el-tag>
          <el-tag
            v-else-if="item.row.status === 'outline'"
            type="danger"
            size="small"
          >
            {{ item.row.status }}
          </el-tag>
          <el-tag v-else type="info" size="small">{{ item.row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="_id" label="操作" min-width="150" align="center">
        <template #="{ row }">
          <!-- 编辑 -->
          <el-button type="primary" size="small" plain @click="handledrawer">
            编辑
          </el-button>
          <!-- 删除 -->
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            title="你确定要删除吗？"
            @confirm="deleteUserInfo(row._id)"
          >
            <template #reference>
              <el-button type="danger" size="small" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="pagination"
      :page-sizes="[5, 10, 15, 20]"
      :pager-count="7"
      layout="total, prev, pager, next, sizes, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 抽屉 -->
  <Drawer />
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import Drawer from './Drawer/index.vue'
import { ref, onMounted, nextTick, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TableInstance } from 'element-plus'
import type { UserInfo } from '@/api/user/type'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
// 抽屉开关
const handledrawer = () => {
  userManage.drawerSwitch = !userManage.drawerSwitch
}
const multipleTableRef = ref<TableInstance>()
let userInfoList = ref<UserInfo>()
// 数据总量
const total = ref(0)
// 获取用户信息列表的请求数据
const formList = reactive({
  skip: 0,
  limit: 5,
})
// 获取用户信息列表
const getUserInfoList = async (formList: any) => {
  try {
    const result = await userManage.getUserInfoList(formList)
    userInfoList.value = result[0]
    total.value = result[1]
    ElMessage.success({ message: '获取用户信息成功' })
  } catch (error) {
    ElMessage.error({ message: '获取用户信息失败' })
  }
}
// 初始化获取用户信息列表
onMounted(() => {
  getUserInfoList(formList)
})
// 全选状态
const multipleSelection = ref<UserInfo[]>([])
const handleSelectionChange = (val: UserInfo[]) => {
  multipleSelection.value = val
}
// 编辑按钮
// 删除的确认按钮
const deleteUserInfo = async (_id: string) => {
  try {
    await userManage.deleteUserInfo(_id)
    getUserInfoList(formList)
    nextTick(() => {
      ElMessage.success({ message: '删除成功' })
    })
  } catch (error) {
    ElMessage.error({ message: '删除失败' })
  }
}
// 批量删除按钮
const deleteUserInfoList = async () => {
  const ids = multipleSelection.value.map((item) => ({ _id: item._id }))
  try {
    await userManage.deleteUserInfoList(ids)
    await getUserInfoList(formList)
    nextTick(() => {
      ElMessage.success({ message: '删除成功' })
    })
  } catch (error) {
    ElMessage.error({ message: '删除失败' })
  }
}
// 刷新按钮
const flag = ref(true)
const refresh = () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
    getUserInfoList(formList)
    ElMessage.success({ message: '刷新成功' })
  })
}

// 当前展示数据
const handleSizeChange = (val: number) => {
  formList.limit = val
  getUserInfoList(formList)
}
// 当前页
const handleCurrentChange = (val: number) => {
  formList.skip = (val - 1) * formList.limit
  getUserInfoList(formList)
}
</script>

<style scoped lang="scss">
.manage-card {
  margin-top: 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
