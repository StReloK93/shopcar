import { RouteRecordRaw } from 'vue-router'

export const routes:RouteRecordRaw[] = [
    {
		path: '/',
		component: () => import('@/pages/sale/IndexSale.vue'),
		name: 'sale',
        meta: {
			guard: 'auth',
		},
        redirect: {
			name: 'soldproducts'
		},
		children: [
			{
				path: 'soldproducts',
				name: 'soldproducts',
				component: () => import('@/pages/sale/pages/SoldProducts.vue')
			},
			{
				path: 'existproduct',
				name: 'existproduct',
				component: () => import('@/pages/sale/pages/ExistProducts.vue')
			},
		]
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
			guard: 'auth',
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
	{
		path: '/product/:id',
		component: () => import('@/pages/general/GeneralProduct.vue'),
		name: 'product',
		props: true,
	}
]