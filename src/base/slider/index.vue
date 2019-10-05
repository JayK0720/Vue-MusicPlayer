<template>
	<div class="slider" ref='slider'>
		<div class="slider-group" ref='sliderGroup'>
			<slot></slot>
		</div>
		<div class="dots" >
			<span 
				v-for='(item,index) in dots' 
				:key='index'
				:class='{active:index === currentIndex}'
			></span>
		</div>
	</div>
</template>

<script>
	import {addClass} from '@/common/js/dom.js'
	import BScroll from 'better-scroll'
	export default{
		name:'slider',
		data() {
			return {
				dots:[],
				currentIndex:0,
				count:0,
			}
		},
		props:{
			autoplay:{
				type:Boolean,
				default:true
			},
			loop:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:3000
			}
		},
		mounted(){
			this.$nextTick(() => {
				this._setSliderWidth();
				this._initDots();
				this._initSlider();
				if(this.autoplay){
					this._autoPlay();
				}
			});
			// window.resize
			window.addEventListener('resize',() => {
				this._setSliderWidth(true);
			},false); 
		},
		methods:{
			_setSliderWidth(isResize){
				this.sliderWidth = this.$refs.slider.offsetWidth;
				// parentNode.children是一个只读属性，返回一个node的子elements,是一个动态更新的htmlcollection.
				this.children = this.$refs.sliderGroup.children;
				let width = 0;  
				for(let i = 0, len = this.children.length; i < len; i++){
					let child = this.children[i];
					addClass(child,'slider-item');	// 如果使用的时候没有添加'slider-item'类名，在slider组件里需要自动添加上
					child.style.width = this.sliderWidth + 'px';
					width += this.sliderWidth;	
				}
				this.count = this.children.length;
				if(this.loop && !isResize){
					width += this.sliderWidth * 2;
				}
				this.$refs.sliderGroup.style.width = width + 'px';
			},
			_initSlider(){
				this.scroll = new BScroll(this.$refs.slider,{
					scrollX:true,
					scrollY:false,
					probeType:1,
					snap:{
						loop:this.loop,
						threshold:0.3,
						speed:400
					},
					click:true,
					momentum:false,
				});
				this.scroll.on('scrollEnd',() => {
					let pageIndex = this.scroll.getCurrentPage().pageX;
					this.currentIndex = pageIndex;
					if(this.autoplay){
						clearTimeout(this.timer);
						this._autoPlay();
					}
				})
			},
			_autoPlay(){
				let pageIndex = this.currentIndex + 1;
				if(pageIndex >= this.count) pageIndex = 0;
				this.timer = setTimeout(() => {
					this.scroll.goToPage(pageIndex,0,400);
				},this.interval);
			},
			_initDots(){
				this.dots = new Array(this.children.length);
			},
		}
	}
</script>

<style lang='scss' scoped>
	.slider{
		position:relative;
		width:100%;
		overflow:hidden;
		.slider-item{
			float:left;
			a{
				display:block;
				height:100%;
				width:100%;
			}
			img{
				display:block;
				height:auto;
				width:100%;
			}
		}
		.dots{
			width:100%;
			position:absolute;
			bottom:10px;
			height:8px;
			font-size:0;
			text-align:center;
			z-index:10;
			span{
				display:inline-block;
				margin:0 5px;
				width:8px;
				height:8px;
				background-color:rgba(0,0,0,.3);
				border-radius:50%;
				&.active{
					background-color:#fff;
				}
			}
		}
	}
</style>
