<template>
    <div class="relative">
        <p class="text-[7px] absolute top-0.5 left-0.5 z-50 leading-none text-gray-500">Ruzzifer</p>
        <svg :id="svgId" class="w-full"></svg>
        <p class="px-1 flex justify-between items-center text-xs">
            <span>{{ productName.name }}</span> <span>{{ product.size.name }}</span>
        </p>
        <div class="text-xs text-right px-1">
            ID-{{ product.id }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import JsBarcode from 'JsBarcode'
const { productName, product } = defineProps(['productName','product'])
// const textForBarcode = window.location.host + `/product/${product.id}`

const svgId = ref(`product${product.id}`)
onMounted(() => {
    JsBarcode(`#${svgId.value}`, svgId.value, {width: 1,height: 50,displayValue: false});
})
</script>
