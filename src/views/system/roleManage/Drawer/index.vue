<template>
  <el-drawer ref="drawerRef" v-model="userManage.drawerSwitch">
    <template #header>
      <h4>{{ userManage.drawerTitle }}</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="userInfo" label-width="auto" status-icon>
          <!-- 角色名称 -->
          <el-form-item label="角色名称" prop="role">
            <el-segmented v-model="userInfo.role" :options="roleOpts" />
          </el-form-item>
          <!-- 角色描述 -->
          <el-form-item label="角色描述" prop="descript">
            <el-input
              v-model="userInfo.descript"
              placeholder="请输入角色描述"
            />
          </el-form-item>
          <!-- 角色状态 -->
          <el-form-item label="角色状态" prop="status">
            <el-segmented v-model="userInfo.status" :options="statusOpts" />
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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useUserManage from '@/store/modules/userManage'
const userManage = useUserManage()
// 表单数据
const userInfo = ref({
  role: '',
  descript: '',
  status: '',
})

// 抽屉确认按钮
const confirmClick = async () => {
  try {
    if (userManage.drawerTitle === '新增角色') {
      // await userManage.addUserInfo(userManage.userInfo)
    } else {
      // await userManage.updataUserInfo(userManage.userInfo)
    }
    userManage.drawerSwitch = false
    // await props.getUserInfoList()
    ElMessage.success({
      message:
        userManage.drawerTitle === '新增角色' ? '新增角色成功' : '修改角色成功',
    })
  } catch (error) {
    ElMessage.error({
      message:
        userManage.drawerTitle === '新增角色' ? '新增角色失败' : '修改角色失败',
    })
  }
}
// 抽屉取消按钮
function cancelClick() {
  userManage.drawerSwitch = false
}

// 获取表单ref
const formRef = ref()
// 角色名称选项
const roleOpts = [
  {
    label: 'common',
    value: 'common',
  },
  {
    label: 'admin',
    value: 'admin',
  },
  {
    label: 'super',
    value: 'super',
  },
]
// 角色状态选项
const statusOpts = [
  {
    label: '启用',
    value: 'on',
  },
  {
    label: '禁用',
    value: 'off',
  },
]
</script>

<style scoped lang="scss"></style>
