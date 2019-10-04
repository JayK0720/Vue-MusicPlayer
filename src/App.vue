<template>
  <div id="app">
	<Header/>
	<Tab/>
	<router-view></router-view>
  </div>
</template>

<script>
	import Header from '@/components/v-header'
	import Tab from '@/components/tab'
	export default{
		name:'app',
		data() {
			return {
				
			}
		},
		components:{Tab,Header}
	}
</script>

<style lang="scss">
	#app{
		height:100%;
		background-color:#fafafa;
	}
</style>
