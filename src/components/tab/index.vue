<template>
	<div class="tab">
		<router-link tag="div" class='tab-item' to='/recommend'>推荐</router-link>
		<router-link tag="div" class='tab-item' to='singer'>歌手</router-link>
		<router-link tag="div" class='tab-item' to='rank'>排行</router-link>
		<router-link tag="div" class='tab-item' to='search'>搜索</router-link>
	</div>
</template>

<script>
	export default{
		name:'tab',
	}
</script>

<style lang='scss' scoped>
	.tab{
		display:flex;
		height:42px;
		background-color:#fafafa;
		.tab-item{
			line-height:40px;
			flex:1;
			text-align:center;
			border-bottom:2px solid #fafafa;
			&.active{
				color:#31ce9c;
				border-bottom-color:#31ce9c;
			}
		}
	}
</style>
