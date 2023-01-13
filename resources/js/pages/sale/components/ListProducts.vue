<template>
    <section @click="$emit('close')" class="full-absolute flex-center py-8">
        <main @click.stop class="min-w-[630px] w-[900px] bg-white h-full flex flex-col justify-between">
            <header class="text-right bg-gray-100 border-b mb-0">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </header>
            <main class="flex-grow overflow-hidden overflow-y-auto list-products shadow-inner px-3">
                <table class="w-full text-center">
                    <tr>
                        <td class="py-1">Name</td>
                        <td class="py-1">Size</td>
                        <td class="py-1">Price</td>
                        <td class="py-1">Count</td>
                        <td class="py-1">Storehouse count</td>
                        <td class="py-1">Total price</td>
                    </tr>
                    <tr v-for="product in listProducts">
                        <td class="border-y py-5">{{ product.product_names.name }}</td>
                        <td class="border-y py-5">{{ product.size.name }}</td>
                        <td class="border-y py-5">{{ product.price }}</td>
                        <td class="border-y py-5">
                            <button @click="decrement(product)" class="px-3 bg-gray-300 rounded-sm shadow w-10">
                                -
                            </button>
                            {{ product.totalCount }}
                            <button @click="increment(product)" class="px-3 bg-gray-300 rounded-sm shadow w-10">
                                +
                            </button>
                        </td>
                        <td class="border-y py-5">{{ product.count }}</td>
                        <td class="border-y py-5">{{ product.price * product.totalCount }}</td>
                    </tr>
                    <tr>
                        <td class="py-5" colspan="5"></td>
                        <td class="py-5">{{ totalPrice }}</td>
                    </tr>
                </table>
                <div>
                    
                </div>
                <!-- <div v-for="product in listProducts" class="border-b px-3 py-2 mb-2">
                    <aside>
                        ID: {{ product.id }}
                    </aside>
                    <main class="font-bold">
                         <span class="ml-5 font-normal">Size: {{ product.size.name }}</span>
                    </main>
    
                    <div>
                        Price: {{ product.price }}
                    </div>
                    <div class="flex">
                        <button @click="decrement(product)" class="px-3 bg-gray-300 rounded-sm shadow w-10">
                            -
                        </button>
                        <main class="mx-3">
                            <b>Count</b>: {{ product.totalCount }} <br>
                        </main>
                        <button @click="increment(product)" class="px-3 bg-gray-300 rounded-sm shadow w-10">
                            +
                        </button>
                    </div>
                    <span class="ml-6">storehouse : {{ product.count }}</span>  
                </div> -->
            </main>
            <footer class="bg-white p-3 border-t">
                <button @click="setProductId(10)" class="bg-gray-300 px-3 mr-3 rounded-sm shadow-sm">Product 10</button>
                <button @click="setProductId(85)" class="bg-gray-300 px-3 mr-3 rounded-sm shadow-sm">Product 85</button>
                <button @click="setProductId(86)" class="bg-gray-300 px-3 mr-3 rounded-sm shadow-sm">Product 86</button>
                <button @click="setProductId(87)" class="bg-gray-300 px-3 mr-3 rounded-sm shadow-sm">Product 87</button>
                <button @click="setProductId(94)" class="bg-gray-300 px-3 mr-3 rounded-sm shadow-sm">Product 94</button>
            </footer>
        </main>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const { listProducts } = defineProps(['listProducts', 'setProductId'])

const totalPrice = computed(() => {
    return listProducts.reduce((summa, product) => summa + product.price * product.totalCount, 0)
})

function decrement(product){
    if(product.totalCount > 1){
        product.totalCount--
    }
}

function increment(product){
    // if(product.totalCount < product.count){
        product.totalCount++
    // }
}


</script>