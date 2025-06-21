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
        <span>操作日志</span>
      </div>
    </template>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 16px"
    >
      <div>
        <el-input placeholder="输入用户名进行搜索" style="width: 240px">
          <template #append>
            <el-button>搜索</el-button>
          </template>
        </el-input>
        <el-radio-group v-model="search.level" style="margin-left: 20px">
          <el-radio
            v-for="item in ['所有', '低级', '中级', '高级']"
            :key="item"
            :value="item"
          >
            {{ item }}
          </el-radio>
        </el-radio-group>
      </div>
      <el-button type="danger" @click="">清空操作日志</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="ctrlLogInfoList"
      stripe
      border
      row-key="_id"
      @selection-change=""
      style="width: 100%"
    >
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!-- 操作者 -->
      <el-table-column
        prop="ctrlName"
        label="操作者"
        min-width="100"
        align="center"
      />
      <!-- 操作内容 -->
      <el-table-column
        prop="ctrlContant"
        label="操作内容"
        min-width="100"
        align="center"
      />
      <!-- 操作等级 -->
      <el-table-column
        prop="ctrlLevel"
        label="操作等级"
        min-width="100"
        align="center"
      >
        <template #default="item">
          <el-tag v-if="item.row.ctrlLevel === '低级'" type="info" size="small">
            {{ item.row.ctrlLevel }}
          </el-tag>
          <el-tag
            v-else-if="item.row.ctrlLevel === '中级'"
            type="primary"
            size="small"
          >
            {{ item.row.ctrlLevel }}
          </el-tag>
          <el-tag v-else type="danger" size="small">
            {{ item.row.ctrlLevel }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 操作时间 -->
      <el-table-column
        prop="ctrlTime"
        label="操作时间"
        min-width="200"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const ctrlLogInfoList = [
  {
    ctrlName: 'user',
    ctrlContant: '添加用户',
    ctrlLevel: '低级',
    ctrlTime: '2021-01-01 00:00:00',
  },
  {
    ctrlName: 'user',
    ctrlContant: '添加用户',
    ctrlLevel: '中级',
    ctrlTime: '2021-01-01 00:00:00',
  },
  {
    ctrlName: 'user',
    ctrlContant: '添加用户',
    ctrlLevel: '高级',
    ctrlTime: '2021-01-01 00:00:00',
  },
]
const search = reactive({
  level: '',
})
</script>

<style scoped lang="scss"></style>
