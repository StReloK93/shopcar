<template>
    <section>
        <h3 class="mb-4 text-xl text-gray-500">
            Do'konlar ro'yhati
        </h3>
        <main class="flex -mx-2 flex-wrap">
            <div v-for="shop in pageData.shops" class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-full px-3 relative after:content-[''] after:float-left after:pt-[125%] mb-4">
                <header 
                    :class="{ '!border-pink-300': store.user.active_shop == shop.id }"
                    class="relative h-full bg-[url('/images/shop.jpg')] border bg-cover rounded-sm shadow-sm">
                    <aside class="absolute top-0 left-0 w-full h-full p-3 pt-0 bg-white bg-opacity-70 flex flex-col justify-between">
                        <div class="flex justify-between items-center mb-3 -mr-3">
                            <span class="text-gray-400 text-xs">
                                {{ moment(shop.created_at).format('D MMMM YYYY') }}
                            </span>
                            <button @click="setShop(shop.id)">
                                <i :class="{'!text-pink-500': store.user.active_shop == shop.id}" class="fa-solid fa-circle-check text-gray-200 hover:!text-pink-300 p-3"></i>
                            </button>
                        </div>
                        <main class="flex-grow">
                            <p class="text-xs leading-none text-gray-400 mb-2">Do'kon nomi</p>
                            <form @submit.prevent="editShop(shop)" class="text-gray-700 text-xl flex -mx-1">
                                <main class="flex-grow">
                                    <input type="text" v-model="shop.name" :disabled="shop.disabled" class="outline-none w-full block h-full px-1">
                                </main>
                                <button v-if="shop.disabled" @click="shop.disabled = !shop.disabled" type="button"
                                    class="text-teal-600 px-1.5 py-0.5 rounded-sm">
                                    <i class="fas fa-pen-nib text-sm"></i>
                                </button>
                                <button v-else type="submit" class="text-teal-500 px-1.5 py-0.5 rounded-sm">
                                    <i class="fas fa-save"></i>
                                </button>
                            </form>
                        </main>
                        <main class="mt-3">
                            <button @click="deleteShop(shop.id)" class="bg-gray-100 py-0.5 w-full outline-none rounded-sm shadow hover:bg-pink-200 active:bg-pink-100 active:shadow-xs">
                                <i class="fa-regular text-pink-500 fa-trash"></i>
                            </button>
                        </main>
                    </aside>
                </header>
            </div>
            <div @click="createShop" class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-full px-3 relative after:content-[''] after:float-left after:pt-[125%] mb-4">
                <header class="group relative h-full bg-[url('/images/shop.jpg')] border border-gray-200 bg-cover rounded-sm cursor-pointer hover:border-pink-300">
                    <aside class="absolute top-0 left-0 w-full h-full p-3 bg-white bg-opacity-70 flex items-center flex-col justify-between">
                        <div class="mt-16">
                            <i class="fa-thin group-hover:text-pink-300 fa-circle-plus text-5xl text-gray-200"></i>
                        </div>
                        <h3 class="mt-4 text-gray-400 group-hover:text-pink-400 font-light">
                            Yangi do'kon qo'shish
                        </h3>
                    </aside>
                </header>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import moment from '@/modules/moment'
import axios from '@/modules/axios'
import swal from '@/modules/swal'
import { useAuthStore } from '@/store/useAuthStore'
import { reactive } from 'vue'

const store = useAuthStore();

const pageData = reactive({
    shops: []
})
axios.get('/shops').then(({ data }) => {
    data.forEach((item) => {
        item.disabled = true
        item.oldname = item.name
    })
    pageData.shops = data
})

function setShop(shopid) {
    axios.get(`/user/setshop/${shopid}`).then(({data}) => store.user = data)
}

function createShop(){
    axios.post('/shops').then(({ data }) => pageData.shops.push(data))
}

function editShop(shop){
    if(shop.oldname == shop.name) return shop.disabled = true
    axios.put(`/shops/${shop.id}`, { name: shop.name }).then(() => {
        if(store.user.active_shop == shop.id) store.user.active.name = shop.name
        shop.disabled = true
        shop.oldname = shop.name
    })
}

function deleteShop(id){
    swal.fire({
        title: "O'ylab ko'ring?",
        text: "Do'kondagi barcha malumotlar o'chib ketadi va qayta tiklashni iloji yoq!",
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/shops/${id}`).then(() => {
                if(store.user.active_shop == id) {
                    store.user.active = null
                    store.user.active_shop = null
                }
                pageData.shops = pageData.shops.filter((shop) => shop.id != id)
            })
        }
    })
}
</script>