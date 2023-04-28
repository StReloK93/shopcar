<template>
    <ProductNames v-if="store.getListType"></ProductNames>
    <Products v-else></Products>
</template>

<script setup lang="ts">
import ProductNames from '@/components/Product/ProductNames.vue'
import Products from '@/components/Product/Products.vue'
import { useListTypeStore } from '@/store/useListTypeStore'
const store = useListTypeStore()
</script>