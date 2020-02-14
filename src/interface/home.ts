// 菜单
export interface Menu {
    title: string;
    target: string;
    subMenu?: Array<SubMenu>
}

// 子菜单
export interface SubMenu {
    title: string;
    target: string
}