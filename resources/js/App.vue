<template>
	<PrintProduct class="print absolute top-0 left-0 hidden z-50" v-if="store.productName"></PrintProduct>
	<section class="h-screen noprint flex flex-col bg-gray-100">
		<nav v-if="$route.name != 'product'" class="text-xl text-white bg-blue-500 flex justify-between px-4">
			<main class="flex">
				<router-link class="border-y-2 border-transparent px-3 py-2 block" :to="{name: 'sale'}">
					<i class="fas fa-shopping-bag"></i>
				</router-link>
				<router-link class="border-y-2 border-transparent px-3 py-2 block mx-2" :to="{name: 'introduction'}">
					<i class="fas fa-scanner"></i>
				</router-link>
				<router-link class="border-y-2 border-transparent px-3 py-2 block" :to="{name: 'constructor'}">
					<i class="far fa-cog"></i>
				</router-link>
			</main>
		</nav>
		<router-view class="flex-grow p-3"></router-view>
	</section>
</template>

<script setup lang="ts">
import PrintProduct from './components/product/PrintProduct.vue'
import { useProductStore } from './store/useProductStore'
const store = useProductStore()
onafterprint = () => store.productName = null
</script>