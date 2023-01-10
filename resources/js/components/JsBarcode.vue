<template>
    <div>
        <svg :id="svgId" class="w-full"></svg>
        <p class="px-1 flex justify-between items-center text-sm">
            <span>{{ productName.name }}</span> <span>{{ product.size.name }}</span>
        </p>
        <p class="px-1 text-center text-xs">
            <span>{{ product.price}} so'm</span>
        </p>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import JsBarcode from 'JsBarcode'
const { productName, product } = defineProps(['productName','product']) 

const svgId = ref(`product${product.id}`)
onMounted(() => {
    JsBarcode(`#${svgId.value}`, svgId.value, {width: 1,height: 50,displayValue: false});
})
</script>
