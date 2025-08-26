<template>
  <el-card>
    <template #header>
      <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
        <span>文件管理</span>
        <el-upload style="display: flex" action="http://localhost:27017/file/upload" :headers="headerAuthor"
          :on-success="handleFileSuccess" :before-upload="beforeFileUpload" :show-file-list="false" multiple>
          <el-button type="primary">上传文件</el-button>
        </el-upload>
      </div>
    </template>
    <el-table :data="fileStore.fileList" style="width: 100%" height="250" border stripe>
      <el-table-column type="index" label="序号" min-width="60" align="center" />
      <el-table-column prop="fileName" label="文件名" min-width="120" align="center" />
      <el-table-column prop="username" label="上传者" min-width="120" align="center" />
      <el-table-column prop="uploadTime" label="上传时间" min-width="120" align="center" />
      <el-table-column prop="downloadCount" label="下载次数" min-width="100" align="center" />
      <el-table-column prop="fileSize" label="文件大小" min-width="120" align="center" />
      <el-table-column fixed="right" label="操作" min-width="120" align="center">
        <template #="{ row }">
          <!-- 编辑 -->
          <el-button type="success" size="small" @click="">下载?</el-button>
          <!-- 删除 -->
          <el-popconfirm confirm-button-text="是" cancel-button-text="否" title="你确定要删除吗？"
            @confirm="handleDeleteFile(row._id)" width="160">
            <template #reference>
              <el-button type="danger" size="small">删除文件</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from '@/shared/utils/token'
import type { UploadProps } from 'element-plus'
import useFileStore from '@/store/modules/file'
const fileStore = useFileStore()
onMounted(() => {
  getFile()
})
// 获取文件信息
const getFile = async () => {
  try {
    await fileStore.getFile()
    ElMessage.success({ message: '获取文件信息成功' })
  } catch (error: any) {
    ElMessage.error({ message: error.message || '获取文件信息失败' })
  }
}

// 处理文件上传成功的回调函数
const headerAuthor = ref({ Authorization: GET_TOKEN() })
const handleFileSuccess: UploadProps['onSuccess'] = () => {
  getFile()
}

// 在文件上传之前的钩子函数
const beforeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size > 1024 * 1024 * 10) {
    ElMessage.error({ message: '文件大小不能超过10MB' })
    return false
  }
  return true
}

// 删除文件
const handleDeleteFile = async (_id: string) => {
  try {
    await fileStore.deleteFile(_id)
    await getFile()
    ElMessage.success({ message: '删除文件成功' })
  } catch (error) {
    ElMessage.error({ message: '删除文件失败' })
  }
}
</script>

<style scoped lang="scss"></style>
