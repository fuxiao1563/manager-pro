<template>
  <!-- 全部公告对话框 -->
  <el-dialog
    title="全部公告"
    width="800"
    center
    align-center
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="common-layout">
      <el-container>
        <el-aside width="400px">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            highlight-current-row
            @row-click="messageClick"
            :row-style="rowStyle"
          >
            <!-- 序号 -->
            <el-table-column
              fixed
              type="index"
              label=""
              min-width="60"
              align="center"
            />
            <!-- 主题 -->
            <el-table-column
              prop="title"
              label="主题"
              min-width="140"
              align="center"
            />
            <!-- 等级 -->
            <el-table-column
              prop="boardLevel"
              label="等级"
              min-width="80"
              align="center"
            >
              <template #default="item">
                <el-tag
                  v-if="item.row.boardLevel === '一般'"
                  type="primary"
                  size="small"
                >
                  {{ item.row.boardLevel }}
                </el-tag>
                <el-tag
                  v-else-if="item.row.boardLevel === '重要'"
                  type="warning"
                  size="small"
                >
                  {{ item.row.boardLevel }}
                </el-tag>
                <el-tag v-else type="danger" size="small">
                  {{ item.row.boardLevel }}
                </el-tag>
              </template>
            </el-table-column>
            <!-- 发布日期 -->
            <el-table-column
              prop="releaseTime"
              label="发布日期"
              min-width="120"
              align="center"
            />
          </el-table>
        </el-aside>
        <el-main>
          <div v-if="messageInfo.title !== ''">{{ messageInfo.title }}</div>
          <div v-else>请点击列表中的消息进行查看</div>
        </el-main>
      </el-container>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  boardSwitch: boolean
  settingSwitch: boolean
}>()

// 左侧公告列表
const tableData = [
  {
    title: '上午开会',
    boardLevel: '一般',
    releaseTime: '2021-01-01',
  },
  {
    title: '中午开会',
    boardLevel: '重要',
    releaseTime: '2021-01-01',
  },
  {
    title: '下午开会',
    boardLevel: '必要',
    releaseTime: '2021-01-01',
  },
]
const messageInfo = ref({
  title: '',
  content: '',
})
// 点击列表
const messageClick = (row: any) => {
  messageInfo.value.title = row.title
}
// 表格样式
const rowStyle = (data: { row: any; rowIndex: number }) => {
  if (data.rowIndex === 0) {
    return 'color:#909399;'
  } else {
    return 'font-weight: bold;'
  }
}
// 全部公告关闭
const handleClose = (done: () => void) => {
  done()
  messageInfo.value.title = ''
  messageInfo.value.content = ''
}
</script>

<style scoped lang="scss"></style>
