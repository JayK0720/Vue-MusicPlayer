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
							<div class="cd" :class='cdClass'>
								<img v-lazy="currentSong.image" :alt="currentSong.songname">
							</div>
						</div>
					</div>
					<div class="middle-right">
					</div>
				</div>
				<div class="bottom">
					<div class="progress-wrap">
						<span class="current time">{{format(currentTime)}}</span>
						<div class="progress-bar">
							<ProgressBar :percent='percent' @percentChange='handleSliderEnd'/>
						</div>
						<span class="total time">{{format(currentSong.duration)}}</span>
					</div>
					<div class="operator-wrap">
						<div class="mode" @click.prevent='handleCheckPlayMode'>
							<i class="iconfont" v-if='mode === 0'>&#xe674;</i>
							<i class="iconfont" v-else-if='mode === 1'>&#xe718;</i>
							<i class="iconfont" v-else='mode === 2'>&#xe612;</i>
						</div>
						<div class="prev" @click='handlePrev'>
							<i class="iconfont">&#xe602;</i>
						</div>
						<div class="play" @click='handleTogglePlaying'>
							<template v-if='!playing'>
								<i class="iconfont">&#xe652;</i>
							</template>
							<template v-else>
								<i class="iconfont">&#xe603;</i>
							</template>
						</div>
						<div class="next" @click='handleNext'>
							<i class="iconfont">&#xe619;</i>
						</div>
						<div class="collect">
							<i class="iconfont">&#xe61a;</i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- <Audio :url='currentSong.url' ref='audio'/> -->
		<audio 
			v-bind:src="currentSong.url" 
			ref='audio'
			@canplay='ready'
			@error='error'
			@timeupdate='timeupdate'
		></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	import ProgressBar from '@/base/progress-bar'
	import {playMode} from '@/common/js/config'
	export default{
		name:'player',
		data() {
			return {
				flag:false,
				currentTime:0
			}
		},
		components:{ProgressBar},
		computed:{
			...mapGetters([
					'fullScreen',
					'playList',
					'currentSong',
					'playing',
					'currentIndex',
					'mode'
				]),
			cdClass(){
				return this.playing? 'play' : 'pause'
			},
			percent(){
				return this.currentTime / this.currentSong.duration;
			}
		},
		methods:{
			...mapMutations({
				foldFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_MODE'
			}),
			handleFold(){
				this.foldFullScreen(false);
			},
			handleTogglePlaying(){
				if(!this.flag) return;
				// playing 是getters里获取到的playing 状态, 点击播放按钮切换播放状态
				this.setPlayingState(!this.playing);
			},
			handlePrev(){
				// 点击播放上一首
				if(!this.flag) return;
				let index = this.currentIndex - 1;
				if(index === -1){
					index = this.playList.length - 1;
				}
				this.setCurrentIndex(index);
				this.setPlayingState(true);
				this.flag = false;
			},
			handleNext(){
				if(!this.flag) return;
				// 点击播放下一首,当index改变的时候,currentSong就会修改
				let index = this.currentIndex + 1;
				if(index === this.playList.length){
					index = 0;
				}
				this.setCurrentIndex(index);
				this.setPlayingState(true);
				this.flag = false;
			},
			handleSliderEnd(percent){
				this.$refs.audio.currentTime = percent * this.currentSong.duration;
				if(!this.playing){
					this.setPlayingState(true);
				}
			},
			handleCheckPlayMode(){
				
			},
			ready(){
				this.flag = true;
			},
			error(){
				this.flag = true;
			},
			timeupdate(e){
				this.currentTime = e.target.currentTime;
			},
			format(interval){
				let minute = Math.floor(interval / 60);
				let second = this.padzero(interval % 60 | 0 );
				return `${minute}:${second}`;
			},
			padzero(num){
				let length = num.toString().length;
				return ('00' + num).substring(length);
			}
		},
		watch:{
			currentSong(){
				this.$nextTick(() => {
					this.$refs.audio.play();
				}) 
			},
			playing(state){
				this.$nextTick(() => {
					const audio = this.$refs.audio;
					state ? audio.play() : audio.pause();
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
		background-color:#232323;
		color:#ffffff;
		.player-background{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			opacity:0.4;
			z-index:-1;
			filter:blur(25px);
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
				position:relative;
				height:100%;
				width:100%;
			}
			.cd-wrapper{
				position:absolute;
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
					&.play{
						animation:rotate 20s linear infinite;
						animation-play-state:run;
					}
					&.pause{
						animation:rotate 20s linear infinite;
						animation-play-state:paused;
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
				margin:0 auto;
				height:45px;
				width:90%;
				line-height:45px;
				align-items:center;
				.time{
					flex:0 0 36px;
					width:36px;
					color:#fff;
					font-size:12px;
				}
				.current{
					text-align:left;
				}
				.total{
					text-align:right;
				}
				.progress-bar{
					flex:1;
					height:2px;
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
	/*图片旋转动画*/
	@keyframes rotate{
		0%{
			transform:rotateZ(0deg);
		}
		100%{
			transform:rotateZ(360deg);
		}
	}
</style>
