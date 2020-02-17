<template>
  <div>
      <header-nav></header-nav>
      <article-nav></article-nav>
      <footer-nav></footer-nav>
  </div>
</template>

<script lang="ts">
import HeaderNav from './components/Header.vue'
import ArticleNav from './components/Article.vue'
import FooterNav from './components/Footer.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        HeaderNav,
        ArticleNav,
        FooterNav
    }
})
export default class index extends Vue {
}
</script>

<style lang="scss">
</style>
