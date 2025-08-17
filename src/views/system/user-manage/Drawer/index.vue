<template>
  <el-drawer ref="drawerRef" v-model="userManage.isDrawer">
    <template #header>
      <h4>{{ userManage.drawerTitle }}</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="user" label-width="auto" status-icon>
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="user.username" />
          </el-form-item>
          <!-- 角色 -->
          <el-form-item label="角色" prop="role">
            <el-segmented v-model="user.role" :options="roleOpts" />
          </el-form-item>
          <!-- 性别  -->
          <el-form-item label="性别" prop="gender">
            <el-segmented v-model="user.gender" :options="genderOpts" />
          </el-form-item>
          <!-- 部门 -->
          <el-form-item label="部门" prop="department" required>
            <el-select v-model="user.department" placeholder="请选择所在部门">
              <el-option
                v-for="(item, index) in deptOpts"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" prop="phone" required>
            <el-input v-model="user.phone" placeholder="请输入手机号码" />
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱" />
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态" prop="status">
            <el-segmented v-model="user.status" :options="statusOpts" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import useUserManage from '@/store/modules/system/user-manage'
const userManage = useUserManage()
// 表单数据
const { user } = toRefs(userManage)
// 抽屉相关方法
const props = defineProps<{
  getUser: () => void
  opts: any
}>()
const { genderOpts, roleOpts, statusOpts, deptOpts } = props.opts
// 抽屉确认按钮
const handleConfirm = async () => {
  try {
    if (userManage.drawerTitle === '新增用户') {
      await userManage.addUser(userManage.user)
    } else {
      await userManage.updateUser(userManage.user)
    }
    userManage.isDrawer = false
    await props.getUser()
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
function handleCancel() {
  userManage.isDrawer = false
}

// 获取表单ref
const formRef = ref()
</script>

<style scoped lang="scss"></style>
