<template>
    <section class="bg-black bg-opacity-20 w-full h-full absolute z-50 left-0 top-0 flex-center">
        <main @click.stop class="w-96 h-96 bg-white shadow-lg flex flex-col">
            <header class="text-right bg-gray-100 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>
            <form @submit.prevent="finishedSold" class="p-3 flex flex-col justify-between h-full">
                <main>
                    <div class="mb-1.5">
                        <label class="text-gray-400 flex-between-center">
                            <span>Naxt</span>
                        </label>
                        <input type="number" v-model="formData.cash" step="0.001" class="text-input">
                    </div>
                    <div class="mb-1.5">
                        <label class="text-gray-400 flex-between-center">
                            <span>Plastik</span>
                        </label>
                        <input type="number" v-model="formData.electron" step="0.001" class="text-input">
                    </div>
                    <div class="mb-1.5">
                        <label class="text-gray-400 flex-between-center">
                            <span>Qarz</span>
                        </label>
                        <input type="number" v-model="formData.debt" step="0.001" class="text-input">
                    </div>
                    <aside class="flex items-center justify-end mt-3">
                        <span class="text-gray-500">
                            Umumiy summa: 
                        </span>
                        <span class="text-xl font-semibold text-gray-600 ml-5">
                            {{ totalPrice }} 
                        </span>
                    </aside>
                </main>
                <main>
                    <button class="py-1 px-3 bg-gray-200 shadow border-b-2 border-pink-500 active:bg-gray-300 w-full">
                        To'lovni amalga oshirish
                    </button>
                </main>
            </form>
        </main>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const { listProducts, totalPrice } = defineProps(['listProducts', 'totalPrice'])

const formData = reactive({
    cash: totalPrice,
    electron: null,
    debt: null,
    listProducts: listProducts,
})

function finishedSold(){

    // axios.post('sells', formData).then(({data}) => {
    //     swal.fire({
    //         icon: 'success',
    //         title: 'Sold',
    //         showConfirmButton: false,
    //         timer: 1000
    //     })
    //     emit('sold', data)
    // })
}

</script>