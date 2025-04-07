<template>
  <el-row>
    <el-col :span="6" v-for="(item, index) in dataForm" :key="index">
      <div>
        <el-statistic :value="useTransition(item.value, { duration: 1500 })">
          <template #title>
            <h3>{{ item.title }}</h3>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useTransition } from '@vueuse/core'
// 数据
const dataForm = reactive([
  {
    title: '访问量',
    icon: 'Pointer',
    value: 9725,
  },
  {
    title: '成交额',
    icon: 'Money',
    value: 1026,
  },
  {
    title: '下载量',
    icon: 'Files',
    value: 970925,
  },
  {
    title: '成交量',
    icon: 'SoldOut',
    value: 9527,
  },
])
</script>

<style scoped lang="scss">
.el-col {
  text-align: center;
}
</style>
