<template>
  <el-drawer ref="drawerRef" v-model="userManage.drawerSwitch">
    <template #header>
      <h4>{{ userManage.drawerTitle }}</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="userInfo" label-width="auto" status-icon>
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <!-- 角色 -->
          <el-form-item label="角色" prop="role">
            <el-segmented v-model="userInfo.role" :options="roleOptions" />
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
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-segmented v-model="userInfo.status" :options="statusOptions" />
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
import { ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
// 表单数据
const { userInfo } = toRefs(userManage)
// 抽屉相关方法
const props = defineProps<{
  getUserInfoList: any
}>()

// 抽屉确认按钮
const confirmClick = async () => {
  try {
    if (userManage.drawerTitle === '新增用户') {
      await userManage.addUserInfo(userManage.userInfo)
    } else {
      await userManage.updataUserInfo(userManage.userInfo)
    }
    userManage.drawerSwitch = false
    await props.getUserInfoList()
    ElMessage.success({
      message:
        userManage.drawerTitle === '新增用户' ? '新增用户成功' : '修改用户成功',
    })
  } catch (error) {
    ElMessage.error({
      message:
        userManage.drawerTitle === '新增用户' ? '新增用户失败' : '修改用户失败',
    })
  }
}
// 抽屉取消按钮
function cancelClick() {
  userManage.drawerSwitch = false
}

// 获取表单ref
const formRef = ref()
// 选项
const genderOptions = ['男', '女', '未知']
const roleOptions = ['common', 'admin', 'super']
const statusOptions = ['online', 'outline', 'hidden']
</script>

<style scoped lang="scss"></style>
