<template>
  <el-card class="userCenter">
    <template #header>
      <div>
        <span>用户中心</span>
      </div>
    </template>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="userInfo"
      label-width="auto"
      status-icon
    >
      <!-- 上传头像 -->
      <el-form-item label="上传头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :headers="headerAuthor"
          action="http://localhost:27017/userCenter/uploadUserAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="userCenterStore.avatar"
            :src="userCenterStore.avatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" />
      </el-form-item>
      <!-- 性别  -->
      <el-form-item label="性别" prop="gender">
        <el-segmented v-model="userInfo.gender" :options="genderOpts" />
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="性别" prop="gender">
        <span>{{ userInfo.role }}</span>
      </el-form-item>
      <!-- 部门 -->
      <el-form-item label="部门" prop="department" required>
        <el-select v-model="userInfo.department" placeholder="请选择所在部门">
          <el-option
            v-for="item in departmentOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone" required>
        <el-input v-model="userInfo.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email" required>
        <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="userInfo.status" placeholder="请选择在线状态">
          <el-option
            v-for="item in statusOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 个性签名 -->
      <el-form-item label="个性签名" prop="signature">
        <el-input v-model="userInfo.signature" show-word-limit maxlength="20" />
      </el-form-item>
      <!-- 重置和保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button type="danger" @click="">修改密码???</el-button>
        <el-button @click="resetForm">重置???</el-button>
        <el-button @click="clearForm">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { genderOpts, departmentOpts, statusOpts } from '@/constants/options'
import type { UploadProps } from 'element-plus'
import useUserCenterStore from '@/store/modules/userCenter'
const userCenterStore = useUserCenterStore()
import { GET_TOKEN } from '@/utils/token'
//处理头像上传成功的回调函数
const headerAuthor = ref({ Authorization: GET_TOKEN() })
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  userCenterStore.avatar = response.data.avatarUrl
}
//在头像上传之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/PNG'
  ) {
    ElMessage.error('图片格式错误，请重新上传')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片尺寸超过5MB，请重新上传')
    return false
  }
  return true
}
onMounted(async () => {
  try {
    await userCenterStore.getUserCenterInfo()
    await userCenterStore.getUserAvatar()
    ElMessage.success({ message: '获取用户信息成功' })
  } catch (error) {
    ElMessage.error({ message: '获取用户信息失败' })
  }
})
// 修改密码
// const changePassword = ref('')
// 用户信息列表
const { userInfo } = toRefs(userCenterStore)
// 获取表单ref
const formRef = ref()
// 提交按钮
const submitForm = async () => {
  try {
    await userCenterStore.updateUserCenterInfo(userInfo.value)
    await userCenterStore.getUserCenterInfo()
    ElMessage.success({ message: '修改成功' })
  } catch (error) {
    console.log(error)
    ElMessage.error({ message: '修改失败' })
  }
}
// 重置按钮 重置为初始值。未完成
const resetForm = () => formRef.value.resetFields()
// 清空按钮
const clearForm = () => {
  userInfo.value = {
    _id: userInfo.value._id,
    username: '',
    gender: '',
    role: userInfo.value.role,
    department: '',
    phone: '',
    email: '',
    status: '',
    signature: '',
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  border-radius: 10px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
