<template>
  <div id="app">
    <!-- <loading v-if="isLoading"></loading> -->
   <header>
      <div class="top">
      <img src="./assets/logo.png" alt>
      <a href>下载</a>
    </div>
   </header>
    <nav class="navbar">
      <router-link to="/recommend">推荐</router-link>
      <router-link to="/toplist">排行榜</router-link>
      <router-link to="/search">搜索</router-link>
    </nav>

    <!-- 路由匹配到的组件将显示在这里 -->
    <router-view/>
  </div>
</template>

<script>
import Loading from './public/Loading'
export default {
  name: "App",
  components:{
    Loading
  },
  data(){
    return {
      // isLoading:true
    }
  }
};
</script>

<style>
#app{
  width: 100%;
  overflow: hidden;
}
/* 顶部 */
header{
  position: relative;
  left:0;
  top:0;
  display: block;
  height: 80px;
  background:white;
}
.top {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
  display: -webkit-box;
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  height: 80px;
  padding: 0 10px;
  background: #31c27c;
}
.top img {
  display: block;
  height: 35px;
}
.top a {
  display: block;
  min-width: 45px;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border: solid 1px rgba(230, 225, 225, 0.3);
  border-radius: 25px;
  text-decoration: none;
}
/* 导航 */
.navbar{
  display:-webkit-box;
}
.navbar a{
  -webkit-box-flex: 1;
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  color: #000;
}
.router-link-active {
        color: #31c27c;
        border-bottom: 2px solid #31c27c;
      }

</style>
