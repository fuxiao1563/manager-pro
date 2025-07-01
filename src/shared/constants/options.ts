import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { reqGetCompany } from '@/api/modules/system/company'
import type { CompanyRes } from '@/types/api/system/company'
// 性别选项
const genderOpts = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
  {
    label: '保密',
    value: '保密',
  },
]
// 角色选项
const roleOpts = [
  {
    label: '普通用户',
    value: '普通用户',
  },
  {
    label: '管理员',
    value: '管理员',
  },
  {
    label: '超级管理员',
    value: '超级管理员',
  },
]
// 用户状态选项
const statusOpts = [
  {
    label: '在线',
    value: '在线',
  },
  {
    label: '离线',
    value: '离线',
  },
  {
    label: '隐身',
    value: '隐身',
  },
]
// 角色状态选项
const roleStatusOpts = [
  {
    label: '启用',
    value: '启用',
  },
  {
    label: '禁用',
    value: '禁用',
  },
]
// 部门选项
let deptOpts = ref<string[]>([])
const getDeptOpts = async () => {
  const result: CompanyRes = await reqGetCompany()
  if (result.code === 200) return result.data.department || []
  return Promise.reject(new Error(result.message))
}
;(async () => {
  try {
    deptOpts.value = await getDeptOpts()
  } catch (error) {
    ElMessage.error({ message: '获取部门信息失败' })
  }
})()
const boardLevelOpts = [
  { label: '一般', value: 1, type: 'primary' },
  { label: '重要', value: 2, type: 'success' },
  { label: '紧急', value: 3, type: 'danger' },
]
export {
  genderOpts,
  roleOpts,
  deptOpts,
  statusOpts,
  roleStatusOpts,
  boardLevelOpts,
}
