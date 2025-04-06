<template>
  <!-- 搜索 -->
  <el-card>
    <el-form :inline="true" :model="formInline" class="search">
      <el-row :gutter="20" justify="end" align="center">
        <el-col :span="6">
          <el-form-item label="&nbsp;&nbsp;&nbsp;用户名">
            <el-input
              v-model="formInline.user"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别">
            <el-select v-model="value" placeholder="请选择性别" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称">
            <el-input
              v-model="formInline.user"
              placeholder="请输入昵称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="&nbsp;&nbsp;&nbsp;手机号">
            <el-input
              v-model="formInline.user"
              placeholder="请输入手机号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱">
            <el-input
              v-model="formInline.user"
              placeholder="请选择用户状态"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户状态">
            <el-select v-model="value" placeholder="请输入邮箱" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" plain @click="">重置</el-button>
          <el-button type="primary" plain @click="">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!-- 表格 -->
  <el-card class="table">
    <template #header>
      <div class="header">
        <div>
          <span>用户管理</span>
        </div>
        <div class="header_right">
          <el-button type="primary" plain>新增</el-button>
          <el-button type="danger" plain>批量删除</el-button>
          <el-button plain>刷新</el-button>
          <el-button plain>列设置</el-button>
        </div>
      </div>
    </template>
    <!-- table组件 -->
    <el-table
      ref="multipleTableRef"
      :data="userInfoList"
      stripe
      border
      row-key="_id"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" :selectable="selectable" width="40" />
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column
        prop="username"
        label="用户名"
        min-width="100"
        align="center"
      />
      <el-table-column prop="gender" label="性别" width="60" align="center" />
      <el-table-column
        prop="pieName"
        label="昵称"
        min-width="60"
        align="center"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="180"
        align="center"
      />
      <el-table-column label="用户状态" width="100" align="center">
        <template #default="item">
          <el-tag
            v-if="item.row.state === '0'"
            type="success"
            size="small"
            @close=""
          >
            在线
          </el-tag>
          <el-tag v-else type="danger" size="small" @close="">离线</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ctrl" label="操作" min-width="150" align="center">
        <el-button type="primary" size="small" plain @click="">编辑</el-button>
        <el-button type="danger" size="small" plain @click="">删除</el-button>
      </el-table-column>
    </el-table>
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
import { ref, reactive, onMounted, watch } from 'vue'
import type { TableInstance } from 'element-plus'
import useManageStore from '@/store/modules/manage'
const value = ref('')
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const options = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
]
const manageStore = useManageStore()
let userInfoList = ref<userInfoListType[]>([])
// 表格数据
interface userInfoListType {
  id: number
  name: string
  gender: string
  pieName: string
  phone: string
  email: string
  state: string
}
onMounted(() => {
  manageStore.getUserInfoList()
  watch(
    () => manageStore.userInfoList,
    () => {
      userInfoList.value = manageStore.userInfoList
    },
  )
})
const multipleTableRef = ref<TableInstance>()

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const multipleSelection = ref<userInfoListType[]>([])
// 行内选择状态
const selectable = (row: userInfoListType) => ![1, 2].includes(row.id)
// 全选状态
const handleSelectionChange = (val: userInfoListType[]) => {
  multipleSelection.value = val
}
</script>

<style scoped lang="scss">
.search {
  .el-col {
    // display: flex;
    // justify-content: flex-end;

    .el-form-item {
      width: 100%;
    }
  }
}

.table {
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
