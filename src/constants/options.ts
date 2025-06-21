import { reqGetCompanyInfoList } from '@/api/companyInfo'
// 性别
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
// 角色
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
// 状态
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
// 部门
const getDepartmentOpts = async () => {
  const result = await reqGetCompanyInfoList()
  if (result.code === 200) return result.data.department || []
  return Promise.reject(new Error(result.message))
}

export { genderOpts, roleOpts, getDepartmentOpts, statusOpts }
