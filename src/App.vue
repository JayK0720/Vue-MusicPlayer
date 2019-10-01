<template>
  <div id="app">
	<Tab/>
	<router-view></router-view>
  </div>
</template>

<script>
	import Tab from '@/components/tab'
	export default{
		name:'app',
		data() {
			return {
				
			}
		},
		components:{Tab}
	}
</script>

<style lang="scss">
	#app{
		height:100%;
		background-color:#fafafa;
	}
</style>
