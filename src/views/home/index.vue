<template>
<!--首页-->
  <div class="container">
      <!--首页入口-->
      <div class="home-entry">
        <!--左侧分类-->
        <HomeCategory />
        <!--轮播图-->
      </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  components: {
    HomeCategory
  },
  name: 'HomePage'

}
</script>

<style scoped lang="less">
</style>
