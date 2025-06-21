import request from '@/utils/request'
import type { CompanyInfoResult, CompanyInfoSub } from './type'

enum API {
  getCompanyInfoList_URL = '/system/companyInfo/companyInfoList',
  editCompanyInfo_URL = '/system/companyInfo/editCompanyInfo',
}

// 公司信息
export const reqGetCompanyInfoList = () =>
  request.get<any, CompanyInfoResult>(API.getCompanyInfoList_URL)

// 修改公司信息
export const reqEditCompanyInfo = (data: CompanyInfoSub) =>
  request.post<any, CompanyInfoResult>(API.editCompanyInfo_URL, data)
