<template>
    <div>
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
const textForBarcode = window.location.host + `/product/${product.id}`

const svgId = ref(`product${product.id}`)
onMounted(() => {
    JsBarcode(`#${svgId.value}`, textForBarcode, {width: 0.5,height: 50,displayValue: false});
})
</script>
