<template>
	<div class="player" v-show='playList.length > 0'>
		<transition name='slide'>
			<div class="full-screen-player" v-show='fullScreen'>
				<div class="player-background">
					<img v-bind:src="currentSong.image" alt="" width='100%' height='100%'>
				</div>
				<div class="top">
					<div class="arrow-down" @touchstart.stop='handleFold'>
						<i class="iconfont">&#xe721;</i>
					</div>
					<h1 class="song-name">{{currentSong.songname}}</h1>
					<div class="singer-name">
						<p class='text'>{{currentSong.singer}}</p>
					</div>
				</div>
				<div class="middle">
					<div class="cd-wrapper">
						<img v-lazy="currentSong.image" :alt="currentSong.songname" width='315' height='315'>
					</div>
				</div>
				<div class="bottom">
					<div class="progress-wrap">
						<span class="current">01:58</span>
						<div class="progress-bar"></div>
						<span class="total">04:04</span>
					</div>
					<div class="operator-wrap">
						<div class="mode">
							<i class="iconfont">&#xe612;</i>
						</div>
						<div class="prev">
							<i class="iconfont">&#xe602;</i>
						</div>
						<div class="play">
							<i class="iconfont">&#xe652;</i>
						</div>
						<div class="next">
							<i class="iconfont">&#xe619;</i>
						</div>
						<div class="collect">
							<i class="iconfont">&#xe61a;</i>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default{
		name:'player',
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(['fullScreen','playList','currentSong'])
		},
		methods:{
			...mapMutations({
				foldFullScreen:'SET_FULL_SCREEN',
			}),
			handleFold(){
				this.foldFullScreen(false);
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '@/common/scss/mixin.scss';
	.full-screen-player{
		position:fixed;
		left:0;
		bottom:0;
		top:0;
		right:0;
		z-index:200;
		background-color:#333;
		color:#ffffff;
		.player-background{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			opacity:0.5;
			z-index:-1;
			filter:blur(20px);
		}
		.top{
			margin-top:30px;
			position:relative;
			height:78px;
			.arrow-down{
				left:10px;
				position:absolute;
				transform:rotateZ(-90deg);
				width:30px;
				height:28px;
				z-index:210;
				.iconfont{
					text-align:center;
					font-size:28px;
				}
			}
			.song-name,.singer-name{
				text-align:center;
			}
			.song-name{
				padding:0 50px;
				height:28px;
				line-height:28px;
				font-size:16px;
				@include text-ellipsis;
			}
			.singer-name{
				display:flex;
				padding:0 10px;
				height:44px;
				font-size:14px;
				justify-content:center;
				align-items:center;
				flex:1;
				.text{
					padding:0 8px;
					@include text-ellipsis;
				}
			}
			.singer-name:before,.singer-name:after{
				content:'';
				display:block;
				flex:0 0 18px;
				width:18px;
				height:1px;
				background-color:#ffffff;
			}
		}
		.middle{
			position:fixed;
			top:122px;
			bottom:135px;
			width:100%;
			.cd-wrapper,.cd-wrapper>img{
				border-radius:50%;
			}
			.cd-wrapper{
				margin:0 auto;
				width:315px;
				height:315px;
				border:7px solid rgba(0,0,0,0.2);
			}
		}
		.bottom{
			position:absolute;
			bottom:30px;
			width:100%;
			.progress-wrap{
				display:flex;
				height:45px;
				line-height:45px;
				align-items:center;
				.total,.current{
					padding:0 10px;
					color:#fff;
					font-size:14px;
				}
				.progress-bar{
					flex:1;
					height:2px;
					background-color:#87837d;
				}
			}
			.operator-wrap{
				display:flex;
				height:54px;
				color:#fff;
				align-items:center;
				justify-content:space-around;
				.mode,.collect{
					.iconfont{
						font-size:24px;
					}
				}
				.play{
					.iconfont{
						font-size:40px;
					}
				}
				.prev,.next{
					.iconfont{
						font-size:30px;
					}
				}
			}
		}
	}
	.slide-enter-active,.slide-leave-active{
		transition:all .3s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(0,100%,0);
	}
</style>
