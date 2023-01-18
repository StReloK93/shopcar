<template>
    <section class="py-8 relative">
        <main class="flex bg-white p-4 shadow-xl shadow-gray-200 rounded-md overflow-hidden container mx-auto">
            <FormAddProduct @create-product="(data) => productNames.agGrid.api.applyTransaction({add: [data],addIndex: 0})" />
            <ProductNames ref="productNames" class="ml-3 pl-3" />
        </main>
    </section>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import FormAddProduct from './components/FormAddProduct.vue'
import { ref } from 'vue'
const productNames = ref(null)
</script>
<style scoped src="../../assets/selected.css"></style>

<!-- // import Preview from './components/PreviewIntro.vue' -->
<!-- <Preview :PageData="PageData" :FormData="FormData" :sizesCount="sizesCount"></Preview> -->