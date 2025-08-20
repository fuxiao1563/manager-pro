//创建主页相关的小仓库
import { defineStore } from 'pinia'
import {
  reqGetCompany,
  reqUpdateCompany,
} from '@/api/modules/system/company/index'
import type { Company } from '@/types/domain/system/company'
import type { CompanyRes } from '@/types/api/system/company'
import type { CompanyState } from '@/types/store/system/company'

const companyStore = defineStore('Company', {
  state: (): CompanyState => {
    return {
      company: {
        name: '',
        address: '',
        introduce: '',
        department: [],
      },
    }
  },
  actions: {
    // 获取公司信息
    async getCompany() {
      const result: CompanyRes = await reqGetCompany()
      if (result.code === 200) {
        this.company.name = result.data.name
        this.company.address = result.data.address
        this.company.introduce = result.data.introduce
        this.company.department = result.data.department
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 修改公司信息
    async updateCompany(data: Company) {
      const result: CompanyRes = await reqUpdateCompany(data)
      if (result.code === 200) {
        this.company.name = result.data.name
        this.company.address = result.data.address
        this.company.introduce = result.data.introduce
        this.company.department = result.data.department
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default companyStore
