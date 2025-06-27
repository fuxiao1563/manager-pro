<template>
  <el-card style="margin-bottom: 20px">
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-select
          v-model="searchParams.target"
          placeholder="选择接收部门进行筛选"
          style="width: 240px"
        >
          <el-option
            v-for="item in deptOpts"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-radio-group v-model="searchParams.level" style="margin-left: 50px">
          <el-radio
            v-for="item in boardLevelOpts"
            :key="item"
            :value="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-button plain @click="resetForm()">
          <el-icon>
            <svg-icon name="refresh"></svg-icon>
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" plain @click="subForm">
          <el-icon>
            <svg-icon name="search"></svg-icon>
          </el-icon>
          搜索
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { deptOpts, boardLevelOpts } from '@/shared/constants/options'
// 搜索表单
const searchParams = reactive<{ target: string; level: string }>({
  target: '',
  level: '',
})
// 重置按钮
const resetForm = () => {
  Object.keys(searchParams).forEach((key) => {
    searchParams[key as keyof typeof searchParams] = ''
  })
}
// 搜索按钮
const subForm = () => {}
</script>

<style scoped lang="scss"></style>
