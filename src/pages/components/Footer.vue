<template>
    <div class="footer">
        <div class="footer-list">
            <ul class="list">
                <li class="list-child">
                    <a href="#">首页</a>
                </li>
                <li class="list-child">
                    <a href="#">关于我们</a>
                </li>
                <li class="list-child">
                    <a href="#">联系我们</a>
                </li>
                <li class="list-child">
                    <a href="#">隐私条款</a>
                </li>
                <li class="list-child">
                    <a href="#">网站地图</a>
                </li>
                <li class="list-child">
                    <a href="#">回到顶部</a>
                </li>
            </ul>
        </div>
        <div class="desc">
            <p>本项目源码受 MIT开源协议保护，文档受 CC BY 3.0 开源协议保护。</p>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
export default Vue.extend({
})
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #ffffff;
        background: #000000;
    }
    .list {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        list-style-type: none;
    }
    .list-child {
        width: 86px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
</style>
