import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
	mode:'history',
	linkActiveClass:'active',
	routes:[
		{
			path:'/recommend',
			component:() => import ('@/views/recommend')
		},
		{
			path:'/singer',
			component:() => import ('@/views/singer'),
			children:[
				{
					path:':singerId',
					component:() => import('@/components/singer-detail')
				}
			]
		},
		{
			path:'/rank',
			component:() => import ('@/views/rank')
		},
		{
			path:'/search',
			component:() => import ('@/views/search')
		},
		{
			path:'/',
			redirect:'/recommend'
		}
	]
})

