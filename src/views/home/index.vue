<template>
<!--首页-->
<div class="home-entry">
      <!--首页入口-->
      <div class="container">
        <!--左侧分类-->
        <HomeCategory />
        <!--轮播图-->
        <HomeBanner />
      </div>
  </div>
  <!--新鲜好物-->
  <HomeNew />
  <!--人气推荐-->
  <HomeHot />
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home.hot'
export default {
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
  },
  name: 'HomePage'
}
</script>

<style scoped lang="less">
</style>
