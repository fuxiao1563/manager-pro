<template>
  <el-form
    :inline="true"
    :model="searchFrom"
    ref="searchRef"
    label-width="auto"
  >
    <el-row :gutter="15">
      <!-- 角色名称 -->
      <el-col :span="6">
        <el-form-item label="角色名称" prop="role">
          <el-select
            v-model="searchFrom.role"
            placeholder="请选择角色名称"
            clearable
          >
            <el-option
              v-for="item in roleOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 角色状态 -->
      <el-col :span="6">
        <el-form-item label="角色状态" prop="status">
          <el-select
            v-model="searchFrom.status"
            placeholder="请选择角色状态"
            clearable
          >
            <el-option
              v-for="item in statusOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6"></el-col>
      <!-- 重置和搜索按钮 -->
      <el-col :span="6">
        <el-button plain @click="resetForm">
          <el-icon>
            <svg-icon name="refresh"></svg-icon>
          </el-icon>
          重置
        </el-button>
        <el-button type="primary" plain @click="search">
          <el-icon>
            <svg-icon name="search"></svg-icon>
          </el-icon>
          搜索
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 搜索所需提交的表单
let searchFrom = ref({
  role: '',
  status: '',
})
// 搜索按钮
const search = async () => {
  try {
    // await porps.getUserInfoList()
    ElMessage.success({ message: '搜索成功' })
  } catch (error) {
    ElMessage.error({ message: '搜索失败' })
  }
}

// 搜索重置按钮
const resetForm = async () => {
  try {
    searchFrom.value.role = ''
    searchFrom.value.status = ''
    ElMessage.success({ message: '重置成功' })
  } catch (error) {
    ElMessage.error({ message: '重置失败' })
  }
}

// 角色状态选项
const statusOpts = [
  {
    label: 'on',
    value: 'on',
  },
  {
    label: 'off',
    value: 'off',
  },
]
// 角色名称选项
const roleOpts = [
  {
    label: 'common',
    value: 'common',
  },
  {
    label: 'admin',
    value: 'admin',
  },
  {
    label: 'super',
    value: 'super',
  },
]
</script>

<style scoped lang="scss"></style>
