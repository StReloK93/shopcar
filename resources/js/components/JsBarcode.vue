<template>
    <div class="relative p-1">
        <svg :id="svgId" class="w-full"></svg>
        <p class="flex justify-between items-center text-xs">
            <span>{{ productName.name }}</span> <span>{{ product.size.name }}</span>
        </p>
        <div class="text-[8px] absolute top-0.5 right-0 z-50 leading-none text-gray-500 flex justify-between items-center w-full px-1">
            <span>
                ID-{{ product.id }}
            </span>
            <span>
                {{auth.user.active.name}}
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import JsBarcode from 'JsBarcode'
const { productName, product } = defineProps(['productName','product'])
import { useAuthStore } from '@/store/useAuthStore'
const auth = useAuthStore()
const svgId = ref(`product${product.id}`)
onMounted(() => {
    JsBarcode(`#${svgId.value}`, product.id , {width: 2 ,height: 55,displayValue: false});
})
</script>
