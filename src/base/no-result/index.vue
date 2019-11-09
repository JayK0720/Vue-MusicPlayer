<template>
	<div class="result-wrapper">
		<i class="iconfont result-icon">&#xe682;</i>
		<span class='result-text'>{{title}}</span>
	</div>
</template>

<script>
	export default{
		name:'no-result',
		props:{
			title:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped lang='scss'>
	.result-wrapper{
		box-sizing:border-box;
		padding-top:50%;
		height:100%;
		width:100%;
		text-align:center;
	}
	.result-icon{
		color:#00c871;
		margin-right:5px;
	}
	.result-text{
		text-align:center;
		font-size:14px;
		color:#212121;
	}
</style>
