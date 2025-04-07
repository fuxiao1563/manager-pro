<template>
  <div class="regist_container">
    <el-row>
      <el-col :xs="2" :sm="4" :md="6" :lg="8"></el-col>
      <el-col :xs="20" :sm="16" :md="12" :lg="8">
        <el-form
          class="regist_form"
          :model="registForm"
          ref="registForms"
          status-icon
          :rules="rules"
        >
          <h1>Soybean 管理系统</h1>
          <h2>注册账号</h2>
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              :prefix-icon="Iphone"
              v-model="registForm.phone"
              placeholder="请输入手机号"
              :formatter="formatter_number"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="authcode">
            <el-input
              :prefix-icon="ChatDotSquare"
              v-model="registForm.authcode"
              placeholder="请输入验证码"
              :formatter="formatter_number"
            >
              <template #append>
                <el-button type="primary" @click="">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="registForm.password"
              placeholder="请输入密码"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="confir_password">
            <el-input
              :prefix-icon="Lock"
              v-model="registForm.confir_password"
              placeholder="请输入确认密码"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 确认按钮 -->
            <el-button
              class="regist_button"
              :loading="loading"
              type="primary"
              @click=""
            >
              确认
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="regist_button" :loading="loading" @click="">
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="2" :sm="4" :md="6" :lg="8"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Iphone, ChatDotSquare, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'
import {
  formatter_number,
  validatorPhone,
  validatorAuthcode,
  validatorPassword,
} from '@/utils/validator'
// 收集表单数据
const registForm = reactive({
  phone: '',
  authcode: '',
  password: '',
  confir_password: '',
})
// 获取表单元素
const registForms = ref()
// 按钮的loading
const loading = ref(false)
// 确认密码的校验规则
const validatorConfirPassword = (_: any, value: any, callback: any) => {
  if (
    (value.length >= 5 || value.length <= 10) &&
    value === registForm.password
  ) {
    callback()
  } else {
    callback(new Error('确认密码需与密码保持一致'))
  }
}
// 自定义表单校验
const rules = reactive<FormRules<typeof registForm>>({
  phone: [
    {
      validator: validatorPhone,
      trigger: 'change',
    },
  ],
  authcode: [
    {
      validator: validatorAuthcode,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatorPassword,
      trigger: 'change',
    },
  ],
  confir_password: [
    {
      validator: validatorConfirPassword,
      trigger: 'change',
    },
  ],
})
</script>

<style lang="scss" scoped>
.regist_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.png') no-repeat;
  background-size: cover;

  .regist_form {
    position: relative;
    border-radius: 10px;
    background: white;
    padding: 40px 40px 20px 40px;
    top: 20vh;

    h1 {
      font-size: 30px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      text-align: center;
      margin: 30px 0;
    }

    .regist_button {
      width: 100%;
    }
  }
}
</style>
