<template>
    <div class="footer">
       <div class="left">
               <ul>
                   <li v-for="item of tailList" :key="item"><a class="footer-jump" href="/">{{item}}</a></li>
               </ul>
       </div>
       <div class="right">
           <div class="desc">
               本项目源码受 MIT开源协议保护，文档受 CC BY 3.0 开源协议保护。
            </div>
       </div>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'

@Component({})
export default class Footer extends Vue {
    tailList: Array<string> = ['首页', '关于我们', '联系我们', '隐私条款', '网站地图', '返回顶部']
}
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 150px;
        font-size: 15px;
        color: #ffffff;
        background: #000000;
        .left{
            ul {
            list-style-type: none;
            display: flex;
            flex-direction: row;
            margin: 0%;
            padding: 0%;
                li {
                    width: 80px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    margin-left: 10px;
                }
                .footer-jump {
                    text-decoration: none;
                    color: #ffffff;
                }
            }
        }
        .right {
            margin: 0%;
            .desc {
                margin-right: 30px;
            }
        }
    }
</style>
