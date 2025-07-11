import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { reqGetCompany } from '@/api/modules/system/company'
import type { CompanyRes } from '@/types/api/system/company'
// 用户相关常量
const USER = {
  // 性别选项
  genderOpts: [
    { label: '男', value: '男' },
    { label: '女', value: '女' },
    { label: '保密', value: '保密' },
  ],
  // 角色选项
  roleOpts: [
    { label: '普通用户', value: '普通用户' },
    { label: '管理员', value: '管理员' },
    { label: '超级管理员', value: '超级管理员' },
  ],
  // 用户状态选项
  statusOpts: [
    { label: '在线', value: '在线' },
    { label: '离线', value: '离线' },
    { label: '隐身', value: '隐身' },
  ],
}
// 角色相关常量
const ROLE = {
  // 角色状态选项
  roleStatusOpts: [
    { label: '启用', value: '启用' },
    { label: '禁用', value: '禁用' },
  ],
}
// 公司相关常量
const COMPANY = {}
// 公告相关常量
const BOARD = {
  // 部门选项
  deptOpts: ref<string[]>([]),
  // 公告类别选项
  categoryOpts: [
    { label: '公司公告', value: 1 },
    { label: '部门公告', value: 2 },
    { label: '个人公告', value: 3 },
  ],
  // 公告等级选项
  levelOpts: [
    { label: '一般', value: 1, type: 'primary' },
    { label: '重要', value: 2, type: 'success' },
    { label: '紧急', value: 3, type: 'danger' },
  ],
}
// 获取部门选项的方法
const getDeptOpts = async () => {
  const result: CompanyRes = await reqGetCompany()
  if (result.code === 200) return result.data.department || []
  return Promise.reject(new Error(result.message))
}
;(async () => {
  try {
    BOARD.deptOpts.value = await getDeptOpts()
  } catch (error) {
    ElMessage.error({ message: '获取部门信息失败' })
  }
})()

export { USER, ROLE, COMPANY, BOARD }
