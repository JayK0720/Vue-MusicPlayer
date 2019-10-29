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
				<div class="middle"
					@touchstart.prevent='handleSlideStart'
					@touchmove.prevent='handleSlideMove'
					@touchend='handleSlideEnd'
				>
					<div class="slide-left" ref='left'>
						<div class="singer-name">
							<p class='text'>{{currentSong.singer}}</p>
						</div>
						<div class="cd-wrapper">
							<div class="cd" :class='cdClass'>
								<img v-lazy="currentSong.image" :alt="currentSong.songname">
							</div>
						</div>
					</div>
					<div class="slide-right" ref='lyric'>
						<template v-if='currentLyric'>
							<div class="lyric-wrapper" ref='lyricWrapper'>
								<template v-if='currentLyric.lines.length'>
									<p
										v-for='(item,index) in currentLyric.lines'
										class='lyric-text'
										:class='{active: number === index}'
									>{{item.txt}}</p>
								</template>
								<template v-else>
									<p>暂无歌词</p>
								</template>
							</div>
						</template>
						<Loading v-show="(currentPage === 'lyric') && !currentLyric "/>
					</div>
				</div>
				<div class="bottom">
					<div class="dot-wrapper">
						<span class="dot" :class="{active:currentPage === 'cd'}"></span>
						<span class="dot" :class="{active:currentPage === 'lyric'}"></span>
					</div>
					<div class="progress-wrap">
						<span class="current time">{{format(currentTime)}}</span>
						<div class="progress-bar">
							<ProgressBar :percent='percent' @percentChange='handleSliderEnd'/>
						</div>
						<span class="total time">{{format(currentSong.duration)}}</span>
					</div>
					<div class="operator-wrap">
						<div class="mode" @click.prevent='handleCheckPlayMode'>
							<i class="iconfont" v-if='mode===0'>&#xe674;</i>
							<i class="iconfont" v-else-if='mode===1'>&#xe622;</i>
							<i class="iconfont" v-else='mode===2'>&#xe612;</i>
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
			@ended='end'
		></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	import ProgressBar from '@/base/progress-bar'
	import {playMode} from '@/common/js/config'
	import {shuffle} from '@/common/js/util.js'
	import Lyric from 'lyric-parser'
	import {prefixStyle} from '@/common/js/dom'
	import Scroll from '@/base/scroll'
	import Loading from '@/base/loading'
	let transform = prefixStyle('transform')
	let transitionDuration = prefixStyle('transitionDuration');
	const TIME = 250;
	const HEIGHT = 32;
	export default{
		name:'player',
		data() {
			return {
				flag:false,
				currentTime:0,
				currentLyric:null,
				currentPage:'cd',
				number:-1
			}
		},
		components:{ProgressBar,Scroll,Loading},
		computed:{
			...mapGetters([
					'fullScreen',
					'playList',
					'currentSong',
					'playing',
					'currentIndex',
					'mode',
					'sequenceList'
				]),
			cdClass(){
				return this.playing? 'play' : 'pause'
			},
			percent(){
				return this.currentTime / this.currentSong.duration;
			},
		},
		created(){
			this.touch = {}
		},
		methods:{
			...mapMutations({
				foldFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_MODE',
				setPlayList:'SET_PLAY_LIST'
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
				if(!this.flag){
					this.setPlayingState(false);
					return;
				}
				if(this.playList.length === 1){
					this.loop();
				}else{
					let index = this.currentIndex - 1;
					if(index === -1){
						index = this.playList.length - 1;
					}
					this.setCurrentIndex(index);
					this.setPlayingState(true);	
				}
				this.flag = false;
			},
			handleNext(){
				if(!this.flag) {
					this.setPlayingState(false);
					return;
				}
				/*
				点击播放下一首,当index改变的时候,currentSong就会修改
				如果播放列表只有一条歌曲,那么点击下一曲的时候,currentSong不会修改，此时调用loop方法
				*/ 
			   if(this.playList.length === 1) {
				   this.loop();
			   }else{
				   let index = this.currentIndex + 1;
				   if(index === this.playList.length){
				   	index = 0;
				   }
				   this.setCurrentIndex(index);
				   this.setPlayingState(true);
			   }
				this.flag = false;
			},
			handleSliderEnd(percent){
				let currentTime = percent * this.currentSong.duration;
				this.$refs.audio.currentTime = currentTime;
				if(!this.playing){
					this.setPlayingState(true);
				}
				this.number = 0;
				const _this = this;
				(function skip(){
					if(_this.number > _this.currentLyric.lines.length -1) return;
					if(currentTime*1000 > _this.currentLyric.lines[_this.number].time){
						_this.number++;
						skip();
					}
				})();
			},
			end(){
				if(this.mode === playMode.loop){
					this.loop();
					this.$refs.left.style['top'] = 0;
					this.number = -1;
				}else{
					this.handleNext();
				}
			},
			loop(){
				this.$refs.audio.currentTime = 0;
				this.$refs.audio.play();
			},
			/*
			在切换歌曲播放模式的时候,当前播放的歌曲在新的播放列表里的位置已经修改了，找到此时播放歌曲在新的播放列表里的位置,然后
			修改index.
			
			todo:1
			1. 点击歌曲的时候，设置了当前的播放列表 playList 以及 sequenceList, currentIndex, currentSong 来自playList[currentIndex]
			2. 当切换播放模式为随机播放的时候, 修改了playList, 此时playList 和 循环列表播放的playList 不同
			3. 切换播放模式后，再次点击播放列表里的歌曲时,比如点击的为第1首歌曲,由于playList已经修改，此时的currentSong 和 渲染的播放列表歌曲不同。
			
			todo:2 此时切换歌曲的时候,由于播放歌曲列表已经为顺序播放，此时点击 上一曲 或者 下一曲的时候, 又变成了顺序播放
			*/
			handleCheckPlayMode(){
				const mode = (this.mode + 1)%3;
				this.setPlayMode(mode);
				let list = [];
				if(this.mode === playMode.random){
					/*
					传入this.sequenceList后，返回的list 为打乱后的数组，此时this.sequenceList本身也被修改了.
					当从随机模式切换为顺序播放或者单曲循环的时候,this.sequenceList还是为打乱后的列表而不是原始数据。
					所以在shuffle函数内部,不能直接修改this.sequenceList
					*/
					list = shuffle(this.sequenceList);
				}else{
					list = this.sequenceList;
				}
				this.resetIndex(list);
				this.setPlayList(list);
			},
			resetIndex(list){
				const index = list.findIndex((item) => {
					return item.songid === this.currentSong.songid;
				});
				this.setCurrentIndex(index);
			},
			getLyric(){
				this.currentSong.getLyric().then(lyric => {
					// let currentLyric = this.formatLyric(lyric);
					this.currentLyric = new Lyric(lyric);
				})
			},
			ready(){
				this.flag = true;
			},
			error(){
				this.flag = true;
			},
			timeupdate(e){
				this.currentTime = e.target.currentTime;
				if(this.currentLyric){
					if(this.number > this.currentLyric.lines.length-1) return;
					if(e.target.currentTime*1000 >= this.currentLyric.lines[this.number+1].time){
						this.number++;
					}
					if(this.number > 6){
						let offsetY = - HEIGHT * (this.number - 6);
						this.$refs.lyricWrapper.style['top'] = `${offsetY}px`;
					}else{
						this.$refs.lyricWrapper.style['top'] = '0px';
					}
					this.$refs.lyricWrapper.style[transitionDuration] = `${TIME}ms`;
				}

			},
			format(interval){
				let minute = Math.floor(interval / 60);
				let second = this.padzero(interval % 60 | 0 );
				return `${minute}:${second}`;
			},
			padzero(num){
				let length = num.toString().length;
				return ('00' + num).substring(length);
			},
			formatLyric(lyric){
				let arr = lyric.split('\n');
				const lyricArr = [];
				arr.forEach((item) => {
					let temp = item.split(']');
					let time = temp[0].slice(1);
					let text = temp[1];
					lyricArr.push({
						time:this.formatLyricTime(time),
						text
					})
				})
				return lyricArr
			},
			handleSlideStart(e){
				this.touch.initial = true;
				this.touch.startX = e.touches[0].pageX;
				this.touch.startY = e.touches[0].pageY;
			},
			handleSlideMove(e){
				if(!this.touch.initial) return;
				let delX = e.touches[0].pageX - this.touch.startX;
				let delY = e.touches[0].pageY - this.touch.startY;
				/*
				如果当前页是歌词页面,且竖向滚动的距离大于横向滚动的距离时，此时不切换页面。
				*/
				if( Math.abs(delY) > Math.abs(delX) ) return;
				const currentLeft = this.currentPage === 'cd' ? 0 : -window.innerWidth;
				let offsetWidth = Math.min(0,Math.max(-window.innerWidth,currentLeft + delX));
				this.touch.percent = Math.abs( offsetWidth / window.innerWidth );
				this.$refs.lyric.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
				this.$refs.lyric.style[transitionDuration] = '0ms';
				
				// 向左滑动的时候 改变cd的透明度
				this.$refs.left.style['opacity'] = 1 - this.touch.percent;
				this.$refs.left.style[transitionDuration] = `${TIME}ms`;
			},
			handleSlideEnd(){
				/*
				滑动结束的时候停在哪里？从右往左滑, 如果滑动的距离 大于 屏幕宽度的 30%，则直接显示歌词页面
				*/
			   let offsetWidth = 0;
			   let opacity = 0;
			   if(this.currentPage === 'cd'){
				   if(this.touch.percent >= 0.3){
					   offsetWidth = -window.innerWidth;
					   this.currentPage = 'lyric'
					   opacity = 0
				   }else{
					   offsetWidth = 0;
					   opacity = 1;
				   }
			   }else{
				   if(this.touch.percent <= 0.7){
					   offsetWidth = 0;
					   this.currentPage = 'cd';
					   opacity = 1;
				   }else{
					   offsetWidth = -window.innerWidth;
					   opacity = 0;
				   }
			   }
			   this.$refs.lyric.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
			   this.$refs.lyric.style[transitionDuration] = `${TIME}ms`;
			   this.$refs.left.style['opacity'] = opacity;
			}
		},
		watch:{
			currentSong(newSong,oldSong){
				if(newSong.songid === oldSong.songid) return;
				this.$nextTick(() => {
					this.$refs.audio.play();
					this.getLyric();
					this.number = -1;
					//this.$refs.lyricWrapper.style['top'] = 0;
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
			white-space:nowrap;
			overflow:hidden;
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
			.slide-left{
				display:inline-block;
				position:relative;
				height:100%;
				width:100%;
				vertical-align:top;
			}
			.slide-right{
				display:inline-block;
				width:100%;
				height:100%;
				overflow:auto;
				.wrapper{
					position:relative;
					width:100%;
					height:100%;
					overflow:hidden;
				}
			}
			.lyric-wrapper{
				box-sizing:border-box;
				position:absolute;
				top:0;
				padding:0 30px;
				width:100%;
				text-align:center;
				.lyric-text{
					padding:6px 0;
					font-size:14px;
					color:#fff;
					white-space:normal;
					&.active{
						color:#2fcb97;
					}
				}
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
			bottom:12px;
			width:100%;
			.dot-wrapper{
				height:8px;
				width:100%;
				font-size:0;
				text-align:center;
				.dot{
					display:inline-block;
					margin:0 4px;
					width:8px;
					height:8px;
					background-color:#817d74;
					border-radius:50%;
					&.active{
						background-color:#fff;
					}
				}
			}
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
