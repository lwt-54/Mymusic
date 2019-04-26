<template>
  <div class="recommend">
    <!-- 轮播图 start -->
    <div class="swiper" v-on:mouseover="stop()" v-on:mouseout="move()">
      <transition-group tag="ul" name="image">
        <li v-for="(item,index) in sliders" :key="item.id" v-show="index===count">
          <a :href="item.linkUrl">
            <img class="img" :src="item.picUrl">
          </a>
        </li>
      </transition-group>

      <div class="spot">
        <span
          v-for="(item,index) in sliders"
          :key="index"
          :class="{'active':index===count}"
          @click="change(index)"
        ></span>
      </div>
    </div>
    <!-- 轮播图 end -->
    <!-- 电台 start -->
    <div class="mod_list radio">
      <h2>电台</h2>
      <ul class="list_container">
        <li v-for="(item,index) in radioLists" :key="index">
          <a href="">
            <div class="list_media">
              <img :src="item.picUrl" alt>
              <span class="icon_play"></span>
            </div>
            <h3>{{item.Ftitle}}</h3>
          </a>
        </li>
      </ul>
    </div>
    <!-- 电台 end -->
    <!-- 热门歌单 start -->
    <div class="mod_list hotList">
      <h2>热门歌单</h2>
      <ul class="list_container">
        <li v-for="(item,index) in songLists" :key="index">
          <a :href="url+item.id">
            <div class="list_media">
              <img :src="item.picUrl" alt="">
              <span class="listen_count"><i></i>{{(item.accessnum/10000).toFixed(1)}}万</span>
              <span class="icon_play"></span>
            </div>
            <div>
              <h3 class="list_tit">{{item.songListDesc}}</h3>
              <p class="list_text">{{item.songListAuthor}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- 热门歌单 end -->
    <!-- 底部信息 start -->
    <footer>
      <div class="version">
        <a href="https://y.qq.com/?ADTAG=myqq&amp;nomobile=1#type=index">查看电脑版网页</a>
      </div>
      <div class="footer_logo"></div>
      <p>Copyright © 1998 - <span>2019</span> Tencent. All Rights Reserved.</p>
      <p>联系电话：0755-86013388 QQ群：55209235</p>
    </footer>
    <!-- 底部信息 end -->
  </div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  name: "Recommend",
  data() {
    return {
      count: 0, //比对图片索引的变量
      timer: null, //定时器
      sliders: [], //轮播图
      radioLists: [], //电台
      songLists: [], //热门歌单
      url:"https://y.qq.com/n/m/detail/taoge/index.html?ADTAG=myqq&from=myqq&channel=10007100&id="
    };
  },
  methods: {
    // 推荐--数据请求
    recommend: function() {
      return axios.get("/recommend").then(res => {
        if (res.status === 200) {
          console.log("recommend=>", res.data.data);
          this.sliders = res.data.data.slider;
          console.log("轮播图=>", this.sliders);
          this.radioLists = res.data.data.radioList;
          console.log("电台=>", this.radioLists);
          this.songLists = res.data.data.songList;
          console.log("热门歌单=>", this.songLists);
        }
      });
    },
    // 轮播图
    autoPlay() {
      this.count++;
      if (this.count === 5) {
        this.count = 0;
      }
    },
    play() {
      this.timer = setInterval(this.autoPlay, 3500);
    },
    change(i) {
      this.count = i;
    },
    stop() {
      clearInterval(this.timer);
    },
    move() {
      this.timer = setInterval(this.autoPlay, 3500);
    }
  },
  created() {
    this.recommend();
    this.play();
  }
};
</script>
<style lang="scss" scoped>
.recommend {
  position: relative;
  width: 100%;
  // 轮播图
  .swiper {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
    margin-bottom: 14px;
    ul {
      width: 100%;
      height: 150px;
    }
    li {
      position: absolute;
    }
    .img {
      display: block;
      width: 100%;
      height: 150px;
    }
    .spot {
      position: absolute;
      bottom: 10px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.5);
        display: inline-block;
        margin: 0 5px;
      }
      .active {
        background: #fff !important;
      }
    }
    .image-enter-active {
      transform: translateX(0);
      transition: all 1.5s ease;
    }
    .image-leave-active {
      transform: translateX(-100%);
      transition: all 1.5s ease;
    }
    .image-enter {
      transform: translateX(100%);
    }
    .image-leave {
      transform: translateX(0);
    }
  }
  // 电台
  .radio{
    h3{
       height: 36px;
        line-height:18px;
    }

  }
  // 电台-热门歌单
  .mod_list {
    margin: 0 10px 7px;
    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .list_container {
      margin-right: -8px;
      // overflow: hidden;
      li {
        float: left;
        width: 50%;
        box-sizing: border-box;
        padding-right: 8px;
        margin-bottom: 10px;
        // overflow: hidden;
      }
      a {
        font-size: 16px;
        color: #000;
        text-decoration: none;
      }
      img {
        width: 100%;
      }
      .list_media{
        position: relative;
      }
      .icon_play{
        position: absolute;
        right: 5px;
        bottom: 5px;
        display: block;
        width: 24px;
        height: 24px;
        background: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218);
        background-repeat: no-repeat;
        background-size: 24px 60px;
      }
      h3,p{
        white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
        font-size: 14px;
        padding:0 7px 5px;
      }
    }
  }
  // 热门歌单
  .hotList{
    .listen_count{
      position:absolute;
      left: 5px;
      bottom: 7px;
      color: #fff;
      line-height: 12px;
      font-size:12px;
      i{
        display: inline-block;
        width:10px;
        height: 10px;
        background: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218);
        background-position: 0 -50px;
        background-repeat: no-repeat;
        background-size: 24px 60px;
        margin-right:5px;
      }
    }
    .list_tit{
      line-height: 20px;

    }
    p.list_text{
      font-size: 12px;
    }
  }
  footer{
    .version{
      text-align: center;
      margin: 0 auto;
      margin-bottom: 16px;
      a{
        font-size: 14px;
        color:#000;
        text-decoration: none;
      }
    }
    .footer_logo{
      width: 82px;
      height: 24px;
      margin: 0 auto 10px;
      background: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo_footer.png?max_age=2592000&v=0b997108f6088df4b8f515bf4d4869cb);
  background-repeat: no-repeat;
  background-size: cover;

    }
    p{
      line-height:18px;
      font-size: 10px;
      text-align: center;
      color: rgba(0, 0, 0, 0.6);
    }

  }
}
</style>