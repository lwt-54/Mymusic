<template>
    <div class="song_info" v-if="btnmusic">
		<img class="bgimg" :src="titleitem.img" width="400px" height="400px">
		<div class="bgcolor"></div>
		<div class="btn">
			<i class="drop" @click="close"></i>
			<i class="upglide"></i>
		</div>
		<div class="musicname">
			<p class="title">{{titleitem.song_name}}</p>
			<p class="singername"><font style="margin-right: 3px;">-</font>{{titleitem.author_name}}<font style="margin-left: 3px;">-</font></p>
		</div>
		<div class="btn_con">
			<a class="standard" href="javascript:;">标准<i></i></a>
			<a class="sound" href="javascript:;">音效<span>off</span></a>
			<a href="javascript:;">视频</a>
		</div>
		<div class="contant">
			<div class="imgbox">
				<img :src="titleitem.img" width="200px" height="200px">
			</div>
		</div>
		<!-- 歌曲播放，上一首，下一首 -->
		<div class="play_list">
			<i class="on_btn"></i>
			<audio class="play" autoplay controls="controls">
				<source :src="musicurls">
			</audio>
			<i class="next_btn"></i>
		</div>
		<div class="song_bottom">
			<i class="uncollect"></i>
			<i class="down"></i>
			<i class="forward" @click="forwardbox"></i>
			<i class="comment"></i>
			<div v-if = "forwardshow" class="forwardcon">
				<i class="qqfriend"></i>
				<i class="qqspace"></i>
				<i class="wechat"></i>
				<i class="moments"></i>
				<i class="sina"></i>
				<a class="cancel" href="javascript:;" @click="cancel">取消</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    name:'Playpage',
    props: ['btnmusic', 'titleitem', 'musicurls'],
    data(){
        return{
            url: '',
				forwardshow: false
        }
    },
    methods:{
        close:function() {
				this.$emit('closemusic', this.btnmusic)
            },
        forwardbox() {
				this.forwardshow = true
			},
			cancel() {
				this.forwardshow = false
			}
    },
    created(){

    }
}
</script>
<style lang="scss" scoped>
    $rotates:rotate(0deg);
		.song_info{
			position:fixed;
			// position: absolute;
			top:0px;
			z-index:300;
			width:100%;
			height:100%;
			background-color: rgba(7,17,27,0.3);
			.bgimg{
				position:absolute;
				z-index:20;
				display:inline-block;
				width:400px;
				height:100%;
				transform:scale(1.7);
				filter:blur(10px);
			}
			.bgcolor{
				position:absolute;
				top:0px;
				width:100%;
				height:100%;

			}
			.btn{
				position:relative;
				z-index:40;
				width:100%;
				.drop{
					position: absolute;
					top: 10px;
					left: 10px;
					display: inline-block;
					width: 30px;
					height: 30px;
					background: url("../assets/img/drop.png");
					background-size: 100%;
					background-repeat: no-repeat;
				}
				.upglide{
					position: absolute;
					top: 10px;
					right: 10px;
					display: inline-block;
					width: 30px;
					height: 30px;
					background: url("../assets/img/upglide.png");
					background-size: 100%;
					background-repeat: no-repeat;
				}
			}
			.musicname{
				position:relative;
				z-index: 30;
				width:100%;
				margin-top: 30px;
				// background-color:rgba(7,17,27,0.6);
				.title{
					width:100%;
					text-align:center;
					font-size:20px;
					line-height: 24px;
					color:#fff;
					overflow:hidden;
				}
				.singername{
					width:100%;
					font-size: 16px;
					line-height: 24px;
					text-align:center;
					color:#fff;
					position: relative;
				}
				// .singername:before, .singername:after{
				// 	content: '';                 /*CSS伪类用法*/
				// 	position: absolute;         /*定位背景横线的位置*/
				// 	top: 52%;
				// 	background: #fff;       /*宽和高做出来的背景横线*/
				// 	width: 5%;
				// 	height: 1px;
				// }
				// .singername:before{
				// 	left: 38%;        /*调整背景横线的左右距离*/
				// }
				// .singername:after {
				// 	right: 38%;
				// }
			}
			.btn_con{
				position: relative;
				z-index: 40;
				text-align: center;
				margin-top: 20px;
				a{
					display: inline-block;
					text-decoration: none;
					color: #fff;
					font-size: 14px;
					border: 1px solid #fff;
					padding: 3px 5px;
					border-radius: 5px;
				}
				.standard{
					i{
						display: inline-block;
						width: 10px;
						height: 10px;
						margin-left: 3px;
						background-image: url("../assets/img/drop.png");
						background-size: 100%;
						background-repeat: no-repeat;
						vertical-align: bottom;
					}
				}
				.sound{
					span{
						font-size: 10px;
						margin-left: 3px;
					}
				}
			}
			.contant{
				position:relative;
				z-index:100;
				width:100%;
				overflow:hidden;

				.imgbox{
					width:100%;
					transition:all 2s linear;
					transform:$rotates;
					animation: run 30s linear infinite;
					img{
						position:relative;
						left:50%;
						margin-left:-100px;
						margin-top:30px;
						margin-bottom:30px;
						border-radius:50%;
					}

				}
				@keyframes run{
					0%{
						transform:rotate(0deg);
					}
					100%{
						transform:rotate(360deg);
					}
				}
			}

			.play_list{
				position:relative;
				bottom: -90px;
				display:flex;
				z-index: 40;
				width:100%;
				margin:30px 0;
				.on_btn{
					display: inline-block;
					width: 30px;
					height: 30px;
					margin-left: 3px;
					background-image: url("../assets/img/on.png");
					background-size: cover;
					background-repeat: no-repeat;
				}
				.play{
					border: none;
					height:44px;
				}
				.next_btn{
					display: inline-block;
					width: 30px;
					height: 30px;
					margin-left: 3px;
					background-image: url("../assets/img/next.png");
					background-size: cover;
					background-repeat: no-repeat;
				}
			}
			.song_bottom{
				position: relative;
				bottom: -110px;
				z-index: 40;
				display: flex;
				justify-content: space-between;
				padding: 10px;
				i{
					display: inline-block;
					width: 46px;
					height: 46px;

				}
				.uncollect{
					background-image: url("../assets/img/player.png");
					background-position: 0 -190px;
					background-repeat: no-repeat;
				}
				.collect{
					background-image: url("../assets/img/player.png");
					background-position: -60px -190px;
					background-repeat: no-repeat;
				}
				.down{
					background-image: url("../assets/img/player.png");
					background-position: 0 -240px;
					background-repeat: no-repeat;
				}
				.forward{
					background-image: url("../assets/img/forward.png");
					background-size: cover;
					background-repeat: no-repeat;
				}
				.comment{
					width: 48px;
					background-image: url("../assets/img/player.png");
					background-position: -58px -800px;
					background-repeat: no-repeat;
				}
				.forwardcon{
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					text-align: center;
					padding: 10px 0;
					z-index: 50;
					background-color: rgba(7,17,27,0.9);
					i{
						display: inline-block;
						width: 36px;
						height: 36px;
						border-radius: 50%;
						margin: 15px;
					}
				}
				// &>.forwardcon{
				// 	transition: all 2s linear;
				// }
				.qqfriend{
					background: url("../assets/img/forward.jpg") -24px -24px no-repeat;
				}
				.qqspace{
					background: url("../assets/img/forward.jpg") -92px -25px no-repeat;
				}
				.wechat{
					background: url("../assets/img/forward.jpg") -24px -110px no-repeat;
				}
				.moments{
					background: url("../assets/img/forward.jpg") -92px -110px no-repeat;
				}
				.sina{
					background: url("../assets/img/forward.jpg") -163px -110px no-repeat;
				}
				.cancel{
					display: inline-block;
					width: 100px;
					text-align: center;
					font-size: 30px;
					text-decoration: none;
					color: #fff;
					border: 1px solid #ccc;
					border-radius: 10px;
					padding: 5px;
					margin: 10px;
				}
			}
		}
</style>
