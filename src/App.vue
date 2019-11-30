<template>
  <div id="app">
	<Header @user="handleToUser"/>
	<Tab/>
	<keep-alive>
		<router-view/>
	</keep-alive>
	<MiniPlayer/>
	<Player/>
	<UserCenter ref="user"/>
  </div>
</template>

<script>
	import Header from '@/components/v-header'
	import Tab from '@/components/tab'
	import Player from '@/components/player'
	import MiniPlayer from '@/components/mini-player'
	import UserCenter from '@/components/user-center'
	export default{
		name:'app',
		data() {
			return {
				
			}
		},
		components:{Tab,Header,Player,MiniPlayer,UserCenter},
		methods:{
			handleToUser(){
				this.$refs.user.show();
			}
		}
	}
</script>

<style lang="scss">
	#app{
		height:100%;
		background-color:#fafafa;
		overflow:hidden;
	}
</style>
