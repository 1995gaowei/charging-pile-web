<template>
  <div id="app">
    <header-wrapper></header-wrapper>
    <router-view/>
  </div>
</template>

<script>
import HeaderWrapper from '@/components/HeaderWrapper'
export default {
  name: 'app',
  components: { HeaderWrapper }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
