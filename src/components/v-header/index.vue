<template>
	<div class='header'>
		<h1 class='title'>音乐馆</h1>
		<div
			class="user-center"
			tag="span"
			@click.stop="handleToUser"
		>
			<i class="iconfont user-icon">&#xe60e;</i>
		</div>
	</div>
</template>

<script>
	export default{
		name:'v-header',
		methods:{
			handleToUser(){
				this.$emit('user');
			}
		}
	}
</script>

<style lang='scss' scoped>
	.header{
		position:relative;
		width:100%;
		height:36px;
		.title{
			text-align:center;
			line-height:36px;
			font-weight:bold;
			font-size:20px;
			color:#000;
		}
		.user-center{
			position:absolute;
			right:10px;
			top:50%;
			transform:translateY(-50%);
			color:#00c66f;
			.user-icon{
				font-size:18px;
			}
		}
	}
</style>
