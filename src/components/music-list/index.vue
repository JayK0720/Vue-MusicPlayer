<template>
	<div class="music-list">
		<i 
			class="iconfont icon-back"
			@touchstart.stop='handleBack'
		>&#xe64d;</i>
		<div class="singer-wrapper">
			<div class="singer-bg" :style='bgStyle'></div>
			<h2 class="singer-name">{{title}}</h2>
		</div>
		<div class="song-list">
			
		</div>
	</div>
</template>

<script>
	export default{
		name:'music-list',
		data(){
			return{
				
			}
		},
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
		computed:{
			bgStyle(){
				return `backgroundImage:url(${this.bgImage})`
			}
		},
		methods:{
			handleBack(){
				this.$router.back()
			}
		}
	}
</script>

<style lang='scss' scoped>
	.music-list{
		position:relative;
		display:flex;
		height:100%;
		width:100%;
		flex-direction:column;
		.icon-back{
			position:absolute;
			color:#fff;
			top:20px;
			left:18px;
			font-size:18px;
			z-index:20;
		}
		.singer-wrapper{
			position:relative; 
			height:325px;
		}
		.singer-bg{
			position:absolute;
			width:100%;
			height:100%;
			background-repeat:no-repeat;
			background-size:100%;
			z-index:-1;
		}
		.singer-name{
			font-size:20px;
			line-height:325px;
			color:#fffef3;
			text-align:center;
		}
		.song-list{
			flex:1;
			background-color:#fff;
		}
	}
</style>
