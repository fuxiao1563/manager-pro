<template>
  <el-card class="item-content">
    <div id="pieChart" class="charts"></div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption
  let chartDom = document.getElementById('pieChart')!
  let myChart = echarts.init(chartDom)
  let option: EChartsOption
  option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 20, name: '学习' },
          { value: 10, name: '娱乐' },
          { value: 40, name: '工作' },
          { value: 30, name: '休息' },
        ],
      },
    ],
  }
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.item-content {
  height: 550px;
  border-radius: $home-border-radius;
  padding: 15px;

  .charts {
    height: 500px;
  }
}
</style>
