<template>
	<!-- Global Component absolute in body -->
	<PrintProduct class="print absolute top-0 left-0 hidden" v-if="store.productName"></PrintProduct>


	<!-- Start the program -->
	<section class="h-screen noprint flex flex-col bg-gray-100">
		<HeaderNavigate v-if="$route.name != 'product'"></HeaderNavigate>
		<main class="container mx-auto p-6 pb-0 flex-grow">
			<router-view class="h-full bg-white p-4 shadow-md shadow-gray-300 rounded-md overflow-hidden relative border border-gray-100"></router-view>
		</main>
		<footer class="flex justify-between container mx-auto px-6 text-gray-500">
			<div class="py-5">
				<a href="https://ruzzifer.site" target="_blank">
					<i class="fa-regular fa-link-simple mr-2 text-pink-600"></i> Ruzzifer.site
				</a>
			</div>
			<div class="py-5">
				<i class="fa-duotone fa-phone mr-2 text-pink-600"></i>
				Murojat uchun +998 93-660-09-60
			</div>
		</footer>
	</section>
</template>

<script setup lang="ts">
import PrintProduct from './components/product/PrintProduct.vue'
import HeaderNavigate from './components/HeaderNavigate.vue'

import { useProductStore } from './store/useProductStore'
const store = useProductStore()
onafterprint = () => store.productName = null
</script>