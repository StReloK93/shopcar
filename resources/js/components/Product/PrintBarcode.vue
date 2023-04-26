<template>
    <div>
        <span v-for="product in productName.products" >
            <JsBarcodeVue v-for="count in product.count"
                class="male bg-gray-100"
                :product="product"
                :productName="productName"
            ></JsBarcodeVue>
        </span>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import JsBarcodeVue from '../JsBarcode.vue'
const { productName } = defineProps(['productName'])
onMounted(() => window.print())
</script>
