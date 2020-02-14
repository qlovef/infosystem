<template>
  <div class="header">
    <div class="header-nav">
      <el-row type="flex" class="row-bg">
        <el-col :span="2"><div class="grid-content">UISDC前端</div></el-col>
        <el-col :span="2">
          <div class="grid-content">
            <el-button type="text" class="button-nav">
              博客文章
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <el-button type="text" class="button-nav">
              关于我们
            </el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
            <button class="button-list">服务项目<i class="el-icon-caret-bottom"></i></button>
            <ul class="list-nav" v-if="listSelect">
              <li v-for="item of list" :key="item">{{item}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content"></div></el-col>
        <el-col :span="1"><div class="grid-content">123</div></el-col>
        <el-col :span="1"><div class="grid-content">123</div></el-col>
      </el-row>
    </div>
    <div class="header-carousel">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item of carouselImg" :key="item.id">
          <img class="carousel-img" :src="item.url" :alt="item.id" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  carouselImg: any = [{
    id: 1,
    url: require('../assets/images/public/slide1.jpg')
  }, {
    id: 2,
    url: require('../assets/images/public/slide2.jpg')
  }, {
    id: 3,
    url: require('../assets/images/public/slide3.jpg')
  }]

  list: any = ['平面设计', '网页设计', '服务器托管']

  listSelect = true

  input: any = 'Srarch'
}
</script>

<style scoped lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    position: relative;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
  }
  .button-nav {
    color: #ffffff;
    font-size: 15px;
    margin: 0;
    padding: 0;
  }
  .button-list {
    font-size: 15px;
    height: 30px;
    padding: 0;
    color: #ffffff;
    background-color: #000000;
    border: 1px solid #000000;
  }
  .list-nav {
    position: absolute;
    top: 35px;
    left: 0;
    width: 120px;
    margin: 0%;
    padding: 0 15px;
    text-align: left;
    z-index: 1000;
    color: #000000;
    background-color: #ffffff;
    list-style-type: none;
  }
  .row-bg {
    padding: 5px 0;
    background-color: #000000;
  }
  .header-carousel {
    height: 400px;
  }
  .carousel-img {
    width: 100%;
    height: 300px;
  }
</style>
