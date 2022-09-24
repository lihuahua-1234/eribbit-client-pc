<template>
<!--二级分类-->
  <div class="sub-category">
    <div class="container">
      <!--面包屑-->
      <SubBread />
      <!--筛选区-->
      <SubFilter />
      <!--测试复选框-->
      <XtxCheckbox v-model="isAllCheckd">全选</XtxCheckbox>{{ isAllCheckd }}
    </div>
  </div>
</template>
<script>
import { ref } from 'vue-demi'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  components: { SubBread, SubFilter },
  name: 'SubCategory',
  setup () {
    const isAllCheckd = ref(true)
    return { isAllCheckd }
  }
}
</script>
<style scoped lang="less"></style>
