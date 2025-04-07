<template>
  <el-card class="item-content">
    <template #header>
      <div class="pro-header">
        <span>项目动态</span>
        <el-link type="primary">更多动态</el-link>
      </div>
    </template>
    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(item, index) in proForm"
        :key="index"
        center
        :timestamp="item.time"
        placement="top"
      >
        <div class="pro-content">
          <el-avatar :size="50">
            <img src="../../../../../assets/images/avator.png" />
          </el-avatar>
          <h4 class="pro-msg">{{ item.content }}</h4>
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const proForm = reactive([
  {
    avatar: '../../../../../assets/images/avator.png',
    content: 'UpdSoybean 在2021年5月28日创建了开源项目 soybean-admin!',
    time: '2018/4/2',
  },
  {
    avatar: '../../../../../assets/images/avator.png',
    content: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
    time: '2018/4/2',
  },
  {
    avatar: '../../../../../assets/images/avator.png',
    content: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
    time: '2018/4/2',
  },
  {
    avatar: '../../../../../assets/images/avator.png',
    content: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
    time: '2018/4/2',
  },
  {
    avatar: '../../../../../assets/images/avator.png',
    content: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！',
    time: '2018/4/2',
  },
])
</script>

<style scoped lang="scss">
.item-content {
  height: 550px;
  border-radius: $home-border-radius;
  padding: 15px;

  .pro-header {
    display: flex;
    justify-content: space-between;

    .el-link {
      font-size: 15px;
    }
  }

  .pro-content {
    display: flex;
    align-items: center;

    .pro-msg {
      margin-left: 15px;
    }
  }
}
</style>
