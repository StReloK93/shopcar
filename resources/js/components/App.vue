<template>
	<PrintProduct class="print absolute top-0 left-0 hidden z-50" v-if="store.productName"></PrintProduct>
	<RightMenu    class="noprint"></RightMenu>
	<section class="h-screen flex flex-col p-1 pt-0 noprint bg-gray-200">
		<h3 class="text-xl py-2 text-white px-3 capitalize bg-pink-500">{{$route.name}}</h3>
		<Router-view class="flex-grow bg-zinc-50 p-3 shadow"></Router-view>
	</section>
</template>

<script setup lang="ts">
import RightMenu from './RightMenu.vue'
import PrintProduct from './product/PrintProduct.vue'
import { useProductStore } from '../store/useProductStore';
const store = useProductStore()
window.onafterprint =  () => { store.productName = null }
</script>