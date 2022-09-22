// 扩展vue原有功能：全局组件，自定义指令,挂载原型方法, 注意:没有过滤器
// 这就是插件
// vue2.0插件写法要求: 导出一个对象, 有install函数， 默认传入了Vue构造函数，vue基础之上扩展
// import PageTools from './PageTools'
// export default {
//     install(Vue) {
//       //  注册全局的通用栏组件对象
//       Vue.component('PageTools', PageTools) // 注册工具栏组件件
//     }
//   }

// vue3.0插件写法要求: 导出一个对象, 有install函数， 默认传入了app应用实例，aue基础之上扩展
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive函数
    // 如果要挂载原型 app.config.globalproperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
