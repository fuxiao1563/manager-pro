<template>
  <el-card class="userManage-card">
    <template #header>
      <div class="header">
        <div>
          <span>角色管理</span>
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
      <!-- 角色名称 -->
      <el-table-column
        v-if="colSetting.role"
        prop="role"
        label="角色名称"
        min-width="100"
        align="center"
      />
      <!-- 角色描述 -->
      <el-table-column
        v-if="colSetting.role"
        prop="descripte"
        label="角色描述"
        min-width="100"
        align="center"
      />
      <!-- 角色状态 -->
      <el-table-column
        v-if="colSetting.status"
        label="角色状态"
        min-width="100"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="item.row.status === '启用'" type="success" size="small">
            {{ item.row.status }}
          </el-tag>
          <el-tag
            v-else-if="item.row.status === '禁用'"
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
import { ref, nextTick } from 'vue'
import type {
  DetailUserInfoResponseData,
  SubDetailUserInfo,
} from '@/api/modules/system/userManage/type'
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
// const { userInfoList } = toRefs(userManage)
let userInfoList = ref([
  {
    role: '管理员',
    descripte: '这是角色描述',
    status: '启用',
  },
  {
    role: '普通用户',
    descripte: '这是角色描述',
    status: '启用',
  },
  {
    role: '超级管理员',
    descripte: '这是角色描述',
    status: '启用',
  },
  {
    role: '究极管理员',
    descripte: '这是角色描述',
    status: '禁用',
  },
])
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
  // getUserInfoList: () => void
}>()
// 新增角色按钮
const handleAddUserInfo = () => {
  userManage.drawerSwitch = true
  userManage.drawerTitle = '新增角色'
  Object.assign(userManage.userInfo, {
    role: '',
    descripte: '',
    status: '',
  })
}
// 批量删除按钮
const deleteUserInfoList = async () => {
  // const ids = multipleSelection.value.map((item: any) => ({ _id: item._id }))
  try {
    // await userManage.deleteUserInfoList(ids as any)
    // await props.getUserInfoList()
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
    // await props.getUserInfoList()
    ElMessage.success({ message: '刷新成功' })
  })
}
// 列设置选项
const checkboxOptions = ref({
  check: { label: '勾选' },
  index: { label: '序号' },
  role: { label: '角色名称' },
  descript: { label: '角色描述' },
  status: { label: '角色状态' },
  ctrl: { label: '操作' },
})
// 编辑角色按钮
const handleUpdataUserInfo = (row: SubDetailUserInfo) => {
  userManage.drawerTitle = '编辑角色'
  userManage.drawerSwitch = true
  Object.assign(userManage.userInfo, row)
}
// 删除的确认按钮
const deleteUserInfo = async (_id: string) => {
  try {
    // await userManage.deleteUserInfo(_id)
    // await props.getUserInfoList()
    ElMessage.success({ message: '删除成功' })
  } catch (error) {
    ElMessage.error({ message: '删除失败' })
  }
}
</script>

<style scoped lang="scss"></style>
