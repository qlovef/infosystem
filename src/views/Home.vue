<template>
    <div id="home">
        <router-view></router-view>
        <!-- <div class="pie-chart">
            <div
                v-for="item in dataList"
                :key="item.id"
                class="box-clip"
                :style="{
                    'clip': item.deg > 180 ? 'rect(auto,auto,auto,auto)' : 'rect(0px,100px,100px,50px)',
                    'transform': `rotate(${item.usedDeg}deg)`
                }">
                <div
                    class="cover-clip"
                    :style="{
                        'background': item.color,
                        'transform': `rotate(${item.deg > 180 ? 180 : item.deg}deg)`
                    }">
                </div>
                <div
                    v-if="item.deg > 180"
                    class="fill-clip"
                    :style="{
                        'background': item.color,
                        'transform': `rotate(${item.deg}deg)`
                    }">
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RequestPostEditMenu } from '../request/menuManage'
import axios from 'axios'

@Component({})

export default class Home extends Vue {
    total = 406
    dataList = [{
        id: 1,
        deg: 30,
        color: '#10AEFF',
        usedDeg: 0
    }, {
        id: 2,
        deg: 230,
        color: '#04BE02',
        usedDeg: 30
    }, {
        id: 3,
        deg: 60,
        color: '#888',
        usedDeg: 260
    }]
}
</script>

<style lang="scss">
.box-clip {
    position: absolute;
    clip: rect(0px,100px,100px,50px);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0px;
}
.cover-clip, .fill-clip {
    position: absolute;
    clip: rect(0px, 50px, 100px, 0px);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background: gray;
}
</style>
