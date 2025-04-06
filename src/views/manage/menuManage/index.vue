<template>
  <el-card>
    <template #header>
      <div>
        <span>菜单列表</span>
      </div>
    </template>
    <!-- table组件 row-key?????-->
    <el-table
      ref="multipleTableRef"
      lazy
      :load="load"
      stripe
      border
      :data="menuList"
      row-key="name"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="40" />
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="菜单类型" width="120" align="center">
        <template #default="item">
          <el-tag type="primary">
            {{ item.row.children ? '目录' : '菜单' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="meta.title"
        label="菜单名称"
        min-width="100"
        align="center"
      />
      <el-table-column prop="meta.icon" label="图标" width="60" align="center">
        <template #default="item">
          <svg-icon :name="item.row.meta.icon" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="路由名称"
        min-width="100"
        align="center"
      />
      <el-table-column prop="path" label="路由路径" align="center" />
      <el-table-column
        prop="meta.hidden"
        label="菜单状态"
        width="100"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="!item.row.meta.use" type="success">启用</el-tag>
          <el-tag v-else type="danger">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="meta.hidden"
        label="隐藏菜单"
        width="100"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="item.row.meta.hidden" type="danger">是</el-tag>
          <el-tag v-else type="primary">否</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="parentId" label="父级菜单ID" width="100"  align="center" />
            <el-table-column prop="sort" label="排序" width="60"  align="center" /> -->
      <el-table-column prop="ctrl" label="操作" min-width="200" align="center">
        <el-button type="success" size="small" plain @click="">新增</el-button>
        <el-button type="primary" size="small" plain @click="">编辑</el-button>
        <el-button type="danger" size="small" plain @click="">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableInstance } from 'element-plus'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const menuList = userStore.menuRoutes
// 表格数据
interface menuManagerItem {
  id: number
  type: string
  name: string
  icon: string
  route: string
  path: string
  state: boolean
  hidden: boolean
}
const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<menuManagerItem[]>([])
// 行内选择状态
const selectable = (row: menuManagerItem) => ![1, 2].includes(row.id)
// 全选状态
const handleSelectionChange = (val: menuManagerItem[]) => {
  multipleSelection.value = val
}
// 懒加载
const load = (
  menuList: menuManagerItem,
  treeNode: unknown,
  resolve: (data: menuManagerItem[]) => void,
) => {
  setTimeout(() => {
    resolve([menuList])
  }, 1000)
}
</script>

<style scoped lang="scss"></style>
