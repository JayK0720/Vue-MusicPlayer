<template>
	<div class="player" v-show='playList.length > 0'>
		
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		name:'player',
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(['fullScreen','playList'])
		}
	}
</script>

<style lang='scss' scoped>
	.player{
		position:fixed;
		left:0;
		bottom:0;
		top:0;
		right:0;
		background-color:pink;
	}
</style>
