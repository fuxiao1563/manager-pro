<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component" v-if="flag" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()
let flag = ref<boolean>(true)
//监听refresh数据，变化时刷新
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
