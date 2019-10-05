<template>
	<div class='recommend-wrapper'>
		<Slider v-if='recommends.length'>
			<div 
				v-for='(item,index) in recommends' :key='index'
			>
				<a v-bind:href='item.linkUrl'>
					<img v-bind:src="item.picUrl" alt="">
				</a>
			</div>
		</Slider>
	</div>
</template>

<script>
	import getRecommend from '@/common/api/recommend'
	import {ERR_OK} from '@/common/api/config'
	import Slider from '@/base/slider'
	export default{
		name:'recommend',
		data(){
			return{
				recommends:[]
			}
		},
		components:{Slider},
		created() {
			this._getRecommend();
		},
		methods:{
			_getRecommend(){
				getRecommend().then(res => {
					if(res.code === ERR_OK){
						this.recommends = res.data.slider;
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.recommend-wrapper{
		
	}
</style>
