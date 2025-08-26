<template>
  <div class="regist_container">
    <el-row>
      <el-col :xs="2" :sm="4" :md="6" :lg="8"></el-col>
      <el-col :xs="20" :sm="16" :md="12" :lg="8">
        <el-form
          class="regist_form"
          :model="code"
          ref="registForms"
          :rules="rules"
          status-icon
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
              v-model="code.phone"
              placeholder="请输入手机号"
              :formatter="formatter_number"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="authcode">
            <el-input
              :prefix-icon="ChatDotSquare"
              v-model="code.authCode"
              placeholder="请输入验证码"
              :formatter="formatter_number"
            >
              <template #append>
                <el-button
                  type="primary"
                  @click="handleSendAuthCode"
                  :disabled="sendLoading"
                >
                  {{ sendAuthCode }}
                </el-button>
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
              登录 / 注册
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
import { reactive, ref, toRefs } from 'vue'
import { ElMessage, type FormRules } from 'element-plus'
import {
  formatter_number,
  validatorPhone,
  validatorAuthCode,
} from '@/shared/utils/validator'
import router from '@/router'
const $router = router
import useAuthStore from '@/store/modules/auth'
const authStore = useAuthStore()
const { sendCode, codeLogin } = authStore
const { code } = toRefs(authStore)
// 获取表单元素
const registForms = ref()
// 按钮的loading
const loading = ref(false)
// 自定义表单校验
const rules = reactive<FormRules<typeof code>>({
  phone: [
    {
      validator: validatorPhone,
      trigger: 'change',
    },
  ],
  authCode: [
    {
      validator: validatorAuthCode,
      trigger: 'change',
    },
  ],
})
// 发送验证码的按钮
const sendAuthCode = ref('发送验证码')
let countdownTimer: number | null = null
let sendLoading = ref(false)
const handleSendAuthCode = async () => {
  clearInterval(countdownTimer!)
  sendLoading.value = true
  if (authStore.code.phone) {
    try {
      await sendCode({ phone: authStore.code.phone })
      ElMessage.success({ message: '验证码已发送' })
      // 开始倒计时
      let count = 10
      countdownTimer = setInterval(() => {
        count--
        if (count > 0) {
          sendAuthCode.value = `${count}秒后重试`
        } else {
          sendAuthCode.value = '发送验证码'
          clearInterval(countdownTimer!)
          countdownTimer = null
          sendLoading.value = false
        }
      }, 1000)
    } catch (error: any) {
      ElMessage.error({ message: error.message || '验证码发送失败' })
    }
  } else {
    sendLoading.value = false
    ElMessage.error({ message: '验证码发送失败' })
  }
}
// 验证码登录
const authcodeLogin = async () => {
  try {
    await codeLogin(code.value)
    ElMessage.success({ message: '登录成功' })
    $router.push('/home')
  } catch (error: any) {
    ElMessage.error({ message: error.message || '登录失败' })
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
