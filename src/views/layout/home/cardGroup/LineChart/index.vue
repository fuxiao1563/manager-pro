<template>
  <!-- item-content需优化 -->
  <el-card class="item-content">
    <div id="lineChart" class="charts"></div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption
  var chartDom = document.getElementById('lineChart')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption
  option = {
    color: ['rgb(123, 100, 252)', 'rgb(30, 237, 199)'],
    title: {
      text: '',
    },
    legend: {
      data: ['下载量', '注册量'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '6:00',
          '8:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '24:00',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '下载量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(123, 100, 252)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255,0.8)',
            },
          ]),
        },
        emphasis: { focus: 'series' },
        data: [4200, 6000, 6500, 6700, 2000, 4300, 1500, 4000, 3800, 4100],
      },
      {
        name: '注册量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(30, 237, 199)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255,0.8)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [6800, 8100, 9700, 11000, 10200, 6300, 5000, 6200, 6400, 5200],
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
