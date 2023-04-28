<template>
    <div>
        <span v-for="product in productQrName.products" >
            <JsQrcode v-for="count in product.count"
                class="male bg-gray-100"
                :product="product"
                :productName="productQrName"
            ></JsQrcode>
        </span>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import JsQrcode from './JsQrcode.vue'
const { productQrName } = defineProps(['productQrName'])
onMounted(() => window.print())
</script>
