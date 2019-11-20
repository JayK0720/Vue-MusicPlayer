<template>
	<transition name='slide'>
		<div class="add-song-wrapper" v-show='flag'>
			<div class="header-wrapper">
				<h1 class="title">添加歌曲到列表</h1>
				<p 
					class='close-text'
					@click.stop='handleCloseAddSong'
				>关闭</p>
			</div>
			
		</div>
	</transition>
</template>

<script>
	export default{
		name:'add-song',
		data(){
			return{
				flag:false,
			}
		},
		methods:{
			show(){
				this.flag = true;
			},
			hide(){
				this.flag = false;
			},
			handleCloseAddSong(){
				this.hide();
			}
		}
	}
</script>

<style scoped lang='scss'>
	.add-song-wrapper{
		position:fixed;
		width:100%;
		left:0;
		top:0;
		bottom:0;
		background-color:#f1f1f1;
	}
	.slide-enter-active,.slide-leave-active{
		transition:all .3s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(100%,0,0);
	}
	.header-wrapper{
		position:relative;
		width:100%;
		height:40px;
		line-height:40px;
		text-align:center;
		color:#212121;
		.close-text{
			position:absolute;
			line-height:14px;
			font-size:14px;
			right:10px;
			top:13px;
			color:#333;
		}
	}
</style>
