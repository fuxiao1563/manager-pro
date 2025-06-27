<template>
  <div class="regist_container">
    <el-row>
      <el-col :xs="2" :sm="4" :md="6" :lg="8"></el-col>
      <el-col :xs="20" :sm="16" :md="12" :lg="8">
        <el-form
          class="regist_form"
          :model="authcodeForm"
          ref="registForms"
          status-icon
          :rules="rules"
        >
          <h1>
            <img src="@/shared/assets/images/logo.png" alt="" />
            <span>管理系统</span>
          </h1>
          <h2>验证码登录</h2>
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              :prefix-icon="Iphone"
              v-model="authcodeForm.phone"
              placeholder="请输入手机号"
              :formatter="formatter_number"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="authcode">
            <el-input
              :prefix-icon="ChatDotSquare"
              v-model="authcodeForm.authcode"
              placeholder="请输入验证码"
              :formatter="formatter_number"
            >
              <template #append>
                <el-button type="primary" @click="">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <!-- 确认按钮 -->
            <el-button
              class="regist_button"
              :loading="loading"
              type="primary"
              @click="authcodeLogin"
            >
              确认
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="regist_button" :loading="loading" @click="goBack">
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
import { Iphone, ChatDotSquare } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElMessage, type FormRules } from 'element-plus'
import {
  formatter_number,
  validatorPhone,
  validatorAuthcode,
} from '@/shared/utils/validator'
import router from '@/router'
const $router = router
// 收集表单数据
const authcodeForm = reactive({
  phone: '',
  authcode: '',
})
// 获取表单元素
const registForms = ref()
// 按钮的loading
const loading = ref(false)
// 自定义表单校验
const rules = reactive<FormRules<typeof authcodeForm>>({
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
})
// 验证码登录
const authcodeLogin = () => {
  ElMessage.success('敬请期待')
  $router.push('/home')
}
// 返回按钮
const goBack = () => {
  $router.back()
}
</script>

<style lang="scss" scoped>
.regist_container {
  width: 100%;
  height: 100vh;
  background: url('@/shared/assets/images/background.png') no-repeat;
  background-size: cover;

  .regist_form {
    position: relative;
    border-radius: 10px;
    background: white;
    padding: 40px 40px 20px 40px;
    top: 20vh;
    h1 {
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        margin-right: 10px;
      }
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
