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
  <AllBoard v-if="boardStore.isAllBoard" v-model="boardStore.isAllBoard" />
</template>

<script setup lang="ts">
import Search from './search/index.vue'
import DataTable from './datatable/index.vue'
import Pagenation from './pagenation/index.vue'
import Drawer from './drawer/index.vue'
import useBoardStore from '@/store/modules/notice/board'
const boardStore = useBoardStore()
</script>

<style scoped lang="scss"></style>
