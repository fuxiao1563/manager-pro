<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-if="isCollapse_title">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import setting from '@/setting'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
let isCollapse_title = ref<boolean>(true)
watch(
  () => layoutStore.isCollapse_title,
  () => {
    if (isCollapse_title.value) {
      isCollapse_title.value = !isCollapse_title.value
    } else {
      setTimeout(() => {
        isCollapse_title.value = !isCollapse_title.value
      }, 300)
    }
  },
)
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
  }

  p {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
