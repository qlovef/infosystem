<template>
  <div class="header" @click="headerClick">
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
            <button class="button-list" @click.stop="buttonClick">服务项目<i class="el-icon-caret-bottom"></i></button>
            <ul class="list-nav" v-if="listSelect">
              <li v-for="item of list1" :key="item">{{item}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content">
            <el-input
                size="mini"
                v-model="input">
            </el-input>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content">
            <button class="button-search">搜索</button>
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content"></div></el-col>
        <el-col :span="2">
            <div class="grid-content">
                <form>
                    <select class="language-select" name="language">
                        <option value="Simplified">简体中文</option>
                        <option value="Simplified">繁体中文</option>
                        <option value="English">English</option>
                    </select>
                </form>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content">
                <button class="button-list" @click.stop="menberClick">会员中心<i class="el-icon-caret-bottom"></i></button>
                <ul class="menber-nav" v-if="member">
                    <li v-for="item of list2" :key="item">{{item}}</li>
                </ul>
            </div>
        </el-col>
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
      url: require('@/assets/images/public/slide1.jpg')
  }, {
      id: 2,
      url: require('@/assets/images/public/slide2.jpg')
  }, {
      id: 3,
      url: require('@/assets/images/public/slide3.jpg')
  }]

  list1: Array<string> = ['平面设计', '网页设计', '服务器托管', '动效合成', '影视后期']
  list2: Array<string> = ['个人资料', '结算中心', '所有文章', '注销']

  listSelect = false
  member = false

  input: String = 'Srarch'

  buttonClick () {
      this.listSelect = !this.listSelect
  }
  menberClick () {
      this.member = !this.member
  }
  headerClick () {
      this.listSelect = false
      this.member = false
  }
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
    padding: 0;
  }
  .button-list {
    outline: none;
    font-size: 15px;
    height: 30px;
    margin: 0;
    padding: 0;
    color: #ffffff;
    background-color: #000000;
    border: none;
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
  .button-search {
    width: 45px;
    height: 28px;
    line-height: 28px;
    margin-left: 5px;
    padding: 0;
    font-size: 15px;
    text-align: center;
    color: #000000;
    background-color: #ffffff;
    border-radius: 3px;
    border: none;
  }
  .language-select {
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 3px;
  }
  .menber-nav {
    position: absolute;
    top: 35px;
    right: 0;
    width: 100px;
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
    height: 300px;
  }
  .carousel-img {
    width: 100%;
    height: 300px;
  }
</style>
