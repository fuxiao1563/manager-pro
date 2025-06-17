<template>
  <el-pagination
    :page-sizes="[5, 10, 15, 20]"
    :pager-count="7"
    :default-page-size="5"
    layout="total, prev, pager, next, sizes, jumper"
    :total="userManage.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import useUserManage from '@/store/modules/userManage'
import { toRefs } from 'vue'
const userManage = useUserManage()
const { searchFrom } = toRefs(userManage)
const props = defineProps<{
  getUserInfoList: any
}>()

// 切换展示数据量按钮
const handleSizeChange = (val: number) => {
  searchFrom.value.limit = val
  props.getUserInfoList()
}
// 切换页面按钮
const handleCurrentChange = (val: number) => {
  searchFrom.value.skip = (val - 1) * searchFrom.value.limit
  props.getUserInfoList()
}
</script>

<style scoped lang="scss"></style>
