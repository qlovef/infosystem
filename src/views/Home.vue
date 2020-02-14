<template>
    <div
        id="page-home"
        @click="onClickOtherArea">
        <div class="nav">
            <div class="left-side">
                <div class="title">
                    DXQ
                </div>
                <div
                    v-for="(menu, menuIndex) of menuList"
                    :key="menuIndex"
                    class="menu"
                    :class="{'selected-menu' : menu.subMenu && selectedMenu === menuIndex}"
                    @click.stop="onSelectedMenu(menuIndex)">
                    <a :href="!menu.subMenu ? '#/' + menu.target : '#'">
                        {{ menu.title }}
                    </a>
                    <i
                        v-if="menu.subMenu"
                        class="el-icon-caret-bottom menu-icon" />
                    <template v-if="menu.subMenu">
                        <div
                            v-show="selectedMenu === menuIndex"
                            class="sub-menu">
                            <div
                            v-for="(subMenu, subMenuIndex) of menu.subMenu"
                            :key="subMenuIndex"
                            class="sub-menu-item">
                            <a :href="`#/${menu.target}/${subMenu.target}`">
                                {{ subMenu.title }}
                            </a>
                        </div>
                        </div>
                    </template>
                </div>
                <div class="search-input">
                    <el-input
                        v-model="searchInfo"
                        size="small"
                        clearable
                        placeholder="输入内容进行搜索" />
                </div>
                <el-button
                    class="search-btn"
                    size="small"
                    @click="onSearch">
                    搜索
                </el-button>
            </div>
            <div class="right-side">
                <div
                    class="language"
                    :style="{
                        'margin-top': language === 'English' ? '4px' : '0'
                    }"
                    @click="onLanguageChange">
                    {{ language }}
                </div>
                <div class="user">
                    登录
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="footer">
            <div
                v-for="btn in 5"
                :key="btn"
                class="footer-btn">
                <el-button
                    size="small">
                    {{ btn }}按钮
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Menu } from '@/interface/home'

@Component({})

export default class Home extends Vue {
    // 菜单
    menuList: Array<Menu> = [{
        title: '博客文章',
        target: 'lesson'
    }, {
        title: '关于我们',
        target: 'lesson'
    }, {
        title: '服务项目',
        target: 'lesson',
        subMenu: [{
            title: '平面设计',
            target: 'lesson'
        }, {
            title: '网页设计',
            target: 'lesson'
        }, {
            title: '平面设计',
            target: 'lesson'
        }, {
            title: '网页设计',
            target: 'lesson'
        }]
    }]
    // 要显示的子菜单
    selectedMenu = -1
    // 搜索表单
    searchInfo = ''
    // 当前页面语言
    language = 'English'

    /** @desc 点击菜单触发 @param {number} menuIndex 点击菜单索引 */
    onSelectedMenu (menuIndex: number) {
        this.selectedMenu = menuIndex
    }
    // 点击菜单外的区域时触发
    onClickOtherArea () {
        this.selectedMenu = -1
    }
    // 点击搜索按钮时触发
    onSearch () {
        alert(`搜索(${this.searchInfo})`)
    }
    // 点击切换语言时触发
    onLanguageChange () {
        this.language = this.language === 'English' ? '中文' : 'English'
    }
}
</script>

<style lang="scss" scoped>
    #page-home {
        width: 100%;
        min-height: calc(100% - 150px);
        background: #e5eaec;
        position: relative;

        .nav {
            display: flex;
            justify-content: space-between;
            height: 50px;
            padding: 0 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;

            a {
                text-decoration: none;
                color: white;
            }

            .left-side {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;

                .title {
                    width: 100px;
                    font-size: 20px;
                }

                .menu {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 100%;
                    position: relative;

                    &:hover {
                        background: rgba(255, 255, 255, 0.8);

                        a {
                            color: black;
                        }
                    }

                    .sub-menu {
                        position: absolute;
                        top: 50px;
                        left: 0;
                        background: white;
                        color: black;
                        width: 150px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                        cursor: pointer;

                        a {
                            color: black;
                        }

                        .sub-menu-item {
                            height: 25px;
                            &:hover {
                                background: rgba(0, 0, 0, 0.1);
                            }
                        }

                        .sub-menu-item +.sub-menu-item {
                            margin-top: 5px;
                        }
                    }
                }

                .selected-menu {
                    background: rgba(255, 255, 255, 0.8);
                    a {
                        color: black;
                    }
                }

                .search-input {
                    width: 150px;
                    margin-left: 10px;
                }
                .search-btn {
                    margin-left: 10px;
                    color: black;
                }
            }

            .right-side {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                .language, .user {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    user-select: none;
                    cursor: pointer;
                }

                .user {
                    margin-left: 20px;
                }
            }
        }

        .footer {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: -150px;
            width: 100%;
            height: 150px;
            background: rgba(0, 0, 0, 0.8);
            color: white;

            .footer-btn {
                .el-button {
                    color: black;
                }
            }

            .footer-btn + .footer-btn {
                margin-left: 20px;
            }
        }
    }
</style>
