<template>
	<div class="progress-slider" ref='slider'>
		<div class="progress" ref='progress'></div>
		<div 
			class="slider-bar" 
			ref='bar'
			@touchstart.prevent='handleTouchStart'
			@touchmove.prevent='handleTouchMove'
			@touchend.prevent='handleTouchEnd'
		></div>
	</div>
</template>

<script>
	const barWidth = 12;
	import {prefixStyle} from '@/common/js/dom'
	const transform = prefixStyle('transform');
	export default{
		name:'progress-bar',
		props:{
			percent:{
				type:Number,
				default:0
			}
		},
		created(){
			this.touch = {}
		},
		methods:{
			/*
			1. 拖动开始的时候先初始化, 圆点的初始位置，以及此时歌曲播放的进度 
			2. 拖动过程中实时获取拖动的数据, 减去初始的x坐标，再加上进度条的宽度，即为此时歌曲的播放进度
			*/
			handleTouchStart(e){
				this.touch.startX = e.touches[0].pageX;
				this.touch.progressWidth = this.$refs.progress.offsetWidth;
				this.touch.initial = true;
			},
			handleTouchMove(e){
				if(!this.touch.initial) return;
				const delta = e.touches[0].pageX - this.touch.startX;
				/*offsetWidth的最大宽度不能超过一个定值*/
				const offsetWidth = Math.min( this.$refs.slider.offsetWidth - barWidth , this.touch.progressWidth+delta );
				this._setProgress(offsetWidth);
			},
			handleTouchEnd(e){
				this.touch.initial = false;
				
				const totalWidth = this.$refs.slider.offsetWidth - barWidth; 
				const percent = this.$refs.progress.offsetWidth / totalWidth;
				
				this.$emit('percentChange',percent);
			},
			_setProgress(offsetWidth){
				this.$refs.progress.style.width = `${offsetWidth}px`;
				this.$refs.bar.style.transform = `translate3d(${offsetWidth}px,0,0)`;
			}
		},
		watch:{
			percent(value) {
				// 在拖动的过程中,歌曲一直在播放，此时也会设置 进度条的宽度 和 bar的位置
				if(this.touch.initial) return;
				const sliderWidth = this.$refs.slider.offsetWidth - barWidth;
				let offsetWidth = sliderWidth * value;
				this._setProgress(offsetWidth);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.progress-slider{
		position:relative;
		width:100%;
		height:100%;
		background-color:#fff;
	}
	.progress{
		width:0;
		height:100%;
		background-color:#2ed296;
	}
	.slider-bar{
		position:absolute;
		left:0;
		top:-5px;
		width:12px;
		height:12px;
		border-radius:50%;
		background-color:#fff;
	}
</style>
