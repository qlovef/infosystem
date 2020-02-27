import { GetParams } from '@/interface/public'
import { Get } from '@/utils/request'

// 获取已审批请假申请记录列表
export const RequestGetApprovedRecordList = (params: GetParams) => {
    let query = `?Page=${params.Page || 1}`
    query += `&PageSize=${params.PageSize || 20}`
    query += `&Name=${params.Name || ''}`
    return Get(`/vacation/application/history${query}`)
}
