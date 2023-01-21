<template>
    <section @click="$emit('close')" tabindex="0" id="ListProducts" class="full-absolute flex-center p-8 outline-none z-[100]">
        <main @click.stop class="min-w-[630px] w-[900px] bg-white h-full flex flex-col justify-between">
            <header class="text-right bg-gray-100 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>
            <main class="flex-grow overflow-hidden overflow-y-auto list-products shadow-inner px-3">
                <table class="w-full text-center mt-4">
                    <tr>
                        <td class="py-2 font-semibold">Nomi</td>
                        <td class="py-2 font-semibold">Hajmi</td>
                        <td class="py-2 font-semibold">Narxi</td>
                        <td class="py-2 font-semibold">Soni</td>
                        <td class="py-2 font-semibold">Do'kondagi soni</td>
                        <td class="py-2 font-semibold">Umumiy narxi</td>
                        <td class="py-2 font-semibold"></td>
                    </tr>
                    <TrProduct v-for="(product, index) in listProducts" :product="product" :key="index" @delete="deleteProduct(index)"/>
                    <tr>
                        <td class="py-5 sticky bottom-0 bg-white" colspan="4"></td>
                        <td class="py-3 sticky bottom-0 bg-white font-semibold text-[18px]">Umumiy summa</td>
                        <td class="py-5 sticky bottom-0 bg-white font-semibold text-[18px]">{{ totalPrice }}</td>
                        <td class="py-5 sticky bottom-0 bg-white"></td>
                    </tr>
                </table>
            </main>
            <footer class="bg-white p-3 border-t text-right flex justify-between items-center">
                <form @submit.prevent="addProduct()">
                    <input type="text" class="text-input bg-inherit border" v-model="searchId" placeholder="Sotish ID-NNN">
                </form>
                <button 
                    :disabled="totalPrice == 0"
                    @click="sendForm" 
                    :class="{'!border-gray-300 text-gray-400 cursor-disabled bg-gray-300': totalPrice == 0}" 
                    class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 active:bg-gray-300"
                >
                    <span v-if="totalPrice == 0">
                        Mahsulot kiriting
                    </span>
                    <span v-else>
                        To'lovni amalga oshirish
                    </span>
                </button>
            </footer>
        </main>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted , inject , ref } from 'vue'
import TrProduct from './TrProduct.vue'
const { listProducts } = defineProps(['listProducts'])
const emit = defineEmits(['close','sold'])

const getProductById: Function = inject('getProductById', null)

const searchId = ref()
function addProduct(){
    getProductById(searchId.value)
    searchId.value = null
}


const totalPrice = computed(() => {
    const summa = listProducts.reduce((sum, product) => sum + product.sold_price * product.totalCount, 0)
    return Math.trunc(summa*1000)/1000
})

function sendForm(){
    // axios
    axios.post('sells', listProducts).then(({data}) => {
        swal.fire({
            icon: 'success',
            title: 'Sold',
            showConfirmButton: false,
            timer: 1000
        })
        emit('sold', data)
    })
}


function deleteProduct(index){
    listProducts.splice(index,1)
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