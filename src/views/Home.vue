<template>
    <div id="page-home">
        <div class="row menu-row">
            <div
                v-for="menu of menuList"
                class="menu"
                :key="menu.Id"
                @click="goPage(menu.RouteUrl)">
                {{ menu.RouteName }}
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RequestGetMenuList } from '../request/menuManage'
import axios from 'axios'
import { Menu } from '@/interface/menuManage'

@Component({})

export default class Home extends Vue {
    // 菜单列表
    menuList: Menu[] = []

    created () {
        this.fetchMenuList()
    }

    // 获取菜单列表
    async fetchMenuList () {
        const result: any = await RequestGetMenuList({
            Page: 1,
            PageSize: 100
        })
        if (result.Code === 1) {
            this.menuList = result.Data.List
        }
    }

    /** @desc 跳转页面 @param {string} url 要跳转的url */
    goPage (url: string) {
        if (url === this.$route.path) {
            return
        }
        this.$router.push({
            path: url
        })
    }
}
</script>

<style lang="scss">
#page-home {
    padding: 10px 10px;

    .menu-row {
        display: flex;
        background: rgb(129, 194, 214);
        border-radius: 5px;

        .menu {
            min-width: 60px;
            height: 30px;
            line-height: 30px;
            border-right: 1px solid rgb(185, 202, 218);
            padding: 0 10px;
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            user-select: none;
            cursor: pointer;

            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }

        a {
            color: black;
            text-decoration: none;
        }
    }
}
</style>
