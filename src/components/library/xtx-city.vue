<!--城市组件-->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{active:visible}">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
        <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
        </template>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  setup () {
    // 显示和隐藏，默认隐藏
    const visible = ref(false)

    // 所有省市区数据
    const allCityData = ref([])
    // 正在加载数据
    const loading = ref(false)

    // 提供打开函数
    const open = () => {
      visible.value = true
      // 获取地区数据
      loading.value = true
      getCityData().then(data => {
        // console.log(data)
        allCityData.value = data
        loading.value = false
      })
    }
    // 提供关闭函数
    const close = () => {
      visible.value = false
    }

    // 提供一个切换函数给select使用
    const toggle = () => {
      visible.value ? close() : open()
    }

    // 实现点击组件外部元素进行关闭操作
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数1： 监听哪个元素,
      // 参数2： 点击了该元素外的其他地方触发的函数
      close()
    })

    // 实现计算属性：获取当前显示的地区数组
    const currList = computed(() => {
      // 默认显示省一级
      const list = allCityData.value
      // 可能:市一级
      // 可能:县地区
      return list
    })

    return { visible, toggle, target, loading, currList }
  }
}

// 获取省市区数据函数
const getCityData = () => {
  // 数据地址 https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1.当本地没右缓存，发请求获取数据
  // 2.但本地有缓存，取出本地数据
  // 返回promise在then获取数据, 这里可能是异步操作，可能是同步操作
  // 第一个参数是 resolve 的已完成情况的回调函数，第二个参数是 reject 被拒绝情况的回调函数
  return new Promise((resolve, reject) => {
    // 约定：数据存储在 window 的cityData 字段
    if (window.cityData) {
      resolve(Window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        // 缓存
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
     .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
