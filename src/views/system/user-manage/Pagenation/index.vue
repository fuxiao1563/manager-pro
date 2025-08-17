<template>
  <el-pagination
    :page-sizes="[5, 10, 15, 20]"
    :pager-count="7"
    :default-page-size="5"
    layout="total, prev, pager, next, sizes, jumper"
    :total="userManage.totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import useUserManage from '@/store/modules/system/user-manage'
import { toRefs } from 'vue'
const userManage = useUserManage()
const { searchParams } = toRefs(userManage)
const props = defineProps<{
  getUser: () => void
}>()

// 切换展示数据量按钮
const handleSizeChange = (val: number) => {
  searchParams.value.limit = val
  props.getUser()
}
// 切换页面按钮
const handleCurrentChange = (val: number) => {
  searchParams.value.skip = (val - 1) * searchParams.value.limit
  props.getUser()
}
</script>

<style scoped lang="scss"></style>
