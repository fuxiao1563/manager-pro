<template>
  <el-card>
    <!-- 搜索 -->
    <Search />
  </el-card>
  <el-card class="manage-card">
    <template #header>
      <div class="header">
        <div>
          <span>用户管理</span>
        </div>
        <div>
          <el-button type="primary" plain>新增</el-button>
          <el-button type="danger" plain>批量删除</el-button>
          <el-button plain>刷新</el-button>
          <el-button plain>列设置</el-button>
        </div>
      </div>
    </template>
    <!-- 管理表格 -->
    <Table />
    <!-- 分页器 -->
    <el-pagination
      class="pagination"
      :page-size="[5, 10, 15, 20]"
      :pager-count="7"
      layout="total, prev, pager, next, sizes, jumper"
      :total="100"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import Search from './Search/index.vue'
import Table from './Table/index.vue'
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
.manage-card {
  margin-top: 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
