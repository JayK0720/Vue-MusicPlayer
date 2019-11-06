import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
	mode:'history',
	linkActiveClass:'active',
	routes:[
		{
			path:'/recommend',
			component:() => import ('@/views/recommend'),
			children:[
				{
					path:'disc/:id',
					component:() => import('@/components/disc')
				}
			]
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
			component:() => import ('@/views/rank'),
			children:[
				{
					path:'toplist/:topid',
					component:() => import('@/components/rank-list')
				}
			]
		},
		{
			path:'/search',
			component:() => import ('@/views/search'),
			children:[
				{
					path:':singerId',
					component:() => import('@/components/singer-detail')
				}
			]
		},
		{
			path:'/',
			redirect:'/recommend'
		}
	]
})

