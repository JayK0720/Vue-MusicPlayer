<template>
  <div id="app">
	<Header/>
	<Tab/>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
	<MiniPlayer/>
	<Player/>
  </div>
</template>

<script>
	import Header from '@/components/v-header'
	import Tab from '@/components/tab'
	import Player from '@/components/player'
	import MiniPlayer from '@/components/mini-player'
	export default{
		name:'app',
		data() {
			return {
				
			}
		},
		components:{Tab,Header,Player,MiniPlayer}
	}
</script>

<style lang="scss">
	#app{
		height:100%;
		background-color:#fafafa;
		overflow:hidden;
	}
</style>
