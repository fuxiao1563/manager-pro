<template>
  <el-drawer ref="drawerRef" v-model="userManage.isDrawer">
    <template #header>
      <h4>{{ userManage.drawerTitle }}</h4>
    </template>
    <template #default>
      <div>
        <el-form ref="formRef" :model="userInfo" label-width="auto" status-icon>
          <!-- 角色名称 -->
          <el-form-item label="角色名称" prop="role">
            <el-input
              v-model="userInfo.role"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <!-- 角色描述 -->
          <el-form-item label="角色描述" prop="descript">
            <el-input v-model="userInfo.desc" placeholder="请输入角色描述" />
          </el-form-item>
          <!-- 角色权限 -->
          <el-form-item label="角色权限" prop="permissionTree">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              default-expand-all
            />
          </el-form-item>
          <!-- 角色状态 -->
          <el-form-item label="角色状态" prop="status">
            <el-segmented v-model="userInfo.status" :options="props.opts" />
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
import useUserManage from '@/store/modules/system/user-manage'
const userManage = useUserManage()
const props = defineProps<{
  opts: any
}>()
// 获取表单ref
const formRef = ref()
// 表单数据
const userInfo = ref({
  role: '',
  desc: '',
  permissionTree: {},
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
    userManage.isDrawer = false
    // await props.getUserInfoList()
    ElMessage.success({
      message:
        userManage.drawerTitle === '新增角色' ? '新增角色成功' : '修改角色成功',
    })
  } catch (error: any) {
    ElMessage.error({
      message:
        userManage.drawerTitle === '新增角色'
          ? error.message || '新增角色失败'
          : error.message || '修改角色失败',
    })
  }
}

// 抽屉取消按钮
function cancelClick() {
  userManage.isDrawer = false
}
// mock数据
const data = [
  {
    id: 1,
    label: '认证授权',
    children: [
      {
        id: 4,
        label: '登录页',
      },
    ],
  },
  {
    id: 2,
    label: '公告管理',
    children: [
      {
        id: 5,
        label: '公告栏',
      },
      {
        id: 6,
        label: '回收站',
      },
    ],
  },
  {
    id: 3,
    label: '系统管理',
    children: [
      {
        id: 7,
        label: '公司信息',
      },
      {
        id: 8,
        label: '用户管理',
      },
      {
        id: 9,
        label: '角色管理',
      },
      {
        id: 10,
        label: '菜单管理',
      },
    ],
  },
]
</script>

<style scoped lang="scss"></style>
