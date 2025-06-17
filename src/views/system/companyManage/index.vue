<template>
  <el-card>
    <template #header>
      <div>
        <span>公司管理</span>
      </div>
    </template>
    <el-form
      ref="formRef"
      :model="companyInfo"
      style="max-width: 600px"
      label-width="auto"
      status-icon
    >
      <el-form-item label="公司名称: ">
        <el-input v-model="companyInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址: ">
        <el-input v-model="companyInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="公司介绍: ">
        <el-input v-model="companyInfo.introduce"></el-input>
      </el-form-item>
      <el-form-item label="部门管理: ">
        <el-tag
          v-for="tag in companyInfo.department"
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
          class="w-20"
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
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import type { InputInstance } from 'element-plus'
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
const companyInfo = ref({
  name: '公司名称',
  address: '公司地址',
  introduce: '这个人很懒，什么都没有留下。',
  department: [
    '‌行政管理部',
    '‌人力资源部',
    '‌财务管理部',
    '‌市场与销售部',
    '‌技术研发部',
    '‌生产运营部',
    '‌客户服务部',
  ],
})
// 移除标签按钮
const handleClose = (tag: string) => {
  companyInfo.value.department.splice(
    companyInfo.value.department.indexOf(tag),
    1,
  )
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
    companyInfo.value.department.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped lang="scss"></style>
