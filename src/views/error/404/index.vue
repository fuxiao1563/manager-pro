<template>
  <el-card>
    <template #header>
      <div class="error-title">404</div>
    </template>
    <div class="error-img">
      <svg-icon name="welcome" width="600" height="400"></svg-icon>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.error-title {
  font-size: 40px;
  text-align: center;
}
.error-img {
  display: flex;
  justify-content: center;
}
</style>
