// 菜单
export interface Menu {
    Id: number | null;
    RouteName: string;
    RouteUrl: string;
    IsShow: number;
    RouterOrder: number;
    ParentId: number | null;
}
