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
          <el-button type="danger" plain @click="deleteUserInfoList">
            批量删除
          </el-button>
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
        <template #ctrl="{ row }">
          <el-button type="primary" size="small" plain @click="handledrawer">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="deleteUserInfo(row._id)"
          >
            删除
          </el-button>
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
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <h4>新增 & 编辑用户</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="userInfo" label-width="auto" status-icon>
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <!-- 性别  -->
          <el-form-item label="性别" prop="gender">
            <el-segmented v-model="userInfo.gender" :options="genderOptions" />
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" prop="phone" required>
            <el-input v-model="userInfo.phone" placeholder="请输入手机号码" />
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import { ref, onMounted, nextTick, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { DrawerProps, TableInstance } from 'element-plus'
import type { UserInfo } from '@/api/user/type'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// 用户信息列表
let userInfo = reactive<UserInfo>({ ...userStore.userInfo })
// 获取表单ref
const formRef = ref()
// 性别选项
const genderOptions = ['男', '女', '未知']
// 抽屉开关
const drawer = ref(false)
const handledrawer = () => {
  drawer.value = !drawer.value
}
// 抽屉参数
const direction = ref<DrawerProps['direction']>('rtl')
// 抽屉取消按钮
function cancelClick() {
  drawer.value = false
}
// 抽屉确认按钮
const confirmClick = async () => {
  try {
    await userStore.addUserInfo(userInfo)
    nextTick(() => {
      ElMessage.success({ message: '添加用户成功' })
    })
  } catch (error) {
    ElMessage.error({ message: '添加用户失败' })
  }
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
    const result = await userStore.getUserInfoList(formList)
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
// 删除按钮
const deleteUserInfo = async (_id: string) => {
  try {
    await userStore.deleteUserInfo(_id)
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
    await userStore.deleteUserInfoList(ids)
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
