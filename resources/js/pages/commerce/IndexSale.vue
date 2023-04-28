<template>
    <section name="indexSale" class="flex flex-col">
        <TransitionGroup name="fade">
            <ListProducts 
                v-if="activeList != null && listProducts[activeList].length" 
                @close="closeListProducts"
                @onrollup="onrollup"
                @onFinished="onFinished"
                :listProducts="listProducts[activeList]" 
            />
        </TransitionGroup>
        <SummSale></SummSale>
        <aside class="flex-between-center mb-3">
            <div>
                <RouterLink to="/soldproducts" class="py-1.5 inline-block">
                    <i class="fa-light fa-arrow-up-from-dotted-line text-red-600 mr-4"></i> Sotilgan
                </RouterLink>
                <span class="px-4"></span>
                <RouterLink to="/existproduct" class="py-1.5 inline-block">
                    <i class="fa-light fa-arrow-down-to-dotted-line text-blue-600 mr-4"></i> Do'kondagi
                </RouterLink>
            </div>
            <form @submit.prevent="AddToCart">
                <input type="text" class="text-input bg-inherit text-center text-gray-600" v-model="PageData.searchInput" placeholder="Sotish ID-XXX">
            </form>
        </aside>
        <RouterView class="h-full"></RouterView>
        <main class="-mb-4 -mx-4 px-3 py-2 relative z-[100] bg-white text-gray-500">
            <button 
                v-for="(item, index) in listProducts" 
                @click="changeActiveList(index)" 
                :key="index" 
                :class="{'bg-pink-500 text-white': index == activeList}"
                class="px-3 py-1 bg-gray-200 rounded-sm mr-3 border-b border-pink-600 transition-all"
            >
                <i class="fa-solid fa-memo mr-1.5"></i> {{index + 1}}
            </button>
        </main>
    </section>
</template>
<script setup lang="ts">
import ListProducts from './components/SoldListProducts.vue'
import SummSale from '@/components/SummSale.vue'
import { reactive, provide } from 'vue'
import { getProduct } from './getProductById'

const { getProductById, onFinished , listProducts , blocker , activeList } = getProduct()
provide('getProductById', getProductById)

const PageData = reactive({
    searchInput: null,
})

function AddToCart(){
    getProductById(PageData.searchInput)
    PageData.searchInput = null
}

function closeListProducts() {
    listProducts.value.splice(activeList.value, 1)
    activeList.value = null
    blocker.value = true
    onFinished(false)
}

function onrollup(){
    activeList.value = null
    blocker.value = true
}

function changeActiveList(index){
    activeList.value = null
    setTimeout(() => activeList.value = index, 150);
}
</script>