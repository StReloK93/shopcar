<template>
    <div>
        <span v-for="product in store.productName.products" >
            <JsBarcodeVue v-for="count in product.count"
                class="male bg-gray-100"
                :product="product" 
                :productName="store.productName"
            ></JsBarcodeVue>
        </span>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore, } from '../../store/useProductStore'
import JsBarcodeVue from '../JsBarcode.vue'
const store = useProductStore()


onMounted(() => {
    window.print()
})
</script>
