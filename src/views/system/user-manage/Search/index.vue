<template>
  <el-card>
    <el-form
      :inline="true"
      :model="searchParams"
      ref="searchRef"
      :rules="rules"
      label-width="auto"
    >
      <el-row :gutter="15">
        <!-- 用户名 -->
        <el-col :span="6">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="searchParams.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
        </el-col>
        <!-- 性别 -->
        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="searchParams.gender"
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
        <!-- 角色 -->
        <el-col :span="6">
          <el-form-item label="角色" prop="role">
            <el-select
              v-model="searchParams.role"
              placeholder="请选择角色"
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
        <!-- 部门 -->
        <el-col :span="6">
          <el-form-item label="部门" prop="department">
            <el-select
              v-model="searchParams.department"
              placeholder="请选择部门"
              clearable
            >
              <el-option
                v-for="(item, index) in deptOpts"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 手机号 -->
        <el-col :span="6">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="searchParams.phone"
              placeholder="请输入手机号"
              :formatter="formatter_number"
              clearable
            />
          </el-form-item>
        </el-col>
        <!-- 邮箱 -->
        <el-col :span="6">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="searchParams.email"
              placeholder="请输入邮箱"
              clearable
            />
          </el-form-item>
        </el-col>
        <!-- 用户状态 -->
        <el-col :span="6">
          <el-form-item label="用户状态" prop="status">
            <el-select
              v-model="searchParams.status"
              placeholder="请选择用户状态"
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
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { ElMessage, type FormRules } from 'element-plus'
import {
  formatter_number,
  validatorPhone,
  validatorEmail,
} from '@/shared/utils/validator'
import useUserManageStore from '@/store/modules/system/user-manage'
const userManage = useUserManageStore()
// 搜索所需提交的表单
const { searchParams } = toRefs(userManage)
const props = defineProps<{
  getUser: () => void
  opts: any
}>()
const { genderOpts, roleOpts, statusOpts, deptOpts } = props.opts
// 搜索按钮
const search = async () => {
  try {
    await props.getUser()
    ElMessage.success({ message: '搜索成功' })
  } catch (error) {
    ElMessage.error({ message: '搜索失败' })
  }
}

// 搜索重置按钮
const resetForm = async () => {
  try {
    searchRef.value.resetFields()
    await props.getUser()
    ElMessage.success({ message: '重置成功' })
  } catch (error) {
    ElMessage.error({ message: '重置失败' })
  }
}

// 获取表单元素
const searchRef = ref()
// 自定义表单校验
const rules = reactive<FormRules<typeof searchParams>>({
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
</script>

<style scoped lang="scss"></style>
