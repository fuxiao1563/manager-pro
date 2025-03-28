<template>
    <svg :style="{width: width, height: height}">
      <use :href="prefix + name" :fill="color"></use>
    </svg>
  </template>
  
  <script setup lang="ts">
  defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: String,
    color: String,
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
  })
  </script>
  
  <style scoped lang="scss"></style>
  