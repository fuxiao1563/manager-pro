<template>
  <!-- item-content需优化 -->
  <el-card class="item-content">
    <template #header>
      <div class="pro-header">
        <span>项目动态</span>
        <el-link type="primary">更多动态</el-link>
      </div>
    </template>
    <el-timeline style="max-width: 600px">
      <el-timeline-item center timestamp="2018/4/2" placement="top">
        <div class="pro-content">
          <el-avatar :size="50" src="../../../../public/soybean-JC38yUrs.png" />
          <h4 class="pro-msg">
            UpdSoybean 在2021年5月28日创建了开源项目 soybean-admin!
          </h4>
        </div>
      </el-timeline-item>
      <el-timeline-item center timestamp="2018/4/2" placement="top">
        <div class="pro-content">
          <el-avatar :size="50" src="../../../../public/soybean-JC38yUrs.png" />
          <h4 class="pro-msg">
            Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。
          </h4>
        </div>
      </el-timeline-item>
      <el-timeline-item center timestamp="2018/4/2" placement="top">
        <div class="pro-content">
          <el-avatar :size="50" src="../../../../public/soybean-JC38yUrs.png" />
          <h4 class="pro-msg">
            Soybean 准备为 soybean-admin 的发布做充分的准备工作!
          </h4>
        </div>
      </el-timeline-item>
      <el-timeline-item center timestamp="2018/4/2" placement="top">
        <div class="pro-content">
          <el-avatar :size="50" src="../../../../public/soybean-JC38yUrs.png" />
          <h4 class="pro-msg">
            Soybean 正在忙于为soybean-admin写项目说明文档！
          </h4>
        </div>
      </el-timeline-item>
      <el-timeline-item center timestamp="2018/4/2" placement="top">
        <div class="pro-content">
          <el-avatar :size="50" src="../../../../public/soybean-JC38yUrs.png" />
          <h4 class="pro-msg">
            Soybean 刚才把工作台页面随便写了一些，凑合能看了！
          </h4>
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup lang="ts"></script>

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
