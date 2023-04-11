<template>
    <section class="bg-gray-500 bg-opacity-20 w-full h-full absolute z-50 left-0 top-0 flex-center">
        <main @click.stop class="w-96 h-[500px] bg-white shadow-lg flex flex-col">
            <header v-if="sale" class="text-right bg-pink-600 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-pink-500">
                    <i class="far fa-times text-white"></i>
                </button>
            </header>
            <header v-else class="text-right bg-gray-100 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>

            <form @submit.prevent="finishedSold" class="p-3 pt-2 flex flex-col justify-between h-full">
                <main>
                    <div class="mb-1.5" v-for="(value, key) in formData">
                        <aside class="text-gray-400 flex-between-center">
                            <span v-if="key == 'cash'">Naxt</span>
                            <span v-if="key == 'electron'">Plastik</span>
                            <span v-if="key == 'debt'">Qarz</span>
                            <main>
                                <button
                                    @click="Remains(key)"
                                    type="button"
                                    class="text-xs bg-gray-200 text-gray-500 w-10 py-0.5 rounded-sm shadow-sm mr-3 active:bg-pink-400 active:text-white hover:bg-pink-500 hover:text-white">
                                    <i class="fa-solid fa-magnet"></i>
                                </button>
                                <button
                                    @click="empty(key)"
                                    type="button"
                                    class="text-xs bg-gray-200 text-gray-500 w-10 py-0.5 rounded-sm shadow-sm mr-3 active:bg-pink-400 active:text-white hover:bg-pink-500 hover:text-white">
                                    0%
                                </button>
                                <button
                                    @click="allMoney(key)"
                                    type="button"
                                    class="text-xs bg-gray-200 text-gray-500 w-10 py-0.5 rounded-sm shadow-sm active:bg-pink-400 active:text-white hover:bg-pink-500 hover:text-white">
                                    100%
                                </button>
                            </main>
                        </aside>
                        <input @wheel.prevent type="number" v-model="formData[key]" step="0.001" class="text-input text-gray-600">
                    </div>
                    <aside class="flex items-center justify-end mt-3">
                        <span class="text-gray-500">
                            Umumiy summa: 
                        </span>
                        <span class="text-xl font-semibold text-gray-600 ml-5">
                            {{ totalPrice }} 
                        </span>
                    </aside>
                    <aside v-if="remaining < 0" class="flex items-center justify-end mt-3 text-pink-500">
                        <span>
                            Umumiy summadan ortib ketti: 
                        </span>
                        <span class="ml-5">
                            {{ remaining }} 
                        </span>
                    </aside>
                </main>
                <main>
                    <button
                        :disabled="remaining < 0"
                        :class="{'!border-gray-200 text-gray-300 cursor-not-allowed' : remaining < 0}"
                        class="py-1 px-3 bg-gray-200 shadow-md active:shadow-sm border-b-2 border-pink-500 hover:bg-pink-100 active:bg-pink-50 w-full">
                        To'lovni amalga oshirish 
                    </button>
                </main>
            </form>
        </main>
    </section>
</template>

<script setup lang="ts">
import { reactive , watch , computed } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const { listProducts, totalPrice , sale } = defineProps(['listProducts', 'totalPrice', 'sale'])
const emit = defineEmits(['sold'])
const store = useAuthStore()

function allMoney(type){
    for (const key in formData) {
        if(key == type) formData[key] = totalPrice
        else formData[key] = null
    }
}

function empty(type){
    formData[type] = null
}

function Remains(type){
    const summs = []
    for (const key in formData) {
        if(type != key) {
            const num = ['', null].includes(formData[key]) ? 0 : formData[key]
            summs.push(num)
        }
    }

    const total = totalPrice - summs.reduce((sum, item) => sum + item, 0)
    formData[type] = total == 0 ? null : total
}

const formData = reactive({
    cash: totalPrice,
    electron: null,
    debt: null,
})

watch(() => formData.cash, (current, old) => {
    if(current > totalPrice || current < 0) formData.cash = old
})

watch(() => formData.debt, (current, old) => {
    if(current > totalPrice || current < 0) formData.debt = old
})

watch(() => formData.electron, (current, old) => {
    if(current > totalPrice || current < 0) formData.electron = old
})

function finishedSold(){
    const mainListProducts = listProducts.filter( (product) => product.totalCount != 0 )
    
    if(sale) axios.patch(`sale/${sale.id}`, {...formData, listProducts: mainListProducts, shop_id: store.user.active_shop }).then(({data}) => {
        console.log(data)
        
    })

    else axios.post('sale', {...formData, listProducts: mainListProducts, shop_id: store.user.active_shop }).then(({data}) => {
        swal.fire({
            icon: 'success',
            title: 'Sold',
            showConfirmButton: false,
            timer: 1000
        })
        emit('sold', data)
    })
}

const remaining = computed(() => {
    const summs = []
    for (const key in formData) { summs.push(formData[key]) }
    return totalPrice - summs.reduce((sum, item) => {
        const price = ['', null].includes(item) ? 0 : item
        return sum + price
    }, 0)
})
</script>