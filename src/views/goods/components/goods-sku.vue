<!--规格组件-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
            <img
            :class="{selected:val.selected, disabled: val.disabled}"
            @click="changeSku(item,val)" v-if="val.picture"
            :src="val.picture"
            :alt="val.name">
            <span
            :class="{selected:val.selected, disabled: val.disabled}"
            @click="changeSku(item,val)"
            v-else >
            {{val.name}}
            </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
// 2.得到一个路径字典对象
const getPathMap = (skus) => {
  // 1. 得到所有的sku集合 在 props.goods.skus
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法得到子集
  // 4. 根据子集路径字典对象中存储 key-value
  const pathMap = {} // 路径字典
  // 2.2. 从所有的sku中筛选出有效的sku
  skus.forEach(sku => {
    // 计算当前有库存的sku的子集
    if (skus.inventory > 0) {
      // 可选值数组
      const valueArr = skus.specs.map(spec => spec.valueName)
      // console.log(valueArr) // spec.valueName 得到所有可选有效 数组 ：如:['蓝色', '中国', '10cm'] ['黄色', '中国', '10cm']
      // 可选值数组 子集
      // 2.3.根据有效的sku使用power-set算法得到子集
      const valueArrPowerSet = powerSet(valueArr)
      // console.log(valueArrPowerSet) // [ [] ['蓝色']['中国']['中国','中国']['蓝色','10cm']['中国','10cm']['蓝色','中国','10cm'] ]
      // 遍历子集， 往pathMap插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据 arr 得到字符串的key, 约定key是: ['蓝色','美国'] ===> '蓝色★美国'
        const key = arr.join(spliter) // 拼接
        // console.log(key) // 蓝色 中国 蓝色★中国 10cm 蓝色★10cm 中国★10cm 蓝色★中国★10cm
        // 给pathMap设置数据
        // 根据子集路径字典对象中存储 k ey-value
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    // 选中得按钮对象
    const seletedVal = item.values.find(val => val.selected)
    arr.push(seletedVal ? seletedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisableDstatus = (specs, pathMap) => {
  // 1. 约定每一个按钮得状态由本身得 disabled数据来控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 2. 判断当前是否选择， 是选择不用判断
      if (val.selected) {
        return
      }
      // 3. 拿到当前得值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 4. 剔除undefinde数据, 按照分割符拼接key
      const key = selectedValues.filter(value => value).join(spliter)
      // 5. 拿着key去路径字典中查找是否有数据，有可以点击，没有就禁用(true)
      val.disabled = !pathMap[key]
    })
  })
}
export default {
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'GoodsSku',
  setup (props) {
    // 2.1. 得到所有的sku集合
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)

    // ★组件初始化：更新按钮禁用状态
    updateDisableDstatus(props.goods.specs, pathMap)

    // 1.选中与取消选中，约定在每一个按钮都拥有自己选中状态数据: selected
    // 1.1 点击的是已选中，只需要取消当前的选中
    // 1.2 点击的是未选中, 把同一个规格的按钮改成未选中, 当前点击的改成选中
    const changeSku = (item, val) => {
      // val.selected = !val.selected // 每个按钮拥有自己的状态数据 selected

      // 但按钮是禁用得阻止程序运行
      if (val.disabled) {
        return
      }
      // 如果不是禁用，正常运行
      if (val.selected) {
        // 1.1 点击的是已选中，只需要取消当前的选中
        val.selected = false
      } else {
        // 1.2 点击的是未选中, 把同一个规格的按钮改成未选中
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        // 当前点击的改成选中
        val.selected = true
      }
      // ★点击按钮时：更新按钮禁用状态
      updateDisableDstatus(props.goods.specs, pathMap)
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
