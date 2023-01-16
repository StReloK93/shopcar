<template>
    <ProductNames class="h-full" @grid-ready="(gridApi) => PageData.childGridApi = gridApi" :PageData="PageData"></ProductNames>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ProductNames from '@/components/Product/ProductNames.vue'

// Component Variables
const PageData = reactive({ 
    categories: [],
    sizeNames: [],
    productNames: [],
    childGridApi: null
})

axios.all([
    axios.get('categories'),
    axios.get('sizenames'),
    axios.get('productnames')
])
.then(axios.spread((categories, sizenames, productnames) => {
    PageData.categories = categories.data
    PageData.sizeNames = sizenames.data
    PageData.productNames = productnames.data
}));
</script>