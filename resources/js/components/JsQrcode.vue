<template>
    <div class="relative p-1">
        <qrcode-vue :value="textForBarcode" :size="89" level="L"/>
        <div class="text-[8px] absolute -top-0.5 right-0 z-50 leading-none text-gray-500 w-14 px-1 text-right">
            <span class="text-xl">{{ product.size.name }}</span>
        </div>
        <div class="flex justify-between items-end text-[7px] h-4">
            <h3>
                {{auth.user.active.name}} <span class="font-bold ml-3">ID-{{ product.id }}</span> 
            </h3>
            <span>
                {{ productName.name }}
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
const { productName, product } = defineProps(['productName','product'])
import { useAuthStore } from '@/store/useAuthStore'
const auth = useAuthStore()
const textForBarcode = window.location.host + `/product/${product.id}`
</script>
