<template>
    <section id="page-menu-manage">
        <div class="module">
            <!-- 菜单-按钮 -->
            <div class="row">
                <div class="btns">
                    <el-button
                        size="small"
                        @click="fetchMenuList">
                        刷新
                    </el-button>
                    <el-button
                        size="small"
                        @click="onAddMenu">
                        新增
                    </el-button>
                    <el-button
                        size="small"
                        :disabled="selection.length !== 1"
                        @click="onEditMenu">
                        编辑
                    </el-button>
                </div>
            </div>
            <div class="row">
                <el-table
                    ref="menuTable"
                    border
                    :data="menuList"
                    @row-click="onMenuRowClick"
                    @selection-change="onMenuSelectChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column
                        prop="RouteName"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="RouteUrl"
                        label="路由">
                    </el-table-column>
                    <el-table-column
                        prop="IsShow"
                        label="是否显示">
                        <template slot-scope="scope">
                            <span
                                :class="{
                                    'success': scope.row.IsShow,
                                    'error': !scope.row.IsShow
                                }">
                                {{ scope.row.IsShow === 1 ? '是' : '否' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="RouteOrder"
                        label="顺序">
                    </el-table-column>
                </el-table>
            </div>

            <!-- 菜单-页码 -->
            <div class="row right">
                <el-pagination
                    layout="prev, pager, next"
                    :page-size="menuPagination.pageSize"
                    :page-count="menuPagination.pageCount"
                    :total="menuPagination.totalCount"
                    @current-change="onMenuPageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 新增/编辑菜单 -->
        <el-dialog
            width="60%"
            :title="menu.id ? '编辑' : '新增'"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="isShowMenuDialog">
            <el-form
                ref="menu"
                label-width="100px"
                :model="menu"
                :rules="menuRules">
                <el-form-item
                    prop="RouteName"
                    label="名称">
                    <el-input
                        v-model.trim="menu.RouteName"
                        size="small" />
                </el-form-item>
                <el-form-item
                    prop="RouteUrl"
                    label="路由">
                    <el-input
                        v-model.trim="menu.RouteUrl"
                        size="small" />
                </el-form-item>
                <el-form-item
                    prop="IsShow"
                    label="是否显示"
                    class="no-validator">
                    <el-radio-group v-model="menu.IsShow">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="RouteOrder"
                    label="顺序"
                    class="no-validator">
                    <el-input
                        v-model.trim.number="menu.RouteOrder"
                        size="small" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button
                    size="small"
                    @click="onCancelMenuDialog">
                    取消
                </el-button>
                <el-button
                    size="small"
                    type="primary"
                    :loading="isShowMenuLoading"
                    @click="onConfirmMenuDialog">
                    确定
                </el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Pagination } from '@/interface/public'
import {
    Menu
} from '@/interface/menuManage'
import {
    RequestGetMenuList,
    RequestPostAddMenu,
    RequestPostEditMenu,
    RequestPostDeleteMenu
} from '@/request/menuManage'
import { ElForm } from 'element-ui/types/form'
import { ElTable } from 'element-ui/types/table'

@Component({})
export default class MenuManage extends Vue {
    // 菜单列表
    menuList: Menu[] = []
    // 选中菜单
    selection: Menu[] = []
    // 菜单页码
    menuPagination: Pagination = {
        page: 1,
        pageSize: 20,
        pageCount: 0,
        totalCount: 0
    }
    // 搜索信息
    searchInfo = ''
    // 菜单弹窗表单
    menu: Menu = {
        Id: null,
        RouteName: '',
        RouteUrl: '',
        IsShow: 1,
        RouterOrder: 0,
        ParentId: null
    }
    // 菜单弹窗表单验证规则
    menuRules: ElForm['rules'] = {
        RouteName: [{
            required: true,
            message: '请输入菜单名称'
        }],
        RouteUrl: [{
            required: true,
            message: '请输入菜单路由'
        }]
    }
    // 菜单弹窗初始值
    menuInitial!: Menu
    // 是否显示菜单弹窗
    isShowMenuDialog = false
    // 是否显示菜单弹窗loading
    isShowMenuLoading = false

    created () {
        // TODO 深克隆
        this.menuInitial = this.deepCopy(this.menu)
        this.fetchMenuList()
    }
    // 点击新增按钮时触发
    onAddMenu () {
        this.setMenuForm()
        this.showMenuDialog()
    }
    // 点击修改按钮时触发
    onEditMenu () {
        this.setMenuForm(this.selection[0])
        this.showMenuDialog()
    }
    // 点击菜单表格的行触发
    onMenuRowClick (row: Menu) {
        const menuTable = this.$refs.menuTable as ElTable
        const hasSelected = this.selection.some(sel => {
            return sel.Id === row.Id
        })
        if (hasSelected) {
            menuTable.toggleRowSelection(row, false)
        } else {
            menuTable.clearSelection()
            menuTable.toggleRowSelection(row, true)
        }
    }
    // 菜单表格选中行改变时触发
    onMenuSelectChange (selection: Menu[]) {
        this.selection = selection
    }
    // 菜单表格页码改变时触发
    onMenuPageChange (page: number) {
        this.menuPagination.page = page
        this.fetchMenuList()
    }

    // 菜单弹窗点击取消时触发
    onCancelMenuDialog () {
        this.hideMenuDialog()
    }
    // 菜单弹窗点击确定时触发
    onConfirmMenuDialog () {
        const menuForm = this.$refs.menu as ElForm
        menuForm.validate(valid => {
            if (valid) {
                this.subMenuForm()
            }
        })
    }

    // TODO 深克隆
    deepCopy (ele: any) {
        if (typeof ele === 'object') {
            if (ele === null) {
                return ele
            }
            if (ele.length !== undefined) {
                const arr: any = []
                ele.forEach((item: any) => {
                    arr.push(this.deepCopy(item))
                })
                return arr
            } else {
                const obj: any = {}
                Object.keys(ele).forEach(key => {
                    obj[key] = this.deepCopy(ele[key])
                })
                return obj
            }
        } else {
            return ele
        }
    }

    // 获取菜单列表
    async fetchMenuList () {
        this.menuList = []
        const result: any = await RequestGetMenuList({
            Page: this.menuPagination.page,
            PageSize: this.menuPagination.pageSize,
            Name: this.searchInfo
        })
        this.menuList = result.Data
    }
    /** @desc 设置菜单弹窗表单 @param {Menu} menu 菜单 */
    setMenuForm (menu?: Menu) {
        if (!menu) {
            // TODO 深克隆
            this.menu = this.deepCopy(this.menuInitial)
        } else {
            // TODO 深克隆
            this.menu = this.deepCopy(menu)
        }
    }
    // 显示菜单弹窗
    showMenuDialog () {
        this.isShowMenuDialog = true
    }
    // 隐藏菜单弹窗
    hideMenuDialog () {
        this.isShowMenuDialog = false
        this.resetMenuDialog()
    }
    // 重置菜单弹窗
    resetMenuDialog () {
        this.setMenuForm()
        this.hideMenuLoading()
        this.$nextTick(() => {
            const menuForm = this.$refs.menu as ElForm
            menuForm.clearValidate()
        })
    }
    // 显示菜单弹窗loading
    showMenuLoading () {
        this.isShowMenuLoading = true
    }
    // 隐藏菜单弹窗loading
    hideMenuLoading () {
        this.isShowMenuLoading = false
    }
    // 提交菜单表单
    async subMenuForm () {
        this.showMenuLoading()
        const { menu } = this
        if (menu.Id) {
            const result: any = await RequestPostEditMenu(menu)
            if (result.Code === 1) {
                this.hideMenuDialog()
                this.fetchMenuList()
            }
        } else {
            const result: any = await RequestPostAddMenu(menu)
            if (result.Code === 1) {
                this.hideMenuDialog()
                this.fetchMenuList()
            }
        }
    }
    /** @desc 删除菜单 @param {Menu[]} selection 选中菜单 */
    async deleteMenu (selection: Menu[]) {
        const ids: number[] = []
        selection.forEach(sel => {
            if (sel.Id) {
                ids.push(sel.Id)
            }
        })
        const result = await RequestPostDeleteMenu(ids)
    }
}
</script>

<style lang="scss" scoped>

</style>
