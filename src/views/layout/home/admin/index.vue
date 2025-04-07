<template>
  <el-row class="admin-content" :gutter="20">
    <el-col class="card-admin-left" :span="18">
      <el-avatar :size="70">
        <img src="../../../../assets/images/avator.png" alt="" />
      </el-avatar>
      <div class="left-item">
        <h3 class="left-title">{{ adminTitleForm.title }}</h3>
        <p class="left-subtitle">{{ adminTitleForm.subTitle }}</p>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="card-admin-right">
        <div
          class="right-item"
          v-for="(item, index) in adminProInfoForm"
          :key="index"
        >
          <div class="right-item-title">{{ item.title }}</div>
          <div class="right-item-detail">{{ item.detail }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const adminTitleForm = reactive({
  title: '早安，Soybean, 今天又是充满活力的一天!',
  subTitle: '今日多云转晴，20℃ - 25℃!',
})
const adminProInfoForm = reactive([
  {
    title: '项目数',
    detail: '25',
  },
  {
    title: '代办',
    detail: '1/16',
  },
  {
    title: '消息',
    detail: '12',
  },
])
</script>

<style scoped lang="scss">
.admin-content {
  display: flex;
  justify-content: space-between;

  .card-admin-left {
    height: 100%;
    display: flex;
    align-items: center;

    .left-item {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      .left-title {
        font-size: 18px;
        font-weight: 600;
      }

      .left-subtitle {
        font-size: 16px;
        color: lightslategray;
        margin-top: 10px;
      }
    }
  }

  .card-admin-right {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-item-title {
      font-size: 15px;
      height: 20px;
      text-align: center;
    }

    .right-item-detail {
      font-size: 25px;
      line-height: 40px;
      height: 40px;
      text-align: center;
    }
  }
}
</style>
