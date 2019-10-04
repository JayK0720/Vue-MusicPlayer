<template>
	<p>
		recommend
	</p>
</template>

<script>
	import getRecommend from '@/common/api/recommend'
	import {ERR_OK} from '@/common/api/config'
	export default{
		name:'recommend',
		data(){
			return{
				recommend:[]
			}
		},
		created() {
			this._getRecommend();
		},
		methods:{
			_getRecommend(){
				getRecommend().then(res => {
					if(res.code === ERR_OK){
						this.recommend = res.data.slider;
					}
				})
			}
		}
	}
</script>

<style>
</style>
