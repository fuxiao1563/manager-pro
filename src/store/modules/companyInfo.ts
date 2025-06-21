//创建主页相关的小仓库
import { defineStore } from 'pinia'
import {
  reqGetCompanyInfoList,
  reqEditCompanyInfo,
} from '@/api/companyInfo/index'
import type { CompanyInfoResult, CompanyInfoSub } from '@/api/companyInfo/type'
import type { CompanyInfoState } from './types/types'

const companyInfoStore = defineStore('CompanyInfo', {
  state: (): CompanyInfoState => {
    return {
      companyInfoList: {
        name: '',
        address: '',
        introduce: '',
        department: [''],
      },
    }
  },
  actions: {
    // 获取公司信息
    async getCompanyInfoList() {
      const result: CompanyInfoResult = await reqGetCompanyInfoList()
      if (result.code === 200) {
        this.companyInfoList.name = result.data.name
        this.companyInfoList.address = result.data.address
        this.companyInfoList.introduce = result.data.introduce
        this.companyInfoList.department = result.data.department
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 修改公司信息
    async editCompanyInfo(data: CompanyInfoSub) {
      const result: CompanyInfoResult = await reqEditCompanyInfo(data)
      if (result.code === 200) {
        this.companyInfoList.name = result.data.name
        this.companyInfoList.address = result.data.address
        this.companyInfoList.introduce = result.data.introduce
        this.companyInfoList.department = result.data.department
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default companyInfoStore
