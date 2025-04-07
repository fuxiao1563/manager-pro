<template>
  <el-row class="data-content" gutter="15">
    <el-col :xs="24" :md="12" :lg="6">
      <div
        class="data-item"
        style="background-image: linear-gradient(135deg, #eb4887, #bb55a3)"
      >
        <h3 class="data-item-title">访问量</h3>
        <div class="data-item-box">
          <el-icon :size="30">
            <component is="Pointer"></component>
          </el-icon>
          <span class="data-item-content">9,725</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="12" :lg="6">
      <div
        class="data-item"
        style="background-image: linear-gradient(135deg, #845dc0, #5345b5)"
      >
        <h3 class="data-item-title">成交额</h3>
        <div class="data-item-box">
          <el-icon :size="30">
            <component is="Money"></component>
          </el-icon>
          <span class="data-item-content">$1,026</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="12" :lg="6">
      <div
        class="data-item"
        style="background-image: linear-gradient(135deg, #57ccf2, #719fe4)"
      >
        <h3 class="data-item-title">下载量</h3>
        <div class="data-item-box">
          <el-icon :size="30">
            <component is="Files"></component>
          </el-icon>
          <span class="data-item-content">970,925</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="12" :lg="6">
      <div
        class="data-item"
        style="background-image: linear-gradient(135deg, #fcb927, #f78256)"
      >
        <h3 class="data-item-title">成交量</h3>
        <div class="data-item-box">
          <el-icon :size="30">
            <component is="SoldOut"></component>
          </el-icon>
          <span class="data-item-content">9,527</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.data-content {
  .data-item {
    height: 100px;
    color: white;
    border-radius: $home-border-radius;
    background-color: aqua;
    margin: 7.5px 0;

    .data-item-title {
      font-size: 15px;
      line-height: 20px;
      padding: 10px 0 10px 10px;
    }

    .data-item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 10px 10px;

      .data-item-content {
        font-size: 30px;
        margin: 10px 10px 0 10px;
      }
    }
  }
}
</style>
