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
          <el-button type="primary" plain @click="handleReleaseBoard()">
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
            @confirm=""
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
          <el-button plain @click="">
            <el-icon>
              <svg-icon name="refresh"></svg-icon>
            </el-icon>
            刷新
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      ref="multipleTableRef"
      :data="boardStore.boards"
      stripe
      border
      row-key="_id"
      @selection-change=""
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
        <template #default="item">
          <el-tag v-if="item.row.level === '一般'" type="primary" size="small">
            {{ item.row.level }}
          </el-tag>
          <el-tag
            v-else-if="item.row.level === '重要'"
            type="warning"
            size="small"
          >
            {{ item.row.level }}
          </el-tag>
          <el-tag v-else type="danger" size="small">
            {{ item.row.level }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="120"
        align="center"
      />
      <!-- 最新编辑时间 -->
      <el-table-column
        prop="editTime"
        label="最新编辑时间"
        min-width="120"
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
        width="150"
        align="center"
      >
        <template #="{ row }">
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
            @confirm=""
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
import { ref, onMounted } from 'vue'
import useBoardStore from '@/store/modules/board'
const boardStore = useBoardStore()
onMounted(() => {
  boardStore.getBoard(boardStore.searchParams)
})
// 全部公告按钮
const handleAllBoard = () => {
  boardStore.allBoardSwitch = true
}
// 发布公告按钮
const handleReleaseBoard = () => {
  boardStore.boardDrawerSwitch = true
  boardStore.boardDrawerTitle = '发布公告'
  // 单独创建一个空对象用于清空数据
  boardStore.board = {
    title: '',
    category: '',
    department: '',
    author: '',
    target: '',
    level: 1,
    content: '',
  }
}
// 编辑公告按钮
const handleEditBoard = (row: any) => {
  boardStore.boardDrawerSwitch = true
  boardStore.boardDrawerTitle = '编辑公告'
  boardStore.board = row
}

const boardInfoList = ref([
  {
    title: '下班后全体开会',
    category: '公司公告',
    department: '行政部',
    author: '王总',
    target: '行政部',
    level: '重要',
    publishTime: '2021-01-01',
    editTime: '2021-01-01',
    views: '7',
    content: '<p>开会1</p>',
    _id: '1',
  },
  {
    title: '采购会议',
    category: '公司公告',
    department: '研发部',
    author: '张三',
    target: '研发部',
    level: '一般',
    publishTime: '2021-01-01',
    editTime: '2021-01-01',
    views: '7',
    content: '<p>开会2</p>',
    _id: '1',
  },
  {
    title: '采购会议',
    category: '公司公告',
    department: '研发部',
    author: '张三',
    target: '研发部',
    level: '必要',
    publishTime: '2021-01-01',
    editTime: '2021-01-01',
    views: '7',
    content: '<p>开会3</p>',
    _id: '1',
  },
])
</script>

<style scoped lang="scss"></style>
