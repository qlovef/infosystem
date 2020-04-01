import { GetParams } from '@/interface/public'
import { Get, Post } from '@/utils/request'
import { ApprovedRecord } from '@/interface/approvedRecordList'

// 获取已审批请假申请记录列表
export const RequestGetApprovedRecordList = (params: GetParams) => {
    let query = `?Page=${params.Page || 1}`
    query += `&PageSize=${params.PageSize || 20}`
    query += `&Name=${params.Name || ''}`
    return Get(`/vacation/application/history${query}`)
}

// 获取未审批请假列表
export const RequestGetNotApprovedRecordList = (params: GetParams) => {
    let query = `?Psge=${params.Page || 1}`
    query += `&PageSize=${params.PageSize || 20}`
    query += `&Name=${params.Name || ''}`
    return Get(`/vacation/application/list${query}`)
}

// 新增菜单
export const RequestPostAddNotApproved = (notApproved: ApprovedRecord) => {
    return Post('/vacation/application/add', notApproved)
}
// 编辑菜单
export const RequestPostEditNotApproved = (notApproved: ApprovedRecord) => {
    return Post('/vacation/application/edit', notApproved)
}
