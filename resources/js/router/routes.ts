import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/pages/commerce/IndexSale.vue'),
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
				component: () => import('@/pages/commerce/pages/SoldProducts.vue')
			},
			{
				path: 'existproduct',
				name: 'existproduct',
				component: () => import('@/pages/commerce/pages/ExistProducts.vue')
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
				component: () => import('@/pages/constructor/pages/Categories.vue')
			},
			{
				path: 'sizes',
				name: 'sizes',
				component: () => import('@/pages/constructor/pages/SizeNames.vue')
			},
		]
	},
	{
		path: '/product/:id',
		component: () => import('@/pages/public/GeneralProduct.vue'),
		name: 'product',
		props: true,
	},
	{
		path: '/login',
		component: () => import('../pages/auth/Login.vue'),
		name: 'login',
		meta: {
			title: "Kirish",
			guard: 'guest'
		}
	},
	{
		path: '/register',
		component: () => import('../pages/auth/Register.vue'),
		name: 'register',
		meta: {
			title: "Ro'yhatdan o'tish",
			guard: 'guest'
		}
	},
]