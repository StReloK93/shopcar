<template>
	<!-- Global Component absolute in body -->
	<PrintBarcode class="print absolute top-0 left-0 hidden" v-if="store.productName" :productName="store.productName"></PrintBarcode>
	<PrintQrcode class="print absolute top-0 left-0 hidden" v-if="store.productQrName" :productQrName="store.productQrName"></PrintQrcode>
	<!-- Start the program -->
	<section class="h-screen noprint flex flex-col bg-gray-100">
		<HeaderNavigate v-if="$route.meta.guard == 'auth' && $route.name != 'shops'"></HeaderNavigate>

		<main class="container mx-auto px-6 py-4 flex-grow">
			<router-view class="h-full bg-white p-4 shadow-md shadow-gray-300 rounded-md overflow-hidden relative border border-gray-100"></router-view>
		</main>
		<FooterNavigate v-if="$route.meta.guard == 'auth'"></FooterNavigate>
	</section>
</template>

<script setup lang="ts">
import HeaderNavigate from './components/HeaderNavigate.vue'
import FooterNavigate from './components/FooterNavigate.vue'
import PrintQrcode from './components/PrintQrcode.vue'
import PrintBarcode from './components/PrintBarcode.vue'
import { useProductStore } from './store/useProductStore'

const store = useProductStore()

onafterprint = () => {
	store.productName = null
	store.productQrName = null
}
</script>