<template>
  <el-pagination
    style="margin-top: 20px; justify-content: center"
    :page-sizes="[5, 10, 15, 20]"
    :pager-count="7"
    :default-page-size="5"
    layout="total, prev, pager, next, sizes, jumper"
    :total="1"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps<{}>()

// 切换展示数据量按钮
const handleSizeChange = (val: number) => {}
// 切换页面按钮
const handleCurrentChange = (val: number) => {}
</script>

<style scoped lang="scss"></style>
