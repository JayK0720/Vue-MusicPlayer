<template>
	<div class="rank-wrapper">
		排行榜
	</div>
</template>

<script>
	import {getTopList} from '@/common/api/rank'
	export default{
		name:'rank',
		data() {
			return {
				
			}
		},
		created() {
			this._getTopList()
		},
		methods:{
			_getTopList(){
				getTopList().then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>
</style>
