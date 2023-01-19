<template>
    <ProductNames v-if="ProductListType" @toggle-list="ProductListType = !ProductListType"></ProductNames>
    <Products v-else @toggle-list="ProductListType = !ProductListType"></Products>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import Products from '@/components/Product/Products.vue'
import { ref } from 'vue'
const ProductListType = ref(true)
</script>