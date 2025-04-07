<template>
  <!-- 表单验证bug + 邮箱验证 -->
  <el-form :inline="true" :model="searchFrom" ref="searchRef" :rules="rules">
    <el-row :gutter="20" justify="end" align="center">
      <!-- 用户名 -->
      <el-col :span="6">
        <el-form-item label="&nbsp;&nbsp;&nbsp;用户名" prop="username">
          <el-input
            v-model="searchFrom.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
      </el-col>
      <!-- 性别 -->
      <el-col :span="6">
        <el-form-item
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别"
          prop="gender"
        >
          <el-select
            v-model="searchFrom.gender"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="item in genderOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 昵称 -->
      <el-col :span="6">
        <el-form-item
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称"
          prop="pieName"
        >
          <el-input
            v-model="searchFrom.pieName"
            placeholder="请输入昵称"
            clearable
          />
        </el-form-item>
      </el-col>
      <!-- 手机号 -->
      <el-col :span="6">
        <el-form-item label="&nbsp;&nbsp;&nbsp;手机号" prop="phone">
          <el-input
            v-model="searchFrom.phone"
            placeholder="请输入手机号"
            :formatter="formatter_number"
            clearable
          />
        </el-form-item>
      </el-col>
      <!-- 邮箱 -->
      <el-col :span="6">
        <el-form-item
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱"
          prop="email"
        >
          <el-input
            v-model="searchFrom.email"
            placeholder="请输入邮箱"
            clearable
          />
        </el-form-item>
      </el-col>
      <!-- 用户状态 -->
      <el-col :span="6">
        <el-form-item label="用户状态" prop="state">
          <el-select
            v-model="searchFrom.state"
            placeholder="请选择用户状态"
            clearable
          >
            <el-option
              v-for="item in stateOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 重置和搜索按钮 -->
      <el-col :span="12">
        <el-button plain @click="resetForm">重置</el-button>
        <el-button type="primary" plain @click="">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'
import {
  formatter_number,
  validatorPhone,
  validatorEmail,
} from '@/utils/validator'
// 收集搜索条件的数据
const searchFrom = reactive({
  username: '',
  gender: '',
  pieName: '',
  phone: '',
  email: '',
  state: '',
})
// 性别选项
const genderOpts = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
]
// 用户状态选项
const stateOpts = [
  {
    value: '在线',
    label: '在线',
  },
  {
    value: '离线',
    label: '离线',
  },
]
// 获取表单元素
const searchRef = ref()
// 自定义表单校验
const rules = reactive<FormRules<typeof searchFrom>>({
  phone: [
    {
      validator: validatorPhone,
      trigger: 'change',
    },
  ],
  email: [
    {
      validator: validatorEmail,
      trigger: 'change',
    },
  ],
})
// 表单重置
const resetForm = () => {
  if (searchRef.value) {
    searchRef.value.resetFields()
  } else {
    console.error('searchForms is not properly mounted')
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  width: 100%;
}
</style>
