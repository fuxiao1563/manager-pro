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
        :data="binInfoList"
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
          prop="classes"
          label="公告类别"
          min-width="100"
          align="center"
        />
        <!-- 发布部门 -->
        <el-table-column
          prop="releaseDepartment"
          label="发布部门"
          min-width="100"
          align="center"
        />
        <!-- 发布人 -->
        <el-table-column
          prop="releasePerson"
          label="发布人"
          min-width="80"
          align="center"
        />
        <!-- 接收对象 -->
        <el-table-column
          prop="receiveObject"
          label="接收对象"
          min-width="100"
          align="center"
        />
        <!-- 公告等级 -->
        <el-table-column label="公告等级" min-width="100" align="center">
          <template #default="item">
            <el-tag
              v-if="item.row.boardLevel === '一般'"
              type="success"
              size="small"
            >
              {{ item.row.boardLevel }}
            </el-tag>
            <el-tag
              v-else-if="item.row.boardLevel === '重要'"
              type="danger"
              size="small"
            >
              {{ item.row.boardLevel }}
            </el-tag>
            <el-tag v-else type="info" size="small">
              {{ item.row.boardLevel }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 删除时间 -->
        <el-table-column
          prop="deleteTime"
          label="删除时间"
          min-width="120"
          align="center"
        />
        <!-- 操作 -->
        <el-table-column
          fixed="right"
          prop="_id"
          label="操作"
          width="80"
          align="center"
        >
          <template #="{ row }">
            <!-- 删除 -->
            <el-button type="danger" size="small" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const binInfoList = ref([
  {
    title: '下班后全体开会',
    classes: '公司公告',
    releaseDepartment: '行政部',
    releasePerson: '王总',
    receiveObject: '行政部',
    boardLevel: '重要',
    deleteTime: '2021-01-01',
    _id: '1',
  },
  {
    title: '采购会议',
    classes: '公司公告',
    releaseDepartment: '研发部',
    releasePerson: '张三',
    receiveObject: '研发部',
    boardLevel: '一般',
    deleteTime: '2021-01-01',
    _id: '1',
  },
])
</script>

<style scoped lang="scss"></style>
