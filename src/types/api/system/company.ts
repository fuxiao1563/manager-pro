// api - companyInfo 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { Company } from '@/types/domain/system/company'

// 获取公司信息所返回的数据
export interface CompanyRes extends BaseRes<Company> {}

// 修改公司信息所提交的数据 CompanyInfo
