<template>
  <el-card class="userManage-card">
    <template #header>
      <div class="header">
        <div>
          <span>用户管理</span>
        </div>
        <div>
          <el-button type="primary" plain @click="handleAddUserInfo">
            <el-icon>
              <svg-icon name="add"></svg-icon>
            </el-icon>
            新增
          </el-button>
          <el-popconfirm
            width="180"
            confirm-button-text="是"
            cancel-button-text="否"
            title="你确定要删除吗？"
            @confirm="deleteUserInfoList"
          >
            <template #reference>
              <el-button type="danger" plain>
                <el-icon>
                  <svg-icon name="delete"></svg-icon>
                </el-icon>
                批量删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-button plain @click="refresh">
            <el-icon>
              <svg-icon name="refresh"></svg-icon>
            </el-icon>
            刷新
          </el-button>
          <el-popover trigger="click">
            <template #reference>
              <el-button plain>
                <el-icon>
                  <svg-icon name="setting"></svg-icon>
                </el-icon>
                列设置
              </el-button>
            </template>
            <el-checkbox
              v-for="(item, key) in checkboxOptions"
              :key="key"
              v-model="colSetting[key]"
              :label="item.label"
            />
          </el-popover>
        </div>
      </div>
    </template>
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
      <el-table-column
        v-if="colSetting.check"
        type="selection"
        width="40"
        align="center"
      />
      <!-- 序号 -->
      <el-table-column
        v-if="colSetting.index"
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <!-- 用户名 -->
      <el-table-column
        v-if="colSetting.username"
        prop="username"
        label="用户名"
        min-width="100"
        align="center"
      />
      <!-- 性别 -->
      <el-table-column
        v-if="colSetting.gender"
        prop="gender"
        label="性别"
        min-width="80"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="item.row.gender === '男'" type="primary" size="small">
            {{ item.row.gender }}
          </el-tag>
          <el-tag
            v-else-if="item.row.gender === '女'"
            type="danger"
            size="small"
          >
            {{ item.row.gender }}
          </el-tag>
          <el-tag v-else type="info" size="small">{{ item.row.gender }}</el-tag>
        </template>
      </el-table-column>
      <!-- 角色 -->
      <el-table-column
        v-if="colSetting.role"
        prop="role"
        label="角色"
        min-width="100"
        align="center"
      />
      <!-- 部门 -->
      <el-table-column
        v-if="colSetting.department"
        prop="department"
        label="部门"
        min-width="100"
        align="center"
      />
      <!-- 手机号 -->
      <el-table-column
        v-if="colSetting.phone"
        prop="phone"
        label="手机号"
        min-width="120"
        align="center"
      />
      <!-- 邮箱 -->
      <el-table-column
        v-if="colSetting.email"
        prop="email"
        label="邮箱"
        min-width="180"
        align="center"
      />
      <!-- 用户状态 -->
      <el-table-column
        v-if="colSetting.status"
        label="用户状态"
        min-width="100"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="item.row.status === '在线'" type="success" size="small">
            {{ item.row.status }}
          </el-tag>
          <el-tag
            v-else-if="item.row.status === '离线'"
            type="danger"
            size="small"
          >
            {{ item.row.status }}
          </el-tag>
          <el-tag v-else type="info" size="small">{{ item.row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        fixed="right"
        v-if="colSetting.ctrl"
        prop="_id"
        label="操作"
        min-width="150"
        align="center"
      >
        <template #="{ row }">
          <!-- 编辑 -->
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleUpdataUserInfo(row)"
          >
            编辑
          </el-button>
          <!-- 删除 -->
          <el-popconfirm
            width="180"
            confirm-button-text="是"
            cancel-button-text="否"
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
    <slot name="pagination"></slot>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type TableInstance } from 'element-plus'
import { ref, nextTick, toRefs } from 'vue'
import type {
  DetailUserInfoResponseData,
  SubDetailUserInfo,
} from '@/api/userManage/type'
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
const { userInfoList } = toRefs(userManage)
// 表格ref
const flag = ref(true)
// 多选框ref
const multipleTableRef = ref<TableInstance>()
// 全选状态
const multipleSelection = ref<DetailUserInfoResponseData[]>([])
const handleSelectionChange = (val: DetailUserInfoResponseData[]) => {
  multipleSelection.value = val
}
const props = defineProps<{
  colSetting: any
  getUserInfoList: () => void
}>()
// 新增用户按钮
const handleAddUserInfo = () => {
  userManage.drawerSwitch = true
  userManage.drawerTitle = '新增用户'
  Object.assign(userManage.userInfo, {
    username: '',
    role: '',
    avatar: '',
    status: '',
    phone: '',
    email: '',
    gender: '',
  })
}
// 批量删除按钮
const deleteUserInfoList = async () => {
  const ids = multipleSelection.value.map((item: any) => ({ _id: item._id }))
  try {
    await userManage.deleteUserInfoList(ids as any)
    await props.getUserInfoList()
    ElMessage.success({ message: '删除成功' })
  } catch (error) {
    ElMessage.error({ message: '删除失败' })
  }
}
// 刷新按钮
const refresh = async () => {
  flag.value = false
  nextTick(async () => {
    flag.value = true
    await props.getUserInfoList()
    ElMessage.success({ message: '刷新成功' })
  })
}
// 列设置选项
const checkboxOptions = ref({
  check: { label: '勾选' },
  index: { label: '序号' },
  username: { label: '用户名' },
  gender: { label: '性别' },
  role: { label: '角色' },
  department: { label: '部门' },
  phone: { label: '手机号' },
  email: { label: '邮箱' },
  status: { label: '状态' },
  ctrl: { label: '操作' },
})
// 编辑用户按钮
const handleUpdataUserInfo = (row: SubDetailUserInfo) => {
  userManage.drawerTitle = '编辑用户'
  userManage.drawerSwitch = true
  Object.assign(userManage.userInfo, row)
}
// 删除的确认按钮
const deleteUserInfo = async (_id: string) => {
  try {
    await userManage.deleteUserInfo(_id)
    await props.getUserInfoList()
    ElMessage.success({ message: '删除成功' })
  } catch (error) {
    ElMessage.error({ message: '删除失败' })
  }
}
</script>

<style scoped lang="scss"></style>
