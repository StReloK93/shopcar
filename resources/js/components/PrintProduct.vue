<template>
    <div>
        <JsBarcodeVue
            class="male bg-gray-100"
            v-for="product in $state.productName.products" 
            :product="product" 
            :productName="$state.productName"
        ></JsBarcodeVue>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore, } from '../store/ProductPrint'
import JsBarcodeVue from './JsBarcode.vue'
const { $state } = useProductStore()

onMounted(() => {
    window.print()
})
</script>
<style>
.ag-theme-alpine {
    /* disable all borders */
    --ag-borders: none

    /* then add back a border between rows */
    --ag-borders-row: solid 1px
    --ag-row-border-color: rgb(219, 219, 219)
}
</style>