<template>
    <section class="relative flex items-start" name="indexSale">
        <FormAddProduct @create-product="AnimateAddProducts" />
        <ProductNames v-if="store.getListType" :editable="true" class="ml-4 pl-4 border-l h-full" />
        <Products v-else :editable="true" class="ml-4 pl-4 border-l h-full" />
    </section>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import Products from '@/components/Product/Products.vue'
import FormAddProduct from './components/FormAddProduct.vue'
import { useListTypeStore } from '@/store/useListTypeStore'
import { GridProductStore } from '@/store/useGridProductStore'
import { GridProductNamesStore } from '@/store/useGridProductNamesStore'
const store = useListTypeStore()
const GridProduct = GridProductStore()
const GridProductNames = GridProductNamesStore()

function AnimateAddProducts(data) {
    data.products.forEach(product => product.product_names = { name: data.name })
    if (store.getListType) GridProductNames.addRow(data)
    else GridProduct.addRow(data)
}
</script>
<style scoped src="@/assets/selected.css"></style>