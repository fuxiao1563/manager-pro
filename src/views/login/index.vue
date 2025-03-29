<template>
  <div class="login_container">
    <el-row>
      <el-col :span="8" :xs="0"></el-col>
      <el-col :span="8" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          ref="loginForms"
          status-icon
          :rules="rules"
        >
          <h1>Soybean 管理系统</h1>
          <h2>密码登录</h2>
          <el-form-item prop="username">
            <!-- 账号 -->
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码 -->
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_btn_group">
            <div class="login_btn_group_item">
              <!-- 登录按钮 -->
              <el-button
                :loading="loading"
                class="login_btn"
                type="primary"
                @click="login"
              >
                登录
              </el-button>
            </div>
            <div class="login_btn_group_item">
              <el-button
                class="login_btn_group_item_children"
                type="primary"
                @click=""
              >
                验证码登录
              </el-button>
              <el-button
                class="login_btn_group_item_children"
                type="primary"
                @click=""
              >
                注册账号
              </el-button>
            </div>
            <hr />
            <div class="login_btn_group_item login_btn_users">
              <el-button type="primary" @click="">超级管理员</el-button>
              <el-button type="primary" @click="">管理员</el-button>
              <el-button type="primary" @click="">普通用户</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" :xs="0"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const $router = useRouter()
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import type { FormRules } from 'element-plus'
// 收集表单数据
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 获取表单元素
const loginForms = ref()
// 登录按钮的loading
const loading = ref(false)
// 密码的校验规则
const validatorUsername = (_: any, value: any, callback: any) => {
  if (value.length >= 5 || value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号长度为5-10位'))
  }
}
// 密码的校验规则
const validatorPassword = (_: any, value: any, callback: any) => {
  if (value.length >= 5 || value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码长度为5-10位'))
  }
}
// 自定义表单校验
const rules = reactive<FormRules<typeof loginForm>>({
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
})

// 登录按钮的回调
const login = async () => {
  // 可进一步优化：判断账号是否为字符串，密码是否为数字
  if (!loginForm) return
  try {
    // 验证登录表单数据的合法性
    loginForms.value.validate()
    loading.value = true
    await userStore.userLogin(loginForm)
    const timeMessage = getTime() || 'Unknown Time'
    ElNotification({
      type: 'success',
      message: `Hi, ${timeMessage}`,
    })
    $router.push('/')
  } catch (error: string) {
    // 捕获登录过程中的错误并显示错误通知
    ElNotification.success({
      type: 'error',
      message: error.message,
    })
  } finally {
    // 无论登录是否成功，都重置加载状态为false
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.png') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 20vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 30px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 10px 0;
    }

    .login_btn_group {
      .login_btn_group_item {
        display: flex;
        width: 100%;
        margin: 10px 0;

        .login_btn {
          width: 100%;
        }

        .login_btn_group_item_children {
          width: 50%;
        }
      }
      .login_btn_users {
        justify-content: space-between;
      }
    }
  }
}
</style>
