<template>
  <el-card>
    <template #header>
      <div>
        <span>回收站</span>
      </div>
    </template>
    <div>
      <el-table
        ref="multipleTableRef"
        :data="boardBinStore.boardBin"
        stripe
        border
        row-key="_id"
        @selection-change=""
        style="width: 100%"
      >
        <!-- 序号 -->
        <el-table-column
          fixed
          type="index"
          label=""
          width="60"
          align="center"
        />
        <!-- 公告主题 -->
        <el-table-column
          fixed
          prop="title"
          label="公告主题"
          min-width="200"
          align="center"
        />
        <!-- 公告类别 -->
        <el-table-column
          prop="category"
          label="公告类别"
          min-width="100"
          align="center"
        />
        <!-- 发布部门 -->
        <el-table-column
          prop="department"
          label="发布部门"
          min-width="100"
          align="center"
        />
        <!-- 发布人 -->
        <el-table-column
          prop="author"
          label="发布人"
          min-width="80"
          align="center"
        />
        <!-- 接收对象 -->
        <el-table-column
          prop="target"
          label="接收对象"
          min-width="100"
          align="center"
        />
        <!-- 公告等级 -->
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
        <!-- 删除时间 -->
        <el-table-column
          prop="deletedAt"
          label="删除时间"
          min-width="180"
          align="center"
        />
        <!-- 操作 -->
        <el-table-column
          fixed="right"
          prop="_id"
          label="操作"
          min-width="200"
          align="center"
        >
          <template #="{ row }">
            <!-- 查看 -->
            <el-button type="success" size="small" plain @click="">
              查看?
            </el-button>
            <!-- 还原 -->
            <el-button
              type="primary"
              size="small"
              plain
              @click="handleRestoreBoard(row._id)"
            >
              还原
            </el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              plain
              @click="handleForceDeleteBoard(row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { BOARD } from '@/shared/constants/options'
const { levelOpts } = BOARD
import useBoardBinStore from '@/store/modules/notice/board-bin'
const boardBinStore = useBoardBinStore()
onMounted(() => {
  getBoardBin()
})
// 获取等级标签
const getLevelTag = computed(() => (level: number) => {
  const found = levelOpts.find((op) => op.value === level)
  return {
    type: found?.type || 'info',
    label: found?.label || '',
  }
})
// 获取公告回收站
const getBoardBin = async () => {
  try {
    await boardBinStore.getBoardBin()
    ElMessage.success({ message: '获取公告回收站成功' })
  } catch (error) {
    ElMessage.success({ message: '获取公告回收站失败' })
  }
}
// 还原按钮
const handleRestoreBoard = async (_id: string) => {
  try {
    await boardBinStore.restoreBoard(_id)
    await getBoardBin()
    ElMessage.success({ message: '还原成功' })
  } catch (error) {
    ElMessage.error({ message: '还原失败' })
  }
}
// 永久删除按钮
const handleForceDeleteBoard = async (_id: string) => {
  try {
    await boardBinStore.forceDeleteBoard(_id)
    await getBoardBin()
    ElMessage.success({ message: '彻底删除成功' })
  } catch (error) {
    ElMessage.error({ message: '彻底删除失败' })
  }
}
</script>

<style scoped lang="scss"></style>
