<template>
  <div id="app">
    <header-wrapper></header-wrapper>
    <div class="main-view">
      <router-view/>
    </div>
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

.main-view {
  padding: 30px 5%;
}

p {
  word-wrap: break-word;
}
.dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 8px;
    border-radius: 50%;
    background: #2d8cf0;
    position: relative;
    top: 1px;
}
.normal.dot {
    background: #19be6b
}
.warning.dot {
    background: #ff9900
}
.error.dot {
    background: #ed3f14
}
</style>
