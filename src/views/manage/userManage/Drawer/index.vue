<template>
  <el-drawer v-model="userManage.drawerSwitch" :direction="direction">
    <template #header>
      <h4>新增 & 编辑用户</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="userInfo" label-width="auto" status-icon>
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <!-- 性别  -->
          <el-form-item label="性别" prop="gender">
            <el-segmented v-model="userInfo.gender" :options="genderOptions" />
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" prop="phone" required>
            <el-input v-model="userInfo.phone" placeholder="请输入手机号码" />
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import type { DrawerProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UserInfo } from '@/api/user/type'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
// 用户信息列表
let userInfo = reactive<UserInfo>({ ...userStore.userInfo })
// 获取表单ref
const formRef = ref()
// 性别选项
const genderOptions = ['男', '女', '未知']
// 抽屉参数
const direction = ref<DrawerProps['direction']>('rtl')
// 抽屉取消按钮
function cancelClick() {
  userManage.drawerSwitch = false
}
// 抽屉确认按钮
const confirmClick = async () => {
  try {
    await userManage.addUserInfo(userInfo)
    nextTick(() => {
      ElMessage.success({ message: '添加用户成功' })
    })
  } catch (error) {
    ElMessage.error({ message: '添加用户失败' })
  }
}
</script>

<style scoped lang="scss"></style>
