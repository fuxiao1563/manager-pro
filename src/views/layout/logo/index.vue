<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $layout-tabbar-height;
  align-items: center;
  display: flex;

  img {
    width: 40px;
    height: 40px;
    margin-left: 5px;
  }

  p {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
