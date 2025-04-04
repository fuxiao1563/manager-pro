<template>
  <!-- item-content需优化 -->
  <el-card class="item-content">
    <div id="pieChart" class="charts">123</div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption
  var chartDom = document.getElementById('pieChart')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption
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
        name: 'Access From',
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
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  }
  option && myChart.setOption(option)
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
