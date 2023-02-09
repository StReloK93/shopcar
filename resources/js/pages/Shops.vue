<template>
    <section>
        <main class="flex -mx-2 flex-wrap">
            <div @click="setShop(shop.id)" v-for="shop in shops" class="w-1/5 px-3 relative after:content-[''] after:float-left after:pt-[125%] mb-4">
                <header 
                    :class="{ '!border-pink-300': store.user.active_shop == shop.id }"
                    class="relative h-full bg-[url('/images/shop.jpg')] border border-transparent bg-cover rounded-sm shadow cursor-pointer hover:border-pink-200 hover:shadow-md">
                    <aside class="absolute top-0 left-0 w-full h-full p-3 bg-white bg-opacity-70">
                        <div class="flex justify-between items-center mb-3">
                            <span class="text-gray-400 text-xs">
                                {{ moment(shop.created_at).format('D MMMM YYYY') }}
                            </span>
                            <i :class="{'!text-pink-500': store.user.active_shop == shop.id}" class="fa-solid fa-circle-check text-gray-200"></i>
                        </div>
                        {{ shop.name }}
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

const shops = ref()
axios.get('/shops').then(({ data }) => shops.value = data)

function setShop(shopid) {
    axios.get(`/user/setshop/${shopid}`).then(({data}) => store.user = data)
}
</script>