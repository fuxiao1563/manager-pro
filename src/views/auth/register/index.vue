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
          <h1>
            <img src="@/shared/assets/images/logo.png" alt="" />
            <span>管理系统</span>
          </h1>
          <h2>注册账号</h2>
          <!-- 账号 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="registForm.username"
              placeholder="请输入账号"
            ></el-input>
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
              @click="regist"
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
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElMessage, type FormRules } from 'element-plus'
import { validatorUsername, validatorPassword } from '@/shared/utils/validator'
import useAuthStore from '@/store/modules/auth'
const authStore = useAuthStore()
import router from '@/router'
const $router = router
// 收集表单数据
const registForm = reactive({
  username: 'admin',
  password: 'admin',
  confir_password: 'admin',
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
  username: [
    {
      validator: validatorUsername,
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
// 注册账号
const regist = async () => {
  try {
    await authStore.register(registForm)
    $router.push('/user/login')
    ElMessage.success({ message: '注册成功' })
  } catch (error) {
    ElMessage.error({ message: '注册失败' })
  }
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
