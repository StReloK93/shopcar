<template>
    <section  v-if="selecteProduct" class="text-center bg-[url('/images/shop.jpg')] bg-cover bg-center">
        <div class="text-xl font-semibold mb-2 text-gray-700">
            {{ productName.name }}
        </div>
        <div class="mb-2">
            <span class="text-gray-400 mr-2">O'lcham:</span>
            <span class="font-bold text-pink-500">{{ selecteProduct.size.name }}</span>
        </div>
        <div class="text-pink-600 font-semibold mb-5 text-xl">
            {{ selecteProduct.price }} so'm
        </div>
        <h3 v-if="allProducts.length > 1" class="text-gray-400 mb-1">
            Mavjud o'lchamlar
        </h3>
        <main class="flex justify-center flex-wrap">
            <div v-for="product in allProducts" :class="{'hidden': selecteProduct.id == product.id}" class="bg-gray-200 rounded-full flex-center w-8 h-8 text-xs m-0.5 shadow">
                {{ product.size.name }}
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import axios from '../../modules/axios'
import { ref } from 'vue'
const { id } = defineProps(['id'])
const selecteProduct = ref(null)
const allProducts = ref(null)
const productName = ref(null)
axios.get(`products/${id}`).then(({data}) => {
    if(data){
        selecteProduct.value = data
        productName.value = data.product_names
        allProducts.value = data.product_names.products
    }
})
</script>