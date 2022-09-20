<template>
<!--顶部通栏-->
<AppNavbar />
<!--头部组件-->
<AppHeader />
<!--内容容器-->
<div class="app-body">
  <!--二级路由-->
  <RouterView />
</div>
<!--底部组件-->
<AppFooter />
</template>

<script>
import AppNavbar from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
export default {
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  },
  name: 'LaYout'
}
</script>

<style>
.app-body {
  min-height: 600px;
}
</style>
