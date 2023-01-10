import { RouteRecordRaw } from 'vue-router'

export const routes:RouteRecordRaw[] = [
    {
		path: '/',
		component: () => import('@/pages/sale/IndexSale.vue'),
		name: 'sale',
        meta: {
			guard: 'auth',
		},
	},
    {
		path: '/introduction',
		component: () => import('@/pages/introduction/IndexIntroduction.vue'),
		name: 'introduction',
        meta: {
			guard: 'auth',
		},
	},
	{
		path: '/constructor',
		component: () => import('@/pages/constructor/IndexConstructor.vue'),
		name: 'constructor',
        meta: {
			guard: 'constructor',
		},
        redirect: {
			name: 'categories'
		},
		children: [
			{
				path: 'categories',
				name: 'categories',
				component: () => import('@/pages/constructor/Categories.vue')
			},
			{
				path: 'sizes',
				name: 'sizes',
				component: () => import('@/pages/constructor/SizeNames.vue')
			},
		]
	},
]