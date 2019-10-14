<template>
	<div class="music-list">
		<i 
			class="iconfont icon-back"
			@touchstart.stop='handleBack'
		>&#xe64d;</i>
		<h2 class="singer-name">{{title}}</h2>
		<div class="singer-wrapper" :style='bgStyle' ref='bgImage'>
			<div class="filter" ref='filter'></div>
		</div>
		<div class="bg-layer" ref='layer'></div>
		<Scroll 
			:data='songs' 
			ref='list' 
			class='list' 
			:probe-type='probeType' 
			:listen-scroll='listenScroll'
			@scroll='scroll'
		>
			<div class="song-list-wrapper">
				<SongList 
					:songs='songs'
					@selectItem='selectSong'
				/>
			</div>
			<Loading v-show='!songs.length'/>
		</Scroll>
	</div>
</template>

<script>
	import SongList from '@/base/song-list'
	import Scroll from '@/base/scroll'
	import Loading from '@/base/loading'
	const TITLE_HEIGHT = 60;
	import {prefixStyle} from '@/common/js/dom'
	import {mapActions} from 'vuex'
	
	export default{
		name:'music-list',
		components:{Scroll,SongList,Loading},
		props:{
			title:{
				type:String,
				default:''
			},
			bgImage:{
				type:String,
				default:''
			},
			songs:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		created() {
			this.listenScroll = true,
			this.probeType = 3
		},
		computed:{
			bgStyle(){
				return `backgroundImage:url(${this.bgImage})`
			}
		},
		mounted() {
			this.bgHeight = this.$refs.bgImage.offsetHeight;
			this.$refs.list.$el.style.top = this.bgHeight + 'px';
			this.maxTranslateY = -this.bgHeight + TITLE_HEIGHT;
		},
		methods:{
			...mapActions(['selectPlay']),
			handleBack(){
				this.$router.back()
			},
			scroll(pos){
				/*
				下面有两种思路，设置好一个最大的滚动偏移量(最大滚动距离为图片的高度 - 顶部预留的距离)
				1. 当滚动的距离大于设置好的最大滚动偏移量时，直接return，
				2. 求最大滚动距离偏移量的相反数 和 实时滚动的时的偏移量 两者的最大值，layer滚动的距离为两个参数的最大值
				
				tips: 综合考虑，第二种写法更好，灵活运用Math.max()函数，并且在设置z-index的时候，只用在判断语句里的重置zindex的值，
				再统一 设置 元素的zindex值即可。
				*/
				let translateY = Math.max(this.maxTranslateY,pos.y);
				this.$refs.layer.style[prefixStyle('transform')] = `translate3d(0,${translateY}px,0)`;
				
				let zIndex = 0;
				if(  pos.y < this.maxTranslateY ){
				   zIndex = 10;
				   this.$refs.bgImage.style.height = TITLE_HEIGHT + 'px';
				   this.$refs.bgImage.style.paddingTop = 0;
				}else{
				   this.$refs.bgImage.style.paddingTop = '80%'
				   this.$refs.bgImage.style.height = 0;
				}
				this.$refs.bgImage.style.zIndex = zIndex;
				
				if(pos.y > 0){
					let percent = Math.abs(pos.y / this.bgHeight);
					let scale = percent + 1;
					this.$refs.bgImage.style[prefixStyle('transform')] = `scale(${scale})`;
				}else{
					let blur = Math.max( -pos.y / (this.bgHeight - TITLE_HEIGHT) * 15, 15 );
					this.$refs.filter.style[prefixStyle('backdrop-filter')] = `filter(${blur}px)`;
				}
			   /*
				let maxTranslateY = this.bgHeight - TITLE_HEIGHT;

				if(- pos.y > maxTranslateY) {
					this.$refs.bgImage.style.height = TITLE_HEIGHT + 'px';
					this.$refs.bgImage.style.paddingTop = 0;
					this.$refs.bgImage.style.zIndex = 10;
					return;
				}else{
					this.$refs.bgImage.style.paddingTop = '80%';
					this.$refs.bgImage.style.height = 0;
					this.$refs.bgImage.style.zIndex = 0;
				}
				this.$refs.layer.style['transform'] = `translate3d(0,${pos.y}px,0)`
				this.$refs.layer.style['webKittransform'] = `translate3d(0,${pos.y}px,0)` 
				*/
			},
			/*
			点击歌曲时，需要播放歌曲，展开播放歌曲页面，添加当前的播放列表，
			*/
			selectSong(item,index){
				console.log(item);
				this.selectPlay({list:this.songs,index});
			}
		},
	}
</script>

<style lang='scss' scoped>
	.music-list{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		z-index:100;
		background-color:#fafafa;
		.icon-back{
			position:absolute;
			color:#fff;
			top:20px;
			left:18px;
			font-size:18px;
			z-index:30;
		}
		.singer-wrapper{
			position:relative;
			height:0;
			padding-top:80%;
			background-size:cover;
			background-repeat:no-repeat;
			transform-origin:center top;
		}
		.singer-name{
			position:absolute;
			top:20px;
			width:100%;
			text-align:center;
			font-size:16px;
			color:#fff;
			line-height:18px;
			z-index:20;
		}
		.list{
			position:absolute;
			width:100%;
			bottom:0;
			top:0;
		}
		.song-list-wrapper{
			padding:0 16px;
		}
		.bg-layer{
			position:relative;
			height:100%;
			width:100%;
			background-color:#fafafa;
		}
	}
</style>
