<template>
	<!-- Global Component absolute in body -->
	<PrintProduct class="print absolute top-0 left-0 hidden" v-if="store.productName"></PrintProduct>

	<!-- Start the program -->
	<section v-if="created" class="h-screen noprint flex flex-col bg-gray-100">
		<HeaderNavigate v-if="$route.meta.guard == 'auth'"></HeaderNavigate>
		<main class="container mx-auto p-6 flex-grow">
			<router-view class="h-full bg-white p-4 shadow-md shadow-gray-300 rounded-md overflow-hidden relative border border-gray-100"></router-view>
		</main>
		<FooterNavigate v-if="$route.meta.guard == 'auth'"></FooterNavigate>
	</section>
	<section class="flex-center h-screen" v-if="created == false">
		Loading
	</section>	
</template>

<script setup lang="ts">
import HeaderNavigate from './components/HeaderNavigate.vue'
import FooterNavigate from './components/FooterNavigate.vue'
// @ts-ignore
import PrintProduct from './components/product/PrintProduct.vue'
import { useProductStore } from './store/useProductStore'
import { useAuthStore } from './store/useAuthStore'
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
const route = useRoute()
const router = useRouter()
const store = useProductStore()
const AuthStore = useAuthStore()
const created = ref(false)


AuthStore.getUser().then( async () => {
	if(AuthStore.user && route.meta.guard == "guest"){
		await router.push('/')
		created.value = true
	}
	else{
		await router.push('/login')
		created.value = true
	}
	
})
onafterprint = () => store.productName = null
</script>