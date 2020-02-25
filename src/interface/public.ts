// 页码
export interface Pagination {
    page: number; // 当前页码
    pageSize: number; // 每页显示数量
    pageCount: number; // 页数
    totalCount: number; // 数据数量
}

// get请求参数
export interface GetParams {
    Page: number; // 页码
    PageSize: number; // 显示数量
    Name?: string; // 名称搜索
}
