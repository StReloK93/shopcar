<template>
    <ProductNames ref="productNames" v-if="store.getListType"></ProductNames>
    <Products ref="products" v-else></Products>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import Products from '@/components/Product/Products.vue'
import { useListTypeStore } from '@/store/useListTypeStore'
import { ref } from 'vue'
const store = useListTypeStore()
const productNames = ref()
const products = ref()


defineExpose({productNames,products})
</script>