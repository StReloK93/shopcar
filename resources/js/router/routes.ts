export default [
    {
		path: '/',
		component: () => import('@/pages/Home.vue'),
		name: 'home',
        meta: {
			guard: 'auth',
		},
	},
	{
		path: '/constructor',
		component: () => import('@/pages/constructor/Constructor.vue'),
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
				component: () => import('@/pages/constructor/Sizes.vue')
			},
		]
	},
];