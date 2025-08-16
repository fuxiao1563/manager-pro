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
          <el-radio v-for="item in levelOpts" :key="item" :value="item.value">
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
        <el-button type="primary" plain @click="subForm()">
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
import { ElMessage } from 'element-plus'
import { BOARD, COMPANY } from '@/shared/constants/options'
const { levelOpts } = BOARD
const { deptOpts } = COMPANY
import useBoardStore from '@/store/modules/board'
const boardStore = useBoardStore()
const { searchParams, getBoard } = boardStore
// 重置按钮
const resetForm = async () => {
  Object.assign(searchParams, { target: '', level: '' })
  try {
    await getBoard(searchParams)
    ElMessage.success({ message: '重置成功' })
  } catch (error) {
    ElMessage.error({ message: '重置失败' })
  }
}
// 搜索按钮
const subForm = async () => {
  try {
    await getBoard(searchParams)
    ElMessage.success({ message: '搜索公告成功' })
  } catch (error) {
    ElMessage.error({ message: '搜索公告失败' })
  }
}
</script>

<style scoped lang="scss"></style>
