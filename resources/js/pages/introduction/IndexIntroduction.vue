<template>
    <section class="relative flex items-start" name="indexSale">
        <FormAddProduct @create-product="(data) => AnimateAddProducts(data)" />
        <ProductNames v-if="ListType" @toggle-list="ListType = !ListType" ref="productNames" class="ml-4 pl-4 border-l h-full" />
        <Products v-else @toggle-list="ListType = !ListType" :editable="true" ref="products" class="ml-4 pl-4 border-l h-full" />
    </section>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import Products from '@/components/Product/Products.vue'
import FormAddProduct from './components/FormAddProduct.vue'
import { ref } from 'vue'
const productNames = ref(null)
const products = ref(null)
const ListType = ref(true)


function AnimateAddProducts(data){

    data.products.forEach(product => product.product_names = { name: data.name })

    if(ListType.value) productNames.value.agGrid.api.applyTransaction({add: [data],addIndex: 0})
    else products.value.productAgGrid.api.applyTransaction({add: data.products ,addIndex: 0})

}
</script>
<style scoped src="../../assets/selected.css"></style>

<!-- // import Preview from './components/PreviewIntro.vue' -->
<!-- <Preview :PageData="PageData" :FormData="FormData" :sizesCount="sizesCount"></Preview> -->