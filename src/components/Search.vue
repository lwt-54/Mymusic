<template>
  <!-- 热门搜索 -->
  <div class="search">
    <!-- 搜索框 start -->
    <div class="search_bar">
      <div class="search_cont">
        <form action="#">
          <input
            type="search"
            placeholder="搜索歌曲、歌单、专辑"
            @click="searchBtn"
            :val="songname"
            @input="songnames"
            @keyup.enter="runclick"
          >
          <span class="icon_search" @click="runclick">搜索</span>
          <span class="icon_delete" v-show="hide">删除</span>
        </form>
      </div>
      <div class="search_tip" v-show="hide" @click="cancelBtn">取消</div>
    </div>
    <!-- 搜索框 end -->
    <!-- 搜索记录 start -->
    <div class="search_resord">
      <ul>
        <li>
          <a href class="record_main">
            <span class="icon icon_clock"></span>
            <span class="recond_con"></span>
            <span class="icon icon_close"></span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 搜索记录 end  -->
    <!-- 热门搜索 start -->
    <div class="hot_key" v-show="show">
      <h3>热门搜索</h3>
      <div class="result_tags" @click="hotsongbtn">
        <a class="tag_s tag_hot" href="javascript:;">{{specialkey.special_key}}</a>
        <a
          class="tag_s"
          v-for="(item,index) in hotkey"
          :key="index"
          href="javascript:;"
         
        >{{item.k}}</a>
        <!-- @click="addQuery(item.k)" -->
      </div>
    </div>
    <!-- 热门搜索 end -->
    <!-- 搜索到内容列表展示 start -->
    <div class="search_content">
      <ul>
        <li v-for="(item,index) in musicstr" :key="index" @click="playbtn(item,index)">
          <i class="icon"></i>
          <h6 class="songname">{{item.songname}}</h6>
          <p class="singername">{{item.singername}}</p>
        </li>
      </ul>
    </div>
    <!-- 搜索到内容列表展示 end -->
    <playpage
      :musiclls="musiclrc"
      :pigimg="pigimg"
      :titleitem="titleitem"
      :musicurls="musicurl"
      :btnmusic="btnmusic"
      @closemusic="closemusic"
    ></playpage>
  </div>
</template>
<script>
import axios from "axios";
import Playpage from "./Playpage";
export default {
  name: "Search",
  data() {
    return {
      show: true, //显示
      hide: false, //隐藏
      specialkey: [], //特别热门键
      hotkey: [], //热门按键
      songname: "",
      musicstr: {},
      titleitem: {},
      musicurl: null,
      btnmusic: false,
      pigimg: null,
      musiclrc:null
    };
  },
  components: {
    Playpage
  },
  methods: {
    // 数据请求 --热键
    gethotkey: function() {
      return axios.get("/gethotkey").then(res => {
        if (res.status === 200) {
          console.log(res.data.data);
          this.specialkey = res.data.data;
          this.hotkey = res.data.data.hotkey.slice(0, 7);
        }
      });
    },
    // 点击 <input>
    searchBtn() {
      this.hide = true;
      this.show = false;
    },
    // 点击 取消按钮
    cancelBtn: function() {
      this.hide = false;
      this.show = true;
    },
    // 输入搜索词
    songnames(el) {
      if (el.target.value === "") {
        this.show = true;
      }
      this.songname = el.target.value;
      console.log(this.songname);
    },
     // 获取对应音乐
    playbtn: function(item, index) {
      console.log(item);
      this.$axios
        .get("/api/musiclist", {
          params: {
            r: "play/getdata",
            hash: this.musicstr[index].hash,
            album_id: this.musicstr[index].album_id,
            _: 1497972864535
          }
        })
        .then(res => {
          this.titleitem = JSON.parse(res.data.text).data;
          this.musicurl = JSON.parse(res.data.text).data.play_url;
          this.btnmusic = true;
          console.log("==", this.titleitem, "==>", this.musicurl);
        });
    },
    // 点击<input>输入关键词搜索歌曲
    runclick: function() {
      if (this.songname !== "") {
        console.log("歌名：", this.songname);
         this.$axios
          .get("/api/search", {
            params: {
              format: "json",
              keyword: this.songname,
              page: 1,
              pagesize: 20,
              showtype: 1
            }
          })
          .then(res => {
            console.log(res);
            this.musicstr = JSON.parse(res.data.text).data.info;
            console.log("搜索到的歌曲：", this.musicstr);
          });
        this.show = false;
      } else {
        this.show = true;
      }
    },
   
     // 关闭音乐播放按钮
    closemusic() {
      this.btnmusic = false;
    },
    // 热门歌曲
    hotsongbtn: function(e) {
      if (e.target.localName !== "div") {
        e.path[3].children[0].firstChild.value = e.target.textContent;
        this.songname = e.target.textContent;
        this.runclick();
      }
    }
    // addQuery: function(item) {
    //   this.query = item;
    //   console.log(this.query);
    // }
  },
  created() {
    this.gethotkey();
  }
};
</script>
<style lang="scss" scoped>
.search {
  padding-bottom: 15px;
  // 搜索框
  .search_bar {
    background: #f4f4f4;
    padding: 10px;
    display: -webkit-box;
    // 水平从左向右排列
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    .search_cont {
      position: relative;
      flex: 1;
      height: 20px;
      padding: 8px 12px 8px 35px;
      background: #fff;
    }
    input {
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.3);
      border: none;
      font-size: 14px;
      outline: none;
    }
    .icon_search {
      position: absolute;
      top: 9px;
      left: 10px;
      width: 18px;
      height: 18px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZjUzNjE3YS0yODYxLTkwNDUtYTU3MS0wZjY3N2I4ZjcxY2MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTdDRjRGMjY3MzE4MTFFNThFMDE4OEE4MDY3MERGOEMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTdDRjRGMjU3MzE4MTFFNThFMDE4OEE4MDY3MERGOEMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNlNzM5N2M4LWRiMGItODQ0Zi1iOWYxLTFlNWJjNTAxMWY2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpiZjUzNjE3YS0yODYxLTkwNDUtYTU3MS0wZjY3N2I4ZjcxY2MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6uN3S5AAACj0lEQVR42syYTUgUYRjH10jKTSEswaiwQrQOm57Uyo3yVBEi4kHPKpgn01N+XJTVg26GCKVF1zqkIBJ421Sk8iSphwUREQQh7aSWXrb/Q/+BYcid950Pdwd+PLOzM+/8eOaZmeedjFgsFkin5VQgzZbTmvuXgjpQCYpAHrf/BHGwAD6BJb+FHoAIuHvM/5eI7NdFsW7wxetLFgTvQIwyO2AUPAWF4Bwp5Db5bxfc4zHjIEtHKCNJUV8An0E5OAD94BXYtxlTBNuYKZH5RtldNxkKmmTWGSMKMgHuI/uWgQ1QwbGCboRGKLHG9K84qM8VFv8axxp2KvQQNILfoAZsu7iLt0Atx2oG950IRRj7wKoHj5ZlMCD1yqglJM+ZO7ybRjx83g2zqOVOLdERqmX8qFjAqssexzSfQ0kozDjjw1thxnIOJaFixh8+CMUZb+kIXWTc9kHIGDM3Xd72R4wJHaEdxnwfhPIt51ASMq5ziQ9Cty3nUBKaZ3zkg9BjyzmUhCYZ60G2hzIyVgPXJ3SElthcSevx3EMhGes8mOOrROsu6+Kd8AKEPJCReuzkmN1OXq6z4C2bqylwxYXMVTANzoIxu/pJ9hySFH8H1zlIyGFm5iklTV67mwZNWtYn4Cu4BhaZbpVCzwE9bF0LuO0GeOa2yf8FqpjqM+yPNsFrUA1u8uQ5XK/mf7JPL495A1pZP1GVLNlNg/6AFvCBQmH+brE5bo4ZNWrmkLOXKH+/dDsvm2X7GWI/E2axXwaZfB3EKTLxnx78PaOtlO7MddnuOZJkUZI66bm9SDWZaqrDbYa8kjIyNcT1aCqFkkql8nOM+fINcsaTsgxZMxU0PuGkWsgs9e/rRyKRSKsvaH8FGAAtc45viyHBdwAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: cover;
      text-indent: -999px;
    }
    .icon_delete {
      position: absolute;
      top: 9px;
      right: 12px;
      width: 18px;
      height: 18px;
      background: #b1b1b1;
      text-indent: -999px;
      border-radius: 9px;
    }
    .icon_delete:before {
      width: 10px;
      height: 2px;
      margin-left: -5px;
      margin-top: -1px;
    }

    .icon_delete:before,
    .icon_delete:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      border-radius: 8px;
      background: #fff;
      transform: rotate(45deg);
    }
    .icon_delete:after {
      width: 2px;
      height: 10px;
      margin-left: -1px;
      margin-top: -5px;
    }
    .search_tip {
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      font-size: 14px;
    }
  }
  // 搜索记录
  // .search_resord{
  // 	background:#fff;
  // 	li{
  // 		border-top: 1px solid #ededed;
  // 		padding: 0 15px;
  // 	}
  // 	li:last-child{
  // 		border-bottom: 1px solid #ededed;
  // 	}
  // 	.record_main{
  // 		position:relative;
  // 		display: block;
  // 		height: 44px;
  // 		line-height: 44px;
  // 		text-decoration: none;
  // 	}
  // }
  // 热门搜索
  .hot_key {
    background: #fff;
    padding: 15px 15px 10px 15px;
    h3 {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 8px;
    }
    .result_tags {
    }
    a.tag_hot {
      color: #fc4524;
      border-color: #fc4524;
    }
    .tag_s {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      color: #000;
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 99px;
      font-size: 14px;
      padding: 0 10px;
      margin-bottom: 10px;
      margin-right: 14px;
      text-decoration: none;
    }
  }
  // 搜索内容列表
  .search_content {
    width:100%;
    li{
      position:relative;
      height:55px;
      padding-left:56px;
      border-top:1px solid #ddd;
      overflow:hidden;
      
    }
    .icon{
      position:absolute;
      top:18px;
      left:18px;
      width:22px;
      height:22px;
      background:url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/search_sprite.png?max_age=2592000&v=87848a61828f15e8f0a517b10e67cd2f);
      background-repeat: no-repeat;
      background-size:22px 30px;
    }
    .songname{
      margin:10px 0 2px;
      line-height:18px;
      font-size:16px;
      font-weight:400;
      color:#000;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .singername{
      font-size:12px;
      color:grey;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
}
</style>