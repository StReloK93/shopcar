<template>
    <section @click="$emit('close')" tabindex="0" id="ListProducts" class="full-absolute flex-center p-4 pb-16 outline-none z-[100]">
        <main @click.stop class="min-w-[630px] w-[900px] bg-white h-full flex flex-col justify-between relative">
            <Transition name="scale">
                <FinishedSold 
                    v-if="finishedSold" 
                    @close="closeFinished"
                    :listProducts="removedProducts"
                    :totalPrice="totalPrice"
                    :sale="product"
                ></FinishedSold>
            </Transition>
            <header class="flex justify-between items-center bg-pink-600 border-b mb-0">
                <span class="px-4 text-white"><i class='fa-duotone fa-pen-nib text-white relative top-px mr-3'></i> Tahrirlash </span>
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-pink-500">
                    <i class="far fa-times text-white"></i>
                </button>
            </header>
            <main class="flex-grow overflow-hidden overflow-y-auto list-products shadow-inner px-3">

                <table class="w-full text-center mt-1">
                    <tr>
                        <td class="py-2 font-semibold">Nomi</td>
                        <td class="py-2 font-semibold">Hajmi</td>
                        <td class="py-2 font-semibold">Narxi</td>
                        <td class="py-2 font-semibold">Soni</td>
                        <td class="py-2 font-semibold">Do'kondagi soni</td>
                        <td class="py-2 font-semibold">Umumiy narxi</td>
                    </tr>
                    <TrProduct
                        :refund="true"
                        v-for="(product, index) in listProducts"
                        :product="product"
                        :key="index"
                        @delete="deleteProduct(index)"
                    />
                    <tr>
                        <td class="py-4 sticky bottom-0 bg-white" colspan="4"></td>
                        <td class="py-3 sticky bottom-0 bg-white font-semibold text-[18px]">Umumiy summa</td>
                        <td class="py-4 sticky bottom-0 bg-white font-semibold text-[18px]">{{ totalPrice }}</td>
                        <td class="py-4 sticky bottom-0 bg-white"></td>
                    </tr>
                </table>
            </main>
            <footer class="bg-white p-3 border-t text-right flex justify-between items-center">
                <form @submit.prevent="addProduct()">
                    <input type="text" class="text-input bg-inherit border" v-model="searchId" placeholder="Sotish ID-NNN">
                </form>
                <main>                    
                    <button
                        @click="openFinished" 
                        class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 hover:bg-pink-100 active:bg-pink-50"
                    >
                        <span class="text-gray-600">
                            <i class='fa-duotone fa-marker text-pink-500 relative top-px mr-3'></i> Saqlash
                        </span>
                    </button>
                </main>
            </footer>
        </main>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted , inject , ref } from 'vue'
import TrProduct from './TrProduct.vue'
import FinishedSold from './FinishedSold.vue'
const { product } = defineProps(['product'])
const getProductById: Function = inject('getProductById', null)
const emit = defineEmits(['close','deleted','onFinished'])



const searchId = ref()
const finishedSold = ref(false)
const listProducts = ref([])
const copyListProduct = ref([])



axios.get(`sale/${product.id}`).then(({data}) => {
    data.sells.forEach(sell => {
        sell.totalCount = sell.count
    });

    listProducts.value = data.sells
    copyListProduct.value = [...data.sells]
})

function addProduct(){
    getProductById(searchId.value)
    searchId.value = null
}


const totalPrice = computed(() => {
    const summa = listProducts.value.reduce((sum, product) => sum + product.selled_price * product.totalCount, 0)
    return Math.trunc(summa*1000)/1000
})


const removedProducts = computed(() => copyListProduct.value.map(( product ) => {
    const select = listProducts.value.find( ( (baseProduct) => product.id == baseProduct.id) )
    
    const count = product.count - select.totalCount
    
    return {...select , totalCount: count}
}))

function openFinished(){
    finishedSold.value = true
    emit('onFinished', finishedSold.value)
}

function closeFinished(){
    finishedSold.value = false
    emit('onFinished', finishedSold.value)
}

const deleteProduct = (index) => {
    listProducts.value.splice(index,1)
}

onMounted(() => {
    const listproductDiv = document.getElementById('ListProducts')
    listproductDiv.focus()
    
    listproductDiv.onkeyup = (event) => {
        if(event.which == 13 && event.ctrlKey) openFinished()
        else if(event.which == 27) emit('close')
    }
})
</script>