<template>
    <section class="flex">
        <FormAddProduct @create-product="(data) => productNames.agGrid.api.applyTransaction({add: [data],addIndex: 0})" />
        <ProductNames ref="productNames" class="ml-3 border-l border-gray-300 pl-3" />
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