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
					<div class="menu">
						<i class="iconfont">&#xe610;</i>
					</div>
				</div>
				<div class="middle">
					<div class="middle-left">
						<div class="singer-name">
							<p class='text'>{{currentSong.singer}}</p>
						</div>
						<div class="cd-wrapper">
							<div class="cd">
								<img v-lazy="currentSong.image" :alt="currentSong.songname">
							</div>
						</div>
					</div>
					<div class="middle-right">
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
		<audio v-bind:src="currentSong.url" ref='audio'></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default{
		name:'player',
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
		},
		watch:{
			currentSong(){
				this.$nextTick(() => {
					this.$refs.audio.play();
				})
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
			display:flex;
			padding:0 16px;
			height:20px;
			justify-content:space-between;
			align-items:center;
			.arrow-down{
				transform:rotateZ(-90deg);
			}
			.arrow-down,.menu{
				flex:0 0 20px;
				.iconfont{
					font-size:20px;
				}
			}
			.song-name{
				text-align:center;
			}
			.song-name{
				flex:0 0 1;
				height:20px;
				line-height:20px;
				font-size:18px;
				@include text-ellipsis;
			}
		}
		.middle{
			position:fixed;
			top:55px;
			bottom:135px;
			width:100%;
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
			.middle-left{
				height:100%;
				width:100%;
			}
			.cd-wrapper{
				position:relative;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				width:86%;
				height:0;
				padding-top:86%;
				border-radius:50%;
				border:8px solid rgba(0,0,0,.3);
				.cd{
					position:absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
					img{
						display:block;
						width:100%;
						height:100%;
						border-radius:50%;
					}
				}
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
