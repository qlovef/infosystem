<template>
  <div id="app">
      <router-view></router-view>
      ccccccccccccccccc
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
}

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
@import '@/assets/scss/init.scss';
@import '@/assets/scss/init-element.scss';
</style>
