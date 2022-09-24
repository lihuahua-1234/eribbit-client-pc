<template>
<!--二级分类-->
  <div class="sub-category">
    <div class="container">
      <!--面包屑-->
      <SubBread />
      <!--筛选区-->
      <SubFilter @filter-change="fiterChange"/>
      <!--商品面板(排序 + 列表)-->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <!--商品列表-->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!--无效加载组件-->
        <XtxInfiniteLoading :loading="loading" :finished="finished"  @infinite="getData"/>
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export default {
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  name: 'SubCategory',
  setup () {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      // console.log('加载数据吧')
      loading.value = true
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        console.log('分类下商品,带筛选条件', result)
        result.items.unshift(
          { id: 1, name: '1美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/d2e1c277f1c873abb8825efc7084bc554ac6067c13cc13-xh8tuT_fw658' },
          { id: 2, name: '2美女', price: 99.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/5079759f0e95865a4d31d7e3c971b95d2aef60d737d55-qdrAfS_fw658123' },
          { id: 3, name: '3美女', price: 89.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/5079759f0e95865a4d31d7e3c971b95d2aef60d737d55-qdrAfS_fw658' },
          { id: 4, name: '4美女', price: 79.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/1ed1b69c2aef9f4b60351bd3e701fad70ff0e9781cf8e-vKKt1R_fw658' },
          { id: 5, name: '5美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/9a6a41f1ca5c6474ce414ccbf6df0f101e4058d91dfab-viOFYM_fw658' },
          { id: 6, name: '6美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/1169f90a381f38d587c433eb1b2facb26b2533968845b-H6IrHM_fw658' },
          { id: 7, name: '7美女', price: 99.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/baa7ff1dfdbd01e40cfe1a0ffe9e2a6ee58db936116b8-iugojJ_fw658' },
          { id: 8, name: '8美女', price: 89.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/bfe689cb63be10bb21f0f2ea0b3b90c964fbcd993c1ba-x9VZDf_fw658' },
          { id: 9, name: '9美女', price: 79.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/eadd6112724b840b98320b1fdae850ca06f14194324d3-Xy0U4V_fw658' },
          { id: 10, name: '10美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/7489bf137dc5273b0d2702d6328daf4d00c074ee2103e-08ecCN_fw658' },
          { id: 11, name: '11美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/d60123534a6012cf8bcad081910dc4b8dcc882de1de4e7-Va74Yj_fw658' },
          { id: 12, name: '12美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/d2e1c277f1c873abb8825efc7084bc554ac6067c13cc13-xh8tuT_fw658' },
          { id: 13, name: '13美女', price: 99.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/5079759f0e95865a4d31d7e3c971b95d2aef60d737d55-qdrAfS_fw658123' },
          { id: 14, name: '14美女', price: 89.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/5079759f0e95865a4d31d7e3c971b95d2aef60d737d55-qdrAfS_fw658' },
          { id: 15, name: '15美女', price: 79.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/1ed1b69c2aef9f4b60351bd3e701fad70ff0e9781cf8e-vKKt1R_fw658' },
          { id: 16, name: '16美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/9a6a41f1ca5c6474ce414ccbf6df0f101e4058d91dfab-viOFYM_fw658' },
          { id: 17, name: '17美女', price: 69.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/1169f90a381f38d587c433eb1b2facb26b2533968845b-H6IrHM_fw658' },
          { id: 18, name: '18美女', price: 99.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/baa7ff1dfdbd01e40cfe1a0ffe9e2a6ee58db936116b8-iugojJ_fw658' },
          { id: 19, name: '19美女', price: 89.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/bfe689cb63be10bb21f0f2ea0b3b90c964fbcd993c1ba-x9VZDf_fw658' },
          { id: 20, name: '20美女', price: 79.99, desc: '女神女神女神', picture: 'https://gd-hbimg.huaban.com/eadd6112724b840b98320b1fdae850ca06f14194324d3-Xy0U4V_fw658' }

        )
        // 获取数据成功
        if (result.items.length && result.page !== 3) {
          // 有数据就追加数据
          goodsList.value.push(...result.items)
          // 把page改成下一页页码
          reqParams.page++
        } else {
          // 没有数据, 代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类的时候需要重新加载数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}/` === route.path) {
        finished.value = false
        goodsList.value = [] // 导致列表空的，加载更多组件顶上来，进入可视区,去加载数据
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    // 1. 更改排序组件的筛选数据， 重新请求
    const sortChange = (sortParams) => {
      // console.log(sortParams)
      finished.value = false
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2. 更改筛选组件的筛选数据，重新请求
    const fiterChange = (filterParams) => {
      // console.log(filterParams)
      finished.value = false
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return { loading, finished, getData, goodsList, sortChange, fiterChange }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
  </style>
