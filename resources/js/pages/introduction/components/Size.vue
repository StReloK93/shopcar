<template>
    <main v-if="FormData.products.length != 0" class="flex min-w-min mb-2 relative z-50 shadow bg-gray-50">
        <div v-for="(size, index) in FormData.products" :key="index" :class="{'mr-0': index == FormData.products.length - 1}" class="flex flex-col mr-1.5">
            <main @click="size.count++" class="size-button mb-1"><i class="far fa-angle-up"></i></main>
            <aside
                class="bg-gray-200 rounded-sm shadow flex flex-col items-center justify-between uppercase  overflow-hidden">
                <span class="w-10 text-center py-1 bg-gray-500 text-gray-100">{{ size.name }}</span>
                <input :class="{ 'bg-pink-500 text-white': size.count != 0 }"
                    class="w-10 text-center py-1 outline-none px-0" type="number" v-model="size.count">
            </aside>
            <main :disabled="size.count == 0" @click="decrement(size)" :class="{ 'text-gray-300': size.count == 0 }"
                class="size-button mt-1">
                <i class="far fa-angle-down"></i>
            </main>
        </div>
    </main>
    <main v-else class="flex min-w-min mb-2 relative z-50 bg-gray-50 shadow ">
        <div v-for="rand in 5" class="flex flex-col mr-1.5 text-gray-300">
            <main class="size-button mb-1"><i class="far fa-angle-up"></i></main>
            <aside class="bg-gray-200 rounded shadow flex flex-col items-center justify-between">
                <span class="w-10 text-center py-1 bg-gray-100 text-gray-300">Кол</span>
                <span class="w-10 text-center py-1">{{ rand }}</span>
            </aside>
            <main class="size-button mt-1"><i class="far fa-angle-down"></i></main>
        </div>
    </main>
</template>
<script setup lang="ts">
const { FormData } = defineProps(['FormData'])
const decrement = (size) => { if (size.count > 0) size.count-- }
</script>