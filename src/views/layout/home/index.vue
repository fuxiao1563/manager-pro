<template>
  <el-card class="card-admin">
    <Admin></Admin>
  </el-card>
  <el-card class="card-data">
    <Data></Data>
  </el-card>
  <el-row class="card-groups" :gutter="15">
    <el-col class="group-item" :md="24" :lg="14">
      <LineChart></LineChart>
    </el-col>
    <el-col class="group-item" :md="24" :lg="10">
      <PieChart></PieChart>
    </el-col>
    <el-col class="group-item" :md="24" :lg="10">
      <Creative></Creative>
    </el-col>
    <el-col class="group-item" :md="24" :lg="14">
      <Project></Project>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import Admin from './Admin/index.vue'
import Data from './Data/index.vue'
import LineChart from './CardGroup/LineChart/index.vue'
import PieChart from './CardGroup/PieChart/index.vue'
import Project from './CardGroup/Project/index.vue'
import Creative from './CardGroup/Creative/index.vue'
</script>

<style scoped lang="scss">
.card-admin {
  border-radius: $home-border-radius;
  margin-bottom: 15px;
}

.card-data {
  border-radius: $home-border-radius;
  margin-bottom: 15px;
}

.card-groups {
  border-radius: $home-border-radius;

  .group-item {
    padding-bottom: 15px;
  }
}
</style>
