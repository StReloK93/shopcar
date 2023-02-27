import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/store/useAuthStore'


const router = createRouter({
	history: createWebHistory(),
	routes: routes
})


router.beforeEach((to, from, next) => {
	const store = useAuthStore()
	if (store.user) {
		if (to.meta.guard === 'guest') next({ name: 'sale' })
		else if (to.name != 'shops' && store.user.active_shop == null) next({ name: 'shops' })
		else next()

	} else {
		if (to.meta.guard === 'auth') next({ name: 'login' })
		else next()
	}
})

export default router