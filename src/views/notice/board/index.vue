<template>
  <!-- 搜索栏 -->
  <Search />
  <!-- 公告列表 -->
  <DataTable>
    <!-- 分页器 -->
    <template #pagination>
      <Pagenation />
    </template>
  </DataTable>
  <!-- 发布 / 编辑公告对话框 -->
  <Drawer />
  <!-- 全部公告对话框 -->
  <AllBoard v-model="boardStore.isAllBoard" />
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import DataTable from './DataTable/index.vue'
import Pagenation from './Pagenation/index.vue'
import Drawer from './Drawer/index.vue'
import useBoardStore from '@/store/modules/board'
const boardStore = useBoardStore()
</script>

<style scoped lang="scss"></style>
