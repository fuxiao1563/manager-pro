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
        <span>登录日志</span>
      </div>
    </template>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 16px"
    >
      <el-input placeholder="输入用户名进行搜索" style="width: 240px">
        <template #append>
          <el-button>搜索</el-button>
        </template>
      </el-input>
      <el-button type="danger" @click="">清空登录日志</el-button>
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
      <!-- 登录用户 -->
      <el-table-column
        prop="logUser"
        label="登录用户"
        min-width="100"
        align="center"
      />
      <!-- 联系方式 -->
      <el-table-column
        prop="logPhone"
        label="联系方式"
        min-width="120"
        align="center"
      />
      <!-- 邮箱 -->
      <el-table-column
        prop="logEmail"
        label="邮箱"
        min-width="200"
        align="center"
      />
      <!-- 登陆时间 -->
      <el-table-column
        prop="ctrlTime"
        label="登录时间"
        min-width="200"
        align="center"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
const ctrlLogInfoList = [
  {
    logUser: 'user',
    logPhone: '15510882253',
    logEmail: '2459009106@qq.com',
    ctrlTime: '2021-01-01 00:00:00',
  },
  {
    logUser: 'user',
    logPhone: '15510882253',
    logEmail: '2459009106@qq.com',
    ctrlTime: '2021-01-01 00:00:00',
  },
]
</script>

<style scoped lang="scss"></style>
