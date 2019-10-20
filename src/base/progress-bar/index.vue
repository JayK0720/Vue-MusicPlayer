<template>
	<div class="progress-slider" ref='slider'>
		<div class="progress" ref='progress'></div>
		<div class="slider-bar" ref='bar'></div>
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
		watch:{
			percent(value) {
				const sliderWidth = this.$refs.slider.offsetWidth - barWidth;
				let offsetWidth = sliderWidth * value;
				this.$refs.progress.style.width = `${offsetWidth}px`;
				this.$refs.bar.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
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
