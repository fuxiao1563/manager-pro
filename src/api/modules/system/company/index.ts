import request from '@/shared/utils/request'
import type { Company } from '@/types/domain/system/company'
import type { CompanyRes } from '@/types/api/system/company'

enum API {
  getCompany_URL = '/system/company',
  updateCompany_URL = '/system/company/updateCompany',
}

// 公司信息
export const reqGetCompany = () =>
  request.get<any, CompanyRes>(API.getCompany_URL)

// 修改公司信息
export const reqUpdateCompany = (data: Company) =>
  request.post<any, CompanyRes>(API.updateCompany_URL, data)
