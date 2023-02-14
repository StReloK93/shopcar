<template>
    <section>
        <h3 class="mb-4 text-xl text-gray-500">
            Do'konlar ro'yhati
        </h3>
        <main class="flex -mx-2 flex-wrap">
            <div v-for="shop in shops" class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-full px-3 relative after:content-[''] after:float-left after:pt-[125%] mb-4">
                <header 
                    :class="{ '!border-pink-300': store.user.active_shop == shop.id }"
                    class="relative h-full bg-[url('/images/shop.jpg')] border border-gray-100 bg-cover rounded-sm shadow-sm">
                    <aside class="absolute top-0 left-0 w-full h-full p-3 pt-0 bg-white bg-opacity-70">
                        <div class="flex justify-between items-center mb-3 -mr-3">
                            <span class="text-gray-400 text-xs">
                                {{ moment(shop.created_at).format('D MMMM YYYY') }}
                            </span>
                            <button @click="setShop(shop.id)">
                                <i :class="{'!text-pink-500': store.user.active_shop == shop.id}" class="fa-solid fa-circle-check text-gray-200 hover:!text-pink-300 p-3"></i>
                            </button>
                        </div>
                        <main>
                            {{ shop.name }}
                        </main>
                        <main class="mt-3">
                            <button @click="deleteShop(shop.id)" class="bg-gray-300 px-3">
                                Delete
                            </button>
                        </main>
                    </aside>
                </header>
            </div>
            <div @click="createShop" class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-full px-3 relative after:content-[''] after:float-left after:pt-[125%] mb-4">
                <header class="group relative h-full bg-[url('/images/shop.jpg')] border border-gray-200 bg-cover rounded-sm cursor-pointer hover:border-pink-300">
                    <aside class="absolute top-0 left-0 w-full h-full p-3 bg-white bg-opacity-70 flex items-center flex-col justify-between">
                        <div class="mt-16">
                            <i class="fa-thin group-hover:text-pink-200 fa-circle-plus text-5xl text-gray-200"></i>
                        </div>
                        <h3 class="mt-4 text-pink-300 font-light">
                            Yangi do'kon qo'shish
                        </h3>
                    </aside>
                </header>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import moment from './../modules/moment'
import axios from './../modules/axios'
import { useAuthStore } from '@/store/useAuthStore'
import { ref } from 'vue'

const store = useAuthStore();

const shops = ref([])
axios.get('/shops').then(({ data }) => shops.value = data)

function setShop(shopid) {
    axios.get(`/user/setshop/${shopid}`).then(({data}) => store.user = data)
}

function createShop(){
    axios.post('/shops').then(({ data }) => shops.value.push(data))
}


function deleteShop(id){
    axios.delete(`/shops/${id}`).then(() => {
        shops.value = shops.value.filter((shop) => shop.id != id)
    })
}
</script>