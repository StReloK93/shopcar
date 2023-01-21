<template>
    <tr>
        <td class="border-y py-3 pl-3 text-left">{{ product.product_names.name }}</td>
        <td class="border-y py-3">{{ product.size.name }}</td>
        <td class="border-y py-3 w-32">
            <input type="number" class="text-input border py-0 text-center" v-model="product.sold_price">
        </td>
        <td class="border-y py-3 ">
            <div class="flex items-center justify-center">
                <button :disabled="product.totalCount == 0"
                    :class="{ 'text-gray-300 hover:bg-inherit': product.totalCount == 0 }" @click="decrement(product)"
                    class="px-3 py-0.5 hover:bg-gray-100 active:bg-gray-200 rounded-sm w-10">
                    <i class="fal fa-angle-left relative top-px"></i>
                </button>
                <span class="mx-4">
                    <input type="number" class="text-input border py-0 text-center w-24" v-model="product.totalCount">
                </span>
                <button :disabled="product.totalCount == product.count"
                    :class="{ 'text-gray-300 hover:bg-inherit': product.totalCount == product.count }"
                    @click="increment(product)"
                    class="px-3 py-0.5 hover:bg-gray-100 active:bg-gray-200 rounded-sm w-10">
                    <i class="fal fa-angle-right relative top-px"></i>
                </button>
            </div>
        </td>
        <td class="border-y py-3">{{ product.count }}</td>
        <td class="border-y py-3">{{ Math.round(product.sold_price * product.totalCount*1000)/1000}}</td>
        <td @click="$emit('delete')"
            class="border-y py-3 px-3 text-red-600 cursor-pointer hover:bg-gray-100 active:bg-slate-200">
            <i class="fal fa-times"></i>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
const { product } = defineProps(['product', 'index'])
const decrement = (product) => product.totalCount--
const increment = (product) => product.totalCount++

watch(() => product, (current) => {
    if(current.totalCount > current.count) current.totalCount = current.count
    if(current.totalCount < 0) current.totalCount = 0

    current.totalCount = Math.round(current.totalCount*1000)/1000
    
}, { deep: true })


onMounted(() => {
    if(product.totalCount > product.count) product.totalCount =product.count
})
</script>