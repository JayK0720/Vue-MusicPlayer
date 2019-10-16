<template>
	<audio v-bind:src="url" :playing='playing' ref='audio'></audio>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		name:'v-audio',
		props:{
			url:{
				type:String,
				default:""
			},
			song:{
				type:Object,
				default:function() {
					return{}
				}
			}
		},
		computed:{
			...mapGetters(['playing'])
		},
		watch:{
			url(){
				this.$nextTick(() => {
					const audio = this.$refs.audio;
					audio.play();
				})
			},
			playing(value){
				const audio = this.$refs.audio;
				value ? audio.play() : audio.pause()
			}
		}
	}
</script>

<style lang='scss' scoped>
</style>
