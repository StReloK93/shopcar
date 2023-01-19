<template>
	<!-- Global Component absolute in body -->
	<PrintProduct class="print absolute top-0 left-0 hidden" v-if="store.productName"></PrintProduct>


	<!-- Start the program -->
	<section class="h-screen noprint flex flex-col bg-gray-100">
		<HeaderNavigate v-if="$route.name != 'product'"></HeaderNavigate>
		<main class="container mx-auto p-8 flex-grow">
			<router-view class="h-full bg-white p-4 shadow-xl shadow-gray-200 rounded-md overflow-hidden relative"></router-view>
		</main>
	</section>
</template>

<script setup lang="ts">
import PrintProduct from './components/product/PrintProduct.vue'
import HeaderNavigate from './components/HeaderNavigate.vue'

import { useProductStore } from './store/useProductStore'
const store = useProductStore()
onafterprint = () => store.productName = null
</script>