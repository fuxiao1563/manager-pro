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
            :data="layoutStore.allBoard"
            stripe
            border
            style="width: 100%"
            highlight-current-row
            @row-click="handleMessage"
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
              prop="level"
              label="等级"
              min-width="80"
              align="center"
            >
              <template #default="{ row }">
                <el-tag :type="getLevelTag(row.level).type" size="small">
                  {{ getLevelTag(row.level).label }}
                </el-tag>
              </template>
            </el-table-column>
            <!-- 发布日期 -->
            <el-table-column
              prop="createdAt"
              label="发布日期"
              min-width="120"
              align="center"
            />
          </el-table>
        </el-aside>
        <el-main>
          <div v-if="currentRow" v-html="currentRow.title"></div>
          <div v-if="currentRow" v-html="currentRow.content"></div>
          <div v-else>请点击列表中的消息进行查看</div>
        </el-main>
      </el-container>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getLevelTag } from '@/shared/utils/getLevelTag.ts'
import useLayoutStore from '@/store/modules/layout.ts'
const layoutStore = useLayoutStore()
onMounted(async () => {
  getAllBoard()
})
/// 获取全部公告
const getAllBoard = async () => {
  try {
    await layoutStore.getAllBoard()
    ElMessage.success({ message: '获取全部公告成功' })
  } catch (error) {
    ElMessage.error({ message: '获取全部公告失败' })
  }
}
// 点击列表
const currentRow = ref<(typeof layoutStore.allBoard)[0] | null>(null)
const handleMessage = async (row: any) => {
  currentRow.value = row
  if (row.isRead === true) return
  try {
    await layoutStore.addRead(row._id)
    await getAllBoard()
    ElMessage.success({ message: '添加已读成功' })
  } catch (error) {
    ElMessage.error({ message: '添加已读失败' })
  }
}
// 全部公告关闭
const handleClose = (done: () => void) => {
  done()
}

// 表格样式
const rowStyle = (data: { row: any; rowIndex: number }) => {
  if (data.row.isRead === true) {
    return 'color:#909399;'
  } else {
    return 'font-weight: bold;'
  }
}
</script>

<style scoped lang="scss"></style>
