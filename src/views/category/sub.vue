<template>
<!--二级分类-->
  <div class="sub-category">
    <div class="container">
      <!--面包屑-->
      <SubBread />
      <!--筛选区-->
      <SubFilter />
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  components: { SubBread, SubFilter },
  name: 'SubCategory'
}
</script>
<style scoped lang="less"></style>
