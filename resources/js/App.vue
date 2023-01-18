<template>
	<PrintProduct class="print absolute top-0 left-0 hidden z-50" v-if="store.productName"></PrintProduct>



	<section class="h-screen noprint flex flex-col bg-gray-100">
		<nav v-if="$route.name != 'product'" class="text-xl text-white bg-theme">
			<main class="flex-between-center container mx-auto px-4">
				<router-link to="/" class="font-light"><i class="fa fa-claw-marks mr-2"></i> Ruzzifer</router-link>
				<aside class="flex">
					<router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{name: 'sale'}">
						<i class="fal fa-shopping-bag"></i>
					</router-link>
					<router-link class="border-y-2 border-transparent px-3 py-4 block mx-2" :to="{name: 'introduction'}">
						<i class="fal fa-scanner"></i>
					</router-link>
					<router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{name: 'constructor'}">
						<i class="fal fa-cog"></i>
					</router-link>
				</aside>
			</main>
		</nav>
		<router-view class="flex-grow"></router-view>
	</section>
</template>

<script setup lang="ts">
import PrintProduct from './components/product/PrintProduct.vue'
import { useProductStore } from './store/useProductStore'
const store = useProductStore()
onafterprint = () => store.productName = null
</script>