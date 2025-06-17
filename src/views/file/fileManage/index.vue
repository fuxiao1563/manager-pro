<template>
  <el-card>
    <template #header>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <span>文件管理</span>
        <el-button type="primary" @click="">上传文件</el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%" height="250" border stripe>
      <el-table-column
        fixed
        prop="fileName"
        label="文件名"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="上传者"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="uploadTime"
        label="上传时间"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="downloadCount"
        label="下载次数"
        min-width="100"
        align="center"
      />
      <el-table-column
        prop="fileSize"
        label="文件大小"
        min-width="120"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template #="{ row }">
          <!-- 编辑 -->
          <!-- <el-button type="primary" size="small" plain @click="">
                        编辑
                    </el-button> -->
          <!-- 删除 -->
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            title="你确定要删除吗？"
            @confirm=""
          >
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
const tableData = [
  {
    fileName: 'file.zip',
    userName: 'Tom',
    uploadTime: '2016-05-03',
    downloadCount: '10',
    fileSize: '100kb',
  },
  {
    fileName: 'file.zip',
    userName: 'Tom',
    uploadTime: '2016-05-03',
    downloadCount: '10',
    fileSize: '100kb',
  },
]
</script>

<style scoped lang="scss"></style>
