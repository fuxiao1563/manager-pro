<template>
  <!-- 公告列表 -->
  <el-card>
    <template #header>
      <div
        class="header"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <span>公告管理</span>
        </div>
        <div>
          <el-button type="primary" @click="handleAllBoard()">
            全部公告
          </el-button>
          <el-button type="primary" plain @click="handlePublish()">
            <el-icon>
              <svg-icon name="add"></svg-icon>
            </el-icon>
            发布公告
          </el-button>
          <el-popconfirm
            width="180"
            confirm-button-text="是"
            cancel-button-text="否"
            title="你确定要删除吗？"
            @confirm="handleBatchDeleteBoard()"
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
          <el-button plain @click="handleRefresh()">
            <el-icon>
              <svg-icon name="refresh"></svg-icon>
            </el-icon>
            刷新
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      v-if="flag"
      ref="multipleTableRef"
      :data="boardStore.boards"
      stripe
      border
      row-key="_id"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- 选择框 -->
      <el-table-column fixed type="selection" width="40" />
      <!-- 序号 -->
      <el-table-column
        fixed
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <!-- 公告主题 -->
      <el-table-column
        fixed
        prop="title"
        label="公告主题"
        min-width="200"
        align="center"
      />
      <!-- 公告类别 -->
      <el-table-column
        prop="category"
        label="公告类别"
        min-width="100"
        align="center"
      />
      <!-- 发布部门 -->
      <el-table-column
        prop="department"
        label="发布部门"
        min-width="100"
        align="center"
      />
      <!-- 发布人 -->
      <el-table-column
        prop="author"
        label="发布人"
        min-width="80"
        align="center"
      />
      <!-- 接收对象 -->
      <el-table-column
        prop="target"
        label="接收对象"
        min-width="100"
        align="center"
      />
      <!-- 公告等级 -->
      <el-table-column prop="level" label="等级" min-width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="getLevelTag(row.level).type" size="small">
            {{ getLevelTag(row.level).label }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column
        prop="createdAt"
        label="发布时间"
        min-width="180"
        align="center"
      />
      <!-- 最新编辑时间 -->
      <el-table-column
        prop="updatedAt"
        label="最新编辑时间"
        min-width="180"
        align="center"
      />
      <!-- 阅读人数 -->
      <el-table-column
        prop="views"
        label="阅读人数"
        min-width="100"
        align="center"
      />
      <!-- 操作 -->
      <el-table-column
        fixed="right"
        prop="_id"
        label="操作"
        min-width="200"
        align="center"
      >
        <template #="{ row }">
          <!-- 查看 -->
          <el-button type="success" size="small" plain @click="">
            查看?
          </el-button>
          <!-- 编辑 -->
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleEditBoard(row)"
          >
            编辑
          </el-button>
          <!-- 删除 -->
          <el-popconfirm
            width="180"
            confirm-button-text="是"
            cancel-button-text="否"
            title="你确定要删除吗？"
            @confirm="handleDeleteBoard(row._id)"
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
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage, type TableInstance } from 'element-plus'
import useBoardStore from '@/store/modules/board'
const boardStore = useBoardStore()
import type { BoardsArrayItem } from '@/types/domain/notice'
import { getLevelTag } from '@/shared/utils/getLevelTag'
onMounted(() => {
  boardStore.getBoard(boardStore.searchParams)
})
// 全部公告按钮
const handleAllBoard = () => {
  boardStore.isAllBoard = true
}
// 发布公告按钮
const handlePublish = () => {
  boardStore.isBoardDrawer = true
  boardStore.boardDrawerTitle = '发布公告'
  Object.assign(boardStore.board, {
    title: '',
    category: '',
    department: '',
    author: '',
    target: '',
    level: '',
    content: '',
  })
}
// 刷新按钮
const flag = ref(true)
const handleRefresh = () => {
  flag.value = false
  nextTick(async () => {
    flag.value = true
    await boardStore.getBoard(boardStore.searchParams)
    ElMessage.success({ message: '刷新成功' })
  })
}
// 编辑公告按钮
const handleEditBoard = (row: BoardsArrayItem) => {
  boardStore.isBoardDrawer = true
  boardStore.boardDrawerTitle = '编辑公告'
  boardStore.board = JSON.parse(JSON.stringify(row))
}
// 删除公告按钮
const handleDeleteBoard = async (_id: string) => {
  try {
    await boardStore.deleteBoard(_id)
    await boardStore.getBoard(boardStore.searchParams)
    ElMessage.success({ message: '删除公告成功' })
  } catch (error) {
    ElMessage.error({ message: '删除公告失败' })
  }
}

// 多选框ref
const multipleTableRef = ref<TableInstance>()
// 全选按钮
const multipleSelection = ref<BoardsArrayItem[]>([])
const handleSelectionChange = (val: BoardsArrayItem[]) => {
  multipleSelection.value = val
  console.log(val)
}

// 批量删除公告按钮
const handleBatchDeleteBoard = async () => {
  const ids = multipleSelection.value.map((item: BoardsArrayItem) => ({
    _id: item._id,
  }))
  console.log(ids)
  try {
    await boardStore.batchDeleteBoard(ids as any)
    await boardStore.getBoard(boardStore.searchParams)
    ElMessage.success({ message: '批量删除公告成功' })
    multipleSelection.value = [] // 清空选择
    multipleTableRef.value?.clearSelection() // 清除表格选中状态
  } catch (error) {
    ElMessage.error({ message: '批量删除公告失败' })
  }
}
</script>

<style scoped lang="scss"></style>
