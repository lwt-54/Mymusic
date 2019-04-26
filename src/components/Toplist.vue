<template>
  <!-- 排行榜 start -->
  <div class="topic">
    <ul>
      <li class="topic_item" v-for="(item,index) in topLists" :key="index">
        <div class="topic_main">
          <a href="javascript:;">
            <img :src="item.picUrl" alt>
            <span class="listen_count">
              <i></i>
              {{(item.listenCount/10000).toFixed(1)}}万
            </span>
          </a>
          <div class="topic_info">
            <div class="topic_cont">
              <h3>{{item.topTitle}}</h3>
              <p v-for="(items,index) in item.songList" :key="index">
                {{index+1}}
                <span>{{items.songname}}</span>
                - {{items.singername}}
              </p>
            </div>
            <i class="topic_arrow"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- 排行榜 end -->
</template>
<script>
import axios from "axios";
export default {
  name: "Toplist",
  data() {
    return {
      topLists: []
    };
  },
  methods: {
    toplist: function() {
      return axios.get("/toplist").then(res => {
        if (res.status === 200) {
          // console.log(res.data);
          // 截取数据
          let num1 = res.data.indexOf("(");
          let num2 = res.data.length - 1;
          let resultData = JSON.parse(res.data.substring(num1 + 1, num2));
          // console.log(typeof(resultData))
          console.log(resultData);
          this.topLists = resultData.data.topList;
          console.log(this.topLists);
        }
      });
    }
  },
  created() {
    this.toplist();
  }
};
</script>
<style lang="scss" scoped>
.topic {
  margin: 10px;
  padding-bottom: 55px;
  .topic_item {
    margin-bottom: 10px;
    background: white;
	overflow: hidden;
	display: list-item;
    .topic_main {
      display: flex;
    }
    a {
      position: relative;
      display: block;
      width: 100px;
      height: 100px;
      img {
        display: block;
        width: 100px;
        height: 100px;
        color: #ccc;
      }
      .listen_count {
        position: absolute;
        left: 5px;
        bottom: 7px;
        z-index: 10;
        line-height: 12px;
        color: #fff;
        opacity: 0.6;
        font-size: 10px;
        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218);
          background-position: 0 -50px;
          background-repeat: no-repeat;
          background-size: 24px 60px;
          z-index: 10;
          margin-right: 3px;
        }
      }
    }
    .topic_info {
		position:relative;
		display: flex;
		flex: 1;
		box-align: center;
		box-pack: center;
		overflow: hidden;
    }
	.topic_cont{
		flex: 1;
		margin: 0 10px 0 15px;
		overflow: hidden;
		h3{
			line-height: 24px;
			font-size: 16px;
			margin-bottom: 5px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		p{
			width: 100%;
			line-height: 20px;
			font-size: 14px;
			color: rgba(0, 0, 0,0.5);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		span{
			color:#000;
			margin:0 5px 0 8px;
		}
	}
	.topic_arrow{
		position: absolute;
		right: 10px;
		top:50%;
		margin-top: -4px;
		display: block;
		width: 6px;
		height:6px;
		border-right: 1px solid #b2b2b2;
		border-bottom: 1px solid #b2b2b2;
		transform: rotate(-45deg);
	}
  }
}
</style>