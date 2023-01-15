<template>
    <section @click="$emit('close')" tabindex="0" id="ListProducts" class="full-absolute flex-center py-8 outline-none z-50">
        <main @click.stop class="min-w-[630px] w-[900px] bg-white h-full flex flex-col justify-between">
            <header class="text-right bg-gray-100 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>
            <main class="flex-grow overflow-hidden overflow-y-auto list-products shadow-inner px-3">
                <table class="w-full text-center mt-4">
                    <tr>
                        <td class="py-2 font-semibold">Name</td>
                        <td class="py-2 font-semibold">Size</td>
                        <td class="py-2 font-semibold">Price</td>
                        <td class="py-2 font-semibold">Count</td>
                        <td class="py-2 font-semibold">Store count</td>
                        <td class="py-2 font-semibold">Total price</td>
                        <td class="py-2 font-semibold"></td>
                    </tr>
                    <tr v-for="(product, index) in listProducts" :key="index">
                        <td class="border-y py-3">{{ product.product_names.name }}</td>
                        <td class="border-y py-3">{{ product.size.name }}</td>
                        <td class="border-y py-3 w-32">
                            <input type="number" class="text-input border py-0 text-center " v-model="product.sold_price">
                        </td>
                        <td class="border-y py-3 ">
                            <div class="flex items-center justify-center">
                                <button 
                                    :disabled="product.totalCount == 1" 
                                    :class="{'text-gray-300 hover:bg-inherit': product.totalCount == 1}" 
                                    @click="decrement(product)" 
                                    class="px-3 py-0.5 hover:bg-gray-100 active:bg-gray-200 rounded-sm w-10"
                                >
                                    <i class="fal fa-angle-left relative top-px"></i>
                                </button>
                                <span class="mx-4">
                                    {{ product.totalCount }}
                                </span>
                                <button 
                                    :disabled="product.totalCount == product.count" 
                                    :class="{'text-gray-300 hover:bg-inherit': product.totalCount == product.count}" 
                                    @click="increment(product)" 
                                    class="px-3 py-0.5 hover:bg-gray-100 active:bg-gray-200 rounded-sm w-10"
                                >
                                    <i class="fal fa-angle-right relative top-px"></i>
                                </button>
                            </div>
                        </td>
                        <td class="border-y py-3">{{ product.count }}</td>
                        <td class="border-y py-3">{{ product.sold_price * product.totalCount }}</td>
                        <td @click="deleteProduct(index)" class="border-y py-3 px-3 text-red-600 cursor-pointer hover:bg-gray-100 active:bg-slate-200">
                            <i class="fal fa-times"></i>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-5" colspan="4"></td>
                        <td class="py-3 font-semibold text-[18px]">Total price</td>
                        <td class="py-5">{{ totalPrice }}</td>
                        <td class="py-5"></td>
                    </tr>
                </table>
            </main>
            <footer class="bg-white p-3 border-t text-right">
                <button @click="sendForm" class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 active:bg-gray-300">
                    Sell the product
                </button>
            </footer>
        </main>
    </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import { tailwindSwal } from '../../../modules/swal'
import { computed, onMounted } from 'vue';
const { listProducts } = defineProps(['listProducts'])
const emit = defineEmits(['close','sold'])

const totalPrice = computed(() => {
    return listProducts.reduce((summa, product) => summa + product.sold_price * product.totalCount, 0)
})

function decrement(product){
    if(product.totalCount > 1) product.totalCount--
}

function increment(product){
    if(product.totalCount < product.count) product.totalCount++
}


function deleteProduct(index){
    listProducts.splice(index,1)
}

function sendForm(){
    axios.post('sells', listProducts).then(({data}) => {
        tailwindSwal.fire({
            icon: 'success',
            title: 'Sold',
            showConfirmButton: false,
            timer: 1000
        })
        
        emit('sold',data)
    })
}

onMounted(() => {
    const listproductDiv = document.getElementById('ListProducts')
    listproductDiv.focus()
    listproductDiv.onkeyup = (event) => {
        if(event.which == 13 && event.ctrlKey) sendForm()
        else if(event.which == 27) emit('close')
    }
})
</script>