<template>
  <el-card>
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
        <el-upload class="avatar-uploader" action="" :show-file-list="false">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
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
        <el-segmented v-model="userInfo.gender" :options="genderOptions" />
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
          <el-option label="在线" value="online" />
          <el-option label="离线" value="outline" />
          <el-option label="隐身" value="hidden" />
        </el-select>
      </el-form-item>
      <!-- 个性签名 -->
      <el-form-item label="个性签名" prop="signature">
        <el-input v-model="userInfo.signature" show-word-limit maxlength="20" />
      </el-form-item>
      <!-- 重置和提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="clearForm">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// import type { UploadProps } from 'element-plus'
import useUserStore from '@/store/modules/user'
import type { UserInfo } from '@/api/user/type'
const userStore = useUserStore()
onMounted(async () => {
  const { username } = userStore.userInfo
  try {
    await userStore.getUserInfo(username)
    ElMessage.success({ message: '获取用户信息成功' })
  } catch (error) {
    ElMessage.error({ message: '获取用户信息失败' })
  }
})
// 用户信息列表
let userInfo = reactive<UserInfo>({ ...userStore.userInfo })
// 获取表单ref
const formRef = ref()
// 性别选项
const genderOptions = ['男', '女', '未知']
/**
 * 处理头像上传成功的回调函数
 * @param response 服务器返回的响应数据
 * @param uploadFile 上传的文件对象
 */
// const handleAvatarSuccess: UploadProps['onSuccess'] = (
//   response,
//   uploadFile
// ) => {
//   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
// }
/**
 * 在头像上传之前的钩子函数
 * 用于检查上传文件的类型和大小
 * @param rawFile 原始文件对象
 * @returns 如果文件类型或大小不符合要求，则返回false，否则返回true
 */
// const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//   if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/PNG') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     return false
//   } else if (rawFile.size / 1024 / 1024 > 5) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
//   return true
// }
// 提交按钮
const submitForm = async () => {
  try {
    await userStore.updateUserInfo(userInfo)
    ElMessage.success({ message: '提交成功' })
  } catch (error) {
    ElMessage.error({ message: '提交失败' })
  }
}
// 重置按钮
const resetForm = () => formRef.value.resetFields()
// 清空按钮
const clearForm = () => {
  userInfo = {
    _id: userStore.userInfo._id,
    username: '',
    password: userStore.userInfo.password,
    phone: '',
    gender: '',
    email: '',
    role: '',
    avatar: '',
    status: '',
    signature: '',
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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
