// 页码
export interface Pagination {
    Page: number; // 当前页码
    PageSize: number; // 每页显示数量
    PageCount: number; // 页数
    TotalCount: number; // 数据数量
}

// get请求参数
export interface GetParams {
    Page: number; // 页码
    PageSize: number; // 显示数量
    Name?: string; // 名称搜索
}
