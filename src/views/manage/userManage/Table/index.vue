<template>
  <el-table
    ref="multipleTableRef"
    :data="userInfoList"
    stripe
    border
    row-key="_id"
    @selection-change="handleSelectionChange"
    style="width: 100%"
  >
    <el-table-column type="selection" :selectable="selectable" width="40" />
    <el-table-column type="index" label="序号" width="60" align="center" />
    <el-table-column
      prop="username"
      label="用户名"
      min-width="100"
      align="center"
    />
    <el-table-column prop="gender" label="性别" width="60" align="center" />
    <el-table-column
      prop="pieName"
      label="昵称"
      min-width="60"
      align="center"
    />
    <el-table-column
      prop="phone"
      label="手机号"
      min-width="120"
      align="center"
    />
    <el-table-column prop="email" label="邮箱" min-width="180" align="center" />
    <el-table-column label="用户状态" width="100" align="center">
      <template #default="item">
        <el-tag
          v-if="item.row.state === '0'"
          type="success"
          size="small"
          @close=""
        >
          在线
        </el-tag>
        <el-tag v-else type="danger" size="small" @close="">离线</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="ctrl" label="操作" min-width="150" align="center">
      <el-button type="primary" size="small" plain @click="">编辑</el-button>
      <el-button type="danger" size="small" plain @click="">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { TableInstance } from 'element-plus'
import useManageStore from '@/store/modules/manage'
const manageStore = useManageStore()

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<userInfoListType[]>([])
let userInfoList = ref<userInfoListType[]>([])
// 表格数据
interface userInfoListType {
  id: number
  name: string
  gender: string
  pieName: string
  phone: string
  email: string
  state: string
}

onMounted(() => {
  manageStore.getUserInfoList()
  watch(
    () => manageStore.userInfoList,
    () => {
      userInfoList.value = manageStore.userInfoList
    },
  )
})
// 行内选择状态
const selectable = (row: userInfoListType) => ![1, 2].includes(row.id)
// 全选状态
const handleSelectionChange = (val: userInfoListType[]) => {
  multipleSelection.value = val
}
</script>

<style scoped lang="scss"></style>
