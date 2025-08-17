<template>
  <el-card>
    <template #header>
      <div>
        <span>公司管理</span>
      </div>
    </template>
    <el-form
      ref="formRef"
      :model="company"
      style="max-width: 600px"
      label-width="auto"
      status-icon
    >
      <el-form-item label="公司名称: ">
        <el-input v-model="company.name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址: ">
        <el-input v-model="company.address"></el-input>
      </el-form-item>
      <el-form-item label="公司介绍: ">
        <el-input v-model="company.introduce"></el-input>
      </el-form-item>
      <el-form-item label="部门管理: ">
        <div>
          <el-tag
            style="margin-right: 10px"
            v-for="tag in company.department"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            style="width: 100px"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >
            + 添加新部门
          </el-button>
        </div>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { nextTick, ref, toRefs, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { InputInstance } from 'element-plus'
import useCompanyStore from '@/store/modules/system/company'
const companyStore = useCompanyStore()
const { company } = toRefs(companyStore)
onMounted(async () => {
  try {
    await companyStore.getCompany()
  } catch (error) {
    ElMessage.error({ message: '获取用户信息失败' })
  }
})
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
// 提交按钮
const submitForm = async () => {
  try {
    await companyStore.updateCompany(company.value)
    ElMessage.success({ message: '修改成功' })
  } catch (error) {
    ElMessage.error({ message: '修改失败' })
  }
}
// 移除标签按钮
const handleClose = (tag: string) => {
  company.value.department.splice(company.value.department.indexOf(tag), 1)
}
//  添加标签按钮
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
// 确认添加标签按钮
const handleInputConfirm = () => {
  if (inputValue.value) {
    company.value.department.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped lang="scss"></style>
