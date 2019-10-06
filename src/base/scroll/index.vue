<template>
	<div class="wrapper" ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default{
		name:'scroll',
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true,
			},
			data:{
				type:Array,
				default:null
			}
		},
		watch:{
			data(){
				setTimeout(() => {
					this.refresh();
				},20)
			}
		},
		mounted(){
			if(!this.$refs.wrapper) return;
			this.$nextTick(() => {
				this._initScroll();
			})
		},
		methods:{
			_initScroll(){
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
			},
			enable(){
				this.scroll && this.scroll.enable();
			},
			disable(){
				this.scroll && this.scroll.disable();
			},
			refresh(){
				this.scroll && this.scroll.refresh();
			}
		}
	}
</script>

<style lang='scss' scoped>
	.wrapper{
		height:100%;
		overflow:hidden;
	}
</style>
