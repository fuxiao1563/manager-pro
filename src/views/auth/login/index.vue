<template>
  <div class="login_container">
    <el-row>
      <el-col :xs="2" :sm="4" :md="6" :lg="8"></el-col>
      <el-col :xs="20" :sm="16" :md="12" :lg="8">
        <el-form
          class="login_form"
          :model="loginForm"
          ref="loginForms"
          :rules="rules"
          status-icon
        >
          <h1>
            <img src="@/shared/assets/images/logo.png" alt="" />
            <span>管理系统</span>
          </h1>
          <h2>密码登录</h2>
          <!-- 账号 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              show-password
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
                @click="toAuthcode"
              >
                验证码登录
              </el-button>
              <el-button
                class="login_btn_group_item_children"
                type="primary"
                @click="toRegist"
              >
                注册账号
              </el-button>
            </div>
            <!-- 分割线 -->
            <el-divider>其他方式登录</el-divider>
            <div class="login_btn_group_item login_btn_users">
              <el-button type="primary" @click="toAdmin">超级管理员</el-button>
              <el-button type="primary" @click="toAdmin">管理员</el-button>
              <el-button type="primary" @click="toAdmin">普通用户</el-button>
            </div>
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
import useAuthStore from '@/store/modules/auth'
const authStore = useAuthStore()
import { useRouter } from 'vue-router'
const $router = useRouter()
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import { getTime } from '@/shared/utils/time'
import { validatorUsername, validatorPassword } from '@/shared/utils/validator'
// 收集表单数据
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
})
// 获取表单元素
const loginForms = ref()
// 登录按钮的loading
const loading = ref(false)
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
  if (!loginForm) return
  try {
    // 验证登录表单数据的合法性
    loginForms.value.validate()
    loading.value = true
    await authStore.login(loginForm)
    const timeMessage = getTime() || 'Unknown Time'
    ElMessage.success({ message: `Hi, ${timeMessage}` })
    $router.push('/home')
  } catch (error: any) {
    ElMessage.error({ message: error.message || '登录失败' })
  } finally {
    // 无论登录是否成功，都重置加载状态为false
    loading.value = false
  }
}
// 验证码登录按钮的回调
const toAuthcode = () => {
  $router.push('/user/authcode')
}
// (超级管理员 + 管理员 + 普通用户)登录按钮的回调
const toAdmin = () => {
  $router.push('/home')
}
// 注册账号按钮的回调
const toRegist = () => {
  $router.push('/user/regist')
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/shared/assets/images/background.png') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 20vh;
    background: white;
    background-size: cover;
    padding: 40px 40px 20px 40px;

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
        justify-content: space-around;
      }
    }
  }
}
</style>
