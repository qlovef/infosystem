import { Get, Post } from '@/utils/request'
import { GetParams } from '@/interface/public'
import { Menu } from '@/interface/menuManage'

// 获取菜单列表
export const RequestGetMenuList = (params: GetParams) => {
    let query = `?Page=${params.Page || 1}`
    query += `&PageSize=${params.PageSize || 20}`
    query += `&Name=${params.Name || ''}`
    return Get(`/menu/list${query}`)
}

// 新增菜单
export const RequestPostAddMenu = (menu: Menu) => {
    return Post('/menu/add', menu)
}

// 编辑菜单
export const RequestPostEditMenu = (menu: Menu) => {
    return Post('/menu/edit', menu)
}

// 删除菜单
export const RequestPostDeleteMenu = (ids: number[]) => {
    return Post('/menu/delete', { Id: ids })
}
